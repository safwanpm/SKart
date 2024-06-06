import React from "react";
import Slider from "../../components/User/Slider";
import Navbar from "../../components/User/Navbar";
import Product from "../../components/User/Product";
import Footer from "../../components/User/Footer";
import Popular from "../../components/User/Popular";

function HomePg() {
  return (
    <div>
      <Navbar />
      <Slider />
      
      <Popular />
  
      <Product />

      <Footer />
    </div>
  );
}

export default HomePg;
