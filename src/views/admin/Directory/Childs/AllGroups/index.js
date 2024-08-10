import * as React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Notify from "simple-notify";
import { formattedDate } from "utils";
import CustomPagination from "components/pagination";
import { fetchAllGroups } from "services/directoryAPis";
import Widget from "components/widget/Widget";
import { MdDelete, MdGroup } from "react-icons/md";
import { deleteGroup } from "services/directoryAPis";
import { Button, Modal } from "flowbite-react";

const dateOptions = {
  year: "numeric",
  month: "short",
  day: "numeric",
};

const customColumns = [
  // {
  //   field: "profilePic",
  //   headerName: "Profile",
  //   width: 150,
  //   renderCell: (params) => (
  //     <div className="flex items-center">
  //       <img src={params?.row?.profilePic} width={100} />
  //     </div>
  //   ),
  // },
  { field: "groupName", headerName: "Group Name", width: 200 },
  {
    field: "groupMembers",
    headerName: "Group Member",
    width: 200,
    renderCell: (params) => (
      <div className="">
        {params?.row?.groupMembers?.map((item) => (
          <p key={item?.id}>
            {item?.fullName} (<span>{item?.speciality}</span>)
          </p>
        ))}
      </div>
    ),
  },
  { field: "groupRules", headerName: "Group Rules", width: 250 },
  { field: "groupStatus", headerName: "Group Status", width: 120 },
  { field: "groupType", headerName: "Group Type", width: 120 },
  { field: "groupDescription", headerName: "Group Description", width: 250 },
  { field: "notifyTo", headerName: "Notify To", width: 100 },
  {
    field: "groupCreatedOn",
    headerName: "Created On",
    width: 100,
    renderCell: (params) => (
      <div>{formattedDate(params?.row?.groupCreatedOn, dateOptions)}</div>
    ),
  },
];

const VISIBLE_FIELDS = [
  // "profilePic",
  "groupName",
  "groupMembers",
  "groupRules",
  "groupStatus",
  "groupDescription",
  "groupCreatedOn",
  "groupType",
  "notifyTo",
  "",
];

export default function AllGroups() {
  const [allGroups, setAllGroups] = React.useState([]);
  const [isLoading, setIsloading] = React.useState(false);
  const [pageNumber, setPageNumber] = React.useState(1);
  const [openModal, setOpenModal] = React.useState(false);
  const [itemId, setItemId] = React.useState(null);

  const columns = React.useMemo(() => {
    return [
      ...customColumns.filter((column) =>
        VISIBLE_FIELDS.includes(column.field)
      ),
      !VISIBLE_FIELDS?.includes("action") && {
        field: "actions",
        headerName: "ACTIONS",
        width: 100,
        renderCell: (params) => (
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            {renderDeleteButton(params)}
          </div>
        ),
      },
    ];
  }, [customColumns]);

  // Define custom action renderers
  const renderDeleteButton = (params) => (
    <MdDelete
      className="mx-1 h-6 w-6 rounded p-1 hover:cursor-pointer hover:bg-gray-300"
      onClick={() => handleModal(params.row.groupId)}
    />
  );

  const handleModal = (id) => {
    setOpenModal(true);
    setItemId(id);
  };

  const handleDelete = async (id) => {
    try {
      const deleted = await deleteGroup(id);
      if (deleted?.status === "success") {
        setIsloading(false);
        new Notify({
          status: "success",
          title: "Success",
          text: deleted?.message,
          effect: "fade",
          speed: 300,
          customClass: null,
          customIcon: null,
          showIcon: true,
          showCloseButton: true,
          autoclose: true,
          autotimeout: 3000,
          gap: 20,
          distance: 20,
          type: 1,
          position: "left bottom",
        });
        setOpenModal(false);
        getAllGroups(pageNumber);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllGroups = async (pageNo) => {
    try {
      setIsloading(true);
      const allGroups = await fetchAllGroups(pageNo);
      setAllGroups(allGroups?.data?.reverse());
      if (allGroups?.status == "success") {
        setIsloading(false);
        new Notify({
          status: "success",
          title: "Success",
          text: allGroups?.message,
          effect: "fade",
          speed: 300,
          customClass: null,
          customIcon: null,
          showIcon: true,
          showCloseButton: true,
          autoclose: true,
          autotimeout: 3000,
          gap: 20,
          distance: 20,
          type: 1,
          position: "right bottom",
        });
      }
    } catch (error) {
      setIsloading(false);
      console.log(error);
    }
  };

  React.useEffect(() => {
    getAllGroups(pageNumber);
  }, []);

  const dataWithIds = allGroups.map((row, index) => ({
    ...row,
    id: index + 1, // You can use any method to generate a unique id
  }));

  const handlePagination = (direction) => {
    if (direction === "back") {
      if (pageNumber > 1) {
        setPageNumber(pageNumber - 1);
        getAllGroups(pageNumber - 1);
      }
    } else {
      if (allGroups?.length) {
        setPageNumber(pageNumber + 1);
        getAllGroups(pageNumber + 1);
      }
    }
  };

  return (
    <>
      <div>
        <div className="my-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          <Widget
            icon={<MdGroup className="h-7 w-7" />}
            title={"Total Groups"}
            subtitle={allGroups?.length || "0"}
          />
          {/* <Widget
          icon={<IoDocuments className="h-6 w-6" />}
          title={"HCP specialities"}
          subtitle={"0"}
        />
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={"HCP Countries"}
          subtitle={"0"}
        /> */}
        </div>
        <div
          style={{
            height: 700,
            width: "100%",
            backgroundColor: "#fff",
            padding: "10px 10px 40px 10px",
            borderRadius: "10px",
          }}
        >
          <DataGrid
            rows={dataWithIds}
            columns={columns}
            components={{ Toolbar: GridToolbar }}
            height="50vh"
            slotProps={{
              toolbar: {
                showQuickFilter: true,
              },
            }}
            // disableColumnFilter
            disableColumnSelector
            loading={isLoading}
            disableDensitySelector
            rowHeight={160}
          />
          <CustomPagination
            handlePagination={handlePagination}
            loading={isLoading}
            pageNumber={pageNumber}
          />
        </div>
      </div>
      <Modal
        dismissible
        show={openModal}
        onClose={() => setOpenModal(false)}
        size={"xl"}
      >
        <Modal.Header>Delete Post</Modal.Header>
        <Modal.Body>
          <div>
            <h2>{`Are you sure you want to Delete this Post`}</h2>
            <div className="mt-4 flex justify-center">
              <Button
                className="mx-2 bg-red-600 hover:bg-red-600"
                onClick={() => {
                  handleDelete(itemId);
                }}
              >
                {`${isLoading ? "loading..." : "Delete"}`}
              </Button>
              <Button className="mx-2" onClick={() => setOpenModal(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
