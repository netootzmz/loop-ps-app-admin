import Head from "next/head";
import React, { useEffect } from "react";
import { iLink } from "../../../../../@types/components";
import { PageWithStore } from "../../../../../@types/store";
import Main from "../../../../../components/main";
import SideMenu from "../../../../../components/main/SideMenu";
import UsersForm from "../../../../../components/profile/preferences/users/UsersForm";
import svgs from "../../../../../helpers/svgs";
import withAuth from "../../../../../helpers/withAuth";
import useLang from "../../../../../hooks/useLang";
import { wrappedOnStore } from "../../../../../store";
import { setPageTitle } from "../../../../../store/actions/uiActions";

const NewUser: PageWithStore = ({ dispatch, ui: { lang } }) => {
  const { titles } = useLang(lang);

  const menu: Array<iLink> = [
    // {
    //   svgId: svgs.settings,
    //   text: titles.profile.preferences.general.title,
    //   route: "/profile/preferences/general",
    // },
    // {
    //   svgId: svgs.home,
    //   text: titles.profile.preferences.portal_access.title,
    //   route: "/profile/preferences/portal-access",
    // },
    {
      svgId: svgs.payment,
      text: titles.profile.preferences.checkout.title,
      route: "/profile/preferences/checkout",
    },
    {
      svgId: svgs.copyToClip,
      text: titles.profile.preferences.remote_payments.title,
      route: "/profile/preferences/remote-payments",
    },
    {
      svgId: svgs.person,
      text: titles.profile.preferences.users.title,
      route: "/profile/preferences/users",
    },
    // {
    //   svgId: svgs.people,
    //   text: titles.profile.preferences.profiles.title,
    //   route: "/profile/preferences/profiles",
    // },
  ];

  useEffect(() => {
    dispatch(
      setPageTitle(
        titles.profile.preferences.title +
          " | " +
          titles.profile.preferences.users.title
      )
    );
  }, [
    dispatch,
    titles.profile.preferences.title,
    titles.profile.preferences.users.title,
  ]);

  return (
    <>
      <Head>
        <title>
          Smart -{" "}
          {titles.profile.preferences.title +
            " | " +
            titles.profile.preferences.users.title}
        </title>
      </Head>
      <Main>
        <SideMenu links={menu} title={titles.profile.preferences.title}>
          <UsersForm />
        </SideMenu>
      </Main>
    </>
  );
};

export default withAuth(wrappedOnStore(NewUser));
