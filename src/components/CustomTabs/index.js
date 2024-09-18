import React, { useEffect, useState } from "react";
import { MdLocationOn, MdDateRange } from "react-icons/md";
import { FaUserTie, FaBuilding } from "react-icons/fa";
import { GiMoneyStack } from "react-icons/gi";
import { Carousel } from "flowbite-react";
import SimpleTable from "components/SimpleTable";
import {
  employeesColumns,
  equipementColumns,
  machineryColumns,
} from "./variables/columnsData";

const CustomTabs = ({
  projectDetails,
  backendUrl,
  employees,
  machines,
  equipments,
}) => {
  const [tab, setTab] = useState("details");
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
          <div className="space-y-6 px-5">
            <h2 className="text-3xl font-bold text-gray-800">
              {projectDetails.name}
            </h2>
            <div className="rounded-md border p-4 shadow-md">
              <div className="grid grid-cols-1 gap-6 text-gray-700 md:grid-cols-2">
                <p className="flex items-center space-x-3">
                  <FaBuilding className="text-green-500" />
                  <span>Client: {projectDetails.client}</span>
                </p>
                <p className="flex items-center space-x-3">
                  <FaUserTie className="text-blue-500" />
                  <span>Role: {projectDetails.contract_role}</span>
                </p>
                <p className="flex items-center space-x-3">
                  <MdLocationOn className="text-red-500" />
                  <span>Location: {projectDetails.location}</span>
                </p>
                <p className="flex items-center space-x-3">
                  <MdDateRange className="text-yellow-500" />
                  <span>
                    Start Date:{" "}
                    {new Date(projectDetails.started_date).toLocaleDateString()}
                  </span>
                </p>
                {projectDetails.completed_date && (
                  <p className="flex items-center space-x-3">
                    <MdDateRange className="text-yellow-500" />
                    <span>
                      Completion Date:{" "}
                      {new Date(
                        projectDetails.completed_date
                      ).toLocaleDateString()}
                    </span>
                  </p>
                )}
                <p className="flex items-center space-x-3">
                  <GiMoneyStack className="text-purple-500" />
                  <span>Contract Value: {projectDetails.contract_value}</span>
                </p>
                <p className="flex items-center space-x-3">
                  <FaUserTie className="text-purple-500" />
                  <span>Created By: {projectDetails.createdBy}</span>
                </p>
                <p className="flex items-center space-x-3">
                  <FaUserTie className="text-purple-500" />
                  <span>Updated By: {projectDetails.updatedBy}</span>
                </p>
              </div>
              <p className="mt-4 text-lg text-gray-600">
                {projectDetails.descripton}
              </p>
            </div>
            <div className="flex justify-center">
              <Carousel
                className="rounded-0 my-0 mx-auto h-[35rem] w-[50rem]"
                style={{ borderRadius: "0px" }}
                slide={true}
              >
                {projectDetails.images?.map((image, index) => (
                  <div className="rounded-0 relative h-full w-full">
                    <img
                      src={`${backendUrl}${image}`}
                      className="h-full w-full"
                      alt={`Project Image ${index + 1}`}
                    />
                  </div>
                ))}
              </Carousel>
            </div>
          </div>
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
          />
        </div>
        <div className={`${tab === "Machinery" ? "block" : "hidden"}`}>
          <SimpleTable
            tableData={associatedMechinery}
            tableHeader="Available Machinery"
            columnsData={machineryColumns}
          />
        </div>
        <SimpleTable
          tableData={associatedEquipments}
          tableHeader="Available Equipments"
          columnsData={equipementColumns}
        />
      </div>
    </div>
  );
};

export default CustomTabs;
