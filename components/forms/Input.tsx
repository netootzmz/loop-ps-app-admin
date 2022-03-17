import React, {
  DetailedHTMLProps,
  FC,
  InputHTMLAttributes,
  TextareaHTMLAttributes,
  MouseEvent,
  useEffect,
  useState,
} from "react";
import svgs from "../../helpers/svgs";
import SvgWrapper from "../SvgWrapper";
import PasswordValidation from "./PasswordValidation";
import { useRef } from "react";
import Swal from "sweetalert2";

const Input: FC<
  DetailedHTMLProps<
    | InputHTMLAttributes<HTMLInputElement>
    | TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLInputElement | HTMLTextAreaElement
  > & {
    helpText?: string;
    error?: string;
    svgId?: string;
    containerClassName?: string;
    passwordValidation?: boolean;
    inline?: boolean;
    full?: boolean;
    textarea?: boolean;
    copyToClip?: boolean;
    search?: boolean;
    submitFn?: (e: MouseEvent<HTMLButtonElement>) => void;
    helpColor?: string;
  }
> = ({
  error,
  helpText,
  svgId,
  containerClassName,
  passwordValidation = false,
  inline = false,
  full = false,
  textarea = false,
  copyToClip = false,
  search = false,
  submitFn = () => {},
  helpColor = '#f2711c',
  ...props
}) => {
  const valid = !!!error;
  const [countClass, setCountClass] = useState("input__count");

  const [show, setShow] = useState(false);
  const [type, setType] = useState(
    (
      props as DetailedHTMLProps<
        InputHTMLAttributes<HTMLInputElement>,
        HTMLInputElement
      >
    ).type || ""
  );

  const handleShow = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();
    setShow(true);
    setType("text");
  };
  const handleUnshow = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();
    setShow(false);
    setType(
      (
        props as DetailedHTMLProps<
          InputHTMLAttributes<HTMLInputElement>,
          HTMLInputElement
        >
      ).type || ""
    );
  };

  const input = useRef<HTMLInputElement>(null);

  const copyToClipboard = async (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();
    try {
      if (!navigator.clipboard) {
        input.current?.select();
        input.current?.setSelectionRange(0, 99999);
        const succ = document.execCommand("copy");
        if (succ) {
          Swal.fire({
            timer: 2000,
            text: "Copied!",
            toast: true,

            icon: "success",
            width: "15rem",
            position: "top-right",
            showConfirmButton: false,
            timerProgressBar: true,
          });
          return;
        }
        Swal.fire({
          timer: 2000,
          text: "Error, link not coppied!",
          toast: true,
          iconColor: "#cb1414",
          icon: "error",
          width: "15rem",
          position: "top-right",
          showConfirmButton: false,
          timerProgressBar: true,
        });
        return;
      }
      const link = input.current?.value;
      await navigator.clipboard.writeText(link || "");

      Swal.fire({
        timer: 2000,
        text: "Copied!",
        toast: true,

        icon: "success",
        width: "15rem",
        position: "top-right",
        showConfirmButton: false,
      });
      return;
    } catch {
      Swal.fire({
        timer: 2000,
        text: "Error, link not coppied!",
        toast: true,
        iconColor: "#cb1414",
        icon: "error",
        width: "15rem",
        position: "top-right",
        showConfirmButton: false,
        timerProgressBar: true,
      });
      return;
    }
  };

  useEffect(() => {
    if (
      props.maxLength &&
      props.maxLength > 1 &&
      props.value &&
      props.value.toString().length >= props.maxLength - 1
    ) {
      setCountClass("input__count text--error");
      return;
    }
    setCountClass("input__count");
  }, [props.value, props.maxLength]);

  return (
    <div
      className={`input__group ${containerClassName || ""} ${
        inline ? "input__group--inline" : ""
      } ${full ? "input__group--full" : ""} ${
        search ? "input__group--search" : ""
      }`}
    >
      <div
        className={`input__container ${
          !valid ? "input__container--invalid" : ""
        } ${props.disabled ? "input__container--disabled" : ""} ${
          copyToClip ? "input__container--copy" : ""
        } ${search ? "input__container--search" : ""}`}
      >
        {svgId && (
          <SvgWrapper
            id={svgId}
            className={`svg input__svg ${!valid ? "text--error" : ""} ${
              props.disabled ? "input__svg--disabled" : ""
            }`}
          />
        )}
        <div className="input__wrapper">
          {textarea ? (
            <textarea
              {...(props as DetailedHTMLProps<
                TextareaHTMLAttributes<HTMLTextAreaElement>,
                HTMLTextAreaElement
              >)}
              autoComplete="nope"
              className="input input--textarea"
              rows={4}
            ></textarea>
          ) : (
            <input
              {...(props as DetailedHTMLProps<
                InputHTMLAttributes<HTMLInputElement>,
                HTMLInputElement
              >)}
              ref={input}
              type={type}
              autoComplete="nope"
              className="input"
            />
          )}
          {!search && (
            <label
              htmlFor={props.name}
              style={{color: helpColor}}
              className={`input__label ${!valid ? "text--error" : ""} ${
                props.disabled ? "input__label--disabled" : ""
              }`}
            >
              {props.placeholder}
            </label>
          )}
        </div>
        {(
          props as DetailedHTMLProps<
            InputHTMLAttributes<HTMLInputElement>,
            HTMLInputElement
          >
        ).type === "password" ? (
          <button
            type="button"
            className="btn btn--icon input__btn"
            onMouseDown={handleShow}
            onMouseUp={handleUnshow}
            onMouseLeave={handleUnshow}
          >
            <SvgWrapper
              id={show ? svgs.eye : svgs.eyeClosed}
              className="svg input__eye"
            />
          </button>
        ) : copyToClip ? (
          <button
            type="button"
            className="btn btn--icon input__btn"
            onClick={copyToClipboard}
          >
            <SvgWrapper id={svgs.copyToClip} className="svg input__copy" />
          </button>
        ) : (
          <></>
        )}
        {search && (
          <button
            type="submit"
            className="btn btn--icon input__btn input__btn--search"
            onClick={submitFn}
          >
            <SvgWrapper id={svgs.search} className="svg input__search" />
          </button>
        )}
        {!valid ? (
          <SvgWrapper id={svgs.danger} className="svg input__svg text--error" />
        ) : (
          <></>
        )}
      </div>
      {helpText ||
      (!valid && error) ||
      props.maxLength ||
      passwordValidation ? (
        <>
          <div className="input__text">
            {helpText && valid ? (
              <span className="input__help">{helpText}</span>
            ) : error && !valid ? (
              <span className="text--error">{error}</span>
            ) : (
              <></>
            )}
            {props.maxLength && (
              <span className={countClass}>{`${
                (props.value as string)?.length || 0
              }/${props.maxLength}`}</span>
            )}
          </div>
          {passwordValidation && (
            <PasswordValidation password={(props.value as string) || ""} />
          )}
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Input;
