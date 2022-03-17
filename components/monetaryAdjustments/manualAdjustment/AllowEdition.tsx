import React, { FC } from 'react'

export const AllowEdition: FC<{rowVal: any, setHaveData: Function, reset: Function}> = ({rowVal, setHaveData, reset}) => {
    const handleEdit = () => {
        //hacer llamado al ms para obtener info para los campos del recuadro inferior
        console.log(rowVal);
        setHaveData(true);
        reset({
            adjustLine: "2",
            category: "1",
            nature: "2",
            nameAdjustType: "1",
            amount: "$10.00 MXN"
        })
    }
    return (
        <div>
            <button
                type="button"
                className="btn btn--icon btn--arrow"                
                onClick={handleEdit}
            >
                &#x279C;
            </button>
        </div>
    )
}
