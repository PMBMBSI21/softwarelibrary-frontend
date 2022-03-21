import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";

import api from "api/axios";

import * as FaIcons from "react-icons/fa";

import Tooltips from "@material-tailwind/react/Tooltips";
import TooltipsContent from "@material-tailwind/react/TooltipsContent";

import Sidebar from "parts/sidebar";
import RenderItem from "parts/admin/RenderItem";

function SourceCode() {
  const [app, setApp] = useState([]);

  const inputEl = React.useRef("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState("");

  const buttonRefAdd = useRef();

  const [currentPage, setcurrentPage] = useState(1);
  const [itemsPerPage, setitemsPerPage] = useState(18);
  const [pageNumberLimit, setpageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);

  const handleClick = (event) => {
    setcurrentPage(Number(event.target.id));
  };

  const pages = [];
  for (let i = 1; i <= Math.ceil(app.length / itemsPerPage); i++) {
    pages.push(i);
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = app.slice(indexOfFirstItem, indexOfLastItem);

  const renderPageNumbers = pages.map((number) => {
    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
      return (
        <li
          key={number}
          id={number}
          onClick={handleClick}
          className={
            currentPage === number ? "active list-number" : "list-number"
          }
        >
          {number}
        </li>
      );
    } else {
      return null;
    }
  });

  React.useEffect(() => {
    const fetchSoftwares = async () => {
      try {
        const getToken = JSON.parse(localStorage.getItem("SLIBRARY:token"));
        const response = await api.get("/softwares", {
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

    fetchSoftwares();
  }, []);

  const searchHandler = (searchTerm) => {
    setSearchTerm(searchTerm);
    if (searchTerm !== "") {
      const newAppList = app.filter((app) => {
        console.log(Object.values(app));
        return Object.values(app)
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      });
      setSearchResults(newAppList);
    } else {
      setSearchResults(app);
    }
  };

  const getSearchTerm = () => {
    searchHandler(inputEl.current.value);
  };

  const listAppWithFilterSearch =
    searchTerm.length < 1 ? currentItems : searchResults;

  const handleNextbtn = () => {
    setcurrentPage(currentPage + 1);

    if (currentPage + 1 > maxPageNumberLimit) {
      setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  const handlePrevbtn = () => {
    setcurrentPage(currentPage - 1);

    if ((currentPage - 1) % pageNumberLimit === 0) {
      setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };

  let pageIncrementBtn = null;
  if (pages.length > maxPageNumberLimit) {
    pageIncrementBtn = <li onClick={handleNextbtn}> &hellip; </li>;
  }

  let pageDecrementBtn = null;
  if (minPageNumberLimit >= 1) {
    pageDecrementBtn = <li onClick={handlePrevbtn}> &hellip; </li>;
  }

  return (
    <div className="flex">
      <Sidebar></Sidebar>

      <main className=" lg:ml-72 mt-28 px-6 w-full mb-8">
        <div className="container mx-auto">
          <div data-aos="fade-right" className="md:flex md:justify-between">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold">Source Code</h1>
              <Link
                ref={buttonRefAdd}
                to="/source-code/add-data"
                className=" md:ml-6 lg:ml-10 bg-slGreen py-2 px-4 rounded-md text-slWhite hover:bg-slGreen-dark transition-all duration-500 hover:shadow-md"
              >
                <FaIcons.FaPlus />
              </Link>
              <Tooltips placement="right" ref={buttonRefAdd}>
                <TooltipsContent>Add Source Code</TooltipsContent>
              </Tooltips>
            </div>
            <div className="relative md:w-2/5 lg:w-3/12 mt-6 md:mt-0">
              <input
                type="text"
                placeholder="Search"
                ref={inputEl}
                value={searchTerm}
                onChange={getSearchTerm}
                className="block bg-transparent focus:bg-white text-slGray-900 border border-slGray-600 py-2 px-2 focus:shadow-lg outline-none focus:border-slPurple rounded-md w-full transition-all duration-300"
              />
              <span className=" absolute top-3 right-4 text-gray-400">
                <FaIcons.FaSearch />
              </span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6 ">
            {listAppWithFilterSearch?.length > 0 ? (
              listAppWithFilterSearch
                // ?.slice(0, 15)
                ?.map((data, index) => (
                  <RenderItem data={data} key={index}></RenderItem>
                ))
            ) : (
              <div className="flex items-center justify-center bg-gray-200 w-full text-center py-12">
                Ups! Item Not Found
              </div>
            )}
          </div>

          {app?.length > 18 ? (
            <ul className="pageNumbers mt-8">
              <li>
                <button
                  onClick={handlePrevbtn}
                  disabled={currentPage === pages[0] ? true : false}
                  className=""
                >
                  Prev
                </button>
              </li>
              {pageDecrementBtn}
              {renderPageNumbers}
              {pageIncrementBtn}

              <li>
                <button
                  onClick={handleNextbtn}
                  disabled={
                    currentPage === pages[pages.length - 1] ? true : false
                  }
                >
                  Next
                </button>
              </li>
            </ul>
          ) : null}
        </div>
      </main>
    </div>
  );
}

export default SourceCode;
