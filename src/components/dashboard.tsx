import React, { useState, useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import { Header, Footer } from '.';
import { ModalContext } from './modal';
import { CasesStore } from 'src/stores';
import { StatesCurrentRt, StatesList } from './graphs';

interface DashboardProps {
  casesStore?: CasesStore;
}

export const Dashboard = inject('casesStore')(
  observer((props: DashboardProps) => {
    const { casesStore } = props;
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
            <StatesCurrentRt />
            <div className="separator soft"></div>
            <StatesList />
          </section>
          <div className="separator soft"></div>
          <section className="description center-content">
            <p className="justify-text white-text">
              Este factor de reproducción nos ayuda a saber si estamos deteniendo el contagio del virus. Para obtener
              este factor se están utilizando varias ecuaciones estadísticas como el Ro
            </p>
            <p className="justify-text green-text margin-top-one">
              Si este factor es MENOR a 1, significa que estamos deteniendo el contagio del virus.
            </p>
            <p className="justify-text red-text margin-top-one">
              Si este factor es MAYOR a 1, significa que NO estamos deteniendo el contagio del virus.
            </p>
            <p className="justify-text white-text margin-top-one">
              Este factor se va a estar actualizando diario cuando se cargan nuevos datos y nos puede ayudar a estimar
              los casos a futuro.
            </p>
            <p className="margin-top-three">Algunas referencias sobre este factor:</p>
            <p>
              <a href="https://www.youtube.com/watch?v=Qrp40ck3WpI" target="_blank">
                The MATH of Epidemics | Intro to the SIR Model
              </a>
            </p>
            <p>
              <a href="https://www.youtube.com/watch?v=NKMHhm2Zbkw" target="_blank">
                Oxford Mathematician explains SIR Disease Model for COVID-19 (Coronavirus)
              </a>
            </p>
          </section>
          <Footer />
        </section>
      </ModalContext.Provider>
    );
  })
);
