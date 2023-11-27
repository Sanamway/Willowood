import React, { useState, useEffect } from "react";
import { BsBell, BsQuestionSquare } from "react-icons/bs";
import { AiOutlineMail } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";
import Profile from "../public/userimg.jpg";
import Image from "next/image";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdLogout } from "react-icons/md";
import WillLogo from "../public/Willowood.png";
import { AiOutlineHome } from "react-icons/ai";
import { BiUser, BiLogInCircle } from "react-icons/bi";
import { FcBusinessman } from "react-icons/fc";
import Footer from "./Footer";
import { Popover } from "@headlessui/react";
import { useRouter } from "next/router";

const Layout = ({ children }) => {
  const router = useRouter();
  const [isOpen, setOpen] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const collaps = () => {
    setOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("uid");
    localStorage.removeItem("userName");
    localStorage.removeItem("email");
    router.push("/logoutsuccess");
  };

  const menuItems = [
    { id: 1, label: "Login", icon: BiLogInCircle, link: "/login" },
    { id: 1, label: "User Role Profile", icon: AiOutlineHome, link: "/table/table_user_profile" },
    { id: 2, label: "User Information", icon: BiUser, link: "/table/table_user_information" },
    { id: 2.1, label: "Assign Role Profile", icon: BiUser, link: "/table/table_assign_role" },
    { id: 2.2, label: "User Assign Business", icon: BiUser, link: "/table/table_user_assign_business" },
    { id: 2.3, label: "Company Information", icon: BiUser, link: "/table/table_company_information" },
    {
      id: 2.4,
      label: "Business Div Segment",
      icon: BiUser,
      link: "/table/table_business_division_segment"
    },
    { id: 2.5, label: "Business Unit Cluster", icon: BiUser, link: "/table/table_business_unit_cluster" },
    { id: 2.6, label: "Business Zone", icon: BiUser, link: "/table/table_business_zone" },
    { id: 2.7, label: "Region", icon: BiUser, link: "/table/table_region" },
    { id: 2.8, label: "Territory", icon: BiUser, link: "/table/table_territory" },
    { id: 2.9, label: "District", icon: BiUser, link: "/table/table_district" },
    { id: 3.0, label: "Village", icon: BiUser, link: "/table/table_village" },
    { id: 3.1, label: "Depot/Warehouse", icon: BiUser, link: "/table/table_depot" },
    { id: 3.2, label: "Map Depot Warehouse", icon: BiUser, link: "/table/table_map_depot_warehouse" },
    { id: 3.3, label: "Product Category", icon: BiUser, link: "/table/table_product_category" },
    { id: 3.4, label: "Product Sement", icon: BiUser, link: "/table/table_product_segment" },
    { id: 3.5, label: "Product Brand", icon: BiUser, link: "/table/table_product_brand" },
    { id: 3.6, label: "Material SKU", icon: BiUser, link: "/table/table_material_sku" },
    { id: 3.7, label: "Rolling Plan", icon: BiUser, link: "/rollingplans" },
    { id: 3.7, label: "Dealer", icon: FcBusinessman, link: "/dealerform_details" },
    { id: 3.8, label: "Colletion Plan", icon: BiUser, link: "/collectionplans" },
    { id: 3.9, label: "Forgot", icon: BiUser, link: "/forgotpass" }
  ];

  const handleWindowSizeChange = () => {
    setIsMobile(window.innerWidth <= 768);
    setOpen(isOpen)
  };

  useEffect(() => {
    handleWindowSizeChange();
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  return (
    <>
      <div className="flex fixed w-full h-screen  font-arial bg-[#15283c]   ">
        {/* Sidebar */}
        <div
          className={`flex-shrink-0  ${
            isOpen ? (isMobile ? " " : "w-[4rem]  ") : isMobile ? "hidden " : "w-[14rem] "
          } bg-[#15283c] text-white custom-scrollbar min-h-screen overflow-x-hidden overflow-y-scroll transition-all ease-in-out duration-500`}
        >
          <div className="flex flex-col items-center w-full  ">
            <div className="flex items-center justify-between relative">
              <div className="flex items-center pl-1 gap-4">
                <div className="userImg flex items-center py-4 mx justify-center">
                  {isOpen ? (
                    <Image className="rounded-full h-8 w-8" src={Profile} alt="" />
                  ) : (
                    <div className="flex  items-center justify-center gap-4 ">
                      <Image className=" h-[4.1rem] w-[4.1rem] rounded-full" src={Profile} alt="" />
                      <div className="flex flex-col items-start font-sans">
                        <h2 className="font-sm text-white whitespace-nowrap">Uttam Aggarwal</h2>
                        <div className="flex items-center gap-2">
                          <h2 className="bg-[#00FF00] h-2 w-2 rounded-full animate-ping"></h2>
                          <h2 className="text-sm text-text-green font-normal">Online</h2>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {!isOpen && (
              <div className="text-white font-Rale text-[1.1rem] w-full  my- mb-4 py-  font-semibold bottom-1 border-b-2 border-[#ff5722]">
                <h2 className=" px-6">Administrator</h2>
              </div>
            )}
            <div className="flex flex-col items-center text-white font-Arial ">
              {menuItems.map(({ id, icon: Icon, ...menu }) => (
                <div
                  key={id}
                  className="flex cursor-pointer items-center border-1 rounded-md border-black w-full hover:bg-orange-500 gap-3 px-2 py-1"
                >
                  <div className="">
                    <Icon onClick={() => {
                        router.push(menu.link);
                      }} size={25}></Icon>
                  </div>
                  {!isOpen && (
                    <h2
                      onClick={() => {
                        router.push(menu.link);
                      }}
                      className="whitespace-nowrap text-[0.89rem"
                    >
                      {menu.label}
                    </h2>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex-grow flex flex-col ">
          {/* Top Bar */}
          <div className="bg-[#15283c] lg:w-full  text-white ">
            {/* mod w added */}
            <nav className="nav font-playfair  ">
              <div className="navContainer h-[52px] bg-text flex items-center  justify-between lg:max-w-full">
                <div className="flex items-center">
                  <div className=" bg-[#ff5722] p-[0.9rem] lg:p-[0.8rem] h-full cursor-pointer" onClick={collaps}>
                    <GiHamburgerMenu className="mx-2 my-2 " size={20}></GiHamburgerMenu>
                  </div>
                  <div className="lg:max-w-full lg:max-h-full">
                    <Image src={WillLogo} className="lg:h-[3.4rem] w-2/3 lg:w-full object-cover"></Image>
                  </div>
                </div>

                <div className="flex items-center justify-center  ">
                  <div className="icons mx-4 lg:mx-8">
                    <div className="flex items-center gap-4 ">
                      <BsBell size={24}></BsBell>
                      <BsQuestionSquare size={22}></BsQuestionSquare>
                      <AiOutlineMail size={23}></AiOutlineMail>
                    </div>
                  </div>

                  {!isMobile && (
                    <div className="bg-[#ff5722] max-h-full mx-0 font-arial relative">
                      <div className="flex items-center px-4 py-[0.4rem] h-full gap-1">
                        <Image
                          src={Profile}
                          alt=""
                          className="h-10 w-10 object-cover border-2 border-yellow-500 rounded-full"
                        />
                        <Popover as="div" className="relative border-none outline-none z-50">
                          {({ open }) => (
                            <>
                              <Popover.Button className="focus:outline-none">
                                <div
                                  className="details flex items-start justify-between gap-2 cursor-pointer"
                                  onClick={toggleDropdown}
                                >
                                  <h2 className="font-normal font-arial text-sm whitespace-nowrap">Uttam Aggarwal</h2>
                                  <IoIosArrowDown className="button"></IoIosArrowDown>
                                </div>
                              </Popover.Button>

                              <Popover.Panel
                                as="div"
                                className={`${
                                  open ? "block" : "hidden"
                                } absolute right-2 mt-2 w-40 bg-white text-black borde rounded-md shadow-md`}
                              >
                                <ul className="py-2 p text-text-black flex flex-col gap-2 px-4 font-Rale cursor-pointer">
                                  <li
                                    onClick={() => {
                                      router.push("/profile");
                                    }}
                                  >
                                    My Profile
                                  </li>
                                  <li>Settings</li>
                                  <li>Help</li>
                                  <li onClick={handleLogout}>
                                    <div className="flex gap-1 items-center">
                                      Log out <MdLogout size={16}></MdLogout>
                                    </div>
                                  </li>
                                </ul>
                              </Popover.Panel>
                            </>
                          )}
                        </Popover>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </nav>
          </div>
          {/* Main Content Area */}
          <div className="flex-grow bg-gray bg-white h-screen overflow-auto">{children}</div>
        </div>
      </div>
    </>
  );
};

export default Layout;
