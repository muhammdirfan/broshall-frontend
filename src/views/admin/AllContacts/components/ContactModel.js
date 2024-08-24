import InputField from "components/fields/InputField";
import React, { useState } from "react";
import { CreateContact } from "services/contactsAPis";
import Notify from "simple-notify";

const ContactModel = ({ setOpenContactModal, fetchFreshData }) => {
  const [contactData, setContactData] = React.useState({
    name: "",
    email: "",
    phone: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    const accessToken = JSON.parse(localStorage.getItem("accessToken"));
    try {
      if (!contactData?.name || !contactData.email || !contactData.phone) {
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
        const contact = await CreateContact(accessToken, contactData);
        console.log("contact", contact);
        if (contact) {
          setOpenContactModal(false);
          setIsLoading(false);
          new Notify({
            status: "success",
            title: "Success",
            text: "Speciality added Successfully!",
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
          setContactData({
            name: "",
            email: "",
            phone: "",
          });
          fetchFreshData();
        }
      }
    } catch (e) {
      console.log(e);
      new Notify({
        status: "error",
        title: e.code || "Error",
        text: e.message || "Something went wrong!",
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
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="mt-3 grid grid-cols-12 items-center gap-5">
        <div className="col-span-12 md:col-span-6">
          <InputField
            variant="auth"
            extra="mb-3"
            label="Full Name"
            placeholder="Muhammad Ali"
            id="name"
            type="text"
            value={contactData.name}
            onChange={(e) =>
              setContactData({ ...contactData, name: e.target.value })
            }
          />
        </div>
        <div className="col-span-12 md:col-span-6">
          <InputField
            variant="auth"
            extra="mb-3"
            label="Email Address"
            placeholder="muhammad@gmail.com"
            id="name"
            type="email"
            value={contactData.email}
            onChange={(e) =>
              setContactData({ ...contactData, email: e.target.value })
            }
          />
        </div>
        <div className="col-span-12 md:col-span-6">
          <InputField
            variant="auth"
            extra="mb-3"
            label="Phone"
            placeholder="031209735343"
            id="name"
            type="text"
            value={contactData.phone}
            onChange={(e) =>
              setContactData({ ...contactData, phone: e.target.value })
            }
          />
        </div>
        <div className="col-span-12 md:col-span-6"></div>
        <div className="col-span-12 md:col-span-6">
          <button
            onClick={handleSave}
            className="mt-4 w-full rounded-xl bg-brand-500 py-3 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
          >
            {isLoading ? "loading..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactModel;
