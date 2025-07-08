import React, { useState, useEffect, Fragment } from "react";
import { useSelector } from "react-redux";
import { Dialog, Transition } from "@headlessui/react";
import { IoEyeOutline } from "react-icons/io5"; // Ionicons version 5
const RollingTable = () => {
    const [isOpen, setIsOpen] = useState(false);
    const allRollingTableData = useSelector(
        (state) => state.singleRolling.singleRollingTableData
    );

    const [data, setData] = useState([]);
    const [quarterlyData, setQuarterlyData] = useState({});

    useEffect(() => {
        setData(allRollingTableData);
    }, [allRollingTableData]);

    function closeModal() {
        setIsOpen(false);
    }

    function openModal() {
        setIsOpen(true);
    }

    console.log("zolo", data)


    const [monthlyDividedData, setMonthlyDividedData] = useState(
        {
            1: [], 2: [], 3: [], 4: [], 5: [], 6: [],
            7: [], 8: [], 9: [], 10: [], 11: [], 12: [],
        }
    )
    useEffect(() => {
        const newDividedData = {
            1: [], 2: [], 3: [], 4: [], 5: [], 6: [],
            7: [], 8: [], 9: [], 10: [], 11: [], 12: [],
        };

        allRollingTableData.forEach((item) => {
            const month = new Date(item.m_year).getMonth() + 1; // 1 = Jan
            newDividedData[month].push(item);
        });

        setMonthlyDividedData(newDividedData);
    }, [allRollingTableData]);

    const [popupGridData, setPopupGridData] = useState("")



    useEffect(() => {
        const quarters = {
            Q1: { budget: 0, sales: 0 },
            Q2: { budget: 0, sales: 0 },
            Q3: { budget: 0, sales: 0 },
            Q4: { budget: 0, sales: 0 },
        };

        data.forEach((entry) => {
            const month = new Date(entry.m_year).getMonth(); // Jan = 0
            const budget = parseFloat(entry.budget || 0);
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

    const handleGridRow = (data) => {
        console.log("hnj", data)
        switch (data) {
            case "Q1":
                return <tr className="bg-blue-500 text-white">
                    <th className="border p-2 w-4">Month</th>
                    <th className="border p-2 w-4">Apr</th>
                    <th className="border p-2 w-4">May</th>
                    <th className="border p-2 w-4">June</th>
                    <th className="border p-2 w-4">Total</th>
                </tr>



            case "Q2":

                return <tr className="bg-blue-500 text-white">
                    <th className="border p-2 w-4">Month</th>
                    <th className="border p-2 w-4">July</th>
                    <th className="border p-2 w-4">Aug</th>
                    <th className="border p-2 w-4">Sep</th>
                    <th className="border p-2 w-4">Total</th>
                </tr>

            case "Q3":



                return <tr className="bg-blue-500 text-white">
                    <th className="border p-2 w-4">Month</th>
                    <th className="border p-2 w-4">Oct</th>
                    <th className="border p-2 w-4">Nov</th>
                    <th className="border p-2 w-4">Dec</th>
                    <th className="border p-2 w-4">Total</th>
                </tr>

            case "Q4":
                return <tr className="bg-blue-500 text-white">
                    <th className="border p-2 w-4">Month</th>
                    <th className="border p-2 w-4">Jan</th>
                    <th className="border p-2 w-4">Feb</th>
                    <th className="border p-2 w-4">Mar</th>
                    <th className="border p-2 w-4">Total</th>
                </tr>



            default:
                break;
        }
    }
    const handleGridData = (quarter) => {
        console.log("zolom", monthlyDividedData)
        // Map each quarter to the corresponding month numbers
        const quarterMonths = {
            Q1: [4, 5, 6],    // Apr, May, Jun
            Q2: [7, 8, 9],    // Jul, Aug, Sep
            Q3: [10, 11, 12], // Oct, Nov, Dec
            Q4: [1, 2, 3],    // Jan, Feb, Mar
        };

        const months = quarterMonths[quarter];

        const getValue = (month, key) => {
            const item = monthlyDividedData[month]?.[0]; // get first (and only) data item for that month
            return item ? Number(item[key] || 0).toFixed(2) : '0.00';
        };

        const getTotal = (key) => {
            return months
                ?.reduce((sum, m) => sum + Number(monthlyDividedData[m]?.[0]?.[key] || 0), 0)
                .toFixed(2);
        };

        return (
            <tbody>
                <tr className="bg-white">
                    <td className="border p-2 w-4 font-medium">Budget</td>
                    {months?.map((m) => (
                        <td key={`budget-${m}`} className="border p-2 w-4">{getValue(m, 'budget')}</td>
                    ))}
                    <td className="border p-2 w-4 font-semibold">{getTotal('budget')}</td>
                </tr>

                <tr className="bg-white">
                    <td className="border p-2 w-4 font-medium">Sales</td>
                    {months?.map((m) => (
                        <td key={`sales-${m}`} className="border p-2 w-4">{getValue(m, 'actual')}</td>
                    ))}
                    <td className="border p-2 w-4 font-semibold">{getTotal('actual')}</td>
                </tr>

                <tr className="bg-white">
                    <td className="border p-2 w-4 font-medium">Ach %</td>
                    {months?.map((m) => (
                        <td key={`ach-${m}`} className="border p-2 w-4">{((getValue(m, 'actual') / getValue(m, 'budget')) * 100).toFixed(2)} </td>
                    ))}
                    <td className="border p-2 w-4 font-semibold">{((getTotal('actual') / getTotal('budget')) * 100).toFixed(2)}</td>
                </tr>
            </tbody>
        );
    };

    return (
        <div className="bg-gray-200  rounded-md shadow-md w-full my-2">
            <div className="overflow-x-auto">
                <table className="min-w-[100px] w-full text-center border border-collapse  text-[0.80rem]">
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
                        <tr className="bg-white">
                            <td className="border  w-4 font-medium"></td>
                            <td className="border  w-4" onClick={() => {
                                setIsOpen(true), setPopupGridData("Q1")

                            }}>
                                <button

                                    className="text-xs text-blue-600 underline hover:text-blue-800 transition"
                                >

                                    <IoEyeOutline size={24} color="blue" />

                                </button></td>
                            <td className="border  w-4" onClick={() => {
                                setIsOpen(true), setPopupGridData("Q2")

                            }

                            }> <button

                                className="text-xs text-blue-600 underline hover:text-blue-800 transition"
                            >
                                    <IoEyeOutline size={24} color="blue" />

                                </button></td>
                            <td className="border  w-4" onClick={() => {
                                setIsOpen(true), setPopupGridData("Q3")

                            }}> <button

                                className="text-xs text-blue-600 underline hover:text-blue-800 transition"
                            >
                                    <IoEyeOutline size={24} color="blue" />

                                </button></td>
                            <td className="border  w-4" onClick={() => {
                                setIsOpen(true), setPopupGridData("Q4")

                            }}> <button

                                className="text-xs text-blue-600 underline hover:text-blue-800 transition"
                            >
                                    <IoEyeOutline size={24} color="blue" />

                                </button></td>
                            <td className="border p-2 w-4" ></td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-5xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <div className="flex justify-between items-center mb-4">
                                        <Dialog.Title as="h3" className="text-sm font-medium text-gray-900">
                                            Budget vs Actual sale
                                        </Dialog.Title>
                                        <button onClick={closeModal} className="text-gray-500 hover:text-red-600 text-xl font-bold">
                                            ×
                                        </button>

                                    </div>

                                    <div className="overflow-auto max-h-[65vh]">
                                        <table className="min-w-[100px] w-full text-center border border-collapse  text-[0.80rem]">
                                            <thead>
                                                {
                                                    handleGridRow(popupGridData)
                                                }

                                            </thead>
                                            {handleGridData(popupGridData)}
                                            {/* <tbody>


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
                                            </tbody> */}
                                        </table>


                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div>
    );
};

export default RollingTable;