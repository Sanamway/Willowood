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
  const { mrhome, profile } = router.query;

  const [profDet, setProfDet] = useState(null);

  const headers = {
   "Content-Type": "application/json",
   secret: "fsdhfgsfuiweifiowefjewcewcebjw"
 };
  const profilee = {
    id: 1,
    name: "Palak Sharma",
    address: "Delhi",
    contact_mobile: "6398067642",
    email: "palak@gmail.com",
    role: "regional manager",
    t_name: "mzn",
    dev_manager: "xyz",
    zdev_manager: "PENDING",
    reporting_manager: "abc",
    reporting_office: "delhi",
    start_date: "01-02-2000",
    end_date: "015-02-2000",
    status: "true"
  };

  

//Handling Side Effect of API
  const getDataEmp = async () => {
   const empcode = "MR00000007";
   try {
     const res = await axios.get(`${url}/api/get_employee?empcode=${empcode}&c_id=1`, {
       headers: headers
     });
     const respdata = await res.data.data;
     setProfDet(respdata);
     console.log("Refef", respdata);
   } catch (error) {
     console.log("Error", error);
   }
 };

 useEffect(() => {
     getDataEmp();
 }, [profile]);

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
            <p className="border-b-2 text-slate-400 font-normal">{profDet?.empcode}</p>
          </div>
        </div>
        <div className="flex gap-8 pt-4 pl-2">
          <div className="pt-4 pl-4">
            <VscAccount className="text-blue-400" />
          </div>
          <div className="flex flex-col font-bold gap-2 flex-grow pr-20">
            <label>Employee Name: </label>
            <p className="border-b-2 text-slate-400 font-normal">{profDet?.fname}</p>
          </div>
        </div>
        <div className="flex gap-8 pt-4 pl-2">
          <div className="pt-4 pl-4">
            <FaAddressBook className="text-blue-400" />
          </div>
          <div className="flex flex-col font-bold gap-2 flex-grow pr-20">
            <label>Address: </label>
            <p className="border-b-2 text-slate-400 font-normal">{profDet?.caddress}</p>
          </div>
        </div>
        <div className="flex gap-8 pt-4 pl-2">
          <div className="pt-4 pl-4">
            <FaPhoneAlt className="text-blue-400" />
          </div>
          <div className="flex flex-col font-bold gap-2 flex-grow pr-20">
            <label>Contact Mobile: </label>
            <p className="border-b-2 text-slate-400 font-normal">{profDet?.phone_number}</p>
          </div>
        </div>
        <div className="flex gap-8 pt-4 pl-2">
          <div className="pt-4 pl-4">
            <MdEmail className="text-blue-400" />
          </div>
          <div className="flex flex-col font-bold gap-2 flex-grow pr-20">
            <label>E-Mail ID: </label>
            <p className="border-b-2 text-slate-400 font-normal">{profDet?.pemail}</p>
          </div>
        </div>
        <div className="flex gap-8 pt-4 pl-2">
          <div className="pt-4 pl-4">
            <BsFilePerson className="text-blue-400" />
          </div>
          <div className="flex flex-col font-bold gap-2 flex-grow pr-20">
            <label>Role: </label>
            <p className="border-b-2 text-slate-400 font-normal">{profDet?.role}</p>
          </div>
        </div>
        <div className="flex gap-8 pt-4 pl-2">
          <div className="pt-4 pl-4">
            <MdLocationCity className="text-blue-400" />
          </div>
          <div className="flex flex-col font-bold gap-2 flex-grow pr-20">
            <label>Territory Name: </label>
            <p className="border-b-2 text-slate-400 font-normal">{profDet?.t_id_desig}</p>
          </div>
        </div>
        <div className="flex gap-8 pt-4 pl-2">
          <div className="pt-4 pl-4">
            <VscAccount className="text-blue-400" />
          </div>
          <div className="flex flex-col font-bold gap-2 flex-grow pr-20">
            <label>Development Manager: </label>
            <p className="border-b-2 text-slate-400 font-normal">{profDet?.dev_manager}</p>
          </div>
        </div>
        <div className="flex gap-8 pt-4 pl-2">
          <div className="pt-4 pl-4">
            <VscAccount className="text-blue-400" />
          </div>
          <div className="flex flex-col font-bold gap-2 flex-grow pr-20">
            <label>Zone Development Manager: </label>
            <p className="border-b-2 text-slate-400 font-normal">{profDet?.zdev_manager}</p>
          </div>
        </div>
        <div className="flex gap-8 pt-4 pl-2">
          <div className="pt-4 pl-4">
            <VscAccount className="text-blue-400" />
          </div>
          <div className="flex flex-col font-bold gap-2 flex-grow pr-20">
            <label>Reporting Manager: </label>
            <p className="border-b-2 text-slate-400 font-normal">{profDet?.rp_manager}</p>
          </div>
        </div>
        <div className="flex gap-8 pt-4 pl-2">
          <div className="pt-4 pl-4">
            <HiOutlineBuildingOffice2 className="text-blue-400" />
          </div>
          <div className="flex flex-col font-bold gap-2 flex-grow pr-20">
            <label>Reporting Office: </label>
            <p className="border-b-2 text-slate-400 font-normal">{profDet?.reporting_hq}</p>
          </div>
        </div>
        <div className="flex gap-8 pt-4 pl-2">
          <div className="pt-4 pl-4">
            <MdDateRange className="text-blue-400" />
          </div>
          <div className="flex flex-col font-bold gap-2 flex-grow pr-20">
            <label>Agreement Start Date: </label>
            <p className="border-b-2 text-slate-400 font-normal">{moment(profDet?.agg_startdate).format("DD/MM/Y")}</p>
          </div>
        </div>
        <div className="flex gap-8 pt-4 pl-2">
          <div className="pt-4 pl-4">
            <MdDateRange className="text-blue-400" />
          </div>
          <div className="flex flex-col font-bold gap-2 flex-grow pr-20">
            <label>Agreement End Date: </label>
            <p className="border-b-2 text-slate-400 font-normal">{moment(profDet?.agg_enddate).format("DD/MM/Y")}</p>
          </div>
        </div>
        <div className="flex gap-8 pt-4 pl-2">
          <div className="pt-4 pl-4">
            <SiStatuspal className="text-blue-400" />
          </div>
          <div className="flex flex-col font-bold gap-2 flex-grow pr-20">
            <label>Status: </label>
            <p className="border-b-2 text-slate-400 font-normal">{profDet?.status}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
