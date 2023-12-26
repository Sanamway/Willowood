import React, { useState, useEffect } from "react";
import { Chart } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";
import { FiMaximize, FiMinimize, FiMinus, FiPlus } from "react-icons/fi";
const BusinessChart = () => {
  const [height, setHeight] = useState(false);
  const [fullScreen, setFullScreen] = useState(false)
  return (
    <>
      <div className={`wrapper ${!height ? "h-72" : ""} lg:w-2/5 flex-col bg-white rounded-lg ${fullScreen ? "fixed min-w-full min-h-full right-0 left-0 top-12":""} `}>
        <div className="flex  items-center justify-between rounded-t-md text-white p-2 bg-sky-600  ">
          <div className="font flex flex-col ">
            <h2>Business Units</h2>
          </div>
          <div className="btns flex items-center gap-2">
           {fullScreen ? ( <button  onClick={()=> setFullScreen(false)}>
              <FiMinimize></FiMinimize>
            </button>):(
              ( <button onClick={()=> setFullScreen(true)}>
                <FiMaximize></FiMaximize>
              </button>)
              )}
            {!height ? (
              <button onClick={()=> setHeight(true)}>
                <FiMinus></FiMinus>
              </button>
            ) : (
              <button onClick={()=> setHeight(false)}>
                <FiPlus></FiPlus>
              </button>
            )}
          </div>
        </div>
        {/* <ResponsiveContainer width="100%" height={240}>
          <BarChart data={data}>
            <XAxis
              className="xaxis"
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#333" }}
            />
            <Legend />
            <Bar dataKey="Income" fill="#0ea5e9" shape={<CustomBar />} legendType="none" />
          </BarChart>
        </ResponsiveContainer> */}
      </div>
    </>
  );
};

export default BusinessChart;
