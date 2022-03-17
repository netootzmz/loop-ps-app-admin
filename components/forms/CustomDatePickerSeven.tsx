import React, { FC } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import es from "date-fns/locale/es";

const CustomDatePickerSeven: FC<{
  fn: Function;
  vals: Partial<{} & any>;
  nameStart: string;
  nameEnd: string;
  id: string;
}> = ({ vals, nameEnd, nameStart, fn: reset, id }) => {
  registerLocale("es", es);

  const onChange = (dates: [Date, Date]) => {
    const [start, end] = dates;
    if (!vals[nameStart] && !vals[nameEnd]) {
      reset({
        ...vals,
        [nameStart]: moment(start).format("YYYY-MM-DD"),
      });
    }
    if (vals[nameStart] && !vals[nameEnd]) {
      if (moment(end).format("DD") !== "Invalid date") {
        reset({
          ...vals,
          [nameEnd]: moment(end).format("YYYY-MM-DD"),
        });
      }
    }
    if (vals[nameStart] && vals[nameEnd]) {
      reset({
        ...vals,
        [nameStart]: moment(start).format("YYYY-MM-DD"),
        [nameEnd]: undefined,
      });
    }
  };

  return (
    <div className="datepicker">
      <label htmlFor={id} className="datepicker__label">
        <p className="datepicker__date">
          <span>
            {vals[nameStart] ? (
              <>
                {moment(vals[nameStart]).format("DD")}&#8209;
                {moment(vals[nameStart]).format("MM")}&#8209;
                {moment(vals[nameStart]).format("YYYY")}
              </>
            ) : (
              <>YYYY&#8209;MM&#8209;DD</>
            )}
          </span>
        </p>
        <p className="datepicker__arr">⟶</p>
        <p className="datepicker__date">
          <span>
            {vals[nameEnd] ? (
              <>
                {moment(vals[nameEnd]).format("DD")}&#8209;
                {moment(vals[nameEnd]).format("MM")}&#8209;
                {moment(vals[nameEnd]).format("YYYY")}
              </>
            ) : (
              <>YYYY&#8209;MM&#8209;DD</>
            )}
          </span>
        </p>
      </label>
      <DatePicker
        onChange={onChange}
        startDate={
          vals[nameStart]
            ? new Date(moment(vals[nameStart]).toISOString())
            : undefined
        }
        id={id}
        endDate={
          vals[nameEnd]
            ? new Date(moment(vals[nameEnd]).toISOString())
            : undefined
        }
        monthsShown={2}
        selectsRange
        closeOnScroll
        fixedHeight
        maxDate={new Date(moment().toISOString())}
        // minDate={new Date(moment().subtract(7, "days").toISOString())}
        showPopperArrow={false}
        className="datepicker__input"
        calendarClassName="datepicker__calendar"
        locale={es}
      />
    </div>
  );
};

export default CustomDatePickerSeven;
