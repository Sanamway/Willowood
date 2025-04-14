import React, { useState, useEffect } from "react";
import FilterComponent from "../../components/Sales_Portal_Apps/OrderhistoryWeb/FilterComponent";
import Layout from "../../components/Sales_Portal_Apps/Layout";
import { IoIosBasket } from "react-icons/io";
import OrderTable from "../../components/Sales_Portal_Apps/OrderhistoryWeb/OrderTable";
import { CiBookmark } from "react-icons/ci";
import { LuRefreshCw } from "react-icons/lu";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const [refresh, setRefresh] = useState(false)
  const [allOrderInfoData, setAllOrderInfoData] = useState([
  ]);
  const allOrderData = useSelector(
    (state) => state.allOrdersInfo.allOrderInfoData
  );
  useEffect(() => {
    setAllOrderInfoData(allOrderData)
  }, [allOrderData])

  const getExcelsheet = async (

  ) => {


    const ws = XLSX.utils.json_to_sheet(allOrderInfoData.map((item) => {
      return {

        ["Date"]: moment(item.creation_date).format("DD-MM-YYYY"),
        ["Order No"]: item["SAP_order_no"],
        ["Company"]: item.del_address,
        ["Order Total"]: parseFloat(item.order_value).toFixed(2),
        ["Item Count"]: item.orderItems?.length,
        ["Last Modified"]: moment(item.modifi_date).format("DD-MM-YYYY")





      }
    }));
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, `Indent.xlsx`);




  };
  return (
    <Layout>
      <div className="flex flex-col gap-2 h-screen">

        <div className=" font-bold text-lg h-12 flex items-center justify-between ">
          <span className="p-2">

            Orders
          </span>{" "}
          <div className="p-2 flex flex-row gap-2 font-normal">

            <button

              className="bg-pink-500 flex items-center justify-center whitespace-nowrap text-white px-2 py-1 rounded-sm"
            >
              + Add New
            </button>

            <button

              className="bg-pink-500 flex items-center justify-center whitespace-nowrap text-white px-2 py-1 rounded-sm border-sm border-green-500"
            >
              <IoIosBasket className="mr-2" />  Order Cart(s)
            </button>
            <button

              className="bg-pink-500 flex items-center justify-center whitespace-nowrap text-white px-2 py-1 rounded-sm"
            >
              <CiBookmark className="mr-2" />  Order Actions
            </button>
            <button
              onClick={() => { getExcelsheet() }}
              className="bg-white flex items-center justify-center whitespace-nowrap text-pink-500 px-2 py-1 rounded-sm border border-pink-500"
            >
              <LuRefreshCw className="mr-2" /> Generate Report
            </button>
            <button
              onClick={() => setRefresh(!refresh)}
              className="bg-pink-500 flex items-center justify-center whitespace-nowrap text-white px-2 py-1 rounded-sm"
            >
              <LuRefreshCw className="mr-2" />   Refresh
            </button>

          </div>{" "}

        </div>


        {/* Main Content - Takes Remaining Space */}
        <div className="flex flex-col flex-1 overflow-hidden">
          {/* Filter Component - Does Not Expand */}
          <div className="shadow-md rounded-lg">
            <FilterComponent refresh={refresh} />
          </div>

          {/* Order Table - Takes Up All Remaining Space */}
          <div className="shadow-md rounded-lg flex-1 overflow-y-auto">
            <OrderTable />
          </div>
        </div>




      </div>
    </Layout>


  );
};

export default Dashboard;
