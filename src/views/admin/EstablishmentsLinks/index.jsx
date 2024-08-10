import { Button, Label } from "flowbite-react";
import React, { useEffect } from "react";
import Select from "react-select";
import CheckTable from "../default/components/CheckTable";
import { fetchLinkedEstablishment } from "services/establishmentApis";
import { addLinkedEstablishmentCategory } from "services/establishmentApis";
import Notify from "simple-notify";
import { fetchEstablishment } from "services/establishmentApis";
import { fetchStudentsCategory } from "services/studentsApis";
import { fetchProffesionalCategory } from "services/professionalApis";
import { deleteLinkedEstablishment } from "services/establishmentApis";
import { updateLinkedEstablishment } from "services/establishmentApis";
import { fetchallSpecialities } from "services/professionalApis";
import { colourStyles } from "../ColorStyles";

const columnsData = [
  { field: "parentCategory", headerName: "ESTABLISHMENTS", width: 250 },
  { field: "childCategory", headerName: "ASSOCIATES LINKS", width: 900 },
];
const VISIBLE_FIELDS = ["parentCategory", "childCategory", ""];

const EstablishmentsLinks = () => {
  const [isLoading, seIsloading] = React.useState(false);
  const [selectedProfession, setSelectedProfession] = React.useState({
    selectedOption: null,
  });

  const [selectedAssociates, setSelectedAssociates] = React.useState({
    selectedOption: null,
  });
  const [tableDataCheck, setTableDataCheck] = React.useState([]);
  const [establisment, setEstablistment] = React.useState([]);
  const [establishmentsLinks, setEstablishmentsLinks] = React.useState([]);
  const [isDisable, setIsDisable] = React.useState(true);
  const [modalData, setModalData] = React.useState({
    type: "",
    id: "",
  });

  const [selectedProfessionUpdate, setSelectedProfessionUpdate] =
    React.useState({
      selectedOption: null,
    });

  const [selectedAssociatesUpdate, setSelectedAssociatesUpdate] =
    React.useState({
      selectedOption: null,
    });

  const fetchHchs = async () => {
    try {
      const Hchs = await fetchEstablishment();
      setEstablistment(
        Hchs?.map((item) => ({
          value: item?.name,
          label: item?.name,
        }))
      );

      const specialities = await fetchallSpecialities();
      const allSpecialities = specialities?.map((item) => ({
        value: item?.name,
        label: item?.name,
        color: "#FF5630",
      }));
      const data1 = Hchs?.map((item) => ({
        value: item?.name,
        label: item?.name,
        color: "#5243AA",
      }));
      const combined = [];
      const data2 = Hchs?.map((item) => ({
        value: item?.name,
        label: item?.name,
        color: "#5243AA",
      }));
      const students = await fetchStudentsCategory();
      const data3 = students?.map((item) => ({
        value: item?.name,
        label: item?.name,
        color: "#00B8D9",
      }));
      const professions = await fetchProffesionalCategory();
      const data4 = professions?.map((item) => ({
        value: item?.name,
        label: item?.name,
        color: "#36B37E",
      }));
      const result = combined.concat(
        data1,
        data2,
        data3,
        data4,
        allSpecialities
      );
      setEstablishmentsLinks(result);
    } catch (e) {
      console.log(e);
    }
  };

  React.useEffect(() => {
    fetchHchs();
  }, []);

  const fetchLinkedEstablishments = async () => {
    try {
      seIsloading(true);
      const linkedEstablistmentsCategory = await fetchLinkedEstablishment();
      setTableDataCheck(linkedEstablistmentsCategory.reverse());
      seIsloading(false);
    } catch (e) {
      console.log(e);
      seIsloading(false);
    }
  };

  useEffect(() => {
    fetchLinkedEstablishments();
  }, []);

  const handleProfessionChange = (selectedOption) => {
    setSelectedProfession({ selectedOption });
  };

  const handleAssociatesChange = (selectedOption) => {
    setSelectedAssociates({ selectedOption });
  };

  const handleProfessionAdd = async () => {
    try {
      seIsloading(true);
      const linkedEstablistments = {
        parentCategory: selectedProfession?.selectedOption?.value,
        childCategory: selectedAssociates.selectedOption?.map(
          (item) => item?.value
        ),
      };
      const linkedEstablisgmentCategory = await addLinkedEstablishmentCategory(
        linkedEstablistments
      );
      if (linkedEstablisgmentCategory) {
        new Notify({
          status: "success",
          title: "Success",
          text: "Establishment links added Successfully!",
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
        fetchLinkedEstablishments();
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
      const deleted = await deleteLinkedEstablishment(data);
      if (deleted?.deletedCount > 0) {
        new Notify({
          status: "success",
          title: "Success",
          text: "Establishment link deleted Successfully!",
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
        fetchLinkedEstablishments();
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
        color: handleColor(item)?.length ? handleColor(item)[0].color : "#5243AA",
      })),
    });
  }, [tableDataCheck, modalData?.id]);

  const handleColor = (item) => {
    return establishmentsLinks?.filter((i) => i.value === item)
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
      const updated = await updateLinkedEstablishment(data);
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
        fetchLinkedEstablishments();
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

  return (
    <>
      <div className="mt-10 grid grid-cols-1 items-center gap-5 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-[20px] bg-white px-5 py-3">
          <Label>Establishment</Label>
          <Select
            isSearchable
            value={selectedProfession.selectedOption}
            onChange={handleProfessionChange}
            options={establisment}
            closeMenuOnSelect={true}
          />
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
              options={establishmentsLinks}
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
            {isLoading ? "loading" : "Add Establishments Link"}
          </Button>
        </div>
      </div>
      <div className="mt-8">
        <CheckTable
          tableData={tableDataCheck}
          columnsData={columnsData}
          tableHeader="Establishments Link Managers"
          tableFor="Establishment"
          VISIBLE_FIELDS={VISIBLE_FIELDS}
          professions={establisment}
          professionsLinks={establishmentsLinks}
          handleDelete={handleLinkDelete}
          isLoading={isLoading}
          selectedProfession={selectedProfessionUpdate}
          handleProfessionChange={handleProfessionUpdateChange}
          selectedAssociates={selectedAssociatesUpdate}
          handleAssociatesChange={handleAssociatesUpdateChange}
          modalData={modalData}
          setModalData={setModalData}
          handleUpdate={handleUpdateLink}
        />
      </div>
    </>
  );
};

export default EstablishmentsLinks;
