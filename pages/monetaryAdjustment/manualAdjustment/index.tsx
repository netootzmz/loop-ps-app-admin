import React, { useEffect, useState } from 'react'
import svgs from '../../../helpers/svgs'
import useLang from '../../../hooks/useLang'
import withAuth from '../../../helpers/withAuth'
import { iLink } from '../../../@types/components/index';
import { PageWithStore } from '../../../@types/store'
import { wrappedOnStore } from '../../../store'
import { setPageTitle } from '../../../store/actions/uiActions';
import { unsetTransactionsTable } from '../../../store/actions/transactionsActions';
import Head from 'next/head';
import Main from '../../../components/main';
import SideMenu from '../../../components/main/SideMenu';
import { SearchCommerce } from '../../../components/monetaryAdjustments/manualAdjustment/SearchCommerce';
import { TableCommerce } from '../../../components/monetaryAdjustments/manualAdjustment/TableCommerce';
import { DetailAdjustment } from '../../../components/monetaryAdjustments/manualAdjustment/DetailAdjustment';
import useForm from '../../../hooks/useForm';

const ManualAdjustment: PageWithStore = ({ dispatch, ui: { lang } }) => {
    const { titles } = useLang(lang);
    const [ haveData, setHaveData ] = useState(false);

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

    const information: Array<any> = [
        {
            commerceName: "Nombre del comercio",
            idCommerce: "0000 0000 0000",
            edit: true
        },
        {
            commerceName: "Nombre del comercio",
            idCommerce: "0000 0000 0000",
            edit: true
        },
        {
            commerceName: "Nombre del comercio",
            idCommerce: "0000 0000 0000",
            edit: true
        },
        {
            commerceName: "Nombre del comercio",
            idCommerce: "0000 0000 0000",
            edit: true,
        },
        {
            commerceName: "Nombre del comercio",
            idCommerce: "0000 0000 0000",
            edit: true
        },
        {
            commerceName: "Nombre del comercio",
            idCommerce: "0000 0000 0000",
            edit: true
        }
    ]

    const { values, reset, handleInputChange, handleSubmit } = useForm<{
        nameCommerce: string;
        idCommerce: string;
        adjustLine: string;
        category: string;
        nature: string;
        nameAdjustType: string;        
        amount: string;
    }>({
        initialValues: {
            nameCommerce: "",
            idCommerce: "",
            adjustLine: "",
            category: "",
            nature: "",
            nameAdjustType: "",
            amount: "$0.00 MXN"            
        },
        onSubmit: async () => {
            console.log(values);
        }
    });

    function searchData() {
        console.log("hola");
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
                    { titles.adjustment.main_title + " | " + titles.adjustment.manual }
                </title>
            </Head>   
            <Main>
                <SideMenu links={menu} title={titles.adjustment.main_title}>
                    <section className="manualAdjustment">
                        <SearchCommerce
                            nameCommerce={values.nameCommerce}
                            idCommerce={values.idCommerce}
                            searchData={searchData}
                            handleInputChange={handleInputChange}
                            titles={titles}
                        />
                        <TableCommerce
                            information={information}
                            setHaveData={setHaveData}
                            reset={reset}
                            titles={titles}
                        />
                        <DetailAdjustment
                            haveData={haveData}
                            values={values}
                            reset={reset}
                            handleInputChange={handleInputChange}
                            handleSubmit={handleSubmit}
                            titles={titles}
                        />
                    </section>
                </SideMenu>
            </Main>
        </>
    )
}

export default withAuth(wrappedOnStore(ManualAdjustment))