import Head from "next/head";
import React, { useEffect, useState } from "react";
import { iLink } from "../../../../@types/components";
import { PageWithStore } from "../../../../@types/store";
import Main from "../../../../components/main";
import Router from "next/router";
import SideMenu from "../../../../components/main/SideMenu";
import svgs from "../../../../helpers/svgs";
import withAuth from "../../../../helpers/withAuth";
import Swal from "sweetalert2";

import useLang from "../../../../hooks/useLang";
import { setPageTitle } from "../../../../store/actions/uiActions";
import { wrappedOnStore } from "../../../../store/index";
import { MailServer } from "../../../../components/profile/preferences/general/mail-server/MailServer";
import useForm from "../../../../hooks/useForm";
import { EmailRegex } from "../../../../middlewares/ValidationRegex";
import customFetch from "../../../../helpers/customFetch";
import {
  iGetMailServerInitDataReq,
  iSetMailServerConfigReq,
} from "../../../../@types/api/req";
import {
  iSetMailServerConfigRes,
  iCustomResponse,
  iGetMailServerInitDataRes,
} from "../../../../@types/api/res";

const MailService: PageWithStore = ({
  dispatch,
  ui: { lang },
  auth: { clientId },
}) => {
  const { titles } = useLang(lang);

  const [haveInitData, setHaveInitData] = useState(false);
  const [mailConfigurationId, setMailConfigurationId] = useState(0);

  const menu: Array<iLink> = [
    // {
    //   svgId: svgs.tune,
    //   text: titles.profile.preferences.general.visual_identity,
    //   route: "/profile/preferences/general",
    // },
    {
      svgId: svgs.mail,
      text: titles.profile.preferences.general.mails,
      route: "/profile/preferences/general/mails",
    },
    {
      svgId: svgs.mail,
      text: titles.profile.preferences.general.mail_service,
      route: "/profile/preferences/general/mail-service",
    },
  ];

  const { values, reset, errors, handleInputChange, handleSubmit } = useForm<{
    hostname: string;
    port: string;
    emailAddress: string;
    securityProtocol: string;
    authMethod: string;
    userEmail: string;
    password: string;
  }>({
    initialValues: {
      hostname: "",
      port: "",
      emailAddress: "",
      securityProtocol: "",
      authMethod: "",
      userEmail: "",
      password: "",
    },
    validations: {
      hostname: {
        required: {
          value: true,
          message: `${titles.profile.preferences.general.parameters.requiredFile}`,
        },
      },
      port: {
        required: {
          value: true,
          message: `${titles.profile.preferences.general.parameters.requiredFile}`,
        },
      },
      // emailAddress:{
      //   required:{
      //     value: true,
      //     message: "El campo es requerido"
      //   },
      //   custom:{
      //     isValid: (val) => EmailRegex.test(val),
      //     message: "Correo invalido"
      //   }
      // },
      securityProtocol: {
        required: {
          value: true,
          message: `${titles.profile.preferences.general.parameters.requiredFile}`,
        },
      },
      // authMethod: {
      //   required: {
      //     value: true,
      //     message: `${titles.profile.preferences.general.parameters.requiredFile}`,
      //   },
      // },
      userEmail: {
        required: {
          value: true,
          message: `${titles.profile.preferences.general.parameters.requiredFile}`,
        },
        custom: {
          isValid: (val) => EmailRegex.test(val),
          message: `${titles.profile.preferences.general.parameters.invalidMail}`,
        },
      },
      password: {
        required: {
          value: true,
          message: `${titles.profile.preferences.general.parameters.requiredFile}`,
        },
      },
    },
    onSubmit: async () => {
      Swal.fire({
        title: `${titles.profile.preferences.general.parameters.processing}`,
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
      if (!haveInitData) {
        await customFetch<iSetMailServerConfigReq, iSetMailServerConfigRes>(
          "profile/preferences/mail-server-config",
          true,
          "POST",
          {
            clientId: clientId?.toString() || "",
            passwordMail: values.password,
            portServer: values.port,
            securityMailId: parseInt(values.securityProtocol),
            serverMail: values.hostname,
            userMail: values.userEmail,
          }
        )
          .then((response: iCustomResponse<iSetMailServerConfigRes>) => {
            Swal.close();
            Swal.fire({
              icon: "success",
              title: `${titles.profile.preferences.general.parameters.success}`,
              timer: 3000,
              text: response.message,
              didClose: () => {
                Router.reload();
              },
            });
          })
          .catch((error) => {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: error.message,
            });
          });
      } else {
        await customFetch<iSetMailServerConfigReq, iSetMailServerConfigRes>(
          "profile/preferences/mail-server-config-update",
          true,
          "POST",
          {
            clientId: clientId?.toString() || "",
            passwordMail: values.password,
            portServer: values.port,
            securityMailId: parseInt(values.securityProtocol),
            serverMail: values.hostname,
            userMail: values.userEmail,
            mailConfigurationId: mailConfigurationId,
          }
        )
          .then((response: iCustomResponse<iSetMailServerConfigRes>) => {
            Swal.fire({
              icon: "success",
              title: `${titles.profile.preferences.general.parameters.success}`,
              timer: 3000,
              text: response.message,
            });
          })
          .catch((error) => {
            Swal.fire({
              icon: "error",
              title: "Error",
              timer: 5000,
              text: error.message,
            });
          });
      }
    },
  });

  const cargarDatos = async () => {
    await customFetch<iGetMailServerInitDataReq, iGetMailServerInitDataRes>(
      "profile/preferences/mail-get-config",
      true,
      "POST",
      {
        clientId: clientId?.toString() || "",
      }
    )
      .then((response: any) => {
        if (Object.keys(response.information?.configurationMail).length > 0) {
          console.log(response);
          Swal.close();
          setHaveInitData(true);
          setMailConfigurationId(
            response.information.configurationMail.mailConfigurationId
          );
          reset({
            hostname:
              response.information.configurationMail.serverMail.toString(),
            port: response.information.configurationMail.portServer.toString(),
            securityProtocol:
              response.information.configurationMail.securityMailId.toString(),
            userEmail: response.information.configurationMail.userMail,
            // password: response.information.configurationMail.passwordMail,
          });
        } else {
          Swal.fire({
            icon: "info",
            // title: "Error",
            timer: 10000,
            title: `${titles.profile.preferences.general.parameters.load_error}`,
            showConfirmButton: true,
            confirmButtonColor: "#f2711c",
            confirmButtonText: "Ok",
          });
        }
      })
      .catch(() => {
        Swal.close();
        Swal.fire({
          icon: "info",
          // title: "Error",
          timer: 10000,
          title: `${titles.profile.preferences.general.parameters.load_error}`,
          showConfirmButton: true,
          confirmButtonColor: "#f2711c",
          confirmButtonText: "Ok",
        });
      });
  };

  useEffect(() => {
    dispatch(
      setPageTitle(
        titles.profile.preferences.title +
          " | " +
          titles.profile.preferences.general.title +
          " | " +
          titles.profile.preferences.general.mail_service
      )
    );
  }, [
    dispatch,
    titles.profile.preferences.title,
    titles.profile.preferences.general.title,
    titles.profile.preferences.general.mail_service,
  ]);

  useEffect(() => {
    Swal.fire({
      title: `${titles.profile.preferences.general.parameters.processing}`,
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
            titles.profile.preferences.general.title +
            " | " +
            titles.profile.preferences.general.mail_service}
        </title>
      </Head>
      <Main>
        <SideMenu links={menu} title={titles.profile.preferences.general.title}>
          <section className="payments__transactions">
            <MailServer
              hostname={values.hostname}
              port={values.port}
              emailAddress={values.emailAddress}
              securityProtocol={values.securityProtocol}
              authMethod={values.authMethod}
              userEmail={values.userEmail}
              password={values.password}
              reset={reset}
              errors={errors}
              handleInputChange={handleInputChange}
              handleSubmit={handleSubmit}
            />
          </section>
        </SideMenu>
      </Main>
    </>
  );
};

export default withAuth(wrappedOnStore(MailService));
