import React, { FC } from 'react'
import svgs from '../../../helpers/svgs'
import SvgWrapper from '../../SvgWrapper'

export const EditConfigurationAmount: FC<{rowVal: any, reset: Function, clientId: string}> = ({rowVal, reset}) => {
    const handleEdit = async () =>{        
        reset({
            user: rowVal.user,
            nature: rowVal.nature,
            individualAmount: rowVal.individualAmount,
            totalAmount: rowVal.totalAmount
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
