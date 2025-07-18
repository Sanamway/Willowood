 

import React, { useState, useEffect } from "react";
import { TbFileDownload } from "react-icons/tb";
import SubmitModal from "../modals/SubmitModal";
import { url } from "@/constants/url";
import axios from "axios";
import { useRouter } from "next/router";
import * as XLSX from "xlsx";
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
    // updateRollingPlanStatus(status);
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
        .get(`${url}/api/rsp_update_status`, {
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
          c_name: JSON.parse(window.localStorage.getItem("U_profile_name")),
          ul_name: JSON.parse(window.localStorage.getItem("U_profile_name")),
          user_id: JSON.parse(window.localStorage.getItem("userinfo")).user_id,
        };
      });
      setButtonLoadingState(true);
      const respond = await axios
        .post(`${url}/${endPoint}`, JSON.stringify({ data: data }), {
          headers: headers,
          params: {
            rp_status: status,
          },
        })
        .then((res) => {
          if (!res) return;
          setApiMessage(res.data.message);
          submitHandle(status);
        });
      // const currentTime = moment();
      // const disableLoading = moment().set({ hour: 18, minute: 0, second: 0 });
      // if (currentTime.isAfter(disableLoading)) {
      //   return;
      // } else {
      //   setButtonLoadingState(false);
      // }
      setButtonLoadingState(false);
    } catch (errors) {
      const errorMessage = errors?.response?.data?.message;
      console.log("koi", errors);
      if (!errorMessage) return;
      setisOpen(true);
      setApiMessage(errorMessage);
    }
  };

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
        endPoint = `api/update_rolling_tm?z=${true}`;
      } else if (
        JSON.parse(window.localStorage.getItem("userinfo")).role_id === 3
      ) {
        endPoint = `api/update_rolling_tm?bu=${true}`;
      } else if (
        JSON.parse(window.localStorage.getItem("userinfo")).role_id === 10
      ) {
        endPoint = `api/update_rolling_tm?bg=${true}`;
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
          c_name: JSON.parse(window.localStorage.getItem("U_profile_name")),
          ul_name: JSON.parse(window.localStorage.getItem("U_profile_name")),
          user_id: JSON.parse(window.localStorage.getItem("userinfo")).user_id,
        };
      });
      setButtonLoadingState(true);
      const respond = await axios
        .post(`${url}/${endPoint}`, JSON.stringify({ data: data }), {
          headers: headers,
          params: {
            rp_status: status,
          },
        })
        .then((res) => {
          console.log("mkl", res);
          if (!res) return;
          setApiMessage(res.data.message);
          submitHandle(status);
        });
      // const currentTime = moment();
      // const disableLoading = moment().set({ hour: 18, minute: 0, second: 0 });
      // if (currentTime.isAfter(disableLoading)) {
      //   return;
      // } else {
      //   setButtonLoadingState(false);
      // }
      setButtonLoadingState(false);
    } catch (errors) {
      const errorMessage = errors?.response?.data?.message;

      if (!errorMessage) return;
      setisOpen(true);
      setApiMessage(errorMessage);
      setButtonLoadingState(false);
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
    console.log("koi", props.tableData);
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
            sumObject[key] = sumObject[key];
          }
        });
      });

      return sumObject;
    }
    const totalResult = sumNumericValues(props.tableData);
    setTotalNamewiseData(totalResult);
  }, [props.tableData]);

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
            sumObject[key] = "";
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

  const [depotData, setDepotData] = useState([]);
  useEffect(() => {
    if (!props.tableData.length) return;

    const sumObjectsByBrandCode = (inputArray) => {
      const sumMap = {};

      // Iterate through the input array
      inputArray.forEach((obj) => {
        const brandCode = obj["Depot"];

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
    setDepotData(result);
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
  function getLastNonEmptyElement(arr) {
    for (let i = arr.length - 1; i >= 0; i--) {
      if (arr[i] !== null && arr[i] !== undefined && arr[i] !== "") {
        return arr[i];
      }
    }
    return null; // Return null if no non-empty element is found
  }

  const [filterDropDown, setFilterDropDown] = useState("Qty");

  const getSummaryHeadingQty = (type, recievedObject) => {
    let dynamicBlock;
    if (type === "Brand") {
      dynamicBlock = props.headerData[Object.keys(props.headerData)[3]];
    } else if (type === "Category") {
      dynamicBlock = props.headerData[Object.keys(props.headerData)[1]];
    } else if (type === "Segment") {
      dynamicBlock = props.headerData[Object.keys(props.headerData)[0]];
    } else if (type === "Structure") {
      dynamicBlock = props.headerData[Object.keys(props.headerData)[29]];
    } else if (type === "Depot") {
      dynamicBlock = props.headerData[Object.keys(props.headerData)[28]];
    }

    return (
      <thead className="text-xs text-gray-700 text-center bg-gray-100  dark:text-gray-400">
        <tr>
          <th scope="col" className="px-2 py-1 text-blue-600">
            {dynamicBlock}
          </th>

          {/* <th scope="col" className="px-2 py-1 text-blue-600">
            {props.headerData[Object.keys(props.headerData)[5]]}
          </th>
          <th scope="col" className="px-2 py-1 text-blue-600">
            {props.headerData[Object.keys(props.headerData)[4]]}
          </th>
          <th scope="col" className="px-2 py-1    text-blue-600">
            {props.headerData[Object.keys(props.headerData)[43]]}
          </th> */}
          <th scope="col" className="px-2 py-1 text-blue-600">
            {props.headerData[Object.keys(props.headerData)[6]]}
          </th>
          <th scope="col" className="px-2 py-1 text-blue-600">
            {props.headerData[Object.keys(props.headerData)[8]]}
          </th>
          <th scope="col" className="px-2 py-1 text-blue-600">
            {props.headerData[Object.keys(props.headerData)[10]]}
          </th>
          <th scope="col" className="px-2 py-1 text-blue-600">
            {props.headerData[Object.keys(props.headerData)[12]]}
          </th>
          <th scope="col" className="px-2 py-1 text-blue-600">
            {props.headerData[Object.keys(props.headerData)[14]]}
          </th>
          <th scope="col" className="px-2 py-1 text-blue-600">
            {props.headerData[Object.keys(props.headerData)[15]]}
          </th>
          <th scope="col" className="px-2 py-1 text-blue-600">
            {props.headerData[Object.keys(props.headerData)[17]]}
          </th>
          {!recievedObject.tId && (
            <th scope="col" className="px-2 py-1 text-blue-600">
              {props.headerData[Object.keys(props.headerData)[37]]}
            </th>
          )}

          <th
            scope="col"
            className="px-2 py-1  bg-[#BBF7D0]  text-blue-600 border-l-2 border-r-2 border-b-2 border-blue-200 "
          >
            {props.headerData[Object.keys(props.headerData)[19]]}
          </th>
          <th
            scope="col"
            className="px-2 py-1  bg-[#BBF7D0]  text-blue-600 border-l-2 border-r-2 border-b-2 border-blue-200 "
          >
            {props.headerData[Object.keys(props.headerData)[21]]}
          </th>
          <th scope="col" className="px-2 py-1 text-blue-600 ">
            {props.headerData[Object.keys(props.headerData)[22]]}
          </th>
          <th scope="col" className="px-2 py-1 text-blue-600">
            {props.headerData[Object.keys(props.headerData)[23]]}
          </th>
          {!recievedObject?.tId && (
            <th scope="col" className="px-2 py-1 text-blue-600">
              {props.headerData[Object.keys(props.headerData)[39]]}
            </th>
          )}

          <th
            scope="col"
            className="px-2 py-1  bg-[#BBF7D0]  text-blue-600 border-l-2 border-r-2 border-b-2 border-blue-200 "
          >
            {props.headerData[Object.keys(props.headerData)[25]]}
          </th>
          <th
            scope="col"
            className="px-2 py-1  bg-[#BBF7D0]  text-blue-600 border-l-2 border-r-2 border-b-2 border-blue-200 "
          >
            {props.headerData[Object.keys(props.headerData)[27]]}
          </th>
        </tr>
      </thead>
    );
  };

  const getSummaryHeadingVal = (type, recievedObject) => {
    let dynamicBlock;
    if (type === "Brand") {
      dynamicBlock = props.headerData[Object.keys(props.headerData)[3]];
    } else if (type === "Category") {
      dynamicBlock = props.headerData[Object.keys(props.headerData)[1]];
    } else if (type === "Segment") {
      dynamicBlock = props.headerData[Object.keys(props.headerData)[0]];
    } else if (type === "Structure") {
      dynamicBlock = props.headerData[Object.keys(props.headerData)[29]];
    } else if (type === "Depot") {
      dynamicBlock = props.headerData[Object.keys(props.headerData)[28]];
    }

    return (
      <thead className="text-xs text-gray-700 text-center bg-gray-100  dark:text-gray-400 ">
        <tr>
          <th scope="col" className="px-2 py-1 text-blue-600">
            {dynamicBlock}
          </th>

          <th scope="col" className="px-2 py-1 text-blue-600">
            {props.headerData[Object.keys(props.headerData)[7]]}
          </th>
          <th scope="col" className="px-2 py-1 text-blue-600">
            {props.headerData[Object.keys(props.headerData)[9]]}
          </th>
          <th scope="col" className="px-2 py-1 text-blue-600">
            {props.headerData[Object.keys(props.headerData)[11]]}
          </th>
          <th scope="col" className="px-2 py-1 text-blue-600">
            {props.headerData[Object.keys(props.headerData)[13]]}
          </th>
          <th scope="col" className="px-2 py-1 text-blue-600">
            Empty-Column For Val
          </th>
          <th scope="col" className="px-2 py-1 text-blue-600">
            {props.headerData[Object.keys(props.headerData)[16]]}
          </th>
          <th scope="col" className="px-2 py-1 text-blue-600">
            {props.headerData[Object.keys(props.headerData)[18]]}
          </th>
          {!recievedObject.tId && (
            <th scope="col" className="px-2 py-1 text-blue-600">
              -
            </th>
          )}

          <th
            scope="col"
            className="px-2 py-1  bg-[#BBF7D0]  text-blue-600 border-l-2 border-r-2 border-b-2 border-blue-200 "
          >
            {props.headerData[Object.keys(props.headerData)[20]]}
          </th>
          <th
            scope="col"
            className="px-2 py-1  bg-[#BBF7D0]  text-blue-600 border-l-2 border-r-2 border-b-2 border-blue-200 "
          >
            Empty-Column For Val
          </th>
          <th scope="col" className="px-2 py-1 text-blue-600 ">
            Empty-Column For Val
          </th>
          <th scope="col" className="px-2 py-1 text-blue-600">
            {props.headerData[Object.keys(props.headerData)[24]]}
          </th>
          {!recievedObject?.tId && (
            <th scope="col" className="px-2 py-1 text-blue-600">
              -
            </th>
          )}

          <th
            scope="col"
            className="px-2 py-1  bg-[#BBF7D0]  text-blue-600 border-l-2 border-r-2 border-b-2 border-blue-200 "
          >
            {props.headerData[Object.keys(props.headerData)[26]]}
          </th>
          <th
            scope="col"
            className="px-2 py-1  bg-[#BBF7D0]  text-blue-600 border-l-2 border-r-2 border-b-2 border-blue-200 "
          >
            Empty-Column For Val
          </th>
        </tr>
      </thead>
    );
  };

  const handledownloadBrandExcel = (data) => {
    console.log("mlop", data);
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
  const [buttonLoadingState, setButtonLoadingState] = useState(false);
  return (
    <section className="mt-1 mb-24 outer relative flex flex-col items-center justify-center w-full font-arial">
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
              ZRT: {router.query.zrt?.map((item) => item).join(" ")}
              {console.log("poi", router.query.zrt)}
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

      <div className="table mb-4 w-full relative">
        {/* <h3>Table Layout</h3> */}
        <section className="bg-white p-2 flex flex-col gap-2">
          <div className="mx-auto max-w-full px- ">
            {/* Start coding here */}
            <div className="flex  justify-between">
              <h4 className="w-full flex align-center justify-left font-bold text-blue-600">
                Summary - Brand wise
                <TbFileDownload
                  className="text-green-600 cursor-pointer "
                  size={18}
                  onClick={() => handledownloadBrandExcel(namewiseData)}
                ></TbFileDownload>
              </h4>

              <select
                className=" max px-3 py-2 border-b border-gray-500 rounded-md bg-white focus:outline-none focus:border-b focus:border-indigo-500 w-38 "
                id="stateSelect"
                value={filterDropDown}
                onChange={(e) => setFilterDropDown(e.target.value)}
              >
                <option value="All" className="font-bold">
                  -- Select --
                </option>
                <option value="Qty" className="font-bold">
                  Qty
                </option>
                <option value="Value" className="font-bold">
                  Value
                </option>
              </select>
            </div>

            <div className="bg-white dark:bg-gray-800 relative shadow-md  overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  {filterDropDown === "Qty"
                    ? getSummaryHeadingQty("Brand", receivedObject)
                    : getSummaryHeadingVal("Brand", receivedObject)}
                  <tbody>
                    {filterDropDown === "Qty" &&
                      namewiseData.map((item) => {
                        return (
                          <tr className="border-b dark:border-gray-700 bg-white text-gray-600 text-xs">
                            <td className="px-4 py-1 text-left">
                              {item[Object.keys(item)[3]]}
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
                            <td className="px-4 py-1 text-right ">
                              {item[Object.keys(item)[17]]}
                            </td>
                            {!receivedObject?.tId && (
                              <td className="px-4 py-1 text-right">
                                {item[Object.keys(item)[37]]}
                              </td>
                            )}
                            <td className="px-2 py-1 border-l-2 border-r-2 border-blue-200 bg-[#BBF7D0]  text-right">
                              {item[Object.keys(item)[19]]}
                            </td>
                            <td className="px-2 py-1 border-l-2 border-r-2 border-blue-200 bg-[#BBF7D0] text-right">
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
                                {item[Object.keys(item)[39]]}
                              </td>
                            )}
                            <td className="px-2 py-1 border-l-2 border-r-2 border-blue-200 text-right bg-[#BBF7D0]">
                              {item[Object.keys(item)[25]]}
                            </td>
                            <td className="px-2 py-1 border-l-2 border-r-2 border-blue-200 text-right bg-[#BBF7D0]">
                              {item[Object.keys(item)[27]]}
                            </td>
                          </tr>
                        );
                      })}
                    {filterDropDown === "Qty" && (
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
                          {
                            totalNamewiseData[
                              Object.keys(totalNamewiseData)[10]
                            ]
                          }
                        </td>
                        <td className="px-4 py-1 text-right">
                          {
                            totalNamewiseData[
                              Object.keys(totalNamewiseData)[12]
                            ]
                          }
                        </td>
                        <td className="px-4 py-1 text-right">
                          {
                            totalNamewiseData[
                              Object.keys(totalNamewiseData)[14]
                            ]
                          }
                        </td>
                        <td className="px-4 py-1 text-right">
                          {
                            totalNamewiseData[
                              Object.keys(totalNamewiseData)[15]
                            ]
                          }
                        </td>
                        {console.log("hi", Object.keys(totalNamewiseData)[17])}
                        <td className="px-4 py-1 text-right">
                          {
                            totalNamewiseData[
                              Object.keys(totalNamewiseData)[17]
                            ]
                          }
                        </td>
                        {!receivedObject?.tId && (
                          <td className="px-4 py-1 text-right">
                            {
                              totalNamewiseData[
                                Object.keys(totalNamewiseData)[37]
                              ]
                            }
                          </td>
                        )}
                        <td className="px-2 py-1 border-l-2 border-r-2 border-blue-200 text-right bg-[#BBF7D0]">
                          {
                            totalNamewiseData[
                              Object.keys(totalNamewiseData)[19]
                            ]
                          }
                        </td>
                        <td className="px-2 py-1 border-l-2 border-r-2 border-blue-200 text-right bg-[#BBF7D0]">
                          {
                            totalNamewiseData[
                              Object.keys(totalNamewiseData)[21]
                            ]
                          }
                        </td>
                        <td className="px-4 py-1 text-right">
                          {
                            totalNamewiseData[
                              Object.keys(totalNamewiseData)[22]
                            ]
                          }
                        </td>
                        <td className="px-4 py-1 text-right">
                          {
                            totalNamewiseData[
                              Object.keys(totalNamewiseData)[23]
                            ]
                          }
                        </td>
                        {!receivedObject.tId && (
                          <td className="px-4 py-1 text-right">
                            {" "}
                            {
                              totalNamewiseData[
                                Object.keys(totalNamewiseData)[39]
                              ]
                            }
                          </td>
                        )}
                        <td className="px-2 py-1 border-l-2 border-r-2 border-blue-200 text-right bg-[#BBF7D0]">
                          {
                            totalNamewiseData[
                              Object.keys(totalNamewiseData)[25]
                            ]
                          }
                        </td>
                        <td className="px-2 py-1 border-l-2 border-r-2 border-blue-200 text-right bg-[#BBF7D0]">
                          {
                            totalNamewiseData[
                              Object.keys(totalNamewiseData)[27]
                            ]
                          }
                        </td>
                      </tr>
                    )}
                  </tbody>

                  <tbody>
                    {filterDropDown === "Value" &&
                      namewiseData.map((item) => {
                        return (
                          <tr className="border-b dark:border-gray-700 bg-white text-gray-600 text-xs">
                            <td className="px-4 py-1 text-left">
                              {item[Object.keys(item)[3]]}
                            </td>
                            <td className="px-4 py-1 text-right">
                              {item[Object.keys(item)[7]].toFixed(2)}
                            </td>
                            <td className="px-4 py-1 text-right">
                              {item[Object.keys(item)[9]].toFixed(2)}
                            </td>
                            <td className="px-4 py-1 text-right">
                              {item[Object.keys(item)[11]].toFixed(2)}
                            </td>
                            <td className="px-4 py-1 text-right">
                              {item[Object.keys(item)[13]].toFixed(2)}
                            </td>
                            <td className="px-4 py-1 text-right">-</td>
                            <td className="px-4 py-1 text-right">
                              {item[Object.keys(item)[16]].toFixed(2)}
                            </td>

                            <td className="px-4 py-1 text-right ">
                              {(item[Object.keys(item)[18]] / 100000).toFixed(
                                2
                              )}
                            </td>
                            {!receivedObject?.tId && (
                              <td className="px-4 py-1 text-right">-</td>
                            )}
                            <td className="px-2 py-1 border-l-2 border-r-2 border-blue-200 bg-[#BBF7D0]  text-right">
                              {(item[Object.keys(item)[20]] / 100000).toFixed(
                                2
                              )}
                            </td>
                            <td className="px-2 py-1 border-l-2 border-r-2 border-blue-200 bg-[#BBF7D0] text-right">
                              -
                            </td>
                            <td className="px-4 py-1 text-right">-</td>
                            <td className="px-4 py-1 text-right">
                              {item[Object.keys(item)[24]].toFixed(2)}
                            </td>
                            {!receivedObject.tId && (
                              <td className="px-4 py-1 text-right"> -</td>
                            )}
                            <td className="px-2 py-1 border-l-2 border-r-2 border-blue-200 text-right bg-[#BBF7D0]">
                              {(item[Object.keys(item)[26]] / 100000).toFixed(
                                2
                              )}
                            </td>
                            <td className="px-2 py-1 border-l-2 border-r-2 border-blue-200 text-right bg-[#BBF7D0]">
                              -
                            </td>
                          </tr>
                        );
                      })}

                    {filterDropDown === "Value" && (
                      <tr className="border-b dark:border-gray-700 bg-gray-100 text-gray-600 text-xs font-bold">
                        <td className="px-4 py-1 text-center whitespace-nowrap">
                          Value Total (IN Lac)
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
                          {totalNamewiseData[
                            Object.keys(totalNamewiseData)[11]
                          ]?.toFixed(2)}
                        </td>
                        <td className="px-4 py-1 text-right">
                          {totalNamewiseData[
                            Object.keys(totalNamewiseData)[13]
                          ]?.toFixed(2)}
                        </td>
                        <td className="px-4 py-1 text-right">-</td>
                        <td className="px-4 py-1 text-right">
                          {totalNamewiseData[
                            Object.keys(totalNamewiseData)[16]
                          ]?.toFixed(2)}
                        </td>

                        <td className="px-4 py-1 text-right">
                          {(
                            totalNamewiseData[
                              Object.keys(totalNamewiseData)[18]
                            ] / 100000
                          )?.toFixed(2)}
                        </td>
                        {!receivedObject?.tId && (
                          <td className="px-4 py-1 text-right">-</td>
                        )}
                        <td className="px-2 py-1 border-l-2 border-r-2 border-blue-200 text-right bg-[#BBF7D0]">
                          {(
                            totalNamewiseData[
                              Object.keys(totalNamewiseData)[20]
                            ] / 100000
                          )?.toFixed(2)}
                        </td>
                        <td className="px-2 py-1 border-l-2 border-r-2 border-blue-200 text-right bg-[#BBF7D0]">
                          -
                        </td>
                        <td className="px-4 py-1 text-right">-</td>
                        <td className="px-4 py-1 text-right">
                          {totalNamewiseData[
                            Object.keys(totalNamewiseData)[24]
                          ]?.toFixed(2)}
                        </td>
                        {!receivedObject.tId && (
                          <td className="px-4 py-1 text-right"> -</td>
                        )}
                        <td className="px-2 py-1 border-l-2 border-r-2 border-blue-200 text-right bg-[#BBF7D0]">
                          {(
                            totalNamewiseData[
                              Object.keys(totalNamewiseData)[26]
                            ] / 100000
                          )?.toFixed(2)}
                        </td>
                        <td className="px-2 py-1 border-l-2 border-r-2 border-blue-200 text-right bg-[#BBF7D0]">
                          -
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="mx-auto max-w-full ">
            {/* Start coding here */}
            <h4 className="w-full flex align-center justify-left font-bold text-blue-600">
              Summary- Product Category wise
            </h4>
            <TbFileDownload
              className="text-green-600 cursor-pointer "
              size={18}
              onClick={() => handledownloadBrandExcel(pcatwiseData)}
            ></TbFileDownload>
            <div className="bg-white dark:bg-gray-800 relative shadow-md  overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  {filterDropDown === "Qty"
                    ? getSummaryHeadingQty("Category", receivedObject)
                    : getSummaryHeadingVal("Category", receivedObject)}
                  <tbody>
                    {filterDropDown === "Qty" &&
                      pcatwiseData.map((item) => {
                        return (
                          <tr className="border-b dark:border-gray-700 bg-white text-gray-600 text-xs">
                            <td className="px-4 py-1 text-left">
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
                            <td className="px-4 py-1 text-right ">
                              {item[Object.keys(item)[17]]}
                            </td>
                            {!receivedObject?.tId && (
                              <td className="px-4 py-1 text-right">
                                {item[Object.keys(item)[37]]}
                              </td>
                            )}
                            <td className="px-2 py-1 border-l-2 border-r-2 border-blue-200 bg-[#BBF7D0]  text-right">
                              {item[Object.keys(item)[19]]}
                            </td>
                            <td className="px-2 py-1 border-l-2 border-r-2 border-blue-200 bg-[#BBF7D0] text-right">
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
                                {item[Object.keys(item)[39]]}
                              </td>
                            )}
                            <td className="px-2 py-1 border-l-2 border-r-2 border-blue-200 text-right bg-[#BBF7D0]">
                              {item[Object.keys(item)[25]]}
                            </td>
                            <td className="px-2 py-1 border-l-2 border-r-2 border-blue-200 text-right bg-[#BBF7D0]">
                              {item[Object.keys(item)[27]]}
                            </td>
                          </tr>
                        );
                      })}
                    {filterDropDown === "Qty" && (
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
                          {
                            totalNamewiseData[
                              Object.keys(totalNamewiseData)[10]
                            ]
                          }
                        </td>
                        <td className="px-4 py-1 text-right">
                          {
                            totalNamewiseData[
                              Object.keys(totalNamewiseData)[12]
                            ]
                          }
                        </td>
                        <td className="px-4 py-1 text-right">
                          {
                            totalNamewiseData[
                              Object.keys(totalNamewiseData)[14]
                            ]
                          }
                        </td>
                        <td className="px-4 py-1 text-right">
                          {
                            totalNamewiseData[
                              Object.keys(totalNamewiseData)[15]
                            ]
                          }
                        </td>
                        {console.log("hi", Object.keys(totalNamewiseData)[17])}
                        <td className="px-4 py-1 text-right">
                          {
                            totalNamewiseData[
                              Object.keys(totalNamewiseData)[17]
                            ]
                          }
                        </td>
                        {!receivedObject?.tId && (
                          <td className="px-4 py-1 text-right">
                            {
                              totalNamewiseData[
                                Object.keys(totalNamewiseData)[37]
                              ]
                            }
                          </td>
                        )}
                        <td className="px-2 py-1 border-l-2 border-r-2 border-blue-200 text-right bg-[#BBF7D0]">
                          {
                            totalNamewiseData[
                              Object.keys(totalNamewiseData)[19]
                            ]
                          }
                        </td>
                        <td className="px-2 py-1 border-l-2 border-r-2 border-blue-200 text-right bg-[#BBF7D0]">
                          {
                            totalNamewiseData[
                              Object.keys(totalNamewiseData)[21]
                            ]
                          }
                        </td>
                        <td className="px-4 py-1 text-right">
                          {
                            totalNamewiseData[
                              Object.keys(totalNamewiseData)[22]
                            ]
                          }
                        </td>
                        <td className="px-4 py-1 text-right">
                          {
                            totalNamewiseData[
                              Object.keys(totalNamewiseData)[23]
                            ]
                          }
                        </td>
                        {!receivedObject.tId && (
                          <td className="px-4 py-1 text-right">
                            {" "}
                            {
                              totalNamewiseData[
                                Object.keys(totalNamewiseData)[39]
                              ]
                            }
                          </td>
                        )}
                        <td className="px-2 py-1 border-l-2 border-r-2 border-blue-200 text-right bg-[#BBF7D0]">
                          {
                            totalNamewiseData[
                              Object.keys(totalNamewiseData)[25]
                            ]
                          }
                        </td>
                        <td className="px-2 py-1 border-l-2 border-r-2 border-blue-200 text-right bg-[#BBF7D0]">
                          {
                            totalNamewiseData[
                              Object.keys(totalNamewiseData)[27]
                            ]
                          }
                        </td>
                      </tr>
                    )}
                  </tbody>

                  <tbody>
                    {filterDropDown === "Value" &&
                      pcatwiseData.map((item) => {
                        return (
                          <tr className="border-b dark:border-gray-700 bg-white text-gray-600 text-xs">
                            <td className="px-4 py-1 text-left">
                              {item[Object.keys(item)[1]]}
                            </td>
                            <td className="px-4 py-1 text-right">
                              {item[Object.keys(item)[7]].toFixed(2)}
                            </td>
                            <td className="px-4 py-1 text-right">
                              {item[Object.keys(item)[9]].toFixed(2)}
                            </td>
                            <td className="px-4 py-1 text-right">
                              {item[Object.keys(item)[11]]?.toFixed(2)}
                            </td>
                            <td className="px-4 py-1 text-right">
                              {item[Object.keys(item)[13]]?.toFixed(2)}
                            </td>
                            <td className="px-4 py-1 text-right">-</td>
                            <td className="px-4 py-1 text-right">
                              {item[Object.keys(item)[16]]?.toFixed(2)}
                            </td>

                            <td className="px-4 py-1 text-right ">
                              {(item[Object.keys(item)[18]] / 100000)?.toFixed(
                                2
                              )}
                            </td>
                            {!receivedObject?.tId && (
                              <td className="px-4 py-1 text-right">-</td>
                            )}
                            <td className="px-2 py-1 border-l-2 border-r-2 border-blue-200 bg-[#BBF7D0]  text-right">
                              {(item[Object.keys(item)[20]] / 100000)?.toFixed(
                                2
                              )}
                            </td>
                            <td className="px-2 py-1 border-l-2 border-r-2 border-blue-200 bg-[#BBF7D0] text-right">
                              -
                            </td>
                            <td className="px-4 py-1 text-right">-</td>
                            <td className="px-4 py-1 text-right">
                              {item[Object.keys(item)[24]]?.toFixed(2)}
                            </td>
                            {!receivedObject.tId && (
                              <td className="px-4 py-1 text-right"> -</td>
                            )}
                            <td className="px-2 py-1 border-l-2 border-r-2 border-blue-200 text-right bg-[#BBF7D0]">
                              {(item[Object.keys(item)[26]] / 100000)?.toFixed(
                                2
                              )}
                            </td>
                            <td className="px-2 py-1 border-l-2 border-r-2 border-blue-200 text-right bg-[#BBF7D0]">
                              -
                            </td>
                          </tr>
                        );
                      })}
                    {filterDropDown === "Value" && (
                      <tr className="border-b dark:border-gray-700 bg-gray-100 text-gray-600 text-xs font-bold">
                        <td className="px-4 py-1 text-center whitespace-nowrap">
                          Value Total (IN Lac)
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
                          {totalNamewiseData[
                            Object.keys(totalNamewiseData)[11]
                          ]?.toFixed(2)}
                        </td>
                        <td className="px-4 py-1 text-right">
                          {totalNamewiseData[
                            Object.keys(totalNamewiseData)[13]
                          ]?.toFixed(2)}
                        </td>
                        <td className="px-4 py-1 text-right">-</td>
                        <td className="px-4 py-1 text-right">
                          {totalNamewiseData[
                            Object.keys(totalNamewiseData)[16]
                          ]?.toFixed(2)}
                        </td>

                        <td className="px-4 py-1 text-right">
                          {(
                            totalNamewiseData[
                              Object.keys(totalNamewiseData)[18]
                            ] / 100000
                          )?.toFixed(2)}
                        </td>
                        {!receivedObject?.tId && (
                          <td className="px-4 py-1 text-right">-</td>
                        )}
                        <td className="px-2 py-1 border-l-2 border-r-2 border-blue-200 text-right bg-[#BBF7D0]">
                          {(
                            totalNamewiseData[
                              Object.keys(totalNamewiseData)[20]
                            ] / 100000
                          )?.toFixed(2)}
                        </td>
                        <td className="px-2 py-1 border-l-2 border-r-2 border-blue-200 text-right bg-[#BBF7D0]">
                          -
                        </td>
                        <td className="px-4 py-1 text-right">-</td>
                        <td className="px-4 py-1 text-right">
                          {totalNamewiseData[
                            Object.keys(totalNamewiseData)[24]
                          ]?.toFixed(2)}
                        </td>
                        {!receivedObject.tId && (
                          <td className="px-4 py-1 text-right">-</td>
                        )}
                        <td className="px-2 py-1 border-l-2 border-r-2 border-blue-200 text-right bg-[#BBF7D0]">
                          {(
                            totalNamewiseData[
                              Object.keys(totalNamewiseData)[26]
                            ] / 100000
                          )?.toFixed(2)}
                        </td>
                        <td className="px-2 py-1 border-l-2 border-r-2 border-blue-200 text-right bg-[#BBF7D0]">
                          -
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="mx-auto max-w-full px- ">
            {/* Start coding here */}
            <h4 className="w-full flex align-center justify-left font-bold text-blue-600">
              Summary- Product Segment wise
              <TbFileDownload
                className="text-green-600 cursor-pointer "
                size={18}
                onClick={() => handledownloadBrandExcel(psegwiseData)}
              ></TbFileDownload>
            </h4>
            <div className="bg-white dark:bg-gray-800 relative shadow-md  overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  {filterDropDown === "Qty"
                    ? getSummaryHeadingQty("Segment", receivedObject)
                    : getSummaryHeadingVal("Segment", receivedObject)}

                  <tbody>
                    {filterDropDown === "Qty" &&
                      psegwiseData.map((item) => {
                        return (
                          <tr className="border-b dark:border-gray-700 bg-white text-gray-600 text-xs">
                            <td className="px-4 py-1 text-left">
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
                            <td className="px-4 py-1 text-right ">
                              {item[Object.keys(item)[17]]}
                            </td>
                            {!receivedObject?.tId && (
                              <td className="px-4 py-1 text-right">
                                {item[Object.keys(item)[37]]}
                              </td>
                            )}
                            <td className="px-2 py-1 border-l-2 border-r-2 border-blue-200 bg-[#BBF7D0]  text-right">
                              {item[Object.keys(item)[19]]}
                            </td>
                            <td className="px-2 py-1 border-l-2 border-r-2 border-blue-200 bg-[#BBF7D0] text-right">
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
                                {item[Object.keys(item)[39]]}
                              </td>
                            )}
                            <td className="px-2 py-1 border-l-2 border-r-2 border-blue-200 text-right bg-[#BBF7D0]">
                              {item[Object.keys(item)[25]]}
                            </td>
                            <td className="px-2 py-1 border-l-2 border-r-2 border-blue-200 text-right bg-[#BBF7D0]">
                              {item[Object.keys(item)[27]]}
                            </td>
                          </tr>
                        );
                      })}
                    {filterDropDown === "Qty" && (
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
                          {
                            totalNamewiseData[
                              Object.keys(totalNamewiseData)[10]
                            ]
                          }
                        </td>
                        <td className="px-4 py-1 text-right">
                          {
                            totalNamewiseData[
                              Object.keys(totalNamewiseData)[12]
                            ]
                          }
                        </td>
                        <td className="px-4 py-1 text-right">
                          {
                            totalNamewiseData[
                              Object.keys(totalNamewiseData)[14]
                            ]
                          }
                        </td>
                        <td className="px-4 py-1 text-right">
                          {
                            totalNamewiseData[
                              Object.keys(totalNamewiseData)[15]
                            ]
                          }
                        </td>
                        {console.log("hi", Object.keys(totalNamewiseData)[17])}
                        <td className="px-4 py-1 text-right">
                          {
                            totalNamewiseData[
                              Object.keys(totalNamewiseData)[17]
                            ]
                          }
                        </td>
                        {!receivedObject?.tId && (
                          <td className="px-4 py-1 text-right">
                            {
                              totalNamewiseData[
                                Object.keys(totalNamewiseData)[37]
                              ]
                            }
                          </td>
                        )}
                        <td className="px-2 py-1 border-l-2 border-r-2 border-blue-200 text-right bg-[#BBF7D0]">
                          {
                            totalNamewiseData[
                              Object.keys(totalNamewiseData)[19]
                            ]
                          }
                        </td>
                        <td className="px-2 py-1 border-l-2 border-r-2 border-blue-200 text-right bg-[#BBF7D0]">
                          {
                            totalNamewiseData[
                              Object.keys(totalNamewiseData)[21]
                            ]
                          }
                        </td>
                        <td className="px-4 py-1 text-right">
                          {
                            totalNamewiseData[
                              Object.keys(totalNamewiseData)[22]
                            ]
                          }
                        </td>
                        <td className="px-4 py-1 text-right">
                          {
                            totalNamewiseData[
                              Object.keys(totalNamewiseData)[23]
                            ]
                          }
                        </td>
                        {!receivedObject.tId && (
                          <td className="px-4 py-1 text-right">
                            {" "}
                            {
                              totalNamewiseData[
                                Object.keys(totalNamewiseData)[39]
                              ]
                            }
                          </td>
                        )}
                        <td className="px-2 py-1 border-l-2 border-r-2 border-blue-200 text-right bg-[#BBF7D0]">
                          {
                            totalNamewiseData[
                              Object.keys(totalNamewiseData)[25]
                            ]
                          }
                        </td>
                        <td className="px-2 py-1 border-l-2 border-r-2 border-blue-200 text-right bg-[#BBF7D0]">
                          {
                            totalNamewiseData[
                              Object.keys(totalNamewiseData)[27]
                            ]
                          }
                        </td>
                      </tr>
                    )}
                  </tbody>

                  <tbody>
                    {filterDropDown === "Value" &&
                      psegwiseData.map((item) => {
                        return (
                          <tr className="border-b dark:border-gray-700 bg-white text-gray-600 text-xs">
                            <td className="px-4 py-1 text-left">
                              {item[Object.keys(item)[0]]}
                            </td>
                            <td className="px-4 py-1 text-right">
                              {item[Object.keys(item)[7]].toFixed(2)}
                            </td>
                            <td className="px-4 py-1 text-right">
                              {item[Object.keys(item)[9]].toFixed(2)}
                            </td>
                            <td className="px-4 py-1 text-right">
                              {item[Object.keys(item)[11]]?.toFixed(2)}
                            </td>
                            <td className="px-4 py-1 text-right">
                              {item[Object.keys(item)[13]]?.toFixed(2)}
                            </td>
                            <td className="px-4 py-1 text-right">-</td>
                            <td className="px-4 py-1 text-right">
                              {item[Object.keys(item)[16]]?.toFixed(2)}
                            </td>

                            <td className="px-4 py-1 text-right ">
                              {(item[Object.keys(item)[18]] / 100000)?.toFixed(
                                2
                              )}
                            </td>
                            {!receivedObject?.tId && (
                              <td className="px-4 py-1 text-right">-</td>
                            )}
                            <td className="px-2 py-1 border-l-2 border-r-2 border-blue-200 bg-[#BBF7D0]  text-right">
                              {(item[Object.keys(item)[20]] / 100000)?.toFixed(
                                2
                              )}
                            </td>
                            <td className="px-2 py-1 border-l-2 border-r-2 border-blue-200 bg-[#BBF7D0] text-right">
                              -
                            </td>
                            <td className="px-4 py-1 text-right">-</td>
                            <td className="px-4 py-1 text-right">
                              {item[Object.keys(item)[24]]?.toFixed(2)}
                            </td>
                            {!receivedObject.tId && (
                              <td className="px-4 py-1 text-right"> -</td>
                            )}
                            <td className="px-2 py-1 border-l-2 border-r-2 border-blue-200 text-right bg-[#BBF7D0]">
                              {(item[Object.keys(item)[26]] / 100000)?.toFixed(
                                2
                              )}
                            </td>
                            <td className="px-2 py-1 border-l-2 border-r-2 border-blue-200 text-right bg-[#BBF7D0]">
                              -
                            </td>
                          </tr>
                        );
                      })}
                    {filterDropDown === "Value" && (
                      <tr className="border-b dark:border-gray-700 bg-gray-100 text-gray-600 text-xs font-bold">
                        <td className="px-4 py-1 text-center whitespace-nowrap">
                          Value Total (IN Lac)
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
                          {totalNamewiseData[
                            Object.keys(totalNamewiseData)[11]
                          ]?.toFixed(2)}
                        </td>
                        <td className="px-4 py-1 text-right">
                          {totalNamewiseData[
                            Object.keys(totalNamewiseData)[13]
                          ]?.toFixed(2)}
                        </td>
                        <td className="px-4 py-1 text-right">-</td>
                        <td className="px-4 py-1 text-right">
                          {totalNamewiseData[
                            Object.keys(totalNamewiseData)[16]
                          ]?.toFixed(2)}
                        </td>

                        <td className="px-4 py-1 text-right">
                          {(
                            totalNamewiseData[
                              Object.keys(totalNamewiseData)[18]
                            ] / 100000
                          )?.toFixed(2)}
                        </td>
                        {!receivedObject?.tId && (
                          <td className="px-4 py-1 text-right">-</td>
                        )}
                        <td className="px-2 py-1 border-l-2 border-r-2 border-blue-200 text-right bg-[#BBF7D0]">
                          {(
                            totalNamewiseData[
                              Object.keys(totalNamewiseData)[20]
                            ] / 100000
                          )?.toFixed(2)}
                        </td>
                        <td className="px-2 py-1 border-l-2 border-r-2 border-blue-200 text-right bg-[#BBF7D0]">
                          -
                        </td>
                        <td className="px-4 py-1 text-right">-</td>
                        <td className="px-4 py-1 text-right">
                          {totalNamewiseData[
                            Object.keys(totalNamewiseData)[24]
                          ]?.toFixed(2)}
                        </td>
                        {!receivedObject.tId && (
                          <td className="px-4 py-1 text-right">-</td>
                        )}
                        <td className="px-2 py-1 border-l-2 border-r-2 border-blue-200 text-right bg-[#BBF7D0]">
                          {(
                            totalNamewiseData[
                              Object.keys(totalNamewiseData)[26]
                            ] / 100000
                          )?.toFixed(2)}
                        </td>
                        <td className="px-2 py-1 border-l-2 border-r-2 border-blue-200 text-right bg-[#BBF7D0]">
                          -
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="mx-auto max-w-full px- ">
            <h4 className="w-full flex align-center justify-left font-bold text-blue-600">
              Summary-Business Structure wise
              <TbFileDownload
                className="text-green-600 cursor-pointer "
                size={18}
                onClick={() => handledownloadBrandExcel(rolewiseData)}
              ></TbFileDownload>
            </h4>
            <div className="bg-white dark:bg-gray-800 relative shadow-md  overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  {filterDropDown === "Qty"
                    ? getSummaryHeadingQty("Structure", receivedObject)
                    : getSummaryHeadingVal("Structure", receivedObject)}

                  <tbody>
                    {filterDropDown === "Qty" &&
                      rolewiseData.map((item) => {
                        return (
                          <tr className="border-b dark:border-gray-700 bg-white text-gray-600 text-xs">
                            <td className="px-4 py-1 text-left">
                              {getLastNonEmptyElement(router.query.zrt)}
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
                            <td className="px-4 py-1 text-right ">
                              {item[Object.keys(item)[17]]}
                            </td>
                            {!receivedObject?.tId && (
                              <td className="px-4 py-1 text-right">
                                {item[Object.keys(item)[37]]}
                              </td>
                            )}
                            <td className="px-2 py-1 border-l-2 border-r-2 border-blue-200 bg-[#BBF7D0]  text-right">
                              {item[Object.keys(item)[19]]}
                            </td>
                            <td className="px-2 py-1 border-l-2 border-r-2 border-blue-200 bg-[#BBF7D0] text-right">
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
                                {item[Object.keys(item)[39]]}
                              </td>
                            )}
                            <td className="px-2 py-1 border-l-2 border-r-2 border-blue-200 text-right bg-[#BBF7D0]">
                              {item[Object.keys(item)[25]]}
                            </td>
                            <td className="px-2 py-1 border-l-2 border-r-2 border-blue-200 text-right bg-[#BBF7D0]">
                              {item[Object.keys(item)[27]]}
                            </td>
                          </tr>
                        );
                      })}
                    {filterDropDown === "Qty" && (
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
                          {
                            totalNamewiseData[
                              Object.keys(totalNamewiseData)[10]
                            ]
                          }
                        </td>
                        <td className="px-4 py-1 text-right">
                          {
                            totalNamewiseData[
                              Object.keys(totalNamewiseData)[12]
                            ]
                          }
                        </td>
                        <td className="px-4 py-1 text-right">
                          {
                            totalNamewiseData[
                              Object.keys(totalNamewiseData)[14]
                            ]
                          }
                        </td>
                        <td className="px-4 py-1 text-right">
                          {
                            totalNamewiseData[
                              Object.keys(totalNamewiseData)[15]
                            ]
                          }
                        </td>
                        {console.log("hi", Object.keys(totalNamewiseData)[17])}
                        <td className="px-4 py-1 text-right">
                          {
                            totalNamewiseData[
                              Object.keys(totalNamewiseData)[17]
                            ]
                          }
                        </td>
                        {!receivedObject?.tId && (
                          <td className="px-4 py-1 text-right">
                            {
                              totalNamewiseData[
                                Object.keys(totalNamewiseData)[37]
                              ]
                            }
                          </td>
                        )}
                        <td className="px-2 py-1 border-l-2 border-r-2 border-blue-200 text-right bg-[#BBF7D0]">
                          {
                            totalNamewiseData[
                              Object.keys(totalNamewiseData)[19]
                            ]
                          }
                        </td>
                        <td className="px-2 py-1 border-l-2 border-r-2 border-blue-200 text-right bg-[#BBF7D0]">
                          {
                            totalNamewiseData[
                              Object.keys(totalNamewiseData)[21]
                            ]
                          }
                        </td>
                        <td className="px-4 py-1 text-right">
                          {
                            totalNamewiseData[
                              Object.keys(totalNamewiseData)[22]
                            ]
                          }
                        </td>
                        <td className="px-4 py-1 text-right">
                          {
                            totalNamewiseData[
                              Object.keys(totalNamewiseData)[23]
                            ]
                          }
                        </td>
                        {!receivedObject.tId && (
                          <td className="px-4 py-1 text-right">
                            {" "}
                            {
                              totalNamewiseData[
                                Object.keys(totalNamewiseData)[39]
                              ]
                            }
                          </td>
                        )}
                        <td className="px-2 py-1 border-l-2 border-r-2 border-blue-200 text-right bg-[#BBF7D0]">
                          {
                            totalNamewiseData[
                              Object.keys(totalNamewiseData)[25]
                            ]
                          }
                        </td>
                        <td className="px-2 py-1 border-l-2 border-r-2 border-blue-200 text-right bg-[#BBF7D0]">
                          {
                            totalNamewiseData[
                              Object.keys(totalNamewiseData)[27]
                            ]
                          }
                        </td>
                      </tr>
                    )}
                  </tbody>

                  <tbody>
                    {filterDropDown === "Value" &&
                      rolewiseData.map((item) => {
                        return (
                          <tr className="border-b dark:border-gray-700 bg-white text-gray-600 text-xs">
                            <td className="px-4 py-1 text-left">
                              {getLastNonEmptyElement(router.query.zrt)}
                            </td>
                            <td className="px-4 py-1 text-right">
                              {item[Object.keys(item)[7]].toFixed(2)}
                            </td>
                            <td className="px-4 py-1 text-right">
                              {item[Object.keys(item)[9]].toFixed(2)}
                            </td>
                            <td className="px-4 py-1 text-right">
                              {item[Object.keys(item)[11]]}
                            </td>
                            <td className="px-4 py-1 text-right">
                              {item[Object.keys(item)[13]]}
                            </td>
                            <td className="px-4 py-1 text-right">-</td>
                            <td className="px-4 py-1 text-right">
                              {item[Object.keys(item)[16]]}
                            </td>

                            <td className="px-4 py-1 text-right ">
                              {(item[Object.keys(item)[18]] / 100000).toFixed(
                                2
                              )}
                            </td>
                            {!receivedObject?.tId && (
                              <td className="px-4 py-1 text-right">-</td>
                            )}
                            <td className="px-2 py-1 border-l-2 border-r-2 border-blue-200 bg-[#BBF7D0]  text-right">
                              {(item[Object.keys(item)[20]] / 100000).toFixed(
                                2
                              )}
                            </td>
                            <td className="px-2 py-1 border-l-2 border-r-2 border-blue-200 bg-[#BBF7D0] text-right">
                              -
                            </td>
                            <td className="px-4 py-1 text-right">-</td>
                            <td className="px-4 py-1 text-right">
                              {(item[Object.keys(item)[24]] / 100000).toFixed(
                                2
                              )}
                            </td>
                            {!receivedObject.tId && (
                              <td className="px-4 py-1 text-right"> -</td>
                            )}
                            <td className="px-2 py-1 border-l-2 border-r-2 border-blue-200 text-right bg-[#BBF7D0]">
                              {(item[Object.keys(item)[26]] / 100000).toFixed(
                                2
                              )}
                            </td>
                            <td className="px-2 py-1 border-l-2 border-r-2 border-blue-200 text-right bg-[#BBF7D0]">
                              -
                            </td>
                          </tr>
                        );
                      })}
                    {filterDropDown === "Value" && (
                      <tr className="border-b dark:border-gray-700 bg-gray-100 text-gray-600 text-xs font-bold">
                        <td className="px-4 py-1 text-center whitespace-nowrap">
                          Value Total (IN Lac)
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
                          {totalNamewiseData[
                            Object.keys(totalNamewiseData)[11]
                          ]?.toFixed(2)}
                        </td>
                        <td className="px-4 py-1 text-right">
                          {totalNamewiseData[
                            Object.keys(totalNamewiseData)[13]
                          ]?.toFixed(2)}
                        </td>
                        <td className="px-4 py-1 text-right">-</td>
                        <td className="px-4 py-1 text-right">
                          {totalNamewiseData[
                            Object.keys(totalNamewiseData)[16]
                          ]?.toFixed(2)}
                        </td>

                        <td className="px-4 py-1 text-right">
                          {(
                            totalNamewiseData[
                              Object.keys(totalNamewiseData)[18]
                            ] / 100000
                          )?.toFixed(2)}
                        </td>
                        {!receivedObject?.tId && (
                          <td className="px-4 py-1 text-right">-</td>
                        )}
                        <td className="px-2 py-1 border-l-2 border-r-2 border-blue-200 text-right bg-[#BBF7D0]">
                          {(
                            totalNamewiseData[
                              Object.keys(totalNamewiseData)[20]
                            ] / 100000
                          )?.toFixed(2)}
                        </td>
                        <td className="px-2 py-1 border-l-2 border-r-2 border-blue-200 text-right bg-[#BBF7D0]">
                          -
                        </td>
                        <td className="px-4 py-1 text-right">-</td>
                        <td className="px-4 py-1 text-right">
                          {totalNamewiseData[
                            Object.keys(totalNamewiseData)[24]
                          ]?.toFixed(2)}
                        </td>
                        {!receivedObject.tId && (
                          <td className="px-4 py-1 text-right"> -</td>
                        )}
                        <td className="px-2 py-1 border-l-2 border-r-2 border-blue-200 text-right bg-[#BBF7D0]">
                          {(
                            totalNamewiseData[
                              Object.keys(totalNamewiseData)[26]
                            ] / 100000
                          )?.toFixed(2)}
                        </td>
                        <td className="px-2 py-1 border-l-2 border-r-2 border-blue-200 text-right bg-[#BBF7D0]">
                          -
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="mx-auto max-w-full px- ">
            {/* Start coding here */}
            <h4 className="w-full flex align-center justify-left font-bold text-blue-600">
              Summary- Depot wise
            </h4>
            <TbFileDownload
              className="text-green-600 cursor-pointer "
              size={18}
              onClick={() => handledownloadBrandExcel(depotData)}
            ></TbFileDownload>
            <div className="bg-white dark:bg-gray-800 relative shadow-md  overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  {filterDropDown === "Qty"
                    ? getSummaryHeadingQty("Depot", receivedObject)
                    : getSummaryHeadingVal("Depot", receivedObject)}

                  <tbody>
                    {filterDropDown === "Qty" &&
                      depotData.map((item) => {
                        return (
                          <tr className="border-b dark:border-gray-700 bg-white text-gray-600 text-xs">
                            <td className="px-4 py-1 text-left">
                              {item[Object.keys(item)[28]]}
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
                            <td className="px-4 py-1 text-right ">
                              {item[Object.keys(item)[17]]}
                            </td>
                            {!receivedObject?.tId && (
                              <td className="px-4 py-1 text-right">
                                {item[Object.keys(item)[37]]}
                              </td>
                            )}
                            <td className="px-2 py-1 border-l-2 border-r-2 border-blue-200 bg-[#BBF7D0]  text-right">
                              {item[Object.keys(item)[19]]}
                            </td>
                            <td className="px-2 py-1 border-l-2 border-r-2 border-blue-200 bg-[#BBF7D0] text-right">
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
                                {item[Object.keys(item)[39]]}
                              </td>
                            )}
                            <td className="px-2 py-1 border-l-2 border-r-2 border-blue-200 text-right bg-[#BBF7D0]">
                              {item[Object.keys(item)[25]]}
                            </td>
                            <td className="px-2 py-1 border-l-2 border-r-2 border-blue-200 text-right bg-[#BBF7D0]">
                              {item[Object.keys(item)[27]]}
                            </td>
                          </tr>
                        );
                      })}
                    {filterDropDown === "Qty" && (
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
                          {
                            totalNamewiseData[
                              Object.keys(totalNamewiseData)[10]
                            ]
                          }
                        </td>
                        <td className="px-4 py-1 text-right">
                          {
                            totalNamewiseData[
                              Object.keys(totalNamewiseData)[12]
                            ]
                          }
                        </td>
                        <td className="px-4 py-1 text-right">
                          {
                            totalNamewiseData[
                              Object.keys(totalNamewiseData)[14]
                            ]
                          }
                        </td>
                        <td className="px-4 py-1 text-right">
                          {
                            totalNamewiseData[
                              Object.keys(totalNamewiseData)[15]
                            ]
                          }
                        </td>
                        {console.log("hi", Object.keys(totalNamewiseData)[17])}
                        <td className="px-4 py-1 text-right">
                          {
                            totalNamewiseData[
                              Object.keys(totalNamewiseData)[17]
                            ]
                          }
                        </td>
                        {!receivedObject?.tId && (
                          <td className="px-4 py-1 text-right">
                            {
                              totalNamewiseData[
                                Object.keys(totalNamewiseData)[37]
                              ]
                            }
                          </td>
                        )}
                        <td className="px-2 py-1 border-l-2 border-r-2 border-blue-200 text-right bg-[#BBF7D0]">
                          {
                            totalNamewiseData[
                              Object.keys(totalNamewiseData)[19]
                            ]
                          }
                        </td>
                        <td className="px-2 py-1 border-l-2 border-r-2 border-blue-200 text-right bg-[#BBF7D0]">
                          {
                            totalNamewiseData[
                              Object.keys(totalNamewiseData)[21]
                            ]
                          }
                        </td>
                        <td className="px-4 py-1 text-right">
                          {
                            totalNamewiseData[
                              Object.keys(totalNamewiseData)[22]
                            ]
                          }
                        </td>
                        <td className="px-4 py-1 text-right">
                          {
                            totalNamewiseData[
                              Object.keys(totalNamewiseData)[23]
                            ]
                          }
                        </td>
                        {!receivedObject.tId && (
                          <td className="px-4 py-1 text-right">
                            {" "}
                            {
                              totalNamewiseData[
                                Object.keys(totalNamewiseData)[39]
                              ]
                            }
                          </td>
                        )}
                        <td className="px-2 py-1 border-l-2 border-r-2 border-blue-200 text-right bg-[#BBF7D0]">
                          {
                            totalNamewiseData[
                              Object.keys(totalNamewiseData)[25]
                            ]
                          }
                        </td>
                        <td className="px-2 py-1 border-l-2 border-r-2 border-blue-200 text-right bg-[#BBF7D0]">
                          {
                            totalNamewiseData[
                              Object.keys(totalNamewiseData)[27]
                            ]
                          }
                        </td>
                      </tr>
                    )}
                  </tbody>

                  <tbody>
                    {filterDropDown === "Value" &&
                      depotData.map((item) => {
                        return (
                          <tr className="border-b dark:border-gray-700 bg-white text-gray-600 text-xs">
                            <td className="px-4 py-1 text-left">
                              {item[Object.keys(item)[28]]}
                            </td>
                            <td className="px-4 py-1 text-right">
                              {item[Object.keys(item)[7]].toFixed(2)}
                            </td>
                            <td className="px-4 py-1 text-right">
                              {item[Object.keys(item)[9]].toFixed(2)}
                            </td>
                            <td className="px-4 py-1 text-right">
                              {item[Object.keys(item)[11]]?.toFixed(2)}
                            </td>
                            <td className="px-4 py-1 text-right">
                              {item[Object.keys(item)[13]]?.toFixed(2)}
                            </td>
                            <td className="px-4 py-1 text-right">-</td>
                            <td className="px-4 py-1 text-right">
                              {item[Object.keys(item)[16]]?.toFixed(2)}
                            </td>

                            <td className="px-4 py-1 text-right ">
                              {(item[Object.keys(item)[18]] / 100000)?.toFixed(
                                2
                              )}
                            </td>
                            {!receivedObject?.tId && (
                              <td className="px-4 py-1 text-right">-</td>
                            )}
                            <td className="px-2 py-1 border-l-2 border-r-2 border-blue-200 bg-[#BBF7D0]  text-right">
                              {(item[Object.keys(item)[20]] / 100000)?.toFixed(
                                2
                              )}
                            </td>
                            <td className="px-2 py-1 border-l-2 border-r-2 border-blue-200 bg-[#BBF7D0] text-right">
                              -
                            </td>
                            <td className="px-4 py-1 text-right">-</td>
                            <td className="px-4 py-1 text-right">
                              {item[Object.keys(item)[24]]?.toFixed(2)}
                            </td>
                            {!receivedObject.tId && (
                              <td className="px-4 py-1 text-right"> -</td>
                            )}
                            <td className="px-2 py-1 border-l-2 border-r-2 border-blue-200 text-right bg-[#BBF7D0]">
                              {(item[Object.keys(item)[26]] / 100000)?.toFixed(
                                2
                              )}
                            </td>
                            <td className="px-2 py-1 border-l-2 border-r-2 border-blue-200 text-right bg-[#BBF7D0]">
                              -
                            </td>
                          </tr>
                        );
                      })}
                    {filterDropDown === "Value" && (
                      <tr className="border-b dark:border-gray-700 bg-gray-100 text-gray-600 text-xs font-bold">
                        <td className="px-4 py-1 text-center whitespace-nowrap">
                          Value Total (IN Lac)
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
                          {totalNamewiseData[
                            Object.keys(totalNamewiseData)[11]
                          ]?.toFixed(2)}
                        </td>
                        <td className="px-4 py-1 text-right">
                          {totalNamewiseData[
                            Object.keys(totalNamewiseData)[13]
                          ]?.toFixed(2)}
                        </td>
                        <td className="px-4 py-1 text-right">-</td>
                        <td className="px-4 py-1 text-right">
                          {totalNamewiseData[
                            Object.keys(totalNamewiseData)[16]
                          ]?.toFixed(2)}
                        </td>

                        <td className="px-4 py-1 text-right">
                          {(
                            totalNamewiseData[
                              Object.keys(totalNamewiseData)[18]
                            ] / 100000
                          )?.toFixed(2)}
                        </td>
                        {!receivedObject?.tId && (
                          <td className="px-4 py-1 text-right">-</td>
                        )}
                        <td className="px-2 py-1 border-l-2 border-r-2 border-blue-200 text-right bg-[#BBF7D0]">
                          {(
                            totalNamewiseData[
                              Object.keys(totalNamewiseData)[20]
                            ] / 100000
                          )?.toFixed(2)}
                        </td>
                        <td className="px-2 py-1 border-l-2 border-r-2 border-blue-200 text-right bg-[#BBF7D0]">
                          -
                        </td>
                        <td className="px-4 py-1 text-right">-</td>
                        <td className="px-4 py-1 text-right">
                          {totalNamewiseData[
                            Object.keys(totalNamewiseData)[24]
                          ]?.toFixed(2)}
                        </td>
                        {!receivedObject.tId && (
                          <td className="px-4 py-1 text-right">-</td>
                        )}
                        <td className="px-2 py-1 border-l-2 border-r-2 border-blue-200 text-right bg-[#BBF7D0]">
                          {(
                            totalNamewiseData[
                              Object.keys(totalNamewiseData)[26]
                            ] / 100000
                          )?.toFixed(2)}
                        </td>
                        <td className="px-2 py-1 border-l-2 border-r-2 border-blue-200 text-right bg-[#BBF7D0]">
                          -
                        </td>
                      </tr>
                    )}
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
              disabled={buttonLoadingState}
            >
              Save as Draft
            </button>
          )}
          {(router.query.formType === "Add" ||
            router.query.formType === "Edit") &&
            (JSON.parse(window.localStorage.getItem("userinfo")).role_id ===
              5 ||
              JSON.parse(window.localStorage.getItem("userinfo")).role_id ===
                6) && (
              <button
                className="text-center rounded-md bg-orange-500 text-white py-1 px-4 text-sm"
                onClick={() => {
                  router.query.formType === "Add"
                    ? handleSaveRsp("Final Submitted")
                    : handleEditRsp("Final Submitted");
                }}
                disabled={buttonLoadingState}
              >
                Final Submit
              </button>
            )}
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
            JSON.parse(window.localStorage.getItem("userinfo")).role_id ===
              3 && (
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
            JSON.parse(window.localStorage.getItem("userinfo")).role_id ===
              4 && (
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
            JSON.parse(window.localStorage.getItem("userinfo")).role_id ===
              3 && (
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
            JSON.parse(window.localStorage.getItem("userinfo")).role_id ===
              10 && (
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
            JSON.parse(window.localStorage.getItem("userinfo")).role_id ===
              10 && (
              <button
                className="text-center rounded-md bg-red-500 text-white py-1 px-4 text-sm"
                onClick={() => {
                  // submitHandle("Region Review Done");
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
