import React, { useContext } from 'react';
import { CardColor } from '../redux/actionTypes/gameTypes';
import classNames from 'classnames';
import { useSelector } from '../redux/store';
import { Link } from 'react-router-dom';
import { FirebaseContext } from '../FirebaseContext';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/actions/gameActions';

export default function Header() {
  const firebase = useContext(FirebaseContext);
  const dispatch = useDispatch();
  const userInfoLoaded = useSelector((state) => state.userInfoLoaded);
  const logged = useSelector((state) => state.logged);

  const onLogout = () => {
    if (firebase) {
      dispatch(logout(firebase));
    }
  };

  return (
    <div className="header">
      <h2 className="logo">Bad Cards</h2>
      <div className="spacer"></div>
      {userInfoLoaded &&
        (logged ? (
          <button className="small" onClick={onLogout}>
            Logout
          </button>
        ) : (
          <>
            <Link to="/login">
              <button className="small">Login</button>
            </Link>

            <Link to="/signup">
              <button className="small">Register</button>
            </Link>
          </>
        ))}
    </div>
  );
}
