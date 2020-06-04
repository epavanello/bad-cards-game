import React from 'react';
import Button from '../components/Button';
import Paper from '../components/Paper';
import { useTranslation } from 'react-i18next';
import Title from '../components/Title';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Social() {
  const { t } = useTranslation();

  return (
    <div className="w-full max-w-xl mx-auto">
      <Paper>
        <Title className="mb-4">{t('Social')}</Title>
        <div className="mb-4 flex items-center flex-col">
          <p className="font-bold mb-2">Follow us on</p>
          <a href="https://www.instagram.com/bad_cards_game/" target="_blank" rel="noopener noreferrer">
            <Button>
              <FontAwesomeIcon icon={['fab', 'instagram']} size="lg" className="mr-4" />
              Instagram
            </Button>
          </a>
        </div>
        <p className="text-center">
          <span className="italic">{t('Send a suggestion or report a bug at')}: </span>
          <a className="font-bold hover:underline" href="mailto:badcardsgame@gmail.com">
            badcardsgame@gmail.com
          </a>
        </p>
      </Paper>
    </div>
  );
}
