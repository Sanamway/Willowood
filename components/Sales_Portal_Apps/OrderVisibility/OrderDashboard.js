import React, { useState, useEffect, Fragment } from "react";
import { Doughnut, Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
} from "chart.js";
import { Dialog, Transition } from "@headlessui/react";

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
    Title
);

const OrdersDashboard = (props) => {
    const [doughnutChartData, setDoughnutChartData] = useState({
        labels: [],
        datasets: [],
    });
    const [barChartData, setBarChartData] = useState({
        labels: [],
        datasets: [],
    });
    const [cardData, setCardData] = useState({
        orderValue: "0.00",
        orderInvoice: "0.00",
        pendingInvoice: "0.00",
    });

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);

    useEffect(() => {
        const orderStatusGraph = props.orderDashboardData?.order_dashboard?.orderStatusGraph || [];

        const doughnutLabels = orderStatusGraph.map((item) => item._id);
        const doughnutCounts = orderStatusGraph.map((item) => item.count);

        const doughnutColors = [
            "rgba(54, 162, 235, 0.7)",
            "rgba(25, 118, 210, 0.7)",
            "rgba(13, 71, 161, 0.7)",
            "rgba(0, 47, 108, 0.7)",
            "rgba(75, 192, 192, 0.7)",
            "rgba(153, 102, 255, 0.7)",
            "rgba(255, 159, 64, 0.7)",
        ];
        const doughnutBorderColors = doughnutColors.map((c) => c.replace("0.7", "1"));

        setDoughnutChartData({
            labels: doughnutLabels,
            datasets: [
                {
                    label: "Order Status Counts",
                    data: doughnutCounts,
                    backgroundColor: doughnutColors.slice(0, doughnutLabels.length),
                    borderColor: doughnutBorderColors.slice(0, doughnutLabels.length),
                    borderWidth: 1,
                },
            ],
        });

        setBarChartData({
            labels: doughnutLabels,
            datasets: [
                {
                    label: "Order Count",
                    data: doughnutCounts,
                    backgroundColor: "rgba(54, 162, 235, 0.7)",
                    borderColor: "rgba(54, 162, 235, 1)",
                    borderWidth: 1,
                },
            ],
        });

        setCardData({
            orderValue: props.orderDashboardData?.order_dashboard?.totalOrderValue != null
                ? props.orderDashboardData.order_dashboard.totalOrderValue.toFixed(2)
                : "0.00",
            orderInvoice: props.orderDashboardData?.order_dashboard?.totalInvoiceValue != null
                ? props.orderDashboardData.order_dashboard.totalInvoiceValue.toFixed(2)
                : "0.00",
            pendingInvoice: props.orderDashboardData?.order_dashboard?.pendingInvoices != null
                ? props.orderDashboardData.order_dashboard.pendingInvoices.toFixed(2)
                : "0.00",
        });
    }, [props.orderDashboardData]);

    const openModal = (card) => {
        setSelectedCard(card);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedCard(null);
    };

    const renderGrid = () => {
        if (selectedCard === "orderValue") {
            return (
                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="py-2 px-3 text-left">Order No</th>
                                <th className="py-2 px-3 text-left">Party Name</th>
                                <th className="py-2 px-3 text-left">Material Name</th>
                                <th className="py-2 px-3 text-left">Stock Out Qty</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Example rows */}
                            <tr>
                                <td className="py-1 px-3">ORD001</td>
                                <td className="py-1 px-3">ABC Ltd</td>
                                <td className="py-1 px-3">Steel Pipe</td>
                                <td className="py-1 px-3">20</td>
                            </tr>
                            {/* ... */}
                        </tbody>
                    </table>
                </div>
            );
        }

        if (selectedCard === "orderInvoice") {
            return (
                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="py-2 px-3 text-left">SAP Order No</th>
                                <th className="py-2 px-3 text-left">Party Name</th>
                                <th className="py-2 px-3 text-left">Order Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="py-1 px-3">SAP1234</td>
                                <td className="py-1 px-3">XYZ Corp</td>
                                <td className="py-1 px-3">Dispatched</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            );
        }

        if (selectedCard === "pendingInvoice") {
            return (
                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="py-2 px-3 text-left">Party Code</th>
                                <th className="py-2 px-3 text-left">Party Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="py-1 px-3">P001</td>
                                <td className="py-1 px-3">LMN Traders</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            );
        }
    };

    return (
        <div className="max-w-lg mx-auto bg-white rounded-lg shadow-xl overflow-hidden my-4">
            <div className="bg-blue-600 p-4">
                <h2 className="text-xl font-bold text-white">Orders Dashboard</h2>
            </div>

            <div className="flex flex-row justify-center gap-3 text-center text-sm mb-4 mt-4">
                <div
                    onClick={() => openModal("orderValue")}
                    className="cursor-pointer rounded-lg shadow border border-blue-200 p-3 hover:bg-blue-100 transition duration-300"
                >
                    <p className="text-gray-600">Total Order Value</p>
                    <p className="text-md font-semibold text-blue-700">
                        {Math.floor(cardData.orderValue)}
                    </p>
                </div>
                <div
                    onClick={() => openModal("orderInvoice")}
                    className="cursor-pointer rounded-lg shadow border border-orange-200 p-3 hover:bg-orange-100 transition duration-300"
                >
                    <p className="text-gray-600">Total Invoice Value</p>
                    <p className="text-md font-semibold text-orange-600">
                        {Math.floor(cardData.orderInvoice)}
                    </p>
                </div>
                <div
                    onClick={() => openModal("pendingInvoice")}
                    className="cursor-pointer rounded-lg shadow border border-red-200 p-3 hover:bg-red-100 transition duration-300"
                >
                    <p className="text-gray-600">Pending Invoices</p>
                    <p className="text-md font-semibold text-red-600">
                        {Math.floor(cardData.pendingInvoice)}
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                {/* Your charts here */}
            </div>

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
                                        {selectedCard === "orderValue" && "Impacted Orders"}
                                        {selectedCard === "orderInvoice" && "Impacted Orders"}
                                        {selectedCard === "pendingInvoice" && "Impacted Customers"}
                                    </Dialog.Title>

                                    {renderGrid()}

                                    <div className="mt-4 text-right">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
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

export default OrdersDashboard;
