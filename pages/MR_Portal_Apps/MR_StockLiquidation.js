import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { url } from "@/constants/url";
import axios, { formToJSON } from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { useRouter } from "next/router";
import toast, { Toaster } from "react-hot-toast";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Popover } from "@headlessui/react";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { GiFarmer,  } from "react-icons/gi";
import Profile from "../../public/userimg.jpg";
import { AiOutlineDelete } from "react-icons/ai";

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

  
 
 const [saCode , setSaCode] = useState("")
   const generateEmpCode = async () => {
    try {
      const respond = await axios.get(`${url}/api/get_demo_code`, {
        headers: headers,
        params: {
          emp_code: window.localStorage.getItem("emp_code"),
          type: "sa",
        },
      });
      const apires = await respond.data.data;
      setSaCode(apires);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    generateEmpCode();
  }, []);


   const [liquidationData , setLiquidationData] = useState({
    lastInventoryDate: "",
    gridData: [],
    qty:"" 
   })
   const getLiquidation = async () => {
    try {
      const respond = await axios.get(`${url}/api/get_dealer_stock_liq`, {
        headers: headers,
        params: {
          emp_code: window.localStorage.getItem("emp_code"),
          c_id: JSON.parse(window.localStorage.getItem("userinfo")).c_id,
          t_id: JSON.parse(window.localStorage.getItem("userinfo")).t_id,

          
        },
      });
      const apires = await respond.data.data;
      setLiquidationData({
        lastInventoryDate:apires[0].inventory_date,
        qty: apires[0].stock_sale_qty,
        gridData: apires,
      })
    
    } catch (error) {
      console.log(error);
      setLiquidationData({
        lastInventoryDate:"",
        qty: "",
        gridData: [],
      })
    }
  };
  useEffect(() => {
    getLiquidation();
  }, []);

  const handleSubmit = async () => {
    try {
      const data = {
        sa_code:saCode ,
        inventory_date: formData.inventoryDate,
        current_date: new Date(),
        dealer_id: formData.dealerData.dealerName,   
        product_brand:formData.productBrand,
        crop: formData.crop,
        stock_sale_qty: formData.stockQty,
        t_id: JSON.parse(window.localStorage.getItem("userinfo")).t_id,
        c_id:  JSON.parse(window.localStorage.getItem("userinfo")).c_id,
        emp_code:window.localStorage.getItem("emp_code"),
      };

      const respond = await axios
        .post(`${url}/api/add_dealer_stock_liq`, JSON.stringify(data), {
          headers: headers,
        })
        .then((res) => {
          if (!res) return;
         
          toast.success(res.data.message);
          setFormData({
            dealerData: {
                dealerName:   "",
                address:      "",
                contactPerson:"",
                mobile:""
              },
           productBrand: "",
           crop: "",
           stockQty:""
          });
            generateEmpCode();
            getLiquidation()
        });
       
    } catch (errors) {
      const errorMessage = errors?.response?.data?.message;
      
        generateEmpCode();
      toast.error(errorMessage);
     
    }
  };


  const [allDealerData, setAllDealerData] = useState([]);
  const getDelaerData = async () => {
   try {
     const respond = await axios.get(`${url}/api/get_dealer`, {
       headers: headers,
       params: {
         c_id: JSON.parse(window.localStorage.getItem("userinfo")).c_id,
         t_id: JSON.parse(window.localStorage.getItem("userinfo")).t_id,
       },
     });
     const apires = await respond.data.data.map((item)=> { return {
       dealerName:item.d_id,
       address: item.address,
       contactPerson: item.contact_person,
       partyName: item.party_Name,
       mobile: item.pmobile,
     }});
     setAllDealerData(apires);
   } catch (error) {
     console.log(error);
   }
 };
  
 const [allBrandData, setAllBrandData] = useState([]);
 const [cropData, setCropData] = useState([]);
 const getStageInfo = async () => {
    try {
      const respond = await axios.get(`${url}/api/get_product_brand`, {
        headers: headers,
        params: {
          c_id: JSON.parse(window.localStorage.getItem("userinfo")).c_id,
        },
      });
      const apires = await respond.data.data;
      setAllBrandData(  
          apires         
      );
     
    } catch (error) {
      console.log(error);
    }
  };
  const getCropInfo = async () => {
    if (new Date())
      try {
        const respond = await axios.get(`${url}/api/get_crop`, {
          headers: headers,
          params: {
            c_id: JSON.parse(window.localStorage.getItem("userinfo")).c_id,
     
          },
        });
        const apires = await respond.data.data;
        
        setCropData(apires);
      } catch (error) {
        console.log(error);
      }
  };

  useEffect(() => {
    getStageInfo();
    getCropInfo();
    getDelaerData()
  }, []);


  const [formData, setFormData] = useState({ 
    inventoryDate: null,
    dealerData: {
        dealerName:   "",
        address:      "",
        contactPerson:"",
        mobile:""
      },
   productBrand: "",
   crop: "",
   stockQty:""
   });

   const handleDelete = async(item) =>{
    try {
        const respond = await axios
          .get(`${url}/api/delete_dealer_stock_liq`, {
            headers: headers,
            params:{
                emp_code: window.localStorage.getItem("emp_code"),
                c_id: JSON.parse(window.localStorage.getItem("userinfo")).c_id,
                t_id: JSON.parse(window.localStorage.getItem("userinfo")).t_id,
                product_brand: item.product_brand, 
                crop: item.crop ,
                dealer_id: item.dealer_id

                
            }
          })
          .then((res) => {
            if (!res) return;
            toast.success(res.data.message);
            getLiquidation()
        
          });
        const apires = await respond.data.data;
      } catch (error) {
        if (error.response) toast.error(error.response.data.message);
      }
   }

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
          <span>Delaer Stock Liquadation</span>
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
        <div>
    <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="inputField"
          >
            <small className="text-red-600">*</small> SA Code 
          </label>        
          <input
            className="w-1/2 px-3  border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            placeholder="SA Code"
            value={saCode}
          />
    </div>
