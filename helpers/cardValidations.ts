import { AllButDigits, AmexCardBin, MastercardCardBin, VisaCardBin } from "../middlewares/ValidationRegex";
import moment from 'moment';

export function validCard(value: string) {
    let cardValue = value.replace(AllButDigits,"");
    // Accept only digits, dashes or spaces
    if (/[^0-9-\s]+/.test(cardValue)) return false;

    // The Luhn Algorithm. It's so pretty.
    let nCheck = 0,
        bEven = false;
    cardValue = cardValue.replace(/\D/g, '');

    for (let n = cardValue.length - 1; n >= 0; n--) {
        let cDigit = cardValue.charAt(n),
            nDigit = parseInt(cDigit, 10);

        if (bEven && (nDigit *= 2) > 9) nDigit -= 9;

        nCheck += nDigit;
        bEven = !bEven;
    }

    return nCheck % 10 === 0;
}

export function getAsciiToHexa(str: string) {
    const arr1 = [];
    for (let n = 0, l = str.length; n < l; n++) {
        const hex = Number(str.charCodeAt(n)).toString(16);
        arr1.push(hex);
    }
    return arr1.join('');
}

export function validCvv(str: string, card: string){
    if(AmexCardBin.test(card)){
        return str.length === 4
    }else if(VisaCardBin.test(card)){
        return str.length === 3 
    }
    else if(MastercardCardBin.test(card)){
        return str.length === 3
    }
    else if(str.length > 4){
        return false;
    }
    else{
        return false;
    }
}

export function validExpiration(date: string){
    const expiration = date.replace(AllButDigits, "");
    let mm = Number(moment().format("MM"));
    let yy = Number(moment().format("YY"));
    const [ month, year ] = [ expiration.substr(0, 2), expiration.substr(2, 2) ];
    if(month.length === 2 &&
        year.length === 2 &&
        Number(month) <= 12 &&
        ((Number(year) === yy && Number(month) >= mm) || (Number(year) > yy && Number(month) <= mm && Number(year) <= yy + 8) || (Number(year) > yy && Number(month) > mm && Number(year) <= yy + 8))){
            return true;
    }
    else{
        return false;
    }
}

export const FieldMasks = {
	card: {
		generic: '**** **** **** ****',
		amex: '**** ****** *****',
	},

    cardMasked:{
        generic: '9999 9999 9999 9999',
		amex: '9999 999999 99999',
    },
	cvv: {
		generic: '999',
		amex: '9999',
	},

	phone: {
		generic: '(999) 999 9999',
		metropolitan: '(99) 99 99 99 99',
		international: '(99) 999 99999 99999'
	},
};


export default FieldMasks;