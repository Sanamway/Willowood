import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { Chart as ChartJS, Legend, ArcElement, Tooltip } from "chart.js/auto";

// Function to generate random colors for the chart segments
const generateRandomColors = (num) => {
  const colors = [];
  for (let i = 0; i < num; i++) {
    const color = `hsl(${(i * 360) / num}, 70%, 60%)`; // HSL color model for smooth transitions
    colors.push(color);
  }
  return colors;
};

const GraphCard = () => {
  const allRollingAnalyticalData = useSelector(
    (state) => state.rspAnalytics.rspAnalyticalData.product_category
  );

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "",
        data: [],
        backgroundColor: [], // This will be dynamically set
      },
    ],
  });

  useEffect(() => {
    if (allRollingAnalyticalData && allRollingAnalyticalData.length > 0) {
      const names = allRollingAnalyticalData.map(item => item._id); // Extract names (e.g., 'X-Factor', 'Core', etc.)
      const dataValues = allRollingAnalyticalData.map(item => item.totalNewPriceValue); // Extract the values (e.g., '43 Cr', '23 Cr', etc.)

      // Generate dynamic colors based on the number of segments in the chart
      const backgroundColors = generateRandomColors(allRollingAnalyticalData.length);

      // Set the chart data with dynamic labels, data, and background colors
      setChartData({
        labels: names,
        datasets: [
          {
            label: "",
            data: dataValues,
            backgroundColor: backgroundColors, // Assign generated dynamic colors
          },
        ],
      });
    }
  }, [allRollingAnalyticalData]);

  ChartJS.register(ArcElement, Tooltip, Legend);

  return (
    <div className="w-full px- mt-2 flex lg:flex-row flex-col gap-3 font-arial rounded-md">
      <div className="bg-white p-2 h-auto flex-1 md:flex items-center justify-center gap-4 rounded-md shadow-md text-white text-center">
        <div className="flex flex-col w-full">
          <div className="text-left p-1.5 flex items-center justify-between w-full ">
            <h2 className="text-[0.78rem] text-gray-600 font-bold">
              X-Factor, Core, and Other Products
            </h2>
          </div>
          <div
            className="flex items-center justify-between w-full mx-auto"
            style={{ width: "250px", height: "250px" }}
          >
            <Doughnut data={chartData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GraphCard;
