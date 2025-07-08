import React, { useState, useEffect } from "react";
import { BsCheck2Circle } from "react-icons/bs";
import axios from "axios";
import { url } from "@/constants/url";
import { useRouter } from "next/router";
import toast, { Toaster } from "react-hot-toast";
import { GiConsoleController } from "react-icons/gi";
import moment from "moment";

const SAPinfo = (props) => {
  const router = useRouter();
  const [formActive, setFormActive] = useState(false);
  const [ofDisable, setOFDisable] = useState(true);

  const [companyList, setCompanyList] = useState([]);
  const [salesOrgList, setSalesOrgList] = useState([]);
  const [distiChList, setDistiChList] = useState([]);
  const [divdropList, setDivDropList] = useState([]);
  const [shipCondList, setShipCondList] = useState([]);
  const [incotermList, setIncoDrop] = useState([]);
  const [paytermList, setPayTermList] = useState([]);
  const [customerPricingList, setCustomerPricingList] = useState([]);
  const [accountGroupList, setAccountGroupList] = useState([]);
  const [accassignList, setAccAssingList] = useState([]);
  const [reconciAccList, setReconciList] = useState([]);
  const [accgroupingList, setAccGroupList] = useState([]);
  const [currencyList, setCurrencyList] = useState([]);
  const [companyCode, setCompanyCode] = useState("");
  const [delvplantList, setDelvplantList] = useState([]);

  const [checkCID, setCid] = useState(null);

  const [sapinfo, setSapInfo] = useState({
    company_code: "",
    company_name: "",
    org_code: "",
    disti_ch: "",
    division: "",
    shipping_code: "",
    incoterms: "",
    incoterms_location: "",
    payterms: "",
    cpricode: "",
    accountGroup: "",
    accAssignGroup: "",
    accName: "",
    reconciapp: "",
    accoutingGroup: "",
    currency: "",
    accouGroupName: "",
    search_terms: "",
    customerSAPNo: "",
    customer_status: "",

    business_partner_no: "",
    name: "",
    name2: "",
    grouping: "ZDOM",
    location: "",
    extern_no: "",
    delv_plant: "",
    country1: "IN",
    tax_category1: "JOCG",
    tax_class1: "0",
    country2: "IN",
    tax_category2: "JOSG",
    tax_class2: "0",
    country3: "IN",
    tax_category3: "JOIG",
    tax_class3: "0",
    country4: "IN",
    tax_category4: "ZTCS",
    tax_class4: "3",
    country5: "IN",
    tax_category5: "ZTC1",
    tax_class5: "0",
    country6: "IN",
    tax_category6: "JOUG",
    tax_class6: "0",

    partner_function5: "ZA",
    pf_code5: "",

    partner_function6: "ZB",
    pf_code6: "",

    partner_function7: "ZC",
    pf_code7: "",

    partner_function8: "ZD",
    pf_code8: "",

    partner_function9: "ZE",
    pf_code9: "",

    balance_sheet: "ZA",
    bank_period_f: "",
    bank_period_t: "",
    dep_value_lac: "",
    dep_value_30_perc: "",
    valid_date_from: "",
    valid_date_to: "",
    segment_code: "",
    unit_code: "",
    zone_code: "",
    region_code: "",
    territory_code: ""
  });

  console.log("DATACHECK", sapinfo?.tax_class4);

  const headers = {
    "Content-Type": "application/json",
    secret: "fsdhfgsfuiweifiowefjewcewcebjw"
  };

  //Accessing the CID from the ls

  useEffect(() => {
    if (window.localStorage) {
      const cidInfo = localStorage.getItem("userinfo");
      setCid(JSON?.parse(cidInfo).c_id);
      console.log("CID", JSON?.parse(cidInfo).c_id);
    }
    delvPlantList();
  }, [props]);

  //Dropdown Company List

  const companyDropdown = async (checkCID) => {
    try {
      const res = await axios.get(`${url}/api/get_sapdealer?c_id=${checkCID}&SAP_type=SAP_Company`, {
        headers: headers
      });
      const resapi = await res.data.data;
      console.log("Company Drop", resapi);
      setCompanyList(resapi);
      setCompanyCode(resapi[0]?.CoCode);
    } catch (error) {
      console.log(error);
    }
  };

  const salesOrgdown = async (checkCID, cocode) => {
    try {
      const res = await axios.get(
        `${url}/api/get_sapdealer?c_id=${checkCID}&co_code=${cocode}&SAP_type=SAP_SalesOrg`,
        {
          headers: headers
        }
      );
      const resapi = await res.data.data;
      setSalesOrgList(resapi);
    } catch (error) {
      console.log("err", error);
    }
  };

  const distributChDrop = async (checkCID, cocode) => {
    try {
      const res = await axios.get(
        `${url}/api/get_sapdealer?c_id=${checkCID}&co_code=${cocode}&SAP_type=SAP_Dchannel`,
        {
          headers: headers
        }
      );
      const resapi = await res.data.data;
      setDistiChList(resapi);
    } catch (error) {
      console.log("err", error);
    }
  };

  const divisionDrop = async (checkCID, cocode) => {
    try {
      const res = await axios.get(
        `${url}/api/get_sapdealer?c_id=${checkCID}&co_code=${cocode}&SAP_type=SAP_Division`,
        {
          headers: headers
        }
      );
      const resapi = await res.data.data;
      setDivDropList(resapi);
    } catch (error) {
      console.log("err", error);
    }
  };

  const shippingConDrop = async (checkCID, cocode) => {
    try {
      const res = await axios.get(
        `${url}/api/get_sapdealer?c_id=${checkCID}&co_code=${cocode}&SAP_type=SAP_ShippingCond`,
        {
          headers: headers
        }
      );
      const resapi = await res.data.data;
      setShipCondList(resapi);
    } catch (error) {
      console.log("err", error);
    }
  };

  const incotermsDrop = async (checkCID, cocode) => {
    try {
      const res = await axios.get(
        `${url}/api/get_sapdealer?c_id=${checkCID}&co_code=${cocode}&SAP_type=SAP_Incoterms`,
        {
          headers: headers
        }
      );
      const resapi = await res.data.data;
      setIncoDrop(resapi);
    } catch (error) {
      console.log("err", error);
    }
  };

  const paytermsDrop = async (checkCID, cocode) => {
    try {
      const res = await axios.get(
        `${url}/api/get_sapdealer?c_id=${checkCID}&co_code=${cocode}&SAP_type=SAP_Payterm`,
        {
          headers: headers
        }
      );
      const resapi = await res.data.data;
      setPayTermList(resapi);
    } catch (error) {
      console.log("err", error);
    }
  };

  const customerPricingDrop = async (checkCID, cocode) => {
    try {
      const res = await axios.get(
        `${url}/api/get_sapdealer?c_id=${checkCID}&co_code=${cocode}&SAP_type=SAP_CPriceProcure`,
        {
          headers: headers
        }
      );
      const resapi = await res.data.data;
      setCustomerPricingList(resapi);
    } catch (error) {
      console.log("err", error);
    }
  };

  const accountGroupDrop = async (checkCID, cocode) => {
    try {
      const res = await axios.get(
        `${url}/api/get_sapdealer?c_id=${checkCID}&co_code=${cocode}&SAP_type=SAP_Acgroup`,
        {
          headers: headers
        }
      );
      const resapi = await res.data.data;
      setAccountGroupList(resapi);
    } catch (error) {
      console.log("err", error);
    }
  };

  const accountAssigGroupDrop = async (checkCID, cocode) => {
    try {
      const res = await axios.get(
        `${url}/api/get_sapdealer?c_id=${checkCID}&co_code=${cocode}&SAP_type=SAP_AcAssiggroup`,
        {
          headers: headers
        }
      );
      const resapi = await res.data.data;
      setAccAssingList(resapi);
    } catch (error) {
      console.log("err", error);
    }
  };

  const reconciAccDrop = async (checkCID, cocode) => {
    try {
      const res = await axios.get(
        `${url}/api/get_sapdealer?c_id=${checkCID}&co_code=${cocode}&SAP_type=SAP_RecoAccount`,
        {
          headers: headers
        }
      );
      const resapi = await res.data.data;
      setReconciList(resapi);
    } catch (error) {
      console.log("err", error);
    }
  };

  const accountingGroupDrop = async (checkCID, cocode) => {
    try {
      const res = await axios.get(
        `${url}/api/get_sapdealer?c_id=${checkCID}&co_code=${cocode}&SAP_type=SAP_AccountingGroup`,
        {
          headers: headers
        }
      );
      const resapi = await res.data.data;
      setAccGroupList(resapi);
    } catch (error) {
      console.log("err", error);
    }
  };
  const currencyDropdown = async (checkCID, cocode) => {
    try {
      const res = await axios.get(
        `${url}/api/get_sapdealer?c_id=${checkCID}&co_code=${cocode}&SAP_type=SAP_Currency`,
        {
          headers: headers
        }
      );
      const resapi = await res.data.data;
      setCompanyCode(resapi[0]?.CoCode);
      setCurrencyList(resapi);
    } catch (error) {
      console.log("err", error);
    }
  };

  useEffect(() => {
    // if (checkCID) {
    //   companyDropdown(checkCID);
    // }
    // if (checkCID && companyCode) {
    //   salesOrgdown(checkCID, companyCode);
    // }

    // if (checkCID && companyCode) {
    //   distributChDrop(checkCID, companyCode);
    // }
    // if (checkCID && companyCode) {
    //   divisionDrop(checkCID, companyCode);
    // }
    // if (checkCID && companyCode) {
    //   shippingConDrop(checkCID, companyCode);
    // }
    // if (checkCID && companyCode) {
    //   incotermsDrop(checkCID, companyCode);
    // }

    // if (checkCID && companyCode) {
    //   paytermsDrop(checkCID, companyCode);
    // }

    // if (checkCID && companyCode) {
    //   customerPricingDrop(checkCID, companyCode);
    // }
    // if (checkCID && companyCode) {
    //   accountGroupDrop(checkCID, companyCode);
    // }

    // if (checkCID && companyCode) {
    //   accountAssigGroupDrop(checkCID, companyCode);
    // }
    // if (checkCID && companyCode) {
    //   reconciAccDrop(checkCID, companyCode);
    // }
    // if (checkCID && companyCode) {
    //   accountingGroupDrop(checkCID, companyCode);
    // }
    // if (checkCID && companyCode) {
    //   currencyDropdown(checkCID, companyCode);
    // }
  }, [props, companyCode, sapinfo?.company_code]);


  //////////////////////////////////////////////////////////////////////////////////


  useEffect(()=>{
    if(!checkCID) return
   companyDropdown(checkCID)
  }, [props])

  useEffect(()=>{
    if(!checkCID || !companyCode ||!sapinfo?.company_code) return
    salesOrgdown(checkCID, companyCode)
  },[checkCID, companyCode, sapinfo?.company_name])

  useEffect(()=>{
    if(!checkCID || !companyCode || !sapinfo?.org_code ) return 
    distributChDrop(checkCID, companyCode)
  },[checkCID, companyCode, sapinfo?.org_code])

  useEffect(()=>{
    if(!checkCID || !companyCode || !sapinfo?.disti_ch) return
    divisionDrop(checkCID, companyCode)
  },[checkCID, companyCode, sapinfo?.disti_ch])

  useEffect(()=>{
    if(!checkCID || !companyCode || !sapinfo?.division) return
    shippingConDrop(checkCID, companyCode)
  },[checkCID, companyCode, sapinfo?.division])
  
  useEffect(()=>{
    if(!checkCID || !companyCode || !sapinfo?.shipping_code) return
    incotermsDrop(checkCID, companyCode)
  },[checkCID, companyCode, sapinfo?.shipping_code])

  useEffect(()=>{
    if(!checkCID || !companyCode || !sapinfo?.incoterms_location) return
    paytermsDrop(checkCID, companyCode)
  },[checkCID, companyCode, sapinfo?.incoterms_location])

  useEffect(()=>{
    if(!checkCID || !companyCode || !sapinfo?.payterms) return
    customerPricingDrop(checkCID, companyCode)
  },[checkCID, companyCode, sapinfo?.payterms])

  useEffect(()=>{
    if(!checkCID || !companyCode || !sapinfo?.cpricode) return
    accountGroupDrop(checkCID, companyCode)
  },[checkCID, companyCode, sapinfo?.cpricode])

  useEffect(()=>{
    if(!checkCID || !companyCode || !sapinfo?.accountGroup) return
    accountAssigGroupDrop(checkCID, companyCode)
  },[checkCID, companyCode, sapinfo?.accountGroup])

  useEffect(()=>{
    if(!checkCID || !companyCode || !sapinfo?.accAssignGroup) return
    reconciAccDrop(checkCID, companyCode)
  },[checkCID, companyCode, sapinfo?.accAssignGroup])

  useEffect(()=>{
    if(!checkCID || !companyCode || !sapinfo?.reconciapp) return
    accountingGroupDrop(checkCID, companyCode)
  },[checkCID, companyCode, sapinfo?.reconciapp])

  useEffect(()=>{
    if(!checkCID || !companyCode || !sapinfo?.accoutingGroup) return
    currencyDropdown(checkCID, companyCode)
  },[checkCID, companyCode, sapinfo?.accoutingGroup])

  ///////////////////////////////////////////////////////////////////////////////////

  
  

  //updating the SAP info

  const updateSapInfo = async () => {
    try {
      const {
        company_code,
        company_name,
        org_code,
        disti_ch,
        division,
        shipping_code,
        incoterms,
        incoterms_location,
        payterms,
        cpricode,
        accountGroup,
        accAssignGroup,
        reconciapp,
        accoutingGroup,
        currency,
        accouGroupName,
        search_terms,
        customerSAPNo,
        customer_status,
        business_partner_no,
        name,
        name2,
        grouping,
        location,
        extern_no,
        destination,
        delv_plant,
        country1,
        tax_category1,
        tax_class1,
        country2,
        tax_category2,
        tax_class2,
        country3,
        tax_category3,
        tax_class3,
        country4,
        tax_category4,
        tax_class4,
        country5,
        tax_category5,
        tax_class5,
        country6,
        tax_category6,
        tax_class6,
        partner_function5,
        pf_code5,
        partner_function6,
        pf_code6,
        partner_function7,
        pf_code7,
        partner_function8,
        pf_code8,
        partner_function9,
        pf_code9,
        balance_sheet,
        bank_period_f,
        bank_period_t,
        dep_value_lac,
        dep_value_30_perc,
        valid_date_from,
        valid_date_to,
        segment_code,
        unit_code,
        zone_code,
        region_code,
        territory_code
      } = sapinfo;

      const requiredFields = {
        company_code: "Company Code",
        org_code: "Organization Code",
        disti_ch: "Distributor Channel",
        division: "Division",
        shipping_code: "Shipping Code",
        payterms: "Payment Terms",
        cpricode: "Customer Pricing",
        accountGroup: "Account Group",
        accAssignGroup: "Assigned Account Group",
        reconciapp: "Reconciliation Account",
        accoutingGroup: "Accounting Group",
        currency: "Currency",
        incoterms_location: "Incoterms Location",
        search_terms: "Search Terms"
      };

      // const missingFields = Object.entries(requiredFields)
      //   .filter(([field, label]) => !sapinfo[field])
      //   .map(([field, label]) => label);

      // if (missingFields.length > 0) {
      //   const errorMessage = `Please provide required fields: ${missingFields.join(", ")}`;
      //   toast.error(errorMessage);
      //   return;
      // }

      // if(pf_code5.length<8 || pf_code6.length<8 || pf_code7.length<8 || pf_code8.length<8 ||pf_code9.length<8 ){
      //   toast.error("Please enter the valid PF Code");
      //   return
      // }

      const pfCodeFields = [
        { name: "PF Code 5", value: pf_code5 },
        { name: "PF Code 6", value: pf_code6 },
        { name: "PF Code 7", value: pf_code7 },
        { name: "PF Code 8", value: pf_code8 },
        { name: "PF Code 9", value: pf_code9 }
      ];

      const invalidFields = pfCodeFields.filter((field) => field.value.length < 8);

      if (invalidFields.length > 0) {
        const errorMessages = invalidFields.map(
          (field) => `${field.name} must be at least 8 characters long`
        );
        errorMessages.forEach((message) => toast.error(message));
        return;
      }

      const data = {
        SAP_Company: company_code,
        SAP_SalesOrg: org_code,
        SAP_Dchannel: disti_ch,
        SAP_Division: division,
        SAP_ShippingCond: shipping_code,
        SAP_Payterm: payterms,
        SAP_CPriceProcure: cpricode,
        SAP_Acgroup: accountGroup,
        SAP_AcAssiggroup: accAssignGroup,
        SAP_RecoAccount: reconciapp,
        SAP_AccountingGroup: accoutingGroup,
        SAP_Currency: currency,
        SAP_incoterms: incoterms,
        SAP_incoterms_location: incoterms_location,
        SAP_search_terms: search_terms,
        SAP_customerSAPNo: customerSAPNo,
        SAP_customer_status: customer_status ?? "active",
        business_partner_no,
        name,
        name2,
        grouping: grouping ?? "ZDOM",
        location,
        extern_no,
        destination,
        delv_plant,
        country1: country1 ?? "IN",
        tax_category1: tax_category1 ?? "JOCG",
        tax_class1: tax_class1 ?? "0",
        country2: country2 ?? "IN",
        tax_category2: tax_category2 ?? "JOSG",
        tax_class2: tax_class2 ?? "0",
        country3: country3 ?? "IN",
        tax_category3: tax_category3 ?? "JOIG",
        tax_class3: tax_class3 ?? "0",
        country4: country4 ?? "IN",
        tax_category4: tax_category4 ?? "ZTCS",
        tax_class4: tax_class4 ?? "0",
        country5: country5 ?? "IN",
        tax_category5: tax_category5 ?? "ZTC1",
        tax_class5: tax_class5 ?? "0",
        country6: country6 ?? "IN",
        tax_category6: tax_category6 ?? "JOUG",
        tax_class6: tax_class6 ?? "0",

        partner_function5: partner_function5 ?? "ZA",
        pf_code5,
        partner_function6: partner_function6 ?? "ZB",
        pf_code6,
        partner_function7: partner_function7 ?? "ZC",
        pf_code7,
        partner_function8: partner_function8 ?? "ZD",
        pf_code8,
        partner_function9: partner_function9 ?? "ZE",
        pf_code9,

        balance_sheet: balance_sheet ?? "ZA",
        bank_period_f,
        bank_period_t,
        dep_value_lac,
        dep_value_30_perc,
        valid_date_from,
        valid_date_to,
        segment_code: segment_code ? segment_code : "SEG101",
        unit_code: unit_code ? unit_code : "UNI101",
        zone_code: zone_code ? zone_code : "ZONE101",
        region_code: region_code ? region_code : "REG101",
        territory_code: territory_code ? territory_code : "TERR101",

        app_status: "Update SAP Info"
      };
      console.log("SAAPPPP", data);
      // return;
      const res = await axios.put(
        `${url}/api/update_dealersapinfo/${router.query.id}`,
        JSON.stringify(data),
        {
          headers: headers
        }
      );
      const resApi = await res.data;
      if (!resApi) return;
      toast.success("SAP Info Updated Successfully !");
      setTimeout(() => {
        props.formType("Approval");
        // setLoading(false);
      }, [2000]);
    } catch (error) {
      const message = error?.response?.data?.message;
      toast.error(message);
    }
  };

  //Getting Data From Props

  useEffect(() => {
    if (props) {
      setSapInfo({
        ...sapinfo,
        company_code: props?.data[0]?.SAP_Company,
        org_code: props?.data[0]?.SAP_SalesOrg,
        disti_ch: props?.data[0]?.SAP_Dchannel,
        division: props?.data[0]?.SAP_Division,
        shipping_code: props?.data[0]?.SAP_ShippingCond,
        incoterms: props?.data[0]?.SAP_incoterms,
        incoterms_location: props?.data[0]?.SAP_incoterms_location,
        payterms: props?.data[0]?.SAP_Payterm,
        cpricode: props?.data[0]?.SAP_CPriceProcure,
        accountGroup: props?.data[0]?.SAP_Acgroup,
        accAssignGroup: props?.data[0]?.SAP_AcAssiggroup,
        reconciapp: props?.data[0]?.SAP_RecoAccount,
        accoutingGroup: props?.data[0]?.SAP_AccountingGroup,
        currency: props?.data[0]?.SAP_Currency,
        search_terms: props?.data[0]?.SAP_search_terms,
        customerSAPNo: props?.data[0]?.SAP_customerSAPNo,
        customer_status: props?.data[0]?.SAP_customer_status,
        business_partner_no: props?.data[0]?.business_partner_no,
        name: props?.data[0]?.name,
        name2: props?.data[0]?.name2,
        grouping: props?.data[0]?.grouping,
        location: props?.data[0]?.location,
        extern_no: props?.data[0]?.extern_no,
        destination: props?.data[0]?.destination,
        delv_plant: props?.data[0]?.delv_plant,

        country1: props?.data[0]?.country1,
        tax_category1: props?.data[0]?.tax_category1,
        tax_category1: props?.data[0]?.tax_class1,

        country2: props?.data[0]?.country2,
        tax_category2: props?.data[0]?.tax_category2,
        tax_category2: props?.data[0]?.tax_class2,

        country3: props?.data[0]?.country3,
        tax_category3: props?.data[0]?.tax_category3,
        tax_category3: props?.data[0]?.tax_class3,

        country4: props?.data[0]?.country4,
        tax_category4: props?.data[0]?.tax_category4,
        tax_category4: props?.data[0]?.tax_class4,

        country5: props?.data[0]?.country5,
        tax_category5: props?.data[0]?.tax_category5,
        tax_category5: props?.data[0]?.tax_class5,

        country6: props?.data[0]?.country6,
        tax_category6: props?.data[0]?.tax_category6,
        tax_category6: props?.data[0]?.tax_class6,

        partner_function5: props?.data[0]?.partner_function5,
        pf_code5: props?.data[0]?.pf_code5,

        partner_function6: props?.data[0]?.partner_function6,
        pf_code6: props?.data[0]?.pf_code6,

        partner_function7: props?.data[0]?.partner_function7,
        pf_code7: props?.data[0]?.pf_code7,

        partner_function8: props?.data[0]?.partner_function8,
        pf_code8: props?.data[0]?.pf_code8,

        partner_function9: props?.data[0]?.partner_function9,
        pf_code9: props?.data[0]?.pf_code9,

        balance_sheet: props?.data[0]?.balance_sheet,
        bank_period_f: props?.data[0]?.bank_period_f,
        bank_period_t: props?.data[0]?.bank_period_t,
        dep_value_lac: props?.data[0]?.dep_value_lac,
        dep_value_30_perc: props?.data[0]?.dep_value_30_perc,
        valid_date_from: props?.data[0]?.valid_date_from,
        valid_date_to: props?.data[0]?.valid_date_to,
        segment_code: props?.data[0]?.business_seg_code,
        unit_code: props?.data[0]?.business_unit_code,
        zone_code: props?.data[0]?.zone_code,
        region_code: props?.data[0]?.region_code,
        territory_code: props?.data[0]?.territory_code
      });
    }
  }, [props]);

  useEffect(() => {
    if (sapinfo?.company_code == undefined) {
      setOFDisable(true);
    } else {
      setOFDisable(false);
    }
  }, [props, sapinfo.company_code]);

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

  //DropDown List API

  async function delvPlantList() {
    const resp = await axios.get(`${url}/api/get_warehousedepot`, {
      headers: headers
    });
    const apiRes = await resp.data.data;
    setDelvplantList(apiRes);
  }

  console.log("Props", props);
  console.log("compList", companyList);
  // console.log("COMPANY", props?.data[0]?.company_code);

  return (
    <>
      <section className="outer section">
        <form className=" bg-white rounded  p-4 w-full  overflow-auto" onSubmit={(e) => e.preventDefault()}>
          <Toaster position="bottom-center" reverseOrder={false} />
          <div className="flex my-2">
            <div className="w-full px-2">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
                <small className="text-red-600"></small> Party Name
              </label>
              <input
                className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                type="text"
                id="inputField"
                value={props?.data[0]?.party_Name}
                placeholder="Party Name"
                disabled
              />
            </div>
          </div>

          <div className="flex my-2 mb-2 lg:flex-row flex-col ">
            <div className="w-full px-2">
              <label className="block text-gray-700 text-sm font-bold mb-2 pt-2" htmlFor="inputField">
                <small className="text-red-600">*</small> Company Code
              </label>
              <select
                name=""
                id=""
                value={sapinfo?.company_code}
                onChange={(e) => {
                  if (e) {
                    setOFDisable(ofDisable);
                  }
                  const compCode = e.target.value;
                  const selectedCompName = companyList.find((item) => item.name == compCode) || "";
                  console.log("bjrfv", selectedCompName.CoCode),
                    setSapInfo({
                      ...sapinfo,
                      company_code: compCode,
                      company_name: selectedCompName.CoCode
                    });
                }}
                className="w-full px-3 py-2 border-b border-gray-500  bg-white focus:outline-none focus:border-b focus:border-indigo-500"
              >
                <option value="">Select</option>
                {companyList.map((list) => (
                  <option value={list.CoCode}>{list.name}</option>
                ))}
              </select>
            </div>
            <div className="w-full px-2 ">
              <label className="block text-gray-700 text-sm font-bold mb-2 pt-2" htmlFor="inputField">
                <small className="text-red-600">*</small> Sales Organisation
              </label>
              <select
                disabled={ofDisable}
                name=""
                id=""
                value={sapinfo?.org_code}
                onChange={(e) => {
                  const saleCODE = e.target.value;
                  setSapInfo({
                    ...sapinfo,
                    org_code: e.target.value
                  });
                }}
                className="w-full px-3 py-2 border-b border-gray-500  bg-white focus:outline-none focus:border-b focus:border-indigo-500"
              >
                <option value="">Select</option>
                {salesOrgList.map((list) => (
                  <option value={list.OrgCode}>{list.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex my-2 mb-2 lg:flex-row flex-col ">
            <div className="w-full px-2">
              <label className="block text-gray-700 text-sm font-bold mb-2 pt-2" htmlFor="inputField">
                <small className="text-red-600">*</small> Distributor Channel
              </label>
              <select
                name=""
                id=""
                value={sapinfo?.disti_ch}
                disabled={ofDisable}
                onChange={(e) => {
                  setSapInfo({
                    ...sapinfo,
                    disti_ch: e.target.value
                  });
                }}
                className="w-full px-3 py-2 border-b border-gray-500  bg-white focus:outline-none focus:border-b focus:border-indigo-500"
              >
                <option value="">Select</option>
                {distiChList.map((list) => (
                  <option value={list.DCCode}>{list.name}</option>
                ))}
              </select>
            </div>
            <div className="w-full px-2 ">
              <label className="block text-gray-700 text-sm font-bold mb-2 pt-2" htmlFor="inputField">
                <small className="text-red-600">*</small> Division
              </label>
              <select
                name=""
                id=""
                disabled={ofDisable}
                value={sapinfo?.division}
                onChange={(e) => {
                  setSapInfo({
                    ...sapinfo,
                    division: e.target.value
                  });
                }}
                className="w-full px-3 py-2 border-b border-gray-500  bg-white focus:outline-none focus:border-b focus:border-indigo-500"
              >
                <option value="">Select</option>
                {divdropList.map((list) => (
                  <option value={list.DVCode}>{list.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex my-2 mb-2 lg:flex-row flex-col ">
            <div className="w-full px-2">
              <label className="block text-gray-700 text-sm font-bold mb-2 pt-2" htmlFor="inputField">
                <small className="text-red-600">*</small> Shipping Condition
              </label>
              <select
                name=""
                id=""
                disabled={ofDisable}
                value={sapinfo?.shipping_code}
                onChange={(e) => {
                  setSapInfo({
                    ...sapinfo,
                    shipping_code: e.target.value
                  });
                }}
                className="w-full px-3 py-2 border-b border-gray-500  bg-white focus:outline-none focus:border-b focus:border-indigo-500"
              >
                <option value="">Select</option>
                {shipCondList.map((list) => (
                  // <option value={list.SHCode}>{list.name}</option>
                  <option value={list.SHCode}>{list.name}</option>
                ))}
              </select>
            </div>

            <div className="w-full px-2 ">
              <label className="block text-gray-700 text-sm font-bold mb-2 pt-2" htmlFor="inputField">
                <small className="text-red-600">*</small> Incoterms
              </label>
              <select
                name=""
                id=""
                disabled={ofDisable}
                value={sapinfo?.incoterms}
                onChange={(e) => {
                  setSapInfo({
                    ...sapinfo,
                    incoterms: e.target.value
                  });
                }}
                className="w-full px-3 py-2 border-b border-gray-500  bg-white focus:outline-none focus:border-b focus:border-indigo-500"
              >
                <option value="">Select</option>
                {incotermList.map((list) => (
                  // <option value={list.IncoCode}>{list.name}</option>
                  <option value={list.IncoCode}>{list.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex my-2 mb-2 lg:flex-row flex-col ">
            <div className="w-full px-2">
              <label className="block text-gray-700 text-sm font-bold mb-2 pt-2" htmlFor="inputField">
                <small className="text-red-600">*</small> Incoterms Location
              </label>
              <input
                name=""
                id=""
                disabled={ofDisable}
                value={sapinfo?.incoterms_location}
                onChange={(e) => {
                  setSapInfo({
                    ...sapinfo,
                    incoterms_location: e.target.value
                  });
                }}
                placeholder="Enter incoterms location"
                className="w-full px-3 py-1.5 border-b border-gray-500  bg-white focus:outline-none focus:border-b focus:border-indigo-500"
              ></input>
            </div>
            <div className="w-full px-2 ">
              <label className="block text-gray-700 text-sm font-bold mb-2 pt-2" htmlFor="inputField">
                <small className="text-red-600">*</small> Payment Terms
              </label>
              <select
                name=""
                id=""
                disabled={ofDisable}
                value={sapinfo?.payterms}
                onChange={(e) => {
                  setSapInfo({
                    ...sapinfo,
                    payterms: e.target.value
                  });
                }}
                className="w-full px-3 py-2 border-b border-gray-500  bg-white focus:outline-none focus:border-b focus:border-indigo-500"
              >
                <option value="">Select</option>
                {paytermList.map((list) => (
                  // <option value={list.PayCode}>{list.name}</option>
                  <option value={list.PayCode}>{list.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex my-2 mb-2 lg:flex-row flex-col ">
            <div className="w-full px-2">
              <label className="block text-gray-700 text-sm font-bold mb-2 pt-2" htmlFor="inputField">
                <small className="text-red-600">*</small> Customer Pricing Procedure
              </label>
              <select
                name=""
                id=""
                disabled={ofDisable}
                value={sapinfo?.cpricode}
                onChange={(e) => {
                  setSapInfo({
                    ...sapinfo,
                    cpricode: e.target.value
                  });
                }}
                className="w-full px-3 py-2 border-b border-gray-500  bg-white focus:outline-none focus:border-b focus:border-indigo-500"
              >
                <option value="">Select</option>
                {customerPricingList.map((list) => (
                  // <option value={list.CPricCode}>{list.name}</option>
                  <option value={list.CPricCode}>{list.name}</option>
                ))}
              </select>
            </div>
            <div className="w-full px-2 ">
              <label className="block text-gray-700 text-sm font-bold mb-2 pt-2" htmlFor="inputField">
                <small className="text-red-600">*</small> Account Group
              </label>
              <select
                name=""
                id=""
                disabled={ofDisable}
                value={sapinfo?.accountGroup}
                onChange={(e) => {
                  setSapInfo({
                    ...sapinfo,
                    accountGroup: e.target.value
                  });
                }}
                className="w-full px-3 py-2 border-b border-gray-500  bg-white focus:outline-none focus:border-b focus:border-indigo-500"
              >
                <option value="">Select</option>
                {accountGroupList.map((list) => (
                  // <option value={list.accouCode}>{list.name}</option>
                  <option value={list.name}>{list.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex my-2 mb-2 lg:flex-row flex-col ">
            <div className="w-full px-2">
              <label className="block text-gray-700 text-sm font-bold mb-2 pt-2" htmlFor="inputField">
                <small className="text-red-600">*</small> Account Assignment Group
              </label>
              <select
                // name={sapinfo?.accAssignGroup}
                id=""
                disabled={ofDisable}
                value={sapinfo?.accAssignGroup}
                onChange={(e) => {
                  console.log("e", e);
                  setSapInfo({
                    ...sapinfo,
                    accAssignGroup: e.target.value
                  });
                }}
                className="w-full px-3 py-2 border-b border-gray-500  bg-white focus:outline-none focus:border-b focus:border-indigo-500"
              >
                <option value="">Select</option>
                {accassignList.map((list) => (
                  // <option value={list.accouCode} sptile={list.name}>
                  <option value={list.accouCode} sptile={list.name}>
                    {list.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-full px-2 ">
              <label className="block text-gray-700 text-sm font-bold mb-2 pt-2" htmlFor="inputField">
                <small className="text-red-600">*</small> Reconciliation Account
              </label>
              <select
                name=""
                id=""
                disabled={ofDisable}
                value={sapinfo?.reconciapp}
                onChange={(e) => {
                  setSapInfo({
                    ...sapinfo,
                    reconciapp: e.target.value
                  });
                }}
                className="w-full px-3 py-2 border-b border-gray-500  bg-white focus:outline-none focus:border-b focus:border-indigo-500"
              >
                <option value="">Select</option>
                {reconciAccList.map((list) => (
                  // console.log("Recon", list),
                  // <option value={list.recoCode}>{list.name}</option>
                  <option value={list.recoCode}>{list.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex my-2 mb-2 lg:flex-row flex-col ">
            <div className="w-full px-2">
              <label className="block text-gray-700 text-sm font-bold mb-2 pt-2" htmlFor="inputField">
                <small className="text-red-600">*</small> Accounting Group
              </label>
              <select
                name=""
                id=""
                disabled={ofDisable}
                value={sapinfo?.accoutingGroup}
                onChange={(e) => {
                  setSapInfo({
                    ...sapinfo,
                    accoutingGroup: e.target.value
                  });
                }}
                // onChange={(e) => {
                //   const selectedAccouCode = e.target.value;
                //   const selectedAccouName =
                //     accgroupingList.find((item) => item.accouCode === selectedAccouCode)?.name || "";

                //   setSapInfo({
                //     ...sapinfo,
                //     accoutingGroup: selectedAccouCode,
                //     accouGroupName: selectedAccouName
                //   });
                // }}
                className="w-full px-3 py-2 border-b border-gray-500  bg-white focus:outline-none focus:border-b focus:border-indigo-500"
              >
                <option value="">Select</option>
                {accgroupingList.map((list) => (
                  <option value={list.name}>{list.name}</option>
                ))}
              </select>
            </div>
            <div className="w-full px-2 ">
              <label className="block text-gray-700 text-sm font-bold mb-2 pt-2" htmlFor="inputField">
                <small className="text-red-600">*</small> Currency
              </label>
              <select
                name=""
                id=""
                disabled={ofDisable}
                value={sapinfo?.currency}
                onChange={(e) => {
                  setSapInfo({
                    ...sapinfo,
                    currency: e.target.value
                  });
                }}
                className="w-full px-3 py-2 border-b border-gray-500  bg-white focus:outline-none focus:border-b focus:border-indigo-500"
              >
                <option value="">Select</option>
                {currencyList.map((list) => (
                  // <option value={list.accouCode}>{list.name}</option>
                  <option value={list.name}>{list.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex my-2 mb-2 lg:flex-row flex-col ">
            <div className="w-full px-2">
              <label className="block text-gray-700 text-sm font-bold mb-2 pt-2" htmlFor="inputField">
                <small className="text-red-600">*</small> Search Terms
              </label>
              <input
                name=""
                id=""
                disabled={ofDisable}
                value={sapinfo?.search_terms}
                onChange={(e) => {
                  setSapInfo({
                    ...sapinfo,
                    search_terms: e.target.value
                  });
                }}
                placeholder="Search terms..."
                className="w-full px-3 py-2 border-b border-gray-500  bg-white focus:outline-none focus:border-b focus:border-indigo-500"
              ></input>
            </div>
            <div className="w-full px-2 ">
              <label className="block text-gray-700 text-sm font-bold mb-2 pt-2" htmlFor="inputField">
                <small className="text-red-600"> </small> Customer SAP No
              </label>
              <input
                name=""
                id=""
                placeholder="Customer SAP no.."
                value={sapinfo?.customerSAPNo}
                onChange={(e) => {
                  setSapInfo({
                    ...sapinfo,
                    customerSAPNo: e.target.value
                  });
                }}
                className="w-full px-3 py-2 border-b border-gray-500  bg-white focus:outline-none focus:border-b focus:border-indigo-500"
              ></input>
            </div>

            <div className="w-full px-2 ">
              <label className="block text-gray-700 text-sm font-bold mb-2 pt-2" htmlFor="inputField">
                <small className="text-red-600"></small> Customer Status
              </label>
              <select
                name=""
                id=""
                disabled={ofDisable}
                value={sapinfo?.customer_status}
                onChange={(e) => {
                  setSapInfo({
                    ...sapinfo,
                    customer_status: e.target.value
                  });
                }}
                className="w-full px-3 py-2.5 border-b border-gray-500  bg-white focus:outline-none focus:border-b focus:border-indigo-500"
              >
                {/* <option value="">Select</option> */}
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="legal">Legal</option>
              </select>
            </div>
          </div>

          <div className="flex justify-start items-center  w-full my-4">
            <h2 className="font-arial font-normal text-lg py-2 border-dashed  border-red-300 bg-gray-50 border-t-2 w-full border-b-2 border-l-0 border-r-0">
              SAP Basic Information:{" "}
            </h2>
          </div>

          <div className="flex my-2 mb-2 lg:flex-row  flex-col">
            <div className="w-full px-2">
              <label
                className="block text-gray-700 md:text-sm text-xs whitespace-nowrap font-bold mb-2 pt-2"
                htmlFor="inputField"
              >
                <small className="text-red-600">*</small> Business Partner No
              </label>
              <input
                type="number"
                value={sapinfo?.business_partner_no}
                onChange={(e) => {
                  const valength = e.target.value;
                  if (valength.length > 6) {
                    toast.error("Not more than 6 digit and only numeric");
                    return;
                  }
                  setSapInfo({
                    ...sapinfo,
                    business_partner_no: e.target.value,
                    extern_no: e.target.value
                  });
                }}
                placeholder="Business Partner No"
                className="w-full px-2 md:text-sm  text-xs py-2 border-b border-gray-500  bg-white focus:outline-none focus:border-b focus:border-indigo-500"
              ></input>
            </div>
            <div className="w-full px-2 ">
              <label
                className="block text-gray-700 md:text-sm  text-xs font-bold mb-2 pt-2"
                htmlFor="inputField"
              >
                <small className="text-red-600"> </small> Name
              </label>
              <input
                name=""
                id=""
                placeholder="Name..."
                value={sapinfo?.name}
                onChange={(e) => {
                  const valength = e.target.value;
                  if (valength.length > 40) {
                    toast.error("Not more than 40 character");
                    return;
                  }
                  setSapInfo({
                    ...sapinfo,
                    name: e.target.value
                  });
                }}
                className="w-full px-3 md:text-sm  text-xs py-2 border-b border-gray-500  bg-white focus:outline-none focus:border-b focus:border-indigo-500"
              ></input>
            </div>

            <div className="w-full px-2 ">
              <label
                className="block text-gray-700 md:text-sm  text-xs font-bold mb-2 pt-2"
                htmlFor="inputField"
              >
                <small className="text-red-600"></small> Name 2
              </label>
              <input
                name=""
                id=""
                placeholder="Name..."
                value={sapinfo?.name2}
                onChange={(e) => {
                  const valength = e.target.value;
                  if (valength.length > 40) {
                    toast.error("Not more than 40 character");
                    return;
                  }
                  setSapInfo({
                    ...sapinfo,
                    name2: e.target.value
                  });
                }}
                className="w-full md:text-sm  text-xs px-3 py-2 border-b border-gray-500  bg-white focus:outline-none focus:border-b focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="flex my-2 mb-2 lg:flex-row  ">
            <div className="w-full px-2">
              <label
                className="block text-gray-700 md:text-sm  text-xs font-bold mb-2 pt-2"
                htmlFor="inputField"
              >
                <small className="text-red-600">*</small> Grouping
              </label>
              <select
                disabled
                name=""
                id=""
                value={sapinfo?.grouping}
                onChange={(e) => {
                  setSapInfo({
                    ...sapinfo,
                    grouping: e.target.value
                  });
                }}
                className="w-full md:text-sm text-xs px-2 py-2 border-b border-gray-500  bg-white focus:outline-none focus:border-b focus:border-indigo-500"
              >
                <option value="zdom">ZDOM</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
            <div className="w-full px-2 ">
              <label
                className="block text-gray-700 md:text-sm  text-xs font-bold mb-2 pt-2"
                htmlFor="inputField"
              >
                <small className="text-red-600"> </small> Location
              </label>
              <input
                name=""
                id=""
                placeholder="Location..."
                value={sapinfo?.location}
                onChange={(e) => {
                  setSapInfo({
                    ...sapinfo,
                    location: e.target.value
                  });
                }}
                className="w-full md:text-sm  text-xs px-3 py-2 border-b border-gray-500  bg-white focus:outline-none focus:border-b focus:border-indigo-500"
              ></input>
            </div>

            <div className="w-full px-2 ">
              <label
                className="block text-gray-700 md:text-sm  text-xs font-bold mb-2 pt-2"
                htmlFor="inputField"
              >
                <small className="text-red-600"></small> Delv. Plant
              </label>
              <select
                name=""
                id=""
                value={sapinfo?.delv_plant}
                onChange={(e) => {
                  setSapInfo({
                    ...sapinfo,
                    delv_plant: e.target.value
                  });
                }}
                className="w-full md:text-sm text-xs px-2 py-2 border-b border-gray-500  bg-white focus:outline-none focus:border-b focus:border-indigo-500"
              >
                <option value="">--select--</option>
                {delvplantList.map((item) => (
                  <option value={item.depot_code}>{item.depot_name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex my-2 mb-2 lg:flex-row  ">
            <div className="w-full px-2">
              <label
                className="block text-gray-700 md:text-sm  text-xs font-bold mb-2 pt-2"
                htmlFor="inputField"
              >
                <small className="text-red-600">*</small> Extern No
              </label>
              <input
                disabled
                name=""
                id=""
                value={sapinfo?.extern_no}
                onChange={(e) => {
                  setSapInfo({
                    ...sapinfo,
                    extern_no: e.target.value
                  });
                }}
                placeholder="Extern No"
                className="w-full px-3 md:text-sm text-xs py-2 border-b border-gray-500  bg-white focus:outline-none focus:border-b focus:border-indigo-500"
              ></input>
            </div>
            <div className="w-full px-2 ">
              <label
                className="block text-gray-700 md:text-sm  text-xs font-bold mb-2 pt-2"
                htmlFor="inputField"
              >
                <small className="text-red-600"> </small> Destination
              </label>
              <input
                name=""
                id=""
                placeholder="Destination..."
                value={sapinfo?.destination}
                onChange={(e) => {
                  const valength = e.target.value;
                  if (valength.length > 40) {
                    toast.error("Not more than 40 character");
                    return;
                  }
                  setSapInfo({
                    ...sapinfo,
                    destination: e.target.value
                  });
                }}
                className="w-full md:text-sm text-xs px-3 py-2 border-b border-gray-500  bg-white focus:outline-none focus:border-b focus:border-indigo-500"
              ></input>
            </div>
          </div>

          <div className="flex justify-start items-center  w-full my-4">
            <h2 className="font-arial font-normal text-lg py-2 border-dashed  border-red-300 bg-gray-50 border-t-2 w-full border-b-2 border-l-0 border-r-0">
              Tax Classification:{" "}
            </h2>
          </div>

          <div className="flex my-2 mb-2 lg:flex-row  ">
            <div className="w-full px-2">
              <label
                className="block text-gray-700 md:text-sm text-xs font-bold mb-2 pt-2"
                htmlFor="inputField"
              >
                <small className="text-red-600">*</small> Country 1
              </label>
              <select
                disabled
                name=""
                id=""
                value={sapinfo?.country1}
                onChange={(e) => {
                  setSapInfo({
                    ...sapinfo,
                    country1: e.target.value
                  });
                }}
                className="w-full md:text-sm text-xs px-2 py-2 border-b border-gray-500  bg-white focus:outline-none focus:border-b focus:border-indigo-500"
              >
                {/* <option value="">Select</option> */}
                <option value="IN">IN</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
            <div className="w-full px-2 ">
              <label
                className="block text-gray-700 md:text-sm text-xs font-bold mb-2 pt-2"
                htmlFor="inputField"
              >
                <small className="text-red-600"> </small> Tax Category 1
              </label>
              <select
                disabled
                name=""
                id=""
                value={sapinfo?.tax_category1}
                onChange={(e) => {
                  setSapInfo({
                    ...sapinfo,
                    tax_category1: e.target.value
                  });
                }}
                className="w-full md:text-sm text-xs px-2 py-2 border-b border-gray-500  bg-white focus:outline-none focus:border-b focus:border-indigo-500"
              >
                {/* <option value="">Select</option> */}
                <option value="JOCG">JOCG</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>

            <div className="w-full px-2 ">
              <label
                className="block text-gray-700 md:text-sm text-xs font-bold mb-2 pt-2"
                htmlFor="inputField"
              >
                <small className="text-red-600"></small> Tax Class 1
              </label>
              <select
                disabled
                name=""
                id=""
                value={sapinfo?.tax_class1}
                onChange={(e) => {
                  setSapInfo({
                    ...sapinfo,
                    tax_class1: e.target.value
                  });
                }}
                className="w-full md:text-sm text-xs px-2 py-2 border-b border-gray-500  bg-white focus:outline-none focus:border-b focus:border-indigo-500"
              >
                {/* <option value="">Select</option> */}
                <option value="0">0</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
          </div>

          <div className="flex my-2 mb-2 lg:flex-row  ">
            <div className="w-full px-2">
              <label
                className="block text-gray-700 md:text-sm text-xs font-bold mb-2 pt-2"
                htmlFor="inputField"
              >
                <small className="text-red-600">*</small> Country 2
              </label>
              <select
                disabled
                name=""
                id=""
                value={sapinfo?.country2}
                onChange={(e) => {
                  setSapInfo({
                    ...sapinfo,
                    country2: e.target.value
                  });
                }}
                className="w-full md:text-sm text-xs px-2 py-2 border-b border-gray-500  bg-white focus:outline-none focus:border-b focus:border-indigo-500"
              >
                {/* <option value="">Select</option> */}
                <option value="IN">IN</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
            <div className="w-full px-2 ">
              <label
                className="block text-gray-700 md:text-sm text-xs font-bold mb-2 pt-2"
                htmlFor="inputField"
              >
                <small className="text-red-600"> </small> Tax Category 2
              </label>
              <select
                disabled
                name=""
                id=""
                value={sapinfo?.tax_category2}
                onChange={(e) => {
                  setSapInfo({
                    ...sapinfo,
                    tax_category2: e.target.value
                  });
                }}
                className="w-full md:text-sm text-xs px-2 py-2 border-b border-gray-500  bg-white focus:outline-none focus:border-b focus:border-indigo-500"
              >
                {/* <option value="">Select</option> */}
                <option value="JOSG">JOSG</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>

            <div className="w-full px-2 ">
              <label
                className="block text-gray-700 md:text-sm text-xs font-bold mb-2 pt-2"
                htmlFor="inputField"
              >
                <small className="text-red-600"></small> Tax Class 2
              </label>
              <select
                disabled
                name=""
                id=""
                value={sapinfo?.tax_class2}
                onChange={(e) => {
                  setSapInfo({
                    ...sapinfo,
                    tax_class2: e.target.value
                  });
                }}
                className="w-full md:text-sm text-xs px-2 py-2 border-b border-gray-500  bg-white focus:outline-none focus:border-b focus:border-indigo-500"
              >
                {/* <option value="">Select</option> */}
                <option value="0">0</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
          </div>

          <div className="flex my-2 mb-2 lg:flex-row  ">
            <div className="w-full px-2">
              <label
                className="block text-gray-700 md:text-sm text-xs font-bold mb-2 pt-2"
                htmlFor="inputField"
              >
                <small className="text-red-600">*</small> Country 3
              </label>
              <select
                disabled
                name=""
                id=""
                value={sapinfo?.country3}
                onChange={(e) => {
                  setSapInfo({
                    ...sapinfo,
                    country3: e.target.value
                  });
                }}
                className="w-full md:text-sm text-xs px-2 py-2 border-b border-gray-500  bg-white focus:outline-none focus:border-b focus:border-indigo-500"
              >
                {/* <option value="">Select</option> */}
                <option value="IN">IN</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
            <div className="w-full px-2 ">
              <label
                className="block text-gray-700 md:text-sm text-xs font-bold mb-2 pt-2"
                htmlFor="inputField"
              >
                <small className="text-red-600"> </small> Tax Category 3
              </label>
              <select
                disabled
                name=""
                id=""
                value={sapinfo?.tax_category3}
                onChange={(e) => {
                  setSapInfo({
                    ...sapinfo,
                    tax_category3: e.target.value
                  });
                }}
                className="w-full md:text-sm text-xs px-2 py-2 border-b border-gray-500  bg-white focus:outline-none focus:border-b focus:border-indigo-500"
              >
                {/* <option value="">Select</option> */}
                <option value="JOIG">JOIG</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>

            <div className="w-full px-2 ">
              <label
                className="block text-gray-700 md:text-sm text-xs font-bold mb-2 pt-2"
                htmlFor="inputField"
              >
                <small className="text-red-600"></small> Tax Class 3
              </label>
              <select
                disabled
                name=""
                id=""
                value={sapinfo?.tax_class3}
                onChange={(e) => {
                  setSapInfo({
                    ...sapinfo,
                    tax_class3: e.target.value
                  });
                }}
                className="w-full md:text-sm text-xs px-2 py-2 border-b border-gray-500  bg-white focus:outline-none focus:border-b focus:border-indigo-500"
              >
                {/* <option value="">Select</option> */}
                <option value="0">0</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
          </div>

          <div className="flex my-2 mb-2 lg:flex-row  ">
            <div className="w-full px-2">
              <label
                className="block text-gray-700 md:text-sm text-xs font-bold mb-2 pt-2"
                htmlFor="inputField"
              >
                <small className="text-red-600">*</small> Country 4
              </label>
              <select
                disabled
                name=""
                id=""
                value={sapinfo?.country4}
                onChange={(e) => {
                  setSapInfo({
                    ...sapinfo,
                    country4: e.target.value
                  });
                }}
                className="w-full md:text-sm text-xs px-2 py-2 border-b border-gray-500  bg-white focus:outline-none focus:border-b focus:border-indigo-500"
              >
                {/* <option value="">Select</option> */}
                <option value="IN">IN</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
            <div className="w-full px-2 ">
              <label
                className="block text-gray-700 md:text-sm text-xs font-bold mb-2 pt-2"
                htmlFor="inputField"
              >
                <small className="text-red-600"> </small> Tax Category 4
              </label>
              <select
                disabled
                name=""
                id=""
                value={sapinfo?.tax_category4}
                onChange={(e) => {
                  setSapInfo({
                    ...sapinfo,
                    tax_category4: e.target.value
                  });
                }}
                className="w-full md:text-sm text-xs px-2 py-2 border-b border-gray-500  bg-white focus:outline-none focus:border-b focus:border-indigo-500"
              >
                {/* <option value="">Select</option> */}
                <option value="ZTCS">ZTCS</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>

            <div className="w-full px-2 ">
              <label
                className="block text-gray-700 md:text-sm text-xs font-bold mb-2 pt-2"
                htmlFor="inputField"
              >
                <small className="text-red-600"></small> Tax Class 4
              </label>
              <select
                disabled
                name=""
                id=""
                value={sapinfo?.tax_class4}
                onChange={(e) => {
                  setSapInfo({
                    ...sapinfo,
                    tax_class4: e.target.value ? e.target.value : "3"
                  });
                }}
                className="w-full md:text-sm text-xs px-3 py-2.5 border-b border-gray-500  bg-white focus:outline-none focus:border-b focus:border-indigo-500"
              >
                {/* <option value="">Select</option> */}
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
            </div>
          </div>

          <div className="flex my-2 mb-2 lg:flex-row  ">
            <div className="w-full px-2">
              <label
                className="block text-gray-700 md:text-sm text-xs font-bold mb-2 pt-2"
                htmlFor="inputField"
              >
                <small className="text-red-600">*</small> Country 5
              </label>
              <select
                disabled
                name=""
                id=""
                value={sapinfo?.country5}
                onChange={(e) => {
                  setSapInfo({
                    ...sapinfo,
                    country5: e.target.value
                  });
                }}
                className="w-full md:text-sm text-xs px-2 py-2 border-b border-gray-500  bg-white focus:outline-none focus:border-b focus:border-indigo-500"
              >
                {/* <option value="">Select</option> */}
                <option value="IN">IN</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
            <div className="w-full px-2 ">
              <label
                className="block text-gray-700 md:text-sm text-xs font-bold mb-2 pt-2"
                htmlFor="inputField"
              >
                <small className="text-red-600"> </small> Tax Category 5
              </label>
              <select
                disabled
                name=""
                id=""
                value={sapinfo?.tax_category5}
                onChange={(e) => {
                  setSapInfo({
                    ...sapinfo,
                    tax_category5: e.target.value
                  });
                }}
                className="w-full md:text-sm text-xs px-2 py-2 border-b border-gray-500  bg-white focus:outline-none focus:border-b focus:border-indigo-500"
              >
                {/* <option value="">Select</option> */}
                <option value="ZTC1">ZTC1</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>

            <div className="w-full px-2 ">
              <label
                className="block text-gray-700 md:text-sm text-xs font-bold mb-2 pt-2"
                htmlFor="inputField"
              >
                <small className="text-red-600"></small> Tax Class 5
              </label>
              <select
                disabled
                name=""
                id=""
                value={sapinfo?.tax_class5}
                onChange={(e) => {
                  setSapInfo({
                    ...sapinfo,
                    tax_class5: e.target.value
                  });
                }}
                className="w-full md:text-sm text-xs px-2 py-2 border-b border-gray-500  bg-white focus:outline-none focus:border-b focus:border-indigo-500"
              >
                {/* <option value="">Select</option> */}
                <option value="0">0</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
          </div>

          <div className="flex my-2 mb-2 lg:flex-row  ">
            <div className="w-full px-2">
              <label
                className="block text-gray-700 md:text-sm text-xs font-bold mb-2 pt-2"
                htmlFor="inputField"
              >
                <small className="text-red-600">*</small> Country 6
              </label>
              <select
                disabled
                name=""
                id=""
                value={sapinfo?.country6}
                onChange={(e) => {
                  setSapInfo({
                    ...sapinfo,
                    country6: e.target.value
                  });
                }}
                className="w-full md:text-sm text-xs px-2 py-2 border-b border-gray-500  bg-white focus:outline-none focus:border-b focus:border-indigo-500"
              >
                {/* <option value="">Select</option> */}
                <option value="IN">IN</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
            <div className="w-full px-2 ">
              <label
                className="block text-gray-700 md:text-sm text-xs font-bold mb-2 pt-2"
                htmlFor="inputField"
              >
                <small className="text-red-600"> </small> Tax Category 6
              </label>
              <select
                disabled
                name=""
                id=""
                value={sapinfo?.tax_category6}
                onChange={(e) => {
                  setSapInfo({
                    ...sapinfo,
                    tax_category6: e.target.value
                  });
                }}
                className="w-full md:text-sm text-xs px-2 py-2 border-b border-gray-500  bg-white focus:outline-none focus:border-b focus:border-indigo-500"
              >
                {/* <option value="">Select</option> */}
                <option value="JOUG">JOUG</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>

            <div className="w-full px-2 ">
              <label
                className="block text-gray-700 md:text-sm text-xs font-bold mb-2 pt-2"
                htmlFor="inputField"
              >
                <small className="text-red-600"></small> Tax Class 6
              </label>
              <select
                disabled
                name=""
                id=""
                value={sapinfo?.tax_class6}
                onChange={(e) => {
                  setSapInfo({
                    ...sapinfo,
                    tax_class6: e.target.value
                  });
                }}
                className="w-full md:text-sm text-xs px-2 py-2 border-b border-gray-500  bg-white focus:outline-none focus:border-b focus:border-indigo-500"
              >
                {/* <option value="">Select</option> */}
                <option value="0">0</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
          </div>

          <div className="flex justify-start items-center  w-full my-4">
            <h2 className="font-arial font-normal text-lg py-2 border-dashed  border-red-300 bg-gray-50 border-t-2 w-full border-b-2 border-l-0 border-r-0">
              Partners Information:{" "}
            </h2>
          </div>

          <div className="flex my-2 mb-2 lg:flex-row  ">
            <div className="w-full px-2">
              <label
                className="block text-gray-700 md:text-sm text-xs font-bold mb-2 pt-2"
                htmlFor="inputField"
              >
                <small className="text-red-600">*</small> Partner Function 5
              </label>
              <select
                disabled
                name=""
                id=""
                value={sapinfo?.partner_function5}
                onChange={(e) => {
                  setSapInfo({
                    ...sapinfo,
                    partner_function5: e.target.value
                  });
                }}
                className="w-full md:text-sm text-xs px-2 py-2 border-b border-gray-500  bg-white focus:outline-none focus:border-b focus:border-indigo-500"
              >
                {/* <option value="">Select</option> */}
                <option value="ZA">ZA</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
            <div className="w-full px-2 ">
              <label
                className="block text-gray-700 md:text-sm text-xs font-bold mb-2 pt-2"
                htmlFor="inputField"
              >
                <small className="text-red-600"> </small> PF CODE 5
              </label>
              <input
                type="tel"
                maxLength={8}
                value={sapinfo?.pf_code5}
                onChange={(e) => {
                  // const valength = e.target.value;
                  // if(valength.length >8){
                  //   toast.error("Not more than 8 Digit and Only Numeric")
                  //   return
                  // }
                  setSapInfo({
                    ...sapinfo,
                    pf_code5: e.target.value
                  });
                }}
                className="w-full md:text-sm text-xs px-2 py-1.5 border-b border-gray-500  bg-white focus:outline-none focus:border-b focus:border-indigo-500"
              ></input>
            </div>
          </div>

          <div className="flex my-2 mb-2 lg:flex-row  ">
            <div className="w-full px-2">
              <label
                className="block text-gray-700 md:text-sm text-xs font-bold mb-2 pt-2"
                htmlFor="inputField"
              >
                <small className="text-red-600">*</small> Partner Function 6
              </label>
              <select
                disabled
                name=""
                id=""
                value={sapinfo?.partner_function6}
                onChange={(e) => {
                  setSapInfo({
                    ...sapinfo,
                    partner_function6: e.target.value
                  });
                }}
                className="w-full md:text-sm text-xs px-2 py-2 border-b border-gray-500  bg-white focus:outline-none focus:border-b focus:border-indigo-500"
              >
                {/* <option value="">Select</option> */}
                <option value="ZB">ZB</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
            <div className="w-full px-2 ">
              <label
                className="block text-gray-700 md:text-sm text-xs font-bold mb-2 pt-2"
                htmlFor="inputField"
              >
                <small className="text-red-600"> </small> PF CODE 6
              </label>
              <input
                type="tel"
                maxLength={8}
                value={sapinfo?.pf_code6}
                onChange={(e) => {
                  const valength = e.target.value;
                  if (valength.length > 8) {
                    toast.error("Not more than 8 Digit and Only Numeric");
                    return;
                  }
                  setSapInfo({
                    ...sapinfo,
                    pf_code6: e.target.value
                  });
                }}
                className="w-full md:text-sm text-xs px-2 py-1.5 border-b border-gray-500  bg-white focus:outline-none focus:border-b focus:border-indigo-500"
              ></input>
            </div>
          </div>

          <div className="flex my-2 mb-2 lg:flex-row  ">
            <div className="w-full px-2">
              <label
                className="block text-gray-700 md:text-sm text-xs font-bold mb-2 pt-2"
                htmlFor="inputField"
              >
                <small className="text-red-600">*</small> Partner Function 7
              </label>
              <select
                disabled
                name=""
                id=""
                value={sapinfo?.partner_function7}
                onChange={(e) => {
                  setSapInfo({
                    ...sapinfo,
                    partner_function7: e.target.value
                  });
                }}
                className="w-full md:text-sm text-xs px-2 py-2 border-b border-gray-500  bg-white focus:outline-none focus:border-b focus:border-indigo-500"
              >
                {/* <option value="">Select</option> */}
                <option value="ZC">ZC</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
            <div className="w-full px-2 ">
              <label
                className="block text-gray-700 md:text-sm text-xs font-bold mb-2 pt-2"
                htmlFor="inputField"
              >
                <small className="text-red-600"> </small> PF CODE 7
              </label>
              <input
                type="tel"
                maxLength={8}
                value={sapinfo?.pf_code7}
                onChange={(e) => {
                  const valength = e.target.value;
                  if (valength.length > 8) {
                    toast.error("Not more than 8 Digit and Only Numeric");
                    return;
                  }
                  setSapInfo({
                    ...sapinfo,
                    pf_code7: e.target.value
                  });
                }}
                className="w-full md:text-sm text-xs px-2 py-1.5 border-b border-gray-500  bg-white focus:outline-none focus:border-b focus:border-indigo-500"
              ></input>
            </div>
          </div>

          <div className="flex my-2 mb-2 lg:flex-row  ">
            <div className="w-full px-2">
              <label
                className="block text-gray-700 md:text-sm text-xs font-bold mb-2 pt-2"
                htmlFor="inputField"
              >
                <small className="text-red-600">*</small> Partner Function 8
              </label>
              <select
                disabled
                name=""
                id=""
                value={sapinfo?.partner_function8}
                onChange={(e) => {
                  setSapInfo({
                    ...sapinfo,
                    partner_function8: e.target.value
                  });
                }}
                className="w-full md:text-sm text-xs px-2 py-2 border-b border-gray-500  bg-white focus:outline-none focus:border-b focus:border-indigo-500"
              >
                {/* <option value="">Select</option> */}
                <option value="ZD">ZD</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
            <div className="w-full px-2 ">
              <label
                className="block text-gray-700 md:text-sm text-xs font-bold mb-2 pt-2"
                htmlFor="inputField"
              >
                <small className="text-red-600"> </small> PF CODE 8
              </label>
              <input
                type="tel"
                maxLength={8}
                value={sapinfo?.pf_code8}
                onChange={(e) => {
                  const valength = e.target.value;
                  if (valength.length > 8) {
                    toast.error("Not more than 8 Digit and Only Numeric");
                    return;
                  }
                  setSapInfo({
                    ...sapinfo,
                    pf_code8: e.target.value
                  });
                }}
                className="w-full md:text-sm text-xs px-2 py-1.5 border-b border-gray-500  bg-white focus:outline-none focus:border-b focus:border-indigo-500"
              ></input>
            </div>
          </div>

          <div className="flex my-2 mb-2 lg:flex-row  ">
            <div className="w-full px-2">
              <label
                className="block text-gray-700 md:text-sm text-xs font-bold mb-2 pt-2"
                htmlFor="inputField"
              >
                <small className="text-red-600">*</small> Partner Function 9
              </label>
              <select
                disabled
                name=""
                id=""
                value={sapinfo?.partner_function9}
                onChange={(e) => {
                  setSapInfo({
                    ...sapinfo,
                    partner_function9: e.target.value
                  });
                }}
                className="w-full md:text-sm text-xs px-2 py-2 border-b border-gray-500  bg-white focus:outline-none focus:border-b focus:border-indigo-500"
              >
                {/* <option value="">Select</option> */}
                <option value="ZE">ZE</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
            <div className="w-full px-2 ">
              <label
                className="block text-gray-700 md:text-sm text-xs font-bold mb-2 pt-2"
                htmlFor="inputField"
              >
                <small className="text-red-600"> </small> PF CODE 9
              </label>
              <input
                type="tel"
                maxLength={8}
                value={sapinfo?.pf_code9}
                onChange={(e) => {
                  const valength = e.target.value;
                  if (valength.length > 8) {
                    toast.error("Not more than 8 Digit and Only Numeric");
                    return;
                  }
                  setSapInfo({
                    ...sapinfo,
                    pf_code9: e.target.value
                  });
                }}
                className="w-full md:text-sm text-xs px-2 py-1.5 border-b border-gray-500  bg-white focus:outline-none focus:border-b focus:border-indigo-500"
              ></input>
            </div>
          </div>

          <div className="flex justify-start items-center  w-full my-4">
            <h2 className="font-arial font-normal text-lg py-2 border-dashed  border-red-300 bg-gray-50 border-t-2 w-full border-b-2 border-l-0 border-r-0">
              SAP Other Information:{" "}
            </h2>
          </div>

          <div className="flex my-2 mb-2 lg:flex-row  ">
            <div className="w-full px-2">
              <label
                className="block text-gray-700 whitespace-nowrap md:text-sm text-xs font-bold mb-2 pt-2"
                htmlFor="inputField"
              >
                <small className="text-red-600">*</small> Balance Sheet Status
              </label>
              <select
                name=""
                id=""
                value={sapinfo?.balance_sheet}
                onChange={(e) => {
                  setSapInfo({
                    ...sapinfo,
                    balance_sheet: e.target.value
                  });
                }}
                className="w-full md:text-sm text-xs px-2 md:py-2 py-1.5 border-b border-gray-500  bg-white focus:outline-none focus:border-b focus:border-indigo-500"
              >
                {/* <option value="">Select</option> */}
                <option value="ZA">ZA</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
            <div className="w-full px-2 ">
              <label
                className="block text-gray-700 md:text-sm text-xs font-bold mb-2 pt-2"
                htmlFor="inputField"
              >
                <small className="text-red-600"> </small> Bank Period F
              </label>
              <input
                type="date"
                value={sapinfo?.bank_period_f}
                onChange={(e) => {
                  setSapInfo({
                    ...sapinfo,
                    bank_period_f: e.target.value
                  });
                }}
                className="w-full md:text-sm text-xs px-2 py-1.5 border-b border-gray-500  bg-white focus:outline-none focus:border-b focus:border-indigo-500"
              ></input>
            </div>
            <div className="w-full px-2 ">
              <label
                className="block text-gray-700 md:text-sm text-xs font-bold mb-2 pt-2"
                htmlFor="inputField"
              >
                <small className="text-red-600"> </small> Bank Period T
              </label>
              <input
                type="date"
                value={sapinfo?.bank_period_t}
                onChange={(e) => {
                  setSapInfo({
                    ...sapinfo,
                    bank_period_t: e.target.value
                  });
                }}
                min={
                  sapinfo?.bank_period_f
                    ? new Date(
                        new Date(sapinfo?.bank_period_f).setDate(
                          new Date(sapinfo?.bank_period_f).getDate() + 1
                        )
                      )
                        .toISOString()
                        .split("T")[0]
                    : ""
                }
                className="w-full md:text-sm text-xs px-2 py-1.5 border-b border-gray-500  bg-white focus:outline-none focus:border-b focus:border-indigo-500"
              ></input>
            </div>
          </div>

          <div className="flex my-2 mb-2 lg:flex-row  ">
            <div className="w-full px-2">
              <label
                className="block text-gray-700 md:text-sm text-xs font-bold mb-2 pt-2"
                htmlFor="inputField"
              >
                <small className="text-red-600">*</small> Dep Value(LAC)
              </label>
              <input
                type="number"
                value={sapinfo?.dep_value_lac}
                onChange={(e) => {
                  setSapInfo({
                    ...sapinfo,
                    dep_value_lac: e.target.value
                  });
                }}
                className="w-full md:text-sm text-xs px-2 py-2 border-b border-gray-500  bg-white focus:outline-none focus:border-b focus:border-indigo-500"
              ></input>
            </div>
            <div className="w-full px-2 ">
              <label
                className="block text-gray-700 md:text-sm text-xs font-bold mb-2 pt-2"
                htmlFor="inputField"
              >
                <small className="text-red-600"> </small> Dep Value(30%)
              </label>
              <input
                type="number"
                value={sapinfo?.dep_value_30_perc}
                onChange={(e) => {
                  setSapInfo({
                    ...sapinfo,
                    dep_value_30_perc: e.target.value
                  });
                }}
                className="w-full md:text-sm text-xs px-2 py-2 border-b border-gray-500  bg-white focus:outline-none focus:border-b focus:border-indigo-500"
              ></input>
            </div>
          </div>

          <div className="flex my-2 mb-2 lg:flex-row  ">
            <div className="w-full px-2">
              <label
                className="block text-gray-700 md:text-sm text-xs font-bold mb-2 pt-2"
                htmlFor="inputField"
              >
                <small className="text-red-600">*</small> Valid From Date
              </label>
              <input
                name=""
                id=""
                type="date"
                value={moment(sapinfo?.valid_date_from).utc().format("YYYY-MM-DD") || ""}
                onChange={(e) => {
                  setSapInfo({
                    ...sapinfo,
                    valid_date_from: e.target.value
                  });
                }}
                className="w-full md:text-sm text-xs px-2 py-2 border-b border-gray-500  bg-white focus:outline-none focus:border-b focus:border-indigo-500"
              ></input>
            </div>
            <div className="w-full px-2 ">
              <label
                className="block text-gray-700 md:text-sm text-xs font-bold mb-2 pt-2"
                htmlFor="inputField"
              >
                <small className="text-red-600"> </small> Valid To Date
              </label>
              <input
                name=""
                id=""
                type="date"
                value={moment(sapinfo?.valid_date_to).utc(0).format("YYYY-MM-DD") || ""}
                min={
                  sapinfo?.valid_date_from
                    ? new Date(
                        new Date(sapinfo?.valid_date_from).setDate(
                          new Date(sapinfo?.valid_date_from).getDate() + 1
                        )
                      )
                        .toISOString()
                        .split("T")[0]
                    : ""
                }
                onChange={(e) => {
                  setSapInfo({
                    ...sapinfo,
                    valid_date_to: e.target.value
                  });
                }}
                className="w-full md:text-sm text-xs px-2 py-2 border-b border-gray-500  bg-white focus:outline-none focus:border-b focus:border-indigo-500"
              ></input>
            </div>
          </div>

          <div className="flex justify-start items-center  w-full my-4">
            <h2 className="font-arial font-normal text-lg py-2 border-dashed  border-red-300 bg-gray-50 border-t-2 w-full border-b-2 border-l-0 border-r-0">
              SAP ZRT Information:{" "}
            </h2>
          </div>

          <div className="flex my-2 mb-2 lg:flex-row  ">
            <div className="w-full px-2">
              <label
                className="block text-gray-700 md:text-sm text-xs font-bold mb-2 pt-2"
                htmlFor="inputField"
              >
                <small className="text-red-600">*</small> Segment Code
              </label>
              <input
                disabled
                name=""
                id=""
                value={sapinfo?.segment_code}
                onChange={(e) => {
                  setSapInfo({
                    ...sapinfo,
                    segment_code: e.target.value
                  });
                }}
                className="w-full md:text-sm text-xs px-2 py-2 border-b border-gray-500  bg-white focus:outline-none focus:border-b focus:border-indigo-500"
              />
              {/* <option value="">Select</option> */}
              {/* <option value="SEG101">SEG101</option>
                <option value="SEG102">SEG102</option>
                <option value="SEG103">SEG103</option>
              </select> */}
            </div>
            <div className="w-full px-2 ">
              <label
                className="block text-gray-700 md:text-sm text-xs font-bold mb-2 pt-2"
                htmlFor="inputField"
              >
                <small className="text-red-600"> </small> Unit Code
              </label>
              <input
                disabled
                name=""
                id=""
                value={sapinfo?.unit_code}
                onChange={(e) => {
                  setSapInfo({
                    ...sapinfo,
                    unit_code: e.target.value
                  });
                }}
                className="w-full md:text-sm text-xs px-2 py-2 border-b border-gray-500  bg-white focus:outline-none focus:border-b focus:border-indigo-500"
              />
              {/* <option value="">Select</option>
                <option value="UNI101">UNI101</option>
                <option value="UNI102">UNI102</option>
                <option value="UNI103">UNI103</option>
              </select> */}
            </div>
          </div>

          <div className="flex my-2 mb-2 lg:flex-row  ">
            <div className="w-full px-2">
              <label
                className="block text-gray-700 md:text-sm text-xs font-bold mb-2 pt-2"
                htmlFor="inputField"
              >
                <small className="text-red-600">*</small> Zone Code
              </label>
              <input
                disabled
                name=""
                id=""
                value={sapinfo?.zone_code}
                onChange={(e) => {
                  setSapInfo({
                    ...sapinfo,
                    zone_code: e.target.value
                  });
                }}
                className="w-full md:text-sm text-xs px-2 py-2 border-b border-gray-500  bg-white focus:outline-none focus:border-b focus:border-indigo-500"
              />
              {/* <option value="">Select</option>
                <option value="ZONE101">ZONE101</option>
                <option value="ZONE102">ZONE102</option>
                <option value="ZONE103">ZONE103</option>
              </select> */}
            </div>
            <div className="w-full px-2 ">
              <label
                className="block text-gray-700 md:text-sm text-xs font-bold mb-2 pt-2"
                htmlFor="inputField"
              >
                <small className="text-red-600"> </small> Region Code
              </label>
              <input
                disabled
                name=""
                id=""
                value={sapinfo?.region_code}
                onChange={(e) => {
                  setSapInfo({
                    ...sapinfo,
                    region_code: e.target.value
                  });
                }}
                className="w-full md:text-sm text-xs px-2 py-2 border-b border-gray-500  bg-white focus:outline-none focus:border-b focus:border-indigo-500"
              />
              {/* <option value="">Select</option> */}
              {/* <option value="REG101">REG101</option>
                <option value="REG102">REG102</option>
                <option value="REG103">REG103</option>
              </select> */}
            </div>

            <div className="w-full px-2 ">
              <label
                className="block text-gray-700 md:text-sm text-xs font-bold mb-2 pt-2"
                htmlFor="inputField"
              >
                <small className="text-red-600"> </small> Territory Code
              </label>
              <input
                disabled
                name=""
                id=""
                value={sapinfo?.territory_code}
                onChange={(e) => {
                  setSapInfo({
                    ...sapinfo,
                    territory_code: e.target.value
                  });
                }}
                className="w-full md:text-sm text-xs px-2 py-2 border-b border-gray-500  bg-white focus:outline-none focus:border-b focus:border-indigo-500"
              />
              {/* <option value="">Select</option> */}
              {/* <option value="TERR101">TERR101</option>
                <option value="TERR102">TERR102</option>
                <option value="TERR103">TERR103</option>
              </select> */}
            </div>
          </div>

          {/* buttons */}
          {(router.query.type === "Edit" || router.query.role == 12) && (
            <div className="my-6 flex items-center justify-end ">
              <div className="flex items-center justify-center py-4 w-full gap-4 ">
                <button
                  onClick={() => props.formType("Agreement")}
                  className={`text-center rounded-md hover:bg-green-500 ${
                    formActive ? "bg-green-400" : "bg-gray-400"
                  }  text-white py-1 px-4 text-lg`}
                >
                  Prev
                </button>
                <button
                  // onClick={() => props.formType("Approval")}
                  // onClick={nextTabHandler}
                  // disabled={disableNext}
                  onClick={updateSapInfo}
                  className="text-center rounded-md bg-orange-500 text-white py-1 px-4 text-lg"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </form>
      </section>
    </>
  );
};

export default SAPinfo;
