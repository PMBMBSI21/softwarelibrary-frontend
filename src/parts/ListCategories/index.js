import React from "react";

import * as FaIcons from "react-icons/fa";
import RenderItem from "./RenderItem";

export default function ListCategories({
  data,
  category,
  searchKeyword,
  searchTerm,
}) {
  const inputEl = React.useRef("");
  const getSearchTerm = () => {
    searchKeyword(inputEl.current.value);
  };

  return (
    <>
      <div
        className=" border-b-2 border-slGray-600 pb-6"
        data-aos="fade-up"
        data-aos-delay="100"
      >
        <h3 className=" text-2xl text-slIndigo-600 font-semibold my-4">
          Source Code Applications
        </h3>

        <div className="md:flex items-center ">
          {/* <div className=" mr-6">
            <select
              id="category"
              name="KategoriID"
              className="form-select block w-full mt-1 px-3 py-2 text-gray-600 bg-white rounded border border-gray-300 outline-none focus:outline-purple focus:border-slPurple"
              required
            >
              <option>All</option>
              {category?.length > 0 ? (
                category.map((data, index) => (
                  <option key={index} value={data.id}>
                    {data.Name}
                  </option>
                ))
              ) : (
                <option>No data</option>
              )}
            </select>
          </div> */}

          <div className="relative md:w-2/5 lg:w-3/12 mt-6 md:mt-0">
            <input
              type="text"
              placeholder="Search"
              ref={inputEl}
              value={searchTerm}
              onChange={getSearchTerm}
              className="block bg-transparent focus:bg-white text-slGray-900 border border-slGray-600 py-2 px-2 focus:shadow-lg outline-none focus:border-slIndigo-600 rounded-md w-full transition-all duration-300"
            />
            <span className=" absolute top-3 right-4 text-gray-400">
              <FaIcons.FaSearch />
            </span>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-4 mt-10">
        {data?.length > 0 ? (
          data?.map((item, index) => {
            return <RenderItem item={item} key={index}></RenderItem>;
          })
        ) : (
          <div className="flex items-center justify-center bg-gray-200 w-full text-center py-12">
            Ups! Item Not Found
          </div>
        )}
      </div>
    </>
  );
}
