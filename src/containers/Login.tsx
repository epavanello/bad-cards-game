import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useSelector } from '../redux/store';
import { useDispatch } from 'react-redux';
import { login, redirectDone, closeError, error, loginAsGuest } from '../redux/actions/gameActions';
import { FieldInputText } from '../components/FieldInput';
import Paper from '../components/Paper';
import { useTranslation } from 'react-i18next';
import Title from '../components/Title';
import { ErrorType } from '../redux/actionTypes/gameTypes';

export default function Login() {
  const logged = useSelector((state) => state.logged);
  const pathAfterLogin = useSelector((state) => state.pathAfterLogin);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');

  const dispatch = useDispatch();

  const { t } = useTranslation();

  useEffect(
    () => () => {
      if (pathAfterLogin) {
        dispatch(redirectDone());
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const doLogin = (e: React.FormEvent) => {
    dispatch(closeError());
    dispatch(login(email, password));
    e.preventDefault();
  };

  const doLoginAsGuest = () => {
    if (!displayName.trim()) {
      dispatch(error(t('Display name not valid'), 'Profile error', ErrorType.LOGIN));
    } else {
      dispatch(loginAsGuest(displayName));
    }
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
      <Paper>
        <Title>{t('Sign In')}</Title>
        <form onSubmit={doLogin}>
          <FieldInputText id="email" label={t('Email')} value={email} onChange={(value) => setEmail(value)} />
          <FieldInputText id="password" label={t('Password')} value={password} onChange={(value) => setPassword(value)} type="password" />
          <div className="flex items-center justify-between mt-8">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              {t('Sign In')}
            </button>
            <Link to="/signup" className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
              {t('Create an account')}
            </Link>
          </div>
        </form>
        <Title className="mt-8">{t('or')}</Title>
        <FieldInputText id="displayName" label={t('Display name')} value={displayName} onChange={(value) => setDisplayName(value)} />
        <div className="flex justify-center mt-8">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={doLoginAsGuest}
          >
            {t('Enter as a guest')}
          </button>
        </div>
      </Paper>
    </div>
  );
}
