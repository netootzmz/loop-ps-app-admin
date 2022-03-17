import React, { FC } from 'react';
import Input from '../../../../forms/Input';

export const GraphicIdentity: FC<{logo: string, reduceLogo: string, handleInputChange: Function}> = ({logo, reduceLogo, handleInputChange}) => {    

    return (
        <div>
            <h2 className="h2 payments__title">Identidad gráfica</h2>
            <form className="card card__graphic">
                <h2 className="h2 payments__title">Logotipo</h2>

                <p>Tiene un tamaño superior al requerido</p>
                
                <div className="preferences__files">
                    <div className="preferences__files_show">
                        <Input
                            type="text"                        
                            inline
                            value={logo}                        
                            placeholder="Ubicación del archivo"
                        />
                    </div>
                    <div className="preferences__files_select">
                        <Input
                            type="file"
                            inline     
                            name="logo" 
                            accept="image/png"
                            id="logoSelected"
                            style={{"display": "none"}}
                            onChange={handleInputChange()}
                        />
                        <button className="preferences__examine" type="button" onClick={()=>document.getElementById("logoSelected")?.click()}>
                            Examinar
                        </button>
                    </div>
                </div>
                <p className="preferences__legends">El tamaño máximo deberá ser de 600x400, formato .png</p>
                <div className="preferences__space"></div>
                <h2 className="h2 payments__title">Logotipo reducido</h2>

                <p>Tiene un tamaño superior al requerido</p>

                <div className="preferences__files">
                    <div className="preferences__files_show">
                        <Input
                            type="text"                        
                            inline
                            value={reduceLogo}                        
                            placeholder="Ubicación del archivo"
                        />
                    </div>
                    <div className="preferences__files_select">
                        <Input
                            type="file"
                            inline     
                            name="reduceLogo" 
                            accept="image/png"
                            id="reduceSelected"
                            style={{"display": "none"}}
                            onChange={handleInputChange()}
                        />
                        <button className="preferences__examine" type="button" onClick={()=>document.getElementById("reduceSelected")?.click()}>
                            Examinar
                        </button>
                    </div>
                </div>
                <p className="preferences__legends">El tamaño máximo deberá ser de 600x600, formato .png, deberá contrastar con la barra de acceso rápido</p>
            </form>

        </div>
    )
}
