import React, {
  useEffect,
  useState,
  useCallback,
  KeyboardEvent,
  ChangeEvent,
} from "react";
import Image from "next/image";
import Input from "../forms/Input";
import visa from "./../../public/visa_.png";
import mastercard from "./../../public/mastercard_.png";
import amex from "./../../public/amex_.png";
import noBrand from "./../../public/nothing.png";
import pci from "./../../public/pci.png";
import powered from "./../../public/powered_by_smart.png";
import {
  AmexCardBin,
  MastercardCardBin,
  VisaCardBin,
  AllButDigits,
} from "../../middlewares/ValidationRegex";
import InputMask from "react-input-mask";
import FieldMasks from "../../helpers/cardValidations";
import Swal from "sweetalert2";
import SvgWrapper from "../SvgWrapper";
import svgs from "../../helpers/svgs";

let vis;
let countNum;
let otherCharacters;

interface Props {
  sift: {
    sessionId: string;
    userId: string;
    beaconKey: string;
  };
  total: number;
  fullname: string;
  cardNumber: string;
  expiration: string;
  cvv: string;
  errors: any;
  handleInputChange: Function;
  months: Array<any>;
  setMonthsData: Function;
  haveMonths: boolean;
  setConfig: Function;
  haveAdditional: boolean;
  setMaskPayCard: Function;
  colors: any;
  configMonths: string;
}

interface month {
  nameMsi: string;
  idNameMsi: number;
  montoMinimo: number;
  bin: string;
}

