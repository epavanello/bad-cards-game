import { gameStarted } from './redux/actions/gameActions';
import React from 'react';
import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import { Dispatch } from 'redux';
import { throws } from 'assert';
import { threadId } from 'worker_threads';
import { GameActionTypes } from './redux/actionTypes/gameTypes';

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

  private roomID: string | null = null;
  reduxDispatch: Dispatch<GameActionTypes>;

  constructor(reduxDispatch: Dispatch<GameActionTypes>) {
    app.initializeApp(config);
    this.auth = app.auth();
    this.db = app.database();
    this.reduxDispatch = reduxDispatch;
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

  private room = (roomID: string) => this.db.ref(`rooms/${roomID}`);

  users = (roomID: string) => this.db.ref(`rooms/${roomID}/users`);

  private user = (roomID: string) => this.db.ref(`rooms/${roomID}/users/${this.auth.currentUser?.uid}`);

  enterRoom = (roomID: string) => {
    if (this.auth.currentUser) {
      this.roomID = roomID;

      this.room(this.roomID)
        .child('game_started')
        .on('value', (snap) => {
          this.reduxDispatch(gameStarted(!!snap.val()));
        });

      const userRow = this.user(roomID);
      userRow.set({
        username: this.auth.currentUser.displayName,
      });
      userRow.onDisconnect().remove();
    }
  };

  startGame = () => {
    if (this.roomID) {
      this.room(this.roomID).child('game_started').set(true);
    }
  };

  exitRoom = () => {
    if (this.roomID) {
      this.room(this.roomID).child('game_started').off('value');
      this.user(this.roomID).remove();
    }
    this.roomID = null;
  };
}

export const FirebaseContext = React.createContext<Firebase | null>(null);
