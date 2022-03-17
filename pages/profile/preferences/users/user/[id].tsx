import Head from "next/head";
import { useRouter } from "next/router";
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
import {
  startGettingUserInformation,
  unsetActiveUser,
} from "../../../../../store/actions/preferencesActions";

const NewUser: PageWithStore = ({
  dispatch,
  ui: { lang },
  preferences: { users },
}) => {
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

  const router = useRouter();

  const activeUser = !!users?.active;

  useEffect(() => {
    dispatch(
      setPageTitle(
        titles.profile.preferences.title +
          " | " +
          titles.profile.preferences.users.title
      )
    );
    if (!activeUser) {
    }
    dispatch(
      startGettingUserInformation(parseInt(router.query.id as string), lang)
    );
  }, [
    dispatch,
    titles.profile.preferences.title,
    titles.profile.preferences.users.title,
    activeUser,
    router.query.id,
    lang,
  ]);

  useEffect(() => {
    return () => {
      dispatch(unsetActiveUser());
    };
  }, [dispatch]);

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
