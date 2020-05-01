import React, { CSSProperties } from 'react';
import { CardType, CardColor } from '../redux/actionTypes/gameTypes';
import classNames from 'classnames';

const cardStyle: React.CSSProperties = {
  width: '100%',
  height: '100%',
  backfaceVisibility: 'hidden',
  WebkitBackfaceVisibility: 'hidden',
  visibility: 'visible',
  perspective: 0,
  WebkitPerspective: 0,
};
const backCard: React.CSSProperties = {
  background: 'repeating-linear-gradient(45deg, transparent, transparent 10px, #45509A 10px, #45509A 20px), #5F6BBE',
  transform: 'rotateY(180deg)',
  zIndex: 1,
};
const rotateCardStyle: React.CSSProperties = {
  transform: 'rotateY(180deg)',
};

const containerStyle: React.CSSProperties = {
  transition: 'transform 0.5s',
  transformStyle: 'preserve-3d',
};

const sceneStyle: React.CSSProperties = {
  perspective: '600px',
};

type CardParams = {
  card: CardType;
  color: CardColor;
  className?: string;
  style?: CSSProperties;
  checkable?: boolean;
  checked?: boolean;
  onCheckChange?: (checked: boolean, card: CardType) => void;
  covered?: boolean;
  checkbox?: boolean;
};
export default function Card({ card, color, checkbox, className, style, checkable, checked, onCheckChange, covered }: CardParams) {
  const changeChecked = (value: boolean) => {
    // Consento il cambio check se checkabile o se sto dececkando
    if (checkbox && (checkable || !value)) {
      onCheckChange && onCheckChange(value, card);
    }
  };

  return (
    <div style={sceneStyle} className={className}>
      <div
        className="relative w-32 h-48 text-xs sm:w-48 sm:h-64 sm:text-sm font-mono cursor-default"
        style={{ ...style, ...containerStyle, ...(covered ? rotateCardStyle : {}) }}
      >
        <div className="absolute border-8 border-white shadow-lg rounded-lg" style={{ ...backCard, ...cardStyle }}></div>
        <div
          className={classNames('absolute shadow-lg rounded-lg p-4', {
            'bg-gray-900': color === CardColor.Black,
            'text-gray-100': color === CardColor.Black,
            'bg-gray-100': color === CardColor.White,
            'text-gray-800': color === CardColor.White,
          })}
          onClick={() => {
            changeChecked(!checked);
          }}
          style={{ ...cardStyle }}
          role="button"
        >
          {card.message}
          {checkbox && (
            <input
              type="checkbox"
              className="absolute right-0 bottom-0 mb-4 mr-4"
              checked={checked}
              disabled={!checkable && !checked}
              onChange={(e) => {
                checkable && changeChecked(e.target.checked);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
