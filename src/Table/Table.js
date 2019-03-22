import React, { useState } from 'react';
import PropTypes from 'prop-types';
import MUITable from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableFooter from '@material-ui/core/TableFooter';
import TableRow from '@material-ui/core/TableRow';
import { tableStyles } from './tableStyle';
import TableRowFilter from './TableRowFilter';
import TableHeader from './TableHeader';
import TableRows from './TableRows';
import TableToolbar from './TableToolbar';
import TablePagination from './TablePagination';
import { toolbarOptionsTypes } from './TablePropTypes';
import TableLoading from './TableLoading';
import {
  onChangeHeaderFilter,
  onChangePage,
  initializeColumns,
  isRemoteData,
} from './tableFunctions';
import { useInitialData, useUpdatePageData, useUpdateData } from './tableHooks';

const Table = props => {
  const {
    data: originalData,
    columns,
    options,
    selectedData,
    rowId,
    onSelectRow,
    actions,
    toolbarOptions,
    pagination,
    rowsPerPageOptions,
    rowsPerPage: rowsPerPageProp,
    page: pageProp,
    labelDisplayedRows,
    labelRowsPerPage,
    exportOptions,
  } = props;

  const classes = tableStyles();
  const [rowCount, setRowCount] = useState(0);
  const [data, setData] = useState([]);
  const [pageData, setPageData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([...selectedData]);
  const [tableColumns] = useState(initializeColumns(columns, options, actions));
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState(() => {
    const headerFilters = {};
    const rowsPerPage = rowsPerPageOptions.includes(rowsPerPageProp)
      ? rowsPerPageProp
      : rowsPerPageOptions[0];

    return {
      headerFilters,
      page: pageProp,
      rowsPerPage,
    };
  });

  useInitialData(originalData, setData);
  useUpdateData(originalData, setLoading, setData, filters, setRowCount);
  useUpdatePageData(isRemoteData(originalData), data, setPageData, filters);

  const paginationOptions = {
    rowsPerPageOptions,
    rowsPerPage: filters.rowsPerPage,
    page: filters.page,
    rowCount,
    pagination,
    onChangePage: onChangePage(setFilters),
    labelDisplayedRows,
    labelRowsPerPage,
    tableColumns,
  };

  const someColumnHasFilter = columns.some(
    ({ options: columnOptions = {} }) => columnOptions.filter
  );

  return (
    <div>
      <TableLoading loading={loading} />
      <TableToolbar
        options={toolbarOptions}
        selectedRows={selectedRows}
        selection={options.selection}
        exportOptions={exportOptions}
        data={data}
        columns={columns}
      />
      <MUITable className={classes.table}>
        <TableHeader
          columns={tableColumns}
          selectedRows={selectedRows}
          setSelectedRows={setSelectedRows}
          data={pageData}
          onSelectRow={onSelectRow}
          rowId={rowId}
        />
        <TableBody>
          <TableRowFilter
            rendered={someColumnHasFilter}
            columns={tableColumns}
            onChangeFilter={onChangeHeaderFilter(setFilters)}
          />
          <TableRows
            columns={tableColumns}
            data={pageData}
            rowId={rowId}
            selectedRows={selectedRows}
            setSelectedRows={setSelectedRows}
            onSelectRow={onSelectRow}
          />
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination {...paginationOptions} />
          </TableRow>
        </TableFooter>
      </MUITable>
    </div>
  );
};

Table.defaultProps = {
  data: [],
  onFilterData: null,
  options: {},
  selectedData: [],
  onSelectRow: null,
  actions: [],
  toolbarOptions: null,
  pagination: false,
  rowsPerPageOptions: [10, 20, 30],
  rowsPerPage: 10,
  page: 0,
  labelDisplayedRows: ({ from, to, count }) => `${from}-${to} of ${count}`,
  labelRowsPerPage: 'Rows per page:',
  exportOptions: null,
};

Table.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      field: PropTypes.string.isRequired,
      options: PropTypes.shape({
        filter: PropTypes.bool,
      }),
    })
  ).isRequired,
  data: PropTypes.oneOf(PropTypes.arrayOf(PropTypes.object), PropTypes.func),
  onFilterData: PropTypes.func,
  rowId: PropTypes.func.isRequired,
  options: PropTypes.shape({
    selection: PropTypes.bool,
  }),
  selectedData: PropTypes.arrayOf(PropTypes.object),
  onSelectRow: PropTypes.func,
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      tooltip: PropTypes.string,
      icon: PropTypes.object,
      onClick: PropTypes.func,
    })
  ),
  toolbarOptions: toolbarOptionsTypes,
  pagination: PropTypes.bool,
  rowsPerPageOptions: PropTypes.arrayOf(PropTypes.number),
  rowsPerPage: PropTypes.number,
  page: PropTypes.number,
  labelDisplayedRows: PropTypes.func,
  labelRowsPerPage: PropTypes.string,
  exportOptions: PropTypes.shape({
    exportFileName: PropTypes.string,
    exportTypes: PropTypes.arrayOf(
      PropTypes.shape({
        type: PropTypes.oneOf(['csv']),
        label: PropTypes.string,
        delimeter: PropTypes.string,
      })
    ),
  }),
};

export default Table;
