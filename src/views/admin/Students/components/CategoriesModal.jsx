import InputField from "components/fields/InputField";
import { Label, Select } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { addStudentsCategory } from "services/studentsApis";
import Notify from "simple-notify";

const CategoriesModal = ({ fetchStudents, openModal }) => {
  const [category, setCategory] = useState();
  const [inputFields, setInputFields] = useState([
    {
      name: "",
    },
  ]);

  const obj = {
    name: category,
  };

  useEffect(() => {
    if (openModal == false) {
      setInputFields([{ name: "" }]);
    }
  }, [openModal]);

  const addStudent = async () => {
    try {
      const studentCategory = await addStudentsCategory(obj);
    } catch (e) {
      console.log(e);
    }
  };

  const addCategory = () => {
    if (!category) {
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
      const inputs = [];
      inputs.push(...inputFields, obj);
      setInputFields(inputs);
      addStudent();
      fetchStudents();
    }
  };

  return (
    <div className="space-y-6">
      <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-2 3xl:grid-cols-3">
        {inputFields?.map((item) => (
          <>
            <InputField
              variant="auth"
              extra="mb-3"
              label="Degree Name"
              placeholder="Example: MBBS, Nutrition, etc."
              id="profession"
              type="text"
              onChange={(e) => setCategory(e.target.value)}
            />
            <div className="max-w-md" id="select">
              <div className="mb-2 block">
                <Label htmlFor="countries" value="Status" />
              </div>
              <Select id="countries" required>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </Select>
            </div>
          </>
        ))}
      </div>
      <div className="mt-3 grid grid-cols-1 items-center gap-5 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-2 3xl:grid-cols-3">
        <InputField
          variant="auth"
          extra="mb-3"
          label="Total"
          placeholder="40"
          value={inputFields?.length - 1}
          id="total"
          type="number"
          disabled
        />
        <button
          onClick={addCategory}
          className="mt-4 w-full rounded-xl bg-brand-500 py-3 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default CategoriesModal;
