import React, { useEffect } from "react";
import Head from "next/head";
import { iLink } from "../../../@types/components/index";
import svgs from "../../../helpers/svgs";
import Main from "../../../components/main/index";
import SideMenu from "../../../components/main/SideMenu";
import NavLink from "../../../components/NavLink";
import { setPageTitle } from "../../../store/actions/uiActions";

import useLang from "../../../hooks/useLang";
import withAuth from "../../../helpers/withAuth";
import { PageWithStore } from "../../../@types/store";
import { wrappedOnStore } from "../../../store/index";

const Massive: PageWithStore = ({ dispatch, ui: { lang } }) => {
  const { titles } = useLang(lang);
  const menu: Array<iLink> = [
    {
      svgId: svgs.tune,
      text: titles.payments.generate,
      route: "/payments/generate",
    },
    {
      svgId: svgs.lock,
      text: titles.payments.status,
      route: "/payments/reports",
    },
  ];

  useEffect(() => {
    dispatch(
      setPageTitle(
        titles.payments.main_title + " | " + titles.payments.generate
      )
    );
  }, [dispatch, titles.payments.main_title, titles.payments.generate]);

  return (
    <>
      <Head>
        <title>
          Smart -{" "}
          {titles.payments.main_title + " | " + titles.payments.generate}{" "}
        </title>
      </Head>
      <Main>
        <SideMenu links={menu} title={titles.payments.main_title}>
          <section className="payments__container">
            <div className="payments__links link__group">
              <NavLink
                href="/payments/generate"
                activeClassName="link__group-item--active"
              >
                <a className="link link__group-item">{titles.adjustment.parameters.individual}</a>
              </NavLink>
              <NavLink
                href="/payments/generate/massive"
                activeClassName="link__group-item--active"
              >
                <a className="link link__group-item">{titles.adjustment.parameters.per_file}</a>
              </NavLink>
            </div>
          </section>
        </SideMenu>
      </Main>
    </>
  );
};

export default withAuth(wrappedOnStore(Massive));
