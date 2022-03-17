import React, {FC, MouseEvent} from "react";
import Select from "../../forms/Select";
import CustomDatePicker from "../../forms/CustomDatePicker";
import { useSelector } from 'react-redux';
import { iGlobalState, iUiState } from "../../../@types/store/states";
import useLang from "../../../hooks/useLang";

const CollapsedFilters: FC<{
    reset: Function;
    values: Partial<any & {}>;
    handleInputChange: Function;
}> = ({reset, values, handleInputChange}) => {
    const { lang } = useSelector<iGlobalState, iUiState>(({ ui }) => ui);
    const { titles } = useLang(lang);
    const handleReset = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        reset();
    };
    const paymentStatusOptions = [
        {value: 0, text: `${titles.adjustment.parameters.status}`},
        {value: 1, text: `${titles.adjustment.parameters.not_pay}`},
        {value: 2, text: `${titles.adjustment.parameters.pay}`},
    ];

    const linkStatusOptions = [
        {value: 0, text: `${titles.adjustment.parameters.status}`},
        {value: 1, text: `${titles.adjustment.parameters.active}`},
        {value: 2, text: `${titles.adjustment.parameters.canceled}`},
        {value: 3, text: `${titles.adjustment.parameters.expired}`},
    ];
    return (
        <>
            <h4 className="filters__sub filters__sub--full">{titles.adjustment.parameters.date_range}</h4>
            <div className="filters__transactions--block-tmp">
                <CustomDatePicker
                    id="datesRange"
                    fn={reset}
                    vals={values}
                    nameStart="createdAt"
                    nameEnd="createdAt2"
                />
                <div className="filters__transactions--collapsed">
                    <Select
                        name="paymentStatus"
                        placeholder={titles.adjustment.parameters.payment_status}
                        options={paymentStatusOptions}
                        label={titles.adjustment.parameters.payment_status}
                        inline
                        onChange={handleInputChange((val: string) => parseInt(val))}
                        value={values.paymentStatus || ""}
                    />
                    <Select
                        name="linkStatus"
                        placeholder={titles.adjustment.parameters.link_status}
                        options={linkStatusOptions}
                        label={titles.adjustment.parameters.link_status}
                        inline
                        onChange={handleInputChange((val: string) => parseInt(val))}
                        value={values.linkStatus || ""}
                    />
                    <button
                        type="button"
                        className="btn btn--default"
                        onClick={handleReset}
                        style={{
                            alignSelf: "center",
                            marginBottom: "1rem",
                            marginLeft: "3rem",
                        }}
                    >
                        {titles.adjustment.parameters.clean}
                    </button>
                </div>
            </div>

        </>
    );
};

export default CollapsedFilters;
