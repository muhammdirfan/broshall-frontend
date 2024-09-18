import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import React from "react";

const SimpleTable = (props) => {
  const { tableData, tableHeader, columnsData, handleDetails } = props;

  const columns = React.useMemo(() => {
    return [
      ...columnsData.filter((column) => column.field),
      {
        field: "actions",
        headerName: "ACTIONS",
        width: 100,
        renderCell: (params) => (
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            {/* {renderEditButton(params)}
            {renderDeleteButton(params)} */}
          </div>
        ),
      },
    ];
  }, [columnsData]);

  const getRowId = (row) => (row._id ? row._id : 1);
  return (
    <div
      style={{
        height: 500,
        backgroundColor: "#fff",
        padding: "10px 10px 40px 10px",
        borderRadius: "10px",
      }}
    >
      <div className="flex w-full items-center justify-between text-xl font-bold text-navy-700 dark:text-white">
        <p className="pb-3">{tableHeader}</p>
      </div>
      {tableData?.length ? (
        <DataGrid
          rows={tableData}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
            },
          }}
          disableColumnFilter
          disableColumnSelector
          disableDensitySelector
          getRowId={getRowId}
          //   paginationModel={paginationModel}
          //   onPaginationModelChange={setPaginationModel}
          rowHeight={50}
          //   onRowClick={handleDetails}
        />
      ) : (
        <div className="mt-5 flex items-center justify-center">
          <p>No Data found...</p>
        </div>
      )}
    </div>
  );
};

export default SimpleTable;
