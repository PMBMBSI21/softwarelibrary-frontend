import React, { useState } from "react";

import { useForm } from "react-hook-form";
import { Link, withRouter } from "react-router-dom";

import users from "constants/api/users";

import { setAuthorizationHeader } from "configs/axios";
import { ReactComponent as LogoBrand } from "assets/images/icon-sl.svg";

function LoginForm({ history }) {
  const [email, setEmail] = useState(() => "");
  const [password, setPassword] = useState(() => "");
  const [errMsg, setErrMsg] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function submit(e) {
    // e.preventDefault();

    users
      .login({ email, password })
      .then((res) => {
        setAuthorizationHeader(res.access_token);

        users.details().then((detail) => {
          const production =
            process.env.REACT_APP_FRONTPAGE_URL ===
            "http://103.160.95.49/software-library"
              ? "Domain = softwarelibrary.pmb.id"
              : "";

          localStorage.setItem(
            "SLIBRARY:token",
            JSON.stringify({
              ...res,
              email: email,
              level: detail.Level,
            })
          );
          const redirect = localStorage.getItem("SLIBRARY:redirect");
          const userCookie = {
            name: detail.Name,
            avatar: detail.Foto,
            level: detail.Level,
          };

          const expires = new Date(
            new Date().getTime() + 7 * 24 * 60 * 60 * 1000
          );

          document.cookie = `SLIBRARY:user=${JSON.stringify(
            userCookie
          )}; expires=${expires.toUTCString()}; path:/; ${production}`;

          const checkLevel = detail.Level;

          if (checkLevel === 2) {
            history.push("/dashboard");
          } else if (checkLevel === 1) {
            history.push(redirect || "/");
          } else {
            history.push("/err");
          }
        });
      })
      .catch((err) => {
        if (err?.response?.status === 422) {
          setErrMsg("Email or Password wrong!");
        } else {
          setErrMsg("Login Failed!");
        }
      });
  }

  return (
    <>
      <div className="container mx-auto px-6 pt-20 lg:px-0">
        <div className=" lg:flex items-center w-full lg:h-640">
          <div
            className=" md:w-472 lg:w-3/5  lg:h-full flex lg:items-center justify-center mx-auto"
            data-aos="zoom-out"
          >
            <img
              src="/assets/images/img-hero-login.png"
              alt="hero login"
              className=" w-full object-cover"
            />
          </div>

          <div className=" lg:w-2/5 my-auto">
            <div className=" md:w-3/5 mx-auto mt-12 lg:mt-1">
              <div
                className="flex items-center justify-center relative"
                data-aos="zoom-in"
              >
                <LogoBrand className=""></LogoBrand>
                <span className="ml-4 text-2xl text-slIndigo-600 font-bold text-center leading-none mr-14 font-sans">
                  Software <br /> Library
                </span>

                <Link to="/" className="link-wrapped"></Link>
              </div>

              <form
                onSubmit={handleSubmit(submit)}
                className="mt-4"
                method="POST"
              >
                <div className="block " data-aos="fade-up" data-aos-delay="100">
                  <label
                    htmlFor="email"
                    className="text-gray-800 font-semibold text-lg"
                  >
                    Email
                  </label>
                  <input
                    type="text"
                    id="email"
                    // name="email"
                    {...register("email", {
                      required: "Email is required!",
                      pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: "This is not valid email!",
                      },
                    })}
                    onChange={(event) => setEmail(event.target.value)}
                    value={email}
                    placeholder="example@gmail.com"
                    className="p-1 mt-1 text-gray-600 font-semibold bg-transparent  border-b-2 border-gray-300 outline-none focus:border-slIndigo-600  focus:outline-purple  w-full transition-all duration-300"
                  />
                  <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                    {errors.email?.message}
                  </span>
                </div>

                <div
                  className="block mt-6"
                  data-aos="fade-up"
                  data-aos-delay="200"
                >
                  <label
                    htmlFor="password"
                    className="text-gray-800 font-semibold text-lg"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    {...register("password", {
                      required: "Password is required!",
                      minLength: { value: 4, message: "Min Length is 4" },
                    })}
                    // name="password"
                    onChange={(event) => setPassword(event.target.value)}
                    value={password}
                    placeholder="Enter your password"
                    className="p-1 mt-1 text-gray-600 font-semibold bg-transparent  border-b-2 border-gray-300 outline-none focus:border-slIndigo-600  focus:outline-purple  w-full transition-all duration-300"
                  />
                  <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                    {errors.password?.message}
                  </span>
                </div>

                <div className="mt-2">
                  {errMsg && (
                    <p className=" text-red-400 font-semibold">{errMsg}</p>
                  )}
                </div>

                <button
                  data-aos="fade-up"
                  data-aos-delay="300"
                  type="submit"
                  className="mt-3 w w-full py-3 rounded-lg bg-slIndigo-600 text-white font-semibold font-sans text-xl shadow-md hover:bg-slIndigo-800 hover:shadow-xl transition-all duration-300 outline-none focus:outline-none"
                >
                  Login
                </button>

                <div
                  className="my-6 text-center"
                  data-aos="fade-up"
                  data-aos-delay="400"
                >
                  By registering, I agree <br />
                  <Link
                    to="/term-and-conditions"
                    className=" text-slIndigo-600 cursor-pointer hover:underline hover:text-slIndigo-400 font-semibold"
                  >
                    Terms & Conditions
                  </Link>{" "}
                  and{" "}
                  <Link
                    to="/privacy-police"
                    className=" text-slIndigo-600 cursor-pointer hover:underline hover:text-slIndigo-400 font-semibold"
                  >
                    Privacy Policy
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default withRouter(LoginForm);
