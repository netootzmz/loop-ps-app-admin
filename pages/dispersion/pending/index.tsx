import React, { useEffect, useState } from "react";
import customFetch from "../../../helpers/customFetch";
import Head from "next/head";
import Main from "../../../components/main";
import moment from "moment";
import SideMenu from "../../../components/main/SideMenu";
import svgs from "../../../helpers/svgs";
import Swal from "sweetalert2";
import useForm from "../../../hooks/useForm";
import useLang from "../../../hooks/useLang";
import withAuth from "../../../helpers/withAuth";

import {
  iGetGroupCatalogRes,
  iGetReleaseTableDataRes,
} from "../../../@types/api/res";
import { iGetReleaseTableDataReq } from "../../../@types/api/req";
import { iLink } from "../../../@types/components/index";
import { PageWithStore } from "../../../@types/store";
import { PendingFilter } from "../../../components/dispersion/pending/PendingFilter";
import { PendingTable } from "../../../components/dispersion/pending/PendingTable";
import { setPageTitle } from "../../../store/actions/uiActions";
import { unsetTransactionsTable } from "../../../store/actions/transactionsActions";
import { wrappedOnStore } from "../../../store";

const Pending: PageWithStore = ({ dispatch, ui: { lang } }) => {
  const { titles } = useLang(lang);
  const [groupCatalog, setGroupCatalog] = useState<any>([]);
  const [information, setInformation] = useState<any>([]);

  let group_id: string = "";

  const menu: Array<iLink> = [
    {
      svgId: svgs.receipt,
      text: titles.dispersion.dispersion_file,
      route: "/dispersion",
    },
    {
      svgId: svgs.receipt,
      text: titles.dispersion.pending_payments,
      route: "/dispersion/pending",
    },
  ];

  const { values, reset, handleInputChange } = useForm<{
    createdAt: string;
    createdAt2: string;
    rfc: string;
    account_clabe: string;
    group: string;
    business_name: string;
    group_by: string;
    subsidiary: string;
    level: number;
  }>({
    initialValues: {
      createdAt: moment().startOf("day").format("YYYY-MM-DD"),
      createdAt2: moment().startOf("day").format("YYYY-MM-DD"),
      rfc: "",
      account_clabe: "",
      group: "",
      business_name: "",
      group_by: "",
      subsidiary: "",
      level: 0,
    },
  });

  const getInfo = async () => {
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
    if (values.subsidiary !== "") {
      group_id = values.subsidiary;
    } else if (values.business_name !== "") {
      group_id = values.business_name;
    } else if (values.group_by !== "") {
      group_id = values.group_by;
    } else if (values.group !== "") {
      group_id = values.group;
    } else {
      group_id = "";
    }
    await customFetch<iGetReleaseTableDataReq, iGetReleaseTableDataRes>(
      "dispersion/getReleaseTableData",
      true,
      "POST",
      {
        clabe: values.account_clabe,
        endDate: values.createdAt2,
        groupId: group_id,
        groupLevel: values.level,
        rfc: values.rfc,
        startDate: values.createdAt,
      }
    )
      .then((response) => {
        // console.log(response);
        if (response.codeStatus === "00") {
          Swal.close();
          if (response.information!.group.length > 0) {
            setInformation(response.information?.group);
          } else {
            setInformation([]);
            Swal.fire({
              icon: "info",
              title: `${titles.conciliation.parameters.not_found}`,
              timer: 2000,
            });
          }
        }
      })
      .catch(() => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Error de conexión con el MS",
        });
      });
  };

  const getGroupCatalog = async () => {
    await customFetch<{}, iGetGroupCatalogRes>(
      "dispersion/getGroupCatalog",
      true,
      "POST",
      {}
    )
      .then((response: any) => {
        if (response.information.group.length > 0) {
          setGroupCatalog(response.information.group);
        }
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Error al obtener el catalogo de grupos",
          timer: 3000,
        });
      });
  };

  useEffect(() => {
    dispatch(setPageTitle(titles.dispersion.main_title));
    return () => {
      dispatch(unsetTransactionsTable());
    };
  }, [dispatch, titles.dispersion.main_title]);

  useEffect(() => {
    getGroupCatalog();
  }, []);

  return (
    <>
      <Head>
        <title>
          Smart -{" "}
          {titles.dispersion.main_title +
            " | " +
            titles.dispersion.pending_payments}
        </title>
      </Head>
      <Main>
        <SideMenu links={menu} title={titles.dispersion.main_title}>
          <section className="big_cards">
            <PendingFilter
              values={values}
              reset={reset}
              handleInputChange={handleInputChange}
              titles={titles}
              getInfo={getInfo}
              groupCatalog={groupCatalog}
            />
            <PendingTable information={information} getInfo={getInfo} />
          </section>
        </SideMenu>
      </Main>
    </>
  );
};

export default withAuth(wrappedOnStore(Pending));
