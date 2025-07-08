import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { AiOutlineDelete } from "react-icons/ai";
import { FaEye } from "react-icons/fa";
import { url } from "@/constants/url";
import axios from "axios";

function ConversionModal({
  onClose,
  upindex,
  isOpenTwo,
  onOpen,
  userId,
  title,
  srcs,
  dummy,
  shortName,
  refreshData,
  item
}) {
  const [closeBtn, setCloseBtn] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [formData, setFormData] = useState({
    x_qty: "",
    x_uom: "",
    measure: "",
    sign: "<=>",
    y_qty: "",
    y_uom: "",
    matnr: "",
    description: ""
  });

  const [uomOptions, setUOMOptions] = useState(null);
  const [dataAdded, setDataAdded] = useState(false);

  const closeButtonHandler = () => {
    onClose(false);
    setFormData({
      x_qty: "",
      x_uom: "",
      measure: "",
      sign: "<=>",
      y_qty: "",
      y_uom: "",
      matnr: formData.matnr,
      description: formData.description
    });
  };

  const submitButtonHandler = async () => {
    if (tableData.length == 0) {
      toast.error("Please add atleast one record");
      return;
    }
    try {
      const res = await axios.post(`${url}/api/add_material_uom_convertion`, tableData);
      const data = await res.data;
      if (data?.status) {
        toast.success(data?.message);
        setFormData({
          x_qty: "",
          x_uom: "",
          measure: "",
          sign: "<=>",
          y_qty: "",
          y_uom: "",
          matnr: formData.matnr,
          description: formData.description
        });
        setTimeout(() => {
          onClose(false);
        }, 1200);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const deleteHandler = (item) => {
    setTableData((prev) =>
      prev.filter((row) => (item._id ? row._id !== item._id : row.temp_id !== item.temp_id))
    );
    setFormData({
      x_qty: "",
      x_uom: "",
      measure: "",
      sign: "<=>",
      y_qty: "",
      y_uom: "",
      matnr: formData.matnr,
      description: formData.description
    });
  };

  const successDel = (status) => {
    // refreshData();
  };

  useEffect(() => {
    if (item) {
      setFormData((prev) => ({
        ...prev,
        matnr: item.matnr || "",
        description: item.mat_name || ""
      }));
    }
  }, [item]);

  // Handler For FormData

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedForm = { ...formData, [name]: value };
    if (name == "x_uom" && value && uomOptions) {
      const selectedUom = uomOptions.find((item) => item.uom == value);
      if (selectedUom) {
        updatedForm.measure = selectedUom.unit_description;
      }
    }

    if (name === "x_uom" && value === formData.y_uom && value !== "") {
      toast.error("X UoM cannot be the same as Y UoM");
      return;
    } else if (name === "y_uom" && value === formData.x_uom && value !== "") {
      toast.error("Y UoM cannot be the same as X UoM");
      return;
    }
    setFormData(updatedForm);
  };

  // Handle form Adding Temp Data

  const handleAddData = async () => {
    const validationRules = [
      { condition: !formData.x_qty, message: "Please enter X Quantity" },
      { condition: formData.x_qty <= 0, message: "X Quantity must be greater than 0" },
      { condition: !formData.x_uom, message: "Please select X UoM" },
      { condition: !formData.y_qty, message: "Please enter Y Quantity" },
      { condition: formData.y_qty <= 0, message: "Y Quantity must be greater than 0" },
      { condition: !formData.y_uom, message: "Please select Y UoM" },
      { condition: !formData.measure, message: "Measure is required" },
      { condition: !formData.sign, message: "Sign is required" }
    ];

    const error = validationRules.find((rule) => rule.condition);
    if (error) {
      toast.error(error.message);
      return;
    }

    const newEntry = {
      x_qty: formData.x_qty,
      x_uom: formData.x_uom,
      measure: formData.measure,
      sign: formData.sign,
      y_qty: formData.y_qty,
      y_uom: formData.y_uom,
      matnr: formData.matnr,
      description: formData.description,
      temp_id: Date.now(),
      c_id: 1
    };

    const x_uom_exists = tableData.filter((item) => item.x_uom == newEntry.x_uom);
    // const y_uom_exists = tableData.filter((item) => item.y_uom == newEntry.y_uom);

    if (x_uom_exists.length > 0) {
      toast.error(`X UoM '${newEntry.x_uom}' already exists`);
      return;
    }

    // if (y_uom_exists.length > 0) {
    //   toast.error(`Y UoM '${newEntry.y_uom}' already exists`);
    //   return;
    // }

    setTableData((prev) => [...prev, newEntry]);
    setFormData({
      x_qty: "",
      x_uom: "",
      measure: "",
      sign: "<=>",
      y_qty: "",
      y_uom: "",
      matnr: formData.matnr,
      description: formData.description
    });

    setDataAdded((prev) => !prev);
    toast.success("Added");
  };

  ///////////////////////// API //////////////////////////////////////////

  const getXUM = async () => {
    try {
      const response = await axios.get(`${url}/api/get_material_uom`);
      const data = await response.data;
      setUOMOptions(data?.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getUoMTableData = async (matnr) => {
    try {
      const response = await axios.get(`${url}/api/get_material_uom_convertion`, {
        params: {
          matnr: matnr,
          c_id: 1
        }
      });
      const data = await response.data;
      setTableData(data?.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (isOpenTwo && item) {
      getUoMTableData(item?.matnr);
    }
  }, [isOpenTwo]);

  useEffect(() => {
    getXUM();
  }, []);

  /////Console Logging/////////////////

  console.log("formData", formData);
  console.log("table", tableData);

  return (
    <>
      <Transition appear show={isOpenTwo} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => {}}>
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
            <Toaster position="bottom-center" reverseOrder={false} />

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
                <Dialog.Panel className="font-arial lg:w-[60%] min-w-[600px] transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-[1.14rem] font-bold leading-6 text-center text-gray-900"
                  >
                    Unit of Measurement Conversion {title}
                  </Dialog.Title>
                  <div className="flex my-2">
                    <h2 className="text-sm font-semibold">Material No: </h2>
                    <h3 className="text-sm px-1">{item?.matnr}</h3>
                  </div>
                  <div className="flex">
                    <h2 className="text-sm font-semibold">Description : </h2>
                    <h3 className="text-sm px-1">{item?.mat_name}</h3>
                  </div>
                  {/* inputs dropdowns fields  */}
                  <div className="my-4 grid grid-cols-[60px_90px_130px_80px_80px_90px_80px] gap-2 items-center">
                    <input
                      type="number"
                      name="x_qty"
                      value={formData.x_qty}
                      onChange={handleInputChange}
                      placeholder="X Qty"
                      className="border rounded-md px-2 py-1 text-sm text-left"
                      aria-label="X Quantity"
                    />
                    <select
                      name="x_uom"
                      value={formData.x_uom}
                      onChange={handleInputChange}
                      className="border rounded-md px-2 py-1 text-sm text-left"
                      aria-label="X Unit of Measurement"
                    >
                      <option value="">Select X UoM</option>
                      {uomOptions?.map((item) => (
                        <option key={item._id} value={item.uom}>
                          {item.uom}
                        </option>
                      ))}
                    </select>
                    <input
                      type="text"
                      name="measure"
                      disabled
                      value={formData.measure}
                      onChange={handleInputChange}
                      placeholder="Measure"
                      className="border rounded-md px-2 py-1 text-sm text-left"
                      aria-label="measure"
                    />
                    <input
                      type="text"
                      name="sign"
                      disabled
                      value={formData.sign}
                      onChange={handleInputChange}
                      placeholder="Sign"
                      className="border rounded-md px-2 py-1 text-sm text-left"
                      aria-label="X Quantity"
                    />
                    <input
                      type="number"
                      name="y_qty"
                      value={formData.y_qty}
                      onChange={handleInputChange}
                      placeholder="Y Qty"
                      className="border rounded-md px-2 py-1 text-sm text-left"
                      aria-label="Y Quantity"
                    />
                    <select
                      name="y_uom"
                      value={formData.y_uom}
                      onChange={handleInputChange}
                      className="border rounded-md px-2 py-1 text-sm text-left"
                      aria-label="Y Unit of Measurement"
                    >
                      <option value="">Select Y UoM</option>
                      {uomOptions?.map((item) => (
                        <option key={item._id} value={item.uom}>
                          {item.uom}
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={handleAddData}
                      className="bg-green-400  text-white px-3 py-1 rounded-md text-sm hover:bg-green-400"
                      aria-label="Add Conversion"
                    >
                      + Add
                    </button>
                  </div>

                  <div className="my-2 overflow-y-auto h-56 chat-scrollbar  ">
                    <div className="overflow-x-auto chat-scrollbar select-none w-full ">
                      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 rounded-full ">
                        <thead className="text-xs text-gray-900 text-center bg-blue-50 rounded-md">
                          <tr>
                            <th className="px-2 py-1 text-left lg:text-[0.8rem] text-[0.6rem] text-gray-600 font-bold w-[80px]">
                              X Qty.
                            </th>
                            <th className="px-2 py-1 text-left lg:text-[0.8rem] text-[0.6rem] text-gray-600 font-bold w-[80px]">
                              X UoM
                            </th>
                            <th className="px-2 py-1 text-left lg:text-[0.8rem] text-[0.6rem] text-gray-600 font-bold w-[40px]">
                              Measure
                            </th>
                            <th className="px-2 py-1 text-left lg:text-[0.8rem] text-[0.6rem] text-gray-600 font-bold w-[40px]">
                              Sign
                            </th>
                            <th className="px-2 py-1 text-left lg:text-[0.8rem] text-[0.6rem] text-gray-600 font-bold w-[80px]">
                              Y Qty
                            </th>
                            <th className="px-2 py-1 text-left lg:text-[0.8rem] text-[0.6rem] text-gray-600 font-bold w-[80px]">
                              Y UoM
                            </th>
                            <th className="px-2 py-1 text-left lg:text-[0.8rem] text-[0.6rem] text-gray-600 font-bold w-[80px]">
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200 break-normal border ">
                          {tableData?.length > 0 && tableData[0] !== null ? (
                            tableData?.map((item) => (
                              <tr key={item?._id}>
                                <td className="px-2 text-left whitespace-nowrap py-1 lg:text-[0.8rem] text-[0.6rem] text-gray-900 w-[80px]">
                                  {item?.x_qty}
                                </td>
                                <td className="px-2 text-left whitespace-nowrap py-1 lg:text-[0.8rem] text-[0.6rem] text-gray-900 w-[80px]">
                                  {item?.x_uom}
                                </td>
                                <td className="px-2 text-left whitespace-nowrap py-1 lg:text-[0.8rem] text-[0.6rem] text-gray-900 w-[40px]">
                                  {item?.measure}
                                </td>
                                <td className="px-2 text-left whitespace-nowrap py-1 lg:text-[0.8rem] text-[0.6rem] text-gray-900 w-[40px]">
                                  {item?.sign}
                                </td>
                                <td className="px-2 text-left whitespace-nowrap py-1 lg:text-[0.8rem] text-[0.6rem] text-gray-900 w-[80px]">
                                  {item?.y_qty}
                                </td>
                                <td className="px-2 text-left whitespace-nowrap py-1 lg:text-[0.8rem] text-[0.6rem] text-gray-900 w-[80px]">
                                  {item?.y_uom}
                                </td>
                                <td className="px-2 text-left whitespace-nowrap py-1 lg:text-[0.8rem] text-[0.6rem] text-gray-900 w-[80px]">
                                  {item !== null && (
                                    <button
                                      className="text-sm text-gray-900 font-light px-2 py-2 whitespace-nowrap"
                                      onClick={() => deleteHandler(item)}
                                      aria-label="Delete"
                                    >
                                      <AiOutlineDelete className="hover:text-red-500" />
                                    </button>
                                  )}
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan="7" className="text-center py-4">
                                No Data Found
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="mt-1 gap-4 flex items-center justify-center py-3">
                    <button
                      type="button"
                      disabled={closeBtn}
                      className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-1.5 text-sm font-medium text-red-500 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                      onClick={() => submitButtonHandler()}
                    >
                      Submit
                    </button>
                    <button
                      type="button"
                      disabled={closeBtn}
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-1.5 text-sm font-medium text-blue-500 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => closeButtonHandler()}
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
    </>
  );
}

export default ConversionModal;
