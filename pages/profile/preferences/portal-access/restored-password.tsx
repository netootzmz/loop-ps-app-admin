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

const RestoredPassword: PageWithStore = ({ dispatch, ui: { lang } }) => {
  const { titles } = useLang(lang);

  const menu: Array<iLink> = [
    {
      svgId: svgs.mail,
      text: titles.profile.preferences.portal_access.first_login,
      route: "/profile/preferences/portal-access",
    },
    {
      svgId: svgs.mail,
      text: titles.profile.preferences.portal_access.verification_code,
      route: "/profile/preferences/portal-access/verification-code",
    },
    {
      svgId: svgs.mail,
      text: titles.profile.preferences.portal_access.restored_password,
      route: "/profile/preferences/portal-access/restored-password",
    },
  ];

  useEffect(() => {
    dispatch(
      setPageTitle(
        titles.profile.preferences.title +
          " | " +
          titles.profile.preferences.portal_access.title +
          " | " +
          titles.profile.preferences.portal_access.restored_password
      )
    );
  }, [
    dispatch,
    titles.profile.preferences.title,
    titles.profile.preferences.portal_access.title,
    titles.profile.preferences.portal_access.restored_password,
  ]);

  return (
    <>
      <Head>
        <title>
          Smart -{" "}
          {titles.profile.preferences.title +
            " | " +
            titles.profile.preferences.portal_access.title +
            " | " +
            titles.profile.preferences.portal_access.restored_password}
        </title>
      </Head>
      <Main>
        <SideMenu
          links={menu}
          title={titles.profile.preferences.portal_access.title}
        >
          <section className="payments__container">
            <div className="payments__links link__group"></div>
          </section>
        </SideMenu>
      </Main>
    </>
  );
};

export default withAuth(wrappedOnStore(RestoredPassword));
