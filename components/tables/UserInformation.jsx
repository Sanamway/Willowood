import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import { AiTwotoneHome } from "react-icons/ai";
import ConfirmModal from "../modals/ConfirmModal";
import { TbFileDownload } from "react-icons/tb";
import { AiOutlineSearch } from "react-icons/ai";
import { useRouter } from "next/router";
import axios from "axios";
import { url } from "@/constants/url";
import { CSVLink } from "react-csv";


const UserInformation = () => {
  const router = useRouter();
  const [datas, setDatas] = useState([]);

  const headers = {
    "Content-Type": "application/json",
    secret: "fsdhfgsfuiweifiowefjewcewcebjw"
  };

  const getApiData = async () => {
    try {
      const resp = await axios.get(`${url}/api/get_users`, { headers: headers });
      const respdata = await resp.data.data;
      setDatas(respdata);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getApiData();
  }, []);

  const [isOpen, setisOpen] = useState(false);
  const [userId, setUserId] = useState(null);

  const deleteHandler = (id) => {
    setisOpen(true);
    setUserId(id);
  };

  const resetData = () => {
    getApiData();
    setisOpen(false);
  };

  const csvHeaders = [
    { label: "Id", key: "pseg_id" },
    { label: "Segment ID", key: "pseg_id" },
    { label: "Product Segment", key: "pseg_name" },
    { label: "Company", key: "c_id" },
    { label: "Status", key: "isDeleted" }
  ];

  const statusUl =(item)=>{
    if(item.status =="0"){
      return "Not Active"
    }
    if(item.status =="1"){
      return "Active"
    }

    if(item.status =="2"){
      return "Frozen"
    }

    if(item.status =="3"){
      return "Lock"
    }
  }

  const {name} =router.query

  return (
    <Layout>
      <div className=" overflow-auto w-full pb-64 bg-white   ">
        <ConfirmModal
          isOpen={isOpen}
          onClose={() => setisOpen(false)}
          onOpen={() => setisOpen(true)}
          userId={userId}
          method="get"
          endpoints="delete_user"
          onDeletedData={resetData}
        ></ConfirmModal>
        <div className="text-black userinfotext  flex items-center justify-between bg-white max-w-full font-arial h-[52px] px-5">
        <h2 className="font-arial font-normal text-xl tabletitle  py-2">{name}</h2>
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
                  pathname: "/form/user_information_form",
                  query: { type: "CREATE" }
                });
              }}
              className=" text-white py-1.5 px-2 rounded-md bg-green-500 hover:bg-orange-500"
            >
              Create New
            </button>
          </div>
        </div>

        <div className="bg-white  flex items-center justify-center max-w-full ">
          <div className=" text-black font-arial scrollbar-hide overflow-x-scroll  tableInfo select-none overflow-y-auto p-2 m-2">
            <table className="w-full  divide-y border- divide-gray-200 ">
              <thead className="border-b">
                <tr className="bg-gray-50 font-arial">
                  <th className="  px-6 py-2 text-left dark:border-2 text-xs font-medium text-gray-500 tracking-wider">
                    Action
                  </th>
                  <th className="  px-6 py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Userid
                  </th>
                  <th className="  px-6 py-2 text-left whitespace-nowrap dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Emp Code
                  </th>
                  <th className="px-6 w py-2 text-left whitespace-nowrap dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    User Name
                  </th>
                  <th className="  px-6 py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Position
                  </th>
                  <th className="px-6  py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Address
                  </th>
                  <th className="px-6  py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    City
                  </th>
                  <th className="px-6  py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    State
                  </th>

                  <th className="px-6  py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Email
                  </th>
                  <th className="px-6  py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Mobile
                  </th>

                  <th className="px-6   py-2 text-left whitespace-nowrap dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    User Role
                  </th>
                  <th className="px-6  py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    User Status
                  </th>
                  <th className="px-6  py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 text-xs ">
                {datas?.map((item) => (
                  <tr key={item.id}>
                    <td className="px-6 py-2 dark:border-2 whitespace-nowrap font-arial ">
                      <button
                        onClick={() => {
                          router.push({
                            pathname: "/form/user_information_form",
                            // query: { userData: JSON.stringify(item) },
                            query: { type: "view", id: item?.user_id}
                          });
                        }}
                        className="b text-black   hover:text-blue-500  "
                      >
                        View
                      </button>
                      <button
                        onClick={() => {
                          router.push({
                            pathname: "/form/user_information_form",
                            // query: { userData: JSON.stringify(item) },
                            query: { type: "Edit", id: item?.user_id }
                          });
                        }}
                        className="b text-black hover:text-yellow-400 ml-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          deleteHandler(item?.user_id);
                        }}
                        className="b text-black hover:text-red-500 ml-2"
                      >
                        Delete
                      </button>
                    </td>
                    <td className="px-6 py-2 dark:border-2 whitespace-nowrap">{item.user_id}</td>
                    <td className="px-6 py-2 dark:border-2 whitespace-nowrap">{""}</td>
                    <td className="px-6 py-2 dark:border-2 whitespace-nowrap">{item.user_name}</td>
                    <td className="px-6 py-2 dark:border-2 whitespace-nowrap">{item.position}</td>
                    <td className="px-6 py-2 dark:border-2 whitespace-nowrap">{item.address}</td>
                    <td className="px-6 py-2 dark:border-2 whitespace-nowrap">{item.city}</td>
                    <td className="px-6 py-2 dark:border-2 whitespace-nowrap">{item.state}</td>
                    <td className="px-6 py-2 dark:border-2 whitespace-nowrap">{item.email}</td>
                    <td className="px-6 py-2 dark:border-2 whitespace-nowrap">{item.phone_number}</td>
                    <td className="px-6 py-2 dark:border-2 whitespace-nowrap">{item.t_user}</td>
                    <td className="px-6 py-2 dark:border-2 whitespace-nowrap">{statusUl(item)}</td>
                    <td className="px-6 py-2 dark:border-2 whitespace-nowrap">{item.isDeleted ==true ? "Disable":"Enable"}</td>
                    {/* <td className="px-6 py-2 dark:border-2 whitespace-nowrap">
                      {item.status == 1 ? "Enabled" : "Disabled"}
                    </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserInformation;
