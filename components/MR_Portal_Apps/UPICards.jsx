import React from "react";
import { FaReact } from "react-icons/fa6";
import { IoQrCodeOutline } from "react-icons/io5";
import { HiOutlineQrCode } from "react-icons/hi2";

const UPICards = () => {
  return (
    <>
      <section className="w-full mt-1.5">
        <div className="wrapperpt gap-2 mx-3 rounded-md tabscrollbar-hide flex overflow-x-auto scroll snap-x ">
          <div className="cardpt pt-1 flex items-center flex-auto bg-gray-50 rounded-lg h-8 min-w-[99%] ">
            <div className="flex items-center justify-between px-2 w-full">
              <h2 className="text-[0.82rem] font-semibo">UPI LITE : R5000</h2>
              <div className="flex items-center justify-around gap-2">
                <HiOutlineQrCode className="text-black" size={23}></HiOutlineQrCode>
                <h2 className="text-[0.79rem]">satishkp...@paytm</h2>
              </div>
            </div>
          </div>
          <div className="cardpt pt-1 flex-auto bg-white rounded-md h-8 min-w-[50%] p-4">Card2</div>
          <div className="cardpt pt-1 flex-auto bg-white rounded-md h-8 min-w-full p-4">Card2</div>
          <div className="cardpt pt-1 flex-auto bg-white rounded-md h-8 min-w-full p-4">Card2</div>
        </div>
      </section>
    </>
  );
};

export default UPICards;
