import React from "react";

// Admin Imports
import MainDashboard from "views/admin/default";

// Auth Imports
import SignIn from "views/auth/SignIn";

// Icon Imports
import { MdHome, MdRequestPage, MdOutlineBusiness } from "react-icons/md";
import { IoMdPaper, IoMdUnlock } from "react-icons/io";
import Projects from "views/admin/Projects";
import AllContacts from "views/admin/AllContacts";
import ProjectDetails from "views/admin/ProjectDetails";

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
    name: "Sign out",
    layout: "/auth",
    path: "sign-in",
    icon: <IoMdUnlock className="h-6 w-6" />,
    component: <SignIn />,
  },
];
export default routes;
