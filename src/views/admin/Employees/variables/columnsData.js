import { formatDate } from "utils";

export const columnsDataComplex = [
  {
    field: "name",
    headerName: "Name",
    width: 200,
    renderCell: (params) => (
      <div className="overflow-hidden text-ellipsis whitespace-normal break-words">
        {params.value}
      </div>
    ),
  },
  {
    field: "email",
    headerName: "Email (if any)",
    width: 250,
    renderCell: (params) => (
      <div className="overflow-hidden text-ellipsis whitespace-normal break-words">
        {params.value}
      </div>
    ),
  },
  {
    field: "address",
    headerName: "Address",
    width: 250,
    renderCell: (params) => (
      <div className="overflow-hidden text-ellipsis whitespace-normal break-words">
        {params.value}
      </div>
    ),
  },
  {
    field: "contact_no",
    headerName: "Contact Number",
    width: 150,
    renderCell: (params) => (
      <div className="overflow-hidden text-ellipsis whitespace-normal break-words">
        {params.value}
      </div>
    ),
  },
  {
    field: "employee_type",
    headerName: "Employee Type",
    width: 150,
    renderCell: (params) => (
      <div className="overflow-hidden text-ellipsis whitespace-normal break-words">
        {params.value}
      </div>
    ),
  },
  { field: "designation", headerName: "Designation", width: 150 },
  {
    field: "joining_date",
    headerName: "Joining Date",
    width: 150,
    renderCell: (params) => formatDate(params.value),
  },
  { field: "duration", headerName: "Duration", width: 150 },
  {
    field: "end_date",
    headerName: "End Date",
    width: 150,
    renderCell: (params) => formatDate(params.value),
  },
];

export const VISIBLE_FIELDS = [
  "name",
  "email",
  "address",
  "contract_role",
  "contact_no",
  "employee_type",
  "designation",
  "joining_date",
  "duration",
  "end_date",
];

export const columnsDataSpeciality = [
  { field: "name", headerName: "SPECIALITY", width: 350 },
  { field: "type", headerName: "RELATED PROFESSION", width: 250 },
  { field: "status", headerName: "STATUS", width: 150 },
  { field: "total", headerName: "TOTAL", width: 200 },
];
