import React, { FC, KeyboardEvent } from "react";
import Input from "../../../forms/Input";
import { useSelector } from "react-redux";
import { iGlobalState, iUiState } from "../../../../@types/store/states";
import useLang from "../../../../hooks/useLang";

export const MailPaymentForm: FC<{
  headerText: string;
  titleLineOne: string;
  titleLineTwo: string;
  endBody: string;
  footerLineOne: string;
  contactPhone: string;
  contactEmail: string;
  disclaimer: string;
  errors: any;
  handleInputChange: Function;
}> = ({
  headerText,
  titleLineOne,
  titleLineTwo,
  endBody,
  footerLineOne,
  contactPhone,
  contactEmail,
  disclaimer,
  errors,
  handleInputChange,
}) => {
  const { lang } = useSelector<iGlobalState, iUiState>(({ ui }) => ui);
  const { titles } = useLang(lang);
  const onlyNumbers = (e: KeyboardEvent<HTMLDivElement>) => {
    const pressedKey = e.keyCode || e.which || e.charCode;
    if (
      (pressedKey <= 36 || pressedKey >= 40) &&
      !/^[0-9\b]+$/.test(e.key) &&
      pressedKey !== 8
    )
      e.preventDefault();
  };
  return (
    <div>
      <h2 className="h2 payments__title">
        {titles.profile.preferences.remote_payments.parameter.personalize_texts}
      </h2>
      <form className="card card--big mailpayment">
        <div className="mailpayment__row">
          <Input
            error={errors.headerText}
            full
            name="headerText"
            maxLength={32}
            onChange={handleInputChange()}
            placeholder={
              titles.profile.preferences.remote_payments.parameter.header_text
            }
            type="text"
            value={headerText}
          />
        </div>
        <h4 className="h4 mailpayment__title">
          <b>{titles.profile.preferences.remote_payments.parameter.title}</b>
        </h4>
        <div className="mailpayment__row_title">
          <div className="mailpayment__row_half">
            <Input
              error={errors.titleLineOne}
              full
              name="titleLineOne"
              maxLength={32}
              onChange={handleInputChange()}
              placeholder={
                titles.profile.preferences.remote_payments.parameter.line_one
              }
              type="text"
              value={titleLineOne}
            />
          </div>
          <div className="mailpayment__row_half">
            <Input
              error={errors.titleLineTwo}
              full
              name="titleLineTwo"
              maxLength={32}
              onChange={handleInputChange()}
              placeholder={
                titles.profile.preferences.remote_payments.parameter.line_two
              }
              type="text"
              value={titleLineTwo}
            />
          </div>
        </div>
        <h4 className="h4  mailpayment__title">
          <b>{titles.profile.preferences.remote_payments.parameter.end_body}</b>
        </h4>
        <div className="mailpayment__row">
          <Input
            full
            name="endBody"
            maxLength={250}
            onChange={handleInputChange()}
            placeholder={
              titles.profile.preferences.remote_payments.parameter.message
            }
            type="text"
            value={endBody}
          />
        </div>
        <h4 className="h4  mailpayment__title">
          <b>{titles.profile.preferences.remote_payments.parameter.footer}</b>
        </h4>
        <div className="mailpayment__row">
          <Input
            full
            name="footerLineOne"
            maxLength={32}
            onChange={handleInputChange()}
            placeholder={
              titles.profile.preferences.remote_payments.parameter
                .footer_line_one
            }
            type="text"
            value={footerLineOne}
          />
        </div>
        <div className="mailpayment__row">
          <Input
            error={errors.contactPhone}
            full
            name="contactPhone"
            maxLength={32}
            onChange={handleInputChange()}
            onKeyDown={onlyNumbers}
            placeholder={
              titles.profile.preferences.remote_payments.parameter.telephone
            }
            type="text"
            value={contactPhone}
          />
        </div>
        <div className="mailpayment__row">
          <Input
            error={errors.contactEmail}
            full
            name="contactEmail"
            maxLength={50}
            onChange={handleInputChange()}
            placeholder={
              titles.profile.preferences.remote_payments.parameter.mail
            }
            type="text"
            value={contactEmail}
          />
        </div>
        <div className="mailpayment__row">
          <Input
            full
            name="disclaimer"
            maxLength={1000}
            onChange={handleInputChange()}
            placeholder={
              titles.profile.preferences.remote_payments.parameter.disclaimer
            }
            type="text"
            value={disclaimer}
          />
        </div>
      </form>
    </div>
  );
};
