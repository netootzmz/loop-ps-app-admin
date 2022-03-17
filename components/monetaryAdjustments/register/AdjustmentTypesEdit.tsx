import React, { FC } from 'react';
import svgs from '../../../helpers/svgs';
import SvgWrapper from '../../SvgWrapper';

export const AdjustmentTypesEdit: FC<{
    rowVal: any, 
    setNewAdjustType: Function, 
    reset: Function,
    setIsUpdate: Function
}> = ({
    rowVal, 
    setNewAdjustType, 
    reset,
    setIsUpdate
}) => {
    const handleEdit = async () => {
        setIsUpdate(true);
        setNewAdjustType(true);
        reset({
            nameAdjustType: rowVal.nameTypeAdjust,
            nature: rowVal.nature === "ABONO" ?  "2" : "1",
            category: rowVal.category === "ANUALIDAD" ? "3" : "1",
            adjustType: rowVal.adjustType,
            status: rowVal.status ? "1" : "2"
        })
    }
    return (
        <div>
            <button
                type="button"
                className="btn btn--icon"
                onClick={handleEdit}
            >
                <SvgWrapper id={svgs.pencil} className="svg svg--x-small svg--table" />
            </button>
        </div>
    )
}
