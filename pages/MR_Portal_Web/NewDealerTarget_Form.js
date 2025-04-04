import React, { useState, useEffect, Fragment, useMemo } from "react";
import { AiTwotoneHome } from "react-icons/ai";
import { useRouter } from "next/router";
import { url } from "@/constants/url";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import toast, { Toaster } from "react-hot-toast";
import Layout from "@/components/Layout1";


const DealerTarget = () => {
  
  const csvHeaders = [
    { label: "Id", key: "bg_id" },
    { label: "Business Segment", key: "busiWness_segment" },
    { label: "Company", key: "cmpny_name" },
    { label: "Email", key: "email_id" },
    { label: "H.O.D.", key: "hod_name" },
    { label: "Mobile No.", key: "mobile_no" },
    { label: "Status", key: "isDeleted" },
  ];
  const router = useRouter();

  const headers = {
    "Content-Type": "application/json",
    secret: "fsdhfgsfuiweifiowefjewcewcebjw",
  };
 
  const [localStorageItems, setLocalStorageItems] = useState({
    cId: null,
    bgId: null,
    buId: null,
    rId: null,
    zId: null,
    tId: null,
    roleId: null,
  });

  // All Filters
  const [filterState, setFilterState] = useState({
    bgId: null,
    buId: null,
    zId: null,
    rId: null,
    tId: null,
    tDes: null,
    rDes: null,
    zDes: null,
    buDes: null,
    bgDes: null,
    empCode: null,
  });
  useEffect(() => {
    
    const roleId = 6;
    let filterState = {
      bgId: "All",
      buId: "All",
      zId: "All",
      rId: "All",
      tId: "All",
    };
    switch (roleId) {
      case 6:
        filterState = {
          bgId:
            JSON.parse(window.localStorage.getItem("userinfo")).bg_id === 0
              ? "All"
              : JSON.parse(window.localStorage.getItem("userinfo")).bg_id,
          buId:
            JSON.parse(window.localStorage.getItem("userinfo")).bu_id === 0
              ? "All"
              : JSON.parse(window.localStorage.getItem("userinfo")).bu_id,
          rId:
            JSON.parse(window.localStorage.getItem("userinfo")).r_id === 0
              ? "All"
              : JSON.parse(window.localStorage.getItem("userinfo")).r_id,
          zId:
            JSON.parse(window.localStorage.getItem("userinfo")).z_id === 0
              ? "All"
              : JSON.parse(window.localStorage.getItem("userinfo")).z_id,
          tId:
            JSON.parse(window.localStorage.getItem("userinfo")).t_id === 0
              ? "All"
              : JSON.parse(window.localStorage.getItem("userinfo")).t_id,
          startDate: new Date(),
        };
        setLocalStorageItems({
          bgId:
            JSON.parse(window.localStorage.getItem("userinfo")).bg_id === 0
              ? "All"
              : JSON.parse(window.localStorage.getItem("userinfo")).bg_id,
          buId:
            JSON.parse(window.localStorage.getItem("userinfo")).bu_id === 0
              ? "All"
              : JSON.parse(window.localStorage.getItem("userinfo")).bu_id,
          rId:
            JSON.parse(window.localStorage.getItem("userinfo")).r_id === 0
              ? "All"
              : JSON.parse(window.localStorage.getItem("userinfo")).r_id,
          zId:
            JSON.parse(window.localStorage.getItem("userinfo")).z_id === 0
              ? "All"
              : JSON.parse(window.localStorage.getItem("userinfo")).z_id,
          tId:
            JSON.parse(window.localStorage.getItem("userinfo")).t_id === 0
              ? "All"
              : JSON.parse(window.localStorage.getItem("userinfo")).t_id,
          roleId: JSON.parse(window.localStorage.getItem("userinfo")).role_id,
        });

        setFilterState(filterState);

        break;
      case 5:
        filterState = {
          bgId:
            JSON.parse(window.localStorage.getItem("userinfo")).bg_id === 0
              ? "All"
              : JSON.parse(window.localStorage.getItem("userinfo")).bg_id,
          buId:
            JSON.parse(window.localStorage.getItem("userinfo")).bu_id === 0
              ? "All"
              : JSON.parse(window.localStorage.getItem("userinfo")).bu_id,
          rId:
            JSON.parse(window.localStorage.getItem("userinfo")).r_id === 0
              ? "All"
              : JSON.parse(window.localStorage.getItem("userinfo")).r_id,
          zId:
            JSON.parse(window.localStorage.getItem("userinfo")).z_id === 0
              ? "All"
              : JSON.parse(window.localStorage.getItem("userinfo")).z_id,

          tId: "All",
          startDate: new Date(),
        };
        setLocalStorageItems({
          bgId:
            JSON.parse(window.localStorage.getItem("userinfo")).bg_id === 0
              ? "All"
              : JSON.parse(window.localStorage.getItem("userinfo")).bg_id,
          buId:
            JSON.parse(window.localStorage.getItem("userinfo")).bu_id === 0
              ? "All"
              : JSON.parse(window.localStorage.getItem("userinfo")).bu_id,
          rId:
            JSON.parse(window.localStorage.getItem("userinfo")).r_id === 0
              ? "All"
              : JSON.parse(window.localStorage.getItem("userinfo")).r_id,
          zId:
            JSON.parse(window.localStorage.getItem("userinfo")).z_id === 0
              ? "All"
              : JSON.parse(window.localStorage.getItem("userinfo")).z_id,
          tId:
            JSON.parse(window.localStorage.getItem("userinfo")).t_id === 0
              ? "All"
              : JSON.parse(window.localStorage.getItem("userinfo")).t_id ||
                "All",
          roleId: JSON.parse(window.localStorage.getItem("userinfo")).role_id,
        });

        setFilterState(filterState);

        break;
      case 4:
        filterState = {
          bgId:
            JSON.parse(window.localStorage.getItem("userinfo")).bg_id === 0
              ? "All"
              : JSON.parse(window.localStorage.getItem("userinfo")).bg_id,
          buId:
            JSON.parse(window.localStorage.getItem("userinfo")).bu_id === 0
              ? "All"
              : JSON.parse(window.localStorage.getItem("userinfo")).bu_id,

          zId:
            JSON.parse(window.localStorage.getItem("userinfo")).z_id === 0
              ? "All"
              : JSON.parse(window.localStorage.getItem("userinfo")).z_id,

          rId: "All",
          tId: "All",
          startDate: new Date(),
        };
        setLocalStorageItems({
          bgId:
            JSON.parse(window.localStorage.getItem("userinfo")).bg_id === 0
              ? "All"
              : JSON.parse(window.localStorage.getItem("userinfo")).bg_id,
          buId:
            JSON.parse(window.localStorage.getItem("userinfo")).bu_id === 0
              ? "All"
              : JSON.parse(window.localStorage.getItem("userinfo")).bu_id,

          zId:
            JSON.parse(window.localStorage.getItem("userinfo")).z_id === 0
              ? "All"
              : JSON.parse(window.localStorage.getItem("userinfo")).z_id,

          rId:
            JSON.parse(window.localStorage.getItem("userinfo")).r_id === 0
              ? "All"
              : JSON.parse(window.localStorage.getItem("userinfo")).r_id ||
                "All",
          tId:
            JSON.parse(window.localStorage.getItem("userinfo")).t_id === 0
              ? "All"
              : JSON.parse(window.localStorage.getItem("userinfo")).t_id ||
                "All",
          roleId: JSON.parse(window.localStorage.getItem("userinfo")).role_id,
        });

        setFilterState(filterState);

        break;
      case 3:
        filterState = {
          bgId:
            JSON.parse(window.localStorage.getItem("userinfo")).bg_id === 0
              ? "All"
              : JSON.parse(window.localStorage.getItem("userinfo")).bg_id,
          buId:
            JSON.parse(window.localStorage.getItem("userinfo")).bu_id === 0
              ? "All"
              : JSON.parse(window.localStorage.getItem("userinfo")).bu_id,

          zId:
            JSON.parse(window.localStorage.getItem("userinfo")).z_id === 0
              ? "All"
              : JSON.parse(window.localStorage.getItem("userinfo")).z_id,
          rId: "All",
          tId: "All",
          startDate: new Date(),
        };
        setLocalStorageItems({
          bgId:
            JSON.parse(window.localStorage.getItem("userinfo")).bg_id === 0
              ? "All"
              : JSON.parse(window.localStorage.getItem("userinfo")).bg_id,
          buId:
            JSON.parse(window.localStorage.getItem("userinfo")).bu_id === 0
              ? "All"
              : JSON.parse(window.localStorage.getItem("userinfo")).bu_id,

          zId:
            JSON.parse(window.localStorage.getItem("userinfo")).z_id === 0
              ? "All"
              : JSON.parse(window.localStorage.getItem("userinfo")).z_id,

          rId:
            JSON.parse(window.localStorage.getItem("userinfo")).r_id === 0
              ? "All"
              : JSON.parse(window.localStorage.getItem("userinfo")).r_id ||
                "All",
          tId:
            JSON.parse(window.localStorage.getItem("userinfo")).t_id === 0
              ? "All"
              : JSON.parse(window.localStorage.getItem("userinfo")).t_id ||
                "All",
          roleId: JSON.parse(window.localStorage.getItem("userinfo")).role_id,
        });

        setFilterState(filterState);

        break;
      case 10:
        filterState = {
          bgId: JSON.parse(window.localStorage.getItem("userinfo")).bg_id,
          buId: JSON.parse(window.localStorage.getItem("userinfo")).bu_id,
          zId: JSON.parse(window.localStorage.getItem("userinfo")).z_id,
          rId: "All",
          tId: "All",
          startDate: new Date(),
        };
        setLocalStorageItems({
          bgId:
            JSON.parse(window.localStorage.getItem("userinfo")).bg_id === 0
              ? "All"
              : JSON.parse(window.localStorage.getItem("userinfo")).bg_id,
          buId:
            JSON.parse(window.localStorage.getItem("userinfo")).bu_id === 0
              ? "All"
              : JSON.parse(window.localStorage.getItem("userinfo")).bu_id,

          zId:
            JSON.parse(window.localStorage.getItem("userinfo")).z_id === 0
              ? "All"
              : JSON.parse(window.localStorage.getItem("userinfo")).z_id,

          rId:
            JSON.parse(window.localStorage.getItem("userinfo")).r_id === 0
              ? "All"
              : JSON.parse(window.localStorage.getItem("userinfo")).r_id ||
                "All",
          tId:
            JSON.parse(window.localStorage.getItem("userinfo")).t_id === 0
              ? "All"
              : JSON.parse(window.localStorage.getItem("userinfo")).t_id ||
                "All",
          roleId: JSON.parse(window.localStorage.getItem("userinfo")).role_id,
        });

        setFilterState(filterState);

        break;
      default:
        setLocalStorageItems({
          cId: JSON.parse(window.localStorage.getItem("userinfo")).c_id,
          bgId: JSON.parse(window.localStorage.getItem("userinfo")).bg_id,
          buId: JSON.parse(window.localStorage.getItem("userinfo")).bu_id,
          rId: JSON.parse(window.localStorage.getItem("userinfo")).r_id,
          zId: JSON.parse(window.localStorage.getItem("userinfo")).z_id,
          tId: JSON.parse(window.localStorage.getItem("userinfo")).t_id,
        });

        setFilterState({
          bgId: JSON.parse(window.localStorage.getItem("userinfo")).bg_id,
          buId: JSON.parse(window.localStorage.getItem("userinfo")).bu_id,
          rId: JSON.parse(window.localStorage.getItem("userinfo")).r_id,
          zId: JSON.parse(window.localStorage.getItem("userinfo")).z_id,
          tId: JSON.parse(window.localStorage.getItem("userinfo")).t_id,
          startDate: new Date(),
        });
        setFilterState(filterState);

        break;
    }
  }, []);

  const [bgData, setBgData] = useState([]);

  const getBusinesSegmentInfo = async () => {
    try {
      const respond = await axios.get(`${url}/api/get_business_segment`, {
        headers: headers,
      });
      const apires = await respond.data.data;

      setBgData(apires.filter((item, idx) => item.isDeleted === false));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBusinesSegmentInfo();
  }, []);

  const [buData, setBuData] = useState([]);

  const getBusinessUnitInfo = async (businessSegmentId) => {
    try {
      const respond = await axios.get(
        `${url}/api/get_business_unit_by_segmentId/${businessSegmentId}`,
        {
          headers: headers,
        }
      );
      const apires = await respond.data.data;

      setBuData(apires.filter((item, idx) => item.isDeleted === false));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBusinessUnitInfo(filterState.bgId);
  }, [filterState.bgId]);

  const [allZoneData, setAllZoneData] = useState([]);
  const getAllZoneData = async (segmentId, businessUnitId) => {
    try {
      const respond = await axios.get(`${url}/api/get_zone`, {
        headers: headers,
      });

      const apires = await respond.data.data;

      setAllZoneData(
        apires
          .filter((item) => Number(item.bg_id) === Number(segmentId))
          .filter((item) => Number(item.bu_id) === Number(businessUnitId))
      );
    } catch (error) {}
  };

  useEffect(() => {
    if (!filterState.bgId || !filterState.buId) return;
    getAllZoneData(filterState.bgId, filterState.buId);
  }, [filterState.bgId, filterState.buId]);

  const [allRegionData, setAllRegionData] = useState([]);

  const getAllRegionData = async (segmentId, businessUnitId, zoneId) => {
    try {
      const respond = await axios.get(`${url}/api/get_region`, {
        headers: headers,
      });

      const apires = await respond.data.data;

      setAllRegionData(apires);
      setAllRegionData(
        apires
          .filter((item) => Number(item.bg_id) === Number(segmentId))
          .filter((item) => Number(item.bu_id) === Number(businessUnitId))
          .filter((item) => Number(item.z_id) === Number(zoneId))
      );
    } catch (error) {}
  };

  useEffect(() => {
    if (!filterState.bgId || !filterState.buId || !filterState.zId) return;
    getAllRegionData(filterState.bgId, filterState.buId, filterState.zId);
  }, [filterState.bgId, filterState.buId, filterState.zId]);

  const [allTerritoryData, setAllTerritoryData] = useState([]);

  const getAllTerritoryData = async (
    segmentId,
    businessUnitId,
    zoneId,
    regionId
  ) => {
    try {
      const respond = await axios.get(`${url}/api/get_territory`, {
        headers: headers,
      });
      const apires = await respond.data.data;
      setAllTerritoryData(
        apires
          .filter((item) => Number(item.bg_id) === Number(segmentId))
          .filter((item) => Number(item.bu_id) === Number(businessUnitId))
          .filter((item) => Number(item.z_id) === Number(zoneId))
          .filter((item) => Number(item.r_id) === Number(regionId))
      );
    } catch (error) {}
  };

  useEffect(() => {
    if (
      !filterState.bgId ||
      !filterState.buId ||
      !filterState.zId ||
      !filterState.rId
    )
      return;
    getAllTerritoryData(
      filterState.bgId,
      filterState.buId,
      filterState.zId,
      filterState.rId
    );
  }, [filterState.bgId, filterState.buId, filterState.zId, filterState.rId]);
  const [allEmployee, setAllEmployee] = useState([]);
  const getAllEmployeeData = async (bg, bu, z, r, t) => {
    try {
      const respond = await axios.get(`${url}/api/get_employee`, {
        headers: headers,
        params: {
          t_id: t === "All" ? null : t,
          bg_id: bg === "All" ? null : bg,
          bu_id: bu === "All" ? null : bu,
          z_id: z === "All" ? null : z,
          r_id: r === "All" ? null : r,
          zrt: true,
          c_id: JSON.parse(window.localStorage.getItem("userinfo")).c_id,
        },
      });
      const apires = await respond.data.data;
      setAllEmployee(apires);
    } catch (error) {
      setAllEmployee([]);
    }
  };
  useEffect(() => {
    getAllEmployeeData(
      filterState.bgId,
      filterState.buId,
      filterState.zId,
      filterState.rId,
      filterState.tId
    );
  }, [
    filterState.bgId,
    filterState.buId,
    filterState.zId,
    filterState.rId,
    filterState.tId,
  ]);

  const [allDealer, setAllDealer] = useState([]);
  const getAllDealerData = async (empCode) => {
    try {
      const respond = await axios.get(`${url}/api/get_mr_dealer_map`, {
        headers: headers,
        params: {
          c_id: JSON.parse(window.localStorage.getItem("userinfo")).c_id,
          t_id: JSON.parse(window.localStorage.getItem("userinfo")).t_id,
          t_des: allTerritoryData.filter(
            (item) =>
              item.t_id ===
              JSON.parse(window.localStorage.getItem("userinfo")).t_id
          )[0].territory_name,
          empcode: empCode ? empCode : null,
        },
      });

      const apires = await respond.data.data;
      console.log("new", apires);
      setAllDealer(apires);
    } catch (error) {}
  };
  useEffect(() => {
 
    getAllDealerData(filterState.empCode);
  }, [filterState.empCode]);
 
  const [allMRSalesTarget, setAllMRSalesTarget] = useState([]);
  const [editviewFilter, setEditviewFilter] = useState({
    bg:"",
    bu:"",
    z:"",
    r:"",
    t:"",
    disName: "",
    empName: "",
    empCode: "",
  });
  const getAllMRSalesTargetNew = async () => {
    if (!selectedYr) return;
    const { tId, empCode, dId } = filterState;
    let tDes;
    let paramsData = {};
  
      tDes =allTerritoryData.filter((item) => Number(item.t_id) === Number(tId))[0]
        ?.territory_name ?allTerritoryData.filter((item) => Number(item.t_id) === Number(tId))[0]
        .territory_name :"";
      paramsData = {
        t_id: tId,
        c_id: JSON.parse(window.localStorage.getItem("userinfo")).c_id,
        t_des: tDes,
        year: selectedYr.getFullYear(),
        empcode: empCode ? empCode : null,
        customer_code: dId ? dId : null,
      };    
    try {
      const respond = await axios.get(`${url}/api/mr_sales_target`, {
        headers: headers,
        params: paramsData,
      });

      const apires = await respond.data.data;
      setAllMRSalesTarget(apires);
      
    } catch (error) {}
  };
  const getAllMRSalesTargetView = async () => {
   
    console.log("zol",router.query)
    let tDes=router.query.tDes
    let tId=router.query.tId
     let paramsData = {};
      paramsData = {
        c_id: JSON.parse(window.localStorage.getItem("userinfo")).c_id,
        t_des: tDes,
        t_id: tId,
        year: router.query.yr,
        empcode: router.query.empId,
        // customer_code: router.query.custCode,
      };
    
 
    try {
      const respond = await axios.get(`${url}/api/mr_sales_target`, {
        headers: headers,
        params: paramsData,
      });

      const apires = await respond.data.data;
      setAllMRSalesTarget(apires);
      
        if (apires.length > 1) {
          setEditviewFilter({
            disName: "All Dealer",
            empName: apires[0].emp_name,
            empCode: apires[0].emp_code,
          });
        } else {
          setEditviewFilter({
            disName: apires[0].distribution_name,
            empName: apires[0].emp_name,
            empCode: apires[0].emp_code,
          });
        }
      
    } catch (error) {}
  };

  useEffect(() => {
    if(router.query.type === "Add")
    getAllMRSalesTargetNew();
  }, [filterState.empCode, filterState.dId]);

  const [selectedYr, setSelectedYr] = useState(null);

  const handleSave = async () => {
    console.log("kiol", filterState)
    try {
      let endPoint = "api/add_mr_sales_target";
    

      const data = allMRSalesTarget
        ?.map((item, idx) => {
          let { category_result } = item;
          return category_result.map((el) => {
            return {
              ...el,
              t_id: filterState.tId,
              c_id: JSON.parse(window.localStorage.getItem("userinfo")).c_id,
              bg_id: JSON.parse(window.localStorage.getItem("userinfo")).bg_id,
              bu_id: JSON.parse(window.localStorage.getItem("userinfo")).bu_id,
              r_id: filterState.rId,
              z_id: filterState.zId,
              year: selectedYr.getFullYear(),
              product_category: el.category_name,

              emp_code: item.emp_code,
              customer_code: item.party_code,
              distribution_name: item.distribution_name,
            };
          });
        })
        .flatMap((innerArray) => innerArray);

      const respond = await axios
        .post(`${url}/${endPoint}`, JSON.stringify({ data: data }), {
          headers: headers,
        })
        .then((res) => {
          if (!res) return;
          toast.success(res.data.message);
          router.push({
            pathname: "/MR_Portal_Web/NewDealerTarget_Table",
          });
        });
    } catch (errors) {
      const errorMessage = errors?.response?.data?.message;
      console.log("koi", errors);
      toast.error(errorMessage);
      if (!errorMessage) return;
      getAllMRSalesTargetNew();
    }
  };
  const handleEdit = async () => {
  
    try {
       
    
       let  endPoint = "api/update_mr_target";
      

      const data = allMRSalesTarget
        ?.map((item, idx) => {
          let { category_result } = item;
          return category_result.map((el) => {
            return {
              ...el,
              t_id: router.query.tId,
              c_id: JSON.parse(window.localStorage.getItem("userinfo")).c_id,
              bg_id: router.query.bgId,
              bu_id: router.query.buId,
              r_id: router.query.rId,
              z_id:router.query.zId,
              year: selectedYr.getFullYear(),
              product_category: el.category_name,

              emp_code: item.emp_code,
              customer_code: item.party_code,
              distribution_name: item.distribution_name,
            };
          });
        })
        .flatMap((innerArray) => innerArray);

      const respond = await axios
        .post(`${url}/${endPoint}`, JSON.stringify({ data: data }), {
          headers: headers,
        })
        .then((res) => {
          if (!res) return;
          toast.success(res.data.message);
          router.push({
            pathname: "/MR_Portal_Web/NewDealerTarget_Table",
          });
        });
    } catch (errors) {
      const errorMessage = errors?.response?.data?.message;
      console.log("koi", errors);
      toast.error(errorMessage);
      if (!errorMessage) return;
      getAllMRSalesTargetNew();
    }
  };

  const [groupedArray, setGroupedArray] = useState({});

  useEffect(() => {
    const processArray = (arr) => {
      return arr.reduce((acc, item) => {
        if (!acc[item.emp_code]) {
          acc[item.emp_code] = [];
        }
        acc[item.emp_code].push(item);
        return acc;
      }, {});
    };

    const newArray = processArray(allMRSalesTarget);
    setGroupedArray(newArray);
  }, [allMRSalesTarget]);

  useEffect(() => {
  
    if (router.query.type !== "Add") {
     
     
      getAllMRSalesTargetView();
      setSelectedYr(new Date(router.query.yr));
    }
  }, [router.query.type, router.query.tDes , router.query.tId]);
 

  return (
    <Layout>
      <div className="absolute h-full overflow-y-auto  mx-4 w-full overflow-x-hidden">
        <Toaster position="bottom-center" reverseOrder={false} />
        <div className="flex flex-row justify-between  h-max  px-5">
          <h2 className="font-arial font-normal text-3xl  py-2"></h2>
          <span className="flex items-center gap-2 cursor-pointer">
            <AiTwotoneHome
              className="text-black-500"
              onClick={() => {
                router.push({
                  pathname: "/",
                });
              }}
              size={34}
            />
          </span>
        </div>
       
         {
          router.query.type !== "Add" ?  
          <div className="flex flex-row gap-2  px-4 pr-8 pb-2">

          <DatePicker
              className="border p-1 rounded ml-2 w-20 "
              showYearDropdown
              dateFormat="yyyy"
              placeholderText="Enter Year"
              yearDropdownItemNumber={15} // Uncommented and provided a value
              selected={selectedYr}
              onChange={(date) => setSelectedYr(date)}
              hand
              showYearPicker
              minDate={new Date(new Date().getFullYear(), 0, 1)}
              disabled={router.query.type !== "Add"}
            />
        <input
            className="border rounded px-2 py-1  w-1/2 h-8"
            id="stateSelect"
            value={router.query.bgDes}
          
            disabled
          />
           
           <input
            className="border rounded px-2 py-1  w-1/2 h-8"
            id="stateSelect"
            value={router.query.buDes}
          
            disabled
          />

<input
            className="border rounded px-2 py-1  w-1/2 h-8"
            id="stateSelect"
            value={router.query.zDes}
          
            disabled
          />

<input
            className="border rounded px-2 py-1  w-1/2 h-8"
            id="stateSelect"
            value={router.query.rDes}
          
            disabled
          />
 
 <input
            className="border rounded px-2 py-1  w-1/2 h-8"
            id="stateSelect"
            value={router.query.tDes}
          
            disabled
          />
        
           
                <input
                  className=" w-20 border p-1"
                  value={editviewFilter.empCode}
                  disabled
                />
                <input
                  className="border p-1 rounded  "
                  value={editviewFilter.empName}
                  disabled
                />

              
           
          </div> :
          <div className="flex flex-row gap-2  px-4 pr-8 pb-2">

          <DatePicker
              className="border p-1 rounded ml-2 w-20 "
              showYearDropdown
              dateFormat="yyyy"
              placeholderText="Enter Year"
              yearDropdownItemNumber={15} // Uncommented and provided a value
              selected={selectedYr}
              onChange={(date) => setSelectedYr(date)}
              hand
              showYearPicker
              minDate={new Date(new Date().getFullYear(), 0, 1)}
              disabled={router.query.type !== "Add"}
            />
          <select
            className="border rounded px-2 py-1  w-1/2 h-8"
            id="stateSelect"
            value={filterState.bgId}
            onChange={(e) => {
              if (e.target.value === "All") {
                setFilterState({
                  ...filterState,
                  bgId: e.target.value,
                  buId: "All",
                  zId: "All",
                  rId: "All",
                  tId: "All",
                });
              } else {
                setFilterState({
                  ...filterState,
                  bgId: e.target.value,
                });
              }
            }}
            disabled={
              localStorageItems.roleId === 6 ||
              localStorageItems.roleId === 5 ||
              localStorageItems.roleId === 4 ||
              localStorageItems.roleId === 3 ||
              localStorageItems.roleId === 10
            }
          >
            <option value={"All"} className="font-bold">
              - All Business Segment -
            </option>

            {bgData.map((item, idx) => (
              <option value={item.bg_id} key={idx}>
                {item.business_segment}
              </option>
            ))}
          </select>
          <select
            className="border rounded px-2 py-1  w-1/2 h-8"
            id="stateSelect"
            value={filterState.buId}
            onChange={(e) => {
              if (e.target.value === "All") {
                setFilterState({
                  ...filterState,
                  buId: e.target.value,
                  zId: "All",
                  rId: "All",
                  tId: "All",
                });
              } else {
                setFilterState({
                  ...filterState,
                  buId: e.target.value,
                });
              }
            }}
            disabled={
              localStorageItems.roleId === 6 ||
              localStorageItems.roleId === 5 ||
              localStorageItems.roleId === 4 ||
              localStorageItems.roleId === 3
            }
          >
            <option value={"All"}>- All Business Unit -</option>

            {buData.map((item, idx) => (
              <option value={item.bu_id} key={idx}>
                {item.business_unit_name}
              </option>
            ))}
          </select>

          <select
            className="border rounded px-2 py-1  w-1/2 h-8"
            id="stateSelect"
            value={filterState.zId}
            onChange={(e) => {
              if (e.target.value === "All") {
                 setFilterState({
                  ...filterState,
                  zId: e.target.value,
                  rId: "All",
                  tId: "All",
                });
              } else {
                setFilterState({
                  ...filterState,
                  zId: e.target.value,
                });
              }
            }}
            disabled={
              localStorageItems.roleId === 6 ||
              localStorageItems.roleId === 5 ||
              localStorageItems.roleId === 4
            }
          >
            <option value={"All"}>- All Zone -</option>

            {allZoneData.map((item, idx) => (
              <option value={item.z_id} key={idx}>
                {item.zone_name}
              </option>
            ))}
          </select>

          <select
            className="border rounded px-2 py-1  w-1/2 h-8"
            id="stateSelect"
            value={filterState.rId}
            disabled={
              localStorageItems.roleId === 6 || localStorageItems.roleId === 5
            }
            onChange={(e) => {
              if (e.target.value === "All") {
                setFilterState({
                  ...filterState,
                  rId: e.target.value,
                  tId: "All",
                });
              } else {
                setFilterState({
                  ...filterState,
                  rId: e.target.value,
                });
              }
            }}
          >
            <option value={"All"}>-All Region -</option>

            {allRegionData.map((item, idx) => (
              <option value={item.r_id} key={idx}>
                {item.region_name}
              </option>
            ))}
          </select>
 
          <select
            className="border rounded px-2 py-1 w-1/2 h-8"
            id="stateSelect"
            value={filterState.tId}
            disabled={localStorageItems.roleId === 6}
            onChange={(e) =>
              setFilterState({
                ...filterState,
                tId: e.target.value,
              })
            }
          >
            <option value="All">- All Territory -</option>

            {allTerritoryData.map((item, idx) => (
              <option value={item.t_id} key={idx}>
                {item.territory_name}
              </option>
            ))}
          </select>
       
              <div className="flex flex-row gap-2 ">
                <input
                  className="w-16 border p-1 rounded "
                  value={filterState.empCode}
                  disabled
                />
                <select
                  id="attendanceType"
                  className="border p-1 w-52 rounded  "
                  value={filterState.empCode}
                  onChange={(e) =>
                    setFilterState({ ...filterState, empCode: e.target.value })
                  }
                >
                  <option value={""}>All MR</option>
                  {allEmployee.map((item) => (
                    <option value={item.empcode}>
                      {item.fname} {item.mname} {item.lname} {item.empcode}
                    </option>
                  ))}
                </select>
              </div>
           
           
              <div className=" flex flex-row gap-2">
                <input
                  className=" w-16 border p-1 rounded "
                  value={
                    filterState.dId
                      ? allDealer.filter(
                          (item) =>
                            Number(item.customer_code) ===
                            Number(filterState.dId)
                        )[0].emp_code
                      : ""
                  }
                  disabled
                />

                <select
                  id="attendanceType"
                  className="border p-1 rounded w-40 "
                  value={filterState.dId}
                
                  onChange={(e) => {
                    setFilterState({
                      ...filterState,
                      dId: e.target.value,
                    });
                  }}
                >
                  <option value={""}>All Dealer</option>
                  {allDealer.map((item) => (
                    <option value={item.customer_code}>
                      {item.party_Name} {item.emp_code}
                    </option>
                  ))}
                </select>
              </div>
            
          </div>
         }
          
          
         
      

        <h2 className="font-bold mx-4">
          MR - Dealer Sales Target Plan of the Year {filterState.yr}
        </h2>

        <div className=" absolute overflow-x-auto overflow-y-hidden bg-white h-max flex flex-col gap-2  select-none items-start justify-between w-[100%] my-2 no-scrollbar">
          <table className="w-full divide-y border- divide-gray-200 ">
            <thead className="border-b w-max">
              <tr className=" font-arial  ">
                <th className="px-4 py-2  text-left border-black border-x-2  border-t-2 text-xs font-medium  tracking-wider">
                  Emp Code
                </th>
                <th className="px-4 py-2  text-left border-black border-x-2  border-t-2 text-xs font-medium  tracking-wider">
                  Emp Name
                </th>
                <th className="px-4 py-2  text-left border-black border-x-2  border-t-2 text-xs font-medium  tracking-wider whitespace-nowrap">
                  MR HQ
                </th>
                <th className="px-4 py-2  text-left border-black border-x-2  border-t-2 text-xs font-medium  tracking-wider whitespace-nowrap">
                  Party Code
                </th>
                <th className="px-4 py-2  text-left border-black border-x-2  border-t-2 text-xs font-medium  tracking-wider">
                  Name of Distributors
                </th>
                <th className="px-4 py-2  text-left border-black border-x-2  border-t-2 text-xs font-medium  tracking-wider">
                  Focus Product
                </th>
                <th className="px-4 py-2  text-left border-black border-x-2  border-t-2 text-xs font-medium  tracking-wider bg-gray-300">
                  F.Y Sale
                  {selectedYr ? (
                    <span>
                      {String(selectedYr.getFullYear() - 2).slice(-2) +
                        "-" +
                        String(selectedYr.getFullYear() - 1).slice(-2)}
                    </span>
                  ) : (
                    "-"
                  )}{" "}
                </th>
                <th className="px-4 py-2  text-left border-black border-x-2  border-t-2 text-xs font-medium  tracking-wider bg-gray-300">
                  F.Y Sale{" "}
                  {selectedYr ? (
                    <span>
                      {String(selectedYr.getFullYear() - 1).slice(-2) +
                        "-" +
                        String(selectedYr.getFullYear()).slice(-2)}
                    </span>
                  ) : (
                    "-"
                  )}{" "}
                </th>
                <th className="px-4 py-2  text-left border-black border-x-2  border-t-2 text-xs font-medium bg-sky-800 text-white  tracking-wider">
                  APR
                </th>
                <th className="px-4 py-2  text-left border-black border-x-2  border-t-2 text-xs font-medium bg-sky-800 text-white  tracking-wider">
                  MAY
                </th>

                <th className="px-4 py-2  text-left border-black border-x-2  border-t-2 text-xs font-medium bg-sky-800 text-white  tracking-wider">
                  JUNE
                </th>
                <th className="px-4 py-2  text-left border-black border-x-2  border-t-2 text-xs font-medium  tracking-wider bg-gray-300">
                  Q1-Total
                </th>
                <th className="px-4 py-2  text-left border-black border-x-2  border-t-2 text-xs font-medium bg-sky-800 text-white  tracking-wider">
                  JUL
                </th>
                <th className="px-4 py-2  text-left border-black border-x-2  border-t-2 text-xs font-medium bg-sky-800 text-white  tracking-wider">
                  AUG
                </th>

                <th className="px-4 py-2  text-left border-black border-x-2  border-t-2 text-xs font-medium bg-sky-800 text-white  tracking-wider">
                  SEP
                </th>
                <th className="px-4 py-2  text-left border-black border-x-2  border-t-2 text-xs font-medium  tracking-wider bg-gray-300">
                  Q2-Total
                </th>
                <th className="px-4 py-2  text-left border-black border-x-2  border-t-2 text-xs font-medium bg-sky-800 text-white  tracking-wider">
                  OCT
                </th>
                <th className="px-4 py-2  text-left border-black border-x-2  border-t-2 text-xs font-medium bg-sky-800 text-white  tracking-wider">
                  NOV
                </th>

                <th className="px-4 py-2  text-left border-black border-x-2  border-t-2 text-xs font-medium bg-sky-800 text-white  tracking-wider">
                  DEC
                </th>
                <th className="px-4 py-2  text-left border-black border-x-2  border-t-2 text-xs font-medium  tracking-wider bg-gray-300">
                  Q3-Total
                </th>
                <th className="px-4 py-2  text-left border-black border-x-2  border-t-2 text-xs font-medium bg-sky-800 text-white  tracking-wider">
                  JAN
                </th>
                <th className="px-4 py-2  text-left border-black border-x-2  border-t-2 text-xs font-medium bg-sky-800 text-white  tracking-wider">
                  FEB
                </th>

                <th className="px-4 py-2  text-left border-black border-x-2  border-t-2 text-xs font-medium bg-sky-800 text-white  tracking-wider">
                  MAR
                </th>
                <th className="px-4 py-2  text-left border-black border-x-2  border-t-2 text-xs font-medium  tracking-wider bg-gray-300">
                  Q4-Total
                </th>
                <th className="px-4 py-2  text-left border-black border-x-2  border-t-2 text-xs font-medium  tracking-wider bg-gray-300">
                  Total Year Plan
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y  divide-gray-200 text-xs">
              {allMRSalesTarget.map((item) => (
                <tr className="dark:border-2">
                  <td className="pl-4 w-52 text-left border-2 border-black whitespace-nowrap font-arial text-xs ">
                    {item.emp_code}
                  </td>
                  <td className=" px-12 w-52 text-center border-2 border-black whitespace-nowrap font-arial text-xs ">
                    {item.emp_name}
                  </td>

                  <td className="px-12 w-82 text-center border-2 border-black whitespace-nowrap font-arial text-xs ">
                    {item.mr_hq}
                  </td>
                  <td className="pl-4 w-52 text-left border-2 border-black whitespace-nowrap font-arial text-xs ">
                    {item.party_code}
                  </td>
                  <td className="pl-4 w-52 text-left border-2 border-black justify-center whitespace-nowrap font-arial text-xs ">
                    {item.distribution_name}
                  </td>

                  <td className="  border-2 border-black  whitespace-nowrap  text-xsm p-0 bg-white">
                    <ul>
                      {item.category_result.map((item, idx) => (
                        <li className="border-b-2 border-black  flex justify-center text-black   p-1">
                          <input
                            className="p-0 w-28  h-6 text-center "
                            value={item[Object.keys(item)[0]]}
                            disabled
                          />
                        </li>
                      ))}
                      <li className="  flex justify-center  text-black   p-1  ">
                        <input
                          className="p-0 w-16 h-6  font-bold text-center"
                          value="Tot-Party"
                          disabled
                        />
                      </li>
                    </ul>
                  </td>
                  <td className="  border-2 border-black  whitespace-nowrap  p-0 bg-gray-300 ">
                    <ul>
                      {item.category_result.map((item, idx) => (
                        <li className="border-b-2 border-black  flex justify-center text-black   p-1">
                          <input
                            className="p-0 w-16  h-6 text-right text-right "
                            type="number"
                            value={item[Object.keys(item)[1]]}
                            disabled
                          />
                        </li>
                      ))}{" "}
                      <li className="  flex justify-center font-bold  text-black   p-1 ">
                        <input
                          className="p-0 w-16  h-6 text-right text-right "
                          type="number"
                          value={item.category_result
                            .reduce((acc, curr) => {
                              acc =
                                Number(acc) +
                                Number(curr[Object.keys(curr)[1]]);
                              return acc;
                            }, 0)
                            ?.toFixed(2)}
                          disabled
                        />
                      </li>
                    </ul>
                  </td>
                  <td className="  border-2 border-black  whitespace-nowrap  p-0 bg-gray-300 ">
                    <ul>
                      {item.category_result.map((item, idx) => (
                        <li className="border-b-2 border-black  flex justify-center text-black   p-1 ">
                          <input
                            className="p-0 w-16  h-6 text-right text-right "
                            type="number"
                            value={item[Object.keys(item)[2]]}
                            disabled
                          />
                        </li>
                      ))}
                      <li className="  flex justify-center font-bold  text-black   p-1  bg-gray-300 ">
                        <input
                          className="p-0 w-16  h-6 text-right text-right "
                          type="number"
                          value={item.category_result
                            .reduce((acc, curr) => {
                              acc =
                                Number(acc) +
                                Number(curr[Object.keys(curr)[2]]);
                              return acc;
                            }, 0)
                            ?.toFixed(2)}
                          disabled
                        />
                      </li>
                    </ul>
                  </td>
                  <td className="  border-2 border-black  whitespace-nowrap  p-0 bg-white">
                    <ul>
                      {item.category_result.map((catItem, idx) => (
                        <li className="border-b-2 border-black  flex justify-center text-black   p-1 bg-yellow-300">
                          <input
                            className="p-0 w-16  h-6 text-right text-right "
                            type="number"
                            value={catItem[Object.keys(catItem)[3]]}
                            onChange={(e) =>
                              setAllMRSalesTarget(
                                allMRSalesTarget.map((el) => {
                                  if (el.party_code === item.party_code) {
                                    return {
                                      ...el,
                                      category_result: el.category_result.map(
                                        (pl) => {
                                          if (
                                            catItem[Object.keys(catItem)[0]] ===
                                            pl[Object.keys(pl)[0]]
                                          ) {
                                            return {
                                              ...pl,
                                              [Object.keys(pl)[3]]:
                                                e.target.value,
                                            };
                                          } else {
                                            return pl;
                                          }
                                        }
                                      ),
                                    };
                                  } else {
                                    return el;
                                  }
                                })
                              )
                            }
                          />
                        </li>
                      ))}

                      <li className="  flex justify-center font-bold  text-black   p-1  bg-gray-300 ">
                        <input
                          className="p-0 w-16 h-6   text-right "
                          value={item.category_result
                            .reduce((acc, curr) => {
                              acc =
                                Number(acc) +
                                Number(curr[Object.keys(curr)[3]]);
                              return acc;
                            }, 0)
                            ?.toFixed(2)}
                          disabled
                        />
                      </li>
                    </ul>
                  </td>
                  <td className="  border-2 border-black  whitespace-nowrap  p-0 b   ">
                    <ul>
                      {item.category_result.map((catItem, idx) => (
                        <li className="border-b-2 border-black  flex justify-center text-black bg-yellow-300  p-1">
                          <input
                            className="p-0 w-16  h-6 text-right text-right "
                            type="number"
                            value={catItem[Object.keys(catItem)[4]]}
                            onChange={(e) =>
                              setAllMRSalesTarget(
                                allMRSalesTarget.map((el) => {
                                  if (el.party_code === item.party_code) {
                                    return {
                                      ...el,
                                      category_result: el.category_result.map(
                                        (pl) => {
                                          if (
                                            catItem[Object.keys(catItem)[0]] ===
                                            pl[Object.keys(pl)[0]]
                                          ) {
                                            return {
                                              ...pl,
                                              [Object.keys(pl)[4]]:
                                                e.target.value,
                                            };
                                          } else {
                                            return pl;
                                          }
                                        }
                                      ),
                                    };
                                  } else {
                                    return el;
                                  }
                                })
                              )
                            }
                          />
                        </li>
                      ))}

                      <li className="  flex justify-center font-bold  text-black   p-1  bg-gray-300 ">
                        <input
                          className="p-0 w-16 h-6   text-right "
                          value={item.category_result
                            .reduce((acc, curr) => {
                              acc =
                                Number(acc) +
                                Number(curr[Object.keys(curr)[4]]);
                              return acc;
                            }, 0)
                            ?.toFixed(2)}
                          disabled
                        />
                      </li>
                    </ul>
                  </td>
                  <td className="  border-2 border-black  whitespace-nowrap  p-0 bg-white">
                    <ul>
                      {item.category_result.map((catItem, idx) => (
                        <li className="border-b-2 border-black  flex justify-center text-black  bg-yellow-300 p-1">
                          <input
                            className="p-0 w-16  h-6 text-right  text-right"
                            value={catItem[Object.keys(catItem)[5]]}
                            onChange={(e) =>
                              setAllMRSalesTarget(
                                allMRSalesTarget.map((el) => {
                                  if (el.party_code === item.party_code) {
                                    return {
                                      ...el,
                                      category_result: el.category_result.map(
                                        (pl) => {
                                          if (
                                            catItem[Object.keys(catItem)[0]] ===
                                            pl[Object.keys(pl)[0]]
                                          ) {
                                            return {
                                              ...pl,
                                              [Object.keys(pl)[5]]:
                                                e.target.value,
                                            };
                                          } else {
                                            return pl;
                                          }
                                        }
                                      ),
                                    };
                                  } else {
                                    return el;
                                  }
                                })
                              )
                            }
                          />
                        </li>
                      ))}
                      <li className="  flex justify-center font-bold  text-black   p-1  bg-gray-300 ">
                        <input
                          className="p-0 w-16 h-6   text-right "
                          value={item.category_result
                            .reduce((acc, curr) => {
                              acc =
                                Number(acc) +
                                Number(curr[Object.keys(curr)[5]]);
                              return acc;
                            }, 0)
                            ?.toFixed(2)}
                          disabled
                        />
                      </li>
                    </ul>
                  </td>
                  <td className="  border-2 border-black  whitespace-nowrap  p-0 bg-green-200 font-bold">
                    <ul>
                      {item.category_result.map((catItem, idx) => (
                        <li className="border-b-2 border-black  flex justify-center text-black   p-1">
                          <input
                            className="p-0 w-16  h-6 text-right  "
                            value={
                              (Number(catItem[Object.keys(catItem)[5]]) +
                              Number(catItem[Object.keys(catItem)[4]]) +
                              Number(catItem[Object.keys(catItem)[3]])).toFixed(2)
                            }
                            disabled
                          />
                        </li>
                      ))}{" "}
                      <li className="  flex justify-center font-bold  text-black   p-1  bg-gray-300 ">
                        <input
                          className="p-0 w-16 h-6   text-right "
                          value={item.category_result
                            .reduce((acc, curr) => {
                              acc =
                                Number(acc) +
                                Number(curr[Object.keys(curr)[5]]) +
                                Number(curr[Object.keys(curr)[4]]) +
                                Number(curr[Object.keys(curr)[3]]);
                              return acc;
                            }, 0)
                            ?.toFixed(2)}
                          disabled
                        />
                      </li>
                    </ul>
                  </td>
                  <td className="  border-2 border-black  whitespace-nowrap  p-0 bg-white">
                    <ul>
                      {item.category_result.map((catItem, idx) => (
                        <li className="border-b-2 border-black  flex justify-center text-black  bg-yellow-300  p-1">
                          <input
                            className="p-0 w-16  h-6 text-right  text-right"
                            value={catItem[Object.keys(catItem)[6]]}
                            onChange={(e) =>
                              setAllMRSalesTarget(
                                allMRSalesTarget.map((el) => {
                                  if (el.party_code === item.party_code) {
                                    return {
                                      ...el,
                                      category_result: el.category_result.map(
                                        (pl) => {
                                          if (
                                            catItem[Object.keys(catItem)[0]] ===
                                            pl[Object.keys(pl)[0]]
                                          ) {
                                            return {
                                              ...pl,
                                              [Object.keys(pl)[6]]:
                                                e.target.value,
                                            };
                                          } else {
                                            return pl;
                                          }
                                        }
                                      ),
                                    };
                                  } else {
                                    return el;
                                  }
                                })
                              )
                            }
                          />
                        </li>
                      ))}
                      <li className="  flex justify-center font-bold  text-black   p-1  bg-gray-300 ">
                        <input
                          className="p-0 w-16 h-6   text-right "
                          value={item.category_result
                            .reduce((acc, curr) => {
                              acc =
                                Number(acc) +
                                Number(curr[Object.keys(curr)[6]]);
                              return acc;
                            }, 0)
                            ?.toFixed(2)}
                          disabled
                        />
                      </li>
                    </ul>
                  </td>
                  <td className="  border-2 border-black  whitespace-nowrap  p-0 ">
                    <ul>
                      {item.category_result.map((catItem, idx) => (
                        <li className="border-b-2 border-black  flex justify-center text-black bg-yellow-300  p-1">
                          <input
                            className="p-0 w-16  h-6 text-right  text-right"
                            value={catItem[Object.keys(catItem)[7]]}
                            onChange={(e) =>
                              setAllMRSalesTarget(
                                allMRSalesTarget.map((el) => {
                                  if (el.party_code === item.party_code) {
                                    return {
                                      ...el,
                                      category_result: el.category_result.map(
                                        (pl) => {
                                          if (
                                            catItem[Object.keys(catItem)[0]] ===
                                            pl[Object.keys(pl)[0]]
                                          ) {
                                            return {
                                              ...pl,
                                              [Object.keys(pl)[7]]:
                                                e.target.value,
                                            };
                                          } else {
                                            return pl;
                                          }
                                        }
                                      ),
                                    };
                                  } else {
                                    return el;
                                  }
                                })
                              )
                            }
                          />
                        </li>
                      ))}
                      <li className="  flex justify-center font-bold  text-black   p-1  bg-gray-300 ">
                        <input
                          className="p-0 w-16 h-6   text-right "
                          value={item.category_result
                            .reduce((acc, curr) => {
                              acc =
                                Number(acc) +
                                Number(curr[Object.keys(curr)[7]]);
                              return acc;
                            }, 0)
                            ?.toFixed(2)}
                          disabled
                        />
                      </li>
                    </ul>
                  </td>
                  <td className="  border-2 border-black  whitespace-nowrap  p-0 bg-white ">
                    <ul>
                      {item.category_result.map((catItem, idx) => (
                        <li className="border-b-2 border-black  flex justify-center text-black bg-yellow-300  p-1">
                          <input
                            className="p-0 w-16  h-6 text-right text-right "
                            type="number"
                            value={catItem[Object.keys(catItem)[8]]}
                            onChange={(e) =>
                              setAllMRSalesTarget(
                                allMRSalesTarget.map((el) => {
                                  if (el.party_code === item.party_code) {
                                    return {
                                      ...el,
                                      category_result: el.category_result.map(
                                        (pl) => {
                                          if (
                                            catItem[Object.keys(catItem)[0]] ===
                                            pl[Object.keys(pl)[0]]
                                          ) {
                                            return {
                                              ...pl,
                                              [Object.keys(pl)[8]]:
                                                e.target.value,
                                            };
                                          } else {
                                            return pl;
                                          }
                                        }
                                      ),
                                    };
                                  } else {
                                    return el;
                                  }
                                })
                              )
                            }
                          />
                        </li>
                      ))}
                      <li className="  flex justify-center font-bold  text-black   p-1  bg-gray-300 ">
                        <input
                          className="p-0 w-16 h-6   text-right "
                          value={item.category_result
                            .reduce((acc, curr) => {
                              acc =
                                Number(acc) +
                                Number(curr[Object.keys(curr)[8]]);
                              return acc;
                            }, 0)
                            ?.toFixed(2)}
                          disabled
                        />
                      </li>
                    </ul>
                  </td>
                  <td className="  border-2 border-black  whitespace-nowrap  p-0 bg-green-200 font-bold">
                  <ul>
                      {item.category_result.map((catItem, idx) => (
                        <li className="border-b-2 border-black  flex justify-center text-black   p-1">
                          <input
                            className="p-0 w-16  h-6 text-right  "
                            value={
                              (Number(catItem[Object.keys(catItem)[6]]) +
                              Number(catItem[Object.keys(catItem)[7]]) +
                              Number(catItem[Object.keys(catItem)[8]])).toFixed(2)
                            }
                            disabled
                          />
                        </li>
                      ))}{" "}
                      <li className="  flex justify-center font-bold  text-black   p-1  bg-gray-300 ">
                        <input
                          className="p-0 w-16 h-6   text-right "
                          value={item.category_result
                            .reduce((acc, curr) => {
                              acc =
                                Number(acc) +
                                Number(curr[Object.keys(curr)[6]]) +
                                Number(curr[Object.keys(curr)[7]]) +
                                Number(curr[Object.keys(curr)[8]]);
                              return acc;
                            }, 0)
                            ?.toFixed(2)}
                          disabled
                        />
                      </li>
                    </ul>
                
                  </td>
                  <td className="  border-2 border-black  whitespace-nowrap  p-0 bg-white">
                    <ul>
                      {item.category_result.map((catItem, idx) => (
                        <li className="border-b-2 border-black  flex justify-center text-black bg-yellow-300  p-1">
                          <input
                            className="p-0 w-16  h-6 text-right  text-right"
                            value={catItem[Object.keys(catItem)[9]]}
                            onChange={(e) =>
                              setAllMRSalesTarget(
                                allMRSalesTarget.map((el) => {
                                  if (el.party_code === item.party_code) {
                                    return {
                                      ...el,
                                      category_result: el.category_result.map(
                                        (pl) => {
                                          if (
                                            catItem[Object.keys(catItem)[0]] ===
                                            pl[Object.keys(pl)[0]]
                                          ) {
                                            return {
                                              ...pl,
                                              [Object.keys(pl)[9]]:
                                                e.target.value,
                                            };
                                          } else {
                                            return pl;
                                          }
                                        }
                                      ),
                                    };
                                  } else {
                                    return el;
                                  }
                                })
                              )
                            }
                          />
                        </li>
                      ))}
                      <li className="  flex justify-center font-bold  text-black   p-1  bg-gray-300 ">
                        <input
                          className="p-0 w-16 h-6   text-right "
                          value={item.category_result
                            .reduce((acc, curr) => {
                              acc =
                                Number(acc) +
                                Number(curr[Object.keys(curr)[9]]);
                              return acc;
                            }, 0)
                            ?.toFixed(2)}
                          disabled
                        />
                      </li>
                    </ul>
                  </td>
                  <td className="  border-2 border-black  whitespace-nowrap  p-0">
                    <ul>
                      {item.category_result.map((catItem, idx) => (
                        <li className="border-b-2 border-black  flex justify-center text-black bg-yellow-300  p-1">
                          <input
                            className="p-0 w-16  h-6 text-right text-right "
                            type="number"
                            value={catItem[Object.keys(catItem)[10]]}
                            onChange={(e) =>
                              setAllMRSalesTarget(
                                allMRSalesTarget.map((el) => {
                                  if (el.party_code === item.party_code) {
                                    return {
                                      ...el,
                                      category_result: el.category_result.map(
                                        (pl) => {
                                          if (
                                            catItem[Object.keys(catItem)[0]] ===
                                            pl[Object.keys(pl)[0]]
                                          ) {
                                            return {
                                              ...pl,
                                              [Object.keys(pl)[10]]:
                                                e.target.value,
                                            };
                                          } else {
                                            return pl;
                                          }
                                        }
                                      ),
                                    };
                                  } else {
                                    return el;
                                  }
                                })
                              )
                            }
                          />
                        </li>
                      ))}
                      <li className="  flex justify-center font-bold  text-black   p-1  bg-gray-300 ">
                        <input
                          className="p-0 w-16 h-6   text-right "
                          value={item.category_result
                            .reduce((acc, curr) => {
                              acc =
                                Number(acc) +
                                Number(curr[Object.keys(curr)[10]]);
                              return acc;
                            }, 0)
                            ?.toFixed(2)}
                          disabled
                        />
                      </li>
                    </ul>
                  </td>
                  <td className="  border-2 border-black  whitespace-nowrap  p-0 bg-white">
                    <ul>
                      {item.category_result.map((catItem, idx) => (
                        <li className="border-b-2 border-black  flex justify-center text-black  bg-yellow-300 p-1">
                          <input
                            className="p-0 w-16  h-6 text-right  text-right"
                            value={catItem[Object.keys(catItem)[11]]}
                            onChange={(e) =>
                              setAllMRSalesTarget(
                                allMRSalesTarget.map((el) => {
                                  if (el.party_code === item.party_code) {
                                    return {
                                      ...el,
                                      category_result: el.category_result.map(
                                        (pl) => {
                                          if (
                                            catItem[Object.keys(catItem)[0]] ===
                                            pl[Object.keys(pl)[0]]
                                          ) {
                                            return {
                                              ...pl,
                                              [Object.keys(pl)[11]]:
                                                e.target.value,
                                            };
                                          } else {
                                            return pl;
                                          }
                                        }
                                      ),
                                    };
                                  } else {
                                    return el;
                                  }
                                })
                              )
                            }
                          />
                        </li>
                      ))}
                      <li className="  flex justify-center font-bold  text-black   p-1  bg-gray-300 ">
                        <input
                          className="p-0 w-16 h-6   text-right "
                          value={item.category_result
                            .reduce((acc, curr) => {
                              acc =
                                Number(acc) +
                                Number(curr[Object.keys(curr)[11]]);
                              return acc;
                            }, 0)
                            ?.toFixed(2)}
                          disabled
                        />
                      </li>
                    </ul>
                  </td>
                  <td className="  border-2 border-black  whitespace-nowrap  p-0 bg-green-200 font-bold">
                  

                    <ul>
                      {item.category_result.map((catItem, idx) => (
                        <li className="border-b-2 border-black  flex justify-center text-black   p-1">
                          <input
                            className="p-0 w-16  h-6 text-right  "
                            value={
                              (Number(catItem[Object.keys(catItem)[9]]) +
                              Number(catItem[Object.keys(catItem)[10]]) +
                              Number(catItem[Object.keys(catItem)[11]])).toFixed(2)
                            }
                            disabled
                          />
                        </li>
                      ))}{" "}
                      <li className="  flex justify-center font-bold  text-black   p-1  bg-gray-300 ">
                        <input
                          className="p-0 w-16 h-6   text-right "
                          value={item.category_result
                            .reduce((acc, curr) => {
                              acc =
                                Number(acc) +
                                Number(curr[Object.keys(curr)[9]]) +
                                Number(curr[Object.keys(curr)[10]]) +
                                Number(curr[Object.keys(curr)[11]]);
                              return acc;
                            }, 0)
                            ?.toFixed(2)}
                          disabled
                        />
                      </li>
                    </ul>
                  </td>
                  <td className="  border-2 border-black  whitespace-nowrap  p-0 bg-white">
                    <ul>
                      {item.category_result.map((catItem, idx) => (
                        <li className="border-b-2 border-black  flex justify-center text-black bg-yellow-300  p-1">
                          <input
                            className="p-0 w-16  h-6 text-right  text-right"
                            value={catItem[Object.keys(catItem)[12]]}
                            onChange={(e) =>
                              setAllMRSalesTarget(
                                allMRSalesTarget.map((el) => {
                                  if (el.party_code === item.party_code) {
                                    return {
                                      ...el,
                                      category_result: el.category_result.map(
                                        (pl) => {
                                          if (
                                            catItem[Object.keys(catItem)[0]] ===
                                            pl[Object.keys(pl)[0]]
                                          ) {
                                            return {
                                              ...pl,
                                              [Object.keys(pl)[12]]:
                                                e.target.value,
                                            };
                                          } else {
                                            return pl;
                                          }
                                        }
                                      ),
                                    };
                                  } else {
                                    return el;
                                  }
                                })
                              )
                            }
                          />
                        </li>
                      ))}
                      <li className="  flex justify-center font-bold  text-black   p-1  bg-gray-300 ">
                        <input
                          className="p-0 w-16 h-6   text-right "
                          value={item.category_result
                            .reduce((acc, curr) => {
                              acc =
                                Number(acc) +
                                Number(curr[Object.keys(curr)[12]]);
                              return acc;
                            }, 0)
                            ?.toFixed(2)}
                          disabled
                        />
                      </li>
                    </ul>
                  </td>
                  <td className="  border-2 border-black  whitespace-nowrap  p-0 ">
                    <ul>
                      {item.category_result.map((catItem, idx) => (
                        <li className="border-b-2 border-black  flex justify-center text-black bg-yellow-300  p-1">
                          <input
                            className="p-0 w-16  h-6 text-right  text-right"
                            value={catItem[Object.keys(catItem)[13]]}
                            onChange={(e) =>
                              setAllMRSalesTarget(
                                allMRSalesTarget.map((el) => {
                                  if (el.party_code === item.party_code) {
                                    return {
                                      ...el,
                                      category_result: el.category_result.map(
                                        (pl) => {
                                          if (
                                            catItem[Object.keys(catItem)[0]] ===
                                            pl[Object.keys(pl)[0]]
                                          ) {
                                            return {
                                              ...pl,
                                              [Object.keys(pl)[13]]:
                                                e.target.value,
                                            };
                                          } else {
                                            return pl;
                                          }
                                        }
                                      ),
                                    };
                                  } else {
                                    return el;
                                  }
                                })
                              )
                            }
                          />
                        </li>
                      ))}
                      <li className="  flex justify-center font-bold  text-black   p-1  bg-gray-300 ">
                        <input
                          className="p-0 w-16 h-6   text-right "
                          value={item.category_result
                            .reduce((acc, curr) => {
                              acc =
                                Number(acc) +
                                Number(curr[Object.keys(curr)[13]]);
                              return acc;
                            }, 0)
                            ?.toFixed(2)}
                          disabled
                        />
                      </li>
                    </ul>
                  </td>
                  <td className="  border-2 border-black  whitespace-nowrap  p-0 bg-white">
                    <ul>
                      {item.category_result.map((catItem, idx) => (
                        <li className="border-b-2 border-black  flex justify-center text-black  bg-yellow-300 p-1">
                          <input
                            className="p-0 w-16  h-6 text-right  text-right"
                            value={catItem[Object.keys(catItem)[14]]}
                            onChange={(e) =>
                              setAllMRSalesTarget(
                                allMRSalesTarget.map((el) => {
                                  if (el.party_code === item.party_code) {
                                    return {
                                      ...el,
                                      category_result: el.category_result.map(
                                        (pl) => {
                                          if (
                                            catItem[Object.keys(catItem)[0]] ===
                                            pl[Object.keys(pl)[0]]
                                          ) {
                                            return {
                                              ...pl,
                                              [Object.keys(pl)[14]]:
                                                e.target.value,
                                            };
                                          } else {
                                            return pl;
                                          }
                                        }
                                      ),
                                    };
                                  } else {
                                    return el;
                                  }
                                })
                              )
                            }
                          />
                        </li>
                      ))}
                      <li className="  flex justify-center font-bold  text-black   p-1  bg-gray-300 ">
                        <input
                          className="p-0 w-16 h-6   text-right "
                          value={item.category_result
                            .reduce((acc, curr) => {
                              acc =
                                Number(acc) +
                                Number(curr[Object.keys(curr)[14]]);
                              return acc;
                            }, 0)
                            ?.toFixed(2)}
                          disabled
                        />
                      </li>
                    </ul>
                  </td>
                  <td className="  border-2 border-black  whitespace-nowrap  p-0 bg-green-300 font-bold">
                    <ul>
                      {item.category_result.map((item, idx) => (
                        <li className="border-b-2 border-black  flex justify-center text-black   p-1">
                          <input
                            className="p-0 w-16  h-6 text-right  "
                            value={
                             (Number(item[Object.keys(item)[14]]) +
                             Number(item[Object.keys(item)[13]]) +
                             Number(item[Object.keys(item)[12]])).toFixed(2) 
                            }
                            disabled
                          />
                        </li>
                      ))}
                      <li className="  flex justify-center font-bold  text-black   p-1  bg-gray-300 ">
                        <input
                          className="p-0 w-16 h-6   text-right "
                          value={item.category_result
                            .reduce((acc, curr) => {
                              acc =
                                Number(acc) +
                                Number(curr[Object.keys(curr)[14]]) +
                                Number(curr[Object.keys(curr)[13]]) +
                                Number(curr[Object.keys(curr)[12]]);
                              return acc;
                            }, 0)
                            ?.toFixed(2)}
                          disabled
                        />
                      </li>
                    </ul>
                  </td>

                  <td className="  border-2 border-black  whitespace-nowrap  p-0 bg-gray-300 font-bold">
                    <ul>
                      {item.category_result.map((catItem, idx) => (
                        <li className="border-b-2 border-black  flex justify-center text-black   p-1">
                          <input
                            className="p-0 w-16  h-6 text-right  "
                            value={
                              (Number(catItem[Object.keys(catItem)[5]]) +
                              Number(catItem[Object.keys(catItem)[4]]) +
                              Number(catItem[Object.keys(catItem)[3]]) +
                              Number(catItem[Object.keys(catItem)[6]]) +
                              Number(catItem[Object.keys(catItem)[7]]) +
                              Number(catItem[Object.keys(catItem)[8]]) +
                              Number(catItem[Object.keys(catItem)[9]]) +
                              Number(catItem[Object.keys(catItem)[10]]) +
                              Number(catItem[Object.keys(catItem)[11]]) +
                              Number(catItem[Object.keys(catItem)[14]]) +
                              Number(catItem[Object.keys(catItem)[13]]) +
                              Number(catItem[Object.keys(catItem)[12]])).toFixed(2)
                            }
                            disabled
                          />
                        </li>
                      ))}
                      <li className="  flex justify-center font-bold  text-black   p-1  bg-gray-300 ">
                        <input
                          className="p-0 w-16 h-6   text-right "
                          value={item.category_result
                            .reduce((acc, curr) => {
                              acc =
                                Number(acc) +
                                Number(curr[Object.keys(curr)[5]]) +
                                Number(curr[Object.keys(curr)[4]]) +
                                Number(curr[Object.keys(curr)[3]]) +
                                Number(curr[Object.keys(curr)[6]]) +
                                Number(curr[Object.keys(curr)[7]]) +
                                Number(curr[Object.keys(curr)[8]]) +
                                Number(curr[Object.keys(curr)[9]]) +
                                Number(curr[Object.keys(curr)[10]]) +
                                Number(curr[Object.keys(curr)[11]]) +
                                Number(curr[Object.keys(curr)[14]]) +
                                Number(curr[Object.keys(curr)[13]]) +
                                Number(curr[Object.keys(curr)[12]]);
                              return acc;
                            }, 0)
                            ?.toFixed(2)}
                          disabled
                        />
                      </li>
                    </ul>
                  </td>
                </tr>
              ))}
          
              {Object.keys(groupedArray).map((empcode) => (
                <tr className="dark:border-2">
                  <td className="pl-4 w-52 text-left border-2 border-black whitespace-nowrap font-arial text-xs ">
                    {groupedArray[empcode][0].emp_code}
                  </td>
                  <td className="px-12 w-52 text-center border-2 border-black whitespace-nowrap font-arial text-xs ">
                    {groupedArray[empcode][0].emp_name}
                  </td>

                  <td className="pl-4 w-52 text-left border-2 border-black whitespace-nowrap font-arial text-xs ">
                    -
                  </td>
                  <td className="pl-4 w-52 text-left border-2 border-black whitespace-nowrap font-arial text-xs ">
                    -
                  </td>
                  <td className="pl-4 w-52 text-left border-2 border-black justify-center whitespace-nowrap font-arial text-xs ">
                    -
                  </td>

                  <td className="  border-2 border-black  whitespace-nowrap  text-xsm p-0 bg-white">
                    <li className="  flex justify-center  text-black   p-1  ">
                      <input
                        className="p-0 w-16 h-6  font-bold text-center"
                        value="M.R. Total"
                        disabled
                      />
                    </li>
                  </td>
                  <td className="  border-2 border-black  whitespace-nowrap  p-0 bg-gray-300 font-bold">
                    <ul>
                      <li className="  flex justify-center font-bold  text-black   p-1  bg-gray-300 ">
                        <input
                          className="p-0 w-16 h-6   text-right "
                          value={groupedArray[empcode]
                            .map((item) => {
                              return item.category_result.reduce(
                                (acc, curr) => {
                                  acc =
                                    Number(acc) +
                                    Number(curr[Object.keys(curr)[1]]);
                                  return acc;
                                },
                                0
                              );
                            })
                            .reduce((acc1, curr1) => {
                              acc1 = acc1 + curr1;
                              return acc1;
                            }, 0)
                            ?.toFixed(2)}
                          disabled
                        />
                      </li>
                    </ul>
                  </td>
                  <td className="  border-2 border-black  whitespace-nowrap  p-0 bg-gray-300 font-bold">
                    <ul>
                      <li className="  flex justify-center font-bold  text-black   p-1  bg-gray-300 ">
                        <input
                          className="p-0 w-16 h-6   text-right "
                          value={groupedArray[empcode]
                            .map((item) => {
                              return item.category_result.reduce(
                                (acc, curr) => {
                                  acc =
                                    Number(acc) +
                                    Number(curr[Object.keys(curr)[2]]);
                                  return acc;
                                },
                                0
                              );
                            })
                            .reduce((acc1, curr1) => {
                              acc1 = acc1 + curr1;
                              return acc1;
                            }, 0)
                            ?.toFixed(2)}
                          disabled
                        />
                      </li>
                    </ul>
                  </td>

                  <td className="  border-2 border-black  whitespace-nowrap  p-0 bg-gray-300 font-bold">
                    <ul>
                      <li className="  flex justify-center font-bold  text-black   p-1  bg-gray-300 ">
                        <input
                          className="p-0 w-16 h-6   text-right "
                          value={groupedArray[empcode]
                            .map((item) => {
                              return item.category_result.reduce(
                                (acc, curr) => {
                                  acc =
                                    Number(acc) +
                                    Number(curr[Object.keys(curr)[3]]);
                                  return acc;
                                },
                                0
                              );
                            })
                            .reduce((acc1, curr1) => {
                              acc1 = acc1 + curr1;
                              return acc1;
                            }, 0)
                            ?.toFixed(2)}
                          disabled
                        />
                      </li>
                    </ul>
                  </td>
                  <td className="  border-2 border-black  whitespace-nowrap  p-0 bg-gray-300 font-bold">
                    <ul>
                      <li className="  flex justify-center font-bold  text-black   p-1  bg-gray-300 ">
                        <input
                          className="p-0 w-16 h-6   text-right "
                          value={groupedArray[empcode]
                            .map((item) => {
                              return item.category_result.reduce(
                                (acc, curr) => {
                                  acc =
                                    Number(acc) +
                                    Number(curr[Object.keys(curr)[4]]);
                                  return acc;
                                },
                                0
                              );
                            })
                            .reduce((acc1, curr1) => {
                              acc1 = acc1 + curr1;
                              return acc1;
                            }, 0)
                            ?.toFixed(2)}
                          disabled
                        />
                      </li>
                    </ul>
                  </td>
                  <td className="  border-2 border-black  whitespace-nowrap  p-0 bg-gray-300 font-bold">
                    <ul>
                      <li className="  flex justify-center font-bold  text-black   p-1  bg-gray-300 ">
                        <input
                          className="p-0 w-16 h-6   text-right "
                          value={groupedArray[empcode]
                            .map((item) => {
                              return item.category_result.reduce(
                                (acc, curr) => {
                                  acc =
                                    Number(acc) +
                                    Number(curr[Object.keys(curr)[5]]);
                                  return acc;
                                },
                                0
                              );
                            })
                            .reduce((acc1, curr1) => {
                              acc1 = acc1 + curr1;
                              return acc1;
                            }, 0)
                            ?.toFixed(2)}
                          disabled
                        />
                      </li>
                    </ul>
                  </td>
                  <td className="  border-2 border-black  whitespace-nowrap  p-0 bg-gray-300 font-bold">
                    <ul>
                      <li className="  flex justify-center font-bold  text-black   p-1  bg-gray-300 ">
                        <input
                          className="p-0 w-16 h-6   text-right "
                          type="number"
                          value={
                            groupedArray[empcode]
                              .map((item) => {
                                return item.category_result.reduce(
                                  (acc, curr) => {
                                    acc =
                                      Number(acc) +
                                      Number(curr[Object.keys(curr)[3]]);
                                    return acc;
                                  },
                                  0
                                );
                              })
                              .reduce((acc1, curr1) => {
                                acc1 = acc1 + curr1;
                                return acc1;
                              }, 0) +
                            groupedArray[empcode]
                              .map((item) => {
                                return item.category_result.reduce(
                                  (acc, curr) => {
                                    acc =
                                      Number(acc) +
                                      Number(curr[Object.keys(curr)[4]]);
                                    return acc;
                                  },
                                  0
                                );
                              })
                              .reduce((acc1, curr1) => {
                                acc1 = acc1 + curr1;
                                return acc1;
                              }, 0) +
                            groupedArray[empcode]
                              .map((item) => {
                                return item.category_result.reduce(
                                  (acc, curr) => {
                                    acc =
                                      Number(acc) +
                                      Number(curr[Object.keys(curr)[5]]);
                                    return acc;
                                  },
                                  0
                                );
                              })
                              .reduce((acc1, curr1) => {
                                acc1 = acc1 + curr1;
                                return acc1;
                              }, 0)
                          }
                          disabled
                        />
                      </li>
                    </ul>
                  </td>
                  <td className="  border-2 border-black  whitespace-nowrap  p-0 bg-gray-300 font-bold">
                    <ul>
                      <li className="  flex justify-center font-bold  text-black   p-1  bg-gray-300 ">
                        <input
                          className="p-0 w-16 h-6   text-right "
                          value={groupedArray[empcode]
                            .map((item) => {
                              return item.category_result.reduce(
                                (acc, curr) => {
                                  acc =
                                    Number(acc) +
                                    Number(curr[Object.keys(curr)[6]]);
                                  return acc;
                                },
                                0
                              );
                            })
                            .reduce((acc1, curr1) => {
                              acc1 = acc1 + curr1;
                              return acc1;
                            }, 0)
                            ?.toFixed(2)}
                          disabled
                        />
                      </li>
                    </ul>
                  </td>
                  <td className="  border-2 border-black  whitespace-nowrap  p-0 bg-gray-300 font-bold">
                    <ul>
                      <li className="  flex justify-center font-bold  text-black   p-1  bg-gray-300 ">
                        <input
                          className="p-0 w-16 h-6   text-right "
                          value={groupedArray[empcode]
                            .map((item) => {
                              return item.category_result.reduce(
                                (acc, curr) => {
                                  acc =
                                    Number(acc) +
                                    Number(curr[Object.keys(curr)[7]]);
                                  return acc;
                                },
                                0
                              );
                            })
                            .reduce((acc1, curr1) => {
                              acc1 = acc1 + curr1;
                              return acc1;
                            }, 0)
                            ?.toFixed(2)}
                          disabled
                        />
                      </li>
                    </ul>
                  </td>
                  <td className="  border-2 border-black  whitespace-nowrap  p-0 bg-gray-300 font-bold">
                    <ul>
                      <li className="  flex justify-center font-bold  text-black   p-1  bg-gray-300 ">
                        <input
                          className="p-0 w-16 h-6   text-right "
                          value={groupedArray[empcode]
                            .map((item) => {
                              return item.category_result.reduce(
                                (acc, curr) => {
                                  acc =
                                    Number(acc) +
                                    Number(curr[Object.keys(curr)[8]]);
                                  return acc;
                                },
                                0
                              );
                            })
                            .reduce((acc1, curr1) => {
                              acc1 = acc1 + curr1;
                              return acc1;
                            }, 0)
                            ?.toFixed(2)}
                          disabled
                        />
                      </li>
                    </ul>
                  </td>
                  <td className="  border-2 border-black  whitespace-nowrap  p-0 bg-gray-300 font-bold">
                    <ul>
                      <li className="  flex justify-center font-bold  text-black   p-1  bg-gray-300 ">
                        <input
                          className="p-0 w-16 h-6   text-right "
                          type="number"
                          value={
                            groupedArray[empcode]
                              .map((item) => {
                                return item.category_result.reduce(
                                  (acc, curr) => {
                                    acc =
                                      Number(acc) +
                                      Number(curr[Object.keys(curr)[6]]);
                                    return acc;
                                  },
                                  0
                                );
                              })
                              .reduce((acc1, curr1) => {
                                acc1 = acc1 + curr1;
                                return acc1;
                              }, 0) +
                            groupedArray[empcode]
                              .map((item) => {
                                return item.category_result.reduce(
                                  (acc, curr) => {
                                    acc =
                                      Number(acc) +
                                      Number(curr[Object.keys(curr)[7]]);
                                    return acc;
                                  },
                                  0
                                );
                              })
                              .reduce((acc1, curr1) => {
                                acc1 = acc1 + curr1;
                                return acc1;
                              }, 0) +
                            groupedArray[empcode]
                              .map((item) => {
                                return item.category_result.reduce(
                                  (acc, curr) => {
                                    acc =
                                      Number(acc) +
                                      Number(curr[Object.keys(curr)[8]]);
                                    return acc;
                                  },
                                  0
                                );
                              })
                              .reduce((acc1, curr1) => {
                                acc1 = acc1 + curr1;
                                return acc1;
                              }, 0)
                          }
                          disabled
                        />
                      </li>
                    </ul>
                  </td>
                  <td className="  border-2 border-black  whitespace-nowrap  p-0 bg-gray-300 font-bold">
                    <ul>
                      <li className="  flex justify-center font-bold  text-black   p-1  bg-gray-300 ">
                        <input
                          className="p-0 w-16 h-6   text-right "
                          value={groupedArray[empcode]
                            .map((item) => {
                              return item.category_result.reduce(
                                (acc, curr) => {
                                  acc =
                                    Number(acc) +
                                    Number(curr[Object.keys(curr)[9]]);
                                  return acc;
                                },
                                0
                              );
                            })
                            .reduce((acc1, curr1) => {
                              acc1 = acc1 + curr1;
                              return acc1;
                            }, 0)
                            ?.toFixed(2)}
                          disabled
                        />
                      </li>
                    </ul>
                  </td>
                  <td className="  border-2 border-black  whitespace-nowrap  p-0 bg-gray-300 font-bold">
                    <ul>
                      <li className="  flex justify-center font-bold  text-black   p-1  bg-gray-300 ">
                        <input
                          className="p-0 w-16 h-6   text-right "
                          value={groupedArray[empcode]
                            .map((item) => {
                              return item.category_result.reduce(
                                (acc, curr) => {
                                  acc =
                                    Number(acc) +
                                    Number(curr[Object.keys(curr)[10]]);
                                  return acc;
                                },
                                0
                              );
                            })
                            .reduce((acc1, curr1) => {
                              acc1 = acc1 + curr1;
                              return acc1;
                            }, 0)
                            ?.toFixed(2)}
                          disabled
                        />
                      </li>
                    </ul>
                  </td>
                  <td className="  border-2 border-black  whitespace-nowrap  p-0 bg-gray-300 font-bold">
                    <ul>
                      <li className="  flex justify-center font-bold  text-black   p-1  bg-gray-300 ">
                        <input
                          className="p-0 w-16 h-6   text-right "
                          value={groupedArray[empcode]
                            .map((item) => {
                              return item.category_result.reduce(
                                (acc, curr) => {
                                  acc =
                                    Number(acc) +
                                    Number(curr[Object.keys(curr)[11]]);
                                  return acc;
                                },
                                0
                              );
                            })
                            .reduce((acc1, curr1) => {
                              acc1 = acc1 + curr1;
                              return acc1;
                            }, 0)
                            ?.toFixed(2)}
                          disabled
                        />
                      </li>
                    </ul>
                  </td>
                  <td className="  border-2 border-black  whitespace-nowrap  p-0 bg-gray-300 font-bold">
                    <ul>
                      <li className="  flex justify-center font-bold  text-black   p-1  bg-gray-300 ">
                        <input
                          className="p-0 w-16 h-6   text-right "
                          type="number"
                          value={
                            groupedArray[empcode]
                              .map((item) => {
                                return item.category_result.reduce(
                                  (acc, curr) => {
                                    acc =
                                      Number(acc) +
                                      Number(curr[Object.keys(curr)[9]]);
                                    return acc;
                                  },
                                  0
                                );
                              })
                              .reduce((acc1, curr1) => {
                                acc1 = acc1 + curr1;
                                return acc1;
                              }, 0) +
                            groupedArray[empcode]
                              .map((item) => {
                                return item.category_result.reduce(
                                  (acc, curr) => {
                                    acc =
                                      Number(acc) +
                                      Number(curr[Object.keys(curr)[10]]);
                                    return acc;
                                  },
                                  0
                                );
                              })
                              .reduce((acc1, curr1) => {
                                acc1 = acc1 + curr1;
                                return acc1;
                              }, 0) +
                            groupedArray[empcode]
                              .map((item) => {
                                return item.category_result.reduce(
                                  (acc, curr) => {
                                    acc =
                                      Number(acc) +
                                      Number(curr[Object.keys(curr)[11]]);
                                    return acc;
                                  },
                                  0
                                );
                              })
                              .reduce((acc1, curr1) => {
                                acc1 = acc1 + curr1;
                                return acc1;
                              }, 0)
                          }
                          disabled
                        />
                      </li>
                    </ul>
                  </td>
                  <td className="  border-2 border-black  whitespace-nowrap  p-0 bg-gray-300 font-bold">
                    <ul>
                      <li className="  flex justify-center font-bold  text-black   p-1  bg-gray-300 ">
                        <input
                          className="p-0 w-16 h-6   text-right "
                          value={groupedArray[empcode]
                            .map((item) => {
                              return item.category_result.reduce(
                                (acc, curr) => {
                                  acc =
                                    Number(acc) +
                                    Number(curr[Object.keys(curr)[12]]);
                                  return acc;
                                },
                                0
                              );
                            })
                            .reduce((acc1, curr1) => {
                              acc1 = acc1 + curr1;
                              return acc1;
                            }, 0)
                            ?.toFixed(2)}
                          disabled
                        />
                      </li>
                    </ul>
                  </td>
                  <td className="  border-2 border-black  whitespace-nowrap  p-0 bg-gray-300 font-bold">
                    <ul>
                      <li className="  flex justify-center font-bold  text-black   p-1  bg-gray-300 ">
                        <input
                          className="p-0 w-16 h-6   text-right "
                          value={groupedArray[empcode]
                            .map((item) => {
                              return item.category_result.reduce(
                                (acc, curr) => {
                                  acc =
                                    Number(acc) +
                                    Number(curr[Object.keys(curr)[13]]);
                                  return acc;
                                },
                                0
                              );
                            })
                            .reduce((acc1, curr1) => {
                              acc1 = acc1 + curr1;
                              return acc1;
                            }, 0)
                            ?.toFixed(2)}
                          disabled
                        />
                      </li>
                    </ul>
                  </td>
                  <td className="  border-2 border-black  whitespace-nowrap  p-0 bg-gray-300 font-bold">
                    <ul>
                      <li className="  flex justify-center font-bold  text-black   p-1  bg-gray-300 ">
                        <input
                          className="p-0 w-16 h-6   text-right "
                          value={groupedArray[empcode]
                            .map((item) => {
                              return item.category_result.reduce(
                                (acc, curr) => {
                                  acc =
                                    Number(acc) +
                                    Number(curr[Object.keys(curr)[14]]);
                                  return acc;
                                },
                                0
                              );
                            })
                            .reduce((acc1, curr1) => {
                              acc1 = acc1 + curr1;
                              return acc1;
                            }, 0)
                            ?.toFixed(2)}
                          disabled
                        />
                      </li>
                    </ul>
                  </td>
                  <td className="  border-2 border-black  whitespace-nowrap  p-0 bg-gray-300 font-bold">
                    <ul>
                      <li className="  flex justify-center font-bold  text-black   p-1  bg-gray-300 ">
                        <input
                          className="p-0 w-16 h-6   text-right "
                          type="number"
                          value={
                            groupedArray[empcode]
                              .map((item) => {
                                return item.category_result.reduce(
                                  (acc, curr) => {
                                    acc =
                                      Number(acc) +
                                      Number(curr[Object.keys(curr)[12]]);
                                    return acc;
                                  },
                                  0
                                );
                              })
                              .reduce((acc1, curr1) => {
                                acc1 = acc1 + curr1;
                                return acc1;
                              }, 0) +
                            groupedArray[empcode]
                              .map((item) => {
                                return item.category_result.reduce(
                                  (acc, curr) => {
                                    acc =
                                      Number(acc) +
                                      Number(curr[Object.keys(curr)[13]]);
                                    return acc;
                                  },
                                  0
                                );
                              })
                              .reduce((acc1, curr1) => {
                                acc1 = acc1 + curr1;
                                return acc1;
                              }, 0) +
                            groupedArray[empcode]
                              .map((item) => {
                                return item.category_result.reduce(
                                  (acc, curr) => {
                                    acc =
                                      Number(acc) +
                                      Number(curr[Object.keys(curr)[14]]);
                                    return acc;
                                  },
                                  0
                                );
                              })
                              .reduce((acc1, curr1) => {
                                acc1 = acc1 + curr1;
                                return acc1;
                              }, 0)
                          }
                          disabled
                        />
                      </li>
                    </ul>
                  </td>

                  <td className="  border-2 border-black  whitespace-nowrap  p-0 bg-gray-300 font-bold">
                    <ul>
                      <li className="  flex justify-center font-bold  text-black   p-1  bg-gray-300 ">
                        <input
                          className="p-0 w-16 h-6   text-right "
                          type="number"
                          value={
                            groupedArray[empcode]
                              .map((item) => {
                                return item.category_result.reduce(
                                  (acc, curr) => {
                                    acc =
                                      Number(acc) +
                                      Number(curr[Object.keys(curr)[3]]);
                                    return acc;
                                  },
                                  0
                                );
                              })
                              .reduce((acc1, curr1) => {
                                acc1 = acc1 + curr1;
                                return acc1;
                              }, 0) +
                            groupedArray[empcode]
                              .map((item) => {
                                return item.category_result.reduce(
                                  (acc, curr) => {
                                    acc =
                                      Number(acc) +
                                      Number(curr[Object.keys(curr)[4]]);
                                    return acc;
                                  },
                                  0
                                );
                              })
                              .reduce((acc1, curr1) => {
                                acc1 = acc1 + curr1;
                                return acc1;
                              }, 0) +
                            groupedArray[empcode]
                              .map((item) => {
                                return item.category_result.reduce(
                                  (acc, curr) => {
                                    acc =
                                      Number(acc) +
                                      Number(curr[Object.keys(curr)[5]]);
                                    return acc;
                                  },
                                  0
                                );
                              })
                              .reduce((acc1, curr1) => {
                                acc1 = acc1 + curr1;
                                return acc1;
                              }, 0) +
                            groupedArray[empcode]
                              .map((item) => {
                                return item.category_result.reduce(
                                  (acc, curr) => {
                                    acc =
                                      Number(acc) +
                                      Number(curr[Object.keys(curr)[6]]);
                                    return acc;
                                  },
                                  0
                                );
                              })
                              .reduce((acc1, curr1) => {
                                acc1 = acc1 + curr1;
                                return acc1;
                              }, 0) +
                            groupedArray[empcode]
                              .map((item) => {
                                return item.category_result.reduce(
                                  (acc, curr) => {
                                    acc =
                                      Number(acc) +
                                      Number(curr[Object.keys(curr)[7]]);
                                    return acc;
                                  },
                                  0
                                );
                              })
                              .reduce((acc1, curr1) => {
                                acc1 = acc1 + curr1;
                                return acc1;
                              }, 0) +
                            groupedArray[empcode]
                              .map((item) => {
                                return item.category_result.reduce(
                                  (acc, curr) => {
                                    acc =
                                      Number(acc) +
                                      Number(curr[Object.keys(curr)[8]]);
                                    return acc;
                                  },
                                  0
                                );
                              })
                              .reduce((acc1, curr1) => {
                                acc1 = acc1 + curr1;
                                return acc1;
                              }, 0) +
                            groupedArray[empcode]
                              .map((item) => {
                                return item.category_result.reduce(
                                  (acc, curr) => {
                                    acc =
                                      Number(acc) +
                                      Number(curr[Object.keys(curr)[9]]);
                                    return acc;
                                  },
                                  0
                                );
                              })
                              .reduce((acc1, curr1) => {
                                acc1 = acc1 + curr1;
                                return acc1;
                              }, 0) +
                            groupedArray[empcode]
                              .map((item) => {
                                return item.category_result.reduce(
                                  (acc, curr) => {
                                    acc =
                                      Number(acc) +
                                      Number(curr[Object.keys(curr)[10]]);
                                    return acc;
                                  },
                                  0
                                );
                              })
                              .reduce((acc1, curr1) => {
                                acc1 = acc1 + curr1;
                                return acc1;
                              }, 0) +
                            groupedArray[empcode]
                              .map((item) => {
                                return item.category_result.reduce(
                                  (acc, curr) => {
                                    acc =
                                      Number(acc) +
                                      Number(curr[Object.keys(curr)[11]]);
                                    return acc;
                                  },
                                  0
                                );
                              })
                              .reduce((acc1, curr1) => {
                                acc1 = acc1 + curr1;
                                return acc1;
                              }, 0) +
                            groupedArray[empcode]
                              .map((item) => {
                                return item.category_result.reduce(
                                  (acc, curr) => {
                                    acc =
                                      Number(acc) +
                                      Number(curr[Object.keys(curr)[12]]);
                                    return acc;
                                  },
                                  0
                                );
                              })
                              .reduce((acc1, curr1) => {
                                acc1 = acc1 + curr1;
                                return acc1;
                              }, 0) +
                            groupedArray[empcode]
                              .map((item) => {
                                return item.category_result.reduce(
                                  (acc, curr) => {
                                    acc =
                                      Number(acc) +
                                      Number(curr[Object.keys(curr)[13]]);
                                    return acc;
                                  },
                                  0
                                );
                              })
                              .reduce((acc1, curr1) => {
                                acc1 = acc1 + curr1;
                                return acc1;
                              }, 0) +
                            groupedArray[empcode]
                              .map((item) => {
                                return item.category_result.reduce(
                                  (acc, curr) => {
                                    acc =
                                      Number(acc) +
                                      Number(curr[Object.keys(curr)[14]]);
                                    return acc;
                                  },
                                  0
                                );
                              })
                              .reduce((acc1, curr1) => {
                                acc1 = acc1 + curr1;
                                return acc1;
                              }, 0)
                          }
                          disabled
                        />
                      </li>
                    </ul>
                  </td>
                </tr>
              ))}

            
              <tr className="dark:border-2">
                <td className="pl-4 w-52 text-left border-2 border-black whitespace-nowrap font-arial text-xs ">
                  -
                </td>
                <td className="pl-4 w-52 text-left border-2 border-black whitespace-nowrap font-arial text-xs ">
                  -
                </td>

                <td className="pl-4 w-52 text-left border-2 border-black whitespace-nowrap font-arial text-xs ">
                  -
                </td>
                <td className="pl-4 w-52 text-left border-2 border-black whitespace-nowrap font-arial text-xs ">
                  -
                </td>
                <td className="pl-4 w-52 text-left border-2 border-black justify-center whitespace-nowrap font-arial text-xs ">
                  -
                </td>

                <td className="  border-2 border-black  whitespace-nowrap  text-xsm p-0 bg-white">
                  <li className="  flex justify-center  text-black   p-1  ">
                    <input
                      className="p-0 w-18 h-6  font-bold text-center"
                      value="Grand Total"
                      disabled
                    />
                  </li>
                </td>
                <td className="  border-2 border-black  whitespace-nowrap  p-0 bg-gray-300 font-bold">
                  <ul>
                    <li className="  flex justify-center font-bold  text-black   p-1  bg-gray-300 ">
                      <input
                        className="p-0 w-16 h-6   text-right "
                        value={allMRSalesTarget
                          .map((item) => {
                            return item.category_result.reduce((acc, curr) => {
                              acc =
                                Number(acc) +
                                Number(curr[Object.keys(curr)[1]]);
                              return acc;
                            }, 0);
                          })
                          .reduce((acc1, curr1) => {
                            acc1 = acc1 + curr1;
                            return acc1;
                          }, 0)
                          ?.toFixed(2)}
                        disabled
                      />
                    </li>
                  </ul>
                </td>
                <td className="  border-2 border-black  whitespace-nowrap  p-0 bg-gray-300 font-bold">
                  <ul>
                    <li className="  flex justify-center font-bold  text-black   p-1  bg-gray-300 ">
                      <input
                        className="p-0 w-16 h-6   text-right "
                        value={allMRSalesTarget
                          .map((item) => {
                            return item.category_result.reduce((acc, curr) => {
                              acc =
                                Number(acc) +
                                Number(curr[Object.keys(curr)[2]]);
                              return acc;
                            }, 0);
                          })
                          .reduce((acc1, curr1) => {
                            acc1 = acc1 + curr1;
                            return acc1;
                          }, 0)
                          ?.toFixed(2)}
                        disabled
                      />
                    </li>
                  </ul>
                </td>

                <td className="  border-2 border-black  whitespace-nowrap  p-0 bg-gray-300 font-bold">
                  <ul>
                    <li className="  flex justify-center font-bold  text-black   p-1  bg-gray-300 ">
                      <input
                        className="p-0 w-16 h-6   text-right "
                        value={allMRSalesTarget
                          .map((item) => {
                            return item.category_result.reduce((acc, curr) => {
                              acc =
                                Number(acc) +
                                Number(curr[Object.keys(curr)[3]]);
                              return acc;
                            }, 0);
                          })
                          .reduce((acc1, curr1) => {
                            acc1 = acc1 + curr1;
                            return acc1;
                          }, 0)
                          ?.toFixed(2)}
                        disabled
                      />
                    </li>
                  </ul>
                </td>
                <td className="  border-2 border-black  whitespace-nowrap  p-0 bg-gray-300 font-bold">
                  <ul>
                    <li className="  flex justify-center font-bold  text-black   p-1  bg-gray-300 ">
                      <input
                        className="p-0 w-16 h-6   text-right "
                        value={allMRSalesTarget
                          .map((item) => {
                            return item.category_result.reduce((acc, curr) => {
                              acc =
                                Number(acc) +
                                Number(curr[Object.keys(curr)[4]]);
                              return acc;
                            }, 0);
                          })
                          .reduce((acc1, curr1) => {
                            acc1 = acc1 + curr1;
                            return acc1;
                          }, 0)
                          ?.toFixed(2)}
                        disabled
                      />
                    </li>
                  </ul>
                </td>
                <td className="  border-2 border-black  whitespace-nowrap  p-0 bg-gray-300 font-bold">
                  <ul>
                    <li className="  flex justify-center font-bold  text-black   p-1  bg-gray-300 ">
                      <input
                        className="p-0 w-16 h-6   text-right "
                        value={allMRSalesTarget
                          .map((item) => {
                            return item.category_result.reduce((acc, curr) => {
                              acc =
                                Number(acc) +
                                Number(curr[Object.keys(curr)[5]]);
                              return acc;
                            }, 0);
                          })
                          .reduce((acc1, curr1) => {
                            acc1 = acc1 + curr1;
                            return acc1;
                          }, 0)
                          ?.toFixed(2)}
                        disabled
                      />
                    </li>
                  </ul>
                </td>
                <td className="  border-2 border-black  whitespace-nowrap  p-0 bg-gray-300 font-bold">
                  <ul>
                    <li className="  flex justify-center font-bold  text-black   p-1  bg-gray-300 ">
                      <input
                        className="p-0 w-16 h-6   text-right "
                        value={
                          allMRSalesTarget
                            .map((item) => {
                              return item.category_result.reduce(
                                (acc, curr) => {
                                  acc =
                                    Number(acc) +
                                    Number(curr[Object.keys(curr)[3]]);
                                  return acc;
                                },
                                0
                              );
                            })
                            .reduce((acc1, curr1) => {
                              acc1 = acc1 + curr1;
                              return acc1;
                            }, 0) +
                          allMRSalesTarget
                            .map((item) => {
                              return item.category_result.reduce(
                                (acc, curr) => {
                                  acc =
                                    Number(acc) +
                                    Number(curr[Object.keys(curr)[4]]);
                                  return acc;
                                },
                                0
                              );
                            })
                            .reduce((acc1, curr1) => {
                              acc1 = acc1 + curr1;
                              return acc1;
                            }, 0) +
                          allMRSalesTarget
                            .map((item) => {
                              return item.category_result.reduce(
                                (acc, curr) => {
                                  acc =
                                    Number(acc) +
                                    Number(curr[Object.keys(curr)[5]]);
                                  return acc;
                                },
                                0
                              );
                            })
                            .reduce((acc1, curr1) => {
                              acc1 = acc1 + curr1;
                              return acc1;
                            }, 0)
                        }
                        disabled
                      />
                    </li>
                  </ul>
                </td>
                <td className="  border-2 border-black  whitespace-nowrap  p-0 bg-gray-300 font-bold">
                  <ul>
                    <li className="  flex justify-center font-bold  text-black   p-1  bg-gray-300 ">
                      <input
                        className="p-0 w-16 h-6   text-right "
                        value={allMRSalesTarget
                          .map((item) => {
                            return item.category_result.reduce((acc, curr) => {
                              acc =
                                Number(acc) +
                                Number(curr[Object.keys(curr)[6]]);
                              return acc;
                            }, 0);
                          })
                          .reduce((acc1, curr1) => {
                            acc1 = acc1 + curr1;
                            return acc1;
                          }, 0)
                          ?.toFixed(2)}
                        disabled
                      />
                    </li>
                  </ul>
                </td>
                <td className="  border-2 border-black  whitespace-nowrap  p-0 bg-gray-300 font-bold">
                  <ul>
                    <li className="  flex justify-center font-bold  text-black   p-1  bg-gray-300 ">
                      <input
                        className="p-0 w-16 h-6   text-right "
                        value={allMRSalesTarget
                          .map((item) => {
                            return item.category_result.reduce((acc, curr) => {
                              acc =
                                Number(acc) +
                                Number(curr[Object.keys(curr)[7]]);
                              return acc;
                            }, 0);
                          })
                          .reduce((acc1, curr1) => {
                            acc1 = acc1 + curr1;
                            return acc1;
                          }, 0)
                          ?.toFixed(2)}
                        disabled
                      />
                    </li>
                  </ul>
                </td>
                <td className="  border-2 border-black  whitespace-nowrap  p-0 bg-gray-300 font-bold">
                  <ul>
                    <li className="  flex justify-center font-bold  text-black   p-1  bg-gray-300 ">
                      <input
                        className="p-0 w-16 h-6   text-right "
                        value={allMRSalesTarget
                          .map((item) => {
                            return item.category_result.reduce((acc, curr) => {
                              acc =
                                Number(acc) +
                                Number(curr[Object.keys(curr)[8]]);
                              return acc;
                            }, 0);
                          })
                          .reduce((acc1, curr1) => {
                            acc1 = acc1 + curr1;
                            return acc1;
                          }, 0)
                          ?.toFixed(2)}
                        disabled
                      />
                    </li>
                  </ul>
                </td>
                <td className="  border-2 border-black  whitespace-nowrap  p-0 bg-gray-300 font-bold">
                  <ul>
                    <li className="  flex justify-center font-bold  text-black   p-1  bg-gray-300 ">
                      <input
                        className="p-0 w-16 h-6   text-right "
                        value={
                          allMRSalesTarget
                            .map((item) => {
                              return item.category_result.reduce(
                                (acc, curr) => {
                                  acc =
                                    Number(acc) +
                                    Number(curr[Object.keys(curr)[6]]);
                                  return acc;
                                },
                                0
                              );
                            })
                            .reduce((acc1, curr1) => {
                              acc1 = acc1 + curr1;
                              return acc1;
                            }, 0) +
                          allMRSalesTarget
                            .map((item) => {
                              return item.category_result.reduce(
                                (acc, curr) => {
                                  acc =
                                    Number(acc) +
                                    Number(curr[Object.keys(curr)[7]]);
                                  return acc;
                                },
                                0
                              );
                            })
                            .reduce((acc1, curr1) => {
                              acc1 = acc1 + curr1;
                              return acc1;
                            }, 0) +
                          allMRSalesTarget
                            .map((item) => {
                              return item.category_result.reduce(
                                (acc, curr) => {
                                  acc =
                                    Number(acc) +
                                    Number(curr[Object.keys(curr)[8]]);
                                  return acc;
                                },
                                0
                              );
                            })
                            .reduce((acc1, curr1) => {
                              acc1 = acc1 + curr1;
                              return acc1;
                            }, 0)
                        }
                        disabled
                      />
                    </li>
                  </ul>
                </td>
                <td className="  border-2 border-black  whitespace-nowrap  p-0 bg-gray-300 font-bold">
                  <ul>
                    <li className="  flex justify-center font-bold  text-black   p-1  bg-gray-300 ">
                      <input
                        className="p-0 w-16 h-6   text-right "
                        value={allMRSalesTarget
                          .map((item) => {
                            return item.category_result.reduce((acc, curr) => {
                              acc =
                                Number(acc) +
                                Number(curr[Object.keys(curr)[9]]);
                              return acc;
                            }, 0);
                          })
                          .reduce((acc1, curr1) => {
                            acc1 = acc1 + curr1;
                            return acc1;
                          }, 0)
                          ?.toFixed(2)}
                        disabled
                      />
                    </li>
                  </ul>
                </td>
                <td className="  border-2 border-black  whitespace-nowrap  p-0 bg-gray-300 font-bold">
                  <ul>
                    <li className="  flex justify-center font-bold  text-black   p-1  bg-gray-300 ">
                      <input
                        className="p-0 w-16 h-6   text-right "
                        value={allMRSalesTarget
                          .map((item) => {
                            return item.category_result.reduce((acc, curr) => {
                              acc =
                                Number(acc) +
                                Number(curr[Object.keys(curr)[10]]);
                              return acc;
                            }, 0);
                          })
                          .reduce((acc1, curr1) => {
                            acc1 = acc1 + curr1;
                            return acc1;
                          }, 0)
                          ?.toFixed(2)}
                        disabled
                      />
                    </li>
                  </ul>
                </td>
                <td className="  border-2 border-black  whitespace-nowrap  p-0 bg-gray-300 font-bold">
                  <ul>
                    <li className="  flex justify-center font-bold  text-black   p-1  bg-gray-300 ">
                      <input
                        className="p-0 w-16 h-6   text-right "
                        value={allMRSalesTarget
                          .map((item) => {
                            return item.category_result.reduce((acc, curr) => {
                              acc =
                                Number(acc) +
                                Number(curr[Object.keys(curr)[11]]);
                              return acc;
                            }, 0);
                          })
                          .reduce((acc1, curr1) => {
                            acc1 = acc1 + curr1;
                            return acc1;
                          }, 0)
                           ?.toFixed(2)}
                        disabled
                      />
                    </li>
                  </ul>
                </td>
                <td className="  border-2 border-black  whitespace-nowrap  p-0 bg-gray-300 font-bold">
                  <ul>
                    <li className="  flex justify-center font-bold  text-black   p-1  bg-gray-300 ">
                      <input
                        className="p-0 w-16 h-6   text-right "
                        value={
                          allMRSalesTarget
                            .map((item) => {
                              return item.category_result.reduce(
                                (acc, curr) => {
                                  acc =
                                    Number(acc) +
                                    Number(curr[Object.keys(curr)[9]]);
                                  return acc;
                                },
                                0
                              );
                            })
                            .reduce((acc1, curr1) => {
                              acc1 = acc1 + curr1;
                              return acc1;
                            }, 0) +
                          allMRSalesTarget
                            .map((item) => {
                              return item.category_result.reduce(
                                (acc, curr) => {
                                  acc =
                                    Number(acc) +
                                    Number(curr[Object.keys(curr)[10]]);
                                  return acc;
                                },
                                0
                              );
                            })
                            .reduce((acc1, curr1) => {
                              acc1 = acc1 + curr1;
                              return acc1;
                            }, 0) +
                            allMRSalesTarget
                            .map((item) => {
                              return item.category_result.reduce(
                                (acc, curr) => {
                                  acc =
                                    Number(acc) +
                                    Number(curr[Object.keys(curr)[11]]);
                                  return acc;
                                },
                                0
                              );
                            })
                            .reduce((acc1, curr1) => {
                              acc1 = acc1 + curr1;
                              return acc1;
                            }, 0)
                        }
                        disabled
                      />
                    </li>
                  </ul>
                </td>
                <td className="  border-2 border-black  whitespace-nowrap  p-0 bg-gray-300 font-bold">
                  <ul>
                    <li className="  flex justify-center font-bold  text-black   p-1  bg-gray-300 ">
                      <input
                        className="p-0 w-16 h-6   text-right "
                        value={allMRSalesTarget
                          .map((item) => {
                            return item.category_result.reduce((acc, curr) => {
                              acc =
                                Number(acc) +
                                Number(curr[Object.keys(curr)[12]]);
                              return acc;
                            }, 0);
                          })
                          .reduce((acc1, curr1) => {
                            acc1 = acc1 + curr1;
                            return acc1;
                          }, 0)
                          ?.toFixed(2)}
                        disabled
                      />
                    </li>
                  </ul>
                </td>
                <td className="  border-2 border-black  whitespace-nowrap  p-0 bg-gray-300 font-bold">
                  <ul>
                    <li className="  flex justify-center font-bold  text-black   p-1  bg-gray-300 ">
                      <input
                        className="p-0 w-16 h-6   text-right "
                        value={allMRSalesTarget
                          .map((item) => {
                            return item.category_result.reduce((acc, curr) => {
                              acc =
                                Number(acc) +
                                Number(curr[Object.keys(curr)[13]]);
                              return acc;
                            }, 0);
                          })
                          .reduce((acc1, curr1) => {
                            acc1 = acc1 + curr1;
                            return acc1;
                          }, 0)
                          ?.toFixed(2)}
                        disabled
                      />
                    </li>
                  </ul>
                </td>
                <td className="  border-2 border-black  whitespace-nowrap  p-0 bg-gray-300 font-bold">
                  <ul>
                    <li className="  flex justify-center font-bold  text-black   p-1  bg-gray-300 ">
                      <input
                        className="p-0 w-16 h-6   text-right "
                        value={allMRSalesTarget
                          .map((item) => {
                            return item.category_result.reduce((acc, curr) => {
                              acc =
                                Number(acc) +
                                Number(curr[Object.keys(curr)[14]]);
                              return acc;
                            }, 0);
                          })
                          .reduce((acc1, curr1) => {
                            acc1 = acc1 + curr1;
                            return acc1;
                          }, 0)
                          ?.toFixed(2)}
                        disabled
                      />
                    </li>
                  </ul>
                </td>
                <td className="  border-2 border-black  whitespace-nowrap  p-0 bg-gray-300 font-bold">
                  <ul>
                    <li className="  flex justify-center font-bold  text-black   p-1  bg-gray-300 ">
                      <input
                        className="p-0 w-16 h-6   text-right "
                        value={
                          allMRSalesTarget
                            .map((item) => {
                              return item.category_result.reduce(
                                (acc, curr) => {
                                  acc =
                                    Number(acc) +
                                    Number(curr[Object.keys(curr)[12]]);
                                  return acc;
                                },
                                0
                              );
                            })
                            .reduce((acc1, curr1) => {
                              acc1 = acc1 + curr1;
                              return acc1;
                            }, 0) +
                          allMRSalesTarget
                            .map((item) => {
                              return item.category_result.reduce(
                                (acc, curr) => {
                                  acc =
                                    Number(acc) +
                                    Number(curr[Object.keys(curr)[13]]);
                                  return acc;
                                },
                                0
                              );
                            })
                            .reduce((acc1, curr1) => {
                              acc1 = acc1 + curr1;
                              return acc1;
                            }, 0) +
                          allMRSalesTarget
                            .map((item) => {
                              return item.category_result.reduce(
                                (acc, curr) => {
                                  acc =
                                    Number(acc) +
                                    Number(curr[Object.keys(curr)[14]]);
                                  return acc;
                                },
                                0
                              );
                            })
                            .reduce((acc1, curr1) => {
                              acc1 = acc1 + curr1;
                              return acc1;
                            }, 0)
                        }
                        disabled
                      />
                    </li>
                  </ul>
                </td>

                <td className="  border-2 border-black  whitespace-nowrap  p-0 bg-gray-300 font-bold">
                  <ul>
                    <li className="  flex justify-center font-bold  text-black   p-1  bg-gray-300 ">
                      <input
                        className="p-0 w-16 h-6   text-right "
                        value={
                          allMRSalesTarget
                            .map((item) => {
                              return item.category_result.reduce(
                                (acc, curr) => {
                                  acc =
                                    Number(acc) +
                                    Number(curr[Object.keys(curr)[3]]);
                                  return acc;
                                },
                                0
                              );
                            })
                            .reduce((acc1, curr1) => {
                              acc1 = acc1 + curr1;
                              return acc1;
                            }, 0) +
                          allMRSalesTarget
                            .map((item) => {
                              return item.category_result.reduce(
                                (acc, curr) => {
                                  acc =
                                    Number(acc) +
                                    Number(curr[Object.keys(curr)[4]]);
                                  return acc;
                                },
                                0
                              );
                            })
                            .reduce((acc1, curr1) => {
                              acc1 = acc1 + curr1;
                              return acc1;
                            }, 0) +
                          allMRSalesTarget
                            .map((item) => {
                              return item.category_result.reduce(
                                (acc, curr) => {
                                  acc =
                                    Number(acc) +
                                    Number(curr[Object.keys(curr)[5]]);
                                  return acc;
                                },
                                0
                              );
                            })
                            .reduce((acc1, curr1) => {
                              acc1 = acc1 + curr1;
                              return acc1;
                            }, 0) +
                          allMRSalesTarget
                            .map((item) => {
                              return item.category_result.reduce(
                                (acc, curr) => {
                                  acc =
                                    Number(acc) +
                                    Number(curr[Object.keys(curr)[6]]);
                                  return acc;
                                },
                                0
                              );
                            })
                            .reduce((acc1, curr1) => {
                              acc1 = acc1 + curr1;
                              return acc1;
                            }, 0) +
                          allMRSalesTarget
                            .map((item) => {
                              return item.category_result.reduce(
                                (acc, curr) => {
                                  acc =
                                    Number(acc) +
                                    Number(curr[Object.keys(curr)[7]]);
                                  return acc;
                                },
                                0
                              );
                            })
                            .reduce((acc1, curr1) => {
                              acc1 = acc1 + curr1;
                              return acc1;
                            }, 0) +
                          allMRSalesTarget
                            .map((item) => {
                              return item.category_result.reduce(
                                (acc, curr) => {
                                  acc =
                                    Number(acc) +
                                    Number(curr[Object.keys(curr)[8]]);
                                  return acc;
                                },
                                0
                              );
                            })
                            .reduce((acc1, curr1) => {
                              acc1 = acc1 + curr1;
                              return acc1;
                            }, 0) +
                          allMRSalesTarget
                            .map((item) => {
                              return item.category_result.reduce(
                                (acc, curr) => {
                                  acc =
                                    Number(acc) +
                                    Number(curr[Object.keys(curr)[9]]);
                                  return acc;
                                },
                                0
                              );
                            })
                            .reduce((acc1, curr1) => {
                              acc1 = acc1 + curr1;
                              return acc1;
                            }, 0) +
                          allMRSalesTarget
                            .map((item) => {
                              return item.category_result.reduce(
                                (acc, curr) => {
                                  acc =
                                    Number(acc) +
                                    Number(curr[Object.keys(curr)[10]]);
                                  return acc;
                                },
                                0
                              );
                            })
                            .reduce((acc1, curr1) => {
                              acc1 = acc1 + curr1;
                              return acc1;
                            }, 0) +
                          allMRSalesTarget
                            .map((item) => {
                              return item.category_result.reduce(
                                (acc, curr) => {
                                  acc =
                                    Number(acc) +
                                    Number(curr[Object.keys(curr)[11]]);
                                  return acc;
                                },
                                0
                              );
                            })
                            .reduce((acc1, curr1) => {
                              acc1 = acc1 + curr1;
                              return acc1;
                            }, 0) +
                          allMRSalesTarget
                            .map((item) => {
                              return item.category_result.reduce(
                                (acc, curr) => {
                                  acc =
                                    Number(acc) +
                                    Number(curr[Object.keys(curr)[12]]);
                                  return acc;
                                },
                                0
                              );
                            })
                            .reduce((acc1, curr1) => {
                              acc1 = acc1 + curr1;
                              return acc1;
                            }, 0) +
                          allMRSalesTarget
                            .map((item) => {
                              return item.category_result.reduce(
                                (acc, curr) => {
                                  acc =
                                    Number(acc) +
                                    Number(curr[Object.keys(curr)[13]]);
                                  return acc;
                                },
                                0
                              );
                            })
                            .reduce((acc1, curr1) => {
                              acc1 = acc1 + curr1;
                              return acc1;
                            }, 0) +
                          allMRSalesTarget
                            .map((item) => {
                              return item.category_result.reduce(
                                (acc, curr) => {
                                  acc =
                                    Number(acc) +
                                    Number(curr[Object.keys(curr)[14]]);
                                  return acc;
                                },
                                0
                              );
                            })
                            .reduce((acc1, curr1) => {
                              acc1 = acc1 + curr1;
                              return acc1;
                            }, 0)
                        }
                        disabled
                      />
                    </li>
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>

          {router.query.type === "Add" || router.query.type === "Edit" ? (
            <div className="flex w-full h-12 gap-4 m-2 ">
              <button
                className="bg-green-500 flex items-center justify-center whitespace-nowrap text-white px-2 py-1.5 rounded-sm h-8 w-16"
                onClick={() => 
                {
                  router.query.type==="Add" ? handleSave():handleEdit()
                }
                  
                  }
              >
                Submit
              </button>
              <button
                onClick={() => {
                  router.push({
                    pathname: "/MR_Portal_Web/NewDealerTarget_Table",
                  });
                }}
                className="bg-red-500 flex items-center justify-center whitespace-nowrap text-white px-2 py-1.5 rounded-sm h-8 w-16"
              >
                Close
              </button>
            </div>
          ) : (
            <div className="h-12"></div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default DealerTarget;
