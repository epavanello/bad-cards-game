import React, { useState } from 'react';
import Card from '../components/Card';
import { CardColor } from '../redux/actionTypes/gameTypes';
import { useHistory } from 'react-router-dom';
import Button from '../components/Button';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';

export default function Home() {
  const { t } = useTranslation();
  const history = useHistory();
  const [hover, setHover] = useState(false);
  return (
    <div>
      <header className="text-2xl text-center">
        <h1>{t('Welcome to the best game')}</h1>
        <h1>
          {t('based on')} <span className="font-display tracking-wider">{t('Black Humor')}</span>
        </h1>
      </header>
      <div className="flex flex-row justify-center mt-16">
        <div className="group flex flex-row flex-no-wrap relative" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
          <Card
            className="transition-all duration-200 transform flex-shrink-0 -rotate-15 group-hover:-rotate-30"
            card={{ id: 0, message: t('CARD_1') }}
            color={CardColor.Black}
          />
          <Card
            className="transition-all duration-200 transform flex-shrink-0 rotate-15 rotate-0"
            card={{ id: 0, message: t('CARD_2') }}
            color={CardColor.White}
            covered={!hover}
          />
          <FontAwesomeIcon
            icon={['fas', 'hand-point-right']}
            className={classNames('absolute transform -rotate-90 text-gray-100 origin-center -ml-8 -mt-8 transition-opacity duration-200', {
              'opacity-0': hover,
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
