import ProjectName from "components/ProjectName";
import { formatDate } from "utils";

export const columnsDataComplex = [
  // {
  //   field: "bill_name",
  //   headerName: "Bill Name",
  //   width: 200,
  //   renderCell: (params) => (
  //     <div className="overflow-hidden text-ellipsis whitespace-normal break-words">
  //       {params.value}
  //     </div>
  //   ),
  // },
  {
    field: "bill_id",
    headerName: "Bill Id",
    width: 180,
    renderCell: (params) => (
      <div className="overflow-hidden text-ellipsis whitespace-normal break-words">
        {params.value}
      </div>
    ),
  },
  {
    field: "bill_type",
    headerName: "Bill Type",
    width: 130,
    renderCell: (params) => (
      <div className="overflow-hidden text-ellipsis whitespace-normal break-words">
        {params.value}
      </div>
    ),
  },
  {
    field: "bill_amount",
    headerName: "Bill Amount",
    width: 150,
    renderCell: (params) => (
      <div className="overflow-hidden text-ellipsis whitespace-normal break-words">
        {params.value}
      </div>
    ),
  },
  {
    field: "bill_account",
    headerName: "Bill Account",
    width: 160,
    renderCell: (params) => (
      <div className="overflow-hidden text-ellipsis whitespace-normal break-words">
        {params.value}
      </div>
    ),
  },
  {
    field: "bill_date",
    headerName: "Bill Date",
    width: 130,
    renderCell: (params) => formatDate(params.value),
  },
  {
    field: "bill_project",
    headerName: "Bill Project",
    width: 250,
    renderCell: (params) => (
      <div className="overflow-hidden text-ellipsis whitespace-normal break-words">
        {!params.value ? "Available" : <ProjectName projectId={params.value} />}
      </div>
    ),
  },
  {
    field: "bill_status",
    headerName: "Bill Status",
    width: 100,
    renderCell: (params) => (
      <div className="overflow-hidden text-ellipsis whitespace-normal break-words">
        {params.value}
      </div>
    ),
  },
];

export const VISIBLE_FIELDS = [
  "bill_name",
  "bill_id",
  "bill_type",
  "contract_role",
  "bill_amount",
  "bill_account",
  "joining_date",
  "job_status",
  "bill_date",
  "bill_project",
  "bill_status",
];
