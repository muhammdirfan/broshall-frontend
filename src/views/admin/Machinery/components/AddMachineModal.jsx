import InputField from "components/fields/InputField";
import React, { useState } from "react";
import Notify from "simple-notify";
import TextField from "components/fields/TextField";
import { CreateMachine } from "services/machinesApi";
import MultiFileInput from "components/MultiFileInput";

const AddMachineModal = ({ setOpenModal, fetchMachinery }) => {
  const [machineryData, setMachineryData] = React.useState({
    name: "",
    type: "",
    model: "",
    machine_no: "",
    owner: "",
    partner: "",
    machine_value: "",
    descripton: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState([]);

  const handleSave = async () => {
    const formData = new FormData();

    for (const key in machineryData) {
      formData.append(key, machineryData[key]);
    }

    images.forEach((image, index) => {
      formData.append("images", image);
    });

    try {
      if (
        !machineryData?.name ||
        !machineryData.type ||
        !machineryData.model ||
        !machineryData.machine_no ||
        !machineryData.owner
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
        const machine = await CreateMachine(formData);
        if (machine) {
          setOpenModal(false);
          setIsLoading(false);
          new Notify({
            status: "success",
            title: "Success",
            text: "Machine added Successfully!",
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
          setMachineryData({
            name: "",
            type: "",
            model: "",
            machine_no: "",
            owner: "",
            partner: "",
            machine_value: "",
            descripton: "",
          });
          fetchMachinery();
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
          <InputField
            variant="auth"
            extra="mb-3"
            label="Machinery Name"
            placeholder="Jeep"
            id="name"
            type="text"
            value={machineryData.name}
            onChange={(e) =>
              setMachineryData({ ...machineryData, name: e.target.value })
            }
          />
        </div>
        <div className="col-span-12 md:col-span-6">
          <InputField
            variant="auth"
            extra="mb-3"
            label="Machine type"
            placeholder="vechile"
            id="name"
            type="text"
            value={machineryData.type}
            onChange={(e) =>
              setMachineryData({ ...machineryData, type: e.target.value })
            }
          />
        </div>
        <div className="col-span-12 md:col-span-6">
          <InputField
            variant="auth"
            extra="mb-3"
            label="Model"
            placeholder="2018"
            id="name"
            type="text"
            value={machineryData.model}
            onChange={(e) =>
              setMachineryData({ ...machineryData, model: e.target.value })
            }
          />
        </div>
        <div className="col-span-12 md:col-span-6">
          <InputField
            variant="auth"
            extra="mb-3"
            label="Machine Number"
            placeholder="NGR 1231"
            id="name"
            type="text"
            value={machineryData.machine_no}
            onChange={(e) =>
              setMachineryData({ ...machineryData, machine_no: e.target.value })
            }
          />
        </div>
        <div className="col-span-12 md:col-span-6">
          <InputField
            variant="auth"
            extra="mb-3"
            label="Owner"
            placeholder="XYZ"
            id="name"
            type="text"
            value={machineryData.owner}
            onChange={(e) =>
              setMachineryData({
                ...machineryData,
                owner: e.target.value,
              })
            }
          />
        </div>
        <div className="col-span-12 md:col-span-6">
          <InputField
            variant="auth"
            extra="mb-3"
            label="Partner (if any)"
            placeholder="ABC"
            id="name"
            type="text"
            value={machineryData.partner}
            onChange={(e) =>
              setMachineryData({ ...machineryData, partner: e.target.value })
            }
          />
        </div>
        <div className="col-span-12 md:col-span-6">
          <InputField
            variant="auth"
            extra="mb-3"
            label="Machine Value"
            placeholder="10 lac"
            id="name"
            type="text"
            value={machineryData.machine_value}
            onChange={(e) =>
              setMachineryData({
                ...machineryData,
                machine_value: e.target.value,
              })
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
            value={machineryData.descripton}
            onChange={(e) =>
              setMachineryData({ ...machineryData, descripton: e.target.value })
            }
          />
        </div>
        <div className="col-span-12 md:col-span-6">
          <MultiFileInput allImages={images} setAllImages={setImages} />
        </div>
        <div className="col-span-12 flex justify-center md:col-span-6">
          <button
            onClick={handleSave}
            className="mt-4 w-8/12 rounded-xl bg-brand-500 py-3 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
          >
            {isLoading ? "loading..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddMachineModal;
