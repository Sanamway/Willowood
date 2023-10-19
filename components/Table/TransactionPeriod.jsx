import React, { useState } from "react";
import Layout from "../Layout";
import { AiTwotoneHome } from "react-icons/ai";
import { TiArrowBack } from "react-icons/ti";
import { useRouter } from "next/router";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import moment from "moment";
const TrasactionPeriod = () => {
  const menus = [
    {
      id: 1,
      name: "Menu Admin Check This",
    },
    {
      id: 2,
      name: "Menu 2",
    },
    {
      id: 3,
      name: "Menu 3",
    },
  ];

  const yearArray = [
    2023, 2024, 2025, 2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032, 2034,
    2035,
  ];
  const monthArray = [
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
    "Jan",
    "Feb",
    "Mar",
  ];
  const month = [
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const [dateFilter, setDateFilter] = useState(2023);
  const [startDate, setStartDate] = useState(new Date());
  console.log("st", startDate);

  const router = useRouter();
  return (
    <Layout>
      <div className="h-screen overflow-auto w-full font-arial bg-white ">
        <div className="flex flex-row justify-between h-max px-5">
          <h2 className="font-arial font-normal text-3xl  py-2">
            Trasaction Open and Close Period
          </h2>
          <span className="flex items-center gap-2 cursor-pointer">
            <TiArrowBack
              onClick={() => {
                router.push("/table/table_user_profile");
              }}
              className="text-gray-400"
              size={35}
            />

            <AiTwotoneHome className="text-red-500" size={34} />
          </span>
        </div>

        <div className="bg-gray-0 p-4 bg-gray-100  w-full flex items-start h-full">
          <form className=" flex flex-col gap-4 bg-white rounded shadow p-4 w-full mb-8 ">
            <span className="text-black flex items-center gap-4">
              <h2 className=" text-md">Plan ID</h2>
              <input
                disabled
                type="text"
                className="px-2 py-1 bg-gray-100 w-1/6"
              />
            </span>
            <div className="flex flex-row gap-2 w-full">
              <label
                className="block text-gray-700 text-sm font-bold mb-2 w-1/3"
                htmlFor="userSelect"
              >
                <span className="text-red-500 p-1">*</span>Menu Name
                <select
                  className="w-full px-3 py-2 border-b border-gray-500 rounded- bg-white focus:outline-none focus:border-b focus:border-indigo-500 mt-2"
                  id="userSelect"
                >
                  <option value="user1">RP- Rolling Plan</option>
                  <option value="user2">CP- Collection Plan</option>
                </select>
              </label>

              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="userSelect"
              >
                <span className="text-red-500 p-1">*</span>Year
                <select
                  className="w-full px-3 py-2 border-b border-gray-500 rounded- bg-white focus:outline-none focus:border-b focus:border-indigo-500 mt-2"
                  id="userSelect"
                  value={dateFilter}
                  onChange={(e) => {
                    setDateFilter(e.target.value);
                    setStartDate(new Date(e.target.value));
                  }}
                >
                  {yearArray.map((item, index) => (
                    <option value={item} id={index}>
                      {item}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div className="overflow-x-auto">
              <h2>Assign Menu Rights</h2>
              <table className="min-w-full">
                <thead className="font-arial border-b">
                  <tr className="border bg-gray-50  font-arial">
                    <td className="px-2 py-2  dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                      SR
                    </td>
                    <td className=" px-4 py-2 text-center dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                      Month/Year
                    </td>
                    <td className="px-4 py-2 text-center dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                      Start Date
                    </td>
                    <td className="px-4 py-2 text-center dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                      Close Date
                    </td>
                    <td className="px-4 py-2 text-center dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                      Status
                    </td>
                  </tr>
                </thead>
                <tbody className="font-arial text- text-center">
                  {[
                    "4",
                    "5",
                    "6",
                    "7",
                    "8",
                    "9",
                    "10",
                    "11",
                    "12",
                    "1",
                    "2",
                    "3",
                  ].map((item, index) => (
                    <tr
                      className="bg-white divide-y border  divide-gray-200 text-xs"
                      key={index}
                    >
                      <td className=" px-2 py-2 flex items-center gap-4">
                        {index + 1}
                      </td>
                      <td className="px-12 py-2 dark:border-2 whitespace-nowrap font-arial text-xs">
                        {moment(item, "M").format("MMM")}{" "}
                        {parseInt(item) < 4
                          ? parseInt(dateFilter) + 1
                          : dateFilter}
                      </td>
                      <td className="border px-4 py-2">
                        <DatePicker
                          id={index}
                          selected={
                            parseInt(item) < 4
                              ? new Date(
                                  moment(startDate).year() + 1,
                                  moment(startDate).date(),
                                  item
                                )
                              : new Date(
                                  moment(startDate).year(),
                                  moment(startDate).date(),
                                  item
                                )
                          }
                          onChange={(date) => setStartDate(date)}
                        />
                      </td>
                      <td className="border px-4 py-2">
                        <DatePicker
                          id={index}
                          selected={
                            parseInt(item) < 4
                              ? new Date(
                                  moment(startDate).year() + 1,
                                  moment(startDate).date() + 4,
                                  item
                                )
                              : new Date(
                                  moment(startDate).year(),
                                  moment(startDate).date() + 4,
                                  item
                                )
                          }
                          onChange={(date) => setStartDate(date)}
                        />
                      </td>
                      <td className="border px-4 py-2">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2"
                          htmlFor="userSelect"
                        >
                          <select
                            className="w-full px-3 py-2 border-b border-gray-500 rounded- bg-white focus:outline-none focus:border-b focus:border-indigo-500 mt-2"
                            id="userSelect"
                            placeholder="Closed Period"
                          >
                            <option
                              value=""
                              className="focus:outline-none focus:border-b bg-white"
                            >
                              Closed Period
                            </option>
                            <option value="user1">Active Period</option>
                            <option value="user2">Deactive Period</option>
                          </select>
                        </label>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <span className="button flex items-center gap-3 mt-6">
              <button className="bg-green-700 px-4 py-1 text-white">
                Save
              </button>
              <button className="bg-yellow-500 px-4 py-1 text-white">
                Close
              </button>
            </span>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default TrasactionPeriod;
