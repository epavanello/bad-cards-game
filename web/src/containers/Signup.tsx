import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useSelector } from '../redux/store';
import { useDispatch } from 'react-redux';
import { signup, closeError } from '../redux/actions/gameActions';
import { FieldInputText } from '../components/FieldInput';
import Paper from '../components/Paper';
import { useTranslation } from 'react-i18next';
import Title from '../components/Title';

export default function Signup() {
  const logged = useSelector((state) => state.logged);
  const pathAfterLogin = useSelector((state) => state.pathAfterLogin);

  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const { t } = useTranslation();

  const doSignup = (e: React.FormEvent) => {
    dispatch(closeError());
    dispatch(signup(email, password, displayName));
    e.preventDefault();
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
        <Title>{t('Sign up')}</Title>
        <form onSubmit={doSignup}>
          <FieldInputText id="displayName" label={t('Display name')} value={displayName} onChange={(value) => setDisplayName(value)} />
          <FieldInputText id="email" label={t('Email')} value={email} onChange={(value) => setEmail(value)} />
          <FieldInputText id="password" label={t('Password')} value={password} onChange={(value) => setPassword(value)} type="password" />

          <div className="flex items-center justify-between mt-8">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              {t('Sign up')}
            </button>
            <Link to="/login" className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
              {t('Already registered?')}
            </Link>
          </div>
        </form>
      </Paper>
    </div>
  );
}
