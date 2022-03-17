import Head from "next/head";
import React, { useEffect } from "react";
import { iLink } from "../../@types/components";
import { PageWithStore } from "../../@types/store";
import Main from "../../components/main";
import SideMenu from "../../components/main/SideMenu";
import withAuth from "../../helpers/withAuth";
import useLang from "../../hooks/useLang";
import { setPageTitle } from "../../store/actions/uiActions";
import { wrappedOnStore } from "../../store/index";

const General: PageWithStore = ({ dispatch, ui: { lang } }) => {
  const menu: Array<iLink> = [];

  const { titles } = useLang(lang);

  useEffect(() => {
    dispatch(setPageTitle(titles.commerce.main_title));
  }, [dispatch, titles.commerce.main_title]);

  return (
    <>
      <Head>
        <title>Smart - {titles.commerce.main_title}</title>
      </Head>
      <Main>
        <SideMenu links={menu} title="">
          <section className="payments__container">
            <div className="payments__links link__group"></div>
          </section>
        </SideMenu>
      </Main>
    </>
  );
};

export default withAuth(wrappedOnStore(General));
