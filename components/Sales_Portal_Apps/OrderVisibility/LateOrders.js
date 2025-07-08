import React from 'react';
// Remove Doughnut and Bar imports as they are not used in the final design based on the image.
// Remove ChartJS registrations and data/options for charts as they are not part of the image design.

const LateOrders = () => {
    // Data for the "Very Late Orders" list
    const lateOrders = [
        {
            time: '2 days, 4 hrs',
            orderNumber: 'STO-23442772',
            status: 'Fully Shipped',
            carrier: 'ABC',
            timeColor: 'text-red-500' // Custom color for time to match the design
        },
        {
            time: '1 day, 16 hrs',
            orderNumber: '309235944',
            status: 'Fully Shipped',
            carrier: 'XYZ',
            timeColor: 'text-red-500' // Custom color for time to match the design
        },
        {
            time: '460+ min',
            orderNumber: 'SO-23445076',
            status: 'Fully Shipped',
            carrier: 'TNY',
            timeColor: 'text-orange-500' // Using orange for slightly less critical late times
        },
        {
            time: '250+ min',
            orderNumber: 'AP-166910294',
            status: 'Fully Shipped',
            carrier: 'ODP',
            timeColor: 'text-orange-500' // Using orange for slightly less critical late times
        },
    ];

    return (
        <div className="max-w-lg mx-auto bg-white rounded-lg shadow-xl overflow-hidden my-4">
            {/* Header for "Very Late Orders" */}
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-400 to-blue-600 text-white">
                <div className="flex items-center">
                    {/* Filter Icon (a simple placeholder for now) */}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V19l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                        />
                    </svg>
                    <h2 className="text-lg font-semibold">Very Late Orders</h2>
                </div>
                {/* Three dots icon */}
                <div className="flex space-x-1">
                    <span className="h-1.5 w-1.5 bg-white rounded-full"></span>
                    <span className="h-1.5 w-1.5 bg-white rounded-full"></span>
                    <span className="h-1.5 w-1.5 bg-white rounded-full"></span>
                </div>
            </div>

            {/* List of Late Orders */}
            <div className="p-4 space-y-4">
                {lateOrders.map((order, index) => (
                    <div
                        key={index}
                        className="bg-gray-50 p-4 rounded-lg border border-gray-200"
                    >
                        <div className="flex justify-between items-start">
                            <div className="flex-grow">
                                <p className={`font-bold text-lg ${order.timeColor}`}>
                                    {order.time}
                                </p>
                                <p className="text-sm text-gray-600 uppercase mt-1">
                                    ORDER {order.orderNumber}
                                </p>
                            </div>
                            <div className="text-right">
                                <p className="text-sm text-gray-700">Status: {order.status}</p>
                                <p className="text-sm text-gray-700">Carrier: {order.carrier}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LateOrders;