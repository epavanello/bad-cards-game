import React from 'react';
import Card from '../components/Card';
import { CardColor } from '../redux/actionTypes/gameTypes';
import { useHistory } from 'react-router-dom';
import Button from '../components/Button';
import { useTranslation } from 'react-i18next';

export default function Home() {
  const { t } = useTranslation();
  const history = useHistory();

  return (
    <div>
      <header className="text-2xl text-center">
        <h1>{t('Welcome to the best game')}</h1>
        <h1>
          {t('based on')}
          <span className="font-display tracking-wider">{t('Black Humor')}</span>
        </h1>
      </header>
      <div className="flex flex-row justify-center mt-16">
        <Card
          style={{ transform: 'rotate(-15deg)' }}
          className="transform flex-shrink-0"
          card={{ id: 0, message: 'Sorry everyone,\nI just _' }}
          color={CardColor.Black}
        />
        <Card
          style={{ transform: 'rotate(20deg)' }}
          className="transform flex-shrink-0"
          card={{ id: 0, message: 'Grandma.' }}
          color={CardColor.White}
        />
      </div>
      <div className="text-center mt-16">
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
