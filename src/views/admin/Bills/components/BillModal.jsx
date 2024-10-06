import InputField from "components/fields/InputField";
import React, { useEffect, useState } from "react";
import Notify from "simple-notify";
import { CreateBill, UpdateBill } from "services/billsApis";
import CustomDatePicker from "components/CustomDatePicker";
import MultiFileInput from "components/MultiFileInput";
import Select from "react-select";
import { FetchAllProjects } from "services/projectAPIs";

const AddBillModal = ({
  setOpenModal,
  fetchBills,
  data,
  selected,
  setModalData,
}) => {
  const [BillData, setBillData] = React.useState({
    bill_name: "",
    bill_id: "",
    bill_type: "",
    bill_amount: "",
    bill_account: "",
    bill_date: "",
    bill_project: "",
    bill_status: "",
  });
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    if (selected) {
      const selectedbill = data?.filter((item) => item._id === selected);

      console.log("selectedbill", selectedbill);
      selectedbill?.map((item) => {
        setBillData({
          bill_name: item.bill_name,
          bill_id: item.bill_id,
          bill_type: item.bill_type,
          bill_amount: item.bill_amount,
          bill_account: item.bill_account,
          bill_date: item.bill_date,
          bill_project: projects.map(
            (project) =>
              item.bill_project === project._id && {
                value: project._id,
                label: project.name,
              }
          ),
          bill_status: [
            {
              value: item.bill_status,
              label: item.bill_status,
            },
          ],
        });
      });
    }
  }, [selected, data]);

  const fetchProjects = async () => {
    try {
      const project = await FetchAllProjects();
      setProjects(project);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleSave = async () => {
    const formData = new FormData();

    const data = {
      ...BillData,
      bill_project: BillData.bill_project?.value,
      bill_status: BillData.bill_status?.value,
    };

    for (const key in data) {
      formData.append(key, data[key]);
    }

    images.forEach((image, index) => {
      formData.append("images", image);
    });

    try {
      if (
        !BillData.bill_name ||
        !BillData.bill_id ||
        !BillData.bill_type ||
        !BillData.bill_amount ||
        !BillData.bill_account ||
        !BillData.bill_date
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
        const bill = await CreateBill(formData);
        if (bill) {
          setOpenModal(false);
          setIsLoading(false);
          new Notify({
            status: "success",
            title: "Success",
            text: "bill added Successfully!",
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
          setBillData({
            bill_name: "",
            bill_id: "",
            bill_type: "",
            bill_amount: "",
            bill_account: "",
            bill_date: "",
            bill_project: "",
            bill_status: "",
          });
          fetchBills();
          setImages([]);
        }
      }
    } catch (e) {
      console.log(e);
      setIsLoading(false);
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

  const handleUpdate = async (id) => {
    try {
      const data = {
        ...BillData,
        bill_project: BillData.bill_project?.value,
        bill_status: BillData.bill_status?.value,
      };

      if (
        !data.bill_name ||
        !data.bill_id ||
        !data.bill_type ||
        !data.bill_amount ||
        !data.bill_account ||
        !data.bill_date
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
        const bill = await UpdateBill(id, data);
        if (bill) {
          setOpenModal(false);
          setIsLoading(false);
          setModalData({ type: [], id: "" });
          new Notify({
            status: "success",
            title: "Success",
            text: "Bill Updated Successfully!",
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
          setBillData({
            bill_name: "",
            bill_id: "",
            bill_type: "",
            bill_amount: "",
            bill_account: "",
            bill_date: "",
            bill_project: "",
            bill_status: "",
          });
          fetchBills();
        }
      }
    } catch (e) {
      console.log(e);
      setIsLoading(false);
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

  const projectsOptions = projects.map((project) => ({
    value: project._id,
    label: project.name,
    color: "#FF8B00",
  }));

  const handleProjectChange = (selected) => {
    setBillData({
      ...BillData,
      bill_project: selected,
    });
  };

  const handleStatusChange = (selected) => {
    setBillData({
      ...BillData,
      bill_status: selected,
    });
  };

  return (
    <div className="space-y-6">
      <div className="mt-3 grid grid-cols-12 items-center gap-5">
        <div className="col-span-12 md:col-span-6">
          <InputField
            variant="auth"
            extra="mb-3"
            label="bill Bill Name"
            placeholder="Bill3467"
            id="name"
            type="text"
            value={BillData.bill_name}
            onChange={(e) =>
              setBillData({ ...BillData, bill_name: e.target.value })
            }
          />
        </div>
        <div className="col-span-12 md:col-span-6">
          <InputField
            variant="auth"
            extra="mb-3"
            label="Bill Id"
            placeholder="2365723465734"
            id="name"
            type="text"
            value={BillData.bill_id}
            onChange={(e) =>
              setBillData({ ...BillData, bill_id: e.target.value })
            }
          />
        </div>
        <div className="col-span-12 md:col-span-6">
          <InputField
            variant="auth"
            extra="mb-3"
            label="Bill Type"
            placeholder="First Bill"
            id="name"
            type="text"
            value={BillData.bill_type}
            onChange={(e) =>
              setBillData({ ...BillData, bill_type: e.target.value })
            }
          />
        </div>
        <div className="col-span-12 md:col-span-6">
          <InputField
            variant="auth"
            extra="mb-3"
            label="Bill Amount"
            placeholder="Rs. 23,00,000"
            id="name"
            type="text"
            value={BillData.bill_amount}
            onChange={(e) =>
              setBillData({ ...BillData, bill_amount: e.target.value })
            }
          />
        </div>
        <div className="col-span-12 md:col-span-6">
          <InputField
            variant="auth"
            extra="mb-3"
            label="Bill Account"
            placeholder="NBP3462374523"
            id="name"
            type="text"
            value={BillData.bill_account}
            onChange={(e) =>
              setBillData({ ...BillData, bill_account: e.target.value })
            }
          />
        </div>
        <div className="col-span-12 md:col-span-6">
          <p>Bill Project</p>
          <Select
            name="colors"
            options={projectsOptions}
            className="basic-multi-select w-full"
            classNamePrefix="select"
            value={BillData.bill_project}
            onChange={handleProjectChange}
          />
        </div>
        <div className="col-span-12 md:col-span-6">
          <p>Bill Status</p>
          <Select
            name="colors"
            options={[
              {
                value: "Pending",
                label: "Pending",
              },
              {
                value: "In-Progress",
                label: "In-Progress",
              },
              {
                value: "Paid",
                label: "Paid",
              },
            ]}
            className="basic-multi-select w-full"
            classNamePrefix="select"
            value={BillData.bill_status}
            onChange={handleStatusChange}
          />
        </div>
        <div className="col-span-12 md:col-span-6">
          <CustomDatePicker
            label={"Started Date"}
            value={BillData.bill_date}
            handleChange={(date) =>
              setBillData({ ...BillData, bill_date: date })
            }
          />
        </div>
        {!selected ? (
          <div className="col-span-12 md:col-span-6">
            <MultiFileInput allImages={images} setAllImages={setImages} />
          </div>
        ) : null}
        <div className="col-span-12 flex justify-center md:col-span-6">
          {selected ? (
            <button
              onClick={() => handleUpdate(selected)}
              className="mt-4 w-8/12 rounded-xl bg-brand-500 py-3 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
            >
              {isLoading ? "loading..." : "Update"}
            </button>
          ) : (
            <button
              onClick={handleSave}
              className="mt-4 w-8/12 rounded-xl bg-brand-500 py-3 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
            >
              {isLoading ? "loading..." : "Save"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddBillModal;
