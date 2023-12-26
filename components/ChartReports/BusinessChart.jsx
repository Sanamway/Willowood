import React, { useState, useEffect } from "react";
// import { Chart } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { FiMaximize, FiMinimize, FiMinus, FiPlus } from "react-icons/fi";
const BusinessChart = () => {
  const [height, setHeight] = useState(false);
  const [fullScreen, setFullScreen] = useState(false);

  //bar charts datas

  const labels = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];
  const data = {
    labels: labels,
    datasets: [
      {
        label: "India",
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(255, 99, 132)",
        data: [3, 10, 5, 2, 20, 30, 45,34,56,34,56,20,30,45,20]
      },
      {
        label: "My First dataset",
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(255, 99, 132)",
        data: [7, 10, 5, 2, 20, 30, 45, 34,56,34,56,20,30,45,20]
      }
    ],
  };

  return (
    <>
      <div
        className={`wrapper ${!height ? "h-72 " : ""} lg:w-2/5 flex-col bg-white rounded-lg ${
          fullScreen ? "fixed min-w-[84%] min-h-[84%]  top-12 mx-auto" : ""
        } `}
      >
        <div className="flex  items-center justify-between rounded-t-md text-white p-2 bg-sky-600 ">
          <div className="font flex flex-col ">
            <h2>Business Units</h2>
          </div>
          <div className="btns flex items-center gap-2">
            {fullScreen ? (
              <button onClick={() => setFullScreen(false)}>
                <FiMinimize></FiMinimize>
              </button>
            ) : (
              <button onClick={() => setFullScreen(true)}>
                <FiMaximize></FiMaximize>
              </button>
            )}
            {!height ? (
              <button onClick={() => setHeight(true)}>
                <FiMinus></FiMinus>
              </button>
            ) : (
              <button onClick={() => setHeight(false)}>
                <FiPlus></FiPlus>
              </button>
            )}
          </div>
        </div>
        <Bar  data={data} />

      </div>
    </>
  );
};

export default BusinessChart;