export const CardHolderDataForm: React.FC<Props> = ({
  sift,
  total,
  fullname,
  cardNumber,
  expiration,
  cvv,
  errors,
  handleInputChange,
  setConfig,
  haveAdditional,
  setMaskPayCard,
  colors,
  haveMonths,
  months,
  setMonthsData,
  configMonths,
}) => {
  const [maskedCard, setMaskedCard] = useState<string>();
  const [cvvMasked, setCvvMasked] = useState<string>();
  const [cardBrand, setCardBrand] = useState(visa);
  const [maxCharacters, setMaxCharacters] = useState<number>(3);
  const [fullNameNormalized, setFullNameNormalized] = useState<string>("");
  const [cscMessage, setCscMessage] = useState<string>("CVV / CSC *");
  const [msiData, setMsiData] = useState<Array<any>>([]);

  const onlyLetters = (event: KeyboardEvent<HTMLInputElement>) => {
    const pressedKey = event.keyCode || event.which || event.charCode;
    if (
      (pressedKey <= 36 || pressedKey >= 40) &&
      !/^[a-zA-Z \b]+$/.test(event.key) &&
      pressedKey !== 8
    )
      event.preventDefault();
  };
  const onlyNumbers = (e: KeyboardEvent<HTMLDivElement>) => {
    const pressedKey = e.keyCode || e.which || e.charCode;
    if (
      (pressedKey <= 36 || pressedKey >= 40) &&
      !/^[0-9\b]+$/.test(e.key) &&
      pressedKey !== 8
    )
      e.preventDefault();
  };
  const format = (num: number) =>
    num.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  const modalShow = () => {
    if (AmexCardBin.test(cardNumber)) {
      Swal.fire({
        imageUrl: "/AmericanExpress.png",
        imageWidth: 300,
        imageHeight: 200,
        imageAlt: "Custom image",
      });
    } else {
      Swal.fire({
        imageUrl: "/Visa&Mastercad.png",
        imageWidth: 300,
        imageHeight: 200,
        imageAlt: "Custom image",
      });
    }
  };

  const mask = useCallback(() => {
    if (cardNumber.replace(AllButDigits, "").length <= 12) {
      if (cardNumber.replace(AllButDigits, "").length === 1) {
        setMaskedCard(cardNumber.replace(AllButDigits, ""));
      } else {
        otherCharacters = cardNumber
          .replace(AllButDigits, "")
          .replace(new RegExp("[0-9]", "g"), "X")
          .slice(0, -1);
        setMaskedCard(
          otherCharacters + cardNumber.replace(AllButDigits, "").slice(-1)
        );
      }
      setTimeout(() => {
        setMaskedCard(
          cardNumber
            .replace(AllButDigits, "")
            .replace(new RegExp("[0-9]", "g"), "X")
        );
      }, 300);
    } else {
      if (cardNumber.replace(AllButDigits, "").length === 13) {
        vis = cardNumber.replace(AllButDigits, "").slice(-1);
        countNum = "";
        for (
          let i = cardNumber.replace(AllButDigits, "").length - 1;
          i > 0;
          i--
        ) {
          countNum += "X";
        }
        setMaskedCard(countNum + vis);
      }
      if (cardNumber.replace(AllButDigits, "").length === 14) {
        vis = cardNumber.replace(AllButDigits, "").slice(-2);
        countNum = "";
        for (
          let i = cardNumber.replace(AllButDigits, "").length - 2;
          i > 0;
          i--
        ) {
          countNum += "X";
        }
        setMaskedCard(countNum + vis);
      }
      if (cardNumber.replace(AllButDigits, "").length === 15) {
        vis = cardNumber.replace(AllButDigits, "").slice(-3);
        countNum = "";
        for (
          let i = cardNumber.replace(AllButDigits, "").length - 3;
          i > 0;
          i--
        ) {
          countNum += "X";
        }
        setMaskedCard(countNum + vis);
        setMaskPayCard(countNum + vis);
      }
      if (cardNumber.replace(AllButDigits, "").length === 16) {
        vis = cardNumber.replace(AllButDigits, "").slice(-4);
        countNum = "";
        for (
          let i = cardNumber.replace(AllButDigits, "").length - 4;
          i > 0;
          i--
        ) {
          countNum += "X";
        }
        setMaskedCard(countNum + vis);
        setMaskPayCard(countNum + vis);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardNumber]);

  // const isChecked = (val: number) => {
  //   console.log(typeof monthsData, "monthsData");
  //   console.log(typeof val);
  //   return monthsData === `${val}`;
  // };
  const isChecked = (e: any) => {
    let checkboxes = document.getElementsByName("meses");
    checkboxes.forEach((item: any) => {
      if (item !== e.target) item.checked = false;
    });
  };

  const setCheckedMonth = (value: any) => {
    setMonthsData(null);
    let checkboxes = document.getElementsByName("meses");
    checkboxes.forEach((item: any) => {
      if (item.checked) {
        setMonthsData(value);
      }
    });
  };

  const cvvcsc = useCallback(() => {
    if (cvv.length === 1) {
      setCvvMasked(cvv);
    } else {
      otherCharacters = cvv
        .replace(AllButDigits, "")
        .replace(new RegExp("[0-9]", "g"), "X")
        .slice(0, -1);
      setCvvMasked(otherCharacters + cvv.replace(AllButDigits, "").slice(-1));
    }
    setTimeout(() => {
      setCvvMasked(
        cvv.replace(AllButDigits, "").replace(new RegExp("[0-9]", "g"), "X")
      );
    }, 300);
  }, [cvv]);

  useEffect(() => {
    mask();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardNumber]);

  useEffect(() => {
    cvvcsc();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cvv]);

  useEffect(() => {
    setFullNameNormalized(
      fullname
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toUpperCase()
    );
  }, [handleInputChange, fullname]);

  useEffect(() => {
    if (cardNumber.length >= 2) {
      if (AmexCardBin.test(cardNumber)) {
        setMaxCharacters(4);
        setCardBrand(amex);
        setCscMessage("CID / CSC *");
      } else if (VisaCardBin.test(cardNumber)) {
        setMaxCharacters(3);
        setCardBrand(visa);
        setCscMessage("CVV / CSC *");
      } else if (MastercardCardBin.test(cardNumber)) {
        setMaxCharacters(3);
        setCardBrand(mastercard);
        setCscMessage("CVV / CSC *");
      } else {
      }
    } else {
      setCardBrand(noBrand);
    }
    // console.log(msiData);
  }, [cardNumber, cardBrand]);

  useEffect(() => {
    // console.log(configMonths);
    setMsiData([
      [
        Array(configMonths.slice(1, -1).split(","))[0][2].slice(0, -1),
        parseInt(
          Array(configMonths.slice(1, -1).split(","))[0][1].slice(0, -2)
        ),
      ],
      [
        Array(configMonths.slice(1, -1).split(","))[0][5].slice(0, -1),
        parseInt(
          Array(configMonths.slice(1, -1).split(","))[0][4].slice(0, -2)
        ),
      ],
      [
        Array(configMonths.slice(1, -1).split(","))[0][8].slice(0, -1),
        parseInt(
          Array(configMonths.slice(1, -1).split(","))[0][7].slice(0, -2)
        ),
      ],
      [
        Array(configMonths.slice(1, -1).split(","))[0][11].slice(0, -1),
        parseInt(
          Array(configMonths.slice(1, -1).split(","))[0][10].slice(0, -2)
        ),
      ],
    ]);

    if (sift) {
      var _sift = (window._sift = window._sift || []);
      _sift.push(["_setAccount", sift.beaconKey]);
      _sift.push(["_setUserId", sift.userId]);
      _sift.push(["_setSessionId", sift.sessionId]);
      _sift.push(["_trackPageview"]);

      var e = document.createElement("script");
      e.src = "https://cdn.sift.com/s.js";
      document.body.appendChild(e);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {haveAdditional && (
        <button
          type="submit"
          onClick={() => setConfig(true)}
          className="btn btn--return btn--card"
        >
          <SvgWrapper id={svgs.arrLeft} className="svg svg--small" />
        </button>
      )}
      <div className="checkout__logo-container checkout__logo-container--inner">
        <div className="checkout__logo checkout__logo--inner">
          <span>&nbsp;</span>
          <Image
            src={colors.logoPath || "/logo-smart.png"}
            alt="Logo"
            className="checkout__img"
            layout="fill"
          />
        </div>
      </div>
      <div className="cc">
        <div className="cc__card">
          <div className="cc__icon">
            <span>&nbsp;</span>
            <Image
              src={cardBrand}
              alt="Logo"
              className="checkout__img"
              layout="fill"
            />
          </div>
          <p className="cc__number">
            <span>&nbsp;</span>
            {cardNumber !== "" ? maskedCard : "XXXX XXXX XXXX XXXX"}
          </p>
          <div className="cc__text">
            <div className="cc__owner">
              <p className="cc__light">Titular</p>
              <p className="cc__owner_name">
                {fullNameNormalized !== null && fullNameNormalized !== ""
                  ? fullname
                      .normalize("NFD")
                      .replace(/[\u0300-\u036f]/g, "")
                      .toUpperCase()
                  : "NOMBRE DEL TITULAR"}{" "}
              </p>
            </div>
            <div className="cc__exp">
              <p className="cc__light">Vence</p>
              <p>
                {expiration !== "" && expiration !== undefined
                  ? `${expiration}`
                  : "XX / XX"}
              </p>
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
          placeholder="Nombre del titular *"
          value={fullNameNormalized || ""}
          name="fullname"
          maxLength={60}
          onKeyDown={onlyLetters}
          onChange={handleInputChange()}
          error={errors.fullname}
        />
        <div className="cc__numberMask">
          <div className="cc__data" id="cardUnmasked">
            <InputMask
              mask={
                AmexCardBin.test(cardNumber)
                  ? FieldMasks.cardMasked.amex
                  : FieldMasks.cardMasked.generic
              }
              value={cardNumber}
              onChange={handleInputChange()}
            >
              {() => <Input type="text" id="cardNumber" name="cardNumber" />}
            </InputMask>
          </div>
          <div className="cc__mask" id="cardMasked">
            <InputMask
              mask={
                AmexCardBin.test(cardNumber)
                  ? FieldMasks.card.amex
                  : FieldMasks.card.generic
              }
              value={maskedCard}
            >
              {() => (
                <Input
                  type="text"
                  placeholder="Número de tarjeta *"
                  error={errors.cardNumber}
                />
              )}
            </InputMask>
          </div>
        </div>
        <div className="form__inline form__maskcvv">
          <InputMask
            mask="99/99"
            value={expiration}
            onChange={handleInputChange()}
          >
            {() => (
              <Input
                type="text"
                placeholder="Vence *"
                inline
                full
                name="expiration"
                error={errors.expiration}
              />
            )}
          </InputMask>
          <div className="cc__cvvCard">
            <div className="cc__numberMask">
              <div className="cc__cvvData">
                <Input
                  type="text"
                  inline
                  full
                  id="cvvNumber"
                  maxLength={maxCharacters}
                  value={cvv}
                  name="cvv"
                  onKeyDown={onlyNumbers}
                  onChange={handleInputChange()}
                  helpColor={colors.bodyTextType}
                />
              </div>
              <div className="cc__cvvMask">
                <Input
                  type="text"
                  placeholder={cscMessage}
                  maxLength={maxCharacters}
                  inline
                  full
                  value={cvvMasked}
                  error={errors.cvv}
                  helpColor={colors.bodyTextType}
                />
              </div>
            </div>
            <button type="button" className="cc__help" onClick={modalShow}>
              ?
            </button>
          </div>
        </div>
        {haveMonths ? (
          <div
            className="form__inline"
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              setCheckedMonth(event.target.value);
            }}
          >
            {months.map((month: month) => {
              if (month.idNameMsi) {
                if (
                  month.idNameMsi === 1 &&
                  msiData[0][0] === "true" &&
                  msiData[0][1] <= total
                ) {
                  // console.log(msiData[0][1]);
                  // console.log(total);
                  return (
                    <div
                      key={month.idNameMsi}
                      style={{
                        backgroundColor: colors.buttonType,
                        color: colors.buttonTextType,
                        borderRadius: "10px",
                      }}
                    >
                      <input
                        type="checkbox"
                        id={`name${month.nameMsi[0]}`}
                        // checked={isChecked(month.idNameMsi)}
                        onClick={(e: any) => isChecked(e)}
                        className="msifilter__check"
                        style={{
                          backgroundColor: colors.buttonType,
                          color: colors.buttonTextType,
                        }}
                        name="meses"
                        value={month.idNameMsi}
                      />
                      <label
                        htmlFor={`name${month.nameMsi[0]}`}
                        className="msifilter__label"
                        style={{
                          backgroundColor: colors.buttonType,
                          color: colors.buttonTextType,
                        }}
                      >
                        <span>{month.nameMsi}</span>
                      </label>
                    </div>
                  );
                } else if (
                  month.idNameMsi === 2 &&
                  msiData[1][0] === "true" &&
                  msiData[1][1] <= total
                ) {
                  return (
                    <div
                      key={month.idNameMsi}
                      style={{
                        backgroundColor: colors.buttonType,
                        color: colors.buttonTextType,
                        borderRadius: "10px",
                      }}
                    >
                      <input
                        type="checkbox"
                        id={`name${month.nameMsi[0]}`}
                        // checked={isChecked(month.idNameMsi)}
                        onClick={(e: any) => isChecked(e)}
                        className="msifilter__check"
                        style={{
                          backgroundColor: colors.buttonType,
                          color: colors.buttonTextType,
                        }}
                        name="meses"
                        value={month.idNameMsi}
                      />
                      <label
                        htmlFor={`name${month.nameMsi[0]}`}
                        className="msifilter__label"
                        style={{
                          backgroundColor: colors.buttonType,
                          color: colors.buttonTextType,
                        }}
                      >
                        <span>{month.nameMsi}</span>
                      </label>
                    </div>
                  );
                } else if (
                  month.idNameMsi === 3 &&
                  msiData[2][0] === "true" &&
                  msiData[2][1] <= total
                ) {
                  return (
                    <div
                      key={month.idNameMsi}
                      style={{
                        backgroundColor: colors.buttonType,
                        color: colors.buttonTextType,
                        borderRadius: "10px",
                      }}
                    >
                      <input
                        type="checkbox"
                        id={`name${month.nameMsi[0]}`}
                        // checked={isChecked(month.idNameMsi)}
                        onClick={(e: any) => isChecked(e)}
                        className="msifilter__check"
                        style={{
                          backgroundColor: colors.buttonType,
                          color: colors.buttonTextType,
                        }}
                        name="meses"
                        value={month.idNameMsi}
                      />
                      <label
                        htmlFor={`name${month.nameMsi[0]}`}
                        className="msifilter__label"
                        style={{
                          backgroundColor: colors.buttonType,
                          color: colors.buttonTextType,
                        }}
                      >
                        <span>{month.nameMsi}</span>
                      </label>
                    </div>
                  );
                } else if (
                  month.idNameMsi === 4 &&
                  msiData[3][0] === "true" &&
                  msiData[3][1] <= total
                ) {
                  return (
                    <div
                      key={month.idNameMsi}
                      style={{
                        backgroundColor: colors.buttonType,
                        color: colors.buttonTextType,
                        borderRadius: "10px",
                      }}
                    >
                      <input
                        type="checkbox"
                        id={`name${month.nameMsi[0]}`}
                        // checked={isChecked(month.idNameMsi)}
                        onClick={(e: any) => isChecked(e)}
                        className="msifilter__check"
                        style={{
                          backgroundColor: colors.buttonType,
                          color: colors.buttonTextType,
                        }}
                        name="meses"
                        value={month.idNameMsi}
                      />
                      <label
                        htmlFor={`name${month.nameMsi[0]}`}
                        className="msifilter__label"
                        style={{
                          backgroundColor: colors.buttonType,
                          color: colors.buttonTextType,
                        }}
                      >
                        <span>{month.nameMsi}</span>
                      </label>
                    </div>
                  );
                }
              }
            })}
          </div>
        ) : (
          <div></div>
        )}
        <button
          type="submit"
          className="btn btn--secondary btn--big"
          style={{
            background: colors.buttonType,
            color: colors.buttonTextType,
            margin: "1rem auto",
          }}
        >
          {`Pagar MXN $${format(total / 100)}`}
        </button>
      </div>
      <div className="checkout__seals">
        <span>&nbsp;</span>
        <div className="checkout__seal">
          <Image src={pci} alt="PCI" layout="fill" className="checkout__img" />
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
    </>
  );
};
