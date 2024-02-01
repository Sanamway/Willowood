import React, { useState, useEffect } from "react";
import { TbFileDownload } from "react-icons/tb";
import { url } from "@/constants/url";
import axios from "axios";
import { useRouter } from "next/router";
import * as XLSX from "xlsx";

const RPTable = (props) => {
  const [formActive, setFormActive] = useState(false);
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
        })
      );
    } else {
      setResult(props.tableData);
    }
  }, [props.tableData]);

  const [result, setResult] = useState([]);

  const [totalSumObject, setTotalSumObject] = useState({});
  useEffect(() => {
    if (!result.length) return;
    function sumNumericValues(data) {
      const sumObject = {};
      console.log("olp", data);
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

  const handleCopyFcst = () => {
    const newArray = result.map((item) => {
      return {
        ...item,
        [Object.keys(item)[19]]: item[Object.keys(item)[17]],
        [Object.keys(item)[20]]: item[Object.keys(item)[18]],
      };
    });

    setResult(newArray);
  };

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
  return (
    <section className="mt-1 mb-24 outer flex flex-col items-center justify-center w-full font-arial ">
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
      <div className="flex items-center justify-end w-full gap-4 ">
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
      </div>
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
                      <th scope="col" className="px-2 py-1 text-blue-600">
                        {props.headerData[Object.keys(props.headerData)[0]]}
                      </th>
                      <th scope="col" className="px-2 py-1 text-blue-600">
                        {props.headerData[Object.keys(props.headerData)[3]]}
                      </th>

                      <th scope="col" className="px-2 py-1 text-blue-600">
                        {props.headerData[Object.keys(props.headerData)[5]]}
                      </th>
                      <th scope="col" className="px-2 py-1 text-blue-600">
                        {props.headerData[Object.keys(props.headerData)[4]]}
                      </th>
                      <th scope="col" className="px-2 py-1    text-blue-600">
                        {props.headerData[Object.keys(props.headerData)[43]]}
                      </th>
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
                      {router.query.depotType === "All" ? (
                        <th scope="col" className="px-2 py-1 text-blue-600">
                          {props.headerData[Object.keys(props.headerData)[28]]}
                        </th>
                      ) : (
                        ""
                      )}
                    </tr>
                  </thead>

                  <tbody>
                    {result.map((item) => {
                      return (
                        <tr className="border-b dark:border-gray-700 bg-white text-gray-600 text-xs">
                          <th
                            scope="row"
                            className="px-4  py-1 font-medium whitespace-nowrap  "
                          >
                            {item[Object.keys(item)[0]]}
                          </th>
                          <td className="px-4 py-1 text-left  whitespace-nowrap">
                            {item[Object.keys(item)[3]]}
                          </td>

                          <th
                            scope="row"
                            className="px-4  py-1 font-medium whitespace-nowrap  "
                          >
                            {item[Object.keys(item)[5]]}
                          </th>
                          <td className="px-4 py-1 text-right">
                            {item[Object.keys(item)[4]]}
                          </td>
                          <td className="px-4 py-1 text-right">
                            {item[Object.keys(item)[43]]
                              ? item[Object.keys(item)[43]].toFixed(2)
                              : "-"}
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

                          <td className="px-4 py-1 text-right">
                            {item[Object.keys(item)[17]]}
                          </td>

                          {!recievedObject?.tId && (
                            <td className="px-4 py-1 text-right">
                              {item[Object.keys(item)[37]]}
                            </td>
                          )}

                          <td
                            className={`${"px-2 py-1  text-blue-600 border-l-2 border-r-2 border-b-2 border-blue-200 text-right "} ${handleColourBlock(
                              item[Object.keys(item)[17]],
                              item[Object.keys(item)[19]]
                            )}`}
                          >
                            <input
                              type="number"
                              value={item[Object.keys(item)[19]]}
                              disabled={
                                JSON.parse(
                                  window.localStorage.getItem("userinfo")
                                ).role_id !== 6 &&
                                JSON.parse(
                                  window.localStorage.getItem("userinfo")
                                ).role_id !== 5
                              }
                              className="px-auto outline-none border-b-2 w-12 "
                              onChange={(e) =>
                                setResult(
                                  result.map((el) =>
                                    item[`${Object.keys(item)[4]}`] ===
                                    el[`${Object.keys(el)[4]}`]
                                      ? {
                                          ...el,
                                          [Object.keys(item)[19]]: e.target
                                            .value
                                            ? Number(e.target.value)
                                            : "",
                                          [Object.keys(item)[20]]:
                                            Number(e.target.value) *
                                            item[Object.keys(item)[43]],
                                        }
                                      : el
                                  )
                                )
                              }
                            />
                          </td>
                          <td className="px-2 py-1  bg-[#BBF7D0]  text-blue-600 border-l-2 border-r-2 border-b-2 border-blue-200 text-right text-right">
                            <input
                              type="number"
                              value={item[Object.keys(item)[21]]}
                              disabled={
                                JSON.parse(
                                  window.localStorage.getItem("userinfo")
                                ).role_id !== 6 &&
                                JSON.parse(
                                  window.localStorage.getItem("userinfo")
                                ).role_id !== 5
                              }
                              className="px-auto outline-none border-b-2 w-16"
                              onChange={(e) =>
                                setResult(
                                  result.map((el) =>
                                    item[`${Object.keys(item)[4]}`] ===
                                    el[`${Object.keys(el)[4]}`]
                                      ? {
                                          ...el,
                                          [Object.keys(item)[21]]: e.target
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
                          <td className="px-4 py-1 text-right">
                            {item[Object.keys(item)[22]]}
                          </td>
                          <td className="px-4 py-1 text-right">
                            {item[Object.keys(item)[23]]}
                          </td>

                          {!recievedObject.tId && (
                            <td className="px-4 py-1 text-right">
                              {item[Object.keys(item)[39]]}
                            </td>
                          )}

                          <td className="px-2 py-1  bg-[#BBF7D0]  text-blue-600 border-l-2 border-r-2 border-b-2 border-blue-200 text-right">
                            <input
                              type="number"
                              value={item[Object.keys(item)[25]]}
                              disabled={
                                JSON.parse(
                                  window.localStorage.getItem("userinfo")
                                ).role_id !== 6 &&
                                JSON.parse(
                                  window.localStorage.getItem("userinfo")
                                ).role_id !== 5
                              }
                              className="px-auto outline-none border-b-2 w-16"
                              onChange={(e) =>
                                setResult(
                                  result.map((el) =>
                                    item[`${Object.keys(item)[4]}`] ===
                                    el[`${Object.keys(el)[4]}`]
                                      ? {
                                          ...el,
                                          [Object.keys(item)[25]]: e.target
                                            .value
                                            ? Number(e.target.value)
                                            : "",
                                          [Object.keys(item)[26]]:
                                            Number(e.target.value) *
                                            item[Object.keys(item)[43]],
                                        }
                                      : el
                                  )
                                )
                              }
                            />
                          </td>
                          <td className="px-2 py-1  bg-[#BBF7D0]  text-blue-600 border-l-2 border-r-2 border-b-2 border-blue-200 text-right ">
                            <input
                              value={item[Object.keys(item)[27]]}
                              className="px-auto outline-none border-b-2 w-16"
                              type="number"
                              disabled={
                                JSON.parse(
                                  window.localStorage.getItem("userinfo")
                                ).role_id !== 6 &&
                                JSON.parse(
                                  window.localStorage.getItem("userinfo")
                                ).role_id !== 5
                              }
                              onChange={(e) =>
                                setResult(
                                  result.map((el) =>
                                    item[`${Object.keys(item)[4]}`] ===
                                    el[`${Object.keys(el)[4]}`]
                                      ? {
                                          ...el,
                                          [Object.keys(item)[27]]: e.target
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
                          {router.query.depotType === "All" ? (
                            <td className="px-4 py-1 text-right">
                              {item[Object.keys(item)[28]]}
                            </td>
                          ) : (
                            ""
                          )}
                        </tr>
                      );
                    })}

                    <tr className="border-b dark:border-gray-700 bg-gray-100 text-gray-600 text-xs font-bold">
                      <td className="px-4 py-1 text-left  whitespace-nowrap">
                        QTY
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
                      <td className="px-4 py-1 text-right">-</td>
                      <td className="px-2 py-1    text-blue-600  text-right ">
                        -
                      </td>
                      <td className="px-4 py-1 text-right">
                        {totalSumObject[Object.keys(totalSumObject)[6]]}
                      </td>
                      <td className="px-4 py-1 text-right">
                        {totalSumObject[Object.keys(totalSumObject)[8]]}
                      </td>
                      <td className="px-4 py-1 text-right">
                        {totalSumObject[Object.keys(totalSumObject)[10]]}
                      </td>
                      <td className="px-4 py-1 text-right">
                        {totalSumObject[Object.keys(totalSumObject)[12]]}
                      </td>
                      <td className="px-4 py-1 text-right">
                        {totalSumObject[Object.keys(totalSumObject)[14]]}
                      </td>
                      <td className="px-4 py-1 text-right">
                        {totalSumObject[Object.keys(totalSumObject)[15]]}
                      </td>
                      {console.log("hi", Object.keys(totalSumObject)[17])}
                      <td className="px-4 py-1 text-right">
                        {totalSumObject[Object.keys(totalSumObject)[17]]}
                      </td>

                      {/* {console.log("hello", recievedObject)} */}
                      {!recievedObject?.tId && (
                        <td className="px-4 py-1 text-right">
                          {totalSumObject[Object.keys(totalSumObject)[37]]}
                        </td>
                      )}

                      <td className="px-2 py-1  bg-[#BBF7D0]  text-blue-600 border-l-2 border-r-2 border-b-2 border-blue-200  text-right">
                        <input
                          type="number"
                          value={
                            totalSumObject[Object.keys(totalSumObject)[19]]
                          }
                          disabled={true}
                          className="px-auto outline-none border-b-2 w-12 "
                        />
                      </td>
                      <td className="px-2 py-1  bg-[#BBF7D0]  text-blue-600 border-l-2 border-r-2 border-b-2 border-blue-200  text-right">
                        <input
                          type="number"
                          value={
                            totalSumObject[Object.keys(totalSumObject)[21]]
                          }
                          disabled={true}
                          className="px-auto outline-none border-b-2 w-16"
                        />
                      </td>
                      <td className="px-4 py-1 text-right">
                        {totalSumObject[Object.keys(totalSumObject)[22]]}
                      </td>
                      <td className="px-4 py-1 text-right">
                        {totalSumObject[Object.keys(totalSumObject)[23]]}
                      </td>

                      {!recievedObject.tId && (
                        <td className="px-4 py-1 text-right">
                          {totalSumObject[Object.keys(totalSumObject)[39]]}
                        </td>
                      )}

                      <td className="px-2 py-1  bg-[#BBF7D0]  text-blue-600 border-l-2 border-r-2 border-b-2 border-blue-200  text-right">
                        <input
                          type="number"
                          value={
                            totalSumObject[Object.keys(totalSumObject)[25]]
                          }
                          disabled={true}
                          className="px-auto outline-none border-b-2 w-16"
                        />
                      </td>
                      <td className="px-2 py-1  bg-[#BBF7D0]  text-blue-600 border-l-2 border-r-2 border-b-2 border-blue-200 text-right ">
                        <input
                          value={
                            totalSumObject[Object.keys(totalSumObject)[27]]
                          }
                          className="px-auto outline-none border-b-2 w-16"
                          type="number"
                          disabled={true}
                        />
                      </td>
                    </tr>

                    <tr className="border-b dark:border-gray-700 bg-gray-100 text-gray-600 text-xs font-bold">
                      <td
                        scope="row"
                        className="px-4 py-1 text-left  whitespace-nowrap"
                      >
                        Value Total(in LAC)
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
                      <td className="px-4 py-1 text-right">-</td>
                      <td className="px-2 py-1    text-blue-600 text-right ">
                        -
                      </td>
                      <td className="px-4 py-1 text-right">
                        {totalSumObject[
                          Object.keys(totalSumObject)[7]
                        ]?.toFixed(2)}
                      </td>
                      <td className="px-4 py-1 text-right">
                        {totalSumObject[
                          Object.keys(totalSumObject)[9]
                        ]?.toFixed(2)}
                      </td>
                      <td className="px-4 py-1 text-right">
                        {totalSumObject[
                          Object.keys(totalSumObject)[11]
                        ]?.toFixed(2)}
                      </td>
                      <td className="px-4 py-1 text-right">
                        {totalSumObject[
                          Object.keys(totalSumObject)[13]
                        ]?.toFixed(2)}
                      </td>

                      <td className="px-4 py-1 text-right">-</td>
                      <td className="px-4 py-1 text-right">
                        {totalSumObject[
                          Object.keys(totalSumObject)[16]
                        ]?.toFixed(2)}
                      </td>

                      <td className="px-4 py-1 text-right">
                        {(
                          totalSumObject[Object.keys(totalSumObject)[18]] /
                          100000
                        )?.toFixed(2)}
                      </td>

                      {/* {console.log("hello", recievedObject)} */}
                      {!recievedObject?.tId && (
                        <td className="px-4 py-1 text-right">
                          {/* {totalSumObject[
                          Object.keys(totalSumObject)[20]
                        ]?.toFixed(2)} */}
                          -
                        </td>
                      )}

                      <td className="px-2 py-1  bg-[#BBF7D0]  text-blue-600 border-l-2 border-r-2 border-b-2 border-blue-200 text-right">
                        {(
                          totalSumObject[Object.keys(totalSumObject)[20]] /
                          100000
                        )?.toFixed(2)}
                      </td>
                      <td className="px-2 py-1  bg-[#BBF7D0]  text-blue-600 border-l-2 border-r-2 border-b-2 border-blue-200 text-right">
                        -
                      </td>
                      <td className="px-4 py-1 text-right">-</td>
                      <td className="px-4 py-1 text-right">
                        {totalSumObject[
                          Object.keys(totalSumObject)[24]
                        ]?.toFixed(2)}
                      </td>

                      {!recievedObject.tId && (
                        <td className="px-4 py-1 text-right">
                          {totalSumObject[
                            Object.keys(totalSumObject)[39]
                          ]?.toFixed(2)}
                        </td>
                      )}

                      <td className="px-2 py-1  bg-[#BBF7D0]  text-blue-600 border-l-2 border-r-2 border-b-2 border-blue-200  text-right">
                        <input
                          type="number"
                          value={(
                            totalSumObject[Object.keys(totalSumObject)[26]] /
                            100000
                          )?.toFixed(2)}
                          disabled={true}
                          className="px-auto outline-none border-b-2 w-16"
                        />
                      </td>
                      <td className="px-2 py-1  bg-[#BBF7D0]  text-blue-600 border-l-2 border-r-2 border-b-2 border-blue-200 text-right ">
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
        <div className="flex items-center justify-end w-full gap-4 ">
          <button
            onClick={() => {
              router.push("/rollingplans");
            }}
            className="text-center rounded-md bg-blue-500 text-white py-1 px-4 text-sm"
          >
            Back to Rolling Page
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

          <button
            onClick={() => {
              props.setTableData(result);
              props.formType("RPSummary");
            }}
            className="text-center  w-[8.5em] rounded-md bg-orange-500 text-white py-1 px-4 text-sm"
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
};

export default RPTable;
