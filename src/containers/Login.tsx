import React, { useContext, useState } from 'react';
import { FirebaseContext } from '../FirebaseContext';

export default function Login() {
  const firebase = useContext(FirebaseContext);

  const [username, setUsername] = useState('Mario');
  const [email, setEmail] = useState('abc@def.gh');
  const [password, setPassword] = useState('123456');
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
    <div>
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={doLogin}>Login</button>
      <button onClick={doSignup}>Register</button>
      {error && <p>{error}</p>}
    </div>
  );
}
