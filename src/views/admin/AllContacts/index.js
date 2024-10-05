import * as React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Notify from "simple-notify";
import moment from "moment";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { formattedDate } from "utils";
import Widget from "components/widget/Widget";
import { MdEvent } from "react-icons/md";
import { FetchAllContacts } from "services/contactsAPis";
import { Modal } from "flowbite-react";
import ContactModel from "./components/ContactModel";
import { capitalize } from "@mui/material";
import DeleteModel from "./components/DeleteModel";
import { DeleteContact } from "services/contactsAPis";
import EditModel from "./components/EditModel";

const dateOptions = {
  year: "numeric",
  month: "short",
  day: "numeric",
};

const customColumns = [
  { field: "name", headerName: "Name", width: 200 },
  { field: "email", headerName: "Email Address", width: 250 },
  { field: "phone", headerName: "Phone Number", width: 200 },
  {
    field: "createdAt",
    headerName: "Created Date",
    width: 150,
    renderCell: (params) => (
      <div>{formattedDate(params?.row?.updatedAt, dateOptions)}</div>
    ),
  },
  {
    field: "updatedAt",
    headerName: "Updated Date",
    width: 150,
    renderCell: (params) => (
      <div>{formattedDate(params?.row?.updatedAt, dateOptions)}</div>
    ),
  },
  // {
  //   field: "edit",
  //   headerName: "Edit",
  //   width: 150,
  //   renderCell: (params) => (
  //     <div>
  //       <FiEdit
  //         size={18}
  //         onClick={() => handleSelect(true, "edit", params.id)}
  //         className="cursor-pointer"
  //       />
  //     </div>
  //   ),
  // },
  // {
  //   field: "delete",
  //   headerName: "Delete",
  //   width: 150,
  //   renderCell: (params) => (
  //     <div>
  //       <FiTrash2
  //         size={18}
  //         onClick={() => handleSelect(true, "delete", params.id)}
  //         className="cursor-pointer"
  //       />
  //     </div>
  //   ),
  // },
];

const VISIBLE_FIELDS = [
  "name",
  "email",
  "phone",
  "createdAt",
  "updatedAt",
  "edit",
  "delete",
];

export default function AllContacts() {
  const [allContacts, setAllContacts] = React.useState([]);
  const [isLoading, setIsloading] = React.useState(false);
  const [openContactModal, setOpenContactModal] = React.useState(false);
  const [EditModelOpen, setEditModelOpen] = React.useState({
    open: false,
    type: "",
    id: null,
  });

  // const columns = React.useMemo(
  //   () =>
  //     customColumns.filter((column) => VISIBLE_FIELDS.includes(column.field)),
  //   [customColumns]
  // );

  const columns = React.useMemo(() => {
    return [
      ...customColumns.filter((column) =>
        VISIBLE_FIELDS.includes(column.field)
      ),
      {
        field: "edit",
        headerName: "Edit",
        width: 150,
        renderCell: (params) => (
          <div>
            <FiEdit
              size={18}
              onClick={() => handleSelect(true, "edit", params.row._id)}
              className="cursor-pointer"
            />
          </div>
        ),
      },
      {
        field: "delete",
        headerName: "Delete",
        width: 150,
        renderCell: (params) => (
          <div>
            <FiTrash2
              size={18}
              onClick={() => handleSelect(true, "delete", params.row._id)}
              className="cursor-pointer"
            />
          </div>
        ),
      },
    ];
  }, [customColumns]);

  const handleSelect = (open, type, id) => {
    console.log(open, type, id);
    setEditModelOpen({ open: open, type: type, id: id });
  };

  const getAllContacts = async () => {
    try {
      setIsloading(true);
      const allContacts = await FetchAllContacts();
      setAllContacts(allContacts?.reverse());
      if (allContacts) {
        setIsloading(false);
        // new Notify({
        //   status: "success",
        //   title: "Success",
        //   text: allContacts?.message,
        //   effect: "fade",
        //   speed: 300,
        //   customClass: null,
        //   customIcon: null,
        //   showIcon: true,
        //   showCloseButton: true,
        //   autoclose: true,
        //   autotimeout: 3000,
        //   gap: 20,
        //   distance: 20,
        //   type: 1,
        //   position: "right bottom",
        // });
      }
    } catch (error) {
      new Notify({
        status: "error",
        title: error?.response?.data.title,
        text: error?.response?.data?.message,
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
      setIsloading(false);
    }
  };

  React.useEffect(() => {
    getAllContacts();
  }, []);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const formattedDate = moment(date).format("DD-MM-YYYY");
    return formattedDate;
  };

  const dataWithIds = allContacts.map((row, index) => ({
    ...row,
    dateofregister: formatDate(Number(row?.dateofregister)),
    id: index + 1, // You can use any method to generate a unique id
  }));

  const handleDelete = async (id) => {
    try {
      const deleteContact = await DeleteContact(id);
      if (deleteContact) {
        new Notify({
          status: "success",
          title: "Success",
          text: `Successfully deleted ${deleteContact.name}`,
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
        setEditModelOpen({ open: false, type: "", id: null });
        getAllContacts();
      }
    } catch (error) {
      new Notify({
        status: "error",
        title: error?.response?.data.title,
        text: error?.response?.data?.message,
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
  };

  return (
    <div>
      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-12 my-3 gap-5 md:grid-cols-4 lg:col-span-4">
          <Widget
            icon={<MdEvent className="h-7 w-7" />}
            title={"Total Contacts"}
            subtitle={allContacts?.length || "0"}
          />
        </div>
        <div className="col-span-12 my-3 gap-5 md:grid-cols-4 lg:col-span-4">
          <div className="rounded-[20px] bg-white px-3 py-2">
            <button
              onClick={() => setOpenContactModal(true)}
              className="linear mt-5 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
            >
              Add New Contact
            </button>
          </div>
        </div>
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
          // height="50vh"
          slotProps={{
            toolbar: {
              showQuickFilter: true,
            },
          }}
          disableColumnSelector
          loading={isLoading}
          disableDensitySelector
          rowHeight={80}
        />
      </div>
      <Modal
        dismissible
        show={openContactModal}
        onClose={() => setOpenContactModal(false)}
        size={"4xl"}
        className="w-10/12 md:w-full"
      >
        <Modal.Header>Add New Contact</Modal.Header>
        <Modal.Body>
          <ContactModel
            setOpenContactModal={setOpenContactModal}
            fetchFreshData={getAllContacts}
          />
        </Modal.Body>
      </Modal>

      <Modal
        dismissible
        show={EditModelOpen.open}
        onClose={() => setEditModelOpen({ open: false, type: "", id: null })}
        size={EditModelOpen.type == "edit" ? "4xl" : "xl"}
        className="w-10/12 md:w-full"
      >
        <Modal.Header>
          {capitalize(EditModelOpen.type)} the Contact
        </Modal.Header>
        <Modal.Body>
          {EditModelOpen.type == "edit" ? (
            <EditModel
              id={EditModelOpen.id}
              allContacts={allContacts}
              setOpenContactModal={setEditModelOpen}
              fetchFreshData={getAllContacts}
              onCancel={setEditModelOpen}
            />
          ) : (
            <DeleteModel
              id={EditModelOpen.id}
              onCancel={setEditModelOpen}
              handleDelete={handleDelete}
            />
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
}
