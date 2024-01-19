import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import ChartOne from "./ChartOne";
import ChartTwo from "./ChartTwo";
import ChartThree from "./ChartThree";
import TableChart from "./TableChart";
import TableChartOne from "./TableChartOne";
import TableChartTwo from "./TableChartTwo";
import {
  businessSegment,
  chartData,
  businessUnit,
  zoneData,
  regionData,
} from "./sample";
import { zonelabel, regionLable, territoryLable } from "./labels";
import dummyData from "./TableData";
import { url } from "@/constants/url";
import axios from "axios";

const AllCharts = (props) => {
  const [territoryGraphData, setTerritoryGraphData] = useState([]);
  const [territorytLabelData, setTerritoryLabelData] = useState([]);
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
        if (item.zone_name) {
          territoryLabel.push(item.territory_name);
        }
        if (item.target) {
          budgetData.data.push(item.budget);
        }
        if (item.budget) {
          targetData.data.push(item.target);
        }
        if (item.actual) {
          actualData.data.push(item.actual);
        }
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
        if (item.zone_name) {
          regionLabel.push(item.region_name);
        }
        if (item.target) {
          budgetData.data.push(item.budget);
        }
        if (item.budget) {
          targetData.data.push(item.target);
        }
        if (item.actual) {
          actualData.data.push(item.actual);
        }
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
        if (item.target) {
          budgetData.data.push(item.budget);
        }
        if (item.budget) {
          targetData.data.push(item.target);
        }
        if (item.actual) {
          actualData.data.push(item.actual);
        }
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
        if (item.target) {
          budgetData.data.push(item.budget);
        }
        if (item.budget) {
          targetData.data.push(item.target);
        }
        if (item.actual) {
          actualData.data.push(item.actual);
        }
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

  console.log("klop", bsUnitGraphData, bsUnitLabelData);

  //creating business segment graph

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
        if (item.budget) {
          budgetData.data.push(item.budget);
        }
        if (item.target) {
          targetData.data.push(item.target);
        }
        if (item.actual) {
          actualData.data.push(item.actual);
        }
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
      console.log("lio", BSegmentGraphData);
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

  console.log("hgf", pbGraphData, pbLabelData)
  //************************************************************************************************//

  return (
    <>
      <section className="wrapper w-full px-2 mt-2 font-arial  ">
        <div className="mt-2 lg:mt-2 md:flex items-start justify-center gap-4">
          {/* <TableChartOne
            heading={"Business Segments"}
            title={
              "Business Segments ( Target vs Achievement )  - Annual , YTD , MTD"
            }
            color={"bg-white"}
            lab={labelNameTwo}
            datas={dummyData || []}
          /> */}

          {/* <TableChartTwo
            heading={"Business Units"}
            title={
              "Business Units ( Target vs Achievement )  - Annual , YTD , MTD"
            }
            color={"bg-white"}
            lab={labelNameTwo}
            datas={dummyData || []}
          ></TableChartTwo> */}
        </div>

        <div className="mt-2 lg:mt-2 md:flex items-start justify-center gap-4 ">
          <ChartOne
            title={"Business Segments"}
            color={"bg-blue-500"}
            lab={bsLabelData}
            datasets={bsGraphData || []}
          />

          <ChartTwo
            title={"Business Units"}
            color={"bg-violet-500"}
            lab={bsUnitLabelData}
            datasets={bsUnitGraphData || []}
          />
        </div>

        <div className=" mt-2 lg:mt-2 md:flex items-start justify-center gap-4 ">
          {/* <TableChart
            heading={"Zone"}
            title={"Zone ( Target vs Achievement )  - Annual , YTD , MTD"}
            color={"bg-white"}
            lab={labelNameTwo}
            datas={dummyData || []}
          ></TableChart> */}
        </div>

        <div className="mt-2 lg:mt-6 md:flex items-start justify-center gap-4  ">
          <ChartTwo
            title={"Business Zone"}
            color={"bg-pink-500"}
            lab={zonetLabelData}
            datasets={zoneGraphData || []}
          ></ChartTwo>
        </div>

        <div className=" mt-2 lg:mt-2 md:flex items-start justify-center gap-4 ">
          {/* <TableChart
            heading={"Region"}
            title={"Region ( Target vs Achievement )  - Annual , YTD , MTD"}
            color={"bg-white"}
            lab={labelNameTwo}
            datas={dummyData || []}
          ></TableChart> */}
        </div>

        <div className="mt-2 lg:mt-6 md:flex items-start justify-center gap-4">
          <ChartThree
            title={"Business Region"}
            color={"bg-teal-400"}
            lab={regiontLabelData}
            datasets={regionGraphData || []}
          ></ChartThree>
        </div>

        <div className=" mt-2 lg:mt-2 md:flex items-start justify-center gap-4 ">
          {/* <TableChart
            heading={"Territory"}
            title={"Territory ( Target vs Achievement )  - Annual , YTD , MTD"}
            color={"bg-white"}
            lab={labelNameTwo}
            datas={dummyData || []}
          ></TableChart> */}
        </div>

        {/* territory label  */}

        <div className="mt-2 lg:mt-6 md:flex items-start justify-center gap-4">
          <ChartThree
            title={"Territory"}
            color={"bg-rose-500"}
            lab={territorytLabelData}
            datasets={territoryGraphData || []}
          ></ChartThree>
        </div>

        <div className="mt-2 lg:mt-6 md:flex items-start justify-center gap-4  ">
          {/* <ChartOne
            title={"Customer Wise"}
            color={"bg-sky-500"}
            lab={labelNameTwo}
            datasets={chartData || []}
          ></ChartOne>
          <ChartTwo
            title={"Customer Wise Data View"}
            color={"bg-sky-500"}
            lab={labelNameTwo}
            datasets={businessUnit || []}
          ></ChartTwo> */}
        </div>

        <div className="mt-2 lg:mt-6 md:flex items-start justify-center gap-4  ">
          <ChartOne
            title={"Product Segment"}
            color={"bg-orange-500"}
            lab={psLabelData}
            datasets={psGraphData || []}
          ></ChartOne>

          {/* Product Segment Table  */}

          <TableChartTwo
            heading={"Product Segment"}
            title={
              "Product Segment ( Target vs Achievement )  - Annual , YTD , MTD"
            }
            color={"bg-white"}
            datas={props.productSegmentData || []}
          ></TableChartTwo>
        </div>

        <div className="mt-2 lg:mt-6 md:flex items-start justify-center gap-4  ">
          <ChartOne
            title={"Product Category"}
            color={"bg-[#15283c]"}
            lab={pcLabelData}
            datasets={pcGraphData || []}
          ></ChartOne>

          {/* Product Category Table  */}

          <TableChartTwo
            heading={"Product Category"}
            title={
              "Product Category ( Target vs Achievement )  - Annual , YTD , MTD"
            }
            color={"bg-white"}
            datas={props.productCategoryData || []}
          ></TableChartTwo>
        </div>

        <div className="mt-2 lg:mt-6 md:flex items-start justify-center gap-4  ">
          <ChartOne
            title={"Product Brand"}
            color={"bg-indigo-500"}
            lab={pbLabelData}
            datasets={pbGraphData || []}
          ></ChartOne>

          {/* Product Brand Table  */}

          <TableChartTwo
            heading={"Product Brand"}
            title={
              "Product Brand ( Target vs Achievement )  - Annual , YTD , MTD"
            }
            color={"bg-white"}
            datas={props.productBrandData || []}
          ></TableChartTwo>

          {/* <ChartTwo title={"Product Brand Data View"} color={"bg-indigo-500"}lab={labelNameTwo} datasets={businessUnit || []} ></ChartTwo> */}
        </div>

        {/* buttons */}

        <div className="mt-12 flex items-center justify-end mx-8 gap-4 pb-4">
          {/* <button
            onClick={() => {
              router.push("/chartreports");
            }}
            className="text-center  rounded-md bg-blue-500 text-white py-1 px-4 text-sm"
          >
            Back
          </button>
          <button
            onClick={() => {
              props.formType("Table");
            }}
            className="text-center rounded-md bg-orange-500 text-white py-1 px-4 text-sm"
          >
            Next
          </button> */}
        </div>
      </section>
    </>
  );
};

export default AllCharts;
