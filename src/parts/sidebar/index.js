import React, { useState } from "react";
import { NavLink, withRouter, Link } from "react-router-dom";

import * as FaIcons from "react-icons/fa";
import * as BsIcons from "react-icons/bs";
import * as RiIcons from "react-icons/ri";
import * as AiIcons from "react-icons/ai";

import api from "api/axios";

import { ReactComponent as Logo } from "assets/images/logosl1.svg";
import { ReactComponent as DefaultUser } from "assets/images/default-avatar-circle.svg";

import { SidebarData } from "./SidebarData";

function Sidebar({ history }) {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);

  const [User, setUser] = useState(() => null);

  React.useEffect(() => {
    window.scroll(0, 0);

    getUsersLogin();
  }, []);

  function getUsersLogin() {
    const fetchData = async () => {
      try {
        const getToken = JSON.parse(localStorage.getItem("SLIBRARY:token"));

        const response = await api.get("/me", {
          headers: { Authorization: `Bearer ${getToken.access_token}` },
        });

        setUser(response.data);
      } catch (err) {
        console.log(`Error: ${err.message}`);
      }
    };

    fetchData();
  }

  function deleteAllCookies() {
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i];
      var eqPos = cookie.indexOf("=");
      var name = eqPos > -2 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
  }

  function logout() {
    localStorage.removeItem("SLIBRARY:token");
    deleteAllCookies();
    history.push("/login");
  }

  return (
    <>
      <div className="navbar" data-aos="fade-down">
        <button onClick={showSidebar} className="menu-bars">
          <FaIcons.FaBars className="text-white" />
        </button>
      </div>

      <aside className={sidebar ? "nav-menu " : "nav-menu active"}>
        <div className=" max-h-screen h-screen fixed bg-slPurple flex flex-col content-between w-px280">
          <div className="nav-title my-1">
            <div className=" bg-slIndigo-400 rounded-full mr-2 p-2 inline-flex">
              <Logo className=" w-14"></Logo>
            </div>
            <h1 className="text-2xl text-center text-slWhite font-bold ">
              Software <br /> Library
            </h1>
            <span className=" text-3xl absolute top-6 right-1 lg:hidden transition-all duration-500 ease-in-out">
              <BsIcons.BsArrowLeftSquareFill
                onClick={showSidebar}
                className="text-slWhite opacity-50 hover:opacity-80 cursor-pointer "
              />
            </span>
          </div>

          <div className=" bg-slGray-1000 w-full h-px" />

          <div className="flex flex-col text-center my-2 md:my-4">
            <div className="border border-slPurple-dark mx-auto p-1 inline-flex rounded-full overflow-hidden mb-2">
              {User?.Foto ? (
                <img
                  src={User?.Foto}
                  alt={User?.Name}
                  className=" rounded-full object-cover w-20 h-20"
                />
              ) : (
                <DefaultUser
                  className=" fill-slPurple-dark"
                  style={{ width: 70, height: 70 }}
                ></DefaultUser>
              )}
            </div>

            <h1 className="text-lg text-slWhite font-medium capitalize">
              {User?.Name ?? "User Name"}
            </h1>
            <span className="  text-gray-400 ">
              {User?.Level === 2 ? "Admin" : "Member"}
            </span>
          </div>

          <div className=" bg-slGray-1000 w-full h-px" />

          <ul className=" mt-2 md:mt-8">
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName} onClick={showSidebar}>
                  <NavLink to={item.path}>
                    {item.icon}
                    <span className="ml-4">{item.title}</span>
                  </NavLink>
                </li>
              );
            })}
          </ul>

          <div className=" my-auto"></div>

          <ul className=" mb-10">
            <li className="py-2 pr-0 pl-4 h-14 flex items-center ">
              <Link
                to="/"
                className=" flex items-center text-lg text-white px-6 py-2 rounded-md hover:bg-white hover:text-slPurple transition-all duration-300"
              >
                <AiIcons.AiFillHome className=" text-2xl" />
                <span className="ml-4">Go to Home</span>
              </Link>
            </li>
            <li className="py-2 pr-0 pl-4 h-14 flex items-center ">
              <button
                className=" flex items-center text-lg text-white px-6 py-2 rounded-md hover:bg-white hover:text-slPurple transition-all duration-300"
                onClick={logout}
              >
                <RiIcons.RiLogoutBoxLine className=" text-2xl" />
                <span className="ml-4">Logout</span>
              </button>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
}

export default withRouter(Sidebar);
