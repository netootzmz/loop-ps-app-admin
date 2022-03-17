import React, { FC, KeyboardEvent } from 'react'
import Input from '../../forms/Input'
import handleCurrency from '../../../helpers/handleCurrency';
import Select from '../../forms/Select';

export const ConfigurationFilters: FC<{
    values: Partial<any & {}>,
    errors: any,
    reset: Function,
    handleInputChange: Function,
    handleSubmit: any,
    titles: Partial<any & {}>
}> = ({
    values,
    reset,
    handleInputChange,
    handleSubmit,
    titles
}) => {
    const userOptions=[
        {value: "", text: "Usuario"},
        {value: "usuario1", text: "Usuario prueba"},
        {value: "usuario2", text: "Usuario prueba 2"},
    ]

    const natureOptions=[
        {value: "", text: "Naturaleza"},
        {value: "naturaleza1", text: "Naturaleza prueba"},
        {value: "naturaleza2", text: "Usuario prueba 2"},
    ]

    return (
        <>
            <form className="card card--full configurationFilters" onSubmit={handleSubmit}>
                <div className="configurationFilters__row">
                    <h4 className="h4"><b>{titles.adjustment.parameters.user}</b></h4>
                    <div className="registerAdjust__selector">
                        <Select
                            name="user"
                            placeholder={titles.adjustment.parameters.user}
                            options={userOptions}
                            label={titles.adjustment.parameters.user}
                            onChange={handleInputChange()}
                            value={values.user || ""}
                        />
                    </div>
                </div>
                <div className="configurationFilters__row">
                    <h4 className="h4"><b>{titles.adjustment.parameters.nature}</b></h4>
                    <div className="registerAdjust__selector">
                        <Select
                            name="nature"
                            placeholder={titles.adjustment.parameters.nature}
                            options={natureOptions}
                            label={titles.adjustment.parameters.nature}
                            onChange={handleInputChange()}
                            value={values.nature || ""}
                        />
                    </div>
                </div>              
                <div className="configurationFilters__row">
                    <h4 className="h4"><b>{titles.adjustment.parameters.dailyAmount}</b></h4>
                    <div className="configurationFilters__input">
                        <Input
                            full
                            onChange={()=>{}}
                            onKeyDown={(e: KeyboardEvent<HTMLDivElement>)=>
                                reset({
                                    ...values,
                                    individualAmount: handleCurrency(e, values.individualAmount, 7)
                                })
                            }
                            placeholder={titles.adjustment.parameters.amount}
                            type="text"
                            value={values.individualAmount || ""}
                        />
                    </div>
                </div>
                <div className="configurationFilters__row">
                    <h4 className="h4"><b>{titles.adjustment.parameters.totalDaily}</b></h4>
                    <div className="configurationFilters__input">
                        <Input
                            full
                            onChange={()=>{}}
                            onKeyDown={(e: KeyboardEvent<HTMLDivElement>)=>
                                reset({
                                    ...values,
                                    totalAmount: handleCurrency(e, values.totalAmount, 7)
                                })
                            }
                            placeholder={titles.adjustment.parameters.amount}
                            type="text"
                            value={values.totalAmount || ""}
                        />
                    </div>
                </div>
                <div className="configurationFilters__buttons">
                    <button
                        type="button"
                        className="btn btn--cancel"
                        onClick={()=>{
                            reset();
                        }}
                    >
                        {titles.adjustment.parameters.cancel}
                    </button>
                    <button
                        type="submit"
                        className="btn btn--mailServer"
                    >
                        {titles.adjustment.parameters.save}
                    </button>
                </div>
            </form>
        </>
    )
}
