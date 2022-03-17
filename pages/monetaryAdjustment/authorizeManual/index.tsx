import React, { useEffect } from 'react';
import Head from 'next/head';
import Main from '../../../components/main';
import SideMenu from '../../../components/main/SideMenu';
import { iLink } from '../../../@types/components/index';
import { PageWithStore } from '../../../@types/store'
import svgs from '../../../helpers/svgs';
import withAuth from '../../../helpers/withAuth';
import useLang from '../../../hooks/useLang';
import { wrappedOnStore } from '../../../store';
import { unsetTransactionsTable } from '../../../store/actions/transactionsActions';
import { setPageTitle } from '../../../store/actions/uiActions';
import useForm from '../../../hooks/useForm';
import moment from 'moment';
import { AuthorizeFilters } from '../../../components/monetaryAdjustments/authorizeManual/AuthorizeFilters';
import { AuthorizeTable } from '../../../components/monetaryAdjustments/authorizeManual/AuthorizeTable';

const AuthorizeManual: PageWithStore = ({ dispatch, ui: { lang } }) => {
    const { titles } = useLang(lang);

    const information = [
        {
            number: 1,
            adjustName: "Devolución",
            amount: 45.3,
            nature: "Cargo",
            idCommerce: 1024556,
            commerceName: "La chilanguita",
            solution: "eCommerce",
            captureDate: "14/02/2021",
            userCapture: "Stephany",
            authorize: true,
            userAuthorize: "Eder",
            authDate: "14/02/2021",
            userAuthorize2: "José",
            authDate2: "14/02/2021",
            applicationStatus: "Sí"
        },
        {
            number: 2,
            adjustName: "Devolución",
            amount: 58978.02,
            nature: "Cargo",
            idCommerce: 1024556,
            commerceName: "La chilanguita",
            solution: "eCommerce",
            captureDate: "14/02/2021",
            userCapture: "Stephany",
            authorize: false,
            userAuthorize: "Eder",
            authDate: "14/02/2021",
            userAuthorize2: "José",
            authDate2: "14/02/2021",
            applicationStatus: "Sí"
        },
        {
            number: 3,
            adjustName: "Devolución",
            amount: 453.88,
            nature: "Cargo",
            idCommerce: 1024556,
            commerceName: "La chilanguita",
            solution: "eCommerce",
            captureDate: "14/02/2021",
            userCapture: "Stephany",
            authorize: true,
            userAuthorize: "Eder",
            authDate: "14/02/2021",
            userAuthorize2: "José",
            authDate2: "14/02/2021",
            applicationStatus: "Sí"
        },
        {
            number: 4,
            adjustName: "Devolución",
            amount: 102,
            nature: "Cargo",
            idCommerce: 1024556,
            commerceName: "La chilanguita",
            solution: "eCommerce",
            captureDate: "14/02/2021",
            userCapture: "Stephany",
            authorize: false,
            userAuthorize: "Eder",
            authDate: "14/02/2021",
            userAuthorize2: "José",
            authDate2: "14/02/2021",
            applicationStatus: "Sí"
        }
    ]
    
    const menu: Array<iLink> = [
        {
            svgId: svgs.monetaryRegist,
            text: titles.adjustment.types,
            route: "/monetaryAdjustment"
        },
        // {
        //     svgId: svgs.receipt,
        //     text: titles.adjustment.reports,
        //     route: "/moneyAdjustment"
        // },
        {
            svgId: svgs.checklist,
            text: titles.adjustment.configuration,
            route: "/monetaryAdjustment/monthsConfiguration"
        },
        {
            svgId: svgs.receipt,
            text: titles.adjustment.manual,
            route: "/monetaryAdjustment/manualAdjustment"
        },
        {
            svgId: svgs.tagList,
            text: titles.adjustment.auth,
            route: "/monetaryAdjustment/authorizeManual"
        },
        {
            svgId: svgs.massiveAdjust,
            text: titles.adjustment.massive,
            route: "/monetaryAdjustment/massiveAdjust"
        },
        // {
        //     svgId: svgs.receipt,
        //     text: titles.adjustment.authMassive,
        //     route: "/moneyAdjustment"
        // },
    ];

    const { values, reset, handleInputChange } = useForm<{
        createdAt: string;
        createdAt2: string;
        approve_status: string;
        application_status: string;
    }>({
        initialValues:{
            createdAt: moment().startOf("day").format("YYYY-MM-DD"),
            createdAt2: moment().startOf("day").format("YYYY-MM-DD"),
            approve_status: "",
            application_status: ""
        }
    })

    const getInfo = async() => {
        console.log("getinfo");
    }

    useEffect(()=>{
        dispatch(
            setPageTitle(
                titles.adjustment.main_title
            )
        );
        return () => {
            dispatch(unsetTransactionsTable());
        }
    }, [dispatch, titles.adjustment.main_title]);

    return (
        <>
            <Head>
                <title>
                    Smart - {" "}
                    { titles.adjustment.main_title + " | " + titles.adjustment.auth }
                </title>
            </Head>   
            <Main>
                <SideMenu links={menu} title={titles.adjustment.main_title}>
                    <section className="transactions">
                        <AuthorizeFilters
                            values={values}
                            reset={reset}
                            handleInputChange={handleInputChange}
                            getInfo={getInfo}
                            titles={titles}
                        />
                        <AuthorizeTable
                            information={information}
                            titles={titles}
                        />
                    </section>
                </SideMenu>
            </Main>
        </>
    )
}

export default withAuth(wrappedOnStore(AuthorizeManual))