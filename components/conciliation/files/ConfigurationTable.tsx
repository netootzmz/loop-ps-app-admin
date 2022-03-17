import React, { FC } from 'react'
import Table from '../../tables/Table';
import useLang from '../../../hooks/useLang';
import { Column } from 'react-table';
import { iGlobalState, iUiState } from '../../../@types/store/states';
import { useSelector } from 'react-redux';
import {v4 as uuidv4} from "uuid";
import { ConfigurationActions } from './ConfigurationActions';

export const ConfigurationTable: FC<{
    information: Array<any & []>
}> = ({
    information
}) => {

    const { lang } = useSelector<iGlobalState, iUiState>(({ ui }) => ui);
    const { titles } = useLang(lang);

    const cols: Array<Column> = [
        {
            Header: `${titles.conciliation.parameters.layout_name}`,
            accessor: "layout_name"
        },
        {
            Header: `${titles.conciliation.parameters.description_layout}`,
            accessor: "description_layout"
        },
        {
            Header: `${titles.conciliation.parameters.acquirer}`,
            accessor: "acquirer"
        },
        {
            Header: `${titles.conciliation.parameters.user_register}`,
            accessor: "user_regist"
        },
        {
            Header: `${titles.conciliation.parameters.status}`,
            accessor: "status"
        },
        {
            Header: `${titles.conciliation.parameters.date_register}`,
            accessor: "regist_date"
        },
        {
            Header: `${titles.conciliation.parameters.actions}`,
            accessor: "actions",
            Cell: function RowActions({cell}){
                return(
                    <div key={uuidv4() + 1} className="">
                        <ConfigurationActions
                            rowVal={cell.row.values}
                        />
                    </div>
                )
            }
        }
    ]

    return (
        <>
            <h3 className="filters__title">{`${titles.conciliation.parameters.file_configurations}`}</h3>            
            <Table
                information={information}
                cols={cols}
            />
        </>
    )
}
