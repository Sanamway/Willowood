 
 
import React, { useState, useEffect } from "react";
  
const GraphTable = (props) => {
  const { data, datas } = props;
  //function to get Keys
  
  const keys = Object?.keys(data[0] || []);
  
  const [resultSum, setresultSum] = useState({});
  const dataSum = (tableData) => {
    if (!tableData.length) return;
  
    // Initialize an object to store the sum of values for each key
    const sumObject = {};
  
    // Loop through each object in the data array
    data.forEach((item, index) => {
      // Loop through each key in the object
      Object.keys(item).forEach((key) => {
        // Check if the key exists in the sumObject, if not, initialize it to 0
        if (!sumObject[key]) {
          sumObject[key] = 0;
        }
  
        // Add the value of the current object's key to the sumObject's key
        sumObject[key] += Number(item[key]);
      });
    });
    setresultSum(sumObject);
  };
  
  useEffect(() => {
    dataSum(data);
  }, [data]);
  
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // let arr = [1, 2, 3, 4];
  // Array.prototype.sanam = function (cb) {
  //   let newArray = [];
  //   for (let i = 0; i < this.length; i++) {
  //     let item = this[i];
  //     newArray.push(cb(item));
  //   }
  //   return newArray;
  // };
  
  // const arrres = arr.sanam((it) => it * 2);
  // console.log("Yahoooo", arrres);
  
  // function getThis() {
  //   return this;
  // }
  
  // const obj1 = {
  //   name: "obj1",
  //   ex: () => {
  //     return this;
  //   },
  // };
  // const obj2 = { name: "obj2" };
  
  // obj1.w = obj1.ex;
  // obj2.getThis = getThis;
  
  // console.log(obj1.w); // { name: 'obj1', getThis: [Function: getThis] }
  // console.log(obj2.getThis()); // { name: 'obj2', getThis: [Function: getThis] }
  const handleFilterBrand = () => {};
  return (
    <>
      {mounted && (
        <div
          className={`overflow-x-auto chat-scrollbar select-none ${
            data.length > 10 ? "h-full" : "h-[16rem]"
          }`}
        >
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 h-full">
            <thead className="text-xs text-gray-900 text-center bg-gray-100 ">
              <tr className="">
                {props.heading === "Product Brand" && (
                  <th className="px-4 py-1 text-center text-[0.6rem]  border font-medium text-gray-800   ">
                    Product Category
                  </th>
                )}
                <th className="px-4 py-1 text-center text-[0.6rem]  border font-medium text-gray-800   ">
                  {props.heading}
                </th>
  
                {console.log("njkl", props)}
                <th className="px-4 py-1 text-center text-[0.6rem]  border font-medium text-gray-800 t">
                  FY Sales Val {(props.filterState.yr - 2) % 100} -{" "}
                  {(props.filterState.yr - 1) % 100}
                </th>
  
                <th className="px-2 py-1 text-center text-[0.6rem]  border font-medium text-gray-800   ">
                  FY Sales Val {(props.filterState.yr - 1) % 100} -{" "}
                  {props.filterState.yr % 100}
                </th>
                {props.heading === "Product Brand" && (
                  <th className="px-2 py-1 text-center text-[0.6rem]  border font-medium text-gray-800   ">
                    Annual Budget Qty
                  </th>
                )}
  
                <th className="px-2 py-1 text-center text-[0.6rem]  border font-medium text-gray-800   ">
                  Annual Budget Val
                </th>
                {props.heading === "Product Brand" && (
                  <th className="px-2 py-1 text-center text-[0.6rem]  border font-medium text-gray-800   ">
                    MTD Sale Qty
                  </th>
                )}
  
                <th className="px-2 py-1 text-center text-[0.6rem]  border font-medium text-gray-800   ">
                  MTD Budget Val
                </th>
                <th className="px-2 py-1 text-center text-[0.6rem]  border font-medium text-gray-800   ">
                  MTD RSP Value
                </th>
                <th className="px-2 py-1 text-center text-[0.6rem]   border font-medium text-gray-800   ">
                  MTD Actual Sale Value
                </th>
                <th className="px-2 py-1 text-center text-[0.6rem]  bg-green-200 border font-medium text-gray-800   ">
                  MTD Budget Achivement %
                </th>
                <th className="px-2 py-1 text-center text-[0.6rem] bg-green-200 border font-medium text-gray-800   ">
                  MTD RSP Achivement %
                </th>
                {props.heading === "Product Brand" && (
                  <th className="px-2 py-1 text-center text-[0.6rem]  border font-medium text-gray-800   ">
                    YTD Sale Qty
                  </th>
                )}
  
                <th className="px-2 py-1 text-center text-[0.6rem]  border font-medium text-gray-800   ">
                  YTD Budget Value
                </th>
  
                <th className="px-2 py-1 text-center text-[0.6rem]  border font-medium text-gray-800   ">
                  YTD RSP Value
                </th>
                <th className="px-2 py-1 text-center text-[0.6rem]  border font-medium text-gray-800   ">
                  YTD Actual Sale Value
                </th>
                <th className="px-2 py-1 text-center text-[0.6rem] bg-green-200 border font-medium text-gray-800   ">
                  YTD Budget Achivement %
                </th>
                <th className="px-2 py-1 text-center text-[0.6rem] bg-green-200 border font-medium text-gray-800   ">
                  YTD Sales Achivement %
                </th>
  
                <th className="px-2 py-1 text-center text-[0.6rem] bg-orange-100 border font-medium text-gray-800   ">
                  Anual Value Achivement %
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 break-normal ">
              {data?.length &&
                data?.map((item, index) => (
                  <tr key={index}>
                    {props.heading === "Product Brand" && (
                      <td
                        className={`px-2 text-left whitespace-nowrap
                py-1 text-[0.6rem] text-gray-900 border `}
                      >
                        {item["category"]}
                      </td>
                    )}
  
                    <td
                      className={`px-2 text-left whitespace-nowrap
                   py-1 text-[0.6rem] text-gray-900 border `}
                    >
                      {item[Object.keys(item)[0]]}
                    </td>
                    <td
                      className={`px-2 text-center whitespace-nowrap
                   py-1 text-[0.6rem] text-gray-900 border `}
                    >
                      {item[Object.keys(item)[2]]}
                    </td>
                    <td
                      className={`px-2 text-center whitespace-nowrap
                   py-1 text-[0.6rem] text-gray-900 border `}
                    >
                      {item[Object.keys(item)[4]]}
                    </td>
                    {props.heading === "Product Brand" && (
                      <td
                        className={`px-2 text-center whitespace-nowrap
                   py-1 text-[0.6rem] text-gray-900 border `}
                      >
                        {item[Object.keys(item)[5]]}
                      </td>
                    )}
  
                    <td
                      className={`px-2 text-center whitespace-nowrap
                   py-1 text-[0.6rem] text-gray-900 border `}
                    >
                      {item[Object.keys(item)[6]]}
                    </td>
                    {props.heading === "Product Brand" && (
                      <td
                        className={`px-2 text-center whitespace-nowrap
               py-1 text-[0.6rem] text-gray-900 border `}
                      >
                        {item[Object.keys(item)[33]]}
                      </td>
                    )}
  
                    <td
                      className={`px-2 text-center whitespace-nowrap
                   py-1 text-[0.6rem] text-gray-900 border `}
                    >
                      {item[Object.keys(item)[11]]}
                    </td>
                    <td
                      className={`px-2 text-center whitespace-nowrap
                   py-1 text-[0.6rem] text-gray-900 border `}
                    >
                      {item[Object.keys(item)[15]]}
                    </td>
                    <td
                      className={`px-2 text-center whitespace-nowrap
                   py-1 text-[0.6rem] text-gray-900 border `}
                    >
                      {item[Object.keys(item)[23]]}
                    </td>
                    <td
                      className={`px-2 text-center whitespace-nowrap ${
                        index == 9 || index == 10
                          ? "bg-green-200"
                          : "bg-green-200"
                      }
                  ${index == 14 || index == 15 ? "bg-green-200" : ""}
                  ${index == 16 || index == 17 ? "bg-orange-100" : ""}
                   py-1 text-[0.6rem] text-gray-900 border `}
                    >
                      {item[Object.keys(item)[11]] !== 0
                        ? (
                            (item[Object.keys(item)[23]] /
                              item[Object.keys(item)[11]]) *
                            100
                          ).toFixed(2) + " %"
                        : "0 %"}
                    </td>
                    <td
                      className={`px-2 text-center whitespace-nowrap ${
                        index == 9 || index == 10
                          ? "bg-green-200"
                          : "bg-green-200"
                      }
                  ${index == 14 || index == 15 ? "bg-green-200" : ""}
                  ${index == 16 || index == 17 ? "bg-orange-100" : ""}
                   py-1 text-[0.6rem] text-gray-900 border `}
                    >
                      {item[Object.keys(item)[15]] !== 0
                        ? (
                            (item[Object.keys(item)[23]] /
                              item[Object.keys(item)[15]]) *
                            100
                          ).toFixed(2) + " %"
                        : "0 %"}
                    </td>
                    {props.heading === "Product Brand" && (
                      <td
                        className={`px-2 text-center whitespace-nowrap
               py-1 text-[0.6rem] text-gray-900 border `}
                      >
                        {item[Object.keys(item)[7]]}
                      </td>
                    )}
  
                    <td
                      className={`px-2 text-center whitespace-nowrap
                   py-1 text-[0.6rem] text-gray-900 border `}
                    >
                      {item[Object.keys(item)[25]]}
                    </td>
                    <td
                      className={`px-2 text-center whitespace-nowrap
                   py-1 text-[0.6rem] text-gray-900 border `}
                    >
                      {item[Object.keys(item)[36]]}
                    </td>
                    <td
                      className={`px-2 text-center whitespace-nowrap
                   py-1 text-[0.6rem] text-gray-900 border `}
                    >
                      {item[Object.keys(item)[8]]}
                    </td>
                    <td
                      className={`px-2 text-center whitespace-nowrap ${
                        index == 9 || index == 10
                          ? "bg-green-200"
                          : "bg-green-200"
                      }
                  ${index == 14 || index == 15 ? "bg-green-200" : ""}
                  ${index == 16 || index == 17 ? "bg-orange-100" : ""}
                   py-1 text-[0.6rem] text-gray-900 border `}
                    >
                      {item[Object.keys(item)[25]] !== 0
                        ? (
                            (item[Object.keys(item)[8]] /
                              item[Object.keys(item)[25]]) *
                            100
                          ).toFixed(2) + " %"
                        : "0 %"}
                    </td>
  
                    <td
                      className={`px-2 text-center whitespace-nowrap ${
                        index == 9 || index == 10
                          ? "bg-green-200"
                          : "bg-green-200"
                      }
                  ${index == 14 || index == 15 ? "bg-green-200" : ""}
                  ${index == 16 || index == 17 ? "bg-orange-100" : ""}
                   py-1 text-[0.6rem] text-gray-900 border `}
                    >
                      {item[Object.keys(item)[36]] !== 0
                        ? (
                            (item[Object.keys(item)[8]] /
                              item[Object.keys(item)[36]]) *
                            100
                          ).toFixed(2) + " %"
                        : "0 %"}
                    </td>
  
                    <td
                      className={`px-2 text-center whitespace-nowrap
                   py-1 text-[0.6rem] text-gray-900 border `}
                    >
                      {item[Object.keys(item)[6]] !== 0
                        ? (
                            (item[Object.keys(item)[8]] /
                              item[Object.keys(item)[6]]) *
                            100
                          ).toFixed(2) + " %"
                        : "0 %"}
                    </td>
                  </tr>
                ))}
              {/* {data.length &&
                data?.map((item, index) => (
                  <tr key={item.id}>
                    {Object.values(item).map((value, columnIndex) => (
                      <td
                        key={columnIndex}
                        className={`px-2 text-center whitespace-nowrap ${
                          columnIndex === 9 || columnIndex === 10 ? "bg-green-200" : ""
                        }
        ${columnIndex === 14 || columnIndex === 15 ? "bg-green-200" : ""}
        ${columnIndex === 16 || columnIndex === 17 ? "bg-orange-100" : ""}
        py-1 text-[0.6rem] text-gray-900 border `}
onClick={()=> handleFilterBrand()}
                      >
                        {columnIndex === 9 || columnIndex === 10 || columnIndex === 5
                          ? ""
                          : columnIndex === 1
                          ? value
                          : columnIndex === 5
                          ? "Value2"
                          : value}
                      </td>
                    ))}
                  </tr>
                ))} */}
              <tr className="bg-gray-100">
                <td className="px-2 text-center py-1 text-[0.6rem] text-gray-900 border whitespace-nowrap">
                  Total ( All Values in Cr.)
                </td>
                {props.heading === "Product Brand" && (
                  <td className="px-2 text-center py-1 text-[0.6rem] text-gray-900 border">
                    -
                  </td>
                )}
                <td className="px-2 text-center py-1 text-[0.6rem] text-gray-900 border">
                  {parseFloat(resultSum[Object.keys(resultSum)[2]]).toFixed(2)}
                </td>
                <td className="px-2 text-center py-1 text-[0.6rem] text-gray-900 border">
                  {parseFloat(resultSum[Object.keys(resultSum)[4]]).toFixed(2)}
                </td>
                {props.heading === "Product Brand" && (
                  <td className="px-2 text-center py-1 text-[0.6rem] text-gray-900 border">
                    {parseFloat(resultSum[Object.keys(resultSum)[5]]).toFixed(
                      2
                    )}
                  </td>
                )}
                <td className="px-2 text-center py-1 text-[0.6rem] text-gray-900 border">
                  {parseFloat(resultSum[Object.keys(resultSum)[6]]).toFixed(2)}
                </td>
                {props.heading === "Product Brand" && (
                  <td className="px-2 text-center py-1 text-[0.6rem] text-gray-900 border">
                    {parseFloat(resultSum[Object.keys(resultSum)[33]]).toFixed(
                      2
                    )}
                  </td>
                )}
                <td className="px-2 text-center py-1 text-[0.6rem] text-gray-900 border">
                  {parseFloat(resultSum[Object.keys(resultSum)[11]]).toFixed(2)}
                </td>
                <td className="px-2 text-center py-1 text-[0.6rem] text-gray-900 border">
                  {parseFloat(resultSum[Object.keys(resultSum)[15]]).toFixed(2)}
                </td>
                <td className="px-2 text-center py-1 text-[0.6rem] text-gray-900 border">
                  {parseFloat(resultSum[Object.keys(resultSum)[23]]).toFixed(2)}
                </td>
                <td className="px-2 text-center py-1 text-[0.6rem] text-gray-900 border">
                  {""}
                </td>
                <td className="px-2 text-center py-1 text-[0.6rem] text-gray-900 border">
                  {""}
                </td>
                {props.heading === "Product Brand" && (
                  <td className="px-2 text-center py-1 text-[0.6rem] text-gray-900 border">
                    {parseFloat(resultSum[Object.keys(resultSum)[7]]).toFixed(
                      2
                    )}
                  </td>
                )}
                <td className="px-2 text-center py-1 text-[0.6rem] text-gray-900 border">
                  {parseFloat(resultSum[Object.keys(resultSum)[25]]).toFixed(2)}
                </td>
                <td className="px-2 text-center py-1 text-[0.6rem] text-gray-900 border">
                  {parseFloat(resultSum[Object.keys(resultSum)[36]]).toFixed(2)}
                </td>
                <td className="px-2 text-center py-1 text-[0.6rem] text-gray-900 border">
                  {parseFloat(resultSum[Object.keys(resultSum)[8]]).toFixed(2)}
                </td>
                <td className="px-2 text-center py-1 text-[0.6rem] text-gray-900 border">
                  {""}
                </td>
                <td className="px-2 text-center py-1 text-[0.6rem] text-gray-900 border">
                  {""}
                </td>
                <td className="px-2 text-center py-1 text-[0.6rem] text-gray-900 border">
                  {""}
                </td>
                <td className="px-2 text-center py-1 text-[0.6rem] text-gray-900 border">
                  {""}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};
  
export default GraphTable;
