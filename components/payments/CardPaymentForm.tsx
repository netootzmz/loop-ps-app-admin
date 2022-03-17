import React, {FC} from 'react'
import Input from '../forms/Input'
import DynamicCard from './DynamicCard'

const CardPaymentForm: FC = () => {
    return (
        <>
            <div>
                <DynamicCard animated cardNumber={'373167097482083'} name={'alancito'} expiration={'20'+'/'+'21'} csc={'1113'}/>

                <form className="form" >
            
                    <Input
                    name="name"
                    placeholder={'Nombre del titular'}
                    type="text"
                    />
                    <Input
                    name="number"
                    placeholder={'Número de tarjeta'}
                    type="text"
                    />
                
                <div className="cardPayment--card">
                    <Input
                    name="expiration"
                    placeholder={'Vence'}
                    type="text"
                    />
                    <Input
                    name="cvv"
                    placeholder={'CVV/CSS'}
                    type="text"
                    />
                    
                </div>
               
                
                </form>
            </div>
                
        </>

    )
}

export default CardPaymentForm
