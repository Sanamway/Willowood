import React, { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { AiTwotoneHome } from "react-icons/ai";
import { useRouter } from "next/router";
import { url } from "@/constants/url";
import { AiOutlineSearch } from "react-icons/ai";
import axios from "axios";
// import ConfirmationModal from "../modals/ConfirmationModal";
import { CSVLink } from "react-csv";
import { TbFileDownload } from "react-icons/tb";
import toast, { Toaster } from "react-hot-toast";
const District = () => {
  const csvHeaders = [
    { label: "Id", key: "ds_id" },
    { label: "District", key: "district_name" },
    { label: "Territory", key: "territory_name" },
    { label: "Region", key: "region_name" },
    { label: "Zone", key: "zone_name" },
    { label: "Unit Division", key: "business_unit_name" },
    { label: "Business Segment", key: "bg_id" },
    { label: "Company", key: "cmpny_name" },
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

  const { name } = router.query;

  return (
    <Layout>
      <div className="w-full font-arial bg-white">
        <Toaster position="bottom-center" reverseOrder={false} />
        <div className="flex flex-row justify-between  h-max  px-5">
          <h2 className="font-arial font-normal text-3xl tabletitle py-2">
            {name ? name : "MR Activity Target"}
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
                  pathname: "/MR_Portal_Apps/MR_ActivityTarget",
                //   query: { id: null, type: "Add" },
                });
              }}
              className=" text-white py-1 px-2 rounded-md bg-green-500 hover:bg-orange-500"
            >
              Create New
            </button>
          </span>
        </div>

        <div className="bg-white mb-6 flex items-start justify-center max-w-full">
          <div className=" text-black font-arial scrollbar-hide overflow-x-auto tableInfo p-2">
            <table className=" border divide-gray-200 table-auto w-full ">
              <thead className="border-b">
                <tr className="bg-gray-50 font-arial w-max">
                  <th className="px-4 py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Action
                  </th>
                  <th className="px-4 py-2  text-left w-max dark:border-2 text-xs font-medium text-gray-500  tracking-wider ">
                    Year
                  </th>
                  <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500 whitespace-nowrap tracking-wider">
                    MR Category
                  </th>
                  <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider whitespace-nowrap">
                    Month-Year
                  </th>
                  <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider whitespace-nowrap">
                    T-Demo
                  </th>
                  <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider whitespace-nowrap">
                    T-F. Day
                  </th>
                  <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider whitespace-nowrap">
                    T-O2O
                  </th>
                  <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider whitespace-nowrap">
                    T-GMT
                  </th>
                  <th className="px-4 py-2  text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider whitespace-nowrap">
                    T-CAP
                  </th>
                  <th className="px-4 py-2  text-left dark:border-2 text-xs font-medium text-gray-500 tracking-wider whitespace-nowrap">
                    T-SHC
                  </th>
                  <th className="px-4 py-2  text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider whitespace-nowrap">
                    M-Demo
                  </th>
                  <th className="px-4 py-2  text-left dark:border-2 text-xs font-medium text-gray-500 tracking-wider whitespace-nowrap">
                    M_F. Day
                  </th>
                  <th className="px-4 py-2  text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider whitespace-nowrap">
                    M-O2O
                  </th>
                  <th className="px-4 py-2  text-left dark:border-2 text-xs font-medium text-gray-500 tracking-wider whitespace-nowrap">
                    M-GMT
                  </th>
                  <th className="px-4 py-2  text-left dark:border-2 text-xs font-medium text-gray-500 tracking-wider whitespace-nowrap">
                    M-SVN
                  </th>
                  <th className="px-4 py-2  text-left dark:border-2 text-xs font-medium text-gray-500 tracking-wider whitespace-nowrap">
                    M-GVM
                  </th>
                  <th className="px-4 py-2  text-left dark:border-2 text-xs font-medium text-gray-500 tracking-wider whitespace-nowrap">
                    M-CAP
                  </th>
                  <th className="px-4 py-2  text-left dark:border-2 text-xs font-medium text-gray-500 tracking-wider whitespace-nowrap">
                    M-SHC
                  </th>
                  <th className="px-4 py-2  text-left dark:border-2 text-xs font-medium text-gray-500 tracking-wider whitespace-nowrap">
                    W-Demo
                  </th>
                  <th className="px-4 py-2  text-left dark:border-2 text-xs font-medium text-gray-500 tracking-wider whitespace-nowrap">
                    W-F. Day
                  </th>
                  <th className="px-4 py-2  text-left dark:border-2 text-xs font-medium text-gray-500 tracking-wider whitespace-nowrap">
                    W-O2O
                  </th>
                  <th className="px-4 py-2  text-left dark:border-2 text-xs font-medium text-gray-500 tracking-wider whitespace-nowrap">
                    W-GMT
                  </th>
                  <th className="px-4 py-2  text-left dark:border-2 text-xs font-medium text-gray-500 tracking-wider whitespace-nowrap">
                    W-SVN
                  </th>
                  <th className="px-4 py-2  text-left dark:border-2 text-xs font-medium text-gray-500 tracking-wider whitespace-nowrap">
                    W-GVM
                  </th>
                  <th className="px-4 py-2  text-left dark:border-2 text-xs font-medium text-gray-500 tracking-wider whitespace-nowrap">
                    W-CAP
                  </th>
                  <th className="px-4 py-2  text-left dark:border-2 text-xs font-medium text-gray-500 tracking-wider whitespace-nowrap">
                    W-SHC
                  </th>
                  <th className="px-4 py-2  text-left dark:border-2 text-xs font-medium text-gray-500 tracking-wider whitespace-nowrap"></th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y  divide-gray-200 text-xs">
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, idx) => (
                  <tr className="dark:border-2" key={idx}>
                    <td className="  px-4 py-2 text-left dark:border-2 whitespace-nowrap font-arial text-xs ">
                      <button className="b text-black   hover:text-blue-500  ">
                        View
                      </button>
                      <button className="b text-black hover:text-yellow-400 ml-2">
                        Edit
                      </button>
                      <button className="b text-black hover:text-red-500 ml-2">
                        Delete
                      </button>
                    </td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                      {item}
                    </td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                      {item}
                    </td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                      {item}
                    </td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                      {item}
                    </td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                      {item}
                    </td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                      {item}
                    </td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                      {item}
                    </td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                      {item}
                    </td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                      {item}
                    </td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                      {item}
                    </td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                      {item}
                    </td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                      {item}
                    </td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                      {item}
                    </td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                      {item}
                    </td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                      {item}
                    </td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                      {item}
                    </td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                      {item}
                    </td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                      {item}
                    </td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                      {item}
                    </td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                      {item}
                    </td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                      {item}
                    </td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                      {item}
                    </td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                      {item}
                    </td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                      {item}
                    </td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                      {item}
                    </td>

                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                      Enabled
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* <ConfirmationModal
        isOpen={isOpen}
        onClose={() => setisOpen(false)}
        onOpen={() => setisOpen(true)}
        id={districtId}
        type="Dipot"
        onDeletedData={resetData}
      /> */}
    </Layout>
  );
};

export default District;
