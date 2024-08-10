import InputField from "components/fields/InputField";
import TextField from "components/fields/TextField";
import React, { useEffect } from "react";
import { UpdateProject } from "services/projectAPIs";
import Notify from "simple-notify";
import { formatDate } from "utils";

const editModal = ({ setOpenModal, fetchProjects, data, selected }) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [projectData, setProjectData] = React.useState({
    name: "",
    contract_value: "",
    contract_role: "",
    client: "",
    location: "",
    descripton: "",
    started_date: "",
    completed_date: "",
  });
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [isLoading, setIsLoading] = React.useState(false);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const selectedProject = data?.filter((item) => item._id === selected);
    selectedProject?.map((item) => {
      setProjectData({
        name: item.name,
        contract_value: item.contract_value,
        contract_role: item.contract_role,
        client: item.client,
        location: item.location,
        descripton: item.descripton,
        started_date: item.started_date,
        completed_date: item.completed_date,
      });
    });
  }, [selected, data]);

  const handleUpdate = async (id) => {
    const accessToken = JSON.parse(localStorage.getItem("accessToken"));
    try {
      if (
        !projectData?.name ||
        !projectData.contract_value ||
        !projectData.contract_role
      ) {
        new Notify({
          status: "error",
          title: "Error",
          text: "Please fill all the fields",
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
      } else {
        setIsLoading(true);
        const project = await UpdateProject(accessToken, id, projectData);
        if (project) {
          setOpenModal(false);
          setIsLoading(false);
          new Notify({
            status: "success",
            title: "Success",
            text: "Project added Successfully!",
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
          setProjectData({
            name: "",
            contract_value: "",
            contract_role: "",
            client: "",
            location: "",
            descripton: "",
            started_date: "",
            completed_date: "",
          });
          fetchProjects();
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="space-y-6">
      <div className="mt-3 grid grid-cols-12 items-center gap-5">
        <div className="col-span-12 md:col-span-6">
          <TextField
            variant="auth"
            extra="mb-3"
            label="Project Name"
            placeholder="Construction of 0.2 MW HPP Hispar, Nagar"
            id="name"
            type="text"
            value={projectData.name}
            onChange={(e) =>
              setProjectData({ ...projectData, name: e.target.value })
            }
          />
        </div>
        <div className="col-span-12 md:col-span-6">
          <InputField
            variant="auth"
            extra="mb-3"
            label="Contract Value"
            placeholder="2,64,28,025.00"
            id="name"
            type="text"
            value={projectData.contract_value}
            onChange={(e) =>
              setProjectData({ ...projectData, contract_value: e.target.value })
            }
          />
        </div>
        <div className="col-span-12 md:col-span-6">
          <InputField
            variant="auth"
            extra="mb-3"
            label="Contract Role"
            placeholder="Full Contractor"
            id="name"
            type="text"
            value={projectData.contract_role}
            onChange={(e) =>
              setProjectData({ ...projectData, contract_role: e.target.value })
            }
          />
        </div>
        <div className="col-span-12 md:col-span-6">
          <InputField
            variant="auth"
            extra="mb-3"
            label="Client"
            placeholder="PWD"
            id="name"
            type="text"
            value={projectData.client}
            onChange={(e) =>
              setProjectData({ ...projectData, client: e.target.value })
            }
          />
        </div>
        <div className="col-span-12 md:col-span-6">
          <InputField
            variant="auth"
            extra="mb-3"
            label="Location"
            placeholder="Hisper, Nagar"
            id="name"
            type="text"
            value={projectData.location}
            onChange={(e) =>
              setProjectData({ ...projectData, location: e.target.value })
            }
          />
        </div>
        <div className="col-span-12 md:col-span-6">
          <TextField
            variant="auth"
            extra="mb-3"
            label="descripton"
            placeholder="Some words about the project"
            id="name"
            type="text"
            value={projectData.descripton}
            onChange={(e) =>
              setProjectData({ ...projectData, descripton: e.target.value })
            }
          />
        </div>
        <div className="col-span-12 md:col-span-6">
          <InputField
            variant="auth"
            extra="mb-3"
            label="Started Date"
            placeholder="14 Jan-2022"
            id="name"
            type="text"
            value={formatDate(projectData.started_date)}
            onChange={(e) =>
              setProjectData({ ...projectData, started_date: e.target.value })
            }
          />
        </div>
        <div className="col-span-12 md:col-span-6">
          <InputField
            variant="auth"
            extra="mb-3"
            label="Completed Date"
            placeholder="14 Jan-2022"
            id="name"
            type="text"
            value={
              projectData.completed_date
                ? formatDate(projectData.completed_date)
                : "In Progress"
            }
            onChange={(e) =>
              setProjectData({ ...projectData, completed_date: e.target.value })
            }
          />
        </div>
        <div className="col-span-12 md:col-span-6"></div>
        <div className="col-span-12 md:col-span-6">
          <button
            onClick={() => handleUpdate(selected)}
            className="mt-4 w-full rounded-xl bg-brand-500 py-3 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
          >
            {isLoading ? "loading..." : "Update"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default editModal;