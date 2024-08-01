import React, { useState, useEffect } from "react";
import Layout from "@/components/Layout1";

import { useRouter } from "next/router";
import { url } from "@/constants/url";
import axios from "axios";

import toast, { Toaster } from "react-hot-toast";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const NewDealer = () => {
  const csvHeaders = [
    { label: "Id", key: "ds_id" },
    { label: "District", key: "district_name" },
    { label: "Territory", key: "territory_name" },
    { label: "Region", key: "region_name" },
    { label: "Zone", key: "zone_name" },
    { label: "Unit Division", key: "business_unit_name" },
    { label: "Business Segment", key: "bg_id" },
    { label: "Company", key: "cmpny_name" },
    { label: "Status", key: "isDeleted" },
  ];

  const headers = {
    "Content-Type": "application/json",
    secret: "fsdhfgsfuiweifiowefjewcewcebjw",
  };
  const router = useRouter();

  const [selectedYr, setSelectedYr] = useState(false);

  const [allDealer, setAllDealer] = useState([]);
  const getAllDealerData = async () => {
    let data;
    if (router.query.type !== "Add") {
      data = {
        c_id: JSON.parse(window.localStorage.getItem("userinfo")).c_id,
        t_id: filterState.tId,
        t_des: router.query.tDes,
        year: new Date(selectedYr).getFullYear(),
        emp_code: router.query.empCode,
        edit: true,
      };
    } else {
      data = {
        c_id: JSON.parse(window.localStorage.getItem("userinfo")).c_id,
        t_id: filterState.tId,
        emp_code: filterState.empCode,
        t_des:
          allTerritoryData.filter(
            (item) => Number(item.t_id) === Number(filterState.tId)
          )[0]?.territory_name || null,
        year: new Date(selectedYr).getFullYear(),
        add: true,
      };
    }
    try {
      const respond = await axios.get(`${url}/api/get_mr_dealer_sales`, {
        headers: headers,
        params: data,
      });

      const apires = await respond.data.data;
      if (router.query.type !== "Add") {
        setAllDealer(
          apires.map((item) => {
            return {
              ...item,
              selected: item.is_mapped === "true" ? true : false,
            };
          })
        );
      } else {
        setAllDealer(
          apires.map((item) => {
            return { ...item, selected: false };
          })
        );
      }
    } catch (error) {}
  };

  useEffect(() => {
    if (router.query.type !== "Add") {
      setSelectedYr(new Date(router.query.yr));
    } else {
      return;
    }
  }, [router.query.type]);

  const handleSave = async () => {
    if (allDealer?.filter((el) => el.selected === true).length) {
      try {
        let endPoint = "api/add_mr_dealer_map";
        let params;

        if (router.query.type === "Add") {
          endPoint = "api/add_mr_dealer_map";
        } else {
          endPoint = "api/update_mr_dealer_map";
          params = {
            emp_code: filterState.empCode,
            year: selectedYr.getFullYear(),
          };
        }

        const data =
          router.query.type !== "Add"
            ? allDealer
                ?.filter((el) => el.selected === true)
                .map((item, idx) => {
                  return {
                    t_id: filterState.tId,
                    c_id: JSON.parse(window.localStorage.getItem("userinfo"))
                      .c_id,
                    bg_id: filterState.bgId,
                    bu_id: filterState.buId,
                    r_id: filterState.rId,
                    z_id: filterState.zId,
                    year: selectedYr.getFullYear(),
                    customer_code: Number(item.party_code),
                    checked: item.selected,
                    party_name: item.distribution_name,
                    emp_code: filterState.empCode,
                  };
                })
            : allDealer
                ?.filter((el) => el.selected === true)
                .map((item, idx) => {
                  return {
                    t_id: filterState.tId,
                    c_id: JSON.parse(window.localStorage.getItem("userinfo"))
                      .c_id,
                    bg_id: filterState.bgId,
                    bu_id: filterState.buId,
                    r_id: filterState.rId,
                    z_id: filterState.zId,
                    year: selectedYr.getFullYear(),
                    customer_code: Number(item.party_code),
                    emp_code:
                      router.query.type !== "Add"
                        ? router.query.empCode
                        : filterState.empCode,
                  };
                });

        const respond = await axios
          .post(`${url}/${endPoint}`, JSON.stringify({ data: data }), {
            headers: headers,
            params: params,
          })
          .then((res) => {
            if (!res) return;
            toast.success(res.data.message);
            router.push({
              pathname: "/MR_Portal_Web/Mr_Dealer_Map_Table",
            });
          });
      } catch (errors) {
        const errorMessage = errors?.response?.data?.message;

        toast.error(errorMessage);
        if (!errorMessage) return;
      }
    } else {
      toast.error("please select atleast 1 party");
    }
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
  useEffect(() => {
    // const roleId = JSON.parse(window.localStorage.getItem("userinfo"))?.role_id;
    const roleId = 6;
    let filterState = {
      bgId: "All",
      buId: "All",
      zId: "All",
      rId: "All",
      tId: "All",
    };
    if (router.query.type === "Add") {
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
          });
          setFilterState(filterState);

          break;
      }
    } else {
      filterState = {
        cId: router.query.cId,
        bgId: router.query.bgId,
        buId: router.query.buId,
        rId: router.query.rId,
        zId: router.query.zId,
        tId: router.query.tId,
        empCode: router.query.empCode,
      };
      setLocalStorageItems({
        cId: router.query.cId,
        bgId: router.query.bgId,
        buId: router.query.buId,
        rId: router.query.rId,
        zId: router.query.zId,
        tId: router.query.tId,
      });

      setFilterState(filterState);
    }
  }, [router.query.type]);
  console.log("zxs", filterState);
  useEffect(() => {
    if (selectedYr && filterState.tId) {
      getAllDealerData();
    } else {
      toast.error("Year and Teritory");
    }
  }, [selectedYr, filterState.tId, filterState.empCode]);

  return (
    <Layout>
      <div className="absolute h-full w-full overflow-x-auto no-scrollbar mx-4">
        <Toaster position="bottom-center" reverseOrder={false} />
        <div className="text-black flex items-center justify-between bg-white max-w-full font-arial  ">
          <h2 className="font-arial font-normal text-3xl  py-2 pl-4">
            M.R. Dealer Mapping
          </h2>
        </div>
        <div className="flex flex-row gap-4  px-4 pr-8 pb-2">
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
              localStorageItems.roleId === 10 ||
              router.query.type !== "Add"
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
              localStorageItems.roleId === 3 ||
              router.query.type !== "Add"
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
              localStorageItems.roleId === 4 ||
              router.query.type !== "Add"
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
              localStorageItems.roleId === 6 ||
              localStorageItems.roleId === 5 ||
              router.query.type !== "Add"
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
            disabled={
              localStorageItems.roleId === 6 || router.query.type !== "Add"
            }
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
          {router.query.type !== "Add" ? (
            <input
              id="attendanceType"
              className="border rounded px-2 py-1  w-1/2 h-8"
              disabled={router.query.type !== "Add"}
              value={router.query.empName}
            />
          ) : (
            <select
              id="attendanceType"
              className="border rounded px-2 py-1  w-1/2 h-8"
              value={filterState.empCode}
              disabled={router.query.type !== "Add"}
              onChange={(e) =>
                setFilterState({
                  ...filterState,
                  empCode: e.target.value,
                })
              }
            >
              <option value={""}>M.R. Executive</option>

              {allEmployee.map((item) => (
                <option value={item.empcode}>
                  {item.fname} {item.mname} {item.lname} {item.empcode}
                </option>
              ))}
            </select>
          )}

          <DatePicker
            className="border rounded px-2 py-1  w-32 h-8"
            showYearDropdown
            dateFormat="yyyy"
            placeholderText="Year"
            yearDropdownItemNumber={15} // Uncommented and provided a value
            selected={selectedYr}
            onChange={(date) => setSelectedYr(date)}
            hand
            showYearPicker
            minDate={new Date(new Date().getFullYear(), 0, 1)}
            disabled={router.query.type !== "Add"}
            //   disabled={router.query.type !== "Add"}
          />
        </div>

        {allDealer.length ? (
          <div className="flex flex-row px-4  py-2 gap-5 w-full">
            <div className="flex flex-row gap-2 justify-start items-center">
              <input
                type="checkbox"
                disabled={router.query.type === "View"}
                checked={
                  !allDealer.map((item) => item.selected).includes(false)
                }
                onClick={() => {
                  setAllDealer(
                    allDealer.map((item) => {
                      return { ...item, selected: true };
                    })
                  );
                }}
              />
              <span className="text-sm">Select All</span>
            </div>{" "}
            <div className="flex flex-row gap-2 justify-start items-center">
              <input
                type="checkbox"
                disabled={router.query.type === "View"}
                checked={!allDealer.map((item) => item.selected).includes(true)}
                onClick={() => {
                  setAllDealer(
                    allDealer.map((item) => {
                      return { ...item, selected: false };
                    })
                  );
                }}
              />
              <span className="text-sm">Deselect All</span>
            </div>{" "}
          </div>
        ) : (
          <div className="flex flex-row px-4  py-2 gap-5 w-full">
            <div className="flex flex-row gap-2 justify-start items-center">
              <input
                type="checkbox"
                disabled={router.query.type === "View"}
                checked={false}
              />
              <span className="text-sm">Select All</span>
            </div>{" "}
            <div className="flex flex-row gap-2 justify-start items-center">
              <input
                type="checkbox"
                disabled={router.query.type === "View"}
                checked={false}
              />
              <span className="text-sm">Deselect All</span>
            </div>{" "}
          </div>
        )}

        <div className="bg-white h-max flex flex-col gap-2  select-none items-start justify-between w-full absolute p-2 ">
          <table className="min-w-[98%] divide-y border- divide-gray-200  h-min">
            <thead className="border-b">
              <tr className="bg-gray-50 font-arial ">
                <th className="px-4  py-2  text-left dark:border-2  text-xs font-medium text-gray-500    ">
                  Action
                </th>
                <th className="px-4 py-2 text-left dark:border-2  text-xs font-medium text-gray-500   tracking-wider whitespace-nowrap ">
                  Party Code
                </th>
                <th className="px-4 py-2 text-left dark:border-2   text-xs font-medium text-gray-500  tracking-wider ">
                  Party Name
                </th>
                <th className=" py-2 px-4  text-left dark:border-2  text-xs font-medium text-gray-500  tracking-wider ">
                  Address
                </th>
                <th className=" py-2 px-4  text-right dark:border-2  text-xs font-medium text-gray-500  tracking-wider ">
                  Sale FY{" "}
                  {selectedYr ? (
                    <div>
                      {String(selectedYr.getFullYear() - 1).slice(-2) +
                        "-" +
                        String(selectedYr.getFullYear()).slice(-2)}
                    </div>
                  ) : (
                    "-"
                  )}{" "}
                </th>
                <th className=" py-2 text-right dark:border-2 text-xs  font-medium text-gray-500  tracking-wider ">
                  Sale FY
                  {selectedYr ? (
                    <div>
                      {String(selectedYr.getFullYear() - 2).slice(-2) +
                        "-" +
                        String(selectedYr.getFullYear() - 1).slice(-2)}
                    </div>
                  ) : (
                    "-"
                  )}{" "}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y  divide-gray-200 text-xs ">
              {allDealer.map((item, idx) => (
                <tr className="dark:border-2 w-100" key={idx}>
                  <td className="px-4  text-left dark:border-2    whitespace-nowrap font-arial text-xs font-bold">
                    <input
                      type="checkbox"
                      disabled={router.query.type === "View"}
                      className="w-4"
                      checked={item.selected}
                      onChange={() => {
                        setAllDealer(
                          allDealer.map((el) =>
                            el.party_code === item.party_code
                              ? { ...el, selected: !el.selected }
                              : el
                          )
                        );
                      }}
                    />
                  </td>

                  <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                    {item.party_code}
                  </td>
                  <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                    {item.distribution_name}
                  </td>
                  <td className=" py-2  dark:border-2 ">{item.address}</td>

                  <td className="px-4 py-2 dark:border-2  text-right whitespace-nowrap">
                    {item.fy_result.fy_1}
                  </td>
                  <td className=" py-2 dark:border-2    text-right whitespace-nowrap">
                    {item.fy_result.fy_2}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {router.query.type === "View" ? (
            <div className="flex w-full h-8 gap-4 mb-4 "></div>
          ) : (
            <div className="flex w-full h-8 gap-4 mb-4 ">
              <button
                className="bg-green-500 flex items-center justify-center whitespace-nowrap  px-2 py-1.5 rounded-sm h-8"
                onClick={() => handleSave()}
              >
                Submit
              </button>
              <button
                onClick={() => {
                  router.push({
                    pathname: "/MR_Portal_Web/Mr_Dealer_Map_Table",
                  });
                }}
                className="bg-red-500 flex items-center justify-center whitespace-nowrap  px-2 py-1.5 rounded-sm h-8"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default NewDealer;
