import Head from "next/head";
import React, { useEffect } from "react";
import { iLink } from "../../../../@types/components";
import { PageWithStore } from "../../../../@types/store";
import Main from "../../../../components/main";
import SideMenu from "../../../../components/main/SideMenu";
import svgs from "../../../../helpers/svgs";
import withAuth from "../../../../helpers/withAuth";

import useLang from "../../../../hooks/useLang";
import { setPageTitle } from "../../../../store/actions/uiActions";
import { wrappedOnStore } from "../../../../store/index";

const VisualIdentity: PageWithStore = ({ dispatch, ui: { lang } }) => {
  const { titles } = useLang(lang);

  const menu: Array<iLink> = [
    {
      svgId: svgs.tune,
      text: titles.profile.preferences.checkout.parameters.title,
      route: "/profile/preferences/checkout",
    },
    {
      svgId: svgs.stars,
      text: titles.profile.preferences.checkout.visual_identity,
      route: "/profile/preferences/checkout/visual-identity",
    },
    {
      svgId: svgs.mail,
      text: titles.profile.preferences.checkout.mails,
      route: "/profile/preferences/checkout/mails",
    },
  ];

  useEffect(() => {
    dispatch(
      setPageTitle(
        titles.profile.preferences.title +
          " | " +
          titles.profile.preferences.checkout.title +
          " | " +
          titles.profile.preferences.checkout.visual_identity
      )
    );
  }, [
    dispatch,
    titles.profile.preferences.title,
    titles.profile.preferences.checkout.title,
    titles.profile.preferences.checkout.visual_identity,
  ]);

  return (
    <>
      <Head>
        <title>
          Smart -{" "}
          {titles.profile.preferences.title +
            " | " +
            titles.profile.preferences.checkout.title +
            " | " +
            titles.profile.preferences.checkout.visual_identity}
        </title>
      </Head>
      <Main>
        <SideMenu
          links={menu}
          title={titles.profile.preferences.checkout.title}
        >
          <section className="payments__container">
            <div className="payments__links link__group"></div>
          </section>
        </SideMenu>
      </Main>
    </>
  );
};

export default withAuth(wrappedOnStore(VisualIdentity));
