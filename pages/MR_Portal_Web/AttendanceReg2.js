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
    fromDate: new Date(),
    toDate: new Date(),
    startHours: "10",
    startMinutes: "30",
    endHours: "19",
    endMinutes: "00",
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

  const handleSubmit = async() => {
  
    
    console.log("Submitted data: ", formData);
    try {
        console.log("nop", formData ,  `${formData.startHours}:${formData.startMinutes}`)
        let dataUrl = "add_mr_ar";
        let fileData ={
            t_id: formData.tId,
            c_id:  formData.cId,
            from_date:  formData.fromDate,
       
            start_time: `${formData.startHours}:${formData.startMinutes}`,
            end_time: `${formData.endHours}:${formData.endMinutes}`,
            emp_code: localStorageItems.empCode,
            t_id: localStorageItems.tId,
            regularization_type: formData.optionSelected,
            remarks:formData.remarks
        }

      
        const respond = await axios
          .post(`${url}/api/${dataUrl}`, JSON.stringify({ data: fileData }), {
            headers: headers,
          })
          .then((res) => {
          toast.success("AR added successfully!");
          });
      } catch (errors) {}
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
          <span>Attendance Regularization</span>
        </span>{" "}
        <span className="text-white self-center">
          <Popover as="div" className="relative border-none outline-none mt-2">
            {({ open }) => (
              <>
                <Popover.Button className="focus:outline-none">
                  {/* <PiDotsThreeOutlineVerticalFill
                    className="text-[#626364] cursor-pointer"
                    size={20}
                  /> */}
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
    <div className="w-full bg-yellow-200 px-2 text-bold">
AR Count: {attendanceData.arcount}
    </div>
     <div className="w-full p-4">
     <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-2">
            Select Option
          </label>
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

     <div className="flex flex-row">
     <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-2">
            From Date
          </label>
          <DatePicker
            selected={formData.fromDate}
            onChange={(date) => setFormData({ ...formData, fromDate: date })}
            dateFormat="dd/MM/yyyy"
            className="w-full px-4 py-2 border rounded-md focus:ring focus:border-blue-300"
            minDate={new Date(new Date().getFullYear(), new Date().getMonth(), 1)}
            maxDate={new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)}
          />
        </div>

       
        
     </div>
       

         {/* Start Time */}
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
        
        <div className="mb-4">
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

        {/* Comments */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-2">
            Comments
          </label>
          <textarea
            name="comments"
            value={formData.comments}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:ring focus:border-blue-300"
            placeholder="Enter comments"
          ></textarea>
        </div>
     </div>
        {/* Radio Buttons for Options */}
       

        {/* Submit Button */}
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
