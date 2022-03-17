import React, { FC, useState } from 'react';
import {v4 as uuidv4} from "uuid";

export const AuthorizeCheckbox: FC<{rowVal: any; check: boolean | undefined}> = ({rowVal, check}) => {
    const dynamicName = uuidv4();
    const [ authorize, setAuthorize ] = useState(rowVal.authorize);

    const authorizeRow = () => {
        setAuthorize(!authorize);
    }


    return (
        <div className="conciliationTable__check">
            <input 
                checked={check || authorize}
                className="conciliationTable__checkbox"
                name={dynamicName}
                onChange={()=>{authorizeRow()}}
                type="checkbox" 
            />
        </div>
    )
}
