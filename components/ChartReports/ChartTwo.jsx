import React, { useState, useEffect, useRef } from "react";
import { Bar, Chart } from "react-chartjs-2";
import { MdOutlineCloudDownload } from "react-icons/md";
import * as FileSaver from 'file-saver'
import html2canvas from "html2canvas";
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

const ChartTwo = (props) => {
  const {lab,datasets} = props
  const [height, setHeight] = useState(false);
  const [fullScreen, setFullScreen] = useState(false);
  const chartContainerRef = useRef(null);

  //chartjs

  ChartJs.register(LinearScale, BarElement, PointElement, LineElement, Legend, Tooltip);

  //bar charts datas

  // const labels = [
  //   "January",
  //   "February",
  //   "March",
  //   "April",
  //   "May",
  //   "June",
  //   "July",
  //   "August",
  //   "September",
  //   "October",
  //   "November",
  //   "December"
  // ];
  const data = {
    labels: lab,
    datasets:datasets || []

    // datasets: [
    //   {
    //     label: "SK",
    //     backgroundColor: "rgb(255, 99, 132)",
    //     borderColor: "rgb(255, 99, 132)",
    //     data: [3, 10, 5, 2, 20, 30, 45, 34, 56, 34, 56, 20, 30, 45, 20]
    //   },

    //   {
    //     type: "line",
    //     label: "Line",
    //     borderWidth: 1.5,
    //     borderStyle: "dotted",
    //     fill: false,
    //     backgroundColor: "#22DD22",
    //     borderColor: "#22DD22",
    //     data: [20, 23, 12, 4, 12, 23, 30, 12, 34, 50, 90, 12]
    //   },
    //   {
    //     label: "Pk",
    //     backgroundColor: "rgb(255, 99, 132)",
    //     borderColor: "rgb(255, 99, 132)",
    //     data: [7, 10, 5, 2, 20, 30, 45, 34, 56, 34, 56, 20, 30, 45, 20]
    //   }
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


  const downloadImage = async () => {
    if (chartContainerRef.current) {
      try {
        const chartImage = await html2canvas(chartContainerRef.current);
        chartImage.toBlob((blob) => {
          FileSaver.saveAs(blob, `${props.title}`);
        }, 'image/jpeg');
      } catch (error) {
        console.error('Error capturing chart image:', error);
      }
    }
  };

  return (
    <>
      <div
      ref={chartContainerRef}
        className={`wrapper mt-2 lg:mt-0  flex-1 ${
          !height ? "h-72 " : "h-auto"
        } lg:w-2/5 bg-white  rounded-lg border border-gray-200 flex flex-col ${
          fullScreen ? "fixed min-w-[100%]  h-auto lg:min-h-[84%]  top-8 mx-auto" : " h-auto"
        } `}
      >
        <div className={`flex  items-center justify-between rounded-t-md text-white p-2 ${props.color} `}>
          <div className="font flex flex-col ">
            <h2>{props.title}</h2>
          </div>
          {/* <div className="btns flex items-center gap-2">
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
          </div> */}
          <div className="btns flex items-center gap-2">
          <button  onClick={() => setHeight(false)}>
                <MdOutlineCloudDownload onClick={downloadImage} size={20}></MdOutlineCloudDownload>
              </button>
            {fullScreen ? (
              <button className="lg:block hidden" onClick={() => setFullScreen(false)}>
                <FiMinimize></FiMinimize>
              </button>
            ) : (
              <button className="lg:block hidden" onClick={() => setFullScreen(true)}>
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
        {!height && <Chart  className={`min-w-full lg:max-h-64  ${fullScreen ? "lg:max-h-[84%]":""} px-2`} ref={chartRef} type="bar" data={data} />}
      </div>
    </>
  );
};

export default ChartTwo;
