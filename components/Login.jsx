import React from "react";
import { FaUser } from "react-icons/fa";
import { BiSolidLockAlt } from "react-icons/bi";
import { AiFillGoogleCircle, AiFillTwitterCircle } from "react-icons/ai";
import { BsFacebook } from "react-icons/bs";
import Logo from '../public/Willowood.png'
import Image from "next/image";
const Login = () => {
  return (
    <>
      <div className="flex w-full h-screen">
        <div className="relative flex-1 bg-banner bg-cover bg-center bg-no-repeat">
          <div className="flex items-center justify-center h-screen">
            <div className="relative form rounded-lg  bg-[#e4e0ba] bg-opacity-[0.35] w-[90%] md:w-[30%] px-8 pb-8">
              <div className="relative top-[1rem] flex items-center justify-center">
                {/* <h2 className="text-4xl text-green-400 font-bold">COPOXY</h2> */}
                {/* minus top removed  1.5*/}
                <Image src={Logo}></Image>
              </div>
              <div className="flex flex-col justify-between mt-6 mx-12">
                <label className="flex items-center gap-1 font-semibold">
                  <FaUser></FaUser>
                  Username
                </label>
                <input
                  className="bg-transparent py-1.5 max-w-full text-start outline-none border-0 placeholder:text-black text-xs border-b-2 border-white-200"
                  type="text"
                  placeholder="Type your username"
                />
              </div>
              <div className="flex flex-col justify-between mx-12 mt-4">
                <label className="flex items-center gap-1 font-semibold">
                  <BiSolidLockAlt />
                  Password
                </label>
                <input
                  className="bg-transparent py-1.5 max-w-full text-start outline-none border-0 placeholder:text-black text-xs border-b-2 border-white-200"
                  type="password"
                  placeholder="Type your password"
                />
                <div className="flex items-center justify-end mt-2">
                  <h3 className="text-xs">Forgot Password?</h3>
                </div>
              </div>
              <div className="flex items-center justify-center mt-4">
                <button className="bg-green-700 py-1.5 w-full md:w-2/3 rounded-full uppercase text-sm text-white">
                  Login
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

export default Login;
