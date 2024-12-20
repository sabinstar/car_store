import React, { useState } from 'react';

import { IoCarSport } from "react-icons/io5"
import { CiMenuBurger } from "react-icons/ci"
import { CiMenuFries } from "react-icons/ci"
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [menu, setMenu] = useState(false);

    const handleChange = () => {
    setMenu(!menu);
  };
  return (
    <header className=" w-full z-10 bg-secondary text-white py-4">
      {/* Desktop navigation section */}
      <nav className='container flex justify-between items-center'>
        <div className='flex items-center gap-2'>
          <IoCarSport size={35} className='text-primary' />
          <a href="/" className='font-bold text-2xl'>Car store</a>
        </div>
        <div className='hidden md:flex items-center gap-8 font-medium text-xl'>
          <Link to="/" 
          className="hover:text-primary transition duration-200 ease-linear">Home</Link>
          <Link to="/about" className="hover:text-primary transition duration-200 ease-linear">About Us</Link>
          <Link to="/product" className="hover:text-primary transition duration-200 ease-linear">Our Cars</Link>
          <Link to="/services" className="hover:text-primary transition duration-200 ease-linear">Services</Link>
          <Link to="/login-signup" className="hover:text-primary transition duration-200 ease-linear hidden lg:flex border-2 border-primary text-lg px-4 rounded-md hover:bg-primary transition duration-200 ease-linear">
            Sign In
          </Link>
        </div>
        <div className=" md:hidden flex items-center">
          {menu ? (
            <CiMenuFries  size={25} onClick={handleChange} />
          ) : (
            <CiMenuBurger size={25} onClick={handleChange} />
          )}
        </div>
      </nav>
      <div
        className={`${menu ? "translate-x-0" : "-translate-x-full"}
       md:hidden flex flex-col absolute bg-secondary text-white left-0 top-16 font-semibold text-2xl text-center pt-8 pb-4 gap-8 w-3/4 h-fit rounded-br-xl transition-transform duration-300`}
      >
          <a href="/" className="hover:text-primary transition duration-200 ease-linear">Home</a>
          <a href="/" className="hover:text-primary transition duration-200 ease-linear">About Us</a>
          <a href="/" className="hover:text-primary transition duration-200 ease-linear">Our Cars</a>
          <a href="/" className="hover:text-primary transition duration-200 ease-linear">Services</a>
          <div>
          <button className="border-2 border-primary py-1 px-4 rounded-md">
            Sign In
          </button>
        </div>
        </div>

    </header>
  )
}

export default Navbar
