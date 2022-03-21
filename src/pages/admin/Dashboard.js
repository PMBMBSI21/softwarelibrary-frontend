import React, { useState } from "react";

import * as FaIcons from "react-icons/fa";
import * as HiIcons from "react-icons/hi";

import api from "api/axios";

import Sidebar from "parts/sidebar";

export default function Dashboard() {
  const BgColor = [
    "bg-blue-800 mt-4 md:mt-0",
    "bg-blue-100 mt-4 md:mt-0",
    "bg-slBrawn mt-4 md:mt-0",
    "bg-slPurple-light mt-4 md:mt-0",
  ];

  const [UserLogin, setUserLogin] = useState(() => null);
  const [listUser, setListUser] = useState([]);
  const [data, setData] = useState([]);
  const [Categories, setCategories] = useState(() => "");

  React.useEffect(() => {
    window.scroll(0, 0);

    getUsers();
    getUsersLogin();
  }, []);

  function getUsersLogin() {
    const fetchData = async () => {
      try {
        const getToken = JSON.parse(localStorage.getItem("SLIBRARY:token"));

        const response = await api.get("/me", {
          headers: { Authorization: `Bearer ${getToken.access_token}` },
        });

        setUserLogin(response.data);
      } catch (err) {
        console.log(`Error: ${err.message}`);
      }
    };

    fetchData();
  }

  function getUsers() {
    const fetchData = async () => {
      try {
        const getToken = JSON.parse(localStorage.getItem("SLIBRARY:token"));
        const response = await api.get("/users", {
          headers: { Authorization: `Bearer ${getToken.access_token}` },
        });
        setListUser(response.data);
      } catch (err) {
        console.log(`Error: ${err.message}`);
      }
    };

    fetchData();
  }

  React.useEffect(() => {
    const fetchCategories = async () => {
      try {
        const getToken = JSON.parse(localStorage.getItem("SLIBRARY:token"));
        const response = await api.get("/kategori", {
          headers: { Authorization: `Bearer ${getToken.access_token}` },
        });
        setCategories(response.data);
      } catch (err) {
        if (err.response) {
          // Not in the 200 response range
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        } else {
          console.log(`Error: ${err.message}`);
        }
      }
    };

    fetchCategories();
  }, []);

  React.useEffect(() => {
    const fetchSoftware = async () => {
      try {
        const getToken = JSON.parse(localStorage.getItem("SLIBRARY:token"));
        const response = await api.get(`/softwares`, {
          headers: { Authorization: `Bearer ${getToken.access_token}` },
        });
        setData(response.data);
      } catch (err) {
        if (err.response) {
          // Not in the 200 response range
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        } else {
          console.log(`Error: ${err.message}`);
        }
      }
    };

    fetchSoftware();
  }, []);

  let totalDownloadAll = 0;
  let i;

  for (i = 0; i < data.length; i++) {
    totalDownloadAll += data[i].TotalDownload;
  }

  return (
    <div className="flex">
      <Sidebar></Sidebar>

      <main className=" lg:ml-72 mt-28 px-6 w-full mb-8">
        <div className="container mx-auto w-full">
          <div className="" data-aos="fade-right">
            <h1 className="text-3xl font-bold capitalize">
              Welcome, {UserLogin?.Name}!
            </h1>
          </div>

          <div className="md:grid lg:grid-cols-2 md:gap-4 mt-6">
            <div className="" data-aos="fade-up" data-aos-delay="100">
              <div className=" bg-slPurple shadow-inner w-full h-90 md:h-full rounded-2xl bg-opacity-30 mt-4 md:mt-0">
                <div className="flex h-full py-8">
                  <div className="flex items-center justify-center w-1/2">
                    <div className="visits text-center">
                      <div className=" bg-slPurple text-7xl text-white flex items-center justify-center rounded-full w-32 h-32">
                        <FaIcons.FaUsers />
                      </div>
                      <h5 className="  text-base mt-8 text-gray-500">
                        Total Users
                      </h5>
                      <div className=" text-5xl lg:text-7xl mt-2 font-bold">
                        {listUser.length}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-center w-1/2">
                    <div className="visits text-center">
                      <div className=" bg-slPurple text-7xl text-white flex items-center justify-center rounded-full w-32 h-32">
                        <HiIcons.HiDownload />
                      </div>
                      <h5 className="  text-base mt-8 text-gray-500">
                        Total Download
                      </h5>
                      <div className="text-5xl lg:text-7xl mt-2 font-bold">
                        {totalDownloadAll}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="" data-aos="fade-up" data-aos-delay="200">
              <div className="md:grid md:grid-cols-2 gap-4 ">
                {Categories.length > 0 ? (
                  Categories?.slice(0, 4).map((item, index) => (
                    <div
                      className={`${BgColor[index]}  w-full h-60 rounded-2xl py-8 px-6 bg-opacity-20 shadow-inner`}
                      data-aos="fade-up"
                      data-aos-delay="300"
                      key={index}
                    >
                      <div className="relative">
                        <h3 className="font-bold text-2xl">{item.Name}</h3>
                        <p className=" font-semibold text-lg text-slPurple">
                          Total Download
                        </p>

                        <div className="text-7xl font-bold text-center mt-6">
                          {item.TotalDownload}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-slGray-900 py-8 px-12">
                    No Category yet
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
