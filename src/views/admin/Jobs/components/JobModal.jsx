import InputField from "components/fields/InputField";
import React, { useEffect, useState } from "react";
import Notify from "simple-notify";
import TextField from "components/fields/TextField";
import Select from "react-select";
import { CreateJob } from "services/jobsAPis";
import {
  qualificationsList,
  responsibilitiesList,
  skillsList,
} from "../variables/data";
import { UpdateJob } from "services/jobsAPis";

const AddJobModal = ({
  setOpenModal,
  fetchJobs,
  data,
  selected,
  setModalData,
}) => {
  const [JobData, setJobData] = React.useState({
    title: "",
    type: [],
    location: "",
    descripton: "",
    qualifications: [],
    responsibilities: [],
    skills: [],
    salary: "",
    job_status: [],
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (selected) {
      const selectedJob = data?.filter((item) => item._id === selected);
      selectedJob?.map((item) => {
        setJobData({
          title: item.title,
          type: [
            {
              value: item.type,
              label: item.type,
            },
          ],
          location: item.location,
          descripton: item.descripton,
          qualifications: item?.qualifications?.map((item) => ({
            value: item,
            label: item,
          })),
          responsibilities: item.responsibilities?.map((item) => ({
            value: item,
            label: item,
          })),
          skills: item.skills?.map((item) => ({
            value: item,
            label: item,
          })),
          salary: item.salary,
          job_status: [
            {
              value: item.job_status,
              label: item.job_status,
            },
          ],
        });
      });
    }
  }, [selected, data]);

  const handleSave = async () => {
    try {
      const data = {
        ...JobData,
        qualifications: JobData.qualifications.map((item) => item.value),
        responsibilities: JobData.responsibilities.map((item) => item.value),
        skills: JobData.skills.map((item) => item.value),
        type: JobData.type.label,
        job_status: JobData.job_status.label,
      };
      if (
        !data.title ||
        !data.type ||
        !data.location ||
        !data.descripton ||
        !data.qualifications ||
        !data.responsibilities ||
        !data.skills
        // !JobData.job_status
      ) {
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
        const job = await CreateJob(data);
        if (job) {
          setOpenModal(false);
          setIsLoading(false);
          new Notify({
            status: "success",
            title: "Success",
            text: "job added Successfully!",
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
          setJobData({
            title: "",
            type: [],
            location: "",
            descripton: "",
            qualifications: [],
            responsibilities: [],
            skills: [],
            salary: "",
            job_status: [
              {
                value: "Open",
                label: "Open",
              },
            ],
          });
          fetchJobs();
        }
      }
    } catch (e) {
      console.log(e);
      setIsLoading(false);
    }
  };

  const handleUpdate = async (id) => {
    try {
      const data = {
        ...JobData,
        qualifications: JobData.qualifications.map((item) => item.value),
        responsibilities: JobData.responsibilities.map((item) => item.value),
        skills: JobData.skills.map((item) => item.value),
        type:
          JobData?.type?.label ?? JobData?.type?.map((item) => item.label)[0],
        job_status: JobData.job_status.label,
      };
      if (
        !data.title ||
        !data.type ||
        !data.location ||
        !data.descripton ||
        !data.qualifications ||
        !data.responsibilities ||
        !data.skills
      ) {
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
        const job = await UpdateJob(id, data);
        if (job) {
          setOpenModal(false);
          setIsLoading(false);
          setModalData({ type: [], id: "" });
          new Notify({
            status: "success",
            title: "Success",
            text: "Job Updated Successfully!",
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
          setJobData({
            title: "",
            type: [],
            location: "",
            descripton: "",
            qualifications: [],
            responsibilities: [],
            skills: [],
            salary: "",
            job_status: [
              {
                value: "Open",
                label: "Open",
              },
            ],
          });
          fetchJobs();
        }
      }
    } catch (e) {
      console.log(e);
      setIsLoading(false);
    }
  };

  const handleQualificationsChange = (selected) => {
    setJobData({
      ...JobData,
      qualifications: selected,
    });
  };

  const handleResponsibilitiesChange = (selected) => {
    setJobData({
      ...JobData,
      responsibilities: selected,
    });
  };

  const handleSkillsChange = (selected) => {
    setJobData({
      ...JobData,
      skills: selected,
    });
  };

  const handleTypeChange = (selected) => {
    setJobData({
      ...JobData,
      type: selected,
    });
  };

  return (
    <div className="space-y-6">
      <div className="mt-3 grid grid-cols-12 items-center gap-5">
        <div className="col-span-12 md:col-span-6">
          <InputField
            variant="auth"
            extra="mb-3"
            label="Job title"
            placeholder="Managar"
            id="name"
            type="text"
            value={JobData.title}
            onChange={(e) => setJobData({ ...JobData, title: e.target.value })}
          />
        </div>
        <div className="col-span-12 md:col-span-6">
          <p>Job type</p>
          <Select
            name="colors"
            options={[
              {
                value: "full-time",
                label: "Full-Time",
              },
              {
                value: "part-time",
                label: "Part-Time",
              },
              {
                value: "contract-base",
                label: "Contract-Base",
              },
            ]}
            className="basic-multi-select w-full"
            classNamePrefix="select"
            value={JobData.type}
            onChange={handleTypeChange}
          />
        </div>
        <div className="col-span-12 md:col-span-6">
          <InputField
            variant="auth"
            extra="mb-3"
            label="Location"
            placeholder="Hoper, Nagar"
            id="name"
            type="text"
            value={JobData.location}
            onChange={(e) =>
              setJobData({ ...JobData, location: e.target.value })
            }
          />
        </div>
        <div className="col-span-12 md:col-span-6">
          <InputField
            variant="auth"
            extra="mb-3"
            label="Salary"
            placeholder="ABC"
            id="name"
            type="text"
            value={JobData.salary}
            onChange={(e) => setJobData({ ...JobData, salary: e.target.value })}
          />
        </div>
        <div className="col-span-12 md:col-span-6">
          <TextField
            variant="auth"
            extra="mb-3"
            label="Descripton"
            placeholder="Some words about the project"
            id="descripton"
            type="text"
            value={JobData.descripton}
            onChange={(e) =>
              setJobData({ ...JobData, descripton: e.target.value })
            }
          />
        </div>
        <div className="col-span-12 md:col-span-6">
          <p>Add Qualifications</p>
          <Select
            isMulti
            name="colors"
            options={qualificationsList}
            className="basic-multi-select w-full"
            classNamePrefix="select"
            onChange={handleQualificationsChange}
            value={JobData.qualifications}
            // onKeyDown={handleEmployeeKeyPress}
          />
        </div>
        <div className="col-span-12 md:col-span-6">
          <p>Add Responsibilities</p>
          <Select
            isMulti
            name="colors"
            options={responsibilitiesList}
            className="basic-multi-select w-full"
            classNamePrefix="select"
            onChange={handleResponsibilitiesChange}
            value={JobData.responsibilities}
          />
        </div>
        <div className="col-span-12 md:col-span-6">
          <p>Add Skills</p>
          <Select
            isMulti
            name="colors"
            options={skillsList}
            className="basic-multi-select w-full"
            classNamePrefix="select"
            onChange={handleSkillsChange}
            value={JobData.skills}
          />
        </div>
        <div className="col-span-12 md:col-span-6">
          <p>Job Status</p>
          <Select
            name="colors"
            options={[
              {
                value: "Open",
                label: "Open",
              },
              {
                value: "Closed",
                label: "Closed",
              },
            ]}
            className="basic-multi-select w-full"
            classNamePrefix="select"
            value={JobData.job_status}
            onChange={(selected) =>
              setJobData({
                ...JobData,
                job_status: selected,
              })
            }
          />
        </div>
        <div className="col-span-12 flex justify-center md:col-span-6">
          {selected ? (
            <button
              onClick={() => handleUpdate(selected)}
              className="mt-4 w-8/12 rounded-xl bg-brand-500 py-3 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
            >
              {isLoading ? "loading..." : "Update"}
            </button>
          ) : (
            <button
              onClick={handleSave}
              className="mt-4 w-8/12 rounded-xl bg-brand-500 py-3 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
            >
              {isLoading ? "loading..." : "Save"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddJobModal;
