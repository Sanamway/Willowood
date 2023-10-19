import React from "react";
import { FaMobile } from "react-icons/fa";
import { BiKey } from "react-icons/bi";
import Logo from '../public/Willowood.png';
import Image from "next/image";

const OTPLogin = () => {
  return (
    <>
      <div className="flex w-full h-screen">
        <div className="relative flex-1 bg-banner bg-cover bg-center bg-no-repeat">
          <div className="flex items-center justify-center h-screen">
            <div className="relative form rounded-lg bg-[#e4e0ba] bg-opacity-[0.35] w-[90%] md:w-[30%] px-8 pb-8">
              <div className="relative top-[1rem] flex items-center justify-center">
                <Image src={Logo}></Image>
              </div>
              <div className="flex flex-col justify-between mt-6 mx-12">
                <label className="flex items-center gap-1 font-semibold">
                  <FaMobile />
                  Mobile Number
                </label>
                <input
                  className="bg-transparent py-1.5 max-w-full text-start outline-none border-0 placeholder:text-black text-xs border-b-2 border-white-200"
                  type="text"
                  placeholder="Enter your mobile number"
                />
              </div>
              <div className="flex flex-col justify-between mx-12 mt-4">
                <label className="flex items-center gap-1 font-semibold">
                  <BiKey />
                  OTP
                </label>
                <input
                  className="bg-transparent py-1.5 max-w-full text-start outline-none border-0 placeholder:text-black text-xs border-b-2 border-white-200"
                  type="text"
                  placeholder="Enter OTP"
                />
                <div className="flex items-center justify-end mt-2">
                  <h3 className="text-xs">Resend OTP</h3>
                </div>
              </div>
              <div className="flex items-center justify-center mt-4">
                <button className="bg-green-700 py-1.5 w-full md:w-2/3 rounded-full uppercase text-sm text-white">
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OTPLogin;
