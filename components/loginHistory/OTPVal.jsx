import React, { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { BiSolidLockAlt } from "react-icons/bi";
import { AiFillGoogleCircle, AiFillTwitterCircle } from "react-icons/ai";
import { BsFacebook } from "react-icons/bs";
import Logo from "../../public/Willowood.png";
import Image from "next/image";
import { useRouter } from "next/router";
import OtpInput from "react-otp-input";
import axios from "axios";
import { url } from "@/constants/url";
import toast, { Toaster } from "react-hot-toast";

const OTPVal = () => {
  const router = useRouter();
  const { phone_number, uid } = router.query;
  const [otp, setOtp] = useState("");

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const headers = {
    "Content-Type": "application/json",
    secret: "fsdhfgsfuiweifiowefjewcewcebjw"
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    console.log("otp", otp);

    // return;

    if (otp.length < 6) {
      toast.error("Invalid OTP");
      return;
    }
    const payload = {
      phone_otp: otp,
      uid: uid
    };

    try {
      const resp = await axios.post(`${url}/api/verify_otp`, JSON.stringify(payload), { headers: headers });
      const respdata = await resp.data;

      console.log("uid", respdata?.data?.uid);
      const uid = respdata?.data?.uid;
      const email = respdata?.data?.email_id;
      const userName = respdata?.data?.user_name;

      if (uid) {
        localStorage.setItem("uid", uid);
      }
      if (email) {
        localStorage.setItem("email", email);
      }
      if (userName) {
        localStorage.setItem("userName", userName);
      }

      toast.success(respdata?.message);
      if (respdata?.message) {
        setTimeout(() => {
          router.push("/");
        }, 1000);
      }
    } catch (error) {
      console.log("dfd", error);
      console.log("err", error?.response?.data?.message);
      const errorMessage = error?.response?.data?.message;
      if (errorMessage) {
        toast.error(errorMessage);
      }
    }
  };

  useEffect(() => {
    if (window.localStorage) {
      const isLoggedInInLocalStorage = !!localStorage.getItem("uid");
      setIsLoggedIn(isLoggedInInLocalStorage);
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/");
    }
  }, [isLoggedIn]);

  return (
    <>
      <div className="flex w-full h-screen font-arial overflow-x-hidden">
        <Toaster position="bottom-center" reverseOrder={false} />
        <div className="relative flex-1 bg-banner bg-cover bg-center bg-no-repeat">
          <div className="flex items-center justify-center h-screen">
            <div className="relative form rounded-lg bg-opacity-[0.35] w-[90%] md:w-[30%] px-8 pb-8">
              <div className="relative top-[1rem] flex flex-col items-center justify-center">
                <Image src={Logo}></Image>
                <div className=" ml-4 mt-4 flex flex-wrap items-center justify-center text-center">
                  <h2 className="text-black text-lg w-3/4">Enter the OTP you received at {phone_number}</h2>
                </div>
              </div>

              <div className="flex flex-col justify-between mx-12 mt-4 ">
                <label className=" py-2 flex justify-center text-center text-black items-center gap-1 font-semibold mb-2">
                  <BiSolidLockAlt />
                  OTP Verification
                </label>

                <div className="flex justify-center gap-2  text-black">
                  <OtpInput
                    value={otp}
                    onChange={setOtp}
                    numInputs={6}
                    renderSeparator={false}
                    renderInput={(props) => <input {...props} />}
                    inputStyle={"inputOTPBOX"}
                  />
                </div>
              </div>
              <div className="flex items-center justify-center mt-4">
                <button
                  // onClick={() => {
                  //   router.push("/");
                  // }}
                  onClick={handleVerify}
                  className="bg-green-700 py-1.5 w-full md:w-2/3 rounded-full uppercase text-sm text-white"
                >
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
