import Image from "next/image";
import React, { FC } from "react";
import errImg from "./../public/404.png";
import logoColor from "./../public/SPLogo.png";
import logoPower from "./../public/powered_by_smart.png";
import Head from "next/head";

const Custom404: FC = () => {
  return (
    <>
      <Head>
        <title>Smart - Error 404 NOT FOUND</title>
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
        <p className="error__error">Error 404</p>
        <p className="error__text">Page not found...</p>
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

export default Custom404;
