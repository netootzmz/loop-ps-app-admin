import Head from "next/head";
import React from "react";
import AuthCard from "../../components/auth/AuthCard";
import ForgotForm from "components/auth/ForgotForm";
import useLang from "../../hooks/useLang";
import withHidden from "../../helpers/withHidden";
import { PageWithStore } from "../../@types/store";
import { wrappedOnStore } from "../../store/index";
import CaptchaProvider from "components/providers/CaptchaProvider";

const Forgot: PageWithStore = ({ ui: { lang } }) => {
  const {
    forgot: { title, subtitle, input, submit, link, swalbox },
  } = useLang(lang);

  return (
    <CaptchaProvider>
      <Head>
        <title>Smart - {title}</title>
      </Head>
      <AuthCard title={title}>
        <h4 className="h4">{subtitle}</h4>
        <ForgotForm texts={{ input, submit, link, swalbox }} />
      </AuthCard>
    </CaptchaProvider>
  );
};

export default withHidden(wrappedOnStore(Forgot));
