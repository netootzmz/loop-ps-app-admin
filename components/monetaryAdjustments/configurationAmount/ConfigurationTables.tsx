import React, { FC } from 'react';
import { Column } from 'react-table';
import {v4 as uuidv4} from "uuid";
import Table from '../../tables/Table'
import { EditConfigurationAmount } from './EditConfigurationAmount';

export const ConfigurationTables: FC<{information: Array<any>, reset: Function, clientId: string, titles:Partial<any & {}>}> = ({information, reset, clientId, titles}) => {

    const cols: Array<Column> = [
        {
            Header: "Num",
            accessor: "number"
        },
        {
            Header: `${titles.adjustment.parameters.user}`,
            accessor: "user"
        },
        {
            Header: `${titles.adjustment.parameters.nature}`,
            accessor: "nature"
        },
        {
            Header: `${titles.adjustment.parameters.daily}`,
            accessor: "individualAmount"
        },
        {
            Header: `${titles.adjustment.parameters.totalAdjust}`,
            accessor: "totalAmount"
        },
        {
            Header: `${titles.adjustment.parameters.edit}`,
            accessor: "editAmount",
            Cell: function RowAmounts({cell}){
                return(
                    <div className="registerAdjust__table" key={uuidv4() + 1}>
                        <EditConfigurationAmount
                            rowVal={cell.row.values}
                            clientId={clientId}
                            reset={reset}
                        />
                    </div>
                )
            }
        }
    ]
    return (
        <Table
            information={information}
            cols={cols}
        />
    )
}
