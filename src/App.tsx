import React, { useContext, useEffect, useState } from "react";

import Home from "./containers/Home";

import "./App.css";
import { FirebaseContext } from "./components/Firebase";
import { User } from "firebase";
import Login from "./containers/Login";
import Axios from "axios";

function App() {
  const firebase = useContext(FirebaseContext);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribeOnAuthStateChange = firebase?.auth.onAuthStateChanged(
      (user) => {
        if (user) {
          user.reload().then(() => {
            // First reload, wait after register to update displayName with username
            setCurrentUser(firebase.auth.currentUser);

            firebase?.auth.currentUser
              ?.getIdToken(true)
              .then(function (idToken) {
                Axios.defaults.headers.common[
                  "Authorization"
                ] = `Bearer ${idToken}`;
              });
          });
        } else {
          setCurrentUser(null);
        }
      }
    );
    return unsubscribeOnAuthStateChange;
  }, [firebase]);

  return (
    <>
      {!currentUser && <Login />}
      {!!currentUser && (
        <>
          <Home user={currentUser} />
        </>
      )}
    </>
  );
}

export default App;
