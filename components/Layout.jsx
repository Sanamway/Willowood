import React, { useState, useEffect } from "react";
import { BsBell, BsQuestionSquare } from "react-icons/bs";
import { AiOutlineMail } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";
import Profile from "../public/userimg.jpg";
import Image from "next/image";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdLogout } from "react-icons/md";
// import WillLogo from "../public/Willowood.png";
import WillLogo from "../public/NewLogo.png";
import { Popover } from "@headlessui/react";
import { useRouter } from "next/router";
import menuItems from "@/constants/sidebarMenus";
import axios from "axios";
import { url } from "@/constants/url";
import Link from "next/link";

const Layout = ({ children }) => {
  const router = useRouter();
  const [isOpen, setOpen] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showSubmenu, setSubmenu] = useState(null);
  const [profileImg, setUserImage] = useState("")

  const [isUser, setUser] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const collaps = () => {
    setOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("uid");
    localStorage.removeItem("user_name");
    localStorage.removeItem("email_id");
    router.push("/logoutsuccess");
  };

  const handleWindowSizeChange = () => {
    setIsMobile(window.innerWidth <= 768);
    setOpen(isOpen);
  };

  useEffect(() => {
    handleWindowSizeChange();
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  const [email_id, setEmailId] = useState("");
  const [user_name, setUsername] = useState("");
  const [uid, setUid] = useState("");
  const [userinfo, setUserInfo] = useState("");
  const [menusItems, setMenus] = useState([]);
  const [phone_number, setPhoneNumber] = useState("")

  useEffect(() => {
    if (window.localStorage) {
      const isLoggedInInLocalStorage = !!localStorage.getItem("uid");
      const user_name = localStorage.getItem("user_name");
      const uid = localStorage.getItem("uid");
      const email_id = localStorage.getItem("email_id");
      const phone_number = localStorage.getItem("phone_number");
      const userinfoo = localStorage.getItem("userinfo");
      const sidemenus = localStorage.getItem("SideMenus");
      setUser(isLoggedInInLocalStorage);
      setEmailId(email_id);
      setUsername(user_name);
      setUid(uid);
      setMenus(JSON.parse(sidemenus));
      setUserInfo(JSON.parse(userinfoo));
      setPhoneNumber(phone_number)
    }

    if (!localStorage.getItem("uid")) {
      router.push("/login");
    }
  }, []);

  const headers = {
    "Content-Type": "application/json",
    secret: "fsdhfgsfuiweifiowefjewcewcebjw",
  };

  const gettingMenuSidebar = async (uid) => {
    try {
      const resp = await axios.get(
        `${url}/api/get_assign_role_profile?user_id=${uid}&data_by_parent_id=true`,
        { headers: headers }
      );
      const respData = await resp.data.data;
      // console.log("laymenus", respData);
      setMenus(respData);
    } catch (error) {
      console.log("error : ", error);
    }
  };

  useEffect(() => {
    if (uid) gettingMenuSidebar(uid);
  }, [uid]);


  //get user image 

  const getImage = async (phone_number) => {
    try {
      const res = await axios.get(`${url}/api/get_image?phone_number=${phone_number}&file_path=user`, {
        headers: headers
      });
      const respData = await res.data;
      console.log("Image", respData?.data?.image_url);
      setUserImage(respData?.data?.image_url);
    } catch (error) {
      console.log("Error", error);
    }
  };

  useEffect(()=>{
    if(phone_number) getImage(phone_number)
  },[phone_number])

  return (
    <>
      <div className="flex fixed w-full h-screen  font-arial bg-[#15283c]   ">
        {/* Sidebar */}
        <div
          className={`flex-shrink-0   ${
            isOpen
              ? isMobile
                ? " "
                : "w-[6rem]  "
              : isMobile
              ? "hidden "
              : "w-[14rem] "
          } bg-[#15283c] text-white custom-scrollbar min-h-screen overflow-x-hidden overflow-y-scroll transition-all ease-in-out duration-500`}
        >
          <div
            className={`flex flex-col ${
              isOpen ? "items-center" : "items-start"
            } w-full  `}
          >
            <div className="flex items-center justify-between relative">
              <div className="flex items-center pl-1 gap-4">
                <div className="userImg flex items-center py-4 mx justify-center">
                  {isOpen ? (
                    <img
                      className="rounded-full h-8 w-8"
                      src={profileImg}
                      alt=""
                    />
                  ) : (
                    <div className="flex  items-center justify-center gap-4 ">
                      <img
                        onClick={(e) => {
                          router.push("/");
                        }}
                        className=" h-[4.1rem] w-[4.1rem] rounded-full cursor-pointer"
                        src={profileImg}
                        alt=""
                      />
                      <div className="flex flex-col items-start font-sans">
                        <h2 className="font-sm text-white whitespace-nowrap">
                          {user_name}
                        </h2>
                        <div className="flex items-center gap-2">
                          <h2
                            className={`bg-[#00FF00] h-2 w-2 rounded-full ${
                              uid == 1
                                ? "animate-ping"
                                : "bg-gray-200 h-2 w-2 rounded-full"
                            }`}
                          ></h2>
                          <h2 className="text-sm text-text-green font-arial">
                            {"Online"}
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
                <h2 className=" px-6">{userinfo?.U_profile_name}</h2>
              </div>
            )}
            <div className="flex flex-col items-center w-full text-white font-Arial ">
              {menusItems?.map(({ _id, icon: Icon, ...menu }) => (
                <>
                  <div
                    key={_id}
                    className={`flex ${
                      isOpen
                        ? "flex-col text-[0.7rem] items-center"
                        : "flex-row gap-2 text-[0.8rem] "
                    }  cursor-pointer text-left border-1 rounded-md border-black w-full hover:bg-orange-500  px-2 py-1 `}
                  >
                    <div className="">
                      <AiOutlineMail
                        onClick={(e) => {
                          e.preventDefault();
                          // router.push(`/${item.page_call}`);
                          router.push({
                            pathname: `/${menu.page_call}`,
                            query: { name: `${menu.label}` },
                          });
                        }}
                        size={20}
                      ></AiOutlineMail>
                    </div>
                    <h2
                      onClick={() => {
                        setSubmenu((prev) =>
                          prev == menu.label ? null : menu.label
                        );
                      }}
                      className={`select-none whitespace-nowrap `}
                    >
                      {menu.label}
                    </h2>
                  </div>

                  {showSubmenu == menu.label && (
                    <div className="flex items-start justify-center  ">
                      <>
                        <ul className="gap-2 flex flex-col w-full items-start ">
                          {menu.submenu?.map((item, index) => (
                            <>
                              <li key={index}
                                onClick={(e) => {
                                  e.preventDefault();
                                  // router.push(`/${item.page_call}`);
                                  router.push({
                                    pathname: `/${item.page_call}`,
                                    query: { name: `${item.umenu_Name}` },
                                  });
                                }}
                                className={`text-[0.7rem] flex items-center gap-1.5 py-1 cursor-pointer hover:bg-orange-500 px-2 rounded-md `}
                              >
                                <div className="">
                                  <AiOutlineMail size={15}></AiOutlineMail>
                                </div>
                                {item.umenu_Name}
                              </li>
                            </>
                          ))}
                        </ul>
                      </>
                    </div>
                  )}
                </>
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
                  <div
                    className=" bg-[#ff5722] p-[0.9rem] lg:p-[0.8rem] h-full cursor-pointer"
                    onClick={collaps}
                  >
                    <GiHamburgerMenu
                      className="mx-2 my-2 "
                      size={20}
                    ></GiHamburgerMenu>
                  </div>
                  <div className="lg:max-w-full lg:max-h-full">
                    <Image
                      src={WillLogo}
                      className="lg:h-[3.4rem] w-2/3 lg:w-full object-cover"
                    ></Image>
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
                        <img
                          src={profileImg}
                          alt=""
                          className="h-10 w-10  border-2 border-yellow-500 rounded-full"
                        />
                        <Popover
                          as="div"
                          className="relative border-none outline-none z-50"
                        >
                          {({ open }) => (
                            <>
                              <Popover.Button className="focus:outline-none">
                                <div
                                  className="details flex items-start justify-between gap-2 cursor-pointer"
                                  onClick={toggleDropdown}
                                >
                                  <h2 className="font-normal font-arial text-sm whitespace-nowrap">
                                    {user_name}
                                  </h2>
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
          <div className="flex-grow bg-gray bg-white h-screen overflow-auto ">
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
