import React from 'react';
import { useSelector } from '../redux/store';

export default function UsersList() {
  const gameStarted = useSelector((store) => store.gameStarted);
  const players = useSelector((state) => state.players);

  return (
    <div>
      {players &&
        players.map((user) => (
          <p key={user.uid}>
            {user.username}
            {gameStarted ? ` (${user.points})` : ''}
          </p>
        ))}
    </div>
  );
}
