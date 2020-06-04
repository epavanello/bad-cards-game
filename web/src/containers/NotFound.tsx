import React from 'react';
import Paper from '../components/Paper';
import Title from '../components/Title';
import { useTranslation } from 'react-i18next';

export default function NotFound() {
  const { t } = useTranslation();

  return (
    <div className="w-full max-w-xl mx-auto">
      <Paper>
        <Title error>{t('Page not found')}</Title>
      </Paper>
    </div>
  );
}
