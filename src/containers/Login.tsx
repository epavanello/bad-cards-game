import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useSelector } from '../redux/store';
import { useDispatch } from 'react-redux';
import { login, redirectDone, closeError } from '../redux/actions/gameActions';
import { FieldInput } from '../components/FieldInput';

export default function Login() {
  const logged = useSelector((state) => state.logged);
  const pathAfterLogin = useSelector((state) => state.pathAfterLogin);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  useEffect(
    () => () => {
      if (pathAfterLogin) {
        dispatch(redirectDone());
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const doLogin = async () => {
    dispatch(closeError());
    dispatch(login(email, password));
  };

  if (logged) {
    if (pathAfterLogin) {
      return <Redirect to={pathAfterLogin} />;
    } else {
      return <Redirect to="/game" />;
    }
  }

  return (
    <div className="w-full max-w-sm mx-auto">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 z-10">
        <FieldInput id="email" label="Email" value={email} onChange={(value) => setEmail(value)} />
        <FieldInput id="password" label="Password" value={password} onChange={(value) => setPassword(value)} type="password" />
        <div className="flex items-center justify-between mt-8">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={doLogin}
          >
            Sign In
          </button>
          <Link to="/signup" className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
            Create an account
          </Link>
        </div>
      </form>
    </div>
  );
}
