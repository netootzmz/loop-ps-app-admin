import React, { FC } from 'react'
import { Column } from 'react-table'
import Table from '../../tables/Table';
import { AllowEdition } from './AllowEdition';

export const TableCommerce: FC<{information: Array<any>, setHaveData: Function, reset: Function, titles: Partial<any & {}>}> = ({information, setHaveData, reset, titles}) => {
    const cols: Array<Column> = [
        {
            Header: `${titles.adjustment.parameters.commerceName}`,
            accessor: "commerceName",            
        },
        {
            Header: `${titles.adjustment.parameters.idCommerce}`,
            accessor: "idCommerce"
        },
        {
            Header: `${titles.adjustment.parameters.edit}`,
            accessor: "edit",
            Cell: function continueStatus({cell}){
                return(
                    <div>
                        <AllowEdition
                            rowVal={cell.row.values}
                            setHaveData={setHaveData}
                            reset={reset}
                        />
                    </div>
                )
            }
        }

    ]
    return (
        <div>
            <Table
                information={information}
                cols={cols}                
            />
        </div>
    )
}
