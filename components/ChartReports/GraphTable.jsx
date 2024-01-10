import React, { useState, useEffect } from "react";

const GraphTable = (props) => {
  const { data } = props;

  const [resultSum, setresultSum] = useState({
    FY_Sales_Val_21_22: 0,
    FY_Sales_Val_22_23: 0,
    Annual_Budget_Qty: 0,
    Annual_Budget_Val: 0,
    MTD_Sale_Qty:0,
    MTD_Budget_Val:0,
    MTD_RSP_Value:0,
    MTD_Actual_Sale_Value:0,
    YTD_Sale_Qty:0,
    YTD_Budget_Value:0,
    YTD_Actual_Sale_Value:0,
  });

  const calculateSum = (data) => {
    const sum = data.reduce(
      (acc, entry) => {
        acc["FY_Sales_Val_21_22"] += Number(entry["FY_Sales_Val_21_22"]) || 0;
        acc["FY_Sales_Val_22_23"] += Number(entry["FY_Sales_Val_22_23"]) || 0;
        acc["Annual_Budget_Qty"] += Number(entry["Annual_Budget_Qty"]) || 0;
        acc["Annual_Budget_Val"] += Number(entry["Annual_Budget_Val"]) || 0;
        acc["MTD_Sale_Qty"] += Number(entry["MTD_Sale_Qty"]) || 0;
        acc["MTD_Budget_Val"] += Number(entry["MTD_Budget_Val"]) || 0;
        acc["MTD_RSP_Value"] += Number(entry["MTD_RSP_Value"]) || 0;
        acc["MTD_Actual_Sale_Value"] += Number(entry["MTD_Actual_Sale_Value"]) || 0;
        acc["YTD_Sale_Qty"] += Number(entry["YTD_Sale_Qty"]) || 0;
        acc["YTD_Budget_Value"] += Number(entry["YTD_Budget_Value"]) || 0;
        acc["YTD_Actual_Sale_Value"] += Number(entry["YTD_Actual_Sale_Value"]) || 0;
        return acc;
      },
      {
        FY_Sales_Val_21_22: 0,
        FY_Sales_Val_22_23: 0,
        Annual_Budget_Qty: 0,
        Annual_Budget_Val: 0,
        MTD_Sale_Qty:0,
        MTD_Budget_Val:0,
        MTD_RSP_Value:0,
        MTD_Actual_Sale_Value:0,
        YTD_Sale_Qty:0,
        YTD_Budget_Value:0,
        YTD_Actual_Sale_Value:0,

      }
    );

    setresultSum(sum);
  };

  useEffect(() => {
    if (!data.length) return;
    calculateSum(data);
  }, [data]);


  // const columnSums = {
  //   salesVal2122: data.reduce((sum, item) => sum + item['FY Sales Val 21-22'], 0),
  //   salesVal2223: data.reduce((sum, item) => sum + item['FY Sales Val 22-23'], 0),
  //   annualBudgetQty: data.reduce((sum, item) => sum + item['Annual Budget Qty'], 0),
  //   mtdSaleQty: data.reduce((sum, item) => sum + item['MTD Sale Qty'], 0),
  //   mtdSaleQty: data.reduce((sum, item) => sum + item['MTD Sale Qty'], 0),
  // };

  return (
    <>
      <div className="overflow-x-auto chat-scrollbar select-none h-[16rem] ">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
          <thead className="text-xs text-gray-900 text-center bg-gray-100 ">
            <tr className="">
              <th className="px-4 py-1 text-center text-[0.6rem]  border font-medium text-gray-800   ">
                {props.heading}
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
            <tr className="bg-gray-100">
            <td className="px-2 text-center py-1 text-[0.6rem] text-gray-900 border"></td>
            <td className="px-2 text-center py-1 text-[0.6rem] text-gray-900 border whitespace-nowrap">Total ( All Values in Cr.)</td>
            <td className="px-2 text-center py-1 text-[0.6rem] text-gray-900 border">{parseFloat(resultSum["FY_Sales_Val_21_22"]).toFixed(2)}</td>
            <td className="px-2 text-center py-1 text-[0.6rem] text-gray-900 border">{parseFloat(resultSum["FY_Sales_Val_22_23"]).toFixed(2)}</td>
            <td className="px-2 text-center py-1 text-[0.6rem] text-gray-900 border">{parseFloat(resultSum["Annual_Budget_Qty"])}</td>
            <td className="px-2 text-center py-1 text-[0.6rem] text-gray-900 border">{parseFloat(resultSum["Annual_Budget_Val"])}</td>
            <td className="px-2 text-center py-1 text-[0.6rem] text-gray-900 border">{parseFloat(resultSum["MTD_Sale_Qty"])}</td>
            <td className="px-2 text-center py-1 text-[0.6rem] text-gray-900 border">{parseFloat(resultSum["MTD_Budget_Val"])}</td>
            <td className="px-2 text-center py-1 text-[0.6rem] text-gray-900 border">{parseFloat(resultSum["MTD_RSP_Value"]).toFixed(2)}</td>
            <td className="px-2 text-center py-1 text-[0.6rem] text-gray-900 border">{parseFloat(resultSum["MTD_Actual_Sale_Value"]).toFixed(2)}</td>
            <td className="px-2 text-center py-1 text-[0.6rem] text-gray-900 border">{""}</td>
            <td className="px-2 text-center py-1 text-[0.6rem] text-gray-900 border">{""}</td>
            <td className="px-2 text-center py-1 text-[0.6rem] text-gray-900 border">{parseFloat(resultSum["YTD_Sale_Qty"])}</td>
            <td className="px-2 text-center py-1 text-[0.6rem] text-gray-900 border">{parseFloat(resultSum["YTD_Budget_Value"])}</td>
            <td className="px-2 text-center py-1 text-[0.6rem] text-gray-900 border">{parseFloat(resultSum["YTD_Actual_Sale_Value"])}</td>
            <td className="px-2 text-center py-1 text-[0.6rem] text-gray-900 border">{""}</td>
            <td className="px-2 text-center py-1 text-[0.6rem] text-gray-900 border">{""}</td>
            <td className="px-2 text-center py-1 text-[0.6rem] text-gray-900 border">{""}</td>
            <td className="px-2 text-center py-1 text-[0.6rem] text-gray-900 border">{""}</td>
          </tr>
          </tbody>
        </table>
      
      </div>
    </>
  );
};

export default GraphTable;
