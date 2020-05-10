import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

interface AlertProps {
  icon?: IconProp;
  text: string;
  classes?: string;
}

export const Alert = (props: AlertProps) => {
  return (
    <div className={`alert ${props.classes}`}>
      {props.icon && <FontAwesomeIcon icon={props.icon} />} {props.text}
    </div>
  );
};
