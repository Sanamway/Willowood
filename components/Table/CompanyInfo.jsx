import React, { useEffect, useState } from "react";
import Layout from "../Layout";
import { AiTwotoneHome } from "react-icons/ai";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";
import axios from "axios";
import { url } from "@/constants/url";
import { AiOutlineSearch } from "react-icons/ai";
import ConfirmationModal from "../modals/ConfirmationModal";
import { CSVLink } from "react-csv";
import { TbFileDownload } from "react-icons/tb";
const CompanyInfo = () => {
  const csvHeaders = [
    { label: "Id", key: "c_id" },
    { label: "Company Name", key: "c_name" },
    { label: "Company Address", key: "corp_address" },
    { label: "Sale Address", key: "sale_address" },
    { label: "Contact Person", key: "contact_person" },
    { label: "Mobile No.", key: "phone_number" },
    { label: "Email", key: "email" },
    { label: "GST No.", key: "gst_no" },
    { label: "Status", key: "isDeleted" },
  ];
  const router = useRouter();
  const [data, setData] = useState([]);
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

  const deleteHandler = (id) => {
    setisOpen(true);
    setCompanyId(id);
  };

  const [isOpen, setisOpen] = useState(false);
  const [companyId, setCompanyId] = useState(null);

  const resetData = () => {
    getCompanyInfo();
    setisOpen(false);
  };

  const{name} = router.query

  return (
    <Layout>
      <div className=" overflow-auto w-full font-arial bg-white ">
        <Toaster position="bottom-center" reverseOrder={false} />
        <div className="flex flex-row justify-between  h-max  px-5">
          <h2 className="font-arial font-normal text-3xl tabletitle py-2">
            {name ? name :"Define Company"}
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
            <h2>
              <CSVLink data={data} headers={csvHeaders}>
                <TbFileDownload
                  className="text-green-600"
                  size={34}
                ></TbFileDownload>
              </CSVLink>
            </h2>
            <AiTwotoneHome
              className="text-red-500"
              size={34}
              onClick={() => {
                router.push("/");
              }}
            />
            <button
              onClick={() => {
                router.push({
                  pathname: "/form/company_info_form",
                  query: { id: null, type: "Add" },
                });
              }}
              className=" text-white py-1 px-2 rounded-md bg-green-500 hover:bg-orange-500"
            >
              Create New
            </button>
          </span>
        </div>
        <div className="bg-white  flex items-start justify-center max-w-full">
          <div className=" text-black font-arial select-none scrollbar-hide overflow-x-auto tableInfo p-2">
            <table className="min-w-full divide-y border- divide-gray-200 ">
              <thead className="border-b w-max">
                <tr className="bg-gray-50 font-arial">
                  <th className="px-4 py-2 text-left dark:border-2 text-xs font-medium text-gray-500 tracking-wider">
                    Action
                  </th>
                  <th className="px-4 py-2 whitespace-nowrap  text-left w-max dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Company Id
                  </th>
                  <th className="px-4 py-2 whitespace-nowrap text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Company Name
                  </th>
                  <th className="px-4 py-2 whitespace-nowrap  text-left dark:border-2 text-xs font-medium text-gray-500 tracking-wider">
                    Company Address
                  </th>
                  <th className="px-4 py-2 whitespace-nowrap  text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Sale. Address
                  </th>
                  <th className=" px-4 py-2 whitespace-nowrap  text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Contact Person
                  </th>
                  <th className=" px-4 py-2  whitespace-nowrap text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Mobile No.
                  </th>
                  <th className="px-4 py-2 whitespace-nowrap text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Email.Id
                  </th>
                  <th className="px-4 py-2 whitespace-nowrap text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    GST Number
                  </th>
                  <th className="px-4 py-2 whitespace-nowrap text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y  divide-gray-200 text-xs">
                {data?.map((item, idx) => (
                  <tr className="dark:border-2">
                    <td className="px-4 py-2 text-left dark:border-2 whitespace-nowrap font-arial text-xs ">
                      <button
                        onClick={() => {
                          router.push({
                            pathname: "/form/company_info_form",
                            query: { id: item.c_id, type: "View" },
                          });
                        }}
                        className="b text-black   hover:text-blue-500  "
                      >
                        View
                      </button>
                      <button
                        className="b text-black hover:text-yellow-400 ml-2"
                        onClick={() => {
                          router.push({
                            pathname: "/form/company_info_form",
                            query: { id: item.c_id, type: "Edit" },
                          });
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="b text-black hover:text-red-500 ml-2"
                        onClick={() => {
                          deleteHandler(item.c_id);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                      {item.c_id}
                    </td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                      {item.cmpny_name}
                    </td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                      {item.corp_address}
                      <br />
                      {item.corp_address_city}, {item.corp_address_state}
                    </td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                      {item.sale_address}
                      <br />
                      {item.sale_address_city}, {item.sale_address_state}
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
                    <td className="px-6 py-2 dark:border-2 whitespace-nowrap">
                      {item.isDeleted == false ? "Enabled" : "Disabled"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <ConfirmationModal
        isOpen={isOpen}
        onClose={() => setisOpen(false)}
        onOpen={() => setisOpen(true)}
        id={companyId}
        type="Company Information"
        onDeletedData={resetData}
      />
    </Layout>
  );
};

export default CompanyInfo;
