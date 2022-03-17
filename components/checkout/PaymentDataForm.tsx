import React, { KeyboardEvent, useState, useEffect } from "react";
import Input from "../forms/Input";
import pci from "./../../public/pci.png";
import powered from "./../../public/powered_by_smart.png";
import Image from "next/image";
import { EmailRegex, RegexName } from "../../middlewares/ValidationRegex";

interface Props {
  name: string;
  lastname: string;
  lastname2: string;
  mailCardHolder: string;
  phoneNumber: string;
  zipCode: string;
  address: string;
  city: string;
  state: string;
  handleInputChange: Function;
  setConfig: Function;
  colors: any;
}

const PaymentDataForm: React.FC<Props> = ({
  name,
  lastname,
  lastname2,
  mailCardHolder,
  phoneNumber,
  zipCode,
  address,
  city,
  state,
  handleInputChange,
  setConfig,
  colors,
}) => {
  const [validEmail, setValidEmail] = useState(false);
  const [validName, setValidName] = useState(false);
  const [validLastName, setValidLastName] = useState(false);

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

  useEffect(() => {
    if (EmailRegex.test(mailCardHolder)) {
      setValidEmail(true);
    } else {
      setValidEmail(false);
    }
  }, [mailCardHolder]);

  useEffect(() => {
    if (RegexName.test(name)) {
      setValidName(true);
    } else {
      setValidName(false);
    }
  }, [name]);

  useEffect(() => {
    if (RegexName.test(lastname)) {
      setValidLastName(true);
    } else {
      setValidLastName(false);
    }
  }, [lastname]);

  return (
    <>
      <div className="checkout__logo-container checkout__logo-container--inner">
        <div className="checkout__logo">
          <span>&nbsp;</span>
          <Image
            src={colors.logoPath || "/logo-smart.png"}
            alt="Logo"
            className="checkout__img"
            layout="fill"
          />
        </div>
      </div>
      <div className="cardHolder__form">
        <h4 className="cardHolder__title">Información de pago</h4>
        <p className="cardHolder__information">
          Llena los campos con los datos ligados a la forma de pago
        </p>
        <div className="cardHolder__form--smart">
          <Input
            name="name"
            placeholder="Nombre(s) *"
            type="text"
            value={name || ""}
            maxLength={20}
            onKeyDown={onlyLetters}
            onChange={handleInputChange()}
            helpColor={colors.bodyTextType}
          />
          <Input
            name="lastname"
            placeholder="Apellido paterno *"
            type="text"
            value={lastname || ""}
            maxLength={20}
            onKeyDown={onlyLetters}
            onChange={handleInputChange()}
            helpColor={colors.bodyTextType}
          />
          <Input
            name="lastname2"
            placeholder="Apellido materno"
            type="text"
            value={lastname2 || ""}
            maxLength={20}
            onKeyDown={onlyLetters}
            onChange={handleInputChange()}
            helpColor={colors.bodyTextType}
          />
        </div>
        <div className="cardHolder__form--smart">
          <Input
            name="mailCardHolder"
            placeholder="Correo electrónico *"
            type="email"
            maxLength={255}
            value={mailCardHolder || ""}
            onChange={handleInputChange()}
            helpColor={colors.bodyTextType}
          />
          <Input
            name="phoneNumber"
            placeholder="Número telefónico"
            type="text"
            value={phoneNumber}
            maxLength={10}
            onKeyDown={onlyNumbers}
            onChange={handleInputChange()}
            helpColor={colors.bodyTextType}
          />
        </div>
        <div className="cardHolder__form--smart">
          <Input
            name="zipCode"
            placeholder="Código postal"
            type="text"
            value={zipCode}
            maxLength={5}
            onKeyDown={onlyNumbers}
            onChange={handleInputChange()}
            helpColor={colors.bodyTextType}
          />
          <Input
            name="address"
            placeholder="Calle y número"
            type="text"
            maxLength={20}
            value={address || ""}
            onChange={handleInputChange()}
            helpColor={colors.bodyTextType}
          />
        </div>
        <div className="cardHolder__form--smart">
          <Input
            name="city"
            placeholder="Ciudad / Municipio"
            type="text"
            maxLength={100}
            value={city || ""}
            onKeyDown={onlyLetters}
            onChange={handleInputChange()}
            helpColor={colors.bodyTextType}
          />
          <Input
            name="state"
            placeholder="Estado"
            type="text"
            value={state || ""}
            maxLength={19}
            onKeyDown={onlyLetters}
            onChange={handleInputChange()}
            helpColor={colors.bodyTextType}
          />
        </div>
        <button
          style={{
            background: colors.buttonType,
            color: colors.buttonTextType,
            margin: "1rem auto",
          }}
          type="button"
          className="btn btn--secondary btn--big"
          disabled={
            !(
              name !== "" &&
              lastname !== "" &&
              mailCardHolder !== "" &&
              validEmail &&
              validName &&
              validLastName
            )
          }
          onClick={() => {
            setConfig(false);
          }}
        >
          Continuar
        </button>
      </div>
      <div className="checkout__seals">
        <div className="checkout__seal">
          <span>&nbsp;</span>
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

export default PaymentDataForm;
