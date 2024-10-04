import SimpleTable from "components/SimpleTable";
import React, { useEffect, useState } from "react";
import {
  FaArrowLeft,
  FaBookOpen,
  FaMoneyBillAlt,
  FaUserTie,
} from "react-icons/fa";
import { GiSkills } from "react-icons/gi";
import {
  MdDateRange,
  MdFormatListNumbered,
  MdLocationOn,
} from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import { FetchJob } from "services/jobsAPis";
import { columnsDataComplex } from "./variables/columnsData";
import { FetchAllJobsApplies } from "services/jobsAPis";

const JobDetails = () => {
  const [JobsDetails, setJobsDetails] = useState({});
  const [JobApplies, setJobApplies] = useState([]);

  let { id } = useParams();

  const FetchJobDetails = async (id) => {
    try {
      const accessToken = JSON.parse(localStorage.getItem("accessToken"));
      const JobDetails = await FetchJob(id, accessToken);
      setJobsDetails(JobDetails);
      const JobApplies = await FetchAllJobsApplies(accessToken);
      setJobApplies(JobApplies?.filter((item) => item.applied_job === id));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    FetchJobDetails(id);
  }, [id]);

  return (
    <div className="space-y-6">
      <Link className="flex items-center" to="/admin/jobs">
        <FaArrowLeft />
        <p className="ml-2">Back</p>
      </Link>
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
      <SimpleTable
        tableData={JobApplies}
        tableHeader="Applicants"
        columnsData={columnsDataComplex}
        // handleItemRemove={handleItemRemove}
      />
    </div>
  );
};

export default JobDetails;
