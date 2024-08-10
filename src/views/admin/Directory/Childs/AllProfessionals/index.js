import * as React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Notify from "simple-notify";
import moment from "moment";
import { FiExternalLink } from "react-icons/fi";
import { fetchAllProffesional } from "services/directoryAPis";
import Widget from "components/widget/Widget";
import { MdPerson } from "react-icons/md";

const customColumns = [
  { field: "fullName", headerName: "Profession Name", width: 200 },
  { field: "speciality", headerName: "Speciality", width: 200 },
  { field: "email", headerName: "Email", width: 150 },
  { field: "city", headerName: "City", width: 150 },
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
  { field: "dateofregister", headerName: "Date of Register", width: 150 },
  { field: "phone", headerName: "Phone", width: 200 },
  { field: "otp", headerName: "OTP", width: 80 },
  { field: "pincode", headerName: "Pincode", width: 200 },
];

const VISIBLE_FIELDS = [
  "fullName",
  "speciality",
  "city",
  "country",
  "dateofregister",
  "email",
  "location",
  "otp",
  "phone",
  "pincode",
  "state",
  "usertype",
];

export default function AllProfessionals() {
  const [allProfessionals, setAllProfessallProfessionals] = React.useState([]);
  const [isLoading, setIsloading] = React.useState(false);
  // const [pageNumber, setPageNumber] = React.useState(1);
  const [searchData, setSearchData] = React.useState({
    name: "",
    speclity: "",
    email: "",
    city: "",
    country: "",
    location: "",
  });

  const columns = React.useMemo(
    () =>
      customColumns.filter((column) => VISIBLE_FIELDS.includes(column.field)),
    [customColumns]
  );

  const getAllProfessallProfessionals = async () => {
    try {
      setIsloading(true);
      const allProfessionals = await fetchAllProffesional();
      setAllProfessallProfessionals(allProfessionals?.data?.reverse());
      if (allProfessionals?.status == "success") {
        setIsloading(false);
        new Notify({
          status: "success",
          title: "Success",
          text: allProfessionals?.message,
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
    getAllProfessallProfessionals();
  }, []);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const formattedDate = moment(date).format("DD-MM-YYYY");
    return formattedDate;
  };

  const dataWithIds = allProfessionals.map((row, index) => ({
    ...row,
    dateofregister: formatDate(Number(row?.dateofregister)),
    id: index + 1, // You can use any method to generate a unique id
  }));


  return (
    <div>
      <div className="my-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        <Widget
          icon={<MdPerson className="h-7 w-7" />}
          title={"Total Professionals"}
          subtitle={allProfessionals?.length || "0"}
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
          // height="50vh"
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
      </div>
    </div>
  );
}
