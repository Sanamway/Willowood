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

const TargetVsCollectionGraph = (props) => {
    const [labels, setLabels] = useState([]);
    const [datasets, setDatasets] = useState([]);

    const chartRef = useRef(null);
    const chartContainerRef = useRef(null);
    const [fullScreen, setFullScreen] = useState(false);

    useEffect(() => {
        if (!props.data || props.data.length === 0) return;

        const chartLabels = props.data.map((item) => [
            item.business_segment || "",
            item.business_unit_hod_name || "",
            item.zone_hod_name || "",
            item.region_hod_name || "",
            item.territory_hod_name || ""
        ].reverse().find(value => value !== ""));
        const chartData = props.data.map((item) => item.actual);

        setLabels(chartLabels);
        setDatasets([
            {
                label: "My Team",
                backgroundColor: "rgb(99, 115, 255)", // red with transparency
                borderColor: "rgb(99, 255, 161)",       // solid red border
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
            <div className="h-6 bg-white rounded-t-md flex items-center px-2 ">
                <h2 className="text-[0.75rem]">My team Collection Insight </h2>
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

export default TargetVsCollectionGraph;