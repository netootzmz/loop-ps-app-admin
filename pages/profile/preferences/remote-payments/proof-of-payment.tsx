import Head from "next/head";
import React, { useEffect } from "react";
import { iGetTicketProofPaymentReq, iSetTicketProofPaymentReq } from "../../../../@types/api/req";
import { iGetTicketProofPaymentRes, iSetTicketProofPaymentRes } from "../../../../@types/api/res";
import { iLink } from "../../../../@types/components";
import { PageWithStore } from "../../../../@types/store";
import Swal from "sweetalert2";
import Main from "../../../../components/main";
import SideMenu from "../../../../components/main/SideMenu";
import { TicketForm } from "../../../../components/profile/preferences/remote-payments/TicketForm";
import { TicketPreview } from "../../../../components/profile/preferences/remote-payments/TicketPreview";
import customFetch from "../../../../helpers/customFetch";
import svgs from "../../../../helpers/svgs";
import withAuth from "../../../../helpers/withAuth";
import useForm from "../../../../hooks/useForm";

import useLang from "../../../../hooks/useLang";
import { setPageTitle } from "../../../../store/actions/uiActions";
import { wrappedOnStore } from "../../../../store/index";

const ProofOfPayment: PageWithStore = ({ dispatch, ui: { lang }, auth: { clientId } }) => {
  const { titles } = useLang(lang);

  const menu: Array<iLink> = [
    {
      svgId: svgs.tune,
      text: titles.profile.preferences.remote_payments.parameters,
      route: "/profile/preferences/remote-payments",
    },
    {
      svgId: svgs.stars,
      text: titles.profile.preferences.remote_payments.visual_identity,
      route: "/profile/preferences/remote-payments/visual-identity",
    },
    {
      svgId: svgs.mail,
      text: titles.profile.preferences.remote_payments.mail_payment_link,
      route: "/profile/preferences/remote-payments/mail-payment-link",
    },
    {
      svgId: svgs.mail,
      text: titles.profile.preferences.remote_payments.proof_of_payment,
      route: "/profile/preferences/remote-payments/proof-of-payment",
    },
    // {
    //   svgId: svgs.sms,
    //   text: titles.profile.preferences.remote_payments.sms,
    //   route: "/profile/preferences/remote-payments/sms",
    // },
  ];

  const { values, reset, errors, handleInputChange, handleSubmit } = useForm<{
    headerText: string;
    titleLineOne: string;
    titleLineTwo: string;
    endBody: string;
  }>({
    initialValues:{
      headerText: "",
      titleLineOne: "",
      titleLineTwo: "",
      endBody: ""
    },
    validations: {
      headerText:{
        required:{
          value: true,
          message: `${titles.profile.preferences.remote_payments.parameter.requiredFile}`
        }
      },
      titleLineOne:{
        required:{
          value: true,
          message: `${titles.profile.preferences.remote_payments.parameter.requiredFile}`
        }
      },
    },
    onSubmit: async () => {
      Swal.fire({
        title: `${titles.profile.preferences.remote_payments.parameter.processing}`,
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
      await customFetch<iSetTicketProofPaymentReq, iSetTicketProofPaymentRes>(
        "profile/preferences/mail-ticket-proof-payment",
        true,
        "POST",
        {
          "client_id": clientId?.toString() || "",
          "message_header": values.headerText,
          "line_one_title": values.titleLineOne,
          "line_two_title": values.titleLineTwo,
          "message_body": values.endBody,
          "cve": "TCP"
        }        
      ).then((response)=>{
        console.log(response);
        Swal.close();
        Swal.fire({
          icon: "success",
          title: `${titles.profile.preferences.remote_payments.parameter.success}`,
          timer: 3000,
          text: response.message
        })
      }).catch((error)=>{
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Error",
          timer: 5000,
          text: error.message
        })
      })
    }
  });

  const cargarDatos = async() =>{
    Swal.close();
    await customFetch<iGetTicketProofPaymentReq, iGetTicketProofPaymentRes>(
      "profile/preferences/mail-get-ticket-proof-payment",
      true,
      "POST",
      {
        "client_id": clientId?.toString() || ""
      }
    ).then((response)=>{
      Swal.close();
      if(response.codeStatus === "00"){
        reset({
          headerText: response.information?.results.message_header,
          titleLineOne: response.information?.results.line_one_title,
          titleLineTwo: response.information?.results.line_two_title,
          endBody: response.information?.results.message_body
        })
      }
    }).catch(()=>{      
      Swal.close();
      Swal.fire({
        icon: "error",
        title: "Error",
        timer: 5000,
        text: `${titles.profile.preferences.remote_payments.parameter.load_error}`
      })
    })
  }

  useEffect(() => {
    dispatch(
      setPageTitle(
        titles.profile.preferences.title +
          " | " +
          titles.profile.preferences.remote_payments.title +
          " | " +
          titles.profile.preferences.remote_payments.proof_of_payment
      )
    );
  }, [
    dispatch,
    titles.profile.preferences.title,
    titles.profile.preferences.remote_payments.title,
    titles.profile.preferences.remote_payments.proof_of_payment,
  ]);

  useEffect(()=>{
    Swal.fire({
      title: `${titles.profile.preferences.remote_payments.parameter.processing}`,
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
    cargarDatos();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Head>
        <title>
          Smart -{" "}
          {titles.profile.preferences.title +
            " | " +
            titles.profile.preferences.remote_payments.title +
            " | " +
            titles.profile.preferences.remote_payments.proof_of_payment}
        </title>
      </Head>
      <Main>
        <SideMenu
          links={menu}
          title={titles.profile.preferences.remote_payments.title}
        >
          <section className="payments__mailContainer">
            <TicketForm
              headerText={values.headerText}
              titleLineOne={values.titleLineOne}
              titleLineTwo={values.titleLineTwo}
              endBody={values.endBody}
              errors={errors}
              handleInputChange={handleInputChange}
            />
            <TicketPreview
              headerText={values.headerText}
              titleLineOne={values.titleLineOne}
              titleLineTwo={values.titleLineTwo}
              endBody={values.endBody}
              reset={reset}
              handleSubmit={handleSubmit}
            />
          </section>
        </SideMenu>
      </Main>
    </>
  );
};

export default withAuth(wrappedOnStore(ProofOfPayment));
