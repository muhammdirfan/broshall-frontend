import InputField from "components/fields/InputField";
import { Label } from "flowbite-react";
import React, { useState } from "react";
import Select from "react-select";
import Notify from "simple-notify";
import spaceUtilities from "tailwindcss-rtl/src/spaceUtilities";

const SpecialityModal = ({ setOpenSpecialityModal, fetchProfessionals }) => {
  const [professions, setprofessions] = React.useState([]);
  const [speciality, setSpeciality] = React.useState();
  const [selectedProfession, setSelectedProfession] = React.useState({
    selectedOption: null,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleProfessionChange = (selectedOption) => {
    setSelectedProfession({ selectedOption });
  };

  const handleChange = (value) => {
    setSpeciality(value);
  };

  const handleSave = async () => {};

  return (
    <div className="h-96 space-y-6">
      <div className="mt-3 grid grid-cols-1 items-center gap-5 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-2 3xl:grid-cols-3">
        <div className="max-w-md" id="select">
          <Label className="text-md">Select Profession</Label>
          <Select
            isSearchable
            value={selectedProfession.selectedOption}
            onChange={handleProfessionChange}
            options={professions}
            className="py-3"
          />
        </div>
        <InputField
          variant="auth"
          extra="mb-3"
          label="Speciality"
          placeholder="Example: Surgeon, Cardiologist etc"
          id="profession"
          type="text"
          value={speciality}
          onChange={(e) => handleChange(e.target.value)}
        />
        <div className="mt-3 grid grid-cols-1 items-center gap-5 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-2 3xl:grid-cols-3">
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

export default SpecialityModal;
