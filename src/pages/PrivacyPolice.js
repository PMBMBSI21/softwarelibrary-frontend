import React from "react";

import Navbar from "parts/Navbar";
import Footer from "parts/Footer";
import Part1 from "parts/privacyPolice/part1";
import Part2 from "parts/privacyPolice/part2";
import Part3 from "parts/privacyPolice/part3";

export default function PrivacyPolice() {
  return (
    <>
      <section className="container mx-auto pt-4 px-6 lg:px-0">
        <Navbar></Navbar>
      </section>

      <section className="container mx-auto mt-6 px-6 lg:px-0">
        <h1 className=" text-3xl font-bold text-center">Kebijakan Privasi</h1>

        <Part1></Part1>
        <Part2></Part2>
        <Part3></Part3>
      </section>

      <section className="Container mx-auto">
        <Footer></Footer>
      </section>
    </>
  );
}
