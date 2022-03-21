import React, { useState } from "react";
import { Link } from "react-router-dom";

import Modal from "@material-tailwind/react/Modal";
import ModalFooter from "@material-tailwind/react/ModalFooter";
import Button from "@material-tailwind/react/Button";
import ModalBody from "@material-tailwind/react/ModalBody";

import * as MdIcons from "react-icons/md";

import Navbar from "parts/Navbar";
import Footer from "parts/Footer";

import formatThousand from "helpers/formatThousand";

import api from "api/axios";

export default function DetailsApp({ match }) {
  const moment = require("moment");
  const [showModal, setShowModal] = useState(false);
  const setShowModalCode = () => setShowModal(!showModal);

  const [data, setData] = useState([]);

  React.useEffect(() => {
    const fetchSoftware = async () => {
      try {
        const getToken = JSON.parse(localStorage.getItem("SLIBRARY:token"));
        const response = await api.get(`/softwares/${match.params.id}`, {
          headers: { Authorization: `Bearer ${getToken.access_token}` },
        });
        setData(response.data);
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

  const updateTotalDownload = async () => {
    try {
      const getToken = JSON.parse(localStorage.getItem("SLIBRARY:token"));
      await api.put(`/softwares/download/${match.params.id}`, {
        headers: { Authorization: `Bearer ${getToken.access_token}` },
      });
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

  console.log(data?.ZipFile);

  return (
    <main className="frontPage">
      <section>
        <div className="container mx-auto px-6 lg:px-0">
          <Navbar></Navbar>
        </div>
      </section>

      <section>
        <div className=" container mx-auto my-6 md:my-10 px-6 lg:px-0">
          <div className="lg:flex">
            <div
              className=" lg:w-3/5 rounded-xl overflow-hidden shadow-xl h-60 md:h-480"
              data-aos="zoom-in"
              data-aos-delay="100"
            >
              <img
                src={
                  data?.PreviewImage === ""
                    ? "/assets/images/img-default.png"
                    : data?.PreviewImage
                }
                alt=""
                className=" w-full object-cover object-top h-full"
              />
            </div>

            <div className=" lg:w-1/3 mt-2 mx-auto lg:mt-0">
              <div className="" data-aos="fade-up" data-aos-delay="100">
                <h3 className=" text-2xl font-bold uppercase text-slGray-900">
                  {data?.Name ?? "Nama Apps"}
                </h3>

                <div className=" w-full py-4 px-6 bg-white shadow-lg rounded-xl mt-2">
                  <div
                    className="flex justify-between py-6 border-b-2 border-slGray-600 "
                    data-aos="fade-up"
                    data-aos-delay="200"
                  >
                    <h1 className="text-slGray-900 font-semibold">
                      Total Download
                    </h1>
                    <span className="flex items-center text-slGray-900 font-semibold">
                      <MdIcons.MdDownloadForOffline className="mr-2 text-xl text-gray-500" />{" "}
                      {formatThousand(data?.TotalDownload) ?? "-"}
                    </span>
                  </div>

                  <div
                    className="flex justify-between py-6 border-b-2 border-slGray-600 "
                    data-aos="fade-up"
                    data-aos-delay="300"
                  >
                    <h1 className="text-slGray-900 font-semibold">Released</h1>
                    <span className="flex items-center text-slGray-900 font-semibold">
                      {moment(data?.ReleaseDate).format("DD MMMM YYYY") ??
                        "Not found"}
                    </span>
                  </div>

                  <div
                    className="flex justify-between py-6 border-b-2 border-slGray-600 "
                    data-aos="fade-up"
                    data-aos-delay="400"
                  >
                    <h1 className="text-slGray-900 font-semibold">
                      Last Update
                    </h1>
                    <span className="flex items-center text-slGray-900 font-semibold">
                      {moment(data?.updated_at).format("DD MMMM YYYY") ?? "-"}
                    </span>
                  </div>

                  <div
                    className="flex justify-between py-6 "
                    data-aos="fade-up"
                    data-aos-delay="500"
                  >
                    <h1 className="text-slGray-900 font-semibold">
                      Product Version
                    </h1>
                    <span className="flex items-center text-slGray-900 font-semibold">
                      {data?.ProductVersion ?? "Not found"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className=" md:flex mt-4 md:mt-10">
            <div className=" md:w-3/5 rounded-xl overflow-hidden">
              <div
                className="max-h-72 overflow-auto pr-2 mt-2"
                data-aos="fade-up"
                data-aos-delay="600"
              >
                <p className=" capitalize text-slGray-900 text-justify">
                  {data?.Description}
                </p>
              </div>
            </div>
            <div className=" md:w-2/6 lg:w-1/5 mx-auto">
              {data?.LinkSource === "" ? null : (
                <a
                  href={`${data?.LinkSource}`}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="my-4 w-full py-3 text-center bg-slIndigo-400 block rounded-lg shadow-inner font-semibold hover:bg-slIndigo-600 hover:shadow hover:text-white transition-all duration-200"
                  data-aos="fade-up"
                  data-aos-delay="650"
                >
                  Demo
                </a>
              )}

              {data?.VideoTutorial?.length > 0 ? (
                <Link
                  to={`/applications/${data.id}/video-tutorials`}
                  className="my-4 w-full py-3 text-center bg-slIndigo-400 block rounded-lg shadow-inner font-semibold hover:bg-slIndigo-600 hover:shadow hover:text-white transition-all duration-200 "
                  data-aos="fade-up"
                  data-aos-delay="700"
                >
                  Video Tutorials
                </Link>
              ) : null}

              {data?.DokumenPendukung?.length === 0 ? null : (
                <button
                  type="button"
                  onClick={(e) => setShowModalCode(true)}
                  className="my-4 w-full py-3 text-center bg-slIndigo-400 block rounded-lg shadow-inner font-semibold hover:bg-slIndigo-600 hover:shadow hover:text-white transition-all duration-200"
                  data-aos="fade-up"
                  data-aos-delay="750"
                >
                  Supporting Documents
                </button>
              )}

              {data?.Ebook === "" ? null : (
                <a
                  href={data?.Ebook}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="my-4 w-full py-3 text-center bg-slIndigo-400 block rounded-lg shadow-inner font-semibold hover:bg-slIndigo-600 hover:shadow hover:text-white transition-all duration-200"
                  data-aos="fade-up"
                  data-aos-delay="800"
                >
                  Download Ebook
                </a>
              )}

              <a
                href={data?.ZipFile}
                target="_blank"
                rel="noreferrer noopener"
                className="my-4 w-full py-3 text-center bg-slIndigo-800 block rounded-lg shadow-inner font-semibold hover:bg-slIndigo-600 hover:shadow text-white transition-all duration-200"
                onClick={updateTotalDownload}
                // data-aos="fade-up"
                // data-aos-delay="850"
              >
                Download Source Code
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className=" mt-40">
        <Footer></Footer>
      </section>

      <Modal
        size="regular"
        active={showModal}
        toggler={() => setShowModal(false)}
      >
        <ModalBody>
          <div className="py-4 px-10">
            <h1 className=" text-2xl text-slGray-900 font-bold">
              Download Document
            </h1>
            <ul className="mt-4">
              {data?.DokumenPendukung?.length > 0 ? (
                data?.DokumenPendukung?.map((item, index) => (
                  <li key={index}>
                    <a
                      href={item.FileDocument}
                      target="_blank"
                      rel="noreferrer noopener"
                      className=" hover:text-slIndigo-600 flex items-center text-slGray-900 my-4"
                    >
                      <MdIcons.MdDownloadForOffline className="mr-2 text-xl" />{" "}
                      {item.Title}
                    </a>
                  </li>
                ))
              ) : (
                <li className="text-slGray-900">No documents yet</li>
              )}
            </ul>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="gray"
            buttonType="link"
            onClick={(e) => setShowModalCode(false)}
            ripple="dark"
          >
            close
          </Button>
        </ModalFooter>
      </Modal>
    </main>
  );
}
