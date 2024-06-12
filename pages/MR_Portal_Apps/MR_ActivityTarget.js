import React, { useState, useEffect } from "react";

import { AiTwotoneHome } from "react-icons/ai";
import { TiArrowBack } from "react-icons/ti";
import { useRouter } from "next/router";
import { url } from "@/constants/url";
import { AiOutlineSearch } from "react-icons/ai";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CSVLink } from "react-csv";
import { TbFileDownload } from "react-icons/tb";
import toast, { Toaster } from "react-hot-toast";
import Layout from "@/components/Layout";
import Navbar from "@/components/MR_Portal_Apps/Navbar";
const BusinessSegment = () => {
  const csvHeaders = [
    { label: "Id", key: "bg_id" },
    { label: "Business Segment", key: "business_segment" },
    { label: "Company", key: "cmpny_name" },
    { label: "Email", key: "email_id" },
    { label: "H.O.D.", key: "hod_name" },
    { label: "Mobile No.", key: "mobile_no" },
    { label: "Status", key: "isDeleted" },
  ];
  const router = useRouter();
  const [data, setData] = useState([]);
  const headers = {
    "Content-Type": "application/json",
    secret: "fsdhfgsfuiweifiowefjewcewcebjw",
  };
  const getBusinessSegment = async () => {
    try {
      const respond = await axios.get(`${url}/api/get_business_segment`, {
        headers: headers,
      });
      const apires = await respond.data.data;
      setData(apires);
    } catch (error) {}
  };

  useEffect(() => {
    getBusinessSegment();
  }, []);

  const deleteHandler = (id) => {
    setisOpen(true);
    setCompanyId(id);
  };

  const [isOpen, setisOpen] = useState(false);
  const [companyId, setCompanyId] = useState(null);

  const resetData = () => {
    getBusinessSegment();
    setisOpen(false);
  };
  const { name } = router.query;

  const [selectedYear, setSelectedYear] = useState(null);
  const [monthList, setMonthList] = useState([]);

  const handleYearChange = (date) => {
    if (date) {
      const selectedYear = date.getFullYear();
      setSelectedYear(date);
      generateMonthList(selectedYear);
    }
  };

  const generateMonthList = (year) => {
    const months = [
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
      "January",
      "February",
      "March",
    ];
    const monthList = months.map((month) => `${month}-${year}`);
    setMonthList(monthList);
  };

  return (
    <div className="  w-full font-arial bg-white p-4 ">
      <Navbar />
      <div className="flex flex-col gap-4">
        <div className="flex flex-row gap-1">
          <div className="flex flex-row  md:flex-col">
            <label
              htmlFor="attendanceType"
              className="block font-bold mb-2 self-center w-32"
            >
              Company:
            </label>
            <select
              id="attendanceType"
              className="w-72  border p-1 rounded self-center"
            >
              <option value="">Company</option>
              <option value="Punch In">Punch In</option>
              <option value="Punch Out">Punch Out</option>
              <option value="Weekly Off">Weekly Off</option>
            </select>
          </div>
        </div>

        <div className="flex flex-row gap-12 ">
          <div className="flex flex-row ">
            {" "}
            <label
              htmlFor="attendanceType"
              className="block font-bold mb-2 self-center w-32"
            >
              Year:
            </label>
            <DatePicker
              className="w-48  border p-1 rounded self-center"
              showYearDropdown
              dateFormat="yyyy"
              yearDropdownItemNumber={15}
              selected={selectedYear}
              scrollableYearDropdown
              onChange={handleYearChange}
              hand
              showYearPicker
            />
          </div>
          <div className="flex flex-row ">
            {" "}
            <label
              htmlFor="attendanceType"
              className="block font-bold mb-2 self-center w-32"
            >
              MR Category:
            </label>
            <select
              id="attendanceType"
              className="w-48  border p-1 rounded self-center"
            >
              <option value="">MR</option>
              <option value="Punch In">Punch In</option>
              <option value="Punch Out">Punch Out</option>
              <option value="Weekly Off">Weekly Off</option>
            </select>
          </div>
        </div>

        <div className="flex flex-row gap-16 w-1/2 justify-between"></div>
      </div>

      <div className="bg-white  max-w-full pb-12">
        <div className=" text-black font-arial scrollbar-hide overflow-x-auto w-full p-1">
          <table className="min-w-full divide-y border- divide-gray-200 ">
            <thead className="border-b w-max">
              <tr className="bg-sky-800 font-arial w-max ">
                <th className="px-4 py-2 text-left border-black border-x-2  border-t-2 text-xs font-medium text-white whitespace-nowrap  tracking-wider">
                  Month-Year
                </th>
                <th className="px-4 py-2  text-left w-max border-black border-x-2  border-t-2 text-xs font-medium text-white  tracking-wider">
                  Activity
                </th>

                <th className="px-4 py-2   text-left border-black border-x-2  border-t-2 text-xs font-medium text-white tracking-wider">
                  Demo
                </th>
                <th className="px-4 py-2  text-left border-black border-x-2  border-t-2 text-xs font-medium text-white tracking-wider">
                  F.Day
                </th>
                <th className="px-4 py-2  text-left border-black border-x-2  border-t-2 text-xs font-medium text-white tracking-wider">
                  O2O
                </th>
                <th className="px-4 py-2  text-left border-black border-x-2  border-t-2 text-xs font-medium text-white tracking-wider">
                  GMT
                </th>
                <th className="px-4 py-2  text-left border-black border-x-2  border-t-2 text-xs font-medium text-white tracking-wider">
                  SVN
                </th>
                <th className="px-4 py-2  text-left border-black border-x-2  border-t-2 text-xs font-medium text-white tracking-wider">
                  CAP
                </th>
                <th className="px-4 py-2  text-left border-black border-x-2  border-t-2 text-xs font-medium text-white tracking-wider">
                  SHC
                </th>
                <th className="px-4 py-2  text-left border-black border-x-2  border-t-2 text-xs font-medium text-white tracking-wider">
                  Total
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y  divide-gray-200 text-xs">
              {monthList.map((item) => (
                <tr className="dark:border-2">
                  <td className="pl-4 w-52 text-left border-2 border-black whitespace-nowrap font-arial text-xs ">
                    {item}
                  </td>

                  <td className="  border-2 border-black  whitespace-nowrap text-white p-0 bg-white">
                    <ul>
                      <li className="border-b-2 border-black  flex justify-center text-black bg-sky-800  p-1">
                        <input
                          className="p-0 w-16 text-white h-6 bg-sky-800 "
                          value="Target"
                        />
                      </li>
                      <li className="border-b-2 border-black  flex justify-center text-black bg-sky-800  p-1">
                        <input
                          className="p-0 w-16 text-white h-6 bg-sky-800 "
                          value="Min Ach."
                        />
                      </li>
                      <li className="border-b-2 border-black  flex justify-center text-black bg-sky-800  p-1">
                        <input
                          className="p-0 w-16 text-white h-6 bg-sky-800 "
                          value="Weightage"
                        />
                      </li>
                      <li className="  flex justify-center bg-green-400  text-black   p-1  ">
                        <input
                          className="p-0 w-16 h-6   text-white bg-green-400"
                          value="Score"
                        />
                      </li>
                    </ul>
                  </td>

                  <td className="  border-2 border-black  whitespace-nowrap text-white p-0 bg-white">
                    <ul>
                      <li className="border-b-2 border-black  flex justify-center text-black   p-1">
                        <input
                          className="p-0 w-16 border-2 h-6 border-black text-right "
                          type="number"
                        />
                      </li>
                      <li className="border-b-2 border-black  flex justify-center     p-1">
                        <input
                          className="p-0 w-16 border-2 h-6 border-black text-right"
                          type="number"
                        />
                      </li>
                      <li className="border-b-2 border-black  flex justify-center   p-1">
                        <input
                          className="p-0 w-16 border-2 h-6 border-black text-right"
                          type="number"
                        />
                      </li>
                      <li className="  flex justify-center bg-green-400  text-black   p-1  ">
                        <input
                          className="p-0 w-16 border-2 h-6 border-black text-right"
                          type="number"
                        />
                      </li>
                    </ul>
                  </td>

                  <td className="  border-2 border-black  whitespace-nowrap text-white p-0 bg-white">
                    <ul>
                      <li className="border-b-2 border-black  flex justify-center text-black  p-1">
                        <input
                          className="p-0 w-16 border-2 h-6 border-black text-right"
                          type="number"
                        />
                      </li>
                      <li className="border-b-2 border-black  flex justify-center     p-1">
                        <input
                          className="p-0 w-16 border-2 h-6 border-black text-right"
                          type="number"
                        />
                      </li>
                      <li className="border-b-2 border-black  flex justify-center   p-1">
                        <input
                          className="p-0 w-16 border-2 h-6 border-black text-right"
                          type="number"
                        />
                      </li>
                      <li className="  flex justify-center bg-green-400  text-black   p-1  ">
                        <input
                          className="p-0 w-16 border-2 h-6 border-black text-right"
                          type="number"
                        />
                      </li>
                    </ul>
                  </td>
                  <td className="  border-2 border-black  whitespace-nowrap text-white p-0 bg-white">
                    <ul>
                      <li className="border-b-2 border-black  flex justify-center text-black  p-1">
                        <input
                          className="p-0 w-16 border-2 h-6 border-black text-right"
                          type="number"
                        />
                      </li>
                      <li className="border-b-2 border-black  flex justify-center     p-1">
                        <input
                          className="p-0 w-16 border-2 h-6 border-black text-right"
                          type="number"
                        />
                      </li>
                      <li className="border-b-2 border-black  flex justify-center   p-1">
                        <input
                          className="p-0 w-16 border-2 h-6 border-black text-right"
                          type="number"
                        />
                      </li>
                      <li className="  flex justify-center bg-green-400  text-black   p-1  ">
                        <input
                          className="p-0 w-16 border-2 h-6 border-black text-right"
                          type="number"
                        />
                      </li>
                    </ul>
                  </td>
                  <td className="  border-2 border-black  whitespace-nowrap text-white p-0 bg-white">
                    <ul>
                      <li className="border-b-2 border-black  flex justify-center text-black  p-1">
                        <input
                          className="p-0 w-16 border-2 h-6 border-black text-right"
                          type="number"
                        />
                      </li>
                      <li className="border-b-2 border-black  flex justify-center     p-1">
                        <input
                          className="p-0 w-16 border-2 h-6 border-black text-right"
                          type="number"
                        />
                      </li>
                      <li className="border-b-2 border-black  flex justify-center   p-1">
                        <input
                          className="p-0 w-16 border-2 h-6 border-black text-right"
                          type="number"
                        />
                      </li>
                      <li className="  flex justify-center bg-green-400  text-black   p-1  ">
                        <input
                          className="p-0 w-16 border-2 h-6 border-black text-right"
                          type="number"
                        />
                      </li>
                    </ul>
                  </td>
                  <td className="  border-2 border-black  whitespace-nowrap text-white p-0 bg-white">
                    <ul>
                      <li className="border-b-2 border-black  flex justify-center text-black  p-1">
                        <input
                          className="p-0 w-16 border-2 h-6 border-black text-right"
                          type="number"
                        />
                      </li>
                      <li className="border-b-2 border-black  flex justify-center     p-1">
                        <input
                          className="p-0 w-16 border-2 h-6 border-black text-right"
                          type="number"
                        />
                      </li>
                      <li className="border-b-2 border-black  flex justify-center   p-1">
                        <input
                          className="p-0 w-16 border-2 h-6 border-black text-right"
                          type="number"
                        />
                      </li>
                      <li className="  flex justify-center bg-green-400  text-black   p-1  ">
                        <input
                          className="p-0 w-16 border-2 h-6 border-black text-right"
                          type="number"
                        />
                      </li>
                    </ul>
                  </td>
                  <td className="  border-2 border-black  whitespace-nowrap text-white p-0 bg-white">
                    <ul>
                      <li className="border-b-2 border-black  flex justify-center text-black  p-1">
                        <input
                          className="p-0 w-16 border-2 h-6 border-black text-right"
                          type="number"
                        />
                      </li>
                      <li className="border-b-2 border-black  flex justify-center     p-1">
                        <input
                          className="p-0 w-16 border-2 h-6 border-black text-right"
                          type="number"
                        />
                      </li>
                      <li className="border-b-2 border-black  flex justify-center   p-1">
                        <input
                          className="p-0 w-16 border-2 h-6 border-black text-right"
                          type="number"
                        />
                      </li>
                      <li className="  flex justify-center bg-green-400  text-black   p-1  ">
                        <input
                          className="p-0 w-16 border-2 h-6 border-black text-right"
                          type="number"
                        />
                      </li>
                    </ul>
                  </td>
                  <td className="  border-2 border-black  whitespace-nowrap text-white p-0 bg-white">
                    <ul>
                      <li className="border-b-2 border-black  flex justify-center text-black  p-1">
                        <input
                          className="p-0 w-16 border-2 h-6 border-black text-right"
                          type="number"
                        />
                      </li>
                      <li className="border-b-2 border-black  flex justify-center     p-1">
                        <input
                          className="p-0 w-16 border-2 h-6 border-black text-right"
                          type="number"
                        />
                      </li>
                      <li className="border-b-2 border-black  flex justify-center   p-1">
                        <input
                          className="p-0 w-16 border-2 h-6 border-black text-right"
                          type="number"
                        />
                      </li>
                      <li className="  flex justify-center bg-green-400  text-black   p-1  ">
                        <input
                          className="p-0 w-16 border-2 h-6 border-black text-right"
                          type="number"
                        />
                      </li>
                    </ul>
                  </td>

                  <td className="  border-2 border-black  whitespace-nowrap text-white p-0 bg-white">
                    <ul>
                      <li className="border-b-2 border-black  flex justify-center text-black  bg-gray-400  p-1">
                        <input
                          className="p-0 w-16 text-white h-6  bg-gray-400 "
                          value="12"
                        />
                      </li>
                      <li className="border-b-2 border-black  flex justify-center text-black  bg-gray-400  p-1">
                        <input
                          className="p-0 w-16 text-white h-6  bg-gray-400 "
                          value="32"
                        />
                      </li>
                      <li className="border-b-2 border-black  flex justify-center text-black bg-gray-400  p-1">
                        <input
                          className="p-0 w-16 text-white h-6  bg-gray-400 "
                          value="42"
                        />
                      </li>
                      <li className="  flex justify-center  bg-gray-400  text-black   p-1  ">
                        <input
                          className="p-0 w-16 h-6   text-white  bg-gray-400"
                          value="42"
                        />
                      </li>
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex w-full  gap-4 mt-4 ">
          <button className="bg-green-500 flex items-center justify-center whitespace-nowrap text-white px-2 py-1.5 rounded-sm">
            Submit
          </button>
          <button
            onClick={() => {}}
            className="bg-green-500 flex items-center justify-center whitespace-nowrap text-white px-2 py-1.5 rounded-sm"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default BusinessSegment;
