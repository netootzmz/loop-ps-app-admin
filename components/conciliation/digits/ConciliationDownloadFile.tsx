import React, { FC } from 'react';
// import customFetch from '../../../helpers/customFetch';
// import Swal from "sweetalert2";
// import { iDownloadConciliationFileReq } from '../../../@types/api/req';
// import { iDownloadConciliationFileRes } from '../../../@types/api/res';
// import { saveAs } from "file-saver";
import SvgWrapper from '../../SvgWrapper';
import svgs from '../../../helpers/svgs';

export const ConciliationDownloadFile: FC<{
    rowVal: any, 
    bank: string, 
    titles: Partial<any & {}>
}> = ({
}) => {
    // let acquirer: number;
    // console.log(moment(rowVal.fechatxn).format("YYYY-MM-DD"));
    const downloadFile = (typeReport: string) => {
        console.log(typeReport);
        // if(bank === "BANORTE"){
        //     acquirer = 3;
        // }else if(bank === "ACENDO"){
        //     acquirer = 1;
        // }else{
        //     acquirer = 2;
        // }
        // Swal.fire({
        //     icon: "question",
        //     title: `${titles.conciliation.parameters.question_download}`,
        //     reverseButtons: true,
        //     showCancelButton: true,
        //     confirmButtonText: `${titles.conciliation.parameters.confirm_download}`,
        //     confirmButtonColor: "#f2711c",
        //     cancelButtonText: `${titles.conciliation.parameters.deny_download}`,
        //     cancelButtonColor: "#ababab"
        // }).then(async(response)=>{
        //     if(response.isConfirmed){
        //         console.log(rowVal);
        //         Swal.fire({
        //             title: `${titles.conciliation.parameters.processing}`,
        //             backdrop: `
        //           rgba(0,0,123,0.4)
        //           left top
        //           no-repeat
        //         `,
        //             allowOutsideClick: false,
        //             didOpen: () => {
        //               Swal.showLoading();
        //             },
        //         });    
        //         await customFetch<iDownloadConciliationFileReq, iDownloadConciliationFileRes>(
        //             "conciliation/getConciliationFile",
        //             true,
        //             "POST",
        //             {
        //                 acquirer_id: acquirer,
        //                 transaction_date: rowVal.fechatxn,
        //                 typeReport: typeReport  
        //             }
        //         ).then((response)=>{
        //             Swal.close();
        //             if(response.code === "200"){
        //                 var bitmap = Buffer.from(response.fileContent.fileArray, "base64");
        //                 saveAs(
        //                     new Blob([bitmap], { type: "application/octet-stream" }),
        //                     response.fileContent.name
        //                 )
        //                 Swal.fire({
        //                     icon: "success",
        //                     title: `${titles.conciliation.parameters.success}`,
        //                     text: `${titles.conciliation.parameters.success_download}`,
        //                     timer: 2000
        //                 });
        //             }else{
        //                 Swal.fire({
        //                     icon: "error",
        //                     title: `${titles.conciliation.parameters.error}`,
        //                     text: `${titles.conciliation.parameters.error_download}`,
        //                     timer: 3000
        //                 })
        //             }
        //         }).catch((error)=>{
        //             Swal.close();
        //             if(error.code === "200"){
        //                 var bitmap = Buffer.from(error.fileContent.fileArray, "base64");
        //                 saveAs(
        //                     new Blob([bitmap], { type: "application/octet-stream" }),
        //                     error.fileContent.name
        //                 )
        //                 Swal.fire({
        //                     icon: "success",
        //                     title: `${titles.conciliation.parameters.success}`,
        //                     text: `${titles.conciliation.parameters.success_download}`,
        //                     timer: 2000
        //                 });
        //             }else{
        //                 Swal.fire({
        //                     icon: "error",
        //                     title: `${titles.conciliation.parameters.error}`,
        //                     text: `${titles.conciliation.parameters.error_download}`,
        //                     timer: 3000
        //                 })
        //             }
        //         })
        //     }
        // })
    }
    return(
        <span onClick={()=>{downloadFile("PROCESSED")}} className="conciliationTable__download">
            <SvgWrapper id={svgs.conciliationTableDownload} className="svg svg--samll" />
        </span>
    )

}
