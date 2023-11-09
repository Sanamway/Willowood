import React, { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { BiSolidLockAlt } from "react-icons/bi";
import { AiFillGoogleCircle, AiFillTwitterCircle } from "react-icons/ai";
import { BsFacebook } from "react-icons/bs";
import Logo from "../../public/Willowood.png";
import Image from "next/image";
import { useRouter } from "next/router";
import axios from "axios";

import { url } from "@/constants/url";

const ForgotPass = () => {
  const [phone, setPhone] = useState("");
  const router = useRouter();

  const headers = {
    "Content-Type": "application/json",
    secret: "fsdhfgsfuiweifiowefjewcewcebjw"
  };

  const payload = {
    phone_number: phone
  };

  const forgotHandler = async (e) => {
    console.log("fpp", payload);
    e.preventDefault()
    
    try {
      const resp = await axios.post(`${url}/api/forget_password`, payload, { headers: headers });
      const respadata = await resp.data;
      console.log("api", respadata);
    } catch (error) {
      console.log("ee", error)
    }
  };

  return (
    <>
      <div className="flex w-full h-screen font-arial">
        <div className="relative flex-1 bg-banner bg-cover bg-center bg-no-repeat">
          <div className="flex items-center justify-center h-screen">
            <div className="relative form rounded-lg   bg-opacity-[0.35] w-[90%] md:w-[30%] px-8 pb-8">
              <div className="relative top-[1rem] flex items-center justify-center">
                <Image src={Logo}></Image>
              </div>
              <div className="flex flex-col items-center justify-center mt-4">
                <h2 className="text-lg text-black font-semibold">Forgot Password</h2>
                <h4 className="text-black mt-2">Enter Your Mobile Number</h4>
              </div>
              <div className="flex flex-col justify-between mt-8 mx-12 ">
                <label className="flex  text-black items-center gap-1 font-semibold">
                  <FaUser></FaUser>
                  Mobile Number
                </label>
                <input
                  className="bg-transparent text-black py-1.5 max-w-full text-start outline-none border-0 placeholder:text-black text-sm border-black border-b-2 border-white-200"
                  type="text"
                  placeholder="Type your Mobile Number"
                  minLength={10}
                  maxLength={10}
                  onChange={(e) => {
                    setPhone(e.target.value);
                  }}
                />
              </div>

              <div className="flex items-center justify-center mt-4">
                <button
                  // onClick={() => {
                  //   router.push("/otp");
                  // }}
                  onClick={forgotHandler}
                  className="bg-green-700 py-1.5 w-full md:w-2/3 rounded-full uppercase text-sm text-white"
                >
                  Send
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

export default ForgotPass;
