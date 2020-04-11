import React, { useContext, useState, useEffect } from 'react';
import { FirebaseContext } from '../FirebaseContext';

type UserType = { username: string; uid: string };

type UsersListProps = { roomID: string };
export default function UsersList({ roomID }: UsersListProps) {
  const firebase = useContext(FirebaseContext);

  const [users, setUsers] = useState<UserType[]>([]);

  useEffect(() => {
    firebase?.users(roomID).on('value', (snapshot) => {
      const newUsers: UserType[] = [];
      snapshot.forEach((user) => {
        const userObj = user.val();
        if (user.key) {
          newUsers.push({ uid: user.key, username: userObj.username });
        }
      });
      setUsers(newUsers);
    });

    return () => {
      firebase?.users(roomID).off('value');
    };
  }, [roomID, firebase]);

  return <div>{users && users.map((user) => <p key={user.uid}>{user.username}</p>)}</div>;
}
