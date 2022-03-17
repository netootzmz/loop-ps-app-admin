/* eslint-disable react-hooks/exhaustive-deps */
import Image from "next/image";
import Input from "../../../../components/forms/Input";
import Head from "next/head";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { iLink } from "../../../../@types/components";
import { PageWithStore } from "../../../../@types/store";
import ColorInput from "../../../../components/forms/ColorInput";
import Main from "../../../../components/main";
import SideMenu from "../../../../components/main/SideMenu";
import svgs from "../../../../helpers/svgs";
import withAuth from "../../../../helpers/withAuth";
import useLang from "../../../../hooks/useLang";
import { setPageTitle } from "../../../../store/actions/uiActions";
import { wrappedOnStore } from "../../../../store/index";
import useColorsForm from "./../../../../hooks/useColorsForm";
// import queryString from "query-string";
// import Link from "next/link";
import visa from "./../../../../public/visa_.png";
import mastercard from "./../../../../public/mastercard_.png";
import amex from "./../../../../public/amex_.png";
import Swal from "sweetalert2";
import {
  iCustomResponse,
  iGetSmartLinkColors,
} from "../../../../@types/api/res";
import manageErrorsMessages from "../../../../helpers/manageErrorsMessages";
import customFetch from "../../../../helpers/customFetch";
import { iSetColorsMailsGeneral } from "../../../../@types/api/req";
import pci from "./../../../../public/pci.png";
import powered from "./../../../../public/powered_by_smart.png";
// import files from "pages/conciliation/files";

