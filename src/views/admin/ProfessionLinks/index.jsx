import { Button, Label } from "flowbite-react";
import React, { useState } from "react";
import Select from "react-select";
import CheckTable from "../default/components/CheckTable";
import { fetchLinkedProffesionalCategory } from "services/professionalApis";
import { addLinkedProffesionalCategory } from "services/professionalApis";
import Notify from "simple-notify";
import { fetchProffesionalCategory } from "services/professionalApis";
import { specialitiesLinks } from "services/professionalApis";
import { fetchEstablishment } from "services/establishmentApis";
import { fetchStudentsCategory } from "services/studentsApis";
import { deleteLinkedProfessional } from "services/professionalApis";
import { updateLinkedProfessional } from "services/professionalApis";
import { fetchallSpecialities } from "services/professionalApis";
import { colourStyles } from "../ColorStyles";

const columnsData = [
  {
    field: "parentCategory",
    headerName: "PROFESSION AND SPECIALITY",
    width: 280,
  },
  { field: "childCategory", headerName: "ASSOCIATES LINKS", width: 900 },
];
const VISIBLE_FIELDS = ["parentCategory", "childCategory", ""];

const ProfessionLinks = () => {
  const [isLoading, seIsloading] = React.useState(false);
  const [selectedProfession, setSelectedProfession] = React.useState({
    selectedOption: null,
  });

  const [selectedAssociates, setSelectedAssociates] = React.useState({
    selectedOption: null,
  });
  const [tableDataCheck, setTableDataCheck] = React.useState([]);
  const [isDisable, setIsDisable] = React.useState(true);

  const [professions, setprofessions] = React.useState([]);
  const [professionsLinks, setprofessionsLinks] = React.useState([]);
  const [modalData, setModalData] = React.useState({
    type: "",
    id: "",
  });

  const [searchValue, setSearchValue] = useState("");

  const [selectedProfessionUpdate, setSelectedProfessionUpdate] =
    React.useState({
      selectedOption: null,
    });

  const [selectedAssociatesUpdate, setSelectedAssociatesUpdate] =
    React.useState({
      selectedOption: null,
    });

  const fetchHcps = async () => {
    try {
      const allData = [];
      const Hcps = await fetchProffesionalCategory();
      const specialities = await fetchallSpecialities();
      const professions = Hcps?.map((item) => ({
        value: item?.name,
        label: item?.name,
        color: "#36B37E",
      }));

      const allSpecialities = specialities?.map((item) => ({
        value: item?.name,
        label: item?.name,
        color: "#FF5630",
      }));

      const resultProfessionals = allData.concat(professions, allSpecialities);
      setprofessions(resultProfessionals);

      const establishments = await fetchEstablishment();
      const data1 = establishments?.map((item) => ({
        value: item?.name,
        label: item?.name,
        color: "#5243AA",
      }));
      const combined = [];
      const data2 = Hcps?.map((item) => ({
        value: item?.name,
        label: item?.name,
        color: "#36B37E",
      }));
      const students = await fetchStudentsCategory();
      const data3 = students?.map((item) => ({
        value: item?.name,
        label: item?.name,
        color: "#00B8D9",
      }));
      const result = combined.concat(data1, data2, data3, allSpecialities);
      setprofessionsLinks(result);
    } catch (e) {
      console.log(e);
    }
  };

  React.useEffect(() => {
    fetchHcps();
  }, []);

  const handleSpecialities = async (type) => {
    try {
      const data = {
        type: type,
      };
      const specialities = await specialitiesLinks(data);
      const combined = [];

      const specialityData = specialities?.map((item) => ({
        value: item?.name,
        label: item?.name,
        color: "#FF5630",
      }));
      const result = combined.concat(professionsLinks, specialityData);
      setprofessionsLinks(result);
    } catch (error) {
      console.log(error);
    }
  };

  const handleProfessionChange = (selectedOption) => {
    setSelectedProfession({ selectedOption });
    handleSpecialities(selectedOption?.value);
  };

  const fetchLinkedProfessionals = async () => {
    try {
      seIsloading(true);
      const linkedProffesionalCategory =
        await fetchLinkedProffesionalCategory();
      setTableDataCheck(linkedProffesionalCategory.reverse());
      seIsloading(false);
    } catch (e) {
      console.log(e);
      seIsloading(false);
    }
  };

  React.useEffect(() => {
    fetchLinkedProfessionals();
  }, []);

  const handleAssociatesChange = (selectedOption) => {
    setSelectedAssociates({ selectedOption });
  };

  const handleProfessionAdd = async () => {
    try {
      seIsloading(true);
      const linkedProfessionals = {
        parentCategory: selectedProfession?.selectedOption?.value,
        childCategory: selectedAssociates.selectedOption?.map(
          (item) => item?.value
        ),
      };
      const linkedProffesionalCategory = await addLinkedProffesionalCategory(
        linkedProfessionals
      );
      if (linkedProffesionalCategory) {
        new Notify({
          status: "success",
          title: "Success",
          text: "Professional links added Successfully!",
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
        fetchLinkedProfessionals();
        seIsloading(false);
      }
    } catch (e) {
      console.log(e);
      seIsloading(false);
    }
    setSelectedProfession({ selectedOption: null });
    setSelectedAssociates({ selectedOption: null });
  };

  React.useEffect(() => {
    selectedProfession?.selectedOption != null &&
    selectedAssociates.selectedOption != null
      ? setIsDisable(false)
      : setIsDisable(true);
  }, [selectedProfession, selectedAssociates]);

  const handleLinkDelete = async (id) => {
    const data = { linkedId: id };
    try {
      seIsloading(true);
      const deleted = await deleteLinkedProfessional(data);
      if (deleted?.deletedCount > 0) {
        new Notify({
          status: "success",
          title: "Success",
          text: "Professional link deleted Successfully!",
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
        seIsloading(false);
        fetchLinkedProfessionals();
      }
    } catch (error) {
      console.log(error);
      new Notify({
        status: "error",
        title: "Error",
        text: "Something went wrong, Please try again!",
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
      seIsloading(false);
    }
  };

  React.useEffect(() => {
    const slectedData = tableDataCheck?.filter(
      (item) => item?.linkedId == modalData?.id
    );
    setSelectedProfessionUpdate({
      selectedOption: {
        label: slectedData[0]?.parentCategory,
        value: slectedData[0]?.parentCategory,
      },
    });
    setSelectedAssociatesUpdate({
      selectedOption: slectedData[0]?.childCategory?.map((item) => ({
        label: item,
        value: item,
        color: handleColor(item)?.length
          ? handleColor(item)[0].color
          : "#5243AA",
      })),
    });
  }, [tableDataCheck, modalData?.id]);

  const handleColor = (item) => {
    return professionsLinks?.filter((i) => i.value === item);
  };

  const handleProfessionUpdateChange = (selectedOption) => {
    setSelectedProfessionUpdate({ selectedOption });
  };

  const handleAssociatesUpdateChange = (selectedOption) => {
    setSelectedAssociatesUpdate({ selectedOption });
  };

  const handleUpdateLink = async (id) => {
    const data = {
      linkedId: id,
      parentCategory: selectedProfessionUpdate?.selectedOption?.value,
      childCategory: selectedAssociatesUpdate.selectedOption?.map(
        (item) => item?.value
      ),
    };
    try {
      seIsloading(true);
      const updated = await updateLinkedProfessional(data);
      if (updated?.nModified > 0) {
        new Notify({
          status: "success",
          title: "Success",
          text: "Professional link updated Successfully!",
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
        seIsloading(false);
        setSelectedProfessionUpdate({ selectedOption: null });
        setSelectedAssociatesUpdate({ selectedOption: null });
        fetchLinkedProfessionals();
      }
    } catch (error) {
      console.log(error);
      new Notify({
        status: "error",
        title: "Error",
        text: "Something went wrong, Please try again!",
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
      seIsloading(false);
    }
  };

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const handleSearchValue = (value) => {
    setSearchValue(value);
    const results = tableDataCheck?.filter((item) =>
      item.parentCategory?.includes(capitalizeFirstLetter(value))
    );
    if (value !== "") setTableDataCheck(results);
    else setTableDataCheck(tableDataCheck);
  };

  return (
    <>
      <div className="mt-10 grid grid-cols-1 items-center gap-5 md:grid-cols-2 lg:grid-cols-3">
        <div>
          <div className="mb-2 flex items-center justify-start px-2">
            <p className="text-xs text-[#36B37E]">
              <span className="mr-2 inline-block h-[10px] w-[10px] rounded-full bg-[#36B37E]"></span>
              Professionals
            </p>
            <p className="ml-10 text-xs text-[#FF5630]">
              <span className="mr-2 inline-block h-[10px] w-[10px] rounded-full bg-[#FF5630]"></span>
              Specialities
            </p>
          </div>
          <div className="rounded-[20px] bg-white px-5 py-3">
            <Label>Profession & Speciality</Label>
            <Select
              isSearchable
              value={selectedProfession.selectedOption}
              onChange={handleProfessionChange}
              options={professions}
              styles={colourStyles}
            />
          </div>
        </div>
        <div>
          <div className="mb-2 flex items-center justify-between px-2">
            <p className="text-xs text-[#36B37E]">
              <span className="mr-2 inline-block h-[10px] w-[10px] rounded-full bg-[#36B37E]"></span>
              Professionals
            </p>
            <p className="text-xs text-[#5243AA]">
              <span className="mr-2 inline-block h-[10px] w-[10px] rounded-full bg-[#5243AA]"></span>
              Establishments
            </p>
            <p className="text-xs text-[#FF5630]">
              <span className="mr-2 inline-block h-[10px] w-[10px] rounded-full bg-[#FF5630]"></span>
              Specialities
            </p>
            <p className="text-xs text-[#00B8D9]">
              <span className="mr-2 inline-block h-[10px] w-[10px] rounded-full bg-[#00B8D9]"></span>
              Students
            </p>
          </div>
          <div className="rounded-[20px] bg-white px-5 py-3">
            <Label>Associates Links</Label>
            <Select
              isMulti
              value={selectedAssociates.selectedOption}
              onChange={handleAssociatesChange}
              options={professionsLinks}
              closeMenuOnSelect={false}
              styles={colourStyles}
            />
          </div>
        </div>
        <div className="rounded-[20px] bg-white px-3 py-2">
          <Button
            onClick={!isLoading ? handleProfessionAdd : null}
            disabled={isDisable}
            className="linear mt-2 w-full rounded-xl bg-brand-500 py-[8px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
          >
            {isLoading ? "Loading..." : "Add Professional Link"}
          </Button>
        </div>
      </div>
      <div className="mt-8">
        <CheckTable
          tableData={tableDataCheck}
          columnsData={columnsData}
          tableHeader="HCP & Specialty Link Manager"
          tableFor="Professional"
          VISIBLE_FIELDS={VISIBLE_FIELDS}
          handleDelete={handleLinkDelete}
          professions={professions}
          professionsLinks={professionsLinks}
          isLoading={isLoading}
          selectedProfession={selectedProfessionUpdate}
          handleProfessionChange={handleProfessionUpdateChange}
          selectedAssociates={selectedAssociatesUpdate}
          handleAssociatesChange={handleAssociatesUpdateChange}
          modalData={modalData}
          setModalData={setModalData}
          handleUpdate={handleUpdateLink}
          searchValue={searchValue}
          handleChange={handleSearchValue}
        />
      </div>
    </>
  );
};

export default ProfessionLinks;
