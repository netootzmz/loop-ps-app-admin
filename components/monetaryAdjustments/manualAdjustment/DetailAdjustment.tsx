import React, { FC, KeyboardEvent } from 'react'
import handleCurrency from '../../../helpers/handleCurrency';
import Input from '../../forms/Input';
import Select from '../../forms/Select'

export const DetailAdjustment: FC<{
        haveData: boolean,
        values: Partial<any & {}>,
        reset: Function,
        handleInputChange: Function,
        handleSubmit: any,
        titles: Partial<any & {}>
    }> = ({
        haveData,
        values,
        reset,
        handleInputChange,
        handleSubmit,
        titles
    }) => {

    const adjustLineOptions = [
        {value: "", text: `${titles.adjustment.parameters.adjustLine}`},
        {value: "1", text: "Línea de Débito"},
        {value: "2", text: "Fondo de reserva"}
    ];

    const categoryOptions = [
        {value: "", text: `${titles.adjustment.parameters.category}`},
        {value: "1", text: "Devoluciones"},
        {value: "2", text: "Cuota transaccional"},
        {value: "3", text: "Cuota de afiliación"}        
    ];

    const natureOptions = [
        {value: "", text: `${titles.adjustment.parameters.nature}`},
        {value: "1", text: "Cargo"},
        {value: "2", text: "Abono"}
    ];

    const nameAdjustTypeOptions = [
        {value: "", text: `${titles.adjustment.parameters.nameAdjustType}`},
        {value: "1", text: "Cancelación de ajustes de cuota de afilición"},        
    ]
    return (
        <form onSubmit={handleSubmit} className="detailAdjustment">
            <div className="card card--full detailAdjustment__container">
                <div className="detailAdjustment__section">
                    <h4 className="h4"><b>{titles.adjustment.parameters.solution}</b></h4>            
                    <div className="detailAdjustment__selector">
                        <Select
                            disabled={!haveData}
                            name="adjustLine"
                            placeholder={titles.adjustment.parameters.adjustLine}
                            options={adjustLineOptions}
                            label={titles.adjustment.parameters.adjustLine}
                            onChange={handleInputChange()}
                            value={values.adjustLine || ""}
                        />
                    </div>
                </div>
                <div className="detailAdjustment__section">
                    <h4 className="h4"><b>{titles.adjustment.parameters.adjustLine}</b></h4>            
                    <div className="detailAdjustment__selector">
                        <Select
                            disabled={!haveData}
                            name="adjustLine"
                            placeholder={titles.adjustment.parameters.adjustLine}
                            options={adjustLineOptions}
                            label={titles.adjustment.parameters.adjustLine}
                            onChange={handleInputChange()}
                            value={values.adjustLine || ""}
                        />
                    </div>
                </div>
                <div className="detailAdjustment__section">
                    <h4 className="h4"><b>{titles.adjustment.parameters.category}</b></h4>            
                    <div className="detailAdjustment__selector">
                        <Select
                            disabled={!haveData}
                            name="category"
                            placeholder={titles.adjustment.parameters.category}
                            options={categoryOptions}
                            label={titles.adjustment.parameters.category}
                            onChange={handleInputChange()}
                            value={values.category || ""}
                        />
                    </div>
                </div>
                <div className="detailAdjustment__section">
                    <h4 className="h4"><b>{titles.adjustment.parameters.nature}</b></h4>            
                    <div className="detailAdjustment__selector">
                        <Select
                            disabled={!haveData}
                            name="nature"
                            placeholder={titles.adjustment.parameters.nature}
                            options={natureOptions}
                            label={titles.adjustment.parameters.nature}
                            onChange={handleInputChange()}
                            value={values.nature || ""}
                        />
                    </div>
                </div>
                <div className="detailAdjustment__section">
                    <h4 className="h4"><b>{titles.adjustment.parameters.nameAdjustType}</b></h4>            
                    <div className="detailAdjustment__selector">
                        <Select
                            disabled={!haveData}
                            name="nameAdjustType"
                            placeholder={titles.adjustment.parameters.name}
                            options={nameAdjustTypeOptions}
                            label={titles.adjustment.parameters.name}
                            onChange={handleInputChange()}
                            value={values.nameAdjustType || ""}
                        />
                    </div>
                </div>
                <div className="detailAdjustment__section">
                    <h4 className="h4"><b>{titles.adjustment.parameters.amount}</b></h4>      
                    <div className="detailAdjustment__selector">
                        <Input
                            disabled={!haveData}
                            full
                            onChange={()=>{}}
                            onKeyDown={(e: KeyboardEvent<HTMLDivElement>) => 
                                reset({
                                    ...values,
                                    amount: handleCurrency(e, values.amount, 7)
                                })
                            }
                            placeholder={titles.adjustment.parameters.amount}
                            type="text"
                            value={values.amount || ""}
                        />
                    </div>      
                </div>
            </div>
        </form>
    )
}
