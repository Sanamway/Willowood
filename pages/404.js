import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

const ErrorPage = (props) => {
  const router = useRouter();
  const headers = {
    "Content-Type": "application/json",
    secret: "fsdhfgsfuiweifiowefjewcewcebjw",
  };

  const [localStorageItems, setLocalStorageItems] = useState({
    uId: "",
    cId: "",
    bgId: "",
    buId: "",
    rId: "",
    zId: "",
    tId: "",
    roleId: "",
    empCode: "",
    reportingManager:   "",
    developmentManager: "",
    hrManager:          "",
    reportingHQ:        ""
  });
  useEffect(() => {
    setLocalStorageItems({
      uId: JSON.parse(window.localStorage.getItem("uid")),
      cId: JSON.parse(window.localStorage.getItem("userinfo"))?.c_id,
      bgId: JSON.parse(window.localStorage.getItem("userinfo")).bg_id,
      buId: JSON.parse(window.localStorage.getItem("userinfo")).bu_id,
      rId: JSON.parse(window.localStorage.getItem("userinfo")).r_id,
      zId: JSON.parse(window.localStorage.getItem("userinfo")).z_id,
      tId: JSON.parse(window.localStorage.getItem("userinfo")).t_id,
      clName: window.localStorage.getItem("user_name"),
      ulName: window.localStorage.getItem("phone_number"),
      empCode: window.localStorage.getItem("emp_code"),
      roleId: JSON.parse(window.localStorage.getItem("userinfo")).role_id,
      reportingManager: JSON.parse(window.localStorage.getItem("userinfo")).rp_manager,
      developmentManager: JSON.parse(window.localStorage.getItem("userinfo")).functional_mgr,
      hrManager: JSON.parse(window.localStorage.getItem("userinfo")).hr_name,
      reportingHQ:JSON.parse(window.localStorage.getItem("userinfo")).reporting_hq
    });
  }, []);

 
  

  
  return (
    <div>
      <Head>
        <title>Unexpected Result!</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div className="">
        
      
      </div>
      <div className="h-screen bg-gradient-to-br  flex items-start justify-start relative">
        
        {/* Animated Circle Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-white to-transparent opacity-30 rounded-full w-96 h-96 md:w-[500px] md:h-[500px] blur-3xl"></div>

        
        <div className="relative z-10 text-center p-8 space-y-8 md:hidden">
           <h1 className="text-5xl font-bold text-green-900 animate-pulse">Unexpected Result!</h1>
           <p className="text-lg  font-medium">
           "Oops! Looks like you've wandered off the map. Let's get you back on track!"
           </p>
          <div onClick={() =>
              router.push({
                pathname: "/MR_Portal_Apps/MRHome",
              })
            }>
          <p className="bg-blue-500 text-white py-3 px-8 rounded-full text-lg shadow-lg transform transition-all hover:scale-105 hover:bg-orange-600">
              Go to Home
          </p>
          </div>
        </div>
      </div>
  </div>
  );
};

export default ErrorPage;

// Hydration  Issue
