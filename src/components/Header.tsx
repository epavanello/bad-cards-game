import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from '../redux/store';
import { FirebaseContext } from '../FirebaseContext';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/actions/gameActions';

import devilLogo from '../assets/devil.svg';

import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ProfileLogo } from './ProfileLogo';
import Button from './Button';
import { useTranslation } from 'react-i18next';

export default function Header() {
  const firebase = useContext(FirebaseContext);
  const dispatch = useDispatch();

  const userInfoLoaded = useSelector((state) => state.userInfoLoaded);
  const logged = useSelector((state) => state.logged);

  const [headerClosed, setHeaderClosed] = useState(true);

  const { t } = useTranslation();

  const onLogout = async () => {
    if (firebase) {
      dispatch(await logout(firebase));
    }
  };

  return (
    <nav className="flex-shrink-0 flex flex-row justify-between sm:items-center flex-wrap bg-gray-900 px-6 py-6">
      <Link to="/home">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <img src={devilLogo} className="fill-current h-8 w-8 mr-2" alt="Bad Cards logo" />
          <span className="font-semibold text-xl tracking-tight font-display tracking-wider">Bad Cards</span>
        </div>
      </Link>
      <div className="block sm:hidden">
        <button
          onClick={() => setHeaderClosed(!headerClosed)}
          className="flex items-center px-3 py-2 border rounded text-blue-200 border-blue-400 hover:text-white hover:border-white"
        >
          {headerClosed ? (
            <FontAwesomeIcon size="xs" icon={['fas', 'bars']} title="Menu" />
          ) : (
            <FontAwesomeIcon size="xs" icon={['fas', 'times']} title="Menu" />
          )}
        </button>
      </div>
      <div className={classNames('w-full block flex-grow sm:flex sm:items-center sm:w-auto', { hidden: headerClosed })}>
        <div className="text-sm sm:flex-grow">
          <Link to="/home" className="block mt-4 sm:inline-block sm:mt-0 text-blue-200 hover:text-white mr-4">
            {t('Home')}
          </Link>
          {logged && (
            <>
              <Link to="/game" className="block mt-4 sm:inline-block sm:mt-0 text-blue-200 hover:text-white mr-4">
                {t('Game')}
              </Link>
              <Link to="/social" className="block mt-4 sm:inline-block sm:mt-0 text-blue-200 hover:text-white">
                {t('Social')}
              </Link>
              <Link to="/profile" className="block mt-4 sm:hidden text-blue-200 hover:text-white mr-4">
                {t('Profile')}
              </Link>
            </>
          )}
        </div>
        {userInfoLoaded && (
          <div className="flex flex-col sm:flex-row sm:items-center">
            {logged ? (
              <>
                <Link to="/profile" className="mr-4 hidden sm:flex">
                  <ProfileLogo />
                </Link>
                <Button type="OUTLINE" size="SMALL" className="block mt-4 sm:inline-block sm:mt-0" onClick={onLogout}>
                  {t('Logout')}
                </Button>
              </>
            ) : (
              <>
                <Link to="/login" className="sm:mr-4 block mt-4 sm:mt-0">
                  <Button type="OUTLINE" size="SMALL" className="block w-full sm:w-auto">
                    {t('Login')}
                  </Button>
                </Link>
                <Link to="/signup" className="block mt-4 sm:mt-0">
                  <Button type="OUTLINE" size="SMALL" className="block w-full sm:w-auto">
                    {t('Register')}
                  </Button>
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
