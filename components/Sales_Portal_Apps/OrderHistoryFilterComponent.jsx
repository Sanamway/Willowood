import React, { useState, useEffect } from "react";
import { url } from "@/constants/url";
import axios from "axios";
import moment from "moment";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { FaSearch } from "react-icons/fa";
import { IoFilterOutline } from "react-icons/io5";
import { Transition, Dialog } from "@headlessui/react";
import { Fragment } from "react";
import { FaFilter } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { setAllOrderInfoData } from "@/utils/allOrderInfoSlice";
import Select from "react-select";
import { TbRubberStampOff } from "react-icons/tb";
import { useSelector } from "react-redux";

const FilterComponent = (props) => {
  const router = useRouter();
  const headers = {
    "Content-Type": "application/json",
    secret: "fsdhfgsfuiweifiowefjewcewcebjw",
  };
  const pageCurrent = useSelector(
    (state) => state.allOrdersInfo.currentpage);
  console.log("")
  const dispatch = useDispatch(); // Access the dispatch function
  const [openModal, setOpenModal] = useState(false)
  const [filterState, setFilterState] = useState(null); // Start with null
  const [localStorageItems, setLocalStorageItems] = useState({ roleId: "" })

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userInfo = JSON.parse(localStorage.getItem("userinfo")) || {};
      const roleId = JSON.parse(window.localStorage.getItem("userinfo"))?.role_id;
      setLocalStorageItems({ roleId: roleId })
      setFilterState({
        from: new Date(moment().startOf("month").format("YYYY-MM-DD")),
        to: new Date(moment().endOf("month").format("YYYY-MM-DD")),
        party: "",
        materialCode: "",
        materialSearch: "",
        depot: "",
        sapOrder: "",
        orderStatus: "",
        bgId: JSON.parse(localStorage.getItem("userinfo"))?.bg_id || "",
        buId: JSON.parse(localStorage.getItem("userinfo"))?.bu_id || "",
        rId: JSON.parse(localStorage.getItem("userinfo"))?.r_id || "",
        zId: JSON.parse(localStorage.getItem("userinfo"))?.z_id || "",
        tId: JSON.parse(localStorage.getItem("userinfo"))?.t_id || "",
      });
    }
  }, []);



  const [bgData, setBgData] = useState([]);

  const getBusinesSegmentInfo = async () => {
    try {
      const respond = await axios.get(`${url}/api/get_business_segment`, {
        headers: headers,
      });
      const apires = await respond.data.data;
      setBgData(
        apires.filter(
          (item) =>
            item.isDeleted === false &&
            Number(item.c_id) ===
            JSON.parse(window.localStorage.getItem("userinfo"))?.c_id
        )
      );
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
    if (!filterState?.bgId) return;
    getBusinessUnitInfo(filterState?.bgId);
  }, [filterState?.bgId]);

  const [zoneData, setAllZoneData] = useState([]);
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
    } catch (error) { }
  };

  useEffect(() => {
    if (!filterState?.bgId || !filterState?.buId) return;
    getAllZoneData(filterState?.bgId, filterState?.buId);
  }, [filterState?.bgId, filterState?.buId]);

  const [regionData, setRegionData] = useState([]);

  const getAllRegionData = async (segmentId, businessUnitId, zoneId) => {
    try {
      const respond = await axios.get(`${url}/api/get_region`, {
        headers: headers,
      });

      const apires = await respond.data.data;

      setRegionData(
        apires
          .filter((item) => Number(item.bg_id) === Number(segmentId))
          .filter((item) => Number(item.bu_id) === Number(businessUnitId))
          .filter((item) => Number(item.z_id) === Number(zoneId))
      );
    } catch (error) { }
  };

  useEffect(() => {
    if (!filterState?.bgId || !filterState?.buId || !filterState?.zId) return;
    getAllRegionData(filterState?.bgId, filterState?.buId, filterState?.zId);
  }, [filterState?.bgId, filterState?.buId, filterState?.zId]);

  const [territoryData, setTerritoryData] = useState([]);

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
      setTerritoryData(
        apires
          .filter((item) => Number(item.bg_id) === Number(segmentId))
          .filter((item) => Number(item.bu_id) === Number(businessUnitId))
          .filter((item) => Number(item.z_id) === Number(zoneId))
          .filter((item) => Number(item.r_id) === Number(regionId))
      );
    } catch (error) { }
  };

  useEffect(() => {
    if (
      !filterState?.bgId ||
      !filterState?.buId ||
      !filterState?.zId ||
      !filterState?.rId
    )
      return;
    getAllTerritoryData(
      filterState?.bgId,
      filterState?.buId,
      filterState?.zId,
      filterState?.rId
    );
  }, [filterState?.bgId, filterState?.buId, filterState?.zId, filterState?.rId]);


  const [depotData, setDepotData] = useState([]);

  const getAllDepotData = async (bgId, buId, zId, rId) => {
    try {
      const respond = await axios.get(`${url}/api/get_dipot`, {
        headers: headers,
        params: {
          bg_id: bgId,
          bu_id: buId,
          z_id: zId,
          r_id: rId,
        },
      });

      const apires = await respond.data.data;
      setDepotData(apires);
    } catch (error) { }
  };

  useEffect(() => {
    getAllDepotData(
      filterState?.bgId,
      filterState?.buId,
      filterState?.zId,
      filterState?.rId
    );
  }, [filterState?.bgId, filterState?.buId, filterState?.zId, filterState?.rId]);

  const [pageSizeNumber, setPageSizeNumber] = useState(25)


  const getOrderList = async () => {


    const {
      from,
      to,
      party,
      materialCode,
      materialSearch,
      depot,
      sapOrder,
      tId,
      rId,
      zId,
      buId,
      bgId,
      orderStatus
    } = filterState;

    let endPoint = "api/get_order_info?c_id=1";

    try {
      const respond = await axios.get(`${url}/${endPoint}`, {
        headers: headers,
        params: {
          from: moment(from).format("YYYY-MM-DD"),
          to: moment(to).format("YYYY-MM-DD") || null,
          t_id: tId || null,
          r_id: rId || null,
          z_id: zId || null,
          bu_id: buId || null,
          bg_id: bgId || null,
          kunnar_sold: party || null,
          depot: depot || null,
          material: materialCode || null,
          mat_name: materialSearch || null,
          SAP_order_no: sapOrder?.value || null,
          ord_status: orderStatus || null

        }
      });

      const apires = { orderInfoData: respond.data.data };

      dispatch(setAllOrderInfoData(apires));

    } catch (error) {
      console.error("Error fetching order data:", error);

      // If an error occurs, set an empty array in Redux state
      dispatch(setAllOrderInfoData([]));
    }
  };



  const [partyOption, setPartyOption] = useState([]);

  const getAllPartyData = async (partyName = "") => {
    console.log("Searching for:", partyName);

    try {
      const { tId, rId, zId, buId, bgId } = filterState;
      const c_id = JSON.parse(localStorage.getItem("userinfo"))?.c_id || null;

      const response = await axios.get(`${url}/api/get_dealer`, {
        params: {
          search: true,
          c_id: 1,
          t_id: tId || null,
          r_id: rId || null,
          z_id: zId || null,
          bu_id: buId || null,
          bg_id: bgId || null,
          party_Name: partyName || null,
        },
        headers,
      });
      console.log("bnm", response.data.data.map((item) => ({
        value: item.SAP_customerSAPNo || "",
        label: item.party_Name || "",
      })))
      const options = response.data.data.map((item) => ({
        value: item.SAP_customerSAPNo || "",
        label: item.party_Name || "",
      }));

      setPartyOption(options);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const [mtrOption, setMtrOption] = useState([]);
  const [mtrNameOption, setMtrNameOption] = useState([]);
  const [sapCodeOption, setSapCodeOption] = useState([]);

  const getAllMtrData = async () => {

    try {
      const { tId, rId, zId, buId, bgId } = filterState;
      const c_id = JSON.parse(localStorage.getItem("userinfo"))?.c_id || null;

      const response = await axios.get(`${url}/api/get_product_material_sku`, {
        params: {

          c_id: 1,
          t_id: tId || null,
          r_id: rId || null,
          z_id: zId || null,
          bu_id: buId || null,
          bg_id: bgId || null,
          list: true,
          matnr: true

        },
        headers,
      });
      const options = response.data.data.map((item) => ({
        value: item.matnr || "",
        label: item.matnr || "",
      }));
      const options2 = response.data.data.map((item) => ({
        value: item.mat_name || "",
        label: item.mat_name || "",
      }));
      console.log("klo", options, response.data.data.map((item) => ({
        value: item.matnr || "",
        label: item.matnr || "",
      })), response.data.data)
      setMtrOption(options);
      setMtrNameOption(options2)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const getAllSapData = async (search) => {
    try {
      const response = await axios.get(`${url}/api/get_order_info`, {
        params: {
          sap_order_list: true,
          SAP_order_no: search
        },
        headers,
      });

      const apires = response.data.data;
      if (Array.isArray(apires)) {
        const formattedOptions = apires
          .map(item => {
            const num = Number(item);
            return !isNaN(num) ? { value: num, label: num.toString() } : null;
          })
          .filter(Boolean);
        setSapCodeOption(formattedOptions);
      } else {

        console.error("API response is not an array:", apires);
        setSapCodeOption([]);

      }


    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Fetch initial data when component mounts
  useEffect(() => {
    getAllMtrData();
  }, [filterState?.tId, filterState?.rId, filterState?.zId, filterState?.buId, filterState?.bgId]); // Add dependencies

  const [pageCount, setPageCount] = useState(0)
  const count = useSelector(
    (state) => state.allOrdersInfo.pageCount
  );
  useEffect(() => {
    setPageCount(count)
  }, [
    count
  ])
  useEffect(() => { if (filterState) getOrderList() }, [props.refresh]);
  useEffect(() => { if (filterState) getOrderList() }, [filterState]);




  const [allOrderInfoDatalength, setAllOrderInfoDataLength] = useState([
  ]);
  console.log("opo", allOrderInfoDatalength)
  const allOrderData = useSelector(
    (state) => state.allOrdersInfo.allOrderInfoData
  );
  useEffect(() => {
    setAllOrderInfoDataLength(allOrderData)
  }, [allOrderData])
  console.log("nop", filterState)



  const [optionsFilter, setOptionsFilter] = useState([])
  const getFilterOptionData = async () => {
    try {
      const respond = await axios.get(`${url}/api/get_order_status_list`, {
        headers: headers,
        params: {

          list: true,

        },
      });
      const apires = await respond.data.data;
      setOptionsFilter(apires);
    } catch (error) { }
  }
  useEffect(() => {

    getFilterOptionData(

    );
  }, []);



  return (

    <div className="flex flex-row gap-2 bg-blue-500 p-2 items-center">

      <div className="flex  flex-col w-16">
        <input
          className=" h-7 px-3 py-1.5 border-[1px] border-gray-400 rounded-md bg-gray-100 focus:outline-none focus:border-b focus:border-indigo-500"
          id="stateSelect"
          disabled
          value={allOrderInfoDatalength?.length || 0}
        />


      </div>
      <div className=" flex flex-col gap-1.5 ">
        <select
          className=" w-full max px-3 py-1.5 border-[1px] border-gray-400 rounded-md bg-gray-100 focus:outline-none focus:border-b focus:border-indigo-500"
          id="stateSelect"
          value={pageSizeNumber}
          onChange={(e) =>
            setPageSizeNumber(e.target.value)
          }
        >
          <option value={25} className="font-bold">
            25
          </option>
          <option value={50} className="font-bold">
            50
          </option>
          <option value={75} className="font-bold">
            75
          </option>
          <option value={100} className="font-bold">
            100
          </option>
        </select>
      </div>
      <div className="w-56 flex flex-col gap-1.5 ">
        <select
          className="w-full px-3 py-1.5 border-[1px] border-gray-400 rounded-md bg-gray-100 focus:outline-none focus:border-b focus:border-indigo-500"
          id="stateSelect"
          onChange={(e) => setFilterState({ ...filterState, orderStatus: e.target.value })}



        >
          <option value={""}>- Option -</option>
          {
            optionsFilter.map((item) => <option value={item.order_status} className="font-bold">
              {
                item.order_status
              }
            </option>)
          }


        </select>
      </div>


      <div className=" flex flex-col gap-1.5 ">
        <FaFilter className="text-white" size={25} onClick={() => setOpenModal(true)} />
      </div>

      <Transition appear show={openModal} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => {
            setOpenModal(false)
          }}

        >
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
                    className="text-[1.78rem] font-bold leading-6 text-center text-gray-900"
                  >
                    Orders Searching
                  </Dialog.Title>
                  <div className="flex gap-4 flex-wrap w-full flex-row justify-around mt-4" >
                    <div className="flex gap- flex-wrap w-full flex-row justify-around">
                      <div className="w-[46%] flex flex-col gap-1.5 ">
                        <label className="text-gray-500 font-bold text-[0.85rem]">From</label>
                        <DatePicker
                          selected={filterState?.from}
                          onChange={(date) => setFilterState({ ...filterState, from: date })}
                          dateFormat="dd/MM/yyyy"

                          className=" w-full max px-3 py-1.5 border-[1px] border-gray-400 rounded-md bg-gray-100 focus:outline-none focus:border-b focus:border-indigo-500"

                        />
                      </div>
                      <div className="w-[46%] flex  flex-col gap-1.5 ">
                        <label className="text-gray-500 font-bold text-[0.85rem]">To</label>
                        <DatePicker
                          selected={filterState?.to}
                          onChange={(date) => setFilterState({ ...filterState, to: date })}
                          dateFormat="dd/MM/yyyy"
                          className=" w-full max px-3 py-1.5 border-[1px] border-gray-400 rounded-md bg-gray-100 focus:outline-none focus:border-b focus:border-indigo-500"


                        />
                      </div>
                    </div>
                    <div className="w-[100%] flex flex-row gap-1.5 ">
                      <label className="w-[40%] text-gray-500 font-bold text-[0.85rem]">Party</label>
                      <Select
                        className="w-full px-3 py-1.5 border-[1px] border-gray-400 rounded-md bg-gray-100 focus:outline-none focus:border-b focus:border-indigo-500"
                        value={partyOption.find(option => option.value === filterState?.party) || null} // Fix here

                        isSearchable={true}
                        isMulti={false}
                        name="party"
                        options={partyOption}
                        placeholder={"Party"}
                        onChange={(selectedOption) => {
                          console.log("pop", selectedOption)
                          setFilterState({ ...filterState, party: selectedOption?.value || null })
                        }}
                        onInputChange={(searchVal) => {
                          if (searchVal.length >= 2) getAllPartyData(searchVal); // Call API only if input length >= 2
                        }}
                      />
                    </div>
                    <div className="w-[100%] flex flex-row gap-1.5 ">
                      <label className="w-[40%] text-gray-500 font-bold text-[0.85rem]">Matrial Code</label>
                      <Select
                        className="w-full px-3 py-1.5 border-[1px] border-gray-400 rounded-md bg-gray-100 focus:outline-none focus:border-b focus:border-indigo-500"
                        value={mtrOption.find(option => option.value === filterState?.materialCode) || null} // Fix here

                        isSearchable={true}
                        isMulti={false}
                        name="M Code"
                        options={mtrOption}
                        placeholder={"Material Code"}
                        onChange={(selectedOption) => {
                          console.log("pop", selectedOption)
                          setFilterState({ ...filterState, materialCode: selectedOption?.value || null })
                        }}

                      />





                    </div>
                    <div className="w-[100%] flex flex-row gap-1.5 ">
                      <label className="w-[40%] text-gray-500 font-bold text-[0.85rem]">Material Search</label>
                      <Select
                        className="w-full px-3 py-1.5 border-[1px] border-gray-400 rounded-md bg-gray-100 focus:outline-none focus:border-b focus:border-indigo-500"
                        value={mtrNameOption.find(option => option.value === filterState?.materialSearch) || null} // Fix here

                        isSearchable={true}
                        isMulti={false}
                        name="Material Search"
                        options={mtrNameOption}
                        placeholder={"Material Search"}
                        onChange={(selectedOption) => {
                          console.log("pop", selectedOption)
                          setFilterState({ ...filterState, materialSearch: selectedOption?.value || null })
                        }}

                      />

                    </div>

                    <div className="w-[100%] flex flex-row gap-1.5 ">
                      <label className="w-[40%] text-gray-500 font-bold text-[0.85rem]">Depot</label>
                      <select
                        className="w-full px-3 py-1.5 border-[1px] border-gray-400 rounded-md bg-gray-100 focus:outline-none focus:border-b focus:border-indigo-500"
                        id="stateSelect"
                        value={filterState?.depot}
                        onChange={(e) =>
                          setFilterState({
                            ...filterState,
                            depot: e.target.value,

                          })
                        }

                      >
                        <option value={""}>- Depot -</option>

                        {depotData.map((item, idx) => (
                          <option value={item.w_id} key={idx}>
                            {item.depot_name}
                          </option>
                        ))}
                      </select>
                    </div>






                    <div className="w-[100%] flex flex-row gap-1.5 ">
                      <label className="w-[40%] text-gray-500 font-bold text-[0.85rem]">SAP Order No</label>
                      <Select
                        className="w-full px-3 py-1.5 border-[1px] border-gray-400 rounded-md bg-gray-100 focus:outline-none focus:border-b focus:border-indigo-500"
                        value={filterState?.sapOrder || ""}
                        isSearchable={true}
                        isMulti={false}
                        options={sapCodeOption}
                        placeholder={"SAP Code"}
                        onInputChange={(searchValue, { action }) => {
                          if (action === "input-change") {
                            getAllSapData(searchValue); // Call API when user types
                          }
                        }}
                        onChange={(selectedOption) => {
                          setFilterState({ ...filterState, sapOrder: selectedOption });
                        }}
                      />





                    </div>


                    <div className="w-[100%] flex flex-row gap-1.5 ">
                      <label className="w-[40%] text-gray-500 font-bold text-[0.85rem]">Teritory</label>
                      <select
                        className="w-full px-3 py-1.5 border-[1px] border-gray-400 rounded-md bg-gray-100 focus:outline-none focus:border-b focus:border-indigo-500"
                        id="stateSelect"
                        value={filterState?.tId}
                        disabled={
                          localStorageItems.roleId === 11 || localStorageItems.roleId === 6
                        }
                        onChange={(e) =>
                          setFilterState({
                            ...filterState,
                            tId: e.target.value,
                          })
                        }
                      >
                        <option value={""}>- Territory -</option>
                        {territoryData.map((item, idx) => (
                          <option value={item.t_id} key={idx}>
                            {item.territory_name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="w-[100%] flex flex-row gap-1.5 ">
                      <label className="w-[40%] text-gray-500 font-bold text-[0.85rem]">Region</label>
                      <select
                        className="w-full px-3 py-1.5 border-[1px] border-gray-400 rounded-md bg-gray-100 focus:outline-none focus:border-b focus:border-indigo-500"
                        id="stateSelect"
                        value={filterState?.rId}
                        disabled={
                          localStorageItems.roleId === 6 || localStorageItems.roleId === 5
                        }
                        onChange={(e) =>
                          setFilterState({
                            ...filterState,
                            rId: e.target.value,
                            tId: '',
                          })
                        }
                      >
                        <option value={""}>- Region -</option>
                        {regionData.map((item, idx) => (
                          <option value={item.r_id} key={idx}>
                            {item.region_name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="w-[100%] flex flex-row gap-1.5 ">
                      <label className="w-[40%] text-gray-500 font-bold text-[0.85rem]">Zone</label>
                      <select
                        className="w-full px-3 py-1.5 border-[1px] border-gray-400 rounded-md bg-gray-100 focus:outline-none focus:border-b focus:border-indigo-500"
                        id="stateSelect"
                        value={filterState?.zId}
                        onChange={(e) =>
                          setFilterState({
                            ...filterState,
                            zId: e.target.value,
                            rId: '',
                            tId: '',
                          })
                        }
                        disabled={
                          localStorageItems.roleId === 6 ||
                          localStorageItems.roleId === 5 ||
                          localStorageItems.roleId === 4
                        }
                      >
                        <option value={""}>- Zone -</option>
                        {zoneData.map((item, idx) => (
                          <option value={item.z_id} key={idx}>
                            {item.zone_name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="w-[100%] flex flex-row gap-1.5 ">
                      <label className="w-[40%] text-gray-500 font-bold text-[0.85rem]">Business unit</label>
                      <select
                        className="w-full px-3 py-1.5 border-[1px] border-gray-400 rounded-md bg-gray-100 focus:outline-none focus:border-b focus:border-indigo-500"
                        id="stateSelect"
                        value={filterState?.buId}
                        onChange={(e) =>
                          setFilterState({
                            ...filterState,
                            buId: e.target.value,

                            zId: '',
                            rId: '',
                            tId: '',
                          })
                        }
                        disabled={
                          localStorageItems.roleId === 6 ||
                          localStorageItems.roleId === 5 ||
                          localStorageItems.roleId === 4 ||
                          localStorageItems.roleId === 3
                        }

                      >
                        <option value={""}>- Business Unit -</option>
                        {buData.map((item, idx) => (
                          <option value={item.bu_id} key={idx}>
                            {item.business_unit_name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="w-[100%] flex flex-row gap-1.5 ">
                      <label className="w-[40%] text-gray-500 font-bold text-[0.85rem]">Business Segment</label>
                      <select
                        className="w-full px-3 py-1.5 border-[1px] border-gray-400 rounded-md bg-gray-100 focus:outline-none focus:border-b focus:border-indigo-500"
                        id="stateSelect"
                        value={filterState?.bgId}
                        onChange={(e) =>
                          setFilterState({
                            ...filterState,
                            bgId: e.target.value,
                            buId: '',
                            zId: '',
                            rId: '',
                            tId: '',
                          })
                        }
                        disabled={
                          localStorageItems.roleId === 6 ||
                          localStorageItems.roleId === 5 ||
                          localStorageItems.roleId === 4 ||
                          localStorageItems.roleId === 3 ||
                          localStorageItems.roleId === 10
                        }

                      >
                        <option value={""}>- Business Segment -</option>

                        {bgData.map((item, idx) => (
                          <option value={item.bg_id} key={idx}>
                            {item.business_segment}
                          </option>
                        ))}
                      </select>
                    </div>










                  </div>


                  <div className="mt-4 flex items-center justify-center gap-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => getOrderList()}
                    >
                      Search
                    </button>

                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => {
                        setOpenModal(false)
                      }}
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
    </div>

  );
};

export default FilterComponent;
