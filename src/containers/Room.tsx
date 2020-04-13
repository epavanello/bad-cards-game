import React, { useContext, useEffect } from 'react';
import UsersList from './UsersList';
import { FirebaseContext } from '../FirebaseContext';
import { useSelector } from '../redux/store';
import Game from './Game';
import { useDispatch } from 'react-redux';
import { exitGame } from '../redux/actions/gameActions';

export default function Room() {
  const firebase = useContext(FirebaseContext);
  const gameStarted = useSelector((state) => state.gameStarted);
  const players = useSelector((state) => state.players);
  const isHost = useSelector((state) => state.isHost);
  const judge = useSelector((state) => state.judge);
  const roomID = useSelector((state) => state.roomID);

  const blackCard = useSelector((state) => state.blackCard);
  const whiteCards = useSelector((state) => state.cards);

  const dispatch = useDispatch();

  const startGame = () => {
    if (isHost) {
      firebase?.startGame();
    }
  };

  useEffect(() => {
    return () => {
      if (firebase) {
        dispatch(exitGame(firebase));
      }
    };
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white text-gray-800 shadow-md rounded p-8 flex flex-col items-start">
          {gameStarted ? (
            <>
              <h1 className="text-2xl mb-4">Game started</h1>
            </>
          ) : isHost ? (
            <>
              <h1 className="text-2xl mb-4">Room {roomID} created</h1>
              <p className="italic text-gray-700">Start the game when all players are ready</p>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4"
                onClick={startGame}
              >
                Start game
              </button>
            </>
          ) : (
            <>
              <h1 className="text-2xl mb-4">Starting...</h1>
              <p className="italic text-gray-700">Wait the host start the game</p>
            </>
          )}
        </div>

        <div className="bg-white text-gray-800 shadow-md rounded p-8">
          <h1 className="text-2xl mb-4">Players</h1>
          <ul>
            {players &&
              players.map((user) => (
                <li key={user.uid} className="flex flex-row justify-between px-4">
                  <span>
                    {user.username}
                    {gameStarted ? ` (${user.points})` : ''}
                  </span>
                  <span>{user.uid === judge?.uid ? 'Player' : 'Kazar'}</span>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
