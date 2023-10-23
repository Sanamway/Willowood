import React from "react";
import Layout from "../../components/Layout";
import { AiTwotoneHome } from "react-icons/ai";

import { TbFileDownload } from "react-icons/tb";
import { AiOutlineSearch } from "react-icons/ai";
import { useRouter } from "next/router";
import { useRef } from "react";
import { CSVLink } from "react-csv";
const UserInformation = () => {
  const router = useRouter();
  const headers = [
    { label: "First Id", key: "firstname" },
    { label: "Farmer Name", key: "lastname" },
    { label: "Father Name", key: "email" },
    { label: "Address", key: "firstname" },
    { label: "Types", key: "lastname" },
    { label: "Category", key: "email" },
    { label: "Village", key: "email" },
    { label: "Pincode", key: "email" },
    { label: "Post Office", key: "email" },
    { label: "Territory", key: "email" },
    { label: "District", key: "email" },
    { label: "Zone", key: "email" },
    { label: "Region", key: "email" },
  ];

  const data = [
    { firstname: "Ahmed", lastname: "Tomi", email: "ah@smthing.co.com" },
    { firstname: "Raed", lastname: "Labes", email: "rl@smthing.co.com" },
    { firstname: "Yezzi", lastname: "Min l3b", email: "ymin@cocococo.com" },
  ];
  const dummyData = [
    {
      id: 1,
      username: "Ironman",
      address: "Address A",
      city: "city A",
      state: "state",
      email: "email@email.com",
      mobile: "84845485",
      user_profile: "user a",
      status: "enabled",
    },
    {
      id: 2,
      username: "Ironman",
      address: "Address B",
      city: "city B",
      state: "state",
      email: "email@email.com",
      mobile: "84845485",
      user_profile: "user b",
      status: "enabled",
    },
    {
      id: 3,
      username: "Ironman",
      address: "Address C",
      city: "city C",
      state: "state",
      email: "email@email.com",
      mobile: "84845485",
      user_profile: "user C",
      status: "enabled",
    },
    {
      id: 4,
      username: "Ironman",
      address: "Address C",
      city: "city C",
      state: "state",
      email: "email@email.com",
      mobile: "84845485",
      user_profile: "user C",
      status: "enabled",
    },
  ];
  const tableRef = useRef(null);

  return (
    <Layout>
      <div className="h-screen overflow-auto w-full ">
        <div className="text-black flex items-center justify-between bg-white max-w-full font-arial h-[52px] px-5">
          <h2 className="font-arial font-normal text-3xl  py-2">
            Farmer Information
          </h2>
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="search gap-2 mx-8">
              <div className="container">
                <form className="form flex items-center ">
                  <input
                    type="search"
                    placeholder="Search"
                    className="bg-white border rounded-l-md p-1 outline-none  w-48 sm:w-72"
                  />
                  <button
                    type="submit"
                    className="bg-blue-500 text-white rounded-r-md p-1 "
                  >
                    <AiOutlineSearch
                      className="mx-2 my-1"
                      size={20}
                    ></AiOutlineSearch>
                  </button>
                </form>
              </div>
            </div>
            <h2>
              <CSVLink data={data} headers={headers}>
                <TbFileDownload
                  className="text-green-600"
                  size={34}
                ></TbFileDownload>
              </CSVLink>
              
            </h2>

            <h2>
              <AiTwotoneHome className="text-red-500" size={34}></AiTwotoneHome>
            </h2>
            <button
              onClick={() => {
                router.push("/form/farmer_info_form");
              }}
              className=" text-white py-1.5 px-2 rounded-md bg-green-500 hover:bg-orange-500"
            >
              Create New
            </button>
          </div>
        </div>

        <div className="bg-white h-screen flex items-start justify-center max-w-full">
          <div
            className=" text-black font-arial scrollbar-hide overflow-x-auto w-[1000px]"
            ref={tableRef}
          >
            <table className="min-w-full divide-y border- divide-gray-200 ">
              <thead className="border-b">
                <tr className="bg-gray-50 font-arial">
                  <th className="  px-6 py-2 text-left dark:border-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                  <th className="px-6 w py-2 whitespace-nowrap text-left dark:border-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Farmer Id
                  </th>
                  <th className="px-6  py-2 text-left dark:border-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6  py-2 whitespace-nowrap text-left dark:border-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Father Name
                  </th>
                  <th className="px-6  py-2 text-left dark:border-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Address
                  </th>

                  <th className="px-6  py-2 text-left dark:border-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Types
                  </th>
                  <th className="px-6  py-2 text-left dark:border-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>

                  <th className="px-6  py-2  whitespace-nowrap text-left dark:border-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Village Name
                  </th>
                  <th className="px-6  py-2  whitespace-nowrap text-left dark:border-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Pin Code
                  </th>
                  <th className="px-6  py-2  whitespace-nowrap text-left dark:border-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Post Office
                  </th>
                  <th className="px-6  py-2 text-left dark:border-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Territory
                  </th>

                  <th className="px-6  py-2 text-left dark:border-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    District
                  </th>

                  <th className="px-6  py-2 text-left dark:border-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Zone
                  </th>
                  <th className="px-6  py-2 text-left dark:border-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Region
                  </th>
                  <th className="px-6  py-2  whitespace-nowrap text-left dark:border-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Unit Division
                  </th>
                  <th className="px-6  py-2  whitespace-nowrap text-left dark:border-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Business Segment
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 text-xs">
                {dummyData?.map((item) => (
                  <tr key={item.id}>
                    <td className="px-6 py-2 dark:border-2 whitespace-nowrap font-arial ">
                      <button
                        onClick={() => {
                          router.push("/form/farmer_info_form");
                        }}
                        className="b text-black   hover:text-blue-500  "
                      >
                        View
                      </button>
                      <button
                        onClick={() => {
                          router.push("/form/farmer_info_form");
                        }}
                        className="b text-black hover:text-yellow-400 ml-2"
                      >
                        Edit
                      </button>
                      <button className="b text-black hover:text-red-500 ml-2">
                        Delete
                      </button>
                    </td>
                    <td className="px-6 py-2 dark:border-2 whitespace-nowrap">
                      {item.username}
                    </td>
                    <td className="px-6 py-2 dark:border-2 whitespace-nowrap">
                      {item.address}
                    </td>
                    <td className="px-6 py-2 dark:border-2 whitespace-nowrap">
                      {item.city}
                    </td>
                    <td className="px-6 py-2 dark:border-2 whitespace-nowrap">
                      {item.state}
                    </td>
                    <td className="px-6 py-2 dark:border-2 whitespace-nowrap">
                      {item.email}
                    </td>
                    <td className="px-6 py-2 dark:border-2 whitespace-nowrap">
                      {item.mobile}
                    </td>
                    <td className="px-6 py-2 dark:border-2 whitespace-nowrap">
                      {item.user_profile}
                    </td>
                    <td className="px-6 py-2 dark:border-2 whitespace-nowrap">
                      {item.status}
                    </td>
                    <td className="px-6 py-2 dark:border-2 whitespace-nowrap">
                      {item.status}
                    </td>
                    <td className="px-6 py-2 dark:border-2 whitespace-nowrap">
                      {item.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserInformation;
