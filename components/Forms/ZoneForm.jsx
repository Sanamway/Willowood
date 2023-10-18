import React from "react";
import Layout from "../Layout";
import { TiArrowBack } from "react-icons/ti";
import { useRouter } from "next/router";
import { AiTwotoneHome } from "react-icons/ai";
const UserProfileForm = () => {
  const router = useRouter();

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
    // Add more menus as needed
  ];

  return (
    <Layout>
      <div className="h-screen overflow-auto w-full font-arial bg-white ">
        <div className="text-black flex items-center justify-between bg-white max-w-6/12 font-arial h-[52px] px-5">
          <h2 className="font-arial font-normal text-3xl  py-2">Zone</h2>
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

        <div className="bg-gray-0 p-4 bg-gray-100  w-full flex items-start w-full ">
          <form className=" bg-white rounded shadow p-4 w-full ">
            <div className="mb-4 w-1/6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="inputField"
              >
                Zone ID
              </label>
              <input
                className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                type="text"
                id="inputField"
                placeholder="Zone ID"
              />
            </div>

            <div className="flex -mx-2 mb-4">
              <div className="w-1/2 px-2">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="citySelect"
                >
                  <small className="text-red-600">*</small> Company
                </label>
                <select
                  className="w-full px-3 py-2 border-b border-gray-500 rounded-md bg-white focus:outline-none focus:border-b focus:border-indigo-500"
                  id="citySelect"
                >
                  <option
                    value=""
                    className="focus:outline-none focus:border-b bg-white"
                  >
                    Option
                  </option>
                  <option value="city1">City 1</option>
                  <option value="city2">City 2</option>
                </select>
              </div>
              <div className="w-1/2 px-2">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="stateSelect"
                >
                  <small className="text-red-600">*</small> Business Segment
                </label>
                <select
                  className="w-full px-3 py-2 border-b border-gray-500 rounded-md bg-white focus:outline-none focus:border-b focus:border-indigo-500"
                  id="stateSelect"
                >
                  <option
                    value=""
                    className="focus:outline-none focus:border-b bg-white"
                  >
                    Option
                  </option>
                  <option value="state1">State 1</option>
                  <option value="state2">State 2</option>
                </select>
              </div>
            </div>
            <div className="flex -mx-2 mb-4">
              <div className="w-1/2 px-2">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="userSelect"
                >
                  <small className="text-red-600">*</small> Unit Division
                </label>
                <select
                  className="w-full px-3 py-2 border-b border-gray-500 rounded-md bg-white focus:outline-none focus:border-b focus:border-indigo-500"
                  id="userSelect"
                >
                  <option
                    value=""
                    className="focus:outline-none focus:border-b bg-white"
                  >
                    Option
                  </option>
                  <option value="user1">User 1</option>
                  <option value="user2">User 2</option>
                </select>
              </div>
              <div className="w-1/2 px-2">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="emailField"
                >
                  <small className="text-red-600">*</small> Zone
                </label>
                <input
                  className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                  id="emailField"
                  placeholder="Zone"
                />
              </div>
            </div>
            <div className="w-1/2 px-2">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="emailField"
                >
                  <small className="text-red-600">*</small> H.O.D Name
                </label>
                <input
                  className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                  id="emailField"
                  placeholder="H.O.D Name"
                />
              </div>
            <div className="flex w-full justify-between gap-4 mt-4 mb-4">
              <div className="w-full">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="inputField"
                >
                  <small className="text-red-600">*</small> Mobile
                </label>
                <input
                  className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                  type="text"
                  id="inputField"
                  placeholder="Mobile"
                />
              </div>
              <div className="w-full">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="inputField"
                >
                  <small className="text-red-600">*</small> Email
                </label>
                <input
                  className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                  type="email"
                  id="inputField"
                  placeholder="Email"
                />
              </div>
            </div>

            <button
              className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold w-24 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              <small className="text-sm">Submit</small>
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default UserProfileForm;
