import React, { useState, useEffect } from "react";
import type { NextPage } from "next";
import Image from "next/image";
import logo from "./../../../public/powered_by_smart_white.png";
import { useRouter } from "next/router";
import { parse } from "query-string";
import Head from "next/head";
import { useSelector } from "react-redux";
import { iGlobalState, iUiState } from "../../../@types/store/states";
import useLang from "../../../hooks/useLang";

const General: NextPage = () => {
  const { lang } = useSelector<iGlobalState, iUiState>(({ ui }) => ui);
  const { titles } = useLang(lang);
  const router = useRouter();
  const [col, setCol] = useState<string>("");

  const colors = parse(col) as {
    bodyTextType: string;
    bodyType: string;
    buttonTextType: string;
    buttonType: string;
    footerTextType: string;
    footerType: string;
    img: string;
    frame: string;
  };

  const hexToHSL = (H: string = "#ffffff") => {
    // Convert hex to RGB first
    let r: any = 0,
      g: any = 0,
      b: any = 0;
    if (H.length === 4) {
      r = "0x" + H[1] + H[1];
      g = "0x" + H[2] + H[2];
      b = "0x" + H[3] + H[3];
    } else if (H.length === 7) {
      r = "0x" + H[1] + H[2];
      g = "0x" + H[3] + H[4];
      b = "0x" + H[5] + H[6];
    }
    // Then to HSL
    r /= 255;
    g /= 255;
    b /= 255;
    let cmin = Math.min(r, g, b),
      cmax = Math.max(r, g, b),
      delta = cmax - cmin,
      h = 0,
      s = 0,
      l = 0;

    if (delta === 0) h = 0;
    else if (cmax === r) h = ((g - b) / delta) % 6;
    else if (cmax === g) h = (b - r) / delta + 2;
    else h = (r - g) / delta + 4;

    h = Math.round(h * 60);

    if (h < 0) h += 360;

    l = (cmax + cmin) / 2;
    s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);
    return { h, s, l };
  };

  useEffect(() => {
    setCol(router.query.colors as string);
  }, [router.query.colors]);

  return (
    <main className="mail-general" style={{ color: colors.bodyTextType }}>
      <Head>
        <title>Smart - Mails</title>
      </Head>
      <div
        className="mail-general__container"
        style={{ background: colors.footerType }}
      >
        <section className="mail-general__header">&nbsp;</section>
        <section
          className="mail-general__main"
          style={{ background: colors.bodyType }}
        >
          <div className="mail-general__top">
            <h3 className="h3 mail-general__title">{titles.colors.link}</h3>
            <picture className="mail-general__picture">
              {colors.img && (
                <Image
                  alt="Logotipo de marca"
                  src={colors.img.replace(/ /g, "+")}
                  className="mail-general__logo"
                  layout="fill"
                />
              )}
            </picture>
          </div>
          <picture className="mail-general__arr-c">
            <Image
              alt="separador"
              src={`/separador${colors.frame}.png`}
              className="mail-general__arr mail-general__arr--top"
              layout="fill"
            />
          </picture>
          <div className="mail-general__content">
            <ul className="mail-general__list">
              <li>{titles.colors.commerceName}</li>
              <li>
                {titles.colors.commerceAddress}:{" "}
                {`<${titles.colors.commerceAddressStore}>`}
              </li>
              <li>usuario@dominio.com</li>
              <li>55 0000 0000</li>
            </ul>
            <div className="mail-general__title">
              <h2 className="h2">{titles.colors.greetings}</h2>
              <h4 className="h4">{titles.colors.details}</h4>
            </div>
            <div className="mail-general__details">
              <ul className="mail-general__keys">
                <li>{titles.colors.date}</li>
                <li>{titles.colors.concept}</li>
                <li>{titles.colors.number}</li>
                <li>{titles.colors.amount}</li>
                <li>{titles.colors.linkDate}</li>
              </ul>
              <ul className="mail-general__data">
                <li>2021-05-27 12:35:15</li>
                <li>{titles.colors.proves}</li>
                <li>May71A</li>
                <li>$50.00</li>
                <li>2021-05-27 | 17:23:15</li>
              </ul>
            </div>
            <button
              className="btn btn--secondary"
              style={{
                marginRight: 0,
                color: colors.buttonTextType,
                background: colors.buttonType,
              }}
            >
              {titles.colors.payment}
            </button>
            <p>{titles.colors.question}</p>
            <p>
              {titles.colors.attention}
              <br />
              800 3476 278
              <br />
              contactcenter@spaymentservices.com
            </p>
          </div>
          <picture className="mail-general__arr-c">
            <Image
              alt="separador"
              src={`/separador${colors.frame}${
                parseInt(colors.frame) < 4 ? "-2" : ""
              }.png`}
              className="mail-general__arr mail-general__arr--bottom"
              layout="fill"
            />
          </picture>
        </section>
        <section
          className="mail-general__footer"
          style={{ color: colors.footerTextType }}
        >
          <div
            style={{
              filter: `brightness(50%) sepia(1) hue-rotate(${
                hexToHSL(colors.footerTextType).h - 38
              }deg) saturate(${
                100 + (hexToHSL(colors.footerTextType).s - 21.3)
              }%) brightness(${
                100 + (hexToHSL(colors.footerTextType).l - 60)
              }%)`,
            }}
          >
            <Image
              src={logo}
              className="mail-general__powered"
              alt="Site powered by Smart Payment Services SA de CV"
            />
          </div>
        </section>
      </div>
    </main>
  );
};

export default General;
