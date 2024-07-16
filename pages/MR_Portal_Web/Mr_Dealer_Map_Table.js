import React, { useState, useEffect, Fragment } from "react";
import Layout from "@/components/Layout1";
import { AiTwotoneHome } from "react-icons/ai";
import { useRouter } from "next/router";
import { url } from "@/constants/url";
import { AiOutlineSearch } from "react-icons/ai";
import axios from "axios";
import { Dialog, Transition } from "@headlessui/react";
// import ConfirmationModal from "../modals/ConfirmationModal";
import { CSVLink } from "react-csv";
import { TbFileDownload } from "react-icons/tb";
import toast, { Toaster } from "react-hot-toast";
import moment from "moment";
import ReactPaginate from "react-paginate";
const NewDealer = () => {
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

  const headers = {
    "Content-Type": "application/json",
    secret: "fsdhfgsfuiweifiowefjewcewcebjw",
  };
  const router = useRouter();

  const [data, setData] = useState([]);
  const getData = async (currentPage) => {
    try {
      const respond = await axios.get(`${url}/api/mr_dealer_map`, {
        params: {
          c_id: JSON.parse(window.localStorage.getItem("userinfo")).c_id,
          t_id: JSON.parse(window.localStorage.getItem("userinfo")).t_id,
          //   paging: true,
          //   page: currentPage,
          //   size: 50,
        },
        headers: headers,
      });
      const apires = await respond.data.data;
      setData(apires);
      const count = await respond.data.data.length;
      setPageCount(Math.ceil(count / 50));
    } catch (error) {
      setData([]);
    }
  };
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState({ selected: 0 }); // Current page number
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber + 1);
  };
  useEffect(() => {
    getData(currentPage.selected);
  }, [currentPage.selected]);

  const deleteHandler = (id) => {
    setisOpen(true);
  };

  const handleDeteleRow = async (tId, empCode, custCode) => {
    try {
      const respond = await axios.get(`${url}/api/delete_mr_dealer_map`, {
        headers: headers,
        params: {
          t_id: tId,
          customer_code: custCode,
          emp_code: empCode,
        },
      });
      const apires = await respond;
      console.log("pop", apires);
      toast.success(apires.data.message);
      setDeleteOpen({ open: false, data: {} });
      getData(1);
    } catch (error) {
      console.log("nop", error.message);
      toast.error(error.message);
    }
  };

  const [deleteOpen, setDeleteOpen] = useState({ open: false, data: {} });
  return (
    <Layout>
      <div className="absolute h-full overflow-y-auto  mx-4 w-full overflow-x-hidden">
        <Toaster position="bottom-center" reverseOrder={false} />
        <div className="text-black flex items-center justify-between bg-white max-w-full font-arial h-[52px] px-5">
          <h2 className="font-arial font-normal text-3xl  py-2">
            M.R. Dealer Map
          </h2>
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="search gap-2 mx-8">
              <div className="container">
                <form className="form flex items-center ">
                  <input
                    type="search"
                    placeholder="Search"
                    className="bg-white border rounded-l-md p-1 outline-none  w-48 sm:w-72"
                  />
                  <button
                    type="submit"
                    className="bg-blue-500 text-white rounded-r-md p-1 "
                  >
                    <AiOutlineSearch
                      className="mx-2 my-1"
                      size={20}
                    ></AiOutlineSearch>
                  </button>
                </form>
              </div>
            </div>
            <h2>
              {/* <CSVLink data={data} headers={csvHeaders}>
          <TbFileDownload
            className="text-green-600"
            size={34}
          ></TbFileDownload>
        </CSVLink> */}
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
                  pathname: "/MR_Portal_Web/MR_ActivityTarget",
                  query: { id: null, type: "Add" },
                });
              }}
              className=" text-white py-1 px-2 rounded-md bg-blue-500 hover:bg-orange-500"
            >
              Create New
            </button>
          </div>
        </div>

        <div className="bg-white h-screen flex flex-col gap-2  select-none items-start justify-between w-full absolute p-2 overflow-x-auto">
          <table className="min-w-full divide-y border- divide-gray-200 mb-20">
            <thead className="border-b">
              <tr className="bg-gray-50 font-arial w-max">
                <th className="px-4 py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider ">
                  Action
                </th>
                <th className="px-4 py-2  text-left w-max dark:border-2 text-xs font-medium text-gray-500  tracking-wider ">
                  Year
                </th>
                <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500 whitespace-nowrap tracking-wider">
                  Emp Code
                </th>
                <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500 whitespace-nowrap tracking-wider">
                  Emp Name
                </th>
                <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider whitespace-nowrap">
                  Party Code
                </th>

                <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider whitespace-nowrap">
                  Party Name
                </th>
                <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider whitespace-nowrap">
                  Party Complete Address
                </th>
                {/* <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider whitespace-nowrap">
                  Prev Y1 Tot
                </th>
                <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider whitespace-nowrap">
                  Prev Y2 Tot
                </th>
                <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider whitespace-nowrap">
                  Apr
                </th>

                <th className="px-4 py-2  text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider whitespace-nowrap">
                  May
                </th>
                <th className="px-4 py-2  text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider whitespace-nowrap">
                  June
                </th>
                <th className="px-4 py-2  text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider whitespace-nowrap">
                  Q1 Plan Tot
                </th>
                <th className="px-4 py-2  text-left dark:border-2 text-xs font-medium text-gray-500 tracking-wider whitespace-nowrap">
                  July
                </th>
                <th className="px-4 py-2  text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider whitespace-nowrap">
                  Aug
                </th>
                <th className="px-4 py-2  text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider whitespace-nowrap">
                  Sept
                </th>
                <th className="px-4 py-2  text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider whitespace-nowrap">
                  Q2 Plan Tot
                </th>
                <th className="px-4 py-2  text-left dark:border-2 text-xs font-medium text-gray-500 tracking-wider whitespace-nowrap">
                  Oct
                </th>
                <th className="px-4 py-2  text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider whitespace-nowrap">
                  Nov
                </th>
                <th className="px-4 py-2  text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider whitespace-nowrap">
                  Dec
                </th>
                <th className="px-4 py-2  text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider whitespace-nowrap">
                  Q3 Plan Tot
                </th>
                <th className="px-4 py-2  text-left dark:border-2 text-xs font-medium text-gray-500 tracking-wider whitespace-nowrap">
                  Jan
                </th>
                <th className="px-4 py-2  text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider whitespace-nowrap">
                  Feb
                </th>
                <th className="px-4 py-2  text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider whitespace-nowrap">
                  March
                </th>
                <th className="px-4 py-2  text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider whitespace-nowrap">
                  Q4 Plan Tot
                </th>
                <th className="px-4 py-2  text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider whitespace-nowrap">
                  Year total
                </th>
                <th className="px-4 py-2  text-left dark:border-2 text-xs font-medium text-gray-500 tracking-wider whitespace-nowrap">
                  Territory
                </th>
                <th className="px-4 py-2  text-left dark:border-2 text-xs font-medium text-gray-500 tracking-wider whitespace-nowrap">
                  Region
                </th>
                <th className="px-4 py-2  text-left dark:border-2 text-xs font-medium text-gray-500 tracking-wider whitespace-nowrap">
                  Zone
                </th>
                <th className="px-4 py-2  text-left dark:border-2 text-xs font-medium text-gray-500 tracking-wider whitespace-nowrap">
                  Units
                </th>
                <th className="px-4 py-2  text-left dark:border-2 text-xs font-medium text-gray-500 tracking-wider whitespace-nowrap">
                  Segement
                </th>
                <th className="px-4 py-2  text-left dark:border-2 text-xs font-medium text-gray-500 tracking-wider whitespace-nowrap">
                  Company
                </th> */}
              </tr>
            </thead>
            <tbody className="bg-white divide-y  divide-gray-200 text-xs ">
              {data.map((item, idx) => (
                <tr className="dark:border-2" key={idx}>
                  <td className="px-4 py-2 text-left dark:border-2 whitespace-nowrap font-arial text-xs ">
                    <button
                      onClick={() => {
                        router.push({
                          pathname: "/MR_Portal_Web/MR_ActivityTarget",
                          query: {
                            empId: item.emp_code,
                            yr: item.year,
                            custCode: item.customer_code,
                            tDes: item.territory_name,
                            type: "View",
                          },
                        });
                      }}
                      className="b text-black hover:text-yellow-400 ml-2"
                    >
                      View
                    </button>
                    <button
                      onClick={() => {
                        router.push({
                          pathname: "/MR_Portal_Web/MR_ActivityTarget",
                          query: {
                            empId: item.emp_code,
                            yr: item.year,
                            custCode: item.customer_code,
                            tDes: item.territory_name,
                            type: "Edit",
                          },
                        });
                      }}
                      className="b text-black hover:text-yellow-400 ml-2"
                    >
                      Edit
                    </button>
                    <button
                      className="b text-black hover:text-red-500 ml-2"
                      onClick={
                        () =>
                          setDeleteOpen({
                            open: true,
                            data: item,
                          })
                        // handleDeteleRow(
                        //   item.t_id,
                        //   item.emp_code,
                        //   item.customer_code
                        // )
                      }
                    >
                      Delete
                    </button>
                  </td>
                  <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                    {item.year}
                  </td>
                  <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                    {item.emp_code}
                  </td>
                  <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                    {item.emp_name}
                  </td>
                  <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                    {item.customer_code}
                  </td>

                  <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                    {item.party_name}
                  </td>
                  <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                    {item.party_address}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="h-12"></div>
        </div>
      </div>

      <Transition appear show={deleteOpen.open} as={Fragment}>
        <Dialog
          as="div"
          className="z-10"
          onClose={() =>
            setDeleteOpen({
              open: false,
              data: {},
            })
          }
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className=" font-arial  max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-[1.78rem] font-medium leading-6 text-center text-gray-900"
                  >
                    Are you sure ?
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-center text-gray-500">
                      Do you really want to delete this ?
                    </p>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() =>
                        setDeleteOpen({
                          open: false,
                          data: {},
                        })
                      }
                    >
                      Cancel
                    </button>

                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() =>
                        handleDeteleRow(
                          deleteOpen.data.t_id,
                          deleteOpen.data.emp_code,
                          deleteOpen.data.customer_code
                        )
                      }
                    >
                      Delete
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </Layout>
  );
};

export default NewDealer;
