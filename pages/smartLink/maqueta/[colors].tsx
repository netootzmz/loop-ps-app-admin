import React, { ChangeEvent, FC, useEffect, useState } from "react";
import Input from "../../../components/forms/Input";
import pci from "./../../../public/pci.png";
import powered from "./../../../public/powered_by_smart.png";
import Image from "next/image";
import visa from "./../../../public/visa_.png";
import mastercard from "./../../../public/mastercard_.png";
import amex from "./../../../public/amex_.png";
import { useRouter } from "next/router";
import { parse } from "query-string";

const Maqueta: FC = () => {
  const router = useRouter();
  const [col, setCol] = useState<string>("");

  const colors = parse(col) as {
    bodyTextType: string;
    bodyType: string;
    buttonTextType: string;
    buttonType: string;
    footerTextType: string;
    footerType: string;
    logo: string;
    page: string;
  };

  useEffect(() => {
    setCol(router.query.colors as string);
  }, [router.query.colors]);

  return (
    <main className="checkout">
      <div
        className="checkout__container"
        style={{ background: colors.footerType }}
      >
        <div className="checkout__logo-container">
          <div className="checkout__logo">
            <span>&nbsp;</span>
            <Image
              src={colors.logo || "/logo-smart.png"}
              alt="Logo"
              className="checkout__img"
              layout="fill"
            />
          </div>
        </div>
        <section
          className="checkout__details"
          style={{ color: colors.footerTextType }}
        >
          <h1 className="checkout__title">Cinemex universidad</h1>
          <div className="checkout__address">
            <p>Calle No. 00 CP. 00000 Col. Colonia</p>
            <p>Ciudad de México, México</p>
          </div>

          <ul className="checkout__list">
            <li className="checkout__item checkout__item--title">
              Resumen de la venta
            </li>
            <li className="checkout__item checkout__item--sub">
              Cinemex universidad{" "}
            </li>
            <li className="checkout__item">
              <span>Concepto:</span>
              <span>
                <b>Concepto</b>
              </span>
            </li>
            <li className="checkout__item">
              <span>Venta:</span>
              <span>
                <b>$000,000.00</b>
              </span>
            </li>
            <li className="checkout__item">
              <span>Propina:</span>
              <span>
                <b>$000,000.00</b>
              </span>
            </li>
            <li className="checkout__item">
              <span>Total:</span>
              <span>
                <b>$000,000.00</b>
              </span>
            </li>
          </ul>
        </section>

        <section
          className="checkout__information"
          style={{ color: colors.bodyType }}
        >
          {colors.page === "1" ? (
            <>
              <div className="checkout__logo-container checkout__logo-container--inner">
                <div className="checkout__logo">
                  <span>&nbsp;</span>
                  <Image
                    src={colors.logo || "/logo-smart.png"}
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
                    helpColor={colors.bodyTextType}
                    maxLength={20}
                    onChange={(e: ChangeEvent) => e.preventDefault}
                    disabled
                  />
                  <Input
                    name="lastname"
                    placeholder="Apellido paterno *"
                    type="text"
                    maxLength={20}
                    helpColor={colors.bodyTextType}
                    onChange={(e: ChangeEvent) => e.preventDefault}
                    disabled
                  />
                  <Input
                    name="lastname2"
                    placeholder="Apellido materno"
                    type="text"
                    maxLength={20}
                    helpColor={colors.bodyTextType}
                    onChange={(e: ChangeEvent) => e.preventDefault}
                    disabled
                  />
                </div>
                <div className="cardHolder__form--smart">
                  <Input
                    name="mailCardHolder"
                    placeholder="Correo electrónico *"
                    type="email"
                    maxLength={255}
                    helpColor={colors.bodyTextType}
                    onChange={(e: ChangeEvent) => e.preventDefault}
                    disabled
                  />
                  <Input
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
                    name="zipCode"
                    placeholder="Código postal"
                    type="text"
                    helpColor={colors.bodyTextType}
                    maxLength={5}
                    onChange={(e: ChangeEvent) => e.preventDefault}
                    disabled
                  />
                  <Input
                    name="address"
                    placeholder="Calle y número"
                    type="text"
                    maxLength={20}
                    helpColor={colors.bodyTextType}
                    onChange={(e: ChangeEvent) => e.preventDefault}
                    disabled
                  />
                </div>
                <div className="cardHolder__form--smart">
                  <Input
                    name="city"
                    placeholder="Ciudad / Municipio"
                    type="text"
                    maxLength={100}
                    helpColor={colors.bodyTextType}
                    onChange={(e: ChangeEvent) => e.preventDefault}
                    disabled
                  />
                  <Input
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
                  onChange={e => e.preventDefault}
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
            </>
          ) : (
            <>
              <div className="checkout__logo-container checkout__logo-container--inner">
                <div className="checkout__logo checkout__logo--inner">
                  <span>&nbsp;</span>
                  <Image
                    src={colors.logo || "/logo-smart.png"}
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
                  onChange={e => e.preventDefault}
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
            </>
          )}
        </section>
      </div>
    </main>
  );
};

export default Maqueta;
