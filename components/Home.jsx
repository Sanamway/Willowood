import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import Footer from "./Footer";
import Profile from "../public/userimg.jpg";
import { FaRegStar } from "react-icons/fa";
import { LuTrophy } from "react-icons/lu";
import { GiSprout } from "react-icons/gi";
import { FaTractor } from "react-icons/fa";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { FaRegWindowMinimize } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import Image from "next/image";

const HomePage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 9500);
  }, []);

  const users = [
    {
      name: "Satish",
      img: "https://i.pravatar.cc/250",
      time: "yesterday"
    },

    {
      name: "Satish",
      img: "https://i.pravatar.cc/250?img=38",
      time: "yesterday"
    },

    {
      name: "Satish",
      img: "https://i.pravatar.cc/250?img=7",
      time: "yesterday"
    },
    {
      name: "Satish",
      img: "https://i.pravatar.cc/250?img=6",
      time: "today"
    },
    {
      name: "Satish",
      img: "https://i.pravatar.cc/250?img=5",
      time: "12pm"
    },
    {
      name: "Satish",
      img: "https://i.pravatar.cc/250?img=1",
      time: "yesterday"
    },
    {
      name: "Satish",
      img: "https://i.pravatar.cc/250?img=2",
      time: "yesterday"
    },
    {
      name: "Satish",
      img: "https://i.pravatar.cc/250?img=3",
      time: "yesterday"
    }
  ];

  return (
    <Layout>
      <section className=" bg-gray-100 h-screen  ">
        {/* card one  */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
          <div className="bg-orange-500 p-1.5 flex flex-col items-center justify-center gap-2 rounded-md shadow-md text-white text-center">
            <div className="icon ">
              <FaRegStar size={35}></FaRegStar>
            </div>
            <h3 className="text-[20px] font-bold ">A+</h3>
            <strong className="block p-2">My Rating</strong>
          </div>

          <div className="bg-blue-500 p-1.5 flex flex-col items-center justify-center gap-2 rounded-md shadow-md text-white text-center">
            <div className="icon">
              <LuTrophy size={35}></LuTrophy>
            </div>
            <h3 className="text-[20px] font-bold ">125</h3>
            <strong className="block p-2">My Rating</strong>
          </div>

          <div className="bg-pink-500 p-1.5  flex flex-col items-center justify-center gap-2 rounded-md shadow-md text-white text-center">
            <div className="icon">
              <GiSprout size={35}></GiSprout>
            </div>
            <h3 className="text-[20px] font-bold ">5</h3>
            <strong className="block p-2">Add New Dealer</strong>
          </div>

          <div className="bg-green-500 p-1.5 flex flex-col items-center justify-center gap-2 rounded-md shadow-md text-white text-center">
            <div className="icon">
              <FaTractor size={35}></FaTractor>
            </div>
            <h3 className="text-[20px] font-bold ">2566</h3>
            <strong className="block p-2">Total Farmers</strong>
          </div>
        </div>

        {/* card two */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
          <div className="bg-[#ff6b6c] rounded-md shadow-md text-white text-center">
            <div className="flex items-center justify-center gap-2 p-3">
              <div className="icon">
                <FaRegCalendarAlt size={35}></FaRegCalendarAlt>
              </div>
              <div className="border-l-2 w-full ">
                <div className="flex items-center justify-between px-4 w-full gap-2 ">
                  <h2>Present</h2>
                  <h2>43</h2>
                </div>

                <div className="flex items-center justify-between px-4 w-full gap-2 ">
                  <h2>Absent</h2>
                  <h2>43</h2>
                </div>
                <div className="flex items-center justify-between px-4 w-full gap-2 ">
                  <h2>Present</h2>
                  <h2>43</h2>
                </div>

                <div className="flex items-center justify-between px-4 w-full gap-2 ">
                  <h2>Weekly Off</h2>
                  <h2>43</h2>
                </div>
              </div>
            </div>
            <div className="mytext flex items-center justify-center bg-blue-600 rounded">
              <strong className="block p-2 ">Attendance</strong>
            </div>
          </div>

          <div className="bg-[#5B5F97] rounded-md shadow-md text-white text-center">
            <div className="flex items-center justify-center gap-2 p-3">
              <div className="icon">
                <FaMoneyBillTrendUp size={35}></FaMoneyBillTrendUp>
              </div>
              <div className="border-l-2 w-full ">
                <div className="flex items-center justify-between px-4 w-full gap-2 ">
                  <h2>Total Visit</h2>
                  <h2>25</h2>
                </div>

                <div className="flex items-center justify-between  px-4 w-full gap-2 ">
                  <h2>Expense</h2>
                  <h2>25K</h2>
                </div>

                <div className="flex items-center justify-between  px-4 w-full gap-2 ">
                  <h2>Outstation</h2>
                  <h2>25K</h2>
                </div>

                <div className="flex items-center justify-between  px-4 w-full gap-2 ">
                  <h2>Interstate</h2>
                  <h2>25K</h2>
                </div>
              </div>
            </div>
            <div className="mytext flex items-center justify-center bg-pink-600 rounded">
              <strong className="block p-2">My Expense</strong>
            </div>
          </div>

          <div className="bg-[#FFA737] rounded-md shadow-md text-white text-center">
            <div className="flex items-center justify-center gap-2 p-3">
              <div className="icon">
                <FaMoneyBillTrendUp size={35}></FaMoneyBillTrendUp>
              </div>
              <div className="border-l-2 w-full ">
                <div className="flex items-center justify-between px-4 w-full gap-2 ">
                  <h2>Total Visit</h2>
                  <h2>25</h2>
                </div>

                <div className="flex items-center justify-between  px-4 w-full gap-2 ">
                  <h2>Expense</h2>
                  <h2>25K</h2>
                </div>

                <div className="flex items-center justify-between  px-4 w-full gap-2 ">
                  <h2>Outstation</h2>
                  <h2>25K</h2>
                </div>

                <div className="flex items-center justify-between  px-4 w-full gap-2 ">
                  <h2>Interstate</h2>
                  <h2>25K</h2>
                </div>
              </div>
            </div>
            <div className="mytext flex items-center justify-center bg-teal-600 rounded">
              <strong className="block p-2">My Team</strong>
            </div>
          </div>
          <div className="bg-[#5B1865] rounded-md shadow-md text-white text-center">
            <div className="flex items-center justify-center gap-2 p-3">
              <div className="icon">
                <FaMoneyBillTrendUp size={35}></FaMoneyBillTrendUp>
              </div>
              <div className="border-l-2 w-full ">
                <div className="flex items-center justify-between px-4 w-full gap-2 ">
                  <h2>Total Visit</h2>
                  <h2>25</h2>
                </div>

                <div className="flex items-center justify-between  px-4 w-full gap-2 ">
                  <h2>Expense</h2>
                  <h2>25K</h2>
                </div>

                <div className="flex items-center justify-between  px-4 w-full gap-2 ">
                  <h2>Outstation</h2>
                  <h2>25K</h2>
                </div>

                <div className="flex items-center justify-between  px-4 w-full gap-2 ">
                  <h2>Interstate</h2>
                  <h2>25K</h2>
                </div>
              </div>
            </div>
            <div className="mytext flex items-center justify-center bg-rose-600 rounded">
              <strong className="block p-2">Approvals</strong>
            </div>
          </div>
        </div>

        {/* chat gird display  */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {/* new users  */}
          <div className="bg-teal-800 text-white p-4 rounded-md shadow-md">
            <div className="flex items-center justify-between w-full">
              <h2>Latest Members</h2>
              <div className="flex items-center justify-between gap-2">
                <h2>8 new Members</h2>
                <button><FaRegWindowMinimize/></button>
                <button><AiOutlineClose/></button>
              </div>
            </div>
            <div className="grid grid-cols-4 md:grid-cols-4 lg:grid-cols-4 gap-2 mt-2">
              {users.map((item) => (
                <div className="flex flex-col items-center justify-center">
                  <img className="h-[3.5rem] w-[3.5rem] rounded-full" src={item.img}></img>
                  <div className="mt-2 flex flex-col items-center justify-center">
                    <h2 className="text-sm">{item.name}</h2>
                    <h3 className="text-xs">{item.time}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* chat box  */}
          <div className="bg-teal-800 text-white p-4 rounded-md shadow-md">
            <div className="flex items-center justify-between w-full">
              <h2>Latest Members</h2>
              <div className="flex items-center justify-between gap-2">
                <h2>8 new Members</h2>
                <button><FaRegWindowMinimize/></button>
                <button><AiOutlineClose/></button>
              </div>
            </div>
            <div className="grid grid-cols-4 md:grid-cols-4 lg:grid-cols-4 gap-2 mt-2">
              {users.map((item) => (
                <div className="flex flex-col items-center justify-center">
                  <img className="h-[3.5rem] w-[3.5rem] rounded-full" src={item.img}></img>
                  <div className="mt-2 flex flex-col items-center justify-center">
                    <h2 className="text-sm">{item.name}</h2>
                    <h3 className="text-xs">{item.time}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white p-4 rounded-md shadow-md">
            <p className="text-gray-800">Satish</p>
            <p className="text-gray-600">Check</p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;
