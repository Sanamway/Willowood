import React, { useState } from "react";
import { RiMenu4Line, RiHeart2Line } from "react-icons/ri";
import { BsBell, BsQuestionSquare } from "react-icons/bs";
import { AiOutlineClose, AiOutlineMail } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { CiMail } from "react-icons/ci";
import Profile from "../public/userimg.jpg";
import Image from "next/image";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdLogout } from "react-icons/md";
import WillLogo from "../public/Willowood.png";
import { AiOutlineHome, AiOutlinePropertySafety } from "react-icons/ai";
import { BiUser, BiSolidBusiness } from "react-icons/bi";
import Footer from "./Footer";

const Layout = ({ children }) => {
  const [isOpen, setOpen] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const collaps = () => {
    setOpen(!isOpen);
  };

  const menuItems = [
    { id: 1, label: "Menu Management", icon: AiOutlineHome, link: "/" },
    { id: 2, label: "User Management", icon: BiUser, link: "/posts" },
    { id: 2.1, label: "User Profile", icon: BiUser, link: "/posts" },
    { id: 2.2, label: "Role Profile", icon: BiUser, link: "/posts" },
    { id: 2.3, label: "Manage User", icon: BiUser, link: "/posts" },
    { id: 2.4, label: "User Permission", icon: BiUser, link: "/posts" },





    {
      id: 3,
      label: "Business Structure",
      icon: BiSolidBusiness,
      link: "/users",
    },

    {
      id: 3.1,
      label: "Company Information",
      icon: BiSolidBusiness,
      link: "/users",
    },

    {
      id: 3.2,
      label: "Business Division",
      icon: BiSolidBusiness,
      link: "/users",
    },

    {
      id: 3.3,
      label: "Business Zone",
      icon: BiSolidBusiness,
      link: "/users",
    },

    {
      id: 3.4,
      label: "Territory",
      icon: BiSolidBusiness,
      link: "/users",
    },
    {
      id: 3,
      label: "District",
      icon: BiSolidBusiness,
      link: "/users",
    },

    {
      id: 4,
      label: "Product Management",
      icon: AiOutlinePropertySafety,
      link: "/tutorials",
    },
    {
      id: 5,
      label: "MR Data Management",
      icon: AiOutlinePropertySafety,
      link: "/tutorials",
    },
    {
      id: 6,
      label: "Control Management",
      icon: AiOutlinePropertySafety,
      link: "/tutorials",
    },
    {
      id: 7,
      label: "Dummy Management",
      icon: AiOutlinePropertySafety,
      link: "/tutorials",
    },
  ];

  return (
    <>
      <div className="flex h-screen fixed w-full font-arial  ">
        {/* Sidebar */}
        <div
          className={`flex justify-center custom-scrollbar overflow-y-scroll h-screen transition-all ${
            isOpen ? "w-24" : "w-56"
          } bg-[#15283c]  text-white`}
        >
          <div className="flex flex-col items-center w-full ">
            <div className="flex items-center justify-between  relative">
              <div className="flex items-center pl-1 gap-4">
                <div className="userImg flex items-center py-4 mx justify-center">
                  {isOpen ? (
                    <Image
                      className="rounded-full h-8 w-8"
                      src={Profile}
                      alt=""
                    />
                  ) : (
                    <div className="flex  items-center justify-center gap-4 ">
                      <Image
                        className=" h-[4.1rem] w-[4.1rem] rounded-full"
                        src={Profile}
                        alt=""
                      />
                      <div className="flex flex-col items-start font-sans">
                        <h2 className="font-sm text-white">Uttam Aggarwal</h2>
                        <div className="flex items-center gap-2">
                          <h2 className="bg-[#00FF00] h-2 w-2 rounded-full animate-ping"></h2>
                          <h2 className="text-sm text-text-green font-normal">
                            Online
                          </h2>
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
              {menuItems.map(({ id, icon: Icon, ...menu  }) => (
                <div key={id} className="flex cursor-pointer items-center border-1 rounded-md border-black w-full hover:bg-orange-500 gap-3 px-2 py-1">
                  <div className="">
                    <Icon></Icon>
                  </div>
                  {!isOpen && <h2 className="">{menu.label}</h2>}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex-grow flex flex-col">
          {/* Top Bar */}
          <div className="bg-[#15283c]   text-white">
            <nav className="nav font-playfair ">
              <div className="navContainer h-[52px] bg-text flex items-center justify-between max-w-full">
                <div className="flex items-center">
                  <div
                    className="max-w-full bg-[#ff5722] p-[0.9rem] h-full cursor-pointer"
                    onClick={collaps}
                  >
                    <GiHamburgerMenu
                      className="mx-2 my-2 max-w-full max-h-full"
                      size={24}
                    ></GiHamburgerMenu>
                  </div>
                  <div className="max-w-full max-h-full">
                    <Image
                      src={WillLogo}
                      className="h-[3.4rem] w-full object-cover"
                    ></Image>
                  </div>
                </div>

                <div className="flex items-center justify-center  ">
                  <div className="icons mx-8">
                    <div className="flex items-center gap-4 ">
                      <BsBell size={24}></BsBell>
                      <BsQuestionSquare size={22}></BsQuestionSquare>
                      <AiOutlineMail size={23}></AiOutlineMail>
                    </div>
                  </div>
                  <div className="bg-[#ff5722] h-full mx-0 font-arial relative">
                    <div className="flex items-center px-4 py-[0.4rem] h-full gap-1">
                      <Image
                        src={Profile}
                        alt=""
                        className="h-10 w-10 object-cover border-2 border-yellow-500 rounded-full"
                      />
                      <div
                        className="details flex  items-start justify-between gap-2 cursor-pointer "
                        onClick={toggleDropdown}
                      >
                        <h2 className="font-normal font-arial text-sm">
                          Uttam Aggarwal
                        </h2>
                        <IoIosArrowDown className="button"></IoIosArrowDown>
                      </div>
                    </div>

                    {isDropdownOpen && (
                      <div className="absolute right-2 mt-2 w-40 bg-white text-black border rounded-md shadow-md">
                        <ul className="py-2 p text-text-black flex flex-col gap-2 px-4 font-Rale cursor-pointer">
                          <li> My Profile</li>
                          <li>Settings</li>
                          <li>Help</li>
                          <li>
                            <div className="flex gap-1 items-center">
                              Log out
                              <MdLogout size={16}></MdLogout>
                            </div>
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </nav>
          </div>

          {/* Main Content Area */}
          <div className="flex-grow bg-gray-200">
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
