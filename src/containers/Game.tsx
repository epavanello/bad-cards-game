import React, { useState } from 'react';

import { useSelector } from '../redux/store';
import { useDispatch } from 'react-redux';
import { joinGame, hostGame, redirectAfterLogin } from '../redux/actions/gameActions';
import { Redirect } from 'react-router-dom';
import Button from '../components/Button';
import { FieldInput } from '../components/FieldInput';

export default function Game() {
  const [manualRoomID, setManualRoomID] = useState('');
  const roomID = useSelector((state) => state.roomID);
  const inRoom = useSelector((state) => state.inRoom);
  const logged = useSelector((state) => state.logged);
  const returnToGame = useSelector((state) => state.returnToGame);
  const dispatch = useDispatch();

  const onJoinRoom = async () => {
    dispatch(joinGame(manualRoomID));
  };

  const onHostGame = async () => {
    dispatch(await hostGame());
  };

  if (!logged) {
    dispatch(redirectAfterLogin(window.location.pathname));
    return <Redirect to={`/login`} />;
  }

  if (inRoom && !returnToGame) {
    return <Redirect to={`/room/${roomID}`} />;
  }

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="bg-white text-gray-800 shadow-md rounded p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2">
          <div className="border-b sm:border-r sm:border-b-0 p-4">
            <h1 className="text-2xl text-center mb-4">Join a game</h1>
            <FieldInput id="roomID" label="Room ID" value={manualRoomID} onChange={(val) => setManualRoomID(val)} />
            <div className="flex flex-row justify-center mt-8">
              <Button onClick={onJoinRoom}>Join</Button>
            </div>
          </div>
          <div className="flex flex-col justify-start p-4">
            <h1 className="text-2xl text-center mb-8">Host a game</h1>
            <div className="flex-1 flex flex-row align-bottom justify-center items-end">
              <Button onClick={onHostGame}>Host</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
