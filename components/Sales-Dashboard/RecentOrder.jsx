import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
const RecentOrder = () => {
  const [data, setData] = useState([]);
  const orderData = useSelector((state) => state.orderInfo.orderInfoData
  );
  const sampleData = [
    { id: 1, order: "10000072_20_10000", name: "Pesticide", status: "Pending", color: "blue" },
    { id: 2, order: "10000072_30_10000", name: "Fegiscide", status: "Received", color: "green" },
    { id: 3, order: "10000072_40_10000", name: "Nucleus", status: "Dispatched", color: "green" },
    { id: 4, order: "10000072_50_10000", name: "Willowood", status: "Delivered", color: "orange" }
  ];

  useEffect(() => {

    setData(orderData)
  }, [orderData]);

  function Skeleton() {
    return (
      <>
        {Array.from({ length: 4 }).map((_, index) => (
          <tr key={index}>
            <td className="px-2 py-1 text-left whitespace-nowrap border">
              <div className="w-3/4 h-3 bg-gray-300 rounded-md animate-pulse"></div>
            </td>
            <td className="px-2 py-1 text-center whitespace-nowrap border">
              <div className="w-3/4 h-3 bg-gray-300 rounded-md animate-pulse"></div>
            </td>
            <td className="px-2 py-1 text-center whitespace-nowrap border">
              <div className="w-3/4 h-3 bg-gray-300 rounded-md animate-pulse"></div>
            </td>
            <td className="px-2 py-1 text-center whitespace-nowrap border">
              <div className="w-3/4 h-3 bg-gray-300 rounded-md animate-pulse"></div>
            </td>
          </tr>
        ))}
      </>
    );
  }

  return (
    <>
      <div className="orderwrapper ">
        <div className="w-full px- mt-2 flex lg:flex-row flex-col gap-3 font-arial rounded-md">
          <div className="bg-white  flex-1 md:flex items-center justify-center gap-4 rounded-md shadow-md text-white text-center">
            <div className=" chat-scrollbar select-none w-full h-36">
              <div className="text-left p-1.5 px-2">
                <h2 className="text-[0.78rem] text-gray-600 font-bold">Recent Order Status</h2>
              </div>
              <div className="overflow-x-auto w-full">
                <table className="min-w-max text-sm text-left text-gray-500 dark:text-gray-400 rounded-full">
                  <thead className="text-xs text-gray-900 text-center bg-blue-50 rounded-md">
                    <tr>
                      <th className="px-1 py-1 text-center text-[0.6rem] text-gray-600 font-bold">S.No</th>
                      <th className="px-4 py-1 text-center text-[0.6rem] text-gray-600 font-bold">Sales Order ID</th>
                      <th className="px-4 py-1 text-center text-[0.6rem] text-gray-600 font-bold">Party Name</th>

                      <th className="px-2 py-1 text-[0.6rem] text-gray-600 font-bold">Invoice Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200 break-normal">
                    {data.length ? (
                      data.map((item, idx) => (
                        <tr key={item?.id}>
                          <td className="px-2 text-left whitespace-nowrap py-1 text-[0.6rem] text-gray-900 border">
                            {idx + 1}
                          </td>
                          <td className="px-2 text-center whitespace-nowrap py-1 text-[0.4rem] text-gray-900 border">
                            {item?.SAP_order_no}
                          </td>
                          <td className="px-2 text-center whitespace-nowrap py-1 text-[0.6rem] text-gray-900 border">
                            {item?.party_name}
                          </td>

                          <td className="px-4 text-center whitespace-nowrap py-1 text-[0.6rem] text-gray-900 border">
                            <div className="bg-blue-500 rounded-full text-white font-bold px-2">
                              {item.ord_status}
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <Skeleton />
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RecentOrder;
