import React, { useMemo } from "react";
import CardMenu from "components/card/CardMenu";
import Card from "components/card";

import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import Select from "react-select";
import InputField from "components/fields/InputField";
import { MdCheck, MdEdit } from "react-icons/md";

import tableDataCheck from "../variables/tableDataCheck";
import { Button } from "flowbite-react";

const CheckTable = (props) => {
  const { columnsData, tableData, tableHeader } = props;

  const columns = useMemo(() => columnsData, [columnsData]);
  const data = useMemo(() => tableData, [tableData]);

  const [selectedProfession, setSelectedProfession] = React.useState({
    selectedOption: null,
  });
  const [isEdit, setIsEdit] = React.useState(true);
  const [enableLink, setEnableLink] = React.useState(true);
  const [inputValue, setInputValue] = React.useState("");
  const [linkValue, setLinkValue] = React.useState("");
  const [AssociatesLinks, setAssociatesLinks] = React.useState([]);

  const handleEdit = () => {
    setIsEdit(false);
  };
  const handleSave = () => {
    setIsEdit(true);
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      const newArr = [];
      newArr?.push(...AssociatesLinks, linkValue);
      setAssociatesLinks(newArr);
      setLinkValue("");
    }
  };

  const handleAdd = () => {};

  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    initialState,
  } = tableInstance;
  initialState.pageSize = 11;

  const handleProfessionChange = (selectedOption) => {
    setSelectedProfession({ selectedOption });
    setEnableLink(false);
  };

  React.useState(() => {
    tableDataCheck.map((cell) => {
      setInputValue(cell.catgoryname);
    });
  }, [page]);

  return (
    <Card extra={"w-full h-full sm:overflow-auto px-6"}>
      <header className="relative flex items-center justify-between pt-4">
        <div className="text-xl font-bold text-navy-700 dark:text-white">
          {tableHeader}
        </div>

       {/* <CardMenu /> */}
      </header>

      <div className="mt-8">
        <table
          {...getTableProps()}
          className="w-full"
          variant="simple"
          color="gray-500"
          mb="24px"
        >
          <thead>
            {headerGroups.map((headerGroup, index) => (
              <tr {...headerGroup.getHeaderGroupProps()} key={index}>
                {headerGroup.headers.map((column, index) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className="border-b border-gray-200 pr-16 pb-[10px] text-start dark:!border-navy-700"
                    key={index}
                  >
                    <div className="text-xs font-bold tracking-wide text-gray-600 lg:text-xs">
                      {column.render("Header")}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page?.length ? (
              page.map((row, index) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()} key={index}>
                    {row.cells.map((cell, index) => {
                      let data = "";
                      if (cell.column.Header === "Category Name") {
                        data = (
                          <div className="flex items-center gap-2">
                            <InputField
                              variant="auth"
                              extra="mb-2"
                              placeholder="Category Name"
                              id="profession"
                              type="text"
                              value={inputValue}
                              onChange={(e) => setInputValue(e.target.value)}
                              disabled={isEdit}
                            />
                            {isEdit ? (
                              <button onClick={handleEdit}>
                                <MdEdit className="mt-3 h-5 w-5" />
                              </button>
                            ) : (
                              <button onClick={handleSave}>
                                <MdCheck className="mt-3 h-5 w-5" />
                              </button>
                            )}
                          </div>
                        );
                      } else if (cell.column.Header === "Category Type") {
                        data = (
                          <div className="flex w-full items-center pt-5">
                            <Select
                              isSearchable
                              value={selectedProfession.selectedOption}
                              onChange={handleProfessionChange}
                              options={cell.value}
                              className="customInput w-9/12"
                            />
                          </div>
                        );
                      } else if (cell.column.Header === "Associates links") {
                        data = (
                          <div className="flex flex-col items-center">
                            <div className="flex items-center gap-2">
                              <InputField
                                variant="auth"
                                extra="mb-2"
                                placeholder="Category Name"
                                id="profession"
                                type="text"
                                value={linkValue}
                                onChange={(e) => setLinkValue(e.target.value)}
                                disabled={enableLink}
                                onKeyDown={(e) => handleEnter(e)}
                              />
                            </div>
                            {AssociatesLinks && (
                              <div className="w-7/12 rounded-lg border bg-white text-center">
                                {AssociatesLinks?.map((item) => (
                                  <div>
                                    <p className="text-lg">{item}</p>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        );
                      } else if (cell.column.Header === "Action") {
                        data = (
                          <div className="flex items-center">
                            <Button onClick={handleAdd}>Add</Button>
                          </div>
                        );
                      }
                      return (
                        <td
                          {...cell.getCellProps()}
                          key={index}
                          className="pt-[14px] pb-[16px] sm:text-[14px]"
                        >
                          {data}
                        </td>
                      );
                    })}
                  </tr>
                );
              })
            ) : (
              <p className="py-10 text-right">No Record Found</p>
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default CheckTable;
