import React, { useState, useEffect } from "react";
import { TbFileDownload } from "react-icons/tb";
import SubmitModal from "../modals/SubmitModal";
import { url } from "@/constants/url";
import axios from "axios";
import { useRouter } from "next/router";
const RPSummary = (props) => {
  const router = useRouter();

  const headers = {
    "Content-Type": "application/json",
    secret: "fsdhfgsfuiweifiowefjewcewcebjw",
  };

  const [formActive, setFormActive] = useState(false);

  //modal state
  const [isOpen, setisOpen] = useState(false);
  const [apiMessage, setApiMessage] = useState("");
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
    } else if (
      JSON.parse(window.localStorage.getItem("userinfo")).role_id === 10
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
        .get(`${url}/api/rsp_update_status`, {
          headers: headers,
          params: paramsData,
        })
        .then((res) => {
          if (!res && status != "Review Done") return;
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

  // Initialize an object to store the sums based on Brand Code

  const handleSaveRsp = async (status) => {
    try {
      let endPoint;

      const receivedObject = JSON.parse(
        decodeURIComponent(router.query.filterState)
      );

      if (
        JSON.parse(window.localStorage.getItem("userinfo")).role_id === 6 ||
        receivedObject.tId
      ) {
        endPoint = `api/add_rolling_tm?tm=${true}`;
      } else if (
        JSON.parse(window.localStorage.getItem("userinfo")).role_id === 5
      ) {
        endPoint = `api/add_rolling_tm?rm=${true}`;
      } else if (
        JSON.parse(window.localStorage.getItem("userinfo")).role_id === 4
      ) {
        endPoint = `api/add_rolling_tm?zm=${true}`;
      } else if (
        JSON.parse(window.localStorage.getItem("userinfo")).role_id === 3
      ) {
        endPoint = `api/add_rolling_tm?bum=${true}`;
      } else if (
        JSON.parse(window.localStorage.getItem("userinfo")).role_id === 10
      ) {
        endPoint = `api/add_rolling_tm?bgm=${true}`;
      } else {
        return;
      }
      const data = props.tableData.map((item) => {
        return {
          t_year: router.query.yr,
          m_year: router.query.mYr,
          plan_id: router.query.planId,
          tran_id: router.query.tranId,
          matnr: Number(item[Object.keys(item)[4]]),
          rp_qty: Number(item[Object.keys(item)[17]]),
          rp_value: Number(item[Object.keys(item)[18]]),
          rp_qty_revised: Number(item[Object.keys(item)[19]]),
          rp_val_revised: Number(item[Object.keys(item)[20]]),
          rp_qty_Urgent: Number(item[Object.keys(item)[21]]),
          nx_rp_qty: Number(item[Object.keys(item)[25]]),
          nx_rp_val: Number(item[Object.keys(item)[26]]),
          ret_qty: Number(item[Object.keys(item)[27]]),
          w_id: Number(router.query.wId),
          t_id: Number(router.query.tId),
          r_id: Number(router.query.rId),
          z_id: Number(router.query.zId),
          bu_id: Number(router.query.buId),
          bg_id: Number(router.query.bgId),
          c_id: Number(router.query.cId),
          subm_t_date: new Date(),
          rp_status: status,
          c_name: JSON.parse(window.localStorage.getItem("userinfo")).c_name,
          ul_name: JSON.parse(window.localStorage.getItem("userinfo")).ul_name,
          user_id: JSON.parse(window.localStorage.getItem("userinfo")).user_id,
        };
      });
      const respond = await axios
        .post(`${url}/${endPoint}`, JSON.stringify({ data: data }), {
          headers: headers,
        })
        .then((res) => {
          if (!res) return;
          setApiMessage(res.data.message);
          submitHandle(status);
        });
    } catch (errors) {
      const errorMessage = errors?.response?.data?.error;

      setApiMessage(errorMessage);
    }
  };

  console.log("kio", props.tableData);

  const handleEditRsp = async (status) => {
    try {
      let endPoint;
      const receivedObject = router.query.filterState
        ? JSON.parse(decodeURIComponent(router.query.filterState))
        : {};
      if (
        JSON.parse(window.localStorage.getItem("userinfo")).role_id === 6 ||
        receivedObject.tId
      ) {
        endPoint = `api/update_rolling_tm?tm=${true}`;
      } else if (
        JSON.parse(window.localStorage.getItem("userinfo")).role_id === 5
      ) {
        endPoint = `api/update_rolling_tm?rm=${true}`;
      } else if (
        JSON.parse(window.localStorage.getItem("userinfo")).role_id === 4
      ) {
        endPoint = `api/update_rolling_tm?tm=${true}`;
      } else if (
        JSON.parse(window.localStorage.getItem("userinfo")).role_id === 3
      ) {
        endPoint = `api/update_rolling_tm?tm=${true}`;
      } else if (
        JSON.parse(window.localStorage.getItem("userinfo")).role_id === 10
      ) {
        endPoint = `api/update_rolling_tm?tm=${true}`;
      } else {
        return;
      }
      const data = props.tableData.map((item) => {
        return {
          t_year: router.query.yr,
          m_year: router.query.mYr,
          plan_id: router.query.planId,
          tran_id: router.query.tranId,
          matnr: Number(item[Object.keys(item)[4]]),
          rp_qty: Number(item[Object.keys(item)[17]]),
          rp_value: Number(item[Object.keys(item)[18]]),
          rp_qty_revised: Number(item[Object.keys(item)[19]]),
          rp_val_revised: Number(item[Object.keys(item)[20]]),
          rp_qty_Urgent: Number(item[Object.keys(item)[21]]),
          nx_rp_qty: Number(item[Object.keys(item)[25]]),
          nx_rp_val: Number(item[Object.keys(item)[26]]),
          ret_qty: Number(item[Object.keys(item)[27]]),
          w_id: Number(router.query.wId),
          t_id: Number(router.query.tId),
          r_id: Number(router.query.rId),
          z_id: Number(router.query.zId),
          bu_id: Number(router.query.buId),
          bg_id: Number(router.query.bgId),
          c_id: Number(router.query.cId),
          subm_t_date: new Date(),
          rp_status: status,
          c_name: JSON.parse(window.localStorage.getItem("userinfo")).c_name,
          ul_name: JSON.parse(window.localStorage.getItem("userinfo")).ul_name,
          user_id: JSON.parse(window.localStorage.getItem("userinfo")).user_id,
        };
      });
      const respond = await axios
        .post(`${url}/${endPoint}`, JSON.stringify({ data: data }), {
          headers: headers,
        })
        .then((res) => {
          console.log("mkl", res);
          if (!res) return;
          setApiMessage(res.data.message);
          submitHandle(status);
        });
    } catch (errors) {
      const errorMessage = errors?.response?.data?.error;
      setApiMessage(errorMessage);
    }
  };

  const handleSaveDraft = async () => {
    try {
      const respond = await axios.get(`${url}/api/rsp_update_status`, {
        headers: headers,
        params: {
          t_year: filterState.yr,
          m_year: rejectModalData.mYr,
          plan_id: rejectModalData.planId,
          tran_id: rejectModalData.tranId,
          r_id: Number(router.query.rId),
          rp_status: "Draft Submit",
          remarks: rejectModalData.data,
        },
      });
      const apires = await respond.data.data;
      console.log("bnm", apires);
      handleDraftClose();
      setSuccessMsg(respond.data.message);
      setSuccessOpen(true);
      getAllSalesPlanStatus(
        filterState.yr || null,
        filterState.month || null,
        filterState.bgId || null,
        filterState.buId || null,
        filterState.zId || null,
        filterState.rId || null,
        filterState.tId
      );
    } catch (error) {
      console.log(error);
    }
  };

  const [namewiseData, setNamewiseData] = useState([]);
  const [totalNamewiseData, setTotalNamewiseData] = useState({});
  useEffect(() => {
    if (!props.tableData.length) return;
    const sumObjectsByBrandCode = (inputArray) => {
      const sumMap = {};
      // Iterate through the input array
      inputArray.forEach((obj) => {
        const brandCode = obj["Brand Code"];
        // If Brand Code is not in the sumMap, initialize it
        if (!sumMap[brandCode]) {
          sumMap[brandCode] = { ...obj };
        } else {
          // Sum the values for each property (excluding non-numeric values)
          for (const key in obj) {
            if (!isNaN(obj[key])) {
              sumMap[brandCode][key] = (sumMap[brandCode][key] || 0) + obj[key];
            }
          }
        }
      });
      // Create a new array with unique Brand Code and summed values
      const resultArray = Object.values(sumMap);
      return resultArray;
    };
    const result = sumObjectsByBrandCode(props.tableData);
    // Display the result
    setNamewiseData(result);

    function sumNumericValues(data) {
      const sumObject = {};

      data.forEach((item) => {
        Object.keys(item).forEach((key) => {
          if (typeof item[key] === "number") {
            sumObject[key] = (sumObject[key] || 0) + item[key];
          } else {
            sumObject[key] = "Moye Moye";
          }
        });
      });

      return sumObject;
    }
    const totalResult = sumNumericValues(props.tableData);
    setTotalNamewiseData(totalResult);
  }, [props.tableData]);
  console.log("noi", totalNamewiseData);

  const [pcatwiseData, setPcatwiseData] = useState([]);
  const [totalPcatwiseData, setTotalPcatwiseData] = useState({});
  useEffect(() => {
    if (!props.tableData.length) return;
    const sumObjectsByBrandCode = (inputArray) => {
      const sumMap = {};
      // Iterate through the input array
      inputArray.forEach((obj) => {
        const brandCode = obj["Product Category"];

        // If Brand Code is not in the sumMap, initialize it
        if (!sumMap[brandCode]) {
          sumMap[brandCode] = { ...obj };
        } else {
          // Sum the values for each property (excluding non-numeric values)
          for (const key in obj) {
            if (!isNaN(obj[key])) {
              sumMap[brandCode][key] = (sumMap[brandCode][key] || 0) + obj[key];
            }
          }
        }
      });
      // Create a new array with unique Brand Code and summed values
      const resultArray = Object.values(sumMap);
      return resultArray;
    };
    const result = sumObjectsByBrandCode(props.tableData);
    setPcatwiseData(result);
    function sumNumericValues(data) {
      const sumObject = {};

      data.forEach((item) => {
        Object.keys(item).forEach((key) => {
          if (typeof item[key] === "number") {
            sumObject[key] = (sumObject[key] || 0) + item[key];
          } else {
            sumObject[key] = "Moye Moye";
          }
        });
      });

      return sumObject;
    }
    const totalResult = sumNumericValues(props.tableData);
    setTotalPcatwiseData(totalResult);
  }, [props.tableData]);

  const [psegwiseData, setPsegwiseData] = useState([]);
  useEffect(() => {
    if (!props.tableData.length) return;

    const sumObjectsByBrandCode = (inputArray) => {
      const sumMap = {};

      // Iterate through the input array
      inputArray.forEach((obj) => {
        const brandCode = obj["Product Segment"];

        // If Brand Code is not in the sumMap, initialize it
        if (!sumMap[brandCode]) {
          sumMap[brandCode] = { ...obj };
        } else {
          // Sum the values for each property (excluding non-numeric values)
          for (const key in obj) {
            if (!isNaN(obj[key])) {
              sumMap[brandCode][key] = (sumMap[brandCode][key] || 0) + obj[key];
            }
          }
        }
      });
      // Create a new array with unique Brand Code and summed values
      const resultArray = Object.values(sumMap);
      return resultArray;
    };
    const result = sumObjectsByBrandCode(props.tableData);
    setPsegwiseData(result);
  }, [props.tableData]);

  const [rolewiseData, setRolewiseData] = useState([]);
  useEffect(() => {
    if (!props.tableData.length) return;

    const sumObjectsByBrandCode = (inputArray) => {
      const sumMap = {};

      // Iterate through the input array
      inputArray.forEach((obj) => {
        const brandCode = obj["Territory"];

        // If Brand Code is not in the sumMap, initialize it
        if (!sumMap[brandCode]) {
          sumMap[brandCode] = { ...obj };
        } else {
          // Sum the values for each property (excluding non-numeric values)
          for (const key in obj) {
            if (!isNaN(obj[key])) {
              sumMap[brandCode][key] = (sumMap[brandCode][key] || 0) + obj[key];
            }
          }
        }
      });

      // Create a new array with unique Brand Code and summed values
      const resultArray = Object.values(sumMap);
      return resultArray;
    };
    const result = sumObjectsByBrandCode(props.tableData);
    setRolewiseData(result);
  }, [props.tableData]);

  const receivedObject = router.query.filterState
    ? JSON.parse(decodeURIComponent(router.query.filterState))
    : {};
  return (
    <section className="mt-1 mb-24 outer flex flex-col items-center justify-center w-full font-arial ">
      <SubmitModal
        isOpen={isOpen}
        territoryId={receivedObject.tId}
        onClose={() => {
          setisOpen(false);
          setApiMessage("");
          router.push("/rollingplans");
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
              ZRT: {router.query.zrt}
            </h2>
          </div>
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-xs text-gray-700">Depot:</h2>
            <h2 className="font-bold text-xs text-gray-700">
              {router.query.depot}
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
          <div className="status flex ">
            <h2 className="text-xs text-gray-700">Stage :</h2>
            <h2 className="font-bold text-xs text-gray-700">
              {router.query.status}
            </h2>
          </div>
          <div className="status flex gap-1">
            <h2 className="text-xs text-gray-700">Status :</h2>
            <h2 className="font-bold text-xs text-gray-700">
              {router.query.stage}
            </h2>
          </div>
        </div>
      </div>

      {/* table layout */}

      <div className="table mb-4 w-full">
        {/* <h3>Table Layout</h3> */}
        <section className="bg-white p-2 flex flex-col gap-2">
          {/* <div className="mx-auto max-w-screen-2xl px-4 lg:px-12"> */}
          <div className="mx-auto max-w-full px- ">
            {/* Start coding here */}
            <h4 className="w-full flex align-center justify-center font-bold">
              Brand Code wise total
            </h4>
            <div className="bg-white dark:bg-gray-800 relative shadow-md  overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 text-center bg-orange-300  dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-2 py-1 text-black">
                        Brand Code
                      </th>

                      <th scope="col" className="px-2 py-1 text-black">
                        FY Sales Qty 21-22
                      </th>
                      <th scope="col" className="px-2 py-1 text-black">
                        FY Sales Qty 22-23
                      </th>
                      <th scope="col" className="px-2 py-1 text-black ">
                        Annual Budget Qty 23-24
                      </th>
                      <th scope="col" className="px-2 py-1 text-black">
                        YTD Net Sale Qty 23-24
                      </th>
                      <th scope="col" className="px-2 py-1 text-black">
                        Apr 22-23 Sale Qty
                      </th>
                      <th scope="col" className="px-2 py-1 text-black">
                        Apr 23-24 Budget Qty
                      </th>
                      <th scope="col" className="px-2 py-1 text-black">
                        Apr 23-24 FSCT Qty
                      </th>
                      {!receivedObject.tId && (
                        <th scope="col" className="px-2 py-1 text-black">
                          Apr 23-24 Revised FCST
                          <br />
                          (TM Cumulative)
                        </th>
                      )}

                      <th scope="col" className="px-2 py-1 text-black ">
                        Apr 23-24 Revised FCST Qty
                      </th>
                      <th scope="col" className="px-2 py-1 text-black  ">
                        Apr 23-24 Urget Qty
                      </th>
                      <th scope="col" className="px-2 py-1 text-black ">
                        May 23-24 Sale Qty
                      </th>
                      <th scope="col" className="px-2 py-1 text-black">
                        May Budget Qty 23-24
                      </th>
                      {!receivedObject?.tId && (
                        <th scope="col" className="px-2 py-1 text-black">
                          May FCST Qty 23-24
                          <br />
                          (TM Cumulative)
                        </th>
                      )}

                      <th
                        scope="col"
                        className="px-2 py-1 text-black border-l-2 border-r-2"
                      >
                        May 23-24 FCST Qty
                      </th>
                      <th
                        scope="col"
                        className="px-2 py-1 text-black border-l-2 border-r-2 "
                      >
                        Expected Sale Return Qty
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {namewiseData.map((item) => {
                      return (
                        <tr className="border-b dark:border-gray-700 bg-white text-gray-600 text-xs">
                          <td className="px-4 py-1 text-center">
                            {item[Object.keys(item)[2]]}
                          </td>
                          <td className="px-4 py-1 text-right">
                            {item[Object.keys(item)[6]]}
                          </td>
                          <td className="px-4 py-1 text-right">
                            {item[Object.keys(item)[8]]}
                          </td>
                          <td className="px-4 py-1 text-right">
                            {item[Object.keys(item)[10]]}
                          </td>
                          <td className="px-4 py-1 text-right">
                            {item[Object.keys(item)[12]]}
                          </td>
                          <td className="px-4 py-1 text-right">
                            {item[Object.keys(item)[14]]}
                          </td>
                          <td className="px-4 py-1 text-right">
                            {item[Object.keys(item)[15]]}
                          </td>
                          {console.log("hi", Object.keys(item)[17])}
                          <td className="px-4 py-1 text-right">
                            {item[Object.keys(item)[17]]}
                          </td>
                          {!receivedObject?.tId && (
                            <td className="px-4 py-1 text-right">
                              {item[Object.keys(item)[36]]}
                            </td>
                          )}
                          <td className="px-2 py-1 border-l-2 border-r-2 border-red-400 text-center">
                            {item[Object.keys(item)[19]]}
                          </td>
                          <td className="px-2 py-1 border-l-2 border-r-2 border-red-400 text-right">
                            {item[Object.keys(item)[21]]}
                          </td>
                          <td className="px-4 py-1 text-right">
                            {item[Object.keys(item)[22]]}
                          </td>
                          <td className="px-4 py-1 text-right">
                            {item[Object.keys(item)[23]]}
                          </td>
                          {!receivedObject.tId && (
                            <td className="px-4 py-1 text-right">
                              {" "}
                              {item[Object.keys(item)[38]]}
                            </td>
                          )}
                          <td className="px-2 py-1 border-l-2 border-r-2 border-red-400 text-right">
                            {item[Object.keys(item)[25]]}
                          </td>
                          <td className="px-2 py-1 border-l-2 border-r-2 border-red-400 text-right">
                            {item[Object.keys(item)[27]]}
                          </td>
                        </tr>
                      );
                    })}
                    <tr className="border-b dark:border-gray-700 bg-gray-100 text-gray-600 text-xs font-bold">
                      <td className="px-4 py-1 text-center whitespace-nowrap">
                        Qty Total
                      </td>
                      <td className="px-4 py-1 text-right">
                        {totalNamewiseData[Object.keys(totalNamewiseData)[6]]}
                      </td>
                      <td className="px-4 py-1 text-right">
                        {totalNamewiseData[Object.keys(totalNamewiseData)[8]]}
                      </td>
                      <td className="px-4 py-1 text-right">
                        {totalNamewiseData[Object.keys(totalNamewiseData)[10]]}
                      </td>
                      <td className="px-4 py-1 text-right">
                        {totalNamewiseData[Object.keys(totalNamewiseData)[12]]}
                      </td>
                      <td className="px-4 py-1 text-right">
                        {totalNamewiseData[Object.keys(totalNamewiseData)[14]]}
                      </td>
                      <td className="px-4 py-1 text-right">
                        {totalNamewiseData[Object.keys(totalNamewiseData)[15]]}
                      </td>
                      {console.log("hi", Object.keys(totalNamewiseData)[17])}
                      <td className="px-4 py-1 text-right">
                        {totalNamewiseData[Object.keys(totalNamewiseData)[17]]}
                      </td>
                      {!receivedObject?.tId && (
                        <td className="px-4 py-1 text-right">
                          {
                            totalNamewiseData[
                              Object.keys(totalNamewiseData)[36]
                            ]
                          }
                        </td>
                      )}
                      <td className="px-2 py-1 border-l-2 border-r-2 border-red-400 text-center">
                        {totalNamewiseData[Object.keys(totalNamewiseData)[19]]}
                      </td>
                      <td className="px-2 py-1 border-l-2 border-r-2 border-red-400 text-right">
                        {totalNamewiseData[Object.keys(totalNamewiseData)[21]]}
                      </td>
                      <td className="px-4 py-1 text-right">
                        {totalNamewiseData[Object.keys(totalNamewiseData)[22]]}
                      </td>
                      <td className="px-4 py-1 text-right">
                        {totalNamewiseData[Object.keys(totalNamewiseData)[23]]}
                      </td>
                      {!receivedObject.tId && (
                        <td className="px-4 py-1 text-right">
                          {" "}
                          {
                            totalNamewiseData[
                              Object.keys(totalNamewiseData)[38]
                            ]
                          }
                        </td>
                      )}
                      <td className="px-2 py-1 border-l-2 border-r-2 border-red-400 text-right">
                        {totalNamewiseData[Object.keys(totalNamewiseData)[25]]}
                      </td>
                      <td className="px-2 py-1 border-l-2 border-r-2 border-red-400 text-right">
                        {totalNamewiseData[Object.keys(totalNamewiseData)[27]]}
                      </td>
                    </tr>
                    <tr className="border-b dark:border-gray-700 bg-gray-100 text-gray-600 text-xs font-bold">
                      <td className="px-4 py-1 text-center whitespace-nowrap">
                        Value Total
                      </td>
                      <td className="px-4 py-1 text-right">
                        {totalNamewiseData[
                          Object.keys(totalNamewiseData)[7]
                        ]?.toFixed(2)}
                      </td>
                      <td className="px-4 py-1 text-right">
                        {totalNamewiseData[
                          Object.keys(totalNamewiseData)[9]
                        ]?.toFixed(2)}
                      </td>
                      <td className="px-4 py-1 text-right">
                        {totalNamewiseData[Object.keys(totalNamewiseData)[11]]}
                      </td>
                      <td className="px-4 py-1 text-right">
                        {totalNamewiseData[Object.keys(totalNamewiseData)[13]]}
                      </td>
                      <td className="px-4 py-1 text-right">-</td>
                      <td className="px-4 py-1 text-right">
                        {totalNamewiseData[Object.keys(totalNamewiseData)[16]]}
                      </td>

                      <td className="px-4 py-1 text-right">
                        {totalNamewiseData[Object.keys(totalNamewiseData)[18]]}
                      </td>
                      {!receivedObject?.tId && (
                        <td className="px-4 py-1 text-right">
                          {
                            totalNamewiseData[
                              Object.keys(totalNamewiseData)[36]
                            ]
                          }
                        </td>
                      )}
                      <td className="px-2 py-1 border-l-2 border-r-2 border-red-400 text-center">
                        {totalNamewiseData[Object.keys(totalNamewiseData)[20]]}
                      </td>
                      <td className="px-2 py-1 border-l-2 border-r-2 border-red-400 text-right">
                        -
                      </td>
                      <td className="px-4 py-1 text-right">-</td>
                      <td className="px-4 py-1 text-right">
                        {totalNamewiseData[Object.keys(totalNamewiseData)[24]]}
                      </td>
                      {!receivedObject.tId && (
                        <td className="px-4 py-1 text-right">
                          {" "}
                          {
                            totalNamewiseData[
                              Object.keys(totalNamewiseData)[38]
                            ]
                          }
                        </td>
                      )}
                      <td className="px-2 py-1 border-l-2 border-r-2 border-red-400 text-right">
                        {totalNamewiseData[Object.keys(totalNamewiseData)[26]]}
                      </td>
                      <td className="px-2 py-1 border-l-2 border-r-2 border-red-400 text-right">
                        -
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="mx-auto max-w-full px- ">
            {/* Start coding here */}
            <h4 className="w-full flex align-center justify-center font-bold">
              Product Categorey wise total
            </h4>
            <div className="bg-white dark:bg-gray-800 relative shadow-md  overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 text-center bg-orange-300  dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-2 py-1 text-black">
                        Product Category
                      </th>

                      <th scope="col" className="px-2 py-1 text-black">
                        FY Sales Qty 21-22
                      </th>
                      <th scope="col" className="px-2 py-1 text-black">
                        FY Sales Qty 22-23
                      </th>
                      <th scope="col" className="px-2 py-1 text-black ">
                        Annual Budget Qty 23-24
                      </th>
                      <th scope="col" className="px-2 py-1 text-black">
                        YTD Net Sale Qty 23-24
                      </th>
                      <th scope="col" className="px-2 py-1 text-black">
                        Apr 22-23 Sale Qty
                      </th>
                      <th scope="col" className="px-2 py-1 text-black">
                        Apr 23-24 Budget Qty
                      </th>
                      <th scope="col" className="px-2 py-1 text-black">
                        Apr 23-24 FSCT Qty
                      </th>
                      {!receivedObject.tId && (
                        <th scope="col" className="px-2 py-1 text-black">
                          Apr 23-24 Revised FCST
                          <br />
                          (TM Cumulative)
                        </th>
                      )}

                      <th scope="col" className="px-2 py-1 text-black ">
                        Apr 23-24 Revised FCST Qty
                      </th>
                      <th scope="col" className="px-2 py-1 text-black  ">
                        Apr 23-24 Urget Qty
                      </th>
                      <th scope="col" className="px-2 py-1 text-black ">
                        May 23-24 Sale Qty
                      </th>
                      <th scope="col" className="px-2 py-1 text-black">
                        May Budget Qty 23-24
                      </th>
                      {!receivedObject?.tId && (
                        <th scope="col" className="px-2 py-1 text-black">
                          May FCST Qty 23-24
                          <br />
                          (TM Cumulative)
                        </th>
                      )}

                      <th
                        scope="col"
                        className="px-2 py-1 text-black border-l-2 border-r-2"
                      >
                        May 23-24 FCST Qty
                      </th>
                      <th
                        scope="col"
                        className="px-2 py-1 text-black border-l-2 border-r-2 "
                      >
                        Expected Sale Return Qty
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {pcatwiseData.map((item) => {
                      return (
                        <tr className="border-b dark:border-gray-700 bg-white text-gray-600 text-xs">
                          <td className="px-4 py-1 text-center">
                            {item[Object.keys(item)[1]]}
                          </td>
                          <td className="px-4 py-1 text-right">
                            {item[Object.keys(item)[6]]}
                          </td>
                          <td className="px-4 py-1 text-right">
                            {item[Object.keys(item)[8]]}
                          </td>
                          <td className="px-4 py-1 text-right">
                            {item[Object.keys(item)[10]]}
                          </td>
                          <td className="px-4 py-1 text-right">
                            {item[Object.keys(item)[12]]}
                          </td>
                          <td className="px-4 py-1 text-right">
                            {item[Object.keys(item)[14]]}
                          </td>
                          <td className="px-4 py-1 text-right">
                            {item[Object.keys(item)[15]]}
                          </td>
                          {console.log("hi", Object.keys(item)[17])}
                          <td className="px-4 py-1 text-right">
                            {item[Object.keys(item)[17]]}
                          </td>
                          {!receivedObject?.tId && (
                            <td className="px-4 py-1 text-right">
                              {item[Object.keys(item)[36]]}
                            </td>
                          )}
                          <td className="px-2 py-1 border-l-2 border-r-2 border-red-400 text-center">
                            {item[Object.keys(item)[19]]}
                          </td>
                          <td className="px-2 py-1 border-l-2 border-r-2 border-red-400 text-right">
                            {item[Object.keys(item)[21]]}
                          </td>
                          <td className="px-4 py-1 text-right">
                            {item[Object.keys(item)[22]]}
                          </td>
                          <td className="px-4 py-1 text-right">
                            {item[Object.keys(item)[23]]}
                          </td>
                          {!receivedObject.tId && (
                            <td className="px-4 py-1 text-right">
                              {" "}
                              {item[Object.keys(item)[38]]}
                            </td>
                          )}
                          <td className="px-2 py-1 border-l-2 border-r-2 border-red-400 text-right">
                            {item[Object.keys(item)[25]]}
                          </td>
                          <td className="px-2 py-1 border-l-2 border-r-2 border-red-400 text-right">
                            {item[Object.keys(item)[27]]}
                          </td>
                        </tr>
                      );
                    })}
                    <tr className="border-b dark:border-gray-700 bg-gray-100 text-gray-600 text-xs">
                      <td className="px-4 py-1 text-center whitespace-nowrap">
                        Qty Total
                      </td>
                      <td className="px-4 py-1 text-right">
                        {totalPcatwiseData[Object.keys(totalPcatwiseData)[6]]}
                      </td>
                      <td className="px-4 py-1 text-right">
                        {totalPcatwiseData[Object.keys(totalPcatwiseData)[8]]}
                      </td>
                      <td className="px-4 py-1 text-right">
                        {totalPcatwiseData[Object.keys(totalPcatwiseData)[10]]}
                      </td>
                      <td className="px-4 py-1 text-right">
                        {totalPcatwiseData[Object.keys(totalPcatwiseData)[12]]}
                      </td>
                      <td className="px-4 py-1 text-right">
                        {totalPcatwiseData[Object.keys(totalPcatwiseData)[14]]}
                      </td>
                      <td className="px-4 py-1 text-right">
                        {totalPcatwiseData[Object.keys(totalPcatwiseData)[15]]}
                      </td>
                      {console.log("hi", Object.keys(totalPcatwiseData)[17])}
                      <td className="px-4 py-1 text-right">
                        {totalPcatwiseData[Object.keys(totalPcatwiseData)[17]]}
                      </td>
                      {!receivedObject?.tId && (
                        <td className="px-4 py-1 text-right">
                          {
                            totalPcatwiseData[
                              Object.keys(totalPcatwiseData)[36]
                            ]
                          }
                        </td>
                      )}
                      <td className="px-2 py-1 border-l-2 border-r-2 border-red-400 text-center">
                        {totalPcatwiseData[Object.keys(totalPcatwiseData)[19]]}
                      </td>
                      <td className="px-2 py-1 border-l-2 border-r-2 border-red-400 text-right">
                        {totalPcatwiseData[Object.keys(totalPcatwiseData)[21]]}
                      </td>
                      <td className="px-4 py-1 text-right">
                        {totalPcatwiseData[Object.keys(totalPcatwiseData)[22]]}
                      </td>
                      <td className="px-4 py-1 text-right">
                        {totalPcatwiseData[Object.keys(totalPcatwiseData)[23]]}
                      </td>
                      {!receivedObject.tId && (
                        <td className="px-4 py-1 text-right">
                          {" "}
                          {
                            totalPcatwiseData[
                              Object.keys(totalPcatwiseData)[38]
                            ]
                          }
                        </td>
                      )}
                      <td className="px-2 py-1 border-l-2 border-r-2 border-red-400 text-right">
                        {totalPcatwiseData[Object.keys(totalPcatwiseData)[25]]}
                      </td>
                      <td className="px-2 py-1 border-l-2 border-r-2 border-red-400 text-right">
                        {totalPcatwiseData[Object.keys(totalPcatwiseData)[27]]}
                      </td>
                    </tr>
                    <tr className="border-b dark:border-gray-700  bg-gray-100 text-gray-600 text-xs">
                      <td className="px-4 py-1 text-center whitespace-nowrap">
                        Value Total
                      </td>
                      <td className="px-4 py-1 text-right">
                        {totalPcatwiseData[
                          Object.keys(totalPcatwiseData)[7]
                        ]?.toFixed(2)}
                      </td>
                      <td className="px-4 py-1 text-right">
                        {totalPcatwiseData[
                          Object.keys(totalPcatwiseData)[9]
                        ]?.toFixed(2)}
                      </td>
                      <td className="px-4 py-1 text-right">
                        {totalPcatwiseData[Object.keys(totalPcatwiseData)[11]]}
                      </td>
                      <td className="px-4 py-1 text-right">
                        {totalPcatwiseData[Object.keys(totalPcatwiseData)[13]]}
                      </td>
                      <td className="px-4 py-1 text-right">-</td>
                      <td className="px-4 py-1 text-right">
                        {totalPcatwiseData[Object.keys(totalPcatwiseData)[16]]}
                      </td>

                      <td className="px-4 py-1 text-right">
                        {totalPcatwiseData[Object.keys(totalPcatwiseData)[18]]}
                      </td>
                      {!receivedObject?.tId && (
                        <td className="px-4 py-1 text-right">
                          {
                            totalPcatwiseData[
                              Object.keys(totalPcatwiseData)[36]
                            ]
                          }
                        </td>
                      )}
                      <td className="px-2 py-1 border-l-2 border-r-2 border-red-400 text-center">
                        {totalPcatwiseData[Object.keys(totalPcatwiseData)[20]]}
                      </td>
                      <td className="px-2 py-1 border-l-2 border-r-2 border-red-400 text-right">
                        -
                      </td>
                      <td className="px-4 py-1 text-right">-</td>
                      <td className="px-4 py-1 text-right">
                        {totalPcatwiseData[Object.keys(totalPcatwiseData)[24]]}
                      </td>
                      {!receivedObject.tId && (
                        <td className="px-4 py-1 text-right">
                          {" "}
                          {
                            totalPcatwiseData[
                              Object.keys(totalPcatwiseData)[38]
                            ]
                          }
                        </td>
                      )}
                      <td className="px-2 py-1 border-l-2 border-r-2 border-red-400 text-right">
                        {totalPcatwiseData[Object.keys(totalPcatwiseData)[26]]}
                      </td>
                      <td className="px-2 py-1 border-l-2 border-r-2 border-red-400 text-right">
                        -
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          
          <div className="mx-auto max-w-full px- ">
            {/* Start coding here */}
            <h4 className="w-full flex align-center justify-center font-bold">
              Product Segment wise total
            </h4>
            <div className="bg-white dark:bg-gray-800 relative shadow-md  overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 text-center bg-orange-300  dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-2 py-1 text-black">
                        Product Category
                      </th>

                      <th scope="col" className="px-2 py-1 text-black">
                        FY Sales Qty 21-22
                      </th>
                      <th scope="col" className="px-2 py-1 text-black">
                        FY Sales Qty 22-23
                      </th>
                      <th scope="col" className="px-2 py-1 text-black ">
                        Annual Budget Qty 23-24
                      </th>
                      <th scope="col" className="px-2 py-1 text-black">
                        YTD Net Sale Qty 23-24
                      </th>
                      <th scope="col" className="px-2 py-1 text-black">
                        Apr 22-23 Sale Qty
                      </th>
                      <th scope="col" className="px-2 py-1 text-black">
                        Apr 23-24 Budget Qty
                      </th>
                      <th scope="col" className="px-2 py-1 text-black">
                        Apr 23-24 FSCT Qty
                      </th>
                      {!receivedObject.tId && (
                        <th scope="col" className="px-2 py-1 text-black">
                          Apr 23-24 Revised FCST
                          <br />
                          (TM Cumulative)
                        </th>
                      )}

                      <th scope="col" className="px-2 py-1 text-black ">
                        Apr 23-24 Revised FCST Qty
                      </th>
                      <th scope="col" className="px-2 py-1 text-black  ">
                        Apr 23-24 Urget Qty
                      </th>
                      <th scope="col" className="px-2 py-1 text-black ">
                        May 23-24 Sale Qty
                      </th>
                      <th scope="col" className="px-2 py-1 text-black">
                        May Budget Qty 23-24
                      </th>
                      {!receivedObject?.tId && (
                        <th scope="col" className="px-2 py-1 text-black">
                          May FCST Qty 23-24
                          <br />
                          (TM Cumulative)
                        </th>
                      )}

                      <th
                        scope="col"
                        className="px-2 py-1 text-black border-l-2 border-r-2"
                      >
                        May 23-24 FCST Qty
                      </th>
                      <th
                        scope="col"
                        className="px-2 py-1 text-black border-l-2 border-r-2 "
                      >
                        Expected Sale Return Qty
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {psegwiseData.map((item) => {
                      return (
                        <tr className="border-b dark:border-gray-700 bg-white text-gray-600 text-xs">
                          <td className="px-4 py-1 text-center">
                            {item[Object.keys(item)[0]]}
                          </td>
                          <td className="px-4 py-1 text-right">
                            {item[Object.keys(item)[6]]}
                          </td>
                          <td className="px-4 py-1 text-right">
                            {item[Object.keys(item)[8]]}
                          </td>
                          <td className="px-4 py-1 text-right">
                            {item[Object.keys(item)[10]]}
                          </td>
                          <td className="px-4 py-1 text-right">
                            {item[Object.keys(item)[12]]}
                          </td>
                          <td className="px-4 py-1 text-right">
                            {item[Object.keys(item)[14]]}
                          </td>
                          <td className="px-4 py-1 text-right">
                            {item[Object.keys(item)[15]]}
                          </td>
                          {console.log("hi", Object.keys(item)[17])}
                          <td className="px-4 py-1 text-right">
                            {item[Object.keys(item)[17]]}
                          </td>
                          {!receivedObject?.tId && (
                            <td className="px-4 py-1 text-right">
                              {item[Object.keys(item)[36]]}
                            </td>
                          )}
                          <td className="px-2 py-1 border-l-2 border-r-2 border-red-400 text-center">
                            {item[Object.keys(item)[19]]}
                          </td>
                          <td className="px-2 py-1 border-l-2 border-r-2 border-red-400 text-right">
                            {item[Object.keys(item)[21]]}
                          </td>
                          <td className="px-4 py-1 text-right">
                            {item[Object.keys(item)[22]]}
                          </td>
                          <td className="px-4 py-1 text-right">
                            {item[Object.keys(item)[23]]}
                          </td>
                          {!receivedObject.tId && (
                            <td className="px-4 py-1 text-right">
                              {" "}
                              {item[Object.keys(item)[38]]}
                            </td>
                          )}
                          <td className="px-2 py-1 border-l-2 border-r-2 border-red-400 text-right">
                            {item[Object.keys(item)[25]]}
                          </td>
                          <td className="px-2 py-1 border-l-2 border-r-2 border-red-400 text-right">
                            {item[Object.keys(item)[27]]}
                          </td>
                        </tr>
                      );
                    })}
                     <tr className="border-b dark:border-gray-700 bg-gray-100 text-gray-600 text-xs">
                      <td className="px-4 py-1 text-center whitespace-nowrap">
                        Qty Total
                      </td>
                      <td className="px-4 py-1 text-right">
                        {totalNamewiseData[Object.keys(totalNamewiseData)[6]]}
                      </td>
                      <td className="px-4 py-1 text-right">
                        {totalNamewiseData[Object.keys(totalNamewiseData)[8]]}
                      </td>
                      <td className="px-4 py-1 text-right">
                        {totalNamewiseData[Object.keys(totalNamewiseData)[10]]}
                      </td>
                      <td className="px-4 py-1 text-right">
                        {totalNamewiseData[Object.keys(totalNamewiseData)[12]]}
                      </td>
                      <td className="px-4 py-1 text-right">
                        {totalNamewiseData[Object.keys(totalNamewiseData)[14]]}
                      </td>
                      <td className="px-4 py-1 text-right">
                        {totalNamewiseData[Object.keys(totalNamewiseData)[15]]}
                      </td>
                      {console.log("hi", Object.keys(totalNamewiseData)[17])}
                      <td className="px-4 py-1 text-right">
                        {totalNamewiseData[Object.keys(totalNamewiseData)[17]]}
                      </td>
                      {!receivedObject?.tId && (
                        <td className="px-4 py-1 text-right">
                          {
                            totalNamewiseData[
                              Object.keys(totalNamewiseData)[36]
                            ]
                          }
                        </td>
                      )}
                      <td className="px-2 py-1 border-l-2 border-r-2 border-red-400 text-center">
                        {totalNamewiseData[Object.keys(totalNamewiseData)[19]]}
                      </td>
                      <td className="px-2 py-1 border-l-2 border-r-2 border-red-400 text-right">
                        {totalNamewiseData[Object.keys(totalNamewiseData)[21]]}
                      </td>
                      <td className="px-4 py-1 text-right">
                        {totalNamewiseData[Object.keys(totalNamewiseData)[22]]}
                      </td>
                      <td className="px-4 py-1 text-right">
                        {totalNamewiseData[Object.keys(totalNamewiseData)[23]]}
                      </td>
                      {!receivedObject.tId && (
                        <td className="px-4 py-1 text-right">
                          {" "}
                          {
                            totalNamewiseData[
                              Object.keys(totalNamewiseData)[38]
                            ]
                          }
                        </td>
                      )}
                      <td className="px-2 py-1 border-l-2 border-r-2 border-red-400 text-right">
                        {totalNamewiseData[Object.keys(totalNamewiseData)[25]]}
                      </td>
                      <td className="px-2 py-1 border-l-2 border-r-2 border-red-400 text-right">
                        {totalNamewiseData[Object.keys(totalNamewiseData)[27]]}
                      </td>
                    </tr>
                    <tr className="border-b dark:border-gray-700 bg-gray-100 text-gray-600 text-xs">
                      <td className="px-4 py-1 text-center whitespace-nowrap">
                        Value Total
                      </td>
                      <td className="px-4 py-1 text-right">
                        {totalNamewiseData[
                          Object.keys(totalNamewiseData)[7]
                        ]?.toFixed(2)}
                      </td>
                      <td className="px-4 py-1 text-right">
                        {totalNamewiseData[
                          Object.keys(totalNamewiseData)[9]
                        ]?.toFixed(2)}
                      </td>
                      <td className="px-4 py-1 text-right">
                        {totalNamewiseData[Object.keys(totalNamewiseData)[11]]}
                      </td>
                      <td className="px-4 py-1 text-right">
                        {totalNamewiseData[Object.keys(totalNamewiseData)[13]]}
                      </td>
                      <td className="px-4 py-1 text-right">-</td>
                      <td className="px-4 py-1 text-right">
                        {totalNamewiseData[Object.keys(totalNamewiseData)[16]]}
                      </td>

                      <td className="px-4 py-1 text-right">
                        {totalNamewiseData[Object.keys(totalNamewiseData)[18]]}
                      </td>
                      {!receivedObject?.tId && (
                        <td className="px-4 py-1 text-right">
                          {
                            totalNamewiseData[
                              Object.keys(totalNamewiseData)[36]
                            ]
                          }
                        </td>
                      )}
                      <td className="px-2 py-1 border-l-2 border-r-2 border-red-400 text-center">
                        {totalNamewiseData[Object.keys(totalNamewiseData)[20]]}
                      </td>
                      <td className="px-2 py-1 border-l-2 border-r-2 border-red-400 text-right">
                        -
                      </td>
                      <td className="px-4 py-1 text-right">-</td>
                      <td className="px-4 py-1 text-right">
                        {totalNamewiseData[Object.keys(totalNamewiseData)[24]]}
                      </td>
                      {!receivedObject.tId && (
                        <td className="px-4 py-1 text-right">
                          {" "}
                          {
                            totalNamewiseData[
                              Object.keys(totalNamewiseData)[38]
                            ]
                          }
                        </td>
                      )}
                      <td className="px-2 py-1 border-l-2 border-r-2 border-red-400 text-right">
                        {totalNamewiseData[Object.keys(totalNamewiseData)[26]]}
                      </td>
                      <td className="px-2 py-1 border-l-2 border-r-2 border-red-400 text-right">
                        -
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        

         
          <div className="mx-auto max-w-full px- ">
            <h4 className="w-full flex align-center justify-center font-bold">
              Territory wise total
            </h4>
            <div className="bg-white dark:bg-gray-800 relative shadow-md  overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 text-center bg-orange-300  dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-2 py-1 text-black">
                        Product Category
                      </th>

                      <th scope="col" className="px-2 py-1 text-black">
                        FY Sales Qty 21-22
                      </th>
                      <th scope="col" className="px-2 py-1 text-black">
                        FY Sales Qty 22-23
                      </th>
                      <th scope="col" className="px-2 py-1 text-black ">
                        Annual Budget Qty 23-24
                      </th>
                      <th scope="col" className="px-2 py-1 text-black">
                        YTD Net Sale Qty 23-24
                      </th>
                      <th scope="col" className="px-2 py-1 text-black">
                        Apr 22-23 Sale Qty
                      </th>
                      <th scope="col" className="px-2 py-1 text-black">
                        Apr 23-24 Budget Qty
                      </th>
                      <th scope="col" className="px-2 py-1 text-black">
                        Apr 23-24 FSCT Qty
                      </th>
                      {!receivedObject.tId && (
                        <th scope="col" className="px-2 py-1 text-black">
                          Apr 23-24 Revised FCST
                          <br />
                          (TM Cumulative)
                        </th>
                      )}

                      <th scope="col" className="px-2 py-1 text-black ">
                        Apr 23-24 Revised FCST Qty
                      </th>
                      <th scope="col" className="px-2 py-1 text-black  ">
                        Apr 23-24 Urget Qty
                      </th>
                      <th scope="col" className="px-2 py-1 text-black ">
                        May 23-24 Sale Qty
                      </th>
                      <th scope="col" className="px-2 py-1 text-black">
                        May Budget Qty 23-24
                      </th>
                      {!receivedObject?.tId && (
                        <th scope="col" className="px-2 py-1 text-black">
                          May FCST Qty 23-24
                          <br />
                          (TM Cumulative)
                        </th>
                      )}

                      <th
                        scope="col"
                        className="px-2 py-1 text-black border-l-2 border-r-2"
                      >
                        May 23-24 FCST Qty
                      </th>
                      <th
                        scope="col"
                        className="px-2 py-1 text-black border-l-2 border-r-2 "
                      >
                        Expected Sale Return Qty
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {rolewiseData.map((item) => {
                      return (
                        <tr className="border-b dark:border-gray-700 bg-white text-gray-600 text-xs">
                          <td className="px-4 py-1 text-center">
                            {item[Object.keys(item)[29]]}
                          </td>
                          <td className="px-4 py-1 text-right">
                            {item[Object.keys(item)[6]]}
                          </td>
                          <td className="px-4 py-1 text-right">
                            {item[Object.keys(item)[8]]}
                          </td>
                          <td className="px-4 py-1 text-right">
                            {item[Object.keys(item)[10]]}
                          </td>
                          <td className="px-4 py-1 text-right">
                            {item[Object.keys(item)[12]]}
                          </td>
                          <td className="px-4 py-1 text-right">
                            {item[Object.keys(item)[14]]}
                          </td>
                          <td className="px-4 py-1 text-right">
                            {item[Object.keys(item)[15]]}
                          </td>
                          {console.log("hi", Object.keys(item)[17])}
                          <td className="px-4 py-1 text-right">
                            {item[Object.keys(item)[17]]}
                          </td>
                          {!receivedObject?.tId && (
                            <td className="px-4 py-1 text-right">
                              {item[Object.keys(item)[36]]}
                            </td>
                          )}
                          <td className="px-2 py-1 border-l-2 border-r-2 border-red-400 text-center">
                            {item[Object.keys(item)[19]]}
                          </td>
                          <td className="px-2 py-1 border-l-2 border-r-2 border-red-400 text-right">
                            {item[Object.keys(item)[21]]}
                          </td>
                          <td className="px-4 py-1 text-right">
                            {item[Object.keys(item)[22]]}
                          </td>
                          <td className="px-4 py-1 text-right">
                            {item[Object.keys(item)[23]]}
                          </td>
                          {!receivedObject.tId && (
                            <td className="px-4 py-1 text-right">
                              {" "}
                              {item[Object.keys(item)[38]]}
                            </td>
                          )}
                          <td className="px-2 py-1 border-l-2 border-r-2 border-red-400 text-right">
                            {item[Object.keys(item)[25]]}
                          </td>
                          <td className="px-2 py-1 border-l-2 border-r-2 border-red-400 text-right">
                            {item[Object.keys(item)[27]]}
                          </td>
                        </tr>
                      );
                    })}
                     <tr className="border-b dark:border-gray-700 bg-gray-100 text-gray-600 text-xs">
                      <td className="px-4 py-1 text-center whitespace-nowrap">
                        Qty Total
                      </td>
                      <td className="px-4 py-1 text-right">
                        {totalNamewiseData[Object.keys(totalNamewiseData)[6]]}
                      </td>
                      <td className="px-4 py-1 text-right">
                        {totalNamewiseData[Object.keys(totalNamewiseData)[8]]}
                      </td>
                      <td className="px-4 py-1 text-right">
                        {totalNamewiseData[Object.keys(totalNamewiseData)[10]]}
                      </td>
                      <td className="px-4 py-1 text-right">
                        {totalNamewiseData[Object.keys(totalNamewiseData)[12]]}
                      </td>
                      <td className="px-4 py-1 text-right">
                        {totalNamewiseData[Object.keys(totalNamewiseData)[14]]}
                      </td>
                      <td className="px-4 py-1 text-right">
                        {totalNamewiseData[Object.keys(totalNamewiseData)[15]]}
                      </td>
                      {console.log("hi", Object.keys(totalNamewiseData)[17])}
                      <td className="px-4 py-1 text-right">
                        {totalNamewiseData[Object.keys(totalNamewiseData)[17]]}
                      </td>
                      {!receivedObject?.tId && (
                        <td className="px-4 py-1 text-right">
                          {
                            totalNamewiseData[
                              Object.keys(totalNamewiseData)[36]
                            ]
                          }
                        </td>
                      )}
                      <td className="px-2 py-1 border-l-2 border-r-2 border-red-400 text-center">
                        {totalNamewiseData[Object.keys(totalNamewiseData)[19]]}
                      </td>
                      <td className="px-2 py-1 border-l-2 border-r-2 border-red-400 text-right">
                        {totalNamewiseData[Object.keys(totalNamewiseData)[21]]}
                      </td>
                      <td className="px-4 py-1 text-right">
                        {totalNamewiseData[Object.keys(totalNamewiseData)[22]]}
                      </td>
                      <td className="px-4 py-1 text-right">
                        {totalNamewiseData[Object.keys(totalNamewiseData)[23]]}
                      </td>
                      {!receivedObject.tId && (
                        <td className="px-4 py-1 text-right">
                          {" "}
                          {
                            totalNamewiseData[
                              Object.keys(totalNamewiseData)[38]
                            ]
                          }
                        </td>
                      )}
                      <td className="px-2 py-1 border-l-2 border-r-2 border-red-400 text-right">
                        {totalNamewiseData[Object.keys(totalNamewiseData)[25]]}
                      </td>
                      <td className="px-2 py-1 border-l-2 border-r-2 border-red-400 text-right">
                        {totalNamewiseData[Object.keys(totalNamewiseData)[27]]}
                      </td>
                    </tr>


                    <tr className="border-b dark:border-gray-700 bg-gray-100 text-gray-600 text-xs">
                      <td className="px-4 py-1 text-center whitespace-nowrap">
                        Value Total
                      </td>
                      <td className="px-4 py-1 text-right">
                        {totalNamewiseData[
                          Object.keys(totalNamewiseData)[7]
                        ]?.toFixed(2)}
                      </td>
                      <td className="px-4 py-1 text-right">
                        {totalNamewiseData[
                          Object.keys(totalNamewiseData)[9]
                        ]?.toFixed(2)}
                      </td>
                      <td className="px-4 py-1 text-right">
                        {totalNamewiseData[Object.keys(totalNamewiseData)[11]]}
                      </td>
                      <td className="px-4 py-1 text-right">
                        {totalNamewiseData[Object.keys(totalNamewiseData)[13]]}
                      </td>
                      <td className="px-4 py-1 text-right">-</td>
                      <td className="px-4 py-1 text-right">
                        {totalNamewiseData[Object.keys(totalNamewiseData)[16]]}
                      </td>

                      <td className="px-4 py-1 text-right">
                        {totalNamewiseData[Object.keys(totalNamewiseData)[18]]}
                      </td>
                      {!receivedObject?.tId && (
                        <td className="px-4 py-1 text-right">
                          {
                            totalNamewiseData[
                              Object.keys(totalNamewiseData)[36]
                            ]
                          }
                        </td>
                      )}
                      <td className="px-2 py-1 border-l-2 border-r-2 border-red-400 text-center">
                        {totalNamewiseData[Object.keys(totalNamewiseData)[20]]}
                      </td>
                      <td className="px-2 py-1 border-l-2 border-r-2 border-red-400 text-right">
                        -
                      </td>
                      <td className="px-4 py-1 text-right">-</td>
                      <td className="px-4 py-1 text-right">
                        {totalNamewiseData[Object.keys(totalNamewiseData)[24]]}
                      </td>
                      {!receivedObject.tId && (
                        <td className="px-4 py-1 text-right">
                          {" "}
                          {
                            totalNamewiseData[
                              Object.keys(totalNamewiseData)[38]
                            ]
                          }
                        </td>
                      )}
                      <td className="px-2 py-1 border-l-2 border-r-2 border-red-400 text-right">
                        {totalNamewiseData[Object.keys(totalNamewiseData)[26]]}
                      </td>
                      <td className="px-2 py-1 border-l-2 border-r-2 border-red-400 text-right">
                        -
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
        <div className="flex items-center justify-end w-full gap-2 ">
          <button
            onClick={() => props.formType("RPTable")}
            className={`text-center w-[8.5em] rounded-md hover:bg-green-500 ${
              formActive ? "bg-green-400" : "bg-gray-400"
            }  text-white py-1 px-4 text-sm`}
          >
            Prev
          </button>
          {router.query.formType === "Add" && (
            <button
              onClick={() => {
                router.query.formType === "Add"
                  ? handleSaveRsp("Draft Submit")
                  : handleEditRsp("Draft Submit");
              }}
              className={`text-center rounded-md hover:bg-green-500 ${
                formActive ? "bg-green-400" : "bg-blue-500"
              }  text-white py-1 px-4 text-sm`}
            >
              Save as Draft
            </button>
          )}
          {(router.query.formType === "Add" ||
            router.query.formType === "Edit") && (
            <button
              className="text-center rounded-md bg-orange-500 text-white py-1 px-4 text-sm"
              onClick={() => {
                router.query.formType === "Add"
                  ? handleSaveRsp("Final Submitted")
                  : handleEditRsp("Final Submitted");
              }}
            >
              Final Submit
            </button>
          )}

          {router.query.formType === "Review" && (
            <button
              className="text-center rounded-md bg-green-500 text-white py-1 px-4 text-sm"
              onClick={() => {
                updateRollingPlanStatus("Review Done");
              }}
            >
              Final Review
            </button>
          )}
          {router.query.formType === "Review" && (
            <button
              className="text-center rounded-md bg-red-500 text-white py-1 px-4 text-sm"
              onClick={() => {
                // submitHandle("Review Done");
              }}
            >
              Reject as Draft
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default RPSummary;
