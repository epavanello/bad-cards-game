import React, { ReactElement } from 'react';
import classNames from 'classnames';

type FieldInputProps = {
  id: string;
  label: string;
  children: ReactElement;
};
export function FieldInput({ id, label, children }: FieldInputProps) {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={id}>
        {label}
      </label>
      {children}
    </div>
  );
}

type FieldInputTextProps = {
  id: string;
  label: string;
  value: string;
  readonly?: boolean;
  onChange?: (value: string) => void;
  type?: string;
};
export function FieldInputText({ id, label, value, readonly, onChange, type = 'text' }: FieldInputTextProps) {
  return (
    <FieldInput id={id} label={label}>
      <input
        className={classNames(
          'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight',
          { 'bg-gray-200 cursor-not-allowed outline-none': readonly },
          { 'focus:outline-none focus:shadow-outline': !readonly }
        )}
        id={id}
        type={type}
        placeholder={label}
        value={value}
        autoComplete="on"
        readOnly={readonly}
        onChange={(e) => {
          onChange && onChange(e.target.value);
        }}
      />
    </FieldInput>
  );
}

type FieldInputSelectProps = {
  id: string;
  label: string;
  value: string;
  values: string[];
  readonly?: boolean;
  onChange?: (value: string) => void;
  type?: string;
};
export function FieldInputSelect({ id, label, value, values, readonly, onChange, type = 'text' }: FieldInputSelectProps) {
  return (
    <FieldInput id={id} label={label}>
      <select
        className={classNames(
          'shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight',
          { 'bg-gray-200 cursor-not-allowed outline-none': readonly },
          { 'focus:outline-none focus:shadow-outline': !readonly }
        )}
        id={id}
        value={value}
        onChange={(e) => onChange && onChange(e.target.value)}
      >
        {values.map((v, i) => (
          <option key={i}>{v}</option>
        ))}
      </select>
    </FieldInput>
  );
}
