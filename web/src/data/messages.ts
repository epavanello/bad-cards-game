export type MessageType = { black: string; whites: string[] };
let languageMessages = new Map<string, MessageType[]>();

languageMessages.set('en', [
  {
    black: `Do not fuck with me!
I am literally _ right now.`,
    whites: [`Seeing things from Hitler's perspective.`],
  },
  {
    black: `This is the prime of my life.
I'm young, hot, and full of _`,
    whites: [`Crippling debt.`],
  },
  {
    black: `For my next trick,
i will pull _ 
out of _.`,
    whites: [`Meatloaf, the food.`, `Meatloaf, the man.`],
  },
  {
    black: `Today on Mythbusters, we find out how long _ can withstand _.`,
    whites: [`A box that is conscious and wishes it weren't a box`, `Being a motherfucking box`],
  },
  {
    black: `I'm not like the rest of you.
I'm too rich and busy for _.`,
    whites: [`Consent.`],
  },
]);

languageMessages.set('it', [
  {
    black: `Cosa ti permette di portarti a letto una ragazza con assoluta certezza?`,
    whites: [`Andare a Lourdes.`],
  },
  {
    black: `Alza la cornetta, _ ti aspetta!`,
    whites: [`Salvini`],
  },
  {
    black: `Hai problemi con _?
Prova con _!`,
    whites: [`Il salto della quaglia`, `Harakiri`],
  },
  {
    black: `Il premio della critica per _ va a _.`,
    whites: [`Inquietante musica di sottofondo`, `Justin Bieber`],
  },
]);

export const getRandomMessage = (language: string): MessageType => {
  const messages = languageMessages.get(language) || languageMessages.get('en');
  if (messages) {
    return messages[Math.floor(Math.random() * messages.length)];
  }
  return { black: '', whites: [] };
};
