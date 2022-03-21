import React, { useState, useRef } from "react";
import { Link, useHistory } from "react-router-dom";

import * as FaIcons from "react-icons/fa";

import Tooltips from "@material-tailwind/react/Tooltips";
import TooltipsContent from "@material-tailwind/react/TooltipsContent";

import swal from "sweetalert";

import api from "api/axios";

import Sidebar from "parts/sidebar";

export default function UserManagement({ match }) {
  const [selectedImage, setSelectedImage] = useState();
  const buttonBack = useRef();
  const [btnShow, setBtnShow] = useState(() => false);

  const [IsLoading, setIsLoading] = useState(false);

  const history = useHistory();
  const [Name, setName] = useState(() => "");
  const [Email, setEmail] = useState(() => "");
  const [Password, setPassword] = useState(() => "");
  const [LevelUser, setLevelUser] = useState(() => "");
  const [Image, setImage] = useState(() => "");

  const [GetUserById, setGetUserById] = useState(() => "");

  React.useEffect(() => {
    window.scroll(0, 0);

    if (GetUserById) {
      setName(GetUserById.Name);
      setEmail(GetUserById.Email);
      // setPassword(GetUserById.Password);
      setLevelUser(GetUserById.Level);
      setImage(GetUserById.Foto);
    }
  }, [GetUserById, setName, setEmail, setLevelUser, setImage]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const getToken = JSON.parse(localStorage.getItem("SLIBRARY:token"));

        const response = await api.get(`/users/${match.params.id}`, {
          headers: { Authorization: `Bearer ${getToken.access_token}` },
        });
        setGetUserById(response.data);
      } catch (err) {
        console.log(`Error: ${err.message}`);
      }
    };

    fetchData();
  }, [match.params.id]);

  const handleEdit = async (id) => {
    setIsLoading(true);

    const level = parseInt(LevelUser);

    const dataArray = new FormData();
    dataArray.append("Name", Name);
    dataArray.append("Email", Email);
    dataArray.append("Password", Password);
    dataArray.append("Foto", Image);
    dataArray.append("Level", level);

    try {
      const getToken = JSON.parse(localStorage.getItem("SLIBRARY:token"));
      const response = await api.put(`/users/${id}`, dataArray, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${getToken.access_token}`,
        },
      });

      setIsLoading(false);

      if (response?.status === 200) {
        swal({
          title: "Updated!",
          text: `${response?.data?.Name} Successfully Updated!`,
          icon: "success",
        });
        history.push(`/user-management`);
      }
    } catch (err) {
      setIsLoading(false);
      console.log(`Error: ${err.message}`);
    }
  };

  const imageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
      setImage(e.target.files[0]);
    }
  };

  return (
    <div className="flex">
      <Sidebar></Sidebar>

      <main className=" lg:ml-72 mt-28 px-6 w-full mb-8">
        <div className="container mx-auto">
          <div className="flex items-center" data-aos="fade-right">
            <Link
              to="/user-management"
              ref={buttonBack}
              className=" text-slPurple hover:text-slPurple-dark transition-all duration-500"
            >
              <FaIcons.FaArrowLeft className="text-2xl mr-6" />
            </Link>
            <Tooltips placement="left" ref={buttonBack}>
              <TooltipsContent>Back</TooltipsContent>
            </Tooltips>
            <h1 className="text-3xl font-bold">User Management Edit Data</h1>
          </div>

          <div className="mt-6 ">
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="md:grid md:grid-cols-2 gap-8 p-6 rounded-lg shadow-lg bg-white">
                <div className="form-input">
                  <label className="block " data-aos="fade-up">
                    <span className="text-black font-semibold text-xl">
                      Name
                    </span>
                    <input
                      type="text"
                      placeholder="Enter your name"
                      name="Name"
                      value={Name}
                      onChange={(e) => setName(e.target.value)}
                      className="px-3 py-3 text-gray-600 bg-white rounded border border-gray-300 outline-none focus:outline-purple focus:border-slPurple  w-full"
                    />
                  </label>

                  <label
                    className="block mt-4"
                    data-aos="fade-up"
                    data-aos-delay="100"
                  >
                    <span className="text-black font-semibold text-xl">
                      Email
                    </span>
                    <input
                      type="email"
                      name="Email"
                      placeholder="Enter your email"
                      value={Email}
                      onChange={(e) => setEmail(e.target.value)}
                      className=" read-only:opacity-70 read-only:bg-gray-200 px-3 py-3 text-gray-600 bg-white rounded border border-gray-300 outline-none   w-full"
                      readOnly
                    />
                  </label>

                  {btnShow ? (
                    <label className="block mt-4">
                      <span className="text-black font-semibold text-xl">
                        New Password
                      </span>
                      <input
                        type="password"
                        name="Password"
                        placeholder="Enter New Password"
                        value={Password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="px-3 py-3 text-gray-600 bg-white rounded border border-gray-300 outline-none focus:outline-purple focus:border-slPurple  w-full"
                      />
                    </label>
                  ) : null}

                  <div className="mt-3 h-10 flex">
                    <button
                      type="button"
                      className="block w-32  bg-slBlue rounded-md text-white hover:bg-slBlue-dark outline-none focus:outline-none transition-all duration-300"
                      onClick={() => setBtnShow(!btnShow)}
                    >
                      {!btnShow ? "Edit Password" : "Close"}
                    </button>
                  </div>

                  <label
                    className="block mt-4"
                    data-aos="fade-up"
                    data-aos-delay="200"
                  >
                    <span className="text-black font-semibold text-xl">
                      Level
                    </span>
                    <select
                      name="Level"
                      value={LevelUser}
                      onChange={(e) => setLevelUser(e.target.value)}
                      className="form-select block w-8/1 lg:w-1/2 mt-1 px-3 py-3 text-gray-600 bg-white rounded border border-gray-300 outline-none focus:outline-purple focus:border-slPurple"
                    >
                      <option value={GetUserById.level} hidden>
                        {GetUserById.level === 2 ? "Admin" : "Member"}
                      </option>
                      <option value="1">Member</option>
                      <option value="2">Admin</option>
                    </select>
                  </label>
                </div>

                <div className="upload-image flex justify-center items-center mt-6 md:mt-0 ">
                  <div className="lg:w-1/2 h-full lg:h-3/4 flex items-center transition-all duration-700">
                    <div
                      className="border border-gray-300  w-full h-40 md:h-3/4 lg:h-5/6 rounded-xl overflow-hidden p-2 flex justify-center items-center shadow-md relative"
                      data-aos="zoom-in"
                      data-aos-delay="700"
                    >
                      <div className=" border-2 border-gray-300 border-dashed w-3/4 md:h-3/4 bg-slWhite rounded-xl p-2 flex justify-center items-center">
                        <label className="bg-slBlue py-2 px-4 rounded-md text-center text-white hover:bg-slBlue-dark transition-all duration-500 cursor-pointer ">
                          Browse File
                          <input
                            accept="image/*"
                            type="file"
                            hidden
                            onChange={imageChange}
                          />
                          <img
                            src={GetUserById?.Foto}
                            alt="Thumb"
                            className="absolute top-0 left-0 w-full h-full object-cover object-center"
                          />
                          {selectedImage && (
                            <img
                              src={URL.createObjectURL(selectedImage)}
                              alt="Thumb"
                              className="absolute top-0 left-0 w-full h-full object-cover object-center"
                            />
                          )}
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="my-6 flex justify-center">
                {!IsLoading && (
                  <button
                    type="button"
                    onClick={() => handleEdit(GetUserById.id)}
                    className=" bg-slBlue py-2 px-4 rounded-md text-slWhite w-32 hover:bg-slBlue-dark hover:shadow-xl transition-all duration-500 disabled:opacity-30 disabled:bg-gray-700"
                  >
                    Save
                  </button>
                )}
                {IsLoading && (
                  <button
                    type="submit"
                    className=" bg-slBlue py-2 px-6 rounded-md text-slWhite  transition-all duration-500 disabled:bg-opacity-50 flex items-center outline-none focus:outline-none"
                    disabled
                  >
                    <img
                      src="/assets/images/img-loading1.gif"
                      alt=""
                      className="w-8 h-8"
                    />
                    Updating...
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
