import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { BsCheck2Circle } from "react-icons/bs";
import Profile from "../../public/userimg.jpg";
import Image from "next/image";
import { FaArrowAltCircleUp } from "react-icons/fa";
import { FaCheckCircle, FaExclamationTriangle, FaClock } from "react-icons/fa";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Popover, Switch } from "@headlessui/react";
import { FaHandsHelping } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { url } from "@/constants/url";
import { useRouter } from "next/router";
import axios, { formToJSON } from "axios";
import moment from "moment";
import toast, { Toaster } from "react-hot-toast";
const AtReq = () => {
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
        tDes:""
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
          tDes:JSON.parse(window.localStorage.getItem("userinfo")).territory_name,
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


  

 
 
 
 
 

  

  const [attendanceData , setAttendanceData] = useState([])

  const getAttendanceData = async () => {
    try {
      const respond = await axios.get(`${url}/api/get_mr_ar`, {
        headers: headers,
        params: {
            from:  moment().startOf('month').format("YYYY-MM-DD[T00:00:00.000Z]"),
            to: moment().endOf('month').format("YYYY-MM-DD[T00:00:00.000Z]"),  
            emp_code: localStorageItems.empCode,
            c_id:   localStorageItems.cId,
            excel: true, 
        },
      });
      const apires = await respond.data.data;  
      setAttendanceData(apires); 
    } catch (error) {

     setAttendanceData([]);
    }
  };

  useEffect(()=>{
    getAttendanceData()
  },[localStorageItems])
  const getStatusIcon = (verified, approved) => {
    if (verified && approved) {
        return (
            <div className="flex items-center gap-1">
                <FaCheckCircle className="text-green-500" />
                <span className="text-sm font-semibold text-green-500">Verified</span>
                <FaCheckCircle className="text-green-500 ml-4" />
                <span className="text-sm font-semibold text-green-500">Approved</span>
            </div>
        );
    } else if (verified && !approved) {
        return (
          <div className="flex items-center gap-1">
          <FaCheckCircle className="text-green-500" />
          <span className="text-sm font-semibold text-green-500">Verified</span>
          <FaClock className="text-red-500" />
          <span className="text-sm font-semibold text-red-500">Approved</span>
      </div>
        );
    }
    else if (!verified && approved) {
      return (
        <div className="flex items-center gap-1">
         <FaClock className="text-red-500" />
        <span className="text-sm font-semibold text-red-500">Verified</span>
        <FaCheckCircle className="text-green-500 ml-4" />
                <span className="text-sm font-semibold text-green-500">Approved</span>
    </div>
      );
  }
  
    
    else {
        return (
            <div className="flex items-center gap-1">
                <FaExclamationTriangle className="text-red-500" />
                <span className="text-sm font-semibold text-red-500">Pending</span>
            </div>
        );
    }
};
  return (
    <form
      className=" bg-white rounded  w-full  overflow-auto pb-4"
      onSubmit={(e) => e.preventDefault()}
    >
          <Toaster position="bottom-center" reverseOrder={false} />
      <div className="w-full flex h-12 bg-white-800 justify-between items-center px-4  shadow-lg lg:flex-col  ">
        <span className="text-black flex flex-row gap-4 font-bold   ">
          <FaArrowLeftLong
            className="self-center "
            onClick={() =>
              router.push({
                pathname: "/MR_Portal_Apps/AttendanceReg",
              })
            }
          />
          <span>My Pending Approval </span>
        </span>{" "}
        <span className="text-white self-center">
          <Popover as="div" className="relative border-none outline-none mt-2">
            {({ open }) => (
              <>
                <Popover.Button className="focus:outline-none">
                </Popover.Button>
                <Popover.Panel
                  as="div"
                  className={`${
                    open ? "block" : "hidden"
                  } absolute z-40 top-1 right-0 mt-2 w-36 bg-white  text-black border rounded-md shadow-md`}
                >
                  <ul className=" text-black text-sm flex flex-col gap-4 py-4  font-Rale cursor-pointer ">
                    <li className="hover:bg-gray-100 px-2 py-1 rounded-md flex flex-row gap-1  items-center lg:hidden ">
                      <FaHandsHelping
                        className="text-[#626364] cursor-pointer"
                        size={20}
                      />{" "}
                      Help
                    </li>
                    <li className="hover:bg-gray-100 px-2 py-1 rounded-md flex flex-row gap-1  items-center lg:flex-col ">
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
          {attendanceData.map((attendance, index) => {
                const attendanceDate = moment(attendance.date).format("DD MMM YYYY");
                const reqDate = moment(attendance.createdAt).format("DD MMM YYYY");
                const punchIn = moment(attendance.start_time).subtract(5, 'hours')
                .subtract(30, 'minutes').format("hh:mm A");
                const punchOut =moment(attendance.end_time).subtract(5, 'hours')
                .subtract(30, 'minutes').format("hh:mm A");
                const totalHours = moment(attendance.end_time).diff(moment(attendance.start_time), 'hours', true).toFixed(2);

                return (
                    <div key={index} className="ticket w-full bg-white shadow-lg p-4 mb-4 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex flex-row items-center gap-2">
                            <h3 className="text-lg font-semibold ">Att. Date: </h3><p className="text-blue-500 font-bold">{attendanceDate}</p>
                            </div>
                            {getStatusIcon(attendance.verified.toLowerCase() === "yes", attendance.approved.toLowerCase() === "yes")}
                        </div>
                        <hr className="border-blue-500 mb-4" />
                        <div className="grid grid-cols-2 gap-y-2 gap-x-4">
                            <div className="flex items-center">
                                <span className="text-sm font-semibold text-black">Punch In:</span>
                                <span className="text-sm ml-2">{punchIn}</span>
                            </div>
                            <div className="flex items-center">
                                <span className="text-sm font-semibold text-black">Punch Out:</span>
                                <span className="text-sm ml-2">{punchOut}</span>
                            </div>
                            <div className="flex items-center">
                                <span className="text-sm font-semibold text-black">Total Hours:</span>
                                <span className="text-sm ml-2">{totalHours} hrs</span>
                            </div>
                            <div className="flex items-center">
                                <span className="text-sm font-semibold text-black">Req. Date:</span>
                                <span className="text-sm ml-2">{reqDate}</span>
                            </div>
                        </div>
                    </div>
                );
            })}

  
      </form>
    
  );
};

export default AtReq;
