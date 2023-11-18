import React, { useState, useEffect } from "react";
import Layout from "../Layout";
import { AiTwotoneHome } from "react-icons/ai";
import { TbFileDownload } from "react-icons/tb";
import { AiOutlineSearch } from "react-icons/ai";
import { useRouter } from "next/router";
import { url } from "@/constants/url";
import axios from "axios";
import ConfirmModal from "../modals/ConfirmModal";

const UserProfile = () => {
  const router = useRouter();
  const [menuRecords, setMenuRecords] = useState([]);
  const headers = {
    "Content-Type": "application/json",
    secret: "fsdhfgsfuiweifiowefjewcewcebjw"
  };

  const gettingMenusData = async () => {
    try {
      const resp = await axios.get(`${url}/api/get_menu_rights`, { headers: headers });
      const respData = resp.data.data;
      const uniqueRecords = {};
      respData.forEach((record) => {
        const roleId = record.role_id;
        if (!uniqueRecords[roleId]) {
          uniqueRecords[roleId] = record;
        }
      });
      const uniqueRecordsArray = Object.values(uniqueRecords);
      setMenuRecords(uniqueRecordsArray);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    gettingMenusData();
  }, []);

  console.log("fd", menuRecords);

  const [isOpen, setisOpen] = useState(false);
  const [userId, setUserId] = useState(null);

  const deleteHandler = (id) => {
    setisOpen(true);
    setUserId(id);
  };

  const resetData = () => {
    gettingPrdBrand();
    setisOpen(false);
  };

  return (
    <>
      <Layout>
        <div className="h-screen overflow-auto w-full ">
        <ConfirmModal
          isOpen={isOpen}
          onClose={() => setisOpen(false)}
          onOpen={() => setisOpen(true)}
          userId={userId}
          method="delete"
          endpoints="delete_menu_rights"
          onDeletedData={resetData}
        ></ConfirmModal>
          <div className="text-black flex items-center justify-between bg-white max-w-full font-arial h-[52px] px-5">
            <h2 className="font-arial font-normal text-3xl  py-2">User Profile</h2>
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

          <div className="overflow-x-auto text-black font-arial">
            <table className="min-w-full divide-y border divide-gray-200">
              <thead className="border-b">
                <tr className="bg-gray-50 font-arial">
                  <th className=" w-[12%] px-6 py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Action
                  </th>
                  <th className="px-6 w-[7%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Role ID
                  </th>
                  <th className="px-6 w-[10%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    User Profile
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 text-xs">
                {menuRecords?.map((item) => (
                  <tr key={item.id}>
                    <td className="px-6 py-2 dark:border-2 whitespace-nowrap font-arial ">
                      <button
                        onClick={() => {
                          router.push({
                            pathname: "/form/user_profile_form",
                            query: { type: "view", id: item?.role_id }
                          });
                        }}
                        className="b text-black   hover:text-blue-500  "
                      >
                        View
                      </button>
                      <button
                        onClick={() => {
                          router.push({
                            pathname: "/form/user_profile_form",
                            query: { type: "Edit", id: item?.role_id }
                          });
                        }}
                        className="b text-black hover:text-yellow-400 ml-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          deleteHandler(item?.role_id);
                        }}
                        className="b text-black hover:text-red-500 ml-2"
                      >
                        Delete
                      </button>
                    </td>
                    <td className="px-6 py-2 dark:border-2 whitespace-nowrap">{item.role_id}</td>
                    <td className="px-6 py-2 dark:border-2 whitespace-nowrap">{item.U_profile_name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default UserProfile;
