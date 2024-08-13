import React, { useState, useEffect, useRef } from "react";
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
import { Popover } from "@headlessui/react";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { BsCalendar2Month } from "react-icons/bs";
import { IoTodayOutline } from "react-icons/io5";
import { GiFarmer } from "react-icons/gi";
import { FaHandsHelping } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { Dialog, Transition } from "@headlessui/react";
import Select from "react-select";
import Profile from "../../public/userimg.jpg";
import { MdOutlineTimer } from "react-icons/md";
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

  const [userDetails, setUserDetails] = useState({
    lastPunchIn: "",
    attendanceType: "",
    reason: "",
    attendanceId: "",
  });
  const [attendenceStatus, setAttendenceStatus] = useState("Punch In");
  const getAttandenceStatus = async () => {
    try {
      const respond = await axios.get(`${url}/api/get_emp_attendance`, {
        headers: headers,
        params: {
          emp_code: localStorageItems.empCode,
          t_id: localStorageItems.tId,
          c_id: Number(localStorageItems.cId),
          date: moment(new Date()).format("YYYY-MM-DD"),
        },
      });
      const apires = await respond.data.data;
      if (apires) {
        setAttendenceStatus("Punch Out");
        setUserDetails({
          ...userDetails,
          lastPunchIn: apires.punch_in_time,
          attendanceType: "Punch Out",
          attendanceId: apires.attendance_id,
        });
      } else {
        setAttendenceStatus("Punch In");
        setUserDetails({
          ...userDetails,
          attendanceType: "Punch In",
        });
      }
    } catch (error) {
      if(error.response.status === 404){
        setAttendenceStatus("Punch In");
      setUserDetails({
        ...userDetails,

        attendanceType: "Punch In",
      });
      }else {
return
      }
      
    }
  };
  useEffect(() => {
    getAttandenceStatus();
  }, [localStorageItems]);

  const handlePunchIn = async (type) => {
    try {
      let data = {};
      let header;
      if (type === "PI") {
        header = "punch_in";
        data = {
          user_id: localStorageItems.uId,
          user_name: localStorageItems.clName,
          t_id: localStorageItems.tId,
          c_id: Number(localStorageItems.cId),
          emp_code: localStorageItems.empCode,
          branchCode: 1231,
          date: moment(new Date()).format("YYYY-MM-DD"),
          attendance_type: userDetails.attendanceType,
          punch_in_time: new Date(),
          punch_in_image: "https://picsum.photos/200/300",
          status: "PI",
          reason: userDetails.reason,
        };
      } else {
        header = `punch_out/${userDetails.attendanceId}`;
        data = {
          user_id: localStorageItems.uId,
          user_name: localStorageItems.clName,
          t_id: localStorageItems.tId,
          c_id: Number(localStorageItems.cId),
          emp_code: localStorageItems.empCode,
          branchCode: 1231,
          date: moment(new Date()).format("YYYY-MM-DD"),
          attendance_type: userDetails.attendanceType,
          punch_out_time: new Date(),
          punch_out_image: "https://picsum.photos/200/300",
          status: "PO",
          reason: userDetails.reason,
        };
      }
      if (type === "PI") {
        const respond = await axios
          .post(`${url}/api/${header}`, JSON.stringify(data), {
            headers: headers,
          })
          .then((res) => {
            if (!res) return;
            router.push({
              pathname: "/MR_Portal_Apps/MRHome",
            })
            toast.success(res.data.message);

            getAttandenceStatus();
          });
      } else {
        const respond = await axios
          .put(`${url}/api/${header}`, JSON.stringify(data), {
            headers: headers,
          })
          .then((res) => {
            router.push({
              pathname: "/MR_Portal_Apps/MRHome",
            })
            if (!res) return;      
            toast.success(res.data.message);
          
            getAttandenceStatus();
          });
      }
    } catch (errors) {
    
      const errorMessage = errors?.response?.data?.message;

      toast.error(errorMessage);
    }
  };
  let PunchInTimeString= moment(new Date()).format("DD-MM-YYYY h:mm A") 
  return (
    <form
      className=" bg-white rounded  w-full  overflow-auto pb-4"
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="w-full flex h-12 bg-white-800 justify-between items-center px-4  shadow-lg lg:flex-col  ">
        <span className="text-black flex flex-row gap-4 font-bold   ">
          <FaArrowLeftLong
            className="self-center "
            onClick={() =>{
              router.push({
                pathname: "/MR_Portal_Apps/MRHome",
              })
              
            }
              
            }
          />
          <span>My Attendence</span>
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
                    <li
                      className="hover:bg-gray-100 px-2 py-1 rounded-md flex flex-row gap-2  items-center "
                      onClick={() =>
                        router.push({
                          pathname: "/MR_Portal_Apps/MyTimesheet",
                        })
                      }
                    >
                      <GiFarmer
                        className="text-[#626364] cursor-pointer"
                        size={20}
                      />{" "}
                      Timesheet
                    </li>
                    
                  </ul>
                </Popover.Panel>
              </>
            )}
          </Popover>
        </span>
      </div>
      <Toaster position="bottom-center" reverseOrder={false} />
      <div className="flex flex-col gap-2 p-1.5 ">
        <div className="">
          <h1 className="font-bold ">Employee Details:</h1>
          <div className="flex mb-4 mt-2">
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
        </div>
        {attendenceStatus === "Punch In" ? (
          <h1 className="text-xl font-bold  flex w-full  justify-center border-b-4 border-blue-800 shadow-xl ">
            Punch-In {PunchInTimeString}
          </h1>
        ) : (
          <h1 className="text-xl font-bold  flex w-full  mt-2 justify-center border-b-4 border-blue-800 shadow-xl ">
            Punch-Out
          </h1>
        )}
        <h1 className=" font-bold flex w-full justify-center h-8  border p-1  shadow-xl">
          Last Punch In :{" "}
          {attendenceStatus === "Punch In"
            ? "Not Available"
            : moment(userDetails.lastPunchIn).format("LLL")}
        </h1>

        <div>
          <label htmlFor="attendanceType" className="block font-bold mb-2">
            Attendance Type:
          </label>
          <select
            id="attendanceType"
            className="w-full border p-2 rounded"
            value={userDetails.attendanceType}
            disabled={userDetails.attendanceType === "Punch In" || userDetails.attendanceType === "Punch Out"}
            onChange={(e) =>
              setUserDetails({
                ...userDetails,
                attendanceType: e.target.value,
              })
            }
          >
            <option value="">Select Attendance Type</option>
            <option value="Punch In">Punch In</option>
            <option value="Punch Out">Punch Out</option>
            <option value="Weekly Off">Weekly Off</option>
          </select>
        </div>

        <div className="flex w-full  border my-2  shadow-xl">
          <button className="text-sm font-bold py-1 rounded-md   flex  flex-row w-full justify-center h-8 ">
            Take Selfie
          </button>
          <FaCameraRetro
            size={10}
            className="mr-4 text-black  self-center justify-self-end  size-120 text-blue-800"
          />
        </div>
        <div className="w-40 h-40 bg-gray-200 self-center "></div>
        <div className="flex flex-col gap-2  md:hidden">
          <label htmlFor="reason" className="block font-bold ">
            Reason for different Punch in/out date required:
          </label>
          <textarea
            id="reason"
            className="w-full border p-2 rounded"
            rows="1"
            value={userDetails.reason}
            onChange={(e) =>
              setUserDetails({
                ...userDetails,
                reason: e.target.value,
              })
            }
          ></textarea>
        </div>
        {attendenceStatus === "Punch In" ? (
          <div className="flex w-full justify-center">
            <button
              className="text-xl py-1 rounded-md    flex  flex-row  w-1/2 justify-center  border my-2 shadow-xl"
              onClick={() => handlePunchIn("PI")}
            >
              <MdOutlineTimer
                size={28}
                className="mr-4 text-black  self-center  size-120 text-blue-800"
              />
              Punch In
            </button>
          </div>
        ) : (
          <div className="flex w-full justify-center">
            <button
              className="text-xl py-1 rounded-md    flex  flex-row  w-1/2 justify-center  border my-2 shadow-xl"
              onClick={() => handlePunchIn("PO")}
            >
              <MdOutlineTimer
                size={28}
                className="mr-4 text-black  self-center  size-120 text-blue-800  md:hidden"
              />
              Punch Out
            </button>
          </div>
        )}

        <div className="flex  flex-col px-4 w-full  md:hidden">
          <div className="flex justify-between w-full gap-4">
            <p className="text-gray-800 font-bold text-sm">
              Reporting Manager <span className="self-end">: </span>
            </p>
            <p className="text-gray-800 text-sm">{localStorageItems.reportingManager}</p>
          </div>
          <div className="flex justify-between w-full gap-4 mt-2">
            <p className="text-gray-800 font-bold text-sm">
              Development Manager:
            </p>
            <p className="text-gray-800 text-sm">{localStorageItems.developmentManager}</p>
          </div>
          <div className="flex justify-between w-full gap-4 mt-2">
            <p className="text-gray-800 font-bold text-sm">
              HR Manager:
            </p>
            <p className="text-gray-800 text-sm">{localStorageItems.hrManager}</p>
          </div>
        </div>
      </div>
      
    </form>
  );
};

export default AdditionalInfo;

// Hydration  Issue
