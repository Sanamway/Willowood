import React, { useEffect, useState } from "react";
import { MdOutlineQrCodeScanner } from "react-icons/md";
import { RiContactsBookFill } from "react-icons/ri";
import { PiBankFill } from "react-icons/pi";
import { FaUserNinja } from "react-icons/fa6";
import { CiBank } from "react-icons/ci";
import { CiWallet } from "react-icons/ci";
import { SlNotebook } from "react-icons/sl";
import { HiOutlineBanknotes } from "react-icons/hi2";
import { FcBusinessman } from "react-icons/fc";
import { FaRegCircleCheck } from "react-icons/fa6";
import { GiOnTarget } from "react-icons/gi";
import { FcBullish } from "react-icons/fc";
import { VscFeedback } from "react-icons/vsc";
import { TbView360Number } from "react-icons/tb";
import { RxText } from "react-icons/rx";
import { FcCalendar } from "react-icons/fc";
import { GiExitDoor } from "react-icons/gi";
import { GiGrass } from "react-icons/gi";
import { FcSportsMode } from "react-icons/fc";
import { IoWalkSharp } from "react-icons/io5";
import { FaPeopleGroup } from "react-icons/fa6";
import { GiPlantRoots } from "react-icons/gi";
import { PiPresentationChartLight } from "react-icons/pi";
import { FcRules } from "react-icons/fc";
import { CiBoxes } from "react-icons/ci";
import { BiCartDownload } from "react-icons/bi";
import { BsImages } from "react-icons/bs";


const iconComponents = {
  MdOutlineQrCodeScanner,
  RiContactsBookFill,
  PiBankFill,
  FaUserNinja,
  CiBank,
  CiWallet,
  SlNotebook,
  HiOutlineBanknotes,
  FcBusinessman,
  FaRegCircleCheck,
  GiOnTarget,
  FcBullish,
  VscFeedback,
  TbView360Number,
  RxText,
  FcCalendar,
  GiExitDoor,
  GiGrass,
  FcSportsMode,
  IoWalkSharp,
  FaPeopleGroup,
  GiPlantRoots,
  PiPresentationChartLight,
  FcRules,
  CiBoxes,
  BiCartDownload,
  BsImages,
  
};


import axios from "axios";
import { url } from "@/constants/url";
import { useRouter } from "next/router";
import menusContent from "./menusConstant";

const BankingCards = () => {
  const [menus, setMenus] = useState([]);
  const [uid, setUid] = useState("");
  const router = useRouter();

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
      console.log("laymenus", respData);
      setMenus(respData);
    } catch (error) {
      console.log("error : ", error);
    }
  };

  useEffect(() => {
    if (window.localStorage) {
      const isLoggedInInLocalStorage = !!localStorage.getItem("uid");
      const user_name = localStorage.getItem("user_name");
      const uid = localStorage.getItem("uid");
      setUid(uid);
    }

    if (!localStorage.getItem("uid")) {
      router.push("/login");
    }
  }, []);

  useEffect(() => {
    if (uid) gettingMenuSidebar(uid);
  }, [uid]);

  console.log("Check Menus", menus);
  return (
    <>
      {/* {menusContent.map((item) => (
        <section className="w-[98%] rounded-lg border-[0.08rem] border-gray-300  my-2">
          <>
            <div className="flex items-center justify-between w-full px-2 my-3">
              <h2 className="font-arial uppercase font-semibold text-[0.85rem]">{item.label}</h2>
              <h2 className="font-semibold text-[0.85rem]"></h2>
            </div>
            <div className="flex items-center justify-between w-full px-2 mt-1">
              {item.submenu.map((sub) => (
                <div className="flex flex-col items-center">
                  <MdOutlineQrCodeScanner
                    className="bg-black text-white w-10 h-10 rounded-xl px-2 py-2"
                    size={23}
                  ></MdOutlineQrCodeScanner>
                  <h2 className="text-xs px-1 py-2">{sub.umenu_Name}</h2>
                </div>
              ))}
            </div>
          </>
        </section>
      ))} */}
      {menus.map((item) => (
        <section key={item.label} className="w-[98%] rounded-lg border-[0.08rem] border-gray-300  my-2">
          <>
            <div className="flex items-center justify-between w-full px-2 my-3">
              <h2 className="font-arial  font-semibold text-[0.9rem]">{item.label}</h2>
              <h2 className="font-semibold text-[0.85rem]"></h2>
            </div>
            <div className="flex  items-center mrhome justify-start w-full px-2 mt-1 overflow-x-auto overflow-y-hidden my-1.5">
              {item.submenu.map(
                (sub) => (
                  console.log("ICON NAME", sub.icon_link),
                  (
                    <div
                      // onClick={(e) => {
                      //   e.preventDefault();
                      //   // if (!sub.page_call?.startsWith("/")) {
                      //     router.push({
                      //       pathname: `/${sub.page_call}`,
                      //       // query: { name: `${sub.label}` }
                      //     });
                      //   // }
                      // }}
                      key={sub.umenu_Name}
                      className="flex flex-col items-center mx-2 w-auto justify-center  "
                    >
                      <button className="bg-pink-0 rounded-full px-2 py-2"
                       onClick={(e) => {
                        e.preventDefault();
                        // if (!sub.page_call?.startsWith("/")) {
                          router.push({
                            pathname: `/${sub.page_call}`,
                            // query: { name: `${sub.label}` }
                          });
                        // }
                      }}
                      >
                        {/* {sub.icon_link && <sub.icon_link className={`text-red-500`} size={25} />} */}
                        {sub.icon_link && iconComponents[sub.icon_link]
                          ? React.createElement(iconComponents[sub.icon_link], {
                              className: `text-black-500`,
                              size: 32
                            })
                          : null}
                      </button>
                      <div className="h-12 cursor-pointer">
                        <h2 className="text-[0.8rem] text-center text-black font-semibold font-arial px-1 py-2">
                          {sub.umenu_Name.substring(0)}
                        </h2>
                      </div>
                    </div>
                  )
                )
              )}
            </div>
          </>
        </section>
      ))}
    </>
  );
};

export default BankingCards;
