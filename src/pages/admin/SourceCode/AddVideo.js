import React, { useState, useRef } from "react";
import { Link, useHistory } from "react-router-dom";

import { useForm } from "react-hook-form";

import Tooltips from "@material-tailwind/react/Tooltips";
import TooltipsContent from "@material-tailwind/react/TooltipsContent";

import * as FaIcons from "react-icons/fa";

import swal from "sweetalert";
import api from "api/axios";

import Sidebar from "parts/sidebar";

export default function AddVideo({ match }) {
  const buttonBack = useRef();

  const [IsLoading, setIsLoading] = useState(false);

  const history = useHistory();
  const [Title, setTitle] = useState(() => "");
  const [Url, setUrl] = useState(() => "");
  const [Description, setDescription] = useState(() => "");
  const [listVideo, setListVideo] = useState(() => "");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const SoftwareId = match.params.id;

  const submit = async (e) => {
    // e.preventDefault();
    setIsLoading(true);

    const newVideo = {
      Title: Title,
      Url: Url,
      Description: Description,
      SoftwareID: parseInt(SoftwareId),
    };

    try {
      const getToken = JSON.parse(localStorage.getItem("SLIBRARY:token"));
      const response = await api.post("/video", newVideo, {
        headers: { Authorization: `Bearer ${getToken.access_token}` },
      });
      const addVideo = [...listVideo, response.data];

      setListVideo(addVideo);
      setTitle("");
      setUrl("");
      setDescription("");
      setIsLoading(false);

      if (response?.status === 201) {
        swal({
          title: "Added!",
          text: `${response?.data?.Title} Successfully Added!`,
          icon: "success",
        });
        history.push(`/source-code/${SoftwareId}`);
      }
    } catch (err) {
      setIsLoading(false);
      // console.log(`Error: ${err.message}`);
      swal({
        title: "Error!",
        text: err.message,
        icon: "error",
      });
    }
  };

  return (
    <div className="flex">
      <Sidebar></Sidebar>

      <main className="lg:ml-72 mt-28 px-6 w-full mb-8">
        <div className="container mx-auto">
          <div className="flex items-center" data-aos="fade-right">
            <Link
              to={`/source-code/${SoftwareId}`}
              ref={buttonBack}
              className=" text-slPurple hover:text-slPurple-dark transition-all duration-500"
            >
              <FaIcons.FaArrowLeft className="text-2xl mr-6" />
            </Link>
            <Tooltips placement="left" ref={buttonBack}>
              <TooltipsContent>Back</TooltipsContent>
            </Tooltips>

            <h1 className="text-3xl font-bold">Add Video</h1>
          </div>

          <div className="mt-4 lg:w-1/2" data-aos="fade-up">
            <form onSubmit={handleSubmit(submit)}>
              <div className="form-input shadow-xl rounded-lg p-6">
                <input
                  type="text"
                  value={SoftwareId}
                  name=""
                  id=""
                  hidden
                  readOnly
                />

                <label className="block " data-aos="fade-up">
                  <span className="text-black font-semibold text-xl">
                    Video Title
                  </span>
                  <input
                    type="text"
                    placeholder="Enter Video Title"
                    {...register("Title", { required: "This is required!" })}
                    value={Title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="px-3 py-3 text-gray-600 bg-white rounded border border-gray-300 outline-none focus:outline-purple focus:border-slPurple  w-full"
                  />
                  <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                    {errors.Title?.message}
                  </span>
                </label>

                <label
                  className="block mt-4"
                  data-aos="fade-up"
                  data-aos-delay="200"
                >
                  <span className="text-black font-semibold text-xl">
                    ID Video
                  </span>
                  <input
                    type="text"
                    placeholder="Enter Id Video"
                    {...register("Url", { required: "This is required!" })}
                    value={Url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="px-3 py-3 text-gray-600 bg-white rounded border border-gray-300 outline-none focus:outline-purple focus:border-slPurple  w-full"
                  />
                  <span className=" text-gray-500 text-sm">
                    Example: https://www.youtube.com/watch?v=
                    <span className=" text-semibold">6pXt3F4SjpQ</span> just
                    take id = "6pXt3F4SjpQ"
                  </span>
                  <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                    {errors.Url?.message}
                  </span>
                </label>

                <label
                  className="block mt-4"
                  data-aos="fade-up"
                  data-aos-delay="500"
                >
                  <span className="text-black font-semibold text-xl">
                    Descriptions
                  </span>
                  <textarea
                    className="form-textarea px-3 py-3 text-gray-600 bg-white rounded border border-gray-300 outline-none focus:outline-purple focus:border-slPurple w-full"
                    rows="5"
                    placeholder="Enter some long form content."
                    value={Description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </label>
              </div>

              <div
                className="py-6 mb-10 flex justify-center"
                data-aos="zoom-in"
                data-aos-delay="700"
              >
                {!IsLoading && (
                  <button
                    type="submit"
                    className=" bg-slBlue  py-2 px-4 rounded-md text-slWhite w-32 hover:bg-slBlue-dark hover:shadow-xl transition-all duration-500 disabled:opacity-30 disabled:bg-gray-700 outline-none focus:outline-none"
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
