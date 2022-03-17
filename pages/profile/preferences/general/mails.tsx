import Head from "next/head";
import React, {
  useEffect,
  PropsWithChildren,
  useState,
  useRef,
  ChangeEvent,
  useCallback,
} from "react";
import { iLink } from "../../../../@types/components";
import { PageWithStore } from "../../../../@types/store";
import ColorInput from "../../../../components/forms/ColorInput";
import Toogle from "../../../../components/forms/Toogle";
import Main from "../../../../components/main";
import SideMenu from "../../../../components/main/SideMenu";
import svgs from "../../../../helpers/svgs";
import withAuth from "../../../../helpers/withAuth";
import useColorsForm from "../../../../hooks/useColorsForm";
import { stringify } from "query-string";
import useLang from "../../../../hooks/useLang";
import { setPageTitle } from "../../../../store/actions/uiActions";
import { wrappedOnStore } from "../../../../store/index";
import Select, { SingleValueProps } from "react-select";
import Image from "next/image";
import {
  startGettingGeneralMailsConfiguration,
  unsetGeneralsMailsConfig,
} from "../../../../store/actions/preferencesActions";
import Link from "next/link";
import customFetch from "../../../../helpers/customFetch";
import { iSetColorsMailsGeneral } from "../../../../@types/api/req";
import Swal from "sweetalert2";
import manageErrorsMessages from "../../../../helpers/manageErrorsMessages";
import { iCustomResponse } from "../../../../@types/api/res";
import Preview from "components/profile/preferences/general/mails/Preview";

