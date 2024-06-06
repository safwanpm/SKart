import React from 'react'
import Navbar from '../../components/User/Navbar'
import SimilarProduct from '../../components/User/SimilarProducts'
import ProductDetails from '../../components/User/ProductDetails'

function ProductDetailsPg() {
  return (
    <div>
        <Navbar/>
        <ProductDetails/>
        <SimilarProduct/>
    </div>
  )
}

export default ProductDetailsPg