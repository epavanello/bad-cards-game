import i18n from 'i18next';
import { initReactI18next, useTranslation } from 'react-i18next';

import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

export enum TKey {
  Header,
  Home,
  Game,
  PackEditor,
  Login,
  Logout,
  Profile,
  Welcome1,
  Welcome2,
  Welcome3,
  StartNow,
  Footer,
  Rights,
  UpdateProfile,
}

interface Translation {
  [TKey.Header]: {
    [TKey.Home]: string;
    [TKey.Game]: string;
    [TKey.PackEditor]: string;
    [TKey.Login]: string;
    [TKey.Logout]: string;
    [TKey.Profile]: string;
  };
  [TKey.Home]: {
    [TKey.Welcome1]: string;
    [TKey.Welcome2]: string;
    [TKey.Welcome3]: string;
    [TKey.StartNow]: string;
  };
  [TKey.Profile]: {
    [TKey.UpdateProfile]: string;
  };
  [TKey.Footer]: {
    [TKey.Rights]: string;
  };
}
type Translations = { [key: string]: { translation: Translation } };

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
};

export const Translate = (key: TKey) => i18n.t(TKey[key]);

export function useEnforcedTranslation() {
  const { t } = useTranslation();
  return (...tkeys: TKey[]) => t(tkeys.join('.'));
}

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
