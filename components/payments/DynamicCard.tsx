
import React, { useEffect, useState } from 'react';
import { AmexCardBin, MastercardCardBin, VisaCardBin } from '../../middlewares/ValidationRegex';

interface DynamicCardProps {
	cardNumber: string,
	name: string,
	expiration: string,
	csc: string,
	animated?: boolean,

}



const DynamicCard = ({ animated, cardNumber, name, expiration, csc }: DynamicCardProps) => {
	const [ brand, setBrand ] = useState<'amex' | 'mc' | 'visa' | 'carnet' | null>(null);
	const [ theme, setTheme ] = useState<'blue' | 'dark-blue' | 'green' | 'orange' | null>(null);

	useEffect(() => {

		if (AmexCardBin.test(cardNumber)) {
			setBrand('amex');
			setTheme('dark-blue');
		} else if (VisaCardBin.test(cardNumber)) {
			setBrand('visa');
			setTheme('blue');
		} else if (MastercardCardBin.test(cardNumber)) {
			setBrand('mc');
			setTheme('orange');
		} else {
			setBrand(null);
			setTheme(null);
		}
	}, [ cardNumber ]);

	return (
		<div className="dynamic-card-container">
			<div className={`card ${theme ? 'cc-' + theme : ''} ${animated ? 'animate__animated animate__zoomIn' : ''}`}>
				<header>
					{/* {brand !== null && (
						<CardIcon card={brand} visaVariant="white" height={10} className="ml-auto animate__animated animate__fadeIn"/>
					)} */}
				</header>

				<section>
					{brand === 'amex' && (
						<span className="cc-amex-csc">{csc}</span>
					)}

					{cardNumber.replace(/_/g, '\xa0')}
				</section>

				<footer>
					<div className="cc-name">
						<small className={`title ${animated ? 'animate__animated animate__fadeIn' : ''}`}>Titular</small>
						<span>{name}</span>
					</div>
					<div className="cc-exp">
						<small className={`title ${animated ? 'animate__animated animate__fadeIn' : ''}`}>Vence</small>
						<span>{expiration}</span>
					</div>
				</footer>
			</div>

		</div>
	);
};

export default DynamicCard;
