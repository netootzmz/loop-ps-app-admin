import React, { FC } from 'react'
import CustomDatePicker from '../forms/CustomDatePicker'

export const DispersionFilter:FC<{
    values: Partial<any & {}>;
    reset: Function;
    handleInputChange: Function;
    getInfo: any;
    generateFile: any;
}> = ({
    values,
    reset,
    getInfo,
    generateFile
}) => {
    return (
        <div>
            <h3 className="filters__title">Filtros</h3>
            <div className="dispersion">
                <form className="card card--dispersion">
                    <div className="dispersion__content">
                        <div>
                            <span className="dispersion__dateText">Rango de fechas</span>
                            <CustomDatePicker
                                id="datesRange"
                                fn={reset}
                                vals={values}
                                nameStart="createdAt"
                                nameEnd="createdAt2"
                            />
                        </div>
                        <div>
                            <button
                                className="btn btn--mailServer"                                
                                type="button"
                                onClick={()=>getInfo()}
                            >
                                Buscar
                            </button>
                        </div>
                    </div>
                </form>
                <button
                    className="btn btn--primary"
                    type="button"
                    onClick={()=>generateFile()}
                >
                    Generar nuevo archivo
                </button>
            </div>         
        </div>
    )
}
