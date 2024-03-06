import React from "react";
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

  // Dummy data for the new table
  const dayActivityData = Array.from({ length: 31 }, (_, i) => ({
    date: `01-${i + 1}-2024`,
    demo: Math.floor(Math.random() * 100),
    fDay: Math.floor(Math.random() * 100),
    o2o: Math.floor(Math.random() * 100),
    svn: Math.floor(Math.random() * 100),
    gvm: Math.floor(Math.random() * 100),
    cap: Math.floor(Math.random() * 100),
    shc: Math.floor(Math.random() * 100),
    at: Math.floor(Math.random() * 100),
  }));

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      {/* Second table */}
      <div className="overflow-x-auto  flex flex-col gap-2">
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

        <h1 className="text-2xl font-bold text-center mb-2">
          Monthly Summary - Activity
        </h1>

        <table className="w-full border-collapse border border-gray-200 text-[10px]">
          <thead>
            <tr className="bg-blue-400 text-white">
              <th className="border border-gray-200 py-2 px-2 whitespace-nowrap font-bold font-thin">
                Day 
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
            <tr className="bg-green-100">
              <td className="border border-gray-200 py-2 px-2 whitespace-nowrap font-thin ">
                Target
              </td>
              <td className="border border-gray-200 py-2 px-2">-</td>
              <td className="border border-gray-200 py-2 px-2">-</td>
              <td className="border border-gray-200 py-2 px-2">-</td>
              <td className="border border-gray-200 py-2 px-2">-</td>
              <td className="border border-gray-200 py-2 px-2">-</td>
              <td className="border border-gray-200 py-2 px-2">-</td>
              <td className="border border-gray-200 py-2 px-2">-</td>
              <td className="border border-gray-200 py-2 px-2">-</td>
            </tr>
            <tr className="bg-white">
              <td className="border border-gray-200 py-2 px-2 whitespace-nowrap font-thin">
                Total
              </td>
              <td className="border border-gray-200 py-2 px-2">-</td>
              <td className="border border-gray-200 py-2 px-2">-</td>
              <td className="border border-gray-200 py-2 px-2">-</td>
              <td className="border border-gray-200 py-2 px-2">-</td>
              <td className="border border-gray-200 py-2 px-2">-</td>
              <td className="border border-gray-200 py-2 px-2">-</td>
              <td className="border border-gray-200 py-2 px-2">-</td>
              <td className="border border-gray-200 py-2 px-2">-</td>
            </tr>
            <tr className="bg-white">
              <td className="border border-gray-200 py-2 px-2 whitespace-nowrap font-thin">
                Achiv %
              </td>
              <td className="border border-gray-200 py-2 px-2">-</td>
              <td className="border border-gray-200 py-2 px-2">-</td>
              <td className="border border-gray-200 py-2 px-2">-</td>
              <td className="border border-gray-200 py-2 px-2">-</td>
              <td className="border border-gray-200 py-2 px-2">-</td>
              <td className="border border-gray-200 py-2 px-2">-</td>
              <td className="border border-gray-200 py-2 px-2">-</td>
              <td className="border border-gray-200 py-2 px-2">-</td>
            </tr>
            {/* Render rows based on day activity data */}
            {dayActivityData.map((data, index) => (
              <tr key={index} className="bg-white">
                <td className="border border-gray-200 py-2 px-2 whitespace-nowrap">
                  {data.date}
                </td>
                <td className="border border-gray-200 py-2 px-2">
                  {data.demo}
                </td>
                <td className="border border-gray-200 py-2 px-2">
                  {data.fDay}
                </td>
                <td className="border border-gray-200 py-2 px-2">{data.o2o}</td>
                <td className="border border-gray-200 py-2 px-2">{data.svn}</td>
                <td className="border border-gray-200 py-2 px-2">{data.gvm}</td>
                <td className="border border-gray-200 py-2 px-2">{data.cap}</td>
                <td className="border border-gray-200 py-2 px-2">{data.shc}</td>
                <td className="border border-gray-200 py-2 px-2">{data.at}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdditionalInfo;
