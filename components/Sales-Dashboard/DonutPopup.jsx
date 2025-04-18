import React, { useState, useEffect } from "react";
import { IoCloseOutline } from "react-icons/io5";

const DonutPopup = (props) => {
    const [selected, setSelected] = useState("category");
    const [nameSort, setNameSort] = useState(true);
    const [catdata, setCatData] = useState([]);
    const [regiondata, setRegionData] = useState([]);

    const data = props.dueData || [];

    return (
        <div className="p-4 bg-white rounded-lg shadow-md max-w-md mx-auto">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold">  X-Factor, Core, and Other Products (Qty)</h2>
                <IoCloseOutline
                    className="text-2xl cursor-pointer"
                    onClick={props.closeModal}
                />
            </div>

            <div className="grid grid-cols-2 gap-2 border-t pt-2">
                <h3 className="text-sm font-semibold text-gray-600">Name</h3>
                <h3 className="text-sm font-semibold text-gray-600">Quantity</h3>

                {data.map((item, index) => (
                    <React.Fragment key={index}>
                        <p className="text-sm text-gray-800">{item._id}</p>
                        <p className="text-sm text-gray-800">{item.sku_billqty}</p>
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

export default DonutPopup;