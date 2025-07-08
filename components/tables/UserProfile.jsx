import React, { useState, useEffect } from "react";
import Layout from "../Layout";
import { AiTwotoneHome } from "react-icons/ai";
import { TbFileDownload } from "react-icons/tb";
import { AiOutlineSearch } from "react-icons/ai";
import { useRouter } from "next/router";
import { url } from "@/constants/url";
import axios from "axios";
import UserProfileModal from "../modals/UserProfileModal";
import { CSVLink } from "react-csv";

const UserProfile = () => {
  const router = useRouter();
  const [menuRecords, setMenuRecords] = useState([]);
  const headers = {
    "Content-Type": "application/json",
    secret: "fsdhfgsfuiweifiowefjewcewcebjw",
  };

  // const gettingMenusData = async () => {
  //   try {
  //     const resp = await axios.get(`${url}/api/get_menu_rights`, {
  //       headers: headers,
       
  //     });
  //     const respData = resp.data.data;
  //     const uniqueRecords = {};
  //     respData.forEach((record) => {
  //       const roleId = record.role_id;
  //       const app_type = record.app_type
  //       if (!uniqueRecords[roleId] || !uniqueRecords[app_type]) {
  //         uniqueRecords[roleId] = record;
  //         uniqueRecords[app_type] = record;
  //       }
  //     });
  //     const uniqueRecordsArray = Object.values(uniqueRecords);
  //     setMenuRecords(uniqueRecordsArray);
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };


  const gettingMenusData = async () => {
    try {
      const resp = await axios.get(`${url}/api/get_menu_rights`, {
        headers: headers,
      });
  
      if (!resp.data || !resp.data.data) {
        console.error("Invalid response structure");
        return;
      }
  
      const respData = resp.data.data;
      const uniqueRecords = new Map();
  
      respData.forEach((record) => {
        const uniqueKey = `${record.role_id}-${record.mode}`;
        if (!uniqueRecords.has(uniqueKey)) {
          uniqueRecords.set(uniqueKey, record);
        }
      });
  
      const uniqueRecordsArray = Array.from(uniqueRecords.values());
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
  const [userMode, setUserMode] = useState(null);
  console.log("Modeee", userMode)

  const deleteHandler = (id, mode) => {
    setisOpen(true);
    setUserId(id);
    setUserMode(mode)
  };

  const resetData = () => {
    gettingMenusData();
    setisOpen(false);
  };

  const csvHeaders = [
    { label: "Id", key: "pseg_id" },
    { label: "Role ID", key: "role_id" },
    { label: "User Profile", key: "U_profile_name" },
    { label: "Company", key: "U_profile_name" },
  ];

  const rowdisable = (menu) => {
    if (menu?.type_menu === "0" || menu?.type_menu === "1") {
      return true;
    } else {
      return false;
    }
  };

  const {name} = router.query

  return (
    <>
      <Layout>
        <div className="min-h-screen overflow-y-auto w-full ">
          <UserProfileModal
            isOpen={isOpen}
            onClose={() => setisOpen(false)}
            onOpen={() => setisOpen(true)}
            userId={userId}
            mode={userMode}
            method="get"
            endpoints="delete_menu_rights"
            onDeletedData={resetData}
          ></UserProfileModal>
          <div className="text-black flex items-center justify-between bg-white max-w-full font-arial h-[52px] px-5">
          <h2 className="font-arial font-normal text-xl tabletitle  py-2">{name ? name :"User Role"}</h2>
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
                <CSVLink data={menuRecords} headers={csvHeaders}>
                  <TbFileDownload
                    className="text-green-600"
                    size={34}
                  ></TbFileDownload>
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
                    pathname: "/form/user_profile_form",
                    query: { type: "CREATE" },
                  });
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
                  <th className="px-6 w-[10%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Company
                  </th>
                  <th className="px-6 w-[10%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Mode
                  </th>
                  <th className="px-6 w-[10%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    App Type
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 text-xs">
                {menuRecords.length > 0 &&
                  menuRecords?.map((item) => (
                    <tr key={item.id}>
                      <td className="px-6 py-2 dark:border-2 whitespace-nowrap font-arial ">
                        <button
                          onClick={() => {
                            router.push({
                              pathname: "/form/user_profile_form",
                              query: { type: "view", role_id: item?.role_id, mode:item?.mode, app_type: item?.app_type },
                            });
                          }}
                          className="b text-black   hover:text-blue-500  "
                        >
                          View
                        </button>

                        <button
                          onClick={() => {
                            deleteHandler(item?.role_id, item?.mode);
                          }}
                          className="b text-black hover:text-red-500 ml-2"
                        >
                          Delete
                        </button>
                      </td>
                      <td className="px-6 py-2 dark:border-2 whitespace-nowrap">
                        {item.role_id}
                      </td>
                      <td className="px-6 py-2 dark:border-2 whitespace-nowrap">
                        {item.U_profile_name}
                      </td>
                      <td className="px-6 py-2 dark:border-2 whitespace-nowrap">
                        {item?.comp_name}
                      </td>
                      <td className="px-6 py-2 dark:border-2 whitespace-nowrap">
                        {item.mode}
                      </td>
                      <td className="px-6 py-2 dark:border-2 whitespace-nowrap">
                        {item.app_type}
                      </td>
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
