import React, { FC } from 'react'

export const LoadAdjust: FC<{
    file: string;
    reset: Function;
    handleInputChange: Function;   
    titles: Partial<any & {}>     
}> = ({ 
    titles
}) => {
    return (
        <div className="card card--tiny massiveAdjust__selectFile">
            <h4 className="h4"><b>{titles.adjustment.parameters.selectFile} <br /> realizar la carga masiva de ajustes</b></h4>
            <div className="massiveAdjust__selectFile__buttons">
                <button
                    className="btn btn--mailServer"                    
                    type="button"
                >
                    {titles.adjustment.parameters.load}
                </button>
                <button
                    className="btn btn--cancel"
                    type="button"
                >
                    {titles.adjustment.parameters.analyze}
                </button>
            </div>
        </div>
    )
}
