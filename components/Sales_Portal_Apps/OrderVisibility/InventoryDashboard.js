import React, { useState, useEffect, Fragment } from 'react';
import { Doughnut } from 'react-chartjs-2';
import moment from 'moment';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from 'chart.js';
import { Dialog, Transition } from '@headlessui/react';
import { url } from "@/constants/url";
import axios from "axios";
ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
);

const InventoryDashboard = (props) => {
    const filterState = props.filterState
    const headers = {
        "Content-Type": "application/json",
        secret: "fsdhfgsfuiweifiowefjewcewcebjw",
    };
    const [dashboardData, setDashboardData] = useState({
        totalOnHandQty: 0,
        inTransitQty: 0,
        totalOrderQty: 0,
        stockOutQty: 0,
        stockOutValue: 0,
        productsWithStockOut: 0,
        impactedOrders: 0,
        impactedCustomers: 0,
    });

    const [doughnutData, setDoughnutData] = useState({
        labels: ['On-Hand', 'In-Transit'],
        datasets: [
            {
                data: [0, 0],
                backgroundColor: [
                    'rgba(52, 211, 153, 0.9)',
                    'rgba(59, 130, 246, 0.9)',
                ],
                borderColor: [
                    'rgba(16, 185, 129, 1)',
                    'rgba(37, 99, 235, 1)',
                ],
                borderWidth: 1,
                cutout: '70%',
            },
        ],
    });

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);

    useEffect(() => {
        const data = props.orderDashboardData.stock_dashboard || {};
        const data2 = props.orderDashboardData.impact_dashboard || {};

        setDashboardData({
            totalOnHandQty: data.totalOnHandQty ?? 0,
            inTransitQty: data.inTransitQty ?? 0,
            totalOrderQty: data.totalOrderQty ?? 0,
            stockOutQty: data.stockOutQty ?? 0,
            stockOutValue: data.stockOutValue ?? 0,
            productsWithStockOut: data.productsWithStockOut ?? 0,
            impactedOrders: data2.impactOrders ?? 0,
            impactedCustomers: data2.impactCustomers ?? 0,
        });

        setDoughnutData({
            labels: ['On-Hand', 'In-Transit'],
            datasets: [
                {
                    data: [
                        data.totalOnHandQty ?? 0,
                        data.inTransitQty ?? 0,
                    ],
                    backgroundColor: [
                        'rgba(52, 211, 153, 0.9)',
                        'rgba(59, 130, 246, 0.9)',
                    ],
                    borderColor: [
                        'rgba(16, 185, 129, 1)',
                        'rgba(37, 99, 235, 1)',
                    ],
                    borderWidth: 1,
                    cutout: '70%',
                },
            ],
        });
    }, [props]);

    const doughnutOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        let label = context.label || '';
                        if (label) {
                            label += ': ';
                        }
                        if (context.parsed !== null) {
                            label += context.parsed;
                        }
                        return label;
                    },
                },
            },
        },
    };
    console.log("nop", filterState)
    const [gridData, setGridData] = useState([])
    const getGridData = async (endPoint) => {
        const monthValue = moment(filterState.month).format("YYYY-MM-DD");
        const paramsData = {
            year: filterState.yr || null,
            month: monthValue,
            bg_id: filterState.bgId === "All" || !filterState.bgId ? null : filterState.bgId,
            bu_id: filterState.buId === "All" || !filterState.buId ? null : filterState.buId,
            z_id: filterState.zId === "All" || !filterState.zId ? null : filterState.zId,
            r_id: filterState.rId === "All" || !filterState.rId ? null : filterState.rId,
            t_id: filterState.tId === "All" || !filterState.tId ? null : filterState.tId,
            c_id: 1,
        };
        try {
            const respond = await axios.get(
                `${url}/api/${endPoint}`,
                {
                    headers: headers,
                    params: paramsData
                }
            );
            const apires = await respond.data.data;

            setGridData(apires);
        } catch (error) {
            console.log(error);
        }
    };


    const openModal = (card) => {

        if (card === 'productsWithStockOut') {
            getGridData("get_order_stockout_products")
        }
        else if (card === 'impactedOrders') {
            getGridData("get_order_impacted_orders")
        }
        else if (card === 'impactedCustomers') {
            getGridData("get_order_impacted_customers")
        }


        setSelectedCard(card);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedCard(null);
    };

    const renderGrid = () => {
        if (selectedCard === 'productsWithStockOut') {
            return (
                <table className="min-w-full text-sm">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="py-2 px-3 text-left">Order No</th>
                            <th className="py-2 px-3 text-left">Party Name</th>
                            <th className="py-2 px-3 text-left">Material Name</th>
                            <th className="py-2 px-3 text-left">Stock-Out Qty</th>
                        </tr>
                    </thead>
                    <tbody>
                        {gridData.map((item) => <tr>
                            <td className="py-1 px-3">{item.orderno}</td>
                            <td className="py-1 px-3">efve</td>
                            <td className="py-1 px-3">{item.material_name}</td>
                            <td className="py-1 px-3">{item.stockout_qty}</td>
                        </tr>)}

                        {/* Map your data here */}
                    </tbody>
                </table>
            );
        }
        if (selectedCard === 'impactedOrders') {
            return (
                <table className="min-w-full text-sm">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="py-2 px-3 text-left">SAP Order No</th>
                            <th className="py-2 px-3 text-left">Party Name</th>
                            <th className="py-2 px-3 text-left">Order Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {gridData.map((item) => <tr>
                            <td className="py-1 px-3">{item.sap_order_no}</td>

                            <td className="py-1 px-3">{item.party_name}</td>
                            <td className="py-1 px-3">{item.order_status}</td>
                        </tr>)}
                    </tbody>
                </table>
            );
        }
        if (selectedCard === 'impactedCustomers') {
            return (
                <table className="min-w-full text-sm">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="py-2 px-3 text-left">Party Code</th>
                            <th className="py-2 px-3 text-left">Party Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {gridData.map((item) => <tr>
                            <td className="py-1 px-3">{item.partyCode}</td>

                            <td className="py-1 px-3">{item.partyName}</td>

                        </tr>)}
                    </tbody>
                </table>
            );
        }
    };

    return (
        <div className="max-w-lg mx-auto bg-white rounded-lg shadow-xl overflow-hidden my-4">
            {/* Header */}
            <div className="bg-blue-600 p-4">
                <h2 className="text-xl font-bold text-white">Inventory Dashboard</h2>
            </div>

            {/* Main Content */}
            <div className="p-4 sm:p-5 bg-gray-800 text-black">
                {/* Top Section */}
                <div className="mb-5 p-4 bg-gray-700 rounded-lg shadow">
                    <div className="flex flex-row items-center justify-between">
                        <div className="text-center sm:text-left mb-3 sm:mb-0 flex-shrink-0">
                            <p className="text-gray-400 text-sm">Total Order Quantity</p>
                            <p className="text-xl font-bold text-white">{dashboardData.totalOrderQty}</p>
                        </div>
                        <div className="w-20 h-20 sm:w-24 sm:h-24 relative mx-auto ml-4 flex-shrink-0">
                            <Doughnut data={doughnutData} options={doughnutOptions} />
                        </div>
                        <div className="text-sm sm:mt-0 flex-grow pt-8">
                            <div className="flex items-center flex-col justify-center">
                                <div className="flex flex-row gap-2 justify-center items-center">
                                    <span className="w-3 h-3 bg-emerald-400 rounded-sm flex-shrink-0"></span>
                                    <span className="text-gray-300 whitespace-nowrap">On-Hand:</span>
                                </div>
                                <span className="font-semibold text-white self-center mt-2">
                                    {dashboardData.totalOnHandQty}
                                </span>
                            </div>

                            <div className="flex items-center flex-col justify-center  mt-2">
                                <div className="flex flex-row gap-2 justify-center items-center">
                                    <span className="w-3 h-3 bg-blue-500 rounded-sm  flex-shrink-0"></span>
                                    <span className="text-gray-300 whitespace-nowrap">In-Transit:</span>
                                </div>
                                <span className="font-semibold text-white self-center  mt-2">
                                    {dashboardData.inTransitQty}
                                </span>
                            </div>


                        </div>
                    </div>
                </div>

                {/* Middle Section */}
                <div className="flex flex-row gap-px bg-gray-600 rounded-lg overflow-hidden mb-5 shadow ">
                    <div className="bg-gray-700 p-4 text-center">
                        <p className="text-gray-400 text-sm mb-0.5">Stock-Out Risk Quantity</p>
                        <p className="text-2xl font-bold text-white">{dashboardData.stockOutQty}</p>
                    </div>
                    <div className="bg-gray-700 p-4 text-center">
                        <p className="text-gray-400 text-sm mb-0.5">Stock-Out Risk Value</p>
                        <p className="text-2xl font-bold text-white">{dashboardData.stockOutValue}</p>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="flex flex-row gap-px bg-gray-600 rounded-lg overflow-hidden shadow">
                    <div
                        onClick={() => openModal('productsWithStockOut')}
                        className="cursor-pointer bg-gray-700 p-3 sm:p-4 text-center hover:bg-gray-600 transition"
                    >
                        <p className="text-gray-400 text-xs sm:text-sm mb-0.5 leading-tight">Products with Stock-Out</p>
                        <p className="text-xl sm:text-2xl font-bold text-white">{dashboardData.productsWithStockOut}</p>
                    </div>
                    <div
                        onClick={() => openModal('impactedOrders')}
                        className="cursor-pointer bg-gray-700 p-3 sm:p-4 text-center hover:bg-gray-600 transition"
                    >
                        <p className="text-gray-400 text-xs sm:text-sm mb-0.5 leading-tight">Impacted Orders</p>
                        <p className="text-xl sm:text-2xl font-bold text-white">{dashboardData.impactedOrders}</p>
                    </div>
                    <div
                        onClick={() => openModal('impactedCustomers')}
                        className="cursor-pointer bg-gray-700 p-3 sm:p-4 text-center hover:bg-gray-600 transition"
                    >
                        <p className="text-gray-400 text-xs sm:text-sm mb-0.5 leading-tight">Impacted Customers</p>
                        <p className="text-xl sm:text-2xl font-bold text-white">{dashboardData.impactedCustomers}</p>
                    </div>
                </div>
            </div>

            {/* Modal */}
            <Transition appear show={isModalOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
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
                                <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title className="text-lg font-medium text-gray-900 mb-4">
                                        {selectedCard === 'productsWithStockOut' && "Products with Stock-Out"}
                                        {selectedCard === 'impactedOrders' && "Impacted Orders"}
                                        {selectedCard === 'impactedCustomers' && "Impacted Customers"}
                                    </Dialog.Title>
                                    {renderGrid()}
                                    <div className="mt-4 text-right">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                                            onClick={closeModal}
                                        >
                                            Close
                                        </button>
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

export default InventoryDashboard;
