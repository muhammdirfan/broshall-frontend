import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Button } from "flowbite-react";
import React from "react";

const SimpleTable = (props) => {
  const { tableData, tableHeader, columnsData, handleItemRemove } = props;

  // Define custom action renderers
  const renderRemoveButton = (params) => (
    <Button
      className="mx-1 rounded px-1 hover:cursor-pointer hover:bg-gray-300"
      onClick={() => handleItemRemove(params.row._id)}
    >
      Remove Item
    </Button>
  );

  const columns = React.useMemo(() => {
    return [
      ...columnsData.filter((column) => column.field),
      {
        field: "actions",
        headerName: "ACTIONS",
        width: 150,
        renderCell: (params) => (
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            {renderRemoveButton(params)}
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
          className="bg-white text-black dark:border-gray-700 dark:!bg-navy-700 dark:text-white"
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
