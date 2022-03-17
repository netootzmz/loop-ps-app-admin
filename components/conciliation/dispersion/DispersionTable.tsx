import React, { FC } from 'react'
import { Column } from 'react-table';
import Table from '../../tables/Table';
import { iGetDispersionDataContentRes } from '../../../@types/api/res';

export const DispersionTable: FC<{ 
    information: any, 
    titles: Partial<any & {}> 
}> = ({
    information,
    titles
}) => {
    let rows: Array<any> = [];

    information.data.forEach((data: iGetDispersionDataContentRes)=>{
        rows.push({
            dateDispersion: data.dispersion_date,
            fileName: data.dispersion_name,
            user: data.dispersion_user || "N/A"
        });
    });

    const cols: Array<Column> = [
        {
            Header: `${titles.conciliation.parameters.dispersion_date}`,
            accessor: "dateDispersion"
        },
        {
            Header: `${titles.conciliation.parameters.dispersion_file}`,
            accessor: "fileName"
        },
        {
            Header: `${titles.conciliation.parameters.dispersion_user}`,
            accessor: "user"
        }
    ];
    return (
        <>
            <h3 className="filters__title">{titles.conciliation.parameters.dispersion_generated}</h3>
            <Table
                information={rows}
                cols={cols}
            />            
        </>
    )
}
