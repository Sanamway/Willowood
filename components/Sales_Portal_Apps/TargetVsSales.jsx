import React, { useState, useEffect, useRef } from "react";
import { Chart } from "react-chartjs-2";
import html2canvas from "html2canvas";
import {
    Chart as ChartJs,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Legend,
    Tooltip,
} from "chart.js";
import { MdOutlineCloudDownload } from "react-icons/md";
import moment from "moment";

// ✅ Register Chart.js components ONCE
ChartJs.register(LinearScale, BarElement, PointElement, LineElement, Legend, Tooltip);

const TargetVsSales = (props) => {
    const chartRef = useRef(null);
    const chartContainerRef = useRef(null);

    const [data, setData] = useState({
        labels: [],
        datasets: [],
    });

    const [height, setHeight] = useState(false);
    const [fullScreen, setFullScreen] = useState(false);

    // ✅ Update chart data when props change
    useEffect(() => {
        if (!props.datasets || !props.datasets.length) return;

        setData({
            labels: props.lab || [],
            datasets: props.datasets,
        });
    }, [props.datasets, props.lab]);

    // ✅ Tooltip logic (optional – not active now)
    function triggerTooltip(chart) {
        if (!chart?.tooltip) return;
        chart.update();
    }

    useEffect(() => {
        const chart = chartRef.current;
        triggerTooltip(chart);
    }, []);

    const options = {
        responsive: true,
        maintainAspectRatio: false,
    };

    // ✅ Optional: download chart as image
    const handleDownload = () => {
        if (!chartContainerRef.current) return;
        html2canvas(chartContainerRef.current).then((canvas) => {
            const link = document.createElement("a");
            link.download = `chart-${moment().format("YYYYMMDD-HHmmss")}.jpg`;
            link.href = canvas.toDataURL("image/jpeg");
            link.click();
        });
    };

    return (
        <>
            <div className="h-6 bg-white rounded-t-md flex items-center px-2">
                <h2 className="text-[0.75rem]">Graph Sales Insight</h2>
                <button onClick={handleDownload} className="ml-auto text-gray-600 hover:text-black">
                    <MdOutlineCloudDownload />
                </button>
            </div>
            <div
                ref={chartContainerRef}
                className={`wrapper mt-2 ${!height ? "h-72" : ""
                    } lg:w-full flex-col bg-white rounded-lg gap-2 ${fullScreen
                        ? "fixed min-w-[84%] h-auto lg:min-h-[84%] top-8 mx-auto"
                        : "h-auto"
                    }`}
            >
                {data.datasets?.length > 0 && (
                    <Chart
                        className={`min-w-full lg:max-h-64 ${fullScreen ? "lg:max-h-[84%] mt-2" : ""
                            } px-2`}
                        ref={chartRef}
                        type="bar"
                        data={data}
                        options={options}
                    />
                )}
            </div>
        </>
    );
};

export default TargetVsSales;