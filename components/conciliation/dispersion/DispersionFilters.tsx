import React, { FC, KeyboardEvent } from 'react'
import CustomDatePicker from '../../forms/CustomDatePicker'
import Input from '../../forms/Input'

export const DispersionFilters: FC<{ 
    values: Partial<any & {}>;
    reset: Function;
    handleInputChange: Function;
    handleSubmit: any;
    handleDownload: any;
    titles: Partial<any & {}>
}> = ({
    reset,
    values,
    handleInputChange,
    handleSubmit,
    handleDownload,
    titles
}) => {
    const onlyNumbers = (e: KeyboardEvent<HTMLDivElement>) => {
        const pressedKey = e.keyCode || e.which || e.charCode;
        if ((pressedKey <= 36 || pressedKey >= 40) && !/^[0-9\b]+$/.test(e.key) && pressedKey !== 8) e.preventDefault();
    };
    return (
        <>
            <h3 className="filters__title">{`${titles.conciliation.parameters.dispersion_title}`}</h3>
            <form className="card card--full card--short">
                <div className="conciliation">
                    <div>
                        <span className="conciliation__dateText">{`${titles.conciliation.parameters.date_range}`}</span>
                        <CustomDatePicker
                            id="datesRange"
                            fn={reset}
                            vals={values}
                            nameStart="createdAt"
                            nameEnd="createdAt2"
                        />
                    </div>
                    <div className="conciliation__input">
                        <Input
                            maxLength={32}
                            name="merchantNumber"
                            onChange={handleInputChange()}
                            onKeyDown={onlyNumbers}
                            placeholder={`${titles.conciliation.parameters.dispersion_merchant}`}
                            type="text"                   
                            value={values.merchantNumber}     
                        />
                    </div>
                    <button
                        type="button"
                        className="btn btn--cancel"
                        onClick={()=>reset()}
                    >
                        {titles.conciliation.parameters.clean_button}
                    </button>
                    <button
                        type="button"
                        className="btn btn--mailServer"
                        onClick={handleSubmit}
                    >
                        {titles.conciliation.parameters.search_button}
                    </button>
                    <button
                        type="button"
                        className="btn btn--primary"
                        onClick={handleDownload}
                    >
                        {titles.conciliation.parameters.download_button}
                    </button>
                </div>
            </form>
        </>
    )
}
