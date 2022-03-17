import React, { FC } from 'react';
import Image from 'next/image';
import SmartLogo from "./../../../../public/logo-smart.png";
import PoweredBy from "./../../../../public/powered_by_smart_white.png";
import { useSelector } from 'react-redux';
import { iGlobalState, iUiState } from '../../../../@types/store/states';
import useLang from '../../../../hooks/useLang';

export const TicketPreview: FC<{
    headerText: string,
    titleLineOne: string,
    titleLineTwo: string,
    endBody: string,
    reset: Function,
    handleSubmit: Function
}> = ({
    headerText,
    titleLineOne,
    titleLineTwo,
    endBody,
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
                    <div className="mailpayment__header mailpayment__header__head">
                        <h4 className="h4 mailpayment__title mailpayment__title__head">{headerText || `${titles.profile.preferences.remote_payments.parameter.remote_payments}`}</h4>
                    </div>
                    <div className="mailpayment__headText">
                        <h4 className="h4 mailpayment__title__principal mailpayment__title mailpayment__header_text">{titleLineOne || `${titles.profile.preferences.remote_payments.parameter.greetings}`}</h4>
                        <p className="mailpayment__title__lineOne">{titleLineTwo || `${titles.profile.preferences.remote_payments.parameter.ticket}`}</p>
                    </div>
                    <div className="card card--ticket mailpayment__container">
                        <div className="mailpayment__logoTicket">
                            <Image src={SmartLogo} alt={titles.profile.preferences.remote_payments.parameter.smart_logo}/>
                        </div>
                        <div className="mailpayment__image mailpayment__image__superior">
                            <Image layout="fill" src="/separador1.png" alt={titles.profile.preferences.remote_payments.parameter.top_separator} />
                        </div>
                        <div className="mailpayment__bussiness">
                            <p><b>Cinemex Universidad</b></p>
                            <p>{titles.profile.preferences.remote_payments.parameter.thanks}</p>
                            <p className="mailpayment__bussiness__address">Insurgentes Sur 566 Loc. 501, Benito Juarez, CDMX </p>
                        </div>
                        <div className="mailpayment__ticket__resume">
                            <p><b>{titles.profile.preferences.remote_payments.parameter.sale}:</b> $50.00MXN</p>
                            <p><b>{titles.profile.preferences.remote_payments.parameter.tip}:</b> $5.00MXN</p>
                            <p className="mailpayment__ticket__resume__total"><b>{titles.profile.preferences.remote_payments.parameter.total}:</b> $55.00MXN</p>
                        </div>
                        <p className="mailpayment__ticket__head"><b>{titles.profile.preferences.remote_payments.parameter.approved}</b></p>
                        <div className="mailpayment__detail mailpayment__detail__space">
                            <div className="mailpayment__detail__charge">
                                <p>{titles.profile.preferences.remote_payments.parameter.authorization}</p>
                                <p>{titles.profile.preferences.remote_payments.parameter.affiliation_number}</p>
                                <p>{titles.profile.preferences.remote_payments.parameter.transaction_type}</p>
                                <p>{titles.profile.preferences.remote_payments.parameter.payment_date}</p>
                                <p>{titles.profile.preferences.remote_payments.parameter.reference_number}</p>
                                <p>{titles.profile.preferences.remote_payments.parameter.folio}</p>
                                <p>{titles.profile.preferences.remote_payments.parameter.card_number}</p>
                                <p>{titles.profile.preferences.remote_payments.parameter.transmitter}</p>
                                <p>{titles.profile.preferences.remote_payments.parameter.acquirer}</p>
                                <p>ECI</p>
                                <p>{titles.profile.preferences.remote_payments.parameter.card_type}</p>
                                <p>{titles.profile.preferences.remote_payments.parameter.product}</p>
                            </div>
                            <div className="mailpayment__detail__resume">
                                <p>236078</p>
                                <p>8494578</p>
                                <p>Venta</p>
                                <p>27-05-2021 12:29:08</p>
                                <p>000036506733</p>
                                <p>FOL_07374</p>
                                <p>**** **** **** 0719</p>
                                <p>Mastercard</p>
                                <p>Banorte</p>
                                <p>N/A</p>
                                <p>Crédito</p>
                                <p>Liga de pago</p>
                            </div>
                        </div>
                        <p className="mailpayment__smartLegend">{titles.profile.preferences.remote_payments.parameter.account_status}</p>
                        <div className="mailpayment__image mailpayment__image__inferior">
                            <Image layout="fill" src="/separador1-2.png" alt={titles.profile.preferences.remote_payments.parameter.top_separator} />
                        </div>
                        <p className="mailpayment__legalText">{titles.profile.preferences.remote_payments.parameter.single_payment}</p>
                    </div>
                    <p className="mailpayment__notRecognizecharge">{endBody || `${titles.profile.preferences.remote_payments.parameter.dont_recognize}`}</p>
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
