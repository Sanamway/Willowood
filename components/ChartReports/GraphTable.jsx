import React, { useState, useEffect } from "react";

const GraphTable = (props) => {
  const { data, datas } = props;

  //function to get Keys

 
  const  keys = Object?.keys(data[0] ||[])
   console.log("ur",keys[2])



  const [resultSum, setresultSum] = useState({
    "FY Sales Val 21-22": 0,
    "FY Sales Val 22-23": 0,
    "Annual Budget Qty": 0,
    "Annual Budget Val": 0,
    "MTD Sale Qty": 0,
    "MTD Budget Val": 0,
    "Dec 23-24 Revised Fcst Val": 0,
    "Dec Budget Val 23-24": 0,
    "MTD Actual Sale Value": 0,
    "YTD Sale Qty": 0,
    "YTD Budget Value": 0,
    "YTD Actual Sale Value": 0,
    "Ytd Net Sale Qty  23-24": 0,
   " MTD_sale": 0,
    "Ytd Net Sale Value  23-24": 0
  });

  const calculateSum = (data) => {
    
    const sum = data.reduce(
      (acc, entry) => {
        acc["FY Sales Val 21-22"] += Number(entry["FY Sales Val 21-22"]) || 0;
        acc["FY Sales Val 22-23"] += Number(entry["FY Sales Val 22-23"]) || 0;
        acc["Annual Budget_Qty"] += Number(entry["Annual Budget Qty"]) || 0;
        acc["Annual Budget Val"] += Number(entry["Annual Budget Val"]) || 0;
        acc["MTD Sale Qty"] += Number(entry["MTD Sale Qty"]) || 0;
        acc["MTD Budget Val"] += Number(entry["MTD Budget Val"]) || 0;
        acc["Dec 23-24 Revised Fcst Val"] += Number(entry["Dec 23-24 Revised Fcst Val"]) || 0;
        acc["Dec Budget Val 23-24"] += Number(entry["Dec Budget Val 23-24"]) || 0;
        acc["MTD Actual Sale Value"] += Number(entry["MTD Actual Sale Value"]) || 0;
        acc["YTD Sale Qty"] += Number(entry["YTD Sale Qty"]) || 0;
        acc["YTD Budget Value"] += Number(entry["YTD Budget Value"]) || 0;
        acc["YTD Actual Sale Value"] += Number(entry["YTD Actual Sale Value"]) || 0;
        acc["MTD_sale"] += Number(entry["MTD_sale"]) || 0;
        acc["Ytd Net Sale Qty  23-24"] += Number(entry["Ytd Net Sale Qty  23-24"]) || 0;
        acc["Ytd Net Sale Value  23-24"] += Number(entry["Ytd Net Sale Value  23-24"]) || 0;
        return acc;
      },
      {
        "FY Sales Val 21-22": 0,
        "FY Sales Val 22-23": 0,
        "Annual Budget Qty": 0,
        "Annual Budget Val": 0,
        "MTD Sale Qty": 0,
        "MTD Budget Val": 0,
        "Dec Budget Val 23-24": 0,
        "Dec 23-24 Revised Fcst Val": 0,
        "MTD Actual Sale Value": 0,
        "YTD Sale Qty": 0,
        "YTD Budget Value": 0,
        "YTD Actual Sale Value": 0,
        "MTD_sale": 0,
        "Ytd Net Sale Qty  23-24": 0,
        "Ytd Net Sale Value  23-24": 0
      }
    );

    setresultSum(sum);
  };

  useEffect(() => {
    if (!data.length) return;
    calculateSum(data);
  }, [data]);

  
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {mounted && (
        <div className="overflow-x-auto chat-scrollbar select-none h-[16rem] ">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
            <thead className="text-xs text-gray-900 text-center bg-gray-100 ">
              <tr className="">
                <th className="px-4 py-1 text-center text-[0.6rem]  border font-medium text-gray-800   ">
                  {props.heading}
                </th>

                <th className="px-4 py-1 text-center text-[0.6rem]  border font-medium text-gray-800 t">
                  FY Sales Val 21-22
                </th>

                <th className="px-2 py-1 text-center text-[0.6rem]  border font-medium text-gray-800   ">
                  FY Sales Val 22-23
                </th>

                <th className="px-2 py-1 text-center text-[0.6rem]  border font-medium text-gray-800   ">
                  Annual Budget Qty
                </th>
                <th className="px-2 py-1 text-center text-[0.6rem]  border font-medium text-gray-800   ">
                  Annual Budget Val
                </th>
                <th className="px-2 py-1 text-center text-[0.6rem]  border font-medium text-gray-800   ">
                  MTD Sale Qty
                </th>
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
                <th className="px-2 py-1 text-center text-[0.6rem]  border font-medium text-gray-800   ">
                  YTD Sale Qty
                </th>
                <th className="px-2 py-1 text-center text-[0.6rem]  border font-medium text-gray-800   ">
                  YTD Budget Value
                </th>
                <th className="px-2 py-1 text-center text-[0.6rem]  border font-medium text-gray-800   ">
                  YTD Actual Sale Value
                </th>
                <th className="px-2 py-1 text-center text-[0.6rem] bg-green-200 border font-medium text-gray-800   ">
                  YTD Budget Achivement %
                </th>
                <th className="px-2 py-1 text-center text-[0.6rem] bg-green-200 border font-medium text-gray-800   ">
                  YTD RSP Achivement %
                </th>
                <th className="px-2 py-1 text-center text-[0.6rem]  bg-orange-100 border font-medium text-gray-800   ">
                  Anual Qty Achivement %
                </th>
                <th className="px-2 py-1 text-center text-[0.6rem] bg-orange-100 border font-medium text-gray-800   ">
                  Anual Value Achivement %
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 break-normal ">
              {data?.length &&
                data?.map((item, index) => (
                  <tr key={item.id}>
                    <td
                      key={item}
                      className={`px-2 text-left whitespace-nowrap
                   py-1 text-[0.6rem] text-gray-900 border `}
                    >
                      {item[Object.keys(item)[0]]}
                    </td>
                    <td
                      key={item}
                      className={`px-2 text-center whitespace-nowrap
                   py-1 text-[0.6rem] text-gray-900 border `}
                    >
                      {item[Object.keys(item)[2]]}
                    </td>
                    <td
                      key={item}
                      className={`px-2 text-center whitespace-nowrap
                   py-1 text-[0.6rem] text-gray-900 border `}
                    >
                      {item[Object.keys(item)[4]]}
                    </td>
                    <td
                      key={item}
                      className={`px-2 text-center whitespace-nowrap 
                   py-1 text-[0.6rem] text-gray-900 border `}
                    >
                      {item[Object.keys(item)[5]]}
                    </td>
                    <td
                      key={item}
                      className={`px-2 text-center whitespace-nowrap 
                   py-1 text-[0.6rem] text-gray-900 border `}
                    >
                      {item[Object.keys(item)[6]]}
                    </td>
                    <td
                      key={item}
                      className={`px-2 text-center whitespace-nowrap 
                   py-1 text-[0.6rem] text-gray-900 border `}
                    >
                      {item[Object.keys(item)[""]]}
                    </td>
                    <td
                      key={item}
                      className={`px-2 text-center whitespace-nowrap 
                   py-1 text-[0.6rem] text-gray-900 border `}
                    >
                      {item[Object.keys(item)[11]]}
                    </td>
                    <td
                      key={item}
                      className={`px-2 text-center whitespace-nowrap 
                   py-1 text-[0.6rem] text-gray-900 border `}
                    >
                      {item[Object.keys(item)[15]]}
                    </td>
                    <td
                      key={item}
                      className={`px-2 text-center whitespace-nowrap 
                   py-1 text-[0.6rem] text-gray-900 border `}
                    >
                      {item[Object.keys(item)[23]]}
                    </td>
                    <td
                      key={item}
                      className={`px-2 text-center whitespace-nowrap ${
                        index == 9 || index == 10 ? "bg-green-200" : "bg-green-200"
                      }
                  ${index == 14 || index == 15 ? "bg-green-200" : ""}
                  ${index == 16 || index == 17 ? "bg-orange-100" : ""}
                   py-1 text-[0.6rem] text-gray-900 border `}
                    >
                      {item[Object.keys(item)[11]] !== 0
                        ? ((item[Object.keys(item)[23]] / item[Object.keys(item)[11]]) * 100).toFixed(2) +
                          " %"
                        : "0 %"}
                    </td>
                    <td
                      key={item}
                      className={`px-2 text-center whitespace-nowrap ${
                        index == 9 || index == 10 ? "bg-green-200" : "bg-green-200"
                      }
                  ${index == 14 || index == 15 ? "bg-green-200" : ""}
                  ${index == 16 || index == 17 ? "bg-orange-100" : ""}
                   py-1 text-[0.6rem] text-gray-900 border `}
                    >
                      {item[Object.keys(item)[15]] !== 0
                        ? ((item[Object.keys(item)[23]] / item[Object.keys(item)[15]]) * 100).toFixed(2) +
                          " %"
                        : "0 %"}
                    </td>

                    <td
                      key={item}
                      className={`px-2 text-center whitespace-nowrap 
                   py-1 text-[0.6rem] text-gray-900 border `}
                    >
                      {item[Object.keys(item)[7]]}
                    </td>
                    <td
                      key={item}
                      className={`px-2 text-center whitespace-nowrap
                   py-1 text-[0.6rem] text-gray-900 border `}
                    >
                      {item[Object.keys(item)[25]]}
                    </td>
                    <td
                      key={item}
                      className={`px-2 text-center whitespace-nowrap 
                   py-1 text-[0.6rem] text-gray-900 border `}
                    >
                      {item[Object.keys(item)[8]]}
                    </td>
                    <td
                      key={item}
                      className={`px-2 text-center whitespace-nowrap ${
                        index == 9 || index == 10 ? "bg-green-200" : "bg-green-200"
                      }
                  ${index == 14 || index == 15 ? "bg-green-200" : ""}
                  ${index == 16 || index == 17 ? "bg-orange-100" : ""}
                   py-1 text-[0.6rem] text-gray-900 border `}
                    >
                       {item[Object.keys(item)[25]] !== 0
                        ? ((item[Object.keys(item)[8]] / item[Object.keys(item)[25]]) * 100).toFixed(2) +
                          " %"
                        : "0 %"}
                    </td>
                    <td
                      key={item}
                      className={`px-2 text-center whitespace-nowrap ${
                        index == 9 || index == 10 ? "bg-green-200" : "bg-green-200"
                      }
                  ${index == 14 || index == 15 ? "bg-green-200" : ""}
                  ${index == 16 || index == 17 ? "bg-orange-100" : ""}
                   py-1 text-[0.6rem] text-gray-900 border `}
                    >
                      {'0%'}
                      {/* {item[Object.keys(item)["%"]]} */}
                    </td>
                    <td
                      key={item}
                      className={`px-2 text-center whitespace-nowrap 
                   py-1 text-[0.6rem] text-gray-900 border `}
                    >
                       {item[Object.keys(item)[5]] !== 0
                        ? ((item[Object.keys(item)[7]] / item[Object.keys(item)[5]]) * 100).toFixed(2) +
                          " %"
                        : "0 %"}
                    </td>
                    <td
                      key={item}
                      className={`px-2 text-center whitespace-nowrap 
                   py-1 text-[0.6rem] text-gray-900 border `}
                    >
                      {item[Object.keys(item)[6]] !== 0
                        ? ((item[Object.keys(item)[8]] / item[Object.keys(item)[6]]) * 100).toFixed(2) +
                          " %"
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
                <td className="px-2 text-center py-1 text-[0.6rem] text-gray-900 border">
                  {parseFloat(resultSum["FY Sales Val 21-22"]).toFixed(2)}
                </td>
                <td className="px-2 text-center py-1 text-[0.6rem] text-gray-900 border">
                  {parseFloat(resultSum["FY Sales Val 22-23"]).toFixed(2)}
                </td>
                <td className="px-2 text-center py-1 text-[0.6rem] text-gray-900 border">
                  {parseFloat(resultSum["Annual Budget Qty"])}
                </td>
                <td className="px-2 text-center py-1 text-[0.6rem] text-gray-900 border">
                  {parseFloat(resultSum["Annual Budget Val"])}
                </td>
                <td className="px-2 text-center py-1 text-[0.6rem] text-gray-900 border">{""}</td>
                <td className="px-2 text-center py-1 text-[0.6rem] text-gray-900 border">
                  {parseFloat(resultSum["Dec Budget Val 23-24"])}
                </td>
                <td className="px-2 text-center py-1 text-[0.6rem] text-gray-900 border">
                  {parseFloat(resultSum["Dec 23-24 Revised Fcst Val"])}
                </td>
                <td className="px-2 text-center py-1 text-[0.6rem] text-gray-900 border">
                  {parseFloat(resultSum["MTD_sale"])}
                </td>
                <td className="px-2 text-center py-1 text-[0.6rem] text-gray-900 border">{""}</td>
                <td className="px-2 text-center py-1 text-[0.6rem] text-gray-900 border">{""}</td>
                <td className="px-2 text-center py-1 text-[0.6rem] text-gray-900 border">
                  {parseFloat(resultSum["Ytd Net Sale Qty  23-24"])}
                </td>
                <td className="px-2 text-center py-1 text-[0.6rem] text-gray-900 border">
                  {parseFloat(resultSum["YTD Budget Value"])}
                </td>
                <td className="px-2 text-center py-1 text-[0.6rem] text-gray-900 border">
                  {parseFloat(resultSum["Ytd Net Sale Value  23-24"])}
                </td>
                <td className="px-2 text-center py-1 text-[0.6rem] text-gray-900 border">{""}</td>
                <td className="px-2 text-center py-1 text-[0.6rem] text-gray-900 border">{""}</td>
                <td className="px-2 text-center py-1 text-[0.6rem] text-gray-900 border">{""}</td>
                <td className="px-2 text-center py-1 text-[0.6rem] text-gray-900 border">{""}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default GraphTable;
