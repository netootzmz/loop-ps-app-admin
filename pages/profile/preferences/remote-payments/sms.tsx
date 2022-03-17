import Head from "next/head";
import React, { useEffect } from "react";
import { iLink } from "../../../../@types/components";
import Main from "../../../../components/main";
import SideMenu from "../../../../components/main/SideMenu";
import svgs from "../../../../helpers/svgs";
import withAuth from "../../../../helpers/withAuth";

import useLang from "../../../../hooks/useLang";
import { setPageTitle } from "../../../../store/actions/uiActions";
import { PageWithStore } from "../../../../@types/store/index";
import { wrappedOnStore } from "../../../../store/index";

const Sms: PageWithStore = ({ dispatch, ui: { lang } }) => {
  const { titles } = useLang(lang);

  const menu: Array<iLink> = [
    {
      svgId: svgs.tune,
      text: titles.profile.preferences.remote_payments.parameters,
      route: "/profile/preferences/remote-payments",
    },
    {
      svgId: svgs.stars,
      text: titles.profile.preferences.remote_payments.visual_identity,
      route: "/profile/preferences/remote-payments/visual-identity",
    },
    {
      svgId: svgs.mail,
      text: titles.profile.preferences.remote_payments.mail_payment_link,
      route: "/profile/preferences/remote-payments/mail-payment-link",
    },
    {
      svgId: svgs.mail,
      text: titles.profile.preferences.remote_payments.proof_of_payment,
      route: "/profile/preferences/remote-payments/proof-of-payment",
    },
    {
      svgId: svgs.sms,
      text: titles.profile.preferences.remote_payments.sms,
      route: "/profile/preferences/remote-payments/sms",
    },
  ];

  useEffect(() => {
    dispatch(
      setPageTitle(
        titles.profile.preferences.title +
          " | " +
          titles.profile.preferences.remote_payments.title +
          " | " +
          titles.profile.preferences.remote_payments.sms
      )
    );
  }, [
    dispatch,
    titles.profile.preferences.title,
    titles.profile.preferences.remote_payments.title,
    titles.profile.preferences.remote_payments.sms,
  ]);

  return (
    <>
      <Head>
        <title>
          Smart -{" "}
          {titles.profile.preferences.title +
            " | " +
            titles.profile.preferences.remote_payments.title +
            " | " +
            titles.profile.preferences.remote_payments.sms}
        </title>
      </Head>
      <Main>
        <SideMenu
          links={menu}
          title={titles.profile.preferences.remote_payments.title}
        >
          <section className="payments__container">
            <div className="payments__links link__group"></div>
          </section>
        </SideMenu>
      </Main>
    </>
  );
};

export default withAuth(wrappedOnStore(Sms));
