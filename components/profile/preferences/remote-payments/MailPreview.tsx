import Image from 'next/image';
import React, { FC } from 'react';
import svgs from '../../../../helpers/svgs';
import SvgWrapper from '../../../SvgWrapper';
import Smartlogo from './../../../../public/logo-smart.png';
import PoweredBy from './../../../../public/powered_by_smart_white.png';
import { useSelector } from 'react-redux';
import { iGlobalState, iUiState } from '../../../../@types/store/states';
import useLang from '../../../../hooks/useLang';

export const MailPreview: FC<{ 
    headerText: string,
    titleLineOne: string,
    titleLineTwo: string,
    endBody: string,
    footerLineOne: string,
    contactPhone: string,
    contactEmail: string,
    disclaimer: string,
    reset: Function, 
    handleSubmit: Function
}> = ({
    headerText,
    titleLineOne,
    titleLineTwo,
    endBody,
    footerLineOne,
    contactPhone,
    contactEmail,
    disclaimer,
    reset,
    handleSubmit
}) => {
    const { lang } = useSelector<iGlobalState, iUiState>(({ ui }) => ui);
    const { titles } = useLang(lang);
    return (
        <div>
            <h2 className="h2 payments__title">{titles.profile.preferences.remote_payments.parameter.mail_preview}</h2>
            <div className="card card--big card--mail mailpayment">
                <div className="card card--big mailpayment__container">
                    <div className="mailpayment__header"></div>
                    <div className="mailpayment__header_text">
                        <h4 className="h4 mailpayment__title mailpayment__title_text">{headerText || `${titles.profile.preferences.remote_payments.parameter.remote_payment_link}`}</h4>
                        <div className="mailpayment__smartlogo">
                            <Image src={Smartlogo} alt="logo smart" />
                        </div>
                    </div>
                    <div className="mailpayment__image mailpayment__image__superior">
                        <Image layout="fill" src="/separador1.png" alt="separador superior" />
                    </div>
                    <div className="mailpayment__datosnegocio"> 
                        <p>{titles.profile.preferences.remote_payments.parameter.commerceName}</p>
                        <p>{titles.profile.preferences.remote_payments.parameter.commerceAddress}</p>
                        <p>usuario@dominio.com</p>
                        <p>55 0000 0000</p>
                    </div>
                    <div className="mailpayment__greetings">
                        <h2><b>{titleLineOne || `${titles.profile.preferences.remote_payments.parameter.greetings}`}</b></h2>
                        <h2>{titleLineTwo || `${titles.profile.preferences.remote_payments.parameter.details}`}</h2>
                    </div>
                    <div className="mailpayment__detail">
                        <div className="mailpayment__detail__titles">
                            <p>{titles.profile.preferences.remote_payments.parameter.date}</p>
                            <p>{titles.profile.preferences.remote_payments.parameter.sale_concept}</p>
                            <p>{titles.profile.preferences.remote_payments.parameter.reference_number}</p>
                            <p>{titles.profile.preferences.remote_payments.parameter.transaction_amount}</p>
                            <p>{titles.profile.preferences.remote_payments.parameter.link_available}</p>
                        </div>
                        <div className="mailpayment__detail__line"></div>
                        <div className="mailpayment__detail__text">
                            <p>2021-05-27 12:08:39</p>
                            <p>Pruebas ABP</p>
                            <p>423685</p>
                            <p>$50.00 MXN</p>
                            <p>2021-05-27 | 17:23:15</p>        
                        </div>
                    </div>
                    <span className="mailpayment__dopayment">
                        {titles.profile.preferences.remote_payments.parameter.do_payment}
                    </span>
                    <div className="mailpayment__datosnegocio"> 
                        <p className="mailpayment__endBody">{endBody || `${titles.profile.preferences.remote_payments.parameter.question}`}</p>
                        <p>{footerLineOne || `${titles.profile.preferences.remote_payments.parameter.attention}`}</p>
                        <p className="mailpayment__contact"><SvgWrapper id={svgs.phone} className="svg svg--text"/> {contactPhone || "800 3476 278"}</p>
                        <p className="mailpayment__contact"><SvgWrapper id={svgs.mail} className="svg svg--text"/> {contactEmail || "contactcenter@spaymentservices.com"}</p>
                        {/* <p>contactcenter@spaymentservices.com</p> */}
                    </div>
                    <div className="mailpayment__image mailpayment__image__inferior">
                        <Image layout="fill" src="/separador1-2.png" alt={titles.profile.preferences.remote_payments.parameter.top_separator} />
                    </div>
                    <div className="mailpayment__disclaimer">
                        <p>{disclaimer || `${titles.profile.preferences.remote_payments.parameter.disclaimer_default}`}</p>
                    </div>
                    <div className="mailpayment__footer">
                        <div className="mailpayment__footer__image">
                            <Image src={PoweredBy} alt={titles.profile.preferences.remote_payments.parameter.smart_logo} />
                        </div>
                    </div>
                   
                </div>                
            </div>
            <div className="mailpayment__buttons">
                <button className="btn btn--cancel mailpayment__buttons__cancel" type="button" onClick={()=>reset()}>
                    {titles.profile.preferences.remote_payments.parameter.cancel}
                </button>
                <button className="btn btn--secondary mailpayment__buttons__save" type="submit" onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>)=>handleSubmit(e)}>
                    {titles.profile.preferences.remote_payments.parameter.save}
                </button>
            </div>
        </div>
    )
}
