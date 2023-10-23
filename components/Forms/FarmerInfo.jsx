import React from "react";
import Layout from "../Layout";
import { AiTwotoneHome } from "react-icons/ai";
import { TiArrowBack } from "react-icons/ti";
import { useRouter } from "next/router";
const FarmerInfo = () => {
  const router = useRouter();
  return (
    <Layout>
      <div className="h-screen overflow-auto w-full font-arial bg-white ">
        <div className="flex flex-row justify-between  h-max  px-5">
          <h2 className="font-arial font-normal text-3xl  py-2">Farmer Info</h2>
          <span className="flex items-center gap-2 cursor-pointer">
            <TiArrowBack
              onClick={() => {
                router.push("/table/table_farmer");
              }}
              className="text-gray-400"
              size={35}
            />

            <AiTwotoneHome className="text-red-500" size={34} />
          </span>
        </div>

        <div className="bg-gray-0 p-4 bg-gray-100  w-full flex items-start ">
          <form
            className=" flex flex-col gap-4 bg-white rounded shadow p-4 w-full mb-8 "
            onSubmit={(e) => e.preventDefault()}
          >
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="inputField"
            >
              <small className="text-red-600">*</small> Farmer Id
              <input
                className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500 mt-2"
                type="text"
                id="inputField"
                placeholder="Farmer Id"
              />
            </label>

            <div className="flex w-full  gap-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2 w-full"
                htmlFor="inputField"
              >
                <small className="text-red-600">*</small> Farmer Name{" "}
                <input
                  className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500 mt-2"
                  type="text"
                  id="inputField"
                  placeholder="Farmer Name"
                />
              </label>

              <label
                className="block text-gray-700 text-sm font-bold mb-2 w-full"
                htmlFor="inputField"
              >
                <small className="text-red-600">*</small> Farmer Father Name
                <input
                  className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500 mt-2"
                  type="text"
                  id="inputField"
                  placeholder="Farmer Name"
                />
              </label>
            </div>

            <div className="flex w-full">
              <label
                className="block text-gray-700 text-sm font-bold mb-2 w-full"
                htmlFor="textareaField"
              >
                <small className="text-red-600">*</small> Farmer Address
                <textarea
                  className="w-full px-2 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500 mt-2"
                  id="textareaField"
                  placeholder="Farmer Address"
                  rows="6"
                ></textarea>
              </label>

              <div className="flex flex-col gap-2 w-full justify-around mx-2">
                <div className="w-full flex flex-row gap-2 ">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="userSelect"
                  >
                    <span className="text-red-500 p-1">*</span>Farmer Types
                    <select
                      className="w-full px-3 py-2 border-b border-gray-500 rounded- bg-white focus:outline-none focus:border-b focus:border-indigo-500 mt-2"
                      id="userSelect"
                    >
                      <option
                        value=""
                        className="focus:outline-none focus:border-b bg-white"
                      >
                        Select
                      </option>
                      <option value="user1">User 1</option>
                      <option value="user2">User 2</option>
                    </select>
                  </label>

                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="userSelect"
                  >
                    <span className="text-red-500 p-1">*</span>Farmer Category
                    <select
                      className="w-full px-3 py-2 border-b border-gray-500 rounded- bg-white focus:outline-none focus:border-b focus:border-indigo-500 mt-2"
                      id="userSelect"
                    >
                      <option
                        value=""
                        className="focus:outline-none focus:border-b bg-white"
                      >
                        Select
                      </option>
                      <option value="user1">User 1</option>
                      <option value="user2">User 2</option>
                    </select>
                  </label>
                </div>

                <label
                  className="block text-gray-700 text-sm font-bold "
                  htmlFor="inputField"
                >
                  <small className="text-red-600">*</small> Land Information
                  <input
                    className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500 mt-2"
                    type="text"
                    id="inputField"
                    placeholder="Land Information"
                  />
                </label>
              </div>
            </div>

            <div className="flex flex-row gap-2 w-full">
              <label
                className="block text-gray-700 text-sm font-bold w-full "
                htmlFor="inputField"
              >
                <small className="text-red-600">*</small> Village Name
                <select
                  className="w-full px-3 py-2 border-b border-gray-500 rounded- bg-white focus:outline-none focus:border-b focus:border-indigo-500 mt-2"
                  id="userSelect"
                >
                  <option
                    value=""
                    className="focus:outline-none focus:border-b bg-white"
                  >
                    Select
                  </option>
                  <option value="user1">User 1</option>
                  <option value="user2">User 2</option>
                </select>
              </label>

              <label
                className="block text-gray-700 text-sm font-bold w-full "
                htmlFor="inputField"
              >
                <small className="text-red-600">*</small> Pin Code
                <input
                  className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500 mt-2"
                  type="text"
                  id="inputField"
                  placeholder="Pin Code"
                />
              </label>

              <label
                className="block text-gray-700 text-sm font-bold w-full "
                htmlFor="inputField"
              >
                <small className="text-red-600">*</small> Post Office
                <input
                  className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500 mt-2"
                  type="text"
                  id="inputField"
                  placeholder="Post Office"
                />
              </label>
            </div>

            <div className="flex flex-row gap-2 w-full">
              <label
                className="block text-gray-700 text-sm font-bold w-full "
                htmlFor="inputField"
              >
                <small className="text-red-600">*</small> District
                <select
                  className="w-full px-3 py-2 border-b border-gray-500 rounded- bg-white focus:outline-none focus:border-b focus:border-indigo-500 mt-2"
                  id="userSelect"
                >
                  <option
                    value=""
                    className="focus:outline-none focus:border-b bg-white"
                  >
                    Select
                  </option>
                  <option value="user1">User 1</option>
                  <option value="user2">User 2</option>
                </select>
              </label>
              s
              <label
                className="block text-gray-700 text-sm font-bold mb-2 w-full"
                htmlFor="userSelect"
              >
                <span className="text-red-500 p-1">*</span> Territory
                <select
                  className="w-full px-3 py-2 border-b border-gray-500 rounded- bg-white focus:outline-none focus:border-b focus:border-indigo-500 mt-2"
                  id="userSelect"
                >
                  <option
                    value=""
                    className="focus:outline-none focus:border-b bg-white"
                  >
                    Select
                  </option>
                  <option value="user1">User 1</option>
                  <option value="user2">User 2</option>
                </select>
              </label>
            </div>

            <div className="flex flex-row gap-2 w-full">
              <label
                className="block text-gray-700 text-sm font-bold mb-2 w-full"
                htmlFor="userSelect"
              >
                <span className="text-red-500 p-1">*</span> Region
                <select
                  className="w-full px-3 py-2 border-b border-gray-500 rounded- bg-white focus:outline-none focus:border-b focus:border-indigo-500 mt-2"
                  id="userSelect"
                >
                  <option
                    value=""
                    className="focus:outline-none focus:border-b bg-white"
                  >
                    Select
                  </option>
                  <option value="user1">User 1</option>
                  <option value="user2">User 2</option>
                </select>
              </label>
              <label
                className="block text-gray-700 text-sm font-bold mb-2 w-full"
                htmlFor="userSelect"
              >
                <span className="text-red-500 p-1">*</span> Zone
                <select
                  className="w-full px-3 py-2 border-b border-gray-500 rounded- bg-white focus:outline-none focus:border-b focus:border-indigo-500 mt-2"
                  id="userSelect"
                >
                  <option
                    value=""
                    className="focus:outline-none focus:border-b bg-white"
                  >
                    Select
                  </option>
                  <option value="user1">User 1</option>
                  <option value="user2">User 2</option>
                </select>
              </label>
            </div>

            <div className="flex flex-row gap-2 w-full">
              <label
                className="block text-gray-700 text-sm font-bold mb-2 w-full"
                htmlFor="userSelect"
              >
                <span className="text-red-500 p-1">*</span> Busines Segment
                <select
                  className="w-full px-3 py-2 border-b border-gray-500 rounded- bg-white focus:outline-none focus:border-b focus:border-indigo-500 mt-2"
                  id="userSelect"
                >
                  <option
                    value=""
                    className="focus:outline-none focus:border-b bg-white"
                  >
                    Select
                  </option>
                  <option value="user1">User 1</option>
                  <option value="user2">User 2</option>
                </select>
              </label>

              <label
                className="block text-gray-700 text-sm font-bold mb-2 w-full"
                htmlFor="userSelect"
              >
                <span className="text-red-500 p-1">*</span> Unit Division
                <select
                  className="w-full px-3 py-2 border-b border-gray-500 rounded- bg-white focus:outline-none focus:border-b focus:border-indigo-500 mt-2"
                  id="userSelect"
                >
                  <option
                    value=""
                    className="focus:outline-none focus:border-b bg-white"
                  >
                    Select
                  </option>
                  <option value="user1">User 1</option>
                  <option value="user2">User 2</option>
                </select>
              </label>
            </div>

            <span className="button flex items-center gap-3 mt-6">
              <button className="bg-green-700 px-4 py-1 text-white">
                Save
              </button>
              <button
                className="bg-yellow-500 px-4 py-1 text-white"
                onClick={() => {
                  router.push("/table/table_farmer");
                }}
              >
                Close
              </button>
            </span>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default FarmerInfo;
