import React, { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { FaRegCalendarAlt } from "react-icons/fa";
import { BsBell } from "react-icons/bs";
import { MdKeyboardArrowDown } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

// import { useNavigate } from "react-router-dom";
// import { useToast } from "../context/toster";

const Navbar = () => {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState('');
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    // Get user data from localStorage
    const userStr = localStorage.getItem('user');
    const role = localStorage.getItem('userRole');
    
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        setUserEmail(user?.email || '');
      } catch (e) {
        setUserEmail('');
      }
    }
    setUserRole(role || '');
  }, []);

  const handleLogout = () => {
    // Clear all auth data from localStorage
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    localStorage.removeItem('userRole');
    localStorage.removeItem('refreshToken');
    
    toast.success('Logged out successfully');
    router.push('/login');
  };

  return (
    <div>
      <div className="h-[60px] flex border border-gray-300 items-center bg-white px-3 xl:px-8">
        {/* logo */}
        <img src="/smallLogo.jpeg" alt="" className=" w-[180px]" />

        

        {/* Search bar */}
        <div className="h-10 hidden lg:flex items-center gap-2 w-1/4 bg-[#edf2f8] px-2 rounded-lg ml-auto mr-4 xl:mr-9">
          <IoSearch className="text-[#d96302]" size={18} />
          <input
            type="text"
            placeholder="Search here..."
            className="outline-none bg-transparent"
          />
        </div>
        <IoSearch
          className="text-[#d96302] lg:hidden flex mr-5 ml-auto"
          size={18}
        />

        {/* icons */}
        <div className="flex gap-2 xl:gap-6 items-center">
          {/* <FaRegCalendarAlt size={18} className="cursor-pointer" /> */}

          <div className="bg-[#FFFAF1] w-[36px] h-[36px] rounded-md flex justify-center items-center cursor-pointer">
            <BsBell className="text-[#FFA412]" size={18} />

            {/* red dot */}
            <div className="w-[5px] h-[5px] rounded-full bg-[#EB5757] mb-5"></div>
          </div>
        </div>

        {/* User */}
        <div className="flex gap-2 group items-center pl-2 sm:pl-4 xl:px-5 cursor-pointer relative">
          {/* <img
            src="/user.png"
            alt=""
            className="rounded-lg w-8 h-8 sm:w-10 sm:h-10"
          /> */}
          <FaUserAlt size={25} />

          <div className="hidden sm:flex">
            <div>
              {/* name */}
              <p className="text-sm ">{userEmail ? userEmail?.split('@')[0] : "User"}</p>

              {/* type */}
              <p className="text-gray-400 text-sm">{userRole || "Admin"}</p>
            </div>
          </div>

          {/* logut button  */}
        <div className=" hidden  group-hover:flex min-w-[180px] z-10 flex-col absolute right-0 top-10 bg-[#fff] shadow-2xl p-3 rounded">
          
          <button
            onClick={handleLogout}
              className={` p-2  flex  text-sm font-semibold items-start cursor-pointer  text-gray-500`}
            >Logout{" "}
          </button>
        </div>
        </div>

      </div>
    </div>
  );
};

export default Navbar;
