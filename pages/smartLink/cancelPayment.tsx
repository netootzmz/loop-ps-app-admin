import Image from "next/image";
import React, { FC } from "react";
import errImg from "./../../public/404.png";
import logoColor from "./../../public/SPLogo.png";
import logoPower from "./../../public/powered_by_smart.png";
import Head from "next/head";

const CancelPayment: FC = () => {
  return (
    <>
      <Head>
        <title>Smart - Enlace cancelado</title>
      </Head>
      <main className="error">
        <div className="error__logo">
          <Image
            src={logoColor}
            alt="Error 404 page not found"
            layout="fill"
            className="error__img"
          />
        </div>
        <p className="error__error"></p>
        <p className="error__text">Enlace de pago a distancia ha expirado <br /> por favor solicita un nuevo enlace</p>
        <div className="error__big">
          <Image
            src={errImg}
            alt="Error 404 page not found"
            layout="fill"
            className="error__img"
          />
        </div>
        <div className="error__power">
          <Image
            src={logoPower}
            alt="Error 404 page not found"
            layout="fill"
            className="error__img"
          />
        </div>
      </main>
    </>
  );
};

export default CancelPayment;
