import React, { useEffect, useState } from "react";

import { AiTwotoneHome } from "react-icons/ai";

import { useRouter } from "next/router";
import axios from "axios";
import { url } from "@/constants/url";

import ConfirmationModal from "@/components/modals/ConfirmationModal";
import { CSVLink } from "react-csv";
import { TbFileDownload } from "react-icons/tb";
import  { Toaster } from "react-hot-toast";
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
    // <Layout>
    //   <div className=" overflow-auto w-full font-arial bg-white ">
    //     <Toaster position="bottom-center" reverseOrder={false} />
    //     <div className="flex flex-row justify-between  h-max  px-5">
    //       <h2 className="font-arial font-normal text-3xl  py-2">   {name ? name : "Crop"}</h2>
    //       <span className="flex items-center gap-2 cursor-pointer">
           
    //         <h2>
    //           <CSVLink data={data} headers={csvHeaders}>
    //              <TbFileDownload
    //               className="text-green-600"
    //               size={34}
    //             ></TbFileDownload>
    //           </CSVLink>
    //         </h2>
    //         <AiTwotoneHome
    //             className="text-black"
    //             size={34}
    //             onClick={() => {
    //               router.push({
    //                 pathname: "/",
    //               });
    //             }}
    //           ></AiTwotoneHome>
    //         <button
    //           onClick={() => {
    //             router.push({
    //               pathname: "/MR_Portal_Web/Crop_form",
    //               query: { id: null, type: "Add" },
    //             });
    //           }}
    //           className=" text-white py-1 px-2 rounded-md bg-blue-500 hover:bg-orange-500"
    //         >
    //           Create New
    //         </button>
    //       </span>
    //     </div>

    //     <div className="overflow-x-auto overflow-y-hidden bg-white h-max flex flex-col gap-2  select-none items-start justify-between w-[98%] mx-4 no-scrollbar">
    //       <table className="min-w-full divide-y border- divide-gray-200 ">
    //         <thead className="border-b w-max">
    <Layout>
      <div className="absolute h-full overflow-y-auto  mx-4 w-full overflow-x-hidden">
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

        {/* <div className="flex flex-row gap-4  px-4 pr-8 pb-2">
          <select
            className="border rounded px-2 py-1  w-1/2 h-8"
            id="stateSelect"
            value={filterState.bgId}
            onChange={(e) => {
              if (e.target.value === "All") {
                setFilterState({
                  ...filterState,
                  bgId: e.target.value,
                  buId: "All",
                  zId: "All",
                  rId: "All",
                  tId: "All",
                });
              } else {
                setFilterState({
                  ...filterState,
                  bgId: e.target.value,
                });
              }
            }}
            disabled={
              localStorageItems.roleId === 6 ||
              localStorageItems.roleId === 5 ||
              localStorageItems.roleId === 4 ||
              localStorageItems.roleId === 3 ||
              localStorageItems.roleId === 10
            }
          >
            <option value={"All"} className="font-bold">
              - All Business Segment -
            </option>

            {bgData.map((item, idx) => (
              <option value={item.bg_id} key={idx}>
                {item.business_segment}
              </option>
            ))}
          </select>
          <select
            className="border rounded px-2 py-1  w-1/2 h-8"
            id="stateSelect"
            value={filterState.buId}
            onChange={(e) => {
              if (e.target.value === "All") {
                setFilterState({
                  ...filterState,
                  buId: e.target.value,

                  zId: "All",
                  rId: "All",
                  tId: "All",
                });
              } else {
                setFilterState({
                  ...filterState,
                  buId: e.target.value,
                });
              }
            }}
            disabled={
              localStorageItems.roleId === 6 ||
              localStorageItems.roleId === 5 ||
              localStorageItems.roleId === 4 ||
              localStorageItems.roleId === 3
            }
          >
            <option value={"All"}>- All Business Unit -</option>

            {buData.map((item, idx) => (
              <option value={item.bu_id} key={idx}>
                {item.business_unit_name}
              </option>
            ))}
          </select>

          <select
            className="border rounded px-2 py-1  w-1/2 h-8"
            id="stateSelect"
            value={filterState.zId}
            onChange={(e) => {
              if (e.target.value === "All") {
                setFilterState({
                  ...filterState,
                  zId: e.target.value,
                  rId: "All",
                  tId: "All",
                });
              } else {
                setFilterState({
                  ...filterState,
                  zId: e.target.value,
                });
              }
            }}
            disabled={
              localStorageItems.roleId === 6 ||
              localStorageItems.roleId === 5 ||
              localStorageItems.roleId === 4
            }
          >
            <option value={"All"}>- All Zone -</option>

            {allZoneData.map((item, idx) => (
              <option value={item.z_id} key={idx}>
                {item.zone_name}
              </option>
            ))}
          </select>

          <select
            className="border rounded px-2 py-1  w-1/2 h-8"
            id="stateSelect"
            value={filterState.rId}
            disabled={
              localStorageItems.roleId === 6 || localStorageItems.roleId === 5
            }
            onChange={(e) => {
              if (e.target.value === "All") {
                setFilterState({
                  ...filterState,
                  rId: e.target.value,
                  tId: "All",
                });
              } else {
                setFilterState({
                  ...filterState,
                  rId: e.target.value,
                });
              }
            }}
          >
            <option value={"All"}>-All Region -</option>

            {allRegionData.map((item, idx) => (
              <option value={item.r_id} key={idx}>
                {item.region_name}
              </option>
            ))}
          </select>

          <select
            className="border rounded px-2 py-1 w-1/2 h-8"
            id="stateSelect"
            value={filterState.tId}
            disabled={localStorageItems.roleId === 6}
            onChange={(e) =>
              setFilterState({
                ...filterState,
                tId: e.target.value,
              })
            }
          >
            <option value="All">- All Territory -</option>

            {allTerritoryData.map((item, idx) => (
              <option value={item.t_id} key={idx}>
                {item.territory_name}
              </option>
            ))}
          </select>
          <select
            id="attendanceType"
            className="border rounded px-2 py-1 w-full h-8"
            value={filterState.empCode}
            onChange={(e) =>
              setFilterState({ ...filterState, empCode: e.target.value })
            }
          >
            <option value={""}>MR Executive</option>
            {allEmployee.map((item) => (
              <option value={item.empcode}>
                {item.fname} {item.mname} {item.lname} {item.empcode}
              </option>
            ))}
          </select>

          <div className="flex flex-row gap-2  items-center w-1/4">
            <DatePicker
              className="border p-1 rounded w-28 "
              dateFormat="dd-MM-yyyy"
              selected={filterState.startDate}
              placeholderText="Enter Date"
              scrollableYearDropdown
              onChange={(date) =>
                setFilterState({ ...filterState, startDate: date })
              }
              hand
            />
            <small>TO</small>
            <DatePicker
              className="border p-1 rounded w-28  "
              dateFormat="dd-MM-yyyy"
              selected={filterState.endDate}
              placeholderText="Enter Date"
              scrollableYearDropdown
              onChange={(date) =>
                setFilterState({ ...filterState, endDate: date })
              }
              hand
            />
          </div>
        </div> */}

        <div className="overflow-x-auto overflow-y-hidden bg-white h-max flex flex-col gap-2  select-none items-start justify-between w-[98%] mx-4 no-scrollbar">
          <table className="min-w-full divide-y border- divide-gray-200 ">
            <thead className="border-b w-max">
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
            {/* <div className="w-full mx-4 h-40 mb-28">
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
          </div> */}
          </div>
          <div className="w-full flex flex-row justify-between mx-4 pr-12 pb-10  bg-white z-10">
    <div className="flex flex-row gap-1 px-2 py-1 mt-4 border border-black rounded-md text-slate-400">
      Showing <small className="font-bold px-2 self-center text-black">1</small> to{" "}
      <small className="font-bold px-2 self-center text-black">{data.length}</small> of{" "}
      <small className="font-bold px-2 self-center text-black">{currentPage.selected+1}</small> results
    </div>
    <ReactPaginate
      previousLabel={"Previous"}
      nextLabel={"Next"}
      breakLabel={"..."}
      pageCount={pageCount}
      onPageChange={handlePageChange}
      containerClassName={"pagination"}
      activeClassName={"active"}
      className="flex flex-row gap-2 px-2 py-1 mt-4 border border-black rounded-md"
    />
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
