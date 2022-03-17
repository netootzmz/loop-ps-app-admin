import React, { useEffect } from 'react';
import Head from 'next/head';
import Main from '../../../components/main';
import SideMenu from '../../../components/main/SideMenu';
import svgs from '../../../helpers/svgs';
import useLang from '../../../hooks/useLang';
import { iLink } from '../../../@types/components/index';
import { PageWithStore } from '../../../@types/store'
import { setPageTitle } from '../../../store/actions/uiActions';
import { unsetTransactionsTable } from '../../../store/actions/transactionsActions';
import withAuth from '../../../helpers/withAuth';
import { wrappedOnStore } from '../../../store';
import useForm from '../../../hooks/useForm';
import { LoadAdjust } from '../../../components/monetaryAdjustments/massiveAdjust/LoadAdjust';
import { DownloadLayout } from '../../../components/monetaryAdjustments/massiveAdjust/DownloadLayout';

const MassiveAdjust: PageWithStore = ({dispatch, ui:{ lang }}) => {
    const { titles } = useLang(lang);

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
        file: string;
    }>({
        initialValues: {
            file: ""
        }
    });

    const downloadLayout = async() => {
        console.log("descarga")
    }

    useEffect(()=>{
        dispatch(
            setPageTitle(titles.adjustment.main_title)
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
                    {titles.adjustment.main_title + " | " + titles.adjustment.massive}
                </title>
            </Head>   
            <Main>
                <SideMenu links={menu} title={titles.adjustment.massive}>
                    <section className="massiveAdjust">
                        <LoadAdjust
                            file={values.file}
                            reset={reset}
                            handleInputChange={handleInputChange}
                            titles={titles}
                        />
                        <DownloadLayout
                            downloadLayout={downloadLayout}
                            titles={titles}
                        />
                    </section>
                </SideMenu>
            </Main>
        </>
    )
}

export default withAuth(wrappedOnStore(MassiveAdjust));