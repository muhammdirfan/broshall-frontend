import React, { useEffect, useState } from "react";
import SimpleTable from "components/SimpleTable";
import {
  employeesColumns,
  equipementColumns,
  machineryColumns,
} from "./variables/columnsData";
import ProjectDetails from "components/ProjectDetails";

const CustomTabs = ({
  projectDetails,
  backendUrl,
  employees,
  machines,
  equipments,
  tab,
  setTab,
  handleItemRemove,
}) => {
  const [associatedEmployees, setAssociatedEmployees] = useState([]);
  const [associatedMechinery, setAssociatedMechinery] = useState([]);
  const [associatedEquipments, setAssociatedEquipments] = useState([]);

  useEffect(() => {
    const filteredEmployees = employees.filter((emp) =>
      projectDetails.employees.includes(emp._id)
    );
    setAssociatedEmployees(filteredEmployees);

    const filteredMachinery = machines.filter((emp) =>
      projectDetails.machines.includes(emp._id)
    );
    setAssociatedMechinery(filteredMachinery);

    const filteredEquipments = equipments.filter((emp) =>
      projectDetails.equipments.includes(emp._id)
    );
    setAssociatedEquipments(filteredEquipments);
  }, [projectDetails, employees, machines, equipments]);

  return (
    <div className="my-5 space-y-6 overflow-hidden rounded-xl bg-white shadow-xl">
      <div className="flex justify-between bg-gray-200 px-5">
        <button
          onClick={() => setTab("details")}
          className={`${
            tab === "details"
              ? "border-b-2 border-blue-500 text-blue-500"
              : "text-dark"
          } py-2`}
        >
          Details
        </button>
        <button
          onClick={() => setTab("employees")}
          className={`${
            tab === "employees"
              ? "border-b-2 border-blue-500 text-blue-500"
              : "text-dark"
          } py-2`}
        >
          Employees
        </button>
        <button
          onClick={() => setTab("Machinery")}
          className={`${
            tab === "Machinery"
              ? "border-b-2 border-blue-500 text-blue-500"
              : "text-dark"
          } py-2`}
        >
          Machinery
        </button>
        <button
          onClick={() => setTab("equipments")}
          className={`${
            tab === "equipments"
              ? "border-b-2 border-blue-500 text-blue-500"
              : "text-dark"
          } py-2`}
        >
          Equipments
        </button>
      </div>
      <div className="py-3">
        <div className={`${tab === "details" ? "block" : "hidden"}`}>
          <ProjectDetails
            projectDetails={projectDetails}
            backendUrl={backendUrl}
          />
        </div>
        <div className={`${tab === "employees" ? "block" : "hidden"}`}>
          <SimpleTable
            tableData={associatedEmployees}
            tableHeader="Available Employees"
            columnsData={employeesColumns}
            // handleDelete={handleProjectDelete}
            // isLoading={isLoading}
            // setIsloading={setIsloading}
            // selectedProfession={selectedProfession}
            // fetchProjects={fetchProjects}
            // modalData={modalData}
            // setModalData={setModalData}
            handleItemRemove={handleItemRemove}
          />
        </div>
        <div className={`${tab === "Machinery" ? "block" : "hidden"}`}>
          <SimpleTable
            tableData={associatedMechinery}
            tableHeader="Available Machinery"
            columnsData={machineryColumns}
            handleItemRemove={handleItemRemove}
          />
        </div>
        <div className={`${tab === "equipments" ? "block" : "hidden"}`}>
          <SimpleTable
            tableData={associatedEquipments}
            tableHeader="Available Equipments"
            columnsData={equipementColumns}
            handleItemRemove={handleItemRemove}
          />
        </div>
      </div>
    </div>
  );
};

export default CustomTabs;
