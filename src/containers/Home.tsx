import React, { useContext, useState } from 'react';

import { FirebaseContext } from '../FirebaseContext';
import Room from '../containers/Room';
import { useSelector } from '../redux/store';
import { useDispatch } from 'react-redux';
import { joinGame, hostGame, exitGame } from '../redux/actions/gameActions';

export default function Home() {
  const firebase = useContext(FirebaseContext);
  const [manualRoomID, setManualRoomID] = useState('');
  const roomID = useSelector((state) => state.roomID);
  const inRoom = useSelector((state) => state.inRoom);
  const dispatch = useDispatch();
  const username = useSelector((state) => state.username);

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

  const onExitRoom = () => {
    if (firebase) {
      dispatch(exitGame(firebase));
    }
  };

  return (
    <>
      <p>
        Logged as: {username}{' '}
        <button className="small" onClick={firebase?.doSignOut}>
          Logout
        </button>
      </p>
      {!inRoom ? (
        <>
          <h3>Join room</h3>
          <input type="text" size={4} value={manualRoomID} onChange={(e) => setManualRoomID(e.target.value)} />
          <button className="small" onClick={onJoinRoom}>
            Join
          </button>
          <button className="small" onClick={onHostGame}>
            Host
          </button>
        </>
      ) : (
        <>
          <button onClick={onExitRoom}>Exit</button>
          <h3>Room {roomID}</h3>
          <Room />
        </>
      )}
    </>
  );
}
