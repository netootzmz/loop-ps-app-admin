import React, {FC} from "react";
import moment from "moment";
import validator from "validator";
import { useDispatch, useSelector } from 'react-redux';
import {gettingStatusLinkTableData} from "../../../store/actions/paymentAction";
import { iGlobalState, iUiState } from "../../../@types/store/states";
import useLang from '../../../hooks/useLang';

const DatefilterStatus: FC<{
    fn: Function;
    vals: Partial<any & {}>;
    nameStart: string;
    nameEnd: string;
}> = ({fn: reset, vals, nameStart, nameEnd}) => {
    const { lang } = useSelector<iGlobalState, iUiState>(({ ui }) => ui);
    const dispatch = useDispatch();
    const handleCheck = (start: string, end: string) => {
        dispatch(gettingStatusLinkTableData({createdAt: start, createdAt2: end}));
        reset({...vals, [nameStart]: start, [nameEnd]: end});
    };

    const { titles } = useLang(lang);


    const isChecked = (start: string, end: string) =>
        validator.equals(start, vals[nameStart]) &&
        validator.equals(end, vals[nameEnd]);

    return (
        <div className="datefilter">
            <div className="datefilter__container">
                <input
                    type="checkbox"
                    id="today"
                    className="datefilter__check"
                    onChange={() =>
                        handleCheck(
                            moment().format("YYYY-MM-DD"),
                            moment().format("YYYY-MM-DD")
                        )
                    }
                    checked={isChecked(
                        moment().format("YYYY-MM-DD"),
                        moment().format("YYYY-MM-DD"),
                    )}
                />
                <label htmlFor="today" className="datefilter__label">
                    <span>{titles.adjustment.parameters.today}</span>
                </label>
            </div>
            <div className="datefilter__container">
                <input
                    type="checkbox"
                    id="yesterday"
                    className="datefilter__check"
                    onChange={() =>
                        handleCheck(
                            moment().subtract(1, "day").format("YYYY-MM-DD"),
                            moment().subtract(1, "day").format("YYYY-MM-DD")
                        )
                    }
                    checked={isChecked(
                        moment().subtract(1, "day").format("YYYY-MM-DD"),
                        moment().subtract(1, "day").format("YYYY-MM-DD")
                    )}
                />
                <label htmlFor="yesterday" className="datefilter__label">
                    <span>{titles.adjustment.parameters.yesterday}</span>
                </label>
            </div>
            <div className="datefilter__container">
                <input
                    type="checkbox"
                    id="week"
                    className="datefilter__check"
                    onChange={() =>
                        handleCheck(
                            moment().startOf("week").format("YYYY-MM-DD"),
                            moment().endOf("week").format("YYYY-MM-DD")
                        )
                    }
                    checked={isChecked(
                        moment().startOf("week").format("YYYY-MM-DD"),
                        moment().endOf("week").format("YYYY-MM-DD")
                    )}
                />
                <label htmlFor="week" className="datefilter__label">
                    <span>{titles.adjustment.parameters.current_week}</span>
                </label>
            </div>
            <div className="datefilter__container">
                <input
                    type="checkbox"
                    id="month"
                    className="datefilter__check"
                    onChange={() =>
                        handleCheck(
                            moment().startOf("month").format("YYYY-MM-DD"),
                            moment().endOf("month").format("YYYY-MM-DD")
                        )
                    }
                    checked={isChecked(
                        moment().startOf("month").format("YYYY-MM-DD"),
                        moment().endOf("month").format("YYYY-MM-DD")
                    )}
                />
                <label htmlFor="month" className="datefilter__label">
                    <span>{titles.adjustment.parameters.current_month}</span>
                </label>
            </div>
            <div className="datefilter__container">
                <input
                    type="checkbox"
                    id="lastmonth"
                    className="datefilter__check"
                    onChange={() =>
                        handleCheck(
                            moment()
                                .subtract(1, "month")
                                .startOf("month")
                                .format("YYYY-MM-DD"),
                            moment().subtract(1, "month").endOf("month").format("YYYY-MM-DD")
                        )
                    }
                    checked={isChecked(
                        moment().subtract(1, "month").startOf("month").format("YYYY-MM-DD"),
                        moment().subtract(1, "month").endOf("month").format("YYYY-MM-DD")
                    )}
                />
                <label htmlFor="lastmonth" className="datefilter__label">
                    <span>{titles.adjustment.parameters.last_month}</span>
                </label>
            </div>
        </div>
    );
};

export default DatefilterStatus;
