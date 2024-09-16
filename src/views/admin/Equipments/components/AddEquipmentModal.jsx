import InputField from "components/fields/InputField";
import React, { useState } from "react";
import Notify from "simple-notify";
import TextField from "components/fields/TextField";
import MultiFileInput from "components/MultiFileInput";
import { CreateEquipment } from "services/equipmentsApis";

const AddEquipmentModal = ({ setOpenModal, fetchEquipements }) => {
  const [equipment, setEquipment] = React.useState({
    name: "",
    type: "",
    no_of_equipments: "",
    ownerShip: "",
    equipment_value: "",
    descripton: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState([]);

  const handleSave = async () => {
    const formData = new FormData();

    for (const key in equipment) {
      formData.append(key, equipment[key]);
    }

    images.forEach((image, index) => {
      formData.append("images", image);
    });

    const accessToken = JSON.parse(localStorage.getItem("accessToken"));
    try {
      if (
        !equipment?.name ||
        !equipment.type ||
        !equipment.no_of_equipments ||
        !equipment.ownerShip
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
        const machine = await CreateEquipment(accessToken, formData);
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
          setEquipment({
            name: "",
            type: "",
            no_of_equipments: "",
            ownerShip: "",
            equipment_value: "",
            descripton: "",
          });
          setImages([]);
          fetchEquipements();
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
            label="Equipment Name"
            placeholder="Trali"
            id="name"
            type="text"
            value={equipment.name}
            onChange={(e) =>
              setEquipment({ ...equipment, name: e.target.value })
            }
          />
        </div>
        <div className="col-span-12 md:col-span-6">
          <InputField
            variant="auth"
            extra="mb-3"
            label="Equipment type"
            placeholder="vechile"
            id="name"
            type="text"
            value={equipment.type}
            onChange={(e) =>
              setEquipment({ ...equipment, type: e.target.value })
            }
          />
        </div>
        <div className="col-span-12 md:col-span-6">
          <InputField
            variant="auth"
            extra="mb-3"
            label="no_of_equipments"
            placeholder="20"
            id="name"
            type="text"
            value={equipment.no_of_equipments}
            onChange={(e) =>
              setEquipment({ ...equipment, no_of_equipments: e.target.value })
            }
          />
        </div>
        <div className="col-span-12 md:col-span-6">
          <InputField
            variant="auth"
            extra="mb-3"
            label="equipment Value"
            placeholder="10 lac"
            id="name"
            type="text"
            value={equipment.equipment_value}
            onChange={(e) =>
              setEquipment({
                ...equipment,
                equipment_value: e.target.value,
              })
            }
          />
        </div>
        <div className="col-span-12 md:col-span-6">
          <InputField
            variant="auth"
            extra="mb-3"
            label="Ownership"
            placeholder="XYZ"
            id="name"
            type="text"
            value={equipment.ownerShip}
            onChange={(e) =>
              setEquipment({
                ...equipment,
                ownerShip: e.target.value,
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
            value={equipment.descripton}
            onChange={(e) =>
              setEquipment({ ...equipment, descripton: e.target.value })
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

export default AddEquipmentModal;
