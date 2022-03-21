import React from "react";

export default function Footer() {
  const getYear = new Date();
  return (
    <div
      className=" bg-gradient-to-tr from-slIndigo-600 to-slIndigo-200 mt-20"
      style={{ height: 120 }}
    >
      <div className="flex w-full h-full justify-center items-center font-semibold md:text-xl text-slGray-900">
        Copyright &#169; {getYear.getFullYear()} Software Library
      </div>
    </div>
  );
}
