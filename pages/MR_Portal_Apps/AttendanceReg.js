import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { BsCheck2Circle } from "react-icons/bs";
import Profile from "../../public/userimg.jpg";
import Image from "next/image";
import { FaArrowAltCircleUp } from "react-icons/fa";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Popover, Switch } from "@headlessui/react";
import { FaHandsHelping } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { url } from "@/constants/url";
import { useRouter } from "next/router";
import axios, { formToJSON } from "axios";
import moment from "moment";
import toast, { Toaster } from "react-hot-toast";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { BsCalendar2Month } from "react-icons/bs";
import { IoTodayOutline } from "react-icons/io5";

import { GiFarmer } from "react-icons/gi";
const AtReg = () => {
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
  const [formData, setFormData] = useState({
    fromDate: "",
    startHours:   "06",
    startMinutes: "00",
    endHours: "23",
    endMinutes: "59",
    comments: "",
    optionSelected: "forgotIn", // default option
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const [listItem, setListItem] = useState([]);

  const getAttandenceStatus = async () => {
    try {
      const respond = await axios.get(`${url}/api/get_emp_attendance`, {
        headers: headers,
        params: {
          emp_code: window.localStorage.getItem("emp_code"),
          t_id: JSON.parse(window.localStorage.getItem("userinfo"))?.t_id,
          c_id: JSON.parse(window.localStorage.getItem("userinfo"))?.c_id,
          attendance_date_start: moment().startOf('month').format("YYYY-MM-DD"),
          attendance_date_end: moment().endOf('month').format("YYYY-MM-DD"),
        },
      });
  
      let apires = await respond.data.data;
  
      // Filter items with status "PI" or "A"
      const dateArray = apires
    ; // Extracting only the date
  
      setListItem(dateArray);
    } catch (error) {
      console.log(error);
    }
  };
  
  useEffect(() => {
    getAttandenceStatus();
  }, []);
  const [currentDateStatus, setCurrentDateStatus] = useState("");
  const [mrTimings, setMrTimings] = useState({
    punchIn:  "",
    punchOut: ""
  });
  useEffect(() => {   
    if (formData.fromDate) {
      // Convert formData.fromDate to YYYY-MM-DD format
      formData.fromDate.setHours(formData.fromDate.getHours() + 5);
      formData.fromDate.setMinutes(formData.fromDate.getMinutes() + 30);
      const selectedDate = new Date(formData.fromDate).toISOString().split("T")[0]; // Extract date part (YYYY-MM-DD)
  
      // Find matching date in listItem
      const matchingItem = listItem.find(item => {

        const itemDate = new Date(item.date).toISOString().split("T")[0];
         // Convert item.date to YYYY-MM-DD   
        return itemDate === selectedDate;  // Compare the date strings
      });
      console.log("zas", matchingItem)
      if (matchingItem) {
        setMrTimings({
          punchIn: matchingItem.punch_in_time,
          punchOut:  matchingItem.punch_out_time
        })
        setCurrentDateStatus(matchingItem.status);  // Set status if matching date is found
      } else {
        setCurrentDateStatus("No status found for this date");  // Set a default message if no match
      }
    }
  }, [formData.fromDate]);
  useEffect(()=>{
    if(!currentDateStatus) return
    if(currentDateStatus === "A"){
      setFormData({...formData, optionSelected: "both"})
    }
    else {
      setFormData({...formData, optionSelected: "forgotOut"})
    }

  },[
    currentDateStatus
  ])
 
  const handleSubmit = async() => {
   
    
    try {
      
      let dataUrl = "add_mr_ar";
      
      // Ensure formData.fromDate is a valid Date object
      const selectedDate = new Date(formData.fromDate);
  
      // Format the date to YYYY-MM-DD
      const formattedDate = selectedDate.toISOString().split("T")[0];
      let startDate = new Date(`${formattedDate} ${formData.startHours}:${formData.startMinutes}:00`);
      let endDate = new Date(`${formattedDate} ${formData.endHours}:${formData.endMinutes}:00`);
      
      // Define the offset in milliseconds (5 hours 30 minutes)
      const offsetMilliseconds = (5 * 60 + 30) * 60 * 1000; // 5 hrs and 30 mins in milliseconds
      
      // Add offset to start and end times
      startDate = new Date(startDate.getTime() + offsetMilliseconds);
      endDate = new Date(endDate.getTime() + offsetMilliseconds);
      let fileData = {
                  c_id: localStorageItems.cId,
                  date: new Date(formData.fromDate).toISOString().split("T")[0], // Keep the original date
                  start_time: startDate, // Date + start time
                  end_time:endDate, // Date + end time
                  emp_code: localStorageItems.empCode,
                  t_id: localStorageItems.tId,
                  regularization_type: formData.optionSelected,
                  remarks: formData.comments
                     };

     
      
  
      const respond = await axios
        .post(`${url}/api/${dataUrl}`, JSON.stringify( fileData ), {
          headers: headers,
        })
        .then((res) => {
          setFormData({
            fromDate: "",
            startHours:   "06",
            startMinutes: "00",
            endHours: "23",
            endMinutes: "59",
            comments: "",
            optionSelected: "forgotIn",
          })
          setMrTimings({
            punchIn:   "",
            punchOut:  ""
          })
          setCurrentDateStatus("");
          getAttendanceData()
          toast.success(res.data.message);
        });
    } catch (errors) {
      console.log("pop", errors)
      errors?.message&& toast.error(errors?.response?.data?.message);
      errors?.data?.message && toast.error(errors?.data?.message);
      console.log(errors);
    }
  };
  

 const [attendanceData , setAttendanceData] = useState({

 })
  const getAttendanceData = async () => {
    try {
      const respond = await axios.get(`${url}/api/get_mr_ar`, {
        headers: headers,
        params: {
          emp_code: localStorageItems.empCode,
          t_id: localStorageItems.tId,
          c_id: localStorageItems.cId,
        
        },
      });
      const apires = await respond.data.data;   
      console.log("zoz", respond)
      setAttendanceData(apires);
   
  
    } catch (error) {

     setAttendanceData([]);
    }
  };

  useEffect(()=>{
    getAttendanceData()
  },[localStorageItems])
//   console.log("zoz", attendanceData)
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
          <span>Attendance Regularization</span>
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
                      className="hover:bg-gray-100 px-2 py-1 rounded-md flex flex-row gap-2   items-center whitespace-nowrap "
                      onClick={() =>
                        router.push({
                          pathname: "/MR_Portal_Apps/MRHome",
                        })
                      }
                    >
                      <BsCalendar2Month
                        className="text-[#626364] cursor-pointer"
                        size={20}
                      />{" "}
                      Approval Req.
                    </li>
                   
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
      <hr className="bg-blue-600 h-2"/>
    <div className="w-full bg-yellow-200 px-2 text-bold flex flex-row justify-between w-full ">
    <div className="text-sm"><span className="font-bold">Punch In:</span>  {mrTimings.punchIn ? moment(mrTimings.punchIn).local().subtract(5, 'hours').subtract(30, 'minutes').format('hh:mm A') : "-"}</div>
    <div className="text-sm"><span className="font-bold">Punch Out:</span> {mrTimings.punchOut ? moment(mrTimings.punchOut).local().subtract(5, 'hours').subtract(30, 'minutes').format('hh:mm A') : "-"}</div>
   
    </div>
    <hr className="bg-blue-600 h-2"/>

  
    
    

     <div className="w-full p-4">
     <div className="mb-4">
         
          <div className="flex justify-between">
            <div>
              <input
                type="radio"
                id="forgotIn"
                name="optionSelected"
                value="forgotIn"
                checked={formData.optionSelected === "forgotIn"}
                onChange={handleChange}
             
              />
              <label htmlFor="forgotIn" className="ml-2">
                Punch In
              </label>
            </div>
            <div>
              <input
                type="radio"
                id="forgotOut"
                name="optionSelected"
                value="forgotOut"
                checked={formData.optionSelected === "forgotOut"}
                onChange={handleChange}
             
              />
              <label htmlFor="forgotOut" className="ml-2">
                Punch Out
              </label>
            </div>
            <div>
              <input
                type="radio"
                id="both"
                name="optionSelected"
                value="both"
                checked={formData.optionSelected === "both"}
                onChange={handleChange}
               
              />
              <label htmlFor="both" className="ml-2">
                Both
              </label>
            </div>
          </div>
        </div>

     <div className="flex flex-row items-center mb-2">
 
          <label className="block text-gray-700 text-sm font-semibold  ">
            Date
          </label>
          <DatePicker
            selected={formData.fromDate}
            onChange={(date) => setFormData({ ...formData, fromDate: date })}
            dateFormat="dd/MM/yyyy"
            className="w-1/2 px-2 border rounded-md focus:ring focus:border-blue-300 ml-2"
            minDate={new Date(new Date().getFullYear(), new Date().getMonth(), 1)}
            maxDate={new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)}
            includeDates={listItem
              .filter(item => item.status === "PI" || item.status === "A" || item.status === "HD")
              .map(item => new Date(item.date))}
          />
       

      
     </div>
       

           <div className="flex flex-row gap-4" >
            <div className="mb-4">
           <label className="block text-gray-700 text-sm font-semibold mb-2">
            Start Time
           </label>
          <div className="flex space-x-2">
            <input
              type="number"
               name="startHours"
              value={formData.startHours}
              onChange={handleChange}
              min="0"
              max="23"
              className="w-1/2 px-4 py-2 border rounded-md focus:ring focus:border-blue-300"
              placeholder="Hours"
            />
            <input
              type="number"
              name="startMinutes"
              value={formData.startMinutes}
              onChange={handleChange}
              min="0"
              max="59"
              className="w-1/2 px-4 py-2 border rounded-md focus:ring focus:border-blue-300"
              placeholder="Minutes"
            />
          </div>
        </div>
        <div>

        <label className="block text-gray-700 text-sm font-semibold mb-2">
            End Time
          </label>
          <div className="flex space-x-2">
            <input
              type="number"
              name="endHours"
              value={formData.endHours}
              onChange={handleChange}
              min="0"
              max="23"
              className="w-1/2 px-4 py-2 border rounded-md focus:ring focus:border-blue-300"
              placeholder="Hours"
            />
            <input
              type="number"
              name="endMinutes"
              value={formData.endMinutes}
              onChange={handleChange}
              min="0"
              max="59"
              className="w-1/2 px-4 py-2 border rounded-md focus:ring focus:border-blue-300"
              placeholder="Minutes"
            />
        </div>
        </div>
   
      
        
        
        
           </div>
     
        

     
        <div className="mb-4">

          <label className="block text-gray-700 text-sm font-semibold mb-2">
            Comments
          </label>
          <textarea
            name="comments"
            value={formData.comments}
            onChange={handleChange}
            className="w-full px-4 border rounded-md focus:ring focus:border-blue-300"
            placeholder="Enter comments"
          >
            
          </textarea>
        </div>
        <div className="flex justify-end">

        <div className="text-sm font-bold"><span className="font-bold">AR Balance:</span> {attendanceData.arcount}/Monthly</div>
</div>
     </div>
        <button
          type="submit"
          className="w-full p-4 bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition duration-300"
          onClick={()=> handleSubmit()}
       >
          Submit 
        </button>
      </form>
    
  );
};

export default AtReg;
