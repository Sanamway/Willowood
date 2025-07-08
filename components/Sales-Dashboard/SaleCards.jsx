import React, { useState, useEffect } from "react";
import { GiNetworkBars } from "react-icons/gi";
import { useSelector } from "react-redux";
const SaleCards = () => {
  const allRollingAnalyticalData = useSelector((state) => state.rspAnalytics.rspAnalyticalData.product_category
  );
  const allRollingTableData = useSelector((state) => state.rolling.rollingTableData
  );







  const [data, setData] = useState([{ name: "Total Sales", data: allRollingTableData?.length ? allRollingTableData[0].actual : 0 }]);
  const [data2, setData2] = useState([
    { name: "X-Factor", data: "0" },
    { name: "Core", data: "0" },
    { name: "Other Products", data: "0" }
  ]);


  useEffect(() => {
    setData([{ name: "Total Sales", data: allRollingTableData?.length ? allRollingTableData[0].actual : 0 }]);
  }, [allRollingTableData]);

  useEffect(() => {
    setData2(allRollingAnalyticalData?.length ? allRollingAnalyticalData.map((item) => {
      return {
        name: item._id, data: item.totalNewPriceValue
      }
    }

    ) : []);
  }, [allRollingAnalyticalData]);




  function Skeleton() {
    return (
      <>
        {Array.from({ length: 1 }).map((_, index) => (
          <div key={index} className="bg-white p-2 lg:w-[40%] flex flex-col items-center justify-center gap-4 rounded-md shadow-md text-white text-center">
            <div className="flex items-center justify-between w-full  px-1">
              <div className=" px-1 py-1 rounded-md">
                <div className="w-8 h-8 bg-gray-300 rounded-full animate-pulse"></div>
              </div>
              <div className="flex flex-col items-center justify-center gap-2">
                <div className="w-20 h-3 bg-gray-300 rounded-md animate-pulse"></div>
                <div className="w-6 h-6 bg-gray-300 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        ))}
      </>
    );
  }
  return (
    <>

      <div className="  flex-1 md:flex items-center justify-center gap-4 rounded-md shadow-md text-white text-center">
        <div className="h-6 bg-white rounded-t-md flex items-center   mt-4">
          <h2 className="text-[0.75rem] text-black px-2">Product Category wise Sale</h2>
        </div>
        <div className="bg-white mt-2">
          {data.length ? (
            data.map((item, index) => (
              <div key={index} className="bg-white p-2 lg:w-[40%] flex flex-col items-center justify-center gap-4 rounded-md shadow-md text-white text-center">
                <div className="flex items-center justify-between w-full px-1">
                  <div className=" px-1 py-1 rounded-md">
                    <GiNetworkBars className="text-red-400 " size={30}></GiNetworkBars>
                  </div>
                  <div>
                    <h2 className="text-gray-500 text-sm font-bold whitespace-nowrap">{item.name}</h2>
                    <h2 className="text-xl text-[#ADBD5B] font-bold">{data2.reduce((sum, item) => sum + Number(item.data), 0).toFixed(2)}</h2>
                  </div>
                </div>
              </div>
            ))

          ) : (
            <Skeleton></Skeleton>
          )}
        </div>

      </div>
      <div className="w-full px- mt-2 flex lg:flex-row flex-col  font-arial   rounded-md">
        <div className="bg-white mt-2">
          {data2.length ? (
            data2.map((item, index) => (
              <div
                key={index}
                className={`flex  items-center justify-between w-full gap-2 p-1 ${index == 1 ? "md:border-r-2 md:border-l-2 px-2" : ""
                  }`}
              >
                <h2 className="text-gray-500 text-sm font-bold whitespace-nowrap">{item.name}: </h2>
                <h2 className="text-lg text-[#ADBD5B] font-bold whitespace-nowrap">{item.data}</h2>
              </div>
            ))
          ) : (
            <Skeleton />
          )}


        </div>
      </div>
    </>
  );
};

export default SaleCards;
