import React, { useState, useEffect } from "react";
import Layout from "@/components/Layout1";
import { AiTwotoneHome } from "react-icons/ai";
import { TbFileDownload } from "react-icons/tb";
import { AiOutlineSearch } from "react-icons/ai";
import { useRouter } from "next/router";
import axios from "axios";

import ConfirmationModal from "@/components/modals/ConfirmationModal";
import { url } from "@/constants/url";
import { CSVLink } from "react-csv";

const ProductCategory = () => {
  const router = useRouter();
  const csvHeaders = [
    { label: "Id", key: "rp_id" },
    { label: "District", key: "reporting_office_name" },
    { label: "Territory", key: "territory_name" },
    { label: "Region", key: "region_name" },
    { label: "Zone", key: "zone_name" },
    { label: "Unit Division", key: "business_unit_name" },
    { label: "Business Segment", key: "bg_id" },
    { label: "Company", key: "cmpny_name" },
    { label: "Status", key: "isDeleted" },
  ];

  const [prdData, setPrdData] = useState([]);

  const headers = {
    "Content-Type": "application/json",
    secret: "fsdhfgsfuiweifiowefjewcewcebjw",
  };

  const gettingPrdData = async () => {
    try {
      const resp = await axios.get(`${url}/api/get_mr_sale_cateogory`, {
        headers: headers,
        params:{
          c_id: JSON.parse(window.localStorage.getItem("c_id"))[0],
         }
      });
      const respdata = await resp.data.data;
      setPrdData(respdata);
     
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    gettingPrdData();
  }, []);

  const [isOpen, setisOpen] = useState(false);
  const [itemId, setItemId] = useState(null);

  const deleteHandler = (id) => {
    setisOpen(true);
    setItemId(id);
  };

  const resetData = () => {
    gettingPrdData();
    setisOpen(false);
  };

  
  const{name} = router.query

  return (
    <Layout>
      <div className=" overflow-auto w-full ">
     
        <ConfirmationModal
        isOpen={isOpen}
        onClose={() => setisOpen(false)}
        onOpen={() => setisOpen(true)}
        id={itemId}
        type="Sales Cat"
        onDeletedData={resetData}
      />
        <div className="text-black flex items-center justify-between bg-white max-w-full font-arial h-[52px] px-5">
        <h2 className="font-arial font-normal text-xl tabletitle  py-2">{name ? name :"Sales Category"}</h2>
          <div className="flex items-center gap-2 cursor-pointer">
            
            <h2>
              <CSVLink data={prdData} headers={csvHeaders}>
                <TbFileDownload
                  className="text-green-600"
                  size={34}
                ></TbFileDownload>
              </CSVLink>
            </h2>

            <h2>
            <AiTwotoneHome
                className="text-black"
                size={34}
                onClick={() => {
                  router.push({
                    pathname: "/",
                  });
                }}
              ></AiTwotoneHome>
            </h2>
            <button
              onClick={() => {
                router.push({
                  pathname: "/MR_Portal_Web/SalesCategory_Form",
                  query: { id: null, type: "Add" },
                });
              }}
              className=" text-white py-1 px-2 rounded-md bg-blue-500 hover:bg-orange-500"
            >
              Create New
            </button>
          </div>
        </div>

        <div className="bg-white mb-6 flex items-start justify-center max-w-full">
          <div className=" text-black font-arial scrollbar-hide overflow-x-auto w-full px-2">
            <table className="min-w-full divide-y border divide-gray-200">
              <thead className="border-b">
                <tr className="bg-gray-50 font-arial">
                  <th className=" w-[12%] px-6 py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Action
                  </th>
                  <th className="px-6 w-[10%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Sales Category
                  </th>
                  <th className="px-6 w-[7%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                   MR Sales Category
                  </th>
                 
                  <th className="px-6 w-[10%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Company
                  </th>
                  <th className="px-6 w-[10%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 text-xs">
                
                {prdData?.map((item) => (
                  <tr key={item.id}>
                    <td className="px-6 py-2 dark:border-2 whitespace-nowrap font-arial ">
                      <button
                        onClick={() => {
                          router.push({
                            pathname: "/MR_Portal_Web/SalesCategory_Form",
                            query: { id: item.mrsc_id, type: "View" },
                          });
                        }}
                        className="b text-black   hover:text-blue-500  "
                      >
                        View
                      </button>
                      <button
                        onClick={() => {
                          router.push({
                            pathname: "/MR_Portal_Web/SalesCategory_Form",
                            query: { id: item.mrsc_id, type: "Edit" },
                          });
                        }}
                        className="b text-black hover:text-yellow-400 ml-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          deleteHandler(item?.mrsc_id);
                        }}
                        className="b text-black hover:text-red-500 ml-2"
                      >
                        Delete
                      </button>
                    </td>
                    <td className="px-6 py-2 dark:border-2 whitespace-nowrap">
                      {item.mrsc_id}
                    </td>
                    <td className="px-6 py-2 dark:border-2 whitespace-nowrap">
                      {item["Product Category"]}
                    </td>
                   
                    <td className="px-6 py-2 dark:border-2 whitespace-nowrap">
                      {item.cmpny_name}
                    </td>
                    <td className="px-6 py-2 dark:border-2 whitespace-nowrap">
                      {item.isDeleted ? "Disabled" : "Enabled"}
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

export default ProductCategory;
