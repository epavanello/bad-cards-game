import React, { useContext, useState, useEffect } from 'react';
import { FirebaseContext } from '../FirebaseContext';
import { Link, Redirect } from 'react-router-dom';
import { useSelector } from '../redux/store';
import { useDispatch } from 'react-redux';
import { login, redirectDone } from '../redux/actions/gameActions';

export default function Profile() {
  const firebase = useContext(FirebaseContext);
  const usernameFirebase = useSelector((state) => state.username);
  const [username, setUsername] = useState('');

  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="bg-white text-gray-800 shadow-md rounded p-4">
        <div className="flex justify-center">
          <div
            className=" sm:flex bg-gray-600 text-gray-100 rounded-full h-12 w-12 flex items-center justify-center cursor-default mr-4 cursor-pointer border-2 border-transparent hover:border-blue-600"
            title={username}
          >
            {username
              .split(' ')
              .map((w) => w.charAt(0).toUpperCase())
              .join(' ')}
          </div>
        </div>

        <form>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
