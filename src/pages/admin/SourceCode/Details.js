import React, { useState, useRef } from "react";
import { Link, useHistory } from "react-router-dom";

import Modal from "@material-tailwind/react/Modal";
import ModalFooter from "@material-tailwind/react/ModalFooter";
import Button from "@material-tailwind/react/Button";
import ModalBody from "@material-tailwind/react/ModalBody";
import Tooltips from "@material-tailwind/react/Tooltips";
import TooltipsContent from "@material-tailwind/react/TooltipsContent";

import api from "api/axios";
import swal from "sweetalert";

import * as FaIcons from "react-icons/fa";

import Sidebar from "parts/sidebar";
import Pagination from "parts/Pagination";
const moment = require("moment");

export default function Details({ match }) {
  let noVideos = 1;
  let noDocs = 1;
  const history = useHistory();
  const [showModal, setShowModal] = useState(false);
  const [showModalVideo, setShowModalVideo] = useState(false);
  const [showModalDocs, setShowModalDocs] = useState(false);

  const setShowModalCode = () => setShowModal(!showModal);
  const setShowModalCodeVideo = () => setShowModalVideo(!showModalVideo);
  const setShowModalCodeDocs = () => setShowModalDocs(!showModalDocs);

  const buttonBack = useRef();
  const buttonRefDelete = useRef();
  const buttonRefEdit = useRef();
  const buttonRefAdd = useRef();

  const [DeleteIdVideo, setDeleteIdVideo] = useState("");
  const [DeleteIdDocs, setDeleteIdDocs] = useState("");

  const inputEl = useRef("");
  const inputElVideo = useRef("");
  const [searchVideo, setSearchVideo] = useState("");
  const [searchResultsVideo, setSearchResultsVideo] = useState("");

  const [searchDocument, setSearchDocument] = useState("");
  const [searchResultsDocument, setSearchResultsDocument] = useState("");

  const [app, setApp] = useState(() => "");

  // Paginate Video Table
  const [currentPageVideo, setCurrentPageVideo] = useState(1);
  const [dataPerPageVideo] = useState(10);

  const indexOfLastDataVideo = currentPageVideo * dataPerPageVideo;
  const indexOfFirstDataVideo = indexOfLastDataVideo - dataPerPageVideo;
  const currentDataVideos = app?.data?.VideoTutorial.slice(
    indexOfFirstDataVideo,
    indexOfLastDataVideo
  );
  const paginateVideo = (pageNumber) => setCurrentPageVideo(pageNumber);

  // Paginate Document Table
  const [currentPageDocument, setCurrentPageDocument] = useState(1);
  const [dataPerPageDocument] = useState(10);

  const indexOfLastDataDocument = currentPageDocument * dataPerPageDocument;
  const indexOfFirstDataDocument =
    indexOfLastDataDocument - dataPerPageDocument;
  const currentDataDocuments = app?.data?.DokumenPendukung.slice(
    indexOfFirstDataDocument,
    indexOfLastDataDocument
  );
  const paginateDocument = (pageNumber) => setCurrentPageDocument(pageNumber);

  React.useEffect(() => {
    getSoftwareById();
  }, []);

  function getSoftwareById() {
    const fetchSoftware = async () => {
      try {
        const getToken = JSON.parse(localStorage.getItem("SLIBRARY:token"));
        const response = await api.get(`/softwares/${match.params.id}`, {
          headers: { Authorization: `Bearer ${getToken.access_token}` },
        });
        setApp(response);
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
  }

  const handleDelete = async (id) => {
    try {
      const getToken = JSON.parse(localStorage.getItem("SLIBRARY:token"));
      const response = await api.delete(`/softwares/${id}`, {
        headers: { Authorization: `Bearer ${getToken.access_token}` },
      });

      if (response?.status === 204) {
        swal({
          title: "Deleted!",
          text: "Successfully Deleted Source Code!",
          icon: "success",
        });
        setShowModalCode(false);
        history.push(`/source-code`);
      }
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  const handleDeleteVideo = async (id) => {
    try {
      const getToken = JSON.parse(localStorage.getItem("SLIBRARY:token"));
      const response = await api.delete(`/video/${id}`, {
        headers: { Authorization: `Bearer ${getToken.access_token}` },
      });

      if (response?.status === 204) {
        swal({
          title: "Deleted!",
          text: "Successfully Deleted Video!",
          icon: "success",
        });
        setShowModalCodeVideo(false);
        getSoftwareById();
      }
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  const handleDeleteDocument = async (id) => {
    try {
      const getToken = JSON.parse(localStorage.getItem("SLIBRARY:token"));
      const response = await api.delete(`/dokumen/${id}`, {
        headers: { Authorization: `Bearer ${getToken.access_token}` },
      });

      if (response?.status === 204) {
        swal({
          title: "Deleted!",
          text: "Successfully Deleted Document!",
          icon: "success",
        });
        setShowModalCodeDocs(false);
        getSoftwareById();
      }
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  const searchHandlerVideo = (searchVideo) => {
    setSearchVideo(searchVideo);
    if (searchVideo !== "") {
      const newVideoList = app?.data?.VideoTutorial.filter((video) => {
        return Object.values(video)
          .join(" ")
          .toLowerCase()
          .includes(searchVideo.toLowerCase());
      });
      setSearchResultsVideo(newVideoList);
    } else {
      setSearchResultsVideo(app?.data?.VideoTutorial);
    }
  };

  const getSearchVideo = () => {
    searchHandlerVideo(inputElVideo.current.value);
  };

  const listVideoWithFilterSearch =
    searchVideo.length < 1 ? currentDataVideos : searchResultsVideo;

  const searchHandlerDocument = (searchDocument) => {
    setSearchDocument(searchDocument);
    if (searchDocument !== "") {
      const newDocumentList = app?.data?.DokumenPendukung.filter((document) => {
        return Object.values(document)
          .join(" ")
          .toLowerCase()
          .includes(searchDocument.toLowerCase());
      });
      setSearchResultsDocument(newDocumentList);
    } else {
      setSearchResultsDocument(app?.data?.DokumenPendukung);
    }
  };

  const getSearchDocument = () => {
    searchHandlerDocument(inputEl.current.value);
  };

  const listDocumentWithFilterSearch =
    searchDocument.length < 1 ? currentDataDocuments : searchResultsDocument;

  return (
    <div className="flex">
      <Sidebar></Sidebar>

      <main className="lg:ml-72 mt-28 px-6 w-full mb-8">
        <div className="container mx-auto">
          {app?.data ? (
            <>
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

                <h1 className="text-3xl font-bold">Details Source Code</h1>
              </div>
              <div className="mt-6">
                <div className="lg:grid lg:grid-cols-2 gap-6">
                  <div>
                    <div
                      className="image rounded-3xl h-96 overflow-hidden shadow-xl"
                      data-aos="zoom-in"
                      data-aos-delay="200"
                    >
                      <img
                        src={
                          app?.data?.PreviewImage === ""
                            ? "/assets/images/img-default.png"
                            : app?.data?.PreviewImage
                        }
                        alt=""
                        className=" w-full object-cover object-top h-full"
                      />
                    </div>
                  </div>
                  <div className="mt-2 lg:mt-0">
                    <div>
                      <h1
                        className="uppercase text-2xl text-slPurple font-bold mb-2"
                        data-aos="fade-up"
                        data-aos-delay="300"
                      >
                        {app?.data?.Name}
                      </h1>
                      <h4
                        className=" text-xl text-gray-400"
                        data-aos="fade-up"
                        data-aos-delay="400"
                      >
                        {app?.data?.Kategori?.Name} {" | "}
                        <span className="">
                          {moment(app?.data?.ReleaseDate).format(
                            "DD MMMM YYYY"
                          )}
                        </span>
                      </h4>
                      <div className=" max-h-64 overflow-auto pr-2">
                        <p
                          className=" text-gray-500 mt-2 text-base text-justify"
                          data-aos="fade-up"
                          data-aos-delay="500"
                        >
                          {app?.data?.Description}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 flex">
                      <Link
                        ref={buttonRefEdit}
                        to={`/source-code/edit-data/${app.data.id}`}
                        className="text-slBlue-light bg-gray-100 py-2 rounded-md  hover:text-slBlue hover:bg-slBlue-light hover:shadow-lg text-2xl px-6 transition-all duration-700 mr-4"
                        data-aos="zoom-in"
                        data-aos-delay="900"
                      >
                        <FaIcons.FaEdit />
                      </Link>
                      <Tooltips placement="left" ref={buttonRefEdit}>
                        <TooltipsContent>Edit Source Code</TooltipsContent>
                      </Tooltips>

                      <button
                        type="button"
                        ref={buttonRefDelete}
                        onClick={(e) => setShowModalCode(true)}
                        // onSubmit={handleDelete}
                        className="text-slRed-light bg-gray-100 py-2 rounded-md  hover:text-slRed hover:bg-slRed-light hover:shadow-lg text-2xl px-6 transition-all duration-700"
                        data-aos="zoom-in"
                        data-aos-delay="900"
                      >
                        <FaIcons.FaTrashAlt />
                      </button>
                      <Tooltips placement="right" ref={buttonRefDelete}>
                        <TooltipsContent>Delete Source Code</TooltipsContent>
                      </Tooltips>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="">Not Found</div>
          )}

          <div className="mt-14">
            <div className="lg:grid lg:grid-cols-2 gap-4 ">
              <div className="videos" data-aos="zoom-out" data-aos-delay="1100">
                <div className=" shadow-xl py-2 px-4 rounded-lg">
                  <div className="md:flex md:justify-between">
                    <div className="flex items-center justify-between">
                      <h1 className="text-xl text-slPurple font-bold mb-2">
                        Video Tutorial
                      </h1>

                      <Link
                        ref={buttonRefAdd}
                        to={`/source-code/${app?.data?.id}/add-video`}
                        className=" md:ml-6 lg:ml-10 bg-slGreen py-2 px-4 rounded-md text-slWhite hover:bg-slGreen-dark transition-all duration-500 hover:shadow-md"
                      >
                        <FaIcons.FaPlus />
                      </Link>
                      <Tooltips placement="right" ref={buttonRefAdd}>
                        <TooltipsContent>Add Video</TooltipsContent>
                      </Tooltips>
                    </div>

                    <div className="flex justify-between items-center md:w-1/3 sm:w-4/12 relative">
                      <input
                        ref={inputElVideo}
                        value={searchVideo}
                        onChange={getSearchVideo}
                        type="text"
                        placeholder="Search"
                        className="block text-slPurple border border-gray-300 py-2 px-2 focus:shadow outline-none focus:border-slPurple focus:outline-purple rounded-md w-full"
                      />
                      <span className=" absolute top-3 right-4 text-gray-400">
                        <FaIcons.FaSearch />
                      </span>
                    </div>
                  </div>

                  <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8 mt-2">
                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                      <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                        <table className="min-w-full">
                          <thead className=" bg-slPurple h-16 font-bold">
                            <tr>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-md font-bold text-slWhite uppercase tracking-wider"
                              >
                                No
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-md font-bold text-slWhite uppercase tracking-wider"
                              >
                                Video Title
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-md font-bold text-slWhite uppercase tracking-wider "
                              >
                                Action
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {app?.data?.VideoTutorial.length > 0 ? (
                              listVideoWithFilterSearch.map((data, index) => (
                                <tr key={index}>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-lg text-gray-900">
                                      {noVideos++}
                                    </div>
                                  </td>

                                  <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-lg text-gray-900">
                                      {data.Title}
                                    </div>
                                  </td>

                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <div className="flex w-full">
                                      <Link
                                        ref={buttonRefEdit}
                                        to={`/source-code/${app?.data?.id}/edit-video/${data.id}`}
                                        className=" text-slGray  hover:text-slBlue text-2xl mr-4"
                                      >
                                        <FaIcons.FaEdit />
                                      </Link>
                                      <Tooltips
                                        placement="left"
                                        ref={buttonRefEdit}
                                      >
                                        <TooltipsContent>
                                          Edit video
                                        </TooltipsContent>
                                      </Tooltips>

                                      <button
                                        type="button"
                                        ref={buttonRefDelete}
                                        onClick={(e) => {
                                          setDeleteIdVideo(data.id);
                                          setShowModalCodeVideo(true);
                                        }}
                                        className=" text-slGray  hover:text-slRed text-2xl "
                                      >
                                        <FaIcons.FaTrashAlt />
                                      </button>
                                      <Tooltips
                                        placement="right"
                                        ref={buttonRefDelete}
                                      >
                                        <TooltipsContent>
                                          Hapus Video
                                        </TooltipsContent>
                                      </Tooltips>

                                      <Modal
                                        size="sm"
                                        active={showModalVideo}
                                        toggler={() => setShowModalVideo(false)}
                                      >
                                        <ModalBody>
                                          <p className=" leading-relaxed text-gray-600 font-bold px-4">
                                            Are you sure want to delete this
                                            Video?
                                          </p>
                                        </ModalBody>
                                        <ModalFooter>
                                          <Button
                                            color="gray"
                                            buttonType="link"
                                            onClick={(e) =>
                                              setShowModalCodeVideo(false)
                                            }
                                            ripple="dark"
                                          >
                                            Tidak
                                          </Button>

                                          <Button
                                            color="red"
                                            onClick={() =>
                                              handleDeleteVideo(DeleteIdVideo)
                                            }
                                            ripple="light"
                                          >
                                            Ya
                                          </Button>
                                        </ModalFooter>
                                      </Modal>
                                    </div>
                                  </td>
                                </tr>
                              ))
                            ) : (
                              <tr>
                                <td className="flex items-center justify-center w-full text-center py-4">
                                  Ups! Video Not Found
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-end mt-4 px-10">
                    <Pagination
                      dataPerPage={dataPerPageVideo}
                      totalData={app?.data?.VideoTutorial.length}
                      paginate={paginateVideo}
                    />
                  </div>
                </div>
              </div>

              <div
                className="supporting-documents my-10 lg:my-0"
                data-aos="zoom-out"
                data-aos-delay="1100"
              >
                <div className="shadow-xl rounded-lg py-2 px-4">
                  <div className="md:flex md:justify-between">
                    <div className="flex items-center justify-between">
                      <h1 className="text-xl text-slPurple font-bold mb-2">
                        Documents
                      </h1>
                      <Link
                        ref={buttonRefAdd}
                        to={`/source-code/${app?.data?.id}/add-document`}
                        className=" md:ml-6 lg:ml-10 bg-slGreen py-2 px-4 rounded-md text-slWhite hover:bg-slGreen-dark transition-all duration-500 hover:shadow-md"
                      >
                        <FaIcons.FaPlus />
                      </Link>
                      <Tooltips placement="right" ref={buttonRefAdd}>
                        <TooltipsContent>Add Documents</TooltipsContent>
                      </Tooltips>
                    </div>

                    <div className="flex justify-between items-center md:w-1/3 sm:w-4/12 relative">
                      <input
                        type="text"
                        placeholder="Search"
                        ref={inputEl}
                        value={searchDocument}
                        onChange={getSearchDocument}
                        className="block text-slPurple border border-gray-300 py-2 px-2 focus:shadow outline-none focus:border-slPurple focus:outline-purple rounded-md w-full"
                      />
                      <span className=" absolute top-3 right-4 text-gray-400">
                        <FaIcons.FaSearch />
                      </span>
                    </div>
                  </div>

                  <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8 mt-2">
                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                      <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg ">
                        <table className="min-w-full">
                          <thead className=" bg-slPurple h-16 font-bold">
                            <tr>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-md font-bold text-slWhite uppercase tracking-wider"
                              >
                                No
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-md font-bold text-slWhite uppercase tracking-wider"
                              >
                                Document Name
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-md font-bold text-slWhite uppercase tracking-wider "
                              >
                                Action
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {app?.data?.DokumenPendukung?.length > 0 ? (
                              listDocumentWithFilterSearch.map(
                                (data, index) => (
                                  <tr key={index}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                      <div className="text-lg text-gray-900">
                                        {noDocs++}
                                      </div>
                                    </td>

                                    <td className="px-6 py-4 whitespace-nowrap">
                                      <div className="text-lg text-gray-900">
                                        {data.Title}
                                      </div>
                                    </td>

                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                      <div className="flex w-full">
                                        <Link
                                          ref={buttonRefEdit}
                                          to={`/source-code/${app?.data?.id}/edit-document/${data.id}`}
                                          className=" text-slGray  hover:text-slBlue text-2xl mr-4"
                                        >
                                          <FaIcons.FaEdit />
                                        </Link>
                                        <Tooltips
                                          placement="left"
                                          ref={buttonRefEdit}
                                        >
                                          <TooltipsContent>
                                            Edit Docs
                                          </TooltipsContent>
                                        </Tooltips>

                                        <button
                                          type="button"
                                          ref={buttonRefDelete}
                                          onClick={(e) => {
                                            setDeleteIdDocs(data.id);
                                            setShowModalCodeDocs(true);
                                          }}
                                          className=" text-slGray  hover:text-slRed text-2xl "
                                        >
                                          <FaIcons.FaTrashAlt />
                                        </button>
                                        <Tooltips
                                          placement="right"
                                          ref={buttonRefDelete}
                                        >
                                          <TooltipsContent>
                                            Hapus Docs
                                          </TooltipsContent>
                                        </Tooltips>

                                        <Modal
                                          size="sm"
                                          active={showModalDocs}
                                          toggler={() =>
                                            setShowModalDocs(false)
                                          }
                                        >
                                          <ModalBody>
                                            <p className=" leading-relaxed text-gray-600 font-bold px-4">
                                              Are you sure want to delete this
                                              Document?
                                            </p>
                                          </ModalBody>
                                          <ModalFooter>
                                            <Button
                                              color="gray"
                                              buttonType="link"
                                              onClick={(e) =>
                                                setShowModalCodeDocs(false)
                                              }
                                              ripple="dark"
                                            >
                                              Tidak
                                            </Button>

                                            <Button
                                              color="red"
                                              onClick={() =>
                                                handleDeleteDocument(
                                                  DeleteIdDocs
                                                )
                                              }
                                              ripple="light"
                                            >
                                              Ya
                                            </Button>
                                          </ModalFooter>
                                        </Modal>
                                      </div>
                                    </td>
                                  </tr>
                                )
                              )
                            ) : (
                              <tr>
                                <td className="flex items-center justify-center w-full text-center py-4">
                                  Ups! Document Not Found
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-end mt-4 px-10">
                    <Pagination
                      dataPerPage={dataPerPageDocument}
                      totalData={app?.data?.DokumenPendukung.length}
                      paginate={paginateDocument}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Modal
            size="sm"
            active={showModal}
            toggler={() => setShowModal(false)}
          >
            <ModalBody>
              <p className=" leading-relaxed text-gray-600 font-bold px-4">
                Are you sure want to delete this Source Code?
              </p>
            </ModalBody>
            <ModalFooter>
              <Button
                color="gray"
                buttonType="link"
                onClick={(e) => setShowModalCode(false)}
                ripple="dark"
              >
                Cancel
              </Button>

              <Button
                color="red"
                onClick={() => handleDelete(app.data.id)}
                ripple="light"
              >
                Ya
              </Button>
            </ModalFooter>
          </Modal>
        </div>
      </main>
    </div>
  );
}
