import React from "react";
import Layout from "../../components/Layout";
import { AiFillFileExcel, AiTwotoneHome } from "react-icons/ai";
import { BiArrowBack } from "react-icons/bi";
import { TiArrowBack } from "react-icons/ti";
import { TbFileDownload } from "react-icons/tb";
import { AiOutlineSearch } from "react-icons/ai";
import { useRouter } from "next/router";

const MaterialSku = () => {
  const router = useRouter();

  const dummyData = [
    {
      id: 1,
      material_name: "Material A",
      technical_spec: "Tech A",
      uom: "uom A",
      product_category: "category A",
      product_segment: "segment a",
      product_brand: "brand a",
      division: "division a",
      crop: "crop a",
      gross_wt: "gross a",
      net_wt: "net a",
      weight_wt: "weight a",
      packsize: "packing a",
      packing_desc: "packing a",
      batch: "batch a",
      company: "company a",
      image: "image a",
      docs: "docs a",
      video: "video a"
    },
    {
      id: 2,
      material_name: "Material A",
      technical_spec: "Tech A",
      uom: "uom A",
      product_category: "category A",
      product_segment: "segment a",
      product_brand: "brand a",
      division: "division a",
      crop: "crop a",
      gross_wt: "gross a",
      net_wt: "net a",
      weight_wt: "weight a",
      packsize: "packing a",
      packing_desc: "packing a",
      batch: "batch a",
      company: "company a",
      image: "image a",
      docs: "docs a",
      video: "video a"
    },
    {
      id: 3,
      material_name: "Material A",
      technical_spec: "Tech A",
      uom: "uom A",
      product_category: "category A",
      product_segment: "segment a",
      product_brand: "brand a",
      division: "division a",
      crop: "crop a",
      gross_wt: "gross a",
      net_wt: "net a",
      weight_wt: "weight a",
      packsize: "packing a",
      packing_desc: "packing a",
      batch: "batch a",
      company: "company a",
      image: "image a",
      docs: "docs a",
      video: "video a"
    }
  ];

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
              <AiTwotoneHome className="text-red-500" size={34}></AiTwotoneHome>
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
                  <th className="px-6 w-[7%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Material Code
                  </th>
                  <th className="px-6 w-[7%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Material Name
                  </th>
                  <th className="px-6 w-[10%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Technical Spec
                  </th>
                  <th className="px-6 w-[10%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    UOM
                  </th>
                  <th className="px-6 w-[10%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product Category
                  </th>

                  <th className="px-6 w-[10%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product Segment
                  </th>

                  <th className="px-6 w-[10%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product Brand
                  </th>
                  <th className="px-6 w-[10%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Division
                  </th>
                  <th className="px-6 w-[10%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Crop
                  </th>
                  <th className="px-6 w-[10%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Gross Wt.
                  </th>
                  <th className="px-6 w-[10%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Net Wt.
                  </th>

                  <th className="px-6 w-[10%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Weight UM.
                  </th>

                  <th className="px-6 w-[10%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Pack Size
                  </th>

                  <th className="px-6 w-[10%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Packing Size
                  </th>
                  <th className="px-6 w-[10%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    batch
                  </th>

                  <th className="px-6 w-[10%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Company
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 text-xs">
                {dummyData?.map((item) => (
                  <tr key={item.id}>
                    <td className="px-6 py-2 dark:border-2 whitespace-nowrap font-arial ">
                      <button
                        onClick={() => {
                          router.push("/form/material_sku_info");
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
                    <td className="px-6 py-2 dark:border-2 whitespace-nowrap">{item.id}</td>
                    <td className="px-6 py-2 dark:border-2 whitespace-nowrap">{item.material_name}</td>
                    <td className="px-6 py-2 dark:border-2 whitespace-nowrap">{item.technical_spec}</td>
                    <td className="px-6 py-2 dark:border-2 whitespace-nowrap">{item.uom}</td>
                    <td className="px-6 py-2 dark:border-2 whitespace-nowrap">{item.product_category}</td>
                    <td className="px-6 py-2 dark:border-2 whitespace-nowrap">{item.product_segment}</td>
                    <td className="px-6 py-2 dark:border-2 whitespace-nowrap">{item.product_brand}</td>
                    <td className="px-6 py-2 dark:border-2 whitespace-nowrap">{item.division}</td>
                    <td className="px-6 py-2 dark:border-2 whitespace-nowrap">{item.crop}</td>
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
