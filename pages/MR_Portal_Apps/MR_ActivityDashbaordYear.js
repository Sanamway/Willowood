import React, { useState } from "react";
import { FaEye } from "react-icons/fa";
import Image from "next/image";
import Profile from "../../public/userimg.jpg";
import Navbar from "@/components/MR_Portal_Apps/Navbar";
const AdditionalInfo = (props) => {
  const monthlyData = [
    {
      monthYear: "January 2024",
      target: 100,
      total: 90,
      achievement: 90,
      score: 85,
      demo: 20,
      fDay: 15,
      o2o: 25,
      gmt: 10,
      svn: 5,
      gvm: 10,
      cap: 5,
      shc: 20,
      at: 15,
    },
    // Add data for other months...
  ];

  return (
    <div className="bg-white min-h-screen p-4 md:p-0">
      <Navbar/>
      <div className="overflow-x-auto">
        <div className="bg-white h-40 p-2  sticky left-0">
          <h1 className="font-bold ">Employee Details:</h1>
          <div className="flex mb-4 mt-2">
            <div className="w-40 h-2  ">
              <Image
                className="  h-[7.1rem] w-[7.1rem] rounded-full   "
                src={Profile}
                alt="img"
              />
            </div>

            <div className="flex  flex-col px-2 w-full mt-4">
              <div className="flex  justify-between w-full  w-28">
                <div className="flex">
                  <p className=" font-bold text-sm text-blue-800 w-28">
                    Emp Code
                  </p>
                  <span>:</span>
                </div>
                <span>sefsf</span>
              </div>
              <div className="flex  justify-between w-full  w-28">
                <div className="flex">
                  <p className=" font-bold text-sm text-blue-800 w-28">Name</p>
                  <span>:</span>
                </div>
                <span>asfasdfa</span>
              </div>

              <div className="flex  justify-between w-full  w-28">
                <div className="flex">
                  <p className=" font-bold text-sm text-blue-800 w-28">
                    Branch
                  </p>
                  <span>:</span>
                </div>
                <span>asfasdfa</span>
              </div>
            </div>
          </div>
        </div>
        <h1 className="text-2xl font-bold text-center ">
          Yearly Summary - Activity
        </h1>
        <table className="w-full border-collapse border border-gray-200 text-[10px] ">
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
            {/* Example row */}
            <tr className="bg-white whitespace-nowrap">
              <td className="border border-gray-200 py-2 px-2"> April-24</td>
              <td className="border border-gray-200 py-2 px-2"> 85 </td>
              <td className="border border-gray-200 py-2 px-2"> 70 </td>
              <td className="border border-gray-200 py-2 px-2"> 82% </td>
              <td className="border border-gray-200 py-2 px-2"> 75 </td>
              <td className="border border-gray-200 py-2 px-2"> 20 </td>
              <td className="border border-gray-200 py-2 px-2"> 18 </td>
              <td className="border border-gray-200 py-2 px-2"> 15</td>
              <td className="border border-gray-200 py-2 px-2"> 12</td>
              <td className="border border-gray-200 py-2 px-2"> 10</td>
              <td className="border border-gray-200 py-2 px-2"> 8</td>
              <td className="border border-gray-200 py-2 px-2"> 5</td>
              <td className="border border-gray-200 py-2 px-2"> 2</td>
              <td className="border border-gray-200 py-2 px-2"> 3</td>
            </tr>
            <tr className="bg-white">
              <td className="border border-gray-200 py-2 px-2">April-24</td>
              <td className="border border-gray-200 py-2 px-2">85</td>
              <td className="border border-gray-200 py-2 px-2">70</td>
              <td className="border border-gray-200 py-2 px-2">82%</td>
              <td className="border border-gray-200 py-2 px-2">75</td>
              <td className="border border-gray-200 py-2 px-2">20</td>
              <td className="border border-gray-200 py-2 px-2">18</td>
              <td className="border border-gray-200 py-2 px-2">15</td>
              <td className="border border-gray-200 py-2 px-2">12</td>
              <td className="border border-gray-200 py-2 px-2">10</td>
              <td className="border border-gray-200 py-2 px-2">8</td>
              <td className="border border-gray-200 py-2 px-2">5</td>
              <td className="border border-gray-200 py-2 px-2">2</td>
              <td className="border border-gray-200 py-2 px-2">3</td>
            </tr>
            <tr className="bg-white">
              <td className="border border-gray-200 py-2 px-2">April-24</td>
              <td className="border border-gray-200 py-2 px-2">85</td>
              <td className="border border-gray-200 py-2 px-2">70</td>
              <td className="border border-gray-200 py-2 px-2">82%</td>
              <td className="border border-gray-200 py-2 px-2">75</td>
              <td className="border border-gray-200 py-2 px-2">20</td>
              <td className="border border-gray-200 py-2 px-2">18</td>
              <td className="border border-gray-200 py-2 px-2">15</td>
              <td className="border border-gray-200 py-2 px-2">12</td>
              <td className="border border-gray-200 py-2 px-2">10</td>
              <td className="border border-gray-200 py-2 px-2">8</td>
              <td className="border border-gray-200 py-2 px-2">5</td>
              <td className="border border-gray-200 py-2 px-2">2</td>
              <td className="border border-gray-200 py-2 px-2">3</td>
            </tr>
            <tr className="bg-white">
              <td className="border border-gray-200 py-2 px-2">April-24</td>
              <td className="border border-gray-200 py-2 px-2">85</td>
              <td className="border border-gray-200 py-2 px-2">70</td>
              <td className="border border-gray-200 py-2 px-2">82%</td>
              <td className="border border-gray-200 py-2 px-2">75</td>
              <td className="border border-gray-200 py-2 px-2">20</td>
              <td className="border border-gray-200 py-2 px-2">18</td>
              <td className="border border-gray-200 py-2 px-2">15</td>
              <td className="border border-gray-200 py-2 px-2">12</td>
              <td className="border border-gray-200 py-2 px-2">10</td>
              <td className="border border-gray-200 py-2 px-2">8</td>
              <td className="border border-gray-200 py-2 px-2">5</td>
              <td className="border border-gray-200 py-2 px-2">2</td>
              <td className="border border-gray-200 py-2 px-2">3</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdditionalInfo;

// Hydration Error Issue
