import React, { useState } from 'react'
import { MdKeyboardArrowDown } from "react-icons/md";
import { HiChartPie } from "react-icons/hi2";
import { BiSolidStar } from "react-icons/bi";
import { MdBarChart } from "react-icons/md";
import { PiSuitcaseSimpleThin } from "react-icons/pi";
import { IoCartOutline } from "react-icons/io5";
import { IoWalletOutline } from "react-icons/io5";
import { AiOutlineProfile } from "react-icons/ai";
import { BsGraphUpArrow } from "react-icons/bs";
import { BsLayoutTextSidebarReverse } from "react-icons/bs";
import { TfiWallet } from "react-icons/tfi";
import { LuListCheck } from "react-icons/lu";
import { BsFillBoxSeamFill } from "react-icons/bs";
import { FiShoppingBag } from "react-icons/fi";
// import { useLocation, useNavigate } from 'react-router-dom';
import { LuBandage } from "react-icons/lu";
import { useRouter } from 'next/router';
import { usePathname } from 'next/navigation';



const Sidebar = () => {
    const pathname = usePathname();
    const router = useRouter();
    const path = pathname;
    // console.log(path);
    const fee = [
        {
            icon: <IoWalletOutline size={20} className={`text-[#d96302]`} />,
            text: "Fee Receipt",
            url: "/(education)/fee/receipt"
        },
        {
            icon: <AiOutlineProfile size={20} className={`text-[#d96302]`} />,
            text: "Fee Pending",
            url: "/(education)/fee/pending"
        },
        {
            icon: <BsLayoutTextSidebarReverse size={20} className={`text-[#d96302]`} />,
            text: "Fee Demand",
            url: "/(education)/fee/demand"
        },
        {
            icon: <IoWalletOutline size={20} className={`text-[#d96302]`} />,
            text: "Fee Search",
            url: "/(education)/fee/search"
        },
    ]

    const students = [
        {
            icon: <IoWalletOutline size={20} className={`text-[#d96302]`} />,
            text: "Admission",
            url: "/(education)/students/admission"
        },
        {
            icon: <AiOutlineProfile size={20} className={`text-[#d96302]`} />,
            text: "Student List",
            url: "/(education)/students/list"
        },
        {
            icon: <BsLayoutTextSidebarReverse size={20} className={`text-[#d96302]`} />,
            text: "Student Details",
            url: "/(education)/students/details"
        },
    ]

    const exams = [
        {
            icon: <BsFillBoxSeamFill size={20} className={`text-[#d96302]`} />,
            text: "Inventory",
            url: "/inventory"
        },
        {
            icon: <LuListCheck size={20} className={`text-[#d96302]`} />,
            text: "Purcahse Register",
            url: "/inventory/purchaseRegister"
        },
    ]

    return (
        <div className='hidden lg:flex '>
            <div className='w-[230px]'>



                <div className='text-gray-500 font-semibold my-2 text-sm ml-3 xl:ml-8 uppercase '>Education</div>

                {/* Dashborad */}
                <div onClick={() => router.push("/(education)/dashboard")}
                    className={`${path === "/(education)/dashboard" ? "border-r-8 bg-[#F3FCF7]" : ""} flex gap-3 py-2  border-[#d96302] text-gray-600 items-center font-semibold  pl-3 xl:pl-8  cursor-pointer`}>
                    <HiChartPie size={23} className={`text-[#d96302]`} />
                    Dashborad
                    <BiSolidStar size={22} className={`text-[#FDDD3D] ml-auto mr-2`} />
                </div>


                {/* Students */}
                <div>

                <div className='text-gray-500 font-semibold my-2 text-sm ml-3 xl:ml-8 uppercase '>Students</div>
                    {
                        students.map((items, index) => (
                            <div key={index} onClick={() => router.push(`${items?.url}`)}
                                className={`${path === items?.url ? 'border-r-8 bg-[#F3FCF7]' : ''} flex gap-3 py-2  border-[#d96302] text-gray-600 items-center  ml-3 xl:ml-8 cursor-pointer`}>
                                {items?.icon}
                                {items?.text}
                            </div>
                        ))
                    }
                </div>



                {/* Exams */}
                <div>

                <div className='text-gray-500 font-semibold my-2 text-sm ml-3 xl:ml-8 uppercase '>Fee</div>
                    {
                        fee.map((items, index) => (
                            <div key={index} onClick={() => router.push(`${items?.url}`)}
                                className={`${path === items?.url ? 'border-r-8 bg-[#F3FCF7]' : ''} flex gap-3 py-2  border-[#d96302] text-gray-600 items-center ml-3 xl:ml-8 cursor-pointer`}>
                                {items?.icon}
                                {items?.text}
                            </div>
                        ))
                    }
                </div>


                {/* Inventory */}
                <div className='text-gray-500 font-semibold my-2 text-sm ml-3 xl:ml-8 uppercase '>Exams</div>
                <div>

                    {
                        exams.map((items, index) => (
                            <div key={index} onClick={() => router.push(`${items?.url}`)}
                                className={`${path === items?.url ? 'border-r-8 bg-[#F3FCF7]' : ''} flex gap-3 py-2  border-[#d96302] text-gray-600 items-center ml-3 xl:ml-8 cursor-pointer`}>
                                {items?.icon}
                                {items?.text}
                            </div>
                        ))
                    }
                </div>


                {/* Sales */}
                {/* <div className={`flex gap-3 py-2  items-center font-semibold text-gray-400  pl-3 xl:pl-8 my-3`}>
                    <FiShoppingBag size={23} className={``} />
                    Sales
                </div>

                <div className={`flex gap-3 py-2  items-center font-semibold text-gray-400  pl-3 xl:pl-8 my-3`}>
                    <FiShoppingBag size={23} className={``} />
                    Marketing
                </div>

                <div className='text-gray-500 font-semibold text-sm ml-3 xl:ml-8  '>Business</div>

                <li className='text-gray-500  ml-3 xl:ml-8 py-2 '>
                    Assign Roles
                </li>
                <li className='text-gray-500  ml-3 xl:ml-8 py-2 '>
                    Business Profile
                </li>
                <li className='text-gray-500  ml-3 xl:ml-8 py-2 '>
                    Business Partner
                </li> */}

                {/* <DialogBox
                    open={open}
                    setOpen={setOpen}
                    heading1="Add Organisation"
                    content={<CreateOrg setOpen={setOpen} />}
                />
                <DialogBox
                    open={opencompulsary}
                    setOpen={()=>setOpencompulsary(true)}
                    heading1="Add Organisation"
                    content={<CreateOrg setOpen={setOpencompulsary} />}
                />
                <DialogBox
                    open={openBranch}
                    setOpen={setOpenBranch}
                    heading1={`Add Branch to ${selectedValue?.replace("_", " ")}`}
                    content={<CreateBranch setOpen={setOpenBranch} selectedValue={selectedValue} />}
                /> */}

            </div>
        </div>
    )
}

export default Sidebar
