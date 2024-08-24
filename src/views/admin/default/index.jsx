import MiniCalendar from "components/calendar/MiniCalendar";
import WeeklyRevenue from "views/admin/default/components/WeeklyRevenue";
import TotalSpent from "views/admin/default/components/TotalSpent";
import PieChartCard from "views/admin/default/components/PieChartCard";
import { IoMdHome } from "react-icons/io";
import { MdBarChart, MdDashboard } from "react-icons/md";

import { columnsDataComplex } from "./variables/columnsData";

import Widget from "components/widget/Widget";
import CategoriesTable from "views/admin/default/components/CategoriesTable";
import DailyTraffic from "views/admin/default/components/DailyTraffic";
import TaskCard from "views/admin/default/components/TaskCard";
import tableDataComplex from "./variables/tableDataComplex.json";
// import { useState } from "react";

const Dashboard = () => {
  // const [dashData, setdashData] = useState({
  //   professionals: "0",
  //   Establishments: "0",
  //   students: "0",
  // });

  // const [currentUser, setCurrentUser] = useState({});

  // const fetchCurrentUser = async () => {
  //   const accessToken = JSON.parse(localStorage.getItem("accessToken"));
  //   try {
  //     const currentUser = await CurrentUser(accessToken);
  //     setCurrentUser(currentUser, "currentUser");
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  // useEffect(() => {
  //   fetchCurrentUser();
  // }, []);

  return (
    <div>
      <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        <Widget
          icon={<MdDashboard className="h-6 w-6" />}
          title={"Total Projects"}
          subtitle={"0"}
        />
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={"Total Employees"}
          subtitle={"0"}
        />
        <Widget
          icon={<IoMdHome className="h-6 w-6" />}
          title={"--------"}
          subtitle={"0"}
        />
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
