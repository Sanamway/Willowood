import React, { useState, useEffect } from "react";
import Layout from "../Layout";
import { AiTwotoneHome } from "react-icons/ai";
import { TiArrowBack } from "react-icons/ti";
import { useRouter } from "next/router";
import { url } from "@/constants/url";
import { AiOutlineSearch } from "react-icons/ai";
import axios from "axios";
import ConfirmationModal from "../modals/ConfirmationModal";

const ZoneTable = () => {
  const router = useRouter();

  const headers = {
    "Content-Type": "application/json",
    secret: "fsdhfgsfuiweifiowefjewcewcebjw",
  };

  const [data, setData] = useState(null);
  const getZone = async () => {
    try {
      const respond = await axios.get(`${url}/api/get_zone`, {
        headers: headers,
      });
      const apires = await respond.data.data;
      setData(apires);
    } catch (error) {}
  };

  useEffect(() => {
    getZone();
  }, []);

  const deleteHandler = (id) => {
    setisOpen(true);
    setZoneId(id);
  };

  const [isOpen, setisOpen] = useState(false);
  const [zoneId, setZoneId] = useState(null);

  const resetData = () => {
    getZone();
    setisOpen(false);
  };

  return (
    <Layout>
      <div className="h-screen overflow-auto w-full font-arial bg-white ">
        <div className="flex flex-row justify-between  h-max  px-5">
          <h2 className="font-arial font-normal text-3xl  py-2">Zone</h2>
          <span className="flex items-center gap-2 cursor-pointer">
            <span className="flex flex-row">
              <input
                type="search"
                placeholder="Search"
                className="bg-white border rounded-l-md p-1 outline-none  w-48 sm:w-72"
              />
              <button
                type="submit"
                className="bg-blue-500 text-white rounded-r-md p-1 "
              >
                <AiOutlineSearch className="mx-2 my-1" size={20} />
              </button>
            </span>
            <TiArrowBack
              onClick={() => {
                router.push("/table/table_user_profile");
              }}
              className="text-gray-400"
              size={35}
            />

            <AiTwotoneHome className="text-red-500" size={34} />
            <button
              onClick={() => {
                router.push({
                  pathname: "/form/zone_form",
                  query: { id: null, type: "Add" },
                });
              }}
              className=" text-white py-1 px-2 rounded-md bg-green-500 hover:bg-orange-500"
            >
              Create New
            </button>
          </span>
        </div>
        <div className="bg-white h-screen flex items-start justify-center max-w-full">
          <div className=" text-black font-arial scrollbar-hide overflow-x-auto w-[1000px]">
            <table className="min-w-full divide-y border- divide-gray-200 ">
              <thead className="border-b w-max">
                <tr className="bg-gray-50 font-arial w-max">
                  <th className="px-4 py-2 text-left dark:border-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                  <th className="px-4 py-2  text-left w-max dark:border-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Zone ID
                  </th>
                  <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Zone
                  </th>
                  <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Unit Division
                  </th>
                  <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Business Segment
                  </th>

                  <th className="px-4 py-2  text-left dark:border-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Company
                  </th>
                  <th className="px-4 py-2  text-left dark:border-2 text-xs font-medium text-gray-500 tracking-wider">
                    Email
                  </th>
                  <th className="px-4 py-2  text-left dark:border-2 text-xs font-medium text-gray-500 tracking-wider">
                    H.O.D
                  </th>
                  <th className="px-4 py-2  text-left dark:border-2 text-xs font-medium text-gray-500 tracking-wider">
                    Mobile
                  </th>
                  <th className="px-4 py-2  text-left dark:border-2 text-xs font-medium text-gray-500 tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y  divide-gray-200 text-xs">
                {data?.map((item, idx) => (
                  <tr className="dark:border-2">
                    <td className="px-4 py-2 text-left dark:border-2 whitespace-nowrap font-arial text-xs ">
                      <button
                        onClick={() => {
                          router.push("/form/zone_form");
                        }}
                        className="b text-black   hover:text-blue-500  "
                      >
                        View
                      </button>
                      <button
                        onClick={() => {
                          router.push("/form/zone_form");
                        }}
                        className="b text-black hover:text-yellow-400 ml-2"
                      >
                        Edit
                      </button>
                      <button
                        className="b text-black hover:text-red-500 ml-2"
                        onClick={() => {
                          deleteHandler(item.z_id);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                      {item.z_id}
                    </td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                      {item.zone_name}
                    </td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                      {" "}
                      {item.bu_id}
                    </td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                      {item.bg_id}
                    </td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                      {item.c_id}
                    </td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                      {item.email_id}
                    </td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                      {item.hod_name}
                    </td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                      {item.mobile_no}
                    </td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                      {item.isDeleted == false ? "Enabled" : "Disabled"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <ConfirmationModal
        isOpen={isOpen}
        onClose={() => setisOpen(false)}
        onOpen={() => setisOpen(true)}
        id={zoneId}
        type="Zone"
        onDeletedData={resetData}
      />
    </Layout>
  );
};

export default ZoneTable;
