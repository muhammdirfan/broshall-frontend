import * as React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Button } from "flowbite-react";
import { MdDelete, MdEdit } from "react-icons/md";
import { Modal } from "flowbite-react";

export default function CategoriesTable(props) {
  const {
    tableData,
    tableHeader,
    columnsData,
    VISIBLE_FIELDS,
    handleDetails,
    firstField,
  } = props;
  const [openModal, setOpenModal] = React.useState(false);
  const [paginationModel, setPaginationModel] = React.useState({
    pageSize: 25,
    page: 0,
  });

  // Define custom action renderers
  const renderEditButton = (params) => (
    <MdEdit
      className="mx-1 h-6 w-6 rounded p-1 hover:cursor-pointer hover:bg-gray-300"
      onClick={() => handleModal("Edit", params.row._id)}
    />
  );

  const renderDeleteButton = (params) => (
    <MdDelete
      className="mx-1 h-6 w-6 rounded p-1 hover:cursor-pointer hover:bg-gray-300"
      onClick={() => handleModal("Delete", params.row._id)}
    />
  );

  // const renderViewButton = (params) => (
  //   <IoMdEye
  //     className="mx-1 h-6 w-6 rounded p-1 hover:cursor-pointer hover:bg-gray-300"
  //     onClick={() => handleDetails(params.row._id)}
  //   />
  // );

  const renderViewButton = (params, firstField) =>
    firstField === "title" ? (
      <a href={`job-details/${params.row._id}`}>
        <div className="overflow-hidden text-ellipsis whitespace-normal break-words text-[#3b82f6] underline">
          {params.value}
        </div>
      </a>
    ) : (
      <div
        className="cursor-pointer overflow-hidden text-ellipsis whitespace-normal break-words text-[#3b82f6] underline"
        onClick={() => handleDetails(params.row._id)}
      >
        {params.value}
      </div>
    );

  const handleModal = (type, id) => {
    setOpenModal(!openModal);
    props.setModalData({
      type: type,
      id: id,
    });
  };

  React.useEffect(() => {
    props.isLoading && setOpenModal(false);
  }, [props.isLoading]);

  const columns = React.useMemo(() => {
    return [
      {
        field: `${firstField ? firstField : "name"}`,
        headerName: `${firstField ? firstField : "Name"}`,
        width: 200,
        renderCell: (params) => (
          <div className="overflow-hidden text-ellipsis whitespace-normal break-words">
            {renderViewButton(params, firstField)}
          </div>
        ),
      },
      ...columnsData.filter((column) => VISIBLE_FIELDS.includes(column.field)),
      {
        field: "actions",
        headerName: "ACTIONS",
        width: 100,
        renderCell: (params) => (
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            {renderEditButton(params)}
            {renderDeleteButton(params)}
          </div>
        ),
      },
    ];
  }, [columnsData]);

  const getRowId = (row) => (row._id ? row._id : 1);

  return (
    <>
      <div
        style={{
          height: 700,
          width: "100%",
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
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            rowHeight={90}
            checkboxSelection
            className="bg-white text-black dark:border-gray-700 dark:!bg-navy-700 dark:text-white"
          />
        ) : (
          <div className="mt-5 flex items-center justify-center">
            <p>No Data found...</p>
          </div>
        )}
      </div>
      <Modal
        dismissible
        show={props.modalData?.type === "Delete" && openModal}
        onClose={() => setOpenModal(false)}
        size={props.modalData?.type === "Edit" ? "4xl" : "xl"}
      >
        <Modal.Header>{`Delete ${props.tableFor}`}</Modal.Header>
        <Modal.Body>
          {props.modalData?.type === "Delete" ? (
            <div>
              <h2>{`Are you sure you want to Delete this Link`}</h2>
              <div className="mt-4 flex justify-center">
                <Button
                  className="mx-2 bg-red-600 hover:bg-red-600"
                  onClick={() => {
                    props.handleDelete(props.modalData?.id);
                  }}
                >
                  {`${props.isLoading ? "loading..." : "Delete"}`}
                </Button>
                <Button className="mx-2" onClick={() => setOpenModal(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          ) : null}
        </Modal.Body>
      </Modal>
    </>
  );
}
