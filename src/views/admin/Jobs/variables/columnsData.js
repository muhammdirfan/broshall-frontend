import { formatDate } from "utils";

export const columnsDataComplex = [
  {
    field: "type",
    headerName: "Type",
    width: 120,
    renderCell: (params) => (
      <div className="overflow-hidden text-ellipsis whitespace-normal break-words">
        {params.value}
      </div>
    ),
  },
  {
    field: "location",
    headerName: "Location",
    width: 150,
    renderCell: (params) => (
      <div className="overflow-hidden text-ellipsis whitespace-normal break-words">
        {params.value}
      </div>
    ),
  },
  {
    field: "descripton",
    headerName: "Descripton",
    width: 350,
    renderCell: (params) => (
      <div className="overflow-hidden text-ellipsis whitespace-normal break-words">
        {params.value}
      </div>
    ),
  },
  {
    field: "salary",
    headerName: "Salary (if any)",
    width: 200,
    renderCell: (params) => (
      <div className="overflow-hidden text-ellipsis whitespace-normal break-words">
        {params.value}
      </div>
    ),
  },
  {
    field: "job_status",
    headerName: "Job Status",
    width: 150,
    renderCell: (params) => (
      <div className="overflow-hidden text-ellipsis whitespace-normal break-words">
        {params.value || "Undefined"}
      </div>
    ),
  },
  {
    field: "createdAt",
    headerName: "Added At",
    width: 150,
    renderCell: (params) => formatDate(params.value),
  },
];

export const VISIBLE_FIELDS = [
  "title",
  "type",
  "location",
  "contract_role",
  "descripton",
  "salary",
  "joining_date",
  "job_status",
  "createdAt",
];
