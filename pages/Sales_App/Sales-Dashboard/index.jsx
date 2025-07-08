import React, { useState, useEffect } from "react";
import FilterComponent from "../../../components/Sales-Dashboard/FilterComponent";
import SaleCards from "../../../components/Sales-Dashboard/SaleCards";
import CustomerCards from "../../../components/Sales-Dashboard/CustomerCards";
import SaleSummary from "../../../components/Sales-Dashboard/SaleSummary";

import CreditBalance from "../../../components/Sales-Dashboard/CreditBalance";

import RecentOrder from "../../../components/Sales-Dashboard/RecentOrder";
import RollingCards from "../../../components/Sales-Dashboard/RollingCards";
import GraphCard from "../../../components/Sales-Dashboard/GraphCard";
import ProductCards from "../../../components/Sales-Dashboard/ProductCards";
import { LiaFileDownloadSolid } from "react-icons/lia";
import { Popover, Switch } from "@headlessui/react";
import ViewCard from "../../../components/Sales-Dashboard/ViewCards";
import ChartOne from "../../../components/Sales_Portal_Apps/ChartOne";
import { FaArrowLeftLong } from "react-icons/fa6";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { BsCalendar2Month } from "react-icons/bs";
import { FaHandsHelping } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import RollingTable from "@/components/Sales-Dashboard/RollingTable";
import { useRouter } from "next/router";
import { url } from "@/constants/url";
import axios from "axios";

