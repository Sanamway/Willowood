import React from "react";
import { MdOutlineQrCodeScanner } from "react-icons/md";
import { RiContactsBookFill } from "react-icons/ri";
import { PiBankFill } from "react-icons/pi";
import { FaUserNinja } from "react-icons/fa6";
import { CiBank } from "react-icons/ci";
import { CiWallet } from "react-icons/ci";
import { SlNotebook } from "react-icons/sl";
import  menusContent  from "./menusConstant";
import { HiOutlineBanknotes } from "react-icons/hi2";
import { FcBusinessman } from "react-icons/fc";
import { FaRegCircleCheck } from "react-icons/fa6";


const BankingCards = () => {
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
      {menusContent.map((item) => (
        <section key={item.label} className="w-[98%] rounded-lg border-[0.08rem] border-gray-300  my-2">
          <>
            <div className="flex items-center justify-between w-full px-2 my-3">
              <h2 className="font-arial  font-semibold text-[0.85rem]">{item.label}</h2>
              <h2 className="font-semibold text-[0.85rem]"></h2>
            </div>
            <div className="flex items-center mrhome justify-start w-full px-2 mt-1 overflow-x-auto overflow-y-hidden my-1.5">
              {item.submenu.map((sub) => (
                <div key={sub.umenu_Name} className="flex flex-col items-center mx-2 w-auto justify-center  ">
                  <div className="bg-blue-50 rounded-full px-2 py-2">
                    {sub.icon && <sub.icon className={`text-${sub.icon_color}-500`} size={25} />}
                  </div>
                  <div className="h-12">
                    <h2 className="text-[0.6rem] text-center  px-1 py-2">{sub.umenu_Name.substring(0)}</h2>
                  </div>
                </div>
              ))}
            </div>
          </>
        </section>
      ))}
    </>
  );
};

export default BankingCards;
