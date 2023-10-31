import React, { useEffect, useState } from "react";
import Layout from "../Layout";
import { AiTwotoneHome } from "react-icons/ai";
import { TiArrowBack } from "react-icons/ti";
import { useRouter } from "next/router";
import axios from "axios";
import { url } from "@/constants/url";
import { AiOutlineSearch } from "react-icons/ai";
const CompanyInfo = () => {
  const router = useRouter();
  const [data, setData] = useState(null);
  const headers = {
    "Content-Type": "application/json",
    secret: "fsdhfgsfuiweifiowefjewcewcebjw",
  };
  const getCompanyInfo = async () => {
    try {
      const respond = await axios.get(`${url}/api/get_company_information`, {
        headers: headers,
      });
      const apires = await respond.data.data;
      setData(apires);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCompanyInfo();
  }, []);
  const handleDeleteCompany = async (id, name) => {
    if (window.confirm(`Delete ${name} !!`))
      try {
        const respond = await axios.delete(
          `${url}/api/delete_company_information/${id}`,
          {
            headers: headers,
          }
        ).then((res)=> getCompanyInfo());
        const apires = await respond.data.data;
        setData(apires);
      } catch (error) {
        console.log(error);
      }
  };
  return (
    <Layout>
      <div className="h-screen overflow-auto w-full font-arial bg-white ">
        <div className="flex flex-row justify-between  h-max  px-5">
          <h2 className="font-arial font-normal text-3xl  py-2">
            Company Info.
          </h2>
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

            <AiTwotoneHome
              className="text-red-500"
              size={34}
              onClick={() => {
                router.push("/");
              }}
            />
            <button
              onClick={() => {
                router.push("/form/company_info_form");
              }}
              className=" text-white py-1 px-2 rounded-md bg-green-500 hover:bg-orange-500"
            >
              Create New
            </button>
          </span>
        </div>
        <div className="bg-white h-screen flex items-start justify-center max-w-full">
          <div className=" text-black font-arial scrollbar-hide overflow-x-auto w-[1000px]">
            <table className="min-w-full divide-y border- divide-gray-200 ">
              <thead className="border-b w-max">
                <tr className="bg-gray-50 font-arial">
                  <th className="px-4 py-2 text-left dark:border-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                  <th className="px-4 py-2 whitespace-nowrap  text-left w-max dark:border-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Company Id
                  </th>
                  <th className="px-4 py-2 whitespace-nowrap text-left dark:border-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Company Name
                  </th>
                  <th className="px-4 py-2 whitespace-nowrap  text-left dark:border-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Company Address
                  </th>
                  <th className="px-4 py-2 whitespace-nowrap  text-left dark:border-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sale. Address
                  </th>
                  <th className=" px-4 py-2 whitespace-nowrap  text-left dark:border-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact Person
                  </th>
                  <th className=" px-4 py-2  whitespace-nowrap text-left dark:border-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Mobile No.
                  </th>
                  <th className="px-4 py-2 whitespace-nowrap text-left dark:border-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Emial.Id
                  </th>
                  <th className="px-4 py-2 whitespace-nowrap text-left dark:border-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    GST Number
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y  divide-gray-200 text-xs">
                {data?.map((item, idx) => (
                  <tr className="dark:border-2">
                    <td className="px-4 py-2 text-left dark:border-2 whitespace-nowrap font-arial text-xs ">
                      <button
                        onClick={() => {
                          router.push("/form/company_info_form");
                        }}
                        className="b text-black   hover:text-blue-500  "
                      >
                        View
                      </button>
                      <button className="b text-black hover:text-yellow-400 ml-2">
                        Edit
                      </button>
                      <button
                        className="b text-black hover:text-red-500 ml-2"
                        onClick={() => {
                          handleDeleteCompany(item._id, item.cmpny_name);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                      {idx+1}
                    </td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                      {item.cmpny_name}
                    </td>

                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                      {item.corp_address}
                    </td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                      {item.sale_address}
                    </td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                      {item.contact_person}
                    </td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                      {item.phone_number}
                    </td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                      {item.email}
                    </td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                      {item.gst_no}
                    </td>
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

export default CompanyInfo;
