import Head from "next/head";
import React, { useEffect } from "react";
import useLang from "../hooks/useLang";
import { useRouter } from "next/router";
import validator from "validator";
import { wrappedOnStore } from "../store/index";
import {
  getCookieResponse,
  startAcceptingCookie,
} from "../store/actions/uiActions";
import { ComponentWithStore } from "../@types/store";

const Cookies: ComponentWithStore = ({
  dispatch,
  ui: { lang, cookie },
  children,
}) => {
  const { cookies } = useLang(lang);

  const router = useRouter();

  const handleClick = () => {
    dispatch(startAcceptingCookie());
  };

  useEffect(() => {
    if (!validator.contains(router.pathname, "/auth")) {
      localStorage.setItem("last-path", router.pathname);
    }
  }, [dispatch, router.pathname]);

  useEffect(() => {
    dispatch(getCookieResponse());
  }, [dispatch]);

  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
      </Head>
      {cookie && (
        <section className="cookies">
          <h3>{cookies.title}</h3>
          <div className="cookies__container">
            <p className="cookies__text">{cookies.text}</p>
            <div className="cookies__buttons">
              <button
                className="btn btn--secondary btn--small"
                onClick={handleClick}
              >
                {cookies.button}
              </button>
              <a href="/cookies" className="link link--small color--white">
                {cookies.link}
              </a>
            </div>
          </div>
        </section>
      )}

      {children}
    </>
  );
};

export default wrappedOnStore(Cookies);
