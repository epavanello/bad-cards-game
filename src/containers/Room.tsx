import React, { useContext } from 'react';
import UsersList from './UsersList';
import { FirebaseContext } from '../FirebaseContext';

type RoomProps = { roomID: string; isHost: boolean };
export default function Room({ roomID, isHost }: RoomProps) {
  const firebase = useContext(FirebaseContext);
  const startGame = () => {
    if (isHost) {
      firebase?.startGame();
    }
  };

  return (
    <>
      {isHost && <button onClick={startGame}>Start game</button>}
      <UsersList roomID={roomID} />
    </>
  );
}
