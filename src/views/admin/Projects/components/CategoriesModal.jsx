import CustomDatePicker from "components/CustomDatePicker";
import InputField from "components/fields/InputField";
import TextField from "components/fields/TextField";
import MultiFileInput from "components/MultiFileInput";
import React, { useState } from "react";
import { CreateProject } from "services/projectAPIs";
import Notify from "simple-notify";

const CategoriesModal = ({ setOpenModal, fetchProjects }) => {
  const [projectData, setProjectData] = useState({
    name: "",
    contract_value: "",
    contract_role: "",
    client: "",
    location: "",
    descripton: "",
    started_date: new Date(),
    completed_date: "",
  });
  const [images, setImages] = useState([]); // This will store File objects
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    const formData = new FormData();

    // Append form fields
    for (const key in projectData) {
      formData.append(key, projectData[key]);
    }

    // Append multiple images
    images.forEach((image, index) => {
      formData.append("images", image); // "images" is the field name in your backend multer
    });

    const accessToken = JSON.parse(localStorage.getItem("accessToken"));
    try {
      if (
        !projectData?.name ||
        !projectData.contract_value ||
        !projectData.contract_role ||
        !projectData.client ||
        !projectData.location ||
        !projectData.descripton ||
        !projectData.started_date
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
        const project = await CreateProject(accessToken, formData);
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
      console.log(e, "error");
      new Notify({
        status: "error",
        title: e.code,
        text: e.message,
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
            id="contract_value"
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
            id="contract_role"
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
            id="client"
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
            id="location"
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
            label="Descripton"
            placeholder="Some words about the project"
            id="descripton"
            type="text"
            value={projectData.descripton}
            onChange={(e) =>
              setProjectData({ ...projectData, descripton: e.target.value })
            }
          />
        </div>
        <div className="col-span-12 md:col-span-6">
          <CustomDatePicker
            label={"Started Date"}
            value={projectData.started_date}
            handleChange={(date) =>
              setProjectData({ ...projectData, started_date: date })
            }
          />
        </div>
        <div className="col-span-12 md:col-span-6">
          <CustomDatePicker
            label={"Completed Date"}
            value={projectData.completed_date}
            handleChange={(date) =>
              setProjectData({ ...projectData, completed_date: date })
            }
          />
        </div>
        <div className="col-span-12 md:col-span-6">
          <MultiFileInput allImages={images} setAllImages={setImages} />
        </div>
        <div className="col-span-12 md:col-span-6"></div>
        <div className="col-span-12 md:col-span-6">
          <button
            onClick={handleSave}
            disabled={isLoading}
            className="mt-4 w-full rounded-xl bg-brand-500 py-3 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
          >
            {isLoading ? "loading..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoriesModal;
