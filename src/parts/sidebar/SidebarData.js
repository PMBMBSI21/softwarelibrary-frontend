import React from "react";
import * as FaIcons from "react-icons/fa";
import * as MdIcons from "react-icons/md";

export const SidebarData = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: <MdIcons.MdDashboard />,
    cName: "nav-text",
    isActive: "active",
  },
  {
    title: "Source Code",
    path: "/source-code",
    icon: <FaIcons.FaCode />,
    cName: "nav-text ",
    isActive: "active",
  },
  {
    title: "User Management",
    path: "/user-management",
    icon: <FaIcons.FaUsersCog />,
    cName: "nav-text ",
    isActive: "active",
  },

  {
    title: "Account",
    path: "/setting-account",
    icon: <MdIcons.MdAccountCircle />,
    cName: "nav-text ",
    isActive: "active",
  },
];
