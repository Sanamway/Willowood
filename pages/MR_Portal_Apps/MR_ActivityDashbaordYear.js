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
import { Popover} from "@headlessui/react";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { BsCalendar2Month } from "react-icons/bs";
import { IoTodayOutline } from "react-icons/io5";
import { GiFarmer } from "react-icons/gi";
import { FaHandsHelping } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { Dialog, Transition } from "@headlessui/react";
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
    console.log("opo", localStorageItems.territory_name)
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
          <span>Yearly Summary - Activity</span>
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

      <h1 className="text-2xl font-bold text-center ">
        Yearly Summary - Activity
      </h1>
      <div className="overflow-auto w-full">
        <table className="w-full border-collapse border border-gray-200 text-[10px] overflow-auto ">
          <thead>
            <tr className="bg-blue-400 text-white text-[10px]">
              <th className="border border-gray-200 ">Month-Year</th>
              <th className="border border-gray-200 " >{" "}Tar{" "} </th>
              <th className="border border-gray-200 py-2 px-2">
                Sale
                /POG
              </th>
              <th className="border border-gray-200 py-2 px-2">
                Ach.
              </th>
              <th className="border border-gray-200 py-2 px-2">
                Act.
                SCR
              </th>
              <th className="border border-gray-200 py-2 px-2">
                Dmo
              </th>
              <th className="border border-gray-200 py-2 px-2">
                F.Day
              </th>
              <th className="border border-gray-200 py-2 px-2">
                IFC
              </th>
              <th className="border border-gray-200 py-2 px-2">
                FGM
              </th>
              <th className="border border-gray-200 py-2 px-2">
                OFM
              </th>
              <th className="border border-gray-200 py-2 px-2">
                MFM
              </th>
              <th className="border border-gray-200 py-2 px-2">
                RTP
              </th>
              <th className="border border-gray-200 py-2 px-2">
                SHC
              </th>
              <th className="border border-gray-200 py-2 px-2">AT</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((item) => (
              <tr className="bg-white whitespace-nowrap font-bold ">
                <td
                  className="border border-gray-200 py-2 px-2 "
                  onClick={() => {
                    router.push({
                      pathname: "/MR_Portal_Apps/MR_ActivityDashbaordMonth",
                      query: { month: item.month_year },
                    });
                  }}
                >
                  {item.month_year ? item.month_year : "-"}{" "}
                </td>
                <td className="border border-gray-200  px-2 py-2">{Number(targetData[item.month_year]).toFixed(2)}</td>
              <td className="border border-gray-200  px-2 py-2">{Number(saleData[item.month_year]).toFixed(2)}</td>
              <td className="border border-gray-200  px-2 py-2">{
             Number(Number(saleData[item.month_year]) /  Number(targetData[item.month_year]) * 100).toFixed(2)  
                
                }</td>
                <td className="border border-gray-200 py-2 px-2">
                  {item.scr ? item.scr : "-"}{" "}
                </td>
                <td className="border border-gray-200 py-2 px-2">
                  {item.demo ? item.demo : "-"}{" "}
                </td>
                <td className="border border-gray-200 py-2 px-2">
                  {item.f_day ? item.f_day : "-"}{" "}
                </td>
                <td className="border border-gray-200 py-2 px-2">
                  {item.ifc ? item.ifc : "-"}{" "}
                </td>
                <td className="border border-gray-200 py-2 px-2">
                  {item.fgm ? item.fgm : "-"}{" "}
                </td>
                <td className="border border-gray-200 py-2 px-2">
                  {item.ofm ? item.ofm : "-"}{" "}
                </td>
                <td className="border border-gray-200 py-2 px-2">
                  {item.mfm ? item.mfm : "-"}{" "}
                </td>
                <td className="border border-gray-200 py-2 px-2">
                  {item.rtp ? item.rtp : "-"}{" "}
                </td>
                <td className="border border-gray-200 py-2 px-2">
                  {item.shc ? item.shc : "-"}{" "}
                </td>
                <td className="border border-gray-200 py-2 px-2">
                  {item.att ? item.att : "-"}{" "}
                </td>
              </tr>
            ))}
            <tr className="bg-white whitespace-nowrap font-bold">
              <td className="border border-gray-200 py-2 px-2 ">Total</td>
              <td className="border border-gray-200 py-2 px-2">   {Number(totalRow(targetData)).toFixed(2)} </td>
              <td className="border border-gray-200 py-2 px-2">
              {Number(totalRow(saleData)).toFixed(2)}
              </td>
              <td className="border border-gray-200 py-2 px-2">
               -
              </td>
              <td className="border border-gray-200 py-2 px-2">
                {tableData
                  .map((item) => item.ofm)
                  .reduce((acc, current) => {
                    // Check if the current element is a number

                    return Number(acc) + Number(current);
                  }, 0)}
              </td>
              <td className="border border-gray-200 py-2 px-2">
                {tableData
                  .map((item) => item.mfm)
                  .reduce((acc, current) => {
                    // Check if the current element is a number

                    return Number(acc) + Number(current);
                  }, 0)}
              </td>
              <td className="border border-gray-200 py-2 px-2">
                {tableData
                  .map((item) => item.rtp)
                  .reduce((acc, current) => {
                    // Check if the current element is a number

                    return Number(acc) + Number(current);
                  }, 0)}
              </td>
              <td className="border border-gray-200 py-2 px-2">
                {tableData
                  .map((item) => item.shc)
                  .reduce((acc, current) => {
                    return Number(acc) + Number(current);
                  }, 0)}
              </td>
              <td className="border border-gray-200 py-2 px-2">
                {tableData
                  .map((item) => item.att)
                  .reduce((acc, current) => {
                    return Number(acc) + Number(current);
                  }, 0)}
              </td>
            </tr>
          </tbody>
        </table>
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
