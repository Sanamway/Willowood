import React from "react";
import Layout from "../Layout";
import { AiTwotoneHome } from "react-icons/ai";
import { TiArrowBack } from "react-icons/ti";
import { useRouter } from "next/router";
import { AiOutlineSearch } from "react-icons/ai";
const Season = () => {
  const router = useRouter();
  return (
    <Layout>
      <div className=" w-full font-arial bg-white ">
        <div className="flex flex-row justify-between  h-max  px-5">
          <h2 className="font-arial font-normal text-3xl  py-2">Season</h2>
          <span className="flex items-center gap-2 cursor-pointer">
            <span className="flex flex-row">
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
            </span>
          
            <AiTwotoneHome className="text-red-500" size={34} />
            <button
              onClick={() => {
                router.push("/form/session_form");
              }}
              className=" text-white py-1 px-2 rounded-md bg-green-500 hover:bg-orange-500"
            >
              Create New
            </button>
          </span>
        </div>

        <div className="bg-gray-0 p-4 bg-gray-100 flex items-start overflow-x-auto min-h-screen ">
          <table className=" border divide-gray-200 table-auto w-full ">
            <thead className="border-b">
              <tr className="bg-gray-50 font-arial w-max">
                <th className="px-4 py-2 text-left dark:border-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
                <th className="px-4 py-2  text-left w-max dark:border-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Season ID
                </th>
                <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Season Name
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y  divide-gray-200 text-xs">
              <tr className="dark:border-2">
                <td className="px-4 py-2 text-left dark:border-2 whitespace-nowrap font-arial text-xs ">
                  <button
                    onClick={() => {
                      router.push("/form/session_form");
                    }}
                    className="b text-black   hover:text-blue-500  "
                  >
                    View
                  </button>
                  <button
                    onClick={() => {
                      router.push("/form/session_form");
                    }}
                    className="b text-black hover:text-yellow-400 ml-2"
                  >
                    Edit
                  </button>
                  <button className="b text-black hover:text-red-500 ml-2">
                    Delete
                  </button>
                </td>
                <td className="px-4 py-2 dark:border-2 whitespace-nowrap">2</td>

                <td className="px-4 py-2 dark:border-2 whitespace-nowrap">3</td>
              </tr>
            </tbody>


            <tbody className="bg-white divide-y  divide-gray-200 text-xs">
              <tr className="dark:border-2">
                <td className="px-4 py-2 text-left dark:border-2 whitespace-nowrap font-arial text-xs ">
                  <button
                    onClick={() => {
                      router.push("/form/session_form");
                    }}
                    className="b text-black   hover:text-blue-500  "
                  >
                    View
                  </button>
                  <button
                    onClick={() => {
                      router.push("/form/session_form");
                    }}
                    className="b text-black hover:text-yellow-400 ml-2"
                  >
                    Edit
                  </button>
                  <button className="b text-black hover:text-red-500 ml-2">
                    Delete
                  </button>
                </td>
                <td className="px-4 py-2 dark:border-2 whitespace-nowrap">2</td>

                <td className="px-4 py-2 dark:border-2 whitespace-nowrap">3</td>
              </tr>
            </tbody>


            <tbody className="bg-white divide-y  divide-gray-200 text-xs">
              <tr className="dark:border-2">
                <td className="px-4 py-2 text-left dark:border-2 whitespace-nowrap font-arial text-xs ">
                  <button
                    onClick={() => {
                      router.push("/form/session_form");
                    }}
                    className="b text-black   hover:text-blue-500  "
                  >
                    View
                  </button>
                  <button
                    onClick={() => {
                      router.push("/form/session_form");
                    }}
                    className="b text-black hover:text-yellow-400 ml-2"
                  >
                    Edit
                  </button>
                  <button className="b text-black hover:text-red-500 ml-2">
                    Delete
                  </button>
                </td>
                <td className="px-4 py-2 dark:border-2 whitespace-nowrap">2</td>

                <td className="px-4 py-2 dark:border-2 whitespace-nowrap">3</td>
              </tr>
            </tbody>


            <tbody className="bg-white divide-y  divide-gray-200 text-xs">
              <tr className="dark:border-2">
                <td className="px-4 py-2 text-left dark:border-2 whitespace-nowrap font-arial text-xs ">
                  <button
                    onClick={() => {
                      router.push("/form/session_form");
                    }}
                    className="b text-black   hover:text-blue-500  "
                  >
                    View
                  </button>
                  <button
                    onClick={() => {
                      router.push("/form/session_form");
                    }}
                    className="b text-black hover:text-yellow-400 ml-2"
                  >
                    Edit
                  </button>
                  <button className="b text-black hover:text-red-500 ml-2">
                    Delete
                  </button>
                </td>
                <td className="px-4 py-2 dark:border-2 whitespace-nowrap">2</td>

                <td className="px-4 py-2 dark:border-2 whitespace-nowrap">3</td>
              </tr>
            </tbody>


            <tbody className="bg-white divide-y  divide-gray-200 text-xs">
              <tr className="dark:border-2">
                <td className="px-4 py-2 text-left dark:border-2 whitespace-nowrap font-arial text-xs ">
                  <button
                    onClick={() => {
                      router.push("/form/session_form");
                    }}
                    className="b text-black   hover:text-blue-500  "
                  >
                    View
                  </button>
                  <button
                    onClick={() => {
                      router.push("/form/session_form");
                    }}
                    className="b text-black hover:text-yellow-400 ml-2"
                  >
                    Edit
                  </button>
                  <button className="b text-black hover:text-red-500 ml-2">
                    Delete
                  </button>
                </td>
                <td className="px-4 py-2 dark:border-2 whitespace-nowrap">2</td>

                <td className="px-4 py-2 dark:border-2 whitespace-nowrap">3</td>
              </tr>
            </tbody>


            <tbody className="bg-white divide-y  divide-gray-200 text-xs">
              <tr className="dark:border-2">
                <td className="px-4 py-2 text-left dark:border-2 whitespace-nowrap font-arial text-xs ">
                  <button
                    onClick={() => {
                      router.push("/form/session_form");
                    }}
                    className="b text-black   hover:text-blue-500  "
                  >
                    View
                  </button>
                  <button
                    onClick={() => {
                      router.push("/form/session_form");
                    }}
                    className="b text-black hover:text-yellow-400 ml-2"
                  >
                    Edit
                  </button>
                  <button className="b text-black hover:text-red-500 ml-2">
                    Delete
                  </button>
                </td>
                <td className="px-4 py-2 dark:border-2 whitespace-nowrap">2</td>

                <td className="px-4 py-2 dark:border-2 whitespace-nowrap">3</td>
              </tr>
            </tbody>


            <tbody className="bg-white divide-y  divide-gray-200 text-xs">
              <tr className="dark:border-2">
                <td className="px-4 py-2 text-left dark:border-2 whitespace-nowrap font-arial text-xs ">
                  <button
                    onClick={() => {
                      router.push("/form/session_form");
                    }}
                    className="b text-black   hover:text-blue-500  "
                  >
                    View
                  </button>
                  <button
                    onClick={() => {
                      router.push("/form/session_form");
                    }}
                    className="b text-black hover:text-yellow-400 ml-2"
                  >
                    Edit
                  </button>
                  <button className="b text-black hover:text-red-500 ml-2">
                    Delete
                  </button>
                </td>
                <td className="px-4 py-2 dark:border-2 whitespace-nowrap">2</td>

                <td className="px-4 py-2 dark:border-2 whitespace-nowrap">3</td>
              </tr>
            </tbody>


            <tbody className="bg-white divide-y  divide-gray-200 text-xs">
              <tr className="dark:border-2">
                <td className="px-4 py-2 text-left dark:border-2 whitespace-nowrap font-arial text-xs ">
                  <button
                    onClick={() => {
                      router.push("/form/session_form");
                    }}
                    className="b text-black   hover:text-blue-500  "
                  >
                    View
                  </button>
                  <button
                    onClick={() => {
                      router.push("/form/session_form");
                    }}
                    className="b text-black hover:text-yellow-400 ml-2"
                  >
                    Edit
                  </button>
                  <button className="b text-black hover:text-red-500 ml-2">
                    Delete
                  </button>
                </td>
                <td className="px-4 py-2 dark:border-2 whitespace-nowrap">2</td>

                <td className="px-4 py-2 dark:border-2 whitespace-nowrap">3</td>
              </tr>
            </tbody>



            <tbody className="bg-white divide-y  divide-gray-200 text-xs">
              <tr className="dark:border-2">
                <td className="px-4 py-2 text-left dark:border-2 whitespace-nowrap font-arial text-xs ">
                  <button
                    onClick={() => {
                      router.push("/form/session_form");
                    }}
                    className="b text-black   hover:text-blue-500  "
                  >
                    View
                  </button>
                  <button
                    onClick={() => {
                      router.push("/form/session_form");
                    }}
                    className="b text-black hover:text-yellow-400 ml-2"
                  >
                    Edit
                  </button>
                  <button className="b text-black hover:text-red-500 ml-2">
                    Delete
                  </button>
                </td>
                <td className="px-4 py-2 dark:border-2 whitespace-nowrap">2</td>

                <td className="px-4 py-2 dark:border-2 whitespace-nowrap">3</td>
              </tr>
            </tbody>


            <tbody className="bg-white divide-y  divide-gray-200 text-xs">
              <tr className="dark:border-2">
                <td className="px-4 py-2 text-left dark:border-2 whitespace-nowrap font-arial text-xs ">
                  <button
                    onClick={() => {
                      router.push("/form/session_form");
                    }}
                    className="b text-black   hover:text-blue-500  "
                  >
                    View
                  </button>
                  <button
                    onClick={() => {
                      router.push("/form/session_form");
                    }}
                    className="b text-black hover:text-yellow-400 ml-2"
                  >
                    Edit
                  </button>
                  <button className="b text-black hover:text-red-500 ml-2">
                    Delete
                  </button>
                </td>
                <td className="px-4 py-2 dark:border-2 whitespace-nowrap">2</td>

                <td className="px-4 py-2 dark:border-2 whitespace-nowrap">3</td>
              </tr>
            </tbody>


            <tbody className="bg-white divide-y  divide-gray-200 text-xs">
              <tr className="dark:border-2">
                <td className="px-4 py-2 text-left dark:border-2 whitespace-nowrap font-arial text-xs ">
                  <button
                    onClick={() => {
                      router.push("/form/session_form");
                    }}
                    className="b text-black   hover:text-blue-500  "
                  >
                    View
                  </button>
                  <button
                    onClick={() => {
                      router.push("/form/session_form");
                    }}
                    className="b text-black hover:text-yellow-400 ml-2"
                  >
                    Edit
                  </button>
                  <button className="b text-black hover:text-red-500 ml-2">
                    Delete
                  </button>
                </td>
                <td className="px-4 py-2 dark:border-2 whitespace-nowrap">2</td>

                <td className="px-4 py-2 dark:border-2 whitespace-nowrap">3</td>
              </tr>
            </tbody>



            <tbody className="bg-white divide-y  divide-gray-200 text-xs">
              <tr className="dark:border-2">
                <td className="px-4 py-2 text-left dark:border-2 whitespace-nowrap font-arial text-xs ">
                  <button
                    onClick={() => {
                      router.push("/form/session_form");
                    }}
                    className="b text-black   hover:text-blue-500  "
                  >
                    View
                  </button>
                  <button
                    onClick={() => {
                      router.push("/form/session_form");
                    }}
                    className="b text-black hover:text-yellow-400 ml-2"
                  >
                    Edit
                  </button>
                  <button className="b text-black hover:text-red-500 ml-2">
                    Delete
                  </button>
                </td>
                <td className="px-4 py-2 dark:border-2 whitespace-nowrap">2</td>

                <td className="px-4 py-2 dark:border-2 whitespace-nowrap">3</td>
              </tr>
            </tbody>


            <tbody className="bg-white divide-y  divide-gray-200 text-xs">
              <tr className="dark:border-2">
                <td className="px-4 py-2 text-left dark:border-2 whitespace-nowrap font-arial text-xs ">
                  <button
                    onClick={() => {
                      router.push("/form/session_form");
                    }}
                    className="b text-black   hover:text-blue-500  "
                  >
                    View
                  </button>
                  <button
                    onClick={() => {
                      router.push("/form/session_form");
                    }}
                    className="b text-black hover:text-yellow-400 ml-2"
                  >
                    Edit
                  </button>
                  <button className="b text-black hover:text-red-500 ml-2">
                    Delete
                  </button>
                </td>
                <td className="px-4 py-2 dark:border-2 whitespace-nowrap">2</td>

                <td className="px-4 py-2 dark:border-2 whitespace-nowrap">3</td>
              </tr>
            </tbody>


            <tbody className="bg-white divide-y  divide-gray-200 text-xs">
              <tr className="dark:border-2">
                <td className="px-4 py-2 text-left dark:border-2 whitespace-nowrap font-arial text-xs ">
                  <button
                    onClick={() => {
                      router.push("/form/session_form");
                    }}
                    className="b text-black   hover:text-blue-500  "
                  >
                    View
                  </button>
                  <button
                    onClick={() => {
                      router.push("/form/session_form");
                    }}
                    className="b text-black hover:text-yellow-400 ml-2"
                  >
                    Edit
                  </button>
                  <button className="b text-black hover:text-red-500 ml-2">
                    Delete
                  </button>
                </td>
                <td className="px-4 py-2 dark:border-2 whitespace-nowrap">2</td>

                <td className="px-4 py-2 dark:border-2 whitespace-nowrap">3</td>
              </tr>
            </tbody>


            <tbody className="bg-white divide-y  divide-gray-200 text-xs">
              <tr className="dark:border-2">
                <td className="px-4 py-2 text-left dark:border-2 whitespace-nowrap font-arial text-xs ">
                  <button
                    onClick={() => {
                      router.push("/form/session_form");
                    }}
                    className="b text-black   hover:text-blue-500  "
                  >
                    View
                  </button>
                  <button
                    onClick={() => {
                      router.push("/form/session_form");
                    }}
                    className="b text-black hover:text-yellow-400 ml-2"
                  >
                    Edit
                  </button>
                  <button className="b text-black hover:text-red-500 ml-2">
                    Delete
                  </button>
                </td>
                <td className="px-4 py-2 dark:border-2 whitespace-nowrap">2</td>

                <td className="px-4 py-2 dark:border-2 whitespace-nowrap">3</td>
              </tr>
            </tbody>


            <tbody className="bg-white divide-y  divide-gray-200 text-xs">
              <tr className="dark:border-2">
                <td className="px-4 py-2 text-left dark:border-2 whitespace-nowrap font-arial text-xs ">
                  <button
                    onClick={() => {
                      router.push("/form/session_form");
                    }}
                    className="b text-black   hover:text-blue-500  "
                  >
                    View
                  </button>
                  <button
                    onClick={() => {
                      router.push("/form/session_form");
                    }}
                    className="b text-black hover:text-yellow-400 ml-2"
                  >
                    Edit
                  </button>
                  <button className="b text-black hover:text-red-500 ml-2">
                    Delete
                  </button>
                </td>
                <td className="px-4 py-2 dark:border-2 whitespace-nowrap">2</td>

                <td className="px-4 py-2 dark:border-2 whitespace-nowrap">3</td>
              </tr>
            </tbody>


            <tbody className="bg-white divide-y  divide-gray-200 text-xs">
              <tr className="dark:border-2">
                <td className="px-4 py-2 text-left dark:border-2 whitespace-nowrap font-arial text-xs ">
                  <button
                    onClick={() => {
                      router.push("/form/session_form");
                    }}
                    className="b text-black   hover:text-blue-500  "
                  >
                    View
                  </button>
                  <button
                    onClick={() => {
                      router.push("/form/session_form");
                    }}
                    className="b text-black hover:text-yellow-400 ml-2"
                  >
                    Edit
                  </button>
                  <button className="b text-black hover:text-red-500 ml-2">
                    Delete
                  </button>
                </td>
                <td className="px-4 py-2 dark:border-2 whitespace-nowrap">2</td>

                <td className="px-4 py-2 dark:border-2 whitespace-nowrap">3</td>
              </tr>
            </tbody>


            <tbody className="bg-white divide-y  divide-gray-200 text-xs">
              <tr className="dark:border-2">
                <td className="px-4 py-2 text-left dark:border-2 whitespace-nowrap font-arial text-xs ">
                  <button
                    onClick={() => {
                      router.push("/form/session_form");
                    }}
                    className="b text-black   hover:text-blue-500  "
                  >
                    View
                  </button>
                  <button
                    onClick={() => {
                      router.push("/form/session_form");
                    }}
                    className="b text-black hover:text-yellow-400 ml-2"
                  >
                    Edit
                  </button>
                  <button className="b text-black hover:text-red-500 ml-2">
                    Delete
                  </button>
                </td>
                <td className="px-4 py-2 dark:border-2 whitespace-nowrap">2</td>

                <td className="px-4 py-2 dark:border-2 whitespace-nowrap">3</td>
              </tr>
            </tbody>


            <tbody className="bg-white divide-y  divide-gray-200 text-xs">
              <tr className="dark:border-2">
                <td className="px-4 py-2 text-left dark:border-2 whitespace-nowrap font-arial text-xs ">
                  <button
                    onClick={() => {
                      router.push("/form/session_form");
                    }}
                    className="b text-black   hover:text-blue-500  "
                  >
                    View
                  </button>
                  <button
                    onClick={() => {
                      router.push("/form/session_form");
                    }}
                    className="b text-black hover:text-yellow-400 ml-2"
                  >
                    Edit
                  </button>
                  <button className="b text-black hover:text-red-500 ml-2">
                    Delete
                  </button>
                </td>
                <td className="px-4 py-2 dark:border-2 whitespace-nowrap">2</td>

                <td className="px-4 py-2 dark:border-2 whitespace-nowrap">3</td>
              </tr>
            </tbody>


            <tbody className="bg-white divide-y  divide-gray-200 text-xs">
              <tr className="dark:border-2">
                <td className="px-4 py-2 text-left dark:border-2 whitespace-nowrap font-arial text-xs ">
                  <button
                    onClick={() => {
                      router.push("/form/session_form");
                    }}
                    className="b text-black   hover:text-blue-500  "
                  >
                    View
                  </button>
                  <button
                    onClick={() => {
                      router.push("/form/session_form");
                    }}
                    className="b text-black hover:text-yellow-400 ml-2"
                  >
                    Edit
                  </button>
                  <button className="b text-black hover:text-red-500 ml-2">
                    Delete
                  </button>
                </td>
                <td className="px-4 py-2 dark:border-2 whitespace-nowrap">2</td>

                <td className="px-4 py-2 dark:border-2 whitespace-nowrap">3</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default Season;
