import React, { useState, useRef } from "react";
import { Link, useHistory } from "react-router-dom";

import { useForm } from "react-hook-form";

import Tooltips from "@material-tailwind/react/Tooltips";
import TooltipsContent from "@material-tailwind/react/TooltipsContent";

import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";

import swal from "sweetalert";
import api from "api/axios";

import Sidebar from "parts/sidebar";

export default function AddDocument({ match }) {
  const buttonBack = useRef();

  const [IsLoading, setIsLoading] = useState(false);

  const history = useHistory();
  const [Name, setName] = useState(() => "");
  const [File, setFile] = useState(() => "");
  const [Description, setDescription] = useState(() => "");
  const [listDocument, setListDocument] = useState(() => "");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const SoftwareId = match.params.id;

  React.useEffect(() => {
    window.scroll(0, 0);
  }, []);

  const submit = async (e) => {
    // e.preventDefault();
    setIsLoading(true);

    const IdSoftware = parseInt(SoftwareId);

    const dataArray = new FormData();
    dataArray.append("Title", Name);
    dataArray.append("FileDocument", File);
    dataArray.append("Description", Description);
    dataArray.append("SoftwareID", IdSoftware);

    const getToken = JSON.parse(localStorage.getItem("SLIBRARY:token"));
    api
      .post("/dokumen", dataArray, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${getToken.access_token}`,
        },
      })
      .then((response) => {
        const allData = [...listDocument, response.data];
        setListDocument(allData);
        setIsLoading(false);

        if (response?.status === 201) {
          swal({
            title: "Added!",
            text: `${response?.data?.Title} Successfully Added!`,
            icon: "success",
          });
          history.push(`/source-code/${SoftwareId}`);
        }
      })
      .catch((error) => {
        setIsLoading(false);
        swal({
          title: "Error!",
          text: error.message,
          icon: "error",
        });
      });
  };

  const FileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
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

            <h1 className="text-3xl font-bold">Add Documents</h1>
          </div>

          <div className="mt-4 lg:w-1/2" data-aos="fade-up">
            <form onSubmit={handleSubmit(submit)}>
              <div className="form-input shadow-xl rounded-lg p-6">
                <input
                  type="text"
                  value={SoftwareId}
                  name="SoftwareID"
                  id="SoftwareID"
                  hidden
                  readOnly
                />

                <label className="block " data-aos="fade-up">
                  <span className="text-black font-semibold text-xl">
                    Document Name
                  </span>
                  <input
                    type="text"
                    name="Title"
                    {...register("Title", { required: "This is required" })}
                    value={Name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter Title"
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
                    Descriptions
                  </span>
                  <textarea
                    name="Description"
                    value={Description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="form-textarea px-3 py-3 text-gray-600 bg-white rounded border border-gray-300 outline-none focus:outline-purple focus:border-slPurple w-full"
                    rows="5"
                    placeholder="Enter some long form content."
                  ></textarea>
                </label>

                <div className="mt-4" data-aos="fade-up" data-aos-delay="300">
                  <h5 className="text-black font-semibold text-xl">
                    Upload Document
                  </h5>

                  <div className="border border-gray-300 shadow-md rounded-lg p-4 flex justify-center items-center mt-2 ">
                    <label className="cursor-pointer flex justify-center items-center w-full h-full ">
                      <AiIcons.AiOutlineFileZip className=" text-5xl" />
                      <input
                        // value={File}
                        onChange={FileChange}
                        type="file"
                        name="FileDocument"
                        // {...register("FileDocument", {
                        //   required: "This is required",
                        // })}
                        accept=".pdf,.docx"
                        contentEditable="Upload Your File here"
                        className=" "
                        required
                      />
                    </label>
                  </div>
                  {/* <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                    {errors.FileDocument?.message}
                  </span> */}
                </div>
              </div>

              <div
                className="py-6 mb-10 flex justify-center"
                data-aos="zoom-in"
                data-aos-delay="700"
              >
                {!IsLoading && (
                  <button
                    type="submit"
                    className="disabled:opacity-30 disabled:bg-gray-700 bg-slBlue py-2 px-4 rounded-md text-slWhite w-32 hover:bg-slBlue-dark hover:shadow-xl transition-all duration-500 outline-none focus:outline-none"
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
