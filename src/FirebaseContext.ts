import { gameStarted, newRound, userLoaded, updatePlayers } from './redux/actions/gameActions';
import React from 'react';
import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import { Dispatch } from 'redux';
import { GameActionTypes, CardType, UserType, Role } from './redux/actionTypes/gameTypes';
import Axios from 'axios';

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

  private roomID: string = '';
  reduxDispatch: Dispatch<GameActionTypes>;
  cards: { white: CardType[]; black: CardType[] } = { white: [], black: [] };
  uid: string = '';

  constructor(reduxDispatch: Dispatch<GameActionTypes>) {
    app.initializeApp(config);
    this.auth = app.auth();
    this.db = app.database();
    this.reduxDispatch = reduxDispatch;

    this.auth.onAuthStateChanged((user) => {
      if (user) {
        this.uid = user.uid;
        user.getIdToken(true).then((idToken) => {
          Axios.defaults.headers.common['Authorization'] = `Bearer ${idToken}`;
        });
        this.reduxDispatch(userLoaded(user.displayName || ''));
      }
    });

    this.db.ref('cards').once('value', (cards) => {
      this.cards = cards.val();
      console.log(this.cards);
    });
  }

  doCreateUserWithEmailAndPassword = (email: string, password: string, username: string) => {
    const unsubscribe = this.auth.onAuthStateChanged((user) => {
      if (user) {
        user.updateProfile({
          displayName: username,
        });
        unsubscribe();
      }
    });
    return this.auth.createUserWithEmailAndPassword(email, password).catch((e) => {
      unsubscribe();
      throw e;
    });
  };

  doSignInWithEmailAndPassword = (email: string, password: string) => this.auth.signInWithEmailAndPassword(email, password);

  doPasswordReset = (email: string) => this.auth.sendPasswordResetEmail(email);
  doPasswordUpdate = (password: string) => this.auth.currentUser?.updatePassword(password);

  doSignOut = () => this.auth.signOut();

  private room = () => this.db.ref(`rooms/${this.roomID}`);

  users = () => this.db.ref(`rooms/${this.roomID}/users`);

  private userInRoom = () => this.db.ref(`rooms/${this.roomID}/users/${this.auth.currentUser?.uid}`);

  private roundCards = async (): Promise<CardType[]> => {
    const cards: CardType[] = [];

    const whiteRef = this.db.ref(`rooms/${this.roomID}/users/${this.auth.currentUser?.uid}/white`);
    const whiteSnap = await whiteRef.once('value');
    if (!whiteSnap.exists()) {
      console.error('White not exists', whiteSnap);
    } else {
      const indexes = whiteSnap.val();
      (indexes || '').split('|').forEach((i: number) => {
        cards.push(this.cards.white[i]);
      });
    }
    return cards;
  };

  enterRoom = (roomID: string) => {
    this.roomID = roomID;

    // Notify game started
    this.room()
      .child('game_started')
      .on('value', (snap) => {
        this.reduxDispatch(gameStarted(!!snap.val()));
      });

    // manage new round
    this.room()
      .child('round')
      .on('value', async (snap) => {
        if (snap.exists()) {
          const judgeID = (await snap.ref.parent?.child('judge').once('value'))?.val();
          const round = snap.val();
          const cards = await this.roundCards();
          const role = judgeID === this.uid ? Role.JUDGE : Role.PLAYER;
          const blackCard = this.cards.black[(await snap.ref.parent?.child('black').once('value'))?.val()];
          this.reduxDispatch(newRound(round, cards, role, blackCard, judgeID));
        }
      });

    // Notify new players
    this.users().on('value', (snapshot) => {
      const newPlayers: UserType[] = [];
      snapshot.forEach((user) => {
        if (user.exists() && user.key) {
          const userObj = user.val();
          newPlayers.push({ uid: user.key, username: userObj.username, points: userObj.points });
        }
      });
      this.reduxDispatch(updatePlayers(newPlayers));
    });

    // Set user in room
    const userRow = this.userInRoom();
    userRow.set({
      username: this.auth.currentUser?.displayName,
      points: 0,
    });

    // Delete on disconnect
    userRow.onDisconnect().remove();
  };

  startGame = () => {
    this.room().child('game_started').set(true);
  };

  exitRoom = () => {
    if (this.roomID) {
      this.room().child('game_started').off('value');
      this.users().off('value');
      this.userInRoom().remove();
    }
    this.roomID = '';
  };
}

export const FirebaseContext = React.createContext<Firebase | null>(null);
