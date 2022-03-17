import React, {useEffect} from "react";
import Head from "next/head";
import {iLink} from "../../@types/components/index";
import svgs from "../../helpers/svgs";
import useLang from "../../hooks/useLang";
import {setPageTitle} from "../../store/actions/uiActions";
import Main from "../../components/main/index";
import SideMenu from "../../components/main/SideMenu";
import withAuth from "../../helpers/withAuth";
import {ComponentWithStore} from "../../@types/store";
import {wrappedOnStore} from "../../store/index";
import StatusLinkFilters from "../../components/payments/reports/StatusLinkFilters";
import StatusLinkDetailContainer from "../../components/payments/reports/StatusLinkDetailContainer";
import StatusLinkTable from "../../components/payments/reports/StatusLinkTable";
import {unsetStatusLinkTable} from "../../store/actions/paymentAction";

const Reports: ComponentWithStore = ({dispatch, ui: {lang}}) => {
    const {titles} = useLang(lang);

    const menu: Array<iLink> = [
        {
            svgId: svgs.tune,
            text: titles.profile.preferences.remote_payments.payment_links,
            route: "/payments/generate",
        },
        {
            svgId: svgs.lock,
            text: titles.profile.preferences.remote_payments.reports,
            route: "/payments/reports",
        },
    ];

    useEffect(() => {
        dispatch(
            setPageTitle(titles.payments.main_title + " | " + titles.payments.status)
        );
        return () => {
            dispatch(unsetStatusLinkTable());
        };
    }, [dispatch, titles.payments.main_title, titles.payments.status]);

    return (
        <>
            <Head>
                <title>
                    Smart - {titles.payments.main_title + " | " + titles.payments.status}
                </title>
            </Head>
            <Main>
                <SideMenu links={menu} title={titles.payments.status}>
                    <section className="transactions">
                        <StatusLinkFilters
                            titles={titles}
                        />
                        <StatusLinkTable/>
                    </section>
                </SideMenu>
                <StatusLinkDetailContainer/>
            </Main>
        </>
    );
};

export default withAuth(wrappedOnStore(Reports));
