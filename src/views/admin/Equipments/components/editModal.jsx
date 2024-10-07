import InputField from "components/fields/InputField";
import React, { useEffect } from "react";
import Notify from "simple-notify";
import TextField from "components/fields/TextField";
import { UpdateEquipment } from "services/equipmentsApis";

const editModal = ({ fetchEquipements, data, selected, setModalData }) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [equipment, setEquipment] = React.useState({
    name: "",
    type: "",
    no_of_equipments: "",
    ownerShip: "",
    equipment_value: "",
    descripton: "",
  });
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [isLoading, setIsLoading] = React.useState(false);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const selectedProject = data?.filter((item) => item._id === selected);
    selectedProject?.map((item) => {
      setEquipment({
        name: item.name,
        type: item.type,
        no_of_equipments: item.no_of_equipments,
        ownerShip: item.ownerShip,
        equipment_value: item.equipment_value,
        partner: item.partner,
        machine_value: item.machine_value,
        descripton: item.descripton,
      });
    });
  }, [selected, data]);

  const handleUpdate = async (id) => {
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
        const machine = await UpdateEquipment(id, equipment);
        if (machine) {
          setModalData({ type: "", id: "" });
          setIsLoading(false);
          new Notify({
            status: "success",
            title: "Success",
            text: "Machine Updated Successfully!",
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
        {/* <div className="col-span-12 md:col-span-6">
          <MultiFileInput allImages={images} setAllImages={setImages} />
        </div> */}
        <div className="col-span-12 flex justify-center md:col-span-6">
          <button
            onClick={() => handleUpdate(selected)}
            className="mt-4 w-8/12 rounded-xl bg-brand-500 py-3 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
          >
            {isLoading ? "loading..." : "Update"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default editModal;
