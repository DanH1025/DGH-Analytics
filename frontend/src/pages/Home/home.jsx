import React from 'react'
import './home.css'

import Topbar from '../../components/topbar/topbar'
import ImageSlider from '../../components/imageSlider/imageSlider'
import FeaturedInfo from '../../components/featuredInfo/featuredInfo'
import ProductCard from '../../components/productCard/productCard'
import ContactUs from '../../components/contactUs/contactUs'
import { sliderData } from '../../components/imageSlider/sliderData'

export default function Home() {
  return (
    <>
        <Topbar />
        <ImageSlider className="imageSliderComponent" slides={sliderData} />
        <FeaturedInfo />
        <ProductCard className="productList" /> 
        <ContactUs />
    </>
  )
}
