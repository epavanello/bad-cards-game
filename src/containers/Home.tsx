import React, { useContext, useState } from 'react';

import { FirebaseContext } from '../FirebaseContext';
import Room from '../containers/Room';
import { useSelector } from '../redux/store';
import { useDispatch } from 'react-redux';
import { joinGame, hostGame, exitGame } from '../redux/actions/gameActions';
import Button from '../components/Button';
import { Redirect } from 'react-router-dom';

export default function Home() {
  const firebase = useContext(FirebaseContext);
  const [manualRoomID, setManualRoomID] = useState('');
  const roomID = useSelector((state) => state.roomID);
  const inRoom = useSelector((state) => state.inRoom);
  const dispatch = useDispatch();

  const onJoinRoom = () => {
    if (firebase) {
      dispatch(joinGame(manualRoomID, firebase));
    }
  };

  const onHostGame = () => {
    if (firebase) {
      dispatch(hostGame(firebase));
    }
  };
  if (inRoom) {
    return <Redirect to={`/room/${roomID}`} />;
  }

  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="bg-white text-gray-800 shadow-md rounded p-4">
        <div className="grid grid-cols-2">
          <div className="border-r p-4">
            <h1 className="text-2xl text-center mb-8">Join a game</h1>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="roomID">
                Room ID
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="roomID"
                type="text"
                placeholder="Room ID"
                value={manualRoomID}
                onChange={(e) => setManualRoomID(e.target.value)}
              />
            </div>
            <div className="flex flex-row justify-center">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={onJoinRoom}
              >
                Join
              </button>
            </div>
          </div>
          <div className="flex flex-col justify-start p-4">
            <h1 className="text-2xl text-center mb-8">Host a game</h1>
            <div className="flex-1 flex flex-row align-bottom justify-center items-end">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={onHostGame}
              >
                Host
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
