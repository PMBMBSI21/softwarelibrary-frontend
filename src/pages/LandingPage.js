import React, { useState } from "react";

import Navbar from "parts/Navbar";
import Hero from "parts/Hero";
import ListCategories from "parts/ListCategories";
import Footer from "parts/Footer";

import api from "api/axios";

export default function LandingPage() {
  const [app, setApp] = useState([]);
  const [listCategories, setListCategories] = useState(() => "");

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState("");
  const [listUser, setListUser] = useState([]);
  const [UserLogin, setUserLogin] = useState(() => null);

  const [currentPage, setcurrentPage] = useState(1);
  const [itemsPerPage, setitemsPerPage] = useState(20);
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
    window.scroll(0, 0);

    getUsers();
    getUsersLogin();
  }, []);

  React.useEffect(() => {
    const fetchSoftwares = async () => {
      try {
        const getToken = JSON.parse(localStorage.getItem("SLIBRARY:token"));
        const response = await api.get("/softwares", {
          headers: { Authorization: `Bearer ${getToken.access_token}` },
        });
        setApp(response.data);
        // console.log(response);
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

  React.useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get("/kategori");
        setListCategories(response.data);
      } catch (err) {
        console.log(`Error: ${err.message}`);
      }
    };

    fetchCategories();
  }, []);

  function getUsers() {
    const fetchData = async () => {
      try {
        const getToken = JSON.parse(localStorage.getItem("SLIBRARY:token"));
        const response = await api.get("/users", {
          headers: { Authorization: `Bearer ${getToken.access_token}` },
        });
        setListUser(response.data);
      } catch (err) {
        console.log(`Error: ${err.message}`);
      }
    };

    fetchData();
  }

  function getUsersLogin() {
    const fetchData = async () => {
      try {
        const getToken = JSON.parse(localStorage.getItem("SLIBRARY:token"));

        const response = await api.get("/me", {
          headers: { Authorization: `Bearer ${getToken.access_token}` },
        });

        setUserLogin(response.data);
      } catch (err) {
        console.log(`Error: ${err.message}`);
      }
    };

    fetchData();
  }

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
    <>
      <main className="frontPage relative">
        <section className="Head">
          <div className="container mx-auto px-6 lg:px-0">
            <Navbar></Navbar>

            <Hero data={app} users={listUser} me={UserLogin}></Hero>
          </div>
        </section>

        <section id="apps">
          <div className="container mx-auto px-6 lg:px-0 mt-10">
            <ListCategories
              data={searchTerm < 1 ? currentItems : searchResults}
              category={listCategories}
              searchTerm={searchTerm}
              searchKeyword={searchHandler}
            ></ListCategories>

            {app?.length > 20 ? (
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
        </section>

        <section>
          <Footer></Footer>
        </section>
      </main>
    </>
  );
}
