import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";

import * as BsIcons from "react-icons/bs";
import * as BiIcons from "react-icons/bi";

export default function SidebarWatch({ data }) {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);
  const params = useParams();
  const activeLink = window.location.pathname;

  return (
    <div className=" lg:w-3/12 mb-4" data-aos="fade-right">
      <div className=" lg:hidden transition-all duration-500 ease-in-out z-10 ">
        <button
          className="absolute top-8 left-6  outline-none focus:outline-none"
          onClick={showSidebar}
        >
          <BiIcons.BiMenuAltLeft className=" text-2xl" />
        </button>
      </div>
      <aside className={sidebar ? "toggle-video active" : "toggle-video "}>
        <div className=" w-full  flex flex-col content-between z-10  py-4">
          <ul className="">
            <li className="w-10/12 mx-auto">
              <Link
                to={`/applications/${params?.id}`}
                className=" bg-slIndigo-400 py-2 px-6 rounded-md hover:bg-slIndigo-600 transition-all duration-300 hover:text-white"
              >
                Back
              </Link>
            </li>
            {data?.map((item, index) => (
              <li key={index} className=" w-10/12 mx-auto">
                <a
                  href={`${item?.id}=${item?.Url}`}
                  className={
                    activeLink ===
                    `/applications/${params.id}/` + item?.id + "=" + item?.Url
                      ? "nav-link-video active"
                      : "nav-link-video "
                  }
                >
                  <BsIcons.BsPlayCircleFill className="mr-2" />
                  {item?.Title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  );
}
