import React from "react";
import { FaReact } from "react-icons/fa6";
import { FaGift } from "react-icons/fa6";
import { HiOutlineBanknotes } from "react-icons/hi2";
import { MdDiscount } from "react-icons/md";
const Swipecards = () => {
  return (
    <>
      <section className="w-full my-1.5 py-2 px-2 ">
        <div className="wrapperpt gap-2 rounded-md tabscrollbar-hide flex overflow-x-auto scroll snap-x ">
          <div className="cardpt pt-1 flex-auto bg-white rounded-md h-16 min-w-[50%] p-2">
            <div className="flex items-center justify-around w-full my-3 px-1 ">
              <div className="bg-blue-50 rounded-full px-2 py-2">
                <FaGift className="text-red-500 " size={24}></FaGift>
              </div>
              <h2 className="text-red text-sm">Refer & Win</h2>
            </div>
          </div>
          <div className="cardpt pt-1 flex-auto bg-white rounded-md h-16 min-w-[50%] p-2">
            <div className="flex items-center justify-around w-full my-3 px-1  ">
              <div className="bg-blue-10 rounded-full px-2 py-2">
                <HiOutlineBanknotes className="text-red-500 " size={24}></HiOutlineBanknotes>
              </div>
              <h2 className="text-red text-sm">Rent with CC</h2>
            </div>
          </div>
          <div className="cardpt pt-1 flex-auto bg-white rounded-md h-16 min-w-[50%] p-2">
            <div className="flex items-center justify-around w-full my-3  px-1  ">
              <div className="bg-blue-50 rounded-full px-2 py-2 ">
                <MdDiscount className="text-pink-500 " size={24}></MdDiscount>
              </div>
              <h2 className="text-red text-sm">Nearby Deals</h2>
            </div>
          </div>
          <div className="cardpt pt-1 flex items-center flex-auto bg-white rounded-md h-16 min-w-[70%] ">
            <div className="flex items-center justify-around w-full ">
            <div className="bg-blue-50 rounded-full px-2 py-2 ">
                <FaReact className="text-blue-500 " size={24}></FaReact>
              </div>
              <div className="flex flex-col items-start justify-between">
                <h2 className="font-normal text-sm">Prepaid - 7277766100</h2>
                <h2 className="text-red-500 text-sm">Jio Prepaid Recharge</h2>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Swipecards;
