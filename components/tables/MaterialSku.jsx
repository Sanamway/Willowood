import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { AiTwotoneHome } from "react-icons/ai";
import { TbFileDownload } from "react-icons/tb";
import { AiOutlineSearch } from "react-icons/ai";
import { useRouter } from "next/router";
import { url } from "@/constants/url";
import axios from "axios";
import { CSVLink } from "react-csv";
import ConfirmModal from "../modals/ConfirmModal";

const MaterialSku = () => {
  const router = useRouter();
  const [mateSku, setMateSku] = useState([]);

  const headers = {
    "Content-Type": "application/json",
    secret: "fsdhfgsfuiweifiowefjewcewcebjw"
  };

  const getMateSKUData = async () => {
    try {
      const res = await axios.get(`${url}/api/get_product_material_sku`, { headers: headers });
      const respData = await res.data.data;
      setMateSku(respData);
    } catch (error) {
      console.log("e", error)
    }
  };

  useEffect(() => {
    getMateSKUData();
  }, []);

  

  const csvHeaders = [
    { label: "Id", key: "mat_id" },
    { label: "Material", key: "matnr" },
    { label: "Material Name", key: "mat_name" },
    { label: "Technical Spec", key: "techn_spec" },
    { label: "UOM", key: "uom" },
    { label: "Product Category", key: "pcat_id" },
    { label: "Product Segment", key: "pseg_id" },
    { label: "Product Brand", key: "brand_code" },
    { label: "Division", key: "division" },
    { label: "Crop", key: "crop_id" },
    { label: "Gross Wt.", key: "gross_wgt" },
    { label: "Net Wt.", key: "net_wgt" },
    { label: "Weight UM", key: "wgt_uom" },
    { label: "Pack Size", key: "packsize" },
    { label: "Packing Description", key: "packing_size" },
    { label: "Batch", key: "batch" },
    { label: "Company", key: "company" }
  ];

  const [isOpen, setisOpen] = useState(false);
  const [userId, setUserId] = useState(null);

  const deleteHandler = (id) => {
    setisOpen(true);
    setUserId(id);
  };

  const resetData = () => {
    getMateSKUData();
    setisOpen(false);
  };

  return (
    <Layout>
      <div className=" overflow-auto w-full ">
        <ConfirmModal
          isOpen={isOpen}
          onClose={() => setisOpen(false)}
          onOpen={() => setisOpen(true)}
          userId={userId}
          method="delete"
          endpoints="delete_product_material_sku"
          onDeletedData={resetData}
        ></ConfirmModal>
        <div className="text-black flex items-center justify-between bg-white max-w-full font-arial h-[52px] px-5">
          <h2 className="font-arial font-normal text-3xl  py-2">Material SKU Information</h2>
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="search gap-2 mx-8">
              <div className="container">
                <form className="form flex items-center ">
                  <input
                    type="search"
                    placeholder="Search"
                    className="bg-white border rounded-l-md p-1 outline-none  w-48 sm:w-72"
                  />
                  <button type="submit" className="bg-blue-500 text-white rounded-r-md p-1 ">
                    <AiOutlineSearch className="mx-2 my-1" size={20}></AiOutlineSearch>
                  </button>
                </form>
              </div>
            </div>
            <h2>
              <CSVLink data={mateSku} headers={csvHeaders}>
                <TbFileDownload className="text-green-600" size={34}></TbFileDownload>
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
                router.push("/form/material_sku_info");
              }}
              className=" text-white py-1.5 px-2 rounded-md bg-green-500 hover:bg-orange-500"
            >
              Create New
            </button>
          </div>
        </div>

        <div className="bg-white  flex items-start justify-center max-w-full">
          <div className=" text-black font-arial scrollbar-hide overflow-x-auto tableInfo p-2">
            <table className="min-w-full divide-y border divide-gray-200">
              <thead className="border-b">
                <tr className="bg-gray-50 font-arial">
                  <th className=" w-[12%] px-6 py-2 text-left dark:border-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                  <th className="px-6 w-[7%] py-2 whitespace-nowrap text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Mat ID
                  </th>
                  <th className="px-6 w-[7%] py-2 whitespace-nowrap text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Material Code
                  </th>
                  <th className="px-6 w-[7%] py-2 whitespace-nowrap text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Material Name
                  </th>
                  <th className="px-6 w-[10%] py-2 whitespace-nowrap text-left dark:border-2 text-xs font-medium text-gray-500 tracking-wider">
                    Technical Spec
                  </th>
                  <th className="px-6 w-[10%] py-2 whitespace-nowrap text-left dark:border-2 text-xs font-medium text-gray-500 tracking-wider">
                    UOM
                  </th>
                  <th className="px-6 w-[10%] py-2 whitespace-nowrap text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Product Category
                  </th>

                  <th className="px-6 w-[10%] py-2 whitespace-nowrap text-left dark:border-2 text-xs font-medium text-gray-500 tracking-wider">
                    Product Segment
                  </th>

                  <th className="px-6 w-[10%] py-2 whitespace-nowrap text-left dark:border-2 text-xs font-medium text-gray-500 tracking-wider">
                    Product Brand
                  </th>
                  <th className="px-6 w-[10%] py-2 whitespace-nowrap text-left dark:border-2 text-xs font-medium text-gray-500 tracking-wider">
                    Division
                  </th>
                  <th className="px-6 w-[10%] py-2 whitespace-nowrap text-left dark:border-2 text-xs font-medium text-gray-500 tracking-wider">
                    Crop
                  </th>
                  <th className="px-6 w-[10%] py-2 whitespace-nowrap text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Gross Wt.
                  </th>
                  <th className="px-6 w-[10%] py-2 whitespace-nowrap text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Net Wt.
                  </th>

                  <th className="px-6 w-[10%] py-2 whitespace-nowrap text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Weight UM.
                  </th>

                  <th className="px-6 w-[10%] py-2 whitespace-nowrap text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Pack Size
                  </th>

                  <th className="px-6 w-[10%] py-2 whitespace-nowrap text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Packing Description
                  </th>
                  <th className="px-6 w-[10%] py-2 whitespace-nowrap text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Batch
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
                {mateSku?.map(
                  (item) => (
                    console.log("item",item),
                    (
                      <tr key={item._id}>
                        <td className="px-6 py-2 dark:border-2 whitespace-nowrap font-arial ">
                          <button
                            onClick={() => {
                              router.push({
                                pathname: "/form/material_sku_info",
                                query: { type: "view", id: item?.mat_id }
                              });
                            }}
                            className="b text-black   hover:text-blue-500  "
                          >
                            View
                          </button>
                          <button
                            onClick={() => {
                              router.push({
                                pathname: "/form/material_sku_info",
                                query: { type: "Edit", id: item?.mat_id }
                              });
                            }}
                            className="b text-black hover:text-yellow-400 ml-2"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => {
                              deleteHandler(item?.mat_id);
                            }}
                            className="b text-black hover:text-red-500 ml-2"
                          >
                            Delete
                          </button>
                        </td>
                        <td className="px-6 py-2 dark:border-2 whitespace-nowrap">{item?.mat_id}</td>
                        <td className="px-6 py-2 dark:border-2 whitespace-nowrap">{item?.matnr}</td>
                        <td className="px-6 py-2 dark:border-2 whitespace-nowrap">{item?.mat_name}</td>
                        <td className="px-6 py-2 dark:border-2 whitespace-nowrap">{item?.techn_spec}</td>
                        <td className="px-6 py-2 dark:border-2 whitespace-nowrap">{item?.uom}</td>
                        <td className="px-6 py-2 dark:border-2 whitespace-nowrap">{item?.pcat_name}</td>
                        <td className="px-6 py-2 dark:border-2 whitespace-nowrap">{item?.pseg_name}</td>
                        <td className="px-6 py-2 dark:border-2 whitespace-nowrap">{item?.brand_code}</td>
                        <td className="px-6 py-2 dark:border-2 whitespace-nowrap">{item?.division}</td>
                        <td className="px-6 py-2 dark:border-2 whitespace-nowrap">{item?.crop_id}</td>
                        <td className="px-6 py-2 dark:border-2 whitespace-nowrap">{item?.gross_wgt}</td>
                        <td className="px-6 py-2 dark:border-2 whitespace-nowrap">{item?.net_wgt}</td>
                        <td className="px-6 py-2 dark:border-2 whitespace-nowrap">{item?.wgt_uom}</td>
                        <td className="px-6 py-2 dark:border-2 whitespace-nowrap">{item?.pack_size}</td>
                        <td className="px-6 py-2 dark:border-2 whitespace-nowrap">{item?.packing_size}</td>
                        <td className="px-6 py-2 dark:border-2 whitespace-nowrap">{item?.batch ? "true":"false"}</td>
                        <td className="px-6 py-2 dark:border-2 whitespace-nowrap">{item?.cmpny_name}</td>
                        <td className="px-6 py-2 dark:border-2 whitespace-nowrap">{item?.isDeleted ? "Disable":"Enable"}</td>
                      </tr>
                    )
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MaterialSku;
