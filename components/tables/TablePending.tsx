import React, { FC, useMemo } from "react";
import Swal from "sweetalert2";
import { useTable, usePagination, useSortBy, useRowSelect } from 'react-table';
import { v4 as uuidv4 } from "uuid";
import customFetch from "../../helpers/customFetch";
import { iCustomResponse } from '../../@types/api/res';

const TablePending: FC<{
  information: Array<object>;
  cols: Array<any>;
  getInfo: any;
}> = ({ information, cols, getInfo }) => {
  const data = useMemo(() => information, [information]);
  const columns = useMemo(() => cols, [cols]);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    nextPage,
    previousPage,
    setPageSize,
    selectedFlatRows,
    state: { pageIndex, pageSize },
  } = useTable(
    { columns, data, initialState: { pageIndex: 0 } },
    useSortBy,
    usePagination,
    useRowSelect
  );
  const format = (num: number) => num.toLocaleString('en-US', {
    minimumFractionDigits: 2,      
    maximumFractionDigits: 2,
  });   

  const releasePayment = async() => {
    let releaseIds: Array<number> = [];
    let total: number = 0;
    selectedFlatRows.map(({values})=>{      
      releaseIds.push(values.payment_release);
      total += parseFloat(values.amount.split(" ")[0].split("$")[1].replaceAll(",", ""))
    });    
    if(releaseIds.length > 0){
      Swal.fire({
        imageUrl: '/warning.png',
        imageWidth: 70,
        imageHeight: 70,
        title: `Se seleccionaron ${releaseIds.length} operaciones, con un importe total de $${format(total)} \n ¿Estás seguro de ejecutar el proceso?`,
        showConfirmButton: true,
        confirmButtonText: "Sí, autorizar",
        confirmButtonColor: "#f2711c",
        showCancelButton: true,
        cancelButtonText: "No, cancelar",
        cancelButtonColor: "#ababab",
        reverseButtons: true
    }).then(async(result)=>{
      if(result.isConfirmed){
        await customFetch<Array<number>, iCustomResponse>(
          "dispersion/releasePayment",
          true,
          "POST",
          releaseIds
        ).then((response)=>{
          if(response.code === "OK"){
            getInfo();
          }
        }).catch((error)=>{
          if(error.code === "OK"){
            getInfo();
          }
        })
      }
    })
    }else{
      Swal.fire({
        icon: "warning",
        title: "Es necesario seleccionar al menos un registro para liberar"
      })
    }
  }

  return (
    <>
      <div className="card card--full card--table">
        <table {...getTableProps()} className="table">
          <thead>
            {headerGroups.map((headerGroup: any) => (
              <tr
                {...headerGroup.getHeaderGroupProps()}
                key={uuidv4() + 1}
                className="table__head"
              >
                {headerGroup.headers.map((column: any) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    key={uuidv4() + 1}
                    className="table__headers_pending"
                    title={column.Header}
                    style={{fontSize: "1.25rem", cursor: "pointer"}}                    
                  >
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row: any) => {
              prepareRow(row);
              return (
                <tr
                  {...row.getRowProps()}
                  key={uuidv4() + 1}
                  className="table__row conciliationTable__row__color"
                >
                  {row.cells.map((cell: any) => {
                    return (
                      <td
                        {...cell.getCellProps()}
                        key={uuidv4() + 1}
                        className="table__cell"
                        style={{fontSize:"1.22rem", fontWeight: "400"}}
                      >
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="pagination" style={{marginTop:"15px"}}>
        <span>Registros por página</span>
        <select
          className="table__range"
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50, 60].map((pageSize) => (
            <option key={uuidv4() + 1} value={pageSize}>
              {pageSize}
            </option>
          ))}
        </select>
        <span>
          {pageSize * (pageIndex + 1) - (9 + (pageSize - 10))} -{" "}
          {pageSize * (pageIndex + 1)} de {data.length}{" "}
        </span>
        <button
          className="table__button"
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
        >
          {"<"}
        </button>{" "}
        <button
          className="table__button table__button_right"
          onClick={() => nextPage()}
          disabled={!canNextPage}
        >
          {">"}
        </button>{" "}
      </div>
      <div className="dispersion__buttons" style={{marginTop:"20px"}}>
          <button
              className="btn btn--mailServer"
              onClick={()=>{releasePayment()}}
              type="button"
          >
              Procesar
          </button>
      </div>
      
    </>
  );
};

export default TablePending;
