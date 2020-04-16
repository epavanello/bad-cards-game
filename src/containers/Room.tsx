import React, { useContext, useEffect, useState } from 'react';
import PrimaryButton from '../components/PrimaryButton';
import { FirebaseContext } from '../FirebaseContext';
import { useSelector } from '../redux/store';
import { useDispatch } from 'react-redux';
import { exitGame } from '../redux/actions/gameActions';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Card from '../components/Card';
import { CardColor, CardType } from '../redux/actionTypes/gameTypes';

export default function Room() {
  const firebase = useContext(FirebaseContext);
  const gameStarted = useSelector((state) => state.gameStarted);
  const round = useSelector((state) => state.round);
  const players = useSelector((state) => state.players);
  const isHost = useSelector((state) => state.isHost);
  const judge = useSelector((state) => state.judge);
  const uid = useSelector((state) => state.uid);
  const roomID = useSelector((state) => state.roomID);

  const [cardSelected, setCardSelected] = useState<CardType[]>([]);

  const isJudge = judge?.uid === uid;

  const blackCard = useSelector((state) => state.blackCard);
  const whiteCards = useSelector((state) => state.cards);

  const dispatch = useDispatch();

  const startGame = () => {
    if (isHost) {
      firebase?.startGame();
    }
  };

  const onSelectCard = (checked: boolean, card: CardType) => {
    if (checked) {
      if (!cardSelected.find((c) => c.id === card.id)) {
        setCardSelected([...cardSelected, card]);
      }
    } else {
      if (cardSelected.find((c) => c.id === card.id)) {
        setCardSelected(cardSelected.filter((c) => c.id !== card.id));
      }
    }
  };

  useEffect(() => {
    return () => {
      if (firebase) {
        dispatch(exitGame(firebase));
      }
    };
  }, []);

  return (
    <div>
      <div className="w-full max-w-6xl mx-auto">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white text-gray-800 shadow-md rounded p-8 flex flex-col">
            {gameStarted ? (
              <>
                <h1 className="text-2xl mb-4">Round {round}</h1>
                {isJudge ? (
                  <p className="italic text-gray-700">Wait all players choose cards</p>
                ) : (
                  <p className="italic text-gray-700">Choose the best cards</p>
                )}
                {blackCard && (
                  <div className="mt-4 flex flex-row justify-center">
                    <Card card={blackCard} color={CardColor.Black} />
                  </div>
                )}
              </>
            ) : isHost ? (
              <>
                <h1 className="text-2xl mb-4">Room {roomID} created</h1>
                <p className="italic text-gray-700 mb-4">Start the game when all players are ready</p>
                <PrimaryButton className="self-start" disabled={players.length < 2} onClick={startGame}>
                  Start game
                </PrimaryButton>
              </>
            ) : (
              <>
                <h1 className="text-2xl mb-4">Starting...</h1>
                <p className="italic text-gray-700">Wait the host start the game</p>
              </>
            )}
          </div>

          <div className="bg-white text-gray-800 shadow-md rounded p-8">
            <h1 className="text-2xl mb-4">Players</h1>
            <ul>
              {players &&
                players.map((user) => (
                  <li key={user.uid} className="flex flex-row justify-between items-center px-4">
                    <FontAwesomeIcon icon={['far', 'circle']} className="mr-4" />
                    <span className="flex-1">
                      {user.username}
                      {gameStarted ? ` (${user.points})` : ''}
                    </span>
                    <span className="text-gray-600">{user.uid === judge?.uid ? 'Kazar' : 'Player'}</span>
                  </li>
                ))}
            </ul>
          </div>
        </div>
        {whiteCards.length > 0 && (
          <div className="mt-8">
            <p className="mb-4">Card choosen: ({cardSelected.length})</p>
            <PrimaryButton disabled={cardSelected.length === 0}>Send selection/s</PrimaryButton>
          </div>
        )}
      </div>
      <div className="flex flex-row overflow-x-auto p-4">
        {whiteCards.map((card) => (
          <Card
            key={card.id}
            checkable
            onCheckChange={onSelectCard}
            className="mt-4 mr-4 flex-shrink-0"
            card={card}
            color={CardColor.White}
          />
        ))}
      </div>
    </div>
  );
}
