import { useState, Fragment, useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import { Dialog, Transition } from "@headlessui/react";
import { BiCheckCircle } from "react-icons/bi";
import { AiTwotoneHome } from "react-icons/ai";
import { TbFileDownload } from "react-icons/tb";
import { AiOutlineSearch } from "react-icons/ai";
import { url } from "@/constants/url";
import axios from "axios";
import ConfirmModal from "../modals/ConfirmModal";
import toast, { Toaster } from "react-hot-toast";
import Image from "next/image";
import { CSVLink } from "react-csv";
import DealerOn from "../../public/dealeron.png";
import moment from "moment";
import { FcApproval } from "react-icons/fc";
import { gsturl } from "@/constants/url";
import { headerGSt } from "@/constants/url";
import { SiSap } from "react-icons/si";
import ReactPaginate from "react-paginate";

const Dealer = () => {
  const router = useRouter();
  const [dealerData, setDealerData] = useState([]);
  const [role_id, setRole_id] = useState([]);
  const [hide, setHide] = useState(null);
  const [isGstVerify, setGstVerify] = useState(false);
  const [localIds, setLocalIds] = useState({
    c_id: "",
    bg_id: "",
    bu_id: "",
    z_id: "",
    r_id: "",
    t_id: "",
    t_desc: "",
    bg_desc: "",
    bu_desc: "",
    r_desc: "",
    z_desc: "",
    za_id: 12
  });
  const [filterTerri, setFilterTerri] = useState([]);
  const [sapDealerData, setSapDealerData] = useState([]);
  const [isAllowed, setIsAllowed] = useState(null);

  const pattern = new RegExp(/^\d{1,10}$/);

  const headers = {
    "Content-Type": "application/json",
    secret: "fsdhfgsfuiweifiowefjewcewcebjw"
  };

  useEffect(() => {
    if (window.localStorage) {
      const userinfo = localStorage.getItem("userinfo");
      const ImageLink = localStorage.getItem("ImageLink");
      const cid = JSON?.parse(userinfo)?.c_id;
      const tid = JSON?.parse(userinfo)?.t_id;
      const bgid = JSON?.parse(userinfo)?.bg_id;
      const buid = JSON?.parse(userinfo)?.bu_id;
      const zid = JSON?.parse(userinfo)?.z_id;
      const rid = JSON?.parse(userinfo)?.r_id;
      const t_desc = JSON?.parse(userinfo)?.territory_name;
      const bg_desc = JSON?.parse(userinfo)?.business_segment;
      const bu_desc = JSON?.parse(userinfo)?.business_unit_name;
      const r_desc = JSON?.parse(userinfo)?.region_name;
      const z_desc = JSON?.parse(userinfo)?.zone_name;

      setImageLink(ImageLink);
      setRole_id(JSON?.parse(userinfo)?.role_id);
      setLocalIds({
        ...localIds,
        c_id: cid,
        bg_id: bgid,
        bu_id: buid,
        z_id: zid,
        r_id: rid,
        t_id: tid,
        t_desc: t_desc,
        bg_desc: bg_desc,
        bu_desc: bu_desc,
        r_desc: r_desc,
        z_desc: z_desc
      });
    }
  }, []);

  //Pagination......///////

  const [currentPage, setCurrentPage] = useState({ selected: 0 });
  const [pageCount, setPageCount] = useState(0);
  const [pageTotal, setPageTotal] = useState(0);

  const gettingDealerData = async (page, bg, bu, z, r, t, empCode) => {
    try {
      const resp = await axios.get(`${url}/api/get_dealer`, {
        headers: headers,
        params: {
          t_id: t === "All" ? null : t,
          bg_id: bg === "All" ? null : bg,
          bu_id: bu === "All" ? null : bu,
          z_id: z === "All" ? null : z,
          r_id: r === "All" ? null : r,
          c_id: JSON.parse(window.localStorage.getItem("userinfo")).c_id,
          paging: true,
          page: page,
          size: 50,
          bst: true,
          empcode: empCode
        }
      });
      const respData = await resp.data.data.dealerData;
      const count = await resp.data.data.dealerDatacount;

      setPageCount(Math.ceil(count / 50));
      setDealerData(respData);
      setPageTotal(count);
    } catch (error) {
      console.log(error);
    }
  };

  const [isOpen, setisOpen] = useState(false);
  const [isGenOpen, setGenOpen] = useState(false);
  const [userId, setUserId] = useState(null);

  const deleteHandler = (id) => {
    setisOpen(true);
    setUserId(id);
  };

  const resetData = () => {
    gettingDealerData();
    setisOpen(false);
  };

  const handlePageChange = (page, bg, bu, z, r, t, empCode) => {
    setCurrentPage(page);
    // gettingDealerData(page?.selected + 1, bg, bu, z, r, t, empCode);
    gettingDealerData(page?.selected + 1, bg, bu, z, r, t, empCode);
    // gettingDealerData("t", localIds?.t_desc, localIds?.c_id, true, currentPage?.selected + 1, 50, true);
  };

  const csvHeaders = [
    { label: "Id", key: "d_id" },
    { label: "App No", key: "appl_no" },
    { label: "App Date", key: "app_date" },
    { label: "App Status", key: "app_status" },
    { label: "Party Name", key: "party_Name" },
    { label: "Address", key: "address" },
    { label: "Postal Address", key: "postal_Address" },
    { label: "City", key: "city" },
    { label: "State", key: "state" },
    { label: "Country", key: "country" },
    { label: "Pincode", key: "pincode" },
    { label: "Proprietary Name", key: "contact_person" },
    { label: "Customer Type", key: "dealer_type" },
    { label: "Primry No.", key: "pmobile" },
    { label: "Secondary No.", key: "smobile" },
    { label: "Email Id", key: "pemail" },
    { label: "District", key: "district" },
    { label: "Territory", key: "territory_name" },
    { label: "Region", key: "region_name" },
    { label: "Zone", key: "zone_name" },
    { label: "Business Unit", key: "business_unit_name" },
    { label: "Segment", key: "business_segment" },
    { label: "Company", key: "company_name" },
    { label: "Territory Person", key: "t_hod_name" },
    { label: "Region Person", key: "r_hod_name" },
    { label: "Zonal Head", key: "z_hod_name" },
    { label: "Unit Head", key: "bu_hod_name" },
    { label: "Year of Establishment", key: "year_est" },
    { label: "Nature of Firm", key: "nature_firm" },
    { label: "No Of Person", key: "no_part" },
    { label: "Pan No.", key: "pan" },
    { label: "GST", key: "gst" },
    { label: "GST STATUS", key: "gst_status" },
    { label: "Pesticide License No.", key: "plicense" },
    { label: "Pesticide Valid To", key: "pvalidto" },
    { label: "Fertilizer License No", key: "flicense" },
    { label: "Fertilizer Valid To", key: "fvalidto" },
    { label: "Shop Est No.", key: "shop_establish" },
    { label: "Shop Status", key: "shop_status" },
    { label: "Amount Deposit", key: "amt_deposit" },
    { label: "Amount Paidby", key: "amt_paidby" },
    { label: "Reciept No/UTR Number", key: "rec_utrno" },
    { label: "Dated", key: "recutr_date" },
    { label: "Cheque One", key: "cheque_one" },
    { label: "Cheque One Date", key: "cheque_dateOne" },
    { label: "Bank Name One", key: "bank_nameOne" },
    { label: "A/c No. One", key: "ac_no_one" },
    { label: "Amount One", key: "amount_one" },
    { label: "Cheque Two", key: "cheque_two" },
    { label: "Cheque Two Date", key: "cheque_dateTwo" },
    { label: "Bank Name Two", key: "bank_nameTwo" },
    { label: "A/c No. Two", key: "ac_no_two" },
    { label: "Amount Two", key: "amount_two" },
    { label: "Cheque Three", key: "cheque_three" },
    { label: "Cheque Three Date", key: "cheque_dateThree" },
    { label: "Bank Name Three", key: "bank_nameThree" },
    { label: "A/c No. Three", key: "ac_no_three" },
    { label: "Amount Three", key: "amount_three" },
    { label: "General", key: "general" },
    { label: "Proprietor Relationship", key: "prop_rel" },
    { label: "Goodwill", key: "goodwill" },
    { label: "Financial Status", key: "financial" },
    { label: "Family Background", key: "family_back" },
    { label: "Any Demerit", key: "demrit_dist" },
    { label: "Agreement", key: "accept_the_policy" },
    { label: "Company Code", key: "SAP_Company" },
    { label: "Sales Organisation", key: "SAP_SalesOrg" },
    { label: "Distributor Channel", key: "SAP_Dchannel" },
    { label: "Division", key: "SAP_Division" },
    { label: "Shipping Condition", key: "SAP_ShippingCond" },
    { label: "Incoterms", key: "SAP_incoterms" },
    { label: "Incoterms Location", key: "SAP_incoterms_location" },
    { label: "Payment Terms", key: "SAP_Payterm" },
    { label: "Customer Pricing Procedure", key: "SAP_CPriceProcure" },
    { label: "Account Group", key: "SAP_Acgroup" },
    { label: "Account Assignment Group", key: "SAP_AcAssiggroup" },
    { label: "Reconciliation Account", key: "SAP_RecoAccount" },
    { label: "Accounting Group", key: "SAP_AccountingGroup" },
    { label: "Currency", key: "SAP_Currency" },
    { label: "Search Terms", key: "SAP_search_terms" },
    { label: "Customer SAP No.", key: "" },
    { label: "Business Partner No", key: "business_partner_no" },
    { label: "Name", key: "name" },
    { label: "Name2", key: "name2" },
    { label: "Grouping", key: "grouping" },
    { label: "Location", key: "location" },
    { label: "Extern No ", key: "extern_no" },
    { label: "Destination ", key: "destination" },
    { label: "Delv Plant ", key: "delv_plant" },

    { label: "Country 1 ", key: "country1" },
    { label: "Tax Category 1 ", key: "tax_category1" },
    { label: "Tax Class 1 ", key: "tax_class1" },

    { label: "Country 2 ", key: "country2" },
    { label: "Tax Category 2 ", key: "tax_category2" },
    { label: "Tax Class 2 ", key: "tax_class2" },

    { label: "Country 3 ", key: "country3" },
    { label: "Tax Category 3 ", key: "tax_category3" },
    { label: "Tax Class 3 ", key: "tax_class3" },

    { label: "Country 4 ", key: "country4" },
    { label: "Tax Category 4 ", key: "tax_category4" },
    { label: "Tax Class 4 ", key: "tax_class4" },

    { label: "Country 5 ", key: "country5" },
    { label: "Tax Category 5 ", key: "tax_category5" },
    { label: "Tax Class 5 ", key: "tax_class5" },

    { label: "Country 6 ", key: "country6" },
    { label: "Tax Category 6 ", key: "tax_category6" },
    { label: "Tax Class 6 ", key: "tax_class6" },

    { label: "Partner Function 5", key: "partner_function5" },
    { label: "PF Code 5", key: "pf_code5" },

    { label: "Partner Function 6", key: "partner_function6" },
    { label: "PF Code 6", key: "pf_code6" },

    { label: "Partner Function 7", key: "partner_function7" },
    { label: "PF Code 7", key: "pf_code7" },

    { label: "Partner Function 8", key: "partner_function8" },
    { label: "PF Code 8", key: "pf_code8" },

    { label: "Partner Function 9", key: "partner_function9" },
    { label: "PF Code 9", key: "pf_code9" },

    { label: "Balance Sheet", key: "balance_sheet" },
    { label: "Bank Period F", key: "bank_period_f" },

    { label: "Bank Period T", key: "bank_period_t" },
    { label: "Dep Value", key: "dep_value_lac" },
    { label: "Dep Value 30%", key: "dep_value_30_perc" },
    { label: "Valid Date From", key: "valid_date_from" },
    { label: "Valid Date To", key: "valid_date_to" },
    { label: "Segment Code", key: "segment_code" },
    { label: "Unit Code", key: "unit_code" },
    { label: "Zone Code", key: "zone_code" },
    { label: "Region Code", key: "region_code" },
    { label: "Territory Code", key: "territory_code" },

    { label: "Territory Person", key: "t_user_Person" },
    { label: "Territory Designation", key: "t_id_desig" },
    { label: "Territory Date of Approval", key: "t_app_date" },
    { label: "Territory Status", key: "t_id_status" },
    { label: "Regional Manager", key: "r_user_Person" },
    { label: "Regional Designation", key: "r_id_desig" },
    { label: "Regional Approval Date", key: "r_app_date" },
    { label: "Regional Visited", key: "r_visited" },
    { label: "Regional All Documents", key: "r_docuv" },
    { label: "Regional Status", key: "r_id_status" },
    { label: "Zonal Manager", key: "z_user_Person" },
    { label: "Zonal Designation", key: "z_id_desig" },
    { label: "Zonal Approval Date", key: "z_app_date" },
    { label: "Zonal Visited", key: "z_visited" },
    { label: "Zonal Documents", key: "z_docuv" },
    { label: "Zonal Status", key: "z_id_status" },
    { label: "Zone A/c Manager", key: "zac_user_Person" },
    { label: "Zone A/c Designation", key: "zac_id_desig" },
    { label: "Zone A/c Date Approval", key: "zac_app_date" },
    { label: "Zone A/c Status", key: "zac_id_status" },
    { label: "Zone A/c All Info Checked", key: "zac_isinfo" },
    { label: "Zone A/c Security Deposit", key: "zac_isseqdpt" },
    { label: "Zone A/c Blank Cheque", key: "zac_blankchq" },
    { label: "Zone A/c Letter Head", key: "zac_lthead" },
    { label: "Business Unit Head", key: "bu_user_Person" },
    { label: "Business Unit Designation", key: "bu_id_desig" },
    { label: "Business Unit Approval", key: "bu_app_date" },
    { label: "Business Unit Status", key: "bu_id_status" },
    // { label: "Customer Type", key: "Dealer_Type" },
    { label: "Document Status", key: "Doc_Status" },
    { label: "Status", key: "Status" }
  ];

  //Transforming Data For Excel Sheets

  const transformData = (data) => {
    return data?.map((item) => ({
      ...item,
      Status: item?.isDeleted ? "Disabled" : "Enabled",
      Dealer_Type: item.d_type == "not_registered" ? "Not Registered" : "Registered",
      Doc_Status: item.has_docs ? "Attached" : "Not Attached"
    }));
  };

  const transformed = transformData(dealerData);

  console.log("TransFormed", transformed);

  const { name } = router.query;

  const [dealerDetails, setdealerDetails] = useState({
    appl_no: "",
    party_Name: "",
    pmobile: "",
    pemail: "",
    gst: "",
    pan: "",
    businessName: "",
    year_est: "",
    constitutionOfBusiness: "",
    address: "",
    postal_address: "",
    city: "",
    district: "",
    pincode: "",
    nature_firm: "",
    gst_v: false,
    gst_status: "",
    d_type: "",
    nature_firm: "",
    t_id: "",
    c_id: "",
    bg_id: "",
    bu_id: "",
    r_id: "",
    z_id: "",
    t_desc: "",
    bg_desc: "",
    bu_desc: "",
    r_desc: "",
    z_desc: ""
  });

  const [empIdState, setEmpIdState] = useState(false);
  const [generateLoading, setGenerateLoading] = useState(false);
  //handle generate dealer

  const handleGenerateDealer = async () => {
    setGenerateLoading(true);
    try {
      if (dealerDetails.party_Name == "") {
        toast.error("Enter the Party Name");
        return;
      }
      if (dealerDetails.pmobile == "") {
        toast.error("Enter the Mobile Number");
        return;
      }
      if (dealerDetails.pemail == "") {
        toast.error("Enter the Email");
        return;
      }
      if (dealerDetails.nature_firm == "") {
        toast.error("Enter the Nature Firm");
        return;
      }
      const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      if (!regex.test(dealerDetails.pemail)) {
        toast.error("Enter Valid Email Id");
        return;
      }

      const data = {
        // c_id: localIds.c_id,
        c_id: role_id == 5 ? Number(dealerDetails.c_id) : localIds.c_id,
        bg_id: role_id == 5 ? Number(dealerDetails.bg_id) : localIds.bg_id,
        bu_id: role_id == 5 ? Number(dealerDetails.bu_id) : localIds.bu_id,
        r_id: role_id == 5 ? Number(dealerDetails.r_id) : localIds.r_id,
        z_id: role_id == 5 ? Number(dealerDetails.z_id) : localIds.z_id,
        t_desc: role_id == 5 ? dealerDetails.t_desc : localIds.t_desc,
        bg_desc: role_id == 5 ? dealerDetails.bg_desc : localIds.bg_desc,
        bu_desc: role_id == 5 ? dealerDetails.bu_desc : localIds.bu_desc,
        r_desc: role_id == 5 ? dealerDetails.r_desc : localIds.r_desc,
        z_desc: role_id == 5 ? dealerDetails.z_desc : localIds.z_desc,
        app_date: new Date(),
        party_Name: dealerDetails.party_Name,
        pmobile: dealerDetails.pmobile,
        pemail: dealerDetails.pemail,
        gst: dealerDetails.gst,
        pan: dealerDetails.pan,
        businessName: dealerDetails.party_Name,
        year_est: dealerDetails.year_est,
        constitutionOfBusiness: dealerDetails.constitutionOfBusiness,
        address: dealerDetails.address,
        postal_address: dealerDetails.address,
        city: dealerDetails.city,
        district: dealerDetails.district,
        pincode: dealerDetails.pincode,
        nature_firm: dealerDetails.nature_firm,
        gst_v: dealerDetails.gst_v,
        d_type: dealerDetails.d_type,
        t_id: role_id == 5 ? Number(dealerDetails.t_id) : localIds.t_id,
        app_status: "Generate Application"
      };

      // return;
      const respond = await axios
        .post(`${url}/api/add_dealer`, JSON.stringify(data), {
          headers: headers
        })
        .then((res) => {
          if (!res) return;
          toast.success("Added Successully");
          console.log("insidferes", res);
          setdealerDetails({
            appl_no: res.data.data.appl_no,
            pmobile: res.data.data.pmobile,
            pemail: res.data.data.pemail
          });
          setEmpIdState(res.data.data.d_id);
        });
    } catch (errors) {
      console.log("addd", errors);
      const erroApiRes = errors?.response?.data?.message;
      toast.error(erroApiRes);
      // const errorMessage = errors?.response?.data?.error;
      // if (errorMessage?.includes("pemail_1")) {
      //   toast.error("Email already exist");
      // } else if (errorMessage?.includes("pmobile_1")) {
      //   toast.error("Mobile No. already exist");
      // } else if (errorMessage) {
      //   toast.error(errorMessage);
      // }

      // errors?.inner?.forEach((error) => {
      //   toast.error(error?.message);
      // });
    } finally {
      setGenerateLoading(false);
    }
  };

  const [ImageLink, setImageLink] = useState(null);

  //modal openclose
  const handleCloseModal = (role_id) => {
    setGenOpen(false);

    switch (role_id) {
      case 6:
        gettingDealerData("t", localIds.t_desc, localIds.c_id);
        break;
      case 12:
        gettingDealerData("za", localIds.z_desc, localIds.c_id);
        break;
      case 5:
        gettingDealerData("r", localIds.r_desc, localIds.c_id);
        break;
      case 4:
        gettingDealerData("z", localIds.z_desc, localIds.c_id);
        break;
      case 3:
        gettingDealerData("bu", localIds.bu_desc, localIds.c_id);
        break;
      default:
        break;
    }

    setdealerDetails({
      ...dealerDetails,
      appl_no: "",
      party_Name: "",
      pmobile: "",
      pemail: "",
      gst: "",
      d_type: "",
      t_id: "",
      nature_firm: ""
    });

    setGstVerify(false);
    setEmpIdState(null);
  };

  //setting Image on Generate App

  // useEffect(() => {
  //   if (window.localStorage) {
  //     const userinfo = localStorage.getItem("userinfo");

  //     const ImageLink = localStorage.getItem("ImageLink");
  //     setImageLink(ImageLink);
  //     setRole_id(JSON?.parse(userinfo)?.role_id);
  //   }
  // }, []);

  //hiding something

  useEffect(() => {
    switch (role_id) {
      // case 1:
      case 2:
      // case 12:
      case 6:
        setHide(true);
        break;
      case 5:
        setHide(true);
        break;
      default:
        setHide(false);
    }
  }, [role_id]);

  //Disabling the delete button
  const [delDisable, setDelDisable] = useState(null);
  useEffect(() => {
    switch (role_id) {
      case 12:
      case 5:
      case 4:
      case 3:
        setDelDisable(true);
        break;
      default:
        break;
    }
  }, [role_id]);

  //Re to verify the GST Number Client Side

  function isGSTValid(str) {
    let regex = new RegExp(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/);
    if (str == null) {
      return "false";
    }

    if (regex.test(str) == true) {
      return true;
    } else {
      return false;
    }
  }

  //handle Verify GST Number

  async function handleVerifyGST() {
    if (dealerDetails.gst == "") {
      toast.error("Enter the valid GST Number");
      return;
    }

    const gstValid = isGSTValid(dealerDetails.gst);
    if (!gstValid) {
      toast.error("Enter the correct GST Number");
      return;
    }
    setGstVerify(true);
    // return;
    try {
      const res = await axios.get(`${url}/api/get_gst_details?gstin=${dealerDetails.gst}`);
      const respdata = await res.data.data;
      console.log(respdata);
      if (!respdata) {
        return;
      }
      if (respdata.taxpayerInfo.status) {
        toast.success("GST Active");
        setGstVerify(true);
      }
      setdealerDetails({
        ...dealerDetails,
        pan: respdata.taxpayerInfo.pan ?? "",
        gst_v: Boolean(respdata.taxpayerInfo.status) ?? "",
        gst_status: respdata.taxpayerInfo.status ?? "",
        gst: respdata.taxpayerInfo.gstin ?? "",
        party_Name: respdata.taxpayerInfo.legalBusinessName ?? "",
        year_est: respdata.taxpayerInfo.registrationDate ?? "",
        constitutionOfBusiness: respdata.taxpayerInfo.constitutionOfBusiness ?? "",
        address:
          (respdata.taxpayerInfo.principalAddress.address.floorNumber ?? "") +
            (respdata.taxpayerInfo.principalAddress.address.doorNumber ?? "") +
            (respdata.taxpayerInfo.principalAddress.address.buildingName ?? "") +
            (respdata.taxpayerInfo.principalAddress.address.locality ?? "") ?? "",
        postal_address:
          (respdata.taxpayerInfo.principalAddress.address.floorNumber ?? "") +
            (respdata.taxpayerInfo.principalAddress.address.doorNumber ?? "") +
            (respdata.taxpayerInfo.principalAddress.address.buildingName ?? "") +
            (respdata.taxpayerInfo.principalAddress.address.locality ?? "") ?? "",
        city:
          (respdata.taxpayerInfo.principalAddress.address.city ?? "") +
            (respdata.taxpayerInfo.principalAddress.address.locality ?? "") ?? "",
        district: respdata.taxpayerInfo.principalAddress.address.district ?? "",
        pincode: respdata.taxpayerInfo.principalAddress.address.pincode ?? ""

        // nature_firm: respdata.taxpayerInfo.principalAddress.natureOfBusiness ?? ""
      });
    } catch (error) {
      console.log("GSTERROR", error);
      setGstVerify(false);
      toast.error("Enter the correct GST Number");
      // const errorMessage = error?.errors[0]?.error_resolution;
      // toast.error(errorMessage);
    }
  }

  // Reset isGstVerify when GST number changes
  useEffect(() => {
    setGstVerify(false);
  }, [dealerDetails.gst]);

  //validate gst

  function toCheckGST() {
    const registered = dealerDetails.d_type == "registered";
    if (registered && !isGstVerify) {
      return true;
    } else {
      return false;
    }
  }

  //Temp Data of Selected Territory List
  const [selectedTerri, setSelectedTerri] = useState(null);

  //get the t_id

  //get all territory data

  const getAllTerritoryData = async () => {
    try {
      const res = await axios.get(`${url}/api/get_territory`, { headers: headers });
      const respdata = await res.data.data;
      setFilterTerri(
        respdata
          .filter((item) => Number(item.bg_id) === localIds.bg_id)
          .filter((item) => Number(item.bu_id) === localIds.bu_id)
          .filter((item) => Number(item.z_id) === localIds.z_id)
          .filter((item) => Number(item.r_id) === localIds.r_id)
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllTerritoryData();
  }, [isGenOpen]);

  //Territory List Select Description For Generate Application

  useEffect(() => {
    const filteredTerr = filterTerri.filter((item) => {
      if (item?.t_id == dealerDetails?.t_id) return item;
    });
    setdealerDetails({
      ...dealerDetails,
      c_id: filteredTerr[0]?.c_id,
      t_id: filteredTerr[0]?.t_id,
      bg_id: filteredTerr[0]?.bg_id,
      bu_id: filteredTerr[0]?.bu_id,
      r_id: filteredTerr[0]?.r_id,
      z_id: filteredTerr[0]?.z_id,
      t_desc: filteredTerr[0]?.territory_name,
      bg_desc: filteredTerr[0]?.business_segment,
      bu_desc: filteredTerr[0]?.business_unit_name,
      r_desc: filteredTerr[0]?.region_name,
      z_desc: filteredTerr[0]?.zone_name
    });
  }, [dealerDetails?.t_id]);

  console.log("DealerData", dealerDetails);

  //CSV Headers
  const sapCSV = [
    { label: "AADHAR", key: "AADHAR" },
    { label: "ACCT ASSGNMENT GRP", key: "ACCT ASSGNMENT GRP" },
    { label: "AGRI LICENSE", key: "AGRI LICENSE" },
    { label: "AV OUTSTANDING", key: "AV OUTSTANDING" },
    { label: "AVERAGE OS DATE", key: "AVERAGE OS DATE" },
    { label: "BAL SHEET STATUS", key: "BAL SHEET STATUS" },
    { label: "BALANCE CONF 1", key: "BALANCE CONF 1" },
    { label: "BALANCE CONF 2", key: "BALANCE CONF 2" },
    { label: "BALANCE CONF 3", key: "BALANCE CONF 3" },
    { label: "BALANCE CONF 4", key: "BALANCE CONF 4" },
    { label: "BANK ACCOUNT", key: "BANK ACCOUNT" },
    { label: "BANK DETAILS", key: "BANK DETAILS" },
    { label: "BANK DETAILS 1", key: "BANK DETAILS 1" },
    { label: "BANK PERIOD(F)", key: "BANK PERIOD(F)" },
    { label: "BANK PERIOD(T)", key: "BANK PERIOD(T)" },
    { label: "BANK STMT", key: "BANK STMT" },
    { label: "BUSINESS PARTNER NO", key: "BUSINESS PARTNER NO" },
    { label: "C/OME", key: "C/OME" },
    { label: "CHECK RULE", key: "CHECK RULE" },
    { label: "CHEQUE DATE1", key: "CHEQUE DATE1" },
    { label: "CHEQUE DATE2", key: "CHEQUE DATE2" },
    { label: "CHEQUE DATE3", key: "CHEQUE DATE3" },
    { label: "CITY", key: "CITY" },
    { label: "COMPANY CODE", key: "company_code" },
    { label: "CONTACT PERSON1", key: "contact_person1" },
    { label: "CONTACT PERSON2", key: "contact_person2" },
    { label: "CONTACT PERSON3", key: "contact_person3" },
    { label: "COUNTRY", key: "country" },
    { label: "COUNTRY1", key: "country1" },
    { label: "COUNTRY2", key: "country2" },
    { label: "COUNTRY3", key: "country3" },
    { label: "COUNTRY4", key: "country4" },
    { label: "COUNTRY5", key: "country5" },
    { label: "COUNTRY6", key: "country6" },
    { label: "CREDIT CONTROL AREA", key: "credit_control_area" },
    { label: "CREDIT GROUP", key: "credit_group" },
    { label: "CREDIT RULES", key: "credit_rules" },
    { label: "CREDIT SEGMENT", key: "credit_segment" },
    { label: "CURRENCY", key: "currency" },
    { label: "CUST PRIC PROC", key: "cust_pric_proc" },
    { label: "CUST RATING", key: "cust_rating" },
    { label: "CUST STAT GRP", key: "cust_stat_grp" },
    { label: "CUSTOMER GRP", key: "customer_grp" },
    { label: "Cust Status", key: "cust_status" },
    { label: "Customer Type(B2B/B2C)", key: "customer_type" },
    { label: "DAF STATUS", key: "daf_status" },
    { label: "DELV PLANT", key: "delv_plant" },
    { label: "DEP VALUE(30%)", key: "dep_value_30_perc" },
    { label: "DEP VALUE(LAC)", key: "dep_value_lac" },
    { label: "DESTINATION", key: "destination" },
    { label: "DISTN CHANNEL", key: "distn_channel" },
    { label: "DISTRICT", key: "district" },
    { label: "DIVISION", key: "division" },
    { label: "DOC RETURN DATE", key: "doc_return_date" },
    { label: "FAX_NUM", key: "fax_num" },
    { label: "GROUPING", key: "grouping" },
    { label: "GSTIN", key: "gstin" },
    { label: "INCO LOCAT 1", key: "inco_locat_1" },
    { label: "INCO LOCATN 2", key: "inco_locatn_2" },
    { label: "INCO TEM", key: "inco_tem" },
    { label: "LEGAL CASE DATE", key: "legal_case_date" },
    { label: "LIMIT", key: "limit" },
    { label: "LOCAL REGION", key: "local_region" },
    { label: "LOCAL REGION CODE", key: "local_region_code" },
    { label: "LOCATION", key: "location" },
    { label: "LOCATION 1", key: "location_1" },
    { label: "MOBILE NO", key: "mobile_no" },
    { label: "MOBILE NO2", key: "mobile_no2" },
    { label: "Name", key: "name" },
    { label: "Name 2", key: "name_2" },
    { label: "Name 3", key: "name_3" },
    { label: "OPEN DATE", key: "OPEN DATE" },
    { label: "OTHER", key: "other" },
    { label: "PAN", key: "pan" },
    { label: "PARTNER FUCTION1", key: "partner_function1" },
    { label: "PARTNER FUCTION2", key: "partner_function2" },
    { label: "PARTNER FUCTION3", key: "partner_function3" },
    { label: "PARTNER FUCTION4", key: "partner_function4" },
    { label: "PARTNER FUCTION5", key: "partner_function5" },
    { label: "PARTNER FUCTION6", key: "partner_function6" },
    { label: "PARTNER FUCTION7", key: "partner_function7" },
    { label: "PARTNER FUCTION8", key: "partner_function8" },
    { label: "PARTNER FUCTION9", key: "partner_function9" },
    { label: "PARTNER FUCTION10", key: "partner_function10" },
    { label: "PF CODE1", key: "pf_code1" },
    { label: "PF CODE2", key: "pf_code2" },
    { label: "PF CODE3", key: "pf_code3" },
    { label: "PF CODE4", key: "pf_code4" },
    { label: "PF CODE5", key: "pf_code5" },
    { label: "PF CODE6", key: "pf_code6" },
    { label: "PF CODE7", key: "pf_code7" },
    { label: "PF CODE8", key: "pf_code8" },
    { label: "PF CODE9", key: "pf_code9" },
    { label: "PF CODE10", key: "pf_code10" },
    { label: "PLANT", key: "plant" },
    { label: "POSTAL CODE", key: "postal_code" },
    { label: "PRICE GRP", key: "price_grp" },
    { label: "PRICE LIST", key: "price_list" },
    { label: "Qtr1 Remark", key: "qtr1_remark" },
    { label: "Qtr2 Remark", key: "qtr2_remark" },
    { label: "Qtr3 Remark", key: "qtr3_remark" },
    { label: "Qtr4 Remark", key: "qtr4_remark" },
    { label: "RECONCILIATION ACCT", key: "reconciliation_acct" },
    { label: "REGION", key: "region" },
    { label: "RISK CLASS", key: "risk_class" },
    { label: "Region Code", key: "region_code" },
    { label: "S CHEQUE DATE", key: "s_cheque_date" },
    { label: "S CHEQUE NO", key: "s_cheque_no" },
    { label: "SALES DISTRICT", key: "sales_district" },
    { label: "SALES GRP", key: "sales_grp" },
    { label: "SALES OFF", key: "sales_off" },
    { label: "SALES ORG", key: "sales_org" },
    { label: "SALES TARGET", key: "sales_target" },
    { label: "SALUTATION/ CONTACT PERSON", key: "salutation_contact_person" },
    { label: "SE DEPOSIT AMT", key: "se_deposit_amt" },
    { label: "SECURITY CHECK1", key: "security_check1" },
    { label: "SECURITY CHECK2", key: "security_check2" },
    { label: "SECURITY CHECK3", key: "security_check3" },
    { label: "SEGMENT", key: "segment" },
    { label: "SHELF LIFE", key: "shelf_life" },
    { label: "SHOP ESTABLISH NO", key: "shop_establish_no" },
    { label: "SHOP ESTABLISH STATUS", key: "shop_establish_status" },
    { label: "STATE", key: "state" },
    { label: "TAX CATEGORY", key: "tax_category" },
    { label: "TAX CATEGORY1", key: "tax_category1" },
    { label: "TAX CATEGORY2", key: "tax_category2" },
    { label: "TAX CATEGORY3", key: "tax_category3" },
    { label: "TAX CATEGORY4", key: "tax_category4" },
    { label: "TAX CATEGORY5", key: "tax_category5" },
    { label: "TAX CATEGORY6", key: "tax_category6" },
    { label: "TAX CLASS", key: "tax_class" },
    { label: "TAX CLASS1", key: "tax_class1" },
    { label: "TAX CLASS2", key: "tax_class2" },
    { label: "TAX CLASS3", key: "tax_class3" },
    { label: "TAX CLASS4", key: "tax_class4" },
    { label: "TAX CLASS5", key: "tax_class5" },
    { label: "TAX CLASS6", key: "tax_class6" },
    { label: "TEL_NUM", key: "tel_num" },
    { label: "TYPE OF BUSI", key: "type_of_busi" },
    { label: "VENDOR CODE", key: "vendor_code" },
    { label: "Z USER PERSON", key: "z_user_person" },
    { label: "ZONE", key: "zone" },
    { label: "Zone Code", key: "zone_code" }
  ];

  //Fetching the SAP Data From API

  useEffect(() => {
    const fetchSAPData = async () => {
      try {
        const res = await axios.get(`${url}/api/get_sap_dealer?c_id=1`, { headers: headers });
        const respdata = await res.data.data;
        // console.log("SAPDATA", respdata)
        // setSapData(respdata);
        if (respdata.length) {
          setIsAllowed(true);
          setSapDealerData(respdata);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSAPData();
  }, []);

  console.log("SAP_Dealer", sapDealerData);

  const getSapDealer = () => {
    // return getSapDealer()
  };
  getSapDealer("csv", "fields");

  const [searchFilter, setSearchFilter] = useState("option");
  const [searchTerm, setSearchTerm] = useState("");

  /////////////////////////////// All Filters /////////////////////////////////////////////////

  const [localStorageItems, setLocalStorageItems] = useState({
    cId: null,
    bgId: null,
    buId: null,
    rId: null,
    zId: null,
    tId: null,
    roleId: null
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
    empCode: null
  });

  const [bgData, setBgData] = useState([]);

  const getBusinesSegmentInfo = async () => {
    try {
      const respond = await axios.get(`${url}/api/get_business_segment`, {
        headers: headers
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
      const respond = await axios.get(`${url}/api/get_business_unit_by_segmentId/${businessSegmentId}`, {
        headers: headers
      });
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
        headers: headers
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
        headers: headers
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

  const getAllTerrtoryData = async (segmentId, businessUnitId, zoneId, regionId) => {
    try {
      const respond = await axios.get(`${url}/api/get_territory`, {
        headers: headers
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
    if (!filterState.bgId || !filterState.buId || !filterState.zId || !filterState.rId) return;
    getAllTerrtoryData(filterState.bgId, filterState.buId, filterState.zId, filterState.rId);
  }, [filterState.bgId, filterState.buId, filterState.zId, filterState.rId]);

  useEffect(() => {
    // const roleId = JSON.parse(window.localStorage.getItem("userinfo"))?.role_id;
    const roleId = 6;
    let filterState = {
      bgId: "All",
      buId: "All",
      zId: "All",
      rId: "All",
      tId: "All"
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
          empCode:
            JSON.parse(window.localStorage.getItem("userinfo")).emp_code === 0
              ? "All"
              : JSON.parse(window.localStorage.getItem("userinfo")).emp_code
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
          roleId: JSON.parse(window.localStorage.getItem("userinfo")).role_id
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
          empCode:
            JSON.parse(window.localStorage.getItem("userinfo")).emp_code === 0
              ? "All"
              : JSON.parse(window.localStorage.getItem("userinfo")).emp_code
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
              : JSON.parse(window.localStorage.getItem("userinfo")).t_id || "All",
          empCode:
            JSON.parse(window.localStorage.getItem("userinfo")).emp_code === 0
              ? "All"
              : JSON.parse(window.localStorage.getItem("userinfo")).emp_code
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
          startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
          endDate: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)
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
              : JSON.parse(window.localStorage.getItem("userinfo")).r_id || "All",
          tId:
            JSON.parse(window.localStorage.getItem("userinfo")).t_id === 0
              ? "All"
              : JSON.parse(window.localStorage.getItem("userinfo")).t_id || "All",
          empCode:
            JSON.parse(window.localStorage.getItem("userinfo")).emp_code === 0
              ? "All"
              : JSON.parse(window.localStorage.getItem("userinfo")).emp_code
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
          startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
          endDate: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)
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
              : JSON.parse(window.localStorage.getItem("userinfo")).r_id || "All",
          tId:
            JSON.parse(window.localStorage.getItem("userinfo")).t_id === 0
              ? "All"
              : JSON.parse(window.localStorage.getItem("userinfo")).t_id || "All",
          roleId: JSON.parse(window.localStorage.getItem("userinfo")).role_id
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
          startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
          endDate: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)
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
              : JSON.parse(window.localStorage.getItem("userinfo")).r_id || "All",
          tId:
            JSON.parse(window.localStorage.getItem("userinfo")).t_id === 0
              ? "All"
              : JSON.parse(window.localStorage.getItem("userinfo")).t_id || "All",
          roleId: JSON.parse(window.localStorage.getItem("userinfo")).role_id
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
          tId: JSON.parse(window.localStorage.getItem("userinfo")).t_id
        });

        setFilterState({
          bgId: JSON.parse(window.localStorage.getItem("userinfo")).bg_id,
          buId: JSON.parse(window.localStorage.getItem("userinfo")).bu_id,
          rId: JSON.parse(window.localStorage.getItem("userinfo")).r_id,
          zId: JSON.parse(window.localStorage.getItem("userinfo")).z_id,
          tId: JSON.parse(window.localStorage.getItem("userinfo")).t_id,
          startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
          endDate: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)
        });
        setFilterState(filterState);

        break;
    }
  }, []);

  useEffect(() => {
    console.log(
      "zop",
      currentPage?.selected + 1,
      filterState.bgId,
      filterState.buId,
      filterState.zId,
      filterState.rId,
      filterState.tId
    );

    if (currentPage?.selected + 1 && filterState.bgId) {
      gettingDealerData(
        currentPage.selected + 1,
        filterState.bgId,
        filterState.buId,
        filterState.zId,
        filterState.rId,
        filterState.tId
      );
    }
  }, [
    currentPage?.selected,
    filterState.bgId,
    filterState.buId,
    filterState.zId,
    filterState.rId,
    filterState.tId,
    searchFilter
  ]);

  // useEffect(() => {
  //   console.log("zop", currentPage?.selected + 1);

  //   // if (currentPage?.selected + 1) {
  //     gettingDealerData("t", localIds.t_desc, localIds.c_id, true, currentPage?.selected + 1, 50, true);
  //   // }
  // }, [searchFilter]);

  ///Searching API

  const searchAPI = async (key, value) => {
    // switch (key) {
    //   case "empcode":
    //     if (!/^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$/.test(value)) {
    //       toast.error(`${key.replace("_", " ")} must be a valid number`);
    //       return;
    //     }
    //     break;
    //   case "phone_number":
    //     if (!/^\d{10}$/.test(value)) {
    //       toast.error(`${key.replace("_", " ")} must be a 10-digit number.`);
    //       return;
    //     }
    //     break;
    //   case "pan":
    //     if (!/^[a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}$/.test(value)) {
    //       toast.error(`${key.replace("_", " ")} must be a valid PAN card number`);
    //       return;
    //     }
    //     break;
    //   case "account":
    //     if (!/^\d{3,}$/.test(value)) {
    //       toast.error(`${key.replace("_", " ")} must be a valid bank account number.`);
    //       return;
    //     }
    //     break;
    //   case "adhar":
    //     if (!/^\d{12}$/.test(value)) {
    //       toast.error(`${key.replace("_", " ")} must be a valid Aadhar number.`);
    //       return;
    //     }
    //     break;
    //   case "status":
    //     if (typeof value !== "string" || value.trim() === "") {
    //       toast.error(`${key.replace("_", " ")} must be a valid non-empty string.`);
    //       return;
    //     }
    //     break;

    //   case "all":
    //     break;
    //   default:
    //     if (!value || !/^[a-zA-Z\s]+$/.test(value.trim())) {
    //       toast.error(`Please enter a valid search term for ${key.replace("_", " ")}.`);
    //       return;
    //     }
    //     break;
    // }
    try {
      const res = await axios.get(`${url}/api/get_dealer`, {
        params: {
          search: true,
          [key]: key === "all" ? "all" : value
        },
        headers
      });
      const resapi = await res.data.data;
      console.log("SearchData", resapi);
      setDealerData(resapi);
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleSearch = () => {
    searchAPI(searchFilter, searchTerm);
    // handlePageChange()
  };

  useEffect(() => {
    if (searchFilter === "all") {
      searchAPI(searchFilter, searchTerm);
    }
  }, [searchFilter === "all"]);

  //Show Approve Button on the random actions

  /////**************************************************JSX*********************************************************** */

  return (
    // <Layout>
    <>
      <div className=" overflow-auto w-full  ">
        <ConfirmModal
          isOpen={isOpen}
          onClose={() => setisOpen(false)}
          Segment
          onOpen={() => setisOpen(true)}
          userId={userId}
          method="delete"
          endpoints="delete_dealer"
          onDeletedData={resetData}
        ></ConfirmModal>
        <div className="text-black flex items-center justify-between bg-white max-w-full font-arial h-[52px] px-5">
          <h2 className="font-arial font-normal text-xl tabletitle  py-2">{name ? name : "Dealer"}</h2>
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="search gap-2 mx-8">
              <div className="container">
                <form className="form flex items-center ">
                  <input
                    type="search"
                    placeholder="Search"
                    className="bg-white border rounded-l-md p-1 outline-none  w-48 sm:w-72"
                  />
                  <button type="submit" className="bg-blue-500 text-white rounded-r-md p-1 ">
                    <AiOutlineSearch className="mx-2 my-1" size={20}></AiOutlineSearch>
                  </button>
                </form>
              </div>
            </div>
            {role_id == 6 || role_id == 12 ? (
              <h2>
                {isAllowed && (
                  <CSVLink data={sapDealerData} headers={sapCSV}>
                    <SiSap className="text-blue-600" size={40}></SiSap>
                  </CSVLink>
                )}
              </h2>
            ) : null}
            <h2>
              <CSVLink data={transformed} headers={csvHeaders}>
                <TbFileDownload className="text-green-600" size={34}></TbFileDownload>
              </CSVLink>
            </h2>

            <h2>
              <AiTwotoneHome
                onClick={() => {
                  router.push("/");
                }}
                className="text-red-500"
                size={34}
              ></AiTwotoneHome>
            </h2>
            {hide ? (
              <button
                onClick={() => setGenOpen(true)}
                className=" text-white py-1.5 px-2 lg:px-2 mx-4 whitespace-nowrap rounded-md bg-green-500 hover:bg-orange-500"
              >
                Generate Application
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
        {console.log("pop", filterState)}
        <div className="flex flex-row gap-4  px-4 w-vw pb-2">
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
                  tId: "All"
                });
              } else {
                setFilterState({
                  ...filterState,
                  bgId: e.target.value
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
                  tId: "All"
                });
              } else {
                setFilterState({
                  ...filterState,
                  buId: e.target.value
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
                  tId: "All"
                });
              } else {
                setFilterState({
                  ...filterState,
                  zId: e.target.value
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
            disabled={localStorageItems.roleId === 6 || localStorageItems.roleId === 5}
            onChange={(e) => {
              if (e.target.value === "All") {
                setFilterState({
                  ...filterState,
                  rId: e.target.value,
                  tId: "All"
                });
              } else {
                setFilterState({
                  ...filterState,
                  rId: e.target.value
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
                tId: e.target.value
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

          <div className="flex flex-row gap-2  items-center ">
            <select
              className="border rounded px-2 py-1  h-8"
              id="stateSelect"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
            >
              <option value="option" className="focus:outline-none focus:border-b bg-white">
                Option
              </option>
             {role_id==1 && (<option value="all">All</option>)}
              <option value="party_Name">Party Name</option>
              <option value="SAP_customerSAPNo">SAP NO</option>
              <option value="gst">GST</option>
              <option value="app_status">App Status</option>
              <option value="tm_status">TM Approve Status</option>
              <option value="rm_status">RM Approve Status</option>
              <option value="zm_status">ZM Approve Status</option>
            </select>

            {searchFilter === "all" || searchFilter === "option" ? (
              <>
                <div>{null}</div>
              </>
            ) : (
              <div className="">
                <span className="flex flex-row">
                  <input
                    className="border-2 rounded px-2 py-1   h-8"
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value.trim());
                    }}
                  />
                  <button
                    onClick={() => {
                      handleSearch();
                    }}
                    type="submit"
                    className="bg-blue-500 text-white rounded-r-md p-1 "
                  >
                    <AiOutlineSearch className="mx-1.5" size={20} />
                  </button>
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white mb-4 flex items-center justify-between md:justify-center w-full">
          <div className=" text-black font-arial scrollbar-hide overflow-x-auto w-ful w-vw mx-4 tableInf p-2">
            <table className="min-w-full divide-y border divide-gray-200">
              <thead className="border-b">
                <tr className="bg-gray-50 font-arial">
                  <th className=" w-[12%] px-6 py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Action
                  </th>
                  <th className="px-6 w-[7%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    App No
                  </th>
                  <th className="px-6 w-[10%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    App Date
                  </th>
                  <th className="px-6 w-[10%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    App Status
                  </th>
                  <th className="px-6 w-[10%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Party Name
                  </th>
                  <th className="px-6 w-[10%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Address
                  </th>
                  <th className="px-6 w-[10%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Postal Address
                  </th>
                  <th className="px-6 w-[10%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    City
                  </th>
                  <th className="px-6 w-[10%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    State
                  </th>
                  <th className="px-6 w-[10%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Country
                  </th>
                  <th className="px-6 w-[10%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Pincode
                  </th>
                  <th className=" px-6 w-[10%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Proprietary Name
                  </th>
                  <th className=" px-6 w-[10%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Customer Type
                  </th>
                  <th className=" whitespace-nowrap px-6 w-[10%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Primary Mobile
                  </th>
                  <th className="whitespace-nowrap px-6 w-[10%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    GST Secondary Mobile
                  </th>
                  <th className="px-6 w-[10%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Email Id
                  </th>
                  <th className="px-6 w-[10%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    GST Email Id
                  </th>
                  <th className="px-6 w-[10%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    District
                  </th>
                  <th className="px-6 w-[10%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Territory
                  </th>
                  <th className="px-6 w-[10%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Region
                  </th>
                  <th className="px-6 w-[10%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Zone
                  </th>
                  <th className="whitespace-nowrap px-6 w-[10%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Business Unit
                  </th>
                  <th className="px-6 w-[10%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Segment
                  </th>
                  <th className="px-6 w-[10%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Company
                  </th>
                  <th className=" whitespace-nowrap px-6 w-[10%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Territory Person
                  </th>
                  <th className=" whitespace-nowrap px-6 w-[10%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Region Person
                  </th>
                  <th className=" whitespace-nowrap px-6 w-[10%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Zonal Head
                  </th>
                  <th className=" whitespace-nowrap px-6 w-[10%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Unit Head
                  </th>
                  <th className=" px-1 w-[10%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Year of Establishment
                  </th>
                  <th className=" px-6 w-[10%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Nature of Firm
                  </th>
                  <th className=" px-6 w-[10%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    No of Person
                  </th>
                  <th className=" px-6 w-[10%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Pan No.
                  </th>
                  <th className=" px-6 w-[10%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    GST No.
                  </th>
                  <th className="px-6 w-[10%] whitespace-nowrap  py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Dealer Type
                  </th>
                  <th className=" px-6 w-[10%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    GST Status
                  </th>

                  <th className=" whitespace-nowrap px-2 w-[10%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Pesticide License No.
                  </th>
                  <th className=" whitespace-nowrap px-2 w-[10%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Pesticide Valid To.
                  </th>
                  <th className=" whitespace-nowrap px-2 w-[10%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Fertilizer License No.
                  </th>
                  <th className=" whitespace-nowrap px-2 w-[10%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Fertilizer Valid To.
                  </th>
                  <th className=" whitespace-nowrap px-2 w-[10%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Shop Est no.
                  </th>
                  <th className=" whitespace-nowrap px-2 w-[10%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Shop Status
                  </th>
                  <th className="px-6 w-[10%] whitespace-nowrap  py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Cheque One
                  </th>
                  <th className="px-6 w-[10%] whitespace-nowrap  py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Cheque One Date
                  </th>
                  <th className="px-6 w-[10%] whitespace-nowrap  py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Bank Name One
                  </th>
                  <th className="px-6 w-[10%] whitespace-nowrap  py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    A/c No. One
                  </th>
                  <th className="px-6 w-[10%] whitespace-nowrap  py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Amount One
                  </th>
                  <th className="px-6 w-[10%] whitespace-nowrap  py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Cheque Two
                  </th>
                  <th className="px-6 w-[10%] whitespace-nowrap  py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Cheque Two Date
                  </th>
                  <th className="px-6 w-[10%] whitespace-nowrap  py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Bank Name Two
                  </th>
                  <th className="px-6 w-[10%] whitespace-nowrap  py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    A/c No. Two
                  </th>
                  <th className="px-6 w-[10%] whitespace-nowrap  py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Amount Two
                  </th>
                  <th className="px-6 w-[10%] whitespace-nowrap  py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Cheque Three
                  </th>
                  <th className="px-6 w-[10%] whitespace-nowrap  py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Cheque Three Date
                  </th>
                  <th className="px-6 w-[10%] whitespace-nowrap  py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Bank Name Three
                  </th>
                  <th className="px-6 w-[10%] whitespace-nowrap  py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    A/c No. Three
                  </th>
                  <th className="px-6 w-[10%] whitespace-nowrap  py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Amount Three
                  </th>
                  <th className=" whitespace-nowrap px-2 w-[10%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Amount Deposit
                  </th>
                  <th className=" whitespace-nowrap px-2 w-[10%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Amount Paid By
                  </th>
                  <th className=" whitespace-nowrap px-2 w-[10%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Receipt/UTR No.
                  </th>
                  <th className=" whitespace-nowrap px-2 w-[10%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    General
                  </th>
                  <th className=" whitespace-nowra px-2 w-[10%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Proprietor Relationship
                  </th>
                  <th className=" whitespace-nowrap px-2 w-[10%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Goodwill
                  </th>
                  <th className=" whitespace-nowrap px-2 w-[10%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Financial Status
                  </th>
                  <th className=" whitespace-nowrap px-2 w-[10%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Family Background
                  </th>
                  <th className=" whitespace-nowrap px-2 w-[10%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Any Demerit
                  </th>
                  <th className=" whitespace-nowrap px-2 w-[10%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Agreement
                  </th>
                  <th className=" whitespace-nowrap px-2 w-[10%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Company Code
                  </th>
                  <th className=" whitespace-nowrap px-2 w-[10%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Sales Organisation
                  </th>
                  <th className=" whitespace-nowrap px-2 w-[10%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Distributor Channel
                  </th>
                  <th className=" whitespace-nowrap px-2 w-[10%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Division
                  </th>
                  <th className=" whitespace-nowrap px-2 w-[10%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Shipping Condition
                  </th>
                  <th className=" whitespace-nowrap px-2 w-[10%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Incoterms
                  </th>
                  <th className=" whitespace-nowrap px-2 w-[10%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Incoterms Location
                  </th>
                  <th className=" whitespace-nowrap px-2 w-[10%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Payment Terms
                  </th>
                  <th className=" whitespace-nowrap px-2 w-[10%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Customer Pricing Procedure
                  </th>
                  <th className=" whitespace-nowrap px-2 w-[10%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Account Group
                  </th>
                  <th className=" whitespace-nowrap px-2 w-[10%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Account Assignment Group
                  </th>
                  <th className=" whitespace-nowrap px-2 w-[10%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Reconciliation Account
                  </th>
                  <th className=" whitespace-nowrap px-2 w-[10%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Accounting Group
                  </th>
                  <th className=" whitespace-nowrap px-2 w-[10%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Currency
                  </th>
                  <th className=" whitespace-nowrap px-2 w-[10%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Search Terms
                  </th>
                  <th className=" whitespace-nowrap px-2 w-[10%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Customer SAP No.
                  </th>
                  <th className=" whitespace-nowrap px-2 w-[10%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Customer Status
                  </th>
                  <th className=" whitespace-nowrap px-2 w-[10%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Business Partner No
                  </th>
                  <th className=" whitespace-nowrap px-2 w-[10%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Name
                  </th>
                  <th className=" whitespace-nowrap px-2 w-[10%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Name 2
                  </th>
                  <th className=" whitespace-nowrap px-2 w-[10%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Grouping
                  </th>
                  <th className=" whitespace-nowrap px-2 w-[10%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Location
                  </th>
                  <th className=" whitespace-nowrap px-2 w-[10%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Extern No
                  </th>

                  <th className=" whitespace-nowrap px-2 w-[10%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Destination
                  </th>
                  <th className=" whitespace-nowrap px-2 w-[10%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Delv Plant
                  </th>

                  <th className=" whitespace-nowrap px-2 w-[10%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Country 1
                  </th>
                  <th className=" whitespace-nowrap px-2 w-[10%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Tax Category 1
                  </th>
                  <th className=" whitespace-nowrap px-2 w-[10%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Tax Class 1
                  </th>
                  <th className=" whitespace-nowrap px-2 w-[10%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Country 2
                  </th>
                  <th className=" whitespace-nowrap px-2 w-[10%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Tax Category 2
                  </th>
                  <th className=" whitespace-nowrap px-2 w-[10%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Tax Class 2
                  </th>

                  <th className=" whitespace-nowrap px-2 w-[10%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Country 3
                  </th>
                  <th className=" whitespace-nowrap px-2 w-[10%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Tax Category 3
                  </th>
                  <th className=" whitespace-nowrap px-2 w-[10%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Tax Class 3
                  </th>

                  <th className=" whitespace-nowrap px-2 w-[10%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Country 4
                  </th>
                  <th className=" whitespace-nowrap px-2 w-[10%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Tax Category 4
                  </th>
                  <th className=" whitespace-nowrap px-2 w-[10%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Tax Class 4
                  </th>

                  <th className=" whitespace-nowrap px-2 w-[10%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Country 5
                  </th>
                  <th className=" whitespace-nowrap px-2 w-[10%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Tax Category 5
                  </th>
                  <th className=" whitespace-nowrap px-2 w-[10%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Tax Class 5
                  </th>
                  <th className=" whitespace-nowrap px-2 w-[10%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Country 6
                  </th>
                  <th className=" whitespace-nowrap px-2 w-[10%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Tax Category 6
                  </th>
                  <th className=" whitespace-nowrap px-2 w-[10%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Tax Class 6
                  </th>

                  <th className=" whitespace-nowrap px-2 w-[10%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Partner Function 5
                  </th>
                  <th className=" whitespace-nowrap px-2 w-[10%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    PF Code 5
                  </th>
                  <th className=" whitespace-nowrap px-2 w-[10%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Partner Function 6
                  </th>
                  <th className=" whitespace-nowrap px-2 w-[10%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    PF Code 6
                  </th>
                  <th className=" whitespace-nowrap px-2 w-[10%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Partner Function 7
                  </th>
                  <th className=" whitespace-nowrap px-2 w-[10%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    PF Code 7
                  </th>
                  <th className=" whitespace-nowrap px-2 w-[10%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Partner Function 8
                  </th>
                  <th className=" whitespace-nowrap px-2 w-[10%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    PF Code 8
                  </th>
                  <th className=" whitespace-nowrap px-2 w-[10%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Partner Function 9
                  </th>
                  <th className=" whitespace-nowrap px-2 w-[10%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    PF Code 9
                  </th>
                  <th className=" whitespace-nowrap px-2 w-[10%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Balance Sheet
                  </th>
                  <th className=" whitespace-nowrap px-2 w-[10%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Bank Period F
                  </th>
                  <th className=" whitespace-nowrap px-2 w-[10%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Bank Period T
                  </th>
                  <th className=" whitespace-nowrap px-2 w-[10%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Dep Value (Lac)
                  </th>
                  <th className=" whitespace-nowrap px-2 w-[10%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Dep Value 30%
                  </th>
                  <th className=" whitespace-nowrap px-2 w-[10%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Valid Date From
                  </th>
                  <th className=" whitespace-nowrap px-2 w-[10%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Valid Date To
                  </th>
                  <th className=" whitespace-nowrap px-2 w-[10%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Segment Code
                  </th>
                  <th className=" whitespace-nowrap px-2 w-[10%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Unit Code
                  </th>
                  <th className=" whitespace-nowrap px-2 w-[10%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Zone Code
                  </th>
                  <th className=" whitespace-nowrap px-2 w-[10%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Region Code
                  </th>
                  <th className=" whitespace-nowrap px-2 w-[10%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Territory Code
                  </th>

                  <th className=" whitespace-nowrap px-2 w-[10%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Territory Person
                  </th>
                  <th className=" whitespace-nowrap px-2 w-[10%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Territory Designation
                  </th>
                  <th className=" whitespace-nowrap px-2 w-[10%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Territory Date of Approval
                  </th>
                  <th className=" whitespace-nowrap px-2 w-[10%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Territory Status
                  </th>

                  <th className=" whitespace-nowrap px-2 w-[10%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Regional Manager
                  </th>
                  <th className=" whitespace-nowrap px-2 w-[10%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Regional Designation
                  </th>
                  <th className=" whitespace-nowrap px-2 w-[10%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Regional Approval Date
                  </th>
                  <th className=" whitespace-nowrap px-2 w-[10%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Regional Visited
                  </th>
                  <th className=" whitespace-nowrap px-2 w-[10%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Regional All Documents
                  </th>
                  <th className=" whitespace-nowrap px-2 w-[10%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Regional Status
                  </th>
                  <th className=" whitespace-nowrap px-2 w-[10%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Zonal Manager
                  </th>
                  <th className=" whitespace-nowrap px-2 w-[10%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Zonal Designation
                  </th>
                  <th className=" whitespace-nowrap px-2 w-[10%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Zonal Approval Date
                  </th>
                  <th className=" whitespace-nowrap px-2 w-[10%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Zonal Visited
                  </th>
                  <th className=" whitespace-nowrap px-2 w-[10%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Zonal Documents
                  </th>
                  <th className="px-6 w-[10%] whitespace-nowrap py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Zone Status
                  </th>
                  <th className=" whitespace-nowrap px-2 w-[10%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Zone A/c Manager
                  </th>
                  <th className=" whitespace-nowrap px-2 w-[10%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Zone A/c Designation
                  </th>
                  <th className=" whitespace-nowrap px-2 w-[10%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Zone A/c Date Approval
                  </th>
                  <th className=" whitespace-nowrap px-2 w-[10%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Zone A/c Status
                  </th>
                  <th className=" whitespace-nowrap px-2 w-[10%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Zone A/c All Info Checked
                  </th>
                  <th className=" whitespace-nowrap px-2 w-[10%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Zone A/c Security Deposit
                  </th>
                  <th className=" whitespace-nowrap px-2 w-[10%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Zone A/c Blank Cheque
                  </th>
                  <th className=" whitespace-nowrap px-2 w-[10%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Zone A/c Letter Head
                  </th>
                  <th className="px-6 w-[10%] whitespace-nowrap py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Business Unit Head
                  </th>
                  <th className="px-6 w-[10%] whitespace-nowrap py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Business Unit Designation
                  </th>
                  <th className="px-6 w-[10%] whitespace-nowrap py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Business Unit Approval
                  </th>
                  <th className="px-6 w-[10%] whitespace-nowrap py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Business Unit Status
                  </th>
                  <th className="px-6 w-[10%] whitespace-nowrap  py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Status
                  </th>
                  <th className="px-6 w-[10%] whitespace-nowrap  py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Document Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 text-xs">
                {dealerData?.map((item) => (
                  <tr key={item.id}>
                    <td className="px-6 py-2 dark:border-2 whitespace-nowrap font-arial ">
                      <button
                        onClick={() => {
                          router.push({
                            pathname: "/dealerform_details",
                            query: { type: "view", id: item?.d_id }
                          });
                        }}
                        className="b text-black   hover:text-blue-500  "
                      >
                        View
                      </button>

                      {/* Edit Options Outer Grid  */}

                      {/* {item.app_status == "Approved By Region" ||
                      item.app_status == "Approved By Zonal" ||
                      item.app_status == "Approved By Business Unit" ||
                      item.app_status == "Approved By Zonal A/c Manager" ||
                      item.app_status == "Submitted By Territory" ? null : (
                        <button
                          onClick={() => {
                            router.push({
                              pathname: "/dealerform_details",
                              query: { type: "Edit", id: item?.d_id }
                            });
                          }}
                          className="b text-black hover:text-yellow-400 ml-2"
                        >
                          Edit
                        </button>
                      )} */}

                      {(() => {
                        if (role_id == 1) {
                          switch (item.app_status) {
                            case "Approved By Business Unit":
                            case "Generate Application":
                            case "Update Basic":
                            case "Update Personal":
                            case "Update Additional":
                            case "Update Business":
                            case "Update Security":
                            case "Update Agreement":
                            case "Update Assessment":
                            case "Submitted By Territory":
                            case "Approved By Zonal A/c Manager":
                            case "Approved By Zonal":
                              return (
                                <button
                                  onClick={() => {
                                    router.push({
                                      pathname: "/dealerform_details",
                                      query: { type: "Edit", id: item?.d_id }
                                    });
                                  }}
                                  className="text-black hover:text-red-500 ml-2"
                                >
                                  Edit
                                </button>
                              );
                            default:
                              return null;
                          }
                        } else if (role_id == 6) {
                          switch (item.app_status) {
                            case "Generate Application":
                            case "Update Basic":
                            case "Update Personal":
                            case "Update Additional":
                            case "Update Business":
                            case "Update Security":
                            case "Update Agreement":
                              return (
                                <button
                                  onClick={() => {
                                    router.push({
                                      pathname: "/dealerform_details",
                                      query: { type: "Edit", id: item?.d_id }
                                    });
                                  }}
                                  className="text-black hover:text-red-500 ml-2"
                                >
                                  Edit
                                </button>
                              );
                            default:
                              return null;
                          }
                        } else if (role_id == 5) {
                          switch (item.app_status) {
                            case "Update Assessment":
                              return (
                                <button
                                  onClick={() => {
                                    let query = {
                                      type: "EditAp",
                                      role: role_id,
                                      id: item?.d_id,
                                      formType: "Assessment"
                                    };
                                    router.push({
                                      pathname: "/dealerform_details",
                                      query: query
                                    });
                                  }}
                                  className="text-black hover:text-red-500 ml-2"
                                >
                                  Edit
                                </button>
                              );
                            default:
                              return null;
                          }
                        } else if (role_id == 12) {
                          switch (item.app_status) {
                            case "Update SAP Info":
                              return (
                                <button
                                  onClick={() => {
                                    let query = {
                                      type: "EditAp",
                                      role: role_id,
                                      id: item?.d_id,
                                      formType: "SAP Info"
                                    };
                                    router.push({
                                      pathname: "/dealerform_details",
                                      query: query
                                    });
                                  }}
                                  className="text-black hover:text-red-500 ml-2"
                                >
                                  Edit
                                </button>
                              );
                            default:
                              return null;
                          }
                        }
                      })()}

                      {/* Delete Options For Outer Grid  */}

                      {/* {item.app_status !== "Approved By Region" ||
                      item.app_status !== "Approved By Zonal" ||
                      item.app_status !== "Approved By Business Unit" ||
                      item.app_status == "Submitted By Territory" ||
                      item.app_status !== "Approved By Zonal A/c Manager" ? null : (
                        <button
                          disabled={delDisable}
                          onClick={() => {
                            deleteHandler(item?.d_id);
                          }}
                          className="b text-black hover:text-red-500 ml-2"
                        >
                          Delete
                        </button>
                      )} */}

                      {(() => {
                        switch (item.app_status) {
                          case "Generate Application":
                          case "Update Basic":
                          case "Update Personal":
                          case "Update Additional":
                          case "Update Business":
                          case "Update Security":
                          case "Update Agreement":
                            if (role_id == 6 || 1) {
                              return (
                                <button
                                  disabled={delDisable}
                                  onClick={() => {
                                    deleteHandler(item?.d_id);
                                  }}
                                  className="text-black hover:text-red-500 ml-2"
                                >
                                  Delete
                                </button>
                              );
                            } else {
                              return null;
                            }
                          case "Update Security":
                          case "Update Agreement":
                          case "Update Assessment":
                          case "Approved By Business Unit":
                          case "Submitted By Territory":
                          case "Approved By Region":
                          case "Approved By Zonal":
                          case "Approved By Zonal A/c Manager":
                          case "Generate Application":
                            if (role_id == 1) {
                              return (
                                <button
                                  disabled={delDisable}
                                  onClick={() => {
                                    deleteHandler(item?.d_id);
                                  }}
                                  className="text-black hover:text-red-500 ml-2"
                                >
                                  Delete
                                </button>
                              );
                            } else {
                              return null;
                            }
                          default:
                            return null;
                        }
                      })()}

                      {/* Approve Options For Outer Grid  */}

                      {/* {(() => {
                        switch (item.app_status ) {
                          case "Submitted By Territory":
                            return (
                              <button
                                onClick={() => {
                                  let query = {
                                    type: "EditAp",
                                    role: role_id,
                                    id: item?.d_id,
                                    formType: "SAP Info"
                                  };
                                  switch (role_id) {
                                    case 12:
                                      query.formType = "SAP Info";
                                      break;
                                    case 5:
                                      query.formType = "Assessment";
                                      break;
                                    case 4:
                                      query.formType = "Approval";
                                      break;
                                    default:
                                      query.formType = "";
                                      break;
                                  }
                                  router.push({
                                    pathname: "/dealerform_details",
                                    query: query
                                  });
                                }}
                                className="b text-black hover:text-red-500 ml-2"
                              >
                                Approve
                              </button>
                            );
                          default:
                            return null;
                        }
                      })()} */}

                      {(() => {
                        switch (item.app_status) {
                          // case "Submitted By Territory":
                          // case "Approved By Zonal A/c Manager":
                          case "Approved By Zonal":
                            if (role_id === 12) {
                              return (
                                <button
                                  onClick={() => {
                                    let query = {
                                      type: "EditAp",
                                      role: role_id,
                                      id: item?.d_id,
                                      formType: "SAP Info"
                                    };
                                    router.push({
                                      pathname: "/dealerform_details",
                                      query: query
                                    });
                                  }}
                                  className="b text-black hover:text-red-500 ml-2"
                                >
                                  Approve
                                </button>
                              );
                            } else {
                              return null;
                            }
                          // case "Approved By Zonal A/c Manager":
                          case "Submitted By Territory":
                            if (role_id === 5) {
                              return (
                                <button
                                  onClick={() => {
                                    let query = {
                                      type: "EditAp",
                                      role: role_id,
                                      id: item?.d_id,
                                      formType: "Assessment"
                                    };
                                    router.push({
                                      pathname: "/dealerform_details",
                                      query: query
                                    });
                                  }}
                                  className="b text-black hover:text-red-500 ml-2"
                                >
                                  Approve
                                </button>
                              );
                            } else {
                              return null;
                            }
                          case "Approved By Region":
                            if (role_id === 4) {
                              return (
                                <button
                                  onClick={() => {
                                    let query = {
                                      type: "EditAp",
                                      role: role_id,
                                      id: item?.d_id,
                                      formType: "Approval"
                                    };
                                    router.push({
                                      pathname: "/dealerform_details",
                                      query: query
                                    });
                                  }}
                                  className="b text-black hover:text-red-500 ml-2"
                                >
                                  Approve
                                </button>
                              );
                            } else {
                              return null;
                            }
                          case "Approved By Zonal A/c Manager":
                            if (role_id === 3) {
                              return (
                                <button
                                  onClick={() => {
                                    let query = {
                                      type: "EditAp",
                                      role: role_id,
                                      id: item?.d_id,
                                      formType: "Approval"
                                    };
                                    router.push({
                                      pathname: "/dealerform_details",
                                      query: query
                                    });
                                  }}
                                  className="b text-black hover:text-red-500 ml-2"
                                >
                                  Approve
                                </button>
                              );
                            } else {
                              return null;
                            }
                          default:
                            return null;
                        }
                      })()}

                      {/* {role_id == 12 ? (
                        <button
                          onClick={() => {
                            let query = {
                              type: "EditAp",
                              role: role_id,
                              id: item?.d_id,
                              formType: "SAP Info"
                            };
                            switch (role_id) {
                              case 12:
                                query.formType = "SAP Info";
                                break;
                              case 5:
                                query.formType = "Assessment";
                                break;
                              case 4:
                                query.formType = "Approval";
                                break;
                              default:
                                query.formType = "";
                                break;
                            }
                            router.push({
                              pathname: "/dealerform_details",
                              query: query
                            });
                          }}
                          className="b text-black hover:text-red-500 ml-2"
                        >
                          Approve
                        </button>
                      ) : null} */}
                    </td>
                    <td className="px-6 py-2 dark:border-2 whitespace-nowrap">{item.appl_no}</td>
                    <td className="px-6 py-2 dark:border-2 whitespace-nowrap">
                      {moment(item.app_date).format("DD/MM/Y")}
                    </td>
                    <td className="px-6 py-2 dark:border-2 whitespace-nowrap">{item.app_status}</td>
                    <td className="px-6 py-2 dark:border-2 whitespace-nowrap">{item.party_Name}</td>
                    <td className="px-6 py-2 dark:border-2 whitespace-nowrap">{item.address}</td>
                    <td className="px-6 py-2 dark:border-2 whitespace-nowrap">{item.postal_Address}</td>
                    <td className="px-6 py-2 dark:border-2 whitespace-nowrap">{item.city}</td>
                    <td className="px-6 py-2 dark:border-2 whitespace-nowrap">{item.state}</td>
                    <td className="px-6 py-2 dark:border-2 whitespace-nowrap">{item.country}</td>
                    <td className="px-6 py-2 dark:border-2 whitespace-nowrap">{item.pincode}</td>
                    <td className="px-6 py-2 dark:border-2 whitespace-nowrap">{item.contact_person}</td>
                    <td className="px-6 py-2 dark:border-2 whitespace-nowrap">{item.dealer_type}</td>
                    <td className="px-6 py-2 dark:border-2 whitespace-nowrap">{item.pmobile}</td>
                    <td className="px-6 py-2 dark:border-2 whitespace-nowrap">{item.smobile}</td>
                    <td className="px-6 py-2 dark:border-2 whitespace-nowrap">{item.pemail}</td>
                    <td className="px-6 py-2 dark:border-2 whitespace-nowrap">{item.gstemail}</td>
                    <td className="px-6 py-2 dark:border-2 whitespace-nowrap">{item.district}</td>
                    <td className="px-6 py-2 dark:border-2 whitespace-nowrap">{item.territory_name}</td>
                    <td className="px-6 py-2 dark:border-2 whitespace-nowrap">{item.region_name}</td>
                    <td className="px-6 py-2 dark:border-2 whitespace-nowrap">{item.zone_name}</td>
                    <td className="px-6 py-2 dark:border-2 whitespace-nowrap">{item.business_unit_name}</td>
                    <td className="px-6 py-2 dark:border-2 whitespace-nowrap">{item.business_segment}</td>
                    <td className="px-6 py-2 dark:border-2 whitespace-nowrap">{item.company_name}</td>
                    <td className="px-6 py-2 dark:border-2 whitespace-nowrap">{item.t_hod_name}</td>
                    <td className="px-6 py-2 dark:border-2 whitespace-nowrap">{item.r_hod_name}</td>
                    <td className="px-6 py-2 dark:border-2 whitespace-nowrap">{item.z_hod_name}</td>
                    <td className="px-6 py-2 dark:border-2 whitespace-nowrap">{item.bu_hod_name}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.year_est}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.nature_firm}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.no_part}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.pan}</td>
                    <td className="px-3 py-2 dark:border-2 whitespace-nowrap">{item.gst}</td>
                    <td className="px-6 py-2 dark:border-2 whitespace-nowrap">
                      {item.d_type == "not_registered" ? "Not Registered" : "Registered"}
                    </td>
                    <td className="px-3 py-2 dark:border-2 whitespace-nowrap">
                      {item.gst_v == true ? "Verified" : "Not Verified"}
                    </td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.plicense}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                      {item.pvalidto ? moment(item.pvalidto).format("DD/MM/Y") : ""}
                    </td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.flicense}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                      {item.fvalidto ? moment(item.fvalidto).format("DD/MM/Y") : ""}
                    </td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.shop_establish}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                      {item.shop_status ? "Owned" : "Rented"}
                    </td>
                    <td className="px-6 py-2 dark:border-2 whitespace-nowrap">{item?.cheque_one}</td>
                    <td className="px-6 py-2 dark:border-2 whitespace-nowrap">
                      {item.cheque_dateOne ? moment(item.cheque_dateOne).format("DD/MM/Y") : ""}
                    </td>
                    <td className="px-6 py-2 dark:border-2 whitespace-nowrap">{item?.bank_nameOne}</td>
                    <td className="px-6 py-2 dark:border-2 whitespace-nowrap">{item?.ac_no_one}</td>
                    <td className="px-6 py-2 dark:border-2 whitespace-nowrap">{item?.amount_one}</td>
                    <td className="px-6 py-2 dark:border-2 whitespace-nowrap">{item?.cheque_two}</td>
                    <td className="px-6 py-2 dark:border-2 whitespace-nowrap">
                      {item.cheque_dateTwo ? moment(item.cheque_dateTwo).format("DD/MM/Y") : ""}
                    </td>
                    <td className="px-6 py-2 dark:border-2 whitespace-nowrap">{item?.bank_nameTwo}</td>
                    <td className="px-6 py-2 dark:border-2 whitespace-nowrap">{item?.ac_no_two}</td>
                    <td className="px-6 py-2 dark:border-2 whitespace-nowrap">{item?.amount_two}</td>
                    <td className="px-6 py-2 dark:border-2 whitespace-nowrap">{item?.cheque_three}</td>
                    <td className="px-6 py-2 dark:border-2 whitespace-nowrap">
                      {item.cheque_dateThree ? moment(item.cheque_dateThree).format("DD/MM/Y") : ""}
                    </td>
                    <td className="px-6 py-2 dark:border-2 whitespace-nowrap">{item?.bank_nameThree}</td>
                    <td className="px-6 py-2 dark:border-2 whitespace-nowrap">{item?.ac_no_three}</td>
                    <td className="px-6 py-2 dark:border-2 whitespace-nowrap">{item?.amount_three}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.amt_deposit}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.amt_paidby}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.rec_utrno}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.general}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.prop_rel}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.goodwill}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.financial}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.family_back}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.demrit_dist}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                      {item.accept_the_policy ? "Accepted" : ""}
                    </td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.SAP_Company}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.SAP_SalesOrg}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.SAP_Dchannel}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.SAP_Division}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.SAP_ShippingCond}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.SAP_incoterms}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                      {item.SAP_incoterms_location}
                    </td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.SAP_Payterm}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.SAP_CPriceProcure}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.SAP_Acgroup}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.SAP_AcAssiggroup}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.SAP_RecoAccount}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.SAP_AccountingGroup}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.SAP_Currency}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.SAP_search_terms}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.SAP_customerSAPNo}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.SAP_customer_status}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.business_partner_no}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.name}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.name2}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.grouping}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.location}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.extern_no}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.destination}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.delv_plant}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.country1}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.tax_category1}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.tax_class1}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.country2}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.tax_category2}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.tax_class2}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.country3}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.tax_category3}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.tax_class3}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.country4}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.tax_category4}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.tax_class4}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.country5}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.tax_category5}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.tax_class5}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.country6}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.tax_category6}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.tax_class6}</td>

                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.partner_function5}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.pf_code5}</td>

                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.partner_function6}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.pf_code6}</td>

                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.partner_function7}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.pf_code7}</td>

                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.partner_function8}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.pf_code8}</td>

                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.partner_function9}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.pf_code9}</td>

                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.balance_sheet}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.bank_period_f}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.bank_period_t}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.dep_value_lac}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.dep_value_30_perc}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.valid_date_from}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.valid_date_to}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.segment_code}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.unit_code}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.zone_code}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.region_code}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.territory_code}</td>

                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.t_user_Person}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.t_id_desig}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                      {item.t_app_date ? moment(item.t_app_date).format("DD/MM/Y") : ""}

                      {/* {moment(item.t_app_date).format("Do MMM YY")
                        ? moment(item.t_app_date).format("Do MMM YY")
                        : ""} */}
                    </td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.t_id_status}</td>

                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.r_user_Person}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.r_id_desig}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                      {item.r_app_date ? moment(item.r_app_date).format("DD/MM/Y") : ""}

                      {/* {moment(item.r_app_date).format("Do MMM YY")
                        ? moment(item.r_app_date).format("Do MMM YY")
                        : ""} */}
                    </td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                      {item.r_visited ? "Visited" : "Not Visited"}
                    </td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                      {item.r_docuv ? "Verified" : "Not Verified"}
                    </td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.r_id_status}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.z_user_Person}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.z_id_desig}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                      {item.z_app_date ? moment(item.z_app_date).format("DD/MM/Y") : ""}
                    </td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                      {item.z_visited ? "Visited" : "Not Visited"}
                    </td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                      {item.z_docuv ? "Verified" : "Not Verified"}
                    </td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.z_id_status}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.zac_user_Person}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.zac_id_desig}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                      {item.zac_app_date ? moment(item.zac_app_date).format("DD/MM/Y") : ""}

                      {/* {moment(item.zac_app_date).format("Do MMM YY")
                        ? moment(item.zac_app_date).format("Do MMM YY")
                        : ""} */}
                    </td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.zac_id_status}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                      {item.zac_isinfo ? "Checked" : "Not Checked"}
                    </td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                      {item.zac_isseqdpt ? "Checked" : "Not Checked"}
                    </td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                      {item.zac_blankchq ? "Checked" : "Not Checked"}
                    </td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                      {item.zac_lthead ? "Checked" : "Not Checked"}
                    </td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.bu_user_Person}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.bu_id_desig}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                      {item.bu_app_date ? moment(item.bu_app_date).format("DD/MM/Y") : ""}
                    </td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.bu_id_status}</td>

                    <td className="px-6 py-2 dark:border-2 whitespace-nowrap">
                      {item.isDeleted ? "Disabled" : "Enabled"}
                    </td>
                    <td className="px-6 py-2 dark:border-2 whitespace-nowrap">
                      {item.has_docs ? "Attached" : "Not Attached"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {searchFilter !== "party_Name" &&
        searchFilter !== "SAP_customerSAPNo" &&
        searchFilter !== "all" &&
        searchFilter !== "gst" &&
        searchFilter !== "app_status" &&
        searchFilter !== "tm_status" &&
        searchFilter !== "rm_status" &&
        searchFilter !== "zm_status" ? (
          <div className="w-full flex flex-row justify-between mx-auto px-2  pb-4 bg-white ">
            <div className="flex flex-row gap-1 px-2 py-1 mt-4 border border-black rounded-md text-slate-400">
              Showing{" "}
              <small className="font-bold px-2 self-center text-black">
                {dealerData?.length > 0 ? currentPage?.selected * 50 + 1 : 0}
              </small>{" "}
              to{" "}
              <small className="font-bold px-2 self-center text-black">
                {currentPage?.selected * 50 + dealerData?.length}
              </small>{" "}
              of <small className="font-bold px-2 self-center text-black">{pageTotal}</small> results
            </div>
            <ReactPaginate
              previousLabel={"Previous"}
              nextLabel={"Next"}
              breakLabel={"..."}
              pageCount={pageCount}
              onPageChange={handlePageChange}
              containerClassName={"pagination"}
              activeClassName={"active"}
              className="flex flex-row gap-2 px-2 py-1 mt-4 border border-black rounded-md"
            />
          </div>
        ) : (
          <>
            <div></div>
          </>
        )}
      </div>

      <Transition appear show={isGenOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10   " onClose={() => handleCloseModal()}>
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

          <div className="fixed inset-0 overflow-y-auto mt-2 ">
            <div className="flex h-full items-center justify-center p-4 text-center  ">
              <Toaster position="bottom-center" reverseOrder={false} />
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <div className="relative  z-20 flex items-center justify-center ">
                  <div className="absolute z-40 flex  -top-6 ">
                    <img className="  h-[3.1rem] w-[3.1rem] rounded-full" src={ImageLink} alt="img" />
                  </div>
                  <Dialog.Panel className="relative max-h-full overflow-hidden  font-arial  max-w-2xl transform  rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <div>
                      <h2 className="text-sm  text-gray-500 ">
                        Its incredible to have a young, fresh and talented new member join our team. By
                        working together, we can take the company a great heights, Welcome Aboard!
                      </h2>
                    </div>

                    <hr className="mt-1 mb-1" />
                    <div className="flex flex-col justify-center">
                      <h4 className="text-center text-gray-500">Welcome! </h4>
                      <h3 className="text-center text-gray-500 text-lg">
                        {/* {dealerDetails.firstName} {dealerDetails.midName}{" "}
                        {dealerDetails.lastName} */}
                      </h3>
                    </div>
                    {!empIdState && (
                      <div className="flex justify-center py-2">
                        <Image
                          className="max-w-full "
                          height={20}
                          src={DealerOn}
                          alt="Picture of the author"
                        />
                      </div>
                    )}

                    <div className="flex flex-col gap-1 py-2">
                      <div className="flex w-full flex-row gap-2 justify-between px-2">
                        <label
                          className="block text-gray-700 text-sm py-1.5 font-bold justify-self-center"
                          htmlFor="inputField"
                        >
                          Dealer Type
                        </label>
                        <select
                          className="w-[65%] px-3 py-2 border rounded-lg border-gray-300  bg-white focus:outline-none focus:border-b focus:border-indigo-500"
                          id="stateSelect"
                          value={dealerDetails?.d_type}
                          onChange={(e) => {
                            setdealerDetails({
                              ...dealerDetails,
                              d_type: e.target.value
                            });
                          }}
                        >
                          <option value="" className="focus:outline-none focus:border-b bg-white ">
                            --select--
                          </option>
                          <option value="registered">Registered</option>
                          <option value="not_registered">Not Registered</option>
                        </select>
                      </div>

                      {dealerDetails.d_type === "registered" ? (
                        <div className="relative flex flex-row gap-2 justify-between px-2">
                          <label
                            className="block text-gray-700 text-sm py-1.5 font-bold justify-self-center"
                            htmlFor="inputField"
                          >
                            GST No.
                          </label>
                          <div className="relative w-[65%]">
                            <input
                              className="text-black w-full px-3 py-1.5 text-sm border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                              type="text"
                              id="small-input"
                              placeholder="GST No."
                              value={dealerDetails.gst}
                              disabled={empIdState}
                              onChange={(e) => {
                                if (e.target.value.length > 15) {
                                  return;
                                }
                                setdealerDetails({
                                  ...dealerDetails,
                                  gst: e.target.value.toUpperCase()
                                });
                              }}
                            />
                            {!isGstVerify || dealerDetails.gst.length < 15 ? (
                              <div
                                onClick={handleVerifyGST}
                                className="absolute right-0 top-0 bottom-0 flex items-center px-2 cursor-pointer text-blue-500"
                              >
                                Verify
                              </div>
                            ) : (
                              <FcApproval
                                className="absolute right-0 top-0 bottom-0 flex items-center px-2"
                                size={36}
                              />
                            )}
                          </div>
                        </div>
                      ) : null}

                      <div className="flex flex-row gap-2 justify-between px-2">
                        <label
                          className="block whitespace-nowrap text-gray-700 py-1.5 text-sm font-bold justify-self-center"
                          htmlFor="inputField"
                        >
                          Party Name
                        </label>
                        <input
                          className="text-black w-[65%] px-3 py-1.5 text-sm  border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                          type="text"
                          id="small-input"
                          placeholder="Party Name"
                          value={dealerDetails.party_Name}
                          disabled={empIdState}
                          onChange={(e) => {
                            const inputValue = e.target.value;
                            const re = /^[A-Za-z\s]*$/;
                            if (re.test(inputValue) || inputValue === "") {
                              setdealerDetails({
                                ...dealerDetails,
                                party_Name: inputValue
                              });
                            }
                          }}
                        />
                      </div>

                      <div className="flex flex-row gap-2 justify-between px-2">
                        <label
                          className="block text-gray-700 text-sm py-1.5 font-bold justify-self-center"
                          htmlFor="inputField"
                        >
                          Mobile No
                        </label>
                        <input
                          className="text-black w-[65%] px-3 py-1.5 text-sm  border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                          type="number"
                          id="small-input"
                          placeholder="Mobile No"
                          value={dealerDetails.pmobile}
                          disabled={empIdState}
                          maxLength={10}
                          minLength={10}
                          onChange={(e) => {
                            if (e.target.value.length > 10) {
                              return;
                            }
                            setdealerDetails({
                              ...dealerDetails,
                              pmobile: e.target.value
                            });
                          }}
                        />
                      </div>

                      <div className="flex flex-row gap-2 justify-between px-2">
                        <label
                          className="block text-gray-700 text-sm py-1.5 font-bold justify-self-center"
                          htmlFor="inputField"
                        >
                          Email
                        </label>
                        <input
                          className="text-black w-[65%] px-3 py-1.5 text-sm  border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                          type="email"
                          id="small-input"
                          placeholder="Email"
                          value={dealerDetails.pemail}
                          disabled={empIdState}
                          onChange={(e) => {
                            setdealerDetails({
                              ...dealerDetails,
                              pemail: e.target.value
                            });
                          }}
                        />
                      </div>

                      {role_id !== 6 ? (
                        <div className="flex w-full flex-row gap-2 justify-between px-2">
                          <label
                            className="block text-gray-700 text-sm py-1.5 font-bold justify-self-center"
                            htmlFor="inputField"
                          >
                            Territory List
                          </label>
                          <select
                            className="w-[65%] px-3 py-2 border rounded-lg border-gray-300  bg-white focus:outline-none focus:border-b focus:border-indigo-500"
                            id="stateSelect"
                            value={dealerDetails?.t_id}
                            onChange={(e) => {
                              setdealerDetails({
                                ...dealerDetails,
                                t_id: e.target.value
                              });
                            }}
                          >
                            <option value="" className="focus:outline-none focus:border-b bg-white ">
                              --select--
                            </option>
                            {filterTerri.map((item) => (
                              <option value={item.t_id}>{item.territory_name}</option>
                            ))}
                          </select>
                        </div>
                      ) : (
                        ""
                      )}

                      <div className="flex w-full flex-row gap-2 justify-between px-2">
                        <label
                          className="block text-gray-700 text-sm py-1.5 font-bold justify-self-center"
                          htmlFor="inputField"
                        >
                          Nature of Firm
                        </label>
                        <select
                          className="w-[65%] px-3 py-2 border rounded-lg border-gray-300  bg-white focus:outline-none focus:border-b focus:border-indigo-500"
                          id="stateSelect"
                          value={dealerDetails?.nature_firm}
                          onChange={(e) => {
                            setdealerDetails({
                              ...dealerDetails,
                              nature_firm: e.target.value
                            });
                          }}
                        >
                          <option value="" className="focus:outline-none focus:border-b bg-white ">
                            --select nature firm--
                          </option>
                          <option value="Residential Individual">Residential Individual</option>
                          <option value="Domestic Company">Domestic Company</option>
                          <option value="Proprietary Concern">Proprietary Concern</option>
                          <option value="Partnership Firm">Partnership Firm</option>
                        </select>
                      </div>

                      {empIdState && (
                        <div className="flex flex-row gap-2 justify-between px-2">
                          <label
                            className="block text-gray-700 text-sm font-bold justify-self-center"
                            htmlFor="inputField"
                          >
                            Application No.
                          </label>

                          <input
                            className="text-black w-[65%] px-3 py-1 text-sm  border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                            type="text"
                            id="small-input"
                            placeholder="Position"
                            value={dealerDetails.appl_no}
                            disabled={empIdState}
                            onChange={(e) =>
                              setdealerDetails({
                                ...dealerDetails,
                                appl_no: e.target.value
                              })
                            }
                          />
                        </div>
                      )}
                      {empIdState && (
                        <div className="flex flex-col items-center gap-1 w-full mt-3">
                          <BiCheckCircle className="text-green-500 text-4xl" />

                          <p className="text-lg font-bold">Thankyou for filling out the form</p>
                          <small className="text-center">
                            Please don'nt forget your dealer application refrence number to your fill the form
                            <br />
                            For any furthur inquery please, contact{" "}
                            <a href="mailto: hr@willowood.com" className="underline">
                              hr@willowood.com
                            </a>
                          </small>
                        </div>
                      )}
                      {empIdState ? (
                        <div className="flex justify-center mt-2">
                          <div
                            className="text-center w-40   bg-green-700 px-4 py-1 text-white  cursor-pointer"
                            onClick={() => handleCloseModal(role_id)}
                          >
                            Close
                          </div>
                        </div>
                      ) : (
                        <div className="flex justify-center  my-4 rounded-sm w-full">
                          <button
                            type="button"
                            className="text-white rounded-md mx-2  my- bg-green-500 w-20"
                            onClick={() => {
                              toCheckGST() ? toast.error("Verify the GST First") : handleGenerateDealer();
                            }}
                            // onClick={handleGenerateDealer}
                            disabled={generateLoading}
                          >
                            Generate
                          </button>

                          <button
                            type="button"
                            className="
                          text-white rounded-md mx-2 py-1 bg-orange-500 w-20
                          "
                            onClick={() => handleCloseModal()}
                          >
                            Cancel
                          </button>
                        </div>
                      )}
                    </div>
                  </Dialog.Panel>
                </div>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
    // </Layout>
  );
};

export default Dealer;
