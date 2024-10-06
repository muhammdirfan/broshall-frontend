import MiniCalendar from "components/calendar/MiniCalendar";
import WeeklyRevenue from "views/admin/default/components/WeeklyRevenue";
import TotalSpent from "views/admin/default/components/TotalSpent";
import PieChartCard from "views/admin/default/components/PieChartCard";
import { MdOutlineBusiness } from "react-icons/md";

import { columnsDataComplex } from "./variables/columnsData";

import Widget from "components/widget/Widget";
import CategoriesTable from "views/admin/default/components/CategoriesTable";
import DailyTraffic from "views/admin/default/components/DailyTraffic";
import TaskCard from "views/admin/default/components/TaskCard";
import tableDataComplex from "./variables/tableDataComplex.json";
import { FetchAllProjects } from "services/projectAPIs";
import { FetchAllEmployees } from "services/employeesApis";
import { FetchAllMachines } from "services/machinesApi";
import { FetchAllEquipments } from "services/equipmentsApis";
import { useEffect, useState } from "react";
import { FaCar, FaUsers } from "react-icons/fa";
import { FaGears } from "react-icons/fa6";
import { FetchAllJobs } from "services/jobsAPis";
import { IoWalkSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { decrement } from "features/counter/counterSlice";
import { increment } from "features/counter/counterSlice";

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [machines, setMachines] = useState([]);
  const [equipments, setEquipments] = useState([]);
  const [Jobs, setJobs] = useState([]);

  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  const fetchAllDetails = async () => {
    try {
      const accessToken = JSON.parse(localStorage.getItem("accessToken"));
      const projects = await FetchAllProjects(accessToken);
      setProjects(projects);
      const employee = await FetchAllEmployees(accessToken);
      setEmployees(employee);
      const machine = await FetchAllMachines(accessToken);
      setMachines(machine);
      const equipments = await FetchAllEquipments(accessToken);
      setEquipments(equipments);
      const jobs = await FetchAllJobs(accessToken);
      setJobs(jobs);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchAllDetails();
  }, []);
  return (
    <div>
      <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        <Widget
          icon={<MdOutlineBusiness className="h-6 w-6" />}
          title={"Total Projects"}
          subtitle={projects?.length}
        />
        <Widget
          icon={<FaUsers className="h-7 w-7" />}
          title={"Total Employees"}
          subtitle={employees?.length}
        />
        <Widget
          icon={<FaCar className="h-6 w-6" />}
          title={"Total Machinery"}
          subtitle={machines?.length}
        />
        <Widget
          icon={<FaGears className="h-6 w-6" />}
          title={"Total Equipments"}
          subtitle={equipments?.length}
        />
        <Widget
          icon={<IoWalkSharp className="h-6 w-6" />}
          title={"Total Jobs"}
          subtitle={Jobs?.length}
        />
      </div>

      <div>
        <button onClick={() => dispatch(decrement())}>-</button>
        <span>{count}</span>
        <button onClick={() => dispatch(increment())}>+</button>
      </div>

      {/* Charts */}

      <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
        <TotalSpent />
        <WeeklyRevenue />
      </div>

      <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
        <DailyTraffic />
        <PieChartCard />
      </div>

      {/* Tables & Charts */}

      <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-2">
        {/* Complex Table , Task & Calendar */}

        <CategoriesTable
          columnsData={columnsDataComplex}
          tableData={tableDataComplex}
        />

        {/* Task chart & Calendar */}

        <div className="grid grid-cols-1 gap-5 rounded-[20px] md:grid-cols-2">
          <TaskCard />
          <div className="grid grid-cols-1 rounded-[20px]">
            <MiniCalendar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
