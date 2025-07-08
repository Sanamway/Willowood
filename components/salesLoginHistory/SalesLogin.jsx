import React, { useState, useEffect } from "react";
import Logo from "../../public/NewLogo.png";
import Banner from "../../public/bgnew.png";
import Farmer from "../../public/agrimanwoman.jpg";
import Image from "next/image";
import axios from "axios";
import { url } from "@/constants/url";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";
import { AiTwotoneHome, AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";

const EmpLogin = (props) => {
  const router = useRouter();
  const [empcode, setEmpcode] = useState("");
  const [passcode, setPasscode] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [spinner, setSpinner] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoggedMode, setLoggedMode] = useState(null);

  // useEffect(() => {
  //   const checkLocalStorage = () => {
  //     if (window.localStorage) {
  //       const isLoggedInInLocalStorage = !!localStorage.getItem("uid");
  //       const userinfoo = localStorage.getItem("userinfo");
  //       const mode = localStorage.getItem("mode");

  //       // setIsLoggedIn(isLoggedInInLocalStorage);

  //       if (isLoggedInInLocalStorage) {
  //         router.push("/Sales_App/Home");
  //         return;
  //       } else if (isLoggedInInLocalStorage && mode == "mobile") {
  //         // router.push("/mrhome");
  //         router.push("/Sales_App/Home");
  //         return;
  //       }
  //     }
  //     setSpinner(false)
  //   };
  //   checkLocalStorage();
  // }, [router]);

  // useEffect(() => {
  //   if (window.localStorage) {
  //     const isLoggedInInLocalStorage = !!localStorage.getItem("uid");
  //     setIsLoggedIn(isLoggedInInLocalStorage);
  //   }
  // }, []);

  // useEffect(() => {
  //   if (isLoggedIn) {
  //     router.push("/Sales_App/Home");
  //   } else if (isLoggedIn && isLoggedMode == "mobile") {
  //     router.push("/Sales_App/Home");

  //   } else {
  //   }
  // }, [isLoggedIn]);

  useEffect(() => {
    const checkLocalStorage = () => {
      if (window.localStorage) {
        const isLoggedInInLocalStorage = !!localStorage.getItem("uid");
        const mode = localStorage.getItem("mode");
        if (isLoggedInInLocalStorage) {
          if (mode === "mobile") {
            router.push("/Sales_App/Home");
          }

          else if (mode == "Sales App") {
            // router.push("/mrhome");
            router.push("/Sales_App/Home");
          } else {
            router.push("/Sales_App/Home");
          }
          return;
        }
      }
      setSpinner(false);
    };
    checkLocalStorage();
  }, [router]);

  //headers
  const headers = {
    "Content-Type": "application/json",
    secret: "fsdhfgsfuiweifiowefjewcewcebjw"
  };

  //handler
  const loginHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("data", empcode);
    const payload = {
      emp_code: empcode,
      password: passcode
    };
    // return;
    try {
      const resp = await axios.post(`${url}/api/login_user`, payload, {
        headers: headers
      });
      const respdata = await resp.data;
      console.log("check", respdata.data);
      // return
      if (respdata.message == "OTP sent successfully!") {
        toast.success(respdata.message);
        const uuid = respdata.data;
        setTimeout(() => {
          router.push({
            pathname: `/otp`,
            query: { phone_number: empcode, uid: uuid }
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
          router.push("/Sales_App/Home");
        }
        else if (mode == "Sales App") {
          // router.push("/mrhome");
          router.push("/Sales_App/Home");
        }

        else {
          router.push("/Sales_App/Home");
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
          router.push("/Sales_App/Home");
        }
        else if (mode == "Sales App") {
          // router.push("/mrhome");
          router.push("/Sales_App/Home");
        }

        else {
          router.push("/Sales_App/Home");
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

  const ForgotLogout = async () => {
    const payload = {
      emp_code: empcode,
      password: passcode
    };
    try {
      const resp = await axios.post(`${url}/api/login_user`, payload, {
        headers: headers
      });
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

  //toggle P

  function togglePass() {
    setShowPass(!showPass);
  }

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
      <div className="min-h-screen font-arial flex flex-col items-center bg-wave bg-cover bg-center bg-no-repeat">
        <Toaster position="bottom-center" reverseOrder={false} />

        <section className="flex flex-col-reverse md:flex-row rounded-3xl shadow-2xl shadow-grey-400  bg-white md:flex-1 py-2 items-center md:justify-between  max-w-[930px] mx-2 my-20 px-10 gap-4">
          <div className="flex relative flex-col md:w-1/2  ">
            <div className="flex justify-start mb-6 md:absolute md:-top-20   mt-10 md:mt-0">
              <Image src={Logo} className="h-16 w-auto" alt="Company Logo" />
            </div>
            <div className="w-full h-auto md:h-auto bg-green-2 flex items-center justify-center">
              <form className="form bg-white shad rounded-xl ">
                <div className="flex flex-col mb-6 w-[80%] ">
                  <label className="text-gray-700 font-semibold text-[0.75rem]">Employee Code</label>
                  <input
                    className="shadow-md mt-2 px-4 py-1 bg-gray-0 rounded-lg border border-gray-00 placeholder:text-gray-400 focus:outline-none focus:border-indigo-500"
                    type="text"
                    placeholder="Enter employee code"
                    maxLength={10}
                    value={empcode}
                    onChange={(e) => setEmpcode(e.target.value.toUpperCase())}
                  />
                </div>

                <div className="flex flex-col mb-6 relative  w-[80%]">
                  <label className="text-gray-700 font-semibold text-[0.75rem]">Password</label>
                  <input
                    className=" shadow-md mt-2 px-4 py-1 bg-gray-0 rounded-lg border border-gray-300 placeholder:text-gray-400 focus:outline-none focus:border-indigo-500"
                    type={showPass ? "text" : "password"}
                    placeholder="Enter password"
                    // maxLength={10}
                    value={passcode}
                    onChange={(e) => setPasscode(e.target.value)}
                  />
                  <span className="absolute bottom-2 right-3 cursor-pointer" onClick={togglePass}>
                    {showPass ? (
                      <AiOutlineEye className="text-green-500" size={18} />
                    ) : (
                      <AiOutlineEyeInvisible size={18} />
                    )}
                  </span>
                </div>
                <div className="flex justify-between gap-4 w-full mb-4 ">
                  <h3
                    onClick={() => {
                      // props.loginForm("forgot")
                    }}
                    className="text-[0.69rem] text-indigo-600 hover:underline cursor-pointer"
                  >
                    Forgot Password
                  </h3>
                  <h3
                    onClick={() => {
                      props.loginForm("otplogin");
                    }}
                    className="text-[0.69rem] text-indigo-600 hover:underline cursor-pointer"
                  >
                    OTP Login
                  </h3>
                  <h3
                    onClick={() => {
                      // props.loginForm("")
                      ForgotLogout();
                    }}
                    className="text-[0.69rem] text-indigo-600 hover:underline cursor-pointer"
                  >
                    Logout Device
                  </h3>
                </div>

                <div className="flex justify-center">
                  <button
                    type="submit"
                    onClick={loginHandler}
                    className="bg-[#DB4B31] md:shadow-2xl md:drop-shadow-2xl md:shadow-gray-700 text-white py-2 my-3 w-1/2 md:w-2/3 rounded-lg text-sm font-semibold transition duration-200 hover:bg-green-700"
                  >
                    {isLoading ? "Loading..." : "Login"}
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="md:w-1/2 flex justify-center">
            <div className="w-full h-auto md:h-auto bg-green- flex items-center justify-center">
              <Image
                src={Farmer}
                alt="Farmers Illustration"
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default EmpLogin;
