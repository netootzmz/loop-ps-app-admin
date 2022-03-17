import React, { FC, useEffect } from "react";
import svgs from "../../helpers/svgs";
import Input from "../forms/Input";
import useForm from "../../hooks/useForm";
import useLang from "../../hooks/useLang";
import { useDispatch, useSelector } from "react-redux";
import { iGlobalState, iUiState } from "../../@types/store/states";
import validator from "validator";
import { startLogin } from "../../store/actions/authActions";

import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

const LoginForm: FC = () => {
  const { lang } = useSelector<iGlobalState, iUiState>(({ ui }) => ui);
  const { executeRecaptcha } = useGoogleReCaptcha();

  const dispatch = useDispatch();

  const {
    login: {
      inputs: { email, password },
      submit,
    },
  } = useLang(lang);

  const { values, handleInputChange, reset, errors, handleSubmit } = useForm<{
    email: string;
    password: string;
  }>({
    validations: {
      email: {
        required: {
          value: true,
          message: email.error_empty,
        },
        custom: {
          isValid: (val) => validator.isEmail(val),
          message: email.error_not_email,
        },
      },
      password: {
        required: {
          value: true,
          message: password.error_empty,
        },
        custom: {
          isValid: (val) => validator.isLength(val, { min: 5 }),
          message: password.error_lenght,
        },
      },
    },
    onSubmit: async () => {
      if (executeRecaptcha) {
        const token = await executeRecaptcha("login");
        if (token) dispatch(startLogin(values, lang));
      }
    },
  });

  useEffect(() => {
    reset();
  }, [lang, reset]);

  return (
    <form className="form" onSubmit={handleSubmit}>
      <Input
        name="email"
        error={errors.email}
        placeholder={email.placeholder}
        type="email"
        svgId={svgs.person}
        value={values.email || ""}
        onChange={handleInputChange()}
      />
      <Input
        name="password"
        type="password"
        error={errors.password}
        placeholder={password.placeholder}
        svgId={svgs.lock}
        value={values.password || ""}
        onChange={handleInputChange()}
      />
      <button type="submit" className="btn btn--rounded">
        {submit}
      </button>
    </form>
  );
};

export default LoginForm;
