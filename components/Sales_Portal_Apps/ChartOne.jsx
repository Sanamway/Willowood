import React, { useState, useEffect, useRef } from "react";
import { Chart } from "react-chartjs-2";
import { useSelector } from "react-redux";
import html2canvas from "html2canvas";
import {
  Chart as ChartJs,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
} from "chart.js/auto";
import { FiMaximize, FiMinimize, FiMinus, FiPlus } from "react-icons/fi";
import { MdOutlineCloudDownload } from "react-icons/md";
import moment from "moment";

const ChartOne = (props) => {

  let allRollingTableData = useSelector((state) => state.singleRolling.singleRollingTableData
  );

  const additionalReduxData = useSelector((state) => state.additionalData.additionalData)
  console.log("plo", additionalReduxData)
  const [additionalData, setAdditionalData] = useState({})
  const [lab, setLab] = useState(["Apr-24",
    "May-24",
    "Jun-24",
    "Jul-24",
    "Aug-24",
    "Sep-24",
    "Oct-24",
    "Nov-24",
    "Dec-24",
    "Jan-25",
    "Feb-25",
    "Mar-25"]);
  const generateFiscalLabels = (year) => {
    console.log("vfr", year)
    const labels = [];

    // Fiscal year starts in April of the given year
    for (let i = 3; i < 15; i++) {
      const date = moment(`${year}-04-01`).add(i - 3, 'months');
      labels.push(date.format("MMM-YY"));
    }
    setLab(labels)

  };
  useEffect(() => {
    generateFiscalLabels(additionalReduxData.yr)
  }, [additionalReduxData])

  console.log("dot", additionalData.yr)




  const [datasets, setDataSets] = useState([
    {
      label: "Budget",
      backgroundColor: "rgba(34, 197, 94, 1)",  // Full opacity (green-400)
      backgroundColor: "rgba(34, 197, 94, 0.6)", // 60% opacity
      data: 0,
    },
    {
      label: "RSP Budget",
      backgroundColor: "rgba(59, 130, 246, 1)",  // Full opacity (blue)
      backgroundColor: "rgba(59, 130, 246, 0.6)", // 60% opacity
      data: 0,
    },
    {
      label: "Total Sales",
      backgroundColor: "rgba(249, 115, 22, 1)",  // Full opacity (orange)
      borderColor: "rgba(249, 115, 22, 0.6)",    // 60% opacity
      data: 0,
    }

  ])


  useEffect(() => {
    if (!allRollingTableData.length) return
    setDataSets(
      [
        {
          label: "Budget",
          backgroundColor: "rgba(34, 197, 94, 1)",  // Full opacity (green-400)
          backgroundColor: "rgba(34, 197, 94, 0.6)", // 60% opacity
          data: allRollingTableData.map((item) => item.budget),
        },
        {
          label: "RSP Budget",
          backgroundColor: "rgba(59, 130, 246, 1)",  // Full opacity (blue)
          backgroundColor: "rgba(59, 130, 246, 0.6)", // 60% opacity
          data: allRollingTableData.map((item) => item.target),
        },
        {
          label: "Total Sales",
          backgroundColor: "rgba(249, 115, 22, 1)",  // Full opacity (orange)
          borderColor: "rgba(249, 115, 22, 0.6)",    // 60% opacity
          data: allRollingTableData.map((item) => item.actual),
        }





      ]
    )
  }, [
    allRollingTableData
  ])

  const chartRef = useRef(null);
  const chartContainerRef = useRef(null);


  const [height, setHeight] = useState(false);
  const [fullScreen, setFullScreen] = useState(false);

  //chartjs

  ChartJs.register(
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Legend,
    Tooltip
  );

  //bar charts datas

  const data = {
    labels: lab,
    datasets: datasets || [],

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

  //options for chart

  let options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  //download chart as jpeg

  const downloadImage = async () => {
    if (chartContainerRef.current) {
      try {
        const chartImage = await html2canvas(chartContainerRef.current);
        chartImage.toBlob((blob) => {
          FileSaver.saveAs(blob, `${props.title}`);
        }, "image/jpeg");
      } catch (error) {
        console.error("Error capturing chart image:", error);
      }
    }
  };
  console.log("mio", data);
  return (
    <>
      <div
        ref={chartContainerRef}
        className={`wrapper  ${!height ? "h-72 " : ""
          } lg:w-full flex-col bg-white rounded-lg ${
          // fullScreen ? "fixed min-w-[84%] h-auto  top-8 mx-auto" : "h-auto "
          // fullScreen ? "absolute min-w-[90%] h-auto  top-12 mx-auto" : "h-auto"
          fullScreen
            ? "fixed min-w-[84%]  h-auto lg:min-h-[84%]  top-8 mx-auto"
            : "h-auto"
          } `}
      >
        <div
          className={`flex items-center justify-between rounded-t-md text-white p-2 ${props.color}`}
        >
          <div className="font flex flex-col ">
            <h2>{props.title}</h2>
          </div>
          <div className="btns flex items-center gap-2">
            <button onClick={() => setHeight(false)}>
              <MdOutlineCloudDownload
                onClick={downloadImage}
                size={20}
              ></MdOutlineCloudDownload>
            </button>
            {fullScreen ? (
              <button
                className="lg:block hidden"
                onClick={() => setFullScreen(false)}
              >
                <FiMinimize></FiMinimize>
              </button>
            ) : (
              <button
                className="lg:block hidden"
                onClick={() => setFullScreen(true)}
              >
                <FiMaximize></FiMaximize>
              </button>
            )}
            {!height ? (
              <button
                className={`${fullScreen && "hidden"}`}
                onClick={() => setHeight(true)}
              >
                <FiMinus></FiMinus>
              </button>
            ) : (
              <button onClick={() => setHeight(false)}>
                <FiPlus></FiPlus>
              </button>
            )}
          </div>
        </div>
        {/* {!height && <Chart className="min-w-full min-h-full px-2" ref={chartRef} type="bar" data={data} />} */}
        {/* {!height && <Chart className="min-w-full min-h-full px-2" ref={chartRef} type="bar" data={data} />} */}
        {!height && (
          <Chart
            className={`min-w-full lg:max-h-64  ${fullScreen ? "lg:max-h-[84%]" : ""
              } px-2`}
            ref={chartRef}
            type="bar"
            data={data}
          />
        )}
      </div>
    </>
  );
};

export default ChartOne;
