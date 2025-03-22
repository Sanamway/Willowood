import React, { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { BiSolidLockAlt } from "react-icons/bi";
import { AiFillGoogleCircle, AiFillTwitterCircle } from "react-icons/ai";
import { BsFacebook } from "react-icons/bs";
import Logo from "../../public/NewLogo.png";
import Image from "next/image";
import { useRouter } from "next/router";
import axios from "axios";
import { url } from "@/constants/url";
import toast, { Toaster } from "react-hot-toast";

const Login = (props) => {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [spinner, setSpinner] = useState(true);
  const [isLoggedMode, setLoggedMode] = useState(null);
  const [u_id, setU_id] = useState(null);

  const headers = {
    "Content-Type": "application/json",
    secret: "fsdhfgsfuiweifiowefjewcewcebjw"
  };

  useEffect(() => {
    const checkLocalStorage = () => {
      if (window.localStorage) {
        const isLoggedInInLocalStorage = !!localStorage.getItem("uid");
        const mode = localStorage.getItem("mode");
        if (isLoggedInInLocalStorage) {
          if (mode === "mobile") {
            router.push("/MR_Portal_Apps/MRHome");
          } else {
            router.push("/");
          }
          return;
        }
      }
      setSpinner(false);
    };
    checkLocalStorage();
  }, [router]);

  // useEffect(() => {
  //   if (isLoggedIn) {
  //     router.push("/");
  //   } else if (isLoggedIn && isLoggedMode == "mobile") {
  //     // router.push("/mrhome");
  //     router.push("/MR_Portal_Apps/MRHome");

  //   } else {
  //   }
  // }, [isLoggedIn]);

  const loginHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("data", phone);
    if (phone.length < 10) {
      toast.error("Enter the valid Mobile number");
      setLoading(false);
      return;
    }
    const payload = {
      phone_number: phone
    };
    try {
      const resp = await axios.post(`${url}/api/login_user`, payload, {
        headers: headers
      });
      const respdata = await resp.data;

      if (respdata.message == "OTP sent successfully!") {
        toast.success(respdata.message);
        const uuid = respdata.data;
        setTimeout(() => {
          router.push({
            pathname: `/otp`,
            query: { phone_number: phone, uid: uuid }
          });
        }, 1000);
      }
      const phone_number = respdata?.data?.loginHistory?.phone_no;
      const uid = respdata?.data.uid || respdata?.data?.loginHistory.uid;
      const email_id = respdata?.data?.loginHistory?.email_id;
      const user_name = respdata?.data?.loginHistory?.user_name;
      const _id = respdata?.data?.loginHistory?._id;
      const mode = respdata?.data?.loginHistory?.mode;
      const userinfo = respdata?.data?.userBSTDetails;

      setLoggedMode(mode);

      // console.log("logInfo", userinfo?.bg_id);

      // if (uid) {
      //   gettingMenuSidebar(uid);
      // }

      if (respdata?.message && respdata?.status == true) {
        setLoading(false);
        const uid = respdata?.data.uid || respdata?.data?.loginHistory.uid;
        const email_id = respdata?.data?.loginHistory?.email_id;
        const user_name = respdata?.data?.loginHistory?.user_name;
        const _id = respdata?.data?.loginHistory?._id;
        const mode = respdata?.data?.loginHistory?.mode;
        const c_id = respdata?.data?.loginHistory?.c_id;
        const emp_code = respdata?.data?.loginHistory?.emp_code;
        const logout_time = respdata?.data?.loginHistory?.logout_time;
        const login_in_time = respdata?.data?.loginHistory?.login_in_time;
        const userinfo = respdata?.data?.userBSTDetails;
        toast.success(respdata?.message);

        localStorage.setItem("uid", uid);
        localStorage.setItem("email_id", email_id);
        localStorage.setItem("mode", mode);
        localStorage.setItem("c_id", JSON.stringify(c_id));
        localStorage.setItem("emp_code", emp_code);
        localStorage.setItem("logout_time", logout_time);
        localStorage.setItem("login_in_time", login_in_time);
        localStorage.setItem("userinfo", JSON.stringify(userinfo));

        sessionStorage.setItem("uid", uid);
        sessionStorage.setItem("mode", mode);

        const apiExpireTime = Date.now() + 60000;
        localStorage.setItem("expireTime", apiExpireTime);
        sessionStorage.setItem("expireTime", apiExpireTime);

        if (mode == "mobile") {
          // router.push("/mrhome");
          router.push("/MR_Portal_Apps/MRHome");
        } else {
          router.push("/");
        }
      }

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
        localStorage.setItem("phone_number", phone_number);
        localStorage.setItem("user_name", user_name);
        localStorage.setItem("id", _id);
        localStorage.setItem("userinfo", JSON.stringify(userinfo));

        sessionStorage.setItem("uid", uid);

        if (mode == "mobile") {
          // router.push("/mrhome");
          router.push("/MR_Portal_Apps/MRHome");
        } else {
          router.push("/");
        }
      }
    } catch (error) {
      console.log("re", error);
      console.log("err", error?.response?.data?.message);
      if (error?.response?.data?.message) {
        toast.error(error?.response?.data?.message);
      }
      const errorMessage = error?.response?.data?.message;
      const status = error?.response?.data?.status;

      if (errorMessage && status == false) {
        console.log("loginms", errorMessage == "OTP is not verified");

        if (errorMessage == "User Login is locked") {
          // toast.error(errorMessage);
          setLoading(false);
          return;
        }
        if (errorMessage == "User Login is frozen") {
          // toast.error(errorMessage);
          setLoading(false);
          return;
        }

        if (errorMessage == "User Login is not active") {
          // toast.error(errorMessage);
          setLoading(false);
          return;
        }

        if (errorMessage == "Invalid User Login mobile no") {
          // toast.error(errorMessage);
          setLoading(false);
          return;
        }
        setLoading(false);
        if (errorMessage == "OTP is not verified") {
          router.push({
            pathname: `/otp`,
            query: { phone_number: phone, uid: uid }
          });
        }
      }
    }
  };

  //Handling Forgot Password Actions

  const ForgotLogout = async () => {
    try {
      const resp = await axios.post(
        `${url}/api/login_user`,
        { phone_number: phone },
        {
          headers: headers
        }
      );
      const respdata = await resp.data;
      console.log("hadnledLog", respdata);
      if (!respdata) {
        return;
      }
    } catch (error) {
      //AL ISSUE
      console.log("FORLOG", error?.response?.data?.message);
      const phoneNotAval = error?.response?.data?.data?.user_id;
      const u_id = error?.response?.data?.data?.user_id;
      if (!phoneNotAval) {
        toast.error("Enter Number");
      } else if (u_id) {
        handleLogout(u_id);
      } else {
      }
    }
  };

  const handleLogout = async (uid) => {
    console.log("pay", phone);
    try {
      const resp = await axios.get(`${url}/api/logout?user_id=${uid}`, {
        headers: headers
      });
      const respdata = await resp.data;
      if (!respdata) {
        return;
      }
      if (respdata.status) {
        localStorage.removeItem("uid");
        sessionStorage.removeItem("uid");
        localStorage.removeItem("user_name");
        localStorage.removeItem("email_id");
        localStorage.removeItem("userinfo");
        localStorage.removeItem("phone_number");
        localStorage.removeItem("mode");
        localStorage.removeItem("c_id");
        localStorage.removeItem("emp_code");
        localStorage.removeItem("expireTime");
        sessionStorage.removeItem("expireTime");
        toast.success(respdata.message);
        setTimeout(() => router.push("/logoutsuccess"), 1000);
      }
    } catch (error) {
      console.log(error);
    }
  };


  if (spinner) {
    return (
      <div className="flex justify-center items-center h-screen">
        <svg
          aria-hidden="true"
          className="w-12 h-12 text-gray-200 animate-spin dark:text-gray-600 fill-red-600"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
      </div>
    );
  }

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
                  type="number"
                  placeholder="Type your Mobile Number"

                  value={phone}
                  onChange={(e) => {
                    if (e.target.value.length > 10) {
                      return;
                    }
                    setPhone(e.target.value);
                  }}
                />
              </div>
              <div className="flex flex-col justify-between mx-12 mt-4">
                <div className="flex items-center justify-between mt-2">
                  <h3
                    onClick={() => {

                      props.loginForm("emplogin");
                    }}
                    className="text-xs text-black cursor-pointer"
                  >
                    User Login
                  </h3>
                  <h3
                    onClick={() => {

                      ForgotLogout();
                    }}
                    className="text-xs text-black cursor-pointer"
                  >
                    Logout Device
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

              {/* <div className="googleWrap flex items-center flex-col justify-center mt-10">
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
              </div> */}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
