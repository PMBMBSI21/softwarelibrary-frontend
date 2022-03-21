import React, { useEffect } from "react";

import Navbar from "parts/Navbar";
import Footer from "parts/Footer";
import LoginForm from "parts/LoginForm";

function Login() {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  return (
    <>
      <section className="container mx-auto pt-4 px-6 lg:px-0">
        <Navbar></Navbar>
      </section>

      <section className="Container mx-auto">
        <LoginForm></LoginForm>
      </section>

      <section className="Container mx-auto mt-40">
        <Footer></Footer>
      </section>
    </>
  );
}

export default Login;
