import React, { useState, useEffect } from "react";

import { AiTwotoneHome } from "react-icons/ai";
import { TiArrowBack } from "react-icons/ti";
import { useRouter } from "next/router";
import { url } from "@/constants/url";
import { AiOutlineSearch } from "react-icons/ai";
import axios from "axios";

import { CSVLink } from "react-csv";
import { TbFileDownload } from "react-icons/tb";
import toast, { Toaster } from "react-hot-toast";
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

  return (
    <div className="  w-full font-arial bg-white p-4 gap-4">
      <div className="flex flex-row gap-2">
        <label htmlFor="attendanceType" className="block font-bold mb-2 self-center">
          Company:
        </label>
        <select id="attendanceType" className="w-48  border p-2 rounded self-center">
          <option value="">Company</option>
          <option value="Punch In">Punch In</option>
          <option value="Punch Out">Punch Out</option>
          <option value="Weekly Off">Weekly Off</option>
        </select>
      </div>
      
      <div className="flex flex-row gap-2">
        <label htmlFor="attendanceType" className="block font-bold mb-2 self-center">
          Year:
        </label>
        <select id="attendanceType" className="w-48  border p-2 rounded self-center">
          <option value="">Company</option>
          <option value="Punch In">Punch In</option>
          <option value="Punch Out">Punch Out</option>
          <option value="Weekly Off">Weekly Off</option>
        </select>
      </div>
      
      {" "}
      <div className="bg-white h-screen flex items-start justify-center max-w-full">
        <div className=" text-black font-arial scrollbar-hide overflow-x-auto w-full p-2">
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
              {[1, 2, 3, 4, 5].map((item) => (
                <tr className="dark:border-2">
                  <td className="px-4 py-2 text-left border-2 border-black whitespace-nowrap font-arial text-xs ">
                    April-2024
                  </td>
                  <td className="  border-2 border-black  whitespace-nowrap text-white p-0">
                    <ul>
                      <li className="border-b-2 border-black  flex justify-center  bg-sky-800 p-1">
                        Target
                      </li>
                      <li className="border-b-2 border-black  flex justify-center  bg-sky-800   p-1">
                        Min Ach.
                      </li>
                      <li className="border-b-2 border-black  flex justify-center  bg-sky-800   p-1">
                        Weightage
                      </li>
                      <li className="  flex justify-center bg-green-400  text-black   p-1  ">
                        Score
                      </li>
                    </ul>
                  </td>
                  <td className="  border-2 border-black  whitespace-nowrap text-white p-0 bg-white">
                    <ul>
                      <li className="border-b-2 border-black  flex justify-center text-black  p-1">
                        <input
                          className="p-0 w-12 border-2 h-4 border-black"
                          type="number"
                        />
                      </li>
                      <li className="border-b-2 border-black  flex justify-center     p-1">
                        <input
                          className="p-0 w-12 border-2 h-4 border-black"
                          type="number"
                        />
                      </li>
                      <li className="border-b-2 border-black  flex justify-center   p-1">
                        <input
                          className="p-0 w-12 border-2 h-4 border-black"
                          type="number"
                        />
                      </li>
                      <li className="  flex justify-center bg-green-400  text-black   p-1  ">
                        <input
                          className="p-0 w-12 border-2 h-4 border-black"
                          type="number"
                        />
                      </li>
                    </ul>
                  </td>

                  <td className="  border-2 border-black  whitespace-nowrap text-white p-0 bg-white">
                    <ul>
                      <li className="border-b-2 border-black  flex justify-center text-black  p-1">
                        <input
                          className="p-0 w-12 border-2 h-4 border-black"
                          type="number"
                        />
                      </li>
                      <li className="border-b-2 border-black  flex justify-center     p-1">
                        <input
                          className="p-0 w-12 border-2 h-4 border-black"
                          type="number"
                        />
                      </li>
                      <li className="border-b-2 border-black  flex justify-center   p-1">
                        <input
                          className="p-0 w-12 border-2 h-4 border-black"
                          type="number"
                        />
                      </li>
                      <li className="  flex justify-center bg-green-400  text-black   p-1  ">
                        <input
                          className="p-0 w-12 border-2 h-4 border-black"
                          type="number"
                        />
                      </li>
                    </ul>
                  </td>
                  <td className="  border-2 border-black  whitespace-nowrap text-white p-0 bg-white">
                    <ul>
                      <li className="border-b-2 border-black  flex justify-center text-black  p-1">
                        <input
                          className="p-0 w-12 border-2 h-4 border-black"
                          type="number"
                        />
                      </li>
                      <li className="border-b-2 border-black  flex justify-center     p-1">
                        <input
                          className="p-0 w-12 border-2 h-4 border-black"
                          type="number"
                        />
                      </li>
                      <li className="border-b-2 border-black  flex justify-center   p-1">
                        <input
                          className="p-0 w-12 border-2 h-4 border-black"
                          type="number"
                        />
                      </li>
                      <li className="  flex justify-center bg-green-400  text-black   p-1  ">
                        <input
                          className="p-0 w-12 border-2 h-4 border-black"
                          type="number"
                        />
                      </li>
                    </ul>
                  </td>
                  <td className="  border-2 border-black  whitespace-nowrap text-white p-0 bg-white">
                    <ul>
                      <li className="border-b-2 border-black  flex justify-center text-black  p-1">
                        <input
                          className="p-0 w-12 border-2 h-4 border-black"
                          type="number"
                        />
                      </li>
                      <li className="border-b-2 border-black  flex justify-center     p-1">
                        <input
                          className="p-0 w-12 border-2 h-4 border-black"
                          type="number"
                        />
                      </li>
                      <li className="border-b-2 border-black  flex justify-center   p-1">
                        <input
                          className="p-0 w-12 border-2 h-4 border-black"
                          type="number"
                        />
                      </li>
                      <li className="  flex justify-center bg-green-400  text-black   p-1  ">
                        <input
                          className="p-0 w-12 border-2 h-4 border-black"
                          type="number"
                        />
                      </li>
                    </ul>
                  </td>
                  <td className="  border-2 border-black  whitespace-nowrap text-white p-0 bg-white">
                    <ul>
                      <li className="border-b-2 border-black  flex justify-center text-black  p-1">
                        <input
                          className="p-0 w-12 border-2 h-4 border-black"
                          type="number"
                        />
                      </li>
                      <li className="border-b-2 border-black  flex justify-center     p-1">
                        <input
                          className="p-0 w-12 border-2 h-4 border-black"
                          type="number"
                        />
                      </li>
                      <li className="border-b-2 border-black  flex justify-center   p-1">
                        <input
                          className="p-0 w-12 border-2 h-4 border-black"
                          type="number"
                        />
                      </li>
                      <li className="  flex justify-center bg-green-400  text-black   p-1  ">
                        <input
                          className="p-0 w-12 border-2 h-4 border-black"
                          type="number"
                        />
                      </li>
                    </ul>
                  </td>
                  <td className="  border-2 border-black  whitespace-nowrap text-white p-0 bg-white">
                    <ul>
                      <li className="border-b-2 border-black  flex justify-center text-black  p-1">
                        <input
                          className="p-0 w-12 border-2 h-4 border-black"
                          type="number"
                        />
                      </li>
                      <li className="border-b-2 border-black  flex justify-center     p-1">
                        <input
                          className="p-0 w-12 border-2 h-4 border-black"
                          type="number"
                        />
                      </li>
                      <li className="border-b-2 border-black  flex justify-center   p-1">
                        <input
                          className="p-0 w-12 border-2 h-4 border-black"
                          type="number"
                        />
                      </li>
                      <li className="  flex justify-center bg-green-400  text-black   p-1  ">
                        <input
                          className="p-0 w-12 border-2 h-4 border-black"
                          type="number"
                        />
                      </li>
                    </ul>
                  </td>
                  <td className="  border-2 border-black  whitespace-nowrap text-white p-0 bg-white">
                    <ul>
                      <li className="border-b-2 border-black  flex justify-center text-black  p-1">
                        <input
                          className="p-0 w-12 border-2 h-4 border-black"
                          type="number"
                        />
                      </li>
                      <li className="border-b-2 border-black  flex justify-center     p-1">
                        <input
                          className="p-0 w-12 border-2 h-4 border-black"
                          type="number"
                        />
                      </li>
                      <li className="border-b-2 border-black  flex justify-center   p-1">
                        <input
                          className="p-0 w-12 border-2 h-4 border-black"
                          type="number"
                        />
                      </li>
                      <li className="  flex justify-center bg-green-400  text-black   p-1  ">
                        <input
                          className="p-0 w-12 border-2 h-4 border-black"
                          type="number"
                        />
                      </li>
                    </ul>
                  </td>
                  <td className="  border-2 border-black  whitespace-nowrap text-white p-0  bg-gray-400">
                    <ul>
                      <li className="border-b-2 border-black  flex justify-center   p-1">
                        89
                      </li>
                      <li className="border-b-2 border-black  flex justify-center     p-1">
                        90
                      </li>
                      <li className="border-b-2 border-black  flex justify-center   p-1">
                        13
                      </li>
                      <li className="  flex justify-center bg-gray-400  t   p-1  ">
                        12
                      </li>
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BusinessSegment;
