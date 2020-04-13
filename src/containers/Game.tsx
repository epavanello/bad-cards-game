import React from 'react';
import { useSelector } from '../redux/store';
import Card from '../components/Card';
import { CardColor, Role } from '../redux/actionTypes/gameTypes';

export default function Game() {
  const blackCard = useSelector((state) => state.blackCard);
  const whiteCards = useSelector((state) => state.cards);
  const role = useSelector((state) => state.role);

  return (
    <>
      {role === Role.JUDGE ? <p>You are Kazar</p> : <p>Choose the best card/s</p>}
      {blackCard && <Card card={blackCard} color={CardColor.Black} />}
      <div className="card-scroller">
        {whiteCards.map((card) => (
          <Card key={card.id} card={card} color={CardColor.White} />
        ))}
      </div>
    </>
  );
}
