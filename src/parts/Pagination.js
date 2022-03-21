import React from "react";

const Pagination = ({ dataPerPage, totalData, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalData / dataPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      <nav>
        <ul className="flex items-center justify-center mt-4 px-8">
          {totalData >= 10
            ? pageNumbers.map((number) => (
                <li key={number} className="page-item">
                  <button
                    type="button"
                    onClick={() => paginate(number)}
                    className="text-slPurple bg-transparent hover:bg-slPurple hover:text-white active:bg-purple-600 font-bold text-md px-4 py-2 rounded outline-none focus:outline-none mb-1 ease-linear transition-all duration-150"
                  >
                    {number}
                  </button>
                </li>
              ))
            : ""}
        </ul>
      </nav>
    </>
  );
};

export default Pagination;
