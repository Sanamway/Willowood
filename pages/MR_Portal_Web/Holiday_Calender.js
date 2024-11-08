import React, { useState, useEffect, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { AiTwotoneHome } from "react-icons/ai";
import { useRouter } from "next/router";
import { url } from "@/constants/url";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Layout from "@/components/Layout1";
import { MdDelete } from "react-icons/md";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


 const HolidayCalender = () => {
  const router = useRouter();

  const headers = {
    "Content-Type": "application/json",
    secret: "fsdhfgsfuiweifiowefjewcewcebjw",
  };

  const [calenderType, setCalenderType] = useState("Holiday");
  const [weekType, setWeekType] = useState("");
  const [filterState, setFilterState] = useState({
    year: "",
    cId: null,
    bgId: null,
    buId: null,
    rId: null,
    zId: null,
  
  });
  const [allCompanyInfo, setAllCompanyInfo] = useState([]);
  const getCompanyInfo = async () => {
    try {
      const respond = await axios.get(`${url}/api/get_company_information`, {
        headers: headers,
      });
      const apires = await respond.data.data;
      setAllCompanyInfo(apires);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCompanyInfo();
  }, []);
  const [bgData, setBgData] = useState([]);

  const getBusinesSegmentInfo = async () => {
    try {
      const respond = await axios.get(`${url}/api/get_business_segment`, {
        headers: headers,
      });
      const apires = await respond.data.data;
      setBgData(
        apires.filter((item) => {
          return item.isDeleted === false;
        })
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
    if (!filterState.bgId) return;
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

  const getAllHoliday = async (year, cId, bgId, buId, zId, rId) => {
    try {
      const respond = await axios.get(`${url}/api/holiday_list`, {
        headers: headers,
        params: {
          bu_id: buId,
          c_id:  cId,
          bg_id: bgId,
          z_id:  zId,
          r_id:  rId,
          year: year,
          type: "Holiday",
        },
      });
      const apires = await respond.data.data;
      setTableData(
        apires.map((item, idx) => {
          return {
            id: idx,
            holidayName: item.holiday_name,
            day: item.holiday_date,
            date: item.holiday_date,
            type: item.holiday_type,
            buId: item.bu_id,
            bgId: item.bg_id,
            zId:item.z_id,
            rId:item.r_id,
            cId: item.c_id,
          };
        })
      );
    } catch (error) {
      setTableData([])
    }
  };

  const getWeeklyOff = async (year, cId, bgId, buId, zId, rId, woType) => {
    try {
      const respond = await axios.get(`${url}/api/holiday_list`, {
        headers: headers,
        params: {
          bu_id: buId,
          c_id: cId,
          bg_id: bgId,
          z_id:zId,
          r_id:rId,          
          year: year,
          type: "WO",
          wotype: woType,
        },
      });
      const apires = await respond.data.data;
      setWoData(
        apires.map((item, idx) => {
          return {
            id: idx,
            holidayName: item.holiday_name,
            day: item.holiday_date,
            date: item.holiday_date,
            type: item.holiday_type,
            buId: item.bu_id,
            bgId: item.bg_id,
            zId:  item.z_id,
            rId:  item.r_id,
            cId:  item.c_id,
            type:"WO",         
          };
        })
      );
      console.log("aqw",apires[0].wotype)
      setWeekType(apires[0].wotype)
    } catch (error) {
      setWoData([])
    }
  };

  useEffect(() => {
   
   
     setWeekType("") 
      getWeeklyOff(
        filterState.year,
        filterState.cId,
        filterState.bgId,
        filterState.buId,
        filterState.zId,
        filterState.rId,
      
        );
        getAllHoliday(
          filterState.year,
          filterState.cId,
          filterState.bgId,
          filterState.buId,
          filterState.zId,
          filterState.rId,
        );  
  }, [
    filterState.year,
    filterState.cId,
    filterState.bgId,
    filterState.buId,
    filterState.zId,
    filterState.rId,
  ]);
  
  useEffect(() => {
    getWeeklyOff(
      filterState.year,
      filterState.cId,
      filterState.bgId,
      filterState.buId,
      filterState.zId,
      filterState.rId,
      weekType,
      );
}, [
  weekType,
]);



 
  const [tableData, setTableData] = useState([]);

  const [woData, setWoData] = useState([]);

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const updatedData = [...tableData];
    console.log("jhui",[...tableData],name , value,event )
    updatedData[index][name] = value;
  
    setTableData(updatedData);
  };
  const handleNewInputChange = (index, event) => {
    const { name, value } = event.target;
    const updatedData = [...woData];
    console.log("jhui",[...woData],name , value,event )
    updatedData[index][name] = value;
  
    setWoData(updatedData);
  };

  const handleDateChange = (index, date) => {
    const updatedData = [...tableData];

    updatedData[index].date = date;
    updatedData[index].day = date;
    setTableData(updatedData);
  };

  const handleAddRow = () => {
    setTableData([
      ...tableData,
      {
        holidayName: "",
        day: "",
        date: "",
        type: "Fixed Holiday",
        buId: Number(filterState.buId),
        bgId: Number(filterState.bgId),
        cId: Number(filterState.cId),
        zId: Number(filterState.zId),
        rId: Number(filterState.rId)
      
      },
    ]);
  };

  const handleAdd = async () => {
    if (!weekType || !tableData.length) {
      if (!weekType) toast.error("Select Type on Weekly Off Tab");
      else if (!tableData.length) toast.error("Add Data in Holiday Calender");
      return;
    }
    handleAddHoliday();
    handleAddWO();
  };

  const handleAddHoliday = async () => {
    try {
      const allData = tableData.map((item) => {
        return {
          holiday_name: item.holidayName,
          holiday_date: item.date,
          day: moment(item.date).format("dddd"),
          holiday_type: item.type,
          bu_id: filterState.buId,
          c_id:  filterState.cId,
          bg_id: filterState.bgId,
          r_id:  filterState.rId,
          z_id:  filterState.zId,
          type:  "Holiday",
          year: Number(filterState.year),
        };
      });

      const respond = await axios
        .post(`${url}/api/add_holiday_list`, JSON.stringify(allData), {
          headers: headers,
          params: {
            bu_id: filterState.buId,
            c_id:  filterState.cId,
            bg_id: filterState.bgId,
            r_id:  filterState.rId,
            z_id:  filterState.zId,
            year:  filterState.year,
            type: "Holiday",
            update: true,
          },
        })
        .then((res) => {
          toast.success("Holiday Calender Saved");
          getAllHoliday(
            filterState.year,
            filterState.cId,
            filterState.bgId,
            filterState.buId,
            filterState.zId,
            filterState.rId, 
          );
        });

      const apires = await respond.data.data;
    } catch (error) {
      const errMsg = error?.response?.data.message;
      if (!errMsg) return;
      toast.error(errMsg);
    }
  };

  const handleAddWO = async () => {
    try {
      const allData = woData.map((item) => {
        return {
          holiday_name: item.holidayName,
          holiday_date: item.date,
          day: moment(item.date).format("dddd"),
          type: item.type,
          bu_id: filterState.buId,
          c_id:  filterState.cId,
          bg_id: filterState.bgId,
          r_id:  filterState.rId,
          z_id:  filterState.zId,
          year: Number(filterState.year),
          wotype:weekType,
        };
      });
      const respond = await axios
        .post(`${url}/api/add_holiday_list`, JSON.stringify(allData), {
          headers: headers,
          params: {
            bu_id: filterState.buId,
            c_id: filterState.cId,
            bg_id: filterState.bgId,
            z_id:filterState.zId,
            r_id:filterState.rId,
            year: filterState.year,
            type: "WO",
            wotype:weekType,
            update: true,
          },
        })

        .then((res) => {
          toast.success("Weekly Off Saved");
          getWeeklyOff(
             filterState.year,
    filterState.cId,
    filterState.bgId,
    filterState.buId,
    filterState.zId,
    filterState.rId,
     weekType
          );
        });

      const apires = await respond.data.data;
    } catch (error) {
      const errMsg = error?.response?.data.message;

      if (!errMsg) return;
      toast.error(errMsg);
    }
  };
  const handleDelete = () => {
    setConfirmationModal({
      show: false,
      id: "",
    });
    setWoData(woData.filter((item) => confirmationModal.id !== item.id));
  };

  const [confirmationModal, setConfirmationModal] = useState({
    show: false,
    id: "",
  });
  const { name } = router.query;
  return (
    <Layout>
      <div className=" overflow-auto w-full ">
        <Toaster position="bottom-center" reverseOrder={false} />
        <div className="text-black flex items-center justify-between bg-white max-w-full font-arial h-[52px] px-5">
          <h2 className="font-arial font-normal text-3xl  py-2">
            {name ? name : "Holiday Calender"}
          </h2>
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="search gap-2 mx-8">
              <div className="container"></div>
            </div>
            <h2>
              {/* <CSVLink data={data} headers={csvHeaders}>
          <TbFileDownload
            className="text-green-600"
            size={34}
          ></TbFileDownload>
        </CSVLink> */}
            </h2>

            <h2>
              <AiTwotoneHome
                className="text-black"
                size={34}
                onClick={() => {
                  router.push("/");
                }}
              >
                {" "}
              </AiTwotoneHome>
            </h2>
            
          </div>
        </div>

        <div className="bg-white h-screen flex flex-col select-none items-start mx-4  max-w-full">
          <div className="flex items-center gap-4 w-full mb-1">
            <select
              name="type"
              className="border rounded px-2 py-1 w-full h-8"
              value={filterState.year}
              onChange={(e) =>
                setFilterState({ ...filterState, year: e.target.value })
              }
            >
              <option value="">Select Year</option>
              <option value="2023">2023</option>
              <option value="2024">2024</option>
              <option value="2025">2025</option>
            </select>
            <select
              name="type"
              className="border rounded px-2 py-1 w-full h-8 "
              onChange={(e) =>
                setFilterState({ ...filterState, cId: e.target.value })
              }
            >
              <option value="">Company</option>

              {allCompanyInfo.map((item, idx) => (
                <option value={item.c_id} key={idx}>
                  {item.cmpny_name}
                </option>
              ))}
            </select>
            <select
              name="type"
              className="border rounded px-2 py-1 w-full h-8"
              value={filterState.bgId}
              onChange={(e) =>
                setFilterState({ ...filterState, bgId: e.target.value })
              }
            >
              <option value="">Business Segment</option>
              {bgData.map((item, idx) => (
                <option value={item.bg_id} key={idx}>
                  {item.business_segment}
                </option>
              ))}
            </select>
            <select
              name="type"
              className="border rounded px-2 py-1 w-full h-8"
              value={filterState.buId}
              onChange={(e) =>
                setFilterState({ ...filterState, buId: e.target.value })
              }
            >
              <option value="">Business Unit</option>
              {buData.map((item, idx) => (
                <option value={item.bu_id} key={idx}>
                  {item.business_unit_name}
                </option>
              ))}
            </select>

            <select
              name="type"
              className="border rounded px-2 py-1 w-full h-8"
              value={filterState.zId}
              onChange={(e) =>
                setFilterState({ ...filterState, zId: e.target.value })
              }
            >
              <option value="">Zone</option>
              {allZoneData.map((item, idx) => (
                <option value={item.z_id} key={idx}>
                  {item.zone_name}
                </option>
              ))}
            </select>
            <select
              name="type"
              className="border rounded px-2 py-1 w-full h-8"
              value={filterState.rId}
              onChange={(e) =>
                setFilterState({ ...filterState, rId: e.target.value })
              }
            >
              <option value="">Region</option>
              {allRegionData.map((item, idx) => (
                <option value={item.r_id} key={idx}>
                  {item.region_name}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={() => handleAdd()}
            className="mt-2 px-4 py-1 bg-blue-500 text-white rounded h-8 mb-2"
          >
            Save Holiday Calender
          </button>

          <div className="flex w-full border-solid border-b-2 items-start gap-4 mt-2">
            <button
              className={`${
                calenderType === "Holiday"
                  ? " flex  gap-2 inline-block  rounded-t py-2 px-4 font-semibold  border-b-2 border-orange-500 text-black text-sm"
                  : " flex  gap-2  bg-white inline-block  text-black rounded-t py-2 px-4 font-semibold  text-sm"
              }`}
              onClick={() => setCalenderType("Holiday")}
            >
              Holiday Calender ({tableData.length})
            </button>
            {" "}
            <button
              className={`${
                calenderType === "Weekly"
                  ? " flex  gap-2 inline-block rounded-t py-2 px-4 font-semibold  border-b-2 border-orange-500 text-black text-sm"
                  : " flex  gap-2  bg-white inline-block  text-black rounded-t py-2 px-4 font-semibold  text-sm"
              }`}
              onClick={() => setCalenderType("Weekly")}
            >
              Weekly Off
            </button>

          </div>

          {calenderType === "Holiday" ? (
            <div className="w-full">
              <div className="flex w-full justify-end">
                {" "}
                <button
                  onClick={handleAddRow}
                  className="mt-2 px-4 py-1 bg-blue-500 text-white rounded h-8 mb-2"
                >
                  Add Row
                </button>
              </div>

              <table className="min-w-full divide-y border divide-gray-200">
                <thead className="border-b">
                  <tr className="bg-gray-50 font-arial">
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 tracking-wider">
                      Holiday Name
                    </th>

                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 tracking-wider">
                      Date
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 tracking-wider">
                      Day
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 tracking-wider">
                      Type
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 text-xs">
                  {tableData.map((item, idx) => (
                    <tr key={idx} className="border-b">
                      <td className="px-4 py-2">
                        <input
                          type="text"
                          name="holidayName"
                          value={item.holidayName}
                          onChange={(e) => handleInputChange(idx, e)}
                          className="border rounded px-2 py-1 w-full"
                        />
                      </td>

                      <td className="px-4 py-2">
                        <DatePicker
                          selected={item.date ? new Date(item.date) : ""}
                          onChange={(date) => handleDateChange(idx, date)}
                          className="border rounded px-2 py-1 w-full"
                          dateFormat="dd/MM/yyyy"
                        />
                      </td>
                      <td className="px-4 py-2">
                        <input
                          type="text"
                          name="day"
                          value={
                            item.day ? moment(item.day).format("dddd") : ""
                          }
                          disabled
                          onChange={(e) => handleInputChange(idx, e)}
                          className="border rounded px-2 py-1 w-full"
                        />
                      </td>
                      <td className="px-4 py-2">
                        <select
                          name="type"
                          value={item.type}
                          onChange={(e) => handleInputChange(idx, e)}
                          className="border rounded px-2 py-1 w-full"
                        >
                          <option value="">Select Type</option>

                          <option value="Fixed Holiday">Fixed Holiday </option>
                          <option value="Restricted Holiday">
                            Restricted Holiday{" "}
                          </option>
                          <option value="Managment Holiday">
                            Managment Holiday
                          </option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="mt-4 w-full">
              <div className="flex w-full justify-start ">
                {" "}
                <select
                  name="type"
                  className="border rounded px-2 py-1  h-8 w-80"
                  value={weekType}
                  onChange={(e) => setWeekType(e.target.value)}
                >
                  <option value="">Type</option>
                  <option value="saturdayAndSunday">
                    Every Week in SAT , SUN Off
                  </option>
                  <option value="onlySunday">Every Week in SUN off</option>
                  <option value="secondAndFourthSaturdayAndSunday">
                    Every Month 2nd and Fourth SAT Off
                  </option>
                  <option value="allSundayAndLastSaturday">
                    All Sunday And Last Saturday
                  </option>
                </select>
              </div>

              <table className="min-w-full divide-y border divide-gray-200 mt-4 mb-40">
                <thead className="border-b">
                  <tr className="bg-gray-50 font-arial">
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 tracking-wider">
                      Date
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 tracking-wider">
                      Day
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 tracking-wider">
                      Type
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 text-xs">
                  {woData.map((item, idx) => (
                    <tr key={idx} className="border-b">
                      <td className="px-4 py-2">
                        <DatePicker
                          selected={item.date ? new Date(item.date) : ""}
                          onChange={(date) => handleDateChange(idx, date)}
                          className="border rounded px-2 py-1 w-full"
                          dateFormat="dd/MM/yyyy"
                          disabled
                        />
                      </td>
                      <td className="px-4 py-2">
                        <input
                          type="text"
                          name="day"
                          value={
                            item.day ? moment(item.day).format("dddd") : ""
                          }
                          disabled
                          onChange={(e) => handleNewInputChange(idx, e)}
                          className="border rounded px-2 py-1 w-full"
                        />
                      </td>
                      <td className="px-4 py-2">
                        <select
                          name="type"
                          value={item.type}
                          onChange={(e) => handleNewInputChange(idx, e)}
                          className="border rounded px-2 py-1 w-full"
                        >
                          <option value="">Select Type</option>
                          <option value="WO">Weekly Off</option>
                          <option value="Comp Off">Comp Off</option>
                        </select>
                      </td>
                      <td className="px-4 py-2 flex justify-center">
                        <button
                          onClick={() =>
                            setConfirmationModal({
                              show: true,
                              id: item.id,
                            })
                          }
                        >
                          <MdDelete className="text-red-400 text-lg" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <Transition appear show={confirmationModal.show} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() =>
            setConfirmationModal({
              show: false,
              id: "",
            })
          }
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
                    className="text-[1.78rem] font-medium leading-6 text-center text-gray-900"
                  >
                    Are you sure ?
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-center text-gray-500">
                      Do you really want to delete this ?
                    </p>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() =>
                        setConfirmationModal({
                          show: false,
                          id: "",
                        })
                      }
                    >
                      Cancel
                    </button>

                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => {
                        handleDelete();
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </Layout>
  );
};

export default HolidayCalender;
