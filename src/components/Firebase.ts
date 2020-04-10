import React from "react";
import app from "firebase/app";
import "firebase/auth";
import "firebase/database";

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

  constructor() {
    app.initializeApp(config);
    this.auth = app.auth();
    this.db = app.database();
  }

  doCreateUserWithEmailAndPassword = (
    email: string,
    password: string,
    username: string
  ) => {
    const unsubscribe = this.auth.onAuthStateChanged((user) => {
      if (user) {
        user.updateProfile({
          displayName: username,
        });
        unsubscribe();
      }
    });
    return this.auth
      .createUserWithEmailAndPassword(email, password)
      .catch((e) => {
        unsubscribe();
        throw e;
      });
  };

  doSignInWithEmailAndPassword = (email: string, password: string) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doPasswordReset = (email: string) => this.auth.sendPasswordResetEmail(email);
  doPasswordUpdate = (password: string) =>
    this.auth.currentUser?.updatePassword(password);

  doSignOut = () => this.auth.signOut();

  private room = (roomID: string) => this.db.ref(`rooms/${roomID}`);

  users = (roomID: string) => this.db.ref(`rooms/${roomID}/users`);

  private userInRoom = (): app.database.Reference | null => {
    let userRef = null;
    if (this.auth.currentUser && this.roomID) {
      const users = this.users(this.roomID);
      users.once("value", (snap) => {
        snap.forEach((child) => {
          if (child.val().uid === this.auth.currentUser?.uid && child.key) {
            userRef = users.child(child.key);
            return true;
          }
        });
      });
    }
    return userRef;
  };

  enterRoom = (roomID: string) => {
    if (this.auth.currentUser) {
      this.roomID = roomID;

      this.room(roomID)
        .child("users")
        .push({
          uid: this.auth.currentUser.uid,
          username: this.auth.currentUser.displayName,
        })
        .then((ref) => {
          ref.onDisconnect().remove();
        });
    }
  };

  exitRoom = () => {
    this.userInRoom()?.remove();
    this.roomID = null;
  };
}

export const FirebaseContext = React.createContext<Firebase | null>(null);
