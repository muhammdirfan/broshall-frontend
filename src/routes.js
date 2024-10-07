import React from "react";

// Admin Imports
import MainDashboard from "views/admin/default";

// Auth Imports
import SignIn from "views/auth/SignIn";

// Icon Imports
import { MdHome, MdRequestPage, MdOutlineBusiness } from "react-icons/md";
import { IoMdUnlock } from "react-icons/io";
import Projects from "views/admin/Projects";
import AllContacts from "views/admin/AllContacts";
import ProjectDetails from "views/admin/ProjectDetails";
import { FaCar, FaMoneyBill, FaUsers } from "react-icons/fa";
import { FaGears } from "react-icons/fa6";
import Employees from "views/admin/Employees";
import Machinery from "views/admin/Machinery";
import { GrUserWorker } from "react-icons/gr";
import Equipments from "views/admin/Equipments";
import Jobs from "views/admin/Jobs";
import Bills from "views/admin/Bills";
import JobDetails from "views/admin/JobDetails";
import Payments from "views/admin/Payments";

const routes = [
  {
    name: "Dashboard",
    layout: "/admin",
    path: "default",
    icon: <MdHome className="h-6 w-6" />,
    component: <MainDashboard />,
  },
  {
    name: "All Projects",
    layout: "/admin",
    path: "all-projects",
    icon: <MdOutlineBusiness className="h-6 w-6" />,
    component: <Projects />,
    secondary: true,
  },
  {
    // name: "Project Details",
    layout: "/admin",
    path: "project-details/:id",
    // icon: <IoMdPaper className="h-6 w-6" />,
    component: <ProjectDetails />,
  },
  {
    name: "All Contacts",
    layout: "/admin",
    path: "allcontacts",
    icon: <MdRequestPage className="h-6 w-6" />,
    component: <AllContacts />,
  },
  {
    name: "Employees",
    layout: "/admin",
    path: "employees",
    icon: <FaUsers className="h-6 w-6" />,
    component: <Employees />,
  },
  {
    name: "Machinery",
    layout: "/admin",
    path: "machinery",
    icon: <FaCar className="h-6 w-6" />,
    component: <Machinery />,
  },
  {
    name: "Equipments",
    layout: "/admin",
    path: "equipments",
    icon: <FaGears className="h-6 w-6" />,
    component: <Equipments />,
  },
  {
    name: "Jobs",
    layout: "/admin",
    path: "jobs",
    icon: <GrUserWorker className="h-6 w-6" />,
    component: <Jobs />,
  },
  {
    layout: "/admin",
    path: "job-details/:id",
    component: <JobDetails />,
  },
  {
    name: "Bills",
    layout: "/admin",
    path: "bills",
    icon: <FaMoneyBill className="h-6 w-6" />,
    component: <Bills />,
  },
  {
    name: "Payments",
    layout: "/admin",
    path: "payments",
    icon: <FaMoneyBill className="h-6 w-6" />,
    component: <Payments />,
  },
  {
    name: "Sign out",
    layout: "/auth",
    path: "sign-in",
    icon: <IoMdUnlock className="h-6 w-6" />,
    component: <SignIn />,
  },
];
export default routes;
