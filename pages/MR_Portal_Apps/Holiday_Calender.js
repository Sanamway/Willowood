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
  const getLastDateOfCurrentMonth = () => {
    // Get the current date
    const now = moment();

    // Get the last date of the current month
    const lastDate = now.endOf("month").format("YYYY-MM-DD");

    return lastDate;
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

  const [filterYear, setFilterYear] = useState("");
  const [tableData, setTableData] = useState([]);
  const getAllHoliday = async (year) => {
    try {
      const respond = await axios.get(`${url}/api/holiday_list`, {
        headers: headers,
        params: {
          bu_id: localStorageItems.buId,
          c_id: localStorageItems.cId,
          bg_id: localStorageItems.bgId,
          year: year,
          type: "Holiday",
        },
      });
      const apires = await respond.data.data;

      setTableData(
        apires.map((item, idx) => {
          return {
            id: idx,
            holidayName: item.holiday_name,
            day: item.holiday_date,
            date: item.holiday_date,
            type: item.holiday_type,
            buId: item.bu_id,
            bgId: item.bg_id,
            cId: item.c_id,
          };
        })
      );
    } catch (error) {
      setTableData([]);
    }
  };
  useEffect(() => {
    if (!filterYear) return
    getAllHoliday(filterYear);
  }, [filterYear, localStorageItems]);

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
          <span>Holiday Calender</span>
        </span>{" "}
        <span className="text-white self-center">
          {/* <Popover as="div" className="relative border-none outline-none mt-2">
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
          </Popover> */}
        </span>
      </div>
      <div className="">
        
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

      <h1 className="text-xl font-bold  flex w-full justify-center border-t-4 border-blue-800 shadow-xl mb-4">
        Holiday Calender{" "}
        <select
          name="type"
          className="mx-4 text-sm h-6 flex  w-20 self-center"
          value={filterYear}
          onChange={(e) => setFilterYear(e.target.value)}
        >
          <option value="">Select Year</option>
          <option value="2023">2023</option>
          <option value="2024">2024</option>
          <option value="2025">2025</option>
        </select>
      </h1>
      <table className="min-w-full divide-y border divide-gray-200">
        <thead className="border-b">
          <tr className="bg-gray-50 font-arial">
            <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 tracking-wider whitespace-nowrap">
              Holiday Name
            </th>

            <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 tracking-wider">
              Date
            </th>
            <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 tracking-wider">
              Day
            </th>
            <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 tracking-wider">
              Type
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 text-xs">
          {tableData.map((item, idx) => (
            <tr key={idx} className="border-b">
              <td className="px-2 py-2">{item.holidayName}</td>

              <td className="px-2 py-2">
                <DatePicker
                  disabled
                  selected={item.date ? new Date(item.date) : ""}
                  onChange={(date) => handleDateChange(idx, date)}
                  className="border rounded px-2 py-1 w-24"
                  dateFormat="dd/MM/yyyy"
                />
              </td>
              <td className="px-2 py-2">{moment(item.day).format("dddd")}</td>
              <td className="px-2 py-2">{item.type}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </form>
  );
};

export default AdditionalInfo;

// Hydration Error Issue
