/**
 * Regular expression for validating a wide range of email addresses
 */
export const EmailRegex: RegExp = /^[a-z0-9!#$%&.'*+/=?^_`{|}~-]+@[a-z0-9-]+(\.[a-z0-9-]{2,})+$/i;

/**
 * Regular expression for validating Mexican phone numbers (10 digits)
 */
export const PhoneRegex: RegExp = /\d{0,15}/i;

/**
 * Array containing Mexican two-digit area codes
 */
export const TwoDigitAreaCodes: string[] = ['33', '55', '56', '81'];

/**
 * Array containing Mexican two-digit area codes
 */
export const InternationalCodes: string = '00';


/**
 * American Express card numbers start with 34 or 37
 */
export const AmexCardBin: RegExp = /^3[47]/;

/**
 * Mastercard card numbers start with 51, 55, and 22-27 (+ Maestro cards)
 */
export const MastercardCardBin: RegExp = /^(5[1-5]|2[2-7]|5018|5020|5038|6304|6759|6761|6763)/;

/**
 * Visa card numbers start with 4
 */
export const VisaCardBin: RegExp = /^4[0-9]/;

/**
 * Globally targets all characters that are not digits
 */
export const AllButDigits: RegExp = /[^\d]/g;

export const AllButDigitsAndSpace: RegExp = /[^\d][ ]/g;

export const AllDigits: RegExp = /^[0-9]*$/;

/**
 * Regex for name
 */

export const RegexName: RegExp = /^[a-zA-Z\u00C0-\u024F\u1E00-\u1EFF]{3,60}(([ ][a-zA-Z\u00C0-\u024F\u1E00-\u1EFF ])?[a-zA-Z\u00C0-\u024F\u1E00-\u1EFF ]*)*$/;

export const RemoveAccents: RegExp = /[\u0300-\u036f]/g;