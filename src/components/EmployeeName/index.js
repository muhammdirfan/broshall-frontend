import React, { useState, useEffect } from "react";
import { FetchAllEmployees } from "services/employeesApis";

const EmployeeName = ({ employeeId }) => {
  const [EmployeeName, setEmployeeName] = useState("Loading...");

  useEffect(() => {
    const fetchEmployeeName = async () => {
      const allEmployees = await FetchAllEmployees();
      const associatedEmployee = allEmployees?.find(
        (item) => item._id === employeeId
      );
      setEmployeeName(
        associatedEmployee ? associatedEmployee.name : "Unavailable"
      );
    };

    fetchEmployeeName();
  }, [employeeId]);

  return <div>{EmployeeName}</div>;
};

export default EmployeeName;
