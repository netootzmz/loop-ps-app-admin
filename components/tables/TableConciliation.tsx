import React, { FC, useMemo } from "react";
import { useTable, usePagination, useSortBy } from "react-table";
import { v4 as uuidv4 } from "uuid";

const TableConciliation: FC<{
  information: Array<object>;
  cols: Array<any>;
  titles: Partial<any & {}>;
}> = ({ information, cols, titles }) => {
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
      <div className="card card--full card--conciliation">
        <table {...getTableProps()} cellSpacing={0} className="table">
          <thead>
            <tr>
              <th></th>
              <th></th>
              <th></th>
              <th className="conciliationTable__headers" colSpan={4}>
                <h2>{titles.conciliation.parameters.table_conciliation}</h2>
              </th>
              <th
                className="conciliationTable__headers conciliationTable__headers__middle"
                colSpan={6}
              >
                <h2>{titles.conciliation.parameters.table_liquidation}</h2>
              </th>
              <th className="conciliationTable__headers" colSpan={2}>
                <h2>{titles.conciliation.parameters.table_total}</h2>
              </th>
            </tr>
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
                    className="table__conciliation conciliationTable__cell"
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
                        className="table__cell conciliationTable__cell conciliationTable__info"
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
      <div className="pagination" style={{ marginTop: "25px" }}>
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
      <div>&nbsp;</div>
    </>
  );
};

export default TableConciliation;
