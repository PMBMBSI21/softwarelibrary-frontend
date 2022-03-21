import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";

import api from "api/axios";

// import { ReactComponent as LogoBrand } from "assets/images/icon-sl.svg";
// import { ReactComponent as LogoBrand } from "assets/images/logosl.svg";

function Navbar({ location, history }) {
  const [User, setUser] = useState(() => null);

  const [click, setClick] = useState(true);
  const handleClick = () => setClick(!click);

  React.useEffect(() => {
    window.scroll(0, 0);

    getUsersLogin();
  }, []);

  function getUsersLogin() {
    const fetchData = async () => {
      try {
        const getToken = JSON.parse(localStorage.getItem("SLIBRARY:token"));

        const response = await api.get("/me", {
          headers: { Authorization: `Bearer ${getToken.access_token}` },
        });

        setUser(response.data);
      } catch (err) {
        console.log(`Error: ${err.message}`);
      }
    };

    fetchData();
  }

  const btnLogout = location.pathname.indexOf("/login");
  const btnLogoutPrivacy = location.pathname.indexOf("/privacy-police");
  const btnLogoutTermCondition = location.pathname.indexOf(
    "/term-and-conditions"
  );

  function deleteAllCookies() {
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i];
      var eqPos = cookie.indexOf("=");
      var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
  }

  function logout() {
    localStorage.removeItem("SLIBRARY:token");
    history.push("/login");
    deleteAllCookies();
  }

  var firstName = User?.Name.replace(/ .*/, "");

  return (
    <div>
      <nav className="w-full z-10" data-aos="fade-down">
        <div className="w-full">
          <div className="flex items-center w-full" style={{ height: 120 }}>
            <div className="flex items-center justify-between w-full">
              <div className="flex justify-center items-center flex-shrink-0 ">
                <div className=" flex items-center relative">
                  {/* <LogoBrand className=""></LogoBrand> */}
                  <img
                    src="/assets/images/logosl2.png"
                    alt="test"
                    className=" w-20"
                  />
                  <span className="ml-4 text-2xl text-slIndigo-600 font-bold text-center leading-none mr-14 font-sans nav-brand-text">
                    Software <br /> Library
                  </span>

                  <Link to="/" className="link-wrapped"></Link>
                </div>
              </div>

              {User ? (
                <div className=" relative z-50">
                  <button
                    onClick={handleClick}
                    className="btn-toggle border-2 outline-none focus:outline-none bg-slIndigo-400 bg-opacity-20 border-slIndigo-600 px-8 py-2 rounded-md text-slIndigo-600 font-bold flex items-center hover:bg-opacity-100 focus:bg-opacity-100 transition-all duration-75"
                  >
                    <div className="w-8 h-8 rounded-full overflow-hidden md:mr-2 ">
                      <img
                        src={User?.Foto}
                        alt=""
                        className=" object-cover w-8 h-8 inline-block"
                      />
                    </div>
                    <div className="text-name-user">
                      <span className=" capitalize">{firstName}</span>
                    </div>
                  </button>

                  <ul
                    className={
                      click ? "dropdown-menu clicked" : "dropdown-menu"
                    }
                  >
                    <li>
                      <Link
                        className=""
                        to="/profile"
                        onClick={() => setClick(true)}
                      >
                        Profile
                      </Link>
                    </li>

                    {User.Level === 2 ? (
                      <li>
                        <Link
                          className=""
                          to="/dashboard"
                          onClick={() => setClick(true)}
                        >
                          Dashboard
                        </Link>
                      </li>
                    ) : null}

                    <li>
                      <a className="" onClick={logout}>
                        Logout
                      </a>
                    </li>
                  </ul>
                </div>
              ) : btnLogout && btnLogoutPrivacy && btnLogoutTermCondition ? (
                <button
                  type="button"
                  onClick={logout}
                  className="cursor-pointer inline-flex items-center font-semibold bg-slIndigo-600 text-white hover:bg-slIndigo-800  px-6 py-2 rounded-md transition-all duration-200"
                >
                  Logout
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default withRouter(Navbar);
