import React, { useState } from "react";
import Wraper from "../shared/Wraper";
import Logo from "../../assets/Logo.svg";
import TextButton from '../shared/Button/TextButton';
import SearchIcon from "../../assets/SearchIcon.svg";
import { Outlet } from 'react-router-dom';

let arr = [
  { desc: "Home", href: "/" },
  { desc: "About", href: "/about" },
  { desc: "Pricing", href: "/pricing" },
  { desc: "Blog", href: "/blog" },
  { desc: "Contact", href: "/contact" },
];

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="bg-white sticky top-0 z-50">
        <Wraper className="pt-2 ">
          <nav className="flex flex-col md:flex-row justify-between items-center py-3 px-4 md:px-10 lg:px-16">
            {/* Logo */}
            <div className="flex justify-between items-center w-full md:w-auto">
              <img src={Logo} alt="Logo" className="cursor-pointer h-8" />
              <TextButton
                className="md:hidden text-gray-800 focus:outline-none"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16m-7 6h7"
                    />
                  </svg>
                )}
              </TextButton>
            </div>

            {/* Menu */}
            <div
              className={`flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-14 ${
                isMobileMenuOpen ? "block" : "hidden"
              } md:block`}
            >
              <ul
                className={`flex flex-col md:flex-row list-none text-[17px] font-semibold space-y-2 md:space-y-0 md:space-x-8 lg:space-x-14`}
              >
                {arr.map((item, index) => (
                  <li
                    className="relative group text-left md:text-center"
                    key={index}
                  >
                    <span
                      className="cursor-pointer text-purple-taupe hover:opacity-80 duration-300"
                      onClick={() => navigate(item.href)}
                    >
                      {item.desc}
                    </span>
                    <span className="block absolute left-0 bottom-0 w-0 h-[2px] bg-purple-taupe transition-all duration-300 group-hover:w-full"></span>
                  </li>
                ))}
                <img
                  src={SearchIcon}
                  alt="Search"
                  className="cursor-pointer h-6 w-6 hidden md:block"
                />
              </ul>
            </div>

            {/*common TextButtons */}
            <div className="hidden md:flex items-center space-x-5">
              <TextButton variant="outlined" href="/">Sign in</TextButton>
              <TextButton href="/signup">Sign up</TextButton>
            </div>
          </nav>
        </Wraper>
      </header>

      {/* This is where the child routes will render */}
      <Outlet />
    </>
  );
};

export default Header;
