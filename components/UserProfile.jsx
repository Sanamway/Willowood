import React, { useState } from "react";
import Layout from "./Layout";
import { AiTwotoneHome } from "react-icons/ai";
import { TiArrowBack } from "react-icons/ti";
import { useRouter } from "next/router";
import Image from "next/image";
import ProfImg from "../public/userimg.jpg";
import { BsThreeDotsVertical } from "react-icons/bs";

const UserProfile = () => {
  const router = useRouter()
  const now = new Date();
  const dateString = now.toLocaleString();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleEdit = () => {
    setShowEdit(true);
  };

  const closeHandle = () => {
    setShowEdit(false);
  };

  const data = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam dolorem iure excepturi
  explicabo ducimus eveniet, est rem sequi officiis distinctio?`;
  return (
    <>
      {/* <div className=" h-screen overflow-auto w-full font-arial bg-white container  "> */}
      <div className=" w-[1000px] mx-auto px-4 sm:px-8 bg-gray-100 p-4 pb-20  text-black overflow-y-auto ">
        <div className="text-black flex items-center justify-between bg-white max-w-full font-arial h-[52px] px-5">
          <h2 className="font-arial font-normal text-3xl  py-2">Profile </h2>
          <div className="flex items-center gap-2 cursor-pointer">
            <h2>
              <TiArrowBack
                onClick={() => {
                  router.push("/table/table_user_profile");
                }}
                className="text-gray-400"
                size={35}
              ></TiArrowBack>
            </h2>
            <h2>
              <AiTwotoneHome
                onClick={() => {
                  router.push("/");
                }}
                className="text-red-500"
                size={34}
              ></AiTwotoneHome>
            </h2>
          </div>
        </div>

        {/* <div className="bg-gray-300"></div> */}
        <div className="text-black h-screen  ">
          <div className="bg-gray-100 pt-1  pb-44  ">
            <div className="relative flex rounded-lg bg-white mt-8  items-center justify-start max-w-full p-12 mx-20 gap-12 ">
              <div className="flex ">
                <Image className=" w-52 h-52 rounded-full" src={ProfImg}></Image>
              </div>
              <div className="flex flex-col flex-items-center justify-between">
                <div className="grid grid-cols-2 w-full gap-4">
                  <div className="flex items-center">
                    <h2>Employee Code</h2>
                  </div>
                  <div>
                    <div>343648364</div>
                  </div>

                  <div className="flex items-center">
                    <h2>Name</h2>
                  </div>
                  <div>
                    <div>343648364</div>
                  </div>

                  <div className="flex items-center">
                    <h2>Designation</h2>
                  </div>
                  <div>
                    <div>Senior Developer</div>
                  </div>

                  <div className="flex items-center">
                    <h2>Mobile</h2>
                  </div>
                  <div>
                    <div>Xxxxxxxxxxxxxxxxxxxxxx</div>
                  </div>

                  <div className="flex items-center">
                    <h2>Email</h2>
                  </div>
                  <div>
                    <div>XXXXXXXXXXXXXXXX</div>
                  </div>

                  <div className="flex items-center">
                    <h2>Status</h2>
                  </div>
                  <div>
                    <div>xxxxxxxxxxxxxxxxxxxx</div>
                  </div>
                </div>
              </div>

              <div className="edit absolute top-2 right-4 flex items-center  ">
                <h2 className="text-gray-400">Last Check in:</h2>
                {/* <BsThreeDotsVertical className="text-black cursor-pointer" size={25}></BsThreeDotsVertical> */}
              </div>
            </div>

            {/* strip */}

            <div className=" flex bg-white mt-2 mx-20 rounded-lg items-center justify-start max-w-full px-5 ">
              <h1 className="font-arial font-normal text-3xl  py-2">Business Structure</h1>
            </div>

            <div className=" flex mx-20 mt-2 bg-white  items-center justify-start max-w-full px-5 ">
              <div className="flex  items-center flex-wrap justify-start py-5 px-12 gap-4 ">
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
                    Territory
                  </label>
                  <input
                    disabled
                    className="w-full px-2 py-2 borde rounded-md border-gray-300 focus:outline-none focus:border-indigo-500"
                    type="text"
                    id="inputField"
                    placeholder="Territory"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
                    Region
                  </label>
                  <input
                    disabled
                    className="w-full px-3 py-2 borde rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                    type="text"
                    id="inputField"
                    placeholder="Region"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
                    Zone
                  </label>
                  <input
                    disabled
                    className="w-full px-3 py-2 borde rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                    type="text"
                    id="inputField"
                    placeholder="Zone"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
                    BUsiness Unit
                  </label>
                  <input
                    disabled
                    className="w-full px-3 py-2 borde rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                    type="text"
                    id="inputField"
                    placeholder="Business Unit"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
                    Segment
                  </label>
                  <input
                    disabled
                    className="w-full px-3 py-2 borde rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                    type="text"
                    id="inputField"
                    placeholder="Segment"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
                    Company
                  </label>
                  <input
                    disabled
                    className="w-full px-3 py-2 borde rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                    type="text"
                    id="inputField"
                    placeholder="Company"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
                    Reporting Manager
                  </label>
                  <input
                    disabled
                    className="w-full px-3 py-2 borde rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                    type="text"
                    id="inputField"
                    placeholder="Reporting Manager"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
                    Mobile No.
                  </label>
                  <input
                    disabled
                    className="w-full px-3 py-2 borde rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                    type="text"
                    id="inputField"
                    placeholder="Mobile No."
                  />
                </div>
              </div>
            </div>

            <div className=" flex bg-white mt-2 mx-20 items-center justify-start max-w-full px-5 ">
              <h1 className="font-arial font-normal text-3xl  py-2">Target vs Actual</h1>
            </div>

            <div className=" flex flex-col bg-white mt-2 mx-20 items-center justify-start max-w-full px-5 ">
              <div className="flex flex-col w-full p-2 mt-4">
                <h2>Rolling Vs Actual Sales</h2>
                {/* <div className="w-full bg-gray-200  dark:bg-gray-700 my-2">
                  <div
                    className="bg-green-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none"
                    style={{ width: "85%" }}
                  >
                    85%
                  </div>
                </div> */}
                <div className="demo-preview ">
                  <div className="progress progress-striped active">
                    <div
                      role="progressbar "
                      style={{ width: `80%` }}
                      className="progress-bar progress-bar-success rounded-md h-4"
                    >
                      <span className="inline-block"></span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col w-full p-2 ">
                <h2>Collection Plain Vs Actual Plain</h2>
                {/* <div className="w-full bg-gray-200  dark:bg-gray-700 my-2">
                  <div
                    className="bg-green-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none "
                    style={{ width: "85%" }}
                  >
                    85%
                  </div>
                </div> */}
                <div className="demo-preview">
                  <div className="progress progress-striped active">
                    <div
                      role="progressbar "
                      style={{ width: `80%` }}
                      className="progress-bar progress-bar-success rounded-md h-4"
                    >
                      <span className="inline-block"></span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col w-full p-2">
                <h2>Sales Vs Collection</h2>
                {/* <div className="w-full bg-gray-200  dark:bg-gray-700 my-2">
                  <div
                    className="bg-green-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none "
                    style={{ width: "85%" }}
                  >
                    85%
                  </div>
                </div> */}
                <div className="demo-preview">
                  <div className="progress progress-striped active">
                    <div
                      role="progressbar "
                      style={{ width: `80%` }}
                      className="progress-bar progress-bar-success rounded-md h-4"
                    >
                      <span className="inline-block"></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className=" flex bg-white mt-2 mx-20  rounded-lg items-center justify-start max-w-full px-5 ">
              <h1 className="font-arial font-normal text-3xl  py-2">About Me</h1>
            </div>

            <div className="text-black relative rounded-lg h-64  flex flex-col bg-white mt-2 mb-10 mx-20 items-center justify-start max-w-full px-5 ">
              {!showEdit ? (
                <div className="flex items-center justify-start w-full p-4 ">{data}</div>
              ) : (
                <div className="flex flex-col items-center justify-start w-full p-4 ">
                  <textarea
                    rows={6}
                    defaultValue={data}
                    className="w-full px-3 py-1.5  border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                    id="textareaField"
                    placeholder=""
                  ></textarea>
                  <div className="button flex items-center gap-3 mt-1">
                    <button className="bg-green-700 px-4 py-1 text-white">Save</button>
                    <button onClick={closeHandle} className="bg-yellow-500 px-4 py-1 text-white">
                      Close
                    </button>
                  </div>
                </div>
              )}
              <div className="btn absolute top-2 right-0">
                <BsThreeDotsVertical
                  onClick={toggleDropdown}
                  className="text-black cursor-pointer"
                  size={25}
                ></BsThreeDotsVertical>
              </div>

              {isDropdownOpen && (
                <div className="absolute mt-10 right-2  w-40 bg-white text-black border rounded-md shadow-md">
                  <ul className="py-2 p text-text-black flex flex-col gap-2 px-4 font-Rale cursor-pointer">
                    <li onClick={handleEdit}> Edit</li>
                  </ul>
                </div>
              )}
            </div>

            {/* end container */}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
