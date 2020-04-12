import React from 'react';
import { CardType, CardColor } from '../redux/actionTypes/gameTypes';
import classNames from 'classnames';

import '../styles/Card.scss';

type CardParams = { card: CardType; color: CardColor };
export default function Card({ card, color }: CardParams) {
  return <div className={classNames('card', { black: color === CardColor.Black, white: color === CardColor.White })}>{card.message}</div>;
}
