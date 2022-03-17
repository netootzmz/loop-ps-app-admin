import Head from "next/head";
import React, { useEffect } from "react";
import Swal from "sweetalert2";
import { iLink } from "../../../../@types/components";
import { PageWithStore } from "../../../../@types/store";
import Main from "../../../../components/main";
import SideMenu from "../../../../components/main/SideMenu";
import { MailPaymentForm } from "../../../../components/profile/preferences/remote-payments/MailPaymentForm";
import { MailPreview } from "../../../../components/profile/preferences/remote-payments/MailPreview";
import customFetch from "../../../../helpers/customFetch";
import svgs from "../../../../helpers/svgs";
import withAuth from "../../../../helpers/withAuth";
import useForm from "../../../../hooks/useForm";

import useLang from "../../../../hooks/useLang";
import { wrappedOnStore } from "../../../../store";
import { setPageTitle } from "../../../../store/actions/uiActions";
import { iGetMailPaymentLeagueDataReq, iSetMailPaymentLeagueDataReq } from '../../../../@types/api/req';
import { iGetMailPaymentLeagueDataRes, iSetMailPaymentLeagueDataRes } from "../../../../@types/api/res";
import { EmailRegex } from '../../../../middlewares/ValidationRegex';

const MailPaymentLink: PageWithStore = ({ dispatch, ui: { lang }, auth: { clientId } }) => {
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
    footerLineOne: string;
    contactPhone: string;
    contactEmail: string;
    disclaimer: string;
  }>({
    initialValues:{
      headerText: "",
      titleLineOne: "",
      titleLineTwo: "",
      endBody: "",
      footerLineOne: "",
      contactPhone: "",
      contactEmail: "",
      disclaimer: "",
    },
    validations:{
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
      contactPhone:{
        required:{
          value: true,
          message: `${titles.profile.preferences.remote_payments.parameter.requiredFile}`
        }
      },
      contactEmail:{
        required:{
          value: true,
          message: `${titles.profile.preferences.remote_payments.parameter.requiredFile}`
        },
        custom:{
          isValid: (val) => EmailRegex.test(val),
          message: `${titles.profile.preferences.remote_payments.parameter.invalidMail}`
        }
      }
    },
    onSubmit: async ()=>{
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
      await customFetch<iSetMailPaymentLeagueDataReq, iSetMailPaymentLeagueDataRes>(
        "profile/preferences/mail-payment-league-data",
        true,
        "POST",
        {
          "client_id": clientId?.toString() || "",
          "message_header": values.headerText,
          "line_one_title": values.titleLineOne,
          "line_two_title": values.titleLineTwo,
          "message_body": values.endBody,
          "message_footer": values.footerLineOne,
          "phone_footer": values.contactPhone,
          "mail_footer": values.contactEmail,
          "disclaimer_footer": values.disclaimer,
          "cve": "TLP"
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
        });
      })
    }
  });

  const cargarDatos = async() => {
    await customFetch<iGetMailPaymentLeagueDataReq, iGetMailPaymentLeagueDataRes>(
      "profile/preferences/mail-get-payment-league-data",
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
          endBody: response.information?.results.message_body,
          footerLineOne: response.information?.results.message_footer,
          contactPhone: response.information?.results.phone_footer,
          contactEmail: response.information?.results.mail_footer,
          disclaimer: response.information?.results.disclaimer_footer,
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
          titles.profile.preferences.remote_payments.mail_payment_link
      )
    );
  }, [
    dispatch,
    titles.profile.preferences.title,
    titles.profile.preferences.remote_payments.title,
    titles.profile.preferences.remote_payments.mail_payment_link,
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
            titles.profile.preferences.remote_payments.mail_payment_link}
        </title>
      </Head>
      <Main>
        <SideMenu
          links={menu}
          title={titles.profile.preferences.remote_payments.title}
        >
          <section className="payments__mailContainer">
            <MailPaymentForm
              headerText={values.headerText}
              titleLineOne={values.titleLineOne}
              titleLineTwo={values.titleLineTwo}
              endBody={values.endBody}
              footerLineOne={values.footerLineOne}
              contactPhone={values.contactPhone}
              contactEmail={values.contactEmail}
              disclaimer={values.disclaimer}
              errors={errors}
              handleInputChange={handleInputChange}
            />
            <MailPreview
              headerText={values.headerText}
              titleLineOne={values.titleLineOne}
              titleLineTwo={values.titleLineTwo}
              endBody={values.endBody}
              footerLineOne={values.footerLineOne}
              contactPhone={values.contactPhone}
              contactEmail={values.contactEmail}
              disclaimer={values.disclaimer}
              reset={reset}
              handleSubmit={handleSubmit}
            />
          </section>
        </SideMenu>
      </Main>
    </>
  );
};

export default withAuth(wrappedOnStore(MailPaymentLink));
