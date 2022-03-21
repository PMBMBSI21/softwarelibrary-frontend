import React, { useEffect } from "react";

import Navbar from "parts/Navbar";
import Footer from "parts/Footer";
import RegisterForm from "parts/RegisterForm";

export default function Login() {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  return (
    <>
      <section className="container mx-auto pt-4 px-6 lg:px-0">
        <Navbar></Navbar>
      </section>

      <section className="Container mx-auto">
        <RegisterForm></RegisterForm>
      </section>

      <section className="Container mx-auto">
        <Footer></Footer>
      </section>
    </>
  );
}
