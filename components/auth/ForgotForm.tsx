import React, { FC } from "react";
import Input from "../../components/forms/Input";
import svgs from "../../helpers/svgs";
import Link from "next/link";
import useForm from "../../hooks/useForm";
import validator from "validator";
import Swal from "sweetalert2";
import customFetch from "../../helpers/customFetch";
import { useRouter } from "next/router";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

const ForgotForm: FC<{
  texts: {
    input: {
      error_empty: string;
      error_not_email: string;
      placeholder: string;
    };
    submit: string;
    link: string;
    swalbox: {
      title: string;
      text: string;
      text_1: string;
      button: string;
      error: string;
    };
  };
}> = ({ texts: { input, submit, link, swalbox } }) => {
  const router = useRouter();
  const { executeRecaptcha } = useGoogleReCaptcha();

  const { values, handleInputChange, handleSubmit, errors, reset } = useForm<{
    email: string;
  }>({
    validations: {
      email: {
        required: {
          value: true,
          message: input.error_empty,
        },
        custom: {
          isValid: (val) => validator.isEmail(val),
          message: input.error_not_email,
        },
      },
    },
    onSubmit: async () => {
      if (executeRecaptcha) {
        const capToken = await executeRecaptcha("forgot");
        if (capToken) {
          await requestPassword();
        }
      }
    },
  });

  const requestPassword = async () => {
    try {
      Swal.fire({
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
      await customFetch("auth/request", false, "POST", {
        email: values.email,
      });

      const res = await Swal.fire({
        icon: "success",
        text: swalbox.text_1 + values.email + swalbox.text,
        title: swalbox.title,
        confirmButtonText: swalbox.button,
        confirmButtonColor: "#f2711c",

        allowEscapeKey: false,
        allowOutsideClick: false,
      });
      if (res.isConfirmed) {
        router.push("/auth/login");
        reset();
      }
    } catch (error) {
      Swal.fire("Error", swalbox.error, "error");
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <Input
        type="email"
        name="email"
        svgId={svgs.person}
        placeholder={input.placeholder}
        value={values.email || ""}
        onChange={handleInputChange()}
        error={errors.email}
      />
      <button type="submit" className="btn btn--rounded">
        {submit}
      </button>
      <Link href="/auth/login">
        <a className="link">{link}</a>
      </Link>
    </form>
  );
};

export default ForgotForm;
