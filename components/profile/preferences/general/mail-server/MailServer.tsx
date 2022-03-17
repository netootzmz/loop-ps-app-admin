import React, { FC, KeyboardEvent } from 'react';
import Input from '../../../../forms/Input';
import Select from '../../../../forms/Select';
import { useSelector } from 'react-redux';
import { iGlobalState, iUiState } from '../../../../../@types/store/states';
import useLang from '../../../../../hooks/useLang';

export const MailServer: FC<{hostname: string, port: string, emailAddress: string, securityProtocol: string, authMethod: string, userEmail: string, password: string, reset: Function, errors: any, handleInputChange: Function, handleSubmit: any}> = ({hostname, port, securityProtocol, authMethod, userEmail, password, reset, errors, handleInputChange, handleSubmit}) => {
    const { lang } = useSelector<iGlobalState, iUiState>(({ ui }) => ui);
    const { titles } = useLang(lang);

    const protocolOptions = [
        {value: "0", text: `${titles.profile.preferences.general.parameters.protocol}`},
        {value: "1", text: "STARTTLS"}
    ];

    const authOptions = [        
        {value: "1", text: "Login"}
    ];


    const onlyNumbers = (e: KeyboardEvent<HTMLDivElement>) => {
        const pressedKey = e.keyCode || e.which || e.charCode;
        if ((pressedKey <= 36 || pressedKey >= 40) && !/^[0-9\b]+$/.test(e.key) && pressedKey !== 8) e.preventDefault();
    };

    return (
        <div className="mailserver">
            <h2 className="h2 payments__title">{titles.profile.preferences.general.parameters.configuration}</h2>
            <form className="card card--full card--inner-padding mailserver" onSubmit={handleSubmit}>
                <div className="mailserver__row">
                    <h4 className="h4"><b>{titles.profile.preferences.general.parameters.mail_server}</b></h4>
                    <div className="mailserver__row_input">
                        <Input              
                            error={errors.hostname}
                            full
                            maxLength={32}
                            name="hostname"                            
                            onChange={handleInputChange()}
                            placeholder="Hostname"
                            value={hostname}
                        />
                    </div>
                </div>
                <div className="mailserver__row">
                    <h4 className="h4"><b>{titles.profile.preferences.general.parameters.port}</b></h4>
                    <div className="mailserver__row_input">
                        <Input
                            error={errors.port}
                            full                        
                            maxLength={5}
                            name="port"
                            onChange={handleInputChange()}
                            onKeyDown={onlyNumbers}
                            placeholder={titles.profile.preferences.general.parameters.port}
                            type="text"                            
                            value={port}
                        />
                    </div>
                </div>
                {/* <div className="mailserver__row">
                    <h4 className="h4"><b>Dirección de correo</b></h4>
                    <div className="mailserver__row_input">
                        <Input
                            full
                            name="emailAddress"
                            onChange={handleInputChange()}
                            placeholder="email"
                            type="text"
                            value={emailAddress}
                        />
                    </div>
                </div> */}
                <div className="mailserver__row">
                    <div className="mailserver__selectors">
                        <div className="mailserver__selectors_input">
                            <h4 className="h4"><b>{titles.profile.preferences.general.parameters.security}</b></h4>
                            <div className="mailserver__selectors_input_container">
                                <Select
                                    error={errors.securityProtocol}
                                    inline
                                    label={titles.profile.preferences.general.parameters.security_protocol}
                                    name="securityProtocol"
                                    onChange={handleInputChange()}
                                    options={protocolOptions}
                                    placeholder={titles.profile.preferences.general.parameters.security_protocol}  
                                    value={securityProtocol || ""}
                                />
                            </div>
                        </div>
                        <div className="mailserver__selectors_input">
                            <h4 className="h4"><b>{titles.profile.preferences.general.parameters.authentication}</b></h4>
                            <div className="mailserver__selectors_input_container">
                                <Select
                                    error={errors.authMethod}
                                    inline
                                    label={titles.profile.preferences.general.parameters.security_protocol}
                                    name="authMethod"
                                    onChange={handleInputChange()}
                                    options={authOptions}
                                    placeholder={titles.profile.preferences.general.parameters.security_protocol}                                
                                    value={authMethod}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mailserver__row">
                    <h4 className="h4"><b>{titles.profile.preferences.general.parameters.user}</b></h4>
                    <div className="mailserver__row_input">
                        <Input
                            error={errors.userEmail}
                            full
                            name="userEmail"
                            maxLength={255}
                            onChange={handleInputChange()}
                            placeholder="email"
                            type="text"
                            value={userEmail}
                        />
                    </div>
                </div>
                <div className="mailserver__row">
                    <h4 className="h4"><b>{titles.profile.preferences.general.parameters.password}</b></h4>
                    <div className="mailserver__row_input">
                        <Input
                            error={errors.password}
                            full
                            name="password"
                            maxLength={100}
                            onChange={handleInputChange()}
                            placeholder={titles.profile.preferences.general.parameters.password}
                            type="password"
                            value={password}
                        />
                    </div>
                </div>
                <div className="mailserver__buttons">
                    <button 
                        className="btn btn--cancel"
                        type="button" 
                        onClick={()=>reset()}
                    >
                        {titles.profile.preferences.general.parameters.cancel}
                    </button>
                    <button 
                        className="btn btn--mailServer"                        
                        type="submit"
                    >
                        {titles.profile.preferences.general.parameters.save}
                    </button>
                </div>
            </form>
        </div>
    )
}
