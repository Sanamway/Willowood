import React, { useState, useEffect, Fragment } from "react";
import Image from "next/image";
import { Chart } from "react-chartjs-2";
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
import { FaArrowAltCircleUp } from "react-icons/fa";
import ChartOne from "./MRHome/help/SalesTargetChart";
import { string } from "yup";
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



  function sumCategoryResults(data) {
    const monthTotals = {
       "Apr-24": 0,
        "May-24": 0,
        "Jun-24": 0,
        "Jul-24": 0,
        "Aug-24": 0,
        "Sep-24": 0,
        "Oct-24": 0,
        "Nov-24": 0,
        "Dec-24": 0,
        "Jan-25": 0,  // Assuming the fiscal year crosses into the next year
        "Feb-25": 0,
        "Mar-25": 0
      
    };

    data.forEach(entry => {
        entry.category_result.forEach(category => {
          monthTotals["Apr-24"] += category.apr;
          monthTotals["May-24"] += category.may;
          monthTotals["Jun-24"] += category.june;
          monthTotals["Jul-24"] += category.july;
          monthTotals["Aug-24"] += category.aug;
          monthTotals["Sep-24"] += category.sep;
          monthTotals["Oct-24"] += category.oct;
          monthTotals["Nov-24"] += category.nov;
          monthTotals["Dec-24"] += category.dec;
          monthTotals["Jan-25"] += category.jan;
          monthTotals["Feb-25"] += category.feb;
          monthTotals["Mar-25"] += category.march;
          
        });
    });

    return monthTotals;
}

function sumDealerMapData(data) {
  const monthTotals = {
      "Apr-24": 0,
      "May-24": 0,
      "Jun-24": 0,
      "Jul-24": 0,
      "Aug-24": 0,
      "Sep-24": 0,
      "Oct-24": 0,
      "Nov-24": 0,
      "Dec-24": 0,
      "Jan-25": 0,  // Next year months
      "Feb-25": 0,
      "Mar-25": 0
  };

  data.forEach(entry => {
      monthTotals["Apr-24"] += entry.apr || 0;
      monthTotals["May-24"] += entry.may || 0;
      monthTotals["Jun-24"] += entry.june || 0;
      monthTotals["Jul-24"] += entry.july || 0;
      monthTotals["Aug-24"] += entry.aug || 0;
      monthTotals["Sep-24"] += entry.sep || 0;
      monthTotals["Oct-24"] += entry.oct || 0;
      monthTotals["Nov-24"] += entry.nov || 0;
      monthTotals["Dec-24"] += entry.dec || 0;
      monthTotals["Jan-25"] += entry.jan || 0;
      monthTotals["Feb-25"] += entry.feb || 0;
      monthTotals["Mar-25"] += entry.march || 0;
  });

  return monthTotals;
}

