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

  
  const [formData, setFormData] = useState({ 
    dateTime:new Date(),
    material:"",
    anySepc:"",
    purposeMat:"",
    priority:"",
    currentStock:"",
    requreidQty:"",
    deliveryDate:null
   });
 const [miCode , setMiCode] = useState("")
   const generateEmpCode = async () => {
    try {
      const respond = await axios.get(`${url}/api/get_demo_code`, {
        headers: headers,
        params: {
          emp_code: window.localStorage.getItem("emp_code"),
          type: "mi",
        },
      });
      const apires = await respond.data.data;
      setMiCode(apires);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    generateEmpCode();
  }, []);

  const handleSubmit = async () => {
    try {
      const data = {
        mi_no:miCode,
        indent_req_date:new Date(),
        current_date:new Date(),
        material_pop_require:formData.material,
        any_specification_of_material:formData.anySepc,
  
        purpose_of_material:formData.purposeMat,
        priority:formData.priority,
  
        current_stock_qty:formData.currentStock,
        required_qty:formData.requreidQty,
        status:"Pending for Approval",
        delivery_date:formData.deliveryDate,
        t_id: JSON.parse(window.localStorage.getItem("userinfo")).t_id,
        c_id:JSON.parse(window.localStorage.getItem("userinfo")).c_id,
        emp_code: window.localStorage.getItem("emp_code"),
      };

      const respond = await axios
        .post(`${url}/api/add_material_indent`, JSON.stringify(data), {
          headers: headers,
        })
        .then((res) => {
          if (!res) return;
          console.log("kiol", res)
          toast.success(res.data.message);
          setFormData({  dateTime:new Date(),
            material:"",
            anySepc:"",
            purposeMat:"",
            priority:"",
            currentStock:"",
            requreidQty:"",
            deliveryDate:null });
            generateEmpCode();
        });
       
    } catch (errors) {
      const errorMessage = errors?.response?.data?.message;
      
        generateEmpCode();
      toast.error(errorMessage);
     
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
            onClick={() =>{
              router.push({
                pathname: "/MR_Portal_Apps/MRHome",
              })
              
            }
              
            }
          />
          <span>Generate Material Indent</span>
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
                    <li
                      className="hover:bg-gray-100 px-2 py-1 rounded-md flex flex-row gap-2  items-center "
                      onClick={() =>
                        router.push({
                          pathname: "/MR_Portal_Apps/MR_MaterialIndentList",
                        })
                      }
                    >
                      <GiFarmer
                        className="text-[#626364] cursor-pointer"
                        size={20}
                      />{" "}
                      Indent List
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
          <h1 className="font-bold ">Employee Details : </h1>
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
<div className="flex flex-row gap-1">
<div className="flex flex-col gap-1">
 <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="inputField"
          >
            <small className="text-red-600">*</small> MI Code 
          </label>        
          <input
            className="w-max px-3  border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            placeholder="MI Code"
            value={miCode}
          />
 </div>

 <div className="flex flex-col gap-1">
 <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="inputField"
          >
            <small className="text-red-600">*</small> Indent Request Date 
          </label>
          
          <DatePicker
           className="w-full px-3   border-b border-gray-500  bg-white focus:outline-none focus:border-b focus:border-indigo-500"
           dateFormat="dd-MM-yyyy"         
            selected={
              formData.dateTime ? new Date(formData.dateTime) : ""
            }
            onChange={(date) =>
              setFormData({
                ...formData,
                dateTime: moment(date).format("LL"),
              })
            }
            minDate={new Date()}
            peekNextMonth
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            disabled
            
          />    
 </div>
</div>
        

 
 <div className="flex flex-col gap-q">
 <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
            <small className="text-red-600">*</small> Material / POP Require
          </label>
          <textarea
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            value={formData.material}
            onChange={(e)=> setFormData({...formData, material: e.target.value})}
          
          />

<label className="block text-gray-700 text-sm font-bold mb-2 mt-2" htmlFor="inputField">
            <small className="text-red-600">*</small> Any Specification of Material
          </label>
          <textarea
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="ield"
            value={formData.anySepc}
            onChange={(e)=> setFormData({...formData, anySepc: e.target.value})}
          
          />

<div className="flex flex-row w-full justify-between">
<label className="block text-gray-700 text-sm font-bold mb-2 mt-2" htmlFor="inputField">
            <small className="text-red-600">*</small> Purpose of Material
          </label>

          <div className="flex flex-row gap-2 text-gray-700 text-sm mb-2 mt-2 w-1/2">

          <label
            className="flex flex-row gap-1 text-gray-700 text-sm font-bold   "
            htmlFor="inputField"
          >
            <small className="text-red-600 ">*</small>Priority :
          </label>
        
          <select
            className=" border-b border-gray-500 w-28  bg-white focus:outline-none focus:border-b focus:border-indigo-500"
            id="stateSelect"
            value={formData.priority}
            onChange={(e)=> setFormData({...formData, priority: e.target.value})}
        
          >
            <option
              value=""
              className="focus:outline-none focus:border-b bg-white"
            >
              Select
            </option>
            
            
              <option
             
              value={"High"}
            
                className="focus:outline-none focus:border-b bg-white"
              >
               High
              </option>
              <option
             
             value={"Medium"}
           
               className="focus:outline-none focus:border-b bg-white"
             >
             Medium
             </option>
             <option
             
             value={"Low"}
           
               className="focus:outline-none focus:border-b bg-white"
             >
              Low
             </option>

           
          </select>

        </div>     
</div>

          <textarea
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="number"
            id="inputField"
            value={formData.purposeMat}
            onChange={(e)=> setFormData({...formData, purposeMat: e.target.value})}
        
          
          />
<div className="w-full flex flex-row gap-2">
<div className="flex flex-col gap-1">
<label className="block text-gray-700 text-sm font-bold mb-2 mt-2" htmlFor="inputField">
            <small className="text-red-600">*</small> Current Stock Qty
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="number"
            id="inputField"
            value={formData.currentStock}
            onChange={(e)=> setFormData({...formData, currentStock: e.target.value})}
        
          
          />  
</div>
<div className="flex flex-col gap-1">
<label className="block text-gray-700 text-sm font-bold mb-2 mt-2" htmlFor="inputField">
            <small className="text-red-600">*</small> Required Qty
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            value={formData.requreidQty}
            onChange={(e)=> setFormData({...formData, requreidQty: e.target.value})}
        
          />  
</div>
<div className="flex flex-col gap-1">
<label className="block text-gray-700 text-sm font-bold mb-2 mt-2" htmlFor="inputField">
            <small className="text-red-600">*</small> Delivery Date
          </label>
          <DatePicker
              className="w-full px-3 py-1.5 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
              dateFormat="dd-MM-yyyy"  
              selected={
                formData.deliveryDate ? new Date(formData.deliveryDate) : ""
              } 
              onChange={(date) =>
                setFormData({
                  ...formData,
                  deliveryDate: moment(date).format("LL"),
                })
              }
              peekNextMonth
              showMonthDropdown  
              showYearDropdown
              dropdownMode="select"
          />
</div>


</div>
<div className="flex flex-row gap-2 w-full py-3">
<label
            className="flex flex-row gap-1 text-gray-700 text-sm font-bold   "
            htmlFor="inputField"
          >
            <small className="text-red-600 ">*</small>Status :
          </label>
        
          <select
            className=" border-b border-gray-500 w-[80%]  bg-white focus:outline-none focus:border-b focus:border-indigo-500"
            id="stateSelect"
            value={"Pending for Approval"}
            
        
          >
            <option
              value=""
              className="focus:outline-none focus:border-b bg-white"
            >
              Select
            </option>
            
            
              <option
             
              value={"Pending for Approval"}
            
                className="focus:outline-none focus:border-b bg-white"
              >
             Pending for Approval
              </option>
            

           
          </select>
</div>
<div className="flex w-full justify-center gap-4 mt-4 ">
        <button
          onClick={() => {    
         handleSubmit()
          }}
          className="bg-green-500 flex items-center justify-center whitespace-nowrap text-white px-2 py-1.5 rounded-sm"
        >
          Submit
        </button>
        <button
          onClick={() =>
            router.push({
              pathname: "/MR_Portal_Apps/MRHome",
            })
          }
          className="bg-green-500 flex items-center justify-center whitespace-nowrap text-white px-2 py-1.5 rounded-sm"
        >
          Close
        </button>
      </div>
      
 </div>

       
     
    

    

   
      
       
       

       
      </div>
      
    </form>
  );
};

export default AdditionalInfo;

// Hydration  Issue
