import ProjectName from "components/ProjectName";
import { formatDate } from "utils";

export const columnsDataComplex = [
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
    field: "",
    headerName: "Employee Status",
    width: 300,
    renderCell: (params) => (
      <div className="overflow-hidden text-ellipsis whitespace-normal break-words">
        {!params.row.projects?.length ? (
          "Available"
        ) : (
          <ProjectName projectId={params.row.projects[0]} />
        )}
      </div>
    ),
  },
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
  "",
  "end_date",
];

export const columnsDataSpeciality = [
  { field: "name", headerName: "SPECIALITY", width: 350 },
  { field: "type", headerName: "RELATED PROFESSION", width: 250 },
  { field: "status", headerName: "STATUS", width: 150 },
  { field: "total", headerName: "TOTAL", width: 200 },
];

export const paymentColumns = [
  {
    field: "payment_id",
    headerName: "Payment Id",
    width: 100,
    renderCell: (params) => (
      <div className="overflow-hidden text-ellipsis whitespace-normal break-words">
        {params.value}
      </div>
    ),
  },
  {
    field: "payment_type",
    headerName: "Payment Type",
    width: 130,
    renderCell: (params) => (
      <div className="overflow-hidden text-ellipsis whitespace-normal break-words">
        {params.value}
      </div>
    ),
  },
  {
    field: "payment_amount",
    headerName: "Payment Amount",
    width: 150,
    renderCell: (params) => (
      <div className="overflow-hidden text-ellipsis whitespace-normal break-words">
        {params.value}
      </div>
    ),
  },
  {
    field: "payment_account",
    headerName: "Payment Account",
    width: 160,
    renderCell: (params) => (
      <div className="overflow-hidden text-ellipsis whitespace-normal break-words">
        {params.value}
      </div>
    ),
  },
  {
    field: "payment_date",
    headerName: "Payment Date",
    width: 130,
    renderCell: (params) => formatDate(params.value),
  },
  {
    field: "payment_project",
    headerName: "Payment Project",
    width: 250,
    renderCell: (params) => (
      <div className="overflow-hidden text-ellipsis whitespace-normal break-words">
        {!params.value ? "Available" : <ProjectName projectId={params.value} />}
      </div>
    ),
  },
  {
    field: "payment_status",
    headerName: "Payment Status",
    width: 120,
    renderCell: (params) => (
      <div className="overflow-hidden text-ellipsis whitespace-normal break-words">
        {params.value}
      </div>
    ),
  },
  {
    field: "to_account",
    headerName: "Payment To Account",
    width: 170,
    renderCell: (params) => (
      <div className="overflow-hidden text-ellipsis whitespace-normal break-words">
        {params.value}
      </div>
    ),
  },
];
