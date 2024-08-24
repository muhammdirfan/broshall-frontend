import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FetchProject } from "services/projectAPIs";
import { MdLocationOn, MdDateRange } from "react-icons/md";
import { FaUserTie, FaBuilding } from "react-icons/fa";
import { GiMoneyStack } from "react-icons/gi";

const ProjectDetails = () => {
  const { id } = useParams();
  const [projectDetails, setProjectDetail] = useState(null);

  const fetchProjectDetails = async () => {
    try {
      const accessToken = JSON.parse(localStorage.getItem("accessToken"));
      const project = await FetchProject(id, accessToken);
      setProjectDetail(project);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchProjectDetails();
  }, []);

  if (!projectDetails) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-xl font-semibold">Loading...</div>
      </div>
    );
  }

  const backendUrl = "http://localhost:5002"; // Adjust this to match your backend URL

  return (
    <div className="container mx-auto p-6">
      <div className="space-y-6 rounded-xl bg-white p-6 shadow-xl">
        <h2 className="text-3xl font-bold text-gray-800">
          {projectDetails.name}
        </h2>
        <div className="grid grid-cols-1 gap-6 text-gray-700 md:grid-cols-2">
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
        <p className="text-lg text-gray-600">{projectDetails.descripton}</p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {projectDetails.images.map((image, index) => (
            <img
              key={index}
              src={`${backendUrl}${image}`}
              alt={`Project Image ${index + 1}`}
              className="rounded-lg shadow-lg"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
