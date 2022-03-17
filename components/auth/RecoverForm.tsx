import React, { FC, useEffect } from "react";
import { useSelector } from "react-redux";
import { iGlobalState, iUiState } from "../../@types/store/states";
import svgs from "../../helpers/svgs";
import useForm from "../../hooks/useForm";
import useLang from "../../hooks/useLang";
import Input from "../forms/Input";
import passwordValidation from "../../helpers/passwordValidation";
import { getPasswordValidationMessage } from "../../helpers/passwordValidation";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import Swal from "sweetalert2";
import customFetch from "../../helpers/customFetch";
import { iRecoverPasswordReq } from "../../@types/api/req";
import { iCustomResponse } from "../../@types/api/res";
import { useRouter } from "next/router";
import Link from "next/link";

const RecoverForm: FC<{
  userName: string;
  codeVerification: string;
  name: string;
}> = ({ userName, codeVerification, name }) => {
  const { executeRecaptcha } = useGoogleReCaptcha();

  const router = useRouter();

  const { lang } = useSelector<iGlobalState, iUiState>(({ ui }) => ui);

  const {
    titles: { loading },
    recover: { inputs, submit, swalbox, link },
    password_validation,
    changePassword,
  } = useLang(lang);

  const { values, handleInputChange, handleSubmit, errors, reset } = useForm<{
    password: string;
    confirm: string;
  }>({
    validations: {
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
          message: inputs.confirm.error,
        },
      },
    },
    onSubmit: async () => {
      if (executeRecaptcha) {
        const capToken = await executeRecaptcha("recover");
        if (capToken) {
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
      await customFetch<iRecoverPasswordReq, iCustomResponse<null>>(
        "auth/recover",
        false,
        "PUT",
        {
          codeVerification,
          userName,
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

      if (confirm.isConfirmed) router.push("/auth/login");
    } catch (err) {
      if (["59", "71", "13"].includes((err as iCustomResponse).codeStatus)) {
        Swal.fire({
          title: "Error",
          text: (err as iCustomResponse).message,
          icon: "error",
          iconColor: "#cb1414",
          heightAuto: false,
        });
      } else Swal.fire("Error", swalbox.error, "error");
    }
  };

  const onPreventDefault = (event: React.ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();
  };

  useEffect(() => {
    reset();
  }, [lang, reset]);

  return (
    <>
      <h3 className="text--display">{name.replace("_", " ")}</h3>
      <form className="form" onSubmit={handleSubmit}>
        <div className="password__text">{changePassword.password_text}</div>
        <Input
          type="password"
          svgId={svgs.lock}
          placeholder={inputs.password.placeholder}
          name="password"
          onChange={handleInputChange()}
          onPaste={onPreventDefault}
          value={values.password || ""}
          error={errors.password}
          passwordValidation
          maxLength={20}
          minLength={6}
        />
        <Input
          name="confirm"
          type="password"
          svgId={svgs.lock}
          placeholder={inputs.confirm.placeholder}
          onChange={handleInputChange()}
          onPaste={onPreventDefault}
          value={values.confirm || ""}
          error={errors.confirm}
        />
        <button type="submit" className="btn btn--rounded">
          {submit}
        </button>
      </form>
      <Link href="/auth/login">
        <a className="link">{link}</a>
      </Link>
    </>
  );
};

export default RecoverForm;
