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
  const [edit, setEdit] = useState(false);
  const [message1, setMessage1] = useState<string>(t('CARD_1'));
  const [message2, setMessage2] = useState<string>(t('CARD_2'));
  return (
    <div>
      <header className="text-2xl text-center">
        <h1>{t('Welcome to the best game')}</h1>
        <h1>
          {t('based on')} <span className="font-display tracking-wider">{t('Black Humor')}</span>
        </h1>
        <FontAwesomeIcon className="cursor-pointer ml-4" size="sm" icon={['far', edit ? 'save' : 'edit']} onClick={() => setEdit(!edit)} />
      </header>
      <div className="flex flex-row justify-center mt-16">
        <div className="group flex flex-row flex-no-wrap relative" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
          <Card
            className={classNames('transition-all duration-200 transform flex-shrink-0', {
              '-rotate-15 group-hover:-rotate-30': !edit,
            })}
            card={{ id: 0, message: message1 }}
            color={CardColor.Black}
            editable={edit}
            onEdit={setMessage1}
          />
          <Card
            className={classNames('transition-all duration-200 transform flex-shrink-0', { 'rotate-15': !edit })}
            card={{ id: 0, message: message2 }}
            color={CardColor.White}
            covered={!hover && !edit}
            editable={edit}
            onEdit={setMessage2}
          />
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
