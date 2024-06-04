import React, { useState, useEffect, Fragment } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Dialog, Transition } from "@headlessui/react";
import { AiTwotoneHome } from "react-icons/ai";
import { useRouter } from "next/router";
import { url } from "@/constants/url";
import { AiOutlineSearch } from "react-icons/ai";
import axios from "axios";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";
import Layout from "@/components/Layout1";
import nmg from "./banner.jpg";
import ReactPaginate from "react-paginate";
import moment from "moment";
import { output } from "@/next.config";

const AdditionalInfo = (props) => {
  const router = useRouter();
  const headers = {
    "Content-Type": "application/json",
    secret: "fsdhfgsfuiweifiowefjewcewcebjw",
  };

  const [allFilters, setAllFilters] = useState({
    companyId: "",
    crop: "",
    season: "",
  });
  const [allDistrictData, setAllDistrict] = useState([]);
  const getDistrict = async () => {
    try {
      const respond = await axios.get(`${url}/api/get_dist_state`, {
        headers: headers,
      });
      const apires = await respond.data.data;

      setAllDistrict(apires);
    } catch (error) {}
  };

  useEffect(() => {
    getDistrict();
  }, []);
  const [allCompanyData, setAllCompanyData] = useState([]);
  const getCompanyInfo = async () => {
    try {
      const respond = await axios.get(`${url}/api/get_company_information`, {
        headers: headers,
      });
      const apires = await respond.data.data;

      setAllCompanyData(apires.filter((item, idx) => item.isDeleted === false));
    } catch (error) {
      console.log(error);
    }
  };
  const [allCropData, setAllCropData] = useState([]);
  const getCrops = async (id) => {
    try {
      const respond = await axios.get(`${url}/api/get_crop`, {
        headers: headers,
        params: {
          c_id: id,
        },
      });
      const apires = await respond.data.data;
      setAllCropData(apires);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (allFilters.crop)
      setAllFilters({
        ...allFilters,
        season: allCropData.filter(
          (item) => Number(item.cr_id) === Number(allFilters.crop)
        )[0].season_name
          ? allCropData.filter(
              (item) => Number(item.cr_id) === Number(allFilters.crop)
            )[0].season_name
          : "",
      });
  }, [allFilters.crop]);

  useEffect(() => {
    getCrops(allFilters.companyId);
  }, [allFilters.companyId]);
  useEffect(() => {
    getCompanyInfo();
  }, []);
  const [cropDetails, setCropDetails] = useState([
    {
      idx: 0,
      district: "",
      cultivatedArea: "",
      area: "",
      share: "",
      avYield: "",
      currentPrice: "",
      inputCost: "",
      outputCost: "",
      roi: "",
    },
  ]);

  const handleAddCropDetails = (idx) => {
    const newCropDetail = {
      idx: idx + 1,
      district: "",
      cultivatedArea: "",
      area: "",
      share: "",
      avYield: "",
      currentPrice: "",
      inputCost: "",
      outputCost: "",
      roi: "",
    };

    // Create a copy of the current array
    const newArray = [...cropDetails];

    // Use splice to insert the new object at the specified index
    newArray.splice(idx + 1, 0, newCropDetail);

    // Update the idx values to keep them sequential
    const updatedCropDetails = newArray.map((crop, index) => ({
      ...crop,
      idx: index,
    }));

    // Update the state with the new array
    setCropDetails(updatedCropDetails);
  };

  const [segmentDetails, setSegmentDetails] = useState([
    {
      idx: 0,
      stage: "",
      segment: "",
      productBrand: "",
      share: "",
      dose: "",
      cost: "",
      avCost: "",
      startDate: "",
      endDate: "",
      totalDay: "",
      newStage: "",
    },
  ]);

  const handleAddCropSegmentDetails = (idx) => {
    const newSegmentDetail = {
      idx: idx + 1,
      stage: "",
      segment: "",
      productBrand: "",
      share: "",
      dose: "",
      cost: "",
      avCost: "",
      startDate: "",
      endDate: "",
      totalDay: "",
      newStage: "",
    };

    // Create a copy of the current array
    const newArray = [...segmentDetails];

    // Use splice to insert the new object at the specified index
    newArray.splice(idx + 1, 0, newSegmentDetail);

    // Update the idx values to keep them sequential
    const updatedSegmentDetails = newArray.map((segment, index) => ({
      ...segment,
      idx: index,
    }));

    // Update the state with the new array
    setSegmentDetails(updatedSegmentDetails);
  };

  const [marketShare, setMarketShare] = useState([
    {
      idx: 0,
      marketName: "",
      marketPotential: "",
      business: "",
      share: "",
    },
  ]);

  const handleAddMarketDetails = (idx) => {
    const newMarketDetail = {
      idx: 0,
      marketName: "",
      marketPotential: "",
      business: "",
      share: "",
    };

    // Create a copy of the current array
    const newArray = [...marketShare];

    // Use splice to insert the new object at the specified index
    newArray.splice(idx + 1, 0, newMarketDetail);

    // Update the idx values to keep them sequential
    const updatedMarketDetails = newArray.map((item, index) => ({
      ...item,
      idx: index,
    }));

    // Update the state with the new array
    setMarketShare(updatedMarketDetails);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        crop_info: cropDetails.map((item) => {
          return {
            cr_id: allFilters.crop,
            c_id: allFilters.companyId,
            district: item.district,
            total_cultivated_area_in_acre: item.cultivatedArea,
            area_in_acre: item.area,
            share_percent: item.share,
            average_yield_acre: item.avYield,
            current_price_qtl: item.currentPrice,
            input_cost: item.inputCost,
            output_cost: item.outputCost,
            roi: item.roi,
          };
        }),
        crop_seg: segmentDetails.map((item) => {
          return {
            cr_id: allFilters.crop,
            c_id: allFilters.companyId,
            crop_stage: item.stage,
            crop_segment: item.segment,
            product_brand: item.productBrand,
            dose_acre: item.dose,
            cost_kg_ltr: item.cost,
            average_cost_acre: item.avCost,
            start_date: item.startDate,
            end_date: item.endDate,
            total_days: item.totalDay,
            stage: item.newStage,
          };
        }),
        crop_mark: marketShare.map((item) => {
          return {
            cr_id: allFilters.crop,
            c_id: allFilters.companyId,
            market_mandi_name: item.marketName,
            market_potential: item.marketPotential,
            business: item.business,
            share: item.share,
          };
        }),
      };

      const respond = await axios.post(
        `${url}/api/add_crop_info`,
        JSON.stringify(data),
        {
          headers: headers,
        }
      );
    } catch (errors) {
      // const errorMessage = errors?.response?.data?.message;
      // toast.error(errorMessage);
      // const newErrors = {};
      // errors?.inner?.forEach((error) => {
      //   newErrors[error?.path] = error?.message;
      // });
    }
  };

  return (
    <div className="bg-white rounded p-4 w-full overflow-auto">
      <Toaster position="bottom-center" reverseOrder={false} />
      {/* Filters */}
      <div className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-black">Company</label>
            <select
              className="block w-full text-black border border-gray-400 rounded py-2 px-4"
              value={allFilters.companyId}
              onChange={(e) =>
                setAllFilters({
                  ...allFilters,
                  companyId: e.target.value,
                })
              }
            >
              <option value="" disabled>
                - Select -
              </option>
              {allCompanyData.map((item, idx) => (
                <option value={item.c_id} key={idx}>
                  {item.cmpny_name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-black">Crop Name</label>
            <select
              className="block w-full text-black border border-gray-400 rounded py-2 px-4"
              value={allFilters.crop}
              onChange={(e) => {
                setAllFilters({
                  ...allFilters,
                  crop: e.target.value,
                  season: e.target.name,
                });
              }}
            >
              <option value="" disabled>
                - Select -
              </option>
              {allCropData.map((item, idx) => (
                <option value={item.cr_id} key={idx} name={item.season_name}>
                  {item.crop_name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-black">Season</label>
            <input
              className="block w-full text-black border border-gray-400 rounded py-2 px-4"
              type="text"
              value={allFilters.season}
              disabled
            />
          </div>
        </div>
      </div>

      {/* Form */}
      <form>
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">
            Crop Details (District Level)
          </h2>
          <div className="overflow-x-auto">
            <table className="border-collapse border border-gray-400 w-full">
              <colgroup>
                <col style={{ width: "15%" }} />
                <col style={{ width: "14%" }} />
                <col style={{ width: "11%" }} />
                <col style={{ width: "10%" }} />
                <col style={{ width: "10%" }} />
                <col style={{ width: "10%" }} />
                <col style={{ width: "10%" }} />
                <col style={{ width: "10%" }} />
                <col style={{ width: "20%" }} />
              </colgroup>
              <thead>
                <tr className="bg-orange-500 text-white">
                  <th className="border border-gray-400 px-4 py-2">District</th>
                  <th className="border border-gray-400 px-4 py-2">
                    Total Cultivated Area (In acre)
                  </th>
                  <th className="border border-gray-400 px-4 py-2">
                    Area (In acre)
                  </th>
                  <th className="border border-gray-400 px-4 py-2">Share %</th>
                  <th className="border border-gray-400 px-4 py-2">
                    Average Yield/acre (Qtl.)
                  </th>
                  <th className="border border-gray-400 px-4 py-2">
                    Current Price/Qtl.
                  </th>
                  <th className="border border-gray-400 px-4 py-2">
                    Input Cost (INR)
                  </th>
                  <th className="border border-gray-400 px-4 py-2">
                    Output Cost (INR)
                  </th>
                  <th className="border border-gray-400 px-4 py-2">ROI</th>
                  <th className="border border-gray-400 px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {cropDetails.map((item, index) => (
                  <tr>
                    <td className="border border-gray-400 px-4 py-2">
                      <select
                        className="w-full px-2 py-1 border border-gray-300 rounded "
                        value={item.district}
                        onChange={(e) =>
                          setCropDetails(
                            cropDetails.map((el) => {
                              if (el.idx === index) {
                                return {
                                  ...el,
                                  district: e.target.value,
                                };
                              } else {
                                return el;
                              }
                            })
                          )
                        }
                      >
                        <option value="">--Select--</option>
                        {allDistrictData.map((item, idx) => (
                          <option value={item.district} key={idx}>
                            {item.district}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="border border-gray-400 px-4 py-2">
                      <input
                        type="number"
                        className="w-full px-2 py-1 border border-gray-300 rounded text-right"
                        value={item.cultivatedArea}
                        onChange={(e) =>
                          setCropDetails(
                            cropDetails.map((el) => {
                              if (el.idx === index) {
                                return {
                                  ...el,
                                  cultivatedArea: e.target.value,
                                };
                              } else {
                                return el;
                              }
                            })
                          )
                        }
                      />
                    </td>
                    <td className="border border-gray-400 px-4 py-2">
                      <input
                        type="number"
                        className="w-full px-2 py-1 border border-gray-300 rounded text-right"
                        value={item.area}
                        onChange={(e) =>
                          setCropDetails(
                            cropDetails.map((el) => {
                              if (el.idx === index) {
                                return {
                                  ...el,
                                  area: e.target.value,
                                };
                              } else {
                                return el;
                              }
                            })
                          )
                        }
                      />
                    </td>
                    <td className="border border-gray-400 px-4 py-2">
                      <input
                        type="number"
                        className="w-full px-2 py-1 border border-gray-300 rounded text-right"
                        value={item.share}
                        onChange={(e) =>
                          setCropDetails(
                            cropDetails.map((el) => {
                              if (el.idx === index) {
                                return {
                                  ...el,
                                  share: e.target.value,
                                };
                              } else {
                                return el;
                              }
                            })
                          )
                        }
                      />
                    </td>
                    <td className="border border-gray-400 px-4 py-2">
                      <input
                        type="number"
                        className="w-full px-2 py-1 border border-gray-300 rounded text-right"
                        value={item.avYield}
                        onChange={(e) =>
                          setCropDetails(
                            cropDetails.map((el) => {
                              if (el.idx === index) {
                                return {
                                  ...el,
                                  avYield: e.target.value,
                                };
                              } else {
                                return el;
                              }
                            })
                          )
                        }
                      />
                    </td>
                    <td className="border border-gray-400 px-4 py-2">
                      <input
                        type="number"
                        className="w-full px-2 py-1 border border-gray-300 rounded text-right"
                        value={item.currentPrice}
                        onChange={(e) =>
                          setCropDetails(
                            cropDetails.map((el) => {
                              if (el.idx === index) {
                                return {
                                  ...el,
                                  currentPrice: e.target.value,
                                };
                              } else {
                                return el;
                              }
                            })
                          )
                        }
                      />
                    </td>
                    <td className="border border-gray-400 px-4 py-2">
                      <input
                        type="number"
                        className="w-full px-2 py-1 border border-gray-300 rounded text-right"
                        value={item.inputCost}
                        onChange={(e) =>
                          setCropDetails(
                            cropDetails.map((el) => {
                              if (el.idx === index) {
                                return {
                                  ...el,
                                  inputCost: e.target.value,
                                };
                              } else {
                                return el;
                              }
                            })
                          )
                        }
                      />
                    </td>
                    <td className="border border-gray-400 px-4 py-2">
                      <input
                        type="number"
                        className="w-full px-2 py-1 border border-gray-300 rounded text-right"
                        value={item.outputCost}
                        onChange={(e) =>
                          setCropDetails(
                            cropDetails.map((el) => {
                              if (el.idx === index) {
                                return {
                                  ...el,
                                  outputCost: e.target.value,
                                };
                              } else {
                                return el;
                              }
                            })
                          )
                        }
                      />
                    </td>
                    <td className="border border-gray-400 px-4 py-2">
                      <input
                        type="number"
                        className="w-full px-2 py-1 border border-gray-300 rounded text-right "
                        value={item.roi}
                        onChange={(e) =>
                          setCropDetails(
                            cropDetails.map((el) => {
                              if (el.idx === index) {
                                return {
                                  ...el,
                                  roi: e.target.value,
                                };
                              } else {
                                return el;
                              }
                            })
                          )
                        }
                      />
                    </td>
                    <td className="border border-gray-400 px-4 py-2 flex flex-row gap-2">
                      <button
                        type="button"
                        className="inline-flex justify-center  text-white rounded-md border border-transparent bg-green-400 px-2 py-1 text-sm font-medium hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={() => handleAddCropDetails(index)}
                      >
                        Add
                      </button>
                      <button
                        type="button"
                        className="inline-flex justify-center  text-white rounded-md border border-transparent bg-red-400 px-2 py-1 text-sm font-medium hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={() => {
                          setCropDetails(
                            cropDetails
                              .filter((item) => item.idx !== index)
                              .map((crop, index) => ({
                                ...crop,
                                idx: index,
                              }))
                          );
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}

                {/* Add more rows as needed */}
                <tr className="bg-gray-900 text-white">
                  <td className="border border-gray-400 px-4 py-2">Total</td>
                  <td className="border border-gray-400 px-4 py-2">
                    {cropDetails
                      .map((item) => item.cultivatedArea)
                      .reduce((acc, current) => {
                        // Check if the current element is a number

                        return Number(acc) + Number(current);
                      }, 0)}
                  </td>
                  <td className="border border-gray-400 px-4 py-2">
                    {cropDetails
                      .map((item) => item.area)
                      .reduce((acc, current) => {
                        // Check if the current element is a number

                        return Number(acc) + Number(current);
                      }, 0)}
                  </td>
                  <td className="border border-gray-400 px-4 py-2">
                    {" "}
                    {cropDetails
                      .map((item) => item.share)
                      .reduce((acc, current) => {
                        // Check if the current element is a number

                        return Number(acc) + Number(current);
                      }, 0)}
                  </td>
                  <td className="border border-gray-400 px-4 py-2">
                    {" "}
                    {cropDetails
                      .map((item) => item.avYield)
                      .reduce((acc, current) => {
                        // Check if the current element is a number

                        return Number(acc) + Number(current);
                      }, 0)}
                  </td>
                  <td className="border border-gray-400 px-4 py-2">
                    {cropDetails
                      .map((item) => item.currentPrice)
                      .reduce((acc, current) => {
                        // Check if the current element is a number

                        return Number(acc) + Number(current);
                      }, 0)}
                  </td>
                  <td className="border border-gray-400 px-4 py-2">
                    {cropDetails
                      .map((item) => item.inputCost)
                      .reduce((acc, current) => {
                        // Check if the current element is a number

                        return Number(acc) + Number(current);
                      }, 0)}
                  </td>
                  <td className="border border-gray-400 px-4 py-2">
                    {cropDetails
                      .map((item) => item.outputCost)
                      .reduce((acc, current) => {
                        // Check if the current element is a number

                        return Number(acc) + Number(current);
                      }, 0)}
                  </td>
                  <td className="border border-gray-400 px-4 py-2">
                    {" "}
                    {cropDetails
                      .map((item) => item.roi)
                      .reduce((acc, current) => {
                        // Check if the current element is a number

                        return Number(acc) + Number(current);
                      }, 0)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">
            Crop Segmentation (District Level)
          </h2>
          <div className="overflow-x-auto">
            <table className="border-collapse border border-gray-400 w-full">
              <colgroup>
                <col style={{ width: "10%" }} /> {/* Adjust width as needed */}
                <col style={{ width: "9%" }} /> {/* Adjust width as needed */}
                <col style={{ width: "9%" }} /> {/* Adjust width as needed */}
                <col style={{ width: "9%" }} /> {/* Adjust width as needed */}
                <col style={{ width: "9%" }} /> {/* Adjust width as needed */}
                <col style={{ width: "9%" }} /> {/* Adjust width as needed */}
                <col style={{ width: "9%" }} /> {/* Adjust width as needed */}
                <col style={{ width: "9%" }} /> {/* Adjust width as needed */}
                <col style={{ width: "9%" }} /> {/* Adjust width as needed */}
                <col style={{ width: "9%" }} /> {/* Adjust width as needed */}
                <col style={{ width: "9%" }} /> {/* Adjust width as needed */}
              </colgroup>
              <thead>
                <tr className="bg-orange-500 text-white">
                  <th className="border border-gray-400 px-4 py-2">
                    Crop Stage
                  </th>
                  <th className="border border-gray-400 px-4 py-2">Segment</th>
                  <th className="border border-gray-400 px-4 py-2">
                    Product / Brand
                  </th>
                  <th className="border border-gray-400 px-4 py-2">Share %</th>
                  <th className="border border-gray-400 px-4 py-2">
                    Dose/Acre (kg/ltr)
                  </th>
                  <th className="border border-gray-400 px-4 py-2">
                    Cost/Acre (INR)
                  </th>
                  <th className="border border-gray-400 px-4 py-2">
                    Average Cost/Acre (INR)
                  </th>
                  <th className="border border-gray-400 px-4 py-2">
                    Start Date
                  </th>
                  <th className="border border-gray-400 px-4 py-2">End Date</th>
                  <th className="border border-gray-400 px-4 py-2">
                    Total Days
                  </th>
                  <th className="border border-gray-400 px-4 py-2">Stage</th>
                  <th className="border border-gray-400 px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {segmentDetails.map((item, index) => (
                  <tr key={index}>
                    <td className="border border-gray-400 px-4 py-2">
                      <input
                        type="text"
                        className="w-full px-2 py-1 border border-gray-300 rounded "
                        value={item.stage}
                        onChange={(e) =>
                          setSegmentDetails(
                            segmentDetails.map((el) => {
                              if (el.idx === index) {
                                return {
                                  ...el,
                                  stage: e.target.value,
                                };
                              } else {
                                return el;
                              }
                            })
                          )
                        }
                      />
                    </td>
                    <td className="border border-gray-400 px-4 py-2">
                      <input
                        type="text"
                        className="w-full px-2 py-1 border border-gray-300 rounded "
                        value={item.segment}
                        onChange={(e) =>
                          setSegmentDetails(
                            segmentDetails.map((el) => {
                              if (el.idx === index) {
                                return {
                                  ...el,
                                  segment: e.target.value,
                                };
                              } else {
                                return el;
                              }
                            })
                          )
                        }
                      />
                    </td>
                    <td className="border border-gray-400 px-4 py-2">
                      <input
                        type="text"
                        className="w-full px-2 py-1 border border-gray-300 rounded "
                        value={item.productBrand}
                        onChange={(e) =>
                          setSegmentDetails(
                            segmentDetails.map((el) => {
                              if (el.idx === index) {
                                return {
                                  ...el,
                                  productBrand: e.target.value,
                                };
                              } else {
                                return el;
                              }
                            })
                          )
                        }
                      />
                    </td>
                    <td className="border border-gray-400 px-4 py-2">
                      <input
                        type="number"
                        className="w-full px-2 py-1 border border-gray-300 rounded text-right"
                        value={item.share}
                        onChange={(e) =>
                          setSegmentDetails(
                            segmentDetails.map((el) => {
                              if (el.idx === index) {
                                return {
                                  ...el,
                                  share: e.target.value,
                                };
                              } else {
                                return el;
                              }
                            })
                          )
                        }
                      />
                    </td>
                    <td className="border border-gray-400 px-4 py-2">
                      <input
                        type="number"
                        className="w-full px-2 py-1 border border-gray-300 rounded text-right"
                        value={item.dose}
                        onChange={(e) =>
                          setSegmentDetails(
                            segmentDetails.map((el) => {
                              if (el.idx === index) {
                                return {
                                  ...el,
                                  dose: e.target.value,
                                };
                              } else {
                                return el;
                              }
                            })
                          )
                        }
                      />
                    </td>
                    <td className="border border-gray-400 px-4 py-2">
                      <input
                        type="number"
                        className="w-full px-2 py-1 border border-gray-300 rounded text-right"
                        value={item.cost}
                        onChange={(e) =>
                          setSegmentDetails(
                            segmentDetails.map((el) => {
                              if (el.idx === index) {
                                return {
                                  ...el,
                                  cost: e.target.value,
                                };
                              } else {
                                return el;
                              }
                            })
                          )
                        }
                      />
                    </td>
                    <td className="border border-gray-400 px-4 py-2">
                      <input
                        type="number"
                        className="w-full px-2 py-1 border border-gray-300 rounded text-right"
                        value={item.avCost}
                        onChange={(e) =>
                          setSegmentDetails(
                            segmentDetails.map((el) => {
                              if (el.idx === index) {
                                return {
                                  ...el,
                                  avCost: e.target.value,
                                };
                              } else {
                                return el;
                              }
                            })
                          )
                        }
                      />
                    </td>
                    <td className="border border-gray-400 px-4 py-2">
                      <DatePicker
                        className="w-full px-3 py-2 border rounded-lg  text-sm border-gray-300 focus:outline-none focus:border-indigo-500"
                        dateFormat="dd/MM/yyyy"
                        peekNextMonth
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                        selected={item.startDate}
                        onChange={(date) =>
                          setSegmentDetails(
                            segmentDetails.map((el) => {
                              if (el.idx === index) {
                                return {
                                  ...el,
                                  startDate: date,
                                };
                              } else {
                                return el;
                              }
                            })
                          )
                        }
                      />
                    </td>
                    <td className="border border-gray-400 px-4 py-2">
                      <DatePicker
                        className="w-full px-3 py-2 border text-sm rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                        dateFormat="dd/MM/yyyy"
                        peekNextMonth
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                        minDate={item.startDate}
                        selected={item.endDay}
                        onChange={(date) =>
                          setSegmentDetails(
                            segmentDetails.map((el) => {
                              if (el.idx === index) {
                                return {
                                  ...el,
                                  endDay: date,
                                  totalDay:
                                    (date - item.startDate) /
                                    (1000 * 60 * 60 * 24),
                                };
                              } else {
                                return el;
                              }
                            })
                          )
                        }
                      />
                    </td>
                    <td className="border border-gray-400 px-4 py-2">
                      <input
                        type="number"
                        className="w-full px-2 py-1 border border-gray-300 rounded text-right"
                        value={item.totalDay}
                        disabled
                      />
                    </td>
                    <td className="border border-gray-400 px-4 py-2">
                      <input
                        type="number"
                        className="w-full px-2 py-1 border border-gray-300 rounded text-right"
                        value={item.newStage}
                        onChange={(e) =>
                          setSegmentDetails(
                            segmentDetails.map((el) => {
                              if (el.idx === index) {
                                return {
                                  ...el,
                                  newStage: e.target.value,
                                };
                              } else {
                                return el;
                              }
                            })
                          )
                        }
                      />
                    </td>
                    <td className="border border-gray-400 px-4 py-2 flex flex-row gap-2">
                      <button
                        type="button"
                        className="inline-flex justify-center  text-white rounded-md border border-transparent bg-green-400 px-2 py-1 text-sm font-medium hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={() => handleAddCropSegmentDetails(index)}
                      >
                        Add
                      </button>
                      <button
                        type="button"
                        className="inline-flex justify-center  text-white rounded-md border border-transparent bg-red-400 px-2 py-1 text-sm font-medium hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={() => {
                          setSegmentDetails(
                            segmentDetails
                              .filter((item) => item.idx !== index)
                              .map((crop, index) => ({
                                ...crop,
                                idx: index,
                              }))
                          );
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}

                {/* Add more rows as needed */}
                <tr className="bg-gray-900 text-white">
                  <td className="border border-gray-400 px-4 py-2">Total</td>
                  <td className="border border-gray-400 px-4 py-2">-</td>
                  <td className="border border-gray-400 px-4 py-2">-</td>
                  <td className="border border-gray-400 px-4 py-2">
                    {segmentDetails
                      .map((item) => item.share)
                      .reduce((acc, current) => {
                        // Check if the current element is a number

                        return Number(acc) + Number(current);
                      }, 0)}
                  </td>
                  <td className="border border-gray-400 px-4 py-2">
                    {" "}
                    {segmentDetails
                      .map((item) => item.dose)
                      .reduce((acc, current) => {
                        // Check if the current element is a number

                        return Number(acc) + Number(current);
                      }, 0)}
                  </td>
                  <td className="border border-gray-400 px-4 py-2">
                    {" "}
                    {segmentDetails
                      .map((item) => item.cost)
                      .reduce((acc, current) => {
                        // Check if the current element is a number

                        return Number(acc) + Number(current);
                      }, 0)}
                  </td>
                  <td className="border border-gray-400 px-4 py-2">
                    {" "}
                    {segmentDetails
                      .map((item) => item.avCost)
                      .reduce((acc, current) => {
                        // Check if the current element is a number

                        return Number(acc) + Number(current);
                      }, 0)}
                  </td>
                  <td className="border border-gray-400 px-4 py-2">-</td>
                  <td className="border border-gray-400 px-4 py-2">-</td>
                  <td className="border border-gray-400 px-4 py-2">
                    {" "}
                    {segmentDetails
                      .map((item) => item.totalDay)
                      .reduce((acc, current) => {
                        // Check if the current element is a number

                        return Number(acc) + Number(current);
                      }, 0)}
                  </td>
                  <td className="border border-gray-400 px-4 py-2">
                    {segmentDetails
                      .map((item) => item.newStage)
                      .reduce((acc, current) => {
                        // Check if the current element is a number

                        return Number(acc) + Number(current);
                      }, 0)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">
            Crop Market Share (District Level)
          </h2>
          <div className="overflow-x-auto">
            <table className="border-collapse border border-gray-400 w-full">
              <colgroup>
                <col style={{ width: "10%" }} /> {/* Adjust width as needed */}
                <col style={{ width: "9%" }} /> {/* Adjust width as needed */}
                <col style={{ width: "9%" }} /> {/* Adjust width as needed */}
                <col style={{ width: "9%" }} /> {/* Adjust width as needed */}
                <col style={{ width: "1%" }} /> {/* Adjust width as needed */}
              </colgroup>
              <thead>
                <tr className="bg-orange-500 text-white">
                  <th className="border border-gray-400 px-4 py-2">
                    Market/Mandi Name
                  </th>

                  <th className="border border-gray-400 px-4 py-2">
                    Market Potential (Lakh)
                  </th>
                  <th className="border border-gray-400 px-4 py-2">
                    Our Business(Lakh)
                  </th>
                  <th className="border border-gray-400 px-4 py-2">
                    Our Share
                  </th>
                  <th className="border border-gray-400 px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {marketShare.map((item, index) => (
                  <tr key={index}>
                    <td className="border border-gray-400 px-4 py-2">
                      <input
                        className="w-full px-2 py-1 border border-gray-300 rounded "
                        value={item.marketName}
                        onChange={(e) =>
                          setMarketShare(
                            marketShare.map((el) => {
                              if (el.idx === index) {
                                return {
                                  ...el,
                                  marketName: e.target.value,
                                };
                              } else {
                                return el;
                              }
                            })
                          )
                        }
                      />
                    </td>
                    <td className="border border-gray-400 px-4 py-2">
                      <input
                        type="number"
                        className="w-full px-2 py-1 border border-gray-300 rounded text-right"
                        value={item.marketPotential}
                        onChange={(e) =>
                          setMarketShare(
                            marketShare.map((el) => {
                              if (el.idx === index) {
                                return {
                                  ...el,
                                  marketPotential: e.target.value,
                                };
                              } else {
                                return el;
                              }
                            })
                          )
                        }
                      />
                    </td>
                    <td className="border border-gray-400 px-4 py-2">
                      <input
                        type="number"
                        className="w-full px-2 py-1 border border-gray-300 rounded text-right"
                        value={item.business}
                        onChange={(e) =>
                          setMarketShare(
                            marketShare.map((el) => {
                              if (el.idx === index) {
                                return {
                                  ...el,
                                  business: e.target.value,
                                };
                              } else {
                                return el;
                              }
                            })
                          )
                        }
                      />
                    </td>
                    <td className="border border-gray-400 px-4 py-2">
                      <input
                        type="number"
                        className="w-full px-2 py-1 border border-gray-300 rounded text-right"
                        value={item.share}
                        onChange={(e) =>
                          setMarketShare(
                            marketShare.map((el) => {
                              if (el.idx === index) {
                                return {
                                  ...el,
                                  share: e.target.value,
                                };
                              } else {
                                return el;
                              }
                            })
                          )
                        }
                      />
                    </td>
                    <td className="border border-gray-400 px-4 py-2 flex flex-row gap-2">
                      <button
                        type="button"
                        className="inline-flex justify-center  text-white rounded-md border border-transparent bg-green-400 px-2 py-1 text-sm font-medium hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={() => handleAddMarketDetails(index)}
                      >
                        Add
                      </button>
                      <button
                        type="button"
                        className="inline-flex justify-center  text-white rounded-md border border-transparent bg-red-400 px-2 py-1 text-sm font-medium hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={() => {
                          setMarketShare(
                            marketShare
                              .filter((item) => item.idx !== index)
                              .map((crop, index) => ({
                                ...crop,
                                idx: index,
                              }))
                          );
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}

                {/* Add more rows as needed */}
                <tr className="bg-gray-900 text-white">
                  <td className="border border-gray-400 px-4 py-2">Total</td>
                  <td className="border border-gray-400 px-4 py-2">
                    {" "}
                    {marketShare
                      .map((item) => item.marketPotential)
                      .reduce((acc, current) => {
                        // Check if the current element is a number

                        return Number(acc) + Number(current);
                      }, 0)}
                  </td>
                  <td className="border border-gray-400 px-4 py-2">
                    {marketShare
                      .map((item) => item.business)
                      .reduce((acc, current) => {
                        // Check if the current element is a number

                        return Number(acc) + Number(current);
                      }, 0)}
                  </td>
                  <td className="border border-gray-400 px-4 py-2">
                    {" "}
                    {marketShare
                      .map((item) => item.share)
                      .reduce((acc, current) => {
                        // Check if the current element is a number

                        return Number(acc) + Number(current);
                      }, 0)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="w-full flex mt-12 gap-12">
            <button
              className="text-center rounded-md bg-green-500 text-white py-1 px-4 text-lg"
              type="submit"
              onClick={(e) => handleSubmit(e)}
            >
              Submit
            </button>
            <button
              className="text-center rounded-md bg-green-500 text-white py-1 px-4 text-lg"
              type="submit"
            >
              Close
            </button>
          </div>
        </div>
        {/* Additional Sections */}
      </form>
    </div>
  );
};

export default AdditionalInfo;
