import InputField from "components/fields/InputField";
import React, { useEffect, useState } from "react";
import Notify from "simple-notify";
import { CreatePayment, UpdatePayment } from "services/paymentsApis";
import CustomDatePicker from "components/CustomDatePicker";
import MultiFileInput from "components/MultiFileInput";
import Select from "react-select";
import { FetchAllProjects } from "services/projectAPIs";

const AddPaymentModal = ({
  setOpenModal,
  fetchPayments,
  data,
  selected,
  setModalData,
}) => {
  const [PaymentData, setPaymentData] = React.useState({
    payment_name: "",
    payment_id: "",
    payment_type: "",
    payment_amount: "",
    payment_account: "",
    payment_date: "",
    payment_project: "",
    payment_status: "",
  });
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    if (selected) {
      const selectedPayment = data?.filter((item) => item._id === selected);

      selectedPayment?.map((item) => {
        setPaymentData({
          payment_name: item.payment_name,
          payment_id: item.payment_id,
          payment_type: item.payment_type,
          payment_amount: item.payment_amount,
          payment_account: item.payment_account,
          payment_date: item.payment_date,
          payment_project: projects.map(
            (project) =>
              item.payment_project === project._id && {
                value: project._id,
                label: project.name,
              }
          ),
          payment_status: [
            {
              value: item.payment_status,
              label: item.payment_status,
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
      ...PaymentData,
      payment_project: PaymentData.payment_project?.value,
      payment_status: PaymentData.payment_status?.value,
    };

    for (const key in data) {
      formData.append(key, data[key]);
    }

    images.forEach((image, index) => {
      formData.append("images", image);
    });

    try {
      if (
        !PaymentData.payment_name ||
        !PaymentData.payment_id ||
        !PaymentData.payment_type ||
        !PaymentData.payment_amount ||
        !PaymentData.payment_account ||
        !PaymentData.payment_date
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
        const payment = await CreatePayment(formData);
        if (payment) {
          setOpenModal(false);
          setIsLoading(false);
          new Notify({
            status: "success",
            title: "Success",
            text: "Payment added Successfully!",
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
          setPaymentData({
            payment_name: "",
            payment_id: "",
            payment_type: "",
            payment_amount: "",
            payment_account: "",
            payment_date: "",
            payment_project: "",
            payment_status: "",
          });
          fetchPayments();
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
        ...PaymentData,
        payment_project: PaymentData.payment_project?.value,
        payment_status: PaymentData.payment_status?.value,
      };

      if (
        !data.payment_name ||
        !data.payment_id ||
        !data.payment_type ||
        !data.payment_amount ||
        !data.payment_account ||
        !data.payment_date
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
        const payment = await UpdatePayment(id, data);
        if (payment) {
          setOpenModal(false);
          setIsLoading(false);
          setModalData({ type: [], id: "" });
          new Notify({
            status: "success",
            title: "Success",
            text: "Payment Updated Successfully!",
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
          setPaymentData({
            payment_name: "",
            payment_id: "",
            payment_type: "",
            payment_amount: "",
            payment_account: "",
            payment_date: "",
            payment_project: "",
            payment_status: "",
          });
          fetchPayments();
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
    setPaymentData({
      ...PaymentData,
      payment_project: selected,
    });
  };

  const handleStatusChange = (selected) => {
    setPaymentData({
      ...PaymentData,
      payment_status: selected,
    });
  };

  return (
    <div className="space-y-6">
      <div className="mt-3 grid grid-cols-12 items-center gap-5">
        <div className="col-span-12 md:col-span-6">
          <InputField
            variant="auth"
            extra="mb-3"
            label="Payment Name"
            placeholder="Payment3467"
            id="name"
            type="text"
            value={PaymentData.payment_name}
            onChange={(e) =>
              setPaymentData({ ...PaymentData, payment_name: e.target.value })
            }
          />
        </div>
        <div className="col-span-12 md:col-span-6">
          <InputField
            variant="auth"
            extra="mb-3"
            label="Payment Id"
            placeholder="2365723465734"
            id="name"
            type="text"
            value={PaymentData.payment_id}
            onChange={(e) =>
              setPaymentData({ ...PaymentData, payment_id: e.target.value })
            }
          />
        </div>
        <div className="col-span-12 md:col-span-6">
          <InputField
            variant="auth"
            extra="mb-3"
            label="Payment Type"
            placeholder="First Payment"
            id="name"
            type="text"
            value={PaymentData.payment_type}
            onChange={(e) =>
              setPaymentData({ ...PaymentData, payment_type: e.target.value })
            }
          />
        </div>
        <div className="col-span-12 md:col-span-6">
          <InputField
            variant="auth"
            extra="mb-3"
            label="Payment Amount"
            placeholder="Rs. 23,00,000"
            id="name"
            type="text"
            value={PaymentData.payment_amount}
            onChange={(e) =>
              setPaymentData({ ...PaymentData, payment_amount: e.target.value })
            }
          />
        </div>
        <div className="col-span-12 md:col-span-6">
          <InputField
            variant="auth"
            extra="mb-3"
            label="Payment Account"
            placeholder="NBP3462374523"
            id="name"
            type="text"
            value={PaymentData.payment_account}
            onChange={(e) =>
              setPaymentData({
                ...PaymentData,
                payment_account: e.target.value,
              })
            }
          />
        </div>
        <div className="col-span-12 md:col-span-6">
          <p>Payment Project</p>
          <Select
            name="colors"
            options={projectsOptions}
            className="basic-multi-select w-full"
            classNamePrefix="select"
            value={PaymentData.payment_project}
            onChange={handleProjectChange}
          />
        </div>
        <div className="col-span-12 md:col-span-6">
          <p>Payment Status</p>
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
            value={PaymentData.payment_status}
            onChange={handleStatusChange}
          />
        </div>
        <div className="col-span-12 md:col-span-6">
          <CustomDatePicker
            label={"Payment Date"}
            value={PaymentData.payment_date}
            handleChange={(date) =>
              setPaymentData({ ...PaymentData, payment_date: date })
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

export default AddPaymentModal;
