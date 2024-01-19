import React, { useState, useEffect } from "react";

const RecentOrder = () => {
  const [data, setData] = useState([]);

  const sampleData = [
    { id: 1, order: "10000072_20_10000", name: "Pesticide", status: "Pending", color: "blue" },
    { id: 2, order: "10000072_30_10000", name: "Fegiscide", status: "Received", color: "green" },
    { id: 3, order: "10000072_40_10000", name: "Nucleus", status: "Dispatched", color: "green" },
    { id: 4, order: "10000072_50_10000", name: "Willowood", status: "Delivered", color: "orange" }
  ];

  useEffect(() => {
    let timer = setTimeout(() => {
      setData(sampleData);
    }, 4000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  function Skeleton() {
    return (
      <>
        {Array.from({ length: 4 }).map((_, index) => (
          <tr>
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
            <div className="overflow-x-auto chat-scrollbar select-none w-full h-36">
              <div className="text-left p-1.5 px-2">
                <h2 className="text-[0.78rem] text-gray-600 font-bold">Recent Order Status</h2>
              </div>
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 rounded-full ">
                <thead className="text-xs text-gray-900 text-center bg-blue-50 rounded-md ">
                  <tr className="">
                    <th className="px-1 py-1 text-center text-[0.6rem] text-gray-600 font-bold ">S.No</th>

                    <th className="px-4 py-1 text-center text-[0.6rem] text-gray-600 font-bold">
                      Sales Order ID
                    </th>
                    
                    <th className="px-2 py-1 text-[0.6rem] text-gray-600 font-bold">Item Name</th>

                    <th className="px-2 py-1 text-[0.6rem] text-gray-600 font-bold">Invoice Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 break-normal ">
                  {data.length ? (
                    data.map((item) => (
                      <tr>
                        <td
                          className={`px-2 text-left whitespace-nowrap py-1 text-[0.6rem] text-gray-900 border `}
                        >
                          {item?.id}
                        </td>
                        <td
                          className={`px-2 text-center whitespace-nowrap py-1 text-[0.6rem] text-gray-900 border `}
                        >
                          {item?.order}
                        </td>
                        <td
                          className={`px-2 text-center whitespace-nowrap py-1 text-[0.6rem] text-gray-900 border `}
                        >
                          {item?.name}
                        </td>
                        <td
                          className={`px-4 text-center whitespace-nowrap  py-1 text-[0.6rem] text-gray-900 border `}
                        >
                          <div className={`bg-${item.color}-500 rounded-full text-white font-bold`}>
                            {item?.status}
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <Skeleton></Skeleton>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RecentOrder;
