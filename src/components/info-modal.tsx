import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';

export const InfoModal = () => {
  return (
    <>
      <h1>Información </h1>
      <div className="separator"></div>
      <h2>Como actualizamos los números?</h2>
      <p className="text">
        Nuestro equipo solo actualiza los casos del COVID-19 en México cuando un órgano oficial publica el reporte. Por
        ejemplo la{' '}
        <a href="https://twitter.com/SSalud_mx" target="_blank">
          <FontAwesomeIcon icon={faTwitter} /> Secretaria de salud federal
        </a>{' '}
        o tambien alguna secretaria de gobernacion estatal, como por ejemplo:{' '}
        <a href="https://twitter.com/GobiernoJalisco" target="_blank">
          <FontAwesomeIcon icon={faTwitter} /> Gobierno de Jalisco{' '}
        </a>{' '}
        <a href="https://twitter.com/gobiernocolima" target="_blank">
          <FontAwesomeIcon icon={faTwitter} /> Gobierno de Colima
        </a>
        . Por esta razón los números que desplegamos en la página suelen tener discrepancias con los presentados por la
        Secretaria de Salud federal en la conferencia vespertina, ya que la Secretaria de Salud hace corte del conteo
        diario alrededor de la 1-2pm para tener tiempo de presentarlos. Cualquier nueva actualización después del corte
        no aparece en la conferencia de las 7pm, pero nosotros seguimos actualizando y cada cambio se agrega al
        historial de actualizaciones.
      </p>
      <div className="separator soft"></div>
      <h2>Porque algunos casos "confirmados" en noticieros/redes sociales aún no aparecen aquí?</h2>
      <p className="text">
        Nosotros solo publicamos datos que vienen de un órgano oficial del gobierno estatal o federal, para prevenir
        desinformación y poder tener los datos más exactos. Esto nos lleva a tener un retraso de hasta 12 horas para
        poder actualizar nuestros datos ya que cada gobierno publica sus datos de manera distinta, en algunas ocasiones
        con retrasos y nuestro equipo tiene que esperar, leerlos y publicarlos.
      </p>
      <div className="separator soft"></div>
      <h2>Como me puedo poner en contacto con ustedes?</h2>
      <p className="text">
        Cualquier duda, aclaración o reporte de errores. El medio preferido de contacto es twitter:{' '}
        <a href="https://twitter.com/FelipeNava92" target="_blank">
          <FontAwesomeIcon icon={faTwitter} /> @FelipeNava92
        </a>{' '}
        y{' '}
        <a href="https://twitter.com/Jackelyn2808" target="_blank">
          <FontAwesomeIcon icon={faTwitter} /> @Jackelyn2808
        </a>
      </p>
      <p>
        También puedes mandarnos un correo a: felipenava.eng@gmail.com, pero la comunicación por correo puede demorar
        más tiempo ya que no lo estamos monitoreando seguido.
      </p>
      <div className="separator soft"></div>
    </>
  );
};
