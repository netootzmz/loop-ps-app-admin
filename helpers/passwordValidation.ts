import validator from "validator";

const passwordValidation = (pass: string) => {
  const minlength = validator.isLength(pass, { min: 8, max: 20 });
  const digit = /[0-9]/g.test(pass);
  const lowercase = /[a-z]/g.test(pass);
  const uppercase = /[A-Z]/g.test(pass);
  const special = /[!#$%&()*+,\-./:;<=>?@\]\[_`{|}\\\\~]/g.test(pass);
  const nowhitespace = !/\s/g.test(pass);
  const norepeat =
    !/([a-zA-Z0-9!#$%&()*+,\-./:;<=>?@\]\[_`{|}\\\\~])\1{1,}/.test(pass);
  const norepeatnumbers = !consecutiveDigits(pass);
  const norepetcharacters = !consecutiveChars(pass);
  const noinverserepeatnumbers = !inverseConsecutiveDigits(pass);
  const noinverserepeatcharacters = !inverseConsecutiveChars(pass);

  return (
    minlength &&
    digit &&
    lowercase &&
    uppercase &&
    special &&
    nowhitespace &&
    norepeat &&
    norepeatnumbers &&
    norepetcharacters &&
    noinverserepeatnumbers &&
    noinverserepeatcharacters
  );
};

export const getPasswordValidationMessage = (
  pass: string,
  messages: {
    minLength: string;
    digit: string;
    lowercase: string;
    uppercase: string;
    special: string;
    nowhitespace: string;
    norepeat: string;
    norepeatnumbers: string;
    norepeatcharacters: string;
    noinverserepeatnumbers: string;
    noinverserepeatcharacters: string;
  }
) => {
  if (!validator.isLength(pass, { min: 8, max: 20 })) return messages.minLength;
  if (!/[0-9]/g.test(pass)) return messages.digit;
  if (!/[a-z]/g.test(pass)) return messages.lowercase;
  if (!/[A-Z]/g.test(pass)) return messages.uppercase;
  if (!/[!#$%&()*+,\-./:;<=>?@\]\[_`{|}\\\\~]/g.test(pass))
    return messages.special;
  if (/\s/g.test(pass)) return messages.nowhitespace;
  if (/([a-zA-Z0-9!#$%&()*+,\-./:;<=>?@\]\[_`{|}\\\\~])\1{1,}/.test(pass))
    return messages.norepeat;
  if (consecutiveDigits(pass)) return messages.norepeatnumbers;
  if (consecutiveChars(pass)) return messages.norepeatcharacters;
  if (inverseConsecutiveDigits(pass)) return messages.noinverserepeatnumbers;
  if (inverseConsecutiveChars(pass)) return messages.noinverserepeatcharacters;
  return "";
};

export const consecutiveDigits = (str: string) => {
  let curr: any = 0;
  let prev = 0;
  let count = 0;
  for (let i = 0; i < str.length; ++i) {
    curr = parseInt(str.split("")[i]);
    if (!isNaN(parseFloat(curr)) && isFinite(curr)) {
      if (count === 0) {
        ++count;
      } else if (prev + 1 === curr) {
        ++count;
        if (count === 2) {
          return true;
        }
      }
    }
    prev = curr;
  }
  return false;
};

export const inverseConsecutiveDigits = (str: string) => {
  let curr: any = 0;
  let prev = 0;
  let count = str.length;
  for (let i = str.length - 1; i >= 0; --i) {
    curr = parseInt(str.split("")[i]);
    if (!isNaN(parseFloat(curr)) && isFinite(curr)) {
      if (count === str.length) {
        --count;
      } else if (prev + 1 === curr) {
        --count;
        if (count !== 2) {
          return true;
        }
      }
    }
    prev = curr;
  }
  return false;
};

export const consecutiveChars = (str: string) => {
  let curr: any = 0;
  let prev = 0;
  let count = 0;
  for (let i = 0; i < str.length; ++i) {
    curr = str.charCodeAt(i);
    if (
      !isNaN(parseFloat(curr)) &&
      isFinite(curr) &&
      ((curr >= 65 && curr <= 90) ||
        (curr >= 97 && curr <= 122) ||
        (curr >= 48 && curr <= 57))
    ) {
      if (count === 0) {
        ++count;
      } else if (prev + 1 === curr) {
        ++count;
        if (count === 2) {
          return true;
        }
      }
    }
    prev = curr;
  }
  return false;
};

export const inverseConsecutiveChars = (str: string) => {
  let curr: any = 0;
  let prev = 0;
  let count = str.length;
  for (let i = str.length - 1; i >= 0; --i) {
    curr = str.charCodeAt(i);
    if (
      !isNaN(parseFloat(curr)) &&
      isFinite(curr) &&
      ((curr >= 65 && curr <= 90) ||
        (curr >= 97 && curr <= 122) ||
        (curr >= 48 && curr <= 57))
    ) {
      if (count === str.length) {
        --count;
      } else if (prev + 1 === curr) {
        --count;
        if (count !== 2) {
          return true;
        }
      }
    }
    prev = curr;
  }
  return false;
};

export default passwordValidation;
