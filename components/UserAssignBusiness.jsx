import React, { useState } from "react";
import Layout from "./Layout";
import { AiTwotoneHome } from "react-icons/ai";
import { TiArrowBack } from "react-icons/ti";
import { useRouter } from "next/router";
const UserAssignBusiness = () => {
  const router = useRouter();
  return (
    <>
      <Layout>
        <div className="h-screen overflow-auto w-full font-arial bg-white ">
          <div className="text-black flex items-center justify-between bg-white max-w-full font-arial h-[52px] px-5">
            <h2 className="font-arial font-normal text-3xl  py-2">User Map With Business Structure </h2>
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
                <AiTwotoneHome className="text-red-500" size={34}></AiTwotoneHome>
              </h2>
            </div>
          </div>

          {/* <div className="bg-gray-300"></div> */}
          <div className="text-black h-screen  ">
            <div className="bg-gray-100 pt-1 h-screen ">
              <div className="max-w-1/2 mx-4 mt-4 bg-white rounded shadow p-4">
                <div className="mb-3 w-1/6">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="mapId">
                    Map ID
                  </label>
                  <input
                    disabled
                    className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                    type="text"
                    id="mapId"
                    placeholder=""
                  />
                </div>
                <div className="mb-3 w-1/3">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="userName">
                    <span className="text-red-500 p-1">*</span>User Name
                  </label>
                  <select
                    className="w-full px-3 py-2 border-b border-gray-500 rouded bg-white focus:outline-none focus:border-b focus-border-indigo-500"
                    id="userName"
                  >
                    <option value="" className="focus:outline-none focus:border-b bg-white">
                      {/* Option */}
                    </option>
                    <option value="user1">User 1</option>
                    <option value="user2">User 2</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="mb-3">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="territory">
                      <span className="text-red-500 p-1">*</span>Territory
                    </label>
                    <select
                      className="w-full px-3 py-2 border-b border-gray-500 rouned bg-white focus:outline-none focus:border-b focus-border-indigo-500"
                      id="territory"
                    >
                      <option value="" className="focus:outline-none focus:border-b bg-white">
                        {/* Option */}
                      </option>
                      <option value="user1">User 1</option>
                      <option value="user2">User 2</option>
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="region">
                      <span className="text-red-500 p-1">*</span>Region
                    </label>
                    <select
                      className="w-full px-3 py-2 border-b border-gray-500 rouded bg-white focus:outline-none focus:border-b focus-border-indigo-500"
                      id="region"
                    >
                      <option value="" className="focus:outline-none focus:border-b bg-white">
                        {/* Option */}
                      </option>
                      <option value="user1">User 1</option>
                      <option value="user2">User 2</option>
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="zone">
                      <span className="text-red-500 p-1">*</span>Zone
                    </label>
                    <select
                      className="w-full px-3 py-2 border-b border-gray-500 rouded bg-white focus:outline-none focus:border-b focus-border-indigo-500"
                      id="zone"
                    >
                      <option value="" className="focus:outline-none focus:border-b bg-white">
                        {/* Option */}
                      </option>
                      <option value="user1">User 1</option>
                      <option value="user2">User 2</option>
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="unitDivision">
                      <span className="text-red-500 p-1">*</span>Unit Division
                    </label>
                    <select
                      className="w-full px-3 py-2 border-b border-gray-500 rouded bg-white focus:outline-none focus:border-b focus-border-indigo-500"
                      id="unitDivision"
                    >
                      <option value="" className="focus:outline-none focus:border-b bg-white">
                        {/* Option */}
                      </option>
                      <option value="user1">User 1</option>
                      <option value="user2">User 2</option>
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="businessSegment">
                      <span className="text-red-500 p-1">*</span>Business Segment
                    </label>
                    <select
                      className="w-full px-3 py-2 border-b border-gray-500 rouded bg-white focus:outline-none focus:border-b focus-border-indigo-500"
                      id="businessSegment"
                    >
                      <option value="" className="focus:outline-none focus:border-b bg-white">
                        {/* Option */}
                      </option>
                      <option value="user1">User 1</option>
                      <option value="user2">User 2</option>
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="company">
                      <span className="text-red-500 p-1">*</span>Company
                    </label>
                    <select
                      className="w-full px-3 py-2 border-b border-gray-500 rouded bg-white focus:outline-none focus:border-b focus-border-indigo-500"
                      id="company"
                    >
                      <option value="" className="focus:outline-none focus:border-b bg-white">
                        {/* Option */}
                      </option>
                      <option value="user1">User 1</option>
                      <option value="user2">User 2</option>
                    </select>
                  </div>
                </div>

                <div className="button flex items-center gap-3 mt-6">
                  <button className="bg-green-700 px-4 py-1 text-white">Save</button>
                  <button className="bg-yellow-500 px-4 py-1 text-white">Close</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default UserAssignBusiness;
