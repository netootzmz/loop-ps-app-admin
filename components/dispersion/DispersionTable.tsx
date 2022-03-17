import React, { FC } from 'react'
import { Column } from 'react-table';
import TableDispersion from '../tables/TableDispersion';
import { DispersionDownloadFile } from './DispersionDownloadFile';
import { DispersionNotProcessed } from './DispersionNotProcessed';
import { DispersionUploadMov } from './DispersionUploadMov';

export const DispersionTable: FC<{
    information: any;
    getInfo: any;
}> = ({
    information
}) => {
    let rows: Array<any> = [];

    information.forEach((data: any)=>{
        rows.push({
            date_generation: data.date_generation,
            hour_generation: data.hour_generation,
            file_name_dispersion: data.file_name_dispersion,
            download_file: data.download_file,
            upload_date: data.upload_date,
            upload_hour: data.upload_hour,
            file_name_movement: data.file_name_movement,
            upload_user: data.upload_user,
            upload_movement: data.upload_movement,
            status: data.status,
            not_process: data.not_process
        });
    });

    const cols: Array<Column> = [
        {
            Header: "Fecha de generación",
            accessor: "date_generation"
        },
        {
            Header: "Hora de generación",
            accessor: "hour_generation"
        },
        {
            Header: "Nombre del archivo",
            accessor: "file_name_dispersion"
        },
        {
            Header: "Descargar archivo",
            accessor: "download_file",
            Cell: function RowDownloadFile({cell}){
                return(
                    <div>
                        <DispersionDownloadFile
                            rowVal={cell.row.values}  
                        />
                    </div>
                )
            }
        },
        {
            Header:" ",
            accessor:""
        },
        {
            Header: "Fecha de carga",
            accessor: "upload_date"
        },
        {
            Header: "Hora de carga",
            accessor: "upload_hour"
        },
        {
            Header: "Nombre del archivo",
            accessor: "file_name_movement"
        },
        {
            Header: "Usuario que cargó",
            accessor: "upload_user"
        },
        {
            Header: "Subir movimientos",
            accessor: "upload_movement",
            Cell: function UploadMovements({cell}){
                return(
                    <div>
                        <DispersionUploadMov
                            rowVal={cell.row.values}
                        />
                    </div>
                )
            }
        },
        {
            Header: "Estatus de proceso",
            accessor: "status",
            Cell: function RowStatus({cell}){
                if(cell.row.values.status === 1){
                    return(
                        <div className="conciliationTable__allPay">{cell.row.values.status}</div>
                    )
                }else if(cell.row.values.status === 2){
                    return(
                        <div className="conciliationTable__almostPay">{cell.row.values.status}</div>
                    )
                }else if(cell.row.values.status === 3){
                    return(
                        <div className="conciliationTable__dangerPay">{cell.row.values.status}</div>
                    )
                }
            }
        },
        {
            Header: "Pagos no procesados",
            accessor: "not_process",
            Cell: function NotProcessed({cell}){
                return(
                    <div>
                        <DispersionNotProcessed
                            rowVal={cell.row.values}
                        />
                    </div>
                )
            }
        }
    ];

    return (
        <div>
            <TableDispersion
                information={rows}
                cols={cols}
            />
        </div>
    )
}
