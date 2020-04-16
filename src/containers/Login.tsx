import React, { useContext, useState } from 'react';
import { FirebaseContext } from '../FirebaseContext';
import { Link, useHistory, Redirect } from 'react-router-dom';
import { useSelector } from '../redux/store';

export default function Login() {
  const firebase = useContext(FirebaseContext);

  const logged = useSelector((state) => state.logged);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const history = useHistory();

  const doLogin = () => {
    setError('');
    firebase
      ?.doSignInWithEmailAndPassword(email, password)
      .then(() => {
        history.push('/home');
      })
      .catch((error) => {
        setError(error.toString());
      });
  };

  if(logged) {
    return <Redirect to="/home" />
  }

  return (
    <div className="w-full max-w-xs mx-auto">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="text-red-500 text-xs italic">{error}</p>}
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={doLogin}
          >
            Sign In
          </button>
          <Link to="/restorePassword" className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
            Forgot Password?
          </Link>
        </div>
      </form>
    </div>
  );
}
