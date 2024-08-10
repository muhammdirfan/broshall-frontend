import InputField from "components/fields/InputField";
import React, { useState } from "react";
import { CreateEmployee } from "services/employeesApis";
import Notify from "simple-notify";

const CategoriesModal = ({ setOpenModal, fetchEmployees }) => {
  const [employeeData, setEmployeeData] = React.useState({
    name: "",
    email: "",
    address: "",
    contact_no: "",
    employee_type: "",
    designation: "",
    joining_date: "",
    duration: "",
    end_date: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    const accessToken = JSON.parse(localStorage.getItem("accessToken"));
    try {
      if (!employeeData?.name || !employeeData.email || !employeeData.address) {
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
        const project = await CreateEmployee(accessToken, employeeData);
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
          setEmployeeData({
            name: "",
            email: "",
            address: "",
            contact_no: "",
            employee_type: "",
            designation: "",
            joining_date: "",
            end_date: "",
          });
          fetchEmployees();
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
            label="Employee Name"
            placeholder="Shahid Ali"
            id="name"
            type="text"
            value={employeeData.name}
            onChange={(e) =>
              setEmployeeData({ ...employeeData, name: e.target.value })
            }
          />
        </div>
        <div className="col-span-12 md:col-span-6">
          <InputField
            variant="auth"
            extra="mb-3"
            label="Email (if any)"
            placeholder="shahid@gmail.com"
            id="name"
            type="text"
            value={employeeData.email}
            onChange={(e) =>
              setEmployeeData({ ...employeeData, email: e.target.value })
            }
          />
        </div>
        <div className="col-span-12 md:col-span-6">
          <InputField
            variant="auth"
            extra="mb-3"
            label="Address"
            placeholder="Hoper Nagar"
            id="name"
            type="text"
            value={employeeData.address}
            onChange={(e) =>
              setEmployeeData({ ...employeeData, address: e.target.value })
            }
          />
        </div>
        <div className="col-span-12 md:col-span-6">
          <InputField
            variant="auth"
            extra="mb-3"
            label="Contact Number"
            placeholder="031208756342"
            id="name"
            type="text"
            value={employeeData.contact_no}
            onChange={(e) =>
              setEmployeeData({ ...employeeData, contact_no: e.target.value })
            }
          />
        </div>
        <div className="col-span-12 md:col-span-6">
          <InputField
            variant="auth"
            extra="mb-3"
            label="employee_type"
            placeholder="Labor, Manager"
            id="name"
            type="text"
            value={employeeData.employee_type}
            onChange={(e) =>
              setEmployeeData({
                ...employeeData,
                employee_type: e.target.value,
              })
            }
          />
        </div>
        <div className="col-span-12 md:col-span-6">
          <InputField
            variant="auth"
            extra="mb-3"
            label="Designation"
            placeholder="Full-time"
            id="name"
            type="text"
            value={employeeData.designation}
            onChange={(e) =>
              setEmployeeData({ ...employeeData, designation: e.target.value })
            }
          />
        </div>
        <div className="col-span-12 md:col-span-6">
          <InputField
            variant="auth"
            extra="mb-3"
            label="Joining Date"
            placeholder="14 Jan-2022"
            id="name"
            type="text"
            value={employeeData.joining_date}
            onChange={(e) =>
              setEmployeeData({ ...employeeData, joining_date: e.target.value })
            }
          />
        </div>
        <div className="col-span-12 md:col-span-6">
          <InputField
            variant="auth"
            extra="mb-3"
            label="Duration"
            placeholder="Employement Duration"
            id="name"
            type="text"
            value={employeeData.duration}
            onChange={(e) =>
              setEmployeeData({ ...employeeData, duration: e.target.value })
            }
          />
        </div>
        <div className="col-span-12 md:col-span-6">
          <InputField
            variant="auth"
            extra="mb-3"
            label="End Date"
            placeholder="14 Jan-2022"
            id="name"
            type="text"
            value={employeeData.end_date}
            onChange={(e) =>
              setEmployeeData({ ...employeeData, end_date: e.target.value })
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

export default CategoriesModal;
