import React, { FC, useMemo } from "react";
import { useTable, usePagination, useSortBy } from "react-table";
import { v4 as uuidv4 } from "uuid";

const Table: FC<{
  information: Array<object>;
  cols: Array<any>;
}> = ({ information, cols }) => {
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
    state: { pageIndex, pageSize },
  } = useTable(
    { columns, data, initialState: { pageIndex: 0 } },
    useSortBy,
    usePagination
  );

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
                    className="table__headers"
                    title={column.Header}
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
                  className="table__row"
                >
                  {row.cells.map((cell: any) => {
                    return (
                      <td
                        {...cell.getCellProps()}
                        key={uuidv4() + 1}
                        className="table__cell"
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
      
    </>
  );
};

export default Table;
