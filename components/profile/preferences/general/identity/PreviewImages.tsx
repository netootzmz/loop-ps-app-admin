import Image from 'next/image';
import React, { FC } from 'react';
import logo from "./../../../../../public/SPLogo.png";

export const PreviewImages: FC<{reset: Function, handleSubmit: any}> = ({ reset, handleSubmit }) => {
    return (
        <div>
            <h2 className="h2 payments__title">Vista previa</h2>        
            <div className="card">
                <div className="preferences__previewlogo">
                    <Image src={logo} alt="logo" className="preferences__image" />
                </div>
            </div>
            <br /><br />
            <div className="card">
                <div className="preferences__previewlogo">
                    <Image src={logo} alt="logo" className="preferences__image" />
                </div>
            </div>
            <div className="preferences__buttons">
                <button className="preferences__cancel" type="button" onClick={()=>reset()}>
                    Cancelar
                </button>
                <button className="preferences__save" type="submit" onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>)=>handleSubmit(e)}>
                    Guardar cambios
                </button>
            </div>
        </div>
    )
}
