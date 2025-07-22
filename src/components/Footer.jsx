import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white w-full py-6 px-4 md:px-8 border-t border-gray-400 shadow-md">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center md:justify-between gap-4 md:gap-0 text-center md:text-left">
        {/* Logo */}
        <div className="flex items-center gap-2 mb-2 md:mb-0">
          <img src="/logo.jpeg" alt="logo" className="w-[150px] h-[100px] " />
          {/* <div className="bg-green-500 text-white font-extrabold text-3xl rounded px-2 py-1">HK</div> */}
          {/* <span className="bg-blue-400 text-white font-bold px-3 py-1 rounded ml-1 text-lg">Logo</span> */}
        </div>
        {/* Copyright */}
        <div className="text-black text-base mb-2 md:mb-0">
          © {new Date().getFullYear()} -  All Right Reserved
        </div>
        {/* Back to top */}
        <a href="#" className="text-black text-base hover:underline">Back to top</a>
      </div>
    </footer>
  );
};

export default Footer; 