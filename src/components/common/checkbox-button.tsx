import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare } from '@fortawesome/free-solid-svg-icons';

interface CheckboxButtonProps {
  text: string;
  id: number;
  selected: boolean;
  disabled?: boolean;
  toggleButton: (id: number, checked: string) => void;
}

export const CheckboxButton = (props: CheckboxButtonProps) => {
  const checked = props.selected ? 'checked' : '';
  const disabledClass = props.disabled ? 'isDisabled' : '';
  const handleOnClick = () => {
    props.toggleButton(props.id, checked);
  };

  return (
    <button onClick={handleOnClick} disabled={props.disabled} className={`button checkbox ${checked} ${disabledClass}`}>
      <FontAwesomeIcon icon={faCheckSquare} className="icon" />
      {props.text}
    </button>
  );
};
