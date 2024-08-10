import React from "react";
import CheckTable from "./components/CheckTable";
import { columnsDataCheck } from "./variables/columnsData";
import tableDataCheck from "./variables/tableDataCheck"

const CategoryRequest = () => {
  return (
    <>
      <div className="mt-10 grid grid-cols-1 gap-5">
        <CheckTable columnsData={columnsDataCheck} tableData={tableDataCheck} tableHeader="New Category Request Table" />
      </div>
    </>
  );
};

export default CategoryRequest;
