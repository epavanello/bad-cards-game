import React from 'react';
import { useSelector } from '../redux/store';
import Card from '../components/Card';
import { CardColor } from '../redux/actionTypes/gameTypes';

export default function Game() {
  const blackCard = useSelector((state) => state.blackCard);
  const whiteCards = useSelector((state) => state.cards);

  return (
    <>
      {blackCard && <Card card={blackCard} color={CardColor.Black} />}
      <>
        {whiteCards.map((card) => (
          <Card key={card.id} card={card} color={CardColor.White} />
        ))}
      </>
    </>
  );
}
