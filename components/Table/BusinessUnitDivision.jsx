import React, { useEffect, useState } from "react";
import Layout from "../Layout";
import { AiTwotoneHome } from "react-icons/ai";

import { useRouter } from "next/router";
import axios from "axios";
import { url } from "@/constants/url";
import { AiOutlineSearch } from "react-icons/ai";
import ConfirmationModal from "../modals/ConfirmationModal";
import { CSVLink } from "react-csv";
import { TbFileDownload } from "react-icons/tb";
const BusinessUnitDivision = () => {
  const csvHeaders = [
    { label: "Id", key: "bu_id" },
    { label: "Unit Division", key: "business_unit_name" },
    { label: "Business Segment", key: "bg_id" },
    { label: "Company", key: "c_id" },
    { label: "Email", key: "email_id" },
    { label: "H.O.D.", key: "hod_name" },
    { label: "Mobile No.", key: "phone_number" },
    { label: "Status", key:  "isDeleted" },
  ];
  const router = useRouter();
  const [data, setData] = useState([]);
  const headers = {
    "Content-Type": "application/json",
    secret: "fsdhfgsfuiweifiowefjewcewcebjw",
  };

  const getUnitDivision = async () => {
    try {
      const respond = await axios.get(`${url}/api/get_business_unit`, {
        headers: headers,
      });
      const apires = await respond.data.data;
      setData(apires);
    } catch (error) {}
  };

  useEffect(() => {
    getUnitDivision();
  }, []);

  console.log("mko", data);

  const deleteHandler = (id) => {
    setisOpen(true);
    setCompanyId(id);
  };

  const [isOpen, setisOpen] = useState(false);
  const [companyId, setCompanyId] = useState(null);

  const resetData = () => {
    getUnitDivision();
    setisOpen(false);
  };

  return (
    <Layout>
      <div className="h-screen overflow-auto w-full font-arial bg-white ">
        <div className="flex flex-row justify-between  h-max  px-5">
          <h2 className="font-arial font-normal text-3xl  py-2">
            Business Unit Division
          </h2>
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
                  pathname: "/form/business_unit_division_form",
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
                  <th className="px-4 py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Action
                  </th>
                  <th className="px-4 py-2  text-left w-max dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    B.U. ID
                  </th>
                  <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500 tracking-wider">
                    Unit Division
                  </th>
                  <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Business Segment
                  </th>
                  <th className="px-4 py-2  text-left dark:border-2 text-xs font-medium text-gray-500 tracking-wider">
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
                  <tr className="dark:border-2" key={idx}>
                    <td className="px-4 py-2 text-left dark:border-2 whitespace-nowrap font-arial text-xs ">
                      <button
                        onClick={() => {
                          router.push({
                            pathname: "/form/business_unit_division_form",
                            query: { id: item.bu_id, type: "View" },
                          });
                        }}
                        className="b text-black   hover:text-blue-500"
                      >
                        View
                      </button>
                      <button
                        onClick={() => {
                          router.push({
                            pathname: "/form/business_unit_division_form",
                            query: { id: item.bu_id, type: "Edit" },
                          });
                        }}
                        className="b text-black hover:text-yellow-400 ml-2"
                      >
                        Edit
                      </button>
                      <button
                        className="b text-black hover:text-red-500 ml-2"
                        onClick={() => {
                          deleteHandler(item.bu_id);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                      {item.bu_id}
                    </td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                      {item.business_unit_name}
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
        id={companyId}
        type="Business Unit"
        onDeletedData={resetData}
      />
    </Layout>
  );
};

export default BusinessUnitDivision;
