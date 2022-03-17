import React, { useEffect, useState } from "react";
import customFetch from "../../helpers/customFetch";
import Head from "next/head";
import Main from "../../components/main";
import moment from "moment";
import SideMenu from "../../components/main/SideMenu";
import svgs from "../../helpers/svgs";
import Swal from "sweetalert2";
import useForm from "../../hooks/useForm";
import useLang from "../../hooks/useLang";
import withAuth from "../../helpers/withAuth";

import { ConciliationFilter } from "../../components/conciliation/digits/ConciliationFilter";
import { ConciliationTable } from "../../components/conciliation/digits/ConciliationTable";
import {
  iGetCatalogReq,
  iGetConciliationTableInfoReq,
} from "../../@types/api/req";
import {
  iGetCatalogRes,
  iGetConciliationTableInfoRes,
} from "../../@types/api/res";
import { iLink } from "../../@types/components/index";
import { PageWithStore } from "../../@types/store";
import { setPageTitle } from "../../store/actions/uiActions";
import { unsetTransactionsTable } from "../../store/actions/transactionsActions";
import { wrappedOnStore } from "../../store";

const Conciliation: PageWithStore = ({ dispatch, ui: { lang } }) => {
  const { titles } = useLang(lang);
  const [catalogInfo, setCatalogInfo] = useState<any>({});
  const [information, setInformation] = useState<any>();

  const menu: Array<iLink> = [
    {
      svgId: svgs.receipt,
      text: titles.conciliation.digits,
      route: "/conciliation",
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
    // {
    //     svgId: svgs.receipt,
    //     text: titles.conciliation.dispersion,
    //     route: "/conciliation/dispersion"
    // },
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
    // {
    //     svgId: svgs.receipt,
    //     text: titles.conciliation.configuration,
    //     route: "/conciliation/files"
    // },
  ];

  const { values, reset, errors, handleInputChange } = useForm<{
    createdAt: string;
    createdAt2: string;
    bank: string;
    status: string;
    conciliationType: string;
  }>({
    initialValues: {
      createdAt: moment().startOf("day").format("YYYY-MM-DD"),
      createdAt2: moment().startOf("day").format("YYYY-MM-DD"),
      bank: "",
      status: "Todas",
      conciliationType: "Todas",
    },
  });

  const getInfo = async () => {
    if (values.bank !== "") {
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
      await customFetch<
        iGetConciliationTableInfoReq,
        iGetConciliationTableInfoRes
      >("conciliation/getTableInfo", true, "POST", {
        "transactions-summary-acquirer-name": [values.bank],
        "transactions-summary-start-date": values.createdAt,
        "transactions-summary-end-date": values.createdAt2,
        "transactions-summary-status": values.status ? values.status : null,
        "transactions-summary-type": values.conciliationType
          ? values.conciliationType
          : null,
      })
        .then((response: any) => {
          Swal.close();
          if (response.code === "OK") {
            if (response.data.length > 0) {
              setInformation(response);
              // Swal.fire({
              //     icon:"success",
              //     title: `${titles.conciliation.parameters.success}`,
              //     text: `${titles.conciliation.parameters.found_info}`,
              //     timer: 2000
              // });
            } else {
              setInformation(null);
              Swal.fire({
                icon: "warning",
                title: `${titles.conciliation.parameters.not_found}`,
                timer: 5000,
              });
            }
          } else if (response.code === "ECONNREFUSED") {
            setInformation(null);
            Swal.fire({
              icon: "error",
              title: "Error",
              text: `${titles.conciliation.parameters.ms_error}`,
              timer: 3000,
            });
          } else if (!values.createdAt2) {
            setInformation(null);
            Swal.fire({
              icon: "error",
              title: "Error",
              text: `Se debe seleccionar un rango de fechas valido`,
            });
          } else {
            setInformation(null);
            Swal.fire({
              icon: "error",
              title: "error",
              text: response.message,
            });
          }
          // Swal.close();
        })
        .catch((error) => {
          Swal.close();
          if (error.code === "OK") {
            if (error.data.length > 0) {
              setInformation(error);
              // Swal.fire({
              //     icon:"success",
              //     title: `${titles.conciliation.parameters.success}`,
              //     text: `${titles.conciliation.parameters.found_info}`,
              //     timer: 2000
              // });
            } else {
              setInformation(null);
              Swal.fire({
                icon: "warning",
                title: `${titles.conciliation.parameters.not_found}`,
                timer: 3000,
              });
            }
          } else if (error.code === "ECONNREFUSED") {
            setInformation(null);
            Swal.fire({
              icon: "error",
              title: "Error",
              text: `${titles.conciliation.parameters.ms_error}`,
              timer: 3000,
            });
          } else if (!values.createdAt2) {
            setInformation(null);
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "Se debe seleccionar un rango de fechas valido",
            });
          } else {
            setInformation(null);
            Swal.fire({
              icon: "error",
              title: "error",
              text: error.message,
            });
          }
          // Swal.close();
        });
    } else {
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
      let banks: any[] = [];
      catalogInfo.information.information.forEach((data: any) => {
        banks.push(data.nameOption);
      });
      await customFetch<
        iGetConciliationTableInfoReq,
        iGetConciliationTableInfoRes
      >("conciliation/getTableInfo", true, "POST", {
        "transactions-summary-acquirer-name": banks,
        "transactions-summary-start-date": values.createdAt,
        "transactions-summary-end-date": values.createdAt2,
        "transactions-summary-status": values.status ? values.status : null,
        "transactions-summary-type": values.conciliationType
          ? values.conciliationType
          : null,
      })
        .then((response: any) => {
          Swal.close();
          if (response.code === "OK") {
            if (response.data.length > 0) {
              setInformation(response);
              // Swal.fire({
              //     icon:"success",
              //     title: `${titles.conciliation.parameters.success}`,
              //     text: `${titles.conciliation.parameters.found_info}`,
              //     timer: 2000
              // });
            } else {
              setInformation(null);
              Swal.fire({
                icon: "warning",
                title: `${titles.conciliation.parameters.not_found}`,
                timer: 3000,
              });
            }
          } else if (response.code === "ECONNREFUSED") {
            setInformation(null);
            Swal.fire({
              icon: "error",
              title: "Error",
              text: `${titles.conciliation.parameters.ms_error}`,
              timer: 3000,
            });
          } else if (response.error === "Internal Server Error") {
            setInformation(null);
            Swal.fire({
              icon: "error",
              title: "Error",
              text: `${titles.conciliation.parameters.no_data}`,
              timer: 3000,
            });
          } else if (!values.createdAt2) {
            setInformation(null);
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "Se debe seleccionar un rango de fechas valido",
            });
          } else {
            setInformation(null);
            Swal.fire({
              icon: "error",
              title: "error",
              text: response.message,
            });
          }
          // Swal.close();
        })
        .catch((error) => {
          Swal.close();
          if (error.code === "OK") {
            if (error.data.length > 0) {
              setInformation(error);
              // Swal.fire({
              //     icon:"success",
              //     title: "Éxito",
              //     text: `${titles.conciliation.parameters.found_info}`,
              //     timer: 2000
              // });
            } else {
              setInformation(null);
              Swal.fire({
                icon: "warning",
                title: `${titles.conciliation.parameters.not_found}`,
                timer: 3000,
              });
            }
          } else if (error.code === "ECONNREFUSED") {
            setInformation(null);
            Swal.fire({
              icon: "error",
              title: "Error",
              text: `${titles.conciliation.parameters.ms_error}`,
              timer: 3000,
            });
          } else if (error.error === "Internal Server Error") {
            setInformation(null);
            Swal.fire({
              icon: "error",
              title: "Error",
              text: `${titles.conciliation.parameters.no_data}`,
              timer: 3000,
            });
          } else if (!values.createdAt2) {
            setInformation(null);
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "Se debe seleccionar un rango de fechas",
            });
          } else {
            setInformation(null);
            Swal.fire({
              icon: "error",
              title: "error",
              text: error.message,
            });
          }
          // Swal.close();
        });
    }
  };

  const updateTreasury = async () => {
    if (values.bank !== "") {
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
      console.log(values);
      await customFetch<
        iGetConciliationTableInfoReq,
        iGetConciliationTableInfoRes
      >("conciliation/getTableInfo", true, "POST", {
        "transactions-summary-acquirer-name": [values.bank],
        "transactions-summary-start-date": values.createdAt,
        "transactions-summary-end-date": values.createdAt2,
        "transactions-summary-status": values.status ? values.status : null,
        "transactions-summary-type": values.conciliationType
          ? values.conciliationType
          : null,
      })
        .then((response: any) => {
          Swal.close();
          if (response.code === "OK") {
            if (response.data.length > 0) {
              setInformation(response);
              Swal.fire({
                icon: "success",
                title: `${titles.conciliation.parameters.success}`,
                text: `${titles.conciliation.parameters.treasury_update}`,
                timer: 2000,
              });
            } else {
              Swal.fire({
                icon: "error",
                title: `${titles.conciliation.parameters.not_found}`,
                timer: 5000,
              });
            }
          } else if (response.code === "ECONNREFUSED") {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: `${titles.conciliation.parameters.ms_error}`,
              timer: 3000,
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "error",
              text: response.message,
            });
          }
          // Swal.close();
        })
        .catch((error) => {
          Swal.close();
          if (error.code === "OK") {
            if (error.data.length > 0) {
              setInformation(error);
              Swal.fire({
                icon: "success",
                title: `${titles.conciliation.parameters.success}`,
                text: `${titles.conciliation.parameters.treasury_update}`,
                timer: 2000,
              });
            } else {
              Swal.fire({
                icon: "error",
                title: `${titles.conciliation.parameters.not_found}`,
                timer: 3000,
              });
            }
          } else if (error.code === "ECONNREFUSED") {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: `${titles.conciliation.parameters.ms_error}`,
              timer: 3000,
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "error",
              text: error.message,
            });
          }
          // Swal.close();
        });
    } else {
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
      let banks: any[] = [];
      catalogInfo.information.information.forEach((data: any) => {
        banks.push(data.nameOption);
      });
      await customFetch<
        iGetConciliationTableInfoReq,
        iGetConciliationTableInfoRes
      >("conciliation/getTableInfo", true, "POST", {
        "transactions-summary-acquirer-name": banks,
        "transactions-summary-start-date": values.createdAt,
        "transactions-summary-end-date": values.createdAt2,
        "transactions-summary-status": values.status ? values.status : null,
        "transactions-summary-type": values.conciliationType
          ? values.conciliationType
          : null,
      })
        .then((response: any) => {
          Swal.close();
          if (response.code === "OK") {
            if (response.data.length > 0) {
              setInformation(response);
              Swal.fire({
                icon: "success",
                title: `${titles.conciliation.parameters.success}`,
                text: `${titles.conciliation.parameters.treasury_update}`,
                timer: 2000,
              });
            } else {
              Swal.fire({
                icon: "error",
                title: `${titles.conciliation.parameters.not_found}`,
                timer: 3000,
              });
            }
          } else if (response.code === "ECONNREFUSED") {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: `${titles.conciliation.parameters.ms_error}`,
              timer: 3000,
            });
          } else if (response.error === "Internal Server Error") {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: `${titles.conciliation.parameters.no_data}`,
              timer: 3000,
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "error",
              text: response.message,
            });
          }
          // Swal.close();
        })
        .catch((error) => {
          Swal.close();
          if (error.code === "OK") {
            if (error.data.length > 0) {
              setInformation(error);
              Swal.fire({
                icon: "success",
                title: `${titles.conciliation.parameters.success}`,
                text: `${titles.conciliation.parameters.treasury_update}`,
                timer: 2000,
              });
            } else {
              Swal.fire({
                icon: "error",
                title: `${titles.conciliation.parameters.not_found}`,
                timer: 3000,
              });
            }
          } else if (error.code === "ECONNREFUSED") {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: `${titles.conciliation.parameters.ms_error}`,
              timer: 3000,
            });
          } else if (error.error === "Internal Server Error") {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: `${titles.conciliation.parameters.no_data}`,
              timer: 3000,
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "error",
              text: error.message,
            });
          }
          // Swal.close();
        });
    }
  };

  const getCatalog = async () => {
    await customFetch<iGetCatalogReq, iGetCatalogRes>(
      "conciliation/getCatalogs",
      true,
      "POST",
      {
        languageId: 1,
        nameCatalog: "acquire_catalog",
      }
    )
      .then((response) => {
        if (response.information!.information.length > 0) {
          setCatalogInfo(response);
        }
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Error al obtener el catagolo de bancos",
        });
      });
  };

  useEffect(() => {
    dispatch(setPageTitle(titles.conciliation.main_title));
    return () => {
      dispatch(unsetTransactionsTable());
    };
  }, [dispatch, titles.conciliation.main_title]);

  useEffect(() => {
    getCatalog();
  }, []);

  return (
    <>
      <Head>
        <title>
          Smart -{" "}
          {titles.conciliation.main_title + " | " + titles.conciliation.digits}
        </title>
      </Head>
      <Main>
        <SideMenu links={menu} title={titles.conciliation.main_title}>
          <section className="big_cards">
            <ConciliationFilter
              values={values}
              reset={reset}
              errors={errors}
              handleInputchange={handleInputChange}
              handleSubmit={getInfo}
              catalogInfo={catalogInfo}
              titles={titles}
            />
            <ConciliationTable
              information={information || []}
              bank={values.bank}
              titles={titles}
              getInfo={updateTreasury}
            />
          </section>
        </SideMenu>
      </Main>
    </>
  );
};

export default withAuth(wrappedOnStore(Conciliation));
