import React, { useRef } from "react";
import { Link } from "react-router-dom";

import * as FaIcons from "react-icons/fa";

import Tooltips from "@material-tailwind/react/Tooltips";
import TooltipsContent from "@material-tailwind/react/TooltipsContent";

export default function RenderItem({ data }) {
  const buttonRefDetail = useRef();

  return (
    <>
      <div className="item-link" data-aos="fade-up">
        <div className=" shadow-xl rounded-xl p-2" data-aos="fade-up">
          <h4 className=" capitalize  text-slPurple font-bold text-center mb-2">
            {data.Name}
          </h4>

          <div
            className="w-full overflow-hidden rounded relative "
            style={{ height: 300 }}
          >
            <img
              src={
                data.PreviewImage === ""
                  ? "/assets/images/img-default.png"
                  : data.PreviewImage
              }
              alt=""
              className="object-cover object-top w-full h-full block"
            />
            <div className="btn absolute top-0 w-full h-full flex justify-center items-center bg-gray-800 opacity-0 hover:opacity-80 transition-opacity duration-1000 ">
              <div className=" block justify-center items-center">
                <div className="flex justify-center">
                  <Link
                    to={`/source-code/${data.id}`}
                    ref={buttonRefDetail}
                    className=" text-4xl text-center text-gray-400 hover:text-yellow-600 transition-all duration-700"
                  >
                    <FaIcons.FaEye />
                  </Link>

                  <Tooltips placement="top" ref={buttonRefDetail}>
                    <TooltipsContent>Detail Source Code</TooltipsContent>
                  </Tooltips>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
