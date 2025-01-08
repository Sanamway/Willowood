import React, { useState, useEffect } from "react";
import Logo from "../../public/NewLogo.png";
import Banner from "../../public/bgnew.png";
import Farmer from "../../public/agrimanwoman.jpg";
import Man from "../../public/manwithveg.png";
import Image from "next/image";

const EmpLoginTwo = () => {
  const [empcode, setEmpcode] = useState("");
  const [passcode, setPasscode] = useState("");
  const [isLoading, setLoading] = useState(true);
  return (
    <>
      {/* <div className="min-h-screen font-arial flex flex-col items-center bg-polygreen bg-cover bg-center bg-no-repeat">
        <section className="flex flex-col md:flex-row rounded-3xl shadow-2xl shadow-grey-400  bg-green-600 md:flex-1  items-center md:justify-between  max-w-[930px]  my-10 ">
          <div className="flex flex-col md:w-1/2 bg-[#173038] rounded-l-3xl overflow-hidden items-center ">
            <div className="w-[1000px] h-[500px] my-8  ">
              <form className="form shad rounded-xl w- ">
                <div className="flex justify-center mb-6 mt-12 md:mt-1">
                  <Image src={Logo} className="h-16 w-auto" alt="Company Logo" />
                </div>
                <div className="flex flex-col mb-6 ">
                  <label className="text-gray-700 font-semibold">Employee Code</label>
                  <input
                    className="shadow-md mt-2 px-4 py-2 bg-gray-0 rounded-lg border border-gray-00 placeholder:text-gray-400 focus:outline-none focus:border-indigo-500"
                    type="text"
                    placeholder="Enter employee code"
                    maxLength={10}
                    value={empcode}
                    onChange={(e) => setEmpcode(e.target.value)}
                  />
                </div>

                <div className="flex flex-col mb-6">
                  <label className="text-gray-700 font-semibold">Password</label>
                  <input
                    className=" shadow-md mt-2 px-4 py-2 bg-gray-0 rounded-lg border border-gray-300 placeholder:text-gray-400 focus:outline-none focus:border-indigo-500"
                    type="password"
                    placeholder="Enter passcode"
                    maxLength={10}
                    value={passcode}
                    onChange={(e) => setPasscode(e.target.value)}
                  />
                </div>
                <div className="flex justify-between gap-4 w-full mb-4 ">
                  <h3
                    onClick={() => {}}
                    className="text-[0.69rem] text-indigo-600 hover:underline cursor-pointer"
                  >
                    Forgot Password
                  </h3>
                  <h3
                    onClick={() => {}}
                    className="text-[0.69rem] text-indigo-600 hover:underline cursor-pointer"
                  >
                    OTP Login
                  </h3>
                  <h3
                    onClick={() => {
                      // props.loginForm("otplogin")
                    }}
                    className="text-[0.69rem] text-indigo-600 hover:underline cursor-pointer"
                  >
                    Logout Devicee
                  </h3>
                </div>

                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="bg-[#DB4B31] md:shadow-2xl md:drop-shadow-2xl md:shadow-gray-700 text-white py-2 w-full md:w-2/3 rounded-lg text-sm font-semibold transition duration-200 hover:bg-green-700"
                  >
                    {isLoading == true ? "Loading..." : "Login"}
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="md:w-1/2 flex justify-center">
            <div className="w-full ">
              <h2>Hello</h2>
            </div>
          </div>
        </section>
      </div> */}

      <div className="min-h-screen font-arial flex flex-col items-center bg-polygreen bg-cover bg-center bg-no-repeat">
        <section className="flex  flex-col-reverse md:flex-row rounded-3xl shadow-2xl shadow-grey-400 bg-green-600 md:flex-1 items-center md:justify-between max-w-[930px] w-full my-10  md:px-0 overflow-hidden">
          <div className="flex flex-col md:w-1/2 bg-[#173038] clip-wav h-[550px] w-full rounded-3xl">
                <div className="flex justify-start mb-6 mt-12 md:mt-4 mx-4">
                  <Image src={Logo} className="h-16 w-auto" alt="Company Logo" />
                </div>
            <div className="w-full  my-8 mx-auto px-4">
              <form className="form shad rounded-xl w-[60%]  mx-auto">
                <div className="flex flex-col mb-6 ">
                  <label className="text-white font-semibold">Employee Code</label>
                  <input
                    className="shadow-sm shadow-green-100 mt-2 px-4 py-2 rounded-lg border border-gray-300 placeholder:text-gray-400 focus:outline-none focus:border-indigo-500"
                    type="text"
                    placeholder="Enter employee code"
                    maxLength={10}
                    value={empcode}
                    onChange={(e) => setEmpcode(e.target.value)}
                  />
                </div>
                <div className="flex flex-col mb-6">
                  <label className="text-white font-semibold">Password</label>
                  <input
                    className="shadow-sm shadow-green-100 mt-2 px-4 py-2 rounded-lg border border-gray-300 placeholder:text-gray-400 focus:outline-none focus:border-indigo-500"
                    type="password"
                    placeholder="Enter passcode"
                    maxLength={10}
                    value={passcode}
                    onChange={(e) => setPasscode(e.target.value)}
                  />
                </div>
                <div className="flex justify-between gap-4 w-full mb-4">
                  <h3
                    onClick={() => {}}
                    className="text-[0.69rem] text-indigo-600 hover:underline cursor-pointer"
                  >
                    Forgot Password
                  </h3>
                  <h3
                    onClick={() => {}}
                    className="text-[0.69rem] text-indigo-600 hover:underline cursor-pointer"
                  >
                    OTP Login
                  </h3>
                  <h3
                    onClick={() => {
                      // props.loginForm("otplogin")
                    }}
                    className="text-[0.69rem] text-indigo-600 hover:underline cursor-pointer"
                  >
                    Logout Device
                  </h3>
                </div>
                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="bg-[#DB4B31] shadow-sm shadow-green-100 text-white py-2 w-full md:w-2/3 rounded-lg text-sm font-semibold transition duration-200 hover:bg-green-700"
                  >
                    {isLoading ? "Loading..." : "Login"}
                  </button>
                </div>
              </form>
            </div>
            <div className="flex items-center justify-center text-white ">
              <div className="w-[78%]">
                <h1 className="text-[2rem] leading-[2.55rem] font-bold">
                  Where Technology Meets <span className="text-green-500">Nature...</span>
                </h1>
              </div>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center ">
            {/* <div className="w-full max-w-[500px] text-center">
              <h2 className="text-white font-bold text-2xl">Hello</h2>
            </div> */}
             <Image
                src={Man}
                alt="Farmers Illustration"
                className="w-full h-full object-contain rounded-xl"
              />
          </div>
        </section>
      </div>
    </>
  );
};

export default EmpLoginTwo;
