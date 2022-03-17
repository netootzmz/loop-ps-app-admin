import Head from "next/head";
import React, { useEffect } from "react";
import { iLink } from "../../../../@types/components";
import { PageWithStore } from "../../../../@types/store";
import Main from "../../../../components/main";
import SideMenu from "../../../../components/main/SideMenu";
// import { GraphicIdentity } from "../../../../components/profile/preferences/general/identity/GraphicIdentity";
// import { PreviewImages } from "../../../../components/profile/preferences/general/identity/PreviewImages";
import svgs from "../../../../helpers/svgs";
import withAuth from "../../../../helpers/withAuth";
import useForm from "../../../../hooks/useForm";
import useLang from "../../../../hooks/useLang";
import { setPageTitle } from "../../../../store/actions/uiActions";
import { wrappedOnStore } from "../../../../store/index";

const General: PageWithStore = ({ dispatch, ui: { lang } }) => {
  const { titles } = useLang(lang);

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

  const {values, reset} = useForm<{
    logo: string;
    reduceLogo: string;
  }>({
    initialValues:{
      logo: "",
      reduceLogo: ""
    },
    onSubmit:()=>{
      reset();
      console.log(values.logo);
    }
  })

  useEffect(() => {
    dispatch(
      setPageTitle(
        titles.profile.preferences.title +
          " | " +
          titles.profile.preferences.general.title +
          " | " +
          titles.profile.preferences.general.visual_identity
      )
    );
  }, [
    dispatch,
    titles.profile.preferences.title,
    titles.profile.preferences.general.title,
    titles.profile.preferences.general.visual_identity,
  ]);

  return (
    <>
      <Head>
        <title>
          Smart -{" "}
          {titles.profile.preferences.title +
            " | " +
            titles.profile.preferences.general.title +
            " | " +
            titles.profile.preferences.general.visual_identity}
        </title>
      </Head>
      <Main>
        <SideMenu links={menu} title={titles.profile.preferences.general.title}>
          <section className="payments__container">
            {/* <GraphicIdentity
              logo={values.logo}
              reduceLogo={values.reduceLogo}
              handleInputChange={handleInputChange}
            />   
            <PreviewImages
              reset={reset}
              handleSubmit={handleSubmit}
            />          */}
          </section>
        </SideMenu>
      </Main>
    </>
  );
};

export default withAuth(wrappedOnStore(General));
