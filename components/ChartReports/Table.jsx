// import React, { useState, useEffect } from "react";
// import { TbFileDownload } from "react-icons/tb";
// import { url } from "@/constants/url";
// import axios from "axios";
// import { useRouter } from "next/router";
// import * as XLSX from "xlsx";

// const Table = (props) => {
//   const router = useRouter()
//   return (
//     <>
//     {/* add table here  */}
//       <div>Table</div> 
// {/* add table here  */}
//       <div className="mt-12 flex items-center justify-end mx-8 gap-4">
//         <button
//           onClick={() => {
//             router.push("/chartreports");
//           }}
//           className="text-center rounded-md bg-blue-500 text-white py-1 px-4 text-sm"
//         >
//           Back 
//         </button>
//         <button
//           onClick={() => {
//             props.formType("BusinessChart");
//           }}
//           className="text-center rounded-md bg-orange-500 text-white py-1 px-4 text-sm"
//         >
//           Next
//         </button>
//       </div>
//     </>
//   );
// };

// export default Table;



import React, { useState, useEffect } from "react";
import { TbFileDownload } from "react-icons/tb";
import { url } from "@/constants/url";
import axios from "axios";
import { useRouter } from "next/router";
import * as XLSX from "xlsx";

const Table = (props) => {
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

  console.log("Fie", result);
  let alteredObjects = [];

  // Assuming the length of both arrays is the same

  // const getCompanyInfo = async () => {
  //   console.log("lki");
  //   try {
  //     const respond = await axios.post(
  //       `${url}/api/rsp_download?year_1=2023&year_2=2023&year_3=2023&year_2_cm=2023-04&year_2_nm=2023-05&year_3_cm=2023-04&year_3_nm=2023-05`,
  //       {
  //         headers: headers,
  //       }
  //     );
  //     const apires = await respond.data.data;

  //     console.log("shami", respond);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   getCompanyInfo();
  // }, []);

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
  return (
    <section className="mt-1 mb-24 outer flex flex-col items-center justify-center w-full font-arial overflow-x-auto ">
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
          <div className="flex flex-row gap-2 ">
            {" "}
            <TbFileDownload
              className="text-green-600 cursor-pointer "
              size={18}
              onClick={() => handledownloadExcel(result)}
            ></TbFileDownload>
            <div className="text-xs whitespace-nowrap">Download XLS</div>
          </div>
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
        <section className="bg-white p-2">
          {/* <div className="mx-auto max-w-screen-2xl px-4 lg:px-12"> */}
          <div className="mx-auto max-w-full px- ">
            {/* Start coding here */}
            <div className="bg-white dark:bg-gray-800 relative shadow-md  overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 text-center bg-orange-300  dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-2 py-1 text-black">
                        Product Name Sku Wise
                      </th>
                      <th scope="col" className="px-2 py-1 text-black">
                        Product Code
                      </th>
                      <th scope="col" className="px-2 py-1 text-black">
                        FY Sales 21-22
                      </th>
                      <th scope="col" className="px-2 py-1 text-black">
                        FY Sales 22-23
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
                      <th scope="col" className="px-2 py-1 text-black">
                        Apr 23-24 Revised FCST Value
                      </th>
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
                      <th scope="col" className="px-2 py-1 text-black">
                        May Net FCST Qty 23-24
                      </th>
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
                    {console.log("nhj", result)}

                    {result.map((item) => {
                      return (
                        <tr className="border-b dark:border-gray-700 bg-white text-gray-600 text-xs">
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
                            {item[Object.keys(item)[7]]}
                          </td>
                          <td className="px-4 py-1 text-right">
                            {item[Object.keys(item)[9]]}
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
                          <td className="px-4 py-1 text-right">
                            {item[Object.keys(item)[18]]}
                          </td>
                          <td className="px-2 py-1 border-l-2 border-r-2 border-red-400 text-right">
                            <input
                              type="number"
                              value={item[Object.keys(item)[19]]}
                              className="px-auto outline-none border-b-2 w-12 "
                              onChange={(e) =>
                                setResult(
                                  result.map((el) =>
                                    item[`${Object.keys(item)[4]}`] ===
                                    el[`${Object.keys(el)[4]}`]
                                      ? {
                                          ...el,
                                          [Object.keys(item)[19]]:
                                            e.target.value,
                                        }
                                      : el
                                  )
                                )
                              }
                            />
                          </td>
                          <td className="px-2 py-1 border-l-2 border-r-2 border-red-400 text-right">
                            <input
                              type="number"
                              value={item[Object.keys(item)[21]]}
                              className="px-auto outline-none border-b-2 w-16"
                              onChange={(e) =>
                                setResult(
                                  result.map((el) =>
                                    item[`${Object.keys(item)[4]}`] ===
                                    el[`${Object.keys(el)[4]}`]
                                      ? {
                                          ...el,
                                          [Object.keys(item)[21]]:
                                            e.target.value,
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
                          <td className="px-4 py-1 text-right">
                            {item[Object.keys(item)[24]]}
                          </td>
                          <td className="px-2 py-1 border-l-2 border-r-2 border-red-400 text-right">
                            <input
                              type="number"
                              value={item[Object.keys(item)[25]]}
                              className="px-auto outline-none border-b-2 w-16"
                              onChange={(e) =>
                                setResult(
                                  result.map((el) =>
                                    item[`${Object.keys(item)[4]}`] ===
                                    el[`${Object.keys(el)[4]}`]
                                      ? {
                                          ...el,
                                          [Object.keys(item)[25]]:
                                            e.target.value,
                                        }
                                      : el
                                  )
                                )
                              }
                            />
                          </td>
                          <td className="px-2 py-1 border-l-2 border-r-2 border-red-400 text-right">
                            <input
                              value={item[Object.keys(item)[27]]}
                              className="px-auto outline-none border-b-2 w-16"
                              type="number"
                              onChange={(e) =>
                                setResult(
                                  result.map((el) =>
                                    item[`${Object.keys(item)[4]}`] ===
                                    el[`${Object.keys(el)[4]}`]
                                      ? {
                                          ...el,
                                          [Object.keys(item)[27]]:
                                            e.target.value,
                                        }
                                      : el
                                  )
                                )
                              }
                            />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>

                <div className=" text-black text-xs font-bold w-1/4">
                  {/* Display the sum values */}
                  <p className=" flex justify-between">
                    <span className="w-full">
                      {" "}
                      Dec 23-24 Revised Fcst Qty Sum:{" "}
                    </span>

                    <small className="text-xs">
                      {sumValues["Dec 23-24 Revised Fcst Qty"]}
                    </small>
                  </p>
                  <p className=" flex justify-between">
                    <span className="w-full"> Dec 23-24 Urgent Qty Sum: </span>

                    <small className="text-xs">
                      {sumValues["Dec 23-24 Urgent Qty"]}
                    </small>
                  </p>
                  <p className=" flex justify-between">
                    <span className="w-full"> Jan 23-24 Fcst Qty Sum:</span>

                    <small className="text-xs">
                      {sumValues["Jan 23-24 Fcst Qty"]}
                    </small>
                  </p>
                  <p className=" flex justify-between">
                    <span className="w-full"> Expected Return Qty Sum:</span>

                    <small className="text-xs">
                      {sumValues["Expected Return Qty"]}
                    </small>
                  </p>

                  <p className=" flex justify-between">
                    <span className="w-full">No of Rows Count: </span>

                    <small className="text-xs">{result.length}</small>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className="my-2 flex self-end ">
        <div className="flex items-center justify-end w-full gap-4 ">
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

export default Table;

