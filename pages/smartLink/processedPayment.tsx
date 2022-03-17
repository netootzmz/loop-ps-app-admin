import Image from "next/image";
import React, { FC, useState, useEffect } from "react";
import moment from 'moment';
import logoColor from "./../../public/SPLogo.png";
import logoPower from "./../../public/powered_by_smart_white.png";
import visa from "./../../public/visa_.png";
import mastercard from "./../../public/mastercard_.png";
import amex from "./../../public/amex_.png";
import noBrand from "./../../public/nothing.png"
import check from "./../../public/Check.png";
import Head from "next/head";
import Router from 'next/router';

const ProcessedPayment: FC = () => {
  const [ brand, setBrand ] = useState(noBrand);
  const [ paymentData, setPaymentData ]: any = useState({});

  const format = (num: number) => num.toLocaleString('en-US', {
    minimumFractionDigits: 2,      
    maximumFractionDigits: 2,
  });  

  useEffect(() => {
    if(paymentData.cardBrand){
      if(paymentData.cardBrand === "VISA"){
        setBrand(visa);
      }else if(paymentData.cardBrand === "AMERICAN EXPRESS"){
        setBrand(amex);
      }else if(paymentData.cardBrand === "MASTERCARD"){
        setBrand(mastercard);
      }else{
        setBrand(noBrand);
      }  
    }
  }, [paymentData]);
  
  useEffect(() => {
    let data = window.localStorage.getItem('pay-data');
    if(data){
      if(data.length > 1){      
        data = JSON.parse(data);
        setPaymentData(data);           
      }else{
        Router.push("/smartLink/cancelPayment");
      }   
    }
  }, []);

  return (
    <>
      <Head>
        <title>Smart - Pago Procesado</title>
      </Head>
      <div className="confirm__container">
        <div className="confirm__header">
          &nbsp;
        </div>
        <main className="confirm">
          <div className="confirm__logo">
            <Image
              src={logoColor}
              alt="Smart payment logo"
              layout="fill"
              className="confirm__img"
            />
          </div>
          <Image
            src={check}
            alt="Processes Payment"
            className="confirm__img"
          />
          <p className="confirm__text">Tu pago por <b>${format(paymentData.total / 100)} MXN </b> ha sido procesado <br />exitosamente</p>
          <div className="confirm__big">         
            <ul className="checkout__payment">
                <li className="checkout__item checkout__item--title checkout__processed ">
                    RESUMEN
                </li>
                <li className="checkout__item checkout__pay--data">
                  <div className="cc__icon">
                    <Image src={brand}  alt="Logo" className="checkout__img checkout__img--pay" />
                  </div>
                  <span className="checkout__item--text">
                      <b>{paymentData.maskCard}</b>
                  </span>
                </li>
                <li className="checkout__item checkout__pay--data">
                    <span className="checkout__item--text"><strong>Autorizacion</strong></span>
                    <span className="checkout__item--text">
                        <b>{paymentData.autCode}</b>                        
                    </span>
                </li>
                <li className="checkout__item checkout__pay--data">
                    <span className="checkout__item--text"><strong>Referencia</strong></span>
                    <span className="checkout__item--text">
                        <b>{paymentData.reference}</b>
                    </span>
                </li>
                <li className="checkout__item checkout__pay--data">
                    <span className="checkout__item--text"><strong>Concepto</strong></span>
                    <span className="checkout__item--text">
                        <b>{paymentData.concept}</b> 
                    </span>
                </li>
                <li className="checkout__item checkout__pay--data">
                    <span className="checkout__item--text"><strong>Comercio</strong></span>
                    <span className="checkout__item--text">
                        <b>{paymentData.commerce}</b> 
                    </span>
                </li>
                <li className="checkout__item checkout__pay--data">
                    <span className="checkout__item--text"><strong>Fecha y hora</strong></span>
                    <span className="checkout__item--text">
                        <b>{moment(paymentData.date).format("DD/MM/YYYY HH:mm:ss")}</b> 
                    </span>
                </li>
            </ul>      
            <p className="checkout__item--sentence">El comprobante de la operación te ha sido enviado por email</p>
          </div>
        </main>
        <footer className="confirm__footer">
          <Image
            src={logoPower}
            alt="Smart logo white"
            layout="fill"
            className="confirm__img"
          />
        </footer>
      </div>
    </>
  );
};

export default ProcessedPayment;
