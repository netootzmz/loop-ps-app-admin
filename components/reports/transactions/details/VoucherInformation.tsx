import Image from "next/image";
import React from "react";
import { ComponentWithStore } from "../../../../@types/store";
import useAnimate from "../../../../hooks/useAnimate";
import { wrappedOnStore } from "../../../../store";
import logo from "./../../../../public/logo-smart.png";

const VoucherInformation: ComponentWithStore = ({
  transactions: { transactionActive },
}) => {
  useAnimate(".details__voucher", "fadeIn", []);
  return (
    <div className="details__voucher">
      <picture className="details__logo">
        {transactionActive?.promissoryNoteServPtalDto.urlLogo ? (
          <Image
            src={transactionActive?.promissoryNoteServPtalDto.urlLogo}
            alt={transactionActive?.promissoryNoteServPtalDto.merchantName}
            layout="fill"
            className="details__img"
          />
        ) : (
          <Image
            src={logo}
            alt="Smart Payment Services SA de CV"
            layout="fill"
            className="details__img"
          />
        )}
      </picture>
      <div className="details__line details__line--left">&nbsp;</div>
      <div className="details__v-content">
        <h3>
          {transactionActive?.promissoryNoteServPtalDto.merchantName
            ? transactionActive?.promissoryNoteServPtalDto.merchantName
            : ""}
        </h3>
        <p>
          {transactionActive?.promissoryNoteServPtalDto.optionalMessage || (
            <>&nbsp;</>
          )}
        </p>
        <p>
          <small>
            {transactionActive?.promissoryNoteServPtalDto.address || (
              <>&nbsp;</>
            )}
          </small>
        </p>
        <div className="details__v-inner">
          <p>
            <span>Venta:</span>
            <span>
              $
              {Intl.NumberFormat("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }).format(
                parseFloat(
                  transactionActive?.promissoryNoteServPtalDto.saleAmount || "0"
                )
              )}{" "}
              MXN
            </span>
          </p>
          <p>
            <span>Propina:</span>
            <span>
              $
              {Intl.NumberFormat("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }).format(
                parseFloat(
                  transactionActive?.promissoryNoteServPtalDto.tippingAmount ||
                    "0"
                )
              )}{" "}
              MXN
            </span>
          </p>
          <p className="details__v-inner--total">
            <span>Total:</span>
            <span>
              $
              {Intl.NumberFormat("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }).format(
                parseFloat(
                  transactionActive?.promissoryNoteServPtalDto.totalAmount ||
                    "0"
                )
              )}{" "}
              MXN
            </span>
          </p>
        </div>
        <p style={{ justifySelf: "center", marginBottom: "1rem" }}>
          <small>
            <b>
              {transactionActive?.promissoryNoteServPtalDto
                .statusPromissoryNote || <>&nbsp;</>}
            </b>
          </small>
        </p>
        <p style={{ margin: "auto", paddingBottom: "1rem" }}>
          {transactionActive?.informationServPtalDto.response?.toUpperCase()}
        </p>
        <p>
          <span>Autorización:</span>
          <span>
            <b>
              {transactionActive?.promissoryNoteServPtalDto
                .authorizationNumber &&
              transactionActive?.promissoryNoteServPtalDto
                .authorizationNumber !== "null"
                ? transactionActive?.promissoryNoteServPtalDto
                    .authorizationNumber
                : ""}
            </b>
          </span>
        </p>
        <p>
          <span>No. de Afiliación:</span>
          <span>
            <b>
              {transactionActive?.promissoryNoteServPtalDto.merchantNumber &&
              transactionActive?.promissoryNoteServPtalDto.merchantNumber !==
                "null"
                ? transactionActive?.promissoryNoteServPtalDto.merchantNumber
                : ""}
            </b>
          </span>
        </p>
        <p>
          <span>Tipo de transacción:</span>
          <span>
            <b>
              {transactionActive?.promissoryNoteServPtalDto.transactionType &&
              transactionActive?.promissoryNoteServPtalDto.transactionType !==
                "null"
                ? transactionActive?.promissoryNoteServPtalDto.transactionType
                    ?.toString()
                    .toUpperCase()
                : ""}
            </b>
          </span>
        </p>
        <p>
          <span>Fecha de pago:</span>
          <span>
            <b>
              {transactionActive?.promissoryNoteServPtalDto.payDate &&
              transactionActive?.promissoryNoteServPtalDto.payDate !== "null"
                ? transactionActive?.promissoryNoteServPtalDto.payDate
                : ""}
            </b>
          </span>
        </p>
        <p>
          <span>No. de Referencia:</span>
          <span>
            <b>
              {transactionActive?.promissoryNoteServPtalDto.referenceNumber &&
              transactionActive?.promissoryNoteServPtalDto.referenceNumber !==
                "null"
                ? transactionActive?.promissoryNoteServPtalDto.referenceNumber
                : ""}
            </b>
          </span>
        </p>
        <p>
          <span>Folio:</span>
          <span>
            <b>
              {transactionActive?.promissoryNoteServPtalDto.folio &&
              transactionActive?.promissoryNoteServPtalDto.folio !== "null"
                ? transactionActive?.promissoryNoteServPtalDto.folio
                : ""}
            </b>
          </span>
        </p>
        <p>
          <span>No. de tarjeta:</span>
          <span>
            <b>
              {transactionActive?.promissoryNoteServPtalDto.cardNumber &&
              transactionActive?.promissoryNoteServPtalDto.cardNumber !== "null"
                ? transactionActive?.promissoryNoteServPtalDto.cardNumber.slice(
                    -8
                  )
                : ""}
            </b>
          </span>
        </p>
        <p>
          <span>Emisor:</span>
          <span>
            <b>
              {transactionActive?.promissoryNoteServPtalDto.acquirer &&
              transactionActive?.promissoryNoteServPtalDto.acquirer !== "null"
                ? transactionActive?.promissoryNoteServPtalDto.acquirer
                : ""}
            </b>
          </span>
        </p>
        {transactionActive?.promissoryNoteServPtalDto?.product !==
          "TARJETA PRESENTE" &&
          transactionActive?.promissoryNoteServPtalDto.eci && (
            <p>
              <span>ECI:</span>
              <span>
                <b>
                  {transactionActive?.promissoryNoteServPtalDto.eci &&
                  transactionActive?.promissoryNoteServPtalDto.eci !== "null"
                    ? transactionActive?.promissoryNoteServPtalDto.eci
                    : ""}
                </b>
              </span>
            </p>
          )}
        <p>
          <span>Tipo de tarjeta:</span>
          <span>
            <b>
              {transactionActive?.promissoryNoteServPtalDto.cardType &&
              transactionActive?.promissoryNoteServPtalDto.cardType !== "null"
                ? transactionActive?.promissoryNoteServPtalDto.cardType?.toUpperCase()
                : ""}
            </b>
          </span>
        </p>
        <p>
          <span>Producto:</span>
          <span>
            <b>
              {transactionActive?.promissoryNoteServPtalDto.product &&
              transactionActive?.promissoryNoteServPtalDto.product !== "null"
                ? transactionActive?.promissoryNoteServPtalDto.product
                : ""}
            </b>
          </span>
        </p>
        <p className="details__v-warning">
          <span>El estado de cuenta podría mostrar el cargo por parte de</span>
          <br />
          {`SMARTPY`}
        </p>
      </div>
      <div className="details__line details__line--right">&nbsp;</div>
      <p className="details__v-footer">
        Pago en una sola exhibición. Por este pagaré se toma obligo
        incondicional a pagar la orden al banco acreditable del importe de este
        título. Este pagaré procede del contrato de apertura del crédito que el
        banco tiene celebrado con el tarjetahabiente
      </p>
    </div>
  );
};

export default wrappedOnStore(VoucherInformation);
