import React from "react";

import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="h-screen flex flex-col items-center">
      <div className=" w-1/2 flex justify-center items-center">
        <img
          src={`${process.env.PUBLIC_URL}/assets/images/img-not-found-1.gif`}
          alt="Ooops we lost you"
        />
      </div>
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slGray-900 text-center lg:text-left -mt-10">
        Opps! We’re lost
      </h1>
      <p className="text-lg text-gray-600 mt-4 mtb-8 lg:w-3/12 xl:w-2/12 mx-auto text-center">
        The page that you requested is not found in our system
      </p>
      <Link
        className=" block mt-4 lg:mt-12 bg-slIndigo-600 py-3 text-xl text-center shadow-inner rounded-lg text-white font-bold font-sans hover:bg-slIndigo-800  hover:shadow-xl transition-all duration-400 w-52"
        to="/"
      >
        Back to home
      </Link>
    </section>
  );
}
