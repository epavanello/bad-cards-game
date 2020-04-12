import React, { useContext } from 'react';
import UsersList from './UsersList';
import { FirebaseContext } from '../FirebaseContext';
import { useSelector } from '../redux/store';
import Game from './Game';

export default function Room() {
  const firebase = useContext(FirebaseContext);
  const gameStarted = useSelector((state) => state.gameStarted);
  const playersCount = useSelector((state) => state.players.length);
  const isHost = useSelector((state) => state.isHost);

  const startGame = () => {
    if (isHost) {
      firebase?.startGame();
    }
  };

  return (
    <>
      {!gameStarted && isHost && playersCount > 1 && <button onClick={startGame}>Start game</button>}
      {gameStarted && <p>Let's play</p>}
      <UsersList />
      {gameStarted && <Game />}
    </>
  );
}
