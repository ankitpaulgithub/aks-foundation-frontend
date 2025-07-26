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
    const path = pathname?.split("/")?.[2];
    console.log(path);
    const hrms = [
        {
            icon: <IoWalletOutline size={20} className={`text-[#d96302]`} />,
            text: "Salary",
            url: "/HRMS/salary"
        },
        {
            icon: <AiOutlineProfile size={20} className={`text-[#d96302]`} />,
            text: "Salary Advance",
            url: "/HRMS/salaryAdvance"
        },
        {
            icon: <BsLayoutTextSidebarReverse size={20} className={`text-[#d96302]`} />,
            text: "Overtime",
            url: "/HRMS/overtime"
        },
        {
            icon: <IoWalletOutline size={20} className={`text-[#d96302]`} />,
            text: "Allowance/Bonus",
            url: "/HRMS/hiring"
        },
        {
            icon: <TfiWallet size={20} className={`text-[#d96302]`} />,
            text: "Deduction",
            url: "/HRMS/deduction"
        },
        {
            icon: <BsGraphUpArrow size={20} className={`text-[#d96302]`} />,
            text: "Employee Ledger",
            url: "/HRMS/employee-ledger"
        },
        {
            icon: <BsGraphUpArrow size={20} className={`text-[#d96302]`} />,
            text: "Schedule",
            url: "/HRMS/schedule"
        },
        {
            icon: <BsGraphUpArrow size={20} className={`text-[#d96302]`} />,
            text: "Request",
            url: "/HRMS/request"
        },
        {
            icon: <BsGraphUpArrow size={20} className={`text-[#d96302]`} />,
            text: "Hiring",
            url: "/HRMS/hiring"
        },
    ]

    const finance = [
        {
            icon: <IoWalletOutline size={20} className={`text-[#d96302]`} />,
            text: "Ledger",
            url: "/finance/ledger"
        },
        {
            icon: <AiOutlineProfile size={20} className={`text-[#d96302]`} />,
            text: "Invoice",
            url: "/finance/invoice"
        },
        {
            icon: <BsLayoutTextSidebarReverse size={20} className={`text-[#d96302]`} />,
            text: "Sale Register",
            url: "/finance/saleRegister"
        },
        {
            icon: <LuBandage size={20} className={`text-[#d96302]`} />,
            text: "Profit-Loss",
            url: "/finance/profitLoss"
        },
        {
            icon: <TfiWallet size={20} className={`text-[#d96302]`} />,
            text: "Udhari",
            url: "/finance/udhari"
        },
        // {   icon:<BsGraphUpArrow size={20} className={`text-[#d96302]`}/>,
        //     text:"Bank Analysis",
        //     url:"/finance/inventory/purchaseRegister"
        // },
        {
            icon: <BsGraphUpArrow size={20} className={`text-[#d96302]`} />,
            text: "Cashbook",
            url: "/finance/cashbook"
        },
    ]

    const inventory = [
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
                    className={`${path === "dashboard" ? "border-r-8 bg-[#F3FCF7]" : ""} flex gap-3 py-2  border-[#d96302] text-gray-600 items-center font-semibold  pl-3 xl:pl-8  cursor-pointer`}>
                    <HiChartPie size={23} className={`text-[#d96302]`} />
                    Dashborad
                    <BiSolidStar size={22} className={`text-[#FDDD3D] ml-auto mr-2`} />
                </div>


                {/* Students */}
                <div>

                <div className='text-gray-500 font-semibold my-2 text-sm ml-3 xl:ml-8 uppercase '>Students</div>
                    {
                        finance.map((items, index) => (
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

                <div className='text-gray-500 font-semibold my-2 text-sm ml-3 xl:ml-8 uppercase '>Exams</div>
                    {
                        hrms.map((items, index) => (
                            <div key={index} onClick={() => router.push(`${items?.url}`)}
                                className={`${path === items?.url ? 'border-r-8 bg-[#F3FCF7]' : ''} flex gap-3 py-2  border-[#d96302] text-gray-600 items-center ml-3 xl:ml-8 cursor-pointer`}>
                                {items?.icon}
                                {items?.text}
                            </div>
                        ))
                    }
                </div>


                {/* Inventory */}
                <div>

                    {
                        inventory.map((items, index) => (
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
