import React from "react";
import Link from "next/link";
import Logo from "./Logo";

const Navbar = () => {
  return (
    <nav className="text-gray-600 body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          <Logo />
          <span className="ml-3 text-xl">WhatsNext</span>
        </a>
        <nav className="md:ml-auto md:mr-auto flex flex-wrap md:space-x-2 items-center text-base justify-center">
          <Link href="/login">
            <a className="block w-1/2 px-3 py-2 mx-2 my-2 rounded text-center text-sm bg-gray-500 font-medium text-white leading-5 hover:bg-gray-600 md:mx-0 md:w-auto transition-colors duration-200">
              Log in
            </a>
          </Link>
          <Link href="/signup">
            <a className="block w-1/2 px-3 py-2 mx-2 my-2 rounded text-center text-sm bg-purple-500 font-medium text-white leading-5 hover:bg-purple-600 md:mx-0 md:w-auto transition-colors duration-200">
              Sign up
            </a>
          </Link>
        </nav>
        <Link href="/">
          <button className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
            Return
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-4 h-4 ml-1"
              viewBox="0 0 24 24"
            >
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
