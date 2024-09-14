import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FetchProject } from "services/projectAPIs";
import CustomTabs from "components/CustomTabs";
import Select from "react-select";
import { FetchAllEmployees } from "services/employeesApis";
import { FetchAllMachines } from "services/machinesApi";
import { FetchAllEquipments } from "services/equipmentsApis";

const ProjectDetails = () => {
  const { id } = useParams();
  const [projectDetails, setProjectDetail] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [machines, setMachines] = useState([]);
  const [equipments, setEquipments] = useState([]);
  const [selectedMachines, setSelectedMachines] = useState([]);

  const fetchProjectDetails = async () => {
    try {
      const accessToken = JSON.parse(localStorage.getItem("accessToken"));
      const project = await FetchProject(id, accessToken);
      setProjectDetail(project);
      const employee = await FetchAllEmployees(accessToken);
      setEmployees(employee);
      const machine = await FetchAllMachines(accessToken);
      setMachines(machine);
      const equipments = await FetchAllEquipments(accessToken);
      setEquipments(equipments);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchProjectDetails();
  }, []);

  if (!projectDetails) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-xl font-semibold">Loading...</div>
      </div>
    );
  }

  const backendUrl = "http://localhost:5000"; // Adjust this to match your backend URL

  const machinesOptions = machines.map((machine) => ({
    value: machine._id, // Using unique `_id` as value
    label: machine.name, // Using 'name' for the dropdown label
    color: "#FF8B00", // You can assign colors if needed
    isFixed: true, // Example property (optional)
  }));

  const employeesOptions = employees.map((employee) => ({
    value: employee._id,
    label: employee.name,
    color: "#FF8B00",
  }));

  const equipmentsOptions = equipments.map((equipment) => ({
    value: equipment._id,
    label: equipment.name,
    color: "#FF8B00",
  }));

  const handleChange = (selected) => {
    setSelectedMachines(selected);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      console.log("Selected Options:", selectedMachines);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="mb-5 text-lg">Project Details</h2>
      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-12 md:col-span-4">
          <p>All Employees</p>
          <Select
            isMulti
            name="colors"
            options={employeesOptions}
            className="basic-multi-select w-full"
            classNamePrefix="select"
          />
        </div>
        <div className="col-span-12 md:col-span-4">
          <p>All Machines</p>
          <Select
            isMulti
            name="colors"
            options={machinesOptions}
            className="basic-multi-select w-full"
            classNamePrefix="select"
            onChange={handleChange}
            value={selectedMachines}
            onKeyDown={handleKeyPress}
          />
        </div>
        <div className="col-span-12 md:col-span-4">
          <p>All Equipments</p>
          <Select
            isMulti
            name="colors"
            options={equipmentsOptions}
            className="basic-multi-select w-full"
            classNamePrefix="select"
          />
        </div>
      </div>
      <CustomTabs projectDetails={projectDetails} backendUrl={backendUrl} />
    </div>
  );
};

export default ProjectDetails;
