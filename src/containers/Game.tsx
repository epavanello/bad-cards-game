import React, { useState } from 'react';

import { useSelector } from '../redux/store';
import { useDispatch } from 'react-redux';
import { joinGame, hostGame, redirectAfterLogin, JoiningExisting, error } from '../redux/actions/gameActions';
import { Redirect } from 'react-router-dom';
import Button from '../components/Button';
import { FieldInputText } from '../components/FieldInput';
import Paper from '../components/Paper';
import Title from '../components/Title';
import { useTranslation } from 'react-i18next';
import { ErrorType } from '../redux/actionTypes/gameTypes';

export default function Game() {
  const [manualRoomID, setManualRoomID] = useState('');
  const roomID = useSelector((state) => state.roomID);
  const inRoom = useSelector((state) => state.inRoom);
  const logged = useSelector((state) => state.logged);
  const returnToGame = useSelector((state) => state.returnToGame);
  const dispatch = useDispatch();

  const { t, i18n } = useTranslation();

  const onJoinRoom = async () => {
    dispatch(joinGame(manualRoomID));
  };

  const onHostGame = () => {
    dispatch(hostGame(i18n.language));
  };

  const onJoinExistingRoom = () => {
    dispatch(JoiningExisting());
  };

  if (!logged) {
    dispatch(redirectAfterLogin(window.location.pathname));
    dispatch(error(t('Before starting, log in or log in as a guest'), t('Login'), ErrorType.LOGIN));
    return <Redirect to={`/login`} />;
  }

  if (inRoom && !returnToGame) {
    return <Redirect to={`/room/${roomID}`} />;
  }

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col-reverse sm:flex-col">
      <Paper>
        <div className="grid grid-cols-1 sm:grid-cols-2">
          <div className="pb-8 border-b sm:pr-8 sm:border-r sm:pb-0 sm:border-b-0">
            <Title className="mb-4">{t('Join a game')}</Title>
            <FieldInputText id="roomID" label={t('Room ID')} value={manualRoomID} onChange={(val) => setManualRoomID(val)} />
            <div className="flex justify-center mt-8">
              <Button onClick={onJoinRoom}>{t('Join')}</Button>
            </div>
          </div>
          <div className="pt-8 sm:pt-0 sm:pl-8 flex flex-col justify-center">
            <Title>or</Title>
            <Title className="mb-4">{t('Join an existing room')}</Title>
            <div className="flex justify-center">
              <Button onClick={onJoinExistingRoom}>{t('Enter')}</Button>
            </div>
          </div>
        </div>
      </Paper>
      <Paper className="mb-4 sm:mb-0 sm:mt-8 max-w-sm mx-auto w-full">
        <Title className="mb-4">{t('Host a game')}</Title>
        <div className="flex-1 flex flex-row align-bottom justify-center items-end">
          <Button onClick={onHostGame}>{t('Host')}</Button>
        </div>
      </Paper>
    </div>
  );
}
