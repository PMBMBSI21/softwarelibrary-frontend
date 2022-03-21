import React, { useState, useRef } from "react";
import { Link, useHistory } from "react-router-dom";

import { useForm } from "react-hook-form";

import Tooltips from "@material-tailwind/react/Tooltips";
import TooltipsContent from "@material-tailwind/react/TooltipsContent";

import api from "api/axios";
import swal from "sweetalert";

import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";

import Sidebar from "parts/sidebar";

export default function AddSourceCode() {
  const [selectedImage, setSelectedImage] = useState();

  const buttonRefCategory = useRef();
  const buttonBack = useRef();

  const [IsLoading, setIsLoading] = useState(false);
  const [name, setName] = useState();
  const [ZipFile, setZipFile] = useState();
  const [KategoriID, setKategoriID] = useState();
  const [LinkSource, setLinkSource] = useState();
  const [Description, setDescription] = useState();
  const [PreviewImage, setPreviewImage] = useState();
  const [Ebook, setEbook] = useState();
  const [ProductVersion, setProductVersion] = useState();
  const [dataSoftwares, setDataSoftwares] = useState(() => "");
  const history = useHistory();

  const [listCategories, setListCategories] = useState(() => "");

  // const [descriptionInput, setDescriptionInput] = useState(editorState);
  const onEditorStateChange = (editorState) => {
    setDescription(editorState);
  };

  React.useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get("/kategori");
        setListCategories(response.data);
      } catch (err) {
        console.log(`Error: ${err.message}`);
      }
    };

    fetchCategories();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitForm = async (event) => {
    // event.preventDefault();
    setIsLoading(true);

    const dataArray = new FormData();
    dataArray.append("Name", name);
    dataArray.append("KategoriID", KategoriID);
    dataArray.append("ZipFile", ZipFile);
    dataArray.append("LinkSource", LinkSource);
    // dataArray.append("ReleaseDate", FormatDate);
    // dataArray.append("LinkPreview", LinkPreview);
    // dataArray.append("LinkTutorial", LinkTutorial);
    // dataArray.append("License", License);
    dataArray.append("Description", Description);
    dataArray.append("PreviewImage", PreviewImage);
    dataArray.append("Ebook", Ebook);
    dataArray.append("ProductVersion", ProductVersion);

    const getToken = JSON.parse(localStorage.getItem("SLIBRARY:token"));

    api
      .post("/softwares", dataArray, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${getToken.access_token}`,
        },
      })
      .then((response) => {
        const allData = [...dataSoftwares, response.data];
        setDataSoftwares(allData);

        setIsLoading(false);

        if (response?.status === 201) {
          swal({
            title: "Added!",
            text: `${response?.data?.Name} Successfully Added!`,
            icon: "success",
          });
          history.push("/source-code");
        }
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
      });
  };

  const imageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
      setPreviewImage(e.target.files[0]);
    }
  };
  const ZipFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setZipFile(e.target.files[0]);
    }
  };
  const EbookChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setEbook(e.target.files[0]);
    }
  };

  const handleClear = async (e) => {
    e.preventDefault();

    setName("");
    setZipFile("");
    setKategoriID("");
    setLinkSource("");
    setDescription("");
    setPreviewImage("");
    setEbook("");
    setProductVersion("");
  };

  return (
    <div className="flex">
      <Sidebar></Sidebar>

      <main className="lg:ml-72 mt-28 px-6 w-full mb-8">
        <div className="container mx-auto">
          <div className="flex items-center" data-aos="fade-right">
            <div className="">
              <Link
                to="/source-code"
                ref={buttonBack}
                className=" text-slPurple hover:text-slPurple-dark transition-all duration-500"
              >
                <FaIcons.FaArrowLeft className="text-2xl mr-6" />
              </Link>
              <Tooltips placement="left" ref={buttonBack}>
                <TooltipsContent>Back</TooltipsContent>
              </Tooltips>
            </div>
            <h1 className="text-3xl font-bold">Source Code Add Data</h1>
          </div>

          <div className=" md:mt-6 ">
            <form onSubmit={handleSubmit(submitForm)}>
              <div className="md:grid md:grid-cols-2 gap-8 p-6 rounded-lg shadow-lg bg-white">
                <div className="form-input">
                  <label className="block " data-aos="fade-up">
                    <span className="text-black font-semibold text-xl">
                      Project Name
                    </span>
                    <input
                      type="text"
                      id="name"
                      // name="Name"
                      {...register("Name", {
                        required: "Project Name is required!",
                      })}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter project name"
                      className="px-3 py-3 text-gray-600 bg-white rounded border border-gray-300 outline-none focus:outline-purple focus:border-slPurple  w-full"
                    />
                    <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                      {errors.Name?.message}
                    </span>
                  </label>

                  <div
                    className="flex justify-between items-end"
                    data-aos="fade-up"
                    data-aos-delay="100"
                  >
                    <label className=" w-11/12 mt-4">
                      <span className="text-black font-semibold text-xl">
                        Category Code
                      </span>
                      <select
                        id="category"
                        // name="KategoriID"
                        {...register("KategoriID", {
                          required: "Please select an item in the list.",
                        })}
                        value={KategoriID}
                        onChange={(e) => setKategoriID(e.target.value)}
                        className="form-select block w-full mt-1 px-3 py-3 text-gray-600 bg-white rounded border border-gray-300 outline-none focus:outline-purple focus:border-slPurple"
                      >
                        <option value="" hidden>
                          Select category
                        </option>
                        {listCategories?.length > 0 ? (
                          listCategories.map((data, index) => (
                            <option key={index} value={data.id}>
                              {data.Name}
                            </option>
                          ))
                        ) : (
                          <option>No data</option>
                        )}
                      </select>
                      <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                        {errors.KategoriID?.message}
                      </span>
                    </label>
                    <Link
                      to="/source-code/add-category"
                      ref={buttonRefCategory}
                      className="bg-slPurple flex items-center justify-center h-12 w-14 rounded-md text-slWhite hover:bg-slPurple-dark hover:shadow-lg ml-1 transition-all duration-500"
                    >
                      <FaIcons.FaPlus className="text-center" />
                    </Link>
                    <Tooltips placement="top" ref={buttonRefCategory}>
                      <TooltipsContent>Add Category</TooltipsContent>
                    </Tooltips>
                  </div>

                  <label
                    className="block mt-4"
                    data-aos="fade-up"
                    data-aos-delay="200"
                  >
                    <span className="text-black font-semibold text-xl">
                      Link Demo Source Code
                    </span>
                    <input
                      type="text"
                      id="linkSource"
                      name="LinkSource"
                      value={LinkSource}
                      onChange={(e) => setLinkSource(e.target.value)}
                      placeholder="Enter Link Source Code"
                      className="px-3 py-3 text-gray-600 bg-white rounded border border-gray-300 outline-none focus:outline-purple focus:border-slPurple  w-full"
                    />
                  </label>

                  <label
                    className="block mt-4"
                    data-aos="fade-up"
                    data-aos-delay="400"
                  >
                    <span className="text-black font-semibold text-xl">
                      Product Version
                    </span>
                    <input
                      type="number"
                      id="version"
                      // name="ProductVersion"
                      {...register("ProductVersion", {
                        required: "Product version is required!",
                      })}
                      value={ProductVersion}
                      onChange={(e) => setProductVersion(e.target.value)}
                      placeholder="Enter Product Version"
                      className="px-3 py-3 text-gray-600 bg-white rounded border border-gray-300 outline-none focus:outline-purple focus:border-slPurple  w-full"
                    />
                    <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                      {errors.ProductVersion?.message}
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
                      id="descriptions"
                      name="Description"
                      value={Description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="form-textarea px-3 py-3 text-gray-600 bg-white rounded border border-gray-300 outline-none focus:outline-purple focus:border-slPurple w-full"
                      rows="6"
                      placeholder="Enter some long form content."
                    ></textarea>
                  </label>
                </div>

                <div className="upload-image flex justify-center items-center mt-6 md:mt-0 ">
                  <div className="file-image w-full lg:w-3/4 h-full ">
                    <div
                      className="border border-gray-300 h-48 w-full md:h-2/5 lg:h-1/2 rounded-xl overflow-hidden p-2 flex justify-center items-center shadow-md relative"
                      data-aos="zoom-in"
                      data-aos-delay="700"
                    >
                      <div className=" border-2 border-gray-300 border-dashed w-3/4 md:h-3/4 bg-slWhite rounded-xl p-2 flex justify-center items-center">
                        <div className="grid grid-rows-2 grid-flow-col gap-2 ">
                          <span className="flex items-center font-semibold">
                            Upload your image here!
                          </span>
                          <label className="bg-slBlue py-2 px-4 rounded-md text-center text-white hover:bg-slBlue-dark transition-all duration-500 cursor-pointer ">
                            Browse File
                            <input
                              name="PreviewImage"
                              accept="image/*"
                              type="file"
                              hidden
                              id="imagePreview"
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

                    <div
                      className="mt-6"
                      data-aos="fade-up"
                      data-aos-delay="800"
                    >
                      <h5 className="text-black font-semibold text-xl">
                        Upload Source Code (Zip)
                      </h5>

                      <div className="border border-gray-300 shadow-md rounded-lg p-4 flex justify-center items-center mt-2 ">
                        <label className="cursor-pointer flex justify-center items-center w-full h-full ">
                          <AiIcons.AiOutlineFileZip className=" text-5xl"></AiIcons.AiOutlineFileZip>
                          <input
                            type="file"
                            // name="ZipFile"
                            accept=".zip"
                            {...register("ZipFile", {
                              required: "Source code is required!",
                            })}
                            contentEditable="Upload Your File here"
                            className=" "
                            id="zipFileCode"
                            onChange={ZipFileChange}
                          />
                        </label>
                      </div>
                      <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                        {errors.ZipFile?.message}
                      </span>
                    </div>

                    <div
                      className="mt-6"
                      data-aos="fade-up"
                      data-aos-delay="900"
                    >
                      <h5 className="text-black font-semibold text-xl">
                        Upload E-Book (PDF)
                      </h5>

                      <div className="border border-gray-300 shadow-md rounded-lg p-4 flex justify-center items-center mt-2 ">
                        <label className="cursor-pointer flex justify-center items-center w-full h-full ">
                          <AiIcons.AiOutlineFileZip className=" text-5xl"></AiIcons.AiOutlineFileZip>
                          <input
                            type="file"
                            accept=".pdf"
                            contentEditable="Upload Your File here"
                            className=" "
                            id="ebook"
                            name="Ebook"
                            onChange={EbookChange}
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="my-6 flex justify-center">
                <button
                  onClick={handleClear}
                  className=" bg-gray-400 py-2 px-4 rounded-md text-slWhite w-32 mr-4 hover:bg-gray-600 hover:shadow-xl transition-all duration-500"
                >
                  Clear
                </button>
                {!IsLoading && (
                  <button
                    type="submit"
                    className=" bg-slBlue py-2 px-4 rounded-md text-slWhite w-32 hover:bg-slBlue-dark hover:shadow-xl transition-all duration-500 disabled:opacity-30 disabled:bg-gray-700 outline-none focus:outline-none"
                  >
                    Save
                  </button>
                )}
                {IsLoading && (
                  <button
                    type="submit"
                    className=" bg-slBlue py-2 px-4 rounded-md text-slWhite w-32  transition-all duration-500 disabled:bg-opacity-50 flex items-center"
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
