import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";

import { useForm } from "react-hook-form";

import Modal from "@material-tailwind/react/Modal";
import ModalFooter from "@material-tailwind/react/ModalFooter";
import Button from "@material-tailwind/react/Button";
import ModalBody from "@material-tailwind/react/ModalBody";
import Tooltips from "@material-tailwind/react/Tooltips";
import TooltipsContent from "@material-tailwind/react/TooltipsContent";

import swal from "sweetalert";
import api from "api/axios";

import * as FaIcons from "react-icons/fa";

import Sidebar from "parts/sidebar";

export default function AddCategory() {
  const [showModal, setShowModal] = useState(false);
  const setShowModalCode = () => setShowModal(!showModal);

  const buttonBack = useRef();
  const buttonRefDelete = useRef();

  const [Name, setName] = useState(() => "");
  const [listCategories, setListCategories] = useState(() => "");
  const [DeleteId, setDeleteId] = useState(() => "");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  React.useEffect(() => {
    getCategories();
  }, []);

  function getCategories() {
    const fetchCategories = async () => {
      try {
        const getToken = JSON.parse(localStorage.getItem("SLIBRARY:token"));
        const response = await api.get("/kategori", {
          headers: { Authorization: `Bearer ${getToken.access_token}` },
        });
        setListCategories(response.data);
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

    fetchCategories();
  }

  const submit = async (e) => {
    // e.preventDefault();

    const newCategory = { Name: Name };

    try {
      const getToken = JSON.parse(localStorage.getItem("SLIBRARY:token"));
      const response = await api.post("/kategori", newCategory, {
        headers: { Authorization: `Bearer ${getToken.access_token}` },
      });
      const allCategory = [...listCategories, response.data];

      setListCategories(allCategory);
      setName("");

      if (response?.status === 201) {
        swal({
          title: "Added!",
          text: `${response?.data?.Name} Successfully Added!`,
          icon: "success",
        });
      }
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  const handleDelete = async (id) => {
    try {
      const getToken = JSON.parse(localStorage.getItem("SLIBRARY:token"));
      const response = await api.delete(`/kategori/${id}`, {
        headers: { Authorization: `Bearer ${getToken.access_token}` },
      });

      if (response?.status === 204) {
        swal({
          title: "Deleted!",
          text: "Successfully Deleted Category!",
          icon: "success",
        });
        // history.push("/source-code/add-category");
        setShowModalCode(false);
      }
      getCategories();
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  return (
    <div className="flex">
      <Sidebar></Sidebar>

      <main className="lg:ml-72 mt-28 px-6 w-full mb-8">
        <div className="container mx-auto">
          <div className="flex items-center" data-aos="fade-right">
            <div className="">
              <Link
                to="/source-code/add-data"
                ref={buttonBack}
                className=" text-slPurple hover:text-slPurple-dark transition-all duration-500"
              >
                <FaIcons.FaArrowLeft className="text-2xl mr-6" />
              </Link>
              <Tooltips placement="left" ref={buttonBack}>
                <TooltipsContent>Back</TooltipsContent>
              </Tooltips>
            </div>

            <h1 className="text-3xl font-bold">Source Code Add Category</h1>
          </div>

          <div className="md:mt-6 lg:w-1/2">
            <div
              className=" p-6 rounded-lg shadow-lg bg-white"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <form onSubmit={handleSubmit(submit)}>
                <div className="form-input">
                  <div className="flex justify-between items-end">
                    <label className=" w-9/12">
                      <span className="text-black font-semibold text-xl">
                        Category Name
                      </span>
                      <input
                        type="text"
                        id="Name"
                        // name="Name"
                        {...register("Name", {
                          required: "Name category is required!",
                        })}
                        value={Name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter name"
                        className="px-3 py-3 text-gray-600 mt-3 bg-white rounded border border-gray-300 outline-none focus:outline-purple focus:border-slPurple w-full"
                      />
                    </label>
                    <button
                      type="submit"
                      className="bg-slPurple flex items-center justify-center py-3 w-1/5 rounded-md text-slWhite text-lg font-bold hover:bg-slPurple-dark hover:shadow-lg ml-1 transition-all duration-500 "
                    >
                      Add
                    </button>
                  </div>
                  <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                    {errors.Name?.message}
                  </span>
                </div>
              </form>

              <div className="flex justify-center mt-10 ">
                <ul className="bg-white rounded-lg border border-gray-200 w-full text-gray-900">
                  {listCategories?.length > 0 ? (
                    listCategories.map((data, index) => (
                      <li
                        key={index}
                        className="px-6 py-4 border-b border-gray-200 w-full rounded-t-lg"
                      >
                        <div className="flex justify-between">
                          <span className=" text-xl">{data.Name}</span>
                          <button
                            type="button"
                            ref={buttonRefDelete}
                            // onClick={() => handleDelete(data.id)}
                            onClick={(e) => {
                              setDeleteId(data.id);
                              setShowModalCode(true);
                            }}
                            className="text-gray-400  hover:text-slRed text-2xl px-6"
                          >
                            <FaIcons.FaTrashAlt />
                          </button>
                          <Tooltips placement="right" ref={buttonRefDelete}>
                            <TooltipsContent>Delete Category</TooltipsContent>
                          </Tooltips>
                        </div>
                        <Modal
                          size="sm"
                          active={showModal}
                          toggler={() => setShowModal(false)}
                        >
                          <ModalBody>
                            <p className=" leading-relaxed text-gray-600 font-bold px-4">
                              Are you sure want to delete this Category?
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
                              // onClick={(e) => setShowModalCode(false)}
                              onClick={() => handleDelete(DeleteId)}
                              ripple="light"
                            >
                              Ya
                            </Button>
                          </ModalFooter>
                        </Modal>
                      </li>
                    ))
                  ) : (
                    <li className=" bg-gray-300 py-2 px-8">
                      No found category
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
