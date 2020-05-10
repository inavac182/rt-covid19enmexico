import React, { useState, useEffect } from 'react';
import { inject } from 'mobx-react';
import { Header, Footer } from '.';
import { ModalContext } from './modal';

interface DashboardProps {}

export const Dashboard = (props: DashboardProps) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const contextHandler = {
    isModalOpen,
    toggleModal: () => {
      setModalOpen(!isModalOpen);
    },
  };

  useEffect(() => {
    document.title = `RT del COVID-19 en México`;
  }, []);

  return (
    <ModalContext.Provider value={contextHandler}>
      <section className={`dashboard modal-${isModalOpen}`}>
        <Header />
        <section className="main">
          <p>LOL</p>
        </section>
        <Footer />
      </section>
    </ModalContext.Provider>
  );
};
