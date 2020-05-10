import React from 'react';

export const ModalContext = React.createContext({
  isModalOpen: false,
  toggleModal: () => {},
});
