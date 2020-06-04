import * as baseEn from 'cards/locales/en/base.json';
import * as baseIt from 'cards/locales/it/base.json';

export interface Pack {
  id: number;
  blackCards: { message: string; id: number }[];
  whiteCards: { message: string; id: number }[];
}

export function getPacks(lang: string): Pack[] {
  switch (lang) {
    case 'en':
      return [
        {
          id: 1,
          blackCards: baseEn.blackCards.map((message, i) => ({ message, id: i })),
          whiteCards: baseEn.whiteCards.map((message, i) => ({ message, id: i })),
        },
      ];
    case 'it':
      return [
        {
          id: 1,
          blackCards: baseIt.blackCards.map((message, i) => ({ message, id: i })),
          whiteCards: baseIt.whiteCards.map((message, i) => ({ message, id: i })),
        },
      ];
  }
  throw 'Lang not found';
}

export function getPack(lang: string, id: number): Pack {
  return getPacks(lang).find(p => p.id === id);
}
