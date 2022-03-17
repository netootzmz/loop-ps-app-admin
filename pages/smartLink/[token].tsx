import React, { FC, useEffect, useState } from "react";
import moment from "moment";
import Swal from "sweetalert2";
import SummarySale from "../../components/checkout/SummarySale";
import PaymentDataForm from "../../components/checkout/PaymentDataForm";
import { CardHolderDataForm } from "../../components/checkout/CardHolderDataForm";
import useForm from "../../hooks/useForm";
import { Utils } from "../../helpers/Utils";
import Router from "next/router";

import customFetch from "../../helpers/customFetch";
import {
  getAsciiToHexa,
  validCard,
  validCvv,
  validExpiration,
} from "../../helpers/cardValidations";
import { AllButDigits, RegexName } from "../../middlewares/ValidationRegex";
// import CancelPayment from "./cancelPayment";
import {
  iSendPaymentReq,
  iGetUserPaymentDataReq,
  iGetMonthsWithoutInterestReq,
} from "../../@types/api/req";
import {
  iSendPaymentRes,
  iGetUserPaymentDataRes,
  iGetMonthsWithoutInterestRes,
} from "../../@types/api/res";
import Head from "next/head";
import Image from "next/image";

const CardHolderData: FC = () => {
  const [initData, setInitData] = useState<iGetUserPaymentDataRes | any>({
    "linkConfiguration ": {},
  });

  const [months, setMonths] = useState<
    Array<iGetMonthsWithoutInterestRes | any>
  >([]);

  const [monthsData, setMonthsData] = useState(null);
  const [haveMonths, setHaveMonths] = useState(false);

  const [config, setConfig] = useState(true);
  const [haveAddittional, setHaveAdditional] = useState(false);
  const [maskPayCard, setMaskPayCard] = useState();

  const { reset, values, handleInputChange, errors, handleSubmit }: any =
    useForm<{
      fullname: string;
      name: string;
      lastname: string;
      lastname2: string;
      mailCardHolder: string;
      phoneNumber: string;
      zipCode: string;
      address: string;
      city: string;
      state: string;
      cardNumber: string;
      expiration: string;
      cvv: string;
    }>({
      initialValues: {
        fullname: "",
        name: "",
        lastname: "",
        lastname2: "",
        mailCardHolder: "",
        address: "",
        city: "",
        state: "",
        cardNumber: "",
        expiration: "",
        cvv: "",
        phoneNumber: "",
        zipCode: "",
      },
      validations: {
        fullname: {
          required: {
            value: true,
            message: "El campo es requerido",
          },
          custom: {
            isValid: (val) => RegexName.test(val),
            message: "Nombre no valido",
          },
        },
        expiration: {
          required: {
            value: true,
            message: "MM/DD requeridos",
          },
          custom: {
            isValid: (val) => validExpiration(val),
            message: "Fecha no valida",
          },
        },
        cardNumber: {
          required: {
            value: true,
            message: "El campo es requerido",
          },
          custom: {
            isValid: (val) => validCard(val),
            message: "Tarjeta no valida",
          },
        },
        cvv: {
          required: {
            value: true,
            message: "Cvv requerido",
          },
          custom: {
            isValid: (val) => validCvv(val, values.cardNumber),
            message: "Cvv invalido",
          },
        },
      },
      onSubmit: async () => {
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
        const payload = {
          apikey: initData.linkConfiguration?.apiKey,
          folioTx: initData.linkConfiguration?.folioTxn,
          name: values.name,
          lastname: values.lastname,
          lastname2: values.lastname2,
          email: values.mailCardHolder,
          phone: parseInt(values.phoneNumber),
          zipCode: parseInt(values.zipCode),
          address: values.address,
          city: values.city,
          state: values.state,
          nameHolder: values.fullname.toUpperCase(),
          cardNumber: values.cardNumber.replace(AllButDigits, ""),
          monthExpiration: values.expiration
            .replace(AllButDigits, "")
            .substr(0, 2),
          yearExpiration: values.expiration
            .replace(AllButDigits, "")
            .substr(2, 2),
          cvv: parseInt(values.cvv),
          cardTokenization: initData.linkConfiguration?.showTokenCard,
          terms: false,
          msiId: haveMonths ? monthsData : null,
          haveMsi: haveMonths ? (monthsData ? true : false) : false,
          typeLink: 2,
        };
        // console.log(payload);

        const txnDate = moment().format("DD-MM-YYYYHHmmss");
        const hexDate = getAsciiToHexa(txnDate).substr(0, 16);
        const apiKey = initData.linkConfiguration?.apiKey.substr(0, 16);
        const payloadData = {
          fechaOperacion: txnDate,
          dataReq: Utils.encryptJSON(JSON.stringify(payload), apiKey + hexDate),
          apiKey,
        };

        if (initData.linkConfiguration?.["3Ds"]) {
          setTimeout(() => {
            //Realiza petición
          }, 10000);
        } else {
          await customFetch<iSendPaymentReq, iSendPaymentRes>(
            "payments/sendPayment",
            true,
            "POST",
            payloadData
          )
            .then(async (solution: any) => {
              if (solution.dataReq !== null) {
                const solutionDesencrypt = await JSON.parse(
                  Utils.decryptJSON(solution.dataReq, apiKey + hexDate)
                );
                if (initData.linkConfiguration?.urlResponseRedirect) {
                  window.location.href =
                    initData.linkConfiguration?.urlResponseRedirect +
                    initData.linkConfiguration?.encriptCancelData;
                } else {
                  if (solutionDesencrypt.responseCode === "00") {
                    const paymentJson = {
                      maskCard: maskPayCard,
                      concept: initData.linkConfiguration?.concept,
                      total: initData.linkConfiguration?.amountNumber,
                      date: moment(),
                      reference: initData.linkConfiguration?.reference,
                      autCode: solutionDesencrypt.autCode,
                      cardBrand: solutionDesencrypt.cardBrand,
                      commerce: solutionDesencrypt.merchantName,
                    };
                    Swal.close();
                    console.log(paymentJson);
                    localStorage.setItem(
                      "pay-data",
                      JSON.stringify(paymentJson)
                    );
                    Router.push("/smartLink/processedPayment");
                  } else {
                    Swal.close();
                    Swal.fire({
                      icon: "error",
                      title: "Pago no aceptado",
                      timer: 30000,
                      text: solutionDesencrypt.responseMessage,
                    });
                    setTimeout(() => {
                      Router.push("/smartLink/cancelPayment");
                    }, 5000);
                  }
                }
              } else {
                Swal.close();
                Router.push("/pages/404");
              }
            })
            .catch(async (error: any) => {
              if (error.dataReq !== null) {
                const solutionDesencrypt = await JSON.parse(
                  Utils.decryptJSON(error.dataReq, apiKey + hexDate)
                );
                if (initData.linkConfiguration?.urlResponseRedirect) {
                  window.location.href =
                    initData.linkConfiguration?.urlResponseRedirect +
                    initData.linkConfiguration?.encriptCancelData;
                } else {
                  if (solutionDesencrypt.responseCode === "00") {
                    const paymentJson = {
                      maskCard: maskPayCard,
                      concept: initData.linkConfiguration?.concept,
                      total: initData.linkConfiguration?.amountNumber,
                      reference: initData.linkConfiguration?.reference,
                      date: moment(),
                      autCode:
                        solutionDesencrypt.autCode ||
                        solutionDesencrypt.params3DS.reference3D,
                      cardBrand:
                        solutionDesencrypt.cardBrand ||
                        solutionDesencrypt.params3DS.cardType,
                      commerce:
                        solutionDesencrypt.merchantName ||
                        solutionDesencrypt.params3DS.merchantName,
                    };
                    Swal.close();
                    console.log(paymentJson);
                    console.log(solutionDesencrypt);
                    localStorage.setItem(
                      "pay-data",
                      JSON.stringify(paymentJson)
                    );
                    Router.push("/smartLink/processedPayment");
                  } else {
                    Swal.close();
                    Swal.fire({
                      icon: "error",
                      title: "Pago no aceptado",
                      timer: 30000,
                      text: solutionDesencrypt.responseMessage,
                    });
                    setTimeout(() => {
                      Router.push("/pages/404");
                    }, 5000);
                  }
                }
              } else {
                Swal.close();
                Router.push("/pages/404");
              }
            });
        }
        reset();
      },
    });

  const getData = async (token: string) => {
    // const tokenSlag = token.replace(/%2F/g, "/");
    // console.log(tokenSlag);
    await customFetch<iGetUserPaymentDataReq, iGetUserPaymentDataRes>(
      "payments/getUserData",
      false,
      "POST",
      {
        linkToken: token,
      }
    )
      .then(({ information }) => {
        // console.log(information);
        setInitData(information);
        if (information) {
          // console.log(information);
          if (information.linkConfiguration.haveAdditionalInfo !== 1) {
            setConfig(false);
          } else {
            setHaveAdditional(true);
          }
        }
      })
      .catch(() => {
        //Liga de pago cancelada
        Router.push("/smartLink/expiredPayment");
      });
  };

  const getMonths = async (card: string) => {
    await customFetch<
      iGetMonthsWithoutInterestReq,
      iGetMonthsWithoutInterestRes
    >("payments/getMonths", true, "POST", {
      bin: card,
      folioTxn: initData.linkConfiguration?.folioTxn,
    })
      .then(({ information, message }): any => {
        // console.log(information);

        if (information) {
          if (
            information.response.length > 0 &&
            message !== "Sin registros para mostrar"
          ) {
            setMonths(information.response);
            setHaveMonths(true);
          } else {
            setHaveMonths(false);
          }
        }
      })
      .catch(({ information, message }): any => {
        if (information) {
          if (
            information.response.length > 0 &&
            message !== "Sin registros para mostrar"
          ) {
            setMonths(information.response);
            setHaveMonths(true);
          } else {
            setHaveMonths(false);
          }
        }
      });
  };

  useEffect(() => {
    let card = values.cardNumber.replaceAll(AllButDigits, "");
    if (card.length === 6 || card.length >= 15) {
      getMonths(card.substr(0, 6));
    }
    if (months.length > 0) {
      setHaveMonths(true);
    } else {
      setHaveMonths(false);
    }
    if (card.length < 6) {
      setHaveMonths(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.cardNumber]);

  useEffect(() => {
    const token = window.location.href.split("/")[4];
    getData(token);
  }, []);

  return (
    <>
      <Head>
        <title>SmartLink</title>
      </Head>
      {moment().format("YYYY-MM-DDTHH:MM:ss.SSSZZ") <
      initData.linkConfiguration?.validUntil ? (
        <main className="checkout">
          <div
            className="checkout__container"
            style={{ background: initData?.identidadGrafica.footerType }}
          >
            <div className="checkout__logo-container">
              <div className="checkout__logo">
                <span>&nbsp;</span>
                <Image
                  src={initData?.identidadGrafica.logoPath || "/logo-smart.png"}
                  alt="Logo"
                  className="checkout__img"
                  layout="fill"
                />
              </div>
            </div>
            <div
              className="checkout__details"
              style={{ color: initData?.identidadGrafica.footerTextType }}
            >
              <SummarySale data={initData.linkConfiguration} />
            </div>
            <form onSubmit={handleSubmit}>
              {config ? (
                <div
                  className="checkout__information"
                  style={{ color: initData?.identidadGrafica.bodyType }}
                >
                  <PaymentDataForm
                    name={values.name}
                    lastname={values.lastname}
                    lastname2={values.lastname2}
                    mailCardHolder={values.mailCardHolder}
                    phoneNumber={values.phoneNumber}
                    zipCode={values.zipCode}
                    address={values.address}
                    city={values.city}
                    state={values.state}
                    handleInputChange={handleInputChange}
                    setConfig={setConfig}
                    colors={initData?.identidadGrafica}
                  />
                </div>
              ) : (
                <section className="checkout__information">
                  <CardHolderDataForm
                    sift={initData.linkConfiguration?.siftParamas}
                    total={initData.linkConfiguration?.amountNumber}
                    fullname={values.fullname}
                    cardNumber={values.cardNumber}
                    expiration={values.expiration}
                    cvv={values.cvv}
                    errors={errors}
                    handleInputChange={handleInputChange}
                    months={months}
                    setMonthsData={setMonthsData}
                    haveMonths={haveMonths}
                    setConfig={setConfig}
                    haveAdditional={haveAddittional}
                    setMaskPayCard={setMaskPayCard}
                    colors={initData?.identidadGrafica}
                    configMonths={initData.linkConfiguration?.months}
                  />
                </section>
              )}
            </form>
          </div>
        </main>
      ) : (
        <div> </div>
      )}
    </>
  );
};

export default CardHolderData;
