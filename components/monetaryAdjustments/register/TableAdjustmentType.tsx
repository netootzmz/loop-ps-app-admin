import React, { FC } from 'react';
import { Column } from 'react-table';
import {v4 as uuidv4} from "uuid";
import Table from '../../tables/Table';
import { AdjustmentTypesEdit } from './AdjustmentTypesEdit';
import { AdjustmentTypesLogs } from './AdjustmentTypesLogs';
import { AdjustmentTypesToggle } from './AdjustmentTypesToggle';

export const TableAdjustmentType: FC<{
    information: any, 
    setNewAdjustType: Function, 
    reset: Function,
    setIsUpdate: Function,
    titles: Partial<any & {}>
}> = ({
    information, 
    setNewAdjustType, 
    reset,
    setIsUpdate,
    titles
}) => {
    console.log(information, "hola");

    let rows: Array<any> = [];

    information.data.forEach((data: any)=>{
        rows.push({
            adjustType: data["monetary-adjustment-id"],
            nameTypeAdjust: data["monetary-adjustment-name"],
            nature: data.nature.name,
            category: data.category.name,
            createdBy: data["monetary-adjustment-created-by"],
            status: data.status.id ? true : false,
            logs: [],
            edit: "",            
        })
    })

    const cols: Array<Column> = [
        {
            Header: `${titles.adjustment.parameters.adjustType}`,
            accessor: "adjustType"
        },
        {
            Header: `${titles.adjustment.parameters.nameAdjustType}`,
            accessor: "nameTypeAdjust"
        },
        {
            Header: `${titles.adjustment.parameters.nature}`,
            accessor: "nature"
        },
        {
            Header: `${titles.adjustment.parameters.category}`,
            accessor: "category"
        },
        {
            Header: `${titles.adjustment.parameters.createdBy}`,
            accessor: "createdBy"
        },
        {
            Header: `${titles.adjustment.parameters.status}`,
            accessor: "status",
            Cell: function RowStatus({cell}){
                return(
                    <div className="registerAdjust__table" key={uuidv4() + 1}>
                        <AdjustmentTypesToggle
                            rowVal={cell.row.values}
                        />
                    </div>
                )
            }
        },
        {
            Header: `${titles.adjustment.parameters.logs}`,
            accessor: "logs",
            Cell: function RowLogs({cell}){
                return(
                    <div className="" key={uuidv4() + 1}>
                        <AdjustmentTypesLogs
                            rowVal={cell.row.values}
                        />
                    </div>
                )
            }
        },
        {
            Header: `${titles.adjustment.parameters.edit}`,
            accessor: "edit",
            Cell: function RowEdit({cell}){
                return(
                    <div key={uuidv4() + 1}>
                        <AdjustmentTypesEdit
                            rowVal={cell.row.values}
                            setNewAdjustType={setNewAdjustType}
                            reset={reset}
                            setIsUpdate={setIsUpdate}
                        />
                    </div>
                )
            }
        }
    ];
   
    return (
        <Table
            information={rows}
            cols={cols}
        />        
    )
}
