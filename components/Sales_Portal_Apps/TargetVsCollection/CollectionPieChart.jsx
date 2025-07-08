// CollectionPieChart.jsx
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const CollectionPieChart = ({ data }) => {

    const keys = Object.keys(data).filter(
        (key) => key !== "Net Balance Amt(INR)" && data[key] > 0
    );

    const chartOptions = {
        plugins: {
            legend: {
                display: false,
            },
        },
    };

    const colors = {
        "0-60": "#36A2EB ",
        "61-90": "#9966FF",
        "91-120": "#00A86B",
        "121-180": "#FF6384",     // red
        "180-365": "#FF9F40",     // orange
        "366-720": "#FFCD56",     // yellow
        "720 And Above": "#4BC0C0", // green
    };

    const chartData = {
        labels: keys.map((key) => `${key} (${data[key]})`),
        datasets: [
            {
                data: keys.map((key) => data[key]),
                backgroundColor: keys.map((key) => colors[key]),
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className="w-full max-w-md mx-auto p-4 bg-white shadow rounded-lg">
            <h2 className="text-center text-gray-700 font-semibold mb-4">
                Collection Breakdown (Aging)
            </h2>

            {/* Flex container to align pie chart and legend side by side */}
            <div className="flex justify-center gap-4">
                {/* Pie Chart */}
                <div className="w-48">
                    <Pie data={chartData} options={chartOptions} />
                </div>

                {/* Legend (Breakdown) */}
                <div className="flex flex-col justify-center gap-2">
                    {keys.map((key) => (
                        <div key={key} className="flex items-center space-x-2">
                            <span
                                className="inline-block w-4 h-4 rounded"
                                style={{ backgroundColor: colors[key] }}
                            ></span>
                            <span className="text-sm text-gray-700">
                                {key} ({Number(data[key]).toFixed(2)})
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

};

export default CollectionPieChart;
