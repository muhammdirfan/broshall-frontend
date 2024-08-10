import * as React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Notify from "simple-notify";
import { FiExternalLink } from "react-icons/fi";
import { formattedDate } from "utils";
import CustomPagination from "components/pagination";
import { fetchAllStudents } from "services/directoryAPis";
import Widget from "components/widget/Widget";
import { MdPerson3 } from "react-icons/md";

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
  { field: "fullName", headerName: "Student Name", width: 200 },
  { field: "email", headerName: "Email", width: 200 },
  { field: "city", headerName: "City", width: 200 },
  {
    field: "location",
    headerName: "Location",
    width: 100,
    renderCell: (params) => (
      <div className="flex items-center">
        <FiExternalLink
          size={24}
          className="cursor-pointer"
          onClick={() =>
            window.open(
              `https://www.google.com/maps/search/?api=1&query=${params.row.address}${params.row.pincode}`
            )
          }
        />
      </div>
    ),
  },
  { field: "state", headerName: "State", width: 150 },
  { field: "country", headerName: "Country", width: 150 },
  { field: "usertype", headerName: "Type", width: 150 },
  {
    field: "registerationDate",
    headerName: "Date of Register",
    width: 150,
    renderCell: (params) => (
      <div>{formattedDate(params?.row?.registerationDate, dateOptions)}</div>
    ),
  },
  { field: "phone", headerName: "Phone", width: 200 },
  { field: "otp", headerName: "OTP", width: 80 },
  { field: "pincode", headerName: "Pincode", width: 200 },
];

const VISIBLE_FIELDS = [
  // "profilePic",
  "fullName",
  "city",
  "country",
  "registerationDate",
  "email",
  "location",
  "otp",
  "phone",
  "pincode",
  "state",
  "usertype",
];

export default function AllStudents() {
  const [allStudents, setAllStudents] = React.useState([]);
  const [isLoading, setIsloading] = React.useState(false);
  const [pageNumber, setPageNumber] = React.useState(1);

  const columns = React.useMemo(
    () =>
      customColumns.filter((column) => VISIBLE_FIELDS.includes(column.field)),
    [customColumns]
  );

  const getAllStudents = async (pageNo) => {
    try {
      setIsloading(true);
      const allStudents = await fetchAllStudents(pageNo);
      setAllStudents(allStudents?.data?.reverse());
      if (allStudents?.status == "success") {
        setIsloading(false);
        new Notify({
          status: "success",
          title: "Success",
          text: allStudents?.message,
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
    getAllStudents(pageNumber);
  }, []);

  const dataWithIds = allStudents.map((row, index) => ({
    ...row,
    id: index + 1, // You can use any method to generate a unique id
  }));

  const handlePagination = (direction) => {
    if (direction === "back") {
      if (pageNumber > 1) {
        setPageNumber(pageNumber - 1);
        getAllStudents(pageNumber - 1);
      }
    } else {
      if (allStudents?.length) {
        setPageNumber(pageNumber + 1);
        getAllStudents(pageNumber + 1);
      }
    }
  };

  return (
    <div>
      <div className="my-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        <Widget
          icon={<MdPerson3 className="h-7 w-7" />}
          title={"Total Students"}
          subtitle={allStudents?.length || "0"}
        />
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
        />
        <CustomPagination
          handlePagination={handlePagination}
          loading={isLoading}
          pageNumber={pageNumber}
        />
      </div>
    </div>
  );
}
