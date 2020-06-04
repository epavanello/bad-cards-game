import React, { useState } from 'react';
import Card from '../components/Card';
import { CardColor } from '../redux/actionTypes/gameTypes';
import { useHistory } from 'react-router-dom';
import Button from '../components/Button';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import html2canvas from 'html2canvas';

export default function Home() {
  const { t } = useTranslation();
  const history = useHistory();
  const [hover, setHover] = useState(false);
  const [edit, setEdit] = useState(false);
  const [message1, setMessage1] = useState<string>(t('CARD_1'));
  const [message2, setMessage2] = useState<string>(t('CARD_2'));
  const [screenshot, setScreenshot] = useState(false);

  const takeScreenshot = () => {
    if (!screenshot) {
      setScreenshot(true);
      setTimeout(() => {
        html2canvas(document.body, {
          ignoreElements: (node) => {
            return node.classList.contains('ignore-screenshot');
          },
        })
          .then(function (canvas) {
            document.body.appendChild(canvas);
            const download = document.createElement('a');
            download.href = canvas.toDataURL('image/png');
            download.download = 'Bad Cards.png';
            download.click();
            setTimeout(() => {
              setScreenshot(false);
            }, 500);
          })
          .catch(console.error);
      }, 500);
    }
  };

  return (
    <div>
      <header className="text-2xl text-center">
        <h1>{t('Welcome to the best game')}</h1>
        <h1>
          {t('based on')} <span className="font-display tracking-wider">{t('Black Humor')}</span>
        </h1>
        <FontAwesomeIcon className="cursor-pointer" size="sm" icon={['far', edit ? 'save' : 'edit']} onClick={() => setEdit(!edit)} />
        <FontAwesomeIcon className="cursor-pointer ml-4" size="sm" icon={['fas', 'camera']} onClick={() => takeScreenshot()} />
      </header>
      <div className="flex flex-row justify-center mt-12">
        <div className="group flex flex-row flex-no-wrap relative" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
          <Card
            className={classNames('transition-all duration-200 transform flex-shrink-0', {
              '-rotate-15 group-hover:-rotate-30': !edit && !screenshot,
            })}
            card={{ id: 0, message: message1 }}
            color={CardColor.Black}
            editable={edit && !screenshot}
            onEdit={setMessage1}
          />
          <Card
            className={classNames('transition-all duration-200 transform flex-shrink-0 ml-4', { 'rotate-15': !edit && !screenshot })}
            card={{ id: 0, message: message2 }}
            color={CardColor.White}
            covered={!hover && !edit && !screenshot}
            editable={edit && !screenshot}
            onEdit={setMessage2}
          />
          <FontAwesomeIcon
            icon={['fas', 'hand-point-right']}
            className={classNames('absolute transform -rotate-90 text-gray-100 origin-center -ml-8 -mt-8 transition-opacity duration-200', {
              'opacity-0': hover || edit || screenshot,
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
