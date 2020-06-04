import { randomID, chooseOne, chooseN } from './utilities';
import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { getPack } from './packs';

const getParams = () => ({
  type: process.env.TYPE,
  projectId: process.env.PROJECT_ID,
  privateKeyId: process.env.PRIVATE_KEY_ID,
  privateKey: process.env.PRIVATE_KEY.replace(/\\n/g, '\n'),
  clientEmail: process.env.CLIENT_EMAIL,
  clientId: process.env.CLIENT_ID,
  authUri: process.env.AUTH_URI,
  tokenUri: process.env.TOKEN_URI,
  authProviderX509CertUrl: process.env.AUTH_PROVIDER_X509_CERT_URL,
  clientC509CertUrl: process.env.CLIENT_X509_CERT_URL,
});

@Injectable()
export class AppService {
  db: admin.database.Database;

  constructor() {
    admin.initializeApp({
      credential: admin.credential.cert(getParams()),
      databaseURL: 'https://bad-cards-61f1b.firebaseio.com',
      databaseAuthVariableOverride: {
        uid: 'my-service-worker',
      },
    });

    this.db = admin.database();

    this.db.ref('rooms').on('child_added', roomSnap => {
      roomSnap.child('users').ref.on('child_removed', userSnap => {
        userSnap.ref.parent.once('value', parent => {
          if (!parent.exists() || parent.numChildren() === 0) {
            roomSnap.ref.remove();
          }
        });
      });

      roomSnap.child('game_started').ref.on('value', snap => {
        if (snap.exists() && snap.val() == true) {
          this.newRound(roomSnap.ref);
        }
      });
    });
  }

  private newRound(roomRef: admin.database.Reference, newWinner = '') {
    (async () => {
      const rounds = this.db.ref('rounds').ref;
      rounds.set(((await rounds.once('value')).val() || 0) + 1);
    })();

    roomRef.once('value', snap => {
      if (snap.exists()) {
        const gameStarted = snap.child('game_started');
        const lang = snap.child('lang').val();
        const selectedPack = +snap.child('selected_pack').val();
        if (gameStarted.exists() && !!gameStarted.val()) {
          const cards = getPack(lang, selectedPack);
          // load users
          const users = [];
          snap.child('users').forEach(user => {
            users.push(user.key);
          });
          // verifico se judge è stato settato, se c'è lo incremento se no lo scelgo random
          let newJudge = null;
          if (snap.hasChild('judge')) {
            const currentJudge = snap.child('judge').val();
            let newJudgeIndex = users.indexOf(currentJudge);
            if (newJudgeIndex != -1) {
              newJudgeIndex = (newJudgeIndex + 1) % users.length;
              newJudge = users[newJudgeIndex];
            }
          }
          if (!newJudge) {
            newJudge = chooseOne(users);
          }

          // Assign white cards
          const usedWhiteCards = [];
          snap.child('users').forEach(user => {
            let white = [];
            if (user.key != newJudge) {
              white = chooseN(cards.whiteCards, 10, usedWhiteCards);
              usedWhiteCards.push(...white);
            }
            user.ref.update({
              white: white.map(card => card.id).join('|'),
              selected: '',
              winner: newWinner === user.key,
            });
          });

          const nextBlackCard = chooseOne(cards.blackCards);

          snap.ref.update({
            judge: newJudge,
            round: (snap.child('round').val() || 0) + 1,
            black: nextBlackCard.id,
          });
          // Estraggo le carte random
          // Distribuisco le carte ai giocatori
        }
      }
    });
  }

  private room = (roomID: string) => this.db.ref(`rooms/${roomID}`);

  async getUserID(authorization: string) {
    if (authorization.startsWith('Bearer ')) {
      const token = authorization.substring(7, authorization.length);

      return await admin.auth().verifyIdToken(token);
    }
  }

  getFirstOpenRoom() {
    return new Promise<string>(async (resolve, reject) => {
      try {
        const roomsSnap = await this.db.ref('rooms').once('value');
        if (roomsSnap.exists()) {
          const roomsRef: admin.database.DataSnapshot[] = [];
          roomsSnap.forEach(roomRef => {
            roomsRef.push(roomRef);
          });
          for (const roomRef of roomsRef) {
            const roomSnap = await roomRef.ref.once('value');
            if (roomSnap.exists()) {
              const gameStarted = await roomSnap.child('game_started').ref.once('value');
              const users = await roomSnap.child('users').ref.once('value');
              if (gameStarted.exists() && gameStarted.val() === false && users.exists() && users.numChildren() > 0) {
                resolve(roomSnap.key);
                return;
              }
            }
          }
        }
        reject(Error('No room available now'));
      } catch (e) {
        reject(e);
      }
    });
  }

  async createRoom(host: string, lang: string, selectedPack: number) {
    let roomID = '';
    do {
      roomID = randomID(4);
    } while ((await this.room(roomID).once('value')).exists());

    this.room(roomID).set({
      // eslint-disable-next-line @typescript-eslint/camelcase
      game_started: false,
      host,
      lang,
      // eslint-disable-next-line @typescript-eslint/camelcase
      selected_pack: selectedPack,
    });
    return roomID;
  }

  setWinner(uid: string, roomID: string) {
    const roomRef = this.room(roomID).ref;
    roomRef
      .child('users')
      .child(uid)
      .child('points')
      .transaction(val => +val + 1);
    this.newRound(roomRef, uid);
  }
}
