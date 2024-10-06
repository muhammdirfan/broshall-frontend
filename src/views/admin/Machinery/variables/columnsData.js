import ProjectName from "components/ProjectName";
import { formatDate } from "utils";

export const columnsDataComplex = [
  // {
  //   field: "name",
  //   headerName: "Name",
  //   width: 160,
  //   renderCell: (params) => (
  //     <div className="overflow-hidden text-ellipsis whitespace-normal break-words">
  //       {params.value}
  //     </div>
  //   ),
  // },
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
    field: "model",
    headerName: "Model",
    width: 100,
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
  { field: "machine_value", headerName: "Machine Value", width: 120 },
  {
    field: "",
    headerName: "Machine Status",
    width: 250,
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
    field: "createdAt",
    headerName: "Added At",
    width: 150,
    renderCell: (params) => formatDate(params.value),
  },
];

export const VISIBLE_FIELDS = [
  "name",
  "type",
  "model",
  "contract_role",
  "machine_no",
  "owner",
  "partner",
  "joining_date",
  "machine_value",
  "",
  "createdAt",
];
