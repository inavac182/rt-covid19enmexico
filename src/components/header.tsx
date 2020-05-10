import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle, faHome } from '@fortawesome/free-solid-svg-icons';
import { BrowserView, MobileView } from 'react-device-detect';
import { Modal } from './modal';
import { InfoModal } from './info-modal';

interface HeaderProps {
  showHomeButton?: boolean;
}

export const Header = (props: HeaderProps) => (
  <section className="header">
    {props.showHomeButton && (
      <Link className="homeLink green-bg white left button" to="/">
        <FontAwesomeIcon icon={faHome} />
      </Link>
    )}
    <Modal
      buttonChild={
        <>
          <FontAwesomeIcon icon={faInfoCircle} /> <span>Información importante</span>
        </>
      }
      buttonClasses="infoButton right"
      theme="warning"
    >
      <InfoModal />
    </Modal>
    <BrowserView>
      <h1>RT COVID-19 en México</h1>
    </BrowserView>
    <MobileView>
      <h1>RT COVID-19 en México</h1>
    </MobileView>
  </section>
);
