import React, { useEffect, useState } from 'react'
import Head from 'next/head';
import Main from '../../components/main';
import SideMenu from '../../components/main/SideMenu';
import svgs from '../../helpers/svgs';
import Swal from "sweetalert2";
import useForm from '../../hooks/useForm';
import useLang from '../../hooks/useLang';
import withAuth from '../../helpers/withAuth';
import { iLink } from '../../@types/components/index';

import { AdjustmentType } from '../../components/monetaryAdjustments/register/AdjustmentType';
import { PageWithStore } from '../../@types/store';
import { setPageTitle } from '../../store/actions/uiActions';
import { TableAdjustmentType } from '../../components/monetaryAdjustments/register/TableAdjustmentType';
import { unsetTransactionsTable } from '../../store/actions/transactionsActions';
import { wrappedOnStore } from '../../store';
import customFetch from '../../helpers/customFetch';
import { iGetCategoryOptionsRes, iGetNatureOptionsRes, iCustomResponse } from '../../@types/api/res';
import { iMonetaryAdjustmentDataReq, iMonetaryAdjustmentNewCategoryReq, iMonetaryAdjustmentUpdateReq } from '../../@types/api/req';

const MonetaryAdjustments: PageWithStore = ({ dispatch, ui: { lang } }) => {
    const { titles } = useLang(lang);

    const [ newAdjustType, setNewAdjustType ] = useState(false);
    const [ categoryOptions, setCategoryOptions ] = useState([]);
    const [ natureOptions, setNatureOptions ] = useState([]);
    const [ information, setInformation ] = useState();
    const [ isUpdate, setIsUpdate ] = useState(false);
    
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

    // const information: Array<any> = [
    //     { 
    //         adjustType: "Tipo de ajuste", 
    //         nameTypeAdjust: "Nombre tipo de ajuste", 
    //         nature: "cargo", 
    //         category: "Prueba", 
    //         createdBy: "Creado por",
    //         status: true,
    //         logs: [1,2,3,4],
    //         edit: ["a"]
    //     },
    //     { 
    //         adjustType: "Tipo de ajuste", 
    //         nameTypeAdjust: "Nombre tipo de ajuste", 
    //         nature: "abono", 
    //         category: "Prueba", 
    //         createdBy: "Creado por",
    //         status: false,
    //         logs: [1,2,3,4],
    //         edit: ["b"]
    //     },
    //     { 
    //         adjustType: "Tipo de ajuste", 
    //         nameTypeAdjust: "Nombre tipo de ajuste", 
    //         nature: "abono", 
    //         category: "Otro", 
    //         createdBy: "Creado por",
    //         status: true,
    //         logs: [1,2,3,4],
    //         edit: ["c"]
    //     }
    // ];

    const { values, errors,reset, handleInputChange, handleSubmit } = useForm<{
        adjustType: string;
        category: string;
        status: string;
        nameAdjustType: string;
        nature: string;
    }>({
        initialValues:{
            adjustType: "",
            category: "",
            status: "",
            nameAdjustType: "",
            nature: ""
        },
        onSubmit: async ()=>{
            //si trae todos los campos obligatorios muestra esto
            if(values.nameAdjustType !== '' && values.category !== '' && values.nature !== '' ){
                const saveModal= Swal.mixin({
                    customClass:{
                        confirmButton: "btn--modalConfirm",
                        cancelButton: "btn--modalCancel"
                    },
                    buttonsStyling: false
                })
                saveModal.fire({
                    imageUrl: '/warning.png',
                    imageWidth: 100,
                    imageHeight: 100,
                    title: `${titles.adjustment.parameters.saveConfirm} ${values.nameAdjustType}?`,
                    showCancelButton: true,
                    showConfirmButton: true,
                    cancelButtonText: `${titles.adjustment.parameters.noCancel}`,
                    confirmButtonText: `$${titles.adjustment.parameters.authorize}`,
                    reverseButtons: true,
                }).then(async(result)=>{
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
                    if(result.isConfirmed){
                        //agregar validacion en base a la respuesta del ms
                        console.log(isUpdate);
                        if(!isUpdate){
                            await customFetch<iMonetaryAdjustmentNewCategoryReq,iCustomResponse>(
                                "monetaryAdjustment/setNewCategory",
                                true,
                                "POST",
                                {
                                    "monetary-adjustment-name": values.nameAdjustType,
                                    "monetary-adjustment-category-id": parseInt(values.category),
                                    "monetary-adjustment-nature-id": parseInt(values.nature),
                                    "monetary-adjustment-status": parseInt(values.status) === 1 ? 1 : 0
                                }
                            ).then((response)=>{
                                Swal.close();
                                if(response.code === "OK"){
                                    Swal.fire({
                                        icon: 'success',
                                        title: `${titles.adjustment.parameters.saveAdjust}`
                                    });
                                    searchData()
                                }else{
                                    Swal.fire({
                                        icon: "error",
                                        title: "Error",
                                        timer: 5000,
                                        text: `${titles.adjustment.parameters.errorProcess}`
                                    });
                                }
                            }).catch((error)=>{
                                Swal.close();
                                if(error.code === "OK"){
                                    Swal.fire({
                                        icon: 'success',
                                        title: `${titles.adjustment.parameters.saveAdjust}`
                                    });
                                    searchData();
                                }else{
                                    Swal.fire({
                                        icon: "error",
                                        title: "Error",
                                        timer: 5000,
                                        text: `${titles.adjustment.parameters.errorProcess}`
                                    });
                                }
                            })                    
                        }else{
                            await customFetch<iMonetaryAdjustmentUpdateReq, iCustomResponse>(
                                "monetaryAdjustment/updateCategory",
                                true,
                                "POST",
                                {
                                    "monetary-adjustment-id": parseInt(values.adjustType),
                                    "monetary-adjustment-name": values.nameAdjustType,
                                    "monetary-adjustment-category-id": parseInt(values.category),
                                    "monetary-adjustment-nature-id": parseInt(values.nature),
                                    "monetary-adjustment-status": parseInt(values.status) === 1 ? 1 : 0
                                }
                            ).then((response)=>{
                                Swal.close();
                                console.log(response);
                                searchData();
                            }).catch((error)=>{
                                Swal.close();
                                console.log(error);
                                searchData();
                            })
                        }
                    }
                })

            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    timer: 5000,
                    text: `${titles.adjustment.parameters.errorRegist}`
                });
            }
            
        }
    });

    async function searchData()  {
        if(values.adjustType !== "" ||  values.category !== "" || values.status !==  "" || values.nameAdjustType !== "" || values.nature !== ""){
            //Aquí se debe consulta la información para la tabla
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
            await customFetch<iMonetaryAdjustmentDataReq, iCustomResponse>(
                "monetaryAdjustment/getTableInfo",
                true,
                "POST",
                {
                    "monetary-adjustment-id": parseInt(values.adjustType),
                    "monetary-adjustment-name": values.nameAdjustType,
                    "monetary-adjustment-category-id": parseInt(values.category),
                    "monetary-adjustment-nature-id": parseInt(values.nature),
                    "monetary-adjustment-status": parseInt(values.status)
                }
            ).then((response: any)=>{
                Swal.close();
                if(response.code === "OK"){
                    setInformation(response)
                    Swal.fire({
                        icon: "success",
                        title: `${titles.adjustment.parameters.dataFound}`,
                        showConfirmButton: true,
                        timer: 1000
                    })
                }else{
                    Swal.fire({
                        icon: "error",
                        text: `${titles.adjustment.parameters.dataNotFound}`
                    })
                }
            }).catch((error)=>{
                Swal.close();
                if(error.code === "OK"){
                    setInformation(error)
                    Swal.fire({
                        icon: "success",
                        title: `${titles.adjustment.parameters.dataFound}`,
                        showConfirmButton: true,
                        timer: 1000
                    })
                }else{
                    Swal.fire({
                        icon: "error",
                        text: `${titles.adjustment.parameters.dataNotFound}`
                    })
                }
            })
           
        }else{
            Swal.fire({
                icon: "error",
                title: `${titles.adjustment.parameters.selectFilter}`,
                timer: 5000
            })
        }
    }

    const getCategories = async() =>{
        await customFetch<{}, iGetCategoryOptionsRes>(
            "monetaryAdjustment/getCategory",
            true,
            "POST",
            {}
        ).then((response: any)=>{
            if(response.code !== "ECONNREFUSED" && response.code !== "ETIMEDOUT"){
                setCategoryOptions(response)
            }else{
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: `${titles.adjustment.parameters.dontObtain}`
                })
            }
        }).catch((error)=>{
            if(error.code !== "ECONNREFUSED" && error.code !== "ETIMEDOUT" ){
                setCategoryOptions(error);
            }else{
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: `${titles.adjustment.parameters.dontObtain}`
                })
            }
        })
    }

    const getNature = async() => {
        await customFetch<{}, iGetNatureOptionsRes>(
            "monetaryAdjustment/getNature",
            true,
            "POST",
            {}
        ).then((response: any)=>{
            if(response.code !== "ECONNREFUSED"){
                setNatureOptions(response);
            }else{
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: `${titles.adjustment.parameters.dontNature}`
                });
            }
        }).catch((error)=>{
            if(error.code !== "ECONNREFUSED"){
                setNatureOptions(error);
            }else{
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: `${titles.adjustment.parameters.dontNature}`
                });
            }
        })
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

    useEffect(() => {
        getCategories();
        getNature();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return(
        <>
            <Head>
                <title>
                    Smart - {" "}
                    {titles.adjustment.main_title + " | " + titles.adjustment.types}
                </title>
            </Head>
            <Main>
                <SideMenu links={menu} title={titles.adjustment.main_title}>
                    <section className="transactions">
                        <AdjustmentType
                             adjustType={values.adjustType}
                             category={values.category}
                             status={values.status}
                             nameAdjustType={values.nameAdjustType}
                             nature={values.nature}
                             errors={errors}
                             reset={reset}
                             handleInputChange={handleInputChange}
                             handleSubmit={handleSubmit}
                             searchData={searchData}
                             newAdjustType={newAdjustType}
                             setNewAdjustType={setNewAdjustType}
                             categoryData={categoryOptions}
                             natureData={natureOptions}
                             setIsUpdate={setIsUpdate}
                             titles={titles}
                        />
                        {
                            information
                            ?
                                <TableAdjustmentType
                                    information={information}
                                    setNewAdjustType={setNewAdjustType}
                                    reset={reset}
                                    setIsUpdate={setIsUpdate}
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


export default withAuth(wrappedOnStore(MonetaryAdjustments))