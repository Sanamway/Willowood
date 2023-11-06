import React from "react";
import { FaUser } from "react-icons/fa";
import { BiSolidLockAlt } from "react-icons/bi";
import { AiFillGoogleCircle, AiFillTwitterCircle } from "react-icons/ai";
import { BsFacebook } from "react-icons/bs";
import Logo from "../public/Willowood.png";
import Image from "next/image";
import { useRouter } from "next/router";

const OTPVal = () => {
  const router = useRouter()
  return (
    <>
     

      <div className="flex w-full h-screen font-arial">
        <div className="relative flex-1 bg-banner bg-cover bg-center bg-no-repeat">
          <div className="flex items-center justify-center h-screen">
            <div className="relative form rounded-lg bg-opacity-[0.35] w-[90%] md:w-[30%] px-8 pb-8">
              <div className="relative top-[1rem] flex flex-col items-center justify-center">
                <Image src={Logo}></Image>
              <div className=" ml-4 mt-4 flex flex-wrap items-center justify-center text-center">
                <h2 className="text-black text-lg w-3/4">Enter the OTP you received at +91 ******876</h2>
              </div>
              </div>


              <div className="flex flex-col justify-between mx-12 mt-4 ">
                <label className=" py-2 flex justify-center text-center text-black items-center gap-1 font-semibold mb-2">
                  <BiSolidLockAlt />
                  OTP Verification
                </label>
                <div className="flex justify-center gap-2">
                  <input
                    className="bg-transparent text-center h-10 bg-white text-black w-10 outline-none border-0 placeholder:text-black text-sm border-black border- border-white-200"
                    type="text"
                    placeholder="0"
                    maxLength={1}
                  />
                  <input
                    className="bg-transparent text-center h-10 bg-white text-black w-10 outline-none border-0 placeholder:text-black text-sm border-black border- border-white-200"
                    type="text"
                    placeholder="0"
                    maxLength={1}
                  />
                  <input
                    className="bg-transparent text-center h-10 bg-white text-black w-10 outline-none border-0 placeholder:text-black text-sm border-black border- border-white-200"
                    type="text"
                    placeholder="0"
                    maxLength={1}
                  />
                  <input
                    className="bg-transparent text-center h-10 bg-white text-black w-10 outline-none border-0 placeholder:text-black text-sm border-black border- border-white-200"
                    type="text"
                    placeholder="0"
                    maxLength={1}
                  />
                </div>
              </div>
              <div className="flex items-center justify-center mt-4">
                <button onClick={()=>{router.push('/')}} className="bg-green-700 py-1.5 w-full md:w-2/3 rounded-full uppercase text-sm text-white">
                  Verify
                </button>
              </div>

              <div className="googleWrap flex items-center flex-col justify-center mt-10">
                <h2 className="text-gray-600">or sign up using</h2>
                <div className="icons flex items-center justify-center gap-2 mt-2 mb-4">
                  <BsFacebook className="text-blue-600" size={26}></BsFacebook>
                  <AiFillTwitterCircle className="text-blue-500" size={29} color="blue"></AiFillTwitterCircle>
                  <AiFillGoogleCircle className="text-red-600" size={29}></AiFillGoogleCircle>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OTPVal;
