import React, { FC } from 'react';
import svgs from '../../../helpers/svgs'
import SvgWrapper from '../../SvgWrapper'
import Swal from "sweetalert2";
import moment from 'moment';

export const ConciliationLogs: FC<{
    rowVal: any;
    titles: Partial<any & {}>
}> = ({
    rowVal,
    titles
}) => {
    const day_name: string = moment(rowVal.fechatxn).format("ddd");
    const showLogs = async() =>{
                
        if(rowVal.totalTreasury !== "$0.00"){
            let table = `
            <div style="align-items:center; display: flex; justify-content: space-between; text-align: left; width: 250px; margin-bottom: 25px">
                <div style="border: 4px dotted #354a5e; border-radius: 50%; height:30px; width: 30px; position: relative;">                    
                    <div style="position: absolute; width: 3px; height: 10px; background-color: #354a5e; top: calc(50% - 10px); left: calc(50% - 3px); border-radius: 5px;"></div>
                    <div style="position: absolute; width: 3px; height: 10px; background-color: #354a5e; top: calc(50% - 3px); left: calc(50%  + 1px); border-radius: 5px; transform: rotate(125deg);"></div>
                </div>
                <div>
                    <h2>${titles.conciliation.parameters.modal_title}</h2>
                    <p style="font-size: 1.25rem; font-weight: 400;">Bitácora</p>
                </div>
            </div>
            <table id="table">
                <thead>
                    <tr>
                        <th>Actividad</th>
                        <th>${titles.conciliation.parameters.modal_date}</th>
                        <th>${titles.conciliation.parameters.modal_user}</th>
                        <th>${titles.conciliation.parameters.adjust_amount}</th>
                        <th>${titles.conciliation.parameters.notes}</th>
                    </tr>
                </thead>
                <tbody>                                       
              
            `;
            if(rowVal.logs[3]){
                table += `
                    <tr>
                        <td>Registro Tesorería</td>
                        <td>${moment(rowVal.logs[3]).format("YYYY-MM-DD HH:mm:ss")}</td>
                        <td>${rowVal.logs[4]}</td>
                        <td>$${rowVal.logs[5]}</td>
                        <td>N/A</td>
                    </tr>
                `
            }
            if(rowVal.concile){
                table += `
                    <tr>
                        <td>Conciliación Manual</td>
                        <td>${rowVal.logs[0]}</td>
                        <td>${rowVal.logs[1]}</td>
                        <td>${rowVal.totalTreasury}</td>
                        <td>${rowVal.logs[2]}</td>
                    </tr>
                `
            }
            table+=`
                    </tobody> 
                </table>
            `
            const tableLogs = Swal.mixin({
                customClass:{
                    "htmlContainer": "conciliationTable__container",
                    "closeButton": "conciliationTable__close",
                    "footer": "conciliationTable__footer"
                }
            })
            await tableLogs.fire({                
                showCloseButton: true,
                // showCancelButton: true,
                reverseButtons: true,
                confirmButtonColor: "#f2711c",
                confirmButtonText: "OK",
                footer: "Acciones realizadas en la hora local",
                // cancelButtonText: `${titles.conciliation.parameters.modal_download}`,
                // cancelButtonColor: "#354a5e",
                width: "650px",
                html: table
            }).then((response)=>{
                if(response.dismiss === Swal.DismissReason.cancel){
                    //llamar a ms para descargar traza completa                    
                }
            })
        }
        // else{
        //     Swal.fire({
        //         icon: "error",
        //         title: `${titles.conciliation.parameters.dispersion_not_found}`
        //     })
        // }
    }
    if(day_name === "Sat" || day_name === "Fri"){
        return (
            <>
                <span onClick={()=>{}} style={{display: "flex", justifyContent:"center", width: "100%", color: "#354a5e", fontSize: "1.22rem", fontWeight: "bold"}} >
                    N/A
                </span>
               
            </>
        )     
    }else{
        return (
            <>
                <span onClick={()=>{showLogs()}} className="conciliationTable__download">
                    <SvgWrapper id={svgs.clock} className="svg svg--small"/>
                </span>
               
            </>
        );
    }
}
