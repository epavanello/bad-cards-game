import React, { useContext, useState } from 'react';
import { FirebaseContext } from '../FirebaseContext';

export default function Signup() {
  const firebase = useContext(FirebaseContext);

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const doLogin = () => {
    setError('');
    firebase?.doSignInWithEmailAndPassword(email, password).catch((error) => {
      setError(error.toString());
    });
  };
  const doSignup = () => {
    setError('');
    firebase?.doCreateUserWithEmailAndPassword(email, password, username).catch((error) => {
      setError(error.toString());
    });
  };

  return (
    <div className="vertical">
      <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={doSignup}>Register</button>
      {error && <p>{error}</p>}
    </div>
  );
}
