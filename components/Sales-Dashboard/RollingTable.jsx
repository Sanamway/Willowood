import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const RollingTable = () => {
    const allRollingTableData = useSelector(
        (state) => state.singleRolling.singleRollingTableData
    );

    const [data, setData] = useState([]);
    const [quarterlyData, setQuarterlyData] = useState({});

    useEffect(() => {
        setData(allRollingTableData);
    }, [allRollingTableData]);

    useEffect(() => {
        const quarters = {
            Q1: { budget: 0, sales: 0 },
            Q2: { budget: 0, sales: 0 },
            Q3: { budget: 0, sales: 0 },
            Q4: { budget: 0, sales: 0 },
        };

        data.forEach((entry) => {
            const month = new Date(entry.m_year).getMonth(); // Jan = 0
            const budget = parseFloat(entry.target || 0);
            const sales = parseFloat(entry.actual || 0);

            if (month >= 3 && month <= 5) {
                quarters.Q1.budget += budget;
                quarters.Q1.sales += sales;
            } else if (month >= 6 && month <= 8) {
                quarters.Q2.budget += budget;
                quarters.Q2.sales += sales;
            } else if (month >= 9 && month <= 11) {
                quarters.Q3.budget += budget;
                quarters.Q3.sales += sales;
            } else if (month >= 0 && month <= 2) {
                quarters.Q4.budget += budget;
                quarters.Q4.sales += sales;
            }
        });

        // Calculate achievement % and total
        let totalBudget = 0;
        let totalSales = 0;

        for (const key in quarters) {
            const q = quarters[key];
            q.ach = q.budget ? ((q.sales / q.budget) * 100).toFixed(2) : "0.00";
            totalBudget += q.budget;
            totalSales += q.sales;
        }

        quarters.Total = {
            budget: totalBudget,
            sales: totalSales,
            ach: totalBudget ? ((totalSales / totalBudget) * 100).toFixed(2) : "0.00",
        };

        setQuarterlyData(quarters);
    }, [data]);

    return (
        <div className="bg-gray-200  rounded-md shadow-md w-full my-2">
            <div className="overflow-x-auto">
                <table className="min-w-[100px] w-full text-center border border-collapse  text-[0.50rem]">
                    <thead>
                        <tr className="bg-blue-500 text-white">
                            <th className="border p-2 w-4">Month</th>
                            <th className="border p-2 w-4">Q1</th>
                            <th className="border p-2 w-4">Q2</th>
                            <th className="border p-2 w-4">Q3</th>
                            <th className="border p-2 w-4">Q4</th>
                            <th className="border p-2 w-4">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-white">
                            <td className="border p-2 w-4 font-medium">Budget</td>
                            <td className="border p-2 w-4">{Number(quarterlyData?.Q1?.budget || 0).toFixed(2)}</td>
                            <td className="border p-2 w-4">{Number(quarterlyData?.Q2?.budget || 0).toFixed(2)}</td>
                            <td className="border p-2 w-4">{Number(quarterlyData?.Q3?.budget || 0).toFixed(2)}</td>
                            <td className="border p-2 w-4">{Number(quarterlyData?.Q4?.budget || 0).toFixed(2)}</td>
                            <td className="border p-2 w-4">{Number(quarterlyData?.Total?.budget || 0).toFixed(2)}</td>
                        </tr>
                        <tr className="bg-white">
                            <td className="border p-2 w-4 font-medium">Sales</td>
                            <td className="border p-2 w-4">{Number(quarterlyData?.Q1?.sales || 0).toFixed(2)}</td>
                            <td className="border p-2 w-4">{Number(quarterlyData?.Q2?.sales || 0).toFixed(2)}</td>
                            <td className="border p-2 w-4">{Number(quarterlyData?.Q3?.sales || 0).toFixed(2)}</td>
                            <td className="border p-2 w-4">{Number(quarterlyData?.Q4?.sales || 0).toFixed(2)}</td>
                            <td className="border p-2 w-4">{Number(quarterlyData?.Total?.sales || 0).toFixed(2)}</td>
                        </tr>
                        <tr className="bg-white">
                            <td className="border p-2 w-4 font-medium">Ach %</td>
                            <td className="border p-2 w-4">{Number(quarterlyData?.Q1?.ach || 0).toFixed(2)}</td>
                            <td className="border p-2 w-4">{Number(quarterlyData?.Q2?.ach || 0).toFixed(2)}</td>
                            <td className="border p-2 w-4">{Number(quarterlyData?.Q3?.ach || 0).toFixed(2)}</td>
                            <td className="border p-2 w-4">{Number(quarterlyData?.Q4?.ach || 0).toFixed(2)}</td>
                            <td className="border p-2 w-4">{Number(quarterlyData?.Total?.ach || 0).toFixed(2)}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RollingTable;