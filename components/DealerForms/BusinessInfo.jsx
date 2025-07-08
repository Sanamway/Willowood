import React, { useEffect, useState } from "react";
import { BsCheck2Circle } from "react-icons/bs";
import { AiOutlineDelete } from "react-icons/ai";
import axios from "axios";
import { url } from "@/constants/url";
import toast, { Toaster } from "react-hot-toast";
import BusinessInfoModal from "../modals/BusinessInfoModal";
import DealerPersonal from "../modals/DealerPersonal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { useRouter } from "next/router";

const BusinessInfo = (props) => {
  const [formActive, setFormActive] = useState(false);
  const router = useRouter();
  const currentYear = new Date().getFullYear();
  const nextYears = Array.from({ length: 10 }, (_, index) => currentYear + index);

  const [businessInfOne, setBusinessInfOne] = useState({
    product: "",
    vol_qty: "",
    value_Amt: "",
    brand_name: "",
    brand_code: "",
    pseg_name: ""
  });

  const [ispabLength, setisPabLength] = useState(true);
  const [getBusiOneData, setGetBusiOneData] = useState([]);
  const [busiOneRender, setBusiOneRender] = useState(null);

  const [isYearOneShow, setYearOneShow] = useState(null);
  const [isYearTwoShow, setYearTwoShow] = useState(null);
  const [isYearThreeShow, setYearThreeShow] = useState(null);
  const [isYearFourShow, setYearFourShow] = useState(null);
  const [cid, setCid] = useState(null);
  const [brandList, setBrandList] = useState(null);

  const headers = {
    "Content-Type": "application/json",
    secret: "fsdhfgsfuiweifiowefjewcewcebjw"
  };

  useEffect(() => {
    if (props) {
      setBusinessInfOne({
        party_Name: props.data[0]?.party_Name || ""
      });
    }
  }, [props]);

  const handleBusiOne = async () => {
    try {
      const { product, vol_qty, value_Amt, brand_code, brand_name } = businessInfOne;
      const data = {
        product,
        vol_qty,
        value_Amt,
        brand_code,
        brand_name,
        d_id: props.data[0].d_id
      };
      const res = await axios.post(`${url}/api/add_dealerbusinessinfo`, JSON.stringify(data), { headers });
      const resApi = await res.data;
      if (!resApi) return;
      toast.success("BusinessInfo Added Successully");
      setTimeout(() => {
        setBusinessInfOne({
          product: "",
          vol_qty: "",
          value_Amt: "",
          brand_code: "",
          brand_name: ""
        });
        // props.formType("Assessment");
        setBusiOneRender(!busiOneRender);
      }, 1000);
    } catch (error) {
      if (error?.response?.data?.message) {
        toast.error(error?.response?.data?.message);
      }
    }
  };

  //dummydata
  const data = [
    {
      id: 1,
      name: "Property A",
      profit: "Real Estate",
      relation: 10,
      son_of: "$1,000,000",
      pan: "EJHVFBVERG5Y6",
      aadhar: "7658756865"
    },
    {
      id: 2,
      name: "Property B",
      profit: "Commercial",
      relation: 5,
      son_of: "$500,000",
      pan: "EJHVFBVERG5Y6",
      aadhar: "7658756865"
    },
    {
      id: 2,
      name: "Property B",
      profit: "Commercial",
      relation: 5,
      son_of: "$500,000",
      pan: "EJHVFBVERG5Y6",
      aadhar: "7658756865"
    },
    {
      id: 2,
      name: "Property B",
      profit: "Commercial",
      relation: 5,
      son_of: "$500,000",
      pan: "EJHVFBVERG5Y6",
      aadhar: "7658756865"
    },
    {
      id: 2,
      name: "Property B",
      profit: "Commercial",
      relation: 5,
      son_of: "$500,000",
      pan: "EJHVFBVERG5Y6",
      aadhar: "7658756865"
    },
    {
      id: 2,
      name: "Property B",
      profit: "Commercial",
      relation: 5,
      son_of: "$500,000",
      pan: "EJHVFBVERG5Y6",
      aadhar: "7658756865"
    }
  ];

  const getBusinessOne = async () => {
    try {
      const res = await axios.get(`${url}/api/get_dealerbusinessinfo?d_id=${router.query.id}`, {
        headers: headers
      });
      const resp = await res.data.data;
      setGetBusiOneData(resp);
      setisPabLength(true);
      console.log("getBusione", resp);
    } catch (error) {
      setisPabLength(false);
      console.log("Error", error);
    }
  };

  const [userId, setUserId] = useState(null);
  const [isOpen, setisOpen] = useState(false);

  useEffect(() => {
    getBusinessOne();
  }, [props, busiOneRender]);


  const deleteHandlerOne = async (item) => {
    console.log("febe", item);
    setisOpen(true);
    setUserId(item);
  };

  const resetData = () => {
    getBusinessOne();
    setisOpen(false);
  };

  ////**********************Second Form Data *********************** ///////

  const [busiTwoRender, setBusiTwoRender] = useState(null);
  const [busiTwoData, setGetBusiTwoData] = useState([]);
  const [pabtwoLength, setisPabTwoLength] = useState(true);
  const [businessInfoTwo, setBusinessInfoTwo] = useState({
    name_of_comp: "",
    no_of_yr: "",
    year_1: "",
    year_2: "",
    year_3: "",
    year_4: "",
    year_1_value: "",
    year_2_value: "",
    year_3_value: "",
    year_4_value: "",
    ratiocc: ""
  });

  const handleAddBusInfoTwo = async () => {
    try {
      const {
        name_of_comp,
        no_of_yr,
        year_1,
        year_2,
        year_3,
        year_4,
        year_1_value,
        year_2_value,
        year_3_value,
        year_4_value,
        ratiocc
      } = businessInfoTwo;
      const data = {
        name_of_comp,
        no_of_yr,
        year_1,
        year_2,
        year_3,
        year_4,
        year_1_value,
        year_2_value,
        year_3_value,
        year_4_value,
        ratiocc,
        d_id: props.data[0].d_id
      };

      return
      const res = await axios.post(`${url}/api/add_dealerbusinessinfoprev`, JSON.stringify(data), {
        headers: headers
      });
      const resp = await res.data;
      if (!resp) return;
      toast.success("BusinessInfo Added Successully");
      setTimeout(() => {
        setBusinessInfoTwo({
          name_of_comp: "",
          no_of_yr: "",
          year_1: "",
          year_2: "",
          year_3: "",
          year_4: "",
          year_1_value: "",
          year_2_value: "",
          year_3_value: "",
          year_4_value: "",
          ratiocc: ""
        });
        // props.formType("Assessment");
        setBusiTwoRender(!busiTwoRender);
      }, 1000);
    } catch (error) {
      if (error?.response?.data?.message) {
        toast.error(error?.response?.data?.message);
      }
    }
  };

  const getBusinessTwo = async () => {
    try {
      const res = await axios.get(`${url}/api/get_dealerbusinessinfoprev?d_id=${router.query.id}`, {
        headers: headers
      });
      const resp = await res.data.data;
      setGetBusiTwoData(resp);
      setisPabTwoLength(true);
      console.log("getBusione", resp);
    } catch (error) {
      setisPabTwoLength(false);
      console.log("Error", error);
    }
  };

  const [userIdTwo, setUserIdTwo] = useState(null);
  const [isOpenTwo, setisOpenTwo] = useState(false);

  const deleteHandlerTwo = async (item) => {
    setisOpenTwo(true);
    setUserIdTwo(item);
  };

  const resetDataTwo = () => {
    getBusinessTwo();
    setisOpenTwo(false);
  };

  useEffect(() => {
    getBusinessTwo();
  }, [props, busiTwoRender]);


  ////*******************Update Business Hanlder */

  const handleUpdateBusiness = async () => {
    try {
      const data = {
        party_Name: props?.data?.[0]?.party_Name || "",
        pmobile: props.data?.[0]?.pmobile || "",
        smobile: props.data?.[0]?.smobile || "",
        pemail: props.data?.[0]?.pemail || "",
        contact_person: props.data?.[0]?.contact_person || "",
        address: props.data?.[0]?.address || "",
        postal_Address: props.data?.[0]?.postal_Address || "",
        district: props.data?.[0]?.district || "",
        pincode: props.data?.[0]?.pincode || "",
        city: props.data?.[0]?.city || "",
        country: props.data?.[0]?.country || "",
        state: props.data?.[0]?.state || "",
        app_status: "Update Business"
      };

      console.log("updateData", data);
      const respond = await axios
        .put(`${url}/api/update_dealerbasic/${router.query.id}`, JSON.stringify(data), {
          headers: headers
        })
        .then((res) => {
          if (!res) return;
          toast.success("Business Details Updated!!");
          setTimeout(() => {
            props.formType("Security");
          }, [2000]);
        });
    } catch (errors) {
      const errorMessage = errors?.response?.data?.message;
      toast.error(errorMessage);
    }
  };

  const nextTabHandler = () => {
    if (busiTwoData.length > 0 && pabtwoLength && getBusiOneData?.length > 0 && ispabLength) {
      handleUpdateBusiness();
      // props.formType("Documents");
    } else {
      toast.error("Atleast one record required for business information update");
    }
  };

  // GetYearsTotal

  const getYearsTotal = (item) => {
    console.log("fnTotalYrs",item)
    const year1 = parseFloat(item.year_1_value) || 0;
    const year2 = parseFloat(item.year_2_value) || 0;
    const year3 = parseFloat(item.year_3_value) || 0;
    const year4 = parseFloat(item.year_4_value) || 0;
    const total = year1 + year2 + year3 + year4;
    return total;
  };

  //Table Headers

  const TableHeaders = [
    { label: "Year", key: businessInfoTwo.year_1 ? businessInfoTwo.year_1 : busiTwoData[0]?.year_1 },
    { label: "Year", key: businessInfoTwo.year_2 ? businessInfoTwo.year_2 : busiTwoData[0]?.year_2 },
    { label: "Year", key: businessInfoTwo.year_3 ? businessInfoTwo.year_3 : busiTwoData[0]?.year_3 },
    { label: "Year", key: businessInfoTwo.year_4 ? businessInfoTwo.year_4 : busiTwoData[0]?.year_4 }
  ];

  // console.log("Hello", businessInfoTwo );

  useEffect(() => {
    switch (businessInfoTwo.no_of_yr) {
      case "1":
        setYearOneShow(true);
        setYearTwoShow(false);
        setYearThreeShow(false);
        setYearFourShow(false);
        break;
      case "2":
        setYearOneShow(true);
        setYearTwoShow(true);
        setYearThreeShow(false);
        setYearFourShow(false);

        break;
      case "3":
        setYearOneShow(true);
        setYearTwoShow(true);
        setYearThreeShow(true);
        setYearFourShow(false);

        break;
      case "4":
        setYearOneShow(true);
        setYearTwoShow(true);
        setYearFourShow(true);
        setYearThreeShow(true);
        break;
      default:
        setYearOneShow(false);
        setYearTwoShow(false);
        setYearFourShow(false);
        setYearThreeShow(false);
    }
  }, [businessInfoTwo.no_of_yr]);

  //disbaling next button

  const [disableNext, setDisableNext] = useState(false);

  useEffect(() => {
    if (props) {
      try {
        if (
          props?.data[0]?.app_status == "Approved By Region" ||
          props?.data[0]?.app_status == "Approved By Zonal" ||
          props?.data[0]?.app_status == "Approved By Business Unit" ||
          props?.data[0]?.app_status == "Approved By Zonal A/c Manager"
        ) {
          setDisableNext(true);
        }
      } catch (error) {
        console.log("Error", error);
      }
    }
  }, [props]);

  //////////////////Get Product Brand List/////////////////////////////

  const getPrdBrandById = async (id) => {
    try {
      const resp = await axios.get(`${url}/api/get_product_brand/?c_id=${id}`, { headers: headers });
      const respData = await resp.data.data;
      // setBusinessInfOne({
      //   brand_name: respData?.brand_name,
      //   brand_code: respData?.brand_code,
      //   pseg_name: respData?.pseg_name
      // });
      setBrandList(respData);
      // console.log("Bramd List", respData);
    } catch (error) {
      console.log("ee", error);
    }
  };

  useEffect(() => {
    if (window.localStorage) {
      const userinfo = localStorage.getItem("userinfo");
      const userCheck = JSON.parse(userinfo);
      console.log("USERCH", userCheck?.c_id);
      setCid(userCheck?.c_id);
    }
  }, []);

  useEffect(() => {
    if (cid) {
      getPrdBrandById(cid);
    }
  }, [cid]);


  ///////////////////////////////////////////********JSX Starts*********//////////////////////////////////////* */

  return (
    <form className=" bg-white rounded  p-4 w-full  overflow-auto" onSubmit={(e) => e.preventDefault()}>
      <Toaster position="bottom-center" reverseOrder={false} />
      <BusinessInfoModal
        isOpen={isOpen}
        onClose={() => setisOpen(false)}
        onOpen={() => setisOpen(true)}
        d_id={userId?.d_id}
        b_id={userId?.b_id}
        method="get"
        onDeletedData={resetData}
        secondQUery="b_id"
        endpoints="delete_dealerbusinessinfo"
      ></BusinessInfoModal>

      <BusinessInfoModal
        isOpen={isOpenTwo}
        onClose={() => setisOpenTwo(false)}
        onOpen={() => setisOpenTwo(true)}
        d_id={userIdTwo?.d_id}
        b_id={userIdTwo?.bp_id}
        method="get"
        onDeletedData={resetDataTwo}
        secondQUery="bp_id"
        endpoints="delete_dealerbusinessinfoprev"
      ></BusinessInfoModal>
      <div className="flex my-2">
        <div className="w-full px-2">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
            <small className="text-red-600">*</small> Party Name
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            placeholder="Party Name"
            value={businessInfOne?.party_Name}
            disabled
          />
        </div>
      </div>

      <div className="w-full px-2">
        <label className="block text-gray-700 text-sm font-bold mb-2 pt-2">
          <span className="flex gap-1">
            <small className="text-red-600">*</small> Focus Product Sales Plan with Willowood
          </span>
        </label>
      </div>

      {/* new fields add  */}

      <div className="flex my-2 mb-2 lg:flex-row flex-col ">
        <div className="w-full px-2">
          <label className="block text-gray-700 text-sm font-bold mb-2 pt-2" htmlFor="inputField">
            <small className="text-red-600">*</small> Product
          </label>
          {/* <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            placeholder="product"
            value={businessInfOne?.product}
            onChange={(e) => {
              setBusinessInfOne({
                ...businessInfOne,
                product: e.target.value
              });
            }}
          /> */}
          {/* <select
            className="w-full px-3 py-2 border-b border-gray-500  bg-white focus:outline-none focus:border-b focus:border-indigo-500"
            id="stateSelect"
            value={businessInfOne?.product}
            onChange={(e) => {
              setBusinessInfOne({
                ...businessInfOne,
                product: e.target.value
              });
            }}
          >
            <option value="" className="focus:outline-none focus:border-b bg-white">
              -- select option --
            </option>
            {brandList?.map((option, idx) => (
              <option
                key={idx}
                value={option?.brand_code ? option?.brand_code : ""}
                onChange={(e) => {
                  setBusinessInfOne({
                    ...businessInfOne,
                    brand_name: option?.brand_name
                  });
                }}
                className="focus:outline-none focus:border-b bg-white"
              >
                {option?.brand_name ? option?.brand_name : "Select Option"}
              </option>
            ))}
          </select> */}

          <select
            className="w-full px-3 py-2 border-b border-gray-500 bg-white focus:outline-none focus:border-b focus:border-indigo-500"
            id="stateSelect"
            value={businessInfOne?.product}
            onChange={(e) => {
              const selectedOption = brandList.find((option) => option.brand_code === e.target.value);
              setBusinessInfOne({
                ...businessInfOne,
                product: e.target.value,
                brand_name: selectedOption?.brand_name || ""
              });
            }}
          >
            <option value="" className="focus:outline-none focus:border-b bg-white">
              -- select option --
            </option>
            {brandList?.map((option, idx) => (
              <option
                key={idx}
                value={option?.brand_code ? option?.brand_code : ""}
                className="focus:outline-none focus:border-b bg-white"
              >
                {option?.brand_name ? option?.brand_name : "Select Option"}
              </option>
            ))}
          </select>
        </div>
        <div className="w-full px-2 ">
          <label className="block text-gray-700 text-sm font-bold mb-2 pt-2" htmlFor="inputField">
            <small className="text-red-600">*</small> Volume
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="number"
            id="inputField"
            placeholder="volume"
            value={businessInfOne?.vol_qty}
            onChange={(e) => {
              setBusinessInfOne({
                ...businessInfOne,
                vol_qty: e.target.value
              });
            }}
          />
        </div>

        <div className="w-full px-2 ">
          <label className="block text-gray-700 text-sm font-bold mb-2 pt-2" htmlFor="inputField">
            <small className="text-red-600">*</small> Value
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="number"
            id="inputField"
            placeholder="value"
            value={businessInfOne?.value_Amt}
            onChange={(e) => {
              setBusinessInfOne({
                ...businessInfOne,
                value_Amt: e.target.value
              });
            }}
          />
        </div>
      </div>

      {/* new add button  */}

      {router.query.type === "Edit" && (
        <div className="my-3 flex items-center justify-end w-full px-2">
          <button
            onClick={handleBusiOne}
            className="bg-orange-500 flex items-center justify-center whitespace-nowrap text-white px-2 py-1.5 rounded-sm"
          >
            Add +
          </button>
        </div>
      )}
      {/* table One  */}

      {/* <div className="overflow-x-auto chat-scrollbar select-none w-full h-40 absolute "> */}
      <div className="overflow-x-auto chat-scrollbar select-none w-full md:w-full md:relative h-30">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 rounded-full ">
          <thead className="text-xs text-gray-900 text-center bg-blue-50 rounded-md ">
            <tr className="">
              <th className="px-1 py-1 text-left lg:text-[0.8rem] text-[0.6rem] text-gray-600 font-bold ">
                Product
              </th>

              <th className="px-4 py-1 text-left lg:text-[0.8rem] text-[0.6rem] text-gray-600 font-bold">
                Volume
              </th>

              <th className="px-2 py-1 text-left lg:text-[0.8rem] text-[0.6rem] text-gray-600 font-bold">
                Value
              </th>
              <th className="px-2 py-1 lg:text-[0.8rem] text-[0.6rem] text-gray-600 font-bold">Action</th>
            </tr>
          </thead>
          {!ispabLength ? (
            <h2>No Data Found</h2>
          ) : (
            <tbody className="bg-white divide-y divide-gray-200 break-normal ">
              {getBusiOneData?.length > 0 ? (
                getBusiOneData?.map((item) => (
                  <tr key={item?.id}>
                    <td
                      className={`px-2 text-left whitespace-nowrap py-1 lg:text-[0.8rem] text-[0.6rem] text-gray-900 border `}
                    >
                      {item?.product}
                    </td>
                    <td
                      className={`px-2 text-left whitespace-nowrap py-1 lg:text-[0.8rem] text-[0.6rem] text-gray-900 border `}
                    >
                      {item?.vol_qty}
                    </td>
                    <td
                      className={`px-2 text-left whitespace-nowrap py-1 lg:text-[0.8rem] text-[0.6rem] text-gray-900 border `}
                    >
                      {item?.value_Amt}
                    </td>
                    <td className="px-2 text-center whitespace-nowrap py-1 text-[0.6rem] text-gray-900 border">
                      <button
                        onClick={() => deleteHandlerOne(item)}
                        className="text-sm text-gray-900 font-light px-2 py-2 whitespace-nowrap"
                      >
                        {<AiOutlineDelete className="hover:text-red-500"></AiOutlineDelete>}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <>
                  <p>No Data Found</p>
                </>
              )}
            </tbody>
          )}
        </table>
      </div>

      <div className="w-full px-2 mt-10">
        <label className="block text-gray-700 text-sm font-bold mb-2 pt-2 ">
          <span className="flex gap-1 items-center">
            <small className="text-red-600 text-lg text-center ">*</small>Credit Evaluation
          </span>
        </label>
        <h2 className="flex flex-col lg:flex-row items-center gap-2">
          Maximum Credit Limit ={" "}
          <input className="border-b-2 outline-none" type="text" id="inputField" placeholder="" />% of total
          sales planned Rs{" "}
          <input
            disabled={true}
            className="border-b-2 outline-none text-center"
            type="text"
            id="inputField"
            placeholder="Value"
          />
          Lacs
        </h2>
      </div>

      <div className="w-full px-2 mt-4">
        <label className="block text-gray-700 text-sm font-bold mb-2 pt-2">
          <span className="flex gap-1 items-center">
            <small className="text-red-600 text-lg ">*</small> Particulars of the Pesticides Business For Last
            4 Years
          </span>
        </label>
      </div>

      {/* new fields added  */}

      <div className="flex my-2 mb-2 lg:flex-row flex-col ">
        <div className="w-full px-2">
          <label className="block text-gray-700 text-sm font-bold mb-2 pt-2" htmlFor="inputField">
            <small className="text-red-600">* </small> Name of the Company
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            placeholder="Name of the Company"
            value={businessInfoTwo?.name_of_comp}
            onChange={(e) => {
              setBusinessInfoTwo({
                ...businessInfoTwo,
                name_of_comp: e.target.value
              });
            }}
          />
        </div>
        <div className="w-full px-2 ">
          <label className="block text-gray-700 text-sm font-bold mb-2 pt-2" htmlFor="inputField">
            <small className="text-red-600">* </small> No of Years
          </label>

          <select
            className="w-full px-3 py-2 border-b border-gray-500  bg-white focus:outline-none focus:border-b focus:border-indigo-500"
            id="stateSelect"
            value={businessInfoTwo?.no_of_yr}
            onChange={(e) => {
              setBusinessInfoTwo({
                ...businessInfoTwo,
                no_of_yr: e.target.value
              });
            }}
          >
            <option value="" className="focus:outline-none focus:border-b bg-white">
              select
            </option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
        </div>
      </div>

      <div className="flex my-2 mb-2 lg:flex-row flex-col ">
        {isYearOneShow ? (
          <div className="flex One">
            <div className="w-full px-2">
              <label className="block text-gray-700 text-sm font-bold mb-2 pt-2" htmlFor="inputField">
                <small className="text-red-600">* </small> Years 1
              </label>
              <DatePicker
                className="w-full px-3 py-2 border-b border-gray-500  bg-white focus:outline-none focus:border-b focus:border-indigo-500"
                selected={new Date(businessInfoTwo?.year_1 ? businessInfoTwo?.year_1 : new Date())}
                showYearPicker
                dateFormat="yyyy"
                dropdownMode="select"
                onChange={(date) => {
                  setBusinessInfoTwo({
                    ...businessInfoTwo,
                    year_1: moment(date).format("yy")
                  });
                }}
                onChangeRaw={(e) => {
                  e.preventDefault();
                }}
              />
            </div>
            <div className="w-full px-2 ">
              <label className="block text-gray-700 text-sm font-bold mb-2 pt-2" htmlFor="inputField">
                <small className="text-red-600">* </small>Sales Value
              </label>
              <input
                className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                type="number"
                id="inputField"
                // disabled={businessInfoTwo?.year_1 ==""}
                maxLength={6}
                placeholder="Sales Value"
                value={businessInfoTwo?.year_1_value}
                onChange={(e) => {
                  setBusinessInfoTwo({
                    ...businessInfoTwo,
                    year_1_value: e.target.value
                  });
                }}
              />
            </div>
          </div>
        ) : null}

        {isYearTwoShow ? (
          <div className="flex two">
            <div className="w-full px-2 ">
              <label className="block text-gray-700 text-sm font-bold mb-2 pt-2" htmlFor="inputField">
                <small className="text-red-600">* </small> Year 2
              </label>
              <DatePicker
                className="w-full px-3 py-2 border-b border-gray-500  bg-white focus:outline-none focus:border-b focus:border-indigo-500"
                selected={new Date(businessInfoTwo?.year_2 ? businessInfoTwo?.year_2 : new Date())}
                showYearPicker
                dateFormat="yyyy"
                dropdownMode="select"
                minDate={
                  businessInfoTwo.year_1 ? new Date(parseInt(businessInfoTwo.year_1) + 1, 0, 1) : undefined
                }
                onChange={(date) => {
                  setBusinessInfoTwo({
                    ...businessInfoTwo,
                    year_2: moment(date).format("yy")
                  });
                }}
                onChangeRaw={(e) => {
                  e.preventDefault();
                }}
                disabled={businessInfoTwo.year_1 == ""}
              />
            </div>
            <div className="w-full px-2 inpuut">
              <label className="block text-gray-700 text-sm font-bold mb-2 pt-2" htmlFor="inputField">
                <small className="text-red-600">* </small> Sales Value
              </label>
              <input
                className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                type="number"
                id="inputField"
                maxLength={6}
                placeholder="Sales Value"
                value={businessInfoTwo?.year_2_value}
                onChange={(e) => {
                  setBusinessInfoTwo({
                    ...businessInfoTwo,
                    year_2_value: e.target.value
                  });
                }}
              />
            </div>
          </div>
        ) : null}
      </div>

      <div className="flex my-2 mb-2 lg:flex-row flex-col ">
        {isYearThreeShow ? (
          <div className="flex Three">
            <div className="w-full px-2">
              <label className="block text-gray-700 text-sm font-bold mb-2 pt-2" htmlFor="inputField">
                <small className="text-red-600">* </small> Years 3
              </label>
              <DatePicker
                className="w-full px-3 py-2 border-b border-gray-500  bg-white focus:outline-none focus:border-b focus:border-indigo-500"
                selected={new Date(businessInfoTwo?.year_3 ? businessInfoTwo?.year_3 : new Date())}
                // selected={new Date("2023")}
                showYearPicker
                dateFormat="yyyy"
                dropdownMode="select"
                minDate={
                  businessInfoTwo.year_2 ? new Date(parseInt(businessInfoTwo.year_2) + 1, 0, 1) : undefined
                }
                onChange={(date) => {
                  setBusinessInfoTwo({
                    ...businessInfoTwo,
                    year_3: moment(date).format("yy")
                  });
                }}
                onChangeRaw={(e) => {
                  e.preventDefault();
                }}
                disabled={businessInfoTwo.year_2 == ""}
              />
            </div>
            <div className="w-full px-2 inputtt ">
              <label className="block text-gray-700 text-sm font-bold mb-2 pt-2" htmlFor="inputField">
                <small className="text-red-600">* </small> Sales Value
              </label>
              <input
                className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                type="number"
                id="inputField"
                maxLength={6}
                placeholder="Sales Value"
                value={businessInfoTwo?.year_3_value}
                onChange={(e) => {
                  setBusinessInfoTwo({
                    ...businessInfoTwo,
                    year_3_value: e.target.value
                  });
                }}
              />
            </div>
          </div>
        ) : null}

        {isYearFourShow ? (
          <div className="flex four">
            <div className="w-full px-2">
              <label className="block text-gray-700 text-sm font-bold mb-2 pt-2" htmlFor="inputField">
                <small className="text-red-600">* </small> Years 4
              </label>
              <DatePicker
                className="w-full px-3 py-2 border-b border-gray-500  bg-white focus:outline-none focus:border-b focus:border-indigo-500"
                selected={new Date(businessInfoTwo?.year_4 ? businessInfoTwo?.year_4 : new Date())}
                showYearPicker
                dateFormat="yyyy"
                dropdownMode="select"
                minDate={
                  businessInfoTwo.year_3 ? new Date(parseInt(businessInfoTwo.year_3) + 1, 0, 1) : undefined
                }
                onChange={(date) => {
                  setBusinessInfoTwo({
                    ...businessInfoTwo,
                    year_4: moment(date).format("yy")
                  });
                }}
                onChangeRaw={(e) => {
                  e.preventDefault();
                }}
                disabled={businessInfoTwo.year_3 == ""}
              />
            </div>
            <div className="w-full px-2 ">
              <label className="block text-gray-700 text-sm font-bold mb-2 pt-2" htmlFor="inputField">
                <small className="text-red-600">* </small> Sales Value
              </label>
              <input
                className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                type="number"
                id="inputField"
                maxLength={6}
                placeholder="Sales Value"
                value={businessInfoTwo?.year_4_value}
                onChange={(e) => {
                  setBusinessInfoTwo({
                    ...businessInfoTwo,
                    year_4_value: e.target.value
                  });
                }}
              />
            </div>
          </div>
        ) : null}
      </div>
      <div className="w-full px-2 ratio">
        <label className="block text-gray-700 text-sm font-bold mb-2 pt-2" htmlFor="inputField">
          <small className="text-red-600">* </small> Ratio of Cash vs Credit
        </label>
        <input
          className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
          type="number"
          id="inputField"
          placeholder="Ratio Cash Credit"
          value={businessInfoTwo?.ratiocc}
          onChange={(e) => {
            setBusinessInfoTwo({
              ...businessInfoTwo,
              ratiocc: e.target.value
            });
          }}
        />
      </div>

      {/* second add button  */}

      {router.query.type === "Edit" && (
        <div className="my-3 flex items-center justify-end w-full px-2">
          <button
            onClick={handleAddBusInfoTwo}
            className="bg-orange-500 flex items-center justify-center whitespace-nowrap text-white px-2 py-1.5 rounded-sm"
          >
            Add +
          </button>
        </div>
      )}

      {/* second table  */}

      {/* <div className="overflow-x-auto chat-scrollbar select-none w-full h-40"> */}
      <div className="overflow-x-auto chat-scrollbar select-none w-full md:w-full  md:relative h-30">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 rounded-full ">
          <thead className="text-xs text-gray-900 text-center bg-blue-50 rounded-md ">
            <tr className="">
              <th className="px-1 py-1 text-left lg:text-[0.8rem] text-[0.6rem] text-gray-600 font-bold ">
                Name of the Company
              </th>

              <th className="px-4 py-1 text-left lg:text-[0.8rem] text-[0.6rem] text-gray-600 font-bold">
                No of Years
              </th>

              {/* <th className="px-2 py-1 text-left lg:text-[0.8rem] text-[0.6rem] text-gray-600 font-bold">
                Year 2020
              </th>
              <th className="px-2 py-1 text-left lg:text-[0.8rem] text-[0.6rem] text-gray-600 font-bold">
                Year 2021
              </th>

              <th className="px-2 py-1 text-left lg:text-[0.8rem] text-[0.6rem] text-gray-600 font-bold">
                Year 2022
              </th>
              <th className="px-2 py-1 text-left lg:text-[0.8rem] text-[0.6rem] text-gray-600 font-bold">
                Year 2023
              </th> */}
              {TableHeaders.map((item) => (
                <th className="px-2 py-1 text-left lg:text-[0.8rem] text-[0.6rem] text-gray-600 font-bold">
                  Year {item.key}
                </th>
              ))}
              <th className="px-2 py-1 text-left lg:text-[0.8rem] text-[0.6rem] text-gray-600 font-bold">
                Total Years
              </th>
              <th className="px-2 py-1 text-left lg:text-[0.8rem] text-[0.6rem] text-gray-600 font-bold">
                Ratio of Cash Credit
              </th>
              <th className="px-2 py-1 lg:text-[0.8rem] text-[0.6rem] text-gray-600 font-bold">Action</th>
            </tr>
          </thead>
          {!pabtwoLength ? (
            <h2>No Data Found</h2>
          ) : (
            <tbody className="bg-white divide-y divide-gray-200 break-normal ">
              {busiTwoData?.length > 0 ? (
                busiTwoData?.map((item) => (
                  <tr key={item?.id}>
                    <td
                      className={`px-2 text-left whitespace-nowrap py-1 lg:text-[0.8rem] text-[0.6rem] text-gray-900 border `}
                    >
                      {item?.name_of_comp}
                    </td>
                    <td
                      className={`px-2 text-left whitespace-nowrap py-1 lg:text-[0.8rem] text-[0.6rem] text-gray-900 border `}
                    >
                      {item?.no_of_yr}
                    </td>
                    <td
                      className={`px-2 text-left whitespace-nowrap py-1 lg:text-[0.8rem] text-[0.6rem] text-gray-900 border `}
                    >
                      {item?.year_1_value}
                    </td>
                    <td
                      className={`px-2 text-left whitespace-nowrap py-1 lg:text-[0.8rem] text-[0.6rem] text-gray-900 border `}
                    >
                      {item?.year_2_value}
                    </td>
                    <td
                      className={`px-2 text-left whitespace-nowrap py-1 lg:text-[0.8rem] text-[0.6rem] text-gray-900 border `}
                    >
                      {item?.year_3_value}
                    </td>
                    <td
                      className={`px-2 text-left whitespace-nowrap py-1 lg:text-[0.8rem] text-[0.6rem] text-gray-900 border `}
                    >
                      {item?.year_4_value}
                    </td>
                    <td
                      className={`px-2 text-left whitespace-nowrap py-1 lg:text-[0.8rem] text-[0.6rem] text-gray-900 border `}
                    >
                      {getYearsTotal(item)}
                    </td>
                    <td
                      className={`px-2 text-left whitespace-nowrap py-1 lg:text-[0.8rem] text-[0.6rem] text-gray-900 border `}
                    >
                      {item?.ratiocc}
                    </td>
                    <td className="px-2 text-center whitespace-nowrap py-1 text-[0.6rem] text-gray-900 border">
                      <button
                        onClick={() => deleteHandlerTwo(item)}
                        className="text-sm text-gray-900 font-light px-2 py-2 whitespace-nowrap"
                      >
                        {<AiOutlineDelete className="hover:text-red-500"></AiOutlineDelete>}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <>
                  <p>No Data Found</p>
                </>
              )}
            </tbody>
          )}
        </table>
      </div>

      {/* buttons */}
      <div className="w-full px-2 mt-10 md:mt-12">
        {router.query.type === "Edit" && (
          <div className="my-6 flex items-center justify-end ">
            <div className="flex items-center justify-center w-full gap-4 py-4 ">
              <button
                onClick={() => props.formType("Personal")}
                className={`text-center rounded-md hover:bg-green-500 ${
                  formActive ? "bg-green-400" : "bg-gray-400"
                }  text-white py-1 px-4 text-lg`}
              >
                Prev
              </button>
              <button
                // onClick={() => props.formType("Assessment")}
                disabled={disableNext}
                onClick={nextTabHandler}
                className="text-center rounded-md bg-orange-500 text-white py-1 px-4 text-lg"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </form>
  );
};

export default BusinessInfo;
