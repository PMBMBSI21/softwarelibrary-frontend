import React from "react";

import { Link } from "react-scroll";

import * as FaIcons from "react-icons/fa";

export default function Hero({ data, users, me }) {
  let totalDownloadAll = 0;
  let i;

  for (i = 0; i < data.length; i++) {
    totalDownloadAll += data[i].TotalDownload; //Do the math!
  }

  return (
    <div className="">
      <div className="lg:grid lg:grid-cols-2 lg:gap-4 py-8 lg:py-14 lg:h-800 transition-all duration-300">
        <div className="lg:relative flex justify-center order-2">
          <div
            className="lg:absolute lg:bottom-0 lg:right-0 md:w-9/12"
            data-aos="zoom-in"
          >
            <img src="/assets/images/img-hero-gray.gif" alt="" />
          </div>
        </div>

        <div className=" order-1 flex flex-col lg:mt-14">
          <div className="">
            <h3
              className=" text-lg lg:text-2xl my-2 text-slGray-1000 font-bold capitalize"
              data-aos="fade-up"
            >
              Hello, {me?.Name}
            </h3>
            <h1
              className=" text-4xl lg:text-5xl text-slIndigo-600 font-bold"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              A lot of amazing application <br />
              was here.
            </h1>
            <p
              className="mt-4  text-slGray-1000"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              Download, customize, and launch apps from your devices.
            </p>
          </div>

          <div className="flex justify-between md:w-3/5 mt-12 lg:mx-0">
            <div
              className="shadow-lg p-6 w-40 md:w-48 text-center rounded-xl border border-slGray-400 bg-slIndigo-200"
              data-aos="fade-right"
              data-aos-delay="300"
            >
              <h5 className=" text-2xl font-bold text-slGray-900">
                {users.length}
              </h5>
              <span>Users</span>
            </div>
            <div
              className="shadow-lg p-6 w-40 md:w-48 text-center rounded-xl border border-slGray-400 bg-slIndigo-200"
              data-aos="fade-left"
              data-aos-delay="300"
            >
              <h5 className=" text-2xl font-bold text-slGray-900">
                {totalDownloadAll}
              </h5>
              <span>Download</span>
            </div>
          </div>

          <div className="mt-12 md:w-3/5 lg:mx-0">
            <Link
              to="apps"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              className="flex w-full items-center justify-center shadow-inner py-3 bg-slIndigo-800 rounded-lg text-xl text-white hover:shadow-md hover:bg-slIndigo-600 transition-all duration-200 font-sans cursor-pointer"
            >
              Get Started <FaIcons.FaArrowRight className=" ml-6" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
