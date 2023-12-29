import React, { useState, useEffect, useRef } from "react";
import { Bar, Chart } from "react-chartjs-2";
// import { MdOutlineCloudDownload } from "react-icons/md";
import { TbFileDownload } from "react-icons/tb";

import GraphTable from "./GraphTable";
import {
  Chart as ChartJs,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip
} from "chart.js/auto";
import { FiMaximize, FiMinimize, FiMinus, FiPlus } from "react-icons/fi";

const ChartFour = (props) => {
    const {lab, datas} = props
  const [height, setHeight] = useState(false);
  const [fullScreen, setFullScreen] = useState(false);

  //chartjs

  ChartJs.register(LinearScale, BarElement, PointElement, LineElement, Legend, Tooltip);

//   const data = {
//     labels: lab,
//     datasets:datasets || []
    
//   };

  const chartRef = useRef(null);

  //tooltip

  function triggerTooltip(chart) {
    const tooltip = chart?.tooltip;
    if (!tooltip) {
      return;
    }

    if (tooltip.getActiveElements().length > 0) {
      // tooltip.setActiveElements([], { x: 0, y: 0 });
    } else {
      const { chartArea } = chart;
      // tooltip.setActiveElements(
      //   [
      //     {
      //       datasetIndex: 0,
      //       index: 2
      //     },
      //     {
      //       datasetIndex: 1,
      //       index: 2
      //     }
      //   ],
      //   {
      //     x: (chartArea.left + chartArea.right) / 2,
      //     y: (chartArea.top + chartArea.bottom) / 2
      //   }
      // );
    }

    chart.update();
  }

  useEffect(() => {
    const chart = chartRef.current;

    triggerTooltip(chart);
  }, []);

  //options 
  
  let options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' ,
      },
      
    },
  };
  

  return (
    <>
      <div
        className={`wrapper mt-2 lg:mt-0   ${
          !height ? "h-72 " : "h-auto"
        } lg:w-[100%] bg-white  rounded-lg border border-gray-200 flex flex-col ${
          fullScreen ? "fixed min-w-[100%]  h-auto lg:min-h-[84%]  top-8 mx-auto" : " h-auto"
        } `}
      >
        <div className={`flex text-blue-500 items-center justify-between rounded-t-md  p-2 ${props.color} `}>
          <div className="font flex flex-col ">
            <h2 className="text-xs font-bold font-arial">{props.title}</h2>
          </div>
          
          <div className="btns flex items-center gap-2">
          <button onClick={() => setHeight(false)}>
                <TbFileDownload size={20}></TbFileDownload>
              </button>
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
              <button className={`${fullScreen && "hidden"}`} onClick={() => setHeight(true)}>
                <FiMinus></FiMinus>
              </button>
            ) : (
              <button onClick={() => setHeight(false)}>
                <FiPlus></FiPlus>
              </button>
            )}
            
          </div>
        </div>
        {/* {!height && <GraphTable  className={`min-w-full lg:max-h-64  ${fullScreen ? "lg:max-h-[84%]":""} px-2`}   data={datas} />} */}
        {!height && <GraphTable  className={`min-w-full lg:max-h-64  ${fullScreen ? "lg:max-h-[84%]":""} px-2`}   data={datas} />}
      </div>
    </>
  );
};

export default ChartFour;
