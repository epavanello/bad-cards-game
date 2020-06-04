import React from 'react';
import Paper from '../components/Paper';
import { useTranslation } from 'react-i18next';
import Title from '../components/Title';

const H2 = ({ children }: { children: React.ReactNode }) => <h2 className="text-lg font-extrabold mt-5">{children}</h2>;
const P = ({ children }: { children: React.ReactNode }) => <p className="mb-3 leading-tight">{children}</p>;

export default function About() {
  const { t } = useTranslation();

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Paper>
        <Title>{t('About')}</Title>
        <H2>What is it</H2>
        <P>
          <i>"Bad Cards"</i> is a online game inspired to <b>Cards Against Humanity</b>
        </P>
        <H2>Rules</H2>
        <P>When the game starts, a player becomes the judge of the current round and the other players are dealt 10 cards.</P>
        <P>A black card is chosen.</P>
        <P>
          Each player answer the question filling in the blanks by each choosing the white cards. The Czar receives them face down until
          each player has completed his turn.
        </P>
        <P>The Card Czar then picks the funniest play, and whoever submitted it gets one point.</P>
        <P>After the round, a new player becomes the Card Czar, and everyone draws back up to 10 white cards.</P>
        <P>The part of speech of a white card is a noun or gerund, including both single words and phrase constructions.</P>
        <P>
          Black cards are either fill-in-the-blank statements or questions. Both white and black cards break these rules on rare occasions.
        </P>
        <H2>What's new</H2>
        <ul className="list-disc list-inside">
          <li>
            <b>Jun 04, 2020</b> - Public git repository{' '}
            <a href="https://github.com/epavanello/bad-cards-game" target="_blank">
              Bad Cards Game
            </a>
          </li>
          <li>
            <b>May 01, 2020</b> - Pages About, Social and Card animations
          </li>
          <li>
            <b>April 26, 2020</b> - Translations
          </li>
          <li>
            <b>April 24, 2020</b> - Profile deletion
          </li>
          <li>
            <b>April 20, 2020</b> - First launch
          </li>
        </ul>
      </Paper>
    </div>
  );
}