<div className="flex flex-row ">
  
<div className="flex flex-col ">
 <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="inputField"
          >
            <small className="text-red-600">*</small> Inventory Date 
          </label>
          
          <DatePicker
           className="w-[80%] px-3   border-b border-gray-500  bg-white focus:outline-none focus:border-b focus:border-indigo-500"
           dateFormat="dd-MM-yyyy"         
            selected={
              formData.inventoryDate ? new Date(formData.inventoryDate) : ""
            }
            onChange={(date) =>
              setFormData({
                ...formData,
                inventoryDate: moment(date).format("LL"),
              })
            }
            minDate={new Date()}
            peekNextMonth
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            
            
          />    
 </div>
 <div className="flex flex-col ">
 <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="inputField"
          >
            <small className="text-red-600">*</small> Current Date 
          </label>
          
          <DatePicker
           className="w-[80%] px-3   border-b border-gray-500  bg-white focus:outline-none focus:border-b focus:border-indigo-500"
           dateFormat="dd-MM-yyyy"         
            selected={
                new Date()
            }
           
            minDate={new Date()}
            peekNextMonth
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            disabled
            
          />    
 </div>
<div className="flex flex-col ">
 <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="inputField"
          >
            <small className="text-red-600">*</small> Dealer Code 
          </label>        
          <input
            className="w-full px-3  border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            placeholder=" Code"
            value={"xxxx"}
          />
 </div> 

 
</div>
<div className="w-full px-2 mt-2">
          <label
            className="block text-gray-700 text-sm font-bold   "
            htmlFor="inputField"
          >
            <small className="text-red-600 ">*</small> Dealer Name
          </label>
        {console.log("Del", allDealerData, formData)}
          <select
            className="w-full px-3 py-2 border-b border-gray-500  bg-white focus:outline-none focus:border-b focus:border-indigo-500"
            id="stateSelect"
         
            value={JSON.stringify(formData.dealerData)}
            onChange={(e) =>
            {
              let selectedItem= e.target.value ? JSON.parse(e.target.value) :"" ;

              setFormData({
                ...formData,
                dealerData: selectedItem,
              })
            }
              
            }
            
          >
            <option
              value=""
              className="focus:outline-none focus:border-b bg-white"
            >
              Select
            </option>
            
            {allDealerData?.map((item, idx) => (
              <option
              key={idx}
              value={JSON.stringify(item)}
            
                className="focus:outline-none focus:border-b bg-white"
              >
                {item.partyName}
              </option>
            ))}
          </select>
        </div>
<small className="text-red-400 italic">Last Inventory Date {liquidationData.lastInventoryDate ? moment(liquidationData.lastInventoryDate).format("DD-MMM-YYYY"): ""}</small>
        <div className="fle gap-4 w-full px-2">
          <label
            className="text-gray-700 text-sm font-bold mb-2 whitespace-nowrap"
            htmlFor="inputField"
          >
            <small className="text-red-600">*</small> Address
          </label>
          <textarea
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            placeholder="Address"
            value={formData.dealerData ? formData.dealerData.address :""}
          disabled
        
            // disabled={!formActive}
          />
        </div>    

 


       
     
    
