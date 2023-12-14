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
const UserAssignBusiness = () => {
  const csvHeaders = [
    { label: "Id", key: "bst_id" },
    { label: "User", key: "user_id" },
    { label: "Territory", key: "territory_name" },
    { label: "Region", key: "region_name" },
    { label: "Zone", key: "zone_name" },
    { label: "Unit Division", key: "business_unit_name" },
    { label: "Business Segment", key: "business_segment" },
    { label: "Company", key: "cmpny_name" },
  ];
  const router = useRouter();

  const headers = {
    "Content-Type": "application/json",
    secret: "fsdhfgsfuiweifiowefjewcewcebjw",
  };

  const [data, setData] = useState([]);
  const getDistrict = async () => {
    try {
      const respond = await axios.get(`${url}/api/get_bstuser`, {
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
    setBstId(id);
  };

  const [isOpen, setisOpen] = useState(false);
  const [bstId, setBstId] = useState(null);

  const resetData = () => {
    getDistrict();
    setisOpen(false);
  };

  return (
    <Layout>
      <div className="h-screen overflow-auto w-full ">
        <div className="text-black flex items-center justify-between bg-white max-w-full font-arial h-[52px] px-5">
          <h2 className="font-arial font-normal text-2xl  py-2">
            User Map With Business Structure
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
              <CSVLink data={data} headers={csvHeaders}>
                <TbFileDownload
                  className="text-green-600"
                  size={34}
                ></TbFileDownload>
              </CSVLink>
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
            <button
              onClick={() => {
                router.push({
                  pathname: "/form/user_assign_business",
                  query: { id: null, type: "Add" },
                });
              }}
              className=" text-white py-1 px-2 rounded-md bg-green-500 hover:bg-orange-500"
            >
              Create New
            </button>
          </div>
        </div>

        <div className="bg-white h-screen flex items-start justify-center max-w-full">
          <div className=" text-black font-arial scrollbar-hide overflow-x-auto w-[1000px]">
            <table className="min-w-full divide-y border divide-gray-200">
              <thead className="border-b">
                <tr className="bg-gray-50 font-arial">
                  <th className=" w-[12%] px-6 py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Action
                  </th>
                  <th className="px-6 w-[7%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Map id
                  </th>
                  <th className="px-6 w-[7%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    User Id
                  </th>
                  <th className="px-6 w-[10%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    User Name
                  </th>
                  <th className="px-6 w-[10%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Territory
                  </th>
                  <th className="px-6 w-[10%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Region
                  </th>

                  <th className="px-6 w-[10%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Zone
                  </th>
                  <th className="px-6 w-[10%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Unit Division
                  </th>

                  <th className="px-6 w-[10%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Business Segment
                  </th>

                  <th className="px-6 w-[10%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Company
                  </th>
                  <th className="px-4 py-2  text-left dark:border-2 text-xs font-medium text-gray-500 tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 text-xs">
                {data?.map((item) => (
                  <tr key={item.id}>
                    <td className="px-6 py-2 dark:border-2 whitespace-nowrap font-arial ">
                      <button
                        onClick={() => {
                          router.push({
                            pathname: "/form/user_assign_business",
                            query: { id: item.user_id, type: "View" },
                          });
                        }}
                        className="b text-black hover:text-blue-500  "
                      >
                        View
                      </button>
                      <button
                        onClick={() => {
                          router.push({
                            pathname: "/form/user_assign_business",
                            query: { id: item.user_id, type: "Edit" },
                          });
                        }}
                        className="b text-black hover:text-yellow-400 ml-2"
                      >
                        Edit
                      </button>
                      <button
                        className="b text-black hover:text-red-500 ml-2"
                        onClick={() => {
                          deleteHandler(item.user_id);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                    <td className="px-6 py-2 dark:border-2 whitespace-nowrap">
                      {item.bst_id}
                    </td>
                    <td className="px-6 py-2 dark:border-2 whitespace-nowrap">
                      {item.user_id}
                    </td>
                    <td className="px-6 py-2 dark:border-2 whitespace-nowrap">
                      {item.user_name}
                    </td>
                    <td className="px-6 py-2 dark:border-2 whitespace-nowrap">
                      {item.territory_name}
                    </td>
                    <td className="px-6 py-2 dark:border-2 whitespace-nowrap">
                      {item.region_name}
                    </td>
                    <td className="px-6 py-2 dark:border-2 whitespace-nowrap">
                      {item.zone_name}
                    </td>
                    <td className="px-6 py-2 dark:border-2 whitespace-nowrap">
                      {item.business_unit_name}
                    </td>
                    <td className="px-6 py-2 dark:border-2 whitespace-nowrap">
                      {item.business_segment}
                    </td>
                    <td className="px-6 py-2 dark:border-2 whitespace-nowrap">
                      {item.cmpny_name}
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
        id={bstId}
        type="Bst"
        onDeletedData={resetData}
      />
    </Layout>
  );
};

export default UserAssignBusiness;
