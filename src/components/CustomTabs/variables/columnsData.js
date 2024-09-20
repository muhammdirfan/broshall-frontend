import { formatDate } from "utils";

export const employeesColumns = [
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

export const machineryColumns = [
  {
    field: "name",
    headerName: "Name",
    width: 180,
    renderCell: (params) => (
      <div className="overflow-hidden text-ellipsis whitespace-normal break-words">
        {params.value}
      </div>
    ),
  },
  {
    field: "type",
    headerName: "Type",
    width: 150,
    renderCell: (params) => (
      <div className="overflow-hidden text-ellipsis whitespace-normal break-words">
        {params.value}
      </div>
    ),
  },
  {
    field: "model",
    headerName: "Model",
    width: 120,
    renderCell: (params) => (
      <div className="overflow-hidden text-ellipsis whitespace-normal break-words">
        {params.value}
      </div>
    ),
  },
  {
    field: "machine_no",
    headerName: "Machine Number",
    width: 150,
    renderCell: (params) => (
      <div className="overflow-hidden text-ellipsis whitespace-normal break-words">
        {params.value}
      </div>
    ),
  },
  {
    field: "owner",
    headerName: "Owner",
    width: 150,
    renderCell: (params) => (
      <div className="overflow-hidden text-ellipsis whitespace-normal break-words">
        {params.value}
      </div>
    ),
  },
  { field: "partner", headerName: "Partner (if any)", width: 150 },
  { field: "machine_value", headerName: "Machine Value", width: 150 },
  {
    field: "",
    headerName: "Machine Status",
    width: 150,
    renderCell: (params) => (
      console.log("params", params),
      (<div>{!params.row.projects?.length ? "Available" : "In use"}</div>)
    ),
  },
  {
    field: "createdAt",
    headerName: "Added At",
    width: 150,
    renderCell: (params) => formatDate(params.value),
  },
];

export const equipementColumns = [
  {
    field: "name",
    headerName: "Name",
    width: 180,
    renderCell: (params) => (
      <div className="overflow-hidden text-ellipsis whitespace-normal break-words">
        {params.value}
      </div>
    ),
  },
  {
    field: "type",
    headerName: "Type",
    width: 150,
    renderCell: (params) => (
      <div className="overflow-hidden text-ellipsis whitespace-normal break-words">
        {params.value}
      </div>
    ),
  },
  {
    field: "no_of_equipments",
    headerName: "No of Equipments",
    width: 180,
    renderCell: (params) => (
      <div className="overflow-hidden text-ellipsis whitespace-normal break-words">
        {params.value}
      </div>
    ),
  },
  {
    field: "ownerShip",
    headerName: "Owner",
    width: 180,
    renderCell: (params) => (
      <div className="overflow-hidden text-ellipsis whitespace-normal break-words">
        {params.value}
      </div>
    ),
  },
  {
    field: "",
    headerName: "Machine Status",
    width: 150,
    renderCell: (params) => (
      console.log("params", params),
      (<div>{!params.row.projects?.length ? "Available" : "In use"}</div>)
    ),
  },
  {
    field: "createdAt",
    headerName: "Added At",
    width: 200,
    renderCell: (params) => formatDate(params.value),
  },
];