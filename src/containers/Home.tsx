import React, { useContext, useState } from "react";
import axios from "axios";
import { User } from "firebase";

import { FirebaseContext } from "../components/Firebase";
import Room from "../containers/Room";

type HomeProps = { user: User };

export default function Home({ user }: HomeProps) {
  const firebase = useContext(FirebaseContext);
  const [roomID, setRoomID] = useState("");
  const [inRoom, setInRoom] = useState(false);

  const joinRoom = () => {
    if (firebase) {
      firebase.enterRoom(roomID);
      setInRoom(true);
    }
  };

  const hostGame = async () => {
    if (firebase?.auth.currentUser) {
      try {
        const response = await axios.get<{ roomID: string }>(
          "/game/createRoom"
        );
        setRoomID(response.data.roomID);
        firebase?.enterRoom(response.data.roomID);
        setInRoom(true);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const exitRoom = () => {
    setInRoom(false);
    firebase?.exitRoom();
  };

  return (
    <>
      <p>
        Logged as: {user.displayName}({user.email})
        <button onClick={firebase?.doSignOut}>Logout</button>
      </p>
      {!inRoom && (
        <>
          <h3>Join room</h3>
          <input
            type="text"
            size={4}
            value={roomID}
            onChange={(e) => setRoomID(e.target.value)}
          />
          <button onClick={joinRoom}>Join</button>
          <button onClick={hostGame}>Host</button>
        </>
      )}
      {inRoom && <button onClick={exitRoom}>Exit</button>}

      {inRoom && (
        <>
          <h3>Room {roomID}</h3>
          <Room roomID={roomID} />
        </>
      )}
    </>
  );
}
