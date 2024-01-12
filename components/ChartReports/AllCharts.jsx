import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import ChartOne from "./ChartOne";
import ChartTwo from "./ChartTwo";
import ChartThree from "./ChartThree";
import TableChart from "./TableChart";
import TableChartOne from "./TableChartOne";
import TableChartTwo from "./TableChartTwo";
import { businessSegment, chartData, businessUnit, zoneData, regionData } from "./sample";
import { zonelabel, regionLable, territoryLable } from "./labels";
import dummyData from "./TableData";
import { url } from "@/constants/url";
import axios from "axios";

const AllCharts = (props) => {
   const {param, allTable} = props
  const [TerriData, setTerriData] = useState("");
  const[RegionData, setRegionData] = useState("")
  const[ZoneData, setZoneData] = useState("")
  const[BusUnitData, setBusUnitData] = useState("")
  const[BsegmentData, setBSegmentData] = useState("")

  const headers = {
    "Content-Type": "application/json",
    secret: "fsdhfgsfuiweifiowefjewcewcebjw"
  };

  const router = useRouter();

  //dynamic labels
  const labelNameOne = ["B-2-B", "B-2-C"];
  const labelNameTwo = ["India 1", "India 2", "India 3"];

  //getting terri api data

  const getTerriData = async () => {
    try {
      const res = await axios.get(`${url}/api/get_rollingdata_based_on_roll_t`, {
        headers: headers,
        params: {bu_id: 1,bg_id: 1,m_year: "2023-12", t_year: 2023, z_id: 3}
      });
      const respdata = await res.data.data;
      console.log("Terri", respdata)

      setTerriData(respdata);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  //getting region data 

  const getRegionData = async () => {
    try {
      const res = await axios.get(`${url}/api/get_rollingdata_based_on_roll_r`, {
        headers: headers,
        params: {bu_id: 1,bg_id: 1,m_year: "2023-12", t_year: 2023, z_id: 3}
      });
      const respdata = await res.data.data;
      console.log("Region", respdata)

      setRegionData(respdata);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  //getting Zone Data

  const getZoneData = async () => {
    try {
      const res = await axios.get(`${url}/api/get_rollingdata_based_on_roll_z`, {
        headers: headers,
        params: {bu_id: 1,bg_id: 1,m_year: "2023-12", t_year: 2023, z_id: 3}
      });
      const respdata = await res.data.data;
      console.log("Zoneeee", respdata)
      setZoneData(respdata);
    } catch (error) {
      console.log("Error:", error);
    }
  };

//getting Business Data

  const getBusUnitData = async ()=>{
    try {
      const res = await axios.get(`${url}/api/get_rollingdata_based_on_roll_bu`, {
        headers: headers,
        params: {bu_id: 1,bg_id: 1,m_year: "2023-12", t_year: 2023, z_id: 3}
      });
      const respdata = await res.data.data;
      setBusUnitData(respdata);
      console.log("Business", respdata)

    } catch (error) {
      console.log("Error:", error);
    }
  }
  //getting Business Segments

  const getBSegmentsData = async ()=>{
    try {
      const res = await axios.get(`${url}/api/get_rollingdata_based_on_roll_bg`, {
        headers: headers,
        params: {bu_id: 1,bg_id: 1,m_year: "2023-12", t_year: 2023, z_id: 3}
      });
      const respdata = await res.data.data;
      setBSegmentData(respdata);
    } catch (error) {
      console.log("Error:", error);
    }
  }

  useEffect(() => {
    getTerriData();
    getRegionData();
    getZoneData()
    getBusUnitData()
    getBSegmentsData()
  }, []);



  //creating data for graph Territory

  let TerriGraphData = [];
  let TerrilabelData =[];

  if (allTable) {
    const budgetData = { label: "Budget", backgroundColor: "#3B82F6", data: [] };
    const actualData = { label: "Actual", backgroundColor: "#22C55E", data: [] };
    const targetData = { label: "Rolling", backgroundColor: "#F97316", data: [] };
    allTable.forEach((item) => {
      if(item.territory_name){
        TerrilabelData.push(item.territory_name);
      }
      if (item.budget) {
        budgetData.data.push(item.budget);
      }
      if (item.actual) {
        actualData.data.push(item.actual);
      }
      if (item.target) {
        targetData.data.push(item.target);
      }
    });
    if (budgetData.data.length > 0) {
      TerriGraphData.push(budgetData);
    }
    if (targetData.data.length > 0) {
      TerriGraphData.push(targetData);
    }
    if (actualData.data.length > 0) {
      TerriGraphData.push(actualData);
    }
  }

  //creating data for graph Region

  let RegionGraphData = [];
  let RegionlabelData =[];

  if (RegionData) {
    const budgetData = { label: "Budget", backgroundColor: "#3B82F6", data: [] };
    const actualData = { label: "Actual", backgroundColor: "#22C55E", data: [] };
    const targetData = { label: "Rolling", backgroundColor: "#F97316", data: [] };
    RegionData.forEach((item) => {
      if(item.region_name){
        RegionlabelData.push(item.region_name);
      }
      if (item.budget) {
        budgetData.data.push(item.budget);
      }
      if (item.actual) {
        actualData.data.push(item.actual);
      }
      if (item.target) {
        targetData.data.push(item.target);
      }
    });
    if (budgetData.data.length > 0) {
      RegionGraphData.push(budgetData);
    }
    if (targetData.data.length > 0) {
      RegionGraphData.push(targetData);
    }
    if (actualData.data.length > 0) {
      RegionGraphData.push(actualData);
    }
  }

  //creating Zone graph data

  let ZoneGraphData = [];
  let ZonelabelData =[];

  if (ZoneData) {
    const budgetData = { label: "Budget", backgroundColor: "#3B82F6", data: [] };
    const targetData = { label: "Rolling", backgroundColor: "#F97316", data: [] };
    const actualData = { label: "Actual", backgroundColor: "#22C55E", data: [] };
    ZoneData.forEach((item) => {
      if(item.zone_name){
        ZonelabelData.push(item.zone_name);
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
      ZoneGraphData.push(budgetData);
    }
    if (targetData.data.length > 0) {
      ZoneGraphData.push(targetData);
    }
    if (actualData.data.length > 0) {
      ZoneGraphData.push(actualData);
    }
  }

//creating business unit graph

  let BusUnitGraphData = [];
  let BusUnitlabelData =[];

  if (BusUnitData) {
    const budgetData = { label: "Budget", backgroundColor: "#3B82F6", data: [] };
    const targetData = { label: "Rolling", backgroundColor: "#F97316", data: [] };
    const actualData = { label: "Actual", backgroundColor: "#22C55E", data: [] };
    BusUnitData.forEach((item) => {
      if(item.business_unit_name){
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



//creating business segment graph

  let BSegmentGraphData = [];
  let BSegmentlabelData =[];

  if (BsegmentData) {
    const budgetData = { label: "Budget", backgroundColor: "#3B82F6", data: [] };
    const targetData = { label: "Rolling", backgroundColor: "#F97316", data: [] };
    const actualData = { label: "Actual", backgroundColor: "#22C55E", data: [] };
    BsegmentData.forEach((item) => {
      if(item.business_segment){
        BSegmentlabelData.push(item.business_segment);
      }
      if (item.target) {
        budgetData.data.push(item.budget);
      }
      if (item.target) {
        targetData.data.push(item.target);
      }
      if (item.actual) {
        actualData.data.push(item.actual);
      }
    });
    if (targetData.data.length > 0) {
      BSegmentGraphData.push(budgetData);
    }
    if (targetData.data.length > 0) {
      BSegmentGraphData.push(targetData);
    }
    if (actualData.data.length > 0) {
      BSegmentGraphData.push(actualData);
    }
  }

  
//************************************************************************************************//

const [prdCategory, setPrdCategory] = useState("")
const [prdSegment, setPrdSegment] = useState("")
const [prdBrand, setPrdBrand] = useState("")
  //getting Product Category Data

  const getProductCategory = async () => {
    try {
      const res = await axios.get(`${url}/api/RSP_downloadAnalytical`, {
        headers: headers,
        params: {year_1: 2021,year_2:2022,year_3:2023, year_2_cm:"2023-12",year_2_nm:"2023-01",year_3_cm:"2023-12",
        year_3_nm:"2024-01",t_des:"Moga",t_id:37,plan_id:1,tran_id:"RP-122023",m_year:"2023-12-01T00:00:00.00Z",json:true,
        analytical_key:"Product Category"
      }
      });
      const respdata = await res.data.data;
      setPrdCategory(respdata);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const getProductSegment = async () => {
    try {
      const res = await axios.get(`${url}/api/RSP_downloadAnalytical`, {
        headers: headers,
        params: {year_1: 2021,year_2:2022,year_3:2023, year_2_cm:"2023-12",year_2_nm:"2023-01",year_3_cm:"2023-12",
        year_3_nm:"2024-01",t_des:"Moga",t_id:37,plan_id:1,tran_id:"RP-122023",m_year:"2023-12-01T00:00:00.00Z",json:true,
        analytical_key:"Product Segment"
      }
      });
      const respdata = await res.data.data;
      setPrdSegment(respdata);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const getProductBrand = async () => {
    try {
      const res = await axios.get(`${url}/api/RSP_downloadAnalytical`, {
        headers: headers,
        params: {year_1: 2021,year_2:2022,year_3:2023, year_2_cm:"2023-12",year_2_nm:"2023-01",year_3_cm:"2023-12",
        year_3_nm:"2024-01",t_des:"Moga",t_id:37,plan_id:1,tran_id:"RP-122023",m_year:"2023-12-01T00:00:00.00Z",json:true,
        analytical_key:"Brand Desc"
      }
      });
      const respdata = await res.data.data;
      setPrdBrand(respdata);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  useEffect(()=>{
    getProductCategory()
    getProductSegment()
    getProductBrand()
  },[])


//Product Category Graph

  let ProdCatGraphData = [];
  let ProdCatLabelData =[];

  if (prdCategory) {
    const budgetData = { label: "Budget", backgroundColor: "#3B82F6", data: [] };
    const targetData = { label: "Rolling", backgroundColor: "#F97316", data: [] };
    const actualData = { label: "Actual", backgroundColor: "#22C55E", data: [] };
    prdCategory.forEach((item) => {
      const Keys = Object.keys(item)
      const Values = Object.values(item)
      if(item["Product Category"]){
        ProdCatLabelData.push(item["Product Category"]);
      }
      if (Keys[11]) {
        budgetData.data.push(Values[11]);
      }
      if (Keys[15]) {
        targetData.data.push(Values[15]);
      }
      if (Keys[23]) {
        actualData.data.push(Values[23]);
      }
    });
    if (budgetData.data.length > 0) {
      ProdCatGraphData.push(budgetData);
    }
    if (targetData.data.length > 0) {
      ProdCatGraphData.push(targetData);
    }
    if (actualData.data.length > 0) {
      ProdCatGraphData.push(actualData);
    }
  }


//Product Segments Graph

  let ProdSegGraphData = [];
  let ProdSegLabelData =[];

  if (prdSegment) {
    const budgetData = { label: "Budget", backgroundColor: "#3B82F6", data: [] };
    const targetData = { label: "Rolling", backgroundColor: "#F97316", data: [] };
    const actualData = { label: "Actual", backgroundColor: "#22C55E", data: [] };
    prdSegment.forEach((item) => {
      const Keys = Object.keys(item)
      const Values = Object.values(item)
      if(item["Product Segment"]){
        ProdSegLabelData.push(item["Product Segment"]);
      }
      if (Keys[11]) {
        budgetData.data.push(Values[11]);
      }
      if (Keys[15]) {
        targetData.data.push(Values[15]);
      }
      if (Keys[23]) {
        actualData.data.push(Values[23]);
      }
    });
    if (targetData.data.length > 0) {
      ProdSegGraphData.push(budgetData);
    }
    if (targetData.data.length > 0) {
      ProdSegGraphData.push(targetData);
    }
    if (actualData.data.length > 0) {
      ProdSegGraphData.push(actualData);
    }
  }

  //Product Brand Graph


  let ProdBrandGraphData = [];
  let ProdBrandLabelData =[];

  if (prdBrand) {
    const budgetData = { label: "Budget", backgroundColor: "#3B82F6", data: [] };
    const targetData = { label: "Rolling", backgroundColor: "#F97316", data: [] };
    const actualData = { label: "Actual", backgroundColor: "#22C55E", data: [] };
    prdBrand.forEach((item) => {
      const Keys = Object.keys(item)
      const Values = Object.values(item)
      if(item["Brand Desc"]){
        ProdBrandLabelData.push(item["Brand Desc"]);
      }
      if (Keys[11]) {
        budgetData.data.push(Values[11]);
      }
      if (Keys[15]) {
        targetData.data.push(Values[15]);
      }
      if (Keys[23]) {
        actualData.data.push(Values[23]);
      }
    });
    if (budgetData.data.length > 0) {
      ProdBrandGraphData.push(budgetData);
    }
    if (targetData.data.length > 0) {
      ProdBrandGraphData.push(targetData);
    }
    if (actualData.data.length > 0) {
      ProdBrandGraphData.push(actualData);
    }
  }


  //Product Segment Table Data

// console.log("Product Segment", prdSegment)

const PrdSegTableData =[]

// if(prdSegment){
//     prdSegment.forEach((item)=>{
//       const Keys = Object.keys(item)
//       const Values = Object.values(item)
//       console.log(Keys)
//       console.log(Values)
//       if(Keys[0] && Keys[2] && Keys[4] && Keys[5] && Keys[6] && Keys[7] && Keys[8] && Keys[11] && Keys[15] && Keys[23] && Keys[25])
//       PrdSegTableData.push(item)
//     })
// }


// if (prdSegment) {
//   prdSegment.forEach((item) => {
//     const Keys = Object.keys(item);
//     const Values = Object.values(item);
//     console.log("Keys", Values)
//     const targetIndices = [0, 2, 4, 5, 6, , , 11, 15, 23, 6 , 7, 25, 8, 6,];
//     const targetKeys = targetIndices.map(index => Keys[index]);
    
//     const filteredItem = Object.fromEntries(
//       Object.entries(item).filter(([key, value]) => targetKeys.includes(key))
//     );

//     PrdSegTableData.push(filteredItem);
//   });
// }

// if (prdSegment) {
//   prdSegment.forEach((item) => {
//     const Keys = Object.keys(item);
//     const Values = Object.values(item)
//     console.log("Keys", Keys)
//     console.log("Values", Values)

//     const targetIndices = [0, 2, 4, 5, 6, 11, 15, 23, 6, 7, 25, 8, 6];
//     const filteredItem = {};

//     targetIndices.forEach((index) => {
//       const key = Keys[index];
//       if (key) {
//         filteredItem[key] = item[key];
//       }
//     });

//     PrdSegTableData.push(filteredItem);
//   });
// }

if (prdSegment) {
  prdSegment.forEach((item) => {
    const Keys = Object.keys(item)
    const Values = Object.values(item)
    console.log("Keys", Keys)
    console.log("Values", Values)
    const targetIndices = [0, 2, 4, 5, 6, 0, 11, 15, 23, 0, 0,7, 25, 8,0,0,0,0];
    
    const filteredItem = targetIndices.reduce((acc, index) => {
      const key = Object.keys(item)[index];
      if (key) {
        acc[key] = item[key];
      }
      return acc;
    }, {});

    PrdSegTableData.push(filteredItem);
  });
}


// console.log("ModData", PrdSegTableData);
console.log("PropsAll", allTable)


  
// ***************************************** JSX START *******************************************************************/

  return (
    <>
      <section className="wrapper w-full px-2 mt-2 font-arial  ">
        <div className="mt-2 lg:mt-2 md:flex items-start justify-center gap-4  ">
          <TableChartOne
            heading={"Business Segments"}
            title={"Business Segments ( Target vs Achievement )  - Annual , YTD , MTD"}
            color={"bg-white"}
            lab={labelNameTwo}
            datas={dummyData || []}
          ></TableChartOne>
          <TableChartTwo
            heading={"Business Units"}
            title={"Business Units ( Target vs Achievement )  - Annual , YTD , MTD"}
            color={"bg-white"}
            lab={labelNameTwo}
            datas={dummyData || []}
          ></TableChartTwo>
        </div>

        <div className="mt-2 lg:mt-2 md:flex items-start justify-center gap-4 ">
          <ChartOne
            title={"Business Segments"}
            color={"bg-blue-500"}
            lab={BSegmentlabelData}
            datasets={BSegmentGraphData || []}
          ></ChartOne>
          <ChartTwo
            title={"Business Units"}
            color={"bg-violet-500"}
            lab={BusUnitlabelData}
            datasets={BusUnitGraphData || []}
          ></ChartTwo>
        </div>

        <div className=" mt-2 lg:mt-2 md:flex items-start justify-center gap-4 ">
          <TableChart
            heading={"Zone"}
            title={"Zone ( Target vs Achievement )  - Annual , YTD , MTD"}
            color={"bg-white"}
            lab={labelNameTwo}
            datas={dummyData || []}
          ></TableChart>
        </div>

        <div className="mt-2 lg:mt-6 md:flex items-start justify-center gap-4  ">
          <ChartTwo
            title={"Business Zone"}
            color={"bg-pink-500"}
            lab={ZonelabelData}
            datasets={ZoneGraphData || []}
          ></ChartTwo>
        </div>

        <div className=" mt-2 lg:mt-2 md:flex items-start justify-center gap-4 ">
          <TableChart
            heading={"Region"}
            title={"Region ( Target vs Achievement )  - Annual , YTD , MTD"}
            color={"bg-white"}
            lab={labelNameTwo}
            datas={dummyData || []}
          ></TableChart>
        </div>

        <div className="mt-2 lg:mt-6 md:flex items-start justify-center gap-4">
          <ChartThree
            title={"Business Region"}
            color={"bg-teal-400"}
            lab={RegionlabelData}
            datasets={RegionGraphData || []}
          ></ChartThree>
        </div>

        <div className=" mt-2 lg:mt-2 md:flex items-start justify-center gap-4 ">
          <TableChart
            heading={"Territory"}
            title={"Territory ( Target vs Achievement )  - Annual , YTD , MTD"}
            color={"bg-white"}
            lab={labelNameTwo}
            datas={dummyData || []}
          ></TableChart>
        </div>

        {/* territory label  */}

        <div className="mt-2 lg:mt-6 md:flex items-start justify-center gap-4">
          <ChartThree
            title={"Territory"}
            color={"bg-rose-500"}
            lab={TerrilabelData}
            datasets={TerriGraphData || []}
          ></ChartThree>
        </div>

        <div className="mt-2 lg:mt-6 md:flex items-start justify-center gap-4  ">
          <ChartOne
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
          ></ChartTwo>
        </div>

        <div className="mt-2 lg:mt-6 md:flex items-start justify-center gap-4  ">
          <ChartOne
            title={"Product Segment"}
            color={"bg-orange-500"}
            lab={ProdSegLabelData}
            datasets={ProdSegGraphData || []}
          ></ChartOne>

          {/* Product Segment Table  */}

          <TableChartTwo
            heading={"Product Segment"}
            title={"Product Segment ( Target vs Achievement )  - Annual , YTD , MTD"}
            color={"bg-white"}
            lab={labelNameTwo}
            datas={prdSegment || []}
          ></TableChartTwo>
        </div>

        <div className="mt-2 lg:mt-6 md:flex items-start justify-center gap-4  ">
          <ChartOne
            title={"Product Category"}
            color={"bg-[#15283c]"}
            lab={ProdCatLabelData}
            datasets={ProdCatGraphData || []}
          ></ChartOne>

           {/* Product Category Table  */}

          <TableChartTwo
            heading={"Product Category"}
            title={"Product Category ( Target vs Achievement )  - Annual , YTD , MTD"}
            color={"bg-white"}
            lab={labelNameTwo}
            datas={prdCategory || []}
          ></TableChartTwo>

        </div>

        <div className="mt-2 lg:mt-6 md:flex items-start justify-center gap-4  ">
          <ChartOne
            title={"Product Brand"}
            color={"bg-indigo-500"}
            lab={ProdBrandLabelData}
            datasets={ProdBrandGraphData || []}
          ></ChartOne>

           {/* Product Brand Table  */}

          <TableChartTwo
            heading={"Product Brand"}
            title={"Product Brand ( Target vs Achievement )  - Annual , YTD , MTD"}
            color={"bg-white"}
            lab={labelNameTwo}
            datas={prdBrand || []}
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