const VisualIdentity: PageWithStore = ({
  dispatch,
  ui: { lang },
  auth: { clientId, group_description },
}) => {
  const { titles } = useLang(lang);

  const imgInputRef = useRef<HTMLInputElement>(null);
  const update = useRef(0);
  const [imageError, setImageError] = useState(false);
  const [imageSrc, setImageSrc] = useState<any>(mastercard);

  const [page, setPage] = useState(1);

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
          await customFetch<iSetColorsMailsGeneral, {}>(
            "profile/preferences/colors/smartlink/set-colors",
            true,
            "POST",
            {
              ...colors,
              clientId: clientId || "",
              frameId: 1,
              logo: "",
            }
          );

          Swal.fire({
            title: lang === "es" ? "Cargando..." : "Loading...",
            backdrop: `
            rgba(0,0,123,0.4)
            left top
            no-repeat
          `,
            allowOutsideClick: false,
            didOpen: () => {
              Swal.showLoading();
            },
            timer: 60000,
            didClose: () => {
              location.reload();
            },
          });

          // dispatch(startGettingSmartLinkColorsConfiguration());
          // resetColors(JSON.parse(stC));
          Swal.close();

          // Swal.close();
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

  const handleChangeImage = async (e: ChangeEvent<HTMLInputElement>) => {
    setImageError(false);
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      let _URL = window.URL || window.webkitURL;
      let img = document.createElement("img");
      img.onload = function () {
        if (img.width <= 600 && img.height <= 600) {
          if (file.size <= 400000) {
            setImageSrc(URL.createObjectURL(file));
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

  const handleImageSave = async () => {
    setImageError(false);

    // const file = e.target.files ? e.target.files[0] : null;
    const image: any = document.getElementById("LogoInput");
    let file = image?.files[0];
    // console.log(file);
    if (file) {
      // setImageSrc(URL.createObjectURL(file));
      let _URL = window.URL || window.webkitURL;
      let img = document.createElement("img");
      img.onload = async function () {
        if (img.width <= 600 && img.height <= 600) {
          try {
            const res = await Swal.fire({
              title:
                lang === "es"
                  ? `¿Cargar imagen ${file.name}?`
                  : `Upload image ${file.name}?`,
              showDenyButton: true,
              confirmButtonText: lang === "es" ? `Guardar` : "Save",
              denyButtonText: lang === "es" ? `No guardar` : "Don't save",
              denyButtonColor: "#cb1414",
              confirmButtonColor: "#f2711c",
              icon: "question",
              iconColor: "#f2711c",
            });
            if (res.isConfirmed) {
              if (file.type === "image/png") {
                if (file.size <= 400000) {
                  const base64 = await getBase64(file);
                  await customFetch<iSetColorsMailsGeneral, {}>(
                    "profile/preferences/colors/smartlink/set-colors",
                    true,
                    "POST",
                    {
                      ...colors,
                      clientId: clientId || "",
                      frameId: 1,
                      logo: base64 as string,
                    }
                  )
                    .then((response: any) => {
                      console.log(response);
                      Swal.fire({
                        icon: "success",
                        title: "Éxito",
                        text: "Cambios guardados exitosamente",
                      });
                    })
                    .catch((error) => {
                      console.log(error, "adios");
                      Swal.fire({
                        icon: "success",
                        title: "Éxito",
                        text: "Cambios guardados exitosamente",
                      });
                    });
                  // dispatch(startGettingSmartLinkColorsConfiguration());
                  // resetColors(JSON.parse(stC));
                  update.current += 1;
                  // Swal.close();
                  setImageError(false);
                  // Router.reload();
                  return;
                }
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
            file = null;
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
    } else {
      const res = await Swal.fire({
        title: lang === "es" ? `¿Guardar cambios?` : `Save changes?`,
        showDenyButton: true,
        confirmButtonText: lang === "es" ? `Guardar` : "Save",
        denyButtonText: lang === "es" ? `No guardar` : "Don't save",
        denyButtonColor: "#cb1414",
        confirmButtonColor: "#f2711c",
        icon: "question",
        iconColor: "#f2711c",
      });
      if (res.isConfirmed) {
        await customFetch<iSetColorsMailsGeneral, {}>(
          "profile/preferences/colors/smartlink/set-colors",
          true,
          "POST",
          {
            ...colors,
            clientId: clientId || "",
            frameId: 1,
            logo: "",
          }
        )
          .then(() => {
            Swal.fire({
              icon: "success",
              title: "Éxito",
              text: "Cambios guardados exitosamente",
            });
          })
          .catch(() => {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "No se pudo guardar los cambios",
            });
          });
      }
    }
  };

  const getUserData = async () => {
    Swal.fire({
      title: "Procesando",
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
    setTimeout(async () => {
      Swal.fire({
        title: "Procesando",
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
      await customFetch<undefined, iGetSmartLinkColors>(
        `profile/preferences/colors/smartlink/${clientId}`,
        true
      )
        .then((response) => {
          Swal.close();
          resetColors({
            bodyTextType: response.information?.checkout[0].bodyTextType!,
            bodyType: response.information?.checkout[0].bodyType!,
            buttonTextType: response.information?.checkout[0].buttonTextType!,
            buttonType: response.information?.checkout[0].buttonType!,
            footerTextType: response.information?.checkout[0].footerTextType!,
            footerType: response.information?.checkout[0].footerType!,
          });
          setImageSrc(response.information?.checkout[0].logoPath);
        })
        .catch(() => {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Error al cargar los datos",
          });
        });
    }, 1500);
  };

  useEffect(() => {
    dispatch(
      setPageTitle(
        titles.profile.preferences.title +
          " | " +
          titles.profile.preferences.remote_payments.title +
          " | " +
          titles.profile.preferences.remote_payments.visual_identity
      )
    );
  }, [
    dispatch,
    titles.profile.preferences.title,
    titles.profile.preferences.remote_payments.title,
    titles.profile.preferences.remote_payments.visual_identity,
  ]);

  useEffect(() => {
    getUserData();
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
            titles.profile.preferences.remote_payments.visual_identity}
        </title>
      </Head>
      <Main>
        <SideMenu
          links={menu}
          title={titles.profile.preferences.remote_payments.title}
        >
          <section className="visual">
            <div className="visual__btns visual__btns--top">
              <div className="btn__group">
                <button
                  type="button"
                  className={`btn btn__group-item ${
                    page === 1 ? "btn__group-item--active" : ""
                  }`}
                  onClick={() => setPage(1)}
                >
                  {
                    titles.profile.preferences.remote_payments.parameter
                      .client_data
                  }
                </button>
                <button
                  type="button"
                  className={`btn btn__group-item ${
                    page === 2 ? "btn__group-item--active" : ""
                  }`}
                  onClick={() => setPage(2)}
                >
                  {titles.profile.preferences.remote_payments.parameter.payment}
                </button>
              </div>
            </div>
            <form className="form visual__form" onSubmit={handleSubmit}>
              <div className="card card--full visual__card">
                <h3 className="h3">
                  {
                    titles.profile.preferences.remote_payments.parameter
                      .top_logo
                  }
                </h3>
                <div className="file-input__container">
                  <input
                    type="file"
                    id="LogoInput"
                    className="file-input__hidden"
                    accept="image/png"
                    ref={imgInputRef}
                    onChange={handleChangeImage}
                  />
                  <div className="file-input" onClick={handleImageSelect}>
                    <span className="file-input__placeholder">
                      {
                        titles.profile.preferences.remote_payments.parameter
                          .file_location
                      }
                    </span>
                    <button type="button" className="btn btn--file">
                      {
                        titles.profile.preferences.remote_payments.parameter
                          .examine
                      }
                    </button>
                  </div>
                  <span
                    className={`file-input__help ${
                      imageError ? "file-input__help--err" : ""
                    }`}
                  >
                    {
                      titles.profile.preferences.remote_payments.parameter
                        .must_be
                    }{" "}
                    {'".png"'}{" "}
                    {
                      titles.profile.preferences.remote_payments.parameter
                        .file_limitations
                    }
                  </span>
                </div>
                <h3 className="h3">
                  {titles.profile.preferences.remote_payments.parameter.colors}
                </h3>
                <div className="visual__inputs">
                  <ColorInput
                    name="bodyType"
                    color={colors.bodyType}
                    title={
                      titles.profile.preferences.remote_payments.parameter
                        .body_typography
                    }
                    onColorChange={handleColorChange}
                  />
                  <ColorInput
                    name="bodyTextType"
                    title={
                      titles.profile.preferences.remote_payments.parameter
                        .help_text_typography
                    }
                    onColorChange={handleColorChange}
                    color={colors.bodyTextType}
                  />
                  <ColorInput
                    title={
                      titles.profile.preferences.remote_payments.parameter
                        .body_resume
                    }
                    onColorChange={handleColorChange}
                    name="footerType"
                    color={colors.footerType}
                  />
                  <ColorInput
                    title={
                      titles.profile.preferences.remote_payments.parameter
                        .resume_typography
                    }
                    onColorChange={handleColorChange}
                    name="footerTextType"
                    color={colors.footerTextType}
                  />
                  <ColorInput
                    title={
                      titles.profile.preferences.remote_payments.parameter
                        .action_buttons
                    }
                    onColorChange={handleColorChange}
                    name="buttonType"
                    color={colors.buttonType}
                  />
                  <ColorInput
                    title={
                      titles.profile.preferences.remote_payments.parameter
                        .buttons_typography
                    }
                    onColorChange={handleColorChange}
                    name="buttonTextType"
                    color={colors.buttonTextType}
                  />
                </div>
              </div>
              <div className="visual__btns">
                <button type="reset" className="btn btn--default">
                  {titles.profile.preferences.remote_payments.parameter.cancel}
                </button>
                <button
                  id="saveButton"
                  type="button"
                  className="btn btn--secondary"
                  onClick={() => handleImageSave()}
                >
                  {titles.profile.preferences.remote_payments.parameter.save}
                </button>
              </div>
            </form>
            <div className="form visual__form">
              <div className="card card--full card--grey visual__card">
                <h3 className="h3 h3--light">
                  {titles.profile.preferences.remote_payments.parameter.preview}
                </h3>

                {page === 1 ? (
                  <div className="card card--big mailpayment__card">
                    <div
                      className="mailpayment__header"
                      style={{ backgroundColor: colors.footerType }}
                    >
                      <span>&nbsp;</span>
                    </div>
                    <div className="visual__logo">
                      <div className="visual__logo__container">
                        <Image
                          loader={() => imageSrc}
                          src={imageSrc}
                          alt="logo smart"
                          width="220px"
                          height="150px"
                        />
                      </div>
                    </div>
                    <div
                      className="visual__address"
                      style={{
                        color: colors.footerTextType,
                        backgroundColor: colors.footerType,
                      }}
                    >
                      <h1 className="checkout__title">{group_description}</h1>
                      <ul className="checkout__list">
                        <li className="checkout__item checkout__item--title">
                          Resumen de la venta
                        </li>
                        <li className="checkout__item checkout__item--sub visual__list">
                          Cinemex universidad{" "}
                        </li>
                        <li className="checkout__item visual__list">
                          <span>Concepto:</span>
                          <span>
                            <b>Concepto</b>
                          </span>
                        </li>
                        <li className="checkout__item visual__list">
                          <span>Venta:</span>
                          <span>
                            <b>$000,000.00</b>
                          </span>
                        </li>
                        <li className="checkout__item visual__list">
                          <span>Propina:</span>
                          <span>
                            <b>$000,000.00</b>
                          </span>
                        </li>
                        <li className="checkout__item visual__list">
                          <span>Total:</span>
                          <span>
                            <b>$000,000.00</b>
                          </span>
                        </li>
                      </ul>
                    </div>
                    <div
                      className="cardHolder__form"
                      style={{
                        width: "90%",
                        padding: "0",
                        marginTop: "20px",
                        color: colors.bodyType,
                      }}
                    >
                      <h4 className="cardHolder__title visual__list">
                        Información de pago
                      </h4>
                      <p className="cardHolder__information">
                        Llena los campos con los datos ligados a la forma de
                        pago
                      </p>
                      <div className="cardHolder__form--inputs">
                        <Input
                          full
                          name="name"
                          placeholder="Nombre(s) *"
                          type="text"
                          helpColor={colors.bodyTextType}
                          maxLength={20}
                          onChange={(e: ChangeEvent) => e.preventDefault}
                          disabled
                        />
                        <Input
                          full
                          name="lastname"
                          placeholder="Apellido paterno *"
                          type="text"
                          maxLength={20}
                          helpColor={colors.bodyTextType}
                          onChange={(e: ChangeEvent) => e.preventDefault}
                          disabled
                        />
                        <Input
                          full
                          name="lastname2"
                          placeholder="Apellido materno"
                          type="text"
                          maxLength={20}
                          helpColor={colors.bodyTextType}
                          onChange={(e: ChangeEvent) => e.preventDefault}
                          disabled
                        />
                      </div>
                      <div className="cardHolder__form--inputs">
                        <Input
                          full
                          name="mailCardHolder"
                          placeholder="Correo electrónico *"
                          type="email"
                          maxLength={255}
                          helpColor={colors.bodyTextType}
                          onChange={(e: ChangeEvent) => e.preventDefault}
                          disabled
                        />
                        <Input
                          full
                          name="phoneNumber"
                          placeholder="Número telefónico"
                          type="text"
                          maxLength={10}
                          onChange={(e: ChangeEvent) => e.preventDefault}
                          helpColor={colors.bodyTextType}
                          disabled
                        />
                      </div>
                      <div className="cardHolder__form--smart">
                        <Input
                          full
                          name="zipCode"
                          placeholder="Código postal"
                          type="text"
                          helpColor={colors.bodyTextType}
                          maxLength={5}
                          onChange={(e: ChangeEvent) => e.preventDefault}
                          disabled
                        />
                        <Input
                          full
                          name="address"
                          placeholder="Calle y número"
                          type="text"
                          maxLength={20}
                          helpColor={colors.bodyTextType}
                          onChange={(e: ChangeEvent) => e.preventDefault}
                          disabled
                        />
                      </div>
                      <div className="cardHolder__form--inputs">
                        <Input
                          full
                          name="city"
                          placeholder="Ciudad / Municipio"
                          type="text"
                          maxLength={100}
                          helpColor={colors.bodyTextType}
                          onChange={(e: ChangeEvent) => e.preventDefault}
                          disabled
                        />
                        <Input
                          full
                          name="state"
                          placeholder="Estado"
                          type="text"
                          maxLength={19}
                          helpColor={colors.bodyTextType}
                          onChange={(e: ChangeEvent) => e.preventDefault}
                          disabled
                        />
                      </div>
                      <button
                        type="button"
                        className="btn btn--secondary btn--big btn--disabled"
                        onChange={(e) => e.preventDefault}
                        style={{
                          background: colors.buttonType,
                          color: colors.buttonTextType,
                          margin: "1rem auto",
                        }}
                        disabled
                      >
                        Continuar
                      </button>
                    </div>
                    <div className="checkout__seals">
                      <div className="checkout__seal">
                        <span>&nbsp;</span>
                        <Image
                          src={pci}
                          alt="PCI"
                          layout="fill"
                          className="checkout__img"
                        />
                      </div>
                      <div className="checkout__seal">
                        <span>&nbsp;</span>
                        <Image
                          src={powered}
                          alt="Powered by Smart"
                          layout="fill"
                          className="checkout__img"
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="card card--big mailpayment__card">
                    <div
                      className="mailpayment__header"
                      style={{ backgroundColor: colors.footerType }}
                    >
                      <span>&nbsp;</span>
                    </div>
                    <div className="visual__logo">
                      <div className="visual__logo__container">
                        <Image
                          loader={() => imageSrc}
                          src={imageSrc}
                          alt="logo smart"
                          width="220px"
                          height="150px"
                        />
                      </div>
                    </div>
                    <div
                      className="visual__address"
                      style={{
                        color: colors.footerTextType,
                        backgroundColor: colors.footerType,
                      }}
                    >
                      <h1 className="checkout__title">{group_description}</h1>
                      <ul className="checkout__list">
                        <li className="checkout__item checkout__item--title">
                          Resumen de la venta
                        </li>
                        <li className="checkout__item checkout__item--sub visual__list">
                          Cinemex universidad{" "}
                        </li>
                        <li className="checkout__item visual__list">
                          <span>Concepto:</span>
                          <span>
                            <b>Concepto</b>
                          </span>
                        </li>
                        <li className="checkout__item visual__list">
                          <span>Venta:</span>
                          <span>
                            <b>$000,000.00</b>
                          </span>
                        </li>
                        <li className="checkout__item visual__list">
                          <span>Propina:</span>
                          <span>
                            <b>$000,000.00</b>
                          </span>
                        </li>
                        <li className="checkout__item visual__list">
                          <span>Total:</span>
                          <span>
                            <b>$000,000.00</b>
                          </span>
                        </li>
                      </ul>
                    </div>
                    <div style={{ marginTop: "25px", width: "95%" }}>
                      <div className="cc">
                        <div className="cc__card" style={{ width: "55%" }}>
                          <div className="cc__icon">
                            <span>&nbsp;</span>
                            <Image
                              src={visa}
                              alt="Visa"
                              layout="fill"
                              className="cc__icon--img"
                            />
                          </div>
                          <p className="cc__number">**** **** **** 1234</p>
                          <div className="cc__text">
                            <div className="cc__owner">
                              <p className="cc__light">Titular</p>
                              <p>Ernesto Padilla</p>
                            </div>
                            <div className="cc__exp">
                              <p className="cc__light">Vence</p>
                              <p>02/29</p>
                            </div>
                          </div>
                        </div>
                        <div className="cc__companies">
                          <div className="cc__company">
                            <span>&nbsp;</span>
                            <Image
                              src={visa}
                              alt="Visa"
                              layout="fill"
                              className="cc__company--img"
                            />
                          </div>
                          <div className="cc__company">
                            <span>&nbsp;</span>
                            <Image
                              src={mastercard}
                              alt="MasterCard"
                              layout="fill"
                              className="cc__company--img"
                            />
                          </div>
                          <div className="cc__company">
                            <span>&nbsp;</span>
                            <Image
                              src={amex}
                              alt="American Express"
                              layout="fill"
                              className="cc__company--img"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="form form--nmb">
                        <Input
                          type="text"
                          placeholder="Nombre del titular"
                          helpColor={colors.bodyTextType}
                          onChange={(e: ChangeEvent) => e.preventDefault}
                          disabled
                        />
                        <Input
                          type="text"
                          placeholder="Número de tarjeta"
                          helpColor={colors.bodyTextType}
                          onChange={(e: ChangeEvent) => e.preventDefault}
                          disabled
                        />
                        <Input
                          type="text"
                          placeholder="Fecha de vencimiento"
                          helpColor={colors.bodyTextType}
                          onChange={(e: ChangeEvent) => e.preventDefault}
                          disabled
                        />
                        <Input
                          type="text"
                          placeholder="CVV / CSC"
                          helpColor={colors.bodyTextType}
                          onChange={(e: ChangeEvent) => e.preventDefault}
                          disabled
                        />
                        <button
                          type="submit"
                          className="btn btn--secondary btn--big btn--disabled"
                          onChange={(e) => e.preventDefault}
                          style={{
                            background: colors.buttonType,
                            color: colors.buttonTextType,
                            margin: "1rem auto",
                          }}
                          disabled
                        >
                          Continuar y pagar
                        </button>
                      </div>
                    </div>
                    <div className="checkout__seals">
                      <div className="checkout__seal">
                        <span>&nbsp;</span>
                        <Image
                          src={pci}
                          alt="PCI"
                          layout="fill"
                          className="checkout__img"
                        />
                      </div>
                      <div className="checkout__seal">
                        <span>&nbsp;</span>
                        <Image
                          src={powered}
                          alt="Powered by Smart"
                          layout="fill"
                          className="checkout__img"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
              {/* <iframe
                  src={`/smartLink/maqueta/${queryString.stringify({
                    ...colors,
                    page,
                    logo: smartlink?.logo,
                    update: update.current,
                  })}`}
                  frameBorder={0}
                  allowFullScreen
                  className="visual__preview"
                /> */}
              {/* <div className="visual__btns">
                <Link
                  href={`/smartLink/maqueta/${queryString.stringify({
                    ...colors,
                    page,
                    logo: smartlink?.logo,
                    update: update.current,
                  })}`}
                >
                  <a target="_blank" rel="noreferrer" className="link">
                    {
                      titles.profile.preferences.remote_payments.parameter
                        .open_desktop
                    }
                  </a>
                </Link>
              </div> */}
            </div>
          </section>
        </SideMenu>
      </Main>
    </>
  );
};

export default withAuth(wrappedOnStore(VisualIdentity));
