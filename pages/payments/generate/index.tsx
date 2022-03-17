import React, { useEffect, useState } from "react";
import Head from "next/head";
import { iLink } from "../../../@types/components/index";
import svgs from "../../../helpers/svgs";
import useLang from "../../../hooks/useLang";
import { setPageTitle } from "../../../store/actions/uiActions";
import Main from "../../../components/main/index";
import SideMenu from "../../../components/main/SideMenu";
import GenerateForm from "../../../components/payments/GenerateForm";
import NavLink from "../../../components/NavLink";
import SendForm from "../../../components/payments/SendForm";
import {
  startGettingConfiguration,
  unsetConfiguration,
} from "../../../store/actions/paymentAction";
import withAuth from "../../../helpers/withAuth";
import { PageWithStore } from "../../../@types/store/index";
import { wrappedOnStore } from "../../../store/index";

const Generate: PageWithStore = ({
  dispatch,
  ui: { lang },
  payments: { newLinkData },
}) => {
  const { titles } = useLang(lang);
  const [showModal, setShowModal] = useState(false);

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
    dispatch(startGettingConfiguration());

    dispatch(
      setPageTitle(
        titles.payments.main_title + " | " + titles.payments.generate
      )
    );
    return () => {
      dispatch(unsetConfiguration());
    };
  }, [dispatch, titles.payments.main_title, titles.payments.generate]);

  return (
    <>
      <Head>
        <title>
          Smart -{" "}
          {titles.payments.main_title + " | " + titles.payments.generate}
        </title>
      </Head>
      <Main>
        <SideMenu links={menu} title="Pagos a distancia">
          <section className="payments__container">
            <div className="payments__links link__group">
              <NavLink
                href="/payments/generate"
                activeClassName="link__group-item--active"
              >
                <a className="link link__group-item">
                  {titles.adjustment.parameters.individual}
                </a>
              </NavLink>
              <NavLink
                href="/payments/generate/massive"
                activeClassName="link__group-item--active"
              >
                <a
                  className="link link__group-item"
                  style={{ pointerEvents: "none" }}
                >
                  {titles.adjustment.parameters.per_file}
                </a>
              </NavLink>
            </div>
            <GenerateForm setShowModal={setShowModal} />
            {newLinkData && showModal ? (
              <SendForm setShowModal={setShowModal} />
            ) : (
              <div></div>
            )}
          </section>
        </SideMenu>
      </Main>
    </>
  );
};

export default withAuth(wrappedOnStore(Generate));
