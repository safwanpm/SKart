import React from 'react'
import Slider from '../components/Slider'
import Navbar from '../components/Navbar'
import Product from '../components/Product'
import Footer from '../components/Footer'
import Landing from '../components/Landing'
import Logos from '../components/Logos'

function HomePg() {
  return (
    <div>
        <Navbar/>
        <Slider/>
        {/* <Landing/> */}
     
        <Logos/>
        <Product/>
        
        <Footer/>
    </div>
  )
}

export default HomePg