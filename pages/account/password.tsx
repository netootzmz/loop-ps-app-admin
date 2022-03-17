import React, { useEffect } from "react";
import Head from "next/head";
import useLang from "../../hooks/useLang";
import Main from "../../components/main";
import { setPageTitle } from "../../store/actions/uiActions";
import PasswordChangeForm from "../../components/auth/PasswordChangeForm";
import SideMenu from "../../components/main/SideMenu";
import { iLink } from "../../@types/components";
import svgs from "../../helpers/svgs";
import withAuth from "../../helpers/withAuth";
import { PageWithStore } from "../../@types/store";
import { wrappedOnStore } from "../../store/index";
import CaptchaProvider from "components/providers/CaptchaProvider";

const Password: PageWithStore = ({
  dispatch,
  ui: { lang },
  auth: { nombre, email },
}) => {
  const { titles, changePassword } = useLang(lang);

  const menu: Array<iLink> = [
    // {
    //   svgId: svgs.tune,
    //   text: changePassword.menu.pp,
    //   route: "/account/preferences",
    // },
    {
      svgId: svgs.lock,
      text: changePassword.menu.cp,
      route: "/account/password",
    },
  ];

  const getInitials = nombre
    ?.split(" ")
    .slice(0, 2)
    .map((i) => i.charAt(0))
    .join("")
    .toUpperCase();

  useEffect(() => {
    dispatch(
      setPageTitle(
        titles.account.main_title + " | " + titles.account.change_password
      )
    );
  }, [dispatch, titles.account.main_title, titles.account.change_password]);

  return (
    <CaptchaProvider>
      <Head>
        <title>
          Smart -{" "}
          {titles.account.main_title + " | " + titles.account.change_password}
        </title>
      </Head>
      <Main>
        <SideMenu links={menu} title={changePassword.menu.title}>
          <section className="password__container">
            <div className="card card--small animate__animated animate__fadeIn">
              <div className="password__info">
                <figure className="password__fig">
                  <span className="password__initials">{getInitials}</span>
                </figure>
              </div>
              <h3 className="password__title">{nombre}</h3>
              <h4 className="password__email">{email}</h4>
              <div className="password__text">
                {changePassword.password_text}
              </div>
              <PasswordChangeForm email={email!} />
            </div>
            <div>&nbsp;</div>
          </section>
        </SideMenu>
      </Main>
    </CaptchaProvider>
  );
};

export default withAuth(wrappedOnStore(Password));
