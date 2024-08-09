import React from "react";
import Slider from "../../components/User/Slider";
import Navbar from "../../components/User/Navbar";
import Product from "../../components/User/Product";
import Footer from "../../components/User/Footer";
import Popular from "../../components/User/Popular";
import Logos from "../../components/User/Logos";

function HomePg() {
  return (
    <div>
      <Navbar />
      <Slider />
      
      <Popular />
  
      <Product />
<Logos/>
      <Footer />
    </div>
  );
}

export default HomePg;
