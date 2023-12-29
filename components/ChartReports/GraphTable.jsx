import React, { useState, useEffect } from "react";

const GraphTable = (props) => {
  const { data } = props;
  console.log("graphT", data);

  const [resultSum, setresultSum] = useState({
    FY_Sales_Val_21_22: 0,
    FY_Sales_Val_22_23: 0,
    Annual_Budget_Qty: 0,
    Annual_Budget_Val: 0
  });

  const calculateSum = (data) => {
    const sum = data.reduce(
      (acc, entry) => {
        acc["FY_Sales_Val_21_22"] += Number(entry["FY_Sales_Val_21_22"]) || 0;
        acc["FY_Sales_Val_22_23"] += Number(entry["FY_Sales_Val_22_23"]) || 0;
        acc["Annual_Budget_Qty"] += Number(entry["Annual_Budget_Qty"]) || 0;
        acc["Annual_Budget_Val"] += Number(entry["Annual_Budget_Val"]) || 0;
        return acc;
      },
      {
        FY_Sales_Val_21_22: 0,
        FY_Sales_Val_22_23: 0,
        Annual_Budget_Qty: 0,
        Annual_Budget_Val: 0
      }
    );

    setresultSum(sum);
  };

  useEffect(() => {
    if (!data.length) return;
    calculateSum(data);
  }, [data]);

  console.log("SUM", resultSum);

  return (
    <>
      <div className="overflow-x-auto chat-scrollbar ">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
          <thead className="text-xs text-gray-900 text-center bg-gray-100 ">
            <tr className="">
              <th className="px-4 py-1 text-center text-[0.6rem]  border font-medium text-gray-800   ">
                Territory
              </th>

              <th className="px-4 py-1 text-center text-[0.6rem]  border font-medium text-gray-800   ">
                Sales Person Name
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
            {data.map((item) => (
              <tr key={item.id}>
                {Object.values(item).map((value, index) => (
                  <td
                    key={value}
                    className={`px-2 text-center whitespace-nowrap ${
                      index == 10 || index == 11 ? "bg-green-200" : ""
                    }
                  ${index == 15 || index == 16 ? "bg-green-200" : ""}
                  ${index == 17 || index == 18 ? "bg-orange-100" : ""}
                   py-1 text-[0.6rem] text-gray-900 border `}
                  >
                    {value}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="sum flex item-center gap-2 mx-2">
          <div className=" text-black text-xs font-normal w-1/4 my-2">
            <p className=" flex justify-between">
              <span className="w-full"> FY Sales Val 21 22: </span>
              <small className="text-xs">{parseFloat(resultSum["FY_Sales_Val_21_22"]).toFixed(2)}</small>
            </p>

            <p className=" flex justify-between">
              <span className="w-full"> FY Sales Val 22-23: </span>
              <small className="text-xs">{parseFloat(resultSum["FY_Sales_Val_22_23"]).toFixed(2)}</small>
            </p>
            <p className=" flex justify-between">
              <span className="w-full"> Annual Budget Qty: </span>
              <small className="text-xs">{parseFloat(resultSum["Annual_Budget_Qty"])}</small>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default GraphTable;
