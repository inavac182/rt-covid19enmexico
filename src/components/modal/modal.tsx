import React, { useState, FunctionComponent, ReactNode } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { ModalContext } from '.';

interface ModalProps {
  buttonText?: string;
  buttonChild?: ReactNode;
  buttonClasses?: string;
  theme?: string;
}

export const Modal: FunctionComponent<ModalProps> = props => {
  const { buttonText, buttonChild, buttonClasses, theme } = props;
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <ModalContext.Consumer>
        {({ isModalOpen, toggleModal }) => {
          const handleModalActions = () => {
            setShowModal(!showModal);
            toggleModal();
          };

          return (
            <>
              <button className={`${buttonClasses} ${theme}`} onClick={handleModalActions}>
                {buttonText}
                {buttonChild}
              </button>
              {showModal && (
                <div className="modal textWrapped">
                  <div className="bg-modal" onClick={handleModalActions}></div>
                  <div className="content-modal">
                    <button className={`right ${theme} close headerButton`} onClick={handleModalActions}>
                      <FontAwesomeIcon icon={faTimes} />
                    </button>
                    {props.children}
                    <button className={`${theme} close lastCloseButton`} onClick={handleModalActions}>
                      <FontAwesomeIcon icon={faTimes} /> Cerrar
                    </button>
                  </div>
                </div>
              )}
            </>
          );
        }}
      </ModalContext.Consumer>
    </>
  );
};
