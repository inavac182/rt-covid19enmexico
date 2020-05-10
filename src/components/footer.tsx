import React, { useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';

interface FooterProps {
  hideLastUpdate?: boolean;
}

export const Footer = (props: FooterProps) => {
  const { hideLastUpdate } = props;

  return (
    <section className="footer">
      <h3>Fuentes:</h3>
      <p>
        Secretaria de salud:{' '}
        <a href="https://www.gob.mx/salud/es/archivo/documentos" target="_blank">
          Ir al sitio
        </a>
      </p>
      <p className="disclaimer">
        Estos datos se actualizan con respecto a los comunicados emitidos por los gobiernos estatales y confirmados
        diariamente con el informe de la Secretaria de Salud Federal.
      </p>
      <div className="contant-data">
        <p>Supporters:</p>
        <p>
          Felipe:{' '}
          <a href="https://twitter.com/FelipeNava92" target="_blank">
            <FontAwesomeIcon icon={faTwitter} /> @FelipeNava92
          </a>
        </p>
        <p>
          Jaqueline:{' '}
          <a href="https://twitter.com/Jackelyn2808" target="_blank">
            <FontAwesomeIcon icon={faTwitter} /> @Jackelyn2808
          </a>
        </p>
      </div>
    </section>
  );
};
