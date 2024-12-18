import CategoriesTable from "components/CategoriesTable";
import Widget from "components/widget/Widget";
import { Button, Modal } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { IoDocuments } from "react-icons/io5";
import {
  MdBarChart,
  MdDateRange,
  MdFormatListNumbered,
  MdLocationOn,
} from "react-icons/md";
import { columnsDataComplex, VISIBLE_FIELDS } from "./variables/columnsData";
import Notify from "simple-notify";
import { FetchAllJobs } from "services/jobsAPis";
import { DeleteJob } from "services/jobsAPis";
import { FetchJob } from "services/jobsAPis";

import JobModal from "./components/JobModal";
import {
  FaArrowLeft,
  FaBookOpen,
  FaMoneyBillAlt,
  FaUserTie,
} from "react-icons/fa";
import { GiSkills } from "react-icons/gi";

const Jobs = () => {
  const [openModal, setOpenModal] = useState(false);
  const [Jobs, setJobs] = useState();
  const [isLoading, setIsloading] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");
  const [freeJobs, setFreeJobs] = useState([]);
  const [JobsDetails, setJobsDetails] = useState({});

  const [modalData, setModalData] = useState({
    type: "",
    id: "",
  });

  const fetchJobs = async () => {
    try {
      const allJobs = await FetchAllJobs();
      setJobs(allJobs.reverse());
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  useEffect(() => {
    const filtermachines = Jobs?.filter((item) => item?.job_status === "Open");
    setFreeJobs(filtermachines);
  }, [Jobs]);

  const handleMachineDelete = async (id) => {
    try {
      setIsloading(true);
      const deleted = await DeleteJob(id);
      if (deleted) {
        new Notify({
          status: "success",
          title: "Success",
          text: "Machine deleted successfully!",
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
        setSelectedItem({ selectedOption: null });
        fetchJobs();
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

  const handleJobDetails = (data) => {
    FetchJobDetails(data);
  };

  const FetchJobDetails = async (id) => {
    try {
      const JobDetails = await FetchJob(id);
      setJobsDetails(JobDetails);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {JobsDetails?._id ? (
        <div className="space-y-6">
          <Button
            className="flex items-center"
            onClick={() => setJobsDetails({})}
          >
            <FaArrowLeft />
            <p className="ml-2">Back</p>
          </Button>
          <h2 className="mt-5 text-3xl font-bold text-gray-800">
            {JobsDetails.title}
          </h2>
          <div className="rounded-lg bg-white p-4  shadow-md">
            <div className="grid grid-cols-1 gap-6 text-gray-700 md:grid-cols-2">
              <p className="flex items-center space-x-3">
                <FaUserTie className="text-purple-500" />
                <span>Job Type: {JobsDetails.type}</span>
              </p>
              <p className="flex items-center space-x-3">
                <MdLocationOn className="text-green-500" />
                <span>Location: {JobsDetails.location}</span>
              </p>
              <p className="space-x-3">
                <div className="flex items-center">
                  <FaBookOpen className="text-blue-500" />
                  <span className="ml-2 font-bold">Qualifications: </span>
                </div>
                <ul className="list-disc">
                  {JobsDetails.qualifications?.map((item, index) => (
                    <li key={index} className="mx-7">
                      {item}
                    </li>
                  ))}
                </ul>
              </p>
              <p className="space-x-3">
                <div className="flex items-center">
                  <MdFormatListNumbered className="text-blue-500" />
                  <span className="ml-2 font-bold">Responsibilities: </span>
                </div>
                <ul className="list-disc">
                  {JobsDetails.responsibilities?.map((item, index) => (
                    <li key={index} className="mx-7">
                      {item}
                    </li>
                  ))}
                </ul>
              </p>
              <p className="space-x-3">
                <div className="flex items-center">
                  <GiSkills className="text-blue-500" />
                  <span className="ml-2 font-bold">Skills: </span>
                </div>
                <ul className="list-disc">
                  {JobsDetails.skills?.map((item, index) => (
                    <li key={index} className="mx-7">
                      {item}
                    </li>
                  ))}
                </ul>
              </p>
              <p className="flex items-center space-x-3">
                <FaMoneyBillAlt className="text-purple-500" />
                <span>Salary: {JobsDetails.salary || "Not Mentioned"}</span>
              </p>
              <p className="flex items-center space-x-3">
                <MdDateRange className="text-yellow-500" />
                <span>
                  Added Date:
                  {new Date(JobsDetails.createdAt).toLocaleDateString()}
                </span>
              </p>
              {JobsDetails.updatedAt && (
                <p className="flex items-center space-x-3">
                  <MdDateRange className="text-yellow-500" />
                  <span>
                    Updated Date:{" "}
                    {new Date(JobsDetails.updatedAt).toLocaleDateString()}
                  </span>
                </p>
              )}
            </div>
            <p className="mt-4 text-lg text-gray-600">
              Description: {JobsDetails.descripton}
            </p>
          </div>
        </div>
      ) : (
        <>
          <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            <Widget
              icon={<MdBarChart className="h-7 w-7" />}
              title={"Total Jobs"}
              subtitle={Jobs?.length}
            />
            <Widget
              icon={<IoDocuments className="h-6 w-6" />}
              title={"Open Jobs"}
              subtitle={freeJobs?.length}
            />
            <div className="rounded-[20px] bg-white px-3 py-2 dark:!bg-navy-700">
              <button
                onClick={() => setOpenModal(true)}
                className="linear mt-5 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
              >
                Add Jobs
              </button>
            </div>
          </div>
          <div className="mt-3 grid h-full grid-cols-1 gap-5 xl:grid-cols-2 2xl:grid-cols-3">
            <div className="col-span-12 h-fit w-full xl:col-span-12 2xl:col-span-12">
              <CategoriesTable
                tableData={Jobs}
                tableHeader="Jobs Table"
                tableFor="Jobs"
                columnsData={columnsDataComplex}
                VISIBLE_FIELDS={VISIBLE_FIELDS}
                handleDelete={handleMachineDelete}
                isLoading={isLoading}
                setIsloading={setIsloading}
                selectedProfession={selectedItem}
                fetchJobs={fetchJobs}
                modalData={modalData}
                setModalData={setModalData}
                handleDetails={handleJobDetails}
                firstField="title"
              />
            </div>
          </div>
        </>
      )}
      <Modal
        dismissible
        show={openModal}
        onClose={() => setOpenModal(false)}
        size={"4xl"}
        className="w-10/12 md:w-full"
      >
        <Modal.Header>Add New Job</Modal.Header>
        <Modal.Body>
          <JobModal fetchJobs={fetchJobs} setOpenModal={setOpenModal} />
        </Modal.Body>
      </Modal>
      <Modal
        dismissible
        show={modalData?.type === "Edit" ? true : false}
        onClose={() => setModalData({ type: "", id: "" })}
        size={modalData?.type === "Edit" ? "4xl" : "xl"}
      >
        <Modal.Header>Edit Jobs</Modal.Header>
        <Modal.Body>
          <JobModal
            setOpenModal={setOpenModal}
            fetchJobs={fetchJobs}
            data={Jobs}
            selected={modalData?.id}
            setModalData={() => setModalData({ type: "", id: "" })}
          />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Jobs;
