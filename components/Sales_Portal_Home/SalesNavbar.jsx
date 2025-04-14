import React, { useState, useEffect } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoIosArrowForward } from "react-icons/io";
import { IoSearchOutline } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { TbMessageChatbot } from "react-icons/tb";
import { FaRegUserCircle } from "react-icons/fa";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { IoMdCloseCircle } from "react-icons/io";
import WillLogo from "../../public/NewLogo.png";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { url } from "@/constants/url";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const Navbar = () => {
  const [isOpen, setOpen] = useState(false);
  const [userImg, setUserImg] = useState(null);
  const [userDet, setUserDet] = useState({
    name: "",
    phone: ""
  });
  const [uid, setUid] = useState("");

  const [empDetails, setEmpDetails] = useState(null);

  const router = useRouter();

  const toggleDrawer = () => {
    console.log("Hello");
    setOpen(!isOpen);
  };

  const headers = {
    "Content-Type": "application/json",
    secret: "fsdhfgsfuiweifiowefjewcewcebjw"
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
        localStorage.removeItem("user_name");
        localStorage.removeItem("email_id");
        localStorage.removeItem("userinfo");
        localStorage.removeItem("phone_number");
        localStorage.removeItem("mode");
        toast.success(respdata.message);
        setTimeout(() => router.push("/saleslogoutsuccess"), 1000);
      }
    } catch (error) {
      console.log("logoeee", error);
    }
  };

  useEffect(() => {
    if (window.localStorage) {
      const userImg = localStorage.getItem("ImageLink");
      const user_name = localStorage.getItem("user_name");
      const phone_number = localStorage.getItem("phone_number");
      const uid = localStorage.getItem("uid");
      setUid(uid);
      setUserImg(userImg);
      setUserDet({ name: user_name, phone: phone_number });
    }
  }, []);

  return (
    <>
      <div className="nav-container bg-[#15283C] h-[60px] flex justify-between items-center pl-[15px] w-[1600px] max-w-full m-auto">
        <Toaster position="bottom-center" reverseOrder={false} />
        <a href="/" className="logo w-[200px]">
          <Image
            alt="mr_app"
            // src="http://pwebassets.paytm.com/commonwebassets/paytmweb/header/images/logo.svg"
            src={WillLogo}
            width={1200}
            height={857}
            decoding="async"
            data-nimg={1}
            className="max-w-full max-h-full"
            loading="lazy"
            style={{ color: "transparent" }}
          />
        </a>
        <div className="right-nav flex items-center gap-[40px] h-full">
          <ul className="menu flex list-none h-full gap-[15px]">
            <li>
              <a
                href="#home"
                className="h-full inline-flex justify-center items-center no-underline text-[#222e3f] px-[5px] relative "
              >
                HOME
              </a>
            </li>
            <li>
              <a
                href="#footer"
                className="h-full inline-flex justify-center items-center no-underline text-[#222e3f] px-[5px] relative "
              >
                ABOUT
              </a>
            </li>
            <li>
              <a
                href="https://chat.whatsapp.com/rgfrvbvIJar4J5D"
                className="h-full inline-flex justify-center items-center no-underline text-[#222e3f] px-[5px] relative "
              >
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth={0}
                  viewBox="0 0 16 16"
                  className="text-green-400"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" />
                </svg>
              </a>
            </li>
            <li>
              <a
                href="mailto:support@xrf.com"
                className="h-full inline-flex justify-center items-center no-underline text-[#222e3f] px-[5px] relative "
              >
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth={0}
                  viewBox="0 0 1024 1024"
                  className="text-fill-100 text-blue-400"
                  height={20}
                  width={20}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M928 160H96c-17.7 0-32 14.3-32 32v640c0 17.7 14.3 32 32 32h832c17.7 0 32-14.3 32-32V192c0-17.7-14.3-32-32-32zm-40 110.8V792H136V270.8l-27.6-21.5 39.3-50.5 42.8 33.3h643.1l42.8-33.3 39.3 50.5-27.7 21.5zM833.6 232L512 482 190.4 232l-42.8-33.3-39.3 50.5 27.6 21.5 341.6 265.6a55.99 55.99 0 0 0 68.7 0L888 270.8l27.6-21.5-39.3-50.5-42.7 33.2z" />
                </svg>
              </a>
            </li>
          </ul>
          <a
            href="#footer"
            className="menu-btn no-underline text-white bg-[#00BAF2] px-[18px] text-center leading-[40px] mr-4 rounded-full"
          >
            Contact
          </a>
        </div>
      </div>

      {/* Mobile Menu Start Here  */}

      <nav className="mobo-nav md:hidden  ">
        <header className="mobo-nav-bar h-[60px] z-30  shadow-md bg-[#15283C] flex justify-between items-center fixed top-0 left-0 right-0 px-[15px] ">
          <div className="mob-items flex items-center gap-3 ">
            <span onClick={toggleDrawer} className="hamburger hover:text-blue-800">
              {!isOpen ? (
                // <FaRegUserCircle className="text-orange-500" size={30}></FaRegUserCircle>
                <img src={userImg} className="text-orange-500 h-8 w-8 rounded-full" size={30}></img>
              ) : (
                // <FaRegUserCircle className="text-orange-500" size={30}></FaRegUserCircle>
                <img src={userImg} className="text-orange-500 h-8 w-8 rounded-full" size={30}></img>
              )}
            </span>
            <div className="logo h-[40px] w-[120px] ">
              <Image
                alt="mr_app"
                src={WillLogo}
                width={1200}
                height={457}
                decoding="async"
                data-nimg={1}
                className="max-w-full max-h-full"
                loading="lazy"
              />
            </div>
          </div>
          <div className="flex items-center  py-0.5 gap-4 justify-center ">
            <IoSearchOutline className="text-orange-500" size={26}></IoSearchOutline>
            <TbMessageChatbot className="text-white" size={28}></TbMessageChatbot>
          </div>

          <main
            // className={`mobo-nav-drawer  -z-10  h-100vh bg-gray-100 fixed top-[3.7rem] -left-[100%] right-0 bottom-0 w-[100%]  px-[15px] transition-all ease-in-out ${
            //   isOpen ? "left-0" : ""
            // }`}
            className={`mobo-nav-drawer  z-10  h-100vh bg-gray-100 fixed top-[0rem] -left-[100%] right-0 bottom-0 w-[100%]  transition-all ease-in-out ${isOpen ? "left-0" : ""
              }`}
          >
            <div className="top-layer bg-white shadow-md flex justify-between items-center fixed font-[] px-[1px] "></div>
            <div className="mobo-menu">
              <div className=" flex  items-center justify-between w-full">
                <div className="flex  flex-col items-start justify-between w-full">
                  <div className="top-profile py-4 px-2 bg-blue-900 flex  items-center justify-between  w-full gap-3 ">
                    <div className="flex items-center gap-3 ">
                      <span onClick={toggleDrawer} className="hamburger  hover:text-blue-800">
                        {!isOpen ? (
                          <FaRegUserCircle className="text-orange-500" size={38}></FaRegUserCircle>
                        ) : (
                          // <img src={userImg} className="text-orange-500 h-8 w-8 rounded-full" size={30}></img>
                          // <FaRegUserCircle className="text-orange-500" size={38}></FaRegUserCircle>
                          <img src={userImg} className="text-orange-500 h-8 w-10 rounded-full"></img>
                        )}
                      </span>
                      <div className="username flex flex-col justify-start w-full items-start">
                        <h1 className="text-white font-arial text-[0.9rem] font-semibold">{userDet.name}</h1>
                        <h4 className="text-gray-400 text-[0.8rem] font-arial font-normal">
                          {userDet.phone}
                        </h4>
                      </div>
                    </div>
                    <IoMdCloseCircle onClick={toggleDrawer} className="text-white" size={29} />
                  </div>
                  <div className="sidelinks flex flex-col items-start justify-between w-full  ">
                    <div className="flex items-center justify-between w-full border-b-2 pb-1 mt-2 gap-2 px-4 ">
                      <Link href={"/Sales_App/Home/profile"}
                        className="flex items-center justify-between w-full">
                        <div className="flex flex-col">
                          <h2 className="font-semibold font-arial text-[0.88rem]">My Profile Setting</h2>
                          <p className="text-[0.68rem] text-gray-500 italic">
                            add / modify name Profile , add or modify Address , Contact Details , Business
                            Structure Reporting Person , Agreement Info .
                          </p>
                        </div>
                      </Link>
                    </div>

                    <Link

                      href={"/Sales_App/Home/help"}

                      className="flex items-center justify-between w-full border-b-2 pb-1 mt-2 gap-2 px-4"
                    >
                      <div className="flex flex-col">
                        <h2 className="font-semibold font-arial text-[0.88rem]">Help & Support</h2>
                        <p className="text-[0.68rem] text-gray-500 italic">
                          You can raise here require Support , Queries , Frequent Asked Questions , Our 24 x 7
                          Support teams provide immediate solution on this.
                        </p>
                      </div>
                    </Link>
                    <div className="flex items-center justify-between w-full border-b-2 pb-1 mt-2 gap-2 px-4">
                      <div className="flex flex-col">
                        <h2 className="font-semibold font-arial text-[0.88rem]">Change Language</h2>
                        <p className="text-[0.68rem] text-gray-500 italic">
                          Change the Language you use this Willowood Delight Apps in.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between w-full border-b-2 pb-1  mt-2 gap-2 px-4">
                      <div className="flex flex-col">
                        <h2 className="font-semibold font-arial text-[0.88rem]">Your Apps Guide</h2>
                        <p className="text-[0.68rem] text-gray-500 italic">
                          On line Help Guide , how to run the apps and get Uncovered unexpected features and
                          transform your Willowood Delight Experince.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between w-full border-b-2 pb-2 border-gray-400 mt-2 gap-2 px-4">
                      <div className="flex flex-col">
                        <h2 className="font-semibold font-arial text-[0.88rem]">Change password</h2>
                        <p className="text-[0.68rem] text-gray-500 italic">
                          you can change here your existing password for this application.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between w-full ">
                      <Link
                        href={""}
                        onClick={handleLogout}
                        className="flex items-center justify-between w-full border-b-2 border-gray-400  mt-2 gap-2 px-4 pb-1"
                      >
                        <div className="flex flex-col  ">
                          <h2 className="font-semibold font-arial text-[0.88rem]">Logout Apps</h2>
                          <p className="text-[0.68rem] text-gray-500 italic">
                            Logout from your Willowood Delight account on this device.
                          </p>
                        </div>
                      </Link>
                    </div>

                    <div className="flex flex-col items-center justify-center w-full ">
                      <div className="border-b-2 border-t-2 mt-5 w-full flex items-center justify-center">
                        <h2 className="text-[0.99rem] font-arial text-gray-600">App Version 1.0.0</h2>
                      </div>
                      <div className="border-b-2  w-full flex items-center justify-center">
                        <h2 className="text-[0.85rem] font-arial text-gray-500">
                          Powered by Corporate Digital IT
                        </h2>
                      </div>
                      <div className=" mt-3 w-full flex items-center justify-center">
                        <a href="/" className="logo h-[60px] w-[190px] ">
                          <Image
                            alt="mr_app"
                            src={WillLogo}
                            width={1200}
                            height={457}
                            decoding="async"
                            data-nimg={1}
                            className="max-w-full max-h-full"
                            loading="lazy"
                          />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </header>
      </nav>
    </>
  );
};

export default Navbar;
