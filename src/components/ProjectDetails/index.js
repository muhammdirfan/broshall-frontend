import React from "react";
import { MdLocationOn, MdDateRange } from "react-icons/md";
import { FaUserTie, FaBuilding } from "react-icons/fa";
import { GiMoneyStack } from "react-icons/gi";
import { Carousel } from "flowbite-react";

const ProjectDetails = ({ projectDetails, backendUrl }) => {
  return (
    <div className="space-y-6 px-5">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200">
        {projectDetails.name}
      </h2>
      <div className="rounded-md border p-4 shadow-md">
        <div className="grid grid-cols-1 gap-6 text-gray-600 dark:text-gray-300 md:grid-cols-2">
          <p className="flex items-center space-x-3">
            <FaBuilding className="text-green-500" />
            <span>Client: {projectDetails.client}</span>
          </p>
          <p className="flex items-center space-x-3">
            <FaUserTie className="text-blue-500" />
            <span>Role: {projectDetails.contract_role}</span>
          </p>
          <p className="flex items-center space-x-3">
            <MdLocationOn className="text-red-500" />
            <span>Location: {projectDetails.location}</span>
          </p>
          <p className="flex items-center space-x-3">
            <MdDateRange className="text-yellow-500" />
            <span>
              Start Date:{" "}
              {new Date(projectDetails.started_date).toLocaleDateString()}
            </span>
          </p>
          {projectDetails.completed_date && (
            <p className="flex items-center space-x-3">
              <MdDateRange className="text-yellow-500" />
              <span>
                Completion Date:{" "}
                {new Date(projectDetails.completed_date).toLocaleDateString()}
              </span>
            </p>
          )}
          <p className="flex items-center space-x-3">
            <GiMoneyStack className="text-purple-500" />
            <span>Contract Value: {projectDetails.contract_value}</span>
          </p>
          <p className="flex items-center space-x-3">
            <FaUserTie className="text-purple-500" />
            <span>Created By: {projectDetails.createdBy}</span>
          </p>
          <p className="flex items-center space-x-3">
            <FaUserTie className="text-purple-500" />
            <span>Updated By: {projectDetails.updatedBy}</span>
          </p>
        </div>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
          {projectDetails.descripton}
        </p>
      </div>
      <div className="flex justify-center">
        <Carousel
          className="rounded-0 my-0 mx-auto h-[35rem] w-[50rem]"
          style={{ borderRadius: "0px" }}
          slide={true}
        >
          {projectDetails.images?.map((image, index) => (
            <div className="rounded-0 relative h-full w-full">
              <img
                src={`${backendUrl}${image}`}
                className="h-full w-full"
                alt={`Project Image ${index + 1}`}
              />
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default ProjectDetails;
