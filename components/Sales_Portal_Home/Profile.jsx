import React, { useState, useEffect } from "react";
import { IoHome } from "react-icons/io5";
import { IoIosArrowBack } from "react-icons/io";
import { FaBarcode } from "react-icons/fa6";
import { VscAccount } from "react-icons/vsc";
import { FaAddressBook } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { BsFilePerson } from "react-icons/bs";
import { SiStatuspal } from "react-icons/si";
import { MdLocationCity } from "react-icons/md";
import { MdDateRange } from "react-icons/md";
import { useRouter } from "next/router";
import moment from "moment";
import { url } from "@/constants/url";
import axios from "axios";

const Profile = () => {
  const router = useRouter();
  const [profData, setProfileData] = useState(null);

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
    empCode: ""
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
      empCode: window.localStorage.getItem("emp_code"),
    });
  }, []);


  //Handling Side Effect of API
  const getDataEmp = async () => {
    try {
      const res = await axios.get(`${url}/api/get_employee`, {
        headers: headers,
        params: {
          empcode: localStorageItems.empCode,
          c_id: localStorageItems.cId,
        }
      });
      const respdata = await res.data.data;
      setProfileData(respdata);
    } catch (error) {
      console.log("Error", error);
    }
  };

  useEffect(() => {
    if (localStorageItems.empCode && localStorageItems.cId) getDataEmp();
    return
  }, [localStorageItems.empCode, localStorageItems.cId]);

  return (
    <div className="px-0">
      <div className="flex justify-between py-5 px-3">
        <div className="pb-2 flex gap-2 font-bold text-slate-500">
          <IoIosArrowBack onClick={() => router.back()} className="pt-1 text-slate-500" size={24} /> My
          Profile
        </div>
        <div>
          <IoHome size={25} className="text-slate-500" />{" "}
        </div>
      </div>
      <div className=" bg-white  w-full h-screen border-t-2">
        <div className="flex gap-8 pt-4 pl-2">
          <div className="pt-4 pl-4">
            <FaBarcode className="text-blue-400" />
          </div>
          <div className="flex flex-col gap-2 font-bold flex-grow pr-20">
            <label>Employee Code:  </label>

            <p className="border-b-2 text-slate-400 font-normal">{profData?.empcode}</p>

          </div>
        </div>
        <div className="flex gap-8 pt-4 pl-2">
          <div className="pt-4 pl-4">
            <VscAccount className="text-blue-400" />
          </div>
          <div className="flex flex-col font-bold gap-2 flex-grow pr-20">
            <label>Employee Name: </label>
            <p className="border-b-2 text-slate-400 font-normal">{profData?.fname}</p>
          </div>
        </div>
        <div className="flex gap-8 pt-4 pl-2">
          <div className="pt-4 pl-4">
            <FaAddressBook className="text-blue-400" />
          </div>
          <div className="flex flex-col font-bold gap-2 flex-grow pr-20">
            <label>Address: </label>
            <p className="border-b-2 text-slate-400 font-normal">{profData?.caddress}</p>
          </div>
        </div>
        <div className="flex gap-8 pt-4 pl-2">
          <div className="pt-4 pl-4">
            <FaPhoneAlt className="text-blue-400" />
          </div>
          <div className="flex flex-col font-bold gap-2 flex-grow pr-20">
            <label>Contact Mobile: </label>
            <p className="border-b-2 text-slate-400 font-normal">{profData?.phone_number}</p>
          </div>
        </div>
        <div className="flex gap-8 pt-4 pl-2">
          <div className="pt-4 pl-4">
            <MdEmail className="text-blue-400" />
          </div>
          <div className="flex flex-col font-bold gap-2 flex-grow pr-20">
            <label>E-Mail ID: </label>
            <p className="border-b-2 text-slate-400 font-normal">{profData?.pemail}</p>
          </div>
        </div>
        <div className="flex gap-8 pt-4 pl-2">
          <div className="pt-4 pl-4">
            <BsFilePerson className="text-blue-400" />
          </div>
          <div className="flex flex-col font-bold gap-2 flex-grow pr-20">
            <label>Role: </label>
            <p className="border-b-2 text-slate-400 font-normal">{profData?.design}</p>
          </div>
        </div>
        <div className="flex gap-8 pt-4 pl-2">
          <div className="pt-4 pl-4">
            <MdLocationCity className="text-blue-400" />
          </div>
          <div className="flex flex-col font-bold gap-2 flex-grow pr-20">
            <label>Territory Name: </label>
            <p className="border-b-2 text-slate-400 font-normal">{profData?.territory_name}</p>
          </div>
        </div>
        <div className="flex gap-8 pt-4 pl-2">
          <div className="pt-4 pl-4">
            <VscAccount className="text-blue-400" />
          </div>
          <div className="flex flex-col font-bold gap-2 flex-grow pr-20">
            <label>Development Manager: </label>
            <p className="border-b-2 text-slate-400 font-normal">{profData?.functional_mgr}</p>
          </div>
        </div>
        <div className="flex gap-8 pt-4 pl-2">
          <div className="pt-4 pl-4">
            <VscAccount className="text-blue-400" />
          </div>
          <div className="flex flex-col font-bold gap-2 flex-grow pr-20">
            <label>Zone Development Manager: </label>
            <p className="border-b-2 text-slate-400 font-normal">{profData?.zdm_name}</p>
          </div>
        </div>
        <div className="flex gap-8 pt-4 pl-2">
          <div className="pt-4 pl-4">
            <VscAccount className="text-blue-400" />
          </div>
          <div className="flex flex-col font-bold gap-2 flex-grow pr-20">
            <label>Reporting Manager: </label>
            <p className="border-b-2 text-slate-400 font-normal">{profData?.rp_manager}</p>
          </div>
        </div>
        <div className="flex gap-8 pt-4 pl-2">
          <div className="pt-4 pl-4">
            <HiOutlineBuildingOffice2 className="text-blue-400" />
          </div>
          <div className="flex flex-col font-bold gap-2 flex-grow pr-20">
            <label>Reporting Office: </label>
            <p className="border-b-2 text-slate-400 font-normal">{profData?.reporting_hq}</p>
          </div>
        </div>
        <div className="flex gap-8 pt-4 pl-2">
          <div className="pt-4 pl-4">
            <MdDateRange className="text-blue-400" />
          </div>
          <div className="flex flex-col font-bold gap-2 flex-grow pr-20">
            <label>Agreement Start Date: </label>
            <p className="border-b-2 text-slate-400 font-normal">{moment(profData?.agg_startdate).format("DD/MM/Y")}</p>
          </div>
        </div>
        <div className="flex gap-8 pt-4 pl-2">
          <div className="pt-4 pl-4">
            <MdDateRange className="text-blue-400" />
          </div>
          <div className="flex flex-col font-bold gap-2 flex-grow pr-20">
            <label>Agreement End Date: </label>
            <p className="border-b-2 text-slate-400 font-normal">{moment(profData?.agg_enddate).format("DD/MM/Y")}</p>
          </div>
        </div>
        <div className="flex gap-8 pt-4 pl-2">
          <div className="pt-4 pl-4">
            <SiStatuspal className="text-blue-400" />
          </div>
          <div className="flex flex-col font-bold gap-2 flex-grow pr-20 mb-10">
            <label>Status: </label>
            <p className="border-b-2 text-slate-400 font-normal">{profData?.emp_status}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
