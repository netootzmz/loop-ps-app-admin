import React from "react";
import svgs from "../../helpers/svgs";
import { iLink } from "../../@types/components/index";
import { langs } from "../../@types/lang";
import SideMenu from "../../components/main/SideMenu";
import useLang from "../../hooks/useLang";

interface Props {
  children: React.ReactNode;
  lang: langs;
}

const ReportsSideMenu = ({ children, lang }: Props) => {
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

  return (
    <SideMenu links={menu} title={titles.reports.main_title}>
      {children}
    </SideMenu>
  );
};

export default ReportsSideMenu;