<div className="flex flex-row gap-1">
<div>
<label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="inputField"
          >
            <small className="text-red-600">*</small> Contact Person
          </label>        
          <input
            className="w-full px-3  border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            placeholder="Contact Person"
            value={formData.dealerData.contactPerson}
          />
</div>

<div>
<label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="inputField"
          >
            <small className="text-red-600">*</small> Mobile No.
          </label>        
          <input
            className="w-full px-3  border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            placeholder=" Code"
            value={formData.dealerData.mobile }
          />
</div>

 


 
</div>
    
<div className="flex flex-row justify-between gap-2">
<div className="flex flex-col w-40 ">
 <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="inputField"
          >
            <small className="text-red-600">*</small> Prod Brand 
          </label>
          
          <select
            className="w-full px-3 py-2 border-b border-gray-500  bg-white focus:outline-none focus:border-b focus:border-indigo-500"
            id="stateSelect"
           
        value={formData.productBrand}
            onChange={(e) =>
              setFormData({
                ...formData,
                productBrand: e.target.value,
              })
            }
          >
            <option
              value=""
              className="focus:outline-none focus:border-b bg-white"
            >
              Option
            </option>

            {allBrandData.map((item) => (
              <option value={item.brand_code}>{item.brand_name}</option>
            ))}
          </select>
 </div>
 <div className="flex flex-col w-40">
 <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="inputField"
          >
            <small className="text-red-600">*</small> Crop
          </label>
          
          <select
            className="w-full px-3 py-2 border-b border-gray-500  bg-white focus:outline-none focus:border-b focus:border-indigo-500"
            id="stateSelect"
         
            value={formData.crop}
            onChange={(e) =>
            {
              

              setFormData({
                ...formData,
                crop: e.target.value,
              })
            }
              
            }
            
          >
            <option
              value=""
              className="focus:outline-none focus:border-b bg-white"
            >
              Select
            </option>
            
            {cropData.map((item) => (
              <option key={item.cr_id} value={item.cr_id}>
                {item.crop_name}
              </option>
            ))}
          </select>   
 </div>
<div className="flex flex-col w-20  ">
 <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="inputField"
          >
            <small className="text-red-600">*</small> Stock Sale. Qty
          </label>        
          <input
            className=" px-3  border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            placeholder="Stock Sale. Qty"
            value={formData.stockQty}
            onChange={(e)=>setFormData({...formData , stockQty: e.target.value})}
          />
 </div> 

 
</div>

 <small className="text-red-400 italic">Last Inventory Audit Date: {liquidationData.lastInventoryDate ? moment(liquidationData.lastInventoryDate).format("DD-MMM-YYYY"): ""} and Last Inventory Qty: {liquidationData.qty}</small>
      
       
       <div className="flex w-full justify-center">
       <button
          onClick={() => {    
         handleSubmit()
          }}
          className="bg-green-500 flex items-center justify-center whitespace-nowrap text-white px-2 py-1.5 rounded-sm"
        >
          Update Inventory
        </button>
       </div>

       <div className="overflow-x-auto my-6 sm:overflow-hidden w-full  lg:w-full">
        <table className="min-w-full  divide-y divide-gray-200 border-2 lg:max-w-1/2">
          <thead className="bg-gray-50 border-2">
            <tr className="border-2">
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider sm:tracking-wider md:tracking-wider lg:tracking-wider xl:tracking-wider"
              >
                Product Brand
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider sm:tracking-wider md:tracking-wider lg:tracking-wider xl:tracking-wider"
              >
              Crop
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider sm:tracking-wider md:tracking-wider lg:tracking-wider xl:tracking-wider"
              >
                Stock Sale Qty.
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider sm:tracking-wider md:tracking-wider lg:tracking-wider xl:tracking-wider"
              >Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 my-2 ">
            {liquidationData.gridData?.map((item, index) => (
              <tr className="border-2" key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {item.
Brand_Desc

                  }
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {item.crop_name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {item.stock_sale_qty}
                </td>
                <button className="text-sm text-gray-900 font-light px-2 py-4 whitespace-nowrap">
                  {
                    <AiOutlineDelete
                      className="text-red-500"
                      onClick={() =>
                        handleDelete(item)
                      }
                    ></AiOutlineDelete>
                  }
                </button>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex w-full">
       <button
       onClick={() =>{
        router.push({
          pathname: "/",
        })
      }}
          className="bg-red-500 flex items-center justify-center whitespace-nowrap text-white px-2 py-1.5 rounded-sm"
        >
         Close
        </button>
       </div>

      </div>
      
    </form>
  );
};

export default AdditionalInfo;

// Hydration  Issue
