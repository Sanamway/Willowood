import React, { useEffect, useState } from "react";

import { AiTwotoneHome } from "react-icons/ai";

import { useRouter } from "next/router";
import axios from "axios";
import { url } from "@/constants/url";
import { AiOutlineSearch } from "react-icons/ai";
import ConfirmationModal from "@/components/modals/ConfirmationModal";
import { CSVLink } from "react-csv";
import { TbFileDownload } from "react-icons/tb";
import toast, { Toaster } from "react-hot-toast";
import Layout from "@/components/Layout1";
import ReactPaginate from "react-paginate";
const Crop = () => {
  const csvHeaders = [
    { label: "Id", key: "cr_id" },

    { label: "Crop Name", key: "crop_name" },
    { label: "Season Name", key: "season_name" },
    { label: "Company", key: "cmpny_name" },
    { label: "Status", key: "isDeleted" },
  ];
  const router = useRouter();
  const [data, setData] = useState([]);
  const headers = {
    "Content-Type": "application/json",
    secret: "fsdhfgsfuiweifiowefjewcewcebjw",
  };

  const [currentPage, setCurrentPage] = useState({ selected: 0 }); // Current page number
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const [pageCount, setPageCount] = useState(0);
  const getCompanyInfo = async (
    currentPage,
  ) => {
    try {
      const respond = await axios.get(`${url}/api/get_crop?c_id=${JSON.parse(window.localStorage.getItem("c_id"))[0]}`, {
        headers: headers,
        params: {
         
          paging: true,
          page: currentPage,
          size: 50,
        },
      });
       const apires = await respond.data.data.cropData;
       const count = await respond.data.data.cropDataCount;
       setPageCount(Math.ceil(count / 50));
      setData(apires);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCompanyInfo(
      currentPage.selected + 1,
    );
  }, [currentPage.selected]);

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
  const { name } = router.query;
  return (
    <Layout>
      <div className=" overflow-auto w-full font-arial bg-white ">
        <Toaster position="bottom-center" reverseOrder={false} />
        <div className="flex flex-row justify-between  h-max  px-5">
          <h2 className="font-arial font-normal text-3xl  py-2">   {name ? name : "Crop"}</h2>
          <span className="flex items-center gap-2 cursor-pointer">
           
            <h2>
              <CSVLink data={data} headers={csvHeaders}>
                 <TbFileDownload
                  className="text-green-600"
                  size={34}
                ></TbFileDownload>
              </CSVLink>
            </h2>
            <AiTwotoneHome
                className="text-black"
                size={34}
                onClick={() => {
                  router.push({
                    pathname: "/",
                  });
                }}
              ></AiTwotoneHome>
            <button
              onClick={() => {
                router.push({
                  pathname: "/MR_Portal_Web/Crop_form",
                  query: { id: null, type: "Add" },
                });
              }}
              className=" text-white py-1 px-2 rounded-md bg-blue-500 hover:bg-orange-500"
            >
              Create New
            </button>
          </span>
        </div>

        <div className="bg-white h-screen flex flex-col gap-2  select-none items-start justify-between w-full absolute p-2 overflow-x-auto">
          <table className="min-w-full divide-y border- divide-gray-200 ">
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
                            pathname: "/MR_Portal_Web/Crop_form",
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
                            pathname: "/MR_Portal_Web/Crop_form",
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
                      {item.cmpny_name}
                    </td>
                    <td className="px-6 py-2 dark:border-2 whitespace-nowrap">
                      {item.isDeleted == false ? "Enabled" : "Disabled"}
                    </td>
                  </tr>
                ))}
               </tbody>
              
            </table>
            <div className="w-full mx-4 h-40 mb-28">
            <ReactPaginate
              previousLabel={"< Previous"}
              nextLabel={"Next >"}
              breakLabel={"..."}
              pageCount={pageCount}
              onPageChange={handlePageChange}
              containerClassName={"pagination"}
              activeClassName={"active"}
              className="flex flex-row gap-2 mt-4  "
            />
          </div>
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
