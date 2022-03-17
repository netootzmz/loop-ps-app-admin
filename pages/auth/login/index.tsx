import React, { useEffect } from "react";
import Swal from "sweetalert2";
import AuthCard from "components/auth/AuthCard";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import LoginForm from "components/auth/LoginForm";
import useLang from "hooks/useLang";
import withHidden from "helpers/withHidden";
import { PageWithStore } from "../../../@types/store";
import { wrappedOnStore } from "store/index";
import CaptchaProvider from "components/providers/CaptchaProvider";

const Login: PageWithStore = ({ ui: { lang } }) => {
  const router = useRouter();
  const {
    login: { title, link },
  } = useLang(lang);

  useEffect(() => {
    if (router.query.session === "expired") {
      setTimeout(() => {
        Swal.fire({
          title: "¡Sesión expirada!",
          text: "Por motivos de seguridad, tu sesión ha caducado por inactividad",
          icon: "info",
          confirmButtonColor: "#f2711c",
          confirmButtonText: "Continuar",
          allowEscapeKey: true,
          allowOutsideClick: true,
          backdrop: true,
        });
      }, 1000);
    }
  }, [router.query.session]);

  return (
    <CaptchaProvider>
      <Head>
        <title>Smart - {title}</title>
      </Head>
      <AuthCard title={title}>
        <LoginForm />
        <Link href="/auth/forgot">
          <a className="link">{link}</a>
        </Link>
      </AuthCard>
    </CaptchaProvider>
  );
};

export default withHidden(wrappedOnStore(Login));
