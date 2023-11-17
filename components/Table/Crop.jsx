import React, { useEffect, useState } from "react";
import Layout from "../Layout";
import { AiTwotoneHome } from "react-icons/ai";

import { useRouter } from "next/router";
import axios from "axios";
import { url } from "@/constants/url";
import { AiOutlineSearch } from "react-icons/ai";
import ConfirmationModal from "../modals/ConfirmationModal";

const Crop = () => {
  const router = useRouter();
  const [data, setData] = useState(null);
  const headers = {
    "Content-Type": "application/json",
    secret: "fsdhfgsfuiweifiowefjewcewcebjw",
  };
  const getCompanyInfo = async () => {
    try {
      const respond = await axios.get(`${url}/api/get_crop`, {
        headers: headers,
      });
      const apires = await respond.data.data;
      setData(apires);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCompanyInfo();
  }, []);

  const deleteHandler = (id) => {
    setisOpen(true);
    setCropId(id);
  };

  const [isOpen, setisOpen] = useState(false);
  const [cropId, setCropId] = useState(null);

  const resetData = () => {
    getCompanyInfo();
    setisOpen(false);
  };
  return (
    <Layout>
      <div className="h-screen overflow-auto w-full font-arial bg-white ">
        <div className="flex flex-row justify-between  h-max  px-5">
          <h2 className="font-arial font-normal text-3xl  py-2">Crop</h2>
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

            <AiTwotoneHome className="text-red-500" size={34} />
            <button
              onClick={() => {
                router.push({
                  pathname: "/form/crop_form",
                  query: { id: null, type: "Add" },
                });
              }}
              className=" text-white py-1 px-2 rounded-md bg-green-500 hover:bg-orange-500"
            >
              Create New
            </button>
          </span>
        </div>

        <div className="bg-gray-0 p-4 bg-gray-100 flex items-start overflow-x-auto ">
          <table className=" border divide-gray-200 table-auto w-full ">
            <thead className="border-b">
              <tr className="bg-gray-50 font-arial w-max">
                <th className="px-4 py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                  Action
                </th>
                <th className="px-4 py-2  text-left w-max dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                  Crop ID
                </th>

                <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                  Crop Name
                </th>
                <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                  Season Name
                </th>
                <th className="px-4 py-2  text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                  Company
                </th>
                <th className="px-4 py-2 whitespace-nowrap text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
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
                        router.push({
                          pathname: "/form/crop_form",
                          query: { id: item.cr_id, type: "View" },
                        });
                      }}
                      className="b text-black   hover:text-blue-500  "
                    >
                      View
                    </button>
                    <button
                      className="b text-black hover:text-yellow-400 ml-2"
                      onClick={() => {
                        router.push({
                          pathname: "/form/crop_form",
                          query: { id: item.cr_id, type: "Edit" },
                        });
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="b text-black hover:text-red-500 ml-2"
                      onClick={() => {
                        deleteHandler(item.cr_id);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                  <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                    {item.cr_id}
                  </td>
                  <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                    {item.crop_name}
                  </td>
                  <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                    {item.season_name}
                  </td>
                  <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                    {item.c_id}
                  </td>
                  <td className="px-6 py-2 dark:border-2 whitespace-nowrap">
                    {item.isDeleted == false ? "Enabled" : "Disabled"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <ConfirmationModal
        isOpen={isOpen}
        onClose={() => setisOpen(false)}
        onOpen={() => setisOpen(true)}
        id={cropId}
        type="Crop"
        onDeletedData={resetData}
      />
    </Layout>
  );
};

export default Crop;
