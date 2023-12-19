import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import { AiFillFileExcel, AiTwotoneHome } from "react-icons/ai";
import { BiArrowBack } from "react-icons/bi";
import { TiArrowBack } from "react-icons/ti";
import { TbFileDownload } from "react-icons/tb";
import { AiOutlineSearch } from "react-icons/ai";
import { useRouter } from "next/router";
import { url } from "@/constants/url";
import axios from "axios";
import ConfirmModal from "../modals/ConfirmModal";
import { CSVLink } from "react-csv";


const ProductSegment = () => {
  const router = useRouter();
  const [prdSegmentData, setPrdSegment] = useState([]);

  const headers = {
    "Content-Type": "application/json",
    secret: "fsdhfgsfuiweifiowefjewcewcebjw"
  };

  const gettingProductSegment = async () => {
    try {
      const resp = await axios.get(`${url}/api/get_product_segment`, { headers: headers });
      const respData = await resp.data.data;
      setPrdSegment(respData);
    } catch (error) {
      console.log(error)
    }
  };

  console.log("ff", prdSegmentData);

  useEffect(() => {
    gettingProductSegment();
  }, []);

  const [isOpen, setisOpen] = useState(false);
  const [userId, setUserId] = useState(null);

  const deleteHandler = (id) => {
    setisOpen(true);
    setUserId(id);
  };

  const resetData = () => {
    gettingProductSegment();
    setisOpen(false);
  };

  const csvHeaders = [
    { label: "Id", key: "pseg_id" },
    { label: "Segment ID", key: "pseg_id" },
    { label: "Product Segment", key: "pseg_name" },
    { label: "Company", key: "c_id" },
    { label: "Status", key: "isDeleted" }
  ];

  const {name} = router.query

  return (
    <Layout>
      <div className=" overflow-auto w-full ">
        <ConfirmModal
          isOpen={isOpen}
          onClose={() => setisOpen(false)}Segment
          onOpen={() => setisOpen(true)}
          userId={userId}
          method="delete"
          endpoints="delete_product_segment"
          onDeletedData={resetData}
        ></ConfirmModal>
        <div className="text-black flex items-center justify-between bg-white max-w-full font-arial h-[52px] px-5">
        <h2 className="font-arial font-normal text-xl tabletitle  py-2">{name}</h2>
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
            <CSVLink data={prdSegmentData} headers={csvHeaders}>
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
                router.push({
                  pathname: "/form/product_segment",
                  query: { type: "CREATE"}
                });
              }}
              className=" text-white py-1.5 px-2 rounded-md bg-green-500 hover:bg-orange-500"
            >
              Create New
            </button>
          </div>
        </div>

        <div className="bg-white mb-4 flex items-start justify-center max-w-full">
          <div className=" text-black font-arial scrollbar-hide overflow-x-auto w-full px-2">
            <table className="min-w-full divide-y border divide-gray-200">
              <thead className="border-b">
                <tr className="bg-gray-50 font-arial">
                  <th className=" w-[12%] px-6 py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Action
                  </th>
                  <th className="px-6 w-[7%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Segment ID
                  </th>
                  <th className="px-6 w-[10%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Product Segment
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
                {prdSegmentData?.map((item) => (
                  <tr key={item.id}>
                    <td className="px-6 py-2 dark:border-2 whitespace-nowrap font-arial ">
                      <button
                         onClick={() => {
                          router.push({
                            pathname: "/form/product_segment",
                            query: { type: "view", id: item?.pseg_id }
                          });
                        }}
                        className="b text-black   hover:text-blue-500  "
                      >
                        View
                      </button>
                      <button

                        onClick={() => {
                          router.push({
                            pathname: "/form/product_segment",
                            query: { type: "Edit", id: item?.pseg_id }
                          });
                        }}
                        className="b text-black hover:text-yellow-400 ml-2"
                      >
                        Edit
                      </button>
                      <button 
                       onClick={() => {
                        deleteHandler(item?.pseg_id);
                      }}
                      className="b text-black hover:text-red-500 ml-2">Delete</button>
                    </td>
                    <td className="px-6 py-2 dark:border-2 whitespace-nowrap">{item.pseg_id}</td>
                    <td className="px-6 py-2 dark:border-2 whitespace-nowrap">{item.pseg_name}</td>
                    <td className="px-6 py-2 dark:border-2 whitespace-nowrap">{item.cmpny_name}</td>
                    <td className="px-6 py-2 dark:border-2 whitespace-nowrap">{item.isDeleted ? "Disabled" : "Enabled"}</td>
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

export default ProductSegment;
