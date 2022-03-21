import React, { useState, useRef } from "react";
import { Link, useHistory } from "react-router-dom";

import { useForm } from "react-hook-form";

import * as FaIcons from "react-icons/fa";

import Tooltips from "@material-tailwind/react/Tooltips";
import TooltipsContent from "@material-tailwind/react/TooltipsContent";

import swal from "sweetalert";

import api from "api/axios";

import Sidebar from "parts/sidebar";

export default function UserManagement() {
  const [selectedImage, setSelectedImage] = useState();
  const buttonBack = useRef();

  const [IsLoading, setIsLoading] = useState(false);

  const history = useHistory();
  const [errMsg, setErrMsg] = useState("");
  const [Name, setName] = useState(() => "");
  const [Email, setEmail] = useState(() => "");
  const [Password, setPassword] = useState(() => "");
  const [Image, setImage] = useState(() => "");

  const [ListUsers, setListUsers] = useState(() => "");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  React.useEffect(() => {
    window.scroll(0, 0);
  }, []);

  const submit = async (e) => {
    // e.preventDefault();
    setIsLoading(true);

    const dataArray = new FormData();
    dataArray.append("Name", Name);
    dataArray.append("Email", Email);
    dataArray.append("Password", Password);
    dataArray.append("Foto", Image);
    // dataArray.append("Level", level);

    const getToken = JSON.parse(localStorage.getItem("SLIBRARY:token"));

    api
      .post("/users", dataArray, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${getToken.access_token}`,
        },
      })
      .then((response) => {
        const allData = [...ListUsers, response.data];
        setListUsers(allData);
        setIsLoading(false);

        if (response?.status === 201) {
          swal({
            title: "Added!",
            text: `${response?.data?.Name} Successfully Added!`,
            icon: "success",
          });
          history.push(`/user-management`);
        }
      })
      .catch((err) => {
        setIsLoading(false);
        if (err?.response?.status === 500) {
          setErrMsg("Email Already Taken!");
        } else {
          console.log("Add User Failed!");
        }
      });
  };

  const imageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
      setImage(e.target.files[0]);
    }
  };

  const handleClear = async (e) => {
    e.preventDefault();

    setName("");
    setEmail("");
    setPassword("");
    // setLevelUser("");
    setImage("");
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
            <h1 className="text-3xl font-bold">User Management Add Data </h1>
          </div>

          <div className="mt-6 ">
            <form onSubmit={handleSubmit(submit)}>
              <div className="md:grid md:grid-cols-2 gap-8 p-6 rounded-lg shadow-lg bg-white">
                <div className="form-input">
                  <label className="block " data-aos="fade-up">
                    <span className="text-black font-semibold text-xl">
                      Name
                    </span>
                    <input
                      type="text"
                      placeholder="Enter your name"
                      // name="Name"
                      {...register("Name", {
                        required: "Name user is required!",
                        minLength: { value: 3, message: "Min Length is 3" },
                      })}
                      value={Name}
                      onChange={(e) => setName(e.target.value)}
                      className="px-3 py-3 text-gray-600 bg-white rounded border border-gray-300 outline-none focus:outline-purple focus:border-slPurple  w-full"
                    />
                    <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                      {errors.Name?.message}
                    </span>
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
                      type="text"
                      // name="Email"
                      {...register("Email", {
                        required: "Email is required!",
                        pattern: {
                          value: /\S+@\S+\.\S+/,
                          message: "This is not valid email!",
                        },
                      })}
                      placeholder="Enter your email"
                      value={Email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="px-3 py-3 text-gray-600 bg-white rounded border border-gray-300 outline-none focus:outline-purple focus:border-slPurple  w-full"
                    />
                    <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                      {errors.Email?.message}
                    </span>
                    {errMsg && (
                      <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                        {errMsg}
                      </span>
                    )}
                  </label>

                  <label
                    className="block mt-4"
                    data-aos="fade-up"
                    data-aos-delay="100"
                  >
                    <span className="text-black font-semibold text-xl">
                      Password
                    </span>
                    <input
                      type="password"
                      placeholder="Enter your password"
                      // name="Password"
                      {...register("Password", {
                        required: "Password is required!",
                        minLength: { value: 4, message: "Min Length is 4" },
                      })}
                      value={Password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="px-3 py-3 text-gray-600 bg-white rounded border border-gray-300 outline-none focus:outline-purple focus:border-slPurple  w-full"
                    />
                    <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                      {errors.Password?.message}
                    </span>
                  </label>
                </div>

                <div className="upload-image flex justify-center items-center mt-6 md:mt-0 ">
                  <div className=" w-5/6 lg:w-1/2 h-full lg:h-3/4 flex items-center transition-all duration-700">
                    <div
                      className="border border-gray-300  w-full h-40 md:h-3/4 lg:h-5/6 rounded-xl overflow-hidden p-2 flex justify-center items-center shadow-md relative"
                      data-aos="zoom-in"
                      data-aos-delay="700"
                    >
                      <div className=" border-2 border-gray-300 border-dashed w-3/4 md:h-3/4 bg-slWhite rounded-xl p-2 flex justify-center items-center">
                        <label className="bg-slBlue py-2 px-4 rounded-md text-center text-white hover:bg-slBlue-dark transition-all duration-500 cursor-pointer ">
                          Browse File
                          <input
                            name="Foto"
                            accept="image/*"
                            type="file"
                            hidden
                            onChange={imageChange}
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
                <button
                  type="button"
                  onClick={handleClear}
                  className=" bg-gray-400 py-2 px-4 rounded-md text-slWhite w-32 mr-4 hover:bg-gray-600 hover:shadow-xl transition-all duration-500"
                >
                  Clear
                </button>

                {!IsLoading && (
                  <button
                    type="submit"
                    className=" bg-slBlue py-2 px-4 rounded-md text-slWhite w-32 hover:bg-slBlue-dark hover:shadow-xl transition-all duration-500 outline-none disabled:opacity-30 disabled:bg-gray-700 focus:outline-none"
                  >
                    Save
                  </button>
                )}
                {IsLoading && (
                  <button
                    type="submit"
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
