import React from "react";

import { Link } from "react-router-dom";

export default function Unauthenticated({
  fallbackUrl,
  fallbackText,
  external,
}) {
  return (
    <section className=" w-screen h-screen  flex items-center">
      <div className="container mx-auto px-6 lg:px-0">
        <div className="grid lg:grid-cols-2 gap-4">
          <div className=" mx-auto">
            <div className=" w-full flex justify-center items-center">
              <img
                src={`${process.env.PUBLIC_URL}/assets/images/img-security-access.gif`}
                alt="you are not supposed here, please login"
                className=" w-full"
              />
            </div>
          </div>

          <div className=" h-full flex items-center">
            <div className=" md:w-9/12 mx-auto ">
              <h1 className=" text-3xl md:text-4xl lg:text-5xl font-bold text-slGray-900 text-center  capitalize">
                Whoops!!!
              </h1>
              <h1 className=" text-3xl md:text-4xl font-bold text-slGray-900 text-center  capitalize mt-2">
                You must Login First
              </h1>

              <div className=" md:w-2/3 mx-auto lg:mx-0">
                {external ? (
                  <a
                    href={fallbackUrl}
                    className=" block mt-4 lg:mt-16 bg-slIndigo-600 py-3 text-xl text-center shadow-inner rounded-lg text-white font-bold font-sans hover:bg-slIndigo-800  hover:shadow-xl transition-all duration-400"
                  >
                    {fallbackText || "Login"}
                  </a>
                ) : (
                  <Link
                    to={fallbackUrl || "/login"}
                    className=" block mt-4 lg:mt-16 bg-slIndigo-600 py-3 text-xl text-center shadow-inner rounded-lg text-white font-bold font-sans hover:bg-slIndigo-800  hover:shadow-xl transition-all duration-400"
                  >
                    {fallbackText || "Login"}
                  </Link>
                )}

                {/* <Link
                  to="/login"
                  className=" block mt-4 lg:mt-12 bg-slIndigo-600 py-3 text-xl text-center shadow-inner rounded-lg text-white font-bold font-sans hover:bg-slIndigo-800  hover:shadow-xl transition-all duration-400"
                >
                  Login
                </Link>

                <div className=" mx-auto font-semibold mt-4">
                  Don't have an account?{" "}
                  <Link
                    to="/register"
                    className=" font-semibold text-slIndigo-600 hover:underline hover:text-slIndigo-400 transition-all duration-300"
                  >
                    Register
                  </Link>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
