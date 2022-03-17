import React, { FC } from 'react';
import Input from '../../../forms/Input';
import { useSelector } from 'react-redux';
import { iGlobalState, iUiState } from '../../../../@types/store/states';
import useLang from '../../../../hooks/useLang';


export const TicketForm: FC<{
    headerText: string,
    titleLineOne: string,
    titleLineTwo: string,
    endBody: string
    errors: any,
    handleInputChange: Function
}> = ({
    headerText,
    titleLineOne,
    titleLineTwo,
    endBody,
    errors,
    handleInputChange
}) => {
    const { lang } = useSelector<iGlobalState, iUiState>(({ ui }) => ui);
    const { titles } = useLang(lang);
    return (
        <div>
            <h2 className="h2 payments__title">{titles.profile.preferences.remote_payments.parameter.personalize_texts}</h2>
            <form className="card card--big mailpayment">
                <div className="mailpayment__row">
                    <Input
                        error={errors.headerText}
                        full
                        name="headerText"
                        maxLength={32}
                        onChange={handleInputChange()}
                        placeholder={titles.profile.preferences.remote_payments.parameter.header_text}
                        type="text"
                        value={headerText}
                    />
                </div>
                <h4 className="h4 mailpayment__title"><b>{titles.profile.preferences.remote_payments.parameter.title}</b></h4>
                <div className="mailpayment__row">
                    <Input
                        error={errors.titleLineOne}
                        full
                        name="titleLineOne"
                        maxLength={32}
                        onChange={handleInputChange()}
                        placeholder={titles.profile.preferences.remote_payments.parameter.line_one}
                        type="text"
                        value={titleLineOne}
                    />
                </div>
                <div className="mailpayment__row">
                    <Input
                        full
                        name="titleLineTwo"
                        maxLength={32}
                        onChange={handleInputChange()}
                        placeholder={titles.profile.preferences.remote_payments.parameter.line_two}
                        type="text"
                        value={titleLineTwo}
                    />
                </div>
                <h4 className="h4  mailpayment__title"><b>{titles.profile.preferences.remote_payments.parameter.end_body}</b></h4>
                <div className="mailpayment__row">
                    <Input
                        full
                        name="endBody"
                        maxLength={250}
                        onChange={handleInputChange()}
                        placeholder={titles.profile.preferences.remote_payments.parameter.message}
                        type="text"
                        value={endBody}
                    />
                </div>
            </form>
        </div>
    )
}
