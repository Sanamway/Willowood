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
      <h1 className="text-2xl font-bold text-center mb-4">
        Monthly Summary - Activity
      </h1>

      {/* Second table */}
      <div className="overflow-x-auto mt-8 flex flex-col gap-2">
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
        <table className="w-full border-collapse border border-gray-200 ">
          <thead>
            <tr className="bg-blue-400 text-white">
              <th className="border border-gray-200 py-2 px-4 whitespace-nowrap font-bold">
                Day Activity
              </th>
              <th className="border border-gray-200 py-2 px-4">Demo</th>
              <th className="border border-gray-200 py-2 px-4">F.Day</th>
              <th className="border border-gray-200 py-2 px-4">O2O</th>
              <th className="border border-gray-200 py-2 px-4">SVN</th>
              <th className="border border-gray-200 py-2 px-4">GVM</th>
              <th className="border border-gray-200 py-2 px-4">CAP</th>
              <th className="border border-gray-200 py-2 px-4">SHC</th>
              <th className="border border-gray-200 py-2 px-4">AT</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-green-100">
              <td className="border border-gray-200 py-2 px-4 whitespace-nowrap font-bold ">
                Target
              </td>
              <td className="border border-gray-200 py-2 px-4">-</td>
              <td className="border border-gray-200 py-2 px-4">-</td>
              <td className="border border-gray-200 py-2 px-4">-</td>
              <td className="border border-gray-200 py-2 px-4">-</td>
              <td className="border border-gray-200 py-2 px-4">-</td>
              <td className="border border-gray-200 py-2 px-4">-</td>
              <td className="border border-gray-200 py-2 px-4">-</td>
              <td className="border border-gray-200 py-2 px-4">-</td>
            </tr>
            <tr className="bg-white">
              <td className="border border-gray-200 py-2 px-4 whitespace-nowrap font-bold">
                Total
              </td>
              <td className="border border-gray-200 py-2 px-4">-</td>
              <td className="border border-gray-200 py-2 px-4">-</td>
              <td className="border border-gray-200 py-2 px-4">-</td>
              <td className="border border-gray-200 py-2 px-4">-</td>
              <td className="border border-gray-200 py-2 px-4">-</td>
              <td className="border border-gray-200 py-2 px-4">-</td>
              <td className="border border-gray-200 py-2 px-4">-</td>
              <td className="border border-gray-200 py-2 px-4">-</td>
            </tr>
            <tr className="bg-white">
              <td className="border border-gray-200 py-2 px-4 whitespace-nowrap font-bold">
                Achiv %
              </td>
              <td className="border border-gray-200 py-2 px-4">-</td>
              <td className="border border-gray-200 py-2 px-4">-</td>
              <td className="border border-gray-200 py-2 px-4">-</td>
              <td className="border border-gray-200 py-2 px-4">-</td>
              <td className="border border-gray-200 py-2 px-4">-</td>
              <td className="border border-gray-200 py-2 px-4">-</td>
              <td className="border border-gray-200 py-2 px-4">-</td>
              <td className="border border-gray-200 py-2 px-4">-</td>
            </tr>
            {/* Render rows based on day activity data */}
            {dayActivityData.map((data, index) => (
              <tr key={index} className="bg-white">
                <td className="border border-gray-200 py-2 px-4 whitespace-nowrap">
                  {data.date}
                </td>
                <td className="border border-gray-200 py-2 px-4">
                  {data.demo}
                </td>
                <td className="border border-gray-200 py-2 px-4">
                  {data.fDay}
                </td>
                <td className="border border-gray-200 py-2 px-4">{data.o2o}</td>
                <td className="border border-gray-200 py-2 px-4">{data.svn}</td>
                <td className="border border-gray-200 py-2 px-4">{data.gvm}</td>
                <td className="border border-gray-200 py-2 px-4">{data.cap}</td>
                <td className="border border-gray-200 py-2 px-4">{data.shc}</td>
                <td className="border border-gray-200 py-2 px-4">{data.at}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdditionalInfo;
