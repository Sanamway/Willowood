import React from "react";
import Layout from "./Layout";
import { AiFillFileExcel, AiTwotoneHome } from "react-icons/ai";
import { BiArrowBack } from "react-icons/bi";
import { TiArrowBack } from "react-icons/ti";
import { TbFileDownload } from "react-icons/tb";
import { AiOutlineSearch } from "react-icons/ai";
import { useRouter } from "next/router";

const Table = () => {
  const router = useRouter();
  return (
    <>
      <Layout>
        <div className="h-screen overflow-auto w-full  ">
          <div className="text-black flex items-center justify-between bg-white max-w-full font-arial h-[52px] px-5">
            <h2 className="font-arial font-normal text-3xl  py-2">
              User Profile
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
                      <AiOutlineSearch className="mx-2 my-1" size={20} />
                    </button>
                  </form>
                </div>
              </div>
              <h2>
                <TbFileDownload
                  className="text-green-600"
                  size={34}
                ></TbFileDownload>
              </h2>
              {/* <h2>
                <TiArrowBack className="text-gray-400" size={35}></TiArrowBack>
              </h2> */}
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
                  router.push("/form/user_profile_form");
                }}
                className=" text-white py-1.5 px-2 rounded-md bg-green-500 hover:bg-orange-500"
              >
                Create New
              </button>
            </div>
          </div>

          {/* <div className="bg-gray-300"></div> */}
          <div className="overflow-x-auto text-black font-arial">
            <table className="min-w-full divide-y border divide-gray-200">
              <thead className="border-b">
                <tr className="bg-gray-50 font-arial">
                  <th className=" w-[12%] px-6 py-2 text-left dark:border-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                  <th className="px-6 w-[7%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sr No
                  </th>
                  <th className="px-6 w-[10%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User Profile
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y  divide-gray-200 text-xs">
                <tr className="dark:border-2">
                  <td className="px-6 py-2 dark:border-2 whitespace-nowrap font-arial ">
                    <button
                      onClick={() => {
                        router.push("/form/user_profile_form");
                      }}
                      className="b text-black   hover:text-blue-500  "
                    >
                      View
                    </button>
                    <button
                      onClick={() => {
                        router.push("/form/user_profile_form");
                      }}
                      className="b text-black hover:text-yellow-400 ml-2"
                    >
                      Edit
                    </button>
                    <button className="b text-black hover:text-red-500 ml-2">
                      Delete
                    </button>
                  </td>
                  <td className="px-6 py-2 dark:border-2 whitespace-nowrap">
                    1
                  </td>
                  <td className="px-6 py-2 dark:border-2 whitespace-nowrap">
                    Company A
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-2 dark:border-2 whitespace-nowrap font-arial text-xs ">
                    <button
                      onClick={() => {
                        router.push("/form/user_profile_form");
                      }}
                      className="b text-black   hover:text-blue-500  "
                    >
                      View
                    </button>
                    <button
                      onClick={() => {
                        router.push("/form/user_profile_form");
                      }}
                      className="b text-black hover:text-yellow-400 ml-2"
                    >
                      Edit
                    </button>
                    <button className="b text-black hover:text-red-500 ml-2">
                      Delete
                    </button>
                  </td>
                  <td className="px-6 py-2 dark:border-2 whitespace-nowrap">
                    2
                  </td>
                  <td className="px-6 py-2 dark:border-2 whitespace-nowrap">
                    Company B
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-2 dark:border-2 whitespace-nowrap font-arial text-xs  ">
                    <button
                      onClick={() => {
                        router.push("/form/user_profile_form");
                      }}
                      className="b text-black   hover:text-blue-500  "
                    >
                      View
                    </button>
                    <button
                      onClick={() => {
                        router.push("/form/user_profile_form");
                      }}
                      className="b text-black hover:text-yellow-400 ml-2"
                    >
                      Edit
                    </button>
                    <button className="b text-black hover:text-red-500 ml-2">
                      Delete
                    </button>
                  </td>
                  <td className="px-6 py-2 dark:border-2 whitespace-nowrap">
                    3
                  </td>
                  <td className="px-6 py-2 dark:border-2 whitespace-nowrap">
                    Company C
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Table;
