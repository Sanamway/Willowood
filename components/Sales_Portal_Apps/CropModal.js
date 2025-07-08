import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { FaTrash } from "react-icons/fa";
const CropModal = ({
    isCropModalOpen,
    setIsCropModalOpen,
    selectedCrop,
    setSelectedCrop,
    allCrop,
    rowCrops,
    setRowCrops,
    currentRowIdx,
    pogLiquidation
}) => {

    const handleAddCrop = () => {
        if (!selectedCrop || currentRowIdx === null) return;

        const existingCrops = rowCrops[currentRowIdx] || [];
        const cropExists = existingCrops.some(crop => Number(crop.cr_id) === Number(selectedCrop));
        if (cropExists) {
            window.alert("Crop Already Exist")

        } else {
            const cropData = allCrop.find(crop => Number(crop.cr_id) === Number(selectedCrop));
            if (cropData) {
                const updatedCrops = [...existingCrops, { cr_id: cropData.cr_id, crop_name: cropData.crop_name, quantity: '' }];
                setRowCrops(prev => ({ ...prev, [currentRowIdx]: updatedCrops }));
                setSelectedCrop('');
            }
        }

    };

    const handleQuantityChange = (cr_id, value) => {
        setRowCrops(prev => {
            const updatedCrops = prev[currentRowIdx].map(crop =>
                crop.cr_id === cr_id ? { ...crop, quantity: value } : crop
            );
            return { ...prev, [currentRowIdx]: updatedCrops };
        });
    };

    const handleRemoveCrop = (cr_id) => {
        setRowCrops(prev => {
            const updatedCrops = prev[currentRowIdx].filter(crop => crop.cr_id !== cr_id);
            return { ...prev, [currentRowIdx]: updatedCrops };
        });
    };

    const cropList = rowCrops[currentRowIdx] || [];

    return (
        <Transition appear show={isCropModalOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10"
                onClose={() => {
                    if (Number(pogLiquidation) === Number(cropList.reduce((sum, crop) => {
                        const qty = parseFloat(crop.quantity);
                        return sum + (isNaN(qty) ? 0 : qty);
                    }, 0))) {
                        setIsCropModalOpen(false)
                    }
                    else {
                        window.alert("POG Qty should be equal to Total Qty")
                    }

                }

                }

            >
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/25" />
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
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title
                                    as="h3"
                                    className="text-sm font-bold leading-6  text-center text-blue-600"
                                >
                                    Crop Info Updation
                                </Dialog.Title>
                                <div className="flex  mt-2 flex-row items-center justify-center h-12 gap-2 border border-black rounded-lg">
                                    <div className=" text-left text-xs text-gray-700 flex flex-row gap-1">
                                        <strong>POG Qty:</strong>
                                        <span>{Math.trunc(pogLiquidation)}</span>
                                    </div>
                                    <div className=" text-left text-xs text-gray-700 flex flex-row gap-1">
                                        <strong>Crop Total:</strong>{" "}
                                        <span> {cropList.reduce((sum, crop) => {
                                            const qty = parseFloat(crop.quantity);
                                            return sum + (isNaN(qty) ? 0 : qty);
                                        }, 0)
                                        }</span>
                                    </div>
                                    <div className=" text-left text-xs text-gray-700 flex flex-row gap-1">
                                        <strong>Balance Qty:</strong>{" "}
                                        <span>   {pogLiquidation - cropList.reduce((sum, crop) => {
                                            const qty = parseFloat(crop.quantity);
                                            return sum + (isNaN(qty) ? 0 : qty);
                                        }, 0)}
                                        </span>
                                    </div>
                                </div>


                                {/* Crop Select and Add Button */}
                                <div className="flex space-x-2 mt-4 text-xs">
                                    <select
                                        value={selectedCrop}
                                        onChange={(e) => setSelectedCrop(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                    >
                                        <option value="">Select Crop</option>
                                        {allCrop.map((item) => (
                                            <option key={item.cr_id} value={item.cr_id}>
                                                {item.crop_name}
                                            </option>
                                        ))}
                                    </select>
                                    <button
                                        onClick={handleAddCrop}
                                        disabled={!selectedCrop}
                                        className={`px-4 py-2 text-white rounded-md bg-blue-600`}
                                    >
                                        +
                                    </button>
                                </div>


                                <table className="min-w-full  divide-y divide-gray-200 text-xs">
                                    <thead>
                                        <tr>
                                            <th className="px-4 py-2 text-left font-medium text-gray-700">Crop</th>
                                            <th className="px-4 py-2  w-12 text-left  font-medium text-gray-700">Liquidation Qty</th>
                                            <th className="px-4 py-2"></th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 text-xs">
                                        {cropList.map((crop) => (
                                            <tr key={crop.cr_id}>
                                                <td className="px-4 ">{crop.crop_name}</td>
                                                <td className="px-4 ">
                                                    <input
                                                        type="number"
                                                        value={crop.quantity}
                                                        onChange={(e) => handleQuantityChange(crop.cr_id, e.target.value)}
                                                        className="w-full px-2 py-1 border border-gray-300 rounded-md"
                                                    />
                                                </td>
                                                <td className="px-2 py-2">

                                                    <FaTrash className="text-red-600" onClick={() => handleRemoveCrop(crop.cr_id)} />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                                {/* Total */}


                                {/* Close Button */}
                                <div className="mt-4 flex justify-center">
                                    <button
                                        onClick={() => {
                                            if (Number(pogLiquidation) === Number(cropList.reduce((sum, crop) => {
                                                const qty = parseFloat(crop.quantity);
                                                return sum + (isNaN(qty) ? 0 : qty);
                                            }, 0))) {
                                                setIsCropModalOpen(false)
                                            }
                                            else {
                                                window.alert("POG Qty should be equal to Total Qty")
                                            }

                                        }

                                        }
                                        className="px-4 py-2 bg-blue-600  text-white rounded-md hover:bg-gray-400"
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
    );
};

export default CropModal;