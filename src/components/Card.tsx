import React, { CSSProperties } from 'react';
import { CardType, CardColor } from '../redux/actionTypes/gameTypes';
import classNames from 'classnames';

type CardParams = {
  card: CardType;
  color: CardColor;
  className?: string;
  style?: CSSProperties;
  checkable?: boolean;
  checked?: boolean;
  onCheckChange?: (checked: boolean, card: CardType) => void;
};
export default function Card({ card, color, className, style, checkable, checked, onCheckChange }: CardParams) {
  const changeChecked = (value: boolean) => {
    onCheckChange && onCheckChange(value, card);
  };

  return (
    <div
      className={classNames(
        className,
        'w-32 h-48 text-xs sm:w-48 sm:h-64 sm:text-sm  font-mono shadow-lg rounded-lg p-4 relative cursor-default',
        {
          'bg-gray-900': color === CardColor.Black,
          'text-gray-100': color === CardColor.Black,
          'bg-gray-100': color === CardColor.White,
          'text-gray-800': color === CardColor.White,
        }
      )}
      onClick={() => {
        checkable && changeChecked(!checked);
      }}
      style={style}
      role="button"
    >
      {card.message}
      {checkable && (
        <input
          type="checkbox"
          className="absolute right-0 bottom-0 mb-4 mr-4"
          checked={checked}
          onChange={(e) => {
            checkable && changeChecked(e.target.checked);
          }}
        />
      )}
    </div>
  );
}
