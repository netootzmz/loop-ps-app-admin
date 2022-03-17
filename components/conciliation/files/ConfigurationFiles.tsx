import React, { FC, KeyboardEvent } from 'react'
import { useSelector } from 'react-redux';
import { iGlobalState, iUiState } from '../../../@types/store/states';
import useLang from '../../../hooks/useLang';
import Input from '../../forms/Input';
import Select from '../../forms/Select';

export const ConfigurationFiles: FC<{
    values: Partial<any & {}>;
    reset: Function;
    handleInputChange: Function;    
}> = ({
    values,
    reset,
    handleInputChange
}) => {

    const { lang } = useSelector<iGlobalState, iUiState>(({ ui }) => ui);
    const { titles } = useLang(lang);

    const onlyNumbers = (e: KeyboardEvent<HTMLDivElement>) => {
        const pressedKey = e.keyCode || e.which || e.charCode;
        if ((pressedKey <= 36 || pressedKey >= 40) && !/^[0-9\b]+$/.test(e.key) && pressedKey !== 8) e.preventDefault();
    };

    const acquirerOptions = [
        { value: "", text: `${titles.conciliation.parameters.regist_conf}` }
    ];

    return (
        <>
            <h3 className="filters__title">{`${titles.conciliation.parameters.regist_conf}`}</h3>
            <form className="card card--full card--short">
                <div className="conciliation__configuration">
                    <div className="conciliation">
                        <Input
                            maxLength={64}
                            name="layoutName"
                            onChange={handleInputChange()}
                            placeholder={`${titles.conciliation.parameters.layout_name}`}
                            type="text"
                            value={values.layoutName}
                        />
                    </div>
                    <div className="conciliation">
                        <Input
                            maxLength={64}
                            name="description"
                            onChange={handleInputChange()}
                            placeholder={`${titles.conciliation.parameters.layout_name}`}
                            type="text"
                            value={values.description}
                        />
                    </div>
                    <div className="conciliation">
                        <Input
                            maxLength={64}
                            name="transactionKey"
                            onChange={handleInputChange()}
                            placeholder={`${titles.conciliation.parameters.layout_name}`}
                            type="text"
                            value={values.transactionKey}
                        />
                    </div>
                    <div className="conciliation">
                        <Input
                            maxLength={64}
                            name="transactionTemplate"
                            onChange={handleInputChange()}
                            placeholder={`${titles.conciliation.parameters.transaction_template}`}
                            type="text"
                            value={values.transactionTemplate}
                        />
                    </div>
                    <div className="conciliation">
                        <Input
                            maxLength={64}
                            name="documentHeader"
                            onChange={handleInputChange()}
                            placeholder={`${titles.conciliation.parameters.transaction_template}`}
                            type="text"
                            value={values.documentHeader}
                        />
                    </div>
                    <div className="conciliation__inputs">
                        <div className="conciliation__half">
                            <Input
                                maxLength={4}
                                name="registNum"
                                onChange={handleInputChange()}
                                onKeyDown={onlyNumbers}
                                placeholder={`${titles.conciliation.parameters.regist_num}`}
                                type="text"
                                value={values.registNum}
                            />
                        </div>
                        <div className="conciliation__half">
                            <Input
                                maxLength={16}
                                name="registState"
                                onChange={handleInputChange()}
                                placeholder={`${titles.conciliation.parameters.regist_state}`}
                                type="text"
                                value={values.registState}
                            />
                        </div>
                    </div>
                    <div className="conciliation">
                        <Input
                            maxLength={64}
                            name="registSeparator"
                            onChange={handleInputChange()}
                            placeholder={`${titles.conciliation.parameters.regist_separator}`}
                            type="text"
                            value={values.registSeparator}
                        />
                    </div>
                    <div className="conciliation__acquirerSelector">
                        <Select
                            name="acquirer"
                            placeholder={`${titles.conciliation.parameters.acquirer}`}
                            label={`${titles.conciliation.parameters.acquirer}`}
                            onChange={handleInputChange()}
                            options={acquirerOptions}
                            value={values.acquirer}
                        />
                    </div>
                    <div className="conciliation__actions">
                        <button
                            type="button"
                            className="btn btn--cancel"
                            onClick={()=>reset()}
                        >
                            {`${titles.conciliation.parameters.clean_button}`}
                        </button>
                        <button
                            type="button"
                            className="btn btn--mailServer"                    
                        >
                            {`${titles.conciliation.parameters.save}`}
                        </button>
                    </div>
                </div>
            </form>
        </>
    )
}
