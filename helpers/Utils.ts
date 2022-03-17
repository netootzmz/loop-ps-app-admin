import * as CryptoJS from 'crypto-js';


export class Utils {
	
	static encryptJSON(json: string, llave: string) {
		const _key = CryptoJS.enc.Utf8.parse(llave);
		const _iv = CryptoJS.enc.Utf8.parse(llave);
		const encrypted = CryptoJS.AES.encrypt(
			json.trim(), _key, {
				keySize: 16,
				iv: _iv,
				mode: CryptoJS.mode.ECB,
				padding: CryptoJS.pad.Pkcs7,
			});

		return encrypted.toString();
	}

	static decryptJSON(json: string, llave: string) {
		const _key = CryptoJS.enc.Utf8.parse(llave);
		const _iv = CryptoJS.enc.Utf8.parse(llave);
		const decrypt = CryptoJS.AES.decrypt(
			json.trim(), _key, {
				keySize: 16,
				iv: _iv,
				mode: CryptoJS.mode.ECB,
				padding: CryptoJS.pad.Pkcs7,
			});

		return decrypt.toString(CryptoJS.enc.Utf8);
	}
}
