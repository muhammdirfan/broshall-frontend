import * as React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Button } from "flowbite-react";
import { MdDelete, MdDownloading, MdEdit } from "react-icons/md";
import { Modal } from "flowbite-react";
import EditModal from "./editModal";

export default function CheckTable(props) {
  const { tableData, tableHeader, columnsData, VISIBLE_FIELDS } = props;
  const [openModal, setOpenModal] = React.useState(false);
  const [paginationModel, setPaginationModel] = React.useState({
    pageSize: 25,
    page: 0,
  });

  // Define custom action renderers
  const renderEditButton = (params) => (
    <MdEdit
      className="mx-1 h-6 w-6 rounded p-1 hover:cursor-pointer hover:bg-gray-300"
      onClick={() => handleModal("Edit", params?.row?.linkedId)}
    />
  );

  const renderDeleteButton = (params) => (
    <MdDelete
      className="mx-1 h-6 w-6 rounded p-1 hover:cursor-pointer hover:bg-gray-300"
      onClick={() => handleModal("Delete", params.row.linkedId)}
    />
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
      ...columnsData.filter((column) => VISIBLE_FIELDS.includes(column.field)),
      !VISIBLE_FIELDS?.includes("action") && {
        field: "actions",
        headerName: "ACTIONS",
        width: 120,
        renderCell: (params) => (
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            {renderEditButton(params)}
            {renderDeleteButton(params)}
          </div>
        ),
      },
    ];
  }, [columnsData]);

  const getRowId = (row) => row._id;

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
        <DataGrid
          rows={tableData}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
            },
          }}
          // disableColumnFilter
          sx={{
            boxShadow: 0,
            border: 0,
            "& .MuiDataGrid-cell:hover": {
              color: "primary.main",
            },
          }}
          disableColumnSelector
          disableDensitySelector
          getRowId={getRowId}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          className="bg-white text-black dark:border-gray-700 dark:!bg-navy-700 dark:text-white"
        />
      </div>
      <Modal
        dismissible
        show={openModal}
        onClose={() => setOpenModal(false)}
        size={props.modalData?.type === "Edit" ? "4xl" : "xl"}
      >
        <Modal.Header>{`${props.modalData?.type} ${props.tableFor}`}</Modal.Header>
        <Modal.Body>
          {props.modalData?.type === "Delete" ? (
            <div>
              <h2>{`Are you sure you want to ${props.modalData?.type} this Link`}</h2>
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
          ) : (
            <EditModal
              professions={props.professions}
              professionsLinks={props.professionsLinks}
              selected={props.modalData?.id}
              data={tableData}
              tableFor={props.tableFor}
              selectedProfession={props.selectedProfession}
              handleProfessionChange={props.handleProfessionChange}
              selectedAssociates={props?.selectedAssociates}
              handleAssociatesChange={props.handleAssociatesChange}
            />
          )}
        </Modal.Body>
        {props.modalData?.type === "Edit" ? (
          <Modal.Footer>
            <Button
              onClick={() => {
                props.handleUpdate(props.modalData?.id);
              }}
            >
              {`${props.isLoading ? "loading..." : "Update"}`}
            </Button>
          </Modal.Footer>
        ) : null}
      </Modal>
    </>
  );
}
