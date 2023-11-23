import React, { useState, useEffect } from "react";
import Layout from "../Layout";
import { AiTwotoneHome } from "react-icons/ai";
import { useRouter } from "next/router";
import { url } from "@/constants/url";
import { AiOutlineSearch } from "react-icons/ai";
import axios from "axios";
import ConfirmationModal from "../modals/ConfirmationModal";
import { CSVLink } from "react-csv";
import { TbFileDownload } from "react-icons/tb";
const Employee = () => {
  const csvHeaders = [
    { label: "Id", key: "ds_id" },
    { label: "District", key: "district_name" },
    { label: "Territory", key: "t_id" },
    { label: "Region", key: "r_id" },
    { label: "Zone", key: "z_id" },
    { label: "Unit Division", key: "bu_id" },
    { label: "Business Segment", key: "bg_id" },
    { label: "Company", key: "c_id" },
    { label: "Status", key: "isDeleted" },
  ];
  const router = useRouter();

  const headers = {
    "Content-Type": "application/json",
    secret: "fsdhfgsfuiweifiowefjewcewcebjw",
  };

  const [data, setData] = useState([]);
  const getDistrict = async () => {
    try {
      const respond = await axios.get(`${url}/api/get_district`, {
        headers: headers,
      });
      const apires = await respond.data.data;
      setData(apires);
    } catch (error) {}
  };

  useEffect(() => {
    getDistrict();
  }, []);

  const deleteHandler = (id) => {
    setisOpen(true);
    setDistrictId(id);
  };

  const [isOpen, setisOpen] = useState(false);
  const [districtId, setDistrictId] = useState(null);

  const resetData = () => {
    getDistrict();
    setisOpen(false);
  };
  return (
    <Layout>
      <div className="h-screen overflow-auto w-full font-arial bg-white ">
        <div className="flex flex-row justify-between  h-max  px-5">
          <h2 className="font-arial font-normal text-3xl  py-2">Employee</h2>
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
            <h2>
              <CSVLink data={data} headers={csvHeaders}>
                <TbFileDownload
                  className="text-green-600"
                  size={34}
                ></TbFileDownload>
              </CSVLink>
            </h2>
            <AiTwotoneHome className="text-red-500" size={34} />
            <button
              onClick={() => {
                router.push({
                  pathname: "/form/district_form",
                  query: { id: null, type: "Add" },
                });
              }}
              className=" text-white py-1 px-2 rounded-md bg-green-500 hover:bg-orange-500"
            >
              Genrate
            </button>
          </span>
        </div>

        <div className="bg-white h-screen flex items-start justify-center max-w-full">
          <div className=" text-black font-arial scrollbar-hide overflow-x-auto w-[1000px]">
            <table className=" border divide-gray-200 table-auto w-full ">
              <thead className="border-b">
                <tr className="bg-gray-50 font-arial w-max">
                  <th className="px-4 py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Action
                  </th>
                  <th className="px-4 py-2  text-left w-max dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    District ID
                  </th>
                  <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    District
                  </th>
                  <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Territory
                  </th>
                  <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Region
                  </th>
                  <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Zone
                  </th>
                  <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Unit Division
                  </th>
                  <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Business Segment
                  </th>
                  <th className="px-4 py-2  text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Company
                  </th>
                  <th className="px-4 py-2  text-left dark:border-2 text-xs font-medium text-gray-500 tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y  divide-gray-200 text-xs">
                {data?.map((item, idx) => (
                  <tr className="dark:border-2" key={idx}>
                    <td className="  px-4 py-2 text-left dark:border-2 whitespace-nowrap font-arial text-xs ">
                      <button
                        onClick={() => {
                          router.push({
                            pathname: "/form/district_form",
                            query: { id: item.ds_id, type: "View" },
                          });
                        }}
                        className="b text-black   hover:text-blue-500  "
                      >
                        View
                      </button>
                      <button
                        onClick={() => {
                          router.push({
                            pathname: "/form/district_form",
                            query: { id: item.ds_id, type: "Edit" },
                          });
                        }}
                        className="b text-black hover:text-yellow-400 ml-2"
                      >
                        Edit
                      </button>
                      <button
                        className="b text-black hover:text-red-500 ml-2"
                        onClick={() => {
                          deleteHandler(item.ds_id);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                      {item.ds_id}
                    </td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                      {item.district_name}
                    </td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                      {item.t_id}
                    </td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                      {item.r_id}
                    </td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                      {item.z_id}
                    </td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                      {item.bu_id}
                    </td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                      {item.bg_id}
                    </td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                      {item.c_id}
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
        id={districtId}
        type="Dipot"
        onDeletedData={resetData}
      />
    </Layout>
  );
};

export default Employee;
