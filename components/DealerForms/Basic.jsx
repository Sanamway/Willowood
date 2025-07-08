import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import moment from "moment";
import { url, url2 } from "@/constants/url";
import Select from "react-select";

const Basic = (props) => {
  const router = useRouter();
  const [formActive, setFormActive] = useState(false);
  const headers = {
    "Content-Type": "application/json",
    secret: "fsdhfgsfuiweifiowefjewcewcebjw"
  };
  const [basicData, setBasicData] = useState({
    party_Name: "",
    pmobile: "",
    pemail: "",
    address: "",
    postal_Address: "",
    searchCity: {
      value: "",
      label: "",
      state: "",
      country: "",
      r_state_code: ""
    },
    pincode: "",
    district: "",
    contact_person: "",
    smobile: "",
    territory_name: "",
    terr_hod_name: "",
    region_hod_name: "",
    region_name: "",
    zone_hod_name: "",
    zone_name: "",
    business_unit_name: "",
    business_segment: "",
    cmpny_name: "",
    hod_name: "",
    gstemail: "",
    dealer_type: ""
  });

  const [localObj, setLocalObj] = useState({});

  useEffect(() => {
    if (props)
      setBasicData({
        party_Name: props?.data?.[0]?.party_Name || "",
        pmobile: props.data?.[0]?.pmobile || "",
        smobile: props.data?.[0]?.smobile || "",
        pemail: props.data?.[0]?.pemail || "",
        gstemail: props.data?.[0]?.gstemail || "",
        contact_person: props.data?.[0]?.contact_person || "",
        address: props.data?.[0]?.address || "",
        postal_Address: props.data?.[0]?.postal_Address || "",
        searchCity: {
          value: props.data?.[0]?.city || "",
          label: props.data?.[0]?.city || "",
          state: props.data?.[0]?.state || "",
          country: props.data?.[0]?.country || "",
          r_state_code: props.data?.[0]?.r_state_code || ""
        },
        district: props.data?.[0]?.district || "",
        pincode: props.data?.[0]?.pincode || "",
        dealer_type: props.data?.[0]?.dealer_type || ""
      });
  }, [props]);

  const [isLoading, setLoading] = useState(false);

  //update
  const handleEditBasic = async () => {
    setLoading(true);
    try {
      const data = {
        ...basicData,
        c_id: localObj.c_id,
        b_id: localObj.b_id,
        bu_id: localObj.bu_id,
        z_id: localObj.z_id,
        r_id: localObj.r_id,
        t_id: localObj.t_id,
        party_Name: basicData?.party_Name,
        pmobile: basicData?.pmobile,
        pemail: basicData?.pemail,
        gstemail: basicData?.gstemail,
        address: basicData?.address,
        postal_Address: basicData?.postal_Address,
        city: basicData?.searchCity.label,
        state: basicData?.searchCity.state,
        r_state_code: basicData?.searchCity.r_state_code,
        country: basicData?.searchCity.country,
        pincode: basicData?.pincode,
        dealer_type: basicData?.dealer_type == "" ? "dealer" : basicData?.dealer_type,
        district: basicData?.district,
        contact_person: basicData?.contact_person,
        smobile: basicData?.smobile,
        app_status: "Update Basic"
      };

      console.log("updateData", data);
      // return
      const respond = await axios
        .put(`${url}/api/update_dealerbasic/${router.query.id}`, JSON.stringify(data), {
          headers: headers
        })
        .then((res) => {
          if (!res) return;
          toast.success("Basic Details Updated!!");
          setTimeout(() => {
            props.formType("AdditionalInfo");
            setLoading(false);
          }, [2000]);
        });
    } catch (errors) {
      const errorMessage = errors?.response?.data?.message;
      if (errorMessage) toast.error(errorMessage);
      const newErrors = {};
      errors?.inner?.forEach((error) => {
        newErrors[error?.path] = error?.message;
      });
      if (newErrors.mobile) toast.error(newErrors.mobile);
      setLoading(false);
    }
  };

  const [citySearch, setCitySearch] = useState("");
  const [filteredCity, setFilteredCity] = useState([]);

  const getCityData = async (city) => {
    try {
      const resp = await axios.get(`${url}/api/get_citystate`, {
        params: { city: city, search: true },
        headers: headers
      });
      const response = await resp.data.data;
      setFilteredCity(
        response.map((item) => {
          return {
            value: item?.city,
            label: item?.city,
            state: item?.state,
            country: item?.country,
            r_state_code: item?.r_code
          };
        })
      );
    } catch (error) {}
  };

  useEffect(() => {
    if (citySearch) {
      getCityData(citySearch);
    }
  }, [citySearch]);

  useEffect(() => {
    if (window) {
      const localData = localStorage?.getItem("userinfo");
      const parsedData = JSON.parse(localData) || {};
      setLocalObj({
        c_id: parsedData?.c_id || "",
        b_id: parsedData?.bg_id || "",
        bu_id: parsedData?.bu_id || "",
        z_id: parsedData?.z_id || "",
        r_id: parsedData?.r_id || "",
        t_id: parsedData?.t_id || ""
      });
    }
  }, [props]);

  async function getBusinessInfo(id) {
    try {
      const resp = await axios.get(`${url}/api/get_territory?t_id=${id}`, { headers });
      const respdata = await resp.data.data;
      setBasicData({
        ...basicData,
        territory_name: respdata[0].territory_name,
        terr_hod_name: respdata[0].terr_hod_name,
        region_hod_name: respdata[0].region_hod_name,
        region_name: respdata[0].region_name,
        zone_hod_name: respdata[0].zone_hod_name,
        zone_name: respdata[0].zone_name,
        business_unit_name: respdata[0].business_unit_name,
        business_segment: respdata[0].business_segment,
        cmpny_name: respdata[0].cmpny_name,
        hod_name: respdata[0].hod_name,
        bu_hod_name: respdata[0].bu_hod_name,
        bg_hod_name: respdata[0].bg_hod_name,
        party_Name: props?.data?.[0]?.party_Name || "",
        pmobile: props.data?.[0]?.pmobile || "",
        smobile: props.data?.[0]?.smobile || "",
        pemail: props.data?.[0]?.pemail || "",
        gstemail: props.data?.[0]?.gstemail || "",
        dealer_type: props.data?.[0]?.dealer_type || "",
        contact_person: props.data?.[0]?.contact_person || "",
        address: props.data?.[0]?.address || "",
        postal_Address: props.data?.[0]?.postal_Address || "",
        searchCity: {
          value: props.data?.[0]?.city || "",
          label: props.data?.[0]?.city || "",
          state: props.data?.[0]?.state || "",
          country: props.data?.[0]?.country || "",
          r_state_code: props.data?.[0]?.r_state_code || ""
        },
        pincode: props.data?.[0]?.pincode || "",
        district: props.data?.[0]?.district || ""
      });
    } catch (error) {}
  }

  useEffect(() => {
    if (props?.data?.[0]?.t_id) {
      // getBusinessInfo(localObj?.t_id);
      getBusinessInfo(props?.data?.[0]?.t_id);
    }
  }, [props]);

  // console.log("party", basicData?.party_Name);

  //disbaling next button on ZAM approval

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
        // console.log("Error", error);
      }
    }
  }, [props]);

  console.log("propnew", props);
  const [isVisible, setIsVisible] = useState(false);

  //Handler For Same As GST Address

  const [prevPostAdd, setPrevPostAdd] = useState("");

  const handleSameasGST = (e) => {
    const checked = e.target.checked;
    if (checked) {
      setBasicData({ ...basicData, postal_Address: basicData.address });
      setPrevPostAdd(basicData.postal_Address);
    } else {
      setBasicData({ ...basicData, postal_Address: prevPostAdd });
    }
  };

  //Handling the Disabled fields of GST Sec Mob, Email

  const [disableBTN, setDisableBTN] = useState(null);
  useEffect(() => {
    if (props) {
      props?.data?.[0]?.d_type == "registered" ? setDisableBTN(true) : setDisableBTN(false);
    }
  }, [props]);

  //get distric api list

  const [districtList, setDistrictList] = useState(null);
  const getDistrictLis = async () => {
    const res = await axios.get(`${url}/api/get_dist_state?c_id=${localObj?.c_id}`, { headers });
    const apiRes = await res?.data?.data;
    console.log("District List", apiRes);
    setDistrictList(apiRes);
  };

  useEffect(() => {
    getDistrictLis();
  }, [props]);


  console.log("basicData", basicData)

  return (
    <form className=" bg-white rounded p-4 w-full  overflow-auto" onSubmit={(e) => e.preventDefault()}>
      <Toaster position="bottom-center" reverseOrder={false} />
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
            disabled
            value={basicData?.party_Name}
            onChange={(e) => setBasicData({ ...basicData, party_Name: e.target.value })}
          />
        </div>
      </div>
      <div className="flex flex-col  my-2 mb-2 lg:flex-row ">
        <div className="w-full px-2">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
            <small className="text-red-600">*</small> GST Address
          </label>
          <textarea
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            placeholder="Address"
            value={basicData.address}
            disabled={props.data?.[0]?.d_type == "registered"}
            onChange={(e) => setBasicData({ ...basicData, address: e.target.value })}
          />
        </div>
        <div className="w-full px-2">
          <div className="flex items-center justify-between ">
            <label className=" text-gray-700 text-sm font-bold mb-2 " htmlFor="inputField">
              <small className="text-red-600">*</small> Postal Address
            </label>
            <label className="flex items-center justify-center">
              <input type="checkbox" id="ownedCheckbox" className="mr-2" onChange={handleSameasGST} />
              <label>Same as GST Address</label>
            </label>
          </div>
          <textarea
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            placeholder="Postal Address"
            value={basicData.postal_Address}
            onChange={(e) => setBasicData({ ...basicData, postal_Address: e.target.value })}
          />
        </div>
      </div>

      <div className="flex my-2 mb-2 lg:flex-row flex-col">
        <div className="w-full px-2">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
            <small className="text-red-600">*</small> City
          </label>
          <Select
            className="w-full px-1  border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            value={basicData?.searchCity}
            isSearchable={true}
            name="color"
            options={filteredCity}
            onChange={(value) =>
              setBasicData({
                ...basicData,
                searchCity: value
              })
            }
            onInputChange={(searchVal) => setCitySearch(searchVal)}
          />
        </div>
        <div className="w-full px-2">
          <label className="block text-gray-700 text-sm font-bold mb-2 pt-2 lg:pt-0 " htmlFor="inputField">
            <small className="text-red-600 ">*</small> District
          </label>
          <select
            className="w-full px-3 py-2 border-b border-gray-500  bg-white focus:outline-none focus:border-b focus:border-indigo-500"
            id="stateSelect"
            value={basicData?.district}
            onChange={(e) => {
              setBasicData({
                ...basicData,
                district: e.target.value
              });
            }}
            disabled={formActive}
          >
            <option value="" className="focus:outline-none focus:border-b bg-white">
              Option
            </option>
            {/* <option value="District One">District One</option>
            <option value="District Two">District Two</option>
            <option value="District Three">District Three</option>
            <option value="District Four">District Four</option> */}
            {districtList?.map((district, index) => (
              <option key={index} value={district.district}>
                {district.district}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex my-2 mb-2 lg:flex-row flex-col ">
        <div className="w-full px-2">
          <label className="block text-gray-700 text-sm font-bold mb-2 pt-2" htmlFor="inputField">
            <small className="text-red-600">*</small> State
          </label>
          <input
            className="w-full px-3 py-2 border-b border-gray-500  bg-white focus:outline-none focus:border-b focus:border-indigo-500"
            id="stateSelect"
            value={basicData?.searchCity?.r_state_code + "-" + basicData?.searchCity?.state}
            onChange={(e) =>
              setBasicData({
                ...basicData,
                state: value,
                r_state_code: value
              })
            }
            disabled
          ></input>
        </div>
        <div className="w-full px-2 ">
          <label className="block text-gray-700 text-sm font-bold mb-2 pt-2" htmlFor="inputField">
            <small className="text-red-600">*</small> Country
          </label>
          <input
            className="w-full px-3 py-2 border-b border-gray-500  bg-white focus:outline-none focus:border-b focus:border-indigo-500"
            id="stateSelect"
            value={basicData?.searchCity?.country}
            onChange={(e) =>
              setBasicData({
                ...basicData,
                state: value
              })
            }
            disabled
          ></input>
        </div>
      </div>

      <div className="flex  my-2">
        <div className="w-full lg:w-full px-2">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
            <small className="text-red-600">*</small> Pin code
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="number"
            id="inputField"
            placeholder="Pin code"
            maxLength={6}
            value={basicData.pincode}
            onChange={(e) => {
              if (e.target.value.length > 6) {
                return;
              }
              setBasicData({ ...basicData, pincode: e.target.value });
            }}
          />
        </div>
      </div>

      <div className="flex my-2 mb-2 lg:flex-row flex-col ">
        <div className="w-full lg:w-full px-2">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
            <small className="text-red-600">*</small> Proprietary Name
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            placeholder="Proprietary Person"
            value={basicData.contact_person}
            onChange={(e) => {
              const inputValue = e.target.value;
              const re = /^[A-Za-z\s]*$/;
              if (re.test(inputValue) || inputValue === "") {
                setBasicData({ ...basicData, contact_person: e.target.value });
              }
            }}
          />
        </div>

        <div className="w-full lg:w-full px-2 py-2.5 ">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
            <small className="text-red-600">*</small> Customer Type
          </label>
          <select
            className="w-full px-3 py-2 border-b border-gray-500  bg-white focus:outline-none focus:border-b focus:border-indigo-500"
            id="stateSelect"
            value={basicData?.dealer_type}
            onChange={(e) => {
              setBasicData({
                ...basicData,
                dealer_type: e.target.value
              });
            }}
            disabled={formActive}
          >
            <option value="dealer" className="focus:outline-none focus:border-b bg-white">
              Dealer
            </option>
            <option value="c&f_agent">C&F Agent</option>
            <option value="stockist">Stockist</option>
            <option value="distributor">Distributor</option>
            <option value="retailer">Retailer</option>
          </select>
        </div>
      </div>

      <div className="flex my-2 mb-2 lg:flex-row flex-col ">
        <div className="w-full px-2">
          <label className="block text-gray-700 text-sm font-bold mb-2 pt-2" htmlFor="inputField">
            <small className="text-red-600">*</small> Primary Mobile
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="number"
            id="inputField"
            placeholder="Primary Mobile"
            maxLength={10}
            value={basicData.pmobile}
            onChange={(e) => {
              if (e.target.value.length > 10) {
                return;
              }
              setBasicData({ ...basicData, pmobile: e.target.value });
            }}
          />
        </div>
        <div className="w-full px-2 ">
          <label className="block text-gray-700 text-sm font-bold mb-2 pt-2" htmlFor="inputField">
            <small className="text-red-600"></small> GST Secondary Mobile
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="number"
            id="inputField"
            placeholder="GST Secondary Mobile"
            maxLength={10}
            value={basicData?.smobile}
            disabled={disableBTN}
            onChange={(e) => {
              if (e.target.value.length > 10) {
                return;
              }
              setBasicData({ ...basicData, smobile: e.target.value });
            }}
          />
        </div>
      </div>
      <div className="flex my-2 mb-2 lg:flex-row flex-col">
        <div className="w-full px-2">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
            <small className="text-red-600">*</small> Email
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="email"
            id="inputField"
            placeholder="Email"
            value={basicData.pemail}
            onChange={(e) => setBasicData({ ...basicData, pemail: e.target.value })}
          />
        </div>
        <div className="w-full px-2">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
            <small className="text-red-600"></small> GST Email
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="email"
            id="inputField"
            placeholder="GST Email"
            disabled={disableBTN}
            value={basicData.gstemail}
            onChange={(e) => setBasicData({ ...basicData, gstemail: e.target.value })}
          />
        </div>
      </div>

      <div className="flex justify-start items-center  w-full my-4">
        <h2 className="font-arial font-normal text-xl py-2 border-dashed  border-t-2 w-full border-b-2 border-l-0 border-r-0">
          Business Structure Info:{" "}
        </h2>
      </div>

      <div className="flex my-2 mb-2 lg:flex-row flex-col ">
        <div className="w-full px-2">
          <label className="block text-gray-700 text-sm font-bold mb-2 pt-2" htmlFor="inputField">
            <small className="text-red-600"></small> District
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            placeholder="District"
            value={basicData.district}
            disabled
            onChange={(e) => setBasicData({ ...basicData, district: e.target.value })}
          />
        </div>
        <div className="w-full px-2 ">
          <label className="block text-gray-700 text-sm font-bold mb-2 pt-2" htmlFor="inputField">
            <small className="text-red-600"></small> Territory
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            placeholder="Territory"
            value={basicData.territory_name}
            disabled
            onChange={(e) => setBasicData({ ...basicData, territory_name: e.target.value })}
          />
        </div>
      </div>

      <div className="flex my-2 mb-2 lg:flex-row flex-col ">
        <div className="w-full px-2">
          <label className="block text-gray-700 text-sm font-bold mb-2 pt-2" htmlFor="inputField">
            <small className="text-red-600"></small> Region
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            placeholder="Region"
            value={basicData.region_name}
            disabled
            onChange={(e) => setBasicData({ ...basicData, region_name: e.target.value })}
          />
        </div>
        <div className="w-full px-2 ">
          <label className="block text-gray-700 text-sm font-bold mb-2 pt-2" htmlFor="inputField">
            <small className="text-red-600"></small> Zone
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            placeholder="Zone"
            value={basicData.zone_name}
            disabled
            onChange={(e) => setBasicData({ ...basicData, zone_name: e.target.value })}
          />
        </div>
      </div>

      <div className="flex my-2 mb-2 lg:flex-row flex-col ">
        <div className="w-full px-2">
          <label className="block text-gray-700 text-sm font-bold mb-2 pt-2" htmlFor="inputField">
            <small className="text-red-600"></small> Business Unit
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            placeholder="Business Unit"
            value={basicData.business_unit_name}
            disabled
            onChange={(e) => setBasicData({ ...basicData, business_unit_name: e.target.value })}
          />
        </div>
        <div className="w-full px-2 ">
          <label className="block text-gray-700 text-sm font-bold mb-2 pt-2" htmlFor="inputField">
            <small className="text-red-600"></small> Segment
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            placeholder="Segment"
            value={basicData.business_segment}
            disabled
            onChange={(e) => setBasicData({ ...basicData, business_segment: e.target.value })}
          />
        </div>
      </div>

      <div className="flex my-2">
        <div className="w-full px-2">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
            <small className="text-red-600"></small> Company
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            placeholder="Company"
            value={basicData.cmpny_name}
            disabled
            onChange={(e) => setBasicData({ ...basicData, cmpny_name: e.target.value })}
          />
        </div>
      </div>

      <div className="flex my-2">
        <div className="w-full px-2">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
            <small className="text-red-600"></small> Territory Person
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            placeholder="Territory Person"
            value={basicData.terr_hod_name}
            disabled
            onChange={(e) => setBasicData({ ...basicData, terr_hod_name: e.target.value })}
          />
        </div>
      </div>

      <div className="flex my-2">
        <div className="w-full px-2">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
            <small className="text-red-600"></small> Region Person
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            placeholder="Region Person"
            value={basicData.region_hod_name}
            disabled
            onChange={(e) => setBasicData({ ...basicData, region_hod_name: e.target.value })}
          />
        </div>
      </div>

      <div className="flex my-2">
        <div className="w-full px-2">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
            <small className="text-red-600"></small> Zonal Head
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            placeholder="Zonal Head"
            value={basicData.zone_hod_name}
            disabled
            onChange={(e) => setBasicData({ ...basicData, zone_hod_name: e.target.value })}
          />
        </div>
      </div>

      <div className="flex my-2">
        <div className="w-full px-2">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
            <small className="text-red-600"></small> Unit Head
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            placeholder="Unit Head"
            disabled
            value={basicData.bu_hod_name}
            onChange={(e) => setBasicData({ ...basicData, bu_hod_name: e.target.value })}
          />
        </div>
      </div>

      {/* buttons */}
      {router.query.type === "Edit" && (
        <div className="my-20 flex items-center justify-center">
          <button
            // onClick={() => props.formType("Personal")}
            className="text-center rounded-md bg-orange-500 text-white py-1 px-4 text-lg"
            disabled={isLoading || disableNext}
            onClick={() => {
              handleEditBasic();
            }}
          >
            Next
          </button>
        </div>
      )}
    </form>
  );
};

export default Basic;
