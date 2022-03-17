import React, { useEffect } from 'react'
import Head from 'next/head';
import Main from '../../../components/main';
import SideMenu from '../../../components/main/SideMenu';
import svgs from '../../../helpers/svgs';
import Swal from "sweetalert2";
import useForm from '../../../hooks/useForm';
import useLang from '../../../hooks/useLang'
import withAuth from '../../../helpers/withAuth';
import { ConfigurationFilters } from '../../../components/monetaryAdjustments/configurationAmount/ConfigurationFilters';
import { ConfigurationTables } from '../../../components/monetaryAdjustments/configurationAmount/ConfigurationTables';
import { iLink } from '../../../@types/components/index';
import { PageWithStore } from '../../../@types/store'
import { setPageTitle } from '../../../store/actions/uiActions';
import { unsetTransactionsTable } from '../../../store/actions/transactionsActions';
import { wrappedOnStore } from '../../../store';


const MonthsConfiguration: PageWithStore = ({dispatch, ui:{ lang }, auth:{clientId}}) => {
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

    const information: Array<any> = [
        {
            number: "0000",
            user: "usuario1",
            nature: "naturaleza2",
            individualAmount: "$000,000.00",
            totalAmount: "$000,000.00",
            editAmount: "",
            key: 1
        },
        {
            number: "0001",
            user: "usuario2",
            nature: "naturaleza1",
            individualAmount: "$000,000.00",
            totalAmount: "$000,000.00",
            editAmount: "",
            key: 2
        },
        {
            number: "0002",
            user: "usuario2",
            nature: "naturaleza1",
            individualAmount: "$000,000.00",
            totalAmount: "$000,000.00",
            editAmount: "",
            key: 3
        },
        {
            number: "0003",
            user: "usuario1",
            nature: "naturaleza2",
            individualAmount: "$000,000.00",
            totalAmount: "$000,000.00",
            editAmount: "",
            key: 4
        }
    ]
    const format = (num: number) => num.toLocaleString('en-US', {
        minimumFractionDigits: 2,      
        maximumFractionDigits: 2,
    });    

    const { values, errors, reset, handleInputChange, handleSubmit } = useForm<{
        user: string;
        nature: string;
        individualAmount: string;
        totalAmount: string;
    }>({
        initialValues: {
            user: "",
            nature: "",
            individualAmount: "$0.00 MXN",
            totalAmount: "$0.00 MXN"
        },
        validations:{
            // user:{
            //     required:{
            //         value: true,
            //         message: "El campo es requerido"
            //     }
            // },
            // nature: {
            //     required: {
            //         value: true,
            //         message: "El campo es requerido"
            //     }
            // },
            // individualAmount:{
            //     required:{
            //         value: true,
            //         message: "El campo es requerido"
            //     },
            //     custom:{
            //         isValid: (val) =>  parseInt(
            //             (
            //               parseFloat(
            //                 val.split(" ")[0].split("$")[1].replaceAll(",", "")
            //               ) * 100
            //             ).toString()
            //           ) > 0,
            //         message: "Introduce una cantidad valida"
            //     }
            // },
            // totalAmount:{
            //     required:{
            //         value: true,
            //         message: "El campo es requerido"
            //     },
            //     custom:{
            //         isValid: (val) =>  parseInt(
            //             (
            //               parseFloat(
            //                 val.split(" ")[0].split("$")[1].replaceAll(",", "")
            //               ) * 100
            //             ).toString()
            //           ) > 0,
            //         message: "Introduce una cantidad valida"
            //     }
            // }
        },
        onSubmit: async ()=>{
            Swal.fire({
                title: `${titles.adjustment.parameters.processing}`,
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
            const individual =  parseInt((parseFloat(values.individualAmount.split(" ")[0].split("$")[1].replaceAll(",", "")) * 100).toString());
            const total = parseInt((parseFloat(values.totalAmount.split(" ")[0].split("$")[1].replaceAll(",", "")) * 100).toString());   
            if(values.user !== '' && values.nature !== '' && individual > 0 && total > 0){
                if(individual < total){
                    const saveModal= Swal.mixin({
                        customClass:{
                            confirmButton: "btn--modalConfirm",
                            cancelButton: "btn--modalCancel"
                        },
                        buttonsStyling: false
                    });
                    Swal.close();
                    saveModal.fire({
                        imageUrl: '/warning.png',
                        imageWidth: 100,
                        imageHeight: 100,
                        title: `${titles.adjustment.parameters.saveQuestion}`,
                        html:
                        `<span style='font-size: 18px;'><strong>${titles.adjustment.parameters.user}:</strong> ${values.user}</span><br>`+
                        `<span style='font-size: 18px;'><strong>${titles.adjustment.parameters.nature}:</strong> ${values.nature}</span><br>`+
                        `<span style='font-size: 18px;'><strong>${titles.adjustment.parameters.individualAmount}:</strong> $${ format(parseFloat(
                            values.individualAmount.split(" ")[0].split("$")[1].replaceAll(",", "")
                          ))} MXN</span><br>`+
                        `<span style='font-size: 18px;'><strong>Monto total diario:</strong> $${format(parseFloat(
                            values.totalAmount.split(" ")[0].split("$")[1].replaceAll(",", "")
                          ))} MXN</span>`    
                        ,
                        showCancelButton: true,
                        showConfirmButton: true,
                        cancelButtonText: `${titles.adjustment.parameters.noCancel}`,
                        confirmButtonText: `${titles.adjustment.parameters.yesCancel}`,
                        reverseButtons: true,
                    }).then((result)=>{
                        if(result.isConfirmed){
                            // Se dispara el ms para insertar en BD
                            // Se lanza de nuevo el ms de la consulta en caso de que sea exitosa la respuesta
                            Swal.fire({
                                icon: "success",
                                title: `${titles.adjustment.parameters.limitSave}`
                            })
        
                            //En el catch poner este modal
                            // Swal.fire({
                            //     icon: "error",
                            //     title: "Error",
                            //     timer: 5000,
                            //     text: "El proceso es erróneo, intente nuevamente"
                            // })
                        }else if(result.dismiss === Swal.DismissReason.cancel){
                            reset();
                            Swal.close();
                        }
                    });
                }else{
                    Swal.close();
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: `${titles.adjustment.parameters.errorLimit}`,
                        timer: 3000
                    })
                }
            }else{
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    timer: 3000,
                    text: `${titles.adjustment.parameters.notAmount}`
                })
            }
        }
    })

    useEffect(()=>{
        dispatch(
            setPageTitle( titles.adjustment.main_title )
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
                    {titles.adjustment.main_title + " | " + titles.adjustment.configuration}
                </title>
            </Head> 
            <Main>
                <SideMenu links={menu} title={titles.adjustment.main_title}>
                    <section className="transactions">
                        <ConfigurationFilters
                            values={values}
                            errors={errors}
                            reset={reset}
                            handleInputChange={handleInputChange}
                            handleSubmit={handleSubmit}
                            titles={titles}
                        />
                        <ConfigurationTables
                            information={information}
                            reset={reset}
                            clientId={clientId?.toString() || ""}
                            titles={titles}
                        />
                    </section>
                </SideMenu>
            </Main>
        </>
    )
}

export default withAuth(wrappedOnStore(MonthsConfiguration));