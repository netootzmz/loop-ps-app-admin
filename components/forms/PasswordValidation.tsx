import React, { FC, useCallback, useEffect, useState } from "react";
import validator from "validator";
import { consecutiveDigits } from "../../helpers/passwordValidation";
import { consecutiveChars } from "../../helpers/passwordValidation";
import { inverseConsecutiveDigits } from "../../helpers/passwordValidation";
import { inverseConsecutiveChars } from "../../helpers/passwordValidation";

const PasswordValidation: FC<{ password: string }> = ({ password }) => {
  const colors = [
    {
      pill_one: "",
      pill_two: "",
      pill_three: "",
      pill_four: "",
      pill_five: "",
      text: "",
      string: "",
    },
    {
      pill_one: "p-validation__pill--danger",
      pill_two: "",
      pill_three: "",
      pill_four: "",
      pill_five: "",
      text: "p-validation__text--danger",
      string: "Muy débil",
    },
    {
      pill_one: "p-validation__pill--danger",
      pill_two: "",
      pill_three: "",
      pill_four: "",
      pill_five: "",
      text: "p-validation__text--danger",
      string: "Muy débil",
    },
    {
      pill_one: "p-validation__pill--danger",
      pill_two: "p-validation__pill--danger",
      pill_three: "",
      pill_four: "",
      pill_five: "",
      text: "p-validation__text--danger",
      string: "Débil",
    },
    {
      pill_one: "p-validation__pill--danger",
      pill_two: "p-validation__pill--danger",
      pill_three: "",
      pill_four: "",
      pill_five: "",
      text: "p-validation__text--danger",
      string: "Débil",
    },
    {
      pill_one: "p-validation__pill--warning",
      pill_two: "p-validation__pill--warning",
      pill_three: "p-validation__pill--warning",
      pill_four: "",
      pill_five: "",
      text: "p-validation__text--warning",
      string: "Media",
    },
    {
      pill_one: "p-validation__pill--warning",
      pill_two: "p-validation__pill--warning",
      pill_three: "p-validation__pill--warning",
      pill_four: "",
      pill_five: "",
      text: "p-validation__text--warning",
      string: "Media",
    },
    {
      pill_one: "p-validation__pill--secondary",
      pill_two: "p-validation__pill--secondary",
      pill_three: "p-validation__pill--secondary",
      pill_four: "p-validation__pill--secondary",
      pill_five: "",
      text: "p-validation__text--secondary",
      string: "Buena",
    },
    {
      pill_one: "p-validation__pill--secondary",
      pill_two: "p-validation__pill--secondary",
      pill_three: "p-validation__pill--secondary",
      pill_four: "p-validation__pill--secondary",
      pill_five: "",
      text: "p-validation__text--secondary",
      string: "Buena",
    },
    {
      pill_one: "p-validation__pill--secondary",
      pill_two: "p-validation__pill--secondary",
      pill_three: "p-validation__pill--secondary",
      pill_four: "p-validation__pill--secondary",
      pill_five: "",
      text: "p-validation__text--secondary",
      string: "Buena",
    },
    {
      pill_one: "p-validation__pill--secondary",
      pill_two: "p-validation__pill--secondary",
      pill_three: "p-validation__pill--secondary",
      pill_four: "p-validation__pill--secondary",
      pill_five: "",
      text: "p-validation__text--secondary",
      string: "Buena",
    },
    {
      pill_one: "p-validation__pill--success",
      pill_two: "p-validation__pill--success",
      pill_three: "p-validation__pill--success",
      pill_four: "p-validation__pill--success",
      pill_five: "p-validation__pill--success",
      text: "p-validation__text--success",
      string: "Aceptable",
    },
  ];

  const [color, setColor] = useState(0);

  const validatePassword = useCallback((pass: string) => {
    if (validator.isEmpty(pass || "")) {
      setColor(0);
      return;
    }
    const minlength = validator.isLength(pass, { min: 8, max: 20 }) ? 1 : 0;
    const digit = /[0-9]/g.test(pass) ? 1 : 0;
    const lowercase = /[a-z]/g.test(pass) ? 1 : 0;
    const uppercase = /[A-Z]/g.test(pass) ? 1 : 0;
    const special = /[@#$%^&+=]/g.test(pass) ? 1 : 0;
    const nowhitespace = !/\s/g.test(pass) ? 1 : 0;
    const norepeat = !/([a-zA-Z0-9])\1{1,}/.test(pass) ? 1 : 0;
    const norepeatnumbers = !consecutiveDigits(pass) ? 1 : 0;
    const norepeatcharacters = !consecutiveChars(pass) ? 1 : 0;
    const noinverserepeatnumbers = !inverseConsecutiveDigits(pass) ? 1 : 0;
    const noinverserepeatcharacters = !inverseConsecutiveChars(pass) ? 1 : 0;
    const allValidations =
      digit +
      lowercase +
      uppercase +
      special +
      minlength +
      (minlength === 1
        ? nowhitespace +
          norepeatnumbers +
          norepeat +
          norepeatcharacters +
          noinverserepeatnumbers +
          noinverserepeatcharacters
        : 0);
    setColor(allValidations <= 11 ? allValidations : 11);
  }, []);

  useEffect(() => {
    validatePassword(password);
  }, [password, validatePassword]);

  return (
    <div className="p-validation">
      <div className={`p-validation__pill ${colors[color].pill_one}`}>
        &nbsp;
      </div>
      <div className={`p-validation__pill ${colors[color].pill_two}`}>
        &nbsp;
      </div>
      <div className={`p-validation__pill ${colors[color].pill_three}`}>
        &nbsp;
      </div>
      <div className={`p-validation__pill ${colors[color].pill_four}`}>
        &nbsp;
      </div>
      <div className={`p-validation__pill ${colors[color].pill_five}`}>
        &nbsp;
      </div>
      <div className={`p-validation__text ${colors[color].text}`}>
        <span>
          {validator.isEmpty(colors[color].string) ? (
            <>&nbsp;</>
          ) : (
            colors[color].string
          )}
        </span>
      </div>
    </div>
  );
};

export default PasswordValidation;
