import { useState, ChangeEvent } from "react";
import { FormEvent } from "react";
import validator from "validator";
import { useCallback } from "react";

interface Validation {
  required?: {
    value: boolean;
    message: string | ((value: string) => string);
  };
  pattern?: {
    value: string;
    message: string | ((value: string) => string);
  };
  custom?: {
    isValid: (value: string) => boolean;
    message: string | ((value: string) => string);
  };
  custom2?: {
    isValid: (value: string) => boolean;
    message: string | ((value: string) => string);
  };
}

type Validations<T extends {}> = Partial<Record<keyof T, Validation>>;

type ErrorRecord<T> = Record<keyof T, string>;

const useForm = <T extends Record<keyof T, any> = {}>(options?: {
  initialValues?: Partial<T>;
  validations?: Validations<T>;
  onSubmit?: () => void | Promise<void>;
}) => {
  const [values, setValues] = useState<T>((options?.initialValues || {}) as T);
  const [errors, setErrors] = useState<ErrorRecord<T>>({} as ErrorRecord<T>);
  const vals = JSON.stringify(options?.initialValues);

  const handleInputChange =
    <S extends unknown>(sanitizeFn?: (value: string) => S) =>
    ({
      target,
    }: ChangeEvent<
      HTMLInputElement & HTMLSelectElement & HTMLTextAreaElement
    >) => {
      const value = sanitizeFn ? sanitizeFn(target.value) : target.value;

      setValues({
        ...values,
        [target.name]: value,
      });
    };

  const reset = useCallback(
    (newValues?: Partial<T>) => {
      setErrors({} as ErrorRecord<T>);

      setValues((newValues ? newValues : vals ? JSON.parse(vals) : {}) as T);
    },
    [vals]
  );

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validations = options?.validations;
    if (validations) {
      let valid = true;
      const newErrors = {} as ErrorRecord<T>;
      for (const key in validations) {
        const value = values[key] as string | number | undefined;
        const validation = validations[key];
        const pattern = validation?.pattern;
        const custom = validation?.custom;
        const custom2 = validation?.custom2;
        if (
          validation?.required?.value &&
          validator.isEmpty(
            typeof value === "number" ? value.toString() : value || ""
          )
        ) {
          valid = false;
          newErrors[key] =
            typeof validation.required.message === "string"
              ? validation.required.message
              : validation.required.message(
                  typeof value === "number" ? value.toString() : value || ""
                );
        } else if (
          pattern?.value &&
          !RegExp(pattern.value).test(
            typeof value === "number" ? value.toString() : value || ""
          )
        ) {
          valid = false;
          newErrors[key] =
            typeof pattern.message === "string"
              ? pattern.message
              : pattern.message(
                  typeof value === "number" ? value.toString() : value || ""
                );
        } else if (
          custom?.isValid &&
          !custom.isValid(
            typeof value === "number" ? value.toString() : value || ""
          )
        ) {
          valid = false;
          newErrors[key] =
            typeof custom.message === "string"
              ? custom.message
              : custom.message(
                  typeof value === "number" ? value.toString() : value || ""
                );
        } else if (
          custom2?.isValid &&
          !custom2.isValid(
            typeof value === "number" ? value.toString() : value || ""
          )
        ) {
          valid = false;
          newErrors[key] =
            typeof custom2.message === "string"
              ? custom2.message
              : custom2.message(
                  typeof value === "number" ? value.toString() : value || ""
                );
        }
      }
      if (!valid) {
        setErrors(newErrors);
        return;
      }
    }

    setErrors({} as ErrorRecord<T>);

    if (options?.onSubmit) {
      await options.onSubmit();
    }
  };

  return {
    values,
    handleInputChange,
    handleSubmit,
    errors,
    reset,
  };
};

export default useForm;
