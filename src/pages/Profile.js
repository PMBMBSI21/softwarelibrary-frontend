import React, { useState } from "react";
import swal from "sweetalert";

import api from "api/axios";

import Navbar from "parts/Navbar";
import Footer from "parts/Footer";

export default function Profile() {
  const [selectedImage, setSelectedImage] = useState();
  const [btnShow, setBtnShow] = useState(() => false);

  const [IsLoading, setIsLoading] = useState(false);

  const [Name, setName] = useState(() => "");
  const [Email, setEmail] = useState(() => "");
  const [Password, setPassword] = useState(() => "");
  // const [LevelUser, setLevelUser] = useState(() => "");
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

  const imageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
      setImage(e.target.files[0]);
    }
  };
  return (
    <>
      <main className="frontPage">
        <section>
          <div className="container mx-auto px-6 lg:px-0">
            <Navbar></Navbar>
          </div>
        </section>

        <section>
          <div className="container mx-auto px-6 lg:px-0 lg:mb-72">
            <h1
              className=" text-3xl text-slGray-900 font-bold my-8"
              data-aos="fade-up"
            >
              My Profile
            </h1>
            <div className="md:flex justify-between">
              <form onSubmit={(e) => e.preventDefault()} className="md:w-3/5">
                <div
                  className=" w-full  shadow-lg bg-white py-14 px-6 rounded-lg md:flex items-center justify-between"
                  data-aos="fade-up"
                  data-aos-delay="100"
                >
                  <div className=" md:w-1/3  order-2">
                    <div
                      className="border border-gray-300 h-32 w-32 mb-3  rounded-full overflow-hidden p-2 flex justify-center items-center shadow-md relative mx-auto"
                      data-aos="zoom-in"
                      data-aos-delay="200"
                    >
                      <div className="grid grid-rows-2 grid-flow-col gap-2 ">
                        <label className=" py-2 px-4 rounded-md text-center text-white hover:bg-slBlue-dark transition-all duration-500 cursor-pointer ">
                          <input
                            accept="image/*"
                            type="file"
                            id="imgProfile"
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
                              alt="Photo Profile"
                              className="absolute top-0 left-0 w-full h-full object-cover object-center"
                            />
                          )}
                        </label>
                      </div>
                    </div>
                    <div className=" flex justify-center">
                      <label
                        htmlFor="imgProfile"
                        className="font-semibold cursor-pointer  text-center hover:text-slGray-600 transition-all duration-100 "
                        data-aos="fade-up"
                        data-aos-delay="300"
                      >
                        Change Photo
                      </label>
                    </div>
                  </div>

                  <div className=" md:w-3/5 order-1 mt-4 md:mt-0">
                    <label
                      className="block "
                      data-aos="fade-up"
                      data-aos-delay="200"
                    >
                      <span className="text-gray-800 font-semibold text-lg">
                        Full Name
                      </span>
                      <input
                        type="text"
                        name="Name"
                        value={Name || ""}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter name"
                        className="block bg-transparent focus:bg-white text-slGray-900 border border-slGray-200 py-2 px-2 focus:shadow-md outline-none focus:border-slIndigo-600 rounded-md w-full transition-all duration-300 mt-2"
                        required
                      />
                    </label>
                    <label
                      className="block mt-4"
                      data-aos="fade-up"
                      data-aos-delay="300"
                    >
                      <span className="text-gray-800 font-semibold text-lg">
                        Email
                      </span>
                      <input
                        readOnly
                        name="Email"
                        value={Email || ""}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        className="read-only:opacity-70 read-only:bg-gray-200 block bg-transparent text-slGray-900 bg-slGray-200 border border-slGray-200 py-2 px-2  outline-none  rounded-md w-full transition-all duration-300 mt-2"
                      />
                    </label>

                    {btnShow ? (
                      <label className="block mt-4 transition-all duration-500">
                        <span className="text-black font-semibold text-xl">
                          New Password
                        </span>
                        <input
                          type="password"
                          name="Password"
                          placeholder="Enter New Password"
                          // value={Password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="px-3 py-3 text-gray-600 bg-white rounded border border-gray-300 outline-none focus:outline-purple focus:border-slPurple  w-full"
                        />
                      </label>
                    ) : null}

                    <div
                      className="mt-3 h-10 flex"
                      data-aos="fade-up"
                      data-aos-delay="400"
                    >
                      <button
                        type="button"
                        className="block w-32  bg-slBlue rounded-md text-white hover:bg-slBlue-dark outline-none focus:outline-none transition-all duration-300"
                        onClick={() => setBtnShow(!btnShow)}
                      >
                        {!btnShow ? "Edit Password" : "Close"}
                      </button>
                    </div>
                  </div>
                </div>

                <div
                  className=" ml-auto w-1/2 md:w-3/12"
                  data-aos="fade-up"
                  data-aos-delay="500"
                >
                  {!IsLoading && (
                    <button
                      type="submit"
                      onClick={() => handleEdit(User.id)}
                      className="py-3 px-6 block w-full mt-4 text-white font-semibold rounded-md bg-slBlue hover:bg-slBlue-dark transition-all duration-500 outline-none focus:outline-none"
                    >
                      Save
                    </button>
                  )}
                  {IsLoading && (
                    <button
                      type="submit"
                      className=" py-3 px-6  w-full mt-4 text-white font-semibold rounded-md bg-slBlue transition-all duration-500 disabled:bg-opacity-50 flex items-center outline-none focus:outline-none"
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
        </section>

        <section>
          <Footer></Footer>
        </section>
      </main>
    </>
  );
}
