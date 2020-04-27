import React, { useEffect, useState } from 'react';
import copyText from 'copy-text-to-clipboard';
import Button from '../components/Button';
import { useSelector } from '../redux/store';
import { useDispatch } from 'react-redux';
import { exitGame, joinGame, startGame, sendSelected, sendWinner, error, redirectAfterLogin } from '../redux/actions/gameActions';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Card from '../components/Card';
import { CardColor, CardType, ErrorType } from '../redux/actionTypes/gameTypes';
import { Redirect, useParams } from 'react-router-dom';
import Paper from '../components/Paper';
import { useTranslation } from 'react-i18next';

export default function Room() {
  const gameStarted = useSelector((state) => state.gameStarted);
  const round = useSelector((state) => state.round);
  const players = useSelector((state) => state.players);
  const isHost = useSelector((state) => state.isHost);
  const judge = useSelector((state) => state.judge);
  const uid = useSelector((state) => state.uid);
  const roomID = useSelector((state) => state.roomID);
  const logged = useSelector((state) => state.logged);
  const inRoom = useSelector((state) => state.inRoom);
  const selectionsSent = useSelector((state) => state.selectionsSent);
  const returnToGame = useSelector((state) => state.returnToGame);

  const { t } = useTranslation();

  const { roomID: roomIDParam } = useParams<{ roomID: string }>();

  const [cardsSelected, setCardsSelected] = useState<CardType[]>([]);

  const blackCard = useSelector((state) => state.blackCard);
  const whiteCards = useSelector((state) => state.cards);

  const dispatch = useDispatch();

  let cardsToSend = 0;
  const [isJudge, setIsJudge] = useState(false);
  let cardsToRender: CardType[][] = [];
  let checkable = false;
  let covered = false;

  useEffect(() => {
    setIsJudge(judge?.uid === uid);
  }, [judge, uid]);

  if (blackCard) {
    cardsToSend = (blackCard.message.match(/_/g) || []).length || 1;
  }

  if (isJudge) {
    players.forEach((player) => {
      if (player.cardSelected.length === 0) {
        if (player.uid !== uid) {
          covered = true;
        }
      } else {
        cardsToRender.push(player.cardSelected);
      }
    });
    //players.map((player) => player.cardSelected).flat(1);
    checkable = !selectionsSent && !covered && cardsSelected.length < cardsToSend;
  } else {
    if (selectionsSent) {
      cardsToRender.push(cardsSelected);
      checkable = false;
    } else {
      cardsToRender.push(whiteCards);
      checkable = cardsSelected.length < cardsToSend;
    }
  }

  // Join if roomIDParam
  useEffect(() => {
    if (!inRoom && logged && roomIDParam) {
      dispatch(joinGame(roomIDParam));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Exit game at unload component
  useEffect(() => {
    return () => {
      dispatch(exitGame());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setCardsSelected([]);
  }, [round]);

  const onStartGame = () => {
    dispatch(startGame());
  };

  const sendSelections = () => {
    if (isJudge) {
      const winner = players.find((player) =>
        player.cardSelected.find((card) => cardsSelected.find((cardSelected) => cardSelected.id === card.id))
      );
      if (winner) {
        dispatch(sendWinner(winner));
      }
    } else {
      dispatch(sendSelected(cardsSelected));
    }
  };

  const onSelectCard = (checked: boolean, card: CardType) => {
    if (!isJudge) {
      if (checked) {
        if (!cardsSelected.find((c) => c.id === card.id)) {
          setCardsSelected([...cardsSelected, card]);
        }
      } else {
        if (cardsSelected.find((c) => c.id === card.id)) {
          setCardsSelected(cardsSelected.filter((c) => c.id !== card.id));
        }
      }
    } else {
      if (!checked) {
        setCardsSelected([]);
      } else {
        // find player
        setCardsSelected(players.find((p) => p.cardSelected.find((c) => c.id === card.id))?.cardSelected || []);
      }
    }
  };

  const shareRoom = () => {
    try {
      copyText(window.location.href.toString());
      alert(t('Room url copied'));
    } catch (e) {}
  };

  if (!logged) {
    setTimeout(() => {
      // Prevent rendering conflict while redirect
      dispatch(error(t('LOGIN_BEFORE_ENTER'), t('Not authorized'), ErrorType.LOGIN));
    }, 0);
    dispatch(redirectAfterLogin(window.location.pathname));
    return <Redirect to="/login" />;
  }

  const shareButton = (
    <FontAwesomeIcon
      icon={['fas', 'share-square']}
      className="hover:opacity-75 cursor-pointer hover:border-blue-800 ml-2"
      size="sm"
      role="button"
      title="Share"
      onClick={shareRoom}
    />
  );

  if (returnToGame) {
    return <Redirect to={`/game`} />;
  }

  return (
    <div>
      <div className="w-full max-w-6xl mx-auto">
        <div className="flex flex-col-reverse sm:flex-row">
          <Paper className="mt-2 sm:mt-0 mr-0 sm:mr-2 sm:flex-1 flex flex-col">
            {gameStarted ? (
              <>
                <h1 className="text-2xl mb-4">{t('Round {{round}}', { round })}</h1>
                {isJudge ? (
                  <p className="italic text-gray-700">{!covered ? t('Choose the best cards') : t('Wait all players choose cards')}</p>
                ) : (
                  <p className="italic text-gray-700">{selectionsSent ? t('Wait the end of the round') : t('Choose the best cards')}</p>
                )}
                {blackCard && (
                  <div className="mt-4 flex flex-row justify-center">
                    <Card card={blackCard} color={CardColor.Black} />
                  </div>
                )}
              </>
            ) : isHost ? (
              <>
                <h1 className="text-2xl mb-4">{t('Room {{roomID}} created', { roomID })}</h1>
                <p className="font-semibold mb-4">
                  {t('Share the URL with your friends to join the game')}
                  {shareButton}
                </p>
                <Button className="self-start" disabled={players.length < 2} onClick={onStartGame}>
                  {t('Start game')}
                </Button>
              </>
            ) : (
              <>
                <h1 className="text-2xl mb-4">{t('Room {{roomID}}', { roomID })}</h1>
                <p className="font-semibold mb-4">
                  {t('Share the URL with your friends to join the game')}
                  {shareButton}
                </p>
                <p className="italic text-gray-700">{t('WAIT_FOR_HOST')}</p>
              </>
            )}
          </Paper>

          <Paper className="mt-2 sm:mt-0 mr-0 sm:mr-2 sm:flex-1">
            <h1 className="text-2xl mb-4">{t('Players')}</h1>
            <ul>
              {players &&
                players.map((user) => (
                  <li key={user.uid} className="flex flex-row justify-between items-center px-4">
                    <FontAwesomeIcon icon={['far', user.cardSelected.length > 0 ? 'dot-circle' : 'circle']} className="mr-4" />
                    <span className="flex-1">
                      {user.displayName}
                      {gameStarted ? ` (${user.points})` : ''}
                    </span>
                    {user.winner && <FontAwesomeIcon icon={['fas', 'trophy']} className="mr-2" />}
                    <span className="text-gray-600">{user.uid === judge?.uid ? 'Kazar' : 'Player'}</span>
                  </li>
                ))}
            </ul>
          </Paper>
        </div>
        {gameStarted && !covered && !selectionsSent && cardsToRender.length > 0 && (
          <div className="mt-8">
            {isJudge ? (
              <Button disabled={cardsSelected.length < cardsToSend} onClick={sendSelections}>
                {t('Choose winner')}
              </Button>
            ) : (
              <>
                <Button disabled={cardsSelected.length < cardsToSend} onClick={sendSelections}>
                  {t('Send selection')}
                </Button>
              </>
            )}
          </div>
        )}
      </div>
      {cardsToRender.length > 0 && (
        <div className="flex flex-row overflow-x-auto p-4 -mx-4">
          {cardsToRender.map((cardGroup, i) => (
            <div key={i} className="mr-8 flex">
              {cardGroup.map((card) => (
                <Card
                  key={card.id}
                  checkable={checkable}
                  onCheckChange={onSelectCard}
                  checkbox={!selectionsSent}
                  className="mt-4 mr-4 flex-shrink-0"
                  card={card}
                  color={CardColor.White}
                  checked={!!cardsSelected.find((c) => c.id === card.id)}
                  covered={covered}
                />
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
