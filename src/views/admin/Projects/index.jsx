import CategoriesTable from "./components/CategoriesTable";
import {
  VISIBLE_FIELDS,
  columnsDataComplex,
  columnsDataSpeciality,
} from "./variables/columnsData";
import Widget from "components/widget/Widget";
import { MdBarChart } from "react-icons/md";
import { IoDocuments } from "react-icons/io5";
import { Button, Modal } from "flowbite-react";
import React, { useState, useEffect } from "react";
import CategoriesModal from "./components/CategoriesModal";
import SpecialityModal from "./components/SpecialityModal";
import { fetchProffesionalCategory } from "services/professionalApis";
import Toggle from "components/toggle";
import { fetchallSpecialities } from "services/professionalApis";
import Notify from "simple-notify";
import {
  deleteProfessionalSpeciality,
  deleteProfessional,
} from "services/professionalApis";
import { FetchAllProjects } from "services/projectAPIs";
import { DeleteProject } from "services/projectAPIs";

const Projects = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openSpecialityModal, setOpenSpecialityModal] = useState(false);
  const [projects, setProjects] = useState();
  const [allSpecialities, setAllSpecialities] = useState();
  const [enableMessage, setEnableMessage] = useState(true);
  const [isLoading, setIsloading] = useState(false);

  const [modalData, setModalData] = useState({
    type: "",
    id: "",
  });
  const [selectedProfession, setSelectedProfession] = useState("");
  const [selectedProfessionUpdate, setSelectedProfessionUpdate] = useState("");
  const [selectedAssociatesUpdate, setSelectedAssociatesUpdate] = useState("");

  const handleToggle = () => {
    setEnableMessage(!enableMessage);
  };

  const fetchProjects = async () => {
    try {
      const accessToken = JSON.parse(localStorage.getItem("accessToken"));
      const allProjects = await FetchAllProjects(accessToken);
      setProjects(allProjects.reverse());
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // const handleDelete = async (id) => {
  //   try {
  //     setIsloading(true);
  //     const deleted = await DeleteProject(id);
  //     if (deleted) {
  //       new Notify({
  //         status: "success",
  //         title: "Success",
  //         text: deleted?.message,
  //         effect: "fade",
  //         speed: 300,
  //         customClass: null,
  //         customIcon: null,
  //         showIcon: true,
  //         showCloseButton: true,
  //         autoclose: true,
  //         autotimeout: 3000,
  //         gap: 20,
  //         distance: 20,
  //         type: 1,
  //         position: "right bottom",
  //       });
  //       setIsloading(false);
  //       fetchProjects();
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     new Notify({
  //       status: "error",
  //       title: "Error",
  //       text: "Something went wrong, Please try again!",
  //       effect: "fade",
  //       speed: 300,
  //       customClass: null,
  //       customIcon: null,
  //       showIcon: true,
  //       showCloseButton: true,
  //       autoclose: true,
  //       autotimeout: 3000,
  //       gap: 20,
  //       distance: 20,
  //       type: 1,
  //       position: "right bottom",
  //     });
  //     setIsloading(false);
  //   }
  // };

  React.useEffect(() => {
    const slectedData = allSpecialities?.filter(
      (item) => item?.id == modalData?.id
    );
    if (slectedData?.length) {
      setSelectedProfessionUpdate(slectedData[0]?.name);
      setSelectedAssociatesUpdate(slectedData[0]?.type);
    }

    const slectedProfession = projects?.filter(
      (item) => item?.id == modalData?.id
    );
    if (slectedProfession?.length) {
      setSelectedProfession(slectedProfession[0]?.name);
    }
  }, [allSpecialities, projects, modalData?.id]);

  const handleProjectDelete = async (id) => {
    try {
      const accessToken = JSON.parse(localStorage.getItem("accessToken"));
      setIsloading(true);
      const deleted = await DeleteProject(accessToken, id);
      if (deleted) {
        new Notify({
          status: "success",
          title: "Success",
          text: deleted?.message,
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
        setIsloading(false);
        setSelectedProfession({ selectedOption: null });
        fetchProjects();
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
      setIsloading(false);
    }
  };

  return (
    <>
      <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={"Total HCP"}
          subtitle={projects?.length}
        />
        <Widget
          icon={<IoDocuments className="h-6 w-6" />}
          title={"HCP specialities"}
          subtitle={"0"}
        />
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={"HCP Countries"}
          subtitle={"0"}
        />
      </div>
      <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-3">
        <div className="rounded-[20px] bg-white px-3 py-2">
          <button
            onClick={() => setOpenModal(true)}
            className="linear mt-5 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
          >
            Add Project
          </button>
        </div>
      </div>
      <div className="mt-3 grid h-full grid-cols-1 gap-5 xl:grid-cols-2 2xl:grid-cols-3">
        <div className="col-span-12 h-fit w-full xl:col-span-12 2xl:col-span-12">
          <CategoriesTable
            tableData={projects}
            tableHeader="Projects Table"
            tableFor="Professional"
            columnsData={columnsDataComplex}
            VISIBLE_FIELDS={VISIBLE_FIELDS}
            handleDelete={handleProjectDelete}
            isLoading={isLoading}
            setIsloading={setIsloading}
            selectedProfession={selectedProfession}
            fetchProjects={fetchProjects}
            modalData={modalData}
            setModalData={setModalData}
          />
        </div>
      </div>
      <Modal
        dismissible
        show={openModal}
        onClose={() => setOpenModal(false)}
        size={"4xl"}
        className="w-10/12 md:w-full"
      >
        <Modal.Header>Add New Project</Modal.Header>
        <Modal.Body>
          <CategoriesModal
            fetchProjects={fetchProjects}
            setOpenModal={setOpenModal}
          />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Projects;
