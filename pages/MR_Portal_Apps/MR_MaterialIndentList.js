import React, { useState, useEffect, Fragment } from "react";

import { url } from "@/constants/url";
import axios from "axios";
import { useRouter } from "next/router";
import toast, { Toaster } from "react-hot-toast";

import { FaArrowLeftLong } from "react-icons/fa6";
import { GiFarmer } from "react-icons/gi";
import { GiIsland } from "react-icons/gi";
import { Dialog, Transition } from "@headlessui/react";
import ConfirmationModal from "@/components/modals/ConfirmationModal";
import { FaMobileRetro } from "react-icons/fa6";
import { FaArrowDown } from "react-icons/fa";
import { FaArrowUp } from "react-icons/fa";
import DatePicker from "react-datepicker";
import { FaArrowAltCircleUp } from "react-icons/fa";

const AdditionalInfo = (data) => {
  console.log("pop", data);
  const headers = {
    "Content-Type": "application/json",
    secret: "fsdhfgsfuiweifiowefjewcewcebjw",
  };
  const router = useRouter();
  
  const [localStorageItems, setLocalStorageItems] = useState({
    cId: "",
    bgId: "",
    buId: "",
    rId: "",
    zId: "",
    tId: "",
    roleId: "",
  });
  useEffect(() => {
    setLocalStorageItems({
      cId: JSON.parse(window.localStorage.getItem("userinfo")).c_id,
      bgId: JSON.parse(window.localStorage.getItem("userinfo")).bg_id,
      buId: JSON.parse(window.localStorage.getItem("userinfo")).bu_id,
      rId: JSON.parse(window.localStorage.getItem("userinfo")).r_id,
      zId: JSON.parse(window.localStorage.getItem("userinfo")).z_id,
      tId: JSON.parse(window.localStorage.getItem("userinfo")).t_id,
      clName: window.localStorage.getItem("user_name"),
      ulName: window.localStorage.getItem("phone_number"),
      roleId: JSON.parse(window.localStorage.getItem("userinfo")).role_id,
    });
  }, []);


  const [indentListData, setIndentListData] = useState([]);
  const getIndentDetails = async () => {
    try {
      const respond = await axios.get(`${url}/api/get_material_indent`, {
        headers: headers,
        params: {
          t_id: JSON.parse(window.localStorage.getItem("userinfo")).t_id,
          c_id:JSON.parse(window.localStorage.getItem("userinfo")).c_id,
          emp_code: window.localStorage.getItem("emp_code"),
        },
      });

      const apires = await respond.data.data;
      setIndentListData(apires);
    } catch (error) {}
  };

  useEffect(() => {
    getIndentDetails();
  }, []);




 

 

 
  return (
    <form
      className="bg-white rounded w-full overflow-hidden pb-4"
      onSubmit={(e) => e.preventDefault()}
    >
      <Toaster position="bottom-center" reverseOrder={false} />

      <div className="fixed top-0 w-full flex flex-col h-12 bg-white justify-between px-4  pb-2 shadow-lg  lg:flex-col   ">
        <div className="flex flex-row gap-4 font-bold w-full items-center h-12">
          <FaArrowLeftLong className="" onClick={() => router.back()} />
          <h2 className="font-bold ">List of Indent </h2>
        </div>       
      </div>

      <div className="flex bg-gray-200 h-8 mt-14 justify-between items-center px-2">
        <small>{indentListData.length} Indents Retrive</small>
      </div>
     
      <div className=" flex flex-col gap-2 items-center justify-center align-center w-full -z-90 lg:flex-row overflow-hidden">
        <div className="overflow-y-auto w-full lg:w-auto p-2">
          {indentListData?.map((item) => (
            <div className="flex w-full flex-col gap-1 mt-2 shadow-md p-1">
             <div className="flex w-full flex-col gap-2">
           <div className="flex flex-row gap-2">
<div className="flex flex-col gap-1">
 <label
            className="block text-gray-700 text-sm font-bold "
            htmlFor="inputField"
          >
             MI Code 
          </label>  
                
          <input
            disabled
            className="w-max px-3   focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            placeholder="MI Code"
            value={item.mi_no}
          />
 </div>

 <div className="flex flex-col gap-1">
 <label
            className="block text-gray-700 text-sm font-bold "
            htmlFor="inputField"
          >
             Indent Request Date 
          </label>
          
          <DatePicker
           className="w-full px-3   border-b border-gray-500  bg-white focus:outline-none focus:border-b focus:border-indigo-500"
           dateFormat="dd-MM-yyyy" 
           disabled        
            selected={
                new Date(item.indent_req_date)
            }
            minDate={new Date()}
            peekNextMonth
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            
          />    
 </div>
</div>
        

 
 <div className="flex flex-col gap-2">
 <label className="block text-gray-700 text-sm font-bold " htmlFor="inputField">
             Material / POP Require
          </label>
          <textarea
            disabled
            className="w-full px-3  h-8 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            value={item.material_pop_require}
         
          
          />

<label className="block text-gray-700 text-sm font-bold  " htmlFor="inputField">
             Any Specification of Material
          </label>
          <textarea
           disabled
            className="w-full px-3 h-8  focus:outline-none focus:border-indigo-500"
            type="text"
            id="ield"
            value={item.
                any_specification_of_material}
          
          />

<div className="flex flex-row w-full justify-between">
<label className="block text-gray-700 text-sm font-bold " htmlFor="inputField">
             Purpose of Material
          </label>

          <div className="flex flex-row gap-2 text-gray-700 text-sm   w-1/2">

          <label
            className="flex flex-row gap-1 text-gray-700 text-sm font-bold   "
            htmlFor="inputField"
          >
           Priority :
          </label>
        
          <p
            className="  w-28  bg-white focus:outline-none focus:border-b focus:border-indigo-500"
            id="stateSelect"    
          >
        {item.priority
        }   
          </p>

        </div>     
</div>

          <textarea
            className="w-full px-3 h-8  focus:outline-none focus:border-indigo-500"
            type="number"
            id="inputField"
           disabled
            value={item.purpose_of_material}
        
          
          />
<div className="w-full flex flex-row gap-2">
<div className="flex flex-col gap-1">
<label className="block text-gray-700 text-sm font-bold  " htmlFor="inputField">
             Current Stock Qty
          </label>
          <input
            className="w-full px-3   focus:outline-none focus:border-indigo-500"
            type="number"
            id="inputField"
            value={item.current_stock_qty
            }
        
          
          />  
</div>
<div className="flex flex-col gap-1">
<label className="block text-gray-700 text-sm font-bold  " htmlFor="inputField">
             Required Qty
          </label>
          <input
            className="w-full px-3   focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            value={item.required_qty

            }
           
        
          />  
</div>
<div className="flex flex-col gap-1">
<label className="block text-gray-700 text-sm font-bold  " htmlFor="inputField">
             Delivery Date
          </label>
          <DatePicker
              className="w-full px-3  focus:outline-none focus:border-indigo-500"
              dateFormat="dd-MM-yyyy"  
              selected={
               new Date(item.
                delivery_date)
              } 
             
              peekNextMonth
              showMonthDropdown  
              showYearDropdown
              dropdownMode="select"
          />
</div>


</div>
<div className="flex flex-row gap-2 w-full ">
<label
            className="flex flex-row gap-1 text-gray-700 text-sm font-bold   "
            htmlFor="inputField"
          >
          Status :
          </label>
         <p className="  border-gray-500 w-[80%] pb-1 bg-white focus:outline-none focus:border-b focus:border-indigo-500">{item.status} </p>
         
</div>

      
 </div>

           <hr className="bg-gray-200 border-1 w-full" />
         </div>
              <hr className="bg-gray-200 border-1 w-full" />
            </div>
          ))}
         
        </div>
      </div>
   

     
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
