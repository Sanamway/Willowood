import React, { useState, useEffect, Fragment } from "react";
import Image from "next/image";
import { BsCheck2Circle } from "react-icons/bs";
import { AiOutlineDelete } from "react-icons/ai";
import { FaUpload } from "react-icons/fa";
import { FaCameraRetro } from "react-icons/fa";
import { AiOutlineFileAdd } from "react-icons/ai";
import { url } from "@/constants/url";
import axios, { formToJSON } from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { useRouter } from "next/router";
import toast, { Toaster } from "react-hot-toast";
import Navbar from "@/components/MR_Portal_Apps/Navbar";
import { FaArrowAltCircleUp } from "react-icons/fa";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Popover, Switch } from "@headlessui/react";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";

import { GiFarmer } from "react-icons/gi";
import { FaHandsHelping } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";

import Profile from "../../public/userimg.jpg";
const AdditionalInfo = (props) => {
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
  });
  useEffect(() => {
    setLocalStorageItems({
      uId: JSON.parse(window.localStorage.getItem("uid")),
      cId: JSON.parse(window.localStorage.getItem("userinfo")).c_id,
      bgId: JSON.parse(window.localStorage.getItem("userinfo")).bg_id,
      buId: JSON.parse(window.localStorage.getItem("userinfo")).bu_id,
      rId: JSON.parse(window.localStorage.getItem("userinfo")).r_id,
      zId: JSON.parse(window.localStorage.getItem("userinfo")).z_id,
      tId: JSON.parse(window.localStorage.getItem("userinfo")).t_id,
      clName: window.localStorage.getItem("user_name"),
      ulName: window.localStorage.getItem("phone_number"),
      empCode: window.localStorage.getItem("emp_code"),
      roleId: JSON.parse(window.localStorage.getItem("userinfo")).role_id,
    });
  }, []);


   const [resignFormData , setResignFormData] = useState({
    resignReqDate: new Date(),
    noticePeriod:0,
    lwd: new Date(),
    reason:"",
    purposedLWD: new Date(),
    comment:""
   })
  const handleSaveResignation = async () => {
    const {resignReqDate,
        noticePeriod,
        lwd,
        reason,
        purposedLWD,
        comment} = resignFormData
    try {
      const data = {
       resignation_request_date:resignReqDate,
       notice_period_in_days: noticePeriod,
       last_working_date: lwd,
       reason: reason,
       proposed_lwd: purposedLWD,
       comment: comment,
       app_status:"Resignation Submitted"
      };
      const respond = await axios
        .post(`${url}/api/update_resignation`, JSON.stringify(data), {
            headers: headers,
            params: {
                emp_code: localStorageItems.empCode,
                c_id: localStorageItems.cId,
                app_status:"Resignation Submitted"
            }
         
        })
        .then((res) => {
          if (!res) return;
          toast.success(res.data.message);

          setResignFormData({
            
            resignReqDate: new Date(),
            noticePeriod:0,
            lwd: new Date(),
            reason:"",
            purposedLWD: new Date(),
            comment:""
          });
        });
    } catch (errors) {
      const errorMessage = errors?.response?.data?.message;

      toast.error(errorMessage);
      const newErrors = {};
      errors?.inner?.forEach((error) => {
        newErrors[error?.path] = error?.message;
      });
    }
  };
  return (
    <form
      className=" bg-white rounded  w-full   pb-4  fixed"
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="w-full flex h-12 bg-white-800 justify-between items-center px-4  shadow-lg lg:flex-col  ">
        <span className="text-black flex flex-row gap-4 font-bold   md:hidden ">
          <FaArrowLeftLong
            className="self-center "
            onClick={() =>
              router.push({
                pathname: "/MR_Portal_Apps/MRHome",
              })
            }
          />
          <span>  MR Resignation</span>
        </span>{" "}
        <span className="text-white self-center">
          <Popover as="div" className="relative border-none outline-none mt-2">
            {({ open }) => (
              <>
                <Popover.Button className="focus:outline-none">
                  <PiDotsThreeOutlineVerticalFill
                    className="text-[#626364] cursor-pointer"
                    size={20}
                  />
                </Popover.Button>

                <Popover.Panel
                  as="div"
                  className={`${
                    open ? "block" : "hidden"
                  } absolute z-40 top-1 right-0 mt-2 w-36 bg-white  text-black border rounded-md shadow-md`}
                >
                  <ul className=" text-black text-sm flex flex-col gap-4 py-4  font-Rale cursor-pointer ">
                    <li className="hover:bg-gray-100 px-2 py-1 rounded-md flex flex-row gap-2  items-center lg:hidden ">
                      <FaHandsHelping
                        className="text-[#626364] cursor-pointer"
                        size={20}
                      />{" "}
                      Help
                    </li>
                    <li className="hover:bg-gray-100 px-2 py-1 rounded-md flex flex-row gap-2  items-center lg:flex-col ">
                      <IoSettingsOutline
                        className="text-[#626364] cursor-pointer"
                        size={20}
                      />{" "}
                      Setting
                    </li>
                  </ul>
                </Popover.Panel>
              </>
            )}
          </Popover>
        </span>
      </div>
      <div className="flex mb-4 mt-2 mb-8">
        <div className="w-40 h-2  ">
          <Image
            className="  h-[7.1rem] w-[7.1rem] rounded-full   "
            src={Profile}
            alt="img"
          />
        </div>

        <div className="flex  flex-col px-4 w-full mt-4">
          <div className="flex   w-full  w-28">
            <div className="flex">
              <p className=" font-bold text-sm text-blue-800 w-20 whitespace-nowrap">
                Emp Code
              </p>
              <span>:</span>
            </div>
            <span className="text-wrap ml-4">{localStorageItems.empCode}</span>
          </div>
          <div className="flex  w-full  w-28 ">
            <div className="flex">
              <p className=" font-bold text-sm text-blue-800  w-20">Name</p>
              <span>:</span>
            </div>
            <span className="text-wrap ml-4"> {localStorageItems.clName}</span>
          </div>

          <div className="flex   w-full  w-28">
            <div className="flex">
              <p className=" font-bold text-sm text-blue-800 w-20">Branch</p>
              <span>:</span>
            </div>
            <span className="text-wrap ml-4">asfasdfa</span>
          </div>
        </div>
      </div>

      
      <div className="overflow-auto w-full px-3">
      <div className="flex flex-col gap-1 w-full px-2 pt-2">
          <label
            className="text-gray-700 text-sm font-bold mb-2 whitespace-nowrap"
            htmlFor="inputField"
          >
             Resignation Request Date <small className="text-red-600">*</small>
          </label>

          <DatePicker
            className="w-full px-3 py-1.5 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            dateFormat="dd-MM-yyyy"
            selected={resignFormData.resignReqDate}
            peekNextMonth
            showMonthDropdown
            onChange={(date)=> setResignFormData({...resignFormData , resignReqDate:date})}
            showYearDropdown
            dropdownMode="select"
          />
        </div>
        <div className="flex flex-col gap-1 w-full px-2 pt-2">
          <label
            className="text-gray-700 text-sm font-bold mb-2 whitespace-nowrap"
            htmlFor="inputField"
          >
             Notice Period in Days <small className="text-red-600">*</small>
          </label>

          <input
            className="w-full px-3 py-1.5 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type='number'
            value={resignFormData.noticePeriod}
            onChange={(e)=> setResignFormData({...resignFormData , noticePeriod:e.target.value})}
          />
        </div>
        <div className="flex flex-col gap-1 w-full px-2 pt-2">
          <label
            className="text-gray-700 text-sm font-bold mb-2 whitespace-nowrap"
            htmlFor="inputField"
          >
            Last Working Date <small className="text-red-600">*</small>
          </label>

          <DatePicker
            className="w-full px-3 py-1.5 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            dateFormat="dd-MM-yyyy"
            selected={resignFormData.lwd}
            peekNextMonth
            showMonthDropdown
            onChange={(date)=> setResignFormData({...resignFormData , lwd:date})}
            showYearDropdown
            dropdownMode="select"
          />
        </div>
        <div className="flex flex-col gap-1 w-full px-2 pt-2">
          <label
            className="text-gray-700 text-sm font-bold mb-2 whitespace-nowrap"
            htmlFor="inputField"
          >
             Reason <small className="text-red-600">*</small>
          </label>

          <select
                         
                          className="w-full px-3 py-1.5 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                          id="userSelect"
                        value={resignFormData.reason}
                        onChange={(e)=> setResignFormData({...resignFormData , reason: e.target.value })}
                        >
                          <option
                            value={""}
                            className="focus:outline-none focus:border-b bg-white"
                          >
                            Reason
                          </option>
                          <option value="Subsistence Farming">
                            Subsistence Farming
                          </option>
                          <option value="Comercial Farming">
                            Comercial Farming
                          </option>
                          <option value="Home Farming">Home Farming</option>
                        </select>
          
        </div>
        <div className="flex flex-col gap-1 w-full px-2 pt-2">
          <label
            className="text-gray-700 text-sm font-bold mb-2 whitespace-nowrap"
            htmlFor="inputField"
          >
            Proposed LWD <small className="text-red-600">*</small>
          </label>

          <DatePicker
            className="w-full px-3 py-1.5 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            dateFormat="dd-MM-yyyy"
            selected={resignFormData.purposedLWD}
            peekNextMonth
            showMonthDropdown
            onChange={(date)=> setResignFormData({...resignFormData , purposedLWD:date})}
            showYearDropdown
            dropdownMode="select"
          />
        </div>
        <div className="flex flex-col gap-1 w-full px-2 pt-2">
         

          <textarea
                         
                          className="w-full px-2 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500 mt-2"
                          id="textareaField"
                          placeholder="Comment"
                          rows="3"
                          value={resignFormData.comment}
                          onChange={(e)=>setResignFormData({...resignFormData , comment: e.target.value})}
                         
                        ></textarea>
        </div>
      </div>

      <div className="mt-100  flex flex-row gap-2 justify-start lg:hidden px-3 mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center  text-white rounded-md border border-transparent bg-green-400 px-4 py-2 text-sm font-medium hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => handleSaveResignation()}
                    >
                      Submit
                    </button>

                    <button
                      type="button"
                      className="inline-flex justify-center text-white rounded-md border border-transparent bg-red-400 px-4 py-2 text-sm font-medium  hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => {
                     
                        router.push({
                          pathname: "/MR_Portal_Apps/MRHome",
                        });
                      }}
                    >
                      Close
                    </button>
                  </div>
      <div className="flex justify-end w-full">
        <FaArrowAltCircleUp
          size={42}
          className="self-center size-120 text-black-400 text-blue-400  "
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: "smooth", // Smooth scrolling animation
            })
          }
        />
      </div>
    </form>
  );
};

export default AdditionalInfo;

// Hydration Error Issue
