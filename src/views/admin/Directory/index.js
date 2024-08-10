import * as React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import InputField from "components/fields/InputField";

const customColumns = [
  { field: "users", headerName: "Users", width: 200 },
  { field: "professionals", headerName: "Professionals", width: 150 },
  { field: "establishments", headerName: "Establishments", width: 150 },
  { field: "students", headerName: "Students", width: 150 },
  { field: "area", headerName: "Area", width: 200 },
  { field: "country", headerName: "Country", width: 200 },
  { field: "isAdmin", headerName: "Is Admin", width: 80 },
];

const customData = [
  {
    id: 1,
    users: "John Doe",
    professionals: "test",
    establishments: "USA",
    students: "2023-01-15",
    area: "sdfas",
    country: "USA",
    isAdmin: true,
  },
  {
    id: 2,
    users: "Jane Smith",
    professionals: "3.8",
    establishments: "asdfads",
    students: "2022-11-20",
    area: "sdfas",
    country: "Canada",
    isAdmin: false,
  },
  {
    id: 3,
    users: "John Doe",
    professionals: "test",
    establishments: "USA",
    students: "2023-01-15",
    area: "sdfas",
    country: "USA",
    isAdmin: true,
  },
];

const VISIBLE_FIELDS = [
  "users",
  "professionals",
  "establishments",
  "students",
  "area",
  "country",
  "isAdmin",
];

export default function Directory() {
  const columns = React.useMemo(
    () =>
      customColumns.filter((column) => VISIBLE_FIELDS.includes(column.field)),
    [customColumns]
  );

  return (
    <div style={{ height: 400, width: "100%" }}>
      <h2 className="text-xl">Filters:</h2>
      <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-3">
        <div className="mb-5 rounded-[20px] bg-white px-3 py-2">
          <InputField
            variant="auth"
            extra="mb-3"
            label="Professionals"
            placeholder="Professionals"
            id="professionals"
            type="text"
          />
        </div>
        <div className="mb-5 rounded-[20px] bg-white px-3 py-2">
          <InputField
            variant="auth"
            extra="mb-3"
            label="Establishments"
            placeholder="Establishments"
            id="establishments"
            type="text"
          />
        </div>
        <div className="mb-5 rounded-[20px] bg-white px-3 py-2">
          <InputField
            variant="auth"
            extra="mb-3"
            label="Students"
            placeholder="Students"
            id="students"
            type="text"
          />
        </div>
        <div className="mb-5 rounded-[20px] bg-white px-3 py-2">
          <InputField
            variant="auth"
            extra="mb-3"
            label="Area"
            placeholder="Area"
            id="area"
            type="text"
          />
        </div>
        <div className="mb-5 rounded-[20px] bg-white px-3 py-2">
          <InputField
            variant="auth"
            extra="mb-3"
            label="Country"
            placeholder="Country"
            id="country"
            type="text"
          />
        </div>
        <div className="mb-5 rounded-[20px] bg-white px-3 py-2">
          <button className="linear mt-5 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200">
            Search
          </button>
        </div>
      </div>
      <DataGrid
        rows={customData}
        columns={columns}
        components={{ Toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
          },
        }}
        // disableColumnFilter
        disableColumnSelector
        disableDensitySelector
      />
    </div>
  );
}
