import React, { useState, useEffect } from "react";
import Layout from "../Layout";
import { AiTwotoneHome } from "react-icons/ai";
import { TiArrowBack } from "react-icons/ti";
import { useRouter } from "next/router";
import { url } from "@/constants/url";
import { AiOutlineSearch } from "react-icons/ai";
import axios from "axios";
import ConfirmationModal from "../modals/ConfirmationModal";
const Territory = () => {
  
  
  const router = useRouter();

  const headers = {
    "Content-Type": "application/json",
    secret: "fsdhfgsfuiweifiowefjewcewcebjw",
  };

  const [data, setData] = useState([]);
  const getTerritory = async () => {
    try {
       const respond = await axios.get(`${url}/api/get_territory`, {
        headers: headers,
      });
      const apires = await respond.data.data;
      setData(apires);
    } catch (error) {}
  };

  useEffect(() => {
    getTerritory();
  }, []);

  const deleteHandler = (id) => {
    setisOpen(true);
    setRegionId(id);
  };

  const [isOpen, setisOpen] = useState(false);
  const [regionId, setRegionId] = useState(null);

  const resetData = () => {
    getTerritory();
    setisOpen(false);
  };






  return (
    <Layout>
      <div className="h-screen overflow-auto w-full font-arial bg-white ">
        <div className="flex flex-row justify-between  h-max  px-5">
          <h2 className="font-arial font-normal text-3xl  py-2">Territory</h2>
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
              className="text-gray-400"
              size={35}
            />

            <AiTwotoneHome className="text-red-500" size={34} />
            <button
              onClick={() => {
                router.push("/form/territory_form");
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
                <th className="px-4 py-2 text-left dark:border-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
                <th className="px-4 py-2  text-left w-max dark:border-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Territory ID
                </th>
                <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Territory
                </th>
                <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Region
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
            <tbody className="bg-white divide-y  divide-gray-200 ">
              <tr className="dark:border-2">
                <td className="px-4 py-2 text-left dark:border-2 whitespace-nowrap font-arial text-xs ">
                  <button
                    onClick={() => {
                      router.push("/form/territory_form");
                    }}
                    className="b text-black   hover:text-blue-500  "
                  >
                    View
                  </button>
                  <button
                    onClick={() => {
                      router.push("/form/territory_form");
                    }}
                    className="b text-black hover:text-yellow-400 ml-2"
                  >
                    Edit
                  </button>
                  <button className="b text-black hover:text-red-500 ml-2">
                    Delete
                  </button>
                </td>
                <td className="px-4 py-2 dark:border-2 whitespace-nowrap">2</td>
                <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                  Company B
                </td>
                <td className="px-4 py-2 dark:border-2 whitespace-nowrap">2</td>
                <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                  Company B
                </td>
                <td className="px-4 py-2 dark:border-2 whitespace-nowrap">2</td>
                <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                  Company B
                </td>
                <td className="px-4 py-2 dark:border-2 whitespace-nowrap">2</td>
                <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                  Company B
                </td>
                <td className="px-4 py-2 dark:border-2 whitespace-nowrap">2</td>
                <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                  Company B
                </td>

                <td className="px-4 py-2 dark:border-2 whitespace-nowrap">3</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default Territory;
