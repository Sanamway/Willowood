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
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdKeyboardArrowDown } from "react-icons/md";
import WhatsAppChat from "../public/whatsappchat.webp";
import { FcVoicePresentation } from "react-icons/fc";
import toast, { Toaster } from "react-hot-toast";

const Layout = ({ children }) => {
  const router = useRouter();
  const [isOpen, setOpen] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showSubmenu, setSubmenu] = useState(null);
  const [profileImg, setUserImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [isUser, setUser] = useState(false);
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const collaps = () => {
    setOpen(!isOpen);
  };

  const handleWindowSizeChange = () => {
    setIsMobile(window.innerWidth <= 768);
    setOpen(isOpen);
  };

  useEffect(() => {
    const checkLocalStorage = () => {
      if (window.localStorage) {
        const isLoggedInInLocalStorage = !!localStorage.getItem("uid");
        const user_name = localStorage.getItem("user_name");
        const uid = localStorage.getItem("uid");
        const email_id = localStorage.getItem("email_id");
        const phone_number = localStorage.getItem("phone_number");
        const userinfoo = localStorage.getItem("userinfo");
        const sidemenus = localStorage.getItem("SideMenus");
        const logoutTime = localStorage.getItem("logout_time");
        const loginTime = localStorage.getItem("login_in_time");
        const mode = localStorage.getItem("mode");

        setLogOutTime(logoutTime);
        setLogInTime(loginTime);
        setMode(mode);
        setUser(isLoggedInInLocalStorage);
        setEmailId(email_id);
        setUsername(user_name);
        setUid(uid);
        setMenus(JSON.parse(sidemenus));
        setUserInfo(JSON.parse(userinfoo));
        setPhoneNumber(phone_number);

        if (!isLoggedInInLocalStorage) {
          router.push("/login");
          return;
        }

        if (mode === "mobile") {
          // router.push("/mrhome");
          router.push("/MR_Portal_Apps/MRHome");
          return;
        }
      }
      setLoading(false);
    };
    checkLocalStorage();
  }, [router]);

  // useEffect(() => {
  //   handleWindowSizeChange();
  //   window.addEventListener("resize", handleWindowSizeChange);
  //   return () => {
  //     window.removeEventListener("resize", handleWindowSizeChange);
  //   };
  // }, []);

  const [email_id, setEmailId] = useState("");
  const [user_name, setUsername] = useState("");
  const [uid, setUid] = useState("");
  const [userinfo, setUserInfo] = useState("");
  const [menusItems, setMenus] = useState([]);
  const [phone_number, setPhoneNumber] = useState("");
  const [mode, setMode] = useState("");
  const [loctimeOut, setLogOutTime] = useState("");
  const [loctimeIn, setLogInTime] = useState("");

  // useEffect(() => {
  //   if (window.localStorage) {
  //     const isLoggedInInLocalStorage = !!localStorage.getItem("uid");
  //     const user_name = localStorage.getItem("user_name");
  //     const uid = localStorage.getItem("uid");
  //     const email_id = localStorage.getItem("email_id");
  //     const phone_number = localStorage.getItem("phone_number");
  //     const userinfoo = localStorage.getItem("userinfo");
  //     const sidemenus = localStorage.getItem("SideMenus");
  //     const logoutTime = localStorage.getItem("logout_time");
  //     const loginTime = localStorage.getItem("login_in_time");
  //     const mode = localStorage.getItem("mode");
  //     setLogOutTime(logoutTime);
  //     setLogInTime(loginTime);
  //     setMode(mode);
  //     setUser(isLoggedInInLocalStorage);
  //     setEmailId(email_id);
  //     setUsername(user_name);
  //     setUid(uid);
  //     setMenus(JSON.parse(sidemenus));
  //     setUserInfo(JSON.parse(userinfoo));
  //     setPhoneNumber(phone_number);
  //   }

  //   if (!localStorage.getItem("uid")) {
  //     router.push("/login");
  //     return;
  //   }

  //   if (localStorage.getItem("mode") == "mobile") {
  //     router.push("/mrhome");
  //   }
  // }, []);

  const headers = {
    "Content-Type": "application/json",
    secret: "fsdhfgsfuiweifiowefjewcewcebjw"
  };

  const gettingMenuSidebar = async (uid) => {
    try {
      const resp = await axios.get(
        `${url}/api/get_assign_role_profile?user_id=${uid}&data_by_parent_id=true`,
        { headers: headers }
      );
      const respData = await resp.data.data;
      setMenus(respData);
    } catch (error) {}
  };

  const payload = {
    user_id: uid
  };

  const handleLogout = async () => {
    try {
      const resp = await axios.get(`${url}/api/logout?user_id=${uid}`, {
        headers: headers
      });
      const respdata = await resp.data;
      if (!respdata) {
        return;
      }
      if (respdata.status) {
        localStorage.removeItem("uid");
        sessionStorage.removeItem("uid");
        localStorage.removeItem("user_name");
        localStorage.removeItem("email_id");
        localStorage.removeItem("userinfo");
        localStorage.removeItem("phone_number");
        localStorage.removeItem("mode");
        localStorage.removeItem("c_id");
        localStorage.removeItem("emp_code");
        localStorage.removeItem("expireTime");
        sessionStorage.removeItem("expireTime");
        toast.success(respdata.message);
        setTimeout(() => router.push("/logoutsuccess"), 1000);
      }
    } catch (error) {}
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
      setUserImage(respData?.data?.image_url);
      localStorage.setItem("ImageLink", respData?.data?.image_url);
    } catch (error) {}
  };

  useEffect(() => {
    if (phone_number) getImage(phone_number);
  }, [phone_number]);

  //send whatsApp message Api

  const whatsAppMsg = async () => {
    try {
      const payLoad = {
        recipient: phone_number,
        tem_id: "142125",
        placeholders: [user_name, userinfo?.U_profile_name, phone_number]
      };
      const res = await axios.post(`${url}/api/whatsAppChat`, JSON.stringify(payLoad), {
        headers: headers
      });
      const respData = await res.data;
      setUserImage(respData?.data?.image_url);
    } catch (error) {}
  };

  const messageContent = `
*Willowood Support*

Hello! It's really great to see you here. Tell us just a few details about you and we are ready to start.

*Name:* ${user_name}

*Role:* ${userinfo?.U_profile_name}

*Mobile:* ${phone_number}

if you're available, I'd be grateful for your assistance !

Application End User
*Digital Application Support*
`;

  const sendWhatsApp = () => {
    const encodedMessage = encodeURIComponent(messageContent);
    window.open(`https://wa.me/+917428086211?text=${encodedMessage}`, "_blank");
    whatsAppMsg();
  };

  //********************Logging out after few minutes***********************//

  const [isLogged, setLogged] = useState(false);
  const [expireTime, setExpireTime] = useState(null);

  useEffect(() => {
    if (window.localStorage) {
      const getExpireTime = localStorage.getItem("expireTime");
      // const getExpireTime = sessionStorage.getItem("expireTime");
      setExpireTime(getExpireTime);
      setLogged(true);
      // console.log("locExpire", getExpireTime);
    }
  }, []);

  const checkForInactive = () => {
    if (expireTime && expireTime < Date.now()) {
      setLogged(false);
      handleLogout();
    }
  };

  const updateExpireTime = () => {
    const newExpireTime = Date.now() + 1200000;
    setExpireTime(newExpireTime);
  };

  // SideEffect to check the User Inactivity

  useEffect(() => {
    const intervalId = setInterval(checkForInactive, 3000);
    return () => clearInterval(intervalId);
  }, [expireTime]);

  // Update Expire Time on User Activity

  useEffect(() => {
    updateExpireTime();
    const events = ["click", "keypress", "scroll", "onkeypress", "mousemove", "mousedown"];
    const eventListener = () => updateExpireTime();
    events.forEach((event) => window.addEventListener(event, eventListener));
    return () => {
      events.forEach((event) => window.removeEventListener(event, eventListener));
    };
  }, []);

  // Function to handle user login
  const handleLogin = () => {
    const apiExpireTime = Date.now() + 60000;
    // localStorage.setItem("expireTime", apiExpireTime)
    setExpireTime(apiExpireTime);
    setLogged(true);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <svg
          aria-hidden="true"
          className="w-12 h-12 text-gray-200 animate-spin dark:text-gray-600 fill-red-600"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
      </div>
    );
  }

  return (
    <>
      <div className="flex fixed w-full h-screen  font-arial bg-[#15283c]   ">
        {/* Sidebar */}
        <div
          className={`flex-shrink-0   ${
            isOpen ? (isMobile ? " " : "w-[6rem]  ") : isMobile ? "hidden " : "w-[14rem] "
          } bg-[#15283c] text-white custom-scrollbar min-h-screen overflow-x-hidden overflow-y-scroll transition-all ease-in-out duration-500`}
        >
          <div className={`flex flex-col ${isOpen ? "items-center" : "items-start"} w-full  `}>
            <div className="flex items-center justify-between relative">
              <div className="flex items-center pl-1 gap-4">
                <div className="userImg flex items-center py-4 mx justify-center">
                  {isOpen ? (
                    <img className="rounded-full h-8 w-8" src={profileImg} alt="" />
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
                        <h2 className="font-sm text-white whitespace-nowrap">{user_name}</h2>
                        <div className="flex items-center gap-2">
                          <h2
                            className={`bg-[#00FF00] h-2 w-2 rounded-full ${
                              uid == 1 ? "animate-ping" : "bg-gray-200 h-2 w-2 rounded-full"
                            }`}
                          ></h2>
                          <h2 className="text-sm text-text-green font-arial">{"Online"}</h2>
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
                      isOpen ? "flex-col text-[0.7rem] items-center" : "flex-row gap-2 text-[0.8rem] "
                    }  cursor-pointer text-left border-1 rounded-md border-black w-full hover:bg-orange-500  px-2 py-1 `}
                  >
                    <div
                      className=""
                      // onClick={(e) => {
                      //       e.preventDefault();
                      //       // router.push(`/${item.page_call}`);
                      //       router.push({
                      //         pathname: `/${menu.page_call}`,
                      //         query: { name: `${menu.label}` },
                      //       });
                      //     }}
                    >
                      <FcVoicePresentation size={20}></FcVoicePresentation>
                    </div>
                    <div
                      // onClick={() => {
                      //   setSubmenu((prev) =>
                      //     prev == menu.label ? null : menu.label
                      //   );
                      // }}

                      onClick={(e) => {
                        e.preventDefault();
                        // router.push(`/${item.page_call}`);
                        if (!menu.page_call.startsWith("/")) {
                          router.push({
                            pathname: `/${menu.page_call}`,
                            query: { name: `${menu.label}` }
                          });
                        }
                      }}
                      className={`select-none whitespace-nowrap  flex items-center justify-between w-full`}
                    >
                      {menu.label}
                    </div>
                    <div>
                      <h2
                        onClick={() => {
                          setSubmenu((prev) => (prev == menu.label ? null : menu.label));
                        }}
                      >
                        {showSubmenu == menu.label ? (
                          <MdKeyboardArrowDown size={20} />
                        ) : (
                          <MdKeyboardArrowRight size={20} />
                        )}
                      </h2>
                    </div>
                  </div>

                  {showSubmenu == menu.label && (
                    <div className="flex items-start justify-center  ">
                      <>
                        <ul className="gap-2 flex flex-col w-full items-start ">
                          {menu.submenu?.map((item, index) => (
                            <>
                              <li
                                key={index}
                                onClick={(e) => {
                                  e.preventDefault();
                                  // router.push(`/${item.page_call}`);
                                  router.push({
                                    pathname: `/${item.page_call}`,
                                    query: { name: `${item.umenu_Name}` }
                                  });
                                }}
                                className={`text-[0.7rem] flex items-center gap-1.5 py-1 cursor-pointer hover:bg-orange-500 px-2 rounded-md `}
                              >
                                <div className="">
                                  <FcVoicePresentation size={15}></FcVoicePresentation>
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
                    <GiHamburgerMenu className="mx-2 my-2 " size={20}></GiHamburgerMenu>
                  </div>
                  <div className="lg:max-w-full lg:max-h-full">
                    <Image
                      src={WillLogo}
                      alt="logo"
                      className="lg:h-[3.4rem] w-2/3 lg:w-full object-cover"
                    ></Image>
                  </div>
                </div>
                <div className="flex items-center justify-center  ">
                  {!isMobile && (
                    <div className="icons mx-4 lg:mx-8">
                      <div className="flex items-center gap-4 ">
                        <BsBell size={24}></BsBell>
                        <BsQuestionSquare size={22}></BsQuestionSquare>
                        <AiOutlineMail size={23}></AiOutlineMail>
                      </div>
                    </div>
                  )}

                  {/* just below removed the !isMobile to show  on mobile as well */}
                  {
                    <div className="bg-[#ff5722] max-h-full mx-0 font-arial relative">
                      <div className="flex items-center px-4 py-[0.4rem] h-full gap-1">
                        <img
                          src={profileImg}
                          alt=""
                          className="h-10 w-10  border-2 border-yellow-500 rounded-full"
                        />
                        <Popover as="div" className="relative border-none outline-none z-10">
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
                  }
                </div>
              </div>
            </nav>
          </div>
          {/* Main Content Area */}
          <div className="flex-grow bg-gray relative bg-white h-screen overflow-auto ">
            {children}
            {/* <div className="fixed bottom-12 right-9  rounded-full animate-pulse z-9999 ">
              <div className=" cursor-pointer w-12 h-12 rounded-full  px-2 py-2 bg-green-600">
                <Image src={WhatsAppChat} alt="whatsapp" />
              </div>
            </div> */}
            {/* WhatsApp Blink Button  */}

            {router.pathname == "/dealerform_details" ? null : (
              <div className="fixed bottom-12 right-9  rounded-full animate-pulse z-9999 group">
                <div
                  onClick={sendWhatsApp}
                  className="cursor-pointer w-12 h-12 rounded-full px-2 py-2 bg-green-600 "
                >
                  <div
                    id="tooltip-default"
                    role="tooltip"
                    className="absolute whitespace-nowrap z-800 bottom-14 -left-32 inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700 group-hover:opacity-100"
                  >
                    Willowood Helpdesk Support
                    <div className="tooltip-arrow" data-popper-arrow></div>
                  </div>
                  <Image data-tooltip-target="tooltip-default" src={WhatsAppChat} alt="whatsapp" />
                </div>
                <contentMessage />
              </div>
            )}
          </div>
        </div>
        <Toaster position="bottom-center" reverseOrder={false} />
      </div>
    </>
  );
};

export default Layout;
