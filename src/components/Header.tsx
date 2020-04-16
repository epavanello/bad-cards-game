import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from '../redux/store';
import { FirebaseContext } from '../FirebaseContext';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/actions/gameActions';

import devilLogo from '../assets/devil.svg';

import HeaderButton from './HeaderButton';
import classNames from 'classnames';

export default function Header() {
  const firebase = useContext(FirebaseContext);
  const dispatch = useDispatch();

  const username = useSelector((state) => state.username);
  const userInfoLoaded = useSelector((state) => state.userInfoLoaded);
  const logged = useSelector((state) => state.logged);

  const [toggleHeader, setToggleHeader] = useState(false);

  const onLogout = async () => {
    if (firebase) {
      dispatch(await logout(firebase));
    }
  };

  return (
    <nav className="flex items-center justify-between flex-wrap bg-gray-900 px-6 py-6">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <img src={devilLogo} className="fill-current h-8 w-8 mr-2" alt="Bad Cards logo" />
        <span className="font-semibold text-xl tracking-tight">Bad Cards</span>
      </div>
      <div className="block sm:hidden">
        <button
          onClick={() => setToggleHeader(!toggleHeader)}
          className="flex items-center px-3 py-2 border rounded text-blue-200 border-blue-400 hover:text-white hover:border-white"
        >
          <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
      <div className={classNames('w-full block flex-grow sm:flex sm:items-center sm:w-auto', { hidden: toggleHeader })}>
        <div className="text-sm sm:flex-grow">
          <Link to="/home" className="block mt-4 sm:inline-block sm:mt-0 text-blue-200 hover:text-white mr-4">
            Home
          </Link>
          {logged && (
            <>
              <Link to="/game" className="block mt-4 sm:inline-block sm:mt-0 text-blue-200 hover:text-white mr-4">
                Game
              </Link>
              <Link to="/packEditor" className="block mt-4 sm:inline-block sm:mt-0 text-blue-200 hover:text-white">
                Pack editor
              </Link>
            </>
          )}
        </div>
        {userInfoLoaded && (
          <div className="flex flex-col sm:flex-row items-center">
            {logged ? (
              <>
                <div
                  className="hidden -my-2 sm:flex bg-gray-600 text-gray-100 rounded-full h-12 w-12 flex items-center justify-center cursor-default mr-4"
                  title={username}
                >
                  {username
                    .split(' ')
                    .map((w) => w.charAt(0).toUpperCase())
                    .join(' ')}
                </div>
                <HeaderButton className="block mt-4 sm:inline-block sm:mt-0" onClick={onLogout}>
                  Logout
                </HeaderButton>
              </>
            ) : (
              <>
                <Link to="/login" className="sm:mr-4 block mt-4 sm:mt-0">
                  <HeaderButton className="block w-full sm:w-auto">Login</HeaderButton>
                </Link>
                <Link to="/signup" className="block mt-4 sm:mt-0">
                  <HeaderButton className="block w-full sm:w-auto">Register</HeaderButton>
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
