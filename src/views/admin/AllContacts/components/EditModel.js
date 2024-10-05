import InputField from "components/fields/InputField";
import { Button } from "flowbite-react";
import React, { useEffect } from "react";
import { UpdateContact } from "services/contactsAPis";
import Notify from "simple-notify";

const EditModel = ({
  id,
  allContacts,
  setOpenContactModal,
  fetchFreshData,
  onCancel,
}) => {
  const [isLoading, setIsloading] = React.useState(false);
  const [contactData, setContactData] = React.useState({
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    const selectedContact = allContacts.filter((item) => item._id === id);
    selectedContact.map((item) => {
      setContactData({ name: item.name, email: item.email, phone: item.phone });
    });
  }, [id, allContacts]);

  const handleUpdate = async (id) => {
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
        setIsloading(true);
        const contact = await UpdateContact(id, contactData);
        if (contact) {
          setOpenContactModal({ open: false, type: "", id: null });
          setIsloading(false);
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
        <div className="col-span-12 flex items-center justify-end">
          <Button
            color="light"
            pill
            className="px-5"
            onClick={() => onCancel({ open: false, type: "", id: null })}
          >
            Cancel
          </Button>
          <Button
            color="failure"
            pill
            className="ml-10 px-5"
            onClick={() => handleUpdate(id)}
          >
            {isLoading ? "loading..." : "Update"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditModel;
