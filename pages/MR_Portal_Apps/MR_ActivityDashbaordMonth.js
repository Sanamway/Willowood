import React, { useState } from "react";
import { FaEye } from "react-icons/fa";
import Image from "next/image";
import Profile from "../../public/userimg.jpg";
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
    <div className="bg-gray-100 min-h-screen p-4">
      <h1 className="text-2xl font-bold text-center mb-4">
        Yearly Summary - Activity
      </h1>

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

            <div className="flex  flex-col px-4 w-full mt-4">
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
        <table className="w-full border-collapse border border-gray-200 mt-10">
          <thead>
            <tr className="bg-blue-400 text-white">
              <th className="border border-gray-200 py-2 px-4">Month-Year</th>
              <th className="border border-gray-200 py-2 px-4">Target</th>
              <th className="border border-gray-200 py-2 px-4">Total</th>
              <th className="border border-gray-200 py-2 px-4">Achievement%</th>
              <th className="border border-gray-200 py-2 px-4">Score</th>
              <th className="border border-gray-200 py-2 px-4">Demo</th>
              <th className="border border-gray-200 py-2 px-4">F.Day</th>
              <th className="border border-gray-200 py-2 px-4">O2O</th>
              <th className="border border-gray-200 py-2 px-4">GMT</th>
              <th className="border border-gray-200 py-2 px-4">SVN</th>
              <th className="border border-gray-200 py-2 px-4">GVM</th>
              <th className="border border-gray-200 py-2 px-4">CAP</th>
              <th className="border border-gray-200 py-2 px-4">SHC</th>
              <th className="border border-gray-200 py-2 px-4">AT</th>
              <th className="border border-gray-200 py-2 px-4"></th>
            </tr>
          </thead>
          <tbody>
            {/* Example row */}
            <tr className="bg-white whitespace-nowrap">
              <td className="border border-gray-200 py-2 px-4">April-2024</td>
              <td className="border border-gray-200 py-2 px-4">85</td>
              <td className="border border-gray-200 py-2 px-4">70</td>
              <td className="border border-gray-200 py-2 px-4">82%</td>
              <td className="border border-gray-200 py-2 px-4">75</td>
              <td className="border border-gray-200 py-2 px-4">20</td>
              <td className="border border-gray-200 py-2 px-4">18</td>
              <td className="border border-gray-200 py-2 px-4">15</td>
              <td className="border border-gray-200 py-2 px-4">12</td>
              <td className="border border-gray-200 py-2 px-4">10</td>
              <td className="border border-gray-200 py-2 px-4">8</td>
              <td className="border border-gray-200 py-2 px-4">5</td>
              <td className="border border-gray-200 py-2 px-4">2</td>
              <td className="border border-gray-200 py-2 px-4">3</td>
              <td className="border border-gray-200 py-2 px-4">
                {" "}
                <FaEye className="mt-1" />
              </td>
            </tr>
            <tr className="bg-white">
              <td className="border border-gray-200 py-2 px-4">April-2024</td>
              <td className="border border-gray-200 py-2 px-4">85</td>
              <td className="border border-gray-200 py-2 px-4">70</td>
              <td className="border border-gray-200 py-2 px-4">82%</td>
              <td className="border border-gray-200 py-2 px-4">75</td>
              <td className="border border-gray-200 py-2 px-4">20</td>
              <td className="border border-gray-200 py-2 px-4">18</td>
              <td className="border border-gray-200 py-2 px-4">15</td>
              <td className="border border-gray-200 py-2 px-4">12</td>
              <td className="border border-gray-200 py-2 px-4">10</td>
              <td className="border border-gray-200 py-2 px-4">8</td>
              <td className="border border-gray-200 py-2 px-4">5</td>
              <td className="border border-gray-200 py-2 px-4">2</td>
              <td className="border border-gray-200 py-2 px-4">3</td>
              <td className="border border-gray-200 py-2 px-4">
                {" "}
                <FaEye className="mt-1" />
              </td>
            </tr>
            <tr className="bg-white">
              <td className="border border-gray-200 py-2 px-4">April-2024</td>
              <td className="border border-gray-200 py-2 px-4">85</td>
              <td className="border border-gray-200 py-2 px-4">70</td>
              <td className="border border-gray-200 py-2 px-4">82%</td>
              <td className="border border-gray-200 py-2 px-4">75</td>
              <td className="border border-gray-200 py-2 px-4">20</td>
              <td className="border border-gray-200 py-2 px-4">18</td>
              <td className="border border-gray-200 py-2 px-4">15</td>
              <td className="border border-gray-200 py-2 px-4">12</td>
              <td className="border border-gray-200 py-2 px-4">10</td>
              <td className="border border-gray-200 py-2 px-4">8</td>
              <td className="border border-gray-200 py-2 px-4">5</td>
              <td className="border border-gray-200 py-2 px-4">2</td>
              <td className="border border-gray-200 py-2 px-4">3</td>
              <td className="border border-gray-200 py-2 px-4">
                {" "}
                <FaEye className="mt-1" />
              </td>
            </tr>
            <tr className="bg-white">
              <td className="border border-gray-200 py-2 px-4">April-2024</td>
              <td className="border border-gray-200 py-2 px-4">85</td>
              <td className="border border-gray-200 py-2 px-4">70</td>
              <td className="border border-gray-200 py-2 px-4">82%</td>
              <td className="border border-gray-200 py-2 px-4">75</td>
              <td className="border border-gray-200 py-2 px-4">20</td>
              <td className="border border-gray-200 py-2 px-4">18</td>
              <td className="border border-gray-200 py-2 px-4">15</td>
              <td className="border border-gray-200 py-2 px-4">12</td>
              <td className="border border-gray-200 py-2 px-4">10</td>
              <td className="border border-gray-200 py-2 px-4">8</td>
              <td className="border border-gray-200 py-2 px-4">5</td>
              <td className="border border-gray-200 py-2 px-4">2</td>
              <td className="border border-gray-200 py-2 px-4">3</td>
              <td className="border border-gray-200 py-2 px-4">
                {" "}
                <FaEye className="mt-1" />
              </td>
            </tr>
            {/* Add more rows as needed */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdditionalInfo;

// Hydration Error Issue
