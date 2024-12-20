import React from 'react'
import Navbar from '../components/Navbar'
import Hero from "../components/Home/Hero/Hero";
import Featured from '../components/Home/Featured/Featured';
import WhyUs from "../components/Home/WhyUs/WhyUs";
import Footer from "../components/Footer";


const Home = () => {
  return (
    <>
    {/* <Navbar/> */}
    <Hero/>
    <Featured/>
    <WhyUs />
    <Footer />
    </>
  )
}

export default Home