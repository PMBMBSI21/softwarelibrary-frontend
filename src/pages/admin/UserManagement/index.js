import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";

import * as FaIcons from "react-icons/fa";

import { ReactComponent as DefaultUser } from "assets/images/default-avatar-circle.svg";

import Modal from "@material-tailwind/react/Modal";
import ModalBody from "@material-tailwind/react/ModalBody";
import ModalFooter from "@material-tailwind/react/ModalFooter";
import Button from "@material-tailwind/react/Button";
import Tooltips from "@material-tailwind/react/Tooltips";
import TooltipsContent from "@material-tailwind/react/TooltipsContent";

import swal from "sweetalert";
import api from "api/axios";

import Sidebar from "parts/sidebar";
import Pagination from "parts/Pagination";

export default function UserManagement() {
  const [showModal, setShowModal] = useState(false);
  const setShowModalCode = () => setShowModal(!showModal);

  const buttonRefDelete = useRef();
  const buttonRefEdit = useRef();
  const buttonRefAdd = useRef();

  const inputEl = useRef("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState("");
  const [deleteID, setDeleteId] = useState("");

  const [listUser, setListUser] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage] = useState(10);
  let no = 1;

  // Get current user
  const indexOfLastData = currentPage * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;
  const currentDatas = listUser.slice(indexOfFirstData, indexOfLastData);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  React.useEffect(() => {
    window.scroll(0, 0);

    getUsers();
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

  const handleDelete = async (id) => {
    try {
      const getToken = JSON.parse(localStorage.getItem("SLIBRARY:token"));

      const response = await api.delete(`/users/${id}`, {
        headers: { Authorization: `Bearer ${getToken.access_token}` },
      });

      console.log(response);

      if (response?.status === 204) {
        swal({
          title: "Deleted!",
          text: "User Successfully Deleted!",
          icon: "success",
        });
        getUsers();
        setShowModalCode(false);
      }
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  const searchHandler = (searchTerm) => {
    setSearchTerm(searchTerm);
    if (searchTerm !== "") {
      const newUserList = listUser.filter((user) => {
        return Object.values(user)
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      });
      setSearchResults(newUserList);
    } else {
      setSearchResults(listUser);
    }
  };

  const getSearchTerm = () => {
    searchHandler(inputEl.current.value);
  };

  const listUsersWithFilterSearch =
    searchTerm.length < 1 ? currentDatas : searchResults;

  return (
    <div className="flex">
      <Sidebar></Sidebar>

      <main className=" lg:ml-72 mt-28 px-6 w-full mb-8">
        <div className="container mx-auto">
          <div data-aos="fade-right" className="md:flex md:justify-between">
            <div className="flex items-center justify-between py-2">
              <h1 className="text-3xl font-bold">User Management</h1>
              <Link
                ref={buttonRefAdd}
                to="/user-management/add-data"
                className=" md:ml-6 lg:ml-10 bg-slGreen py-2  px-4 rounded-md text-slWhite hover:bg-slGreen-dark transition-all duration-500 hover:shadow-md"
              >
                <FaIcons.FaPlus />
              </Link>
              <Tooltips placement="right" ref={buttonRefAdd}>
                <TooltipsContent>Add User</TooltipsContent>
              </Tooltips>
            </div>
            <div className="flex justify-between items-center md:w-1/3 sm:w-4/12 relative">
              <input
                ref={inputEl}
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={getSearchTerm}
                className="block text-slPurple border border-gray-300 py-2 px-2 focus:shadow outline-none focus:border-slPurple focus:outline-purple rounded-md w-full"
              />
              <span className=" absolute top-4 right-4 text-gray-400">
                <FaIcons.FaSearch />
              </span>
            </div>
          </div>

          <div className="flex flex-col text-left mt-10">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div
                  className="
                  shadow-md
                  overflow-hidden
                  border-b border-gray-200
                  sm:rounded-lg
                "
                >
                  <table className="min-w-full" data-aos="fade-up">
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
                          Name
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-md font-bold text-slWhite uppercase tracking-wider"
                        >
                          Email
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-md font-bold text-slWhite uppercase tracking-wider "
                        >
                          Level
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
                      {listUsersWithFilterSearch?.length > 0 ? (
                        listUsersWithFilterSearch.map((data, index) => (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-lg text-gray-900">
                                {no++}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-10 w-10">
                                  {data?.Foto ? (
                                    <img
                                      src={data?.Foto}
                                      alt={data?.Foto}
                                      className="h-10 w-10 rounded-full object-cover object-center"
                                    />
                                  ) : (
                                    <DefaultUser
                                      className=" fill-slPurple-dark"
                                      style={{ width: 40, height: 40 }}
                                    ></DefaultUser>
                                  )}
                                </div>
                                <div className="ml-4">
                                  <div className="text-lg font-medium text-gray-900">
                                    {data?.Name ?? "name user"}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-lg text-gray-900">
                                {data?.Email ?? "email user"}
                              </div>
                            </td>

                            <td className="px-6 py-4 whitespace-nowrap ">
                              <div className="text-lg text-gray-900">
                                {data?.Level === 2 ? "Admin" : "Member"}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <div className="flex w-full">
                                <Link
                                  ref={buttonRefEdit}
                                  to={`/user-management/edit-data/${data?.id}`}
                                  className="text-black  hover:text-slBlue text-2xl mr-4"
                                >
                                  <FaIcons.FaEdit />
                                </Link>
                                <Tooltips placement="left" ref={buttonRefEdit}>
                                  <TooltipsContent>Edit User</TooltipsContent>
                                </Tooltips>

                                <button
                                  type="button"
                                  ref={buttonRefDelete}
                                  onClick={(e) => {
                                    setDeleteId(data.id);
                                    setShowModalCode(true);
                                  }}
                                  className="text-black  hover:text-slRed text-2xl "
                                >
                                  <FaIcons.FaTrashAlt />
                                </button>
                                <Tooltips
                                  placement="right"
                                  ref={buttonRefDelete}
                                >
                                  <TooltipsContent>Hapus User</TooltipsContent>
                                </Tooltips>

                                <Modal
                                  size="sm"
                                  active={showModal}
                                  toggler={() => setShowModal(false)}
                                >
                                  <ModalBody>
                                    <p className=" leading-relaxed text-gray-600 font-bold px-4">
                                      Are you sure want to delete this User?
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
                                      onClick={(e) => handleDelete(deleteID)}
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
                        <td className=" p-2 ">Data Not Found</td>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <Pagination
              dataPerPage={dataPerPage}
              totalData={listUser.length}
              paginate={paginate}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
