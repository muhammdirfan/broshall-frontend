import * as React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import InputField from "components/fields/InputField";
import Notify from "simple-notify";
import moment from "moment";
import { FiExternalLink } from "react-icons/fi";
import CustomPagination from "components/pagination";
import { fetchAllEstablishment } from "services/directoryAPis";
import Widget from "components/widget/Widget";
import { MdBuild, MdHouse } from "react-icons/md";

const customColumns = [
  { field: "estblismentName", headerName: "Estblisment Name", width: 200 },
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
  { field: "type", headerName: "Type", width: 200 },
  { field: "dateofregister", headerName: "Date of Register", width: 150 },
  { field: "phone", headerName: "Phone", width: 200 },
  { field: "otp", headerName: "OTP", width: 80 },
  { field: "pincode", headerName: "Pincode", width: 200 },
];

const VISIBLE_FIELDS = [
  "estblismentName",
  "city",
  "country",
  "dateofregister",
  "email",
  "location",
  "otp",
  "phone",
  "pincode",
  "state",
  "type",
];

export default function AllEstishments() {
  const [allEstablishments, setAllEstablishments] = React.useState([]);
  const [isLoading, setIsloading] = React.useState(false);
  const [pageNumber, setPageNumber] = React.useState(1);

  const columns = React.useMemo(
    () =>
      customColumns.filter((column) => VISIBLE_FIELDS.includes(column.field)),
    [customColumns]
  );

  const getAllestablishments = async (pageNo) => {
    try {
      setIsloading(true);
      const allestablishments = await fetchAllEstablishment(pageNo);
      setAllEstablishments(allestablishments?.data?.reverse());
      if (allestablishments?.status == "success") {
        setIsloading(false);
        new Notify({
          status: "success",
          title: "Success",
          text: allestablishments?.message,
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
    getAllestablishments(pageNumber);
  }, []);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const formattedDate = moment(date).format("DD-MM-YYYY");
    return formattedDate;
  };

  const dataWithIds = allEstablishments.map((row, index) => ({
    ...row,
    dateofregister: formatDate(Number(row?.dateofregister)),
    id: index + 1, // You can use any method to generate a unique id
  }));

  const handlePagination = (direction) => {
    if (direction === "back") {
      if (pageNumber > 1) {
        setPageNumber(pageNumber - 1);
        getAllestablishments(pageNumber - 1);
      }
    } else {
      if (allEstablishments?.length) {
        setPageNumber(pageNumber + 1);
        getAllestablishments(pageNumber + 1);
      }
    }
  };

  return (
    <div>
      <div className="my-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        <Widget
          icon={<MdHouse className="h-7 w-7" />}
          title={"Total Establishments"}
          subtitle={allEstablishments?.length || "0"}
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
          loading={isLoading}
          disableColumnSelector
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
