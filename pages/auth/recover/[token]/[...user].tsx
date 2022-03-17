import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import React from "react";
import { PageWithStore } from "../../../../@types/store";
import AuthCard from "../../../../components/auth/AuthCard";
import RecoverForm from "../../../../components/auth/RecoverForm";
import withHidden from "../../../../helpers/withHidden";
import useLang from "../../../../hooks/useLang";
import { wrappedOnStore } from "../../../../store";
import CaptchaProvider from "components/providers/CaptchaProvider";

const ResetPassword: PageWithStore = ({ ui: { lang } }) => {
  const router = useRouter();

  const {
    recover: { head, title },
  } = useLang(lang);

  return (
    <CaptchaProvider>
      <Head>
        <title>Smart - {head}</title>
      </Head>
      <AuthCard title={title}>
        <RecoverForm
          userName={router.query["user"] ? router.query["user"][0] : ""}
          name={router.query["user"] ? router.query["user"][1] : ""}
          codeVerification={router.query?.token as string}
        />
      </AuthCard>
    </CaptchaProvider>
  );
};

export default withHidden(wrappedOnStore(ResetPassword));
