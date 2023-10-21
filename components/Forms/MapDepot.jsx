import React from "react";
import Layout from "../Layout";
import { AiTwotoneHome } from "react-icons/ai";
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
              <TiArrowBack
                onClick={() => {
                  router.push("/table/table_map_depot");
                }}
                className="text-gray-400"
                size={35}
              ></TiArrowBack>

              <AiTwotoneHome className="text-red-500" size={34}></AiTwotoneHome>
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
                        <td className="px-2 py-2 text-center dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                          SR
                        </td>
                        <td className=" px-4 py-2 text-center dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                          Depot Name
                        </td>
                        <td className="px-6 py-2 text-center dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                          Terrotry
                        </td>
                        <td className="px-6 py-2 text-center dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                          Region
                        </td>
                        <td className="px-6 py-2 text-center dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                          Zone
                        </td>
                        <td className="px-6 py-2 text-center dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                          Business Unit
                        </td>
                        <td className="px-6 py-2 text-center dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
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
                          <td className=" px-2 py-2 flex items-center gap-4">
                            {index + 1}
                          </td>
                          <td className="px-12 py-2 dark:border-2 whitespace-nowrap font-arial text-xs">
                            <select
                              className="w-full px-2 py-2 border-b border-gray-500 rounded- bg-white focus:outline-none focus:border-b focus:border-indigo-500"
                              id="userSelect"
                            >
                              <option
                                value=""
                                className="focus:outline-none focus:border-b bg-white"
                              >
                                Option
                              </option>
                              <option value="user1">User 1</option>
                              <option value="user2">User 2</option>
                            </select>
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
                <span className="button flex items-center gap-3 mt-6">
                  <button className="bg-green-700 px-4 py-1 text-white">
                    Save
                  </button>
                  <button className="bg-yellow-500 px-4 py-1 text-white">
                    Close
                  </button>
                </span>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default AssignRole;