const Mails: PageWithStore = ({
  dispatch,
  ui: { lang },
  preferences: { mails },
  auth: { clientId },
}) => {
  const [logoImage, setLogoImage] = useState<string | ArrayBuffer | null>(
    mails?.general?.logo || ""
  );

  useEffect(() => {
    setLogoImage(mails?.general?.logo as string);
  }, [mails]);

  const { titles } = useLang(lang);

  const imgInputRef = useRef<HTMLInputElement>(null);
  const update = useRef(0);

  const [sep, setSep] = useState<{ value: string; label: JSX.Element } | null>({
    value: "1",
    label: (
      <picture className="select__picture">
        &nbsp;
        <Image
          src="separador1.png"
          layout="fill"
          className="select__img"
          alt="Separador"
        />
      </picture>
    ),
  });

  const [imageError, setImageError] = useState(false);

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
  const stC = JSON.stringify(mails?.general?.colors || {});

  const { handleColorChange, colors, resetColors, handleSubmit } =
    useColorsForm(
      {
        bodyTextType: "#354A5E",
        bodyType: "#ffffff",
        buttonTextType: "#ffffff",
        buttonType: "#f2711c",
        footerTextType: "#ffffff",
        footerType: "#354A5E",
      },
      async () => {
        try {
          Swal.fire({
            title: lang === "es" ? "Cargando..." : "Loading...",
            backdrop: ` rgba(0,0,123,0.4) left top no-repeat`,
            allowOutsideClick: false,
            didOpen: () => {
              Swal.showLoading();
            },
          });

          await customFetch<iSetColorsMailsGeneral, {}>(
            "profile/preferences/colors/general/set-colors",
            true,
            "POST",
            {
              ...colors,
              clientId: clientId || "",
              frameId: parseInt(sep?.value || "1") || 1,
              logo: (logoImage as string).includes("base64")
                ? (logoImage as string)
                : "",
            }
          );

          Swal.close();
          Swal.fire({
            title: "¡Éxito!",
            text: "¡Actualización exitosa!",
            icon: "success",

            confirmButtonColor: "#f2711c",
            confirmButtonText: "Continuar",
            allowEscapeKey: true,
            allowOutsideClick: true,
          });
        } catch (err) {
          console.log("Start Getting Mails Configuration Error: ", err);
          const msg = await manageErrorsMessages(
            (err as iCustomResponse).codeStatus || "1000",
            lang
          );
          Swal.fire("Error", msg, "error");
        }
      }
    );

  const SingleValue = ({
    ...props
  }: PropsWithChildren<
    SingleValueProps<{ value: string; label: JSX.Element }>
  >) => (
    <picture className="select__picture">
      &nbsp;
      <Image
        src={`/separador${
          (props.selectProps.value as { value: string } | null)?.value
        }.png`}
        alt="separador"
        layout="fill"
        className="select__img"
      />
    </picture>
  );

  const getBase64 = (file: File): Promise<string | ArrayBuffer | null> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handleImageSelect = () => {
    imgInputRef.current?.click();
  };

  const handleImageSave = async (e: ChangeEvent<HTMLInputElement>) => {
    setImageError(false);
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      let _URL = window.URL || window.webkitURL;
      let img = document.createElement("img");
      img.onload = async function () {
        if (img.width <= 600 && img.height <= 600) {
          try {
            if (file.type === "image/png") {
              if (file.size <= 400000) {
                const base64 = await getBase64(file);
                setLogoImage(base64);
              } else {
                Swal.fire({
                  title: "Error",
                  text:
                    lang === "es"
                      ? "¡La imagen no puede ser mayor a 400Kb!"
                      : "Image must be less than 400Kb!",
                  icon: "error",
                  showConfirmButton: false,
                  timer: 3000,
                  timerProgressBar: true,
                  allowOutsideClick: false,
                });
                setImageError(true);
                return;
              }
            } else {
              Swal.fire({
                title: "Error",
                text:
                  lang === "es"
                    ? "¡La imagen debe de ser formato '.png'!"
                    : "Image must be format '.png'!",
                icon: "error",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                allowOutsideClick: false,
              });
              setImageError(true);
              return;
            }
            e.target.files = null;
          } catch (err) {
            console.log("Start Getting Mails Configuration Error: ", err);
            const msg = await manageErrorsMessages(
              (err as iCustomResponse).codeStatus || "1000",
              lang
            );
            Swal.fire("Error", msg, "error");
          }
        } else {
          Swal.fire({
            title: "Error",
            text:
              lang === "es"
                ? "¡La imagen debe debe tener un tamaño menor o igual a 600px por 600px!"
                : "The image must have a size less than or equal to 600px by 600px!",
            icon: "error",
          });
        }
      };
      img.src = _URL.createObjectURL(file);
    }
  };
  const resetSep = useCallback(() => {
    setSep({
      value: mails?.general?.frame.toString() || "1",
      label: (
        <picture className="select__picture">
          &nbsp;
          <Image
            src={`separador${mails?.general?.frame || 1}.png`}
            layout="fill"
            className="select__img"
            alt={titles.profile.preferences.general.parameters.separator}
          />
        </picture>
      ),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mails?.general?.frame]);

  useEffect(() => {
    dispatch(
      setPageTitle(
        titles.profile.preferences.title +
          " | " +
          titles.profile.preferences.general.title +
          " | " +
          titles.profile.preferences.general.mails
      )
    );
  }, [
    dispatch,
    titles.profile.preferences.title,
    titles.profile.preferences.general.title,
    titles.profile.preferences.general.mails,
  ]);

  useEffect(() => {
    dispatch(startGettingGeneralMailsConfiguration());
    return () => {
      dispatch(unsetGeneralsMailsConfig());
    };
  }, [dispatch]);

  useEffect(() => {
    resetColors(JSON.parse(stC));
    resetSep();
  }, [stC, resetSep, resetColors]);

  useEffect(() => {
    return () => {
      resetColors();
      resetSep();
    };
  }, [resetSep, resetColors]);

  return (
    <>
      <Head>
        <title>
          Smart -{" "}
          {titles.profile.preferences.title +
            " | " +
            titles.profile.preferences.general.title +
            " | " +
            titles.profile.preferences.general.mails}
        </title>
      </Head>
      <Main>
        <SideMenu links={menu} title={titles.profile.preferences.general.title}>
          <section className="mails">
            <div className="mails__assistance">
              <h3 className="h3">
                {titles.profile.preferences.general.parameters.design_assistant}
              </h3>
              <div className="card card--full card--fit">
                <Toogle
                  uncheckLabel={
                    titles.profile.preferences.general.parameters.use_assistant
                  }
                  checkLabel={
                    titles.profile.preferences.general.parameters.own_design
                  }
                  center
                />
              </div>
            </div>
            <form className="mails__form form" onSubmit={handleSubmit}>
              <h3 className="h3">
                {titles.profile.preferences.general.parameters.visual_identity}
              </h3>
              <div className="card card--full card--inner-padding mails__card">
                <h3 className="h3">
                  {titles.profile.preferences.general.parameters.top_logo}
                </h3>
                <div className="file-input__container">
                  <input
                    type="file"
                    id="LogoInput"
                    className="file-input__hidden"
                    ref={imgInputRef}
                    onChange={handleImageSave}
                    accept="image/png"
                  />
                  <div className="file-input" onClick={handleImageSelect}>
                    <span className="file-input__placeholder">
                      {
                        titles.profile.preferences.general.parameters
                          .file_location
                      }
                    </span>
                    <button type="button" className="btn btn--file">
                      {titles.profile.preferences.general.parameters.examine}
                    </button>
                  </div>
                  <span
                    className={`file-input__help ${
                      imageError ? "file-input__help--err" : ""
                    }`}
                  >
                    {titles.profile.preferences.general.parameters.must_be}{" "}
                    {'".png" '}{" "}
                    {
                      titles.profile.preferences.general.parameters
                        .file_limitations
                    }
                  </span>
                </div>
                <h3 className="h3">
                  {titles.profile.preferences.general.parameters.mail_border}
                </h3>
                <label className="select__label">
                  {titles.profile.preferences.general.parameters.select_border}
                </label>
                <Select
                  value={sep}
                  onChange={(val) => setSep(val)}
                  options={[1, 2, 3, 5, 6, 7, 8].map((val) => ({
                    value: val.toString(),
                    label: (
                      <picture className="select__picture">
                        &nbsp;
                        <Image
                          alt={
                            titles.profile.preferences.general.parameters
                              .separator
                          }
                          src={`/separador${val.toString()}.png`}
                          layout="fill"
                          className="select__img"
                        />
                      </picture>
                    ),
                  }))}
                  placeholder={
                    titles.profile.preferences.general.parameters.select_border
                  }
                  components={{ SingleValue }}
                  className="select"
                  styles={{
                    control: (_) => ({
                      ..._,
                      border: "none",
                    }),
                  }}
                />
                <h3 className="h3">
                  {titles.profile.preferences.general.parameters.mail_colors}
                </h3>
                <div className="visual__inputs">
                  <ColorInput
                    name="bodyType"
                    color={colors.bodyType}
                    title={
                      titles.profile.preferences.general.parameters.mail_body
                    }
                    onColorChange={handleColorChange}
                  />
                  <ColorInput
                    name="bodyTextType"
                    title={
                      titles.profile.preferences.general.parameters
                        .body_typography
                    }
                    onColorChange={handleColorChange}
                    color={colors.bodyTextType}
                  />
                  <ColorInput
                    title={
                      titles.profile.preferences.general.parameters.mail_footer
                    }
                    onColorChange={handleColorChange}
                    name="footerType"
                    color={colors.footerType}
                  />
                  <ColorInput
                    title={
                      titles.profile.preferences.general.parameters
                        .footer_typography
                    }
                    onColorChange={handleColorChange}
                    name="footerTextType"
                    color={colors.footerTextType}
                  />
                  <ColorInput
                    title={
                      titles.profile.preferences.general.parameters
                        .action_buttons
                    }
                    onColorChange={handleColorChange}
                    name="buttonType"
                    color={colors.buttonType}
                  />
                  <ColorInput
                    title={
                      titles.profile.preferences.general.parameters
                        .buttons_typography
                    }
                    onColorChange={handleColorChange}
                    name="buttonTextType"
                    color={colors.buttonTextType}
                  />
                </div>
              </div>
              <div className="visual__btns">
                <button
                  type="reset"
                  className="btn btn--default"
                  onClick={() => resetColors(JSON.parse(stC))}
                >
                  {titles.profile.preferences.general.parameters.cancel}
                </button>
                <button
                  type="submit"
                  id="saveImages"
                  className="btn btn--secondary"
                >
                  {titles.profile.preferences.general.parameters.save}
                </button>
              </div>
            </form>
            <div className="mails__preview">
              <div className="card card--grey card--full mails__card">
                <h3 className="h3 h3--light">
                  {titles.profile.preferences.general.parameters.mail_preview}
                </h3>
                <Preview
                  colors={stringify({
                    ...colors,
                    frame: sep?.value || "1",
                    img: logoImage,
                    update: update.current,
                  })}
                  className="mails__frame"
                />
              </div>
              <div className="visual__btns">
                <Link
                  href={`/mails/general/${stringify({
                    ...colors,
                    frame: sep?.value || "1",
                    img: logoImage,
                    update: update.current,
                  })}`}
                >
                  <a target="_blank" rel="noreferrer" className="link">
                    {titles.profile.preferences.general.parameters.open_desktop}
                  </a>
                </Link>
              </div>
            </div>
          </section>
        </SideMenu>
      </Main>
    </>
  );
};

export default withAuth(wrappedOnStore(Mails));