const Dashboard = () => {
  const router = useRouter();
  const headers = {
    "Content-Type": "application/json",
    secret: "fsdhfgsfuiweifiowefjewcewcebjw"
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
    tDes: ""
  });

  useEffect(() => {

    if (typeof window === undefined) return
    setLocalStorageItems({
      cId: JSON.parse(window.localStorage.getItem("userinfo"))?.c_id,
      bgId: JSON.parse(window.localStorage.getItem("userinfo"))?.bg_id,
      buId: JSON.parse(window.localStorage.getItem("userinfo"))?.bg_id,
      rId: JSON.parse(window.localStorage.getItem("userinfo"))?.r_id,
      zId: JSON.parse(window.localStorage.getItem("userinfo"))?.z_id,
      tId: JSON.parse(window.localStorage.getItem("userinfo"))?.t_id,
      roleId: JSON.parse(window.localStorage.getItem("userinfo"))?.role_id,
      clName: window.localStorage.getItem("user_name"),
      ulName: window.localStorage.getItem("phone_number"),
      empCode: window.localStorage.getItem("emp_code"),
      roleId: JSON.parse(window.localStorage.getItem("userinfo")).role_id,
      reportingManager: JSON.parse(window.localStorage.getItem("userinfo")).rp_manager,
      developmentManager: JSON.parse(window.localStorage.getItem("userinfo")).functional_mgr,
      hrManager: JSON.parse(window.localStorage.getItem("userinfo")).hr_name,
      reportingHQ: JSON.parse(window.localStorage.getItem("userinfo")).reporting_hq,
      mobile: JSON.parse(window.localStorage.getItem("phone_number")),
    });



  }, []);


  const getUserItem = () => {
    let role = localStorageItems.roleId
    switch (role) {
      case 1: return <div className="flex w-full  w-28">
        <div className="flex">
          <p className=" font-bold text-sm text-blue-800 w-24">
            Business Segment
          </p>
          <span>:</span>
        </div>
        <span className="w-32 ml-3">{JSON.parse(window.localStorage.getItem("userinfo"))?.business_segment
        }</span>
      </div>

      case 3: return <div className="flex w-full  w-28">
        <div className="flex">
          <p className=" font-bold text-sm text-blue-800 w-24">
            Business Unit
          </p>
          <span>:</span>
        </div>
        <span className="w-32 ml-3">{JSON.parse(window.localStorage.getItem("userinfo"))?.business_unit_name}</span>
      </div>

      case 4: return <div className="flex w-full  w-28">
        <div className="flex">
          <p className=" font-bold text-sm text-blue-800 w-24">
            Zone
          </p>
          <span>:</span>
        </div>
        <span className="w-32 ml-3">{JSON.parse(window.localStorage.getItem("userinfo"))?.zone_name}</span>
      </div>

      case 5: return <div className="flex w-full  w-28">
        <div className="flex">
          <p className=" font-bold text-sm text-blue-800 w-24">
            Region
          </p>
          <span>:</span>
        </div>
        <span className="w-32 ml-3">{JSON.parse(window.localStorage.getItem("userinfo"))?.region_name
        }</span>
      </div>

      case 6: return <div className="flex w-full  w-28">
        <div className="flex">
          <p className=" font-bold text-sm text-blue-800 w-24">
            Territory
          </p>
          <span>:</span>
        </div>
        <span className="w-32 ml-3">{localStorageItems.tDes}</span>
      </div>
      case 10: return <div className="flex w-full  w-28">
        <div className="flex">
          <p className=" font-bold text-sm text-blue-800 w-24">
            Business Segment
          </p>
          <span>:</span>
        </div>
        <span className="w-32 ml-3">{JSON.parse(window.localStorage.getItem("userinfo"))?.business_segment
        }</span>
      </div>


    }
  }
  const [imagePreview, setImagePreview] = useState(null);
  console.log("pol", imagePreview)
  // Fetch image from API
  const getImage = async (mobile) => {
    if (typeof window === "undefined") return;
    try {
      const res = await axios.get(`${url}/api/get_image`, {
        headers: headers,
        params: {
          phone_number: mobile,
          file_path: "user",
        },
      });

      const respdata = res.data.data;
      console.log("Fetched Image URL:", respdata.image_url);
      setImagePreview(respdata.image_url);
    } catch (error) {
      console.log("Error fetching image:", error);
      // setImagePreview("/default-profile.png");
    }
  };
  useEffect(() => {
    if (typeof window === undefined) return
    getImage(JSON.parse(window.localStorage.getItem("phone_number")))
  }, [])

  return (
    <>
      <section className="w-full px-3 bg-[#f0eff2] min-h-screen  pb-12 font-arial">
        <div className="w-full flex h-12 bg-blue-500 justify-between items-center px-4  shadow-lg lg:flex-col  ">
          <span className="text-white flex flex-row gap-4 font-bold   ">
            <FaArrowLeftLong
              className="self-center "
              onClick={() =>
                router.push({
                  pathname: "/Sales_App/Home",
                })
              }
            />
            <span>My KPI Dashboard</span>
          </span>{" "}

        </div>

        <div className="flex mb-4 mt-2 mb-2 bg-white">
          <div className="w-40 h-30 flex justify-center items-center">
            <img src={imagePreview} className="h-20 w-20 rounded-full text-orange-500 mt-4" size={80}></img>
          </div>
          <div className="flex  flex-col  w-full mt-4 md:hidden">
            <div className="flex w-full  w-28">
              <div className="flex">
                <p className=" font-bold text-sm text-blue-800 w-24">
                  Emp Code
                </p>
                <span>:</span>
              </div>
              <span className="w-32 ml-3">{localStorageItems.empCode}</span>
            </div>
            <div className="flex   w-full  w-28 ">
              <div className="flex">
                <p className=" font-bold text-sm text-blue-800 w-24">Name</p>
                <span>:</span>
              </div>
              <span className="w-32 ml-3 whitespace-nowrap"> {localStorageItems.clName}</span>
            </div>
            {getUserItem()}
          </div>
        </div>



        <div
          className="w-full px-4 mt-2  font-arial  rounded-md bg-white pt-2.5 pb-4"
          style={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)", borderRadius: "7px" }}
        >
          <FilterComponent></FilterComponent>
        </div>


        <div className="cardgraphwrapper w-full px- mt-4 flex lg:flex-row flex-col gap-3 font-arial   rounded-md">
          <div className="leftwrapper lg:w-[65%]  rounded-md">


            <CustomerCards>

            </CustomerCards>

            <RollingTable></RollingTable>
            <RollingCards></RollingCards>
            <SaleCards></SaleCards>
            <SaleSummary></SaleSummary>



          </div>




          <div className="rightwrapper h-64 flex-1  mt- border-green rounded-md">

            <CreditBalance></CreditBalance>
            <ChartOne></ChartOne>


            <GraphCard></GraphCard>



            <RecentOrder></RecentOrder>
          </div>
        </div>


        <div className="h- bg-white rounded-l-md rounded-r-md flex justify-between w-full items-center px-2  mt-3">
          <h2 className=" font-semibold py-2 text-[0.7rem]">Top 20 Products Trends</h2>

        </div>
        <div
          className="filterwrap w-full flex items-center justify-center  font-arial  rounded-b-md bg-white  py-1 "
          style={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }}
        >
          <ProductCards></ProductCards>
        </div>

        {/* View Cards  */}

      </section>
    </>
  ); 1
};

export default Dashboard;
