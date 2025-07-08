import React from "react";
import { MdOutlineQrCodeScanner } from "react-icons/md";
import { RiContactsBookFill } from "react-icons/ri";
import { PiBankFill } from "react-icons/pi";
import { FaUserNinja } from "react-icons/fa6";
import { CiBank } from "react-icons/ci";
import { CiWallet } from "react-icons/ci";
import { SlNotebook } from "react-icons/sl";
import { menusContent } from "./menusConstant";

const BankingCards = () => {

  return (
    <>
      <section className="w-[98%] rounded-lg border-[0.08rem] border-gray-300  my-2">
        <div className="flex items-center justify-between w-full px-2 my-3">
          <h2 className="font-arial uppercase font-semibold text-[0.85rem]">Banking & Payment</h2>
          <h2 className="font-semibold text-[0.85rem]">PAYTM</h2>
        </div>

        <div className="flex items-center justify-between w-full px-2 mt-1">
          <div className="flex flex-col items-center">
            <MdOutlineQrCodeScanner
              className="bg-black text-white w-10 h-10 rounded-xl px-2 py-2"
              size={23}
            ></MdOutlineQrCodeScanner>
            <h2 className="text-xs px-1 py-2">Scan & Pay</h2>
          </div>

          <div className="flex flex-col items-center">
            <RiContactsBookFill
              className="bg-black text-white w-10 h-10 rounded-xl px-2 py-2"
              size={23}
            ></RiContactsBookFill>
            <h2 className="text-xs px-1 py-2">To Mobile</h2>
          </div>

          <div className="flex flex-col items-center">
            <PiBankFill
              className="bg-black text-white w-10 h-10 rounded-xl px-2 py-2"
              size={23}
            ></PiBankFill>
            <h2 className="text-xs px-1 py-2">To Bank/UPI</h2>
          </div>

          <div className="flex flex-col items-center">
            <FaUserNinja
              className="bg-black text-white w-10 h-10 rounded-xl px-2 py-2"
              size={23}
            ></FaUserNinja>
            <h2 className="text-xs px-1 py-2">To Self A/c</h2>
          </div>
        </div>


        {/* <div className="flex items-center justify-between w-full px-2 mt-1">
          <div className="flex flex-col items-center">
              <SlNotebook
                className="bg-whi text-black w-10 h-10 px-2 py-2"
                size={23}
              ></SlNotebook>
            <h2 className="text-xs px-1 py-2">Scan & Pay</h2>
          </div>

          <div className="flex flex-col items-center ">
              <CiBank
                className="bg-whi text-black px-2 py-2"
                size={44}
              ></CiBank>
            <h2 className="text-xs px-1 py-2">To Mobile</h2>
          </div>

          <div className="flex flex-col items-center">
              <CiWallet
                className="bg-whi text-black  px-2 py-2"
                size={44}
              ></CiWallet>
            <h2 className="text-xs px-1 py-2">To Bank/UPI</h2>
          </div>

          <div className="flex flex-col items-center">
              <FaUserNinja
                className="bg-whi text-black w-10 h-10 px-2 py-2"
                size={23}
              ></FaUserNinja>
            <h2 className="text-xs px-1 py-2">To Self A/c</h2>
          </div>
        </div> */}
      </section>
    </>
  );
};

export default BankingCards;
