import React, { useState, useEffect, Fragment } from "react";
import { TbFileDownload } from "react-icons/tb";
import { url } from "@/constants/url";
import axios from "axios";
import { useRouter } from "next/router";
import { Dialog, Transition } from "@headlessui/react";
import * as XLSX from "xlsx";
import SubmitModal from "../modals/SubmitModal";
import toast, { Toaster } from "react-hot-toast";
const RPTable = (props) => {
  const [isOpen, setisOpen] = useState(false);
  const [apiMessage, setApiMessage] = useState("");
  const [formActive, setFormActive] = useState(false);
  const submitHandle = (status) => {
    updateRollingPlanStatus(status);
    setisOpen(true);
  };
  const updateRollingPlanStatus = async (status) => {
    let paramsData;
    const receivedObject = router.query.filterState
      ? JSON.parse(decodeURIComponent(router.query.filterState))
      : {};
    if (
      JSON.parse(window.localStorage.getItem("userinfo")).role_id === 6 ||
      receivedObject.tId
    ) {
      paramsData = {
        t_year: router.query.yr,
        m_year: router.query.mYr,
        plan_id: router.query.planId,
        tran_id: router.query.tranId,
        t_id: Number(router.query.tId) ? Number(router.query.tId) : null,
        rp_status: status,
      };
    } else if (
      JSON.parse(window.localStorage.getItem("userinfo")).role_id === 5
    ) {
      paramsData = {
        t_year: router.query.yr,
        m_year: router.query.mYr,
        plan_id: router.query.planId,
        tran_id: router.query.tranId,
        r_id: Number(router.query.rId),
        rp_status: status,
      };
    } else if (
      JSON.parse(window.localStorage.getItem("userinfo")).role_id === 4 &&
      router.query.formType === "Review"
    ) {
      paramsData = {
        t_year: router.query.yr,
        m_year: router.query.mYr,
        plan_id: router.query.planId,
        tran_id: router.query.tranId,
        r_id: Number(router.query.rId),
        rp_status: status,
      };
    } else if (
      JSON.parse(window.localStorage.getItem("userinfo")).role_id === 4
    ) {
      paramsData = {
        t_year: router.query.yr,
        m_year: router.query.mYr,
        plan_id: router.query.planId,
        tran_id: router.query.tranId,
        z_id: Number(router.query.zId),
        rp_status: status,
      };
    } else if (
      JSON.parse(window.localStorage.getItem("userinfo")).role_id === 3 &&
      router.query.formType === "Review"
    ) {
      paramsData = {
        t_year: router.query.yr,
        m_year: router.query.mYr,
        plan_id: router.query.planId,
        tran_id: router.query.tranId,
        z_id: Number(router.query.zId),
        rp_status: status,
      };
    } else if (
      JSON.parse(window.localStorage.getItem("userinfo")).role_id === 10 &&
      router.query.formType === "Edit"
    ) {
      paramsData = {
        t_year: router.query.yr,
        m_year: router.query.mYr,
        plan_id: router.query.planId,
        tran_id: router.query.tranId,
        bg_id: Number(router.query.bgId),
        rp_status: status,
      };
    } else if (
      JSON.parse(window.localStorage.getItem("userinfo")).role_id === 3 &&
      router.query.formType === "Edit"
    ) {
      paramsData = {
        t_year: router.query.yr,
        m_year: router.query.mYr,
        plan_id: router.query.planId,
        tran_id: router.query.tranId,
        bu_id: Number(router.query.buId),
        rp_status: status,
      };
    } else if (
      JSON.parse(window.localStorage.getItem("userinfo")).role_id === 10 &&
      router.query.formType === "Review"
    ) {
      paramsData = {
        t_year: router.query.yr,
        m_year: router.query.mYr,
        plan_id: router.query.planId,
        tran_id: router.query.tranId,
        bu_id: Number(router.query.buId),
        rp_status: status,
      };
    } else if (
      JSON.parse(window.localStorage.getItem("userinfo")).role_id === 4
    ) {
      paramsData = {
        t_year: router.query.yr,
        m_year: router.query.mYr,
        plan_id: router.query.planId,
        tran_id: router.query.tranId,
        t_id: Number(router.query.tId) ? Number(router.query.tId) : null,
        r_id: Number(router.query.rId),
        rp_status: status,
      };
    } else if (
      JSON.parse(window.localStorage.getItem("userinfo")).role_id === 3
    ) {
      paramsData = {
        t_year: router.query.yr,
        m_year: router.query.mYr,
        plan_id: router.query.planId,
        tran_id: router.query.tranId,
        t_id: Number(router.query.tId) ? Number(router.query.tId) : null,
        r_id: Number(router.query.rId),
        rp_status: status,
      };
    } else {
      return;
    }
    try {
      const respond = await axios
        .get(`${url}/api/cp_update_status`, {
          headers: headers,
          params: paramsData,
        })
        .then((res) => {
          if (!res && status != "Region Review Done") return;
          console.log("jio", res);
          setisOpen(true);
          setApiMessage(res.data.message);
        });
      const apires = await respond.data.data;
      console.log("jio", apires);
    } catch (error) {
      console.log(error);
    }
  };

  const router = useRouter();
  const headers = {
    "Content-Type": "application/json",
    secret: "fsdhfgsfuiweifiowefjewcewcebjw",
  };

  let header;
  useEffect(() => {
    if (Array.isArray(props.tableData[0])) {
      header = props.tableData[0]?.map((item) => item.trim());
      props.setHeaderData(props.tableData[0]?.map((item) => item.trim()));

      setResult(
        props.tableData.slice(1).map((row) => {
          const obj = {};
          header.forEach((header, index) => {
            obj[header] = row[index];
          });
          return obj;
        }) || []
      );
    } else {
      setResult(props.tableData.map || []);
    }
  }, [props.tableData]);

  const [result, setResult] = useState([]);

  const [totalSumObject, setTotalSumObject] = useState({});
  useEffect(() => {
    if (!result.length) return;
    function sumNumericValues(data) {
      const sumObject = {};

      data.forEach((item) => {
        Object.keys(item).forEach((key) => {
          if (typeof item[key] === "number") {
            sumObject[key] = (sumObject[key] || 0) + item[key];
          } else {
            sumObject[key] = 0;
          }
        });
      });

      return sumObject;
    }
    const totalResult = sumNumericValues(result);
    setTotalSumObject(totalResult);
  }, [result]);

  const [sumValues, setSumValues] = useState({
    "Dec 23-24 Revised Fcst Qty": 0,
    "Dec 23-24 Urgent Qty": 0,
    "Jan 23-24 Fcst Qty": 0,
    "Expected Return Qty": 0,
  });

  const calculateSum = (data) => {
    const sum = data.reduce(
      (acc, entry) => {
        acc["Dec 23-24 Revised Fcst Qty"] +=
          Number(entry["Dec 23-24 Revised Fcst Qty"]) || 0;
        acc["Dec 23-24 Urgent Qty"] +=
          Number(entry["Dec 23-24 Urgent Qty"]) || 0;
        acc["Jan 23-24 Fcst Qty"] += Number(entry["Jan 23-24 Fcst Qty"]) || 0;
        acc["Expected Return Qty"] += Number(entry["Expected Return Qty"]) || 0;
        return acc;
      },
      {
        "Dec 23-24 Revised Fcst Qty": 0,
        "Dec 23-24 Urgent Qty": 0,
        "Jan 23-24 Fcst Qty": 0,
        "Expected Return Qty": 0,
      }
    );

    setSumValues(sum);
  };

  useEffect(() => {
    if (!result.length) return;
    calculateSum(result);
  }, [result]);
  const handledownloadExcel = (data) => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, `RSP.xlsx`);
  };
  const [recievedObject, setRecievedObject] = useState({});
  useEffect(() => {
    if (!router.query.filterState) return;
    setRecievedObject(JSON.parse(decodeURIComponent(router.query.filterState)));
  }, [router]);

  const handleColourBlock = (fcst, revised) => {
    const colorNum = (revised / fcst) * 100 - 100;
    const positiveColorNum = Math.abs(colorNum);

    let color;
    switch (true) {
      case positiveColorNum < 10:
        color = "bg-white";
        break;

      case positiveColorNum >= 10 && positiveColorNum <= 19:
        color = "bg-green-500";
        break;

      case positiveColorNum >= 20 && positiveColorNum <= 49:
        color = "bg-yellow-500";
        break;

      case positiveColorNum >= 50:
        color = "bg-red-500";
        break;

      default:
        color = "bg-white";
    }

    return color;
  };

  const handleSaveRsp = async (status) => {
    if (
      totalSumObject[Object.keys(totalSumObject)[13]] +
        totalSumObject[Object.keys(totalSumObject)[14]] +
        totalSumObject[Object.keys(totalSumObject)[15]] +
        totalSumObject[Object.keys(totalSumObject)[16]] +
        totalSumObject[Object.keys(totalSumObject)[17]] ===
      0
    ) {
      toast.error("Total Collection value can not be 0");
      return;
    }
    try {
      let endPoint;

      const receivedObject = JSON.parse(
        decodeURIComponent(router.query.filterState)
      );

      if (
        JSON.parse(window.localStorage.getItem("userinfo")).role_id === 6 ||
        receivedObject.tId
      ) {
        endPoint = `api/add_cp_entry?tm=${true}`;
      } else if (
        JSON.parse(window.localStorage.getItem("userinfo")).role_id === 5
      ) {
        endPoint = `api/add_cp_entry?rm=${true}`;
      } else if (
        JSON.parse(window.localStorage.getItem("userinfo")).role_id === 4
      ) {
        endPoint = `api/add_cp_entry?zm=${true}`;
      } else if (
        JSON.parse(window.localStorage.getItem("userinfo")).role_id === 3
      ) {
        endPoint = `api/add_cp_entry?bum=${true}`;
      } else if (
        JSON.parse(window.localStorage.getItem("userinfo")).role_id === 10
      ) {
        endPoint = `api/add_cp_entry?bgm=${true}`;
      } else {
        return;
      }
      const data = result?.map((item) => {
        return {
          t_year: router.query.yr,
          m_year: router.query.mYr,
          plan_id: Number(router.query.planId),
          tran_id: router.query.tranId,
          kunnr: Number(item[Object.keys(item)[1]]) || 0,
          w1_value: Number(item[Object.keys(item)[13]]) || 0,
          w2_value: Number(item[Object.keys(item)[14]]) || 0,
          w3_value: Number(item[Object.keys(item)[15]]) || 0,
          w4_value: Number(item[Object.keys(item)[16]]) || 0,
          w5_value: Number(item[Object.keys(item)[17]]) || 0,
          total_value:
            Number(item[Object.keys(item)[13]]) +
            Number(item[Object.keys(item)[14]]) +
            Number(item[Object.keys(item)[15]]) +
            Number(item[Object.keys(item)[16]]) +
            Number(item[Object.keys(item)[17]]),

          w_id: Number(router.query.wId),
          t_id: Number(router.query.tId),
          r_id: Number(router.query.rId),
          z_id: Number(router.query.zId),
          bu_id: Number(router.query.buId),
          bg_id: Number(router.query.bgId),
          c_id: Number(router.query.cId),
          subm_t_date: new Date(),
          cp_status: status,
          c_name: JSON.parse(window.localStorage.getItem("userinfo")).c_name,
          ul_name: JSON.parse(window.localStorage.getItem("userinfo")).ul_name,
          user_id: JSON.parse(window.localStorage.getItem("userinfo")).user_id,
        };
      });
      setButtonLoadingState(true);
      console.log("new", data);
      const respond = await axios
        .post(`${url}/${endPoint}`, JSON.stringify({ data: data }), {
          headers: headers,
        })
        .then((res) => {
          if (!res) return;
          setApiMessage(res.data.message);
          submitHandle(status);
          setButtonLoadingState(false);
        });
    } catch (errors) {
      const errorMessage = errors?.response?.data?.message;
      console.log("koi", errors);
      if (!errorMessage) return;
      setisOpen(true);
      setApiMessage(errorMessage);
      setButtonLoadingState(false);
    }
  };
  const receivedObject = router.query.filterState
    ? JSON.parse(decodeURIComponent(router.query.filterState))
    : {};
  const handleEditRsp = async (status) => {
    if (
      totalSumObject[Object.keys(totalSumObject)[13]] +
        totalSumObject[Object.keys(totalSumObject)[14]] +
        totalSumObject[Object.keys(totalSumObject)[15]] +
        totalSumObject[Object.keys(totalSumObject)[16]] +
        totalSumObject[Object.keys(totalSumObject)[17]] ===
      0
    ) {
      toast.error("Total Collection value can not be 0");
      return;
    }
    try {
      let endPoint;
      const receivedObject = router.query.filterState
        ? JSON.parse(decodeURIComponent(router.query.filterState))
        : {};
      if (
        JSON.parse(window.localStorage.getItem("userinfo")).role_id === 6 ||
        receivedObject.tId
      ) {
        endPoint = `api/update_cp?tm=${true}`;
      } else if (
        JSON.parse(window.localStorage.getItem("userinfo")).role_id === 5
      ) {
        endPoint = `api/update_cp?rm=${true}`;
      } else if (
        JSON.parse(window.localStorage.getItem("userinfo")).role_id === 4
      ) {
        endPoint = `api/update_cp?z=${true}`;
      } else if (
        JSON.parse(window.localStorage.getItem("userinfo")).role_id === 3
      ) {
        endPoint = `api/update_cp?bu=${true}`;
      } else if (
        JSON.parse(window.localStorage.getItem("userinfo")).role_id === 10
      ) {
        endPoint = `api/update_cp?bg=${true}`;
      } else {
        return;
      }
      const data = result?.map((item) => {
        return {
          t_year: router.query.yr,
          m_year: router.query.mYr,
          plan_id: Number(router.query.planId),
          tran_id: router.query.tranId,
          kunnr: Number(item[Object.keys(item)[1]]) || 0,
          w1_value: Number(item[Object.keys(item)[13]]) || 0,
          w2_value: Number(item[Object.keys(item)[14]]) || 0,
          w3_value: Number(item[Object.keys(item)[15]]) || 0,
          w4_value: Number(item[Object.keys(item)[16]]) || 0,
          w5_value: Number(item[Object.keys(item)[17]]) || 0,
          total_value:
            Number(item[Object.keys(item)[13]]) +
            Number(item[Object.keys(item)[14]]) +
            Number(item[Object.keys(item)[15]]) +
            Number(item[Object.keys(item)[16]]) +
            Number(item[Object.keys(item)[17]]),

          w_id: Number(router.query.wId),
          t_id: Number(router.query.tId),
          r_id: Number(router.query.rId),
          z_id: Number(router.query.zId),
          bu_id: Number(router.query.buId),
          bg_id: Number(router.query.bgId),
          c_id: Number(router.query.cId),
          subm_t_date: new Date(),
          cp_status: status,
          c_name: JSON.parse(window.localStorage.getItem("userinfo")).c_name,
          ul_name: JSON.parse(window.localStorage.getItem("userinfo")).ul_name,
          user_id: JSON.parse(window.localStorage.getItem("userinfo")).user_id,
        };
      });
      setButtonLoadingState(true);
      const respond = await axios
        .post(`${url}/${endPoint}`, JSON.stringify({ data: data }), {
          headers: headers,
        })
        .then((res) => {
          console.log("mkl", res);
          if (!res) return;
          setApiMessage(res.data.message);
          submitHandle(status);
          setButtonLoadingState(false);
        });
    } catch (errors) {
      const errorMessage = errors?.response?.data?.message;

      if (!errorMessage) return;
      setisOpen(true);
      setApiMessage(errorMessage);
      setButtonLoadingState(false);
    }
  };
  const [buttonLoadingState, setButtonLoadingState] = useState(false);

  const [oneTimeMessage, setOneTimeMessage] = useState(
    router.query.formType === "Add" ? true : false
  );
  return (
    <section className="mt-1 mb-24 outer relative flex flex-col items-center justify-center w-full font-arial">
      <Toaster position="bottom-center" reverseOrder={false} />
      {buttonLoadingState && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 ">
          <img
            className="w-20 h-20 animate-spin "
            src="https://www.svgrepo.com/show/448500/loading.svg"
            alt="Loading icon"
          />
        </div>
      )}
      <SubmitModal
        isOpen={isOpen}
        isCp={true}
        territoryId={receivedObject.tId}
        onClose={() => {
          setisOpen(false);
          setApiMessage("");
          router.push("/collectionplans");
        }}
        onOpen={() => setisOpen(true)}
        message={apiMessage}
      ></SubmitModal>
      <div className=" flex justify-center w-full my-">
        {/* <div className="bcbtn px-2">
          <button className="px-4 py-1 bg-white border-2 border-teal-400 rounded-md text-teal-400">Back</button>
        </div> */}
        <div className="headingtext">
          {/* <h2 className="text-lg text-teal-400 font-bold">Rolling Sales Plan - Apr 2023</h2> */}
        </div>
        {/* <div className="bcbtn px-2">
        <button className="px-4 py-1 bg-white border-2 border-teal-400 rounded-md text-teal-400">Next</button>
        </div> */}
      </div>

      {/* options  */}

      <div className="options flex items-center justify-between w-full px-2 py-">
        <div className="zrtdepoty flex items-center justify-between w-full">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-xs text-gray-700 font-bold">
              ZRT: {router.query.zrt?.map((item) => item).join(" ")}
            </h2>
          </div>
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-xs text-gray-700">Depot:</h2>
            <h2 className="font-bold text-xs text-gray-700">
              {router.query.depotType === "All"
                ? "All Depot"
                : router.query.depot}
            </h2>
          </div>
        </div>
        {/* <div className="categoryoptions flex items-center justify-center w-full">
          <div className="category flex items-center justify-center px-2">
            <h2 className="text-xs text-gray-700 font-bold">Segment</h2>
            <select
              className="w-full text-xs text-gray-700 px-3 py- border-b border-gray-500  bg-white focus:outline-none focus:border-b focus:border-indigo-500"
              id="stateSelect"
            >
              <option
                value=""
                className="focus:outline-none focus:border-b bg-white"
              >
                Option
              </option>
              <option value="Cat1">Cat1</option>
              <option value="Cat2">Cat2</option>
              <option value="Cat3">Cat3</option>
            </select>
          </div>
          <div className="category flex items-center justify-center px-2">
            <h2 className="text-xs text-gray-700 font-bold">Brand</h2>
            <select
              className="w-full px-3 text-xs text-gray-700 py- border-b border-gray-500  bg-white focus:outline-none focus:border-b focus:border-indigo-500"
              id="stateSelect"
            >
              <option
                value=""
                className="focus:outline-none focus:border-b bg-white"
              >
                Option
              </option>
              <option value="Prod">Prod 1</option>
              <option value="Prod">Prod 1</option>
              <option value="Prod">Prod 1</option>
            </select>
          </div>
        </div> */}

        <div className="status xls download flex items-center justify-end w-full gap-8">
          <div className="flex flex-row gap-2 ">
            {" "}
            <TbFileDownload
              className="text-green-600 cursor-pointer "
              size={18}
              onClick={() => handledownloadExcel(result)}
            ></TbFileDownload>
            <div className="text-xs whitespace-nowrap">Download XLS</div>
          </div>
          <div className="status flex">
            <h2 className="text-xs text-gray-700"> Stage :</h2>
            <h2 className="font-bold text-xs text-gray-700">
              {router.query.status}
            </h2>
          </div>
          <div className="status flex gap-1">
            <h2 className="text-xs text-gray-700"> Status :</h2>
            <h2 className="font-bold text-xs text-gray-700">
              {router.query.stage}
            </h2>
          </div>
        </div>
      </div>
      <br />
      {/* <div className="flex items-center justify-end w-full gap-4 ">
        {router.query.formType !== "View" && (
          <button
            onClick={() => {
              handleCopyFcst();
            }}
            className="text-center rounded-md bg-blue-500 text-white py-1 px-4 text-sm"
          >
            Copy FCST Qty
          </button>
        )}
      </div> */}
      {/* table layout */}
      <div className="table mb-4 w-full">
        {/* <h3>Table Layout</h3> */}
        <section className="bg-white p-2">
          {/* <div className="mx-auto max-w-screen-2xl px-4 lg:px-12"> */}
          <div className="mx-auto max-w-full px- ">
            {/* Start coding here */}
            <div className="bg-white dark:bg-gray-800 relative shadow-md  overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 text-center bg-gray-100  dark:text-gray-400">
                    <tr>
                      <th
                        scope="col"
                        className="px-2 py-1 text-blue-600 text-left "
                      >
                        {props.headerData[Object.keys(props.headerData)[1]]}
                      </th>
                      <th
                        scope="col"
                        className="px-2 py-1 text-blue-600 text-left border-l-2"
                      >
                        {props.headerData[Object.keys(props.headerData)[2]]}
                      </th>

                      <th
                        scope="col"
                        className="px-2 py-1 text-blue-600 text-left border-l-2"
                      >
                        {props.headerData[Object.keys(props.headerData)[3]]}
                      </th>
                      <th
                        scope="col"
                        className="px-2 py-1 text-blue-600 text-right border-l-2"
                      >
                        {props.headerData[Object.keys(props.headerData)[4]]}
                      </th>
                      <th
                        scope="col"
                        className="px-2 py-1    text-blue-600 text-right border-l-2"
                      >
                        {props.headerData[Object.keys(props.headerData)[5]]}
                      </th>
                      <th
                        scope="col"
                        className="px-2 py-1 text-blue-600 text-right border-l-2"
                      >
                        {props.headerData[Object.keys(props.headerData)[6]]}
                      </th>
                      <th
                        scope="col"
                        className="px-2 py-1 text-blue-600 text-right border-l-2"
                      >
                        {props.headerData[Object.keys(props.headerData)[7]]}
                      </th>
                      <th
                        scope="col"
                        className="px-2 py-1 text-blue-600 text-right border-l-2"
                      >
                        {props.headerData[Object.keys(props.headerData)[8]]}
                      </th>
                      <th
                        scope="col"
                        className="px-2 py-1 text-blue-600 text-right border-l-2"
                      >
                        {props.headerData[Object.keys(props.headerData)[9]]}
                      </th>
                      <th
                        scope="col"
                        className="px-2 py-1 text-blue-600 text-right border-l-2"
                      >
                        {props.headerData[Object.keys(props.headerData)[10]]}
                      </th>
                      <th
                        scope="col"
                        className="px-2 py-1 text-blue-600 text-right border-l-2"
                      >
                        {props.headerData[Object.keys(props.headerData)[11]]}
                      </th>
                      <th
                        scope="col"
                        className="px-2 py-1 text-blue-600 text-right border-l-2"
                      >
                        {props.headerData[Object.keys(props.headerData)[12]]}
                      </th>

                      <th
                        scope="col"
                        className="px-2 py-1  bg-[#BBF7D0]  text-blue-600 border-l-2 border-r-2 border-b-2 border-blue-200 "
                      >
                        {props.headerData[Object.keys(props.headerData)[13]]}
                      </th>
                      <th
                        scope="col"
                        className="px-2 py-1  bg-[#BBF7D0]  text-blue-600 border-l-2 border-r-2 border-b-2 border-blue-200 "
                      >
                        {props.headerData[Object.keys(props.headerData)[14]]}
                      </th>
                      <th
                        scope="col"
                        className="px-2 py-1  bg-[#BBF7D0]  text-blue-600 border-l-2 border-r-2 border-b-2 border-blue-200 "
                      >
                        {props.headerData[Object.keys(props.headerData)[15]]}
                      </th>
                      <th
                        scope="col"
                        className="px-2 py-1  bg-[#BBF7D0]  text-blue-600 border-l-2 border-r-2 border-b-2 border-blue-200 "
                      >
                        {props.headerData[Object.keys(props.headerData)[16]]}
                      </th>
                      <th
                        scope="col"
                        className="px-2 py-1  bg-[#BBF7D0]  text-blue-600 border-l-2 border-r-2 border-b-2 border-blue-200 "
                      >
                        {props.headerData[Object.keys(props.headerData)[17]]}
                      </th>
                      <th
                        scope="col"
                        className="px-2 py-1  bg-[#BBF7D0]  text-blue-600 border-l-2 border-r-2 border-b-2 border-blue-200 "
                      >
                        {props.headerData[Object.keys(props.headerData)[18]]}
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {result?.map((item) => {
                      return (
                        <tr
                          className={`border-b dark:border-gray-700  text-gray-600 text-xs ${
                            item[Object.keys(item)[4]] > 0
                              ? "bg-white"
                              : "bg-yellow-200"
                          }`}
                        >
                          <th
                            scope="row"
                            className="px-4  py-1 font-medium whitespace-nowrap"
                          >
                            {item[Object.keys(item)[1]]}
                          </th>
                          <td className="px-4 py-1 text-left  whitespace-nowrap border-l-2">
                            {item[Object.keys(item)[2]]}
                          </td>

                          <th
                            scope="row"
                            className="px-4  py-1 text-left  font-medium whitespace-nowrap border-l-2"
                          >
                            {item[Object.keys(item)[3]]}
                          </th>
                          <td className="px-4 py-1 text-right border-l-2">
                            {item[Object.keys(item)[4]]?.toFixed(2)}
                          </td>
                          <td className="px-4 py-1 text-right border-l-2">
                            {item[Object.keys(item)[5]]?.toFixed(2)}
                          </td>

                          <td className="px-4 py-1 text-right border-l-2">
                            {item[Object.keys(item)[6]]?.toFixed(2)}
                          </td>
                          <td className="px-4 py-1 text-right border-l-2">
                            {item[Object.keys(item)[7]]?.toFixed(2)}
                          </td>
                          <td className="px-4 py-1 text-right border-l-2">
                            {item[Object.keys(item)[8]]?.toFixed(2)}
                          </td>
                          <td className="px-4 py-1 text-right border-l-2">
                            {item[Object.keys(item)[9]]?.toFixed(2)}
                          </td>
                          <td className="px-4 py-1 text-right border-l-2">
                            {item[Object.keys(item)[10]]?.toFixed(2)}
                          </td>
                          <td className="px-4 py-1 text-right border-l-2">
                            {item[Object.keys(item)[11]]?.toFixed(2)}
                          </td>
                          <td className="px-4 py-1 text-right border-l-2">
                            {item[Object.keys(item)[12]]?.toFixed(2)}
                          </td>
                          <td
                            className={`px-2 py-1   text-blue-600 border-l-2 border-r-2 border-b-2 border-blue-200 text-right text-right ${
                              item[Object.keys(item)[4]] > 0
                                ? "bg-[#BBF7D0]"
                                : "bg-yellow-200"
                            }`}
                          >
                            <input
                              type="number"
                              value={item[Object.keys(item)[13]]}
                              className="px-auto outline-none border-b-2 w-16"
                              onChange={(e) =>
                                setResult(
                                  result?.map((el) =>
                                    item[`${Object.keys(item)[0]}`] ===
                                    el[`${Object.keys(el)[0]}`]
                                      ? {
                                          ...el,
                                          [Object.keys(item)[13]]: e.target
                                            .value
                                            ? Number(e.target.value)
                                            : "",
                                        }
                                      : el
                                  )
                                )
                              }
                            />
                          </td>
                          <td
                            className={`px-2 py-1   text-blue-600 border-l-2 border-r-2 border-b-2 border-blue-200 text-right text-right ${
                              item[Object.keys(item)[4]] > 0
                                ? "bg-[#BBF7D0]"
                                : "bg-yellow-200"
                            }`}
                          >
                            <input
                              type="number"
                              value={item[Object.keys(item)[14]]}
                              className="px-auto outline-none border-b-2 w-16"
                              onChange={(e) =>
                                setResult(
                                  result?.map((el) =>
                                    item[`${Object.keys(item)[0]}`] ===
                                    el[`${Object.keys(el)[0]}`]
                                      ? {
                                          ...el,
                                          [Object.keys(item)[14]]: e.target
                                            .value
                                            ? Number(e.target.value)
                                            : "",
                                        }
                                      : el
                                  )
                                )
                              }
                            />
                          </td>
                          <td
                            className={`px-2 py-1   text-blue-600 border-l-2 border-r-2 border-b-2 border-blue-200 text-right text-right ${
                              item[Object.keys(item)[4]] > 0
                                ? "bg-[#BBF7D0]"
                                : "bg-yellow-200"
                            }`}
                          >
                            <input
                              type="number"
                              value={item[Object.keys(item)[15]]}
                              className="px-auto outline-none border-b-2 w-16"
                              onChange={(e) =>
                                setResult(
                                  result?.map((el) =>
                                    item[`${Object.keys(item)[0]}`] ===
                                    el[`${Object.keys(el)[0]}`]
                                      ? {
                                          ...el,
                                          [Object.keys(item)[15]]: e.target
                                            .value
                                            ? Number(e.target.value)
                                            : "",
                                        }
                                      : el
                                  )
                                )
                              }
                            />
                          </td>
                          <td
                            className={`px-2 py-1   text-blue-600 border-l-2 border-r-2 border-b-2 border-blue-200 text-right text-right ${
                              item[Object.keys(item)[4]] > 0
                                ? "bg-[#BBF7D0]"
                                : "bg-yellow-200"
                            }`}
                          >
                            <input
                              type="number"
                              value={item[Object.keys(item)[16]]}
                              className="px-auto outline-none border-b-2 w-16"
                              onChange={(e) =>
                                setResult(
                                  result?.map((el) =>
                                    item[`${Object.keys(item)[0]}`] ===
                                    el[`${Object.keys(el)[0]}`]
                                      ? {
                                          ...el,
                                          [Object.keys(item)[16]]: e.target
                                            .value
                                            ? Number(e.target.value)
                                            : "",
                                        }
                                      : el
                                  )
                                )
                              }
                            />
                          </td>
                          <td
                            className={`px-2 py-1   text-blue-600 border-l-2 border-r-2 border-b-2 border-blue-200 text-right text-right ${
                              item[Object.keys(item)[4]] > 0
                                ? "bg-[#BBF7D0]"
                                : "bg-yellow-200"
                            }`}
                          >
                            <input
                              type="number"
                              value={item[Object.keys(item)[17]]}
                              className="px-auto outline-none border-b-2 w-16"
                              onChange={(e) =>
                                setResult(
                                  result?.map((el) =>
                                    item[`${Object.keys(item)[0]}`] ===
                                    el[`${Object.keys(el)[0]}`]
                                      ? {
                                          ...el,
                                          [Object.keys(item)[17]]: e.target
                                            .value
                                            ? Number(e.target.value)
                                            : "",
                                        }
                                      : el
                                  )
                                )
                              }
                            />
                          </td>
                          <td
                            className={`px-2 py-1   text-blue-600 border-l-2 border-r-2 border-b-2 border-blue-200 text-right text-right ${
                              item[Object.keys(item)[4]] > 0
                                ? "bg-[#BBF7D0]"
                                : "bg-yellow-200"
                            }`}
                          >
                            {item[Object.keys(item)[13]] +
                              item[Object.keys(item)[14]] +
                              item[Object.keys(item)[15]] +
                              item[Object.keys(item)[16]] +
                              item[Object.keys(item)[17]]}
                          </td>
                        </tr>
                      );
                    })}

                    <tr className="border-b dark:border-gray-700 bg-gray-100 text-gray-600 text-xs font-bold">
                      <td className="px-4 py-1 text-left  whitespace-nowrap">
                        Total
                      </td>
                      <td className="px-4 py-1 text-left  whitespace-nowrap">
                        -
                      </td>

                      <th
                        scope="row"
                        className="px-4  py-1 font-medium whitespace-nowrap  "
                      >
                        -
                      </th>

                      <td className="px-2 py-1     text-right ">
                        {totalSumObject[
                          Object.keys(totalSumObject)[4]
                        ]?.toFixed(2)}
                      </td>
                      <td className="px-4 py-1 text-right">
                        {totalSumObject[
                          Object.keys(totalSumObject)[5]
                        ]?.toFixed(2)}
                      </td>
                      <td className="px-4 py-1 text-right">
                        {totalSumObject[
                          Object.keys(totalSumObject)[6]
                        ]?.toFixed(2)}
                      </td>
                      <td className="px-4 py-1 text-right">
                        {totalSumObject[
                          Object.keys(totalSumObject)[7]
                        ]?.toFixed(2)}
                      </td>
                      <td className="px-4 py-1 text-right">
                        {totalSumObject[
                          Object.keys(totalSumObject)[8]
                        ]?.toFixed(2)}
                      </td>
                      <td className="px-4 py-1 text-right">
                        {totalSumObject[
                          Object.keys(totalSumObject)[9]
                        ]?.toFixed(2)}
                      </td>
                      <td className="px-4 py-1 text-right">
                        {totalSumObject[
                          Object.keys(totalSumObject)[10]
                        ]?.toFixed(2)}
                      </td>

                      <td className="px-4 py-1 text-right">
                        {totalSumObject[
                          Object.keys(totalSumObject)[11]
                        ]?.toFixed(2)}
                      </td>

                      <td className="px-4 py-1 text-right">
                        {totalSumObject[
                          Object.keys(totalSumObject)[12]
                        ]?.toFixed(2)}
                      </td>
                      <td className="px-4 py-1 text-right">
                        {totalSumObject[
                          Object.keys(totalSumObject)[13]
                        ]?.toFixed(2)}
                      </td>
                      <td className="px-4 py-1 text-right">
                        {totalSumObject[
                          Object.keys(totalSumObject)[14]
                        ]?.toFixed(2)}
                      </td>
                      <td className="px-4 py-1 text-right">
                        {totalSumObject[
                          Object.keys(totalSumObject)[15]
                        ]?.toFixed(2)}
                      </td>
                      <td className="px-4 py-1 text-right">
                        {totalSumObject[
                          Object.keys(totalSumObject)[16]
                        ]?.toFixed(2)}
                      </td>

                      <td className="px-4 py-1 text-right">
                        {totalSumObject[
                          Object.keys(totalSumObject)[17]
                        ]?.toFixed(2)}
                      </td>
                      <td className="px-4 py-1 text-right">
                        {(
                          totalSumObject[Object.keys(totalSumObject)[13]] +
                          totalSumObject[Object.keys(totalSumObject)[14]] +
                          totalSumObject[Object.keys(totalSumObject)[15]] +
                          totalSumObject[Object.keys(totalSumObject)[16]] +
                          totalSumObject[Object.keys(totalSumObject)[17]]
                        )?.toFixed(2)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className="my-2 flex self-end ">
        <div className="flex items-center justify-end w-full gap-4 ">
          <button
            onClick={() => {
              router.push("/collectionplans");
            }}
            className="text-center rounded-md bg-blue-500 text-white py-1 px-4 text-sm"
          >
            Back to Collection Page
          </button>
          {router.query.formType === "Add" && (
            <button
              onClick={() => props.formType("Upload")}
              className={`text-center w-[8.5em] rounded-md hover:bg-green-500 ${
                formActive ? "bg-green-400" : "bg-gray-400"
              }  text-white py-1 px-4 text-sm`}
            >
              Prev
            </button>
          )}
        </div>
        {router.query.formType === "Add" && (
          <button
            onClick={() => {
              router.query.formType === "Add"
                ? handleSaveRsp("Draft Submit")
                : handleEditRsp("Draft Submit");
            }}
            className={`text-center whitespace-nowrap rounded-md hover:bg-green-500 mx-2 ${
              formActive ? "bg-green-400" : "bg-blue-500"
            }  text-white py-1 px-4 text-sm`}
          >
            Save as Draft
          </button>
        )}
        {(router.query.formType === "Add" ||
          router.query.formType === "Edit") &&
          (JSON.parse(window.localStorage.getItem("userinfo")).role_id === 5 ||
            JSON.parse(window.localStorage.getItem("userinfo")).role_id ===
              6) && (
            <button
              className="text-center whitespace-nowrap rounded-md bg-orange-500 text-white py-1 px-4 text-sm mx-2"
              onClick={() => {
                router.query.formType === "Add"
                  ? handleSaveRsp("Final Submitted")
                  : handleEditRsp("Final Submitted");
              }}
            >
              Final Submit
            </button>
          )}
      </div>

      {JSON.parse(window.localStorage.getItem("userinfo")).role_id === 4 &&
        router.query.formType === "Edit" && (
          <button
            className="text-center rounded-md bg-orange-500 text-white py-1 px-4 text-sm"
            onClick={() => {
              handleEditRsp("Zone Approved");
            }}
          >
            Approve
          </button>
        )}
      {JSON.parse(window.localStorage.getItem("userinfo")).role_id === 10 &&
        router.query.formType === "Edit" && (
          <button
            className="text-center rounded-md bg-orange-500 text-white py-1 px-4 text-sm"
            onClick={() => {
              handleEditRsp("B.S Approved");
            }}
          >
            Approve
          </button>
        )}
      {JSON.parse(window.localStorage.getItem("userinfo")).role_id === 3 &&
        router.query.formType === "Edit" && (
          <button
            className="text-center rounded-md bg-orange-500 text-white py-1 px-4 text-sm"
            onClick={() => {
              handleEditRsp("B.U Approved");
            }}
          >
            Approve
          </button>
        )}

      {router.query.formType === "Review" &&
        JSON.parse(window.localStorage.getItem("userinfo")).role_id === 3 && (
          <button
            className="text-center rounded-md bg-green-500 text-white py-1 px-4 text-sm"
            onClick={() => {
              updateRollingPlanStatus("B.U Review Done");
            }}
          >
            Final Review
          </button>
        )}
      {router.query.formType === "Review" &&
        JSON.parse(window.localStorage.getItem("userinfo")).role_id === 4 && (
          <button
            className="text-center rounded-md bg-green-500 text-white py-1 px-4 text-sm"
            onClick={() => {
              updateRollingPlanStatus("Region Review Done");
            }}
          >
            Final Review
          </button>
        )}
      {router.query.formType === "Review" &&
        JSON.parse(window.localStorage.getItem("userinfo")).role_id === 3 && (
          <button
            className="text-center rounded-md bg-red-500 text-white py-1 px-4 text-sm"
            onClick={() => {
              // submitHandle("Region Review Done");
            }}
          >
            Reject as Draft
          </button>
        )}

      {router.query.formType === "Review" &&
        JSON.parse(window.localStorage.getItem("userinfo")).role_id === 10 && (
          <button
            className="text-center rounded-md bg-green-500 text-white py-1 px-4 text-sm"
            onClick={() => {
              updateRollingPlanStatus("B.S Review Done");
            }}
          >
            Final Review
          </button>
        )}
      {router.query.formType === "Review" &&
        JSON.parse(window.localStorage.getItem("userinfo")).role_id === 10 && (
          <button
            className="text-center rounded-md bg-red-500 text-white py-1 px-4 text-sm"
            onClick={() => {
              // submitHandle("Region Review Done");
            }}
          >
            Reject as Draft
          </button>
        )}

      <Transition appear show={oneTimeMessage} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setOneTimeMessage(false)}
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
                    Collection Plan
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-center text-gray-500">
                      Please Input Week 1 to Week 5 All figure in Lacs
                    </p>
                  </div>

                  <div className="mt-4 flex items-center justify-center">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => setOneTimeMessage(false)}
                    >
                      Close
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </section>
  );
};

export default RPTable;
