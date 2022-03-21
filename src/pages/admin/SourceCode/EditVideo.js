import React, { useState, useRef } from "react";
import { Link, useHistory } from "react-router-dom";

import Tooltips from "@material-tailwind/react/Tooltips";
import TooltipsContent from "@material-tailwind/react/TooltipsContent";

import * as FaIcons from "react-icons/fa";

import api from "api/axios";
import swal from "sweetalert";

import Sidebar from "parts/sidebar";

export default function EditVideo({ match }) {
  const buttonBack = useRef();

  const [IsLoading, setIsLoading] = useState(false);

  const history = useHistory();
  const [Title, setTitle] = useState(() => "");
  const [Url, setUrl] = useState(() => "");
  const [Description, setDescription] = useState(() => "");
  const [dataVideoId, setDataVideoId] = useState(() => "");

  React.useEffect(() => {
    window.scroll(0, 0);

    const fetchData = async () => {
      try {
        const getToken = JSON.parse(localStorage.getItem("SLIBRARY:token"));

        const response = await api.get(`/video/${match.params.id}`, {
          headers: { Authorization: `Bearer ${getToken.access_token}` },
        });
        setDataVideoId(response.data);
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
    if (dataVideoId) {
      setTitle(dataVideoId.Title);
      setUrl(dataVideoId.Url);
      setDescription(dataVideoId.Description);
    }
  }, [dataVideoId, setTitle, setUrl, setDescription]);

  const handleEdit = async (id) => {
    setIsLoading(true);

    const updatedVideo = { Title: Title, Url: Url, Description: Description };

    try {
      const getToken = JSON.parse(localStorage.getItem("SLIBRARY:token"));

      const response = await api.put(`/video/${id}`, updatedVideo, {
        headers: { Authorization: `Bearer ${getToken.access_token}` },
      });

      setTitle("");
      setUrl("");
      setDescription("");

      setIsLoading(false);

      if (response?.status === 200) {
        swal({
          title: "Updated!",
          text: `${response?.data?.Title} Successfully Updated!`,
          icon: "success",
        });
        history.push(`/source-code/${dataVideoId.SoftwareID}`);
      }
    } catch (err) {
      setIsLoading(false);
      console.log(`Error: ${err.message}`);
    }
  };

  return (
    <div className="flex">
      <Sidebar></Sidebar>

      <main className="lg:ml-72 mt-28 px-6 w-full mb-8">
        <div className="container mx-auto">
          <div className="flex items-center" data-aos="fade-right">
            <Link
              to={`/source-code/${dataVideoId.SoftwareID}`}
              ref={buttonBack}
              className=" text-slPurple hover:text-slPurple-dark transition-all duration-500"
            >
              <FaIcons.FaArrowLeft className="text-2xl mr-6" />
            </Link>
            <Tooltips placement="left" ref={buttonBack}>
              <TooltipsContent>Back</TooltipsContent>
            </Tooltips>

            <h1 className="text-3xl font-bold">Edit Video</h1>
          </div>

          <div className="mt-4 lg:w-1/2" data-aos="fade-up">
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="form-input shadow-xl rounded-lg p-6">
                {/* <input type="text" value={SoftareId} name="" id="" hidden /> */}
                <label className="block " data-aos="fade-up">
                  <span className="text-black font-semibold text-xl">
                    Video Title
                  </span>
                  <input
                    type="text"
                    placeholder="Enter Video Title"
                    value={Title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="px-3 py-3 text-gray-600 bg-white rounded border border-gray-300 outline-none focus:outline-purple focus:border-slPurple  w-full"
                  />
                  {/* <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                    Invalid title field !
                  </span> */}
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
                    placeholder="Enter Link Video"
                    value={Url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="px-3 py-3 text-gray-600 bg-white rounded border border-gray-300 outline-none focus:outline-purple focus:border-slPurple  w-full"
                  />
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
                    onClick={() => handleEdit(dataVideoId.id)}
                    className="disabled:opacity-30 disabled:bg-gray-700 bg-slBlue py-2 px-4 rounded-md text-slWhite w-32 hover:bg-slBlue-dark hover:shadow-xl transition-all duration-500"
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
