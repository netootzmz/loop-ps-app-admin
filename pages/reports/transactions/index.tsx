import React, { useEffect } from "react";
import Head from "next/head";
import useLang from "../../../hooks/useLang";
import { setPageTitle } from "../../../store/actions/uiActions";
import Main from "../../../components/main/index";
import withAuth from "../../../helpers/withAuth";
import { PageWithStore } from "../../../@types/store";
import { wrappedOnStore } from "../../../store/index";
import TransactionsFilters from "../../../components/reports/transactions/TransactionsFilters";
import {
  unsetTransactionsTable,
  // startGettingTransactionTableData,
} from "../../../store/actions/transactionsActions";
import TransactionsTable from "../../../components/reports/transactions/TransactionsTable";
import TransactionDetailContainer from "../../../components/reports/transactions/TransactionDetailContainer";
import { iLink } from "../../../@types/components/index";
import svgs from "helpers/svgs";
import SideMenu from "components/main/SideMenu";

const Transactions: PageWithStore = ({ dispatch, ui: { lang } }) => {
  const { titles } = useLang(lang);

  const menu: Array<iLink> = [
    {
      svgId: svgs.receipt,
      text: titles.reports.transactions,
      route: "/reports/transactions",
    },
    // {
    //   svgId: svgs.calendar,
    //   text: titles.reports.deposits_and_movements,
    //   route: "/reports/deposits-and-movements",
    // },
  ];

  useEffect(() => {
    dispatch(
      setPageTitle(
        titles.reports.main_title + " | " + titles.reports.transactions
      )
    );
    // dispatch(startGettingTransactionTableData({}));
    return () => {
      dispatch(unsetTransactionsTable());
    };
  }, [dispatch, titles.reports.main_title, titles.reports.transactions]);

  return (
    <>
      <Head>
        <title>
          Smart -{" "}
          {titles.reports.main_title + " | " + titles.reports.transactions}
        </title>
      </Head>
      <Main>
        <SideMenu links={menu} title={titles.reports.main_title}>
          <section className="transactions">
            <TransactionsFilters />
            <TransactionsTable />
          </section>
          <TransactionDetailContainer />
        </SideMenu>
      </Main>
    </>
  );
};

export default withAuth(wrappedOnStore(Transactions));
