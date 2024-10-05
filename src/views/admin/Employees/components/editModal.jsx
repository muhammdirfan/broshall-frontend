import CustomDatePicker from "components/CustomDatePicker";
import InputField from "components/fields/InputField";
import React, { useEffect } from "react";
import { UpdateEmployee } from "services/employeesApis";
import Notify from "simple-notify";

const editModal = ({ setOpenModal, fetchEmployees, data, selected }) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
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
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [isLoading, setIsLoading] = React.useState(false);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const selectedProject = data?.filter((item) => item._id === selected);
    selectedProject?.map((item) => {
      setEmployeeData({
        name: item.name,
        email: item.email,
        address: item.address,
        contact_no: item.contact_no,
        employee_type: item.employee_type,
        designation: item.designation,
        joining_date: item.joining_date,
        duration: item.duration,
        end_date: item.end_date,
      });
    });
  }, [selected, data]);

  const handleUpdate = async (id) => {
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
        const employee = await UpdateEmployee(id, employeeData);
        if (employee) {
          setOpenModal(false);
          setIsLoading(false);
          new Notify({
            status: "success",
            title: "Success",
            text: "Employee Updated Successfully!",
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
            duration: "",
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
          <CustomDatePicker
            label={"Joining Date"}
            value={employeeData.joining_date}
            handleChange={(date) =>
              setEmployeeData({ ...employeeData, joining_date: date })
            }
          />
        </div>
        <div className="col-span-12 md:col-span-6">
          <CustomDatePicker
            label={"End Date"}
            value={employeeData.end_date}
            handleChange={(date) =>
              setEmployeeData({ ...employeeData, end_date: date })
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
