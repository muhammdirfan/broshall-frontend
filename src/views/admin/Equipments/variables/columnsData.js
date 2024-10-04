import ProjectName from "components/ProjectName";
import { formatDate } from "utils";

export const columnsDataComplex = [
  // {
  //   field: "name",
  //   headerName: "Name",
  //   width: 180,
  //   renderCell: (params) => (
  //     <div className="overflow-hidden text-ellipsis whitespace-normal break-words">
  //       {params.value}
  //     </div>
  //   ),
  // },
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
    headerName: "Equipment Status",
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
    field: "createdAt",
    headerName: "Added At",
    width: 200,
    renderCell: (params) => formatDate(params.value),
  },
];

export const VISIBLE_FIELDS = [
  "name",
  "type",
  "no_of_equipments",
  "contract_role",
  "ownerShip",
  "joining_date",
  "machine_value",
  "",
  "createdAt",
];
