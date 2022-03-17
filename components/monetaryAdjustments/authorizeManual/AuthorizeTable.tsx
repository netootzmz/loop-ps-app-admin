/* eslint-disable react/display-name */
import React, { FC, useState } from 'react';
import { Column } from 'react-table';
import {v4 as uuidv4} from "uuid";
import TableCheckbox from '../../tables/TableCheckbox';
import { AuthorizeCheckbox } from './AuthorizeCheckbox';

export const AuthorizeTable: FC<{
    information: any[];
    titles: Partial<any & {}>
}> = ({
    information,
    titles
}) => {
    let rows: Array<any> = [];
    let totalAmount: number = 0;    
    const [ check, setCheck ] = useState<undefined | boolean>();
    
    const format = (num: number) => num.toLocaleString('en-US', {
        minimumFractionDigits: 2,      
        maximumFractionDigits: 2,
    });   

    information.forEach((data: any)=>{
        rows.push({
            number: data.number,
            adjustName: data.adjustName,
            amount: data.amount ? `$${format(data.amount)} MXN` : "$0.00 MXN",
            nature: data.nature,
            idCommerce: data.idCommerce,
            commerceName: data.commerceName,
            solution: data.solution,
            captureDate: data.captureDate,
            userCapture: data.userCapture,
            authorize: data.authorize,
            userAuthorize: data.userAuthorize,
            authDate: data.authDate,
            userAuthorize2: data.userAuthorize2,
            authDate2: data.authDate2,
            applicationStatus: data.applicationStatus
        });
        totalAmount += data.amount;
    })

    const cols: Array<Column> = [
        {
            Header: "Num",
            accessor: "number"
        },
        {
            Header: `${titles.conciliation.parameters.adjust_name}`,
            accessor: "adjustName"
        },
        {
            Header: `${titles.conciliation.parameters.adjust_amount}`,
            accessor: "amount"
        },
        {
            Header: `${titles.conciliation.parameters.nature}`,
            accessor: "nature"
        },
        {
            Header: `${titles.conciliation.parameters.idCommerce}`,
            accessor: "idCommerce"
        },
        {
            Header: `${titles.conciliation.parameters.commerceName}`,
            accessor: "commerceName"
        },
        {
            Header: `${titles.conciliation.parameters.solution}`,
            accessor: "solution"
        },
        {
            Header: `${titles.conciliation.parameters.captureDate}`,
            accessor: "captureDate"
        },
        {
            Header: `${titles.conciliation.parameters.userCapture}`,
            accessor: "userCapture"
        },
        {
            Header: ()=>(
                <div>
                    {`${titles.conciliation.parameters.authorize}`}
                    <input 
                        checked={check || false}
                        className=""
                        name={uuidv4() + 2}
                        onChange={()=>{
                            check ? setCheck(undefined) : setCheck(true)
                        }}
                        type="checkbox"                         
                    />
                </div>
            ),
            accessor: "authorize",
            Cell: function RowAuthorize({cell}){
                return(
                    <div className="registerAdjust__table" key={uuidv4() + 1}>
                        <AuthorizeCheckbox
                            rowVal={cell.row.values}
                            check={check}
                        />
                    </div>
                )
            }                        
            // accessor: "authorize",
        },
        {
            Header: `${titles.conciliation.parameters.user_authorize}`,
            accessor: "userAuthorize"
        },
        {
            Header: `${titles.conciliation.parameters.date_authorize}`,
            accessor: "authDate"
        },
        {
            Header: `${titles.conciliation.parameters.user_authorize}`,
            accessor: "userAuthorize2"
        },
        {
            Header: `${titles.conciliation.parameters.date_authorize}`,
            accessor: "authDate2"
        },
        {
            Header: `${titles.conciliation.parameters.application_status}`,
            accessor: "applicationStatus"
        }
    ];

    return (
        <div className="authorizeManual__table">
            <TableCheckbox
                information={rows}
                cols={cols}
            />
            <div className="authorizeManual__table__footer">
                <div className="authorizeManual__table__amounts">
                    <div className="authorizeManual__table__amount">
                        <p><b>{titles.conciliation.parameters.total_amount_charge}:</b></p>
                        <p><b>${format(totalAmount)} MXN</b></p>
                    </div>
                    <div className="authorizeManual__table__amount">
                        <p><b>{titles.conciliation.parameters.total_amount_payment}:</b></p>
                        <p><b>$0.00 MXN</b></p>                    
                    </div>
                </div>
                <div>
                    <button
                        type="button"
                        className="btn btn--cancel"
                        onClick={()=>{setCheck(undefined)}}
                    >
                        {titles.conciliation.parameters.decline}
                    </button>
                    <button
                        type="button"
                        className="btn btn--mailServer"
                        onClick={()=>{}}
                    >
                        {titles.conciliation.parameters.authorize}
                    </button>
                </div>
            </div>
        </div>
    )
}
