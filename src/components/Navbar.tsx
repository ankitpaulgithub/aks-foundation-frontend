import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="w-full bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img src="/smallLogo.jpeg" alt="logo" className=" w-[180px]" />
          {/* <div className="bg-green-500 text-white font-extrabold text-2xl rounded px-2 py-1">HK</div> */}
          {/* <span className="bg-blue-200 text-blue-900 font-semibold px-3 py-1 rounded ml-1 text-lg">Logo</span> */}
        </div>
        {/* Auth Buttons */}
        <div className="flex items-center gap-4">
          {/* <a href="#" className="text-blue-900 font-medium hover:underline">Log in</a> */}
          <Link href='/login' className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-5 py-2 rounded-lg shadow transition-colors">Login</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 