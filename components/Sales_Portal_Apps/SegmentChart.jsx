import React, { useState, useEffect, useRef } from "react";
import { Chart } from "react-chartjs-2";
import { useSelector } from "react-redux";
import {
    Chart as ChartJS,
    LinearScale,
    CategoryScale,
    BarElement,
    PointElement,
    LineElement,
    Legend,
    Tooltip,
} from "chart.js";
import { FiMaximize, FiMinimize, FiMinus, FiPlus } from "react-icons/fi";
import { MdOutlineCloudDownload } from "react-icons/md";
import moment from "moment";

// Register ChartJS components (do this only once)
ChartJS.register(
    LinearScale,
    CategoryScale,
    BarElement,
    PointElement,
    LineElement,
    Legend,
    Tooltip
);

const SegementChart = (props) => {
    const [labels, setLabels] = useState([]);
    const [datasets, setDatasets] = useState([]);

    const chartRef = useRef(null);
    const chartContainerRef = useRef(null);
    const [fullScreen, setFullScreen] = useState(false);

    useEffect(() => {
        if (!props.data || props.data.length === 0) return;
        console.log("zoo", props.data)
        const chartLabels = props.data.map((item) => item.product_segment);
        const chartData = props.data.map((item) => item.total_mtd_new_budget_price_value
        );

        setLabels(chartLabels);
        setDatasets([
            {
                label: "Segemnt",
                backgroundColor: "rgba(54, 162, 235, 0.6)", // blue with transparency
                borderColor: "rgba(54, 162, 235, 1)",       // solid blue border
                borderWidth: 1,
                data: chartData,
            },
        ]);
    }, [props.data]);

    const chartData = {
        labels: labels,
        datasets: datasets,
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                position: "top",
            },
        },
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <>
            <div className="h-6 bg-white rounded-t-md flex items-center px-2  flex justify-center">
                <h2 className="text-[0.75rem] font-bold">Segment Value Sold Insight (YTD)</h2>
            </div>
            <div
                ref={chartContainerRef}
                className={`wrapper mt-2 bg-white rounded-lg gap-2 ${fullScreen
                    ? "fixed min-w-[84%] h-auto lg:min-h-[84%] top-8 mx-auto z-50"
                    : "h-72"
                    }`}
            >
                {props.data && props.data.length > 0 && (
                    <Chart
                        type="bar"
                        data={chartData}
                        options={options}
                        className="min-w-full lg:max-h-[90%] px-2"
                    />
                )}
            </div>
        </>
    );
};

export default SegementChart;