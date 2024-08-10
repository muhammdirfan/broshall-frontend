import React from "react";

// Admin Imports
import MainDashboard from "views/admin/default";

// Auth Imports
import SignIn from "views/auth/SignIn";

// Icon Imports
import { MdHome, MdRequestPage, MdOutlineBusiness } from "react-icons/md";
import { IoMdPaper, IoMdSwap, IoMdUnlock } from "react-icons/io";
import AllProfessionals from "views/admin/Directory/Childs/AllProfessionals";
import FeedbackReviews from "views/admin/FeedbackReviews";
import ProjectDetails from "views/admin/ProjectDetails";
import AllContacts from "views/admin/Directory/Childs/AllContacts";
import Projects from "views/admin/Projects";

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
    name: "Directory",
    layout: "/admin",
    path: "directory/allProfessionals",
    icon: <MdRequestPage className="h-6 w-6" />,
    component: <AllProfessionals />,
    clilds: [
      {
        name: "All Contacts",
        layout: "/admin",
        path: "directory/allcontacts",
        icon: <MdRequestPage className="h-6 w-6" />,
        component: <AllContacts />,
      },
    ],
  },
  {
    name: "Feedback & Reviews",
    layout: "/admin",
    path: "reviews",
    icon: <IoMdSwap className="h-6 w-6" />,
    component: <FeedbackReviews />,
  },
  {
    name: "Project Details",
    layout: "/admin",
    path: "project-details/:id",
    icon: <IoMdPaper className="h-6 w-6" />,
    component: <ProjectDetails />,
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
