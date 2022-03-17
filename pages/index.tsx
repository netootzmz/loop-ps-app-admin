import React, { useEffect } from "react";
import Main from "../components/main";
import { setPageTitle } from "../store/actions/uiActions";
import useLang from "../hooks/useLang";
import Head from "next/head";
import logo from "./../public/logo-smart.png";
import SvgWrapper from "./../components/SvgWrapper";
import svgs from "../helpers/svgs";
import Image from "next/image";
import Link from "next/link";
import withAuth from "../helpers/withAuth";
import { wrappedOnStore } from "../store/index";
import { PageWithStore } from "../@types/store";

const Home: PageWithStore = ({
  dispatch,
  ui: { lang },
  auth: { nombre, phone_attention },
}) => {
  const { titles, home } = useLang(lang);

  useEffect(() => {
    dispatch(setPageTitle(titles.main));
  }, [dispatch, titles.main]);

  return (
    <>
      <Head>
        <title>Smart - {titles.main}</title>
      </Head>
      <Main>
        <main className="home">
          <section className="welcome animate__animated animate__fadeIn">
            <div className="welcome__text">
              <h2 className="welcome__name">
                {home.welcome.name} {nombre}
              </h2>
              <h1 className="welcome__title">{home.welcome.title}</h1>
              <h3 className="welcome__msg">{home.welcome.msg}</h3>
            </div>
            <div className="welcome__image">
              <picture className="welcome__picture">
                <Image
                  src={logo}
                  alt="Smart Payment Services SA de CV"
                  className="welcome__icon"
                  layout="fill"
                />
              </picture>
            </div>
          </section>
          <section className="contact animate__animated animate__fadeIn">
            <h3 className="contact__title">{home.contact.title}</h3>
            <p className="contact__msg">{home.contact.msg}</p>
            <div className="contact__information">
              <div className="contact__times">
                <h4 className="h3">{home.contact.times.title}</h4>
                <p>{home.contact.times.ss}</p>
              </div>
              <div className="contact__data">
                <b className="contact__phone">
                  <SvgWrapper id={svgs.sms} className="svg svg--small" />
                  {phone_attention}
                </b>
                <span>{home.contact.mail}</span>
                <Link href="mailto:atencionsmart@spaymentservices.com">
                  <a className="link link--small">
                    <b>atencionsmart@spaymentservices.com</b>
                  </a>
                </Link>
              </div>
            </div>
          </section>
        </main>
      </Main>
    </>
  );
};
export default withAuth(wrappedOnStore(Home));
