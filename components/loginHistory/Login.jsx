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
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const headers = {
    "Content-Type": "application/json",
    secret: "fsdhfgsfuiweifiowefjewcewcebjw",
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
         console.log("data", phone);
    if (phone.length < 10) {
      toast.error("Enter the valid Mobile number");
      setLoading(false)
      return;
    }
    const payload = {
      phone_number: phone,
    };
    try {
      const resp = await axios.post(`${url}/api/login_user`, payload, {
        headers: headers,
      });
      const respdata = await resp.data;
      const phone_number = respdata?.data.phone_no;
      const uid = respdata?.data.uid || respdata?.data?.loginHistory.uid;

      const email_id = respdata?.data?.loginHistory?.email_id;
      const user_name = respdata?.data?.loginHistory?.user_name;
      const _id = respdata?.data?.loginHistory?._id;

      // console.log("datas", respdata?.data?.loginHistory)
      // console.log("status", respdata?.status)

      const userinfo = respdata?.data?.userBSTDetails;
      console.log("logInfo", userinfo?.bg_id);

      // if (uid) {
      //   gettingMenuSidebar(uid);
      // }

      if (respdata?.message && respdata?.status == false) {
        setLoading(false);
        toast.success(respdata?.message);
        setTimeout(() => {
          router.push({
            pathname: `/otp`,
            query: { phone_number: phone_number, uid: uid }
          });
        }, 1000);
      } else {
        localStorage.setItem("uid", uid);
        localStorage.setItem("email_id", email_id);
        localStorage.setItem("user_name", user_name);
        localStorage.setItem("id", _id);
        localStorage.setItem("userinfo", JSON.stringify(userinfo));

        router.push("/");
      }
    } catch (error) {
      console.log("re", error);
      console.log("err", error?.response?.data?.message);
      const errorMessage = error?.response?.data?.message;
      const status = error?.response?.data?.status;
      if (errorMessage && status == false) {
        console.log("loginms", errorMessage == "OTP is not verified");

        if (errorMessage == "User Login is locked") {
          toast.error(errorMessage);
          setLoading(false);
          return;
        }
        if (errorMessage == "User Login is frozen") {
          toast.error(errorMessage);
          setLoading(false);
          return;
        }

        if (errorMessage == "User Login is not active") {
          toast.error(errorMessage);
          setLoading(false);
          return;
        }

        if (errorMessage == "Invalid User Login mobile no") {
          toast.error(errorMessage);
          setLoading(false);
          return;
        }
        setLoading(false);
        if (errorMessage == "OTP is not verified") {
          router.push({
            pathname: `/otp`,
            query: { phone_number: phone }
          });
        }
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

  //setting up the menus in localStorage

  // const gettingMenuSidebar = async (uid) => {
  //   try {
  //     const resp = await axios.get(
  //       `${url}/api/get_assign_role_profile?user_id=${uid}&data_by_parent_id=true`,
  //       { headers: headers }
  //     );
  //     const respData = await resp.data.data;
  //     // setMenus(respData);
  //     localStorage.setItem("SideMenus", JSON.stringify(respData));
  //   } catch (error) {
  //     console.log("error : ", error);
  //   }
  // };

  return (
    <>
      <div className="flex w-full h-screen font-arial">
        <Toaster position="bottom-center" reverseOrder={false} />
        <div className="relative flex-1 bg-banner bg-cover bg-center bg-no-repeat">
          <div className="flex items-center justify-center min-h-screen">
            <form className="relative form rounded-lg   bg-opacity-[0.35] w-[90%] md:w-[30%] px-8 pb-8">
              <div className="relative top-[1rem] flex items-center justify-center">
                <Image src={Logo}></Image>
              </div>
              <div className="flex flex-col justify-between mt-8 mx-12 ">
                <label className="flex  text-black items-center gap-1 font-semibold">
                  <FaUser></FaUser>
                  Mobile Number
                </label>
                <input
                  className="bg-transparent text-black py-1.5 max-w-full text-start outline-none border-0 placeholder:text-black text-sm border-black border-b-2 border-white-200"
                  type="tel"
                  placeholder="Type your Mobile Number"
                  pattern="[6789][0-9]{9}"
                  title="Enter Valid Number"
                  minLength={10}
                  maxLength={10}
                  onChange={(e) => {
                    setPhone(e.target.value);
                  }}
                />
              </div>
              <div className="flex flex-col justify-between mx-12 mt-4">
                <div className="flex items-center justify-end mt-2">
                  <h3
                    onClick={() => {
                      router.push("/forgotpass");
                    }}
                    className="text-xs text-black cursor-pointer"
                  >
                    Forgot Password?
                  </h3>
                </div>
              </div>
              <div className="flex items-center justify-center mt-4">
                {/* <button onClick={()=>{router.push('/otp')}} className="bg-green-700 py-1.5 w-full md:w-2/3 rounded-full uppercase text-sm text-white"> */}
                <button
                  type="submit"
                  onClick={loginHandler}
                  className="bg-green-700 py-1.5 w-full md:w-2/3 rounded-full text-sm text-white"
                >
                  {isLoading ? "Loading..." : "Login"}
                </button>
              </div>

              <div className="googleWrap flex items-center flex-col justify-center mt-10">
                <h2 className="text-gray-600">or sign up using</h2>
                <div className="icons flex items-center justify-center gap-2 mt-2 mb-4">
                  <BsFacebook className="text-blue-600" size={26}></BsFacebook>
                  <AiFillTwitterCircle
                    className="text-blue-500"
                    size={29}
                    color="blue"
                  ></AiFillTwitterCircle>
                  <AiFillGoogleCircle
                    className="text-red-600"
                    size={29}
                  ></AiFillGoogleCircle>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
