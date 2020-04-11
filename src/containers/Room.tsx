import React, { useContext } from 'react';
import UsersList from './UsersList';
import { FirebaseContext } from '../FirebaseContext';
import { useSelector } from '../redux/store';

type RoomProps = { roomID: string; isHost: boolean };
export default function Room({ roomID, isHost }: RoomProps) {
  const firebase = useContext(FirebaseContext);

  const gameStarted = useSelector((state) => state.gameReducer.gameStarted);

  const startGame = () => {
    if (isHost) {
      firebase?.startGame();
    }
  };

  return (
    <>
      {!gameStarted && isHost && <button onClick={startGame}>Start game</button>}
      {gameStarted && <p>Let's play</p>}
      <UsersList roomID={roomID} />
    </>
  );
}
