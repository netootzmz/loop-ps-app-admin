import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import withAuth from "helpers/withAuth";
import { wrappedOnStore } from "store/index";
import useLang from "hooks/useLang";
import { setPageTitle } from "store/actions/uiActions";

import { PageWithStore } from "../../../@types/store";

import Main from "components/main";
import ReportsSideMenu from "components/reports/ReportsSideMenu";
import DepositsAndMovementsContainer from "components/reports/deposits-and-movements/DepositsAndMovementsContainer";
import DepositDetailsContainer from "components/reports/deposits-and-movements/DepositDetailsContainer";

import { FiltersProvider } from "components/reports/deposits-and-movements/DepositsAndMovementsFiltersContext";

const DepositsAndMovements: PageWithStore = ({ dispatch, ui: { lang } }) => {
  const { titles } = useLang(lang);
  const router = useRouter();

  React.useEffect(() => {
    dispatch(
      setPageTitle(
        titles.reports.main_title +
          " | " +
          titles.reports.deposits_and_movements
      )
    );
  }, [
    dispatch,
    titles.reports.main_title,
    titles.reports.deposits_and_movements,
  ]);

  return (
    <>
      <Head>
        <title>
          Smart -{" "}
          {titles.reports.main_title +
            " | " +
            titles.reports.deposits_and_movements}
        </title>
      </Head>
      <Main>
        <ReportsSideMenu lang={lang}>
          <FiltersProvider>
            {router.query.id ? (
              <section className="deposit-details">
                <DepositDetailsContainer
                  depositId={router.query.id as string}
                />
              </section>
            ) : (
              <section className="movements">
                <DepositsAndMovementsContainer />
              </section>
            )}
          </FiltersProvider>
        </ReportsSideMenu>
      </Main>
    </>
  );
};

export default withAuth(wrappedOnStore(DepositsAndMovements));
