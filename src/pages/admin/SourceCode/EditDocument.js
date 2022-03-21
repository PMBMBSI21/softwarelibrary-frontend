import React, { useState, useRef } from "react";
import { Link, useHistory } from "react-router-dom";

import Tooltips from "@material-tailwind/react/Tooltips";
import TooltipsContent from "@material-tailwind/react/TooltipsContent";

import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";

import api from "api/axios";
import swal from "sweetalert";

import Sidebar from "parts/sidebar";

export default function EditDocument({ match }) {
  const buttonBack = useRef();
  const [btnShow, setBtnShow] = useState(() => false);

  const [IsLoading, setIsLoading] = useState(false);

  const history = useHistory();
  const [Name, setName] = useState(() => "");
  const [Description, setDescription] = useState(() => "");
  const [File, setFile] = useState(() => "");
  const [documentId, setDocumentId] = useState(() => "");

  React.useEffect(() => {
    window.scroll(0, 0);

    const fetchData = async () => {
      try {
        const getToken = JSON.parse(localStorage.getItem("SLIBRARY:token"));
        const response = await api.get(`/dokumen/${match.params.id}`, {
          headers: { Authorization: `Bearer ${getToken.access_token}` },
        });
        setDocumentId(response.data);
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
    fetchData();
  }, [match.params.id]);

  React.useEffect(() => {
    if (documentId) {
      setName(documentId.Title);
      setDescription(documentId.Description);
      setFile(documentId.FileDocument);
    }
  }, [documentId, setName, setDescription]);

  const handleEdit = async (id) => {
    setIsLoading(true);
    const dataArray = new FormData();
    dataArray.append("Title", Name);
    dataArray.append("FileDocument", File);
    dataArray.append("Description", Description);
    dataArray.append("SoftwareID", documentId.SoftwareID);

    try {
      const getToken = JSON.parse(localStorage.getItem("SLIBRARY:token"));
      const response = await api.put(`/dokumen/${id}`, dataArray, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${getToken.access_token}`,
        },
      });

      setDocumentId("");
      setName("");
      setDescription("");
      setFile("");

      setIsLoading(false);

      if (response?.status === 200) {
        swal({
          title: "Updated!",
          text: `${response?.data?.Title} Successfully Updated!`,
          icon: "success",
        });

        history.push(`/source-code/${documentId.SoftwareID}`);
      }
    } catch (err) {
      setIsLoading(false);
      console.log(`Error: ${err.message}`);
    }
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
              to={`/source-code/${documentId.SoftwareID}`}
              ref={buttonBack}
              className=" text-slPurple hover:text-slPurple-dark transition-all duration-500"
            >
              <FaIcons.FaArrowLeft className="text-2xl mr-6" />
            </Link>
            <Tooltips placement="left" ref={buttonBack}>
              <TooltipsContent>Back</TooltipsContent>
            </Tooltips>

            <h1 className="text-3xl font-bold">Edit Documents</h1>
          </div>

          <div className="mt-4 lg:w-1/2" data-aos="fade-up">
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="form-input shadow-xl rounded-lg p-6">
                <input
                  type="text"
                  value={documentId.SoftwareId}
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
                    value={Name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter Video Title"
                    className="px-3 py-3 text-gray-600 bg-white rounded border border-gray-300 outline-none focus:outline-purple focus:border-slPurple  w-full"
                    required
                  />
                  {/* <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                    Invalid document name field !
                  </span> */}
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
                  <h5 className="text-black font-semibold text-xl">Document</h5>

                  {btnShow ? (
                    <div className="border border-gray-300 shadow-md rounded-lg p-4 flex justify-center items-center mt-2 ">
                      <label className="cursor-pointer flex justify-center items-center w-full h-full ">
                        <AiIcons.AiOutlineFileZip className=" text-5xl" />

                        <input
                          type="file"
                          // value={File}
                          name="FileDocument"
                          accept=".pdf,.docx"
                          onChange={FileChange}
                          contentEditable="Upload Your File here"
                          className=" "
                        />
                      </label>
                    </div>
                  ) : (
                    ""
                  )}
                </div>

                <div className="mt-2 h-10 flex">
                  <a
                    href={documentId.FileDocument}
                    target="_blank"
                    rel="noreferrer noopener"
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
                className="py-6 mb-10 flex justify-center"
                data-aos="zoom-in"
                data-aos-delay="700"
              >
                {!IsLoading && (
                  <button
                    type="submit"
                    onClick={() => handleEdit(documentId.id)}
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
