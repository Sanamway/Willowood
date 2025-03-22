import React, { useEffect, useState } from "react";
import Layout from "../Layout";
import { AiTwotoneHome } from "react-icons/ai";
import { TiArrowBack } from "react-icons/ti";
import { useRouter } from "next/router";
import { url } from "@/constants/url";
import axios, { all } from "axios";
import * as Yup from "yup";
import toast, { Toaster } from "react-hot-toast";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
const CollectionTrasactionPeriod = () => {
  const headers = {
    "Content-Type": "application/json",
    secret: "fsdhfgsfuiweifiowefjewcewcebjw",
  };

  const router = useRouter();

  const [selectionState, setSelectionState] = useState({
    year: null,
    menu: null,
    companyId: null,
    businessSegmentId: null,
    businessUnitId: null,
  });

  const [companyData, setCompanyData] = useState([]);
  const getCompanyInfo = async () => {
    try {
      const respond = await axios.get(`${url}/api/get_company_information`, {
        headers: headers,
      });
      const apires = await respond.data.data;

      setCompanyData(apires.filter((item, idx) => item.isDeleted === false));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCompanyInfo();
  }, []);
  const [bgData, setBGData] = useState([]);
  const getBGInfo = async (companyId) => {
    try {
      const respond = await axios.get(
        `${url}/api/get_company_wise_business_segment/${companyId}`,
        {
          headers: headers,
        }
      );
      const apires = await respond.data.data;

      setBGData(apires.filter((item, idx) => item.isDeleted === false));
    } catch (error) {
      console.log(error);
      setBGData([]);
    }
  };

  const [buData, setBUData] = useState([]);

  const getBUInfo = async (companyId, businessSegmentId) => {
    try {
      const respond = await axios.get(
        `${url}/api/get_business_unit_by_segmentId/${businessSegmentId}`,
        {
          headers: headers,
        }
      );
      const apires = await respond.data.data;

      setBUData(
        apires.filter((item) => Number(item.c_id) === Number(companyId))
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!selectionState.companyId) return;
    getBGInfo(selectionState.companyId);
  }, [selectionState.companyId]);

  useEffect(() => {
    if (!selectionState.businessSegmentId || !selectionState.companyId) return;
    getBUInfo(selectionState.companyId, selectionState.businessSegmentId);
  }, [selectionState.businessSegmentId, selectionState.companyId]);

  const [allTransactionData, setAllTransactionData] = useState([]);
  const getAllTransactionData = async (year, cId, bgId, buId) => {
    if (!year || !cId || !bgId || !buId) return;
    try {
      const respond = await axios.get(`${url}/api/get_cp`, {
        headers: headers,
        params: {
          year: moment(year).year(),
          c_id: cId,
          bg_id: bgId,
          bu_id: buId,
        },
      });
      const apires = await respond.data.data;
      setAllTransactionData(
        apires.map((item) => {
          if (item.clos_status !== "Not Active") {
            return {
              ...item,
              checkboxEnabled: false,
              isEditable: false,
              blocked: true,
            };
          } else {
            return {
              ...item,
              checkboxEnabled: true,
              isEditable: false,
              blocked: false,
            };
          }
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllTransactionData(
      selectionState.year,
      selectionState.companyId,
      selectionState.businessSegmentId,
      selectionState.businessUnitId
    );
  }, [
    selectionState.companyId,
    selectionState.businessSegmentId,
    selectionState.businessUnitId,
    selectionState.year,
  ]);
  useEffect(() => {
    if (router.query.type === "View") {
      getAllTransactionData(
        router.query.yr,
        router.query.cId,
        router.query.bgId,
        router.query.buId
      );
    }
  }, [router]);
  useEffect(() => {
    if (router.query.type === "View") {
      getBGInfo(router.query.cId);
    }
  }, [router]);
  useEffect(() => {
    if (router.query.type === "View") {
      getBUInfo(router.query.cId, router.query.bgId);
    }
  }, [router]);
  const [buttonLoading, setButtonLoading] = useState(false)
  const handleSavePlan = async () => {
    setButtonLoading(true)
    try {
      const planId = allTransactionData.filter(
        (item) => item.isEditable === true
      )[0].plan_id;
      const subDate = moment(
        allTransactionData.filter((item) => item.isEditable === true)[0]
          .subm_t_date
      ).format("YYYY-MM-DD");
      const data = {
        rolling_plan_data: {
          plan_id: planId,
          t_year: moment(selectionState.year).year(),
          bu_id: Number(selectionState.businessUnitId),
          bg_id: Number(selectionState.businessSegmentId),
          c_id: Number(selectionState.companyId),
          lastsubm_t_date: subDate,
          c_name: "New Man",
          ul_name: "No Man",
        },
      };

      const respond = await axios
        .post(`${url}/api/add_cp`, JSON.stringify(data), {
          headers: headers,
        })
        .then((res) => {
          if (!res) return;
          toast.success(res.data.message);
          setButtonLoading(false)
          setTimeout(() => {
            router.push("/table/table_collectiontransaction_open");
          }, [3000]);
        });
    } catch (errors) {
      console.log("kl", errors);
      const errorMessage = errors?.response?.data?.message;

      toast.error(errorMessage);
      setButtonLoading(false)
    }
  };

  console.log("moye", allTransactionData);
  return (
    <Layout>
      <Toaster position="bottom-center" reverseOrder={false} />
      <div className=" w-full font-arial bg-white ">
        <div className="flex flex-row justify-between h-max px-5">
          <h4 className="font-arial font-normal text-3xl  py-2">
            Collection Plan - Open Period
          </h4>
          <span className="flex items-center gap-2 cursor-pointer">
            <TiArrowBack
              onClick={() => {
                router.push("/table/table_collectiontransaction_open");
              }}
              className="text-gray-400"
              size={35}
            />

            <AiTwotoneHome className="text-red-500" size={34} />
          </span>
        </div>

        <div className="bg-gray-0 p-4 bg-gray-100  w-full flex items-start min-h-screen">
          <form
            className=" flex flex-col gap-4 bg-white rounded shadow p-4 w-full mb-8 "
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="flex flex-col gap-1 ">
              <h4 className=" text-md font-bold ">Year</h4>
              {router.query.type === "View" ? (
                <h2>{router.query.yr}</h2>
              ) : (
                <DatePicker
                  className=" px-2 py-1 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                  selected={selectionState.year}
                  onChange={(date) =>
                    setSelectionState({
                      ...selectionState,
                      year: date,
                    })
                  }
                  showYearPicker
                  dateFormat="yyyy"
                />
              )}
            </div>
            <div className="flex gap-8">
              <div className="flex flex-col gap-1  w-full">
                <h4 className="text-md font-bold ">Company</h4>
                {router.query.type === "View" ? (
                  <select
                    className=" px-3 py-2 border-b border-gray-500 rounded-md bg-white focus:outline-none focus:border-b focus:border-indigo-500"
                    id="citySelect"
                    value={router.query.cId}
                    onChange={(e) =>
                      setSelectionState({
                        ...selectionState,
                        companyId: e.target.value,
                      })
                    }
                    disabled
                  >
                    <option value={""}>- Select -</option>
                    {companyData.map((item, idx) => (
                      <option value={item.c_id} key={idx}>
                        {item.cmpny_name}
                      </option>
                    ))}
                  </select>
                ) : (
                  <select
                    className=" px-3 py-2 border-b border-gray-500 rounded-md bg-white focus:outline-none focus:border-b focus:border-indigo-500"
                    id="citySelect"
                    value={selectionState.companyId}
                    onChange={(e) =>
                      setSelectionState({
                        ...selectionState,
                        companyId: e.target.value,
                      })
                    }
                  >
                    <option value={""}>- Select -</option>
                    {companyData.map((item, idx) => (
                      <option value={item.c_id} key={idx}>
                        {item.cmpny_name}
                      </option>
                    ))}
                  </select>
                )}
              </div>
              <div className="flex flex-col gap-1 w-full">
                <h4 className=" text-md font-bold ">Business Segement</h4>

                {router.query.type === "View" ? (
                  <select
                    className="px-3 py-2 border-b border-gray-500 rounded-md bg-white focus:outline-none focus:border-b focus:border-indigo-500"
                    id="stateSelect"
                    value={router.query.bgId}
                    disabled
                    onChange={(e) =>
                      setSelectionState({
                        ...selectionState,
                        businessSegmentId: e.target.value,
                      })
                    }
                  >
                    <option value={""}>- Select -</option>
                    {bgData.map((item, idx) => (
                      <option value={item.bg_id} key={idx}>
                        {item.business_segment}
                      </option>
                    ))}
                  </select>
                ) : (
                  <select
                    className="px-3 py-2 border-b border-gray-500 rounded-md bg-white focus:outline-none focus:border-b focus:border-indigo-500"
                    id="stateSelect"
                    value={selectionState.businessSegmentId}
                    disabled={!selectionState.companyId}
                    onChange={(e) =>
                      setSelectionState({
                        ...selectionState,
                        businessSegmentId: e.target.value,
                      })
                    }
                  >
                    <option value={""}>- Select -</option>
                    {bgData.map((item, idx) => (
                      <option value={item.bg_id} key={idx}>
                        {item.business_segment}
                      </option>
                    ))}
                  </select>
                )}
              </div>
              <div className="flex flex-col gap-1   w-full">
                <h4 className=" text-md font-bold ">Business Unit Division</h4>

                {router.query.type === "View" ? (
                  <select
                    className="px-3 py-2 border-b border-gray-500 rounded-md bg-white focus:outline-none focus:border-b focus:border-indigo-500"
                    id="userSelect"
                    value={router.query.buId}
                    disabled
                  >
                    <option value={""}>- Select -</option>
                    {buData.map((item, idx) => (
                      <option value={item.bu_id} key={idx}>
                        {item.business_unit_name}
                      </option>
                    ))}
                  </select>
                ) : (
                  <select
                    className="px-3 py-2 border-b border-gray-500 rounded-md bg-white focus:outline-none focus:border-b focus:border-indigo-500"
                    id="userSelect"
                    value={selectionState.businessUnitId}
                    onChange={(e) =>
                      setSelectionState({
                        ...selectionState,
                        businessUnitId: e.target.value,
                      })
                    }
                  >
                    <option value={""}>- Select -</option>
                    {buData.map((item, idx) => (
                      <option value={item.bu_id} key={idx}>
                        {item.business_unit_name}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="font-arial border-b">
                  <tr className="border bg-gray-50  font-arial">
                    <td className="px-2 py-2  dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                      Enable{" "}
                    </td>
                    <td className="px-4 py-2 text-center dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                      Plan Id
                    </td>
                    <td className="px-4 py-2 text-center dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                      Rolling Id
                    </td>
                    <td className=" px-4 py-2 text-center dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                      Month/Year
                    </td>
                    <td className="px-6 py-2 text-center dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                      Opening Date
                    </td>
                    <td className="px-6 py-2 text-center dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                      Closing Date
                    </td>

                    <td className="px-6 py-2 text-center dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                      Closing Status
                    </td>
                  </tr>
                </thead>
                <tbody className="font-arial text- text-center">
                  {allTransactionData.map((item, index) => (
                    <tr
                      className="bg-white divide-y border  divide-gray-200 text-xs"
                      key={index}
                    >
                      <td className="border px-4 py-2">
                        <input
                          type="checkbox"
                          id="ownedCheckbox"
                          disabled={!item.checkboxEnabled || item.blocked}
                          className="mr-2"
                          checked={item.isEditable}
                          onChange={() =>
                            setAllTransactionData(
                              allTransactionData.map((el) => {
                                if (el.plan_id === item.plan_id) {
                                  return {
                                    ...el,
                                    isEditable: !item.isEditable,
                                    checkboxEnabled: true,
                                  };
                                } else
                                  return item.isEditable === false
                                    ? { ...el, checkboxEnabled: false }
                                    : { ...el, checkboxEnabled: true };
                              })
                            )
                          }
                        />
                      </td>
                      <td className="border px-4 py-2">{item.plan_id}</td>
                      <td className="border px-4 py-2">{item.tran_id}</td>

                      <td className="px-12 py-2 dark:border-2 whitespace-nowrap font-arial text-xs">
                        {moment(item.m_year).format("MMM YYYY")}
                      </td>

                      <td className="border px-4 py-2">
                        <DatePicker
                          className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                          dateFormat="dd/MM/yyyy"
                          peekNextMonth
                          showMonthDropdown
                          showYearDropdown
                          dropdownMode="select"
                          disabled={!item.isEditable}
                          selected={new Date(item.open_t_date)}
                          minDate={
                            new Date(moment(item.open_t_date).startOf("month"))
                          }
                          maxDate={new Date(item.subm_t_date)}
                          onChange={(date) =>
                            setAllTransactionData(
                              allTransactionData.map((el) => {
                                if (el.plan_id === item.plan_id) {
                                  return {
                                    ...el,
                                    open_t_date: date,
                                  };
                                } else return el;
                              })
                            )
                          }
                        />
                      </td>
                      <td className="border px-4 py-2">
                        <DatePicker
                          className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                          dateFormat="dd/MM/yyyy"
                          peekNextMonth
                          showMonthDropdown
                          showYearDropdown
                          dropdownMode="select"
                          disabled={!item.isEditable}
                          selected={new Date(item.subm_t_date)}
                          minDate={new Date(item.open_t_date)}
                          maxDate={
                            new Date(moment(item.subm_t_date).endOf("month"))
                          }
                          onChange={(date) =>
                            setAllTransactionData(
                              allTransactionData.map((el) => {
                                if (el.plan_id === item.plan_id) {
                                  return {
                                    ...el,
                                    subm_t_date: date,
                                  };
                                } else return el;
                              })
                            )
                          }
                        />
                      </td>
                      <td className="border px-4 py-2">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2"
                          htmlFor="userSelect"
                        >
                          <select
                            className="w-full px-3 py-2 border-b border-gray-500 rounded- bg-white focus:outline-none focus:border-b focus:border-indigo-500 mt-2"
                            id="userSelect"
                            placeholder="Closed Period"
                            value={item.clos_status}
                            disabled={!item.isEditable}
                            onChange={(e) =>
                              setAllTransactionData(
                                allTransactionData.map((el) => {
                                  if (el.plan_id === item.plan_id) {
                                    return {
                                      ...el,
                                      clos_status: e.target.value,
                                    };
                                  } else return el;
                                })
                              )
                            }
                          >
                            <option
                              value="Close Period"
                              className="focus:outline-none focus:border-b bg-white"
                              disabled={true}
                            >
                              Close Period
                            </option>
                            <option value="Open Period">Open Period</option>
                            <option value="Not Active">Not Active</option>
                          </select>
                        </label>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {router.query.type !== "View" && (
              <span className="button flex items-center gap-3 mt-6">
                <button
                  className="bg-green-700 px-4 py-1 text-white"
                  onClick={() => handleSavePlan()}
                  disabled={buttonLoading === true}
                >
                  Save
                </button>
                <button
                  className="bg-yellow-500 px-4 py-1 text-white"
                  onClick={() => {
                    router.push("/table/table_collectiontransaction_open");
                  }}
                >
                  Close
                </button>
              </span>
            )}
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default CollectionTrasactionPeriod;
