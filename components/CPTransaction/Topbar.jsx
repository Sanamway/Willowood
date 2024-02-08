import React, { useState, useEffect, useReducer } from "react";
import { BsBell, BsQuestionSquare } from "react-icons/bs";
import { AiOutlineMail } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";
import Profile from "../../public/userimg.jpg";
import Image from "next/image";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdLogout } from "react-icons/md";
import WillLogo from "../../public/Willowood.png";
import { Popover } from "@headlessui/react";
import Router, { useRouter } from "next/router";
import axios from "axios";
import { url } from "@/constants/url";

const Topbar = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setOpen] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isUser, setUser] = useState(false);
  const [phone_number, setPhoneNumber] = useState("")
  const [profileImg, setUserImage] = useState("");


  const router = useRouter();

  const headers = {
    "Content-Type": "application/json",
    secret: "fsdhfgsfuiweifiowefjewcewcebjw"
  };

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

  useEffect(() => {
    if (window.localStorage) {
      const isLoggedInInLocalStorage = !!localStorage.getItem("uid");
      const user_name = localStorage.getItem("user_name");
      const uid = localStorage.getItem("uid");
      const email_id = localStorage.getItem("email_id");
      const userinfoo = localStorage.getItem("userinfo");
      const phone_number = localStorage.getItem("phone_number");
      setPhoneNumber(phone_number)

      setUser(isLoggedInInLocalStorage);
      setEmailId(email_id);
      setUsername(user_name);
      setUid(uid);
      setUserInfo(JSON.parse(userinfoo));
    }

    if (!localStorage.getItem("uid")) {
      router.push("/login");
    }
  }, []);


  //getting image 

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

  useEffect(() => {
    if (phone_number) getImage(phone_number);
  }, [phone_number]);

  return (
    <div className="bg-[#15283c] lg:w-full  text-white ">
      {/* mod w added */}
      <nav className="nav font-playfair  ">
        <div className="navContainer h-[52px] bg-text flex items-center  justify-between lg:max-w-full">
          <div className="flex items-center">
            <div className="cursor-pointer" onClick={()=>{router.push('/')}}>
              <Image
                src={WillLogo}
                alt="Will Logo"
                width={100}
                height={40}
                className="lg:h-[3.4rem] w-full object-cover"
              />
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
                    className="h-10 w-10 border-2 border-yellow-500 rounded-full"
                  />
                  <Popover as="div" className="relative border-none outline-none z-50">
                    {({ open }) => (
                      <>
                        <Popover.Button className="focus:outline-none">
                          <div
                            className="details flex items-start justify-between gap-2 cursor-pointer"
                            onClick={toggleDropdown}
                          >
                            <h2 className="font-normal font-arial text-sm whitespace-nowrap">{user_name}</h2>
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
  );
};

export default Topbar;
