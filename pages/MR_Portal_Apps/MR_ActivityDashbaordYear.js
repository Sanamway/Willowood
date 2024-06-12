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
  });
  useEffect(() => {
    setLocalStorageItems({
      uId: JSON.parse(window.localStorage.getItem("uid")),
      cId: JSON.parse(window.localStorage.getItem("userinfo")).c_id,
      bgId: JSON.parse(window.localStorage.getItem("userinfo")).bg_id,
      buId: JSON.parse(window.localStorage.getItem("userinfo")).bu_id,
      rId: JSON.parse(window.localStorage.getItem("userinfo")).r_id,
      zId: JSON.parse(window.localStorage.getItem("userinfo")).z_id,
      tId: JSON.parse(window.localStorage.getItem("userinfo")).t_id,
      clName: window.localStorage.getItem("user_name"),
      ulName: window.localStorage.getItem("phone_number"),
      empCode: window.localStorage.getItem("emp_code"),
      roleId: JSON.parse(window.localStorage.getItem("userinfo")).role_id,
    });
  }, []);

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
  useEffect(() => {
    getTableData();
  }, [localStorageItems]);

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
          <span>Yearly Summary</span>
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
                      onClick={() => setAddFarmerModal(true)}
                    >
                      <GiFarmer
                        className="text-[#626364] cursor-pointer"
                        size={20}
                        onClick={() =>
                          router.push({
                            pathname: "/MR_Portal_Apps/MyTimesheet",
                          })
                        }
                      />{" "}
                      Timesheet
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

          <div className="flex   w-full  w-28">
            <div className="flex">
              <p className=" font-bold text-sm text-blue-800 w-20">Branch</p>
              <span>:</span>
            </div>
            <span className="text-wrap ml-4">asfasdfa</span>
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
              <th className="border border-gray-200  font-thin">Month-Year</th>
              <th className="border border-gray-200  font-thin">Tar</th>
              <th className="border border-gray-200 py-2 px-2 font-thin">
                Tot
              </th>
              <th className="border border-gray-200 py-2 px-2 font-thin">
                Ach.
              </th>
              <th className="border border-gray-200 py-2 px-2 font-thin">
                Scr
              </th>
              <th className="border border-gray-200 py-2 px-2 font-thin">
                Dmo
              </th>
              <th className="border border-gray-200 py-2 px-2 font-thin">
                F.Day
              </th>
              <th className="border border-gray-200 py-2 px-2 font-thin">
                O2O
              </th>
              <th className="border border-gray-200 py-2 px-2 font-thin">
                GMT
              </th>
              <th className="border border-gray-200 py-2 px-2 font-thin">
                SVN
              </th>
              <th className="border border-gray-200 py-2 px-2 font-thin">
                GVM
              </th>
              <th className="border border-gray-200 py-2 px-2 font-thin">
                CAP
              </th>
              <th className="border border-gray-200 py-2 px-2 font-thin">
                SHC
              </th>
              <th className="border border-gray-200 py-2 px-2 font-thin">AT</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((item) => (
              <tr className="bg-white whitespace-nowrap">
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
                <td className="border border-gray-200 py-2 px-2">- </td>
                <td className="border border-gray-200 py-2 px-2">
                  {item.tot ? item.tot : "-"}{" "}
                </td>
                <td className="border border-gray-200 py-2 px-2">- </td>
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
                  {item.o2o ? item.o2o : "-"}{" "}
                </td>
                <td className="border border-gray-200 py-2 px-2">
                  {item.gmt ? item.gmt : "-"}{" "}
                </td>
                <td className="border border-gray-200 py-2 px-2">
                  {item.svn ? item.svn : "-"}{" "}
                </td>
                <td className="border border-gray-200 py-2 px-2">
                  {item.gvm ? item.gvm : "-"}{" "}
                </td>
                <td className="border border-gray-200 py-2 px-2">
                  {item.cap ? item.cap : "-"}{" "}
                </td>
                <td className="border border-gray-200 py-2 px-2">
                  {item.shc ? item.shc : "-"}{" "}
                </td>
                <td className="border border-gray-200 py-2 px-2">
                  {item.att ? item.att : "-"}{" "}
                </td>
              </tr>
            ))}
            <tr className="bg-white whitespace-nowrap">
              <td className="border border-gray-200 py-2 px-2 ">Total</td>
              <td className="border border-gray-200 py-2 px-2">- </td>
              <td className="border border-gray-200 py-2 px-2">-</td>
              <td className="border border-gray-200 py-2 px-2">- </td>
              <td className="border border-gray-200 py-2 px-2">-</td>
              <td className="border border-gray-200 py-2 px-2">-</td>
              <td className="border border-gray-200 py-2 px-2">-</td>
              <td className="border border-gray-200 py-2 px-2">
                {tableData
                  .map((item) => item.o2o)
                  .reduce((acc, current) => {
                    // Check if the current element is a number

                    return Number(acc) + Number(current);
                  }, 0)}
              </td>
              <td className="border border-gray-200 py-2 px-2">
                {tableData
                  .map((item) => item.gmt)
                  .reduce((acc, current) => {
                    // Check if the current element is a number

                    return Number(acc) + Number(current);
                  }, 0)}
              </td>
              <td className="border border-gray-200 py-2 px-2">
                {tableData
                  .map((item) => item.svn)
                  .reduce((acc, current) => {
                    // Check if the current element is a number

                    return Number(acc) + Number(current);
                  }, 0)}
              </td>
              <td className="border border-gray-200 py-2 px-2">
                {tableData
                  .map((item) => item.gvm)
                  .reduce((acc, current) => {
                    // Check if the current element is a number

                    return Number(acc) + Number(current);
                  }, 0)}
              </td>
              <td className="border border-gray-200 py-2 px-2">
                {tableData
                  .map((item) => item.cap)
                  .reduce((acc, current) => {
                    // Check if the current element is a number

                    return Number(acc) + Number(current);
                  }, 0)}
              </td>
              <td className="border border-gray-200 py-2 px-2">
                {tableData
                  .map((item) => item.shc)
                  .reduce((acc, current) => {
                    // Check if the current element is a number

                    return Number(acc) + Number(current);
                  }, 0)}
              </td>
              <td className="border border-gray-200 py-2 px-2">
                {tableData
                  .map((item) => item.att)
                  .reduce((acc, current) => {
                    // Check if the current element is a number

                    return Number(acc) + Number(current);
                  }, 0)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
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
    </form>
  );
};

export default AdditionalInfo;

// Hydration Error Issue
