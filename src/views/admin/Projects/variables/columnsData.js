export const columnsDataComplex = [
  {
    field: "name",
    headerName: "Project Name",
    width: 260,
    renderCell: (params) => (
      <div className="overflow-hidden text-ellipsis whitespace-normal break-words">
        {params.value}
      </div>
    ),
  },
  { field: "contract_value", headerName: "Contract Value", width: 150 },
  { field: "contract_role", headerName: "Contract Role", width: 150 },
  {
    field: "client",
    headerName: "Client",
    width: 250,
    renderCell: (params) => (
      <div className="overflow-hidden text-ellipsis whitespace-normal break-words">
        {params.value}
      </div>
    ),
  },
  {
    field: "location",
    headerName: "Location",
    width: 220,
    renderCell: (params) => (
      <div className="overflow-hidden text-ellipsis whitespace-normal break-words">
        {params.value}
      </div>
    ),
  },
];

export const VISIBLE_FIELDS = [
  "name",
  "contract_value",
  "status",
  "contract_role",
  "client",
  "location",
  // "started_date",
  // "completed_date",
];

export const columnsDataSpeciality = [
  { field: "name", headerName: "SPECIALITY", width: 350 },
  { field: "type", headerName: "RELATED PROFESSION", width: 250 },
  { field: "status", headerName: "STATUS", width: 150 },
  { field: "total", headerName: "TOTAL", width: 200 },
];
