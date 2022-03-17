import React, { useEffect } from 'react';
import Head from 'next/head';
import Main from '../../../components/main';
import SideMenu from '../../../components/main/SideMenu';
import svgs from '../../../helpers/svgs';
import useForm from '../../../hooks/useForm';
import useLang from '../../../hooks/useLang'
import withAuth from '../../../helpers/withAuth';
import { ConfigurationFiles } from '../../../components/conciliation/files/ConfigurationFiles';
import { ConfigurationTable } from '../../../components/conciliation/files/ConfigurationTable';
import { iLink } from '../../../@types/components/index';
import { PageWithStore } from '../../../@types/store'
import { setPageTitle } from '../../../store/actions/uiActions';
import { unsetTransactionsTable } from '../../../store/actions/transactionsActions';
import { wrappedOnStore } from '../../../store'


const FilesAndProcess: PageWithStore = ({ dispatch, ui: {lang} }) => {
    
    const { titles } = useLang(lang);
    
    const menu: Array<iLink> = [
        {
            svgId: svgs.receipt,
            text: titles.conciliation.digits,
            route: "/conciliation"
        },
        // {
        //     svgId: svgs.receipt,
        //     text: titles.conciliation.detail,
        //     route: "/conciliation"
        // },
        // {
        //     svgId: svgs.receipt,
        //     text: titles.conciliation.liquidation_log,
        //     route: "/conciliation"
        // },
        {
            svgId: svgs.receipt,
            text: titles.conciliation.dispersion,
            route: "/conciliation/dispersion"
        },
        // {
        //     svgId: svgs.receipt,
        //     text: titles.conciliation.liquidation_detail,
        //     route: "/conciliation"
        // },
        // {
        //     svgId: svgs.receipt,
        //     text: titles.conciliation.log,
        //     route: "/conciliation"
        // },
        {
            svgId: svgs.receipt,
            text: titles.conciliation.configuration,
            route: "/conciliation/files"
        },
    ];

    const { values, reset, handleInputChange } = useForm<{
        layoutName: string;
        description: string;
        transactionKey: string;
        transactionTemplate: string;
        documentHeader: string;
        registNum: string;
        registState: string;
        registSeparator: string;
        acquirer: string;        
    }>({

    });

    const information = [
        {
            layout_name: "Nombre del layout",
            description_layout: "Descripción de layout",
            acquirer: "Adquiriente",
            user_regist: "Usuario registro",
            status: "Estatus",
            regist_date: "dd/mm/aa HH:MM:SS",
            actions: ["a", "b", "c"]
        },
        {
            layout_name: "Nombre del layout",
            description_layout: "Descripción de layout",
            acquirer: "Adquiriente",
            user_regist: "Usuario registro",
            status: "Estatus",
            regist_date: "dd/mm/aa HH:MM:SS",
            actions: ["a", "b", "c"]
        },
        {
            layout_name: "Nombre del layout",
            description_layout: "Descripción de layout",
            acquirer: "Adquiriente",
            user_regist: "Usuario registro",
            status: "Estatus",
            regist_date: "dd/mm/aa HH:MM:SS",
            actions: ["a", "b", "c"]
        },
        {
            layout_name: "Nombre del layout",
            description_layout: "Descripción de layout",
            acquirer: "Adquiriente",
            user_regist: "Usuario registro",
            status: "Estatus",
            regist_date: "dd/mm/aa HH:MM:SS",
            actions: ["a", "b", "c"]
        },
        {
            layout_name: "Nombre del layout",
            description_layout: "Descripción de layout",
            acquirer: "Adquiriente",
            user_regist: "Usuario registro",
            status: "Estatus",
            regist_date: "dd/mm/aa HH:MM:SS",
            actions: ["a", "b", "c"]
        },
        {
            layout_name: "Nombre del layout",
            description_layout: "Descripción de layout",
            acquirer: "Adquiriente",
            user_regist: "Usuario registro",
            status: "Estatus",
            regist_date: "dd/mm/aa HH:MM:SS",
            actions: ["a", "b", "c"]
        },
        {
            layout_name: "Nombre del layout",
            description_layout: "Descripción de layout",
            acquirer: "Adquiriente",
            user_regist: "Usuario registro",
            status: "Estatus",
            regist_date: "dd/mm/aa HH:MM:SS",
            actions: ["a", "b", "c"]
        }
    ];

    useEffect(()=>{
        dispatch(
            setPageTitle(
                titles.conciliation.main_title
            )
        );
        return () => {
            dispatch(unsetTransactionsTable());
        }
    }, [ dispatch, titles.conciliation.main_title ]);
    return (
        <>
            <Head>
                <title>
                    Smart - {" "}
                    { titles.conciliation.main_title + " | " + titles.conciliation.configuration }
                </title>
            </Head>   
            <Main>
                <SideMenu links={menu} title={titles.conciliation.main_title}>
                    <section className="transactions">
                        <ConfigurationFiles
                            values={values}
                            reset={reset}
                            handleInputChange={handleInputChange}
                        />
                        {
                            information
                            ?
                                <ConfigurationTable
                                    information={information}
                                />
                            :
                                <div></div>
                        }
                    </section>
                </SideMenu>
            </Main>
        </>
    )
}

export default withAuth(wrappedOnStore(FilesAndProcess));