import React from "react";
import Layout from "../Layout";
import { AiFillFileExcel, AiTwotoneHome } from "react-icons/ai";
import { TiArrowBack } from "react-icons/ti";
import { useRouter } from "next/router";
const CompanyInfo = () => {
  const router = useRouter();

  return (
    <Layout>
      <div className="h-screen overflow-auto w-full font-arial bg-white ">
        <div className="text-black flex items-center justify-between bg-white max-w-6/12 font-arial h-[52px] px-5">
          <h2 className="font-arial font-normal text-3xl  py-2">
            Company Info
          </h2>
          <div className="flex items-center gap-2 cursor-pointer">
            <h2>
              <TiArrowBack
                onClick={() => {
                  router.push("/table/table_company_info");
                }}
                className="text-gray-400"
                size={35}
              />
            </h2>
            <h2>
              <AiTwotoneHome
                className="text-red-500"
                size={34}
                onClick={() => {
                  router.push("/");
                }}
              />
            </h2>
          </div>
        </div>

        <div className="bg-gray-0 p-4 bg-gray-100  w-full flex items-start ">
          <form className=" bg-white rounded shadow p-4 w-full mb-8 "  onSubmit={(e) => e.preventDefault()}>
            <div className="mb-4 w-1/6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="inputField"
              >
                <small className="text-red-600">*</small> Comapany Id
              </label>
              <input
                className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                type="text"
                id="inputField"
                placeholder="Comapany Id"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="inputField"
              >
                <small className="text-red-600">*</small> Company Name
              </label>
              <input
                className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                type="text"
                id="inputField"
                placeholder="Company Name"
              />
            </div>
            <div className="flex w-full justify-between gap-4">
              <div className="w-full">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="textareaField"
                >
                  <small className="text-red-600">*</small> Corporate Address
                </label>
                <textarea
                  className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                  id="textareaField"
                  placeholder="Corporate Address"
                  rows="6"
                ></textarea>
              </div>
              <div className="w-full">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="textareaField"
                >
                  <small className="text-red-600">*</small> Sale. Address
                </label>
                <textarea
                  className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                  id="textareaField"
                  rows="6"
                  placeholder="Sale Address"
                ></textarea>
              </div>
            </div>

            <div className="flex w-full justify-between gap-4 mt-4">
              <div className="w-full">
                <div className="flex w-full justify-between gap-4">
                  <div className="w-1/2 px-2">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="userSelect"
                    >
                      <small className="text-red-600">*</small> City
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
                      htmlFor="userSelect"
                    ></label>
                    <small className="text-red-600">*</small> State{" "}
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
                </div>
                <div className="flex w-full justify-between gap-4"></div>
              </div>

              <div className="w-full">
                <div className="flex w-full justify-between gap-4">
                  <div className="w-1/2 px-2">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="userSelect"
                    >
                      <small className="text-red-600">*</small> City
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
                      htmlFor="userSelect"
                    ></label>
                    <small className="text-red-600">*</small> State{" "}
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
                </div>
              </div>
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
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="inputField"
              >
                <small className="text-red-600">*</small> Contact Person
              </label>
              <input
                className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                type="text"
                id="inputField"
                placeholder="Contact Person"
              />
            </div>
            <div className="w-1/2">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="inputField"
              >
                <small className="text-red-600">*</small> GST Number
              </label>
              <input
                className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                type="text"
                id="inputField"
                placeholder="GST Number"
              />
            </div>
            <div className="button flex items-center gap-3 mt-6">
              <div className="bg-green-700 px-4 py-1 text-white">Save</div>
              <button
                className="bg-yellow-500 px-4 py-1 text-white"
                onClick={() => {
                  router.push("/table/table_company_info");
                }}
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default CompanyInfo;
