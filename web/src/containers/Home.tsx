import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import { CardColor } from '../redux/actionTypes/gameTypes';
import { useHistory } from 'react-router-dom';
import Button from '../components/Button';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { getRandomMessage } from '../data/messages';

export default function Home() {
  const { t, i18n } = useTranslation();
  const history = useHistory();
  const [hover, setHover] = useState(false);
  const [edit, setEdit] = useState(false);
  const [blackMessage, setBlackMessage] = useState<string>('');

  const [whiteMessages, setWhiteMessages] = useState<string[]>([]);

  const randomizeMessage = () => {
    const randomMessage = getRandomMessage(i18n.language);
    setBlackMessage(randomMessage.black);
    setWhiteMessages(randomMessage.whites);
  };

  useEffect(() => {
    randomizeMessage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateWhiteMessages = (newMessage: string, index: number) => {
    setWhiteMessages([...whiteMessages].map((currentMessage, currentIndex) => (index === currentIndex ? newMessage : currentMessage)));
  };

  const addEmptyMessage = () => {
    setWhiteMessages([...whiteMessages, '']);
  };

  const removeLastMessage = () => {
    setWhiteMessages([...whiteMessages].slice(0, -1));
  };

  const getWhiteCardRotation = (index: number) => {
    return (90 / (whiteMessages.length + 1)) * (index + 1) - 45;
  };

  return (
    <div>
      <header className="text-2xl text-center">
        <h1>{t('Welcome to the best game')}</h1>
        <h1>
          {t('based on')} <span className="font-display tracking-wider">{t('Black Humor')}</span>
        </h1>
        <FontAwesomeIcon className="cursor-pointer" size="sm" icon={['far', edit ? 'save' : 'edit']} onClick={() => setEdit(!edit)} />
        <FontAwesomeIcon className="cursor-pointer ml-4" size="sm" icon={['fas', 'random']} onClick={() => randomizeMessage()} />
        {edit && <FontAwesomeIcon className="cursor-pointer ml-4" size="sm" icon={['fas', 'plus']} onClick={addEmptyMessage} />}
        {edit && (
          <FontAwesomeIcon
            className={classNames('cursor-pointer ml-4', { 'text-gray-600': whiteMessages.length === 1 })}
            size="sm"
            icon={['fas', 'minus']}
            onClick={() => {
              whiteMessages.length > 1 && removeLastMessage();
            }}
          />
        )}
        {/* <FontAwesomeIcon className="cursor-pointer ml-4" size="sm" icon={['fas', 'camera']} onClick={() => takeScreenshot()} /> */}
      </header>
      <div className="flex flex-row justify-center mt-12">
        <div className="flex flex-row flex-no-wrap relative" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
          <Card
            className={classNames('transition-all duration-200 transform flex-shrink-0', {
              '-rotate-15': !edit && !hover,
              'rotate-0 mr-8': hover && !edit,
              'rotate-0': edit,
            })}
            style={{ transformOrigin: '50% 100%' }}
            card={{ id: 0, message: blackMessage }}
            color={CardColor.Black}
            editable={edit}
            onEdit={setBlackMessage}
          />
          <div className="relative flex flex-row">
            {whiteMessages.map((whiteMessage, index) => (
              <Card
                key={index}
                className={classNames(
                  'transition-all duration-200 transform flex-shrink-0',
                  { '-ml-32': !edit && index > 0 },
                  { 'ml-4': edit },
                )}
                style={{
                  ...(!edit ? { transform: `rotate(${getWhiteCardRotation(index)}deg)` } : {}),
                  transformOrigin: '50% 100%',
                  //...(hover && !edit ? { marginLeft: 80 * index } : {}),
                }}
                card={{ id: 0, message: whiteMessage }}
                color={CardColor.White}
                covered={!hover && !edit}
                editable={edit}
                onEdit={(newMessage) => {
                  updateWhiteMessages(newMessage, index);
                }}
              />
            ))}
          </div>
          <FontAwesomeIcon
            icon={['fas', 'hand-point-right']}
            className={classNames('absolute transform -rotate-90 text-gray-100 origin-center -ml-8 -mt-8 transition-opacity duration-200', {
              'opacity-0': hover || edit,
            })}
            style={{ top: '50%', left: '50%' }}
            size="4x"
          />
        </div>
      </div>
      <p className="mt-12 italic text-center">{t('Enter now, create a room and play with your friends')}</p>
      <div className="text-center mt-8">
        <Button
          size="SMALL"
          type="OUTLINE"
          onClick={() => {
            history.push('/game');
          }}
        >
          {t('Start now')}
        </Button>
      </div>
    </div>
  );
}
