import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";
import axios from "axios";
import { url } from "@/constants/url";
import toast, { Toaster } from "react-hot-toast";

function ConfirmationModal({ isOpen, onClose, id, type, onDeletedData }) {
  const headers = {
    "Content-Type": "application/json",
    secret: "fsdhfgsfuiweifiowefjewcewcebjw",
  };

  const handleDeleteCompany = async () => {
    try {
      respond = await axios
        .delete(`${url}/api/delete_company_information/${id}`, {
          headers: headers,
        })
        .then((res) => {
          if (!res) return;
          toast.success("Comapany deleted successfully!");
          onDeletedData();
        });
      const apires = await respond.data.data;
    } catch (error) {
      if (error.response) toast.error(error.response.data.message);
    }
  };

  const handleDeleteBusinessSegment = async () => {
    try {
      const respond = await axios
        .delete(`${url}/api/delete_business_segment/${id}`, {
          headers: headers,
        })
        .then((res) => {
          if (!res) return;
          toast.success("Business Segment deleted successfully!");
          onDeletedData();
        });
      const apires = await respond.data.data;
    } catch (error) {
      console.log("lio", error);
      if (error.response) toast.error(error.response.data.message);
    }
  };

  const handleDeleteBusinessUnit = async () => {
    try {
      const respond = await axios
        .delete(`${url}/api/delete_business_unit/${id}`, {
          headers: headers,
        })
        .then((res) => {
          if (!res) return;
          toast.success("Business Unit deleted successfully!");
          onDeletedData();
        });
      const apires = await respond.data.data;
    } catch (error) {
      if (error.response) toast.error(error.response.data.message);
    }
  };
  const handleDeleteZone = async () => {
    try {
      const respond = await axios
        .delete(`${url}/api/delete_zone/${id}`, {
          headers: headers,
        })
        .then((res) => {
          if (!res) return;
          toast.success("Zone deleted successfully!");
          onDeletedData();
        });
      const apires = await respond.data.data;
    } catch (error) {
      if (error.response) toast.error(error.response.data.message);
    }
  };
  const handleDeleteRegion = async () => {
    try {
      const respond = await axios
        .delete(`${url}/api/delete_region/${id}`, {
          headers: headers,
        })
        .then((res) => {
          if (!res) return;
          toast.success("Region deleted successfully!");
          onDeletedData();
        });
      const apires = await respond.data.data;
    } catch (error) {
      if (error.response) toast.error(error.response.data.message);
    }
  };

  const handleDeleteTerritory = async () => {
    try {
      const respond = await axios
        .delete(`${url}/api/delete_territory/${id}`, {
          headers: headers,
        })
        .then((res) => {
          if (!res) return;
          toast.success("Territory deleted successfully!");
          onDeletedData();
        });
      const apires = await respond.data.data;
    } catch (error) {
      if (error.response) toast.error(error.response.data.message);
    }
  };
  const handleDeleteDistrict = async () => {
    try {
      const respond = await axios
        .delete(`${url}/api/delete_mr_office_hq/${id}`, {
          headers: headers,
        })
        .then((res) => {
          if (!res) return;
          toast.success("Reporting HQ deleted successfully!");
          onDeletedData();
        });
      const apires = await respond.data.data;
    } catch (error) {
      if (error.response) toast.error(error.response.data.message);
    }
  };
  const handleDeleteVillage = async () => {
    try {
      const respond = await axios
        .delete(`${url}/api/delete_village/${id}`, {
          headers: headers,
        })
        .then((res) => {
          if (!res) return;
          toast.success("Village deleted successfully!");
          onDeletedData();
        });
      const apires = await respond.data.data;
    } catch (error) {
      if (error.response) toast.error(error.response.data.message);
    }
  };
  const handleDeleteDepot = async () => {
    try {
      const respond = await axios
        .delete(`${url}/api/delete_dipot/${id}`, {
          headers: headers,
        })
        .then((res) => {
          if (!res) return;
          toast.success("Depot deleted successfully!");
          onDeletedData();
        });
      const apires = await respond.data.data;
    } catch (error) {
      if (error.response) toast.error(error.response.data.message);
    }
  };

  const handleDeleteCrop = async () => {
    try {
      const respond = await axios
        .delete(`${url}/api/delete_crop/${id}`, {
          headers: headers,
        })
        .then((res) => {
          if (!res) return;
          toast.success("Crop deleted successfully!");
          onDeletedData();
        });
      const apires = await respond.data.data;
    } catch (error) {
      if (error.response) toast.error(error.response.data.message);
    }
  };
  const handleDeleteFarmer = async () => {
    try {
      const respond = await axios
        .delete(`${url}/api/delete_farmer/${id}`, {
          headers: headers,
        })
        .then((res) => {
          if (!res) return;
          toast.success("Farmer deleted successfully!");
          onDeletedData();
        });
      const apires = await respond.data.data;
    } catch (error) {
      if (error.response) toast.error(error.response.data.message);
    }
  };
  const handleDeleteBst = async () => {
    try {
      const respond = await axios
        .delete(`${url}/api/delete_bstuser/${id}`, {
          headers: headers,
        })
        .then((res) => {
          if (!res) return;
          toast.success("BST deleted successfully!");
          onDeletedData();
        });
      const apires = await respond.data.data;
    } catch (error) {
      if (error.response) toast.error(error.response.data.message);
    }
  };
  const handleDeleteEmployee = async () => {
    try {
      const respond = await axios
        .delete(`${url}/api/delete_employee/${id}`, {
          headers: headers,
        })
        .then((res) => {
          if (!res) return;
          toast.success("Employee deleted successfully!");
          onDeletedData();
        });
      const apires = await respond.data.data;
    } catch (error) {
      if (error.response) toast.error(error.response.data.message);
    }
  };
  const handleDeleteDepotWarehouse = async () => {
    try {
      const respond = await axios
        .delete(`${url}/api/delete_warehousedepot/${id}`, {
          headers: headers,
        })
        .then((res) => {
          if (!res) return;
          toast.success("Warehouse deleted successfully!");
          onDeletedData();
        });
      const apires = await respond.data.data;
    } catch (error) {
      if (error.response) toast.error(error.response.data.message);
    }
  };

  const handleDelete = () => {
    if (type === "Company Information") {
      handleDeleteCompany();
      onClose();
      onDeletedData();
    } else if (type === "Business Segment") {
      handleDeleteBusinessSegment();
      onClose();
      onDeletedData();
    } else if (type === "Business Unit") {
      handleDeleteBusinessUnit();
      onClose();
      onDeletedData();
    } else if (type === "Zone") {
      handleDeleteZone();
      onClose();
      onDeletedData();
    } else if (type === "Region") {
      handleDeleteRegion();
      onClose();
      onDeletedData();
    } else if (type === "Territory") {
      handleDeleteTerritory();
      onClose();
      onDeletedData();
    } else if (type === "Reporting") {
      handleDeleteDistrict();
      onClose();
      onDeletedData();
    } else if (type === "Village") {
      handleDeleteVillage();
      onClose();
      onDeletedData();
    } else if (type === "Depot") {
      handleDeleteDepot();
      onClose();
      onDeletedData();
    } else if (type === "Crop") {
      handleDeleteCrop();
      onClose();
      onDeletedData();
    } else if (type === "Farmer") {
      handleDeleteFarmer();
      onClose();
      onDeletedData();
    } else if (type === "Bst") {
      handleDeleteBst();
      onClose();
      onDeletedData();
    } else if (type === "Employee") {
      handleDeleteEmployee();
      onClose();
      onDeletedData();
    }
    else if (type === "DepotWarehouse") {
      handleDeleteDepotWarehouse();
      onClose();
      onDeletedData();
    } else {
      return;
    }
  };
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="z-10" onClose={onClose}>
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
              <Dialog.Panel className=" font-arial  max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-[1.78rem] font-medium leading-6 text-center text-gray-900"
                >
                  Are you sure ?
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-center text-gray-500">
                    Do you really want to delete this ?
                  </p>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={onClose}
                  >
                    Cancel
                  </button>

                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={() => {
                      handleDelete();
                    }}
                  >
                    Delete
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default ConfirmationModal;
