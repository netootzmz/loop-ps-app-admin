import React, { FC } from 'react';
import CustomDatePicker from '../../forms/CustomDatePicker';
import Select from '../../forms/Select';

export const AuthorizeFilters: FC<{
    values: Partial<any & {}>;
    reset: Function;
    handleInputChange: Function;
    getInfo: any;
    titles: Partial<any & {}>
}> = ({
    values,
    reset,
    handleInputChange,
    getInfo,  
    titles  
}) => {

    const approveOptions = [
        { value: "", text: `${titles.adjustment.parameters.approve_status}` }
    ];

    const applicationOptions = [
        { value: "", text: `${titles.adjustment.parameters.application_status}` }
    ];

    return (
        <>
            <form className="card card--full card--short">
                <div className="authorizeManual">
                    <div>
                        <span className="authorizeManual__dateText">{titles.conciliation.parameters.date_range}</span>
                        <CustomDatePicker
                            id="datesRange"
                            fn={reset}
                            vals={values}
                            nameStart="createdAt"
                            nameEnd="createdAt2"
                        />
                    </div>
                    <div className="authorizeManual__selector">
                        <Select
                            name="approve_status"
                            placeholder={`${titles.conciliation.parameters.approve_status}`}
                            options={approveOptions}
                            label={`${titles.conciliation.parameters.approve_status}`}
                            onChange={handleInputChange()}
                            value={values.approve_status}
                        />
                    </div>
                    <div className="authorizeManual__selector">
                        <Select
                            name="application_status"
                            placeholder={`${titles.conciliation.parameters.application_status}`}
                            options={applicationOptions}
                            label={`${titles.conciliation.parameters.application_status}`}
                            onChange={handleInputChange()}
                            value={values.application_status}
                        />
                    </div>
                    <div className="authorizeManual__buttons">
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
                            onClick={getInfo}
                        >
                            {`${titles.conciliation.parameters.search_button}`}
                        </button>
                    </div>
                </div>                
            </form>
        </>
    )
}
