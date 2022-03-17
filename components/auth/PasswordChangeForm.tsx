import React, { FC, useEffect } from "react";
import { useSelector } from "react-redux";
import { iGlobalState, iUiState } from "../../@types/store/states";
import passwordValidation from "../../helpers/passwordValidation";
import svgs from "../../helpers/svgs";
import useForm from "../../hooks/useForm";
import useLang from "../../hooks/useLang";
import Input from "../forms/Input";
import { getPasswordValidationMessage } from "../../helpers/passwordValidation";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import Swal from "sweetalert2";
import customFetch from "../../helpers/customFetch";
import { iNewPasswordReq } from "../../@types/api/req";
import { iCustomResponse } from "../../@types/api/res";

const PasswordChangeForm: FC<{ email: string }> = ({ email }) => {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const { lang } = useSelector<iGlobalState, iUiState>(({ ui }) => ui);
  const {
    changePassword: { inputs, submit, swalbox },
    password_validation,
    titles: { loading },
  } = useLang(lang);

  const { values, handleInputChange, handleSubmit, errors, reset } = useForm<{
    currentPassword: string;
    password: string;
    confirm: string;
  }>({
    validations: {
      currentPassword: {
        required: {
          value: true,
          message: inputs.error,
        },
      },
      password: {
        custom: {
          isValid: (val) => passwordValidation(val),
          message: (val) =>
            getPasswordValidationMessage(val, password_validation),
        },
      },
      confirm: {
        required: {
          value: true,
          message: inputs.error,
        },
      },
    },
    onSubmit: async () => {
      if (executeRecaptcha) {
        const token = await executeRecaptcha("Passwordchange");
        if (token) {
          await updatePassword();
        }
      }
    },
  });

  const updatePassword = async () => {
    try {
      Swal.fire({
        title: loading,
        backdrop: `
      rgba(0,0,123,0.4)
      left top
      no-repeat
    `,
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
      await customFetch<iNewPasswordReq, iCustomResponse<null>>(
        "account/password",
        false,
        "PUT",
        {
          email,
          password: values.currentPassword.trim(),
          newPassword: values.password.trim(),
          newPasswordConfirm: values.confirm.trim(),
        }
      );

      const confirm = await Swal.fire({
        title: swalbox.title,
        text: swalbox.text,
        icon: "success",

        confirmButtonColor: "#f2711c",
        confirmButtonText: swalbox.button,
        allowEscapeKey: false,
        allowOutsideClick: false,
      });

      if (confirm.isConfirmed) reset();
    } catch {
      Swal.fire("Error", swalbox.error, "error");
    }
  };

  const onPreventDefault = (event: React.ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();
  };

  useEffect(() => {
    return () => {
      reset();
    };
  }, [reset]);

  return (
    <>
      <form className="form" onSubmit={handleSubmit}>
        <Input
          type="password"
          svgId={svgs.lock}
          placeholder={inputs.currentpass}
          name="currentPassword"
          onChange={handleInputChange()}
          onPaste={onPreventDefault}
          value={values.currentPassword || ""}
          error={errors.currentPassword}
        />
        <Input
          type="password"
          svgId={svgs.lock}
          placeholder={inputs.password}
          name="password"
          onChange={handleInputChange()}
          onPaste={onPreventDefault}
          value={values.password || ""}
          error={errors.password}
          passwordValidation
          maxLength={20}
          minLength={8}
        />
        <Input
          name="confirm"
          type="password"
          svgId={svgs.lock}
          placeholder={inputs.confirm}
          onChange={handleInputChange()}
          onPaste={onPreventDefault}
          value={values.confirm || ""}
          error={errors.confirm}
          maxLength={20}
          minLength={8}
        />
        <button type="submit" className="btn btn--secondary">
          {submit}
        </button>
      </form>
    </>
  );
};

export default PasswordChangeForm;
