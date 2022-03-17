import React from "react";

const SummarySale: React.FC<any> = ({data}) => {        
    const format = (num: number) => num.toLocaleString('en-US', {
        minimumFractionDigits: 2,      
        maximumFractionDigits: 2,
    });

    return (
        <>
            <h1 className="checkout__title">{data.merchantName}</h1>
           
            <ul className="checkout__list">
                <li className="checkout__item checkout__item--title">
                    Resumen de la venta
                </li>
                <li className="checkout__item">
                    <span>Concepto:</span>
                    <span>
                        <b>{data.concept}</b>
                    </span>
                </li>
                <li className="checkout__item">
                    <span>Venta:</span>
                    <span>
                        <b>${format(data.amountNumber/100)} MXN</b>                        
                    </span>
                </li>
                <li className="checkout__item">
                    <span>Propina:</span>
                    <span>
                        <b>$0.00 MXN</b>
                    </span>
                </li>
                <li className="checkout__item">
                    <span>Total:</span>
                    <span>
                        <b>${format(data.amountNumber/100)} MXN</b> 
                    </span>
                </li>
            </ul>             
        </>
    );
};

export default SummarySale;
