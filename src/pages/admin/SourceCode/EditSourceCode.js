import React, { useState, useRef } from "react";
import { Link, useHistory } from "react-router-dom";

import Tooltips from "@material-tailwind/react/Tooltips";
import TooltipsContent from "@material-tailwind/react/TooltipsContent";

import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";

import swal from "sweetalert";
import api from "api/axios";

import Sidebar from "parts/sidebar";

export default function EditSourceCode({ match }) {
  const [selectedImage, setSelectedImage] = useState();
  const [btnShow, setBtnShow] = useState(() => false);
  const [btnEbookShow, setBtnEbookShow] = useState(() => false);

  const buttonBack = useRef();

  const [IsLoading, setIsLoading] = useState(false);

  const history = useHistory();
  const [Name, setName] = useState(() => "");
  const [Category, setCategory] = useState(() => "");
  const [LinkSourceCode, setLinkSourceCode] = useState(() => "");
  const [Version, setVersion] = useState(() => "");
  const [Description, setDescription] = useState(() => "");
  const [Image, setImage] = useState(() => "");
  const [ZipSourceCode, setZipSourceCode] = useState(() => "");
  const [Ebook, setEbook] = useState(() => "");

  const [app, setApp] = useState(() => "");
  const [listCategories, setListCategories] = useState(() => "");

  React.useEffect(() => {
    window.scroll(0, 0);

    const fetchCategories = async () => {
      try {
        const getToken = JSON.parse(localStorage.getItem("SLIBRARY:token"));

        const response = await api.get("/kategori", {
          headers: { Authorization: `Bearer ${getToken.access_token}` },
        });
        setListCategories(response.data);
      } catch (err) {
        console.log(`Error: ${err.message}`);
      }
    };

    fetchCategories();
  }, []);

  React.useEffect(() => {
    const fetchSoftware = async () => {
      try {
        const getToken = JSON.parse(localStorage.getItem("SLIBRARY:token"));

        const response = await api.get(`/softwares/${match.params.id}`, {
          headers: { Authorization: `Bearer ${getToken.access_token}` },
        });
        setApp(response.data);
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
  }, [match.params.id]);

  React.useEffect(() => {
    if (app) {
      setName(app.Name);
      setCategory(app.Kategori);
      setLinkSourceCode(app.LinkSource);
      setVersion(app.ProductVersion);
      setDescription(app.Description);
      // setImage(app.PreviewImage);
      // setZipSourceCode(app.ZipFile);
      // setEbook(app.Ebook);
    }
  }, [
    app,
    setName,
    setCategory,
    setLinkSourceCode,
    setVersion,
    setDescription,
    // setImage,
    // setZipSourceCode,
    // setEbook,
  ]);

  const handleEdit = async (id) => {
    setIsLoading(true);

    const dataArray = new FormData();
    dataArray.append("Name", Name);
    dataArray.append("KategoriID", Category);
    dataArray.append("LinkSource", LinkSourceCode);
    dataArray.append("ProductVersion", Version);
    dataArray.append("Description", Description);
    dataArray.append("PreviewImage", Image);
    dataArray.append("ZipFile", ZipSourceCode);
    dataArray.append("Ebook", Ebook);

    try {
      const getToken = JSON.parse(localStorage.getItem("SLIBRARY:token"));
      const response = await api.put(`/softwares/${id}`, dataArray, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${getToken.access_token}`,
        },
      });

      setName("");
      setCategory("");
      setLinkSourceCode("");
      setVersion("");
      setDescription("");
      setImage("");
      setZipSourceCode("");
      setEbook("");

      setIsLoading(false);

      if (response?.status === 200) {
        swal({
          title: "Updated!",
          text: `${response?.data?.Name} Successfully Updated!`,
          icon: "success",
        });
        history.push(`/source-code/${app.id}`);
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

  const ZipFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setZipSourceCode(e.target.files[0]);
    }
  };

  const EbookChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setEbook(e.target.files[0]);
    }
  };

  return (
    <div className="flex">
      <Sidebar></Sidebar>

      <main className="lg:ml-72 mt-28 px-6 w-full mb-8">
        {app ? (
          <div className="container mx-auto">
            <div className="flex items-center" data-aos="fade-right">
              <Link
                to={`/source-code/${app?.id}`}
                ref={buttonBack}
                className=" text-slPurple hover:text-slPurple-dark transition-all duration-500"
              >
                <FaIcons.FaArrowLeft className="text-2xl mr-6" />
              </Link>
              <Tooltips placement="left" ref={buttonBack}>
                <TooltipsContent>Back</TooltipsContent>
              </Tooltips>
              <h1 className="text-3xl font-bold">Source Code Edit Data</h1>
            </div>

            <div className=" md:mt-6 ">
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="md:grid md:grid-cols-2 gap-8 p-6 rounded-lg shadow-lg bg-white lg:h-800 ">
                  <div className="form-input">
                    <label className="block " data-aos="fade-up">
                      <span className="text-black font-semibold text-xl">
                        Project Name
                      </span>
                      <input
                        type="text"
                        value={Name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter project name"
                        className="px-3 py-3 text-gray-600 bg-white rounded border border-gray-300 outline-none focus:outline-none focus:border-slPurple  w-full"
                      />
                      {/* <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                        Invalid project name field !
                      </span> */}
                    </label>

                    <div
                      className="flex justify-between items-end"
                      data-aos="fade-up"
                      data-aos-delay="100"
                    >
                      <label className=" w-full mt-4">
                        <span className="text-black font-semibold text-xl ">
                          Category Code
                        </span>
                        <select
                          value={Category}
                          onChange={(e) => setCategory(e.target.value)}
                          className="form-select block w-full mt-1 px-3 py-3 text-gray-600 bg-white rounded border border-gray-300 outline-none focus:outline-none focus:border-slPurple"
                        >
                          <option value={app?.Kategori?.id} hidden>
                            {app?.Kategori?.Name ?? "no data"}
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
                      </label>
                    </div>

                    <label
                      className="block mt-4"
                      data-aos="fade-up"
                      data-aos-delay="200"
                    >
                      <span className="text-black font-semibold text-xl">
                        Link Source Code
                      </span>
                      <input
                        type="text"
                        value={LinkSourceCode}
                        onChange={(e) => setLinkSourceCode(e.target.value)}
                        placeholder="Enter Link Source Code"
                        className="px-3 py-3 text-gray-600 bg-white rounded border border-gray-300 outline-none focus:outline-none focus:border-slPurple  w-full"
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
                        value={Version}
                        onChange={(e) => setVersion(e.target.value)}
                        className="px-3 py-3 text-gray-600 bg-white rounded border border-gray-300 outline-none focus:outline-none focus:border-slPurple  w-full"
                      />
                      {/* <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                        Invalid Product Version !
                      </span> */}
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
                        className="form-textarea px-3 py-3 text-gray-600 bg-white rounded border border-gray-300 outline-none focus:outline-none focus:border-slPurple w-full"
                        rows="10"
                        placeholder="Enter some long form content."
                        value={Description}
                        onChange={(e) => setDescription(e.target.value)}
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
                                accept="image/*"
                                type="file"
                                hidden
                                onChange={imageChange}
                              />
                              <img
                                src={app?.PreviewImage}
                                alt=""
                                className="absolute top-0 left-0 w-full h-full object-cover object-top"
                              />
                              {selectedImage && (
                                <img
                                  src={URL.createObjectURL(selectedImage)}
                                  alt="Thumb"
                                  className="absolute top-0 left-0 w-full h-full object-cover object-top"
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
                          File Source Code (Zip)
                        </h5>
                        {btnShow ? (
                          <div className="border border-gray-300 shadow-md rounded-lg p-4 flex justify-center items-center mt-2 ">
                            <label className="cursor-pointer flex justify-center items-center w-full h-full ">
                              <AiIcons.AiOutlineFileZip className=" text-5xl"></AiIcons.AiOutlineFileZip>
                              <input
                                type="file"
                                accept=".zip"
                                name="ZipFile"
                                // value={ZipSourceCode}
                                onChange={ZipFileChange}
                                className=" "
                              />
                            </label>
                          </div>
                        ) : (
                          ""
                        )}
                        <div className="mt-2 h-10 flex">
                          <a
                            href={app?.ZipFile}
                            className=" w-28 flex items-center justify-center mr-3 bg-cyan-400 cursor-pointer  hover:bg-cyan-700 rounded-md text-white transition-all duration-300 "
                          >
                            Show File
                          </a>
                          <button
                            type="button"
                            className="block w-28  bg-slBlue rounded-md text-white hover:bg-slBlue-dark transition-all duration-300"
                            onClick={() => setBtnShow(!btnShow)}
                          >
                            {!btnShow ? "Edit File" : "Close"}
                          </button>
                        </div>
                      </div>

                      <div
                        className="mt-6"
                        data-aos="fade-up"
                        data-aos-delay="900"
                      >
                        <h5 className="text-black font-semibold text-xl">
                          Upload E-Book (PDF)
                        </h5>

                        {btnEbookShow ? (
                          <div className="border border-gray-300 shadow-md rounded-lg p-4 flex justify-center items-center mt-2 ">
                            <label className="cursor-pointer flex justify-center items-center w-full h-full ">
                              <AiIcons.AiOutlineFileZip className=" text-5xl"></AiIcons.AiOutlineFileZip>
                              <input
                                type="file"
                                accept=".pdf"
                                contentEditable="Upload Your File here"
                                name="Ebook"
                                // value={Ebook}
                                onChange={EbookChange}
                                className=" "
                              />
                            </label>
                          </div>
                        ) : null}

                        <div className="mt-2 h-10 flex">
                          {app?.Ebook && (
                            <a
                              href={app?.Ebook}
                              target="_blank"
                              rel="noreferrer noopener"
                              className=" w-28 flex items-center justify-center mr-3 bg-cyan-400 hover:bg-cyan-700 rounded-md text-white transition-all duration-300"
                            >
                              Show File
                            </a>
                          )}
                          <button
                            type="button"
                            className="block w-28  bg-slBlue rounded-md text-white hover:bg-slBlue-dark transition-all duration-300"
                            onClick={() => setBtnEbookShow(!btnEbookShow)}
                          >
                            {!btnEbookShow ? "Edit Book" : "Close"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="my-6 flex justify-center">
                  {!IsLoading && (
                    <button
                      type="button"
                      onClick={() => handleEdit(app.id)}
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
        ) : (
          <div className=" py-8 px-14 bg-gray-300">data Not Found</div>
        )}
      </main>
    </div>
  );
}
