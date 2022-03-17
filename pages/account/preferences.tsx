import React, { useEffect } from "react";
import Head from "next/head";
import useLang from "../../hooks/useLang";
import Main from "../../components/main";
import { setPageTitle } from "../../store/actions/uiActions";
import SideMenu from "../../components/main/SideMenu";
import { iLink } from "../../@types/components";
import svgs from "../../helpers/svgs";
import withAuth from "../../helpers/withAuth";
import { PageWithStore } from "../../@types/store";
import { wrappedOnStore } from "../../store/index";

const Preferences: PageWithStore = ({ dispatch, ui: { lang } }) => {
  const { titles, changePassword } = useLang(lang);

  const menu: Array<iLink> = [
    {
      svgId: svgs.tune,
      text: changePassword.menu.pp,
      route: "/account/preferences",
    },
    {
      svgId: svgs.lock,
      text: changePassword.menu.cp,
      route: "/account/password",
    },
  ];

  useEffect(() => {
    dispatch(
      setPageTitle(
        titles.account.main_title + " | " + titles.account.preferences
      )
    );
  }, [dispatch, titles.account.main_title, titles.account.preferences]);

  return (
    <>
      <Head>
        <title>
          Smart -{" "}
          {titles.account.main_title + " | " + titles.account.preferences}
        </title>
      </Head>
      <Main>
        <SideMenu links={menu} title={changePassword.menu.title}></SideMenu>
      </Main>
    </>
  );
};

export default withAuth(wrappedOnStore(Preferences));
