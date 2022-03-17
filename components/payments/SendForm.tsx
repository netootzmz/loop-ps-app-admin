import React, { FC, useEffect } from "react";
import Input from "../forms/Input";
import useForm from "../../hooks/useForm";
import { useSelector } from "react-redux";
import {
  iGlobalState,
  iUiState,
  iPaymentsState,
} from "../../@types/store/states";
import Checkbox from "../forms/Checkbox";
// import { startSendingPayment } from "../../store/actions/paymentAction";
import useLang from "../../hooks/useLang";
import Swal from "sweetalert2";
import customFetch from "helpers/customFetch";
import { iSendPaymentLeagueReq, iModalBlockedReq } from "../../@types/api/req";
import { iSendPaymentLeagueRes, iModalBlockedRes } from "../../@types/api/res";

const SendForm: FC<{
  setShowModal: Function;
}> = ({ setShowModal }) => {
  const { lang, newLinkData, config } = useSelector<
    iGlobalState,
    iUiState & iPaymentsState
  >(({ ui, payments }) => ({ ...ui, ...payments }));

  // const dispatch = useDispatch();

  const { titles } = useLang(lang);

  const { values, reset, handleInputChange } = useForm<{
    send_email: boolean;
    email: string;
  }>({});

  const format = (num: number) =>
    num.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  const blockedPayment = async () => {
    Swal.fire({
      title: "En espera del pago",
      allowOutsideClick: false,
      showConfirmButton: false,
      heightAuto: false,
      willOpen: () => {
        Swal.showLoading();
      },
    });
    // const token = newLinkData?.url.split("/")[4];
    const checkPayment = setInterval(async () => {
      await customFetch<iModalBlockedReq, iModalBlockedRes>(
        "payments/getStatusPayment",
        true,
        "POST",
        {
          folioTx: newLinkData?.folio,
        }
      )
        .then((response) => {
          if (response.information!.result.operationTypeId === 2) {
            let card = response.information?.result.cardNumber
              ? `**** **** **** ${response.information?.result.cardNumber.slice(
                  -4
                )}`
              : "N/D";
            const tableLogs = Swal.mixin({
              customClass: {
                htmlContainer: "",
              },
            });
            //   let table = `
            //   <div>
            //     <div>
            //       <h2>Resumen de la transacción</h2>
            //     </div>
            //   </div>
            //   <table id="table">
            //     <tbody>
            //       <tr>
            //         <td>Número de aprobación: </td>
            //         <td>${
            //           response.information?.result.authorizerReplyMessage || "N/D"
            //         }</td>
            //       </tr>
            //       <tr>
            //         <td>Fecha de transacción: </td>
            //         <td>${response.information?.result.linkDate || "N/D"}</td>
            //       </tr>
            //       <tr>
            //         <td>Hora de transacción: </td>
            //         <td>${response.information?.result.linkHour || "N/D"}</td>
            //       </tr>
            //       <tr>
            //         <td>Comercio: </td>
            //         <td>${response.information?.result.hierarchyId || "N/D"}</td>
            //       </tr>
            //       <tr>
            //         <td>Concepto: </td>
            //         <td>${response.information?.result.linkConcept || "N/D"}</td>
            //       </tr>
            //       <tr>
            //         <td>Meses sin intereses: </td>
            //         <td>${
            //           response.information?.result.monthsWithoutInterest || "N/D"
            //         }</td>
            //       </tr>
            //       <tr>
            //         <td>Número de tarjeta: </td>
            //         <td>${response.information?.result.cardNumber || "N/D"}</td>
            //       </tr>
            //       <tr>
            //         <td>Marca: </td>
            //         <td>${response.information?.result.cardName || "N/D"}</td>
            //       </tr>
            //       <tr>
            //         <td>Fecha de pago: </td>
            //         <td>${response.information?.result.paymentDate || "N/D"}</td>
            //       </tr>
            //       <tr>
            //         <td>Hora de pago: </td>
            //         <td>${response.information?.result.paymentHour || "N/D"}</td>
            //       </tr>
            //       <tr>
            //         <td>Naturaleza</td>
            //         <td>${response.information?.result.cardType || "N/D"}</td>
            //       </tr>
            //     </tbody>
            //   </table>
            // `;
            let table = `
            <div style="margin-bottom: 10px;">
              <div>
                <h2>Transacción aprobada</h2>   
                <h2 style="color: #f2711c;">$${
                  response.information
                    ? format(
                        parseFloat(
                          response.information!.result.amount.replace(/,/g, "")
                        ) / 100
                      )
                    : "0.00"
                }</h2>             
              </div>
            </div> 
            <table id="table" style="border-spacing: 0;width: 100%; margin: 0 auto;">             
              <tbody>                               
                <tr style="width: 100%;">
                  <td style="text-align:right;width: 49.5%; color: rgba(53, 74, 94, 0.6); padding-right: 20px; font-size: 11px;">Referencia</td>
                  <td style="width: 0.7%; background-color: #354a5e; border-radius: 8px;"></td>
                  <td style="text-align: left;width: 49.5%; color: #354a5e; font-weight: 500; padding-left: 20px; font-size: 12px;">${
                    response.information?.result.tradeReference || "N/D"
                  }</td>
                </tr>
                <tr>
                  <td style="text-align:right;width: 49.5%; color: rgba(53, 74, 94, 0.6);; padding-right: 20px; font-size: 11px;">Autorización</td>
                  <td style="width: 0.7%; background-color: #354a5e; border-radius: 8px;"></td>
                  <td style="text-align: left;width: 49.5%; color: #354a5e; font-weight: 500; padding-left: 20px; font-size: 12px;">${
                    response.information?.result.refSPNum || "N/D"
                  }</td>
                </tr>
                <tr>
                  <td style="text-align:right;width: 49.5%; color: rgba(53, 74, 94, 0.6); padding-right: 20px; font-size: 11px;">Fecha</td>
                  <td style="width: 0.7%; background-color: #354a5e; border-radius: 8px;"></td>
                  <td style="text-align: left;width: 49.5%; color: #354a5e; font-weight: 500; padding-left: 20px; font-size: 12px;">${
                    response.information?.result.linkDate
                  } ${
              response.information?.result.linkHour
            }</td>                                      
                </tr>
                <tr>
                  <td style="text-align:right;width: 49.5%; color: rgba(53, 74, 94, 0.6); padding-right: 20px; font-size: 11px;">Tarjeta</td>
                  <td style="width: 0.7%;background-color: #354a5e; border-radius: 8px;"></td>
                  <td style="text-align: left;width: 49.5%; color: #354a5e; font-weight: 500; padding-left: 20px; font-size: 12px;">${card}</td>
                </tr>
              </tbody>
            </table> 
          `;
            clearInterval(checkPayment);
            Swal.close();
            tableLogs.fire({
              confirmButtonColor: "#f2711c",
              confirmButtonText: "OK",
              width: "360px",
              imageUrl: "/Check.png",
              imageHeight: 100,
              imageWidth: 100,
              html: table,
            });
          }
        })
        .catch((error) => {
          console.log(error);
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Ocurrio un error al realizar el pago",
            didClose: () => {
              clearInterval(checkPayment);
            },
          });
        });
    }, 10000);
  };

  const sendPayment = async () => {
    Swal.fire({
      title: "Cargando...",
      allowOutsideClick: false,
      showConfirmButton: false,
      heightAuto: false,
      willOpen: () => {
        Swal.showLoading();
      },
    });
    await customFetch<iSendPaymentLeagueReq, iSendPaymentLeagueRes>(
      "payments/send",
      true,
      "POST",
      {
        folioTxn: newLinkData?.folio || "",
        addressee: values.email,
        typeTemplate: 1,
      }
    )
      .then(() => {
        Swal.close();
        if (config?.paymentScreenBehaviorId === 2) {
          setShowModal(false);
          Swal.fire({
            title: "¡Éxito!",
            text: "¡Liga enviada correctamente!",
            icon: "success",

            confirmButtonColor: "#f2711c",
            confirmButtonText: "Continuar",
            allowEscapeKey: false,
            allowOutsideClick: false,
          });
        } else if (config?.paymentScreenBehaviorId === 1) {
          setShowModal(false);
          blockedPayment();
        }
      })
      .catch((error) => {
        Swal.close();
        Swal.fire("Error", error.message, "error");
      });
  };

  useEffect(() => {
    reset();
  }, [lang, reset]);

  return (
    <form className="payments__send animate__animated animate__backInRight">
      <h2 className="h2 payments__title">
        {titles.payments.parameters.send_link}
      </h2>
      <div className="card card--big">
        <div className="form">
          <Input
            copyToClip
            placeholder={titles.payments.parameters.payment_link}
            type="text"
            name="liga"
            value={newLinkData?.url || ""}
            readOnly
          />
        </div>
        <div className="payments__method">
          <Checkbox
            inline
            name="select_email"
            value="email"
            onChange={() =>
              reset({ ...values, send_email: !values.send_email })
            }
            checked={values.send_email || false}
          />
          <Input
            inline
            name="email"
            type="email"
            placeholder={titles.payments.parameters.email}
            onChange={handleInputChange()}
            value={values.email || ""}
            disabled={!values.send_email}
          />
        </div>
        {/* <div className="payments__method">
          <Checkbox inline name="select_sms" disabled />
          <Input inline name="sms" placeholder="SMS" disabled />
        </div>
        <div className="payments__method">
          <Checkbox inline name="select_wa" disabled />
          <Input inline name="wa" placeholder="Whatsapp" disabled />
        </div> */}
      </div>
      <div className="payments__buttons">
        <button
          type="button"
          onClick={sendPayment}
          className="btn btn--secondary"
        >
          {titles.payments.parameters.send}
        </button>
      </div>
    </form>
  );
};

export default SendForm;
