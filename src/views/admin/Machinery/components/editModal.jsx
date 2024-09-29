import InputField from "components/fields/InputField";
import React, { useEffect } from "react";
import { UpdateMachine } from "services/machinesApi";
import Notify from "simple-notify";
import TextField from "components/fields/TextField";

const editModal = ({ fetchMachinery, data, selected, setModalData }) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [machineryData, setMachineryData] = React.useState({
    name: "",
    type: "",
    model: "",
    machine_no: "",
    owner: "",
    partner: "",
    machine_value: "",
    descripton: "",
    images: [],
  });
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [isLoading, setIsLoading] = React.useState(false);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const selectedProject = data?.filter((item) => item._id === selected);
    selectedProject?.map((item) => {
      setMachineryData({
        name: item.name,
        type: item.type,
        model: item.model,
        machine_no: item.machine_no,
        owner: item.owner,
        partner: item.partner,
        machine_value: item.machine_value,
        descripton: item.descripton,
      });
    });
  }, [selected, data]);

  const handleUpdate = async (id) => {
    const accessToken = JSON.parse(localStorage.getItem("accessToken"));
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
        const machine = await UpdateMachine(accessToken, id, machineryData);
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
            label="machinery Name"
            placeholder="Shahid Ali"
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
