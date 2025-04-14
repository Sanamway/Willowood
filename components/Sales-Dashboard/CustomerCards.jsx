import React, { useState, useEffect } from "react";
import { RiGroupLine } from "react-icons/ri";
import PopupModals from "./ActivePop";
import DuePopup from "./DuePopup";
import InactivePopup from "./InactivePop";
import { categoryData, regionData, customerData, cusOverDue, inactList } from "./sampleData";
import { useSelector } from "react-redux";
const CustomerCards = () => {
  let allCollectionTableData = useSelector((state) => state.collection.collectionTableData
  );
  let delaerCountData = useSelector((state) => state.dealer.delaerCountData)
  const [data, setData] = useState([
    { name: "Active Customers", order: "0", data: delaerCountData ? delaerCountData.dealerActivecount : 0 },
    { name: "New Customers", order: "This Month", data: delaerCountData ? delaerCountData.monthCount : 0 },
    { name: "Inactive Customers", order: "0 Order This Month", data: delaerCountData ? delaerCountData.dealerDeactivecount : 0 },
    { name: "Customers Overdue", order: "0", data: allCollectionTableData.length },
    { name: "Customers Overdue", order: "", data: "675" },
    { name: "Customers Overdue", data: "675" },
    { name: "Customers Overdue", data: "675" }
  ]);

  useEffect(() => {
    setData([
      { name: "Active Customers", order: "0", data: "675" },
      { name: "New Customers", order: "This Month", data: "96" },
      { name: "Inactive Customers", order: "0 Order This Month", data: "78" },
      { name: "Customers Overdue", order: "0", data: allCollectionTableData.length },
      { name: "Customers Overdue", order: "", data: "675" },
      { name: "Customers Overdue", data: "675" },
      { name: "Customers Overdue", data: "675" }
    ]);
  }, [allCollectionTableData])


  console.log("redux-data-2", allCollectionTableData)







  function Skeleton() {
    return (
      <>
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="bg-white p-1 flex flex-col items-center justify-center gap-4 rounded-md shadow-md text-white text-center"
          >
            <div className="flex items-start justify-start w-full px-1 p-1">
              <div className="w-3/4 px-4 h-4 bg-gray-300 rounded-md animate-pulse"></div>
            </div>
            <div className="flex items-center justify-between w-full px-2">
              <div className="w-20 h-4 bg-gray-300 rounded-md animate-pulse"></div>
              <div className="w-6 h-6 bg-gray-300 rounded-full animate-pulse"></div>
            </div>
          </div>
        ))}
      </>
    );
  }

  const [open, setOpen] = useState(false);
  const [dueOpen, setDueOpen] = useState(false)
  const [inactOpen, setInactOpen] = useState(false)

  const closeModal = () => {
    setOpen(false)
    setDueOpen(false)
    setInactOpen(false)
  };

  const handleOpenModal = (item, index) => {
    if (item.name == "Active Customers") {
      setOpen(true);
      return
    }
    if (item.name == "Customers Oneact") {
      setDueOpen(true);
    }
    if (item.name == "Inactive Customers") {
      setInactOpen(true);
    }
    if (item.name == "New Customers") {
      setInactOpen(true);
    }
  };

  return (
    <div>
      <div className="flex flex-row flex-wrap justify-between gap-4">
        {data?.length ? (
          data.slice(0, 4).map((item, index) => (
            <div
              key={index}
              className="bg-white p-1 flex flex-col items-center justify-start gap-4 rounded-md shadow-md text-white text-center max-w-[calc(50%-10px)] w-60" // Ensuring each card doesn't exceed a certain width
            >
              <div className="icon">
                <h2
                  className="text-gray-600 font-semibold text-[0.72rem] truncate" // Added truncate class to limit text width
                  title={item.name} // Optionally show the full name on hover
                >
                  {item.name}
                </h2>
                {item.order !== "0" ? (
                  <h2 className={`text-gray-400 text-[0.6rem]`}>({item.order})</h2>
                ) : (
                  <h2 className={`text-gray-400 text-[0.6rem] py-2 invisible`}></h2>
                )}
              </div>
              <div className="flex items-center justify-between w-full px-2">
                <h2
                  className="text-xl text-[#3B6ADB] font-bold cursor-pointer"
                  onClick={() => handleOpenModal(item, index)}
                >
                  {item.data}
                </h2>
                <div className="bg-[#EBEFFD] px-1.5 py-1 rounded-md">
                  <RiGroupLine className="text-[#5d7eda]" size={18} />
                </div>
              </div>
            </div>
          ))
        ) : (
          <Skeleton />
        )}
      </div>

      {open && (
        <PopupModals
          customer={customerData || []}
          closeModal={closeModal}
          regionData={regionData || []}
          catData={categoryData || []}
        />
      )}

      {dueOpen && (
        <DuePopup
          customer={customerData || []}
          closeModal={closeModal}
          dueData={cusOverDue || []}
        />
      )}

      {inactOpen && (
        <InactivePopup
          customer={customerData || []}
          closeModal={closeModal}
          dueData={inactList || []}
        />
      )}
    </div>
  );
};

export default CustomerCards;
