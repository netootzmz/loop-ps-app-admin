import React, { FC } from 'react'
import svgs from '../../helpers/svgs';
import SvgWrapper from '../SvgWrapper';

export const DispersionNotProcessed: FC<{
    rowVal: any;
}> = ({
    rowVal
}) => {    
    const notProcessed = () => {
        console.log("not processed file");
    }
    if( rowVal.status === 2 || rowVal.status === 3 ){
        return (
            <div className="table__actions">
                <button 
                    className="btn btn--icon btn--action"
                    onClick={()=>notProcessed()}
                    type="button"
                >
                    <SvgWrapper id={svgs.downloadFile} className="svg svg--small"/>
                </button>            
            </div>
        )
    }else{
        return(
            <div></div>
        )
    }
}
