import React from 'react';
import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import { CardType, UserType, Role, Pack } from './redux/actionTypes/gameTypes';
import { Observable } from 'rxjs';

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_ID,
};

export class Firebase {
  auth: app.auth.Auth;
  db: app.database.Database;

  roomID: string = '';
  //cards: { white: CardType[]; black: CardType[] } = { white: [], black: [] };
  uid: string = '';

  constructor() {
    app.initializeApp(config);
    this.auth = app.auth();
    this.db = app.database();
  }

  changeDisplayName(displayName: string) {
    this.auth.currentUser?.updateProfile({
      displayName: displayName,
    });
  }

  deleteUser = () => this.auth.currentUser?.delete();

  doCreateUserWithEmailAndPassword = (email: string, password: string) =>
    new Promise<void>((resolve, reject) => {
      const unsubscribe = this.auth.onAuthStateChanged((user) => {
        if (user) {
          resolve();
          unsubscribe();
        }
      });
      return this.auth.createUserWithEmailAndPassword(email, password).catch((e) => {
        unsubscribe();
        reject(e);
      });
    });

  doSignInWithEmailAndPassword = (email: string, password: string) => this.auth.signInWithEmailAndPassword(email, password);

  doPasswordReset = (email: string) => this.auth.sendPasswordResetEmail(email);
  doPasswordUpdate = (password: string) => this.auth.currentUser?.updatePassword(password);

  doSignOut = () => this.auth.signOut();

  private room = () => this.db.ref(`rooms/${this.roomID}`);

  users = () => this.db.ref(`rooms/${this.roomID}/users`);

  private userInRoom = () => this.db.ref(`rooms/${this.roomID}/users/${this.auth.currentUser?.uid}`);

  private roundCards = async (pack: Pack): Promise<CardType[]> => {
    const whiteRef = this.db.ref(`rooms/${this.roomID}/users/${this.auth.currentUser?.uid}/white`);
    const whiteSnap = await whiteRef.once('value');
    if (!whiteSnap.exists()) {
      throw new Error('White not exists');
    } else {
      return this.getCards(pack.whiteCards, whiteSnap.val() || '');
    }
  };

  private getCards = (cards: CardType[], ids: string) => {
    const cardsResult: CardType[] = [];
    if (ids) {
      ids.split('|').forEach((i) => {
        const currentCard = cards[+i];
        if (!currentCard) {
          alert('White cards are not ready, restart the game');
          return false;
        } else {
          cardsResult.push(currentCard);
        }
      });
    }
    return cardsResult;
  };

  // Notify game started
  notifyOnGameStart = () =>
    new Promise<boolean>((resolve) => {
      const listner = this.room().child('game_started');
      listner.on('value', (snap) => {
        if (!!snap.val()) {
          listner.off();
          resolve(true);
        }
      });
    });

  notifyNewRound$ = (pack: Pack) =>
    new Observable<{ round: number; cards: CardType[]; role: Role; blackCard: CardType; judgeID: string }>((subscriber) => {
      const listner = this.room().child('round');
      listner.on('value', async (snap) => {
        if (snap.exists()) {
          const judgeID = (await snap.ref.parent?.child('judge').once('value'))?.val();
          const round = snap.val();
          const cards = await this.roundCards(pack);
          const role = judgeID === this.uid ? Role.JUDGE : Role.PLAYER;
          const blackCard = pack.blackCards[(await snap.ref.parent?.child('black').once('value'))?.val()];
          subscriber.next({ round, cards, role, blackCard, judgeID });
        }
      });
      return () => {
        listner.off();
      };
    });

  notifyNewPlayers$ = (pack: Pack) =>
    new Observable<UserType[]>((subscriber) => {
      const listner = this.users();
      listner.on('value', (snapshot) => {
        const newPlayers: UserType[] = [];
        snapshot.forEach((user) => {
          if (user.exists() && user.key) {
            const userObj = user.val();
            newPlayers.push({
              uid: user.key,
              displayName: userObj.displayName,
              points: userObj.points,
              cardSelected: this.getCards(pack.whiteCards, userObj.selected),
              winner: userObj.winner,
            });
          }
          subscriber.next(newPlayers);
        });
      });
      return () => {
        listner.off();
      };
    });

  enterRoom = (roomID: string) => {
    this.roomID = roomID.trim().toUpperCase();

    // manage new round

    // Notify new players

    // Set user in room
    const userRow = this.userInRoom();
    return userRow
      .set({
        displayName: this.auth.currentUser?.displayName,
        points: 0,
      })
      .then(() => {
        // Delete on disconnect
        userRow.onDisconnect().remove();
      });
  };

  getPackRef = async () => {
    return {
      lang: (await this.room().child('lang').once('value')).val(),
      selectedPack: +(await this.room().child('selected_pack').once('value')).val(),
    };
  };

  startGame = () => this.room().child('game_started').set(true);

  exitRoom = async () => {
    if (this.roomID) {
      await this.userInRoom()
        .remove()
        .catch(() => {
          /* Can I have no permission becausa room can missing */
        });
    }
    this.roomID = '';
  };

  sendSelected = (cards: CardType[]) => {
    return this.db.ref(`rooms/${this.roomID}/users/${this.auth.currentUser?.uid}/selected`).set(cards.map((card) => card.id).join('|'));
  };
}

export const FirebaseContext = React.createContext<Firebase | null>(null);
