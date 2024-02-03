import React, { useState, useEffect } from "react";

const FilterComponent = () => {
  const [filterState, setFilterState] = useState({});
  return (
    <>
      <div className="flex gap-4 w-full flex-col lg:flex-row ">
        <div className="w-full flex flex-col gap-1.5 ">
          <label className="text-gray-500 font-bold text-[0.85rem]">Date Range</label>
          <select
            className=" w-full max px-3 py-1.5 border-[1px] border-gray-400 rounded-md bg-gray-100 focus:outline-none focus:border-b focus:border-indigo-500"
            id="stateSelect"
            value={filterState.yr}
            onChange={(e) =>
              setFilterState({
                ...filterState,
                yr: e.target.value
              })
            }
            disabled={!filterState.yr}
          >
            <option value="All" className="font-bold" disabled={true}>
              -- Select --
            </option>
            {/* {allYearData.map((item, idx) => (
              <option value={item} key={idx}>
                {item}
              </option>
            ))} */}
          </select>
        </div>
        <div className="w-full flex flex-col gap-1.5 ">
          <label className="text-gray-500 font-bold text-[0.85rem]">Select Brand</label>
        <select
          className=" w-full max px-3 py-1.5 border-[1px] border-gray-400 rounded-md bg-gray-100 focus:outline-none focus:border-b focus:border-indigo-500"
          id="stateSelect"
          value={filterState.month}
          onChange={(e) =>
            setFilterState({
              ...filterState,
              month: e.target.value
            })
          }
          disabled={!filterState.yr}
        >
          <option value="All" className="font-bold">
            All
          </option>
          {/* {allMonthData.map((item, idx) => (
              <option value={item.m_year} key={idx}>
                {moment(item.m_year).format("MMM YYYY")}
              </option>
            ))} */}
        </select>
        </div>
        <div className="w-full flex flex-col gap-1.5 ">
          <label className="text-gray-500 font-bold text-[0.85rem]">Select Region</label>
        <select
          className=" w-full max px-3 py-1.5 border-[1px] border-gray-400 rounded-md bg-gray-100 focus:outline-none focus:border-b focus:border-indigo-500"
          id="stateSelect"
          value={filterState.bgId}
          onChange={(e) =>
            setFilterState({
              ...filterState,
              bgId: e.target.value,
              buId: null,
              zId: null,
              rId: null,
              tId: null
            })
          }
          // disabled={
          //   localStorageItems.roleId === 6 ||
          //   localStorageItems.roleId === 5 ||
          //   localStorageItems.roleId === 4 ||
          //   localStorageItems.roleId === 3 ||
          //   localStorageItems.roleId === 10
          // }
        >
          <option value={""} className="font-bold">
            - Business Segment -
          </option>
          <option value={"All"}>All Segment</option>
          {/* {bgData.map((item, idx) => (
              <option value={item.bg_id} key={idx}>
                {item.business_segment}
              </option>
            ))} */}
        </select>
        </div>
        <div className="w-full flex flex-col gap-1.5 ">
          <label className="text-gray-500 font-bold text-[0.85rem]">Region</label>
        <select
          className="w-full px-3 py-1.5 border-[1px] border-gray-400 rounded-md bg-gray-100 focus:outline-none focus:border-b focus:border-indigo-500"
          id="stateSelect"
          value={filterState.buId}
          onChange={(e) =>
            setFilterState({
              ...filterState,
              buId: e.target.value,

              zId: "",
              rId: "",
              tId: ""
            })
          }
          // disabled={
          //   localStorageItems.roleId === 6 ||
          //   localStorageItems.roleId === 5 ||
          //   localStorageItems.roleId === 4 ||
          //   localStorageItems.roleId === 3
          // }
        >
          <option value={""}>- Business Unit -</option>
          <option value={"All"}>All Unit</option>
          {/* {buData.map((item, idx) => (
              <option value={item.bu_id} key={idx}>
                {item.business_unit_name}
              </option>
            ))} */}
        </select>
        </div>
        <div className="w-full flex flex-col gap-1.5 ">
          <label className="text-gray-500 font-bold text-[0.85rem]">Category</label>
        <select
          className="w-full px-3 py-1.5 border-[1px] border-gray-400 rounded-md bg-gray-100 focus:outline-none focus:border-b focus:border-indigo-500"
          id="stateSelect"
          value={filterState.zId}
          onChange={(e) =>
            setFilterState({
              ...filterState,
              zId: e.target.value,
              rId: "",
              tId: ""
            })
          }
          // disabled={
          //   localStorageItems.roleId === 6 ||
          //   localStorageItems.roleId === 5 ||
          //   localStorageItems.roleId === 4
          // }
        >
          <option value={""}>- Zone -</option>
          <option value={"All"}>All Zone</option>
          {/* {zoneData.map((item, idx) => (
              <option value={item.z_id} key={idx}>
                {item.zone_name}
              </option>
            ))} */}
        </select>
            </div>
            <div className="w-full flex flex-col gap-1.5 ">
          <label className="text-gray-500 font-bold text-[0.85rem]">Customer</label>
        <select
          className="w-full px-3 py-1.5 border-[1px] border-gray-400 rounded-md bg-gray-100 focus:outline-none focus:border-b focus:border-indigo-500"
          id="stateSelect"
          value={filterState.rId}
          // disabled={localStorageItems.roleId === 6 || localStorageItems.roleId === 5}
          onChange={(e) =>
            setFilterState({
              ...filterState,
              rId: e.target.value,
              tId: ""
            })
          }
        >
          <option value={""}>- Region -</option>
          <option value={"All"}>All Region</option>
          {/* {regionData.map((item, idx) => (
              <option value={item.r_id} key={idx}>
                {item.region_name}
              </option>
            ))} */}
        </select>
        </div>
        <div className="w-full flex flex-col gap-1.5 ">
          <label className="text-gray-500 font-bold text-[0.85rem]">Product</label>
        <select
          className="w-full px-3 py-1.5 border-[1px] border-gray-400 rounded-md bg-gray-100 focus:outline-none focus:border-b focus:border-indigo-500"
          id="stateSelect"
          value={filterState.tId}
          // disabled={localStorageItems.roleId === 6}
          onChange={(e) =>
            setFilterState({
              ...filterState,
              tId: e.target.value
            })
          }
        >
          <option value={""}>- Territory -</option>
          <option value="All">All Territory</option>
          {/* {territoryData.map((item, idx) => (
              <option value={item.t_id} key={idx}>
                {item.territory_name}
              </option>
            ))} */}
        </select>
        </div>
      </div>
    </>
  );
};

export default FilterComponent;
