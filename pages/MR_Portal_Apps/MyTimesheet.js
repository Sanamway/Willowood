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
import { BsCalendar2Month } from "react-icons/bs";
import { IoTodayOutline } from "react-icons/io5";
import { GiFarmer } from "react-icons/gi";
import { FaHandsHelping } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { Dialog, Transition } from "@headlessui/react";
import Profile from "../../public/userimg.jpg";
import { SlCalender } from "react-icons/sl";

const AdditionalInfo = (props) => {
  const router = useRouter();
  const headers = {
    "Content-Type": "application/json",
    secret: "fsdhfgsfuiweifiowefjewcewcebjw",
  };
  const getLastDateOfCurrentMonth = () => {
    // Get the current date
    const now = moment();

    // Get the last date of the current month
    const lastDate = now.endOf("month").format("YYYY-MM-DD");

    return lastDate;
  };
  const getStartDateOfCurrentMonth = () => {
    // Get the current date
    const now = moment();

    // Get the last date of the current month
    const lastDate = now.startOf("month").format("YYYY-MM-DD");

    return lastDate;
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

  const [filterDate, setFilterDate] = useState({
    startDate: new Date(getStartDateOfCurrentMonth()),
    endDate: new Date(getLastDateOfCurrentMonth()),
  });
  const [listItems, setListItems] = useState([]);
  const getAttandenceStatus = async () => {
    try {
      const respond = await axios.get(`${url}/api/get_emp_attendance`, {
        headers: headers,
        params: {
          emp_code: localStorageItems.empCode,
          t_id: localStorageItems.tId,
          c_id: Number(localStorageItems.cId),
          attendance_date_start: moment(filterDate.startDate).format(
            "YYYY-MM-DD"
          ),
          attendance_date_end: moment(filterDate.endDate).format("YYYY-MM-DD"),
        },
      });
      const apires = await respond.data.data;
      setListItems(apires);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (localStorageItems) getAttandenceStatus();
  }, [localStorageItems]);
  const getStatus = (status) => {
  
    switch (status) {
      case "PI":
       return <div className="relative flex w-12 h-12 rounded-full overflow-hidden justify-center items-center text-center font-bold text-2xl">
         <div className="absolute inset-0" style={{background: "linear-gradient(to right, red 50%, green 50%)"}}></div>
         <div className="relative z-10 text-white">
           {status}
         </div>
       </div>
        break;
      case "P":
       return <div className="flex w-12 h-12 bg-green-200 rounded-full self-center    justify-center  items-center text-center font-bold  text-2xl">
          {status}
        </div>;
        break;

      case "A":
      return  <div className="flex w-12 h-12 bg-red-400 rounded-full self-center    justify-center  items-center text-center font-bold  text-2xl">
          {status}
        </div>;
        break;
      case "W":
       return <div className="flex w-12 h-12 bg-gray-200 rounded-full self-center    justify-center  items-center text-center font-bold  text-2xl">
          {status}
        </div>;
        break;
      case "L":
        return <div className="flex w-12 h-12 bg-yellow-200 rounded-full self-center    justify-center  items-center text-center font-bold  text-2xl">
          {status}
        </div>;
        break;
        case "PO":
         return <div className="flex w-12 h-12 bg-green-300 rounded-full self-center    justify-center  items-center text-center font-bold  text-2xl">
         {status}
       </div>;
          break;

          case "WO":
            return <div className="flex w-12 h-12 bg-purple-400 rounded-full self-center    justify-center  items-center text-center font-bold  text-2xl">
            {status}
          </div>;
             break;
             case "H":
              return <div className="flex w-12 h-12 bg-purple-400 rounded-full self-center    justify-center  items-center text-center font-bold  text-2xl">
              {status}
            </div>;
               break;
      default:
       return <div className="flex w-12 h-12 rounded-full self-center    justify-center  items-center text-center font-bold  text-2xl">
          {status}
        </div>;
        break;
    }
  };
  return (
    <form
      className=" bg-white rounded  w-full  overflow-auto pb-4"
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="w-full flex h-12 bg-white-800 justify-between items-center px-4  shadow-lg lg:flex-col  ">
        <span className="text-black flex flex-row gap-4 font-bold   ">
          <FaArrowLeftLong
            className="self-center "
            onClick={() =>
              router.push({
                pathname: "/MR_Portal_Apps/MRHome",
              })
            }
          />
          <span>Employee Timesheet</span>
        </span>{" "}
        
      </div>
      <div className="flex mb-4 mt-2 mb-8">
      <div className="w-40 h-30 flex justify-center items-center">
              <Image
                className="h-[5.1rem] w-[5.1rem] rounded-full mt-2"
                src={Profile}
                alt="img"
              />
            </div>

        <div className="flex  flex-col  w-full mt-4 md:hidden">
              <div className="flex w-full  w-28">
                <div className="flex">
                  <p className=" font-bold text-sm text-blue-800 w-28">
                    Emp Code
                  </p>
                  <span>:</span>
                </div>
                <span className="w-28 ml-3">{localStorageItems.empCode}</span>
              </div>
              <div className="flex   w-full  w-28 ">
                <div className="flex">
                  <p className=" font-bold text-sm text-blue-800 w-28">Name</p>
                  <span>:</span>
                </div>
                <span className="w-28 ml-3 whitespace-nowrap"> {localStorageItems.clName}</span>
              </div>

              <div className="flex w-full  w-28">
                <div className="flex">
                  <p className=" font-bold text-sm text-blue-800 w-28">
                    Reporting HQ
                  </p>
                  <span>:</span>
                </div>
                <span className="w-28 ml-3">{localStorageItems.reportingHQ}</span>
              </div>

            </div>
      </div>

      <h1 className="text-xl font-bold  flex w-full justify-center border-t-4 border-blue-800 shadow-xl mb-4">
        Employee Attendance Report
      </h1>
      <div className="flex flex-row gap-2 w-full justify-between">
        <span>
          <DatePicker
            className="w-full px-3 py-1.5 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            dateFormat="dd-MM-yyyy"
            selected={filterDate.startDate}
            onChange={(date) =>
              setFilterDate({
                ...filterDate,
                startDate: date,
              })
            }
            peekNextMonth
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
          />
        </span>
        <span>
          <DatePicker
            className="w-full px-3 py-1.5 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            dateFormat="dd-MM-yyyy"
            peekNextMonth
            showMonthDropdown
            selected={filterDate.endDate}
            onChange={(date) =>
              setFilterDate({
                ...filterDate,
                endDate: date,
              })
            }
            showYearDropdown
            dropdownMode="select"
          />
        </span>
        <span className="self-center p-2">
          <button
            className="bg-sky-900 text-white px-2 py-1"
            onClick={() => getAttandenceStatus()}
          >
            View
          </button>
        </span>
      </div>

      {listItems.map((item) => (
        <div className="text-xl   flex w-full justify-around h-22   shadow-xl flex">
          <div className="flex gap-2 py-2 px-4 py-4  ">
            <SlCalender className=" h-12 w-8 self-center" />
            <div className="flex flex-col self-center ">
              <span className="font-bold text-sm">
                {moment(item.date).format("DD MMM YYYY")}
              </span>
              <span className="text-sm">
                {moment(item.date).format("dddd")}
              </span>
            </div>
          </div>
          {getStatus(item.status)}

          <div className="flex flex-row p-2 gap-4 ">
            <div className="flex flex-col self-center gap-2">
              <span className="text-sm  ">Punch In : </span>
              <span className="text-sm text-blue-400 font-bold">
                Punch Out:
              </span>
            </div>
            <div className="flex flex-col self-center gap-2 ">
              <span className="font-bold text-sm h-6  border-2 border-black-500  text-black-400 whitespace-nowrap px-2">
                {moment(item.punch_in_time).format("hh:mm A")}
              </span>
              <span className="font-bold text-sm h-6  border-2 border-black-500 bg-sky-900 text-white whitespace-nowrap px-2">
                {item.punch_out_time
                  ? moment(item.punch_out_time).format("hh:mm A")
                  : "-"}
              </span>
            </div>
          </div>

          <div className="flex flex-col  text-sm gap-2"></div>
        </div>
      ))}
        <div className="fixed bottom-12 right-9  rounded-full animate-pulse z-9999 ">
        <FaArrowAltCircleUp
          size={42}
          className="self-center size-120 text-black-400 text-blue-400 "
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
