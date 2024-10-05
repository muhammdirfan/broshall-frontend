import React, { useState, useEffect } from "react";
import { FetchAllProjects } from "services/projectAPIs";

const ProjectName = ({ projectId }) => {
  const [projectName, setProjectName] = useState("Loading...");

  useEffect(() => {
    const fetchProjectName = async () => {
      const allProjects = await FetchAllProjects();
      const associatedProject = allProjects?.find(
        (item) => item._id === projectId
      );
      setProjectName(
        associatedProject ? associatedProject.name : "Unavailable"
      );
    };

    fetchProjectName();
  }, [projectId]);

  return <div>{projectName}</div>;
};

export default ProjectName;
