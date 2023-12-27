import React, { useState, useEffect, useRef } from "react";
import { Bar, Chart } from "react-chartjs-2";
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
import { MdOutlineCloudDownload } from "react-icons/md";

const ChartOne = (props) => {
  const {lab, datasets} = props
  const [height, setHeight] = useState(false);
  const [fullScreen, setFullScreen] = useState(false);

  //chartjs

  ChartJs.register(LinearScale, BarElement, PointElement, LineElement, Legend, Tooltip);

  console.log("darta", props.dataset)

  //bar charts datas


  const data = {
    labels: lab,
    datasets:datasets || []

    // datasets: [
    //   {
    //     label: "Budget",
    //     backgroundColor: "blue",
    //     borderColor: "rgb(255, 99, 132)",
    //     data: [200, 150]
    //   },
      

    //   {
    //     label: "Rolling Plan",
    //     backgroundColor: "rgb(255, 99, 132)",
    //     borderColor: "rgb(255, 99, 132)",
    //     data: [180,120]
    //   },

    //   {
    //     label: "Actual Sale",
    //     backgroundColor: "green",
    //     borderColor: "rgb(255, 99, 132)",
    //     data: [200,100]
    //   },
      
    // ]
    
  };

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
      //       index: 2,
      //     },
      //     {
      //       datasetIndex: 1,
      //       index: 2,
      //     },
      //   ],
      //   {
      //     x: (chartArea.left + chartArea.right) / 2,
      //     y: (chartArea.top + chartArea.bottom) / 2,
      //   }
      // );
    }

    chart.update();
  }

  useEffect(() => {
    const chart = chartRef.current;

    triggerTooltip(chart);
  }, []);

  return (
    <>
      <div
        className={`wrapper   ${!height ? "h-72 " : ""} lg:w-2/5 flex-col bg-white rounded-lg ${
          // fullScreen ? "fixed min-w-[84%] h-auto  top-8 mx-auto" : "h-auto"
          // fullScreen ? "absolute min-w-[90%] h-auto  top-12 mx-auto" : "h-auto"
          fullScreen ? "fixed top-[53px] min-w-[85%] h-auto   mx-auto" : "h-auto"
        } `}
      >
        <div className={`flex items-center justify-between rounded-t-md text-white p-2 ${props.color}`}>
          <div className="font flex flex-col ">
            <h2>{props.title}</h2>
          </div>
          <div className="btns flex items-center gap-2">
          <button onClick={() => setHeight(false)}>
                <MdOutlineCloudDownload size={20}></MdOutlineCloudDownload>
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
        {!height && <Chart  className="min-w-full min-h-full px-2" ref={chartRef} type="bar" data={data} />}
      </div>
    </>
  );
};

export default ChartOne;
