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
  let delaerCountData = useSelector((state) => state.dealer.dealerCountData)
  const [data, setData] = useState([
    { name: "Active Customers", order: "0", data: 0 },
    { name: "New Customers", order: "This Month", data: 0 },
    { name: "Inactive Customers", order: "0 Order This Month", data: 0 },
    { name: "Customers Overdue", order: "0", data: 0 },
  ]);

  useEffect(() => {
    console.log("qaw", allCollectionTableData, delaerCountData)
    setData([
      { name: "Active Customers", order: "0", data: delaerCountData.dealerActivecount?.length },
      { name: "New Customers", order: "This Month", data: delaerCountData.monthCount?.length },
      { name: "Inactive Customers", order: "0 Order This Month", data: delaerCountData.dealerDeactivecount?.length },
      {
        name: "Customers Overdue", order: "0", data: allCollectionTableData.filter((item) => {
          return item["180-365"] !== 0 || item["366-720"] !== 0 || item["720 And Above"] !== 0;
        })?.length
      },
    ]);


  }, [allCollectionTableData, delaerCountData])


  console.log("redux-data-2", allCollectionTableData, delaerCountData)







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
    else if (item.name == "New Customers") {
      setDueOpen(true);
    }
    else if (item.name == "Inactive Customers") {
      setInactOpen(true);
    }
    else {
      return
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
              <div className="flex items-end justify-between w-full px-2">
                <div className="w-full">

                </div>
                <div className="flex flex-row justify-between w-full">
                  <h2
                    className="text-xl text-[#3B6ADB] font-bold cursor-pointer"
                    onClick={() => handleOpenModal(item, index)}
                  >
                    {item.data}
                  </h2>
                  <div className="bg-[#EBEFFD] px-1.5 py-1 rounded-md flex items-end">
                    <RiGroupLine className="text-[#5d7eda]" size={18} />
                  </div>
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
          customer={delaerCountData.dealerActivecount || []}
          closeModal={closeModal}
          gridData={delaerCountData.dealerActivecount || []}

        />
      )}

      {dueOpen && (
        <DuePopup
          customer={delaerCountData.monthCount || []}
          closeModal={closeModal}
          gridData={delaerCountData.monthCount || []}
        />
      )}

      {inactOpen && (
        <InactivePopup
          customer={delaerCountData.dealerDeactivecount || []}
          closeModal={closeModal}
          gridData={delaerCountData.dealerDeactivecount || []}
        />
      )}
    </div>
  );
};

export default CustomerCards;
