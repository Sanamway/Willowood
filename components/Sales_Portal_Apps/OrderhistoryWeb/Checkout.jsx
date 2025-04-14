
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Fragment } from "react";
// import OrderSuccessModal from "@/modals/OrderSuccessModal";

const Checkout = () => {
    const router = useRouter();
    const [selectedPayment, setSelectedPayment] = useState("card");

    const [orderedItems, setOrderedItems] = useState([
        // { id: 1, name: "Organic Fertilizer", price: 29.99, selected: false },
        // { id: 2, name: "Garden Tools Set", price: 49.99, selected: false },
        // { id: 3, name: "Seeds Package", price: 15.99, selected: false },
        // { id: 4, name: "Plant Pots (Set of 3)", price: 34.99, selected: false },
        // {
        //   id: 1,
        //   name: "MOMIJI (12 x 60 gm)",
        //   price: 9900,
        //   image:
        //     "https://krishibarters.com/next/image?url=https%3A%2F%2Fkborg.s3.ap-south-1.amazonaws.com%2F1%2Fproduct_image%2F07806150-2ea3-4bb9-a99e-29249feefc39_original.jpeg&w=1080&q=75",
        //   quantity: 1
        // },
        // {
        //   id: 2,
        //   name: "SHIFT (2 x 5000 ml)",
        //   price: 8499,
        //   image:
        //     "https://krishibarters.com/next/image?url=https%3A%2F%2Fkborg.s3.ap-south-1.amazonaws.com%2F1%2Fproduct_image%2F7c929586-07f6-40cd-9a9e-f64406ffebca_original.jpeg&w=1080&q=75",
        //   quantity: 1
        // },
        // {
        //   id: 3,
        //   name: "SHIFT (2 x 5000 ml)",
        //   price: 8499,
        //   image:
        //     "https://krishibarters.com/next/image?url=https%3A%2F%2Fkborg.s3.ap-south-1.amazonaws.com%2F1%2Fproduct_image%2F7c929586-07f6-40cd-9a9e-f64406ffebca_original.jpeg&w=1080&q=75",
        //   quantity: 1
        // }
    ]);

    useEffect(() => {
        if (router.query.data) {
            const items = JSON?.parse(router.query.data);
            setOrderedItems(items);
        }
    }, [router.query]);

    let subtotal;
    let taxCost = 5;
    let shippingCost = 30;
    subtotal = React.useMemo(() => {
        return orderedItems.reduce((total, item) => total + item.price * item.quantity, 0);
    }, [orderedItems]);

    const handleItemSelection = (itemId) => {
        setOrderedItems((prevItems) =>
            prevItems.map((item) => {
                if (item.id === itemId) {
                    return { ...item, selected: !item.selected };
                }
                return item;
            })
        );
    };

    console.log("Query", orderedItems);
    const [isOpen, setIsOpen] = useState(null);

    const handleOpen = () => {
        setIsOpen(true);
    };

    return (
        <div className="min-h-screen bg-gray-100 text-gray-700 py-12">
            <div className="container mx-auto py-8">
                <h1 className="lg:text-3xl text-2xl font-bold mb-6 px-4">Checkout</h1>

                <div className="flex flex-col lg:flex-row gap-8 px-1.5">

                    <div className="lg:w-2/3">



                        <div className="bg-white lg:p-6 p-1.5 rounded-lg shadow-md mb-4">
                            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                            <div className="space-y-4">
                                <label className="flex items-center p-4 border rounded cursor-pointer hover:bg-gray-50">
                                    <div className="flex lg:flex  gap-1 justify-between w-full ">

                                        <div className="flex text-xs lg:text-sm gap-1">
                                            <h2 className="font-semibold">Date: </h2>
                                            <h2 className="text-gray-500 whitespace-nowrap">{new Date().toDateString()}</h2>
                                        </div>
                                    </div>
                                </label>
                                <label className="flex items-center p-2 border rounded cursor-pointer hover:bg-gray-50">
                                    <div className="flex gap-1 justify-between w-full">
                                        <div className="flex items-start justify-center w-full flex-col ">
                                            <h2 className="text-xl font-semibold mb-">Billing Address</h2>
                                            <div className="flex lg:flex-row flex-col w-full items-center flex-wrap justify-center">
                                                <div className="flex text-xs lg:text-sm gap- w-full py-1">
                                                    <h2 className="font-semibold whitespace-nowrap "> </h2>
                                                    <h3 className="text-gray-500 whitespace-nowrap font-semibold">
                                                        MH Ichamani Krushi Seva Kendra - Ugaon Ugaon
                                                    </h3>
                                                </div>
                                                <div className="flex text-xs flex-col lg:flex-row gap-1 lg:text-sm gap- w-full py-2">
                                                    <h2 className="font-semibold whitespace-nowrap ">Address : </h2>
                                                    <h3 className="text-gray-500 whitespace-nowrap  font-semibold">
                                                        Ambala Road Shahzadpur Ambala 134202 Haryana
                                                    </h3>
                                                </div>
                                                <div className="flex text-xs lg:text-sm gap-1 w-full gap-x-2  ">
                                                    <h2 className="font-semibold whitespace-nowrap ">City: </h2>
                                                    <h2 className="text-gray-500  ">Hissar</h2>
                                                    <div className="flex px-2 gap-x-2">
                                                        <h2 className="font-semibold whitespace-nowrap ">Postal: </h2>
                                                        <h2 className="text-gray-500 ">125005</h2>
                                                    </div>
                                                    <div className="flex px-2 gap-x-2">
                                                        <h2 className="font-semibold whitespace-nowrap ">Phone: </h2>
                                                        <h2 className="text-gray-500 ">8694000008</h2>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex lg:flex-row flex-col w-full items-center flex-wrap justify-center">
                                                <div className="flex text-xs lg:text-sm gap- w-full py-2 gap-x-2">
                                                    <h2 className="font-semibold whitespace-nowrap ">SAP Code : </h2>
                                                    <h2 className="text-gray-500">118261</h2>
                                                </div>
                                                <div className="flex text-xs lg:text-sm gap-1 w-full  ">
                                                    <h2 className="font-semibold whitespace-nowrap gap-x-2 ">Depot Code : </h2>
                                                    <h2 className="text-gray-500  ">313131</h2>
                                                    <div className="flex px-2 gap-x-2">
                                                        <h2 className="font-semibold whitespace-nowrap ">Depot Desc : </h2>
                                                        <h2 className="text-gray-500 ">DepotDesc</h2>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* <div>
                      <h2 className="font-semibold">Date: </h2>
                      <h2 className="text-gray-500">{new Date().toDateString()}</h2>
                    </div> */}
                                    </div>
                                </label>
                            </div>
                        </div>

                        {/* Order Preference Section */}

                        <div className="bg-white p-1.5 lg:p-5 rounded-lg shadow-md mb-4">
                            <h2 className="text-xl font-semibold mb-4">Items List : </h2>

                            <div className="overflow-x-auto">
                                <table className="min-w-full table-auto border-collapse">
                                    <thead>
                                        <tr className="border-b text-xs">
                                            <th className="py-2 px-2 text-left">Item Name</th>
                                            <th className="py-2 px-2 text-left">UOM</th>
                                            <th className="py-2 px-2 text-left">Qty</th>
                                            <th className="py-2 px-2 text-left">Rate</th>
                                            <th className="py-2 px-2 text-left">Value</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orderedItems?.map((item) => (
                                            <tr
                                                key={item.id}
                                                className={`border-b text-xs lg:text-sm ${item.selected ? "bg-blue-50 border-blue-500" : "hover:bg-gray-100"
                                                    }`}
                                            >
                                                <td className="py-2 px-2 whitespace-nowrap">
                                                    <td>TG-D010_BR</td>
                                                    {item?.name}
                                                </td>
                                                <td className="py-2 px-2">{"UOM"}</td>
                                                <td className="py-2 px-2">{item.quantity}</td>
                                                <td className="py-2 px-2 whitespace-nowrap">₹ {item.price.toLocaleString()}</td>
                                                <td className="py-2 px-2">{(item.quantity * item.price).toLocaleString()}</td>
                                            </tr>
                                        ))}
                                        <tr className="border-t font-semibold text-sm  ">
                                            <td className="py-2 rounded-l-md  px-4 text-left bg-green-200 " colSpan="4">
                                                Total
                                            </td>
                                            <td className="py-2 px-1 rounded-r-md whitespace-nowrap bg-green-200">
                                                ₹{" "}
                                                {orderedItems
                                                    ?.reduce((total, item) => total + item.quantity * item.price, 0)
                                                    .toLocaleString()}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            {orderedItems.some((item) => item.selected) && (
                                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                                    <h3 className="font-medium mb-2">Selected Items Order:</h3>
                                    <ol className="list-decimal list-inside space-y-1">
                                        {orderedItems
                                            .filter((item) => item.selected)
                                            .map((item) => (
                                                <li key={item.id} className="text-gray-600">
                                                    {item.name}
                                                </li>
                                            ))}
                                    </ol>
                                </div>
                            )}
                        </div>

                        {/* Delivery Address */}
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h2 className="text-xl font-semibold lg:mb-4 mb-2">Delivery Address </h2>
                            <div className="space-y-4">
                                <div className="address flex gap-1  flex-wrap">
                                    <div>
                                        <h2>MH Ichamani Krushi Seva Kendra - Ugaon Ugaon</h2>
                                    </div>
                                    <h2> Hissar</h2>,<h2> 125005</h2>,<h2> 9503509801</h2>
                                </div>
                            </div>
                        </div>

                        {/* Territory EMP Details  */}
                        <div className="bg-white lg:p-4 p-1.5 rounded-lg shadow-md mt-4">
                            <div className="space-y-4">
                                <label className="flex items-center p-3 border rounded cursor-pointer hover:bg-gray-50">
                                    <div className="flex lg:flex-row flex-col gap-1 justify-between w-full">
                                        <div className="flex gap-1">
                                            <h2 className="font-semibold">Territory: </h2>
                                            <h2 className="text-gray-500">TrXXXXXXXXXXXX</h2>
                                        </div>
                                        <div className="flex gap-1">
                                            <h2 className="font-semibold">Region: </h2>
                                            <h2 className="text-gray-500">{"REGxxxxxx"}</h2>
                                        </div>
                                    </div>
                                </label>
                                <label className="flex items-center p-3 border rounded cursor-pointer hover:bg-gray-50">
                                    <div className="flex  flex-col gap-1 justify-between w-full">
                                        <div className="flex lg:flex-row flex-col gap-2 py-2 justify-between w-full">
                                            <div className="flex gap-1">
                                                <h2 className="font-semibold">Payment Terms: </h2>
                                                <h2 className="text-gray-500">Payxxxxxxxx</h2>
                                            </div>
                                            <div className="flex gap-1">
                                                <h2 className="font-semibold">Inco Terms: </h2>
                                                <h2 className="text-gray-500">Incxxxxxxxx</h2>
                                            </div>
                                        </div>

                                        <div className="flex lg:flex-row flex-col gap-1 justify-between w-full">
                                            <div className="flex gap-1">
                                                <h2 className="font-semibold">Employee Code: </h2>
                                                <h2 className="text-gray-500">Wclplxxx</h2>
                                            </div>
                                            <div className="flex gap-1">
                                                <h2 className="font-semibold">Inco Location: </h2>
                                                <h2 className="text-gray-500">Payxxxxxxxx</h2>
                                            </div>
                                        </div>
                                        <div className="flex lg:flex-row flex-col gap-1 justify-between w-full">
                                            <div className="flex gap-1">
                                                <h2 className="font-semibold">Name: </h2>
                                                <h2 className="text-gray-500">XXXXXXx</h2>
                                            </div>
                                            <div className="flex gap-1">
                                                <h2 className="font-semibold">Order Status: </h2>
                                                <h2 className="text-gray-500">Payxxxxxxxx</h2>
                                            </div>
                                        </div>
                                    </div>
                                </label>
                            </div>
                        </div>

                        {/* Payment Method  */}

                        {/* <div className="bg-white p-6 rounded-lg shadow-md mt-6">
              <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
              <div className="space-y-4">
                <div className="flex gap-4 mb-4">
                  <button
                    className={`px-4 py-2 rounded ${
                      selectedPayment === "card" ? "bg-blue-600 text-white" : "bg-gray-200"
                    }`}
                    onClick={() => setSelectedPayment("card")}
                  >
                    Credit Card
                  </button>
                  <button
                    className={`px-4 py-2 rounded ${
                      selectedPayment === "upi" ? "bg-blue-600 text-white" : "bg-gray-200"
                    }`}
                    onClick={() => setSelectedPayment("upi")}
                  >
                    UPI
                  </button>
                </div>
                {selectedPayment === "card" && (
                  <div className="space-y-4">
                    <input type="text" placeholder="Card Number" className="border p-2 rounded w-full" />
                    <div className="grid grid-cols-2 gap-4">
                      <input type="text" placeholder="MM/YY" className="border p-2 rounded" />
                      <input type="text" placeholder="CVV" className="border p-2 rounded" />
                    </div>
                  </div>
                )}
                {selectedPayment === "upi" && (
                  <input type="text" placeholder="Enter UPI ID" className="border p-2 rounded w-full" />
                )}
              </div>
            </div> */}
                    </div>

                    {/* Right Section - Order Summary */}
                    <div className="lg:w-1/3">
                        <div className="bg-white p-6 rounded-lg shadow-md sticky top-20">
                            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                            <div className="space-y-4">
                                <div className="flex justify-between">
                                    <span>Subtotal</span>
                                    <span> ₹ {subtotal.toLocaleString()}</span>
                                </div>
                                {/* <div className="flex justify-between">
                  <span>Shipping</span>
                  <span> ₹ {shippingCost}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span> ₹ {taxCost}</span>
                </div> */}
                                <div className="border-t pt-4">
                                    <div className="flex justify-between font-semibold">
                                        <span>Total</span>
                                        <span> ₹ {subtotal.toLocaleString()}</span>
                                    </div>
                                </div>
                                <button
                                    onClick={handleOpen}
                                    className="w-full bg-yellow-400 hover:bg-yellow-500 py-3 rounded-lg font-semibold"
                                >
                                    Final Order Book
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <OrderSuccessModal isOpen={isOpen} setOpen={() => setIsOpen(!isOpen)}></OrderSuccessModal> */}
        </div>
    );
};

export default Checkout;