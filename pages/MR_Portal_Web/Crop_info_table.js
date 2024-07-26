import React, { useState, useEffect, Fragment } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Dialog, Transition } from "@headlessui/react";
import { AiTwotoneHome } from "react-icons/ai";
import { useRouter } from "next/router";
import { url } from "@/constants/url";
import { AiOutlineSearch } from "react-icons/ai";
import axios from "axios";

import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";
import Layout from "@/components/Layout1";
import nmg from "./banner.jpg";
import ReactPaginate from "react-paginate";
import moment from "moment";
import { output } from "@/next.config";

const AdditionalInfo = (props) => {
  const router = useRouter();
  const headers = {
    "Content-Type": "application/json",
    secret: "fsdhfgsfuiweifiowefjewcewcebjw",
  };
  const [data, setData] = useState([]);

  const getCompanyInfo = async () => {
    try {
      const respond = await axios.get(`${url}/api/get_crop_info`, {
        headers: headers,
      });
      console.log("lpo", respond);
      const apires = await respond.data.data;

      setData(apires);
    } catch (error) {
      console.log(error);
      setData([]);
    }
  };

  useEffect(() => {
    getCompanyInfo();
  }, []);

  const [showDeleteModal, setShowDeleteModal] = useState({
    show: false,
    id: "",
  });
  const handleDelete = async (id) => {
    try {
      const resp = await axios
        .get(`${url}/api/delete_crop_info`, {
          headers,
          params: {
            cr_id: id,
          },
        })
        .then((res) => {
          toast.success(res.data.message);
          setShowDeleteModal({
            show: false,
            id: "",
          });
          getCompanyInfo();
        });
    } catch (error) {
      const errMsg = error?.response?.data.message;
      toast.error(errMsg);
      setShowDeleteModal({
        show: false,
        id: "",
      });
    }
  };
  return (
    <Layout>
      <div className="bg-white rounded p-4 w-full overflow-auto ">
        <Toaster position="bottom-center" reverseOrder={false} />
        <div className="flex flex-row justify-between  h-max  px-2 ">
          <h2 className="font-arial font-normal text-3xl tabletitle py-2">
            Crop Info
          </h2>
          <span className="flex items-center gap-2 cursor-pointer">
            <h2></h2>
            <AiTwotoneHome
              className="text-black"
              size={34}
              onClick={() => {
                router.push("/");
              }}
            />
            <button
              onClick={() => {
                router.push({
                  pathname: "/MR_Portal_Web/Crop_info_form",
                  query: {
                    cId: null,
                    crId: null,
                    season: null,
                    type: "Add",
                  },
                });
              }}
              className=" text-white py-1 px-2 rounded-md bg-blue-500 hover:bg-orange-500 "
            >
              Create New
            </button>
          </span>
        </div>
        <div className="flex flex-row justify-between  h-max  px-2 ">
          <table className="min-w-full divide-y border- divide-gray-200 ">
            <thead className="border-b w-max">
              <tr className="bg-gray-200 font-arial">
                <th className="px-4 py-2 text-left dark:border-2 text-xs font-medium text-gray-500 tracking-wider">
                  Action
                </th>
                <th className="px-4 py-2 text-left dark:border-2 text-xs font-medium text-gray-500 tracking-wider">
                  Company
                </th>
                <th className="px-4 py-2 whitespace-nowrap  text-left w-max dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                  Crop name
                </th>
                <th className="px-4 py-2 whitespace-nowrap text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                  Season
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
                          pathname: "/MR_Portal_Web/Crop_info_form",
                          query: {
                            cId: item.c_id,
                            crId: item.cr_id,
                            season: item.season,
                            type: "View",
                          },
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
                          pathname: "/MR_Portal_Web/Crop_info_form",
                          query: {
                            cId: item.c_id,
                            crId: item.cr_id,
                            season: item.season,
                            type: "Edit",
                          },
                        });
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="b text-black hover:text-red-500 ml-2"
                      onClick={() => {
                        setShowDeleteModal({
                          id: item.cr_id,
                          show: true,
                        });
                      }}
                    >
                      Delete
                    </button>
                  </td>
                  <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                    {item.company}
                  </td>
                  <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                    {item.cropName}
                  </td>
                  <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                    {item.season}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Transition appear show={showDeleteModal.show} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() =>
            setShowDeleteModal({
              show: "",
              id: "",
            })
          }
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className=" font-arial  max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-[1.78rem] font-medium leading-6 text-center text-gray-900"
                  >
                    Are you sure ?
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-center text-gray-500">
                      Do you really want to delete this ?
                    </p>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() =>
                        setShowDeleteModal({
                          id: "",
                          show: false,
                        })
                      }
                    >
                      Cancel
                    </button>

                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => {
                        handleDelete(showDeleteModal.id);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </Layout>
  );
};

export default AdditionalInfo;
