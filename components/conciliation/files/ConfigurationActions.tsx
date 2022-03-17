import React, { FC } from 'react'
import svgs from '../../../helpers/svgs';
import SvgWrapper from '../../SvgWrapper';

export const ConfigurationActions: FC<{
    rowVal: any;
}> = ({
    rowVal
}) => {
    const handleDelete = () =>{
        console.log(rowVal);
    }
    return (
        <div className="table__actions">
            <button
                type="button"
                className="btn btn--icon btn--action"
                onClick={handleDelete}
            >
                <SvgWrapper id={svgs.delete} className="svg svg--x-small"/>
            </button>  
            <button
                type="button"
                className="btn btn--icon btn--action"
            >
                <SvgWrapper id={svgs.pencil} className="svg svg--x-small"/>
            </button>
            <button
                type="button"
                className="btn btn--icon btn--action"
            >
                <SvgWrapper id={svgs.clock} className="svg svg--x-small"/>
            </button>
        </div>
    )
}
