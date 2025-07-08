import React, { useState, useEffect } from "react";

import ChartOne from "./ChartOne";
import ChartTwo from "./ChartTwo";
import ChartThree from "./ChartThree";
import { BsCashCoin } from "react-icons/bs";
import { MdKeyboardArrowRight } from "react-icons/md";
import TableChartTwo from "./TableChartTwo";

const AllCharts = (props) => {
  const [territoryGraphData, setTerritoryGraphData] = useState([]);
  const [territorytLabelData, setTerritoryLabelData] = useState([]);
  console.log("nop", props);
  useEffect(() => {
    let territoryData = [];
    let territoryLabel = [];

    if (props.territoryData) {
      const budgetData = {
        label: "Budget",
        backgroundColor: "#3B82F6",
        data: [],
      };
      const targetData = {
        label: "Rolling",
        backgroundColor: "#F97316",
        data: [],
      };
      const actualData = {
        label: "Actual",
        backgroundColor: "#22C55E",
        data: [],
      };

      props.territoryData.forEach((item) => {
        if (item.territory_name) {
          territoryLabel.push(item.territory_name);
        }

        targetData.data.push(item.target ? item.target : 0);

        budgetData.data.push(item.budget ? item.budget : 0);

        actualData.data.push(item.actual ? item.actual : 0);
      });
      if (budgetData.data.length > 0) {
        territoryData.push(budgetData);
      }
      if (targetData.data.length > 0) {
        territoryData.push(targetData);
      }
      if (actualData.data.length > 0) {
        territoryData.push(actualData);
      }
    }
    setTerritoryGraphData(territoryData);
    setTerritoryLabelData(territoryLabel);
  }, [props.territoryData]);

  const [regionGraphData, setRegionGraphData] = useState([]);
  const [regiontLabelData, setRegionLabelData] = useState([]);
  useEffect(() => {
    let regionData = [];
    let regionLabel = [];

    if (props.regionData) {
      const budgetData = {
        label: "Budget",
        backgroundColor: "#3B82F6",
        data: [],
      };
      const targetData = {
        label: "Rolling",
        backgroundColor: "#F97316",
        data: [],
      };
      const actualData = {
        label: "Actual",
        backgroundColor: "#22C55E",
        data: [],
      };

      props.regionData.forEach((item) => {
        if (item.region_name) {
          regionLabel.push(item.region_name);
        }

        targetData.data.push(item.target ? item.target : 0);

        budgetData.data.push(item.budget ? item.budget : 0);

        actualData.data.push(item.actual ? item.actual : 0);
      });
      if (budgetData.data.length > 0) {
        regionData.push(budgetData);
      }
      if (targetData.data.length > 0) {
        regionData.push(targetData);
      }
      if (actualData.data.length > 0) {
        regionData.push(actualData);
      }
    }
    setRegionGraphData(regionData);
    setRegionLabelData(regionLabel);
  }, [props.regionData]);

  const [zoneGraphData, setZoneGraphData] = useState([]);
  const [zonetLabelData, setZoneLabelData] = useState([]);
  useEffect(() => {
    let zoneData = [];
    let zoneLabel = [];

    if (props.zoneData) {
      const budgetData = {
        label: "Budget",
        backgroundColor: "#3B82F6",
        data: [],
      };
      const targetData = {
        label: "Rolling",
        backgroundColor: "#F97316",
        data: [],
      };
      const actualData = {
        label: "Actual",
        backgroundColor: "#22C55E",
        data: [],
      };

      props.zoneData.forEach((item) => {
        if (item.zone_name) {
          zoneLabel.push(item.zone_name);
        }
        targetData.data.push(item.target ? item.target : 0);
        budgetData.data.push(item.budget ? item.budget : 0);
        actualData.data.push(item.actual ? item.actual : 0);
      });
      if (budgetData.data.length > 0) {
        zoneData.push(budgetData);
      }
      if (targetData.data.length > 0) {
        zoneData.push(targetData);
      }
      if (actualData.data.length > 0) {
        zoneData.push(actualData);
      }
    }
    setZoneGraphData(zoneData);
    setZoneLabelData(zoneLabel);
  }, [props.zoneData]);

  const [bsUnitGraphData, setBsUnitGraphData] = useState([]);
  const [bsUnitLabelData, setBsUnitLabelData] = useState([]);
  useEffect(() => {
    let BusUnitGraphData = [];
    let BusUnitlabelData = [];

    if (props.businessUnitData) {
      const budgetData = {
        label: "Budget",
        backgroundColor: "#3B82F6",
        data: [],
      };
      const targetData = {
        label: "Rolling",
        backgroundColor: "#F97316",
        data: [],
      };
      const actualData = {
        label: "Actual",
        backgroundColor: "#22C55E",
        data: [],
      };

      props.businessUnitData.forEach((item) => {
        if (item.business_unit_name) {
          BusUnitlabelData.push(item.business_unit_name);
        }
        targetData.data.push(item.target ? item.target : 0);

        budgetData.data.push(item.budget ? item.budget : 0);

        actualData.data.push(item.actual ? item.actual : 0);
      });
      if (budgetData.data.length > 0) {
        BusUnitGraphData.push(budgetData);
      }
      if (targetData.data.length > 0) {
        BusUnitGraphData.push(targetData);
      }
      if (actualData.data.length > 0) {
        BusUnitGraphData.push(actualData);
      }
    }
    setBsUnitGraphData(BusUnitGraphData);
    setBsUnitLabelData(BusUnitlabelData);
  }, [props.businessUnitData]);

  const [bsGraphData, setBsGraphData] = useState([]);
  const [bsLabelData, setBsLabelData] = useState([]);

  useEffect(() => {
    let BSegmentGraphData = [];
    let BSegmentlabelData = [];
    if (props.businessSegmentData) {
      const budgetData = {
        label: "Budget",
        backgroundColor: "#3B82F6",
        data: [],
      };
      const targetData = {
        label: "Rolling",
        backgroundColor: "#F97316",
        data: [],
      };
      const actualData = {
        label: "Actual",
        backgroundColor: "#22C55E",
        data: [],
      };
      props.businessSegmentData.forEach((item) => {
        if (item.business_segment) {
          BSegmentlabelData.push(item.business_segment);
        }
        targetData.data.push(item.target ? item.target : 0);

        budgetData.data.push(item.budget ? item.budget : 0);

        actualData.data.push(item.actual ? item.actual : 0);
      });
      if (budgetData.data.length > 0) {
        BSegmentGraphData.push(budgetData);
      }
      if (targetData.data.length > 0) {
        BSegmentGraphData.push(targetData);
      }
      if (actualData.data.length > 0) {
        BSegmentGraphData.push(actualData);
      }

      setBsGraphData(BSegmentGraphData);
      setBsLabelData(BSegmentlabelData);
    }
  }, [props.businessSegmentData]);

  //creating business segment graph

  const [psGraphData, setPsGraphData] = useState([]);
  const [psLabelData, setPsLabelData] = useState([]);

  useEffect(() => {
    let PSegmentGraphData = [];
    let PSegmentlabelData = [];
    if (props.productSegmentData) {
      const budgetData = {
        label: "Budget",
        backgroundColor: "#3B82F6",
        data: [],
      };
      const targetData = {
        label: "Rolling",
        backgroundColor: "#F97316",
        data: [],
      };
      const actualData = {
        label: "Actual",
        backgroundColor: "#22C55E",
        data: [],
      };
      // Extract values at indexes 6, 15, and 23 from each object in newdata
      const index6Values = props.productSegmentData.map((item) => {
        PSegmentlabelData.push(item["Product Segment"]);
        return String(item[Object.keys(item)[6]]);
      });
      const index15Values = props.productSegmentData.map((item) => {
        return String(item[Object.keys(item)[15]]);
      });
      const index23Values = props.productSegmentData.map((item) => {
        return String(item[Object.keys(item)[23]]);
      });

      // Push values into the respective data arrays
      budgetData.data.push(...index6Values);
      targetData.data.push(...index15Values);
      actualData.data.push(...index23Values);
      if (budgetData.data.length > 0) {
        PSegmentGraphData.push(budgetData);
      }
      if (targetData.data.length > 0) {
        PSegmentGraphData.push(targetData);
      }
      if (actualData.data.length > 0) {
        PSegmentGraphData.push(actualData);
      }
      setPsGraphData(PSegmentGraphData);
      setPsLabelData(PSegmentlabelData);
    }
  }, [props.productSegmentData]);

  const [pcGraphData, setPcGraphData] = useState([]);
  const [pcLabelData, setPcLabelData] = useState([]);

  useEffect(() => {
    let PCegmentGraphData = [];
    let PCegmentlabelData = [];
    if (props.productCategoryData) {
      const budgetData = {
        label: "Budget",
        backgroundColor: "#3B82F6",
        data: [],
      };
      const targetData = {
        label: "Rolling",
        backgroundColor: "#F97316",
        data: [],
      };
      const actualData = {
        label: "Actual",
        backgroundColor: "#22C55E",
        data: [],
      };
      // Extract values at indexes 6, 15, and 23 from each object in newdata
      const index6Values = props.productCategoryData.map((item) => {
        PCegmentlabelData.push(item["Product Category"]);
        return String(item[Object.keys(item)[6]]);
      });
      const index15Values = props.productCategoryData.map((item) => {
        return String(item[Object.keys(item)[15]]);
      });
      const index23Values = props.productCategoryData.map((item) => {
        return String(item[Object.keys(item)[23]]);
      });

      // Push values into the respective data arrays
      budgetData.data.push(...index6Values);
      targetData.data.push(...index15Values);
      actualData.data.push(...index23Values);
      if (budgetData.data.length > 0) {
        PCegmentGraphData.push(budgetData);
      }
      if (targetData.data.length > 0) {
        PCegmentGraphData.push(targetData);
      }
      if (actualData.data.length > 0) {
        PCegmentGraphData.push(actualData);
      }
      setPcGraphData(PCegmentGraphData);
      setPcLabelData(PCegmentlabelData);
    }
  }, [props.productCategoryData]);

  const [pbGraphData, setPbGraphData] = useState([]);
  const [pbLabelData, setPbLabelData] = useState([]);

  useEffect(() => {
    let PBrandGraphData = [];
    let PBrandlabelData = [];
    if (props.productBrandData) {
      const budgetData = {
        label: "Budget",
        backgroundColor: "#3B82F6",
        data: [],
      };
      const targetData = {
        label: "Rolling",
        backgroundColor: "#F97316",
        data: [],
      };
      const actualData = {
        label: "Actual",
        backgroundColor: "#22C55E",
        data: [],
      };
      // Extract values at indexes 6, 15, and 23 from each object in newdata
      const index6Values = props.productBrandData.map((item) => {
        PBrandlabelData.push(item["Brand Desc"]);
        return String(item[Object.keys(item)[6]]);
      });
      const index15Values = props.productBrandData.map((item) => {
        return String(item[Object.keys(item)[15]]);
      });
      const index23Values = props.productBrandData.map((item) => {
        return String(item[Object.keys(item)[23]]);
      });

      // Push values into the respective data arrays
      budgetData.data.push(...index6Values);
      targetData.data.push(...index15Values);
      actualData.data.push(...index23Values);
      if (budgetData.data.length > 0) {
        PBrandGraphData.push(budgetData);
      }
      if (targetData.data.length > 0) {
        PBrandGraphData.push(targetData);
      }
      if (actualData.data.length > 0) {
        PBrandGraphData.push(actualData);
      }
      setPbGraphData(PBrandGraphData);
      setPbLabelData(PBrandlabelData);
    }
  }, [props.productBrandData]);

  const [showChart, setShowChart] = useState({
    t: false,
    r: false,
    z: false,
    bu: false,
    bg: false,
  });
  useEffect(() => {
    if (JSON.parse(window.localStorage.getItem("userinfo"))?.role_id === 4) {
      setShowChart({
        t: true,
        r: true,
        z: false,
        bu: false,
        bg: false,
      });
    } else if (
      JSON.parse(window.localStorage.getItem("userinfo"))?.role_id === 5
    ) {
      setShowChart({
        t: true,
        r: false,
        z: false,
        bu: false,
        bg: false,
      });
    } else if (
      JSON.parse(window.localStorage.getItem("userinfo"))?.role_id === 6
    ) {
      setShowChart({
        t: false,
        r: false,
        z: false,
        bu: false,
        bg: false,
      });
    } else if (
      JSON.parse(window.localStorage.getItem("userinfo"))?.role_id === 3
    ) {
      setShowChart({
        t: true,
        r: true,
        z: true,
        bu: false,
        bg: false,
      });
    } else {
      setShowChart({
        t: true,
        r: true,
        z: true,
        bu: true,
        bg: true,
      });
    }
  }, []);
  //****  * ****  **** *** ** *  **** ***************//
  const Loader = () => {
    return (
      <div class="flex space-x-1   justify-center items-center bg-white self-center  ">
        <div class="h-2 w-2 bg-red-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div class="h-2 w-2 bg-red-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div class="h-2 w-2 bg-red-400 rounded-full animate-bounce"></div>
      </div>
    );
  };
  return (
    <>
      <section className="wrapper w-full px-2 mt-2 font-arial  relative ">
        <div className="flex w-full border-black border-b-2 items-start gap-8 mt-2">
          <button
            className={`${props.tabType === "Table"
                ? " flex  gap-2 inline-block  rounded-t py-2 px-4 font-semibold  border-b-2 border-orange-500 text-black text-sm bg-black/5"
                : " flex  gap-2  inline-block  text-black rounded-t py-2 px-4 font-semibold  text-sm bg-black/8"
              }`}
            onClick={() => props.setTabType("Table")}
          >
            Table
          </button>{" "}
          <button
            className={`${props.tabType === "Chart"
                ? " flex  gap-2 inline-block rounded-t py-2 px-4 font-semibold  border-b-2 border-orange-500 text-black text-sm bg-black/5"
                : " flex  gap-2   inline-block  text-black rounded-t py-2 px-4 font-semibold  text-sm bg-black/8"
              }`}
            onClick={() => props.setTabType("Chart")}
          >
            Chart
          </button>
        </div>
        <div className="flex flex-row flex-wrap lg:gap-4">
          <div className="w-full px- mt-2 flex lg:flex-row flex-col gap-3 font-arial rounded-md lg:w-1/5">
            <div className="bg-white p-2 flex-1 md:flex items-center justify-center gap-4 rounded-md shadow-md text-white text-center">
              <div className="flex items-center justify-between w-full text-gray-600">
                <div className="flex items-center justify-center gap-1 ">
                  <div className="px-2 py-2 rounded-full bg-blue-50 ">
                    <BsCashCoin
                      className="text-blue-500"
                      size={20}
                    ></BsCashCoin>
                  </div>
                  <div className="flex flex-col items-start justify-center">
                    <h2 className="text-[0.75rem] text-gray-600 font-semibold">
                      Sale Register
                    </h2>
                    {/* <h2 className="text-[0.78rem] text-gray-600 font-bold">
                    &#8377;24,96,843.55
                  </h2> */}
                  </div>
                </div>
                <div
                  onClick={() => props.setShowSalesModal(true)}
                  className="rounded-full shadow-md cursor-pointer"
                >
                  <MdKeyboardArrowRight
                    className="text-gray-800"
                    size={22}
                  ></MdKeyboardArrowRight>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full px- mt-2 flex lg:flex-row flex-col gap-3 font-arial rounded-md lg:w-1/5">
            <div className="bg-white p-2 flex-1 md:flex items-center justify-center gap-4 rounded-md shadow-md text-white text-center">
              <div className="flex items-center justify-between w-full text-gray-600">
                <div className="flex items-center justify-center gap-1 ">
                  <div className="px-2 py-2 rounded-full bg-blue-50 ">
                    <BsCashCoin
                      className="text-blue-500"
                      size={20}
                    ></BsCashCoin>
                  </div>
                  <div className="flex flex-col items-start justify-center">
                    <h2 className="text-[0.75rem] text-gray-600 font-semibold">
                      Collection Register
                    </h2>
                    {/* <h2 className="text-[0.78rem] text-gray-600 font-bold">
                    &#8377;24,96,843.55
                  </h2> */}
                  </div>
                </div>
                <div
                  onClick={() => props.setShowCollectionModal(true)}
                  className="rounded-full shadow-md cursor-pointer"
                >
                  <MdKeyboardArrowRight
                    className="text-gray-800"
                    size={22}
                  ></MdKeyboardArrowRight>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full px- mt-2 flex lg:flex-row flex-col gap-3 font-arial rounded-md lg:w-1/5">
            <div className="bg-white p-2 flex-1 md:flex items-center justify-center gap-4 rounded-md shadow-md text-white text-center">
              <div className="flex items-center justify-between w-full text-gray-600">
                <div className="flex items-center justify-center gap-1 ">
                  <div className="px-2 py-2 rounded-full bg-blue-50 ">
                    <BsCashCoin
                      className="text-blue-500"
                      size={20}
                    ></BsCashCoin>
                  </div>
                  <div className="flex flex-col items-start justify-center">
                    <h2 className="text-[0.75rem] text-gray-600 font-semibold">
                      Trend Growth
                    </h2>
                    {/* <h2 className="text-[0.78rem] text-gray-600 font-bold">
                    &#8377;24,96,843.55
                  </h2> */}
                  </div>
                </div>
                <div
                  onClick={() => props.setShowCollectionModal(true)}
                  className="rounded-full shadow-md cursor-pointer"
                >
                  <MdKeyboardArrowRight
                    className="text-gray-800"
                    size={22}
                  ></MdKeyboardArrowRight>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full px- mt-2 flex lg:flex-row flex-col gap-3 font-arial rounded-md lg:w-1/5">
            <div className="bg-white p-2 flex-1 md:flex items-center justify-center gap-4 rounded-md shadow-md text-white text-center">
              <div className="flex items-center justify-between w-full text-gray-600">
                <div className="flex items-center justify-center gap-1 ">
                  <div className="px-2 py-2 rounded-full bg-blue-50 ">
                    <BsCashCoin
                      className="text-blue-500"
                      size={20}
                    ></BsCashCoin>
                  </div>
                  <div className="flex flex-col items-start justify-center">
                    <h2 className="text-[0.75rem] text-gray-600 font-semibold">
                      Top 10 Ranking
                    </h2>
                    {/* <h2 className="text-[0.78rem] text-gray-600 font-bold">
                    &#8377;24,96,843.55
                  </h2> */}
                  </div>
                </div>
                <div
                  onClick={() => props.setShowCollectionModal(true)}
                  className="rounded-full shadow-md cursor-pointer"
                >
                  <MdKeyboardArrowRight
                    className="text-gray-800"
                    size={22}
                  ></MdKeyboardArrowRight>
                </div>
              </div>
            </div>
          </div>
        </div>

        {props.tabType === "Chart" ? (
          <div className="w-full flex flex-col gap-2">
            {props.loading && (
              <div className="fixed top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
                <img
                  className="w-20 h-20 animate-spin"
                  src="https://www.svgrepo.com/show/448500/loading.svg"
                  alt="Loading icon"
                />
              </div>
            )}
            {showChart.bg && (
              <div className="mt-2 lg:mt- md:flex items-start justify-center gap-4 ">
                <ChartOne
                  title={"Business Segments"}
                  color={"bg-blue-500"}
                  lab={bsLabelData}
                  datasets={bsGraphData || []}
                />
              </div>
            )}
            {showChart.bu && (
              <div className="mt-2 lg:mt- md:flex items-start justify-center gap-4 ">
                <ChartTwo
                  title={"Business Units"}
                  color={"bg-violet-500"}
                  lab={bsUnitLabelData}
                  datasets={bsUnitGraphData || []}
                />
              </div>
            )}

            {showChart.z && (
              <div className="mt-2 lg:mt- md:flex items-start justify-center gap-4  ">
                <ChartTwo
                  title={"Business Zone"}
                  color={"bg-pink-500"}
                  lab={zonetLabelData}
                  datasets={zoneGraphData || []}
                ></ChartTwo>
              </div>
            )}

            {showChart.r && (
              <div className="mt-2 lg:mt-6 md:flex items-start justify-center gap-4">
                <ChartThree
                  title={"Business Region"}
                  color={"bg-teal-400"}
                  lab={regiontLabelData}
                  datasets={regionGraphData || []}
                ></ChartThree>
              </div>
            )}

            {showChart.t && (
              <div className="mt-2 lg:mt-6 md:flex items-start justify-center gap-4">
                <ChartThree
                  title={"Territory"}
                  color={"bg-rose-500"}
                  lab={territorytLabelData}
                  datasets={territoryGraphData || []}
                ></ChartThree>
              </div>
            )}
            <div className="mt-2 lg:mt-6 md:flex items-start justify-center gap-4">
              <ChartOne
                title={"Product Segment"}
                color={"bg-orange-500"}
                lab={psLabelData}
                datasets={psGraphData || []}
              ></ChartOne>
            </div>
            <div className="mt-2 lg:mt-6 md:flex items-start justify-center gap-4">
              <ChartOne
                title={"Product Category"}
                color={"bg-[#15283c]"}
                lab={pcLabelData}
                datasets={pcGraphData || []}
              ></ChartOne>
            </div>
            <div className="mt-2 lg:mt-6 md:flex items-start justify-center gap-4">
              <ChartOne
                title={"Product Brand"}
                color={"bg-indigo-500"}
                lab={pbLabelData}
                datasets={pbGraphData || []}
              ></ChartOne>
            </div>
          </div>
        ) : (
          <div className="w-full flex flex-col  md:flex w-1/2 flex-row lg:w-full flex flex-col ">
            {props.loading && (
              <div className="fixed top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
                <img
                  className="w-20 h-20 animate-spin"
                  src="https://www.svgrepo.com/show/448500/loading.svg"
                  alt="Loading icon"
                />
              </div>
            )}
            <div className="flex flex-row justify-between  items-center mt-2 w-full  ">
              {" "}
              <h2 className="font-bold  text-sm  flex ">
                {" "}
                Rolling Sales Plan{" "}
              </h2>
              <div className="jusself-end">
                <button
                  className="text-blue-500 underline hover:text-blue-700 flex flex-row gap-2 text-sm"
                  onClick={() => props.handleDownloadExcelNew()}
                >
                  {props.downloadExcelLoading && <Loader />} Download RSP XLS
                </button>{" "}
              </div>
            </div>
            <div className="flex flex-col overflow-auto text-xs lg:hidden ">
              <div className="grid grid-rows-4  text-sm ">
                <div className="border border-gray-300 py-1 flex px-2 items-center font-bold text-xs bg-gray-200 ">
                  YTD
                </div>
                <div className="border border-gray-300 text-xs flex justify-between items-center">
                  <span className=" flex items-center  justify-center  border-r border-gray-300 w-20">
                    Budget
                  </span>
                  <span className=" flex items-center  justify-center  border-r border-gray-300 w-20">
                    RSP
                  </span>
                  <span className=" flex items-center  justify-center border-r border-gray-300 w-20">
                    Sale
                  </span>
                  <span className=" flex items-center  justify-center border-r border-gray-300 w-20">
                    B ach
                  </span>
                  <span className=" flex items-center justify-center   border-gray-300 w-20">
                    R ach
                  </span>
                </div>
                <div className="border border-gray-300   text-xs flex justify-between items-center">
                  <span className=" flex items-center  justify-center border-r border-gray-300 w-20">
                    {props.summaryData.budget.toFixed(2)}
                  </span>
                  <span className=" flex items-center  justify-center border-r border-gray-300 w-20">
                    {props.summaryData.target.toFixed(2)}
                  </span>
                  <span className=" flex items-center justify-center  border-r border-gray-300 w-20">
                    {props.summaryData.actual.toFixed(2)}
                  </span>
                  <span className=" flex items-center  justify-center border-r border-gray-300 w-20">
                    {(
                      (props.summaryData.actual / props.summaryData.budget) *
                      100
                    ).toFixed(2) === "NaN" ||
                      (
                        (props.summaryData.actual.toFixed(2) /
                          props.summaryData.budget.toFixed(2)) *
                        100
                      ).toFixed(2) === "Infinity"
                      ? 0
                      : (
                        (props.summaryData.actual /
                          props.summaryData.budget) *
                        100
                      ).toFixed(2)}
                  </span>
                  <span className=" flex items-center  justify-center  border-gray-300 w-20">
                    {(
                      (props.summaryData.actual / props.summaryData.target) *
                      100
                    ).toFixed(2) === "NaN" ||
                      (
                        (props.summaryData.actual.toFixed(2) /
                          props.summaryData.target.toFixed(2)) *
                        100
                      ).toFixed(2) === "Infinity"
                      ? 0
                      : (
                        (props.summaryData.actual /
                          props.summaryData.target) *
                        100
                      ).toFixed(2)}
                  </span>
                </div>

                {/* <div className="border border-gray-300 py-1 px-2  text-xs flex  items-center font-bold text-xs bg-gray-200">
                  H1 - (April - Sept)
                </div>
                <div className="border border-gray-300 text-xs flex justify-between items-center">
                  <span className=" flex items-center  justify-center  border-r border-gray-300 w-20">
                    Budget
                  </span>
                  <span className=" flex items-center  justify-center  border-r border-gray-300 w-20">
                    RSP
                  </span>
                  <span className=" flex items-center  justify-center border-r border-gray-300 w-20">
                    Sale
                  </span>
                  <span className=" flex items-center  justify-center border-r border-gray-300 w-20">
                    B ach
                  </span>
                  <span className=" flex items-center justify-center   border-gray-300 w-20">
                    R ach
                  </span>
                </div>
                <div className="border border-gray-300  text-xs flex justify-between items-center ">
                  <span className=" flex items-center  justify-center border-r border-gray-300 w-20">
                    {props.summaryData.budgetH1.toFixed(2)}
                  </span>
                  <span className=" flex items-center justify-center  border-r border-gray-300 w-20">
                    {props.summaryData.targetH1.toFixed(2)}
                  </span>
                  <span className=" flex items-center  justify-center  border-r border-gray-300 w-20">
                    {props.summaryData.actualH1.toFixed(2)}
                  </span>

                  <span className=" flex items-center  justify-center border-r border-gray-300 w-20">
                    {(
                      (props.summaryData.actualH1 /
                        props.summaryData.budgetH1) *
                      100
                    ).toFixed(2) === "NaN" ||
                    (
                      (props.summaryData.actualH1.toFixed(2) /
                        props.summaryData.budgetH1.toFixed(2)) *
                      100
                    ).toFixed(2) === "Infinity"
                      ? 0
                      : (
                          (props.summaryData.actualH1 /
                            props.summaryData.budgetH1) *
                          100
                        ).toFixed(2)}
                  </span>
                  <span className=" flex items-center  justify-center  border-gray-300 w-20">
                    {(
                      (props.summaryData.actualH1 /
                        props.summaryData.targetH1) *
                      100
                    ).toFixed(2) === "NaN" ||
                    (
                      (props.summaryData.actualH1.toFixed(2) /
                        props.summaryData.targetH1.toFixed(2)) *
                      100
                    ).toFixed(2) === "Infinity"
                      ? 0
                      : (
                          (props.summaryData.actualH1 /
                            props.summaryData.targetH1) *
                          100
                        ).toFixed(2)}
                  </span>
                </div>

                <div className="border border-gray-300 py-1 text-xs flex px-2 items-center font-bold text-xs bg-gray-200">
                  H2 - (Oct - March)
                </div>
                <div className="border border-gray-300 text-xs flex justify-between items-center">
                  <span className=" flex items-center  justify-center  border-r border-gray-300 w-20">
                    Budget
                  </span>
                  <span className=" flex items-center  justify-center  border-r border-gray-300 w-20">
                    RSP
                  </span>
                  <span className=" flex items-center  justify-center border-r border-gray-300 w-20">
                    Sale
                  </span>
                  <span className=" flex items-center  justify-center border-r border-gray-300 w-20">
                    B ach
                  </span>
                  <span className=" flex items-center justify-center   border-gray-300 w-20">
                    R ach
                  </span>
                </div>
                <div className="border border-gray-300 text-xs flex justify-between items-center">
                  <span className=" flex items-center  justify-center border-r border-gray-300 w-20">
                    {props.summaryData.budgetH2.toFixed(2)}
                  </span>
                  <span className=" flex items-center justify-center  border-r border-gray-300 w-20">
                    {props.summaryData.targetH2.toFixed(2)}
                  </span>
                  <span className=" flex items-center  justify-center border-r border-gray-300 w-20">
                    {props.summaryData.actualH2.toFixed(2)}
                  </span>

                  <span className=" flex items-center  justify-center border-r border-gray-300 w-20">
                    {(
                      (props.summaryData.actualH2 /
                        props.summaryData.budgetH2) *
                      100
                    ).toFixed(2) === "NaN" ||
                    (
                      (props.summaryData.actualH2.toFixed(2) /
                        props.summaryData.budgetH2.toFixed(2)) *
                      100
                    ).toFixed(2) === "Infinity"
                      ? 0
                      : (
                          (props.summaryData.actualH2 /
                            props.summaryData.budgetH2) *
                          100
                        ).toFixed(2)}
                  </span>
                  <span className=" flex items-center  justify-center  border-gray-300 w-20">
                    {(
                      (props.summaryData.actualH2 /
                        props.summaryData.targetH2) *
                      100
                    ).toFixed(2) === "NaN" ||
                    (
                      (props.summaryData.actualH2.toFixed(2) /
                        props.summaryData.targetH2.toFixed(2)) *
                      100
                    ).toFixed(2) === "Infinity"
                      ? 0
                      : (
                          (props.summaryData.actualH2 /
                            props.summaryData.targetH2) *
                          100
                        ).toFixed(2)}
                  </span>
                </div> */}
                <div className="border border-gray-300 py-1 text-xs flex  items-center font-bold px-2 text-xs bg-gray-200">
                  Current Month-MTD
                </div>
                <div className="border border-gray-300 text-xs flex justify-between items-center">
                  <span className=" flex items-center  justify-center  border-r border-gray-300 w-20">
                    Budget
                  </span>
                  <span className=" flex items-center  justify-center  border-r border-gray-300 w-20">
                    RSP
                  </span>
                  <span className=" flex items-center  justify-center border-r border-gray-300 w-20">
                    Sale
                  </span>
                  <span className=" flex items-center  justify-center border-r border-gray-300 w-20">
                    B ach
                  </span>
                  <span className=" flex items-center justify-center   border-gray-300 w-20">
                    R ach
                  </span>
                </div>
                <div className="border border-gray-300 text-xs flex justify-between items-center">
                  <span className=" flex items-center justify-center border-r border-gray-300 w-20">
                    {props.summaryData.budgetCurrent.toFixed(2)}
                  </span>
                  <span className=" flex items-center  justify-center  border-r border-gray-300 w-20">
                    {props.summaryData.targetCurrent.toFixed(2)}
                  </span>
                  <span className=" flex items-center  justify-center border-r border-gray-300 w-20">
                    {props.summaryData.actualCurrent.toFixed(2)}
                  </span>
                  <span className=" flex items-center  justify-center border-r border-gray-300 w-20">
                    {(
                      (props.summaryData.actualCurrent /
                        props.summaryData.budgetCurrent) *
                      100
                    ).toFixed(2) === "NaN" ||
                      (
                        (props.summaryData.actualCurrent /
                          props.summaryData.budgetCurrent) *
                        100
                      ).toFixed(2) === "Infinity"
                      ? 0
                      : (
                        (props.summaryData.actualCurrent /
                          props.summaryData.budgetCurrent) *
                        100
                      ).toFixed(2)}
                  </span>
                  <span className=" flex items-center  justify-center  border-gray-300 w-20">
                    {(
                      (props.summaryData.actualCurrent /
                        props.summaryData.targetCurrent) *
                      100
                    ).toFixed(2) === "NaN" ||
                      (
                        (props.summaryData.actualCurrent.toFixed(2) /
                          props.summaryData.targetCurrent.toFixed(2)) *
                        100
                      ).toFixed(2) === "Infinity"
                      ? 0
                      : (
                        (props.summaryData.actualCurrent /
                          props.summaryData.targetCurrent) *
                        100
                      ).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            <div className="hidden lg:flex flex-col mt-2 text-sm">
              <div className="grid grid-cols-4  text-sm ">
                <div className="border border-gray-300 py-1 flex justify-center items-center font-bold text-xs bg-gray-200 ">
                  YTD
                </div>
                <div className="border border-gray-300 py-1 flex justify-center items-center font-bold text-xs bg-gray-200">
                  H1 - (April - Sept)
                </div>
                <div className="border border-gray-300 py-1 flex justify-center items-center font-bold text-xs bg-gray-200">
                  H2 - (Oct - March)
                </div>
                <div className="border border-gray-300 py-1 flex justify-center items-center font-bold text-xs bg-gray-200">
                  Current Month-MTD
                </div>
              </div>

              <div className="grid grid-cols-4  text-sm  font-bold text-xs ">
                <div className="border border-gray-300  flex justify-between items-center">
                  <span className=" flex items-center  justify-center  border-r border-gray-300 w-20">
                    Budget
                  </span>
                  <span className=" flex items-center  justify-center  border-r border-gray-300 w-20">
                    RSP
                  </span>
                  <span className=" flex items-center  justify-center border-r border-gray-300 w-20">
                    Sale
                  </span>
                  <span className=" flex items-center  justify-center border-r border-gray-300 w-20">
                    B ach
                  </span>
                  <span className=" flex items-center justify-center   border-gray-300 w-20">
                    R ach
                  </span>
                </div>
                <div className="border border-gray-300  flex justify-between items-center">
                  <span className=" flex items-center   justify-center border-r border-gray-300 w-20">
                    Budget
                  </span>
                  <span className=" flex items-center  justify-center border-r border-gray-300 w-20">
                    RSP
                  </span>
                  <span className=" flex items-center justify-center   border-r border-gray-300 w-20">
                    Sale
                  </span>
                  <span className=" flex items-center  justify-center border-r border-gray-300 w-20">
                    B ach
                  </span>
                  <span className=" flex items-center justify-center   border-gray-300 w-20">
                    R ach
                  </span>
                </div>
                <div className="border border-gray-300  flex justify-between items-center">
                  <span className=" flex items-center justify-center  border-r border-gray-300 w-20">
                    Budget
                  </span>
                  <span className=" flex items-center  justify-center  border-r border-gray-300 w-20">
                    RSP
                  </span>
                  <span className=" flex items-center  justify-center  border-r border-gray-300 w-20">
                    Sale
                  </span>
                  <span className=" flex items-center  justify-center border-r border-gray-300 w-20">
                    B ach
                  </span>
                  <span className=" flex items-center  justify-center  border-gray-300 w-20">
                    R ach
                  </span>
                </div>
                <div className="border border-gray-300  flex justify-between items-center">
                  <span className=" flex items-center  justify-center border-r border-gray-300 w-20">
                    Budget
                  </span>
                  <span className=" flex items-center  justify-center border-r border-gray-300 w-20">
                    RSP
                  </span>
                  <span className=" flex items-center  justify-center border-r border-gray-300 w-20">
                    Sale
                  </span>
                  <span className=" flex items-center justify-center  border-r border-gray-300 w-20">
                    B ach
                  </span>
                  <span className=" flex items-center  justify-center  border-gray-300 w-20">
                    R ach
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-4  text-sm bg-white">
                <div className="border border-gray-300  flex justify-between items-center">
                  <span className=" flex items-center  justify-center border-r border-gray-300 w-20">
                    {props.summaryData.budget.toFixed(2)}
                  </span>
                  <span className=" flex items-center  justify-center border-r border-gray-300 w-20">
                    {props.summaryData.target.toFixed(2)}
                  </span>
                  <span className=" flex items-center justify-center  border-r border-gray-300 w-20">
                    {props.summaryData.actual.toFixed(2)}
                  </span>
                  <span className=" flex items-center  justify-center border-r border-gray-300 w-20">
                    {(
                      (props.summaryData.actual / props.summaryData.budget) *
                      100
                    ).toFixed(2) === "NaN" ||
                      (
                        (props.summaryData.actual.toFixed(2) /
                          props.summaryData.budget.toFixed(2)) *
                        100
                      ).toFixed(2) === "Infinity"
                      ? 0
                      : (
                        (props.summaryData.actual /
                          props.summaryData.budget) *
                        100
                      ).toFixed(2)}
                  </span>
                  <span className=" flex items-center  justify-center  border-gray-300 w-20">
                    {(
                      (props.summaryData.actual / props.summaryData.target) *
                      100
                    ).toFixed(2) === "NaN" ||
                      (
                        (props.summaryData.actual.toFixed(2) /
                          props.summaryData.target.toFixed(2)) *
                        100
                      ).toFixed(2) === "Infinity"
                      ? 0
                      : (
                        (props.summaryData.actual /
                          props.summaryData.target) *
                        100
                      ).toFixed(2)}
                  </span>
                </div>
                <div className="border border-gray-300  flex justify-between items-center ">
                  <span className=" flex items-center  justify-center border-r border-gray-300 w-20">
                    {props.summaryData.budgetH1.toFixed(2)}
                  </span>
                  <span className=" flex items-center justify-center  border-r border-gray-300 w-20">
                    {props.summaryData.targetH1.toFixed(2)}
                  </span>
                  <span className=" flex items-center  justify-center  border-r border-gray-300 w-20">
                    {props.summaryData.actualH1.toFixed(2)}
                  </span>

                  <span className=" flex items-center  justify-center border-r border-gray-300 w-20">
                    {(
                      (props.summaryData.actualH1 /
                        props.summaryData.budgetH1) *
                      100
                    ).toFixed(2) === "NaN" ||
                      (
                        (props.summaryData.actualH1.toFixed(2) /
                          props.summaryData.budgetH1.toFixed(2)) *
                        100
                      ).toFixed(2) === "Infinity"
                      ? 0
                      : (
                        (props.summaryData.actualH1 /
                          props.summaryData.budgetH1) *
                        100
                      ).toFixed(2)}
                  </span>
                  <span className=" flex items-center  justify-center  border-gray-300 w-20">
                    {(
                      (props.summaryData.actualH1 /
                        props.summaryData.targetH1) *
                      100
                    ).toFixed(2) === "NaN" ||
                      (
                        (props.summaryData.actualH1.toFixed(2) /
                          props.summaryData.targetH1.toFixed(2)) *
                        100
                      ).toFixed(2) === "Infinity"
                      ? 0
                      : (
                        (props.summaryData.actualH1 /
                          props.summaryData.targetH1) *
                        100
                      ).toFixed(2)}
                  </span>
                </div>
                <div className="border border-gray-300  flex justify-between items-center">
                  <span className=" flex items-center  justify-center border-r border-gray-300 w-20">
                    {props.summaryData.budgetH2.toFixed(2)}
                  </span>
                  <span className=" flex items-center justify-center  border-r border-gray-300 w-20">
                    {props.summaryData.targetH2.toFixed(2)}
                  </span>
                  <span className=" flex items-center  justify-center border-r border-gray-300 w-20">
                    {props.summaryData.actualH2.toFixed(2)}
                  </span>

                  <span className=" flex items-center  justify-center border-r border-gray-300 w-20">
                    {(
                      (props.summaryData.actualH2 /
                        props.summaryData.budgetH2) *
                      100
                    ).toFixed(2) === "NaN" ||
                      (
                        (props.summaryData.actualH2.toFixed(2) /
                          props.summaryData.budgetH2.toFixed(2)) *
                        100
                      ).toFixed(2) === "Infinity"
                      ? 0
                      : (
                        (props.summaryData.actualH2 /
                          props.summaryData.budgetH2) *
                        100
                      ).toFixed(2)}
                  </span>
                  <span className=" flex items-center  justify-center  border-gray-300 w-20">
                    {(
                      (props.summaryData.actualH2 /
                        props.summaryData.targetH2) *
                      100
                    ).toFixed(2) === "NaN" ||
                      (
                        (props.summaryData.actualH2.toFixed(2) /
                          props.summaryData.targetH2.toFixed(2)) *
                        100
                      ).toFixed(2) === "Infinity"
                      ? 0
                      : (
                        (props.summaryData.actualH2 /
                          props.summaryData.targetH2) *
                        100
                      ).toFixed(2)}
                  </span>
                </div>
                <div className="border border-gray-300  flex justify-between items-center">
                  <span className=" flex items-center justify-center border-r border-gray-300 w-20">
                    {props.summaryData.budgetCurrent.toFixed(2)}
                  </span>
                  <span className=" flex items-center  justify-center  border-r border-gray-300 w-20">
                    {props.summaryData.targetCurrent.toFixed(2)}
                  </span>
                  <span className=" flex items-center  justify-center border-r border-gray-300 w-20">
                    {props.summaryData.actualCurrent.toFixed(2)}
                  </span>
                  <span className=" flex items-center  justify-center border-r border-gray-300 w-20">
                    {(
                      (props.summaryData.actualCurrent /
                        props.summaryData.budgetCurrent) *
                      100
                    ).toFixed(2) === "NaN" ||
                      (
                        (props.summaryData.actualCurrent /
                          props.summaryData.budgetCurrent) *
                        100
                      ).toFixed(2) === "Infinity"
                      ? 0
                      : (
                        (props.summaryData.actualCurrent /
                          props.summaryData.budgetCurrent) *
                        100
                      ).toFixed(2)}
                  </span>
                  <span className=" flex items-center  justify-center  border-gray-300 w-20">
                    {(
                      (props.summaryData.actualCurrent /
                        props.summaryData.targetCurrent) *
                      100
                    ).toFixed(2) === "NaN" ||
                      (
                        (props.summaryData.actualCurrent.toFixed(2) /
                          props.summaryData.targetCurrent.toFixed(2)) *
                        100
                      ).toFixed(2) === "Infinity"
                      ? 0
                      : (
                        (props.summaryData.actualCurrent /
                          props.summaryData.targetCurrent) *
                        100
                      ).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            <h2 className="font-bold self-center text-sm mt-2">
              {" "}
              Collection Plan
            </h2>
            <div className="flex flex-col overflow-auto text-xs lg:hidden ">
              <div className="grid grid-rows-4  text-sm ">
                <div className="border border-gray-300 py-1 flex px-2 items-center font-bold text-xs bg-gray-200 ">
                  YTD
                </div>
                <div className="border border-gray-300 text-xs flex justify-between items-center">
                  <span className=" flex items-center  justify-center  border-r border-gray-300 w-20">
                    Target
                  </span>
                  <span className=" flex items-center  justify-center border-r border-gray-300 w-20">
                    Actual
                  </span>

                  <span className=" flex items-center justify-center   border-gray-300 w-20">
                    Ach%
                  </span>
                </div>
                <div className="border border-gray-300   text-xs flex justify-between items-center">
                  <span className=" flex items-center  justify-center border-r border-gray-300 w-20">
                    {props.cSummaryData.target.toFixed(2)}
                  </span>
                  <span className=" flex items-center justify-center  border-r border-gray-300 w-20">
                    {props.cSummaryData.actual.toFixed(2)}
                  </span>

                  <span className=" flex items-center  justify-center  border-gray-300 w-20">
                    {(
                      (props.cSummaryData.actual / props.cSummaryData.target) *
                      100
                    ).toFixed(2) === "NaN" ||
                      (
                        (props.cSummaryData.actual.toFixed(2) /
                          props.cSummaryData.target.toFixed(2)) *
                        100
                      ).toFixed(2) === "Infinity"
                      ? 0
                      : (
                        (props.cSummaryData.actual /
                          props.cSummaryData.target) *
                        100
                      ).toFixed(2)}
                  </span>
                </div>

                {/* <div className="border border-gray-300 py-1 px-2  text-xs flex  items-center font-bold text-xs bg-gray-200">
                  H1 - (April - Sept)
                </div>
                <div className="border border-gray-300 text-xs flex justify-between items-center">
                  <span className=" flex items-center  justify-center  border-r border-gray-300 w-20">
                    Budget
                  </span>
                  <span className=" flex items-center  justify-center  border-r border-gray-300 w-20">
                    RSP
                  </span>
                  <span className=" flex items-center  justify-center border-r border-gray-300 w-20">
                    Sale
                  </span>
                  <span className=" flex items-center  justify-center border-r border-gray-300 w-20">
                    B ach
                  </span>
                  <span className=" flex items-center justify-center   border-gray-300 w-20">
                    R ach
                  </span>
                </div>
                <div className="border border-gray-300  text-xs flex justify-between items-center ">
                  <span className=" flex items-center  justify-center border-r border-gray-300 w-20">
                    {props.cSummaryData.budgetH1.toFixed(2)}
                  </span>
                  <span className=" flex items-center justify-center  border-r border-gray-300 w-20">
                    {props.cSummaryData.targetH1.toFixed(2)}
                  </span>
                  <span className=" flex items-center  justify-center  border-r border-gray-300 w-20">
                    {props.cSummaryData.actualH1.toFixed(2)}
                  </span>

                  <span className=" flex items-center  justify-center border-r border-gray-300 w-20">
                    {(
                      (props.cSummaryData.actualH1 /
                        props.cSummaryData.budgetH1) *
                      100
                    ).toFixed(2) === "NaN" ||
                    (
                      (props.cSummaryData.actualH1.toFixed(2) /
                        props.cSummaryData.budgetH1.toFixed(2)) *
                      100
                    ).toFixed(2) === "Infinity"
                      ? 0
                      : (
                          (props.cSummaryData.actualH1 /
                            props.cSummaryData.budgetH1) *
                          100
                        ).toFixed(2)}
                  </span>
                  <span className=" flex items-center  justify-center  border-gray-300 w-20">
                    {(
                      (props.cSummaryData.actualH1 /
                        props.cSummaryData.targetH1) *
                      100
                    ).toFixed(2) === "NaN" ||
                    (
                      (props.cSummaryData.actualH1.toFixed(2) /
                        props.cSummaryData.targetH1.toFixed(2)) *
                      100
                    ).toFixed(2) === "Infinity"
                      ? 0
                      : (
                          (props.cSummaryData.actualH1 /
                            props.cSummaryData.targetH1) *
                          100
                        ).toFixed(2)}
                  </span>
                </div>

                <div className="border border-gray-300 py-1 text-xs flex px-2 items-center font-bold text-xs bg-gray-200">
                  H2 - (Oct - March)
                </div>
                <div className="border border-gray-300 text-xs flex justify-between items-center">
                  <span className=" flex items-center  justify-center  border-r border-gray-300 w-20">
                    Budget
                  </span>
                  <span className=" flex items-center  justify-center  border-r border-gray-300 w-20">
                    RSP
                  </span>
                  <span className=" flex items-center  justify-center border-r border-gray-300 w-20">
                    Sale
                  </span>
                  <span className=" flex items-center  justify-center border-r border-gray-300 w-20">
                    B ach
                  </span>
                  <span className=" flex items-center justify-center   border-gray-300 w-20">
                    R ach
                  </span>
                </div>
                <div className="border border-gray-300 text-xs flex justify-between items-center">
                  <span className=" flex items-center  justify-center border-r border-gray-300 w-20">
                    {props.cSummaryData.budgetH2.toFixed(2)}
                  </span>
                  <span className=" flex items-center justify-center  border-r border-gray-300 w-20">
                    {props.cSummaryData.targetH2.toFixed(2)}
                  </span>
                  <span className=" flex items-center  justify-center border-r border-gray-300 w-20">
                    {props.cSummaryData.actualH2.toFixed(2)}
                  </span>

                  <span className=" flex items-center  justify-center border-r border-gray-300 w-20">
                    {(
                      (props.cSummaryData.actualH2 /
                        props.cSummaryData.budgetH2) *
                      100
                    ).toFixed(2) === "NaN" ||
                    (
                      (props.cSummaryData.actualH2.toFixed(2) /
                        props.cSummaryData.budgetH2.toFixed(2)) *
                      100
                    ).toFixed(2) === "Infinity"
                      ? 0
                      : (
                          (props.cSummaryData.actualH2 /
                            props.cSummaryData.budgetH2) *
                          100
                        ).toFixed(2)}
                  </span>
                  <span className=" flex items-center  justify-center  border-gray-300 w-20">
                    {(
                      (props.cSummaryData.actualH2 /
                        props.cSummaryData.targetH2) *
                      100
                    ).toFixed(2) === "NaN" ||
                    (
                      (props.cSummaryData.actualH2.toFixed(2) /
                        props.cSummaryData.targetH2.toFixed(2)) *
                      100
                    ).toFixed(2) === "Infinity"
                      ? 0
                      : (
                          (props.cSummaryData.actualH2 /
                            props.cSummaryData.targetH2) *
                          100
                        ).toFixed(2)}
                  </span>
                </div> */}
                <div className="border border-gray-300 py-1 text-xs flex  items-center font-bold px-2 text-xs bg-gray-200">
                  Current Month-MTD
                </div>

                <div className="border border-gray-300 text-xs flex justify-between items-center">
                  <span className=" flex items-center  justify-center  border-r border-gray-300 w-20">
                    Target
                  </span>
                  <span className=" flex items-center  justify-center border-r border-gray-300 w-20">
                    Actual
                  </span>

                  <span className=" flex items-center justify-center   border-gray-300 w-20">
                    Ach%
                  </span>
                </div>
                <div className="border border-gray-300 text-xs flex justify-between items-center">
                  <span className=" flex items-center  justify-center  border-r border-gray-300 w-20">
                    {props.cSummaryData.targetCurrent.toFixed(2)}
                  </span>
                  <span className=" flex items-center  justify-center border-r border-gray-300 w-20">
                    {props.cSummaryData.actualCurrent.toFixed(2)}
                  </span>

                  <span className=" flex items-center  justify-center  border-gray-300 w-20">
                    {(
                      (props.cSummaryData.actualCurrent /
                        props.cSummaryData.targetCurrent) *
                      100
                    ).toFixed(2) === "NaN" ||
                      (
                        (props.cSummaryData.actualCurrent.toFixed(2) /
                          props.cSummaryData.targetCurrent.toFixed(2)) *
                        100
                      ).toFixed(2) === "Infinity"
                      ? 0
                      : (
                        (props.cSummaryData.actualCurrent /
                          props.cSummaryData.targetCurrent) *
                        100
                      ).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            <div className="hidden lg:flex flex-col mt-2 text-sm">
              <div className="grid grid-cols-4  text-sm ">
                <div className="border border-gray-300 py-1 flex justify-center items-center font-bold text-xs bg-gray-200 ">
                  YTD
                </div>
                <div className="border border-gray-300 py-1 flex justify-center items-center font-bold text-xs bg-gray-200">
                  H1 - (April - Sept)
                </div>
                <div className="border border-gray-300 py-1 flex justify-center items-center font-bold text-xs bg-gray-200">
                  H2 - (Oct - March)
                </div>
                <div className="border border-gray-300 py-1 flex justify-center items-center font-bold text-xs bg-gray-200">
                  Current Month-MTD
                </div>
              </div>

              <div className="grid grid-cols-4  text-sm  font-bold text-xs ">
                <div className="border border-gray-300  flex justify-between items-center">
                  <span className=" flex items-center  justify-center  border-r border-gray-300 w-20">
                    Target
                  </span>
                  <span className=" flex items-center  justify-center border-r border-gray-300 w-20">
                    Actual
                  </span>

                  <span className=" flex items-center justify-center   border-gray-300 w-20">
                    Ach%
                  </span>
                </div>
                <div className="border border-gray-300  flex justify-between items-center">
                  <span className=" flex items-center  justify-center  border-r border-gray-300 w-20">
                    Target
                  </span>
                  <span className=" flex items-center  justify-center border-r border-gray-300 w-20">
                    Actual
                  </span>

                  <span className=" flex items-center justify-center   border-gray-300 w-20">
                    Ach%
                  </span>
                </div>
                <div className="border border-gray-300  flex justify-between items-center">
                  <span className=" flex items-center  justify-center  border-r border-gray-300 w-20">
                    Target
                  </span>
                  <span className=" flex items-center  justify-center border-r border-gray-300 w-20">
                    Actual
                  </span>

                  <span className=" flex items-center justify-center   border-gray-300 w-20">
                    Ach%
                  </span>
                </div>
                <div className="border border-gray-300  flex justify-between items-center">
                  <span className=" flex items-center  justify-center  border-r border-gray-300 w-20">
                    Target
                  </span>
                  <span className=" flex items-center  justify-center border-r border-gray-300 w-20">
                    Actual
                  </span>

                  <span className=" flex items-center justify-center   border-gray-300 w-20">
                    Ach%
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-4  text-sm bg-white ">
                <div className="border border-gray-300  flex justify-between items-center">
                  <span className=" flex items-center  justify-center border-r border-gray-300 w-20">
                    {props.cSummaryData.target.toFixed(2)}
                  </span>
                  <span className=" flex items-center justify-center  border-r border-gray-300 w-20">
                    {props.cSummaryData.actual.toFixed(2)}
                  </span>

                  <span className=" flex items-center  justify-center  border-gray-300 w-20">
                    {(
                      (props.cSummaryData.actual / props.cSummaryData.target) *
                      100
                    ).toFixed(2) === "NaN" ||
                      (
                        (props.cSummaryData.actual.toFixed(2) /
                          props.cSummaryData.target.toFixed(2)) *
                        100
                      ).toFixed(2) === "Infinity"
                      ? 0
                      : (
                        (props.cSummaryData.actual /
                          props.cSummaryData.target) *
                        100
                      ).toFixed(2)}
                  </span>
                </div>
                <div className="border border-gray-300  flex justify-between items-center">
                  <span className=" flex items-center justify-center  border-r border-gray-300 w-20">
                    {props.cSummaryData.targetH1.toFixed(2)}
                  </span>
                  <span className=" flex items-center  justify-center  border-r border-gray-300 w-20">
                    {props.cSummaryData.actualH1.toFixed(2)}
                  </span>

                  <span className=" flex items-center  justify-center  border-gray-300 w-20">
                    {(
                      (props.cSummaryData.actualH1 /
                        props.cSummaryData.targetH1) *
                      100
                    ).toFixed(2) === "NaN" ||
                      (
                        (props.cSummaryData.actualH1.toFixed(2) /
                          props.cSummaryData.targetH1.toFixed(2)) *
                        100
                      ).toFixed(2) === "Infinity"
                      ? 0
                      : (
                        (props.cSummaryData.actualH1 /
                          props.cSummaryData.targetH1) *
                        100
                      ).toFixed(2)}
                  </span>
                </div>
                <div className="border border-gray-300  flex justify-between items-center">
                  <span className=" flex items-center justify-center  border-r border-gray-300 w-20">
                    {props.cSummaryData.targetH2.toFixed(2)}
                  </span>
                  <span className=" flex items-center  justify-center border-r border-gray-300 w-20">
                    {props.cSummaryData.actualH2.toFixed(2)}
                  </span>

                  <span className=" flex items-center  justify-center  border-gray-300 w-20">
                    {(
                      (props.cSummaryData.actualH2 /
                        props.cSummaryData.targetH2) *
                      100
                    ).toFixed(2) === "NaN" ||
                      (
                        (props.cSummaryData.actualH2.toFixed(2) /
                          props.cSummaryData.targetH2.toFixed(2)) *
                        100
                      ).toFixed(2) === "Infinity"
                      ? 0
                      : (
                        (props.cSummaryData.actualH2 /
                          props.cSummaryData.targetH2) *
                        100
                      ).toFixed(2)}
                  </span>
                </div>
                <div className="border border-gray-300  flex justify-between items-center ">
                  <span className=" flex items-center  justify-center  border-r border-gray-300 w-20">
                    {props.cSummaryData.targetCurrent.toFixed(2)}
                  </span>
                  <span className=" flex items-center  justify-center border-r border-gray-300 w-20">
                    {props.cSummaryData.actualCurrent.toFixed(2)}
                  </span>
                  <span className=" flex items-center  justify-center  border-gray-300 w-20">
                    {(
                      (props.cSummaryData.actualCurrent /
                        props.cSummaryData.targetCurrent) *
                      100
                    ).toFixed(2) === "NaN" ||
                      (
                        (props.cSummaryData.actualCurrent.toFixed(2) /
                          props.cSummaryData.targetCurrent.toFixed(2)) *
                        100
                      ).toFixed(2) === "Infinity"
                      ? 0
                      : (
                        (props.cSummaryData.actualCurrent /
                          props.cSummaryData.targetCurrent) *
                        100
                      ).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-2 lg:mt-6 md:flex items-start justify-center gap-4  ">
              {/* Product Category Table  */}

              <TableChartTwo
                heading={"Product Category"}
                title={
                  "Product Category ( Target vs Achievement )  - Annual , YTD , MTD"
                }
                color={"bg-white"}
                datas={props.productCategoryData || []}
                filterState={props.filterState}
              ></TableChartTwo>
            </div>

            <div className="mt-2 lg:mt-6  h-[500px] md:flex items-start justify-center gap-4  ">
              {/* Product Brand Table  */}

              <TableChartTwo
                heading={"Product Brand"}
                title={
                  "Product Brand ( Target vs Achievement )  - Annual , YTD , MTD"
                }
                color={"bg-white"}
                datas={props.productBrandData || []}
                filterState={props.filterState}
              ></TableChartTwo>
            </div>

            <div className="mt-2 lg:mt-6 md:flex items-start justify-center gap-4  ">
              {/* Product Segment Table  */}

              <TableChartTwo
                heading={"Product Segment"}
                title={
                  "Product Segment ( Target vs Achievement )  - Annual , YTD , MTD"
                }
                color={"bg-white"}
                datas={props.productSegmentData || []}
                filterState={props.filterState}
              ></TableChartTwo>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default AllCharts;
