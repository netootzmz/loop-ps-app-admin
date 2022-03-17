import React, { useEffect } from 'react';
import Head from 'next/head';
import Main from "../../components/main";
import moment from 'moment';
import SideMenu from '../../components/main/SideMenu';
import svgs from '../../helpers/svgs';
import Swal from "sweetalert2";
import useForm from '../../hooks/useForm';
import useLang from '../../hooks/useLang';
import withAuth from '../../helpers/withAuth';

import { iLink } from '../../@types/components/index';
import { PageWithStore } from '../../@types/store';
import { setPageTitle } from '../../store/actions/uiActions';
import { unsetTransactionsTable } from '../../store/actions/transactionsActions';
import { wrappedOnStore } from '../../store';
import { DispersionFilter } from '../../components/dispersion/DispersionFilter';
import { DispersionTable } from '../../components/dispersion/DispersionTable';

const Dispersion: PageWithStore = ({ dispatch, ui: { lang } }) => {
    const { titles } = useLang(lang);

    const menu: Array<iLink> = [
        {
            svgId: svgs.receipt,
            text: titles.dispersion.dispersion_file,
            route: "/dispersion"
        },
        {
            svgId: svgs.receipt,
            text: titles.dispersion.pending_payments,
            route: "/dispersion/pending"
        }
    ];

    const information = [
        {
            date_generation:"dd/mm/aaaa",
            hour_generation:"HH:MM:SS",
            file_name_dispersion:"Nombre del archivo",
            download_file: ["a", "b", "c"],
            upload_date:"dd/mm/aaaa",
            upload_hour:"HH:MM:SS",
            file_name_movement: "Nombre del archivo",
            upload_user:"Nombre Apellido",
            upload_movement:["a", "b", "c"],
            status: 1,
            not_process: ["a", "b", "c"]
        },
        {
            date_generation:"dd/mm/aaaa",
            hour_generation:"HH:MM:SS",
            file_name_dispersion:"Nombre del archivo",
            download_file: ["a", "b", "c"],
            upload_date:"dd/mm/aaaa",
            upload_hour:"HH:MM:SS",
            file_name_movement: "Nombre del archivo",
            upload_user:"Nombre Apellido",
            upload_movement:["a", "b", "c"],
            status: 2,
            not_process: ["a", "b", "c"]
        },
        {
            date_generation:"dd/mm/aaaa",
            hour_generation:"HH:MM:SS",
            file_name_dispersion:"Nombre del archivo",
            download_file: ["a", "b", "c"],
            upload_date:"dd/mm/aaaa",
            upload_hour:"HH:MM:SS",
            file_name_movement: "Nombre del archivo",
            upload_user:"Nombre Apellido",
            upload_movement:["a", "b", "c"],
            status: 3,
            not_process: ["a", "b", "c"]
        },
        {
            date_generation:"dd/mm/aaaa",
            hour_generation:"HH:MM:SS",
            file_name_dispersion:"Nombre del archivo",
            download_file: ["a", "b", "c"],
            upload_date:"dd/mm/aaaa",
            upload_hour:"HH:MM:SS",
            file_name_movement: "Nombre del archivo",
            upload_user:"Nombre Apellido",
            upload_movement:["a", "b", "c"],
            status: 2,
            not_process: ["a", "b", "c"]
        },
        {
            date_generation:"dd/mm/aaaa",
            hour_generation:"HH:MM:SS",
            file_name_dispersion:"Nombre del archivo",
            download_file: ["a", "b", "c"],
            upload_date:"dd/mm/aaaa",
            upload_hour:"HH:MM:SS",
            file_name_movement: "Nombre del archivo",
            upload_user:"Nombre Apellido",
            upload_movement:["a", "b", "c"],
            status: 3,
            not_process: ["a", "b", "c"]
        },
        {
            date_generation:"dd/mm/aaaa",
            hour_generation:"HH:MM:SS",
            file_name_dispersion:"Nombre del archivo",
            download_file: ["a", "b", "c"],
            upload_date:"dd/mm/aaaa",
            upload_hour:"HH:MM:SS",
            file_name_movement: "Nombre del archivo",
            upload_user:"Nombre Apellido",
            upload_movement:["a", "b", "c"],
            status: 1,
            not_process: ["a", "b", "c"]
        }
    ];

    const { values, reset, handleInputChange } = useForm<{
        createdAt: string;
        createdAt2: string;
    }>({
        initialValues: {
            createdAt: moment().startOf("day").format("YYYY-MM-DD"),
            createdAt2: moment().startOf("day").format("YYYY-MM-DD")
        }
    });

    const getInfo = () => {
        if(!values.createdAt){
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Se debe de seleccionar una fecha"
            })
        }
        else if(!values.createdAt2){
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Se debe seleccionar un rango de fechas valido"
            });
        }
        else{
            console.log("Hola");
        }
    }

    const generateFile = () => {
        console.log("generate file");
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
            timer: 3000
        });    
    }   

    useEffect(()=>{
        dispatch(
            setPageTitle(
                titles.dispersion.main_title
            )
        );
        return () => {
            dispatch(unsetTransactionsTable());
        }
    }, [ dispatch, titles.dispersion.main_title ]);

    return (
        <>
            <Head>
                <title>
                    Smart - {" "}
                    { titles.dispersion.main_title + " | " + titles.dispersion.dispersion_file }
                </title>
            </Head> 
            <Main>
                <SideMenu links={ menu } title={titles.dispersion.main_title} >
                    <section className="dispersion_layout">
                        <DispersionFilter
                            values={values}
                            handleInputChange={handleInputChange}
                            reset={reset}
                            getInfo={getInfo}
                            generateFile={generateFile}
                        />
                        <DispersionTable
                            information={information}
                            getInfo={getInfo}
                        />                       
                    </section>
                </SideMenu>
            </Main>
        </>
    )
}

export default withAuth(wrappedOnStore(Dispersion));
