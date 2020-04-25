import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {};

/*
const resources: Translations = {
  en: {
    translation: {
      [TKey.Header]: {
        [TKey.Home]: 'Home',
        [TKey.Game]: 'Game',
        [TKey.PackEditor]: 'Pack editor',
        [TKey.Login]: 'Login',
        [TKey.Logout]: 'Logout',
        [TKey.Profile]: 'Profile',
      },
      [TKey.Home]: {
        [TKey.Welcome1]: 'Welcome to the best game',
        [TKey.Welcome2]: 'based on ',
        [TKey.Welcome3]: 'Black Humor',
        [TKey.StartNow]: 'Start now',
      },
      [TKey.Profile]: {
        [TKey.UpdateProfile]: 'Update profile',
      },
      [TKey.Footer]: {
        [TKey.Rights]: 'All rights reserved.',
      },
    },
  },
  it: {
    translation: {
      [TKey.Header]: {
        [TKey.Home]: 'Home',
        [TKey.Game]: 'Gioca',
        [TKey.PackEditor]: 'Pack editor',
        [TKey.Login]: 'Accedi',
        [TKey.Logout]: 'Esci',
        [TKey.Profile]: 'Profilo',
      },
      [TKey.Home]: {
        [TKey.Welcome1]: 'Benvenuto nel miglior gioco',
        [TKey.Welcome2]: 'Basato sul ',
        [TKey.Welcome3]: 'Black Humor',
        [TKey.StartNow]: 'Gioca ora',
      },
      [TKey.Profile]: {
        [TKey.UpdateProfile]: 'Aggiorna profilo',
      },
      [TKey.Footer]: {
        [TKey.Rights]: 'Tutti i diritti riservati.',
      },
    },
  },
};*/
/*
export const Translate = (key: TKey) => i18n.t(TKey[key]);

export function useEnforcedTranslation() {
  const { t } = useTranslation();
  return (...tkeys: TKey[]) => t(tkeys.join('.'));
}*/

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: true,

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    react: {
      useSuspense: false,
      wait: false,
    },
  });

export default i18n;
