import React, { useState, useEffect } from "react";
import Layout from "../Layout";
import { AiTwotoneHome } from "react-icons/ai";
import { TiArrowBack } from "react-icons/ti";
import { useRouter } from "next/router";
import { url } from "@/constants/url";
import { AiOutlineSearch } from "react-icons/ai";
import axios from "axios";
import ConfirmationModal from "../modals/ConfirmationModal";
import toast, { Toaster } from "react-hot-toast";
const MapDepot = () => {
  const router = useRouter();

  const headers = {
    "Content-Type": "application/json",
    secret: "fsdhfgsfuiweifiowefjewcewcebjw",
  };

  const [data, setData] = useState(null);
  const getDistrict = async () => {
    try {
      const respond = await axios.get(`${url}/api/get_dipot`, {
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
    setDepotId(id);
  };

  const [isOpen, setisOpen] = useState(false);
  const [depot, setDepotId] = useState(null);

  const resetData = () => {
    getDistrict();
    setisOpen(false);
  };

  return (
    <>
      <Layout>
        <div className="h-screen overflow-auto w-full font-arial bg-white ">
          <Toaster position="bottom-center" reverseOrder={false} />
          <div className="text-black flex items-center justify-between bg-white max-w-full font-arial h-[52px] px-5">
            <h2 className="font-arial font-normal text-3xl  py-2">
              Map Depot Warehouse
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
              <h2></h2>

              <h2>
                <AiTwotoneHome
                  className="text-red-500"
                  size={34}
                ></AiTwotoneHome>
              </h2>
              <button
                onClick={() => {
                  router.push({
                    pathname: "/form/map_depot_warehouse_form",
                    query: { id: null, type: "Add" },
                  });
                }}
                className=" text-white py-1.5 px-2 rounded-md bg-green-500 hover:bg-orange-500"
              >
                Create New
              </button>
            </div>
          </div>
          <div className="bg-gray-100 py-4 h-screen rounded-md">
            <div className="text-black mx-12 bg-white p-4 ">
              <div className="mt-4 font-arial">
                <h2 className="text-sm mb-4"> Map Depot Warehouse</h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead className="font-arial border-b">
                      <tr className="border bg-gray-50  font-arial">
                        <th className="  px-6 py-2 text-left dark:border-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Action
                        </th>
                        <td className="px-2 py-2 text-center dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                          Depot Id
                        </td>
                        <td className=" px-4 py-2 text-center dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                          Depot Name
                        </td>
                        <td className="px-4 py-2 text-center dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                          Terrotry
                        </td>
                        <td className="px-4 py-2 text-center dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                          Region
                        </td>
                        <td className="px-4 py-2 text-center dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                          Zone
                        </td>
                        <td className="px-4 py-2 text-center dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                          Business Unit
                        </td>
                        <td className="px-4 py-2 text-center dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                          Business Segment
                        </td>
                        <td className="px-4 py-2 text-center dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                          Company
                        </td>
                        <th className="px-4 py-2  text-left dark:border-2 text-xs font-medium text-gray-500 tracking-wider">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="font-arial text- text-center">
                      {data?.map((menu, index) => (
                        <tr
                          className="bg-white divide-y border  divide-gray-200 text-xs"
                          key={menu.id}
                        >
                          <td className="px-6 py-2 dark:border-2 whitespace-nowrap font-arial ">
                            <button
                              onClick={() => {
                                router.push({
                                  pathname: "/form/map_depot_warehouse_form",
                                  query: { id: menu.d_id, type: "View" },
                                });
                              }}
                              className="b text-black   hover:text-blue-500  "
                            >
                              View
                            </button>
                            <button
                              onClick={() => {
                                router.push({
                                  pathname: "/form/map_depot_warehouse_form",
                                  query: { id: menu.d_id, type: "Edit" },
                                });
                              }}
                              className="b text-black hover:text-yellow-400 ml-2"
                            >
                              Edit
                            </button>
                            <button
                              className="b text-black hover:text-red-500 ml-2"
                              onClick={() => {
                                deleteHandler(menu.d_id);
                              }}
                            >
                              Delete
                            </button>
                          </td>
                          <td className=" px-2 py-2 flex items-center gap-4">
                            {menu.d_id}
                          </td>
                          <td className="px-12 py-2 dark:border-2 whitespace-nowrap font-arial text-xs">
                            {menu.depot_name}
                          </td>
                          <td className="border px-4 py-2">{menu.t_id}</td>
                          <td className="border px-4 py-2">{menu.r_id}</td>
                          <td className="border px-4 py-2">{menu.z_id}</td>
                          <td className="border px-4 py-2">{menu.bu_id}</td>
                          <td className="border px-4 py-2">{menu.bg_id}</td>
                          <td className="border px-4 py-2">{menu.c_id}</td>
                          <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                            {menu.isDeleted == false ? "Enabled" : "Disabled"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ConfirmationModal
          isOpen={isOpen}
          onClose={() => setisOpen(false)}
          onOpen={() => setisOpen(true)}
          id={depot}
          type="Depot"
          onDeletedData={resetData}
        />
      </Layout>
    </>
  );
};

export default MapDepot;
