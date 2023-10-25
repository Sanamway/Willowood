import React, { useState } from "react";
import Layout from "../Layout";
import { FcBullish } from "react-icons/fc";
import { BsThreeDotsVertical } from "react-icons/bs";
import { GiTakeMyMoney } from "react-icons/gi";
import { IoIosArrowDown } from "react-icons/io";
import { Popover } from "@headlessui/react";

const RollingPlans = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const datas = [
    {
      id: 1,
      icon: FcBullish,
      name: "Rolling Sales Plan",
      month: "April 2023",
      depot: "Hyderabad",
      due_date: "due date 5th",
      zone: "South Telagana Hyderabad",
      color: "green",
      status: "Approved"
    },

    {
      id: 2,
      icon: FcBullish,
      name: "Rolling Sales Plan",
      month: "April 2023",
      depot: "Hyderabad",
      due_date: "due date 5th",
      zone: "South Telagana Hyderabad",
      color: "red",
      status: "Yet to submit"
    },

    {
      id: 3,
      icon: FcBullish,
      name: "Rolling Sales Plan",
      month: "April 2023",
      depot: "Hyderabad",
      due_date: "due date 5th",
      zone: "South Telagana Hyderabad",
      color: "orange",
      status: "Draft save"
    },

    {
      id: 4,
      icon: FcBullish,
      name: "Rolling Sales Plan",
      month: "April 2023",
      depot: "Hyderabad",
      due_date: "due date 5th",
      zone: "South Telagana Hyderabad",
      color: "red",
      status: "Submitted by TM/RM/ZM"
    },

    {
      id: 5,
      icon: FcBullish,
      name: "Rolling Sales Plan",
      month: "April 2023",
      depot: "Hyderabad",
      due_date: "due date 5th",
      zone: "South Telagana Hyderabad",
      color: "green",
      status: "Review stage"
    },

    {
      id: 6,
      icon: FcBullish,
      name: "Rolling Sales Plan",
      month: "April 2023",
      depot: "Hyderabad",
      due_date: "due date 5th",
      zone: "South Telagana Hyderabad",
      color: "red",
      status: "Yet to sumbit"
    },

    {
      id: 7,
      icon: FcBullish,
      name: "Rolling Sales Plan",
      month: "April 2023",
      depot: "Hyderabad",
      due_date: "due date 5th",
      zone: "South Telagana Hyderabad",
      color: "green",
      status: "Approved"
    },

    {
      id: 8,
      icon: FcBullish,
      name: "Rolling Sales Plan",
      month: "April 2023",
      depot: "Hyderabad",
      due_date: "due date 5th",
      zone: "South Telagana Hyderabad",
      color: "orange",
      status: "Draft save"
    },

    {
      id: 9,
      icon: FcBullish,
      name: "Rolling Sales Plan",
      month: "April 2023",
      depot: "Hyderabad",
      due_date: "due date 5th",
      zone: "South Telagana Hyderabad",
      color: "green",
      status: "Review stage"
    },

    {
      id: 10,
      icon: FcBullish,
      name: "Rolling Sales Plan",
      month: "April 2023",
      depot: "Hyderabad",
      due_date: "due date 5th",
      zone: "South Telagana Hyderabad",
      color: "green",
      status: "Approved"
    },
    {
      id: 11,
      icon: FcBullish,
      name: "Rolling Sales Plan",
      month: "April 2023",
      depot: "Hyderabad",
      due_date: "due date 5th",
      zone: "South Telagana Hyderabad",
      color: "green",
      status: "Draft save"
    },

    {
      id: 12,
      icon: FcBullish,
      name: "Rolling Sales Plan",
      month: "April 2023",
      depot: "Hyderabad",
      due_date: "due date 5th",
      zone: "South Telagana Hyderabad",
      color: "red",
      status: "Yet to submit"
    },

    {
      id: 13,
      icon: FcBullish,
      name: "Rolling Sales Plan",
      month: "April 2023",
      depot: "Hyderabad",
      due_date: "due date 5th",
      zone: "South Telagana Hyderabad",
      color: "red",
      status: "Yet to submit"
    },

    {
      id: 13,
      icon: FcBullish,
      name: "Rolling Sales Plan",
      month: "April 2023",
      depot: "Hyderabad",
      due_date: "due date 5th",
      zone: "South Telagana Hyderabad",
      color: "red",
      status: "Yet to submit"
    },
    
  ];
  return (
    <>
      <Layout>
        <div className="">
          <div className="container mx-auto px-4 sm:px-8 bg-white text-black">
            <div className="py-2 overflow-y-auto overflow-x-hidden h-screen pb-16 scrollbar-hide ">
              <div className="flex items-center justify-between w-full ">
                <h2 className="text-lg font-semibold leading-tight">Rolling Sales Plan</h2>
                {/* <GiTakeMyMoney size={30} className="text-blue-500"></GiTakeMyMoney> */}
                <h2 className="text-gray-900 whitespace-no-wrap text-[0.6rem]">2 / 10 Territory submitted</h2>
              </div>
              <div className="mt-1 flex sm:flex-row flex-col w-full  ">
                <div className="flex flex-row mb-1 sm:mb-0 w-full h-1/2">
                  <div className="relative w-full h-1/2">
                    <select className="max-h-full rounded-l border block appearance-none w-full bg-white border-gray-400 text-gray-700 py-1 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                      <option>Zone</option>
                      <option>Zone1</option>
                      <option>Zone2</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg
                        className="fill-current h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div>
                  </div>
                  <div className="relative w-full h-1/2">
                    <select className="max-h-full border block appearance-none w-full bg-white border-gray-400 text-gray-700 py-1 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                      <option>Region</option>
                      <option>Region1</option>
                      <option>Region2</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg
                        className="fill-current h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div>
                  </div>

                  <div className="relative w-full h-1/2">
                    <select className="max-h-full rounded- border block appearance-none w-full bg-white border-gray-400 text-gray-700 py-1 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                      <option>Territory</option>
                      <option>Region1</option>
                      <option>Region2</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg
                        className="fill-current h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div>
                  </div>

                  <div className="relative w-full h-1/2">
                    <select className="max-h-full border block appearance-none w-full bg-white border-gray-400 text-gray-700 py-1 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                      <option>Month</option>
                      <option>Month1</option>
                      <option>MOnth2</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg
                        className="fill-current h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-1 overflow-x-auto ">
                <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                  <table className="min-w-full leading-normal ">
                    <thead className="">
                      <tr>
                        <th className="px-5 py-2 border-b-2 border-gray-200 bg-[#626364] text-left text-xs font-semibold text-white  tracking-wider">
                          Rolling Sales Plan
                        </th>
                        <th className="px- py-2 border-b-2 border-gray-200 bg-[#626364] text-left text-xs font-semibold text-white  tracking-wider">
                          Depot
                        </th>
                        <th className="px- py-2 border-b-2 border-gray-200 bg-[#626364] text-left text-xs font-semibold text-white  tracking-wider">
                          Zone / Region / Territory
                        </th>
                        <th className="px-5 py-2 border-b-2 border-gray-200 bg-[#626364] text-left text-xs font-semibold text-white  tracking-wider">
                          Target Vs Actual
                        </th>

                        <th className="px-5 py-2 border-b-2 border-gray-200 bg-[#626364] text-left text-xs font-semibold text-white  tracking-wider">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {datas.map((item) => (
                        <tr>
                          <td className="px-5 py-1 border-b border-gray-200 bg-white text-xs">
                            <div className="flex items-center">
                              <div className="">
                                {/* <FcBullish size={30} className="text-green-500"></FcBullish> */}
                                {<item.icon size={20}></item.icon>}
                              </div>
                              <div className="ml-3">
                                <p className="text-gray-900 whitespace-no-wrap text-xs font-semibold">
                                  {item.name}
                                </p>
                                <p className="text-gray-900 whitespace-no-wrap text-[0.6rem]">
                                  {item.month} ({item.due_date})
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px- py-2 border-b border-gray-200 bg-white text-sm ">
                            <p className="text-gray-900 whitespace-no-wrap text-xs font-semibold">
                              {item.depot}
                            </p>
                          </td>
                          <td className="px- py-2 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap text-xs font-semibold">
                              {item.zone}
                            </p>
                          </td>
                          <td className="px- py-2 border-b border-gray-200 bg-white text-sm">
                            {/* Progress Bar */}
                            <div className="demo-preview">
                              <div className="progress progress-striped active">
                                <div
                                  role="progressbar "
                                  style={{ width: "75%" }}
                                  className="progress-bar progress-bar-success rounded-md"
                                >
                                  <span className="inline-block"></span>
                                </div>
                              </div>
                            </div>
                          </td>

                          <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm relative flex items-center justify-between">
                            <span className="relative inline-block px-2 py-1 font-semibold text-green-900 leading-tight">
                              <span
                                aria-hidden
                                style={{ backgroundColor: item.color }}
                                className="absolute inset-0 opacity-60 rounded-full"
                              ></span>
                              <span className="relative text-white whitespace-no-wrap text-xs font-semibold">
                                {item.status}
                              </span>
                            </span>
                            <div className="popop">
                              <Popover as="div" className="relative border-none outline-none ">
                                {({ open }) => (
                                  <>
                                    <Popover.Button className="focus:outline-none">
                                      <BsThreeDotsVertical
                                        className="text-[#626364] cursor-pointer"
                                        size={20}
                                      ></BsThreeDotsVertical>
                                    </Popover.Button>

                                    <Popover.Panel
                                      as="div"
                                      className={`${
                                        open ? "block" : "hidden"
                                      } absolute z-40 top-1 right-0 mt-2 w-40 bg-white  text-black border rounded-md shadow-md`}
                                    >
                                      <ul className=" text-black text-xs flex flex-col gap-  font-Rale cursor-pointer">
                                        <li className="hover:bg-gray-100 px-2 py-1 rounded-md">New</li>
                                        <li className="hover:bg-gray-100 px-2 py-1 rounded-md">Edit</li>
                                        <li className="hover:bg-gray-100 px-2 py-1 rounded-md">View</li>
                                        <li className="hover:bg-gray-100 px-2 py-1 rounded-md">Report</li>
                                      </ul>
                                    </Popover.Panel>
                                  </>
                                )}
                              </Popover>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {/* <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between">
                    <span className="text-xs xs:text-sm text-gray-900">Showing 1 to 4 of 50 Entries</span>
                    <div className="inline-flex mt-2 xs:mt-0">
                      <button className="text-sm bg-gray-300 hover-bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-l">
                        Prev
                      </button>
                      <button className="text-sm bg-gray-300 hover-bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-r">
                        Next
                      </button>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default RollingPlans;
