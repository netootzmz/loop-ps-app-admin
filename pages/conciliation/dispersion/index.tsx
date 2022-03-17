import React, { useEffect, useState } from 'react';
import customFetch from '../../../helpers/customFetch';
import Head from 'next/head';
import Main from '../../../components/main';
import moment from 'moment';
import SideMenu from '../../../components/main/SideMenu';
import svgs from '../../../helpers/svgs';
import Swal from "sweetalert2";
import useForm from '../../../hooks/useForm';
import useLang from '../../../hooks/useLang';
import withAuth from '../../../helpers/withAuth'

import { DispersionFilters } from '../../../components/conciliation/dispersion/DispersionFilters';
import { DispersionTable } from '../../../components/conciliation/dispersion/DispersionTable';
import { iDownloadDispersionFileReq, iGetDispersionDataReq } from '../../../@types/api/req';
import { iDownloadDispersionFileRes, iGetDispersionDataRes } from '../../../@types/api/res';
import { iLink } from '../../../@types/components/index';
import { PageWithStore } from '../../../@types/store'
import { saveAs } from "file-saver";
import { setPageTitle } from '../../../store/actions/uiActions';
import { unsetTransactionsTable } from '../../../store/actions/transactionsActions';
import { wrappedOnStore } from '../../../store'

const Dispersion: PageWithStore = ({ dispatch, ui: { lang } }) => {
    const { titles } = useLang(lang);
    const [ information, setInformation ] = useState();

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
        createdAt: string;
        createdAt2: string;
        merchantNumber: string;
    }>({
        initialValues:{
            createdAt: moment().startOf("day").format("YYYY-MM-DD"),
            createdAt2: moment().startOf("day").format("YYYY-MM-DD"),
            merchantNumber: ""
        }
    });

    const handleDownload = async() => {
        Swal.fire({
            title: `${titles.conciliation.parameters.processing}`,
            backdrop: `
          rgba(0,0,123,0.4)
          left top
          no-repeat
        `,
            allowOutsideClick: false,
            didOpen: () => {
              Swal.showLoading();
            },
        });   
        await customFetch<iDownloadDispersionFileReq, iDownloadDispersionFileRes>(
            "conciliation/downloadDispersionFile",
            true,
            "POST",
            {
                star_date: values.createdAt,
                end_date: values.createdAt2
            }
        ).then((response: any)=>{
            Swal.close();
            var spai = Buffer.from(response.spai.document, "base64");
            saveAs(
                new Blob([spai], { type: "application/octet-stream" }),
                response.spai.file_name
            );
            var terceros = Buffer.from(response.terceros.document, "base64");
            saveAs(
                new Blob([terceros], { type: "application/octet-stream" }),
                response.terceros.file_name
            )
            Swal.fire({
                icon: "success",
                title: `${titles.conciliation.parameters.success}`,
                text: `${titles.conciliation.parameters.success_download}`
            });
        }).catch((error)=>{
            Swal.close();
            var spai = Buffer.from(error.spai.document, "base64");
            saveAs(
                new Blob([spai], { type: "application/octet-stream" }),
                error.spai.file_name
            );
            var terceros = Buffer.from(error.terceros.document, "base64");
            saveAs(
                new Blob([terceros], { type: "application/octet-stream" }),
                error.terceros.file_name
            )
            Swal.fire({
                icon: "success",
                title: `${titles.conciliation.parameters.success}`,
                text: `${titles.conciliation.parameters.success_download}`
            });
        })
    }

    const getInfo = async() => {
        Swal.fire({
            title: `${titles.conciliation.parameters.processing}`,
            backdrop: `
          rgba(0,0,123,0.4)
          left top
          no-repeat
        `,
            allowOutsideClick: false,
            didOpen: () => {
              Swal.showLoading();
            },
        });   
        await customFetch<iGetDispersionDataReq, iGetDispersionDataRes>(
            "conciliation/getDispersionData",
            true,
            "POST",
            {
                dispersion_star_date: values.createdAt,
                dispersion_end_date: values.createdAt2,
            }
        ).then((response: any)=>{
            Swal.close();
            if(response.codeStatus === "Ok"){
                if(response.information.data.length > 0){
                    setInformation(response.information);
                    Swal.fire({
                        icon: "success",
                        title: `${titles.conciliation.parameters.dispersion_found}`,
                        timer: 2000
                    });
                }else{
                    Swal.fire({
                        icon:"error",
                        title: `${titles.conciliation.parameters.error}`,
                        text: `${titles.conciliation.parameters.dispersion_not_found}`
                    })
                }
            }else{
                Swal.fire({
                    icon: "error",
                    title: `${titles.conciliation.parameters.error}`,
                    text: `${titles.conciliation.parameters.dispersion_error}`,
                    timer: 3000
                });
            }
        }).catch((error: any)=>{
            Swal.close();
            if(error.codeStatus === "Ok"){
                if(error.information.data.length > 0){
                    setInformation(error.information);
                    Swal.fire({
                        icon: "success",
                        title: `${titles.conciliation.parameters.dispersion_found}`,
                        timer: 2000
                    });
                }else{
                    Swal.fire({
                        icon:"error",
                        title: `${titles.conciliation.parameters.error}`,
                        text: `${titles.conciliation.parameters.dispersion_not_found}`
                    })
                }
            }else{
                Swal.fire({
                    icon: "error",
                    title: `${titles.conciliation.parameters.error}`,
                    text: `${titles.conciliation.parameters.dispersion_error}`,
                    timer: 3000
                });
            }
        })
    }
    
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
                    { titles.conciliation.main_title + " | "  + titles.conciliation.dispersion}
                </title>
            </Head>
            <Main>
                <SideMenu links={menu} title={titles.conciliation.main_title}>
                    <section className="transactions">
                        <DispersionFilters
                            values={values}
                            reset={reset}
                            handleInputChange={handleInputChange}
                            handleSubmit={getInfo}
                            handleDownload={handleDownload}
                            titles={titles}
                        />
                        {
                            information
                            ?
                                <DispersionTable
                                    information={information || []}
                                    titles={titles}
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

export default withAuth(wrappedOnStore(Dispersion));