const totalRow =(data) =>{
  let total = 0;

for (let key in data) {
total += data[key];
}
return total
}





  const [tableData, setTableData] = useState([]);
  const getTableData = async () => {
    try {
      const respond = await axios.get(`${url}/api/get_mr_count`, {
        headers: headers,
        params: {
          emp_code: localStorageItems.empCode,
          t_id: localStorageItems.tId,
          c_id: localStorageItems.cId,
          year: moment().year(),
          count_type: "year",
        },
      });
      const apires = await respond.data.data;

      setTableData(apires);
    } catch (error) {
      setTableData([]);
    }
  };
  const [targetData, setTargetData] = useState([]);
  const [partySaleData, setPartySaleData] = useState([]);
  const getTargetData = async () => {
    try {
      const respond = await axios.get(`${url}/api/mr_dealer_sale_target`, {
        headers: headers,
        params: {
          emp_code: localStorageItems.empCode,
          t_id: localStorageItems.tId,
          c_id: localStorageItems.cId,
          year: moment().year(),
          count_type: "year",
        },
      });
      const apires = await respond.data.data;   
      setTargetData(sumDealerMapData(apires));
   
  
    } catch (error) {
      setTargetData([]);
    }
  };

  const [saleData, setSaleData] = useState([]);
  const getSaleData = async () => {
    try {
      const respond = await axios.get(`${url}/api/target_sale_mr`, {
        headers: headers,
        params: {
          emp_code: localStorageItems.empCode,
          t_id: localStorageItems.tId,
          t_des: localStorageItems.tDes,
          c_id: localStorageItems.cId,
          year: moment().year(),
          count_type: "year",
        },
      });
      const apires = await respond.data.data;
     setSaleData(sumCategoryResults(apires))
     setPartySaleData(apires)
    } catch (error) {
      setSaleData([]);
    }
  };
  


  
  useEffect(() => {
    getTableData();
    
  }, [localStorageItems]);
  useEffect(()=>{
    getTargetData()
    getSaleData();
  },[
    tableData
    
  ])

  const bsLabelData = [  "Apr-24",
"May-24",
"Jun-24",
"Jul-24",
"Aug-24",
"Sep-24",
"Oct-24",
"Nov-24",
"Dec-24",
"Jan-25",
"Feb-25",
"Mar-25"];

  console.log("zoz",  Object.values(targetData).join(", "))

  const [bsGraphData , setBsGraphData] = useState([
    {
      label: "Total Target",
      backgroundColor: "rgba(59, 130, 246, 1)",  // Full opacity
      backgroundColor: "rgba(59, 130, 246, 0.6)",
      data: 0,
    },
    {
      label: "Total Sales",
      backgroundColor: "rgba(249, 115, 22, 1)",  // Full opacity // Dark blue with 60% opacity
      borderColor:  "rgba(249, 115, 22, 0.6)",        // Dark blue with full opacity
      data: 0,
    } 
  ])
 
  useEffect(()=>{
    console.log("abc", Object.values(targetData))
setBsGraphData(
  [
    {
      label: "Total Target",
      backgroundColor: "rgba(59, 130, 246, 1)",  // Full opacity
      backgroundColor: "rgba(59, 130, 246, 0.6)",
      data: Object.values(targetData),
    },
    {
      label: "Total Sales",
      backgroundColor: "rgba(249, 115, 22, 1)",  // Full opacity // Dark blue with 60% opacity
      borderColor:  "rgba(249, 115, 22, 0.6)",        // Dark blue with full opacity
      data: Object.values(saleData),
    } 
  ]
)
  },[
targetData, saleData
  ])

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
          <span>Target VS Sales</span>
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

        <h1 className=" font-bold text-center bg-yellow-300 ">
         Target VS Sales
        </h1>
       <table className="w-full   border-collapse border border-gray-200 text-[10px] font-bold">
        <thead>
          <tr className="bg-blue-800 text-white">
            <th className="border border-gray-200  px-2 py-2 whitespace-nowrap font-bold">
        Month
            </th>
            <th className="border border-gray-200  px-2 py-2 ">Total Target</th>
            <th className="border border-gray-200  px-2 py-2">
              Total Sales
            </th>
            <th className="border border-gray-200  px-2 py-2">ACH%</th>
         
          </tr>
        </thead>
        <tbody>
        {tableData.map((item) => (
            <tr className="font-bold">
              <td className="border border-gray-200  px-2 py-2 whitespace-nowrap ">
               {item.month_year}
              </td>
              <td className="border border-gray-200  px-2 py-2">{Number(targetData[item.month_year]).toFixed(2)}</td>
              <td className="border border-gray-200  px-2 py-2">{Number(saleData[item.month_year]).toFixed(2)}</td>
              <td className="border border-gray-200  px-2 py-2">{
             Number(Number(saleData[item.month_year]) /  Number(targetData[item.month_year]) * 100).toFixed(2)  
                
                }</td>
          </tr>          
))}
       
     
          
          <tr className="text-white font-bold bg-blue-800">
            <td className="border border-gray-200  px-2 py-2 whitespace-nowrap">
              Total
            </td>
            <td className="border border-gray-200  px-2 py-2">
              {" "}
              {Number(totalRow(targetData)).toFixed(2)}
            </td>
            <td className="border border-gray-200  px-2 py-2">
              {" "}
              {Number(totalRow(saleData)).toFixed(2)}
            </td>
            <td className="border border-gray-200  px-2 py-2">
              {tableData
                .map((item) => item.ifc)
                .reduce((acc, current) => {
                  // Check if the current element is a number

                  return Number(acc) + Number(current);
                }, 0)}
            </td>
            
           
          </tr>
        
        </tbody>
      </table>
      <h1 className=" font-bold text-center  bg-yellow-300">
        My Party
      </h1>
      <div className="wrapper w-full overflow-hidden overflow-x-auto">
      <table className="  border-collapse border border-gray-200 text-[10px] font-bold">
        <thead>
          <tr className="bg-blue-800 text-white">
            <th className="border border-gray-200  px-2 py-2 whitespace-nowrap font-bold">
        Party Name
            </th>
            <th className="border border-gray-200  px-2 py-2 ">Product Cat</th>
            <th className="border border-gray-200  px-2 py-2">
              Target
            </th>
            <th className="border border-gray-200  px-2 py-2">
              Sale
            </th>
            <th className="border border-gray-200  px-2 py-2">ACH%</th>
          </tr>
        </thead>
        <tbody> 
{partySaleData?.map((item, idx)=> 
   <tr className="font-bold">
   <td className="border border-gray-200   ">
   {item.distribution_name}
   </td>
   <td className="border border-gray-200  ">
             <ul>
              {item.category_result?.map((item) =>
               <li className="border-b-2 border-black  flex justify-left text-black bg-sky-800  p-1">
               <input
                 className="p-0 w-28 text-white h-6 bg-sky-800 "
                 value={item.category_name}
                 disabled
               />
             </li> )
              }
              
               
             </ul>
           </td>
           <td className="border border-gray-200  ">
           {item.category_result?.map((categoryItem, index) =>
         <li key={index} className="border-b-2 border-black flex justify-left text-black bg-sky-800 p-1">
            <input
               className="p-0 w-28 text-white h-6 bg-sky-800"
               value={
                  ["apr_target", "may_target", "june_target", "july_target", "aug_target", "sep_target", "oct_target", "nov_target", "dec_target", "jan_target", "feb_target", "march_target"]
                  .reduce((acc, curr) => acc + (categoryItem[curr] || 0), 0).toFixed(2)
               }
               disabled
            />
         </li>
      )}
           </td>
           <td className="border border-gray-200  ">
           {item.category_result?.map((categoryItem, index) =>
         <li key={index} className="border-b-2 border-black flex justify-left text-black bg-sky-800 p-1">
            <input
               className="p-0 w-28 text-white h-6 bg-sky-800"
               value={
                  ["apr", "may", "june", "july", "aug", "sep", "oct", "nov", "dec", "jan", "feb", "march"]
                  .reduce((acc, curr) => acc + (categoryItem[curr] || 0), 0).toFixed(2)
               }
               disabled
            />
         </li>
      )}
           </td>
         
           <td className="border border-gray-200  ">
           {item.category_result?.map((categoryItem, index) =>
         <li key={index} className="border-b-2 border-black flex justify-left text-black bg-sky-800 p-1">
            <input
               className="p-0 w-28 text-white h-6 bg-sky-800"
               value={
                Number( ["apr", "may", "june", "july", "aug", "sep", "oct", "nov", "dec", "jan", "feb", "march"]
                  .reduce((acc, curr) => acc + (categoryItem[curr] || 0), 0) /  Number(["apr_target", "may_target", "june_target", "july_target", "aug_target", "sep_target", "oct_target", "nov_target", "dec_target", "jan_target", "feb_target", "march_target"]
                    .reduce((acc, curr) => acc + (categoryItem[curr] || 0), 0)) * 100).toFixed(2)  
               }
               disabled
            />
         </li>
      )}
           </td>
               
 </tr>   


)}
          {/* <tr className="font-bold">
            <td className="border border-gray-200  px-2 py-2 whitespace-nowrap ">
             Party Name 1
            </td>
            <td className="border border-gray-200  ">
                      <ul>
                        <li className="border-b-2 border-black  flex justify-left text-black bg-sky-800  p-1">
                          <input
                            className="p-0 w-28 text-white h-6 bg-sky-800 "
                            value="HR Expect Target"
                            disabled
                          />
                        </li>
                        <li className="border-b-2 border-black  flex justify-left text-black bg-sky-800  p-1">
                          <input
                            className="p-0 w-28 text-white h-6 bg-sky-800 "
                            value="HR Min Ach."
                            disabled
                          />
                        </li>
                        <li className="border-b-2 border-black  flex justify-left text-black bg-sky-800  p-1">
                          <input
                            className="p-0 w-28 text-white h-6 bg-sky-800 "
                            value="Weightage %"
                            disabled
                          />
                        </li>
                        <li className="  flex justify-left bg-green-400  text-black   p-1  ">
                          <input
                            className="p-0 w-28 h-6   text-white bg-green-400"
                            value="Activity Score"
                            disabled
                          />
                        </li>
                      </ul>
                    </td>
           
                    <td className="border border-gray-200  ">
                      <ul>
                        <li className="border-b-2 border-black  flex justify-left text-black bg-sky-800  p-1">
                          <input
                            className="p-0 w-28 text-white h-6 bg-sky-800 "
                            value="HR Expect Target"
                            disabled
                          />
                        </li>
                        <li className="border-b-2 border-black  flex justify-left text-black bg-sky-800  p-1">
                          <input
                            className="p-0 w-28 text-white h-6 bg-sky-800 "
                            value="HR Min Ach."
                            disabled
                          />
                        </li>
                        <li className="border-b-2 border-black  flex justify-left text-black bg-sky-800  p-1">
                          <input
                            className="p-0 w-28 text-white h-6 bg-sky-800 "
                            value="Weightage %"
                            disabled
                          />
                        </li>
                        <li className="  flex justify-left bg-green-400  text-black   p-1  ">
                          <input
                            className="p-0 w-28 h-6   text-white bg-green-400"
                            value="Activity Score"
                            disabled
                          />
                        </li>
                      </ul>
                    </td>
                    <td className="border border-gray-200  ">
                      <ul>
                        <li className="border-b-2 border-black  flex justify-left text-black bg-sky-800  p-1">
                          <input
                            className="p-0 w-28 text-white h-6 bg-sky-800 "
                            value="HR Expect Target"
                            disabled
                          />
                        </li>
                        <li className="border-b-2 border-black  flex justify-left text-black bg-sky-800  p-1">
                          <input
                            className="p-0 w-28 text-white h-6 bg-sky-800 "
                            value="HR Min Ach."
                            disabled
                          />
                        </li>
                        <li className="border-b-2 border-black  flex justify-left text-black bg-sky-800  p-1">
                          <input
                            className="p-0 w-28 text-white h-6 bg-sky-800 "
                            value="Weightage %"
                            disabled
                          />
                        </li>
                        <li className="  flex justify-left bg-green-400  text-black   p-1  ">
                          <input
                            className="p-0 w-28 h-6   text-white bg-green-400"
                            value="Activity Score"
                            disabled
                          />
                        </li>
                      </ul>
                    </td>
                    <td className="border border-gray-200  ">
                      <ul>
                        <li className="border-b-2 border-black  flex justify-left text-black bg-sky-800  p-1">
                          <input
                            className="p-0 w-28 text-white h-6 bg-sky-800 "
                            value="HR Expect Target"
                            disabled
                          />
                        </li>
                        <li className="border-b-2 border-black  flex justify-left text-black bg-sky-800  p-1">
                          <input
                            className="p-0 w-28 text-white h-6 bg-sky-800 "
                            value="HR Min Ach."
                            disabled
                          />
                        </li>
                        <li className="border-b-2 border-black  flex justify-left text-black bg-sky-800  p-1">
                          <input
                            className="p-0 w-28 text-white h-6 bg-sky-800 "
                            value="Weightage %"
                            disabled
                          />
                        </li>
                        <li className="  flex justify-left bg-green-400  text-black   p-1  ">
                          <input
                            className="p-0 w-28 h-6   text-white bg-green-400"
                            value="Activity Score"
                            disabled
                          />
                        </li>
                      </ul>
                    </td>
                        
          </tr>    */}
    
        </tbody>
      </table>
      </div>
     
       <h1 className=" font-bold text-center  bg-yellow-300">
        Monthly Graph
      </h1>

      <ChartOne
        title={"Target Vs Sales"}
        color={"bg-blue-800"}
        lab={bsLabelData}
        datasets={bsGraphData || []}
                />
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
      {/* Example row */}

      {/* {tableData.map((item) => 
         <tr className="bg-white whitespace-nowrap">
         <td className="border border-gray-200  px-2 py-2">{item.} </td>
         <td className="border border-gray-200  px-2 py-2">{item.} </td>
         <td className="border border-gray-200  px-2 py-2">{item.} </td>
         <td className="border border-gray-200  px-2 py-2">{item.} </td>
         <td className="border border-gray-200  px-2 py-2">{item.} </td>
         <td className="border border-gray-200  px-2 py-2">{item.} </td>
         <td className="border border-gray-200  px-2 py-2">{item.} </td>
         <td className="border border-gray-200  px-2 py-2">{item.} </td>
         <td className="border border-gray-200  px-2 py-2">{item.} </td>
         <td className="border border-gray-200  px-2 py-2">{item.} </td>
         <td className="border border-gray-200  px-2 py-2">{item.} </td>
         <td className="border border-gray-200  px-2 py-2">{item.} </td>
         <td className="border border-gray-200  px-2 py-2">{item.} </td>
         <td className="border border-gray-200  px-2 py-2">{item.} </td>
       </tr>
      )} */}
    </form>
  );
};

export default AdditionalInfo;
