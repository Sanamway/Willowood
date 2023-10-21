import React from "react";
import Layout from "../Layout";
import { AiTwotoneHome, AiOutlineSearch, TbFileDownload } from "react-icons/ai";
import { TiArrowBack } from "react-icons/ti";
import { useRouter } from "next/router";

const AssignRole = () => {
  const router = useRouter();

  const menus = [
    {
      id: 1,
      name: "Menu Admin Check This",
    },
    {
      id: 2,
      name: "Menu 2",
    },
    {
      id: 3,
      name: "Menu 3",
    },
  ];

  return (
    <>
      <Layout>
        <div className="h-screen overflow-auto w-full font-arial bg-white ">
          <div className="text-black flex items-center justify-between bg-white max-w-full font-arial h-[52px] px-5">
            <h2 className="font-arial font-normal text-3xl  py-2">
              Mapping Depot/Warehouse
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
                  router.push("/form/map_depot_warehouse_form");
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
                <h2 className="text-sm mb-4"> Mapping Depot/Warehouse</h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead className="font-arial border-b">
                      <tr className="border bg-gray-50  font-arial">
                        <th className="  px-6 py-2 text-left dark:border-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Action
                        </th>
                        <td className="px-2 py-2 text-center dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                          SR
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
                      </tr>
                    </thead>
                    <tbody className="font-arial text- text-center">
                      {menus.map((menu, index) => (
                        <tr
                          className="bg-white divide-y border  divide-gray-200 text-xs"
                          key={menu.id}
                        >
                          <td className="px-6 py-2 dark:border-2 whitespace-nowrap font-arial ">
                            <button
                              onClick={() => {
                                router.push("/form/map_depot_warehouse_form");
                              }}
                              className="b text-black   hover:text-blue-500  "
                            >
                              View
                            </button>
                            <button
                              onClick={() => {
                                router.push("/form/map_depot_warehouse_form");
                              }}
                              className="b text-black hover:text-yellow-400 ml-2"
                            >
                              Edit
                            </button>
                            <button className="b text-black hover:text-red-500 ml-2">
                              Delete
                            </button>
                          </td>
                          <td className=" px-2 py-2 flex items-center gap-4">
                            {index + 1}
                          </td>
                          <td className="px-12 py-2 dark:border-2 whitespace-nowrap font-arial text-xs">
                            -
                          </td>
                          <td className="border px-4 py-2">
                            <input type="select" />
                          </td>
                          <td className="border px-4 py-2">Test123</td>
                          <td className="border px-4 py-2">Test123</td>
                          <td className="border px-4 py-2">Test123</td>
                          <td className="border px-4 py-2">Test123</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default AssignRole;
