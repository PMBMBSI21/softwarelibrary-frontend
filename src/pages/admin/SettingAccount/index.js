import React, { useState, useRef } from "react";

import { useHistory } from "react-router-dom";
import swal from "sweetalert";

import Sidebar from "parts/sidebar";

import api from "api/axios";

export default function SettingAccount() {
  const [selectedImage, setSelectedImage] = useState();
  const [btnShow, setBtnShow] = useState(() => false);
  const buttonRef = useRef();

  const [IsLoading, setIsLoading] = useState(false);
  const [Name, setName] = useState(() => "");
  const [Email, setEmail] = useState(() => "");
  const [Password, setPassword] = useState(() => "");
  const [Image, setImage] = useState(() => "");
  const [User, setUser] = useState([]);

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

  React.useEffect(() => {
    if (User) {
      setName(User.Name);
      setEmail(User.Email);
      // setPassword(User.Password);
      // setLevelUser(User.Level);
      // setImage(User.Foto);
    }
  }, [User, setName, setEmail]);

  const imageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
      setImage(e.target.files[0]);
    }
  };

  const handleEdit = async (id) => {
    setIsLoading(true);
    const dataArray = new FormData();
    dataArray.append("Name", Name);
    dataArray.append("Email", Email);
    dataArray.append("Password", Password);
    dataArray.append("Foto", Image);

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
      }
    } catch (err) {
      setIsLoading(false);
      console.log(`Error: ${err.message}`);
    }

    getUsersLogin();
  };

  return (
    <div className="flex">
      <Sidebar></Sidebar>

      <main className=" lg:ml-72 mt-28 px-6 w-full mb-8">
        <div className="container mx-auto">
          <div className="flex items-center" data-aos="fade-right">
            <h1 className="text-3xl font-bold">My Account</h1>
          </div>

          <div className=" md:mt-6">
            <form onSubmit={(e) => e.preventDefault()}>
              <div
                className="md:grid md:grid-cols-2 gap-8 p-6 rounded-lg shadow-lg bg-white py-10"
                data-aos="fade-up"
              >
                <div className="form-input">
                  <label className="block " data-aos="fade-up">
                    <span className="text-black font-semibold text-xl">
                      Name
                    </span>
                    <input
                      type="text"
                      name="Name"
                      value={Name || ""}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your name"
                      className="px-3 py-3 text-gray-600 bg-white rounded border border-gray-300 outline-none focus:outline-purple focus:border-slPurple  w-full"
                    />
                    {/* <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                      Invalid project name field !
                    </span> */}
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
                      value={Email || ""}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="read-only:opacity-70 read-only:bg-gray-200 px-3 py-3 text-gray-600 bg-white rounded border border-gray-300 outline-none w-full"
                      readOnly
                    />
                    {/* <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                      Invalid your email field !
                    </span> */}
                  </label>

                  {btnShow ? (
                    <label className="block mt-4">
                      <span className="text-black font-semibold text-xl">
                        New Password
                      </span>
                      <input
                        type="password"
                        name="Password"
                        // value={Password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter New Password"
                        className="px-3 py-3 text-gray-600 bg-white rounded border border-gray-300 outline-none focus:outline-purple focus:border-slPurple  w-full"
                      />
                      {/* <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                    Invalid your password field !
                  </span> */}
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
                </div>

                <div className="upload-image flex justify-center items-center mt-6 md:mt-0 h-40 md:h-full">
                  <div className="w-4/5 lg:w-2/5 h-full flex items-center transition-all duration-700">
                    <div
                      className="border border-gray-300  w-full h-5/6  rounded-xl overflow-hidden p-2 flex justify-center items-center shadow-md relative"
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
                            src={User?.Foto}
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
                    ref={buttonRef}
                    onClick={() => handleEdit(User.id)}
                    className=" bg-slBlue py-2 px-4 rounded-md text-slWhite w-32 hover:bg-slBlue-dark hover:shadow-xl transition-all duration-500 disabled:opacity-30 disabled:bg-gray-700 outline-none focus:outline-none"
                  >
                    Save
                  </button>
                )}
                {IsLoading && (
                  <button
                    type="submit"
                    // ref={buttonRef}
                    className=" bg-slBlue py-2 px-4 rounded-md text-slWhite w-32 transition-all duration-500 disabled:bg-opacity-50 flex items-center outline-none focus:outline-none"
                    disabled
                  >
                    <img
                      src="/assets/images/img-loading1.gif"
                      alt=""
                      className="w-8 h-8"
                    />
                    Saving...
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
