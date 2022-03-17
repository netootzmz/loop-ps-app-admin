import React, { FC } from 'react'
import svgs from '../../helpers/svgs';
import SvgWrapper from '../SvgWrapper';

export const DispersionDownloadFile: FC<{
    rowVal: any;
}> = ({

}) => {
    const downloadDispersionFile = () =>{
        console.log("download dispersion file");
    }
    return (
        <div className="table__actions">
            <button
                className="btn btn--icon btn--action"
                onClick={()=>downloadDispersionFile()}
                type="button"
            >   
                <SvgWrapper id={svgs.downloadFile} className="svg svg--small"/>
            </button>
        </div>
    )
}
