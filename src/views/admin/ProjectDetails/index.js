import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FetchProject } from "services/projectAPIs";
import CustomTabs from "components/CustomTabs";
import Select from "react-select";
import { FetchAllEmployees } from "services/employeesApis";
import { FetchAllMachines } from "services/machinesApi";
import { FetchAllEquipments } from "services/equipmentsApis";
import { AddEmployeeToProject } from "services/projectAPIs";
import Notify from "simple-notify";
import { AddMachineToProject } from "services/projectAPIs";
import { AddEquipmentToProject } from "services/projectAPIs";
import { RemoveEmployeeFromProject } from "services/projectAPIs";
import { removeMachineFromProject } from "services/projectAPIs";
import { removeEquipmentFromProject } from "services/projectAPIs";

const ProjectDetails = () => {
  const { id } = useParams();
  const [tab, setTab] = useState("details");
  const [projectDetails, setProjectDetail] = useState(null);
  const [availableEmployees, setAvailableEmployees] = useState([]);
  const [availableMachinery, setAvailableMachinery] = useState([]);
  const [availableEquipments, setAvailableEquipments] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [machines, setMachines] = useState([]);
  const [equipments, setEquipments] = useState([]);
  const [selctedValues, setSelectedValues] = useState({
    employees: [],
    machinery: [],
    equipments: [],
  });

  const fetchProjectDetails = async () => {
    try {
      const accessToken = JSON.parse(localStorage.getItem("accessToken"));
      const project = await FetchProject(id, accessToken);
      setProjectDetail(project);
      const employee = await FetchAllEmployees(accessToken);
      setEmployees(employee);
      setAvailableEmployees(
        employee?.filter((item) => !item?.projects?.length)
      );
      const machine = await FetchAllMachines(accessToken);
      setMachines(machine);
      setAvailableMachinery(machine?.filter((item) => !item?.projects?.length));
      const equipments = await FetchAllEquipments(accessToken);
      setEquipments(equipments);
      setAvailableEquipments(
        equipments?.filter((item) => !item?.projects?.length)
      );
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

  const machinesOptions = availableMachinery.map((machine) => ({
    value: machine._id, // Using unique `_id` as value
    label: machine.name, // Using 'name' for the dropdown label
    color: "#FF8B00", // You can assign colors if needed
    isFixed: true, // Example property (optional)
  }));

  const employeesOptions = availableEmployees.map((employee) => ({
    value: employee._id,
    label: employee.name,
    color: "#FF8B00",
  }));

  const equipmentsOptions = availableEquipments.map((equipment) => ({
    value: equipment._id,
    label: equipment.name,
    color: "#FF8B00",
  }));

  const handleEmployeeChange = (selected) => {
    setSelectedValues({ ...selctedValues, employees: selected });
  };

  const handleMachineChange = (selected) => {
    setSelectedValues({ ...selctedValues, machinery: selected });
  };

  const handleEquipmentChange = (selected) => {
    setSelectedValues({ ...selctedValues, equipments: selected });
  };

  const handleEmployeeKeyPress = (event) => {
    if (event.key === "Enter") {
      const employeesIds = selctedValues?.employees?.map((item) => item.value);
      handleAddEmployeeToProject(employeesIds);
    }
  };

  const handleMachineryKeyPress = (event) => {
    if (event.key === "Enter") {
      const machineIds = selctedValues.machinery?.map((item) => item.value);
      handleAddMachineToProject(machineIds);
    }
  };

  const handleEquipmentKeyPress = (event) => {
    if (event.key === "Enter") {
      const equipmentIds = selctedValues.equipments?.map((item) => item.value);
      handleAddEquipmentToProject(equipmentIds);
    }
  };

  const handleAddEmployeeToProject = async (employeesIds) => {
    const accessToken = JSON.parse(localStorage.getItem("accessToken"));
    const data = {
      projectId: projectDetails?._id,
      employeeIds: employeesIds,
    };
    const employeeAdded = await AddEmployeeToProject(
      accessToken,
      projectDetails?._id,
      data
    );
    if (employeeAdded) {
      fetchProjectDetails();
      setTab("employees");
      setSelectedValues({ ...selctedValues, employees: "" });
      new Notify({
        status: "success",
        title: "Success",
        text:
          employeeAdded?.message || "Employee has been added to the project!",
        effect: "fade",
        speed: 300,
        customClass: null,
        customIcon: null,
        showIcon: true,
        showCloseButton: true,
        autoclose: true,
        autotimeout: 3000,
        gap: 20,
        distance: 20,
        type: 1,
        position: "right bottom",
      });
    }
  };

  const handleAddMachineToProject = async (machineIds) => {
    const accessToken = JSON.parse(localStorage.getItem("accessToken"));
    const data = {
      projectId: projectDetails?._id,
      machineIds: machineIds,
    };
    const machineAdded = await AddMachineToProject(
      accessToken,
      projectDetails?._id,
      data
    );
    if (machineAdded) {
      fetchProjectDetails();
      setTab("Machinery");
      setSelectedValues({ ...selctedValues, machinery: "" });
      new Notify({
        status: "success",
        title: "Success",
        text: machineAdded?.message || "Machine has been added to the project!",
        effect: "fade",
        speed: 300,
        customClass: null,
        customIcon: null,
        showIcon: true,
        showCloseButton: true,
        autoclose: true,
        autotimeout: 3000,
        gap: 20,
        distance: 20,
        type: 1,
        position: "right bottom",
      });
    }
  };

  const handleAddEquipmentToProject = async (equipmentIds) => {
    const accessToken = JSON.parse(localStorage.getItem("accessToken"));
    const data = {
      projectId: projectDetails?._id,
      equipmentIds: equipmentIds,
    };
    const equipmentAdded = await AddEquipmentToProject(
      accessToken,
      projectDetails?._id,
      data
    );
    if (equipmentAdded) {
      fetchProjectDetails();
      setTab("equipments");
      setSelectedValues({ ...selctedValues, equipments: "" });
      new Notify({
        status: "success",
        title: "Success",
        text:
          equipmentAdded?.message || "Equipment has been added to the project!",
        effect: "fade",
        speed: 300,
        customClass: null,
        customIcon: null,
        showIcon: true,
        showCloseButton: true,
        autoclose: true,
        autotimeout: 3000,
        gap: 20,
        distance: 20,
        type: 1,
        position: "right bottom",
      });
    }
  };

  const handleItemRemove = async (id) => {
    const accessToken = JSON.parse(localStorage.getItem("accessToken"));
    const employee = await FetchAllEmployees(accessToken);
    const machine = await FetchAllMachines(accessToken);

    if (employee?.find((item) => item._id === id)) {
      const data = {
        projectId: projectDetails?._id,
        employeeIds: [id],
      };

      const equipmentAdded = await RemoveEmployeeFromProject(
        accessToken,
        projectDetails?._id,
        data
      );
      if (equipmentAdded) {
        fetchProjectDetails();
        new Notify({
          status: "success",
          title: "Success",
          text:
            equipmentAdded?.message ||
            "Employee has been Removed from the project!",
          effect: "fade",
          speed: 300,
          customClass: null,
          customIcon: null,
          showIcon: true,
          showCloseButton: true,
          autoclose: true,
          autotimeout: 3000,
          gap: 20,
          distance: 20,
          type: 1,
          position: "right bottom",
        });
      }
    } else if (machine?.find((item) => item._id === id)) {
      const data = {
        projectId: projectDetails?._id,
        machineIds: [id],
      };

      const machineRemoved = await removeMachineFromProject(
        accessToken,
        projectDetails?._id,
        data
      );
      if (machineRemoved) {
        fetchProjectDetails();
        new Notify({
          status: "success",
          title: "Success",
          text:
            machineRemoved?.message ||
            "Machine has been removed from the project!",
          effect: "fade",
          speed: 300,
          customClass: null,
          customIcon: null,
          showIcon: true,
          showCloseButton: true,
          autoclose: true,
          autotimeout: 3000,
          gap: 20,
          distance: 20,
          type: 1,
          position: "right bottom",
        });
      }
    } else {
      const data = {
        projectId: projectDetails?._id,
        equipmentIds: [id],
      };

      const equipmentRemoved = await removeEquipmentFromProject(
        accessToken,
        projectDetails?._id,
        data
      );
      if (equipmentRemoved) {
        fetchProjectDetails();
        new Notify({
          status: "success",
          title: "Success",
          text:
            equipmentRemoved?.message ||
            "Equipment has been Removed from the project!",
          effect: "fade",
          speed: 300,
          customClass: null,
          customIcon: null,
          showIcon: true,
          showCloseButton: true,
          autoclose: true,
          autotimeout: 3000,
          gap: 20,
          distance: 20,
          type: 1,
          position: "right bottom",
        });
      }
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="mb-5 text-lg">Project Details</h2>
      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-12 md:col-span-4">
          <p>Available Employees</p>
          <Select
            isMulti
            name="colors"
            options={employeesOptions}
            className="basic-multi-select w-full"
            classNamePrefix="select"
            onChange={handleEmployeeChange}
            value={selctedValues.employees}
            onKeyDown={handleEmployeeKeyPress}
          />
        </div>
        <div className="col-span-12 md:col-span-4">
          <p>Available Machines</p>
          <Select
            isMulti
            name="colors"
            options={machinesOptions}
            className="basic-multi-select w-full"
            classNamePrefix="select"
            onChange={handleMachineChange}
            value={selctedValues.machinery}
            onKeyDown={handleMachineryKeyPress}
          />
        </div>
        <div className="col-span-12 md:col-span-4">
          <p>Available Equipments</p>
          <Select
            isMulti
            name="colors"
            options={equipmentsOptions}
            className="basic-multi-select w-full"
            classNamePrefix="select"
            onChange={handleEquipmentChange}
            value={selctedValues.equipments}
            onKeyDown={handleEquipmentKeyPress}
          />
        </div>
      </div>
      <CustomTabs
        projectDetails={projectDetails}
        backendUrl={backendUrl}
        availableEmployees={availableEmployees}
        availableMachinery={availableMachinery}
        availableEquipments={availableEquipments}
        employees={employees}
        machines={machines}
        equipments={equipments}
        tab={tab}
        setTab={setTab}
        handleItemRemove={handleItemRemove}
      />
    </div>
  );
};

export default ProjectDetails;
