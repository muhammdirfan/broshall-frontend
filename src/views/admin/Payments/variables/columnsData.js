import EmployeeName from "components/EmployeeName";
import ProjectName from "components/ProjectName";
import { formatDate } from "utils";

export const columnsDataComplex = [
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
  {
    field: "pay_to",
    headerName: "Payment To Name",
    width: 250,
    renderCell: (params) => (
      <div className="overflow-hidden text-ellipsis whitespace-normal break-words">
        {!params.value ? (
          "Available"
        ) : (
          <EmployeeName employeeId={params.value} />
        )}
      </div>
    ),
  },
];

export const VISIBLE_FIELDS = [
  "payment_name",
  "payment_id",
  "payment_type",
  "contract_role",
  "payment_amount",
  "payment_account",
  "joining_date",
  "job_status",
  "payment_date",
  "payment_project",
  "payment_status",
  "to_account",
  "pay_to",
];
