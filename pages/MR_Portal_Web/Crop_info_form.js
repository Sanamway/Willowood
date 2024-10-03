import React, { useState, useEffect, Fragment } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useRouter } from "next/router";
import { url } from "@/constants/url";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import * as Yup from "yup";
import Layout from "@/components/Layout1";
import { totalOsData } from "@/components/Dashboard/sampleData";
const AdditionalInfo = (props) => {
  const router = useRouter();
  const headers = {
    "Content-Type": "application/json",
    secret: "fsdhfgsfuiweifiowefjewcewcebjw",
  };
  const [allBrand, setAllBrand] = useState([]);
  const getAllBrand = async () => {
    try {
      const resp = await axios.get(`${url}/api/get_product_brand`, {
        headers: headers,
        params: {
          c_id: JSON.parse(window.localStorage.getItem("c_id"))[0],
        },
      });
      const respData = await resp.data.data;
      setAllBrand(respData);
    } catch (error) {
      console.log("err", error);
    }
  };

  const [allSegement, setAllSegment] = useState([]);
  const getAllProductSegment = async () => {
    try {
      const resp = await axios.get(`${url}/api/get_product_segment`, {
        headers: headers,
        params: {
          c_id: JSON.parse(window.localStorage.getItem("c_id"))[0],
        },
      });
      const respData = await resp.data.data;
      setAllSegment(respData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllProductSegment();
    getAllBrand();
  }, []);

  const [allFilters, setAllFilters] = useState({
    companyId: "",
    crop: "",
    season: "",
  });

  const getCropInfo = async () => {
    try {
      const respond = await axios.get(`${url}/api/get_crop_info`, {
        headers: headers,
        params: {
          cr_id: router.query.crId,
          c_id: JSON.parse(window.localStorage.getItem("c_id"))[0],
        },
      });
      const apires = await respond.data.data;
      setCropDetails(
        apires.cropinfoData.map((item, index) => {
          return {
            idx: index,
            district: item.district,
            cultivatedArea: item.total_cultivated_area_in_acre,
            area: item.area_in_acre,
            share: item.share_percent,
            avYield: item.average_yield_acre,
            currentPrice: item.current_price_qtl,
            inputCost: item.input_cost,
            outputCost: item.output_cost,
            roi: item.roi,
          };
        })
      );

      setSegmentDetails(
        apires.crop_seg.map((item, index) => {
          return {
            idx: index,
            wtaerLt: item.average_cost_acre,
            costLt: item.cost_kg_ltr,
            segment: item.crop_segment,
            totalCost: item.share_percent,
            dose: item.dose_acre,
            endDate: new Date(item.end_date),
            productBrand: item.product_brand,
            newStage: item.stage,
            startDate: new Date(item.start_date),
            totalDay: item.total_days,
          };
        })
      );
      setStageDetails(
        apires.crop_stage.map((item, index) => {
          return {
            idx: index,
            stage: item.stage_name,
          };
        })
      );

      setMarketShare(
        apires.crop_mark.map((item, index) => {
          return {
            idx: index,
            marketName: item.market_mandi_name,
            marketPotential: item.market_potential,
            business: item.business,
            share: item.share,
          };
        })
      );
    } catch (error) {}
  };

  useEffect(() => {
    if (router.query.type === "Add") {
      setAllFilters({
        ...allFilters,
        companyId: JSON.parse(window.localStorage.getItem("c_id"))[0],
      });
    } else {
      getCropInfo();
      setAllFilters({
        companyId: JSON.parse(window.localStorage.getItem("c_id"))[0],
        crop: router.query.crId,
        season: router.query.season,
      });
    }
  }, []);

  const [allDistrictData, setAllDistrict] = useState([]);
  const getDistrict = async () => {
    try {
      const respond = await axios.get(`${url}/api/get_dist_state`, {
        headers: headers,
        params: {
          c_id: JSON.parse(window.localStorage.getItem("c_id"))[0],
        },
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

      setAllCompanyData(apires.filter((item) => item.isDeleted === false));
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
      setAllCropData([]);
      console.log(error);
    }
  };

  useEffect(() => {
    if (router.query.type !== "Add") return;
    if (!allFilters.crop) return;
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
    if (!allFilters.companyId) return;
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



  const validationSchemaCropDetails = Yup.object().shape({
    district: Yup.string()
      .typeError("Add District to add new row")
      .required("Add District to add new row")
      .test("unique-district", "District must be unique", function (value) {
        const { path, parent, options } = this;
        const idx = parent.idx; // Get the index of the current row
        const isDuplicate = cropDetails.some(
          (detail, i) => detail.district === value && i !== idx
        );
        return !isDuplicate;
      }),
    cultivatedArea: Yup.number().typeError(
      "Add Cultivated area to add new row"
    ),
    area: Yup.number()
      .typeError("Add area to add new row")
      .required("Add area to add new row"),
    share: Yup.number()
      .typeError("Add  share to add new row")
      .required("Add  share to add new row"),
    avYield: Yup.number()
      .typeError("Add avYield to add new row")
      .required("Add avYield to add new row"),
    currentPrice: Yup.number()
      .typeError("Add Current price to add new row")
      .required("Add Current price to add new row"),
    inputCost: Yup.number()
      .typeError("Add Input Cost to add new row")
      .required("Add Input Cost to add new row"),
    outputCost: Yup.number()
      .typeError("Add Output Cost to add new row")
      .required("Add Output Cost to add new row"),
    roi: Yup.number()
      .typeError("Add ROI to add new row")
      .required("Add ROI to add new row"),
  });

  const handleAddCropDetails = async (idx) => {
    try {
      // Create a copy of the current array
      const newArray = [...cropDetails];
      await validationSchemaCropDetails.validate(newArray[idx], {
        abortEarly: false,
      });
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

      // Use splice to insert the new object at the specified index
      newArray.splice(idx + 1, 0, newCropDetail);

      // Update the idx values to keep them sequential

      const updatedCropDetails = newArray.map((crop, index) => ({
        ...crop,
        idx: index,
      }));

      // Update the state with the new array
      setCropDetails(updatedCropDetails);
    } catch (error) {
      const newErrors = {};
      error?.inner?.forEach((error) => {
        newErrors[error?.path] = error?.message;
      });
      const err = Object.values(newErrors);
      toast.error(err[0]);
    }
  };
  

  const [stageDetails, setStageDetails] = useState([{idx: 0, stage: ""}]);
  const validationSchemaStageDetails = Yup.object().shape({
    stage: Yup.string()
      .typeError("Add Stage to add new row")
      .required("Add Stage to add new row"),
  });

  const handleAddCropStageDetails = async (idx) => {
    try {
      const newArray = [...stageDetails];
      await validationSchemaStageDetails.validate(newArray[idx], {
        abortEarly: false,
      });
      // Create a copy of the current array
      const newStageDetail = {
        idx: idx + 1,
        stage: "",
      };

      // Use splice to insert the new object at the specified index
      newArray.splice(idx + 1, 0, newStageDetail);

      // Update the idx values to keep them sequential
      const updatedStageDetails = newArray.map((segment, index) => ({
        ...segment,
        idx: index,
      }));
      // Update the state with the new array
      setStageDetails(updatedStageDetails);
    } catch (error) {
      const newErrors = {};
      error?.inner?.forEach((error) => {
        newErrors[error?.path] = error?.message;
      });
      const err = Object.values(newErrors);
      toast.error(err[0]);
    }

  };




  const [segmentDetails, setSegmentDetails] = useState([
    {
      idx: 0,
      segment: "",
      productBrand: "",
      dose: "",
      wtaerLt: "",
      costLt: "",
      totalCost: "",
      startDate: "",
      endDate: "",
      totalDay: "",
      newStage: "",
    },
  ]);
  
  const validationSchemaSegmentDetails = Yup.object().shape({
 
    segment: Yup.string()
      .typeError("Add Segment to add new row")
      .required("Add Segment to add new row"),
    productBrand: Yup.string()
      .typeError("Add Product Brand to add new row")
      .required("Add Product Brand to add new row"),
 
    startDate: Yup.string()
      .typeError("Add Start date to add new row")
      .required("Add Start date to add new row"),
    endDate: Yup.string()
      .typeError("Add End date to add new row")
      .required("Add End date to add new row"),
  
    newStage: Yup.string()
      .typeError("Add Stage to add new row")
      .required("Add Stage to add new row"),
  });

  const handleAddCropSegmentDetails = async (idx) => {
    try {
      const newArray = [...segmentDetails];
      await validationSchemaSegmentDetails.validate(newArray[idx], {
        abortEarly: false,
      });
      // Create a copy of the current array
      const newSegmentDetail = {
        idx: idx + 1,
       
        segment: "",
        productBrand: "",
        dose: "",
        wtaerLt: "",
        costLt: "",
        totalCost: "",
        startDate: "",
        endDate: "",
        totalDay: "",
        newStage: "",
      };

      // Use splice to insert the new object at the specified index
      newArray.splice(idx + 1, 0, newSegmentDetail);

      // Update the idx values to keep them sequential
      const updatedSegmentDetails = newArray.map((segment, index) => ({
        ...segment,
        idx: index,
      }));

      // Update the state with the new array
      setSegmentDetails(updatedSegmentDetails);
    } catch (error) {
      const newErrors = {};
      error?.inner?.forEach((error) => {
        newErrors[error?.path] = error?.message;
      });
      const err = Object.values(newErrors);
      toast.error(err[0]);
    }
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

  const validationSchemaMarketDetails = Yup.object().shape({
    marketName: Yup.string()
      .typeError("Add Market/Mandi Name")
      .required("Add Market/Mandi Name")
      .test("unique-district", "Market Mandi must be unique", function (value) {
        const { path, parent, options } = this;
        const idx = parent.idx; // Get the index of the current row
        const isDuplicate = marketShare.some(
          (detail, i) => detail.marketName === value && i !== idx
        );
        return !isDuplicate;
      }),
    marketPotential: Yup.string()
      .typeError("Add Market Potential")
      .required("Add Market Potential"),
    business: Yup.string()
      .typeError("Add Our Business")
      .required("Add Our Business"),
    share: Yup.string().typeError("Add Our Share").required("Add Our Share"),
  });

  const handleAddMarketDetails = async (idx) => {
    try {
      // Create a copy of the current array
      const newArray = [...marketShare];
      await validationSchemaMarketDetails.validate(newArray[idx], {
        abortEarly: false,
      });

      const newMarketDetail = {
        idx: 0,
        marketName: "",
        marketPotential: "",
        business: "",
        share: "",
      };

      // Use splice to insert the new object at the specified index
      newArray.splice(idx + 1, 0, newMarketDetail);

      // Update the idx values to keep them sequential
      const updatedMarketDetails = newArray.map((item, index) => ({
        ...item,
        idx: index,
      }));

      // Update the state with the new array
      setMarketShare(updatedMarketDetails);
    } catch (error) {
      const newErrors = {};
      error?.inner?.forEach((error) => {
        newErrors[error?.path] = error?.message;
      });
      const err = Object.values(newErrors);
      toast.error(err[0]);
    }
  };

  const handleAdd = async (e) => {
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
         
            crop_segment: item.segment,
            share_percent: item.totalCost,
            product_brand: item.productBrand,
            dose_acre: item.dose,
            cost_kg_ltr: item.costLt,
            average_cost_acre:item.wtaerLt ,
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
        crop_stage: stageDetails.map((item) => {
          return {       
            cr_id: allFilters.crop,
            c_id: allFilters.companyId,
            stage_name: item.stage,        
          };
        }),
      };

      const respond = await axios
        .post(`${url}/api/add_crop_info`, JSON.stringify(data), {
          headers: headers,
          params: {
            cr_id: allFilters.crop,
          },
        })
        .then((res) => {
          toast.success(res.data.message);
          router.push({
            pathname: "/MR_Portal_Web/Crop_info_table",
          });
        });
    } catch (errors) {
      const errorMessage = errors?.response?.data?.message;
      toast.error(errorMessage);
      const newErrors = {};
      errors?.inner?.forEach((error) => {
        newErrors[error?.path] = error?.message;
      });
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        crop_info: cropDetails.map((item) => {
          return {
            cr_id: allFilters.crop,
            c_id: allFilters.companyId,
            district: item.district,
            total_cultivated_area_in_acre: item.cultivatedArea,
            area_in_acre:  item.area,
            share_percent: item.share,
            average_yield_acre: item.avYield,
            current_price_qtl:  item.currentPrice,
            input_cost:         item.inputCost,
            output_cost:        item.outputCost,
            roi:    item.roi,
          };
        }),
        crop_seg: segmentDetails.map((item) => {
          return {
            cr_id: allFilters.crop,
            c_id: allFilters.companyId,
         
            crop_segment: item.segment,
            share_percent: item.totalCost,
            product_brand: item.productBrand,
            dose_acre: item.dose,
            cost_kg_ltr: item.costLt,
            average_cost_acre:item.wtaerLt ,
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
        crop_stage: stageDetails.map((item) => {
          return {       
            cr_id: allFilters.crop,
            c_id: allFilters.companyId,
            stage_name: item.stage,        
          };
        }),
      };

      const respond = await axios
        .put(
          `${url}/api/update_crop_info/${allFilters.crop}`,
          JSON.stringify(data),
          {
            headers: headers,
          }
        )
        .then((res) => {
          toast.success(res.data.message);
          router.push({
            pathname: "/MR_Portal_Web/Crop_info_table",
          });
        });
    } catch (errors) {
      const errorMessage = errors?.response?.data?.message;
      toast.error(errorMessage);
      const newErrors = {};
      errors?.inner?.forEach((error) => {
        newErrors[error?.path] = error?.message;
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (router.query.type === "Add") {
      handleAdd(e);
    } else {
      handleEdit(e);
    }
  };
    
  return (
    <Layout>
      <div className="bg-white rounded p-4 w-full h-full   overflow-auto no-scrollbar">
        <Toaster position="bottom-center" reverseOrder={false} />
        {/* Filters */}
        <div className="mb-8 text-sm">
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
                disabled
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
                disabled={router.query.type !== "Add"}
                onChange={(e) => {
                  setAllFilters({
                    ...allFilters,
                    crop: e.target.value,
                  });
                }}
              >
                <option value="">- Select -</option>
                {allCropData.map((item, idx) => (
                  <option value={item.cr_id} key={idx}>
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
            <h2 className="text-md font-bold mb-4">
              Crop Details 
            </h2>
            <div className="overflow-x-auto">
              <table className="border-collapse border border-gray-400 w-full text-sm">
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
                  <tr className="bg-blue-500 text-white text-sm">
                    <th className="border border-gray-400 px-4 py-2">
                      District
                    </th>
                    <th className="border border-gray-400 px-4 py-2">
                      Total Cultivated Area (In acre)
                    </th>
                    <th className="border border-gray-400 px-4 py-2">
                      Area (In acre)
                    </th>
                    <th className="border border-gray-400 px-4 py-2">
                      Share %
                    </th>
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
                    {router.query.type !== "View" && (
                      <th className="border border-gray-400 px-4 py-2">
                        Action
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {cropDetails.map((item, index) => (
                    <tr>
                      <td className="border border-gray-400 px-4 py-2">
                        <select
                          className="w-full px-2 py-1 border border-gray-300 rounded "
                          value={item.district}
                          disabled={router.query.type === "View"}
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
                          disabled={router.query.type === "View"}
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
                          disabled={router.query.type === "View"}
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
                          disabled={router.query.type === "View"}
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
                          disabled={router.query.type === "View"}
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
                          disabled={router.query.type === "View"}
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
                          disabled={router.query.type === "View"}
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
                          disabled={router.query.type === "View"}
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
                          disabled={router.query.type === "View"}
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
                      {router.query.type !== "View" && (
                        <td className="border border-gray-400 px-4 py-2 flex flex-row gap-2">
                          <button
                            type="button"
                            className="inline-flex justify-center  text-white rounded-md border border-transparent bg-green-400 px-2 py-1 text-sm font-medium hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 whitespace-nowrap w-24"
                            onClick={() => handleAddCropDetails(index)}
                          >
                            Add Row
                          </button>
                          <button
                            type="button"
                            className="inline-flex justify-center  text-white rounded-md border border-transparent bg-red-400 px-2 py-1 text-sm font-medium hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 whitespace-nowrap w-24"
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
                            disabled={index === 0}
                          >
                            Delete Row
                          </button>
                        </td>
                      )}
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
                    <td className="border border-gray-400 px-4 py-2">-</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="mb-8">
            <h2 className="text-md font-bold mb-4">
              Crop Stage
            </h2>
            <div className="overflow-x-auto">
              <table className="border-collapse border border-gray-400 w-full text-[11px]">
              <colgroup>
    <col style={{ width: "18%" }} />   
    <col style={{ width: "12%" }} />  
     <col style={{ width: "6%" }} />   
     <col style={{ width: "6%" }} />   
    <col style={{ width: "10%" }} />   
  </colgroup>
                <thead>
                  <tr className="bg-blue-500 text-white">               
                    <th className="border border-gray-400 px-4 py-2">
                      Crop Stage
                    </th>
                   
                    {router.query.type !== "View" && (
                      <th className="border border-gray-400 px-4 py-2">
                        Action
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {stageDetails.map((item, index) => (
                    <tr key={index} className="w-full">             
                      <td className="border border-gray-400 px-4 py-2">                      
                      <input 
                          className="w-full px-2 py-1 border border-gray-300 rounded "
                          disabled={router.query.type === "View"}
                          value={item.stage}
                          onChange={(e) =>
                            setStageDetails(
                              stageDetails.map((el) => {
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
                     
                    
                    
                    

                      {router.query.type !== "View" && (
                        <td className="px-1 py-2 flex flex-row justify-between">
                          <button
                            type="button"
                            className="inline-flex justify-center  text-white rounded-md border border-transparent bg-green-400 px-2 py-1 text-[11px] hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 whitespace-nowrap w-12"
                           onClick={() => handleAddCropStageDetails(index)}
                          >
                            Add
                          </button>
                          <button
                            type="button"
                            className="inline-flex justify-center text-white rounded-md border border-transparent bg-red-400 px-2 py-1 text-[11px] hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 whitespace-nowrap w-12"
                             onClick={() => {
                              setStageDetails(
                                stageDetails
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
                      )}
                    </tr>
                  ))}







                 
                </tbody>
              </table>
            </div>
          </div>
          <div className="mb-8">
            <h2 className="text-md font-bold mb-4">
              Crop Segmentation 
            </h2>
            <div className="overflow-x-auto">
              <table className="border-collapse border border-gray-400 w-full text-[11px]">
              <colgroup>
              <col style={{ width: "18%" }} />   
              <col style={{ width: "14%" }} />   
              <col style={{ width: "8%" }} />   
              <col style={{ width: "6%" }} />   
              <col style={{ width: "6%" }} />   
              <col style={{ width: "6%" }} />   
              <col style={{ width: "12%" }} />   
              <col style={{ width: "12%" }} />  
              <col style={{ width: "12%" }} />  
              <col style={{ width: "6%" }} />   
              <col style={{ width: "10%" }} />   
              <col style={{ width: "10%" }} />   
              </colgroup>
                <thead>
                  <tr className="bg-blue-500 text-white">               
                    <th className="border border-gray-400 px-4 py-2">
                      Segment
                    </th>
                    <th className="border border-gray-400 px-4 py-2">
                      Product / Brand
                    </th>

                    <th className="border border-gray-400 px-4 py-2 whitespace-nowrap">
                      Dose/Acre (ml / gm) 
                    </th>
                    <th className="border border-gray-400 px-4 py-2">
                      Water / ltr
                    </th>
                    <th className="border border-gray-400 px-4 py-2">
                      Cost kg/Ltr 
                    </th>
                    <th className="border border-gray-400 px-4 py-2">
                      Total Cost 
                    </th>                  
                    <th className="border border-gray-400 px-4 py-2">
                      Start Date
                    </th>
                    <th className="border border-gray-400 px-4 py-2">
                      End Date
                    </th>
                    <th className="border border-gray-400 px-4 py-2">
                      Total Days 
                    </th>
                    <th className="border border-gray-400 px-4 py-2"> 
                      Stage
                      </th>
                    {router.query.type !== "View" && (
                      <th className="border border-gray-400 px-4 py-2">
                        Action
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody>
               
                  {segmentDetails.map((item, index) => (
                    <tr key={index} className="w-full">   
                      <td className="border border-gray-400 px-4 py-2">
                        <select
                          className="w-full px-2 py-1 border border-gray-300 rounded "
                          value={item.segment}
                          disabled={router.query.type === "View"}
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
                        >
                          <option value="">--Select--</option>
                          {allSegement.map((item, idx) => (
                            <option value={item.pseg_name} key={idx}>
                              {item.pseg_name}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="border border-gray-400 px-4 py-2">
                        <select
                          className="w-full px-2 py-1 border border-gray-300 rounded "
                          value={item.productBrand}
                          disabled={router.query.type === "View"}
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
                        >
                          <option value="">--Select--</option>
                          {allBrand.map((item, idx) => (
                            <option value={item.brand_name} key={idx}>
                              {item.brand_name}
                            </option>
                          ))}
                        </select>
                      </td>

                      <td className="border border-gray-400 px-4 py-2">
                        <input         
                          className="w-full px-2 py-1 border border-gray-300 rounded "
                          disabled={router.query.type === "View"}
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
                          disabled={router.query.type === "View"}
                          value={item.wtaerLt}
                          onChange={(e) =>
                            setSegmentDetails(
                              segmentDetails.map((el) => {
                                if (el.idx === index) {
                                  return {
                                    ...el,
                                    wtaerLt: e.target.value,
                                   
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
                          disabled={router.query.type === "View"}
                          value={item.costLt}
                          onChange={(e) =>
                            setSegmentDetails(
                              segmentDetails.map((el) => {
                                if (el.idx === index) {
                                  return {
                                    ...el,
                                    costLt: e.target.value,
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
                          value={item.totalCost}
                          onChange={(e) =>
                            setSegmentDetails(
                              segmentDetails.map((el) => {
                                if (el.idx === index) {
                                  return {
                                    ...el,
                                    totalCost: e.target.value,
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
                          className="w-full px-3 py-2 border rounded-lg   border-gray-300 focus:outline-none focus:border-indigo-500"
                          dateFormat="dd/MM/yyyy"
                          disabled={router.query.type === "View"}
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
                          className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                          dateFormat="dd/MM/yyyy"
                          disabled={router.query.type === "View"}
                          peekNextMonth
                          showMonthDropdown
                          showYearDropdown
                          dropdownMode="select"
                          minDate={item.startDate}
                          selected={item.endDate}
                          onChange={(date) =>
                            setSegmentDetails(
                              segmentDetails.map((el) => {
                                if (el.idx === index) {
                                  return {
                                    ...el,
                                    endDate: date,
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
                          className="w-full px-2 py-1 border border-gray-300 rounded "
                          value={item.newStage}
                          disabled={router.query.type === "View"}
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

                      {router.query.type !== "View" && (
                        <td className="border border-gray-400 px-1 py-2 flex flex-row gap-2">
                          <button
                            type="button"
                            className="inline-flex justify-center  text-white rounded-md border border-transparent bg-green-400 px-2 py-1 text-[11px] hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 whitespace-nowrap w-12"
                            onClick={() => handleAddCropSegmentDetails(index)}
                          >
                            Add
                          </button>
                          <button
                            type="button"
                            className="inline-flex justify-center text-white rounded-md border border-transparent bg-red-400 px-2 py-1 text-[11px] hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 whitespace-nowrap w-12"
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
                            disabled={index === 0}
                          >
                            Delete 
                          </button>
                        </td>
                      )}
                    </tr>
                  ))}







                  <tr className="bg-gray-900 text-white">
                    <td className="border border-gray-400 px-4 py-2">Total</td>
                  
                    <td className="border border-gray-400 px-4 py-2">-</td>

                    <td className="border border-gray-400 px-4 py-2">
                      -
                    </td>
                    <td className="border border-gray-400 px-4 py-2">
-
                    </td>
                    <td className="border border-gray-400 px-4 py-2">
                     -
                    </td>
                    <td className="border border-gray-400 px-4 py-2">
                    {segmentDetails
                        .map((item) => item.totalCost)
                        .reduce((acc, current) => {
                          // Check if the current element is a number

                          return Number(acc) + Number(current);
                        }, 0)}
                    </td>
                    
                    <td className="border border-gray-400 px-4 py-2">-</td>
                    <td className="border border-gray-400 px-4 py-2">-</td>
                    <td className="border border-gray-400 px-4 py-2">
                      {" "}
                     -
                    </td>
                    <td className="border border-gray-400 px-4 py-2">-</td>
                    <td className="border border-gray-400 px-4 py-2">-</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-md font-bold mb-4">
              Crop Market Share 
            </h2>
            <div className="overflow-x-auto">
              <table className="border-collapse border border-gray-400 w-full text-sm">
                <colgroup>
                  <col style={{ width: "10%" }} />{" "}
                  {/* Adjust width as needed */}
                  <col style={{ width: "9%" }} /> {/* Adjust width as needed */}
                  <col style={{ width: "9%" }} /> {/* Adjust width as needed */}
                  <col style={{ width: "9%" }} /> {/* Adjust width as needed */}
                  {router.query.type !== "View" && (
                    <col style={{ width: "1%" }} />
                  )}
                </colgroup>
                <thead>
                  <tr className="bg-blue-500 text-white">
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
                    {router.query.type !== "View" && (
                      <th className="border border-gray-400 px-4 py-2">
                        Action
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {marketShare.map((item, index) => (
                    <tr key={index}>
                      <td className="border border-gray-400 px-4 py-2">
                        <input
                          className="w-full px-2 py-1 border border-gray-300 rounded "
                          value={item.marketName}
                          disabled={router.query.type === "View"}
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
                          disabled={router.query.type === "View"}
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
                          disabled={router.query.type === "View"}
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
                          disabled={router.query.type === "View"}
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
                      {router.query.type !== "View" && (
                        <td className="border border-gray-400 px-4 py-2 flex flex-row gap-2">
                          <button
                            type="button"
                            className="inline-flex justify-center  text-white rounded-md border border-transparent bg-green-400 px-2 py-1 text-sm font-medium hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 whitespace-nowrap w-24"
                            onClick={() => handleAddMarketDetails(index)}
                          >
                            Add Row
                          </button>
                          <button
                            type="button"
                            className="inline-flex justify-center  text-white rounded-md border border-transparent bg-red-400 px-2 py-1 text-sm font-medium hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 whitespace-nowrap w-24"
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
                            disabled={index === 0}
                          >
                            Delete Row
                          </button>
                        </td>
                      )}
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
                     
                      {marketShare
                        .map((item) => item.share)
                        .reduce((acc, current) => {
                          // Check if the current element is a number

                          return Number(acc) + Number(current);
                        }, 0)}
                    </td>
                    <td className="border border-gray-400 px-4 py-2">-</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="w-full flex h-20 gap-4 mt-4">
              {router.query.type !== "View" && (
                <button
                  className="text-center rounded-md bg-green-500 text-white py-1 px-4 h-8 text-lg w-24"
                  type="submit"
                  onClick={(e) => handleSubmit(e)}
                >
                  Submit
                </button>
              )}
              <button
                className="text-center rounded-md bg-red-500 text-white py-1 px-4 text-lg h-8 w-24"
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  router.push({
                    pathname: "/MR_Portal_Web/Crop_info_table",
                  });
                }}
              >
                Close
              </button>
            </div>
          </div>
          {/* Additional Sections */}
        </form>
      </div>
    </Layout>
  );
};

export default AdditionalInfo;
