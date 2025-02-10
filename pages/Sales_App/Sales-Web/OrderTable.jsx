import React, { useState, useEffect } from "react";



const OrderTable = () => {


    return (

        <div className=" w-full font-arial ">




            <table className="min-w-full divide-y border- divide-gray-200 text-white-400 ">
                <thead className="border-b w-max bg-blue-400">
                    <tr className=" font-arial w-max">
                        <th className="px-4 py-2 text-left dark:border-2 text-xs font-medium text-white  tracking-wider">
                            Date
                        </th>
                        <th className="px-4 py-2  text-left w-max dark:border-2 text-xs font-medium text-white  tracking-wider">
                            Order No
                        </th>
                        <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-white  tracking-wider">
                            Company
                        </th>
                        <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-white  tracking-wider">
                            Order Total
                        </th>
                        <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-white  tracking-wider">
                            Item Count
                        </th>
                        <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-white  tracking-wider">
                            Last Modified
                        </th>

                        <th className="px-4 py-2  text-left dark:border-2 text-xs font-medium text-white tracking-wider">

                        </th>
                    </tr>
                </thead>

                <tbody className="bg-white divide-y  divide-gray-200 text-xs">

                </tbody>
            </table>

        </div>


    );
};

export default OrderTable;
