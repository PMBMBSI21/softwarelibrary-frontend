import React, { useState } from "react";

import api from "api/axios";

import Navbar from "parts/Navbar";
import Footer from "parts/Footer";
import SidebarWatch from "parts/SidebarWatch";
import YouTube from "react-youtube";

export default function VideoTutorial({ match }) {
  const [GetSoftwareById, setGetSoftwareById] = useState([]);

  React.useEffect(() => {
    const fetchSoftware = async () => {
      try {
        const getToken = JSON.parse(localStorage.getItem("SLIBRARY:token"));
        const response = await api.get(`/softwares/${match.params.id}`, {
          headers: { Authorization: `Bearer ${getToken.access_token}` },
        });
        setGetSoftwareById(response.data);
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

  const videoId = match.params.uid;

  function nextVideo() {}

  return (
    <>
      <div className="frontPage">
        <section>
          <div className="container mx-auto px-6 lg:px-0">
            <Navbar></Navbar>
          </div>
        </section>

        <section>
          <div className="container mx-auto px-6 lg:px-0 lg:mb-72 relative">
            <h1 className="text-xl sm:text-4xl text-gray-900 font-bold mb-10">
              Video {GetSoftwareById?.Name ?? "Name Source Code"}
            </h1>
            <div className="md:flex ">
              <SidebarWatch
                data={GetSoftwareById?.VideoTutorial}
                videoId={videoId}
              ></SidebarWatch>

              <main className="flex-1">
                <section className="flex flex-col ">
                  <div className=" flex justify-start items-center">
                    <div className="w-full px-1">
                      <div className="relative">
                        <div className="video-wrapper">
                          {GetSoftwareById.VideoTutorial && (
                            <YouTube
                              videoId={videoId}
                              id={videoId}
                              opts={{
                                playerVars: {
                                  autoplay: 1,
                                  controls: 1,
                                  showinfo: 0,
                                  rel: 0,
                                },
                              }}
                              onEnd={nextVideo}
                            ></YouTube>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </main>
            </div>
          </div>
        </section>

        <section>
          <Footer></Footer>
        </section>
      </div>
    </>
  );
}
