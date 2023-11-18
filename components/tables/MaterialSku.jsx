import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { AiTwotoneHome } from "react-icons/ai";
import { TbFileDownload } from "react-icons/tb";
import { AiOutlineSearch } from "react-icons/ai";
import { useRouter } from "next/router";
import { url } from "@/constants/url";
import axios from "axios";

const MaterialSku = () => {
  const router = useRouter();
  const [mateSku, setMateSku] = useState([]);

  const headers = {
    "Content-Type": "application/json",
    secret: "fsdhfgsfuiweifiowefjewcewcebjw"
  };

  const getMateSKUData = async () => {
    const res = await axios.get(`${url}/api/get_product_material_sku`, { headers: headers });
    const respData = await res.data.data;
    setMateSku(respData);
  };

  useEffect(() => {
    getMateSKUData();
  }, []);

  console.log("ff", mateSku);

  return (
    <Layout>
      <div className="h-screen overflow-auto w-full ">
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
              <TbFileDownload className="text-green-600" size={34}></TbFileDownload>
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

        <div className="bg-white h-screen flex items-start justify-center max-w-full">
          <div className=" text-black font-arial scrollbar-hide overflow-x-auto w-[1000px]">
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
                  <th className="px-6 w-[10%] py-2 whitespace-nowrap text-left dark:border-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
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
                  <th className="px-6 w-[10%] py-2 whitespace-nowrap text-left dark:border-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Gross Wt.
                  </th>
                  <th className="px-6 w-[10%] py-2 whitespace-nowrap text-left dark:border-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Net Wt.
                  </th>

                  <th className="px-6 w-[10%] py-2 whitespace-nowrap text-left dark:border-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Weight UM.
                  </th>

                  <th className="px-6 w-[10%] py-2 whitespace-nowrap text-left dark:border-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Pack Size
                  </th>

                  <th className="px-6 w-[10%] py-2 whitespace-nowrap text-left dark:border-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Packing Size
                  </th>
                  <th className="px-6 w-[10%] py-2 whitespace-nowrap text-left dark:border-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    batch
                  </th>

                  <th className="px-6 w-[10%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Company
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 text-xs">
                {mateSku?.map((item) => (
                console.log("item", item),
                  <tr key={item.id}>
                    <td className="px-6 py-2 dark:border-2 whitespace-nowrap font-arial ">
                      <button
                        onClick={() => {
                          router.push({
                            pathname: "/form/material_sku_info",
                            query: { type: "view", id: item?.id }
                          });
                        }}
                        className="b text-black   hover:text-blue-500  "
                      >
                        View
                      </button>
                      <button
                        onClick={() => {
                          router.push("/form/material_sku_info");
                        }}
                        className="b text-black hover:text-yellow-400 ml-2"
                      >
                        Edit
                      </button>
                      <button className="b text-black hover:text-red-500 ml-2">Delete</button>
                    </td>
                    <td className="px-6 py-2 dark:border-2 whitespace-nowrap">{item.mat_id}</td>
                    <td className="px-6 py-2 dark:border-2 whitespace-nowrap">{item.matnr}</td>
                    <td className="px-6 py-2 dark:border-2 whitespace-nowrap">{item.mat_name}</td>
                    <td className="px-6 py-2 dark:border-2 whitespace-nowrap">{item.techn_spec}</td>
                    <td className="px-6 py-2 dark:border-2 whitespace-nowrap">{item.uom}</td>
                    <td className="px-6 py-2 dark:border-2 whitespace-nowrap">{item.pcat_id}</td>
                    <td className="px-6 py-2 dark:border-2 whitespace-nowrap">{item.pseg_id}</td>
                    <td className="px-6 py-2 dark:border-2 whitespace-nowrap">{item.brand_code}</td>
                    <td className="px-6 py-2 dark:border-2 whitespace-nowrap">{item.division}</td>
                    <td className="px-6 py-2 dark:border-2 whitespace-nowrap">{item.crop_id}</td>
                    <td className="px-6 py-2 dark:border-2 whitespace-nowrap">{item.gross_wt}</td>
                    <td className="px-6 py-2 dark:border-2 whitespace-nowrap">{item.net_wt}</td>
                    <td className="px-6 py-2 dark:border-2 whitespace-nowrap">{item.weight_wt}</td>
                    <td className="px-6 py-2 dark:border-2 whitespace-nowrap">{item.packsize}</td>
                    <td className="px-6 py-2 dark:border-2 whitespace-nowrap">{item.packing_desc}</td>
                    <td className="px-6 py-2 dark:border-2 whitespace-nowrap">{item.batch}</td>
                    <td className="px-6 py-2 dark:border-2 whitespace-nowrap">{item.company}</td>
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

export default MaterialSku;
