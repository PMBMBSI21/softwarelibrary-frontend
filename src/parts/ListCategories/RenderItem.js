import React from "react";

import { Link } from "react-router-dom";

import * as FaIcons from "react-icons/fa";

export default function RenderItem({ item }) {
  return (
    <>
      <div
        className="rounded-t-md w-full rounded-b-2xl overflow-hidden shadow-lg bg-white pb-3   transition-all duration-300 item-apps"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        <div className=" h-64 rounded-md overflow-hidden p-1 relative">
          <img
            src={
              item.PreviewImage === ""
                ? "/assets/images/img-default.png"
                : item.PreviewImage
            }
            alt={item.Name}
            className=" w-full h-full object-cover object-top"
          />
          <div className="btn absolute top-0 w-full h-full flex justify-center items-center bg-gray-800 opacity-0 hover:opacity-80 transition-opacity duration-1000 ">
            <div className=" block justify-center items-center">
              <div className="flex justify-center">
                <FaIcons.FaEye className=" text-4xl text-white" />
                <Link
                  to={`/applications/${item.id}`}
                  className="link-wrapped "
                ></Link>
              </div>
            </div>
          </div>
        </div>
        <div className="p-2">
          <div className="flex justify-between">
            <h3 className=" text-lg capitalize text-slGray-900 font-semibold ">
              {item.Name}
            </h3>
          </div>
          <p className=" text-slGray-800 capitalize">
            {item.Kategori.Name ?? "-"}
          </p>
        </div>

        {/* <div className="w-full h-full bg-black absolute top-0  hover:opacity-50"></div> */}
        {/* <Link to={`/applications/${item.id}`} className="link-wrapped "></Link> */}
      </div>
    </>
  );
}
