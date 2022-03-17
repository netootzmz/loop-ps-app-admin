import React, { FC, ChangeEvent } from 'react'
import svgs from '../../helpers/svgs'
import SvgWrapper from '../SvgWrapper'

export const DispersionUploadMov: FC<{
    rowVal: any;
}> = ({
    rowVal
}) => {    
    const getBase64 = (file: File): Promise<string | ArrayBuffer | null> =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
    });
    const uploadDispersionMovement = async (e: ChangeEvent<HTMLInputElement>) =>{
        let file = e.target.files ? e.target.files[0] : null;
        if(file){
            const base64 = await getBase64(file);
            console.log(base64);
            console.log(rowVal)
        }
    }
    return (
        <div className="table__actions">
            <input 
                accept=".xlsx, .xls"
                id="uploadMovementFile"
                type="file"  
                onChange={uploadDispersionMovement}               
                style={{display: "none"}}
            />
            <button
                className="btn btn--icon btn--action"
                onClick={()=>document.getElementById("uploadMovementFile")?.click()}
                type="button"
            >
                <SvgWrapper id={svgs.uploadFile} className="svg svg--small"/>
            </button>
        </div>
    )
}
