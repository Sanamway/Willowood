import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import axios from "axios";
import { url } from "@/constants/url";
import { useRouter } from "next/router";
import toast, { Toaster } from "react-hot-toast";
import { businessUnit } from "../ChartReports/sample";

const Approval = (props) => {
  const router = useRouter();
  const [formActive, setFormActive] = useState(false);
  const [localInfo, setLocalInfo] = useState("");

  const [terriForm, setTerriInfo] = useState({
    t_id: "",
    t_user_person: "",
    t_user_id: "",
    t_id_desig: "",
    t_app_date: "",
    app_status: "",
    t_id_status: "Submitted By TM"
  });

  const [zoneAcForm, setZoneAcInfo] = useState({
    z_id: "",
    zac_person: "",
    zac_user_id: "",
    zac_id_desig: "",
    zac_app_date: "",
    zac_isinfo: "",
    zac_isseqdpt: "",
    zac_blankchq: "",
    zac_lthead: "",
    zac_bs_value: "",
    zac_bs_period_to: "",
    zac_bs_period_from: ""
    // zac_id_status: ""
  });

  const [regionForm, setRegionForm] = useState({
    r_id: "",
    r_person: "",
    r_user_id: "",
    r_id_desig: "",
    r_app_date: "",
    r_visited: "",
    r_docuv: ""
    // r_id_status: "",
  });

  const [zonalMGForm, setZonalMGForm] = useState({
    z_id: "",
    z_user_person: "",
    z_user_id: "",
    z_id_desig: "",
    z_app_date: "",
    z_visited: "",
    z_docuv: ""
    // r_id_status: "",
  });

  const [bunitHead, setBunitHead] = useState({
    bu_id: "",
    bu_user_person: "",
    bu_user_id: "",
    bu_id_desig: "",
    bu_app_date: ""
    // bu_id_status: "",
  });

  const headers = {
    "Content-Type": "application/json",
    secret: "fsdhfgsfuiweifiowefjewcewcebjw"
  };

  const [loggedUser, setLoggedUser] = useState(null);
  const [roleId, setRoleId] = useState(null);
  const [role_Id, setRole_Id] = useState(null);
  const [terriview, setTerriView] = useState(null);
  const [zoneAcView, setZoneAcView] = useState(null);
  const [zoneMGView, setZoneMgView] = useState(null);
  const [regionView, setRegionView] = useState(null);
  const [unitHeadView, setUnitHeadView] = useState(null);
  const [editTerriFrom, setEditTerriForm] = useState(null);
  const [editZoneAcFrom, setEditZoneAcForm] = useState(null);
  const [editRegionFrom, setEditRegionForm] = useState(null);
  const [editZonalMgFrom, setEditZonalMgForm] = useState(null);
  const [editUnitHeadFrom, setEditUnitHeadForm] = useState(null);
  const [terriSubBtn, setSubBtn] = useState(null);
  const [approveZAbtn, setapproveZAbtn] = useState(null);
  const [approveRegionbtn, setapproveRegionbtn] = useState(null);
  const [checkBoxStatus, setCheckBoxStatus] = useState(null);
  const [checkBoxRegionStatus, setCheckBoxRegionStatus] = useState(null);
  const [checkBoxZonalMan, setCheckBoxZonalMan] = useState(null);
  const [appZonalManBtn, setAppZonalManBtn] = useState(null);
  const [appBusiBtn, setAppBusiBtn] = useState(null);

  const [regionNumber, setRegionNumber] = useState(null);
  const [regionName, setRegionName] = useState(null);

  useEffect(() => {
    if (window.localStorage) {
      const uid = localStorage.getItem("uid");
      const userName = localStorage.getItem("user_name");
      const userinfo = localStorage.getItem("userinfo");

      setLocalInfo(JSON.parse(userinfo));

      if (role_Id == 6) {
        setTerriInfo({
          ...terriForm,
          t_id: JSON?.parse(userinfo)?.t_id,
          t_user_person: userName,
          t_user_id: JSON?.parse(userinfo)?.user_id,
          t_id_desig: JSON?.parse(userinfo)?.U_profile_name,
          t_app_date: props?.data[0]?.t_app_date
        });
      }

      if (role_Id == 12) {
        setZoneAcInfo({
          ...zoneAcForm,
          z_id: JSON?.parse(userinfo)?.z_id,
          zac_person: userName,
          zac_user_id: JSON?.parse(userinfo)?.user_id,
          zac_id_desig: JSON?.parse(userinfo)?.U_profile_name,
          zac_app_date: props?.data?.[0]?.zac_app_date,
          zac_isinfo: props?.data?.[0]?.zac_isinfo,
          zac_isseqdpt: props?.data?.[0]?.zac_isseqdpt,
          zac_blankchq: props?.data?.[0]?.zac_blankchq,
          zac_lthead: props?.data?.[0]?.zac_lthead,
          zac_id_status: props?.data?.[0]?.zac_id_status,
          zac_bs_value: props?.data?.[0]?.zac_bs_value,
          zac_bs_period_from: props?.data?.[0]?.zac_bs_period_from,
          zac_bs_period_to: props?.data?.[0]?.zac_bs_period_to
        });

        setSubBtn(true);
        setEditZoneAcForm(true);

        // setTerriInfo({
        //   ...terriForm,
        //   t_id_desig: props?.data[0]?.t_id_desig,
        //   t_app_date: props?.data[0]?.t_app_date
        // });
      }
      setRoleId(JSON?.parse(uid));
      setRole_Id(JSON?.parse(userinfo)?.role_id);

      if (role_Id == 5) {
        setRegionForm({
          ...regionForm,
          r_id: JSON?.parse(userinfo)?.r_id,
          r_person: userName,
          r_user_id: JSON?.parse(userinfo)?.user_id,
          r_id_desig: JSON?.parse(userinfo)?.U_profile_name,
          r_app_date: props?.data?.[0]?.r_app_date,
          r_visited: props?.data?.[0]?.r_visited,
          r_visited: props?.data?.[0]?.r_visited,
          r_id_status: props?.data?.[0]?.r_id_status,
          r_docuv: props?.data?.[0]?.r_docuv
        });
        setSubBtn(true);

        // setTerriInfo({
        //   ...terriForm,
        //   t_id_desig: props?.data[0]?.t_id_desig,
        //   t_app_date: props?.data[0]?.t_app_date,
        //   t_user_person: props?.data[0]?.t_user_Person
        // });
      }

      if (role_Id == 4) {
        setZonalMGForm({
          ...zonalMGForm,
          z_id: JSON?.parse(userinfo)?.z_id,
          z_user_person: userName,
          z_id_desig: JSON?.parse(userinfo)?.U_profile_name,
          z_app_date: props?.data[0]?.z_app_date,
          z_user_id: JSON?.parse(userinfo)?.user_id,
          z_visited: props?.data?.[0]?.z_visited,
          z_docuv: props?.data?.[0]?.z_docuv,
          z_id_status: props?.data?.[0]?.z_id_status
        });
      }

      if (role_Id == 3) {
        setBunitHead({
          ...bunitHead,
          bu_id: JSON?.parse(userinfo)?.bu_id,
          bu_user_person: userName,
          bu_user_id: JSON?.parse(userinfo)?.user_id,
          bu_id_desig: JSON?.parse(userinfo)?.U_profile_name,
          bu_app_date: props?.data[0]?.bu_app_date,
          bu_id_status: props?.data[0]?.bu_id_status
        });
      }
      //super admin to show all the data

      if (role_Id == 1) {
        setTerriInfo({
          ...terriForm,
          t_id: JSON?.parse(userinfo)?.t_id,
          t_user_person: props?.data[0]?.t_id_desig,
          t_user_id: JSON?.parse(userinfo)?.user_id,
          // t_id_desig: JSON?.parse(userinfo)?.U_profile_name,
          t_id_desig: props?.data[0]?.t_id_desig,
          t_app_date: props?.data[0]?.t_app_date
        });

        setZoneAcInfo({
          ...zoneAcForm,
          z_id: JSON?.parse(userinfo)?.z_id,
          zac_person: userName,
          zac_user_id: JSON?.parse(userinfo)?.user_id,
          zac_id_desig: JSON?.parse(userinfo)?.U_profile_name,
          zac_app_date: props?.data?.[0]?.zac_app_date,
          zac_isinfo: props?.data?.[0]?.zac_isinfo,
          zac_isseqdpt: props?.data?.[0]?.zac_isseqdpt,
          zac_blankchq: props?.data?.[0]?.zac_blankchq,
          zac_lthead: props?.data?.[0]?.zac_lthead,
          zac_id_status: props?.data?.[0]?.zac_id_status
        });

        setRegionForm({
          ...regionForm,
          r_id: JSON?.parse(userinfo)?.r_id,
          r_person: userName,
          r_user_id: JSON?.parse(userinfo)?.user_id,
          r_id_desig: JSON?.parse(userinfo)?.U_profile_name,
          r_app_date: props?.data?.[0]?.r_app_date,
          r_visited: props?.data?.[0]?.r_visited,
          r_visited: props?.data?.[0]?.r_visited,
          r_id_status: props?.data?.[0]?.r_id_status,
          r_docuv: props?.data?.[0]?.r_docuv
        });

        setZonalMGForm({
          ...zonalMGForm,
          z_id: JSON?.parse(userinfo)?.z_id,
          z_user_person: userName,
          z_id_desig: JSON?.parse(userinfo)?.U_profile_name,
          z_app_date: props?.data[0]?.z_app_date,
          z_user_id: JSON?.parse(userinfo)?.user_id,
          z_visited: props?.data?.[0]?.z_visited,
          z_docuv: props?.data?.[0]?.z_docuv,
          z_id_status: props?.data?.[0]?.z_id_status
        });

        setBunitHead({
          ...bunitHead,
          bu_id: JSON?.parse(userinfo)?.bu_id,
          bu_user_person: userName,
          bu_user_id: JSON?.parse(userinfo)?.user_id,
          bu_id_desig: JSON?.parse(userinfo)?.U_profile_name,
          bu_app_date: props?.data[0]?.bu_app_date,
          bu_id_status: props?.data[0]?.bu_id_status
        });
      }
    }
  }, [role_Id]);

  useEffect(() => {
    switch (role_Id) {
      case 4:
        setTerriView(true);
        setRegionView(true);
        // setZoneAcView(true);
        setZoneMgView(true);
        setEditTerriForm(true);
        setEditZoneAcForm(true);
        setEditRegionForm(true);
        break;
      case 5:
        setTerriView(true);
        // setZoneAcView(true);
        setRegionView(true);
        setEditTerriForm(true);
        setEditZoneAcForm(true);
        break;
      case 6:
        setTerriView(true);
        break;
      case 3:
        setTerriView(true);
        setZoneAcView(true);
        setEditZoneAcForm(true);
        setRegionView(true);
        setEditRegionForm(true);
        setZoneMgView(true);
        setEditZonalMgForm(true);
        setEditTerriForm(true);
        setUnitHeadView(true);
        break;
      case 12:
        setTerriView(true);
        setRegionView(true);
        setZoneMgView(true);
        setZoneAcView(true);
        // setEditTerriForm(true);
        break;
      case 1:
        setTerriView(true);
        setEditTerriForm(true);
        setZoneAcView(true);
        setEditZoneAcForm(true);
        setRegionView(true);
        setEditRegionForm(true);
        setZoneMgView(true);
        setEditZonalMgForm(true);
        setUnitHeadView(true);
        setEditUnitHeadForm(true);
        //
        break;
      case 11:
      case 10:
        setTerriView(true);
        setEditTerriForm(true);
        setZoneAcView(true);
        setEditZoneAcForm(true);
        setRegionView(true);
        setEditRegionForm(true);
        setZoneMgView(true);
        setEditZonalMgForm(true);
        setUnitHeadView(true);
        setEditUnitHeadForm(true);
        //
        break;
      default:
    }
  }, [role_Id]);

  //Whatsapp Message Sender

  async function whatsAppMsg(
    recipientMob,
    userPerson,
    levelPerson,
    pmobile,
    partyName,
    address,
    contactPerson,
    pemail,
    pan,
    gst,
    bst
  ) {
    try {
      const payLoad = {
        recipient: String(recipientMob),
        tem_id: "267735",
        placeholders: [
          userPerson,
          levelPerson,
          partyName,
          address,
          contactPerson,
          pmobile,
          pemail,
          pan,
          gst,
          // "BST" + "BST" + "BST"
          bst
        ]
      };
      // return;
      const res = await axios.post(`${url}/api/whatsAppChat`, JSON.stringify(payLoad), {
        headers: headers
      });
      const respData = await res.data;
      console.log("WA", respData);
    } catch (error) {
      console.log("Error", error);
    }
  }

  // HandleUpdate Territory

  const handleTerriSubmit = async () => {
    if (!props?.data[0]?.accept_the_policy) {
      toast.error("Fill the Agreement Details First");
      return;
    }

    //Extracting Data For WhatsApp Message:

    const {
      r_mobile_no,
      r_user_Person,
      t_user_Person,
      t_hod_name,
      r_hod_name,
      party_Name,
      address,
      contact_person,
      pmobile,
      pemail,
      pan,
      gst,
      territory_name,
      region_name,
      zone_name,
      business_unit_name
    } = props?.data[0];

    const bst = territory_name + "-" + region_name + "-" + zone_name + "-" + business_unit_name;

    try {
      const { t_app_date, t_id_desig, t_id_status, t_user_id, t_id } = terriForm;

      if ((!t_app_date, !t_id_desig, !t_id_status, !t_user_id, !t_id)) {
        throw new Error("All fields must be filled");
      }
      const data = {
        t_id,
        t_user_id,
        t_app_date: t_app_date ? t_app_date : new Date(),
        t_id_desig,
        t_id_status,
        t: true,
        approval: true,
        app_status: "Submitted By Territory"
        // d_id: props.data[0].d_id
      };

      // whatsAppMsg(
      //   r_mobile_no,
      //   r_hod_name == " " ? "Region" : r_hod_name,
      //   t_hod_name == " " ? "Territory" : t_hod_name,
      //   pmobile,
      //   party_Name,
      //   address == "" ? "add" : address,
      //   contact_person == ("" || null) ? "Contact" : contact_person,
      //   pemail,
      //   pan == "" ? "pan" : pan,
      //   gst == null ? "GST" : gst,
      //   bst
      // );

      // return;
      const res = await axios.put(
        `${url}/api/update_dealersapapproval/${router.query.id}`,
        JSON.stringify(data),
        {
          headers: headers
        }
      );
      const resApi = await res.data;
      if (!resApi) return;
      toast.success("Territory Updated Successfully !");
      setSubBtn(true);
      whatsAppMsg(
        r_mobile_no,
        r_hod_name == " " ? "Region" : r_hod_name,
        t_hod_name == " " ? "Territory" : t_hod_name,
        pmobile,
        party_Name,
        address == "" ? "add" : address,
        contact_person == ("" || null) ? "Contact" : contact_person,
        pemail,
        pan == "" ? "pan" : pan,
        gst == null ? "GST" : gst,
        bst
      );
      setTimeout(() => {
        router.push("/table/table_dealer?name=Dealer");
      }, 1000);
    } catch (error) {
      const errorMessage = error?.response?.data?.message;
      toast.error(errorMessage);
      console.log("errr", error);
    }
  };

  //Handle Update Region Form

  const handleRegionSubmit = async () => {
    if (!props?.data[0]?.demrit_dist) {
      toast.error("Fill the Assessment First");
      return;
    }

    const {
      z_mobile_no,
      z_user_Person,
      z_hod_name,
      r_hod_name,
      r_user_Person,
      party_Name,
      address,
      contact_person,
      pmobile,
      pemail,
      pan,
      gst,
      territory_name,
      region_name,
      zone_name,
      business_unit_name
    } = props?.data[0];

    const bst = territory_name + "-" + region_name + "-" + zone_name + "-" + business_unit_name;

    // const dateOne = new Date(zoneAcForm?.zac_app_date);
    const dateOne = new Date(terriForm?.t_app_date).toDateString();
    const dateTwo = new Date(regionForm?.r_app_date ? regionForm?.r_app_date : new Date()).toDateString();

    if (new Date(dateTwo) < new Date(dateOne)) {
      toast.error("Can't select the lesser date");
      return;
    }
    try {
      const { r_id, r_user_id, r_id_desig, r_app_date, r_visited, r_docuv } = regionForm;

      const data = {
        r_id,
        r_user_id,
        r_id_desig,
        r_app_date: r_app_date
          ? r_app_date
          : // : moment(zoneAcForm?.zac_app_date).add(1, "day").format("MMMM D YYYY"),
            // moment(zoneAcForm?.zac_app_date).format("MMMM D YYYY"),
            moment(terriForm?.t_app_date).format("MMMM D YYYY"),
        r_visited,
        r_docuv,
        r: true,
        approval: true,
        r_id_status: "Approved",
        app_status: "Approved By Region"
      };

      // return;
      const res = await axios.put(
        `${url}/api/update_dealersapapproval/${router.query.id}`,
        JSON.stringify(data),
        {
          headers: headers
        }
      );
      const resApi = await res.data;
      if (!resApi) return;
      toast.success("Region Updated Successfully !");
      setapproveRegionbtn(true);
      whatsAppMsg(
        z_mobile_no,
        z_hod_name == " " ? "Zone" : z_hod_name,
        r_hod_name == " " ? "Region" : r_hod_name,
        pmobile,
        party_Name,
        address == "" ? "add" : address,
        contact_person == ("" || null) ? "Contact" : contact_person,
        pemail,
        pan == ("" || null) ? "pan" : pan,
        gst == null ? "GST" : gst,
        bst
      );
    } catch (error) {
      const errorMessage = error?.response?.data?.message;

      toast.error(errorMessage);
    }
  };

  //Handle Zonal Manager Update

  const handleZonalManagerSubmit = async () => {
    // if (!props?.data[0]?.demrit_dist) {
    //   toast.error("Fill the Assessment Details First");
    //   return;
    // }
    const {
      zac_mobile_no,
      z_mobile_no,
      zac_hod_name,
      zac_user_Person,
      r_user_Person,
      r_hod_name,
      party_Name,
      address,
      contact_person,
      pmobile,
      pemail,
      pan,
      gst,
      territory_name,
      region_name,
      zone_name,
      business_unit_name
    } = props?.data[0];

    const bst = territory_name + "-" + region_name + "-" + zone_name + "-" + business_unit_name;

    const dateOne = new Date(regionForm?.r_app_date).toDateString();
    const dateTwo = new Date(zonalMGForm?.z_app_date ? zonalMGForm?.z_app_date : new Date()).toDateString();

    if (new Date(dateTwo) < new Date(dateOne)) {
      toast.error("Can't select the lesser date");
      return;
    }
    try {
      const { z_id, z_user_person, z_user_id, z_id_desig, z_app_date, z_visited, z_docuv } = zonalMGForm;

      const data = {
        z_id,
        z_user_person,
        z_user_id,
        z_id_desig,
        z_app_date: z_app_date
          ? z_app_date
          : // : moment(regionForm?.r_app_date).add(1, "day").format("MMMM D YYYY"),
            moment(regionForm?.r_app_date).format("MMMM D YYYY"),
        z_visited,
        z_docuv,
        z: true,
        approval: true,
        z_id_status: "Approved",
        app_status: "Approved By Zonal"
      };

      // whatsAppMsg(
      //   zac_mobile_no,
      //   zac_hod_name == " " ? "Zonal A/c Manager" : zac_hod_name,
      //   r_hod_name == " " ? "Region" : r_hod_name,
      //   pmobile,
      //   party_Name,
      //   address == "" ? "add" : address,
      //   contact_person == ("" || null) ? "Contact" : contact_person,
      //   pemail,
      //   pan == ("" || null) ? "pan" : pan,
      //   gst == null ? "GST" : gst,
      //   bst
      // );

      // return;
      const res = await axios.put(
        `${url}/api/update_dealersapapproval/${router.query.id}`,
        JSON.stringify(data),
        {
          headers: headers
        }
      );
      const resApi = await res.data;
      if (!resApi) return;
      toast.success("Zonal Manager Updated Successfully !");
      setAppZonalManBtn(true);
      whatsAppMsg(
        zac_mobile_no,
        zac_hod_name == " " ? "Zonal A/c Manager" : zac_hod_name,
        r_hod_name == " " ? "Region" : r_hod_name,
        pmobile,
        party_Name,
        address == "" ? "add" : address,
        contact_person == ("" || null) ? "Contact" : contact_person,
        pemail,
        pan == ("" || null) ? "pan" : pan,
        gst == null ? "GST" : gst,
        bst
      );
    } catch (error) {
      const errorMessage = error?.response?.data?.message;

      toast.error(errorMessage);
      // toast.error(error.message);
    }
  };

  // Handle Update Zone Ac Manager

  const handleZoneAcSubmit = async () => {
    //Extracting Data For WhatsApp Message
    const {
      bu_mobile_no,
      bu_user_Person,
      bu_hod_name,
      zac_hod_name,
      zac_user_Person,
      party_Name,
      address,
      contact_person,
      pmobile,
      pemail,
      pan,
      gst,
      territory_name,
      region_name,
      zone_name,
      business_unit_name
    } = props?.data[0];

    const bst = territory_name + "-" + region_name + "-" + zone_name + "-" + business_unit_name;

    //Conditions for SAP and Security Validation

    if (!props?.data[0]?.SAP_SalesOrg) {
      toast.error("Fill the SAP Details First");
      return;
    }

    // if (!props?.data[0]?.bank_nameThree) {
    //   toast.error("Fill the Security Details First");
    //   return;
    // }

    const dateOne = new Date(zonalMGForm?.z_app_date).toDateString();
    const dateTwo = new Date(zoneAcForm?.zac_app_date ? zoneAcForm?.zac_app_date : new Date()).toDateString();

    console.log("dateOnez", dateOne);
    console.log("dateTwoz", dateTwo);

    if (new Date(dateTwo) < new Date(dateOne)) {
      toast.error("Can't select the lesser date");
      return;
    }
    // return
    try {
      const {
        zac_user_id,
        zac_id_desig,
        zac_app_date,
        zac_isinfo,
        zac_isseqdpt,
        zac_blankchq,
        zac_lthead,
        zac_bs_value,
        zac_bs_period_to,
        zac_bs_period_from

        // zac_id_status
      } = zoneAcForm;

      const data = {
        zac_user_id,
        zac_id_desig,
        zac_app_date: zac_app_date
          ? zac_app_date
          : // : moment(terriForm?.t_app_date).add(1, "day").format("MMMM D YYYY"),
            moment(new Date()).format("MMMM D YYYY"),
        // zac_app_date,
        zac_isinfo,
        zac_isseqdpt,
        zac_blankchq,
        zac_lthead,
        zac_bs_value,
        zac_bs_period_to,
        zac_bs_period_from,
        approval: true,
        zac: true,
        zac_id_status: "Approved",
        app_status: "Approved By Zonal A/c Manager"
      };
      console.log("ZACInside", data);
      // return;
      const res = await axios.put(
        `${url}/api/update_dealersapapproval/${router.query.id}`,
        JSON.stringify(data),
        {
          headers: headers
        }
      );
      const resApi = await res.data;
      if (!resApi) return;
      toast.success("Zone Ac Updated Successfully !");
      setapproveZAbtn(true);
      whatsAppMsg(
        bu_mobile_no,
        bu_hod_name == " " ? "Business Unit" : bu_hod_name,
        zac_hod_name == " " ? "Zonal A/c Manager" : zac_hod_name,
        party_Name,
        address == "" ? "add" : address,
        contact_person == ("" || null) ? "Contact" : contact_person,
        pmobile,
        pemail,
        pan == ("" || null) ? "pan" : pan,
        gst == null ? "GST" : gst,
        bst
      );
    } catch (error) {
      const errorMessage = error?.response?.data?.message;

      toast.error(errorMessage);
    }
  };

  // Handle Business Manager Update

  const handleBunitHeadSubmit = async () => {
    const dateOne = new Date(zoneAcForm?.zac_app_date).toDateString();
    const dateTwo = new Date(bunitHead?.bu_app_date ? bunitHead?.bu_app_date : new Date()).toDateString();

    if (new Date(dateTwo) < new Date(dateOne)) {
      toast.error("Can't select the lesser date");
      return;
    }

    try {
      const { bu_id, bu_user_person, bu_user_id, bu_id_desig, bu_app_date } = bunitHead;

      const data = {
        bu_id,
        bu_user_person,
        bu_user_id,
        bu_id_desig,
        bu_app_date: bu_app_date
          ? bu_app_date
          : // : moment(zonalMGForm?.z_app_date).add(1, "day").format("MMMM D YYYY"),
            moment(zoneAcForm?.zac_app_date).format("MMMM D YYYY"),
        bu: true,
        approval: true,
        bu_id_status: "Approved",
        app_status: "Approved By Business Unit"
      };

      // return;
      const res = await axios.put(
        `${url}/api/update_dealersapapproval/${router.query.id}`,
        JSON.stringify(data),
        {
          headers: headers
        }
      );
      const resApi = await res.data;
      if (!resApi) return;
      toast.success("Business Unit Updated Successfully !");
      setAppBusiBtn(true);
    } catch (error) {
      const errorMessage = error?.response?.data?.message;

      toast.error(errorMessage);
    }
  };

  //Get Dealer Info API

  async function getDealerInfoAPITerri(localInfo) {
    try {
      const res = await axios.get(
        `${url}/api/get_dealer?t=true&additional_data=true&d_id=${router.query.id}`,
        { headers: headers }
      );
      const resapi = await res.data.data;
      // console.log("Ddd", resapi);
      setRegionNumber(resapi[0]?.r_mobile_no);
      setRegionName(resapi[0]?.r_mobile_no);
      setTerriInfo({
        ...terriForm,
        t_user_person: resapi[0]?.t_user_Person,
        // t_user_id: localInfo?.user_id,
        t_user_id: resapi[0]?.user_id,
        // t_id_desig: localInfo?.t_id_desig,
        t_id_desig: resapi[0]?.t_id_desig,
        t_app_date: props?.data[0]?.t_app_date
        // t_app_date: resapi[0]?.t_app_date
      });
    } catch (error) {
      console.log("Err", error);
    }
  }

  async function getDealerInfoAPIZoneAc(localInfo) {
    try {
      const res = await axios.get(
        `${url}/api/get_dealer?za=true&additional_data=true&d_id=${router.query.id}`,
        { headers: headers }
      );
      const resapi = await res.data.data;
      // console.log("FFFFdd", resapi);
      setZoneAcInfo({
        ...zoneAcForm,
        z_id: resapi[0]?.z_id,
        zac_person: resapi[0]?.zac_user_Person,
        zac_user_id: resapi[0]?.user_id,
        zac_id_desig: resapi[0]?.zac_id_desig,
        // zac_id_desig:props?.data?.[0]?.zac_id_desig,
        zac_app_date: resapi?.[0]?.zac_app_date,
        zac_app_date: props?.data[0]?.zac_app_date,
        zac_isinfo: resapi?.[0]?.zac_isinfo,
        zac_isseqdpt: resapi?.[0]?.zac_isseqdpt,
        zac_blankchq: resapi?.[0]?.zac_blankchq,
        zac_lthead: resapi?.[0]?.zac_lthead,
        zac_id_status: resapi[0]?.zac_id_status,
        zac_bs_value: resapi?.[0]?.zac_bs_value,
        zac_bs_period_from: resapi?.[0]?.zac_bs_period_from,
        zac_bs_period_to: resapi?.[0]?.zac_bs_period_to
      });
      setapproveZAbtn(true);
      setCheckBoxStatus(true);
      setTerriInfo({
        ...terriForm,
        t_user_person: resapi[0]?.t_user_Person,
        t_user_id: resapi[0]?.user_id,
        t_id_desig: resapi[0]?.t_id_desig,
        t_app_date: resapi[0]?.t_app_date
      });

      setRegionForm({
        r_id: resapi[0]?.r_id,
        r_person: resapi[0]?.r_user_Person,
        r_user_id: resapi[0]?.r_user_id,
        r_id_desig: resapi[0]?.r_id_desig,
        r_app_date: resapi[0]?.r_app_date,
        r_id_status: resapi[0]?.r_id_status,
        r_visited: resapi[0]?.r_visited,
        r_docuv: resapi[0]?.r_docuv
      });
      setCheckBoxRegionStatus(true);
      setapproveRegionbtn(true);

      setZonalMGForm({
        z_id: resapi[0]?.z_id,
        z_user_person: resapi[0]?.z_user_Person,
        z_id_desig: resapi[0]?.z_id_desig,
        z_app_date: resapi[0]?.z_app_date,
        z_visited: resapi[0]?.z_visited,
        z_docuv: resapi[0]?.z_docuv,
        z_id_status: resapi[0]?.z_id_status
      });

      setCheckBoxZonalMan(true);
      setAppZonalManBtn(true);
    } catch (error) {
      console.log("Err", error);
    }
  }

  async function getDealerInfoAPIRegion(localInfo) {
    try {
      const res = await axios.get(
        `${url}/api/get_dealer?r=true&additional_data=true&d_id=${router.query.id}`,
        { headers: headers }
      );
      const resapi = await res.data.data;

      setTerriInfo({
        ...terriForm,
        t_id: resapi[0]?.t_d,
        t_user_person: resapi[0]?.t_user_Person,
        t_user_id: resapi[0]?.t_user_id,
        t_id_desig: resapi[0]?.t_id_desig,
        t_app_date: resapi[0]?.t_app_date,
        t_id_status: resapi[0]?.t_id_status
      });
      setSubBtn(true);

      // setZoneAcInfo({
      //   ...zoneAcForm,
      //   zac_person: resapi[0]?.zac_user_Person,
      //   zac_user_id: resapi[0]?.zac_user_id,
      //   zac_id_desig: resapi[0]?.zac_id_desig,
      //   zac_app_date: resapi[0]?.zac_app_date,
      //   zac_id_status: resapi[0]?.zac_id_status,
      //   zac_isinfo: resapi[0]?.zac_isinfo,
      //   zac_isseqdpt: resapi[0]?.zac_isseqdpt,
      //   zac_blankchq: resapi[0]?.zac_blankchq,
      //   zac_lthead: resapi[0]?.zac_lthead,
      //   app_status: resapi[0]?.t_app_date
      // });
      // setCheckBoxStatus(true);
      // setapproveZAbtn(true);

      setRegionForm({
        ...regionForm,
        r_id: resapi[0]?.r_id,
        r_person: resapi[0]?.r_user_Person,
        r_user_id: resapi[0]?.r_user_id,
        r_id_desig: resapi[0]?.r_id_desig,
        r_app_date: resapi[0]?.r_app_date,
        r_id_status: resapi[0]?.r_id_status,
        r_visited: resapi[0]?.r_visited,
        r_docuv: resapi[0]?.r_docuv
      });
      setCheckBoxRegionStatus(true);
      setapproveRegionbtn(true);

      // setZonalMGForm({
      //   ...zonalMGForm,
      //   z_id: resapi[0]?.z_id,
      //   z_user_person: resapi[0]?.z_user_Person,
      //   z_id_desig: resapi[0]?.z_id_desig,
      //   z_app_date: resapi[0]?.z_app_date,
      //   // z_user_id: JSON?.parse(userinfo)?.user_id,
      //   // z_visited: props?.data?.[0]?.z_visited,
      //   z_visited: resapi[0]?.z_visited,
      //   z_docuv: resapi[0]?.z_docuv,
      //   // z_id_status: props?.data?.[0]?.z_id_status,
      //   z_id_status: resapi[0]?.z_id_status
      // });

      // setCheckBoxZonalMan(true);
      // setAppZonalManBtn(true);
    } catch (error) {
      console.log("Err", error);
    }
  }

  async function getDealerInfoAPIZoneMg(localInfo) {
    try {
      const res = await axios.get(
        `${url}/api/get_dealer?z=true&additional_data=true&d_id=${router.query.id}`,
        { headers: headers }
      );
      const resapi = await res.data.data;

      setTerriInfo({
        ...terriForm,
        t_id: resapi[0]?.t_d,
        t_user_person: resapi[0]?.t_user_Person,
        t_user_id: resapi[0]?.t_user_id,
        t_id_desig: resapi[0]?.t_id_desig,
        t_app_date: resapi[0]?.t_app_date,
        t_id_status: resapi[0]?.t_id_status
      });
      setSubBtn(true);

      setRegionForm({
        ...regionForm,
        r_id: resapi[0]?.r_id,
        r_person: resapi[0]?.r_user_Person,
        r_user_id: resapi[0]?.r_user_id,
        r_id_desig: resapi[0]?.r_id_desig,
        r_app_date: resapi[0]?.r_app_date,
        r_id_status: resapi[0]?.r_id_status,
        r_visited: resapi[0]?.r_visited,
        r_docuv: resapi[0]?.r_docuv
      });
      setCheckBoxRegionStatus(true);
      setapproveRegionbtn(true);

      setZonalMGForm({
        ...zonalMGForm,
        z_id: resapi[0]?.z_id,
        z_user_person: resapi[0]?.z_user_Person,
        z_id_desig: resapi[0]?.z_id_desig,
        z_app_date: resapi[0]?.z_app_date,
        // z_user_id: JSON?.parse(userinfo)?.user_id,
        // z_visited: props?.data?.[0]?.z_visited,
        z_visited: resapi[0]?.z_visited,
        z_docuv: resapi[0]?.z_docuv,
        // z_id_status: props?.data?.[0]?.z_id_status,
        z_id_status: resapi[0]?.z_id_status
      });

      setCheckBoxZonalMan(true);
      setAppZonalManBtn(true);

      // setZoneAcInfo({
      //   ...zoneAcForm,
      //   z_id: resapi[0]?.z_id,
      //   zac_person: resapi[0]?.zac_user_Person,
      //   zac_user_id: resapi[0]?.user_id,
      //   zac_id_desig: resapi[0]?.zac_id_desig,
      //   // zac_id_desig:props?.data?.[0]?.zac_id_desig,
      //   zac_app_date: resapi?.[0]?.zac_app_date,
      //   zac_app_date: props?.data[0]?.zac_app_date,
      //   zac_isinfo: resapi?.[0]?.zac_isinfo,
      //   zac_isseqdpt: resapi?.[0]?.zac_isseqdpt,
      //   zac_blankchq: resapi?.[0]?.zac_blankchq,
      //   zac_lthead: resapi?.[0]?.zac_lthead,
      //   zac_id_status: resapi[0]?.zac_id_status,
      //   zac_bs_value: resapi?.[0]?.zac_bs_value,
      //   zac_bs_period_from: resapi?.[0]?.zac_bs_period_from,
      //   zac_bs_period_to: resapi?.[0]?.zac_bs_period_to
      // });
      // setapproveZAbtn(true);
      // setCheckBoxStatus(true);
    } catch (error) {
      console.log("Err", error);
    }
  }

  async function getDealerInfoAPIBusiUnit(localInfo) {
    try {
      const res = await axios.get(`${url}/api/get_dealer?bu=true&additional_data=true`, { headers: headers });
      const resapi = await res.data.data;

      setTerriInfo({
        t_id: resapi[0]?.t_d,
        t_user_person: resapi[0]?.t_user_Person,
        t_user_id: resapi[0]?.t_user_id,
        t_id_desig: resapi[0]?.t_id_desig,
        t_app_date: resapi[0]?.t_app_date,
        t_id_status: resapi[0]?.t_id_status
      });
      setSubBtn(true);

      setZoneAcInfo({
        ...zoneAcForm,
        zac_person: resapi[0]?.zac_user_Person,
        zac_user_id: resapi[0]?.zac_user_id,
        zac_id_desig: resapi[0]?.zac_id_desig,
        zac_app_date: resapi[0]?.zac_app_date,
        zac_id_status: resapi[0]?.zac_id_status,
        zac_isinfo: resapi[0]?.zac_isinfo,
        zac_isseqdpt: resapi[0]?.zac_isseqdpt,
        zac_blankchq: resapi[0]?.zac_blankchq,
        zac_lthead: resapi[0]?.zac_lthead,
        app_status: resapi[0]?.t_app_date
      });
      setCheckBoxStatus(true);
      setapproveZAbtn(true);

      setRegionForm({
        r_id: resapi[0]?.r_id,
        r_person: resapi[0]?.r_user_Person,
        r_user_id: resapi[0]?.r_user_id,
        r_id_desig: resapi[0]?.r_id_desig,
        r_app_date: resapi[0]?.r_app_date,
        r_id_status: resapi[0]?.r_id_status,
        r_visited: resapi[0]?.r_visited,
        r_docuv: resapi[0]?.r_docuv
      });
      setCheckBoxRegionStatus(true);
      setapproveRegionbtn(true);

      setZonalMGForm({
        z_id: resapi[0]?.z_id,
        z_user_person: resapi[0]?.z_user_Person,
        z_id_desig: resapi[0]?.z_id_desig,
        z_app_date: resapi[0]?.z_app_date,
        // z_user_id: JSON?.parse(userinfo)?.user_id,
        // z_visited: props?.data?.[0]?.z_visited,
        z_visited: resapi[0]?.z_visited,
        z_docuv: resapi[0]?.z_docuv,
        // z_id_status: props?.data?.[0]?.z_id_status,
        z_id_status: resapi[0]?.z_id_status
      });

      setCheckBoxZonalMan(true);
      setAppZonalManBtn(true);
    } catch (error) {
      console.log("Err", error);
    }
  }

  // useEffect(() => {
  //   if (role_Id == 4) {
  //     getDealerInfoAPIRegion(localInfo);
  //     // getDealerInfoAPITerri(localInfo);
  //   }
  // }, [role_Id]);

  // useEffect(() => {
  //   if (role_Id == 5) {
  //     getDealerInfoAPIZoneAc(localInfo);

  //   }
  // }, [role_Id]);

  // useEffect(() => {
  //   // if (role_Id == 12 || role_Id == 5) {
  //   if (role_Id == 12) {
  //     getDealerInfoAPITerri(localInfo);
  //   }
  // }, [role_Id]);

  // useEffect(() => {
  //   if (role_Id == 3) {
  //     // getDealerInfoAPIBusiUnit(localInfo);
  //     getDealerInfoAPIZoneMg(localInfo);
  //   }
  // }, [role_Id]);

  //Getting all the Datas for Specific Role_Id

  async function getDealerInfoALL(localInfo) {
    try {
      const res = await axios.get(
        `${url}/api/get_dealer?z=true&additional_data=true&d_id=${router.query.id}`,
        { headers: headers }
      );
      const resapi = await res.data.data;

      console.log("EDEDED",resapi )

      setTerriInfo({
        ...terriForm,
        t_id: resapi[0]?.t_d,
        t_user_person: resapi[0]?.t_user_Person,
        t_user_id: resapi[0]?.t_user_id,
        t_id_desig: resapi[0]?.t_id_desig,
        t_app_date: resapi[0]?.t_app_date,
        t_id_status: resapi[0]?.t_id_status
      });
      setSubBtn(resapi?.t_id_status == "Pending For Approve" ? false : true);

      setRegionForm({
        ...regionForm,
        r_id: resapi[0]?.r_id,
        r_person: resapi[0]?.r_user_Person,
        r_user_id: resapi[0]?.r_user_id,
        r_id_desig: resapi[0]?.r_id_desig,
        r_app_date: resapi[0]?.r_app_date,
        r_id_status: resapi[0]?.r_id_status,
        r_visited: resapi[0]?.r_visited,
        r_docuv: resapi[0]?.r_docuv
      });
      setCheckBoxRegionStatus(resapi[0]?.r_id_status == "Pending For Approve" ? false : true);
      setapproveRegionbtn(resapi[0]?.r_id_status == "Pending For Approve" ? false : true);

      setZonalMGForm({
        ...zonalMGForm,
        z_id: resapi[0]?.z_id,
        z_user_person: resapi[0]?.z_user_Person  ? resapi[0]?.z_user_Person :""  ,
        z_id_desig: resapi[0]?.z_id_desig ? resapi[0]?.z_id_desig :"",
        z_app_date: resapi?.z_app_date,
        // z_user_id: JSON?.parse(userinfo)?.user_id,
        // z_visited: props?.data?.[0]?.z_visited,
        z_visited: resapi[0]?.z_visited,
        z_docuv: resapi[0]?.z_docuv,
        // z_id_status: props?.data?.[0]?.z_id_status,
        z_id_status: resapi[0]?.z_id_status
      });

      setCheckBoxZonalMan(resapi[0]?.z_id_status == "Pending For Approve" ? false : true);
      setAppZonalManBtn(resapi[0]?.z_id_status == "Pending For Approve" ? false : true);


      setZoneAcInfo({
        ...zoneAcForm,
        zac_person: resapi[0]?.zac_user_Person,
        zac_user_id: resapi[0]?.zac_user_id,
        zac_id_desig: resapi[0]?.zac_id_desig,
        zac_app_date: resapi[0]?.zac_app_date,
        zac_id_status: resapi[0]?.zac_id_status,
        zac_isinfo: resapi[0]?.zac_isinfo,
        zac_isseqdpt: resapi[0]?.zac_isseqdpt,
        zac_blankchq: resapi[0]?.zac_blankchq,
        zac_lthead: resapi[0]?.zac_lthead,
        app_status: resapi[0]?.t_app_date
      });
      setCheckBoxStatus(resapi[0]?.zac_id_status == "Pending For Approve" ? false : true);
      setapproveZAbtn(resapi[0]?.zac_id_status == "Pending For Approve" ? false : true);

      setBunitHead({
        ...bunitHead,
        bu_id: resapi[0]?.bu_id,
        bu_user_person: resapi[0]?.bu_user_Person,
        bu_user_id: resapi[0]?.bu_user_id,
        bu_id_desig: resapi[0]?.bu_id_desig ? resapi[0]?.bu_id_desig :"",
        bu_id_status: resapi[0]?.bu_id_status,
        bu_app_date: resapi[0]?.bu_app_date
      });

      setAppBusiBtn(resapi[0]?.bu_id_status == "Pending For Approve" ? false : true);
    } catch (error) {
      console.log("Err", error);
    }
  }

  useEffect(() => {
    switch (role_Id) {
      case 4:
        getDealerInfoAPIRegion(localInfo);
        // getDealerInfoAPITerri(localInfo);

        break;

      case 5:
        // getDealerInfoAPIZoneAc(localInfo);
        getDealerInfoAPITerri(localInfo);

        break;

      case 12:
        // getDealerInfoAPITerri(localInfo);
        // getDealerInfoAPIRegion(localInfo);
        getDealerInfoAPIZoneMg(localInfo);

        break;

      case 3:
        // getDealerInfoAPIZoneMg(localInfo);
        getDealerInfoAPIZoneAc(localInfo);
        break;

      case 1:
      case 8:
        // getDealerInfoAPIZoneMg(localInfo);
        getDealerInfoALL(localInfo);
        break;

      default:
        break;
    }
    console.log("ROOOO", role_Id)
  }, [role_Id]);

  // console.log("props", props);
  // console.log("LocalInfo",localInfo)
  // console.log("RegionForm", regionForm);
  // console.log("ZoneFormData", zonalMGForm);
  // console.log("BuFomr", bunitHead);

  // const nextTabHandler =()=>{
  //   if(role_Id == 6 && terriSubBtn){
  //     props.formType("Agreement");
  //   }else{
  //     toast.error("Submit Territory First")

  //   }

  //   if(role_Id == 12 && approveZAbtn){
  //     props.formType("Agreement");
  //   }else{
  //     toast.error("Submit Zonal Ac Manager")
  //   }
  // }

  const nextTabHandler = () => {
    switch (role_Id) {
      case 6:
        if (terriSubBtn) {
          props.formType("Agreement");
        } else {
          toast.error("Submit Territory First");
        }
        break;

      case 12:
        if (approveZAbtn) {
          props.formType("Agreement");
        } else {
          toast.error("Submit Zonal Ac Manager");
        }
        break;
      case 5:
        if (approveRegionbtn) {
          props.formType("Agreement");
        } else {
          toast.error("Submit Regional Manager");
        }
        break;
      case 4:
        if (appZonalManBtn) {
          props.formType("Agreement");
        } else {
          toast.error("Submit Zonal Manager");
        }
        break;
      case 3:
        if (appBusiBtn) {
          props.formType("Agreement");
        } else {
          toast.error("Submit Business Unit Head");
        }
        break;

      default:
        break;
    }
  };

  //Disabling the Submit/Approve buttons

  const [submitTerriBy, setSubmitTerriBy] = useState(null);
  const [submitZoneAcBy, setSubmitZoneAcBy] = useState(null);
  const [submitRegionBy, setSubmitRegionBy] = useState(null);
  const [submitZoneMgBy, setSubmitZoneMgBy] = useState(null);
  const [submitBusiBy, setSubmitBusiBy] = useState(null);

  useEffect(() => {
    if (props) {
      const submitStatus = props?.data?.[0]?.app_status;
      if (
        submitStatus == "Approved By Zonal A/c Manager" ||
        submitStatus == "Approved By Region" ||
        submitStatus == "Approved By Zonal" ||
        submitStatus == "Approved By Business Unit" ||
        submitStatus == "Submitted By Territory"
      ) {
        setSubmitTerriBy(true);
      }
      if (
        submitStatus == "Approved By Zonal A/c Manager" ||
        // submitStatus == "Approved By Region" ||
        // submitStatus == "Approved By Zonal" ||
        submitStatus == "Approved By Business Unit"
      ) {
        setSubmitZoneAcBy(true);
      }
      if (
        submitStatus == "Approved By Region" ||
        submitStatus == "Approved By Zonal" ||
        submitStatus == "Approved By Business Unit"
      ) {
        setSubmitRegionBy(true);
      }
      if (submitStatus == "Approved By Zonal" || submitStatus == "Approved By Business Unit") {
        setSubmitZoneMgBy(true);
      }
      if (submitStatus == "Approved By Business Unit") {
        setSubmitBusiBy(true);
      }
    }
  }, [props]);

  console.log("Bussi", bunitHead);

  return (
    <form className=" bg-white rounded   p-4 w-full  overflow-auto" onSubmit={(e) => e.preventDefault()}>
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

      {terriview && (
        <div className="territory">
          <div className="flex my-2 mb-2 lg:flex-row flex-col ">
            <div className="w-full px-2">
              <label className="block text-gray-700 text-sm font-bold mb-2 pt-2" htmlFor="inputField">
                <small className="text-red-600">*</small> Territory Person
              </label>
              <input
                className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                type="text"
                id="inputField"
                value={terriForm?.t_user_person}
                placeholder="Territory Person"
                disabled={editTerriFrom ? editRegionFrom : true}
              />
            </div>
            <div className="w-full px-2 ">
              <label className="block text-gray-700 text-sm font-bold mb-2 pt-2" htmlFor="inputField">
                <small className="text-red-600">*</small> Designation
              </label>
              <input
                className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                type="text"
                id="inputField"
                value={terriForm?.t_id_desig}
                placeholder="Designation"
                disabled={editTerriFrom ? editRegionFrom : true}
              />
            </div>
          </div>

          <div className="flex my-2 mb-2 lg:flex-row flex-col ">
            <div className="w-full px-2">
              <label className="block text-gray-700 text-sm font-bold mb-2 pt-2" htmlFor="inputField">
                <small className="text-red-600">*</small> Date of Approval
              </label>
              <DatePicker
                className="w-full px-3 py-2 border-b border-gray-500  bg-white focus:outline-none focus:border-b focus:border-indigo-500"
                // selected={new Date(terriForm?.t_app_date ? terriForm?.t_app_date : new Date())}

                selected={new Date(terriForm?.t_app_date ? terriForm?.t_app_date : new Date())}
                dropdownMode="select"
                dateFormat="dd/MM/yyyy"
                onChange={(date) => {
                  setTerriInfo({
                    ...terriForm,
                    t_app_date: moment(date).format("LL")
                  });
                }}
                onChangeRaw={(e) => {
                  e.preventDefault();
                }}
              />
            </div>
            <div className="w-full px-2 ">
              <label className="block text-gray-700 text-sm font-bold mb-2 pt-2" htmlFor="inputField">
                <small className="text-red-600">* </small> Status
              </label>
              <input
                className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                type="text"
                id="inputField"
                value={terriForm?.t_id_status}
                placeholder="Submitted By TM"
                disabled
              />
            </div>
          </div>

          {(router.query.type === "Edit" || router.query.type === "EditAp") && (
            <div className="flex w-full justify-center gap-4 text-white py-4">
              <button
                disabled={terriSubBtn || submitTerriBy}
                onClick={handleTerriSubmit}
                className={`${
                  terriSubBtn || submitTerriBy ? "bg-gray-400" : "bg-yellow-500"
                } px-3 py-1.5 rounded-sm`}
              >
                Submit
              </button>
            </div>
          )}
        </div>
      )}

      {/* Regional Manager  */}

      {regionView && (
        <div className="regional manager">
          <div className="flex my-2 mb-2 lg:flex-row flex-col ">
            <div className="w-full px-2">
              <label className="block text-gray-700 text-sm font-bold mb-2 pt-2" htmlFor="inputField">
                <small className="text-red-600">*</small> Regional Manager
              </label>
              <input
                className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                type="text"
                id="inputField"
                placeholder="Regional Manager"
                value={regionForm?.r_person}
                disabled={editRegionFrom}
              />
            </div>
            <div className="w-full px-2 ">
              <label className="block text-gray-700 text-sm font-bold mb-2 pt-2" htmlFor="inputField">
                <small className="text-red-600">*</small> Designation
              </label>
              <input
                className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                type="text"
                id="inputField"
                placeholder="Designation"
                value={regionForm?.r_id_desig}
                disabled={editRegionFrom}
              />
            </div>
          </div>

          <div className="flex my-2 mb-2 lg:flex-row flex-col ">
            <div className="w-full px-2">
              <label className="block text-gray-700 text-sm font-bold mb-2 pt-2" htmlFor="inputField">
                <small className="text-red-600">*</small> Date of Approval
              </label>
              <DatePicker
                className="w-full px-3 py-2 border-b border-gray-500  bg-white focus:outline-none focus:border-b focus:border-indigo-500"
                // selected={new Date(businessInfoTwo?.year_2 ? businessInfoTwo?.year_2 : "2022")}
                // selected={new Date(regionForm?.r_app_date ? regionForm?.r_app_date : new Date())}
                // showMonthDropdown

                selected={
                  new Date(
                    regionForm?.r_app_date
                      ? regionForm?.r_app_date
                      : // : zoneAcForm?.zac_app_date
                      terriForm?.t_app_date
                      ? // ? new Date(zoneAcForm?.zac_app_date).getTime() + 24 * 60 * 60 * 1000
                        new Date().getTime()
                      : new Date()
                  )
                }
                dropdownMode="select"
                dateFormat={"dd/MM/yyyy"}
                minDate={
                  // zoneAcForm?.zac_app_date
                  terriForm?.t_app_date
                    ? // ? new Date(new Date(zoneAcForm?.zac_app_date).getTime() + 86400000)
                      new Date(new Date().getTime())
                    : undefined
                }
                onChange={(date) => {
                  setRegionForm({
                    ...regionForm,
                    r_app_date: moment(date).format("LL")
                  });
                }}
                onChangeRaw={(e) => {
                  e.preventDefault();
                }}
              />
            </div>
            <div className="w-full px-2 ">
              <label className="block text-gray-700 text-sm font-bold mb-2 pt-2" htmlFor="inputField">
                <small className="text-red-600">*</small> Status
              </label>
              <input
                className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                type="text"
                id="inputField"
                placeholder="Status"
                value={regionForm?.r_id_status}
                disabled
              />
            </div>
          </div>

          {/* checkbox  */}

          <div className="flex my-2 mb-2 lg:flex-row flex-col items-center accent-lime-400 py-4 ">
            <div className="w-full px-2">
              <div className="flex items-center whitespace-nowrap">
                <input
                  type="checkbox"
                  id="ownedCheckbox"
                  className="mr-2 "
                  value={regionForm?.r_visited}
                  checked={regionForm.r_visited}
                  onChange={(e) => {
                    setRegionForm({
                      ...regionForm,
                      r_visited: e.target.checked
                    });
                  }}
                  disabled={checkBoxRegionStatus || submitRegionBy}
                />
                <label htmlFor="ownedCheckbox ">I have visited</label>
              </div>
            </div>

            <div className="w-full px-2">
              <div className="flex items-center whitespace-nowrap">
                <input
                  type="checkbox"
                  id="rentedCheckbox"
                  className="mr-2"
                  value={regionForm?.r_docuv}
                  checked={regionForm.r_docuv}
                  onChange={(e) => {
                    setRegionForm({
                      ...regionForm,
                      r_docuv: e.target.checked
                    });
                  }}
                  disabled={checkBoxRegionStatus || submitRegionBy}
                />
                <label htmlFor="rentedCheckbox">Verified the all info. documents</label>
              </div>
            </div>
          </div>

          {(router.query.type === "Edit" || router.query.type === "EditAp") && (
            <div className="flex w-full justify-center gap-4 text-white py-4">
              <button
                disabled={approveRegionbtn || submitRegionBy}
                onClick={handleRegionSubmit}
                className={`${
                  approveRegionbtn || submitRegionBy ? "bg-gray-400" : "bg-green-600"
                }  px-3 py-1 rounded-sm`}
              >
                Approval
              </button>
              <button
                disabled={approveRegionbtn}
                className={`${
                  approveRegionbtn || submitRegionBy ? "bg-gray-400" : "bg-red-600"
                } px-3 py-1 rounded-sm`}
              >
                Reject
              </button>
            </div>
          )}
        </div>
      )}

      {/* zonal manager  */}

      {zoneMGView && (
        <div className="zonal manager">
          <div className="flex my-2 mb-2 lg:flex-row flex-col ">
            <div className="w-full px-2">
              <label className="block text-gray-700 text-sm font-bold mb-2 pt-2" htmlFor="inputField">
                <small className="text-red-600">*</small> Zonal Manager
              </label>
              <input
                className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                type="text"
                id="inputField"
                placeholder="Zonal Manager"
                value={zonalMGForm?.z_user_person}
                disabled={editZonalMgFrom}
              />
            </div>
            <div className="w-full px-2 ">
              <label className="block text-gray-700 text-sm font-bold mb-2 pt-2" htmlFor="inputField">
                <small className="text-red-600">*</small> Designation
              </label>
              <input
                className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                type="text"
                id="inputField"
                placeholder="Designation"
                value={zonalMGForm?.z_id_desig}
                disabled={editZonalMgFrom}
              />
            </div>
          </div>

          <div className="flex my-2 mb-2 lg:flex-row flex-col ">
            <div className="w-full px-2">
              <label className="block text-gray-700 text-sm font-bold mb-2 pt-2" htmlFor="inputField">
                <small className="text-red-600">*</small> Date of Approval
              </label>
              <DatePicker
                className="w-full px-3 py-2 border-b border-gray-500  bg-white focus:outline-none focus:border-b focus:border-indigo-500"
                // selected={new Date(businessInfoTwo?.year_2 ? businessInfoTwo?.year_2 : "2022")}
                // selected={new Date(zonalMGForm?.z_app_date ? zonalMGForm?.z_app_date : new Date())}

                selected={
                  new Date(
                    zonalMGForm?.z_app_date
                      ? zonalMGForm?.z_app_date
                      : regionForm?.r_app_date
                      ? // ? new Date(regionForm?.r_app_date).getTime() + 24 * 60 * 60 * 1000
                        new Date().getTime()
                      : new Date()
                  )
                }
                dateFormat={"dd/MM/yyyy"}
                dropdownMode="select"
                minDate={
                  regionForm?.r_app_date
                    ? // ? new Date(new Date(regionForm?.r_app_date).getTime() + 86400000)
                      new Date(new Date().getTime())
                    : undefined
                }
                onChange={(date) => {
                  setZonalMGForm({
                    ...zonalMGForm,
                    z_app_date: moment(date).format("LL")
                  });
                }}
                onChangeRaw={(e) => {
                  e.preventDefault();
                }}
              />
            </div>
            <div className="w-full px-2 ">
              <label className="block text-gray-700 text-sm font-bold mb-2 pt-2" htmlFor="inputField">
                <small className="text-red-600">*</small> Status
              </label>
              <input
                className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                type="text"
                id="inputField"
                value={zonalMGForm?.z_id_status}
                placeholder="Status"
                disabled
              />
            </div>
          </div>

          {/* checkbox  */}

          <div className="flex my-2 mb-2 lg:flex-row flex-col items-center accent-lime-400 py-4 ">
            <div className="w-full px-2">
              <div className="flex items-center whitespace-nowrap">
                <input
                  type="checkbox"
                  id="ownedCheckbox"
                  className="mr-2"
                  value={zonalMGForm?.z_visited}
                  checked={zonalMGForm.z_visited}
                  onChange={(e) => {
                    setZonalMGForm({
                      ...zonalMGForm,
                      z_visited: e.target.checked
                    });
                  }}
                  disabled={checkBoxZonalMan || submitZoneMgBy}
                />
                <label htmlFor="ownedCheckbox ">I have visited</label>
              </div>
            </div>

            <div className="w-full px-2">
              <div className="flex items-center whitespace-nowrap">
                <input
                  type="checkbox"
                  id="rentedCheckbox"
                  className="mr-2"
                  value={zonalMGForm?.z_docuv}
                  checked={zonalMGForm.z_docuv}
                  onChange={(e) => {
                    setZonalMGForm({
                      ...zonalMGForm,
                      z_docuv: e.target.checked
                    });
                  }}
                  disabled={checkBoxZonalMan || submitZoneMgBy}
                />
                <label htmlFor="rentedCheckbox">Verified the all info. documents</label>
              </div>
            </div>
          </div>

          {(router.query.type === "Edit" || router.query.type === "EditAp") && (
            <div className="flex w-full justify-center gap-4 text-white py-4">
              <button
                disabled={appZonalManBtn || submitZoneMgBy}
                onClick={handleZonalManagerSubmit}
                className={`${
                  appZonalManBtn || submitZoneMgBy ? "bg-gray-400" : "bg-green-600"
                } px-3 py-1 rounded-sm`}
              >
                Approval
              </button>
              <button
                disabled={appZonalManBtn || submitZoneMgBy}
                className={`${
                  appZonalManBtn || submitZoneMgBy ? "bg-gray-400" : "bg-red-600"
                } px-3 py-1 rounded-sm`}
              >
                Reject
              </button>
            </div>
          )}
        </div>
      )}

      {/* Zone AC Manager */}

      {zoneAcView && (
        <div className="zone ac manager">
          <div className="flex my-2 mb-2 lg:flex-row flex-col ">
            <div className="w-full px-2">
              <label className="block text-gray-700 text-sm font-bold mb-2 pt-2" htmlFor="inputField">
                <small className="text-red-600">*</small> Zone A/c Manager
              </label>
              <input
                className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                type="text"
                id="inputField"
                value={zoneAcForm?.zac_person}
                placeholder="Zone A/c Manager"
                disabled={editZoneAcFrom}
              />
            </div>
            <div className="w-full px-2 ">
              <label className="block text-gray-700 text-sm font-bold mb-2 pt-2" htmlFor="inputField">
                <small className="text-red-600">*</small> Designation
              </label>
              <input
                className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                type="text"
                id="inputField"
                value={zoneAcForm?.zac_id_desig}
                placeholder="Designation"
                disabled={editZoneAcFrom}
              />
            </div>
          </div>

          <div className="flex my-2 mb-2 lg:flex-row flex-col ">
            <div className="w-full px-2">
              <label className="block text-gray-700 text-sm font-bold mb-2 pt-2" htmlFor="inputField">
                <small className="text-red-600">*</small> Date of Approval
              </label>
              <DatePicker
                className="w-full px-3 py-2 border-b border-gray-500  bg-white focus:outline-none focus:border-b focus:border-indigo-500"
                // selected={new Date(zoneAcForm?.zac_app_date ? zoneAcForm?.zac_app_date : new Date())}
                // selected={
                //   zoneAcForm?.zac_app_date
                //     ? moment(zoneAcForm.zac_app_date, "MMMM D, YYYY").toDate()
                //     : terriForm?.t_app_date
                //     ? moment(terriForm.t_app_date).toDate()
                //     : new Date()
                // }
                selected={
                  new Date(
                    zoneAcForm?.zac_app_date
                      ? zoneAcForm?.zac_app_date
                      : zonalMGForm?.z_app_date
                      ? // ? new Date(terriForm.t_app_date).getTime() + 24 * 60 * 60 * 1000
                        new Date().getTime()
                      : new Date()
                  )
                }
                dateFormat={"dd/MM/yyyy"}
                dropdownMode="select"
                minDate={
                  // terriForm?.t_app_date
                  zonalMGForm?.z_app_date
                    ? // ? new Date(new Date(terriForm?.t_app_date).getTime() + 86400000)
                      new Date(new Date().getTime())
                    : undefined
                }
                onChange={(date) => {
                  setZoneAcInfo({
                    ...zoneAcForm,
                    zac_app_date: moment(date).format("LL")
                  });
                }}
                onChangeRaw={(e) => {
                  e.preventDefault();
                }}
              />
            </div>
            <div className="w-full px-2 ">
              <label className="block text-gray-700 text-sm font-bold mb-2 pt-2" htmlFor="inputField">
                <small className="text-red-600">*</small> Status
              </label>
              <input
                className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                type="text"
                id="inputField"
                placeholder="Status"
                value={zoneAcForm?.zac_id_status}
                disabled={editZoneAcFrom}
              />
            </div>
          </div>

          {/* new fields bs value  */}

          <div className="w-full px-2 ">
            <label className="block text-gray-700 text-sm font-bold mb-2 pt-2" htmlFor="inputField">
              <small className="text-red-600">*</small> BS Value
            </label>
            <input
              className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
              type="text"
              id="inputField"
              value={zoneAcForm.zac_bs_value ? zoneAcForm.zac_bs_value : ""}
              placeholder="BS Value"
              onChange={(e) => {
                setZoneAcInfo({
                  ...zoneAcForm,
                  zac_bs_value: e.target.value
                });
              }}
              // disabled={editZoneAcFrom}
            />
          </div>

          <div className="flex my-2 mb-2 lg:flex-row flex-col ">
            <div className="w-full px-2">
              <label className="block text-gray-700 text-sm font-bold mb-2 pt-2" htmlFor="inputField">
                <small className="text-red-600">*</small> BS Period From
              </label>
              <DatePicker
                className="w-full px-3 py-2 border-b border-gray-500  bg-white focus:outline-none focus:border-b focus:border-indigo-500"
                selected={
                  new Date(zoneAcForm?.zac_bs_period_from ? zoneAcForm?.zac_bs_period_from : new Date())
                }
                dateFormat={"dd/MM/yyyy"}
                dropdownMode="select"
                onChange={(date) => {
                  setZoneAcInfo({
                    ...zoneAcForm,
                    zac_bs_period_from: moment(date).format("LL")
                  });
                }}
                onChangeRaw={(e) => {
                  e.preventDefault();
                }}
              />
            </div>
            <div className="w-full px-2">
              <label className="block text-gray-700 text-sm font-bold mb-2 pt-2" htmlFor="inputField">
                <small className="text-red-600">*</small> BS Period To
              </label>
              <DatePicker
                className="w-full px-3 py-2 border-b border-gray-500  bg-white focus:outline-none focus:border-b focus:border-indigo-500"
                selected={new Date(zoneAcForm?.zac_bs_period_to ? zoneAcForm?.zac_bs_period_to : new Date())}
                dateFormat={"dd/MM/yyyy"}
                dropdownMode="select"
                onChange={(date) => {
                  setZoneAcInfo({
                    ...zoneAcForm,
                    zac_bs_period_to: moment(date).format("LL")
                  });
                }}
                onChangeRaw={(e) => {
                  e.preventDefault();
                }}
              />
            </div>
          </div>

          {/* checkboxes  */}

          <div className="flex my-2 mb-2 lg:flex-row flex-col items-center accent-lime-400 py-4 ">
            <div className="w-full px-2">
              {/* <div className="flex items-center whitespace-nowrap">
                <input
                  type="checkbox"
                  id="ownedCheckbox"
                  className="mr-2"
                  value={zoneAcForm?.zac_isinfo}
                  checked={zoneAcForm.zac_isinfo}
                  onChange={(e) => {
                    setZoneAcInfo({
                      ...zoneAcForm,
                      zac_isinfo: e.target.checked
                    });
                  }}
                  disabled={checkBoxStatus || submitZoneAcBy}
                />
                <label htmlFor="ownedCheckbox ">All Furnished Information checked</label>
              </div> */}

              <div className="flex items whitespace-nowrap gap-2 flex-col">
                <p htmlFor="ownedCheckbox">All Furnished Information checked</p>
                <div className="flex gap-2">
                  <input
                    type="radio"
                    checked={zoneAcForm.zac_isinfo === true}
                    onChange={(e) => {
                      setZoneAcInfo({
                        ...zoneAcForm,
                        zac_isinfo: true
                      });
                    }}
                    value={"Yes"}
                  ></input>
                  <label for="html">Yes</label>
                  <input
                    type="radio"
                    checked={zoneAcForm.zac_isinfo === false}
                    onChange={(e) => {
                      setZoneAcInfo({
                        ...zoneAcForm,
                        zac_isinfo: false
                      });
                    }}
                    value="No"
                  ></input>
                  <label for="html">No</label>
                </div>
              </div>
            </div>

            <div className="w-full px-2">
              {/* <div className="flex items-center whitespace-nowrap">
                <input
                  type="checkbox"
                  id="rentedCheckbox"
                  className="mr-2"
                  value={zoneAcForm?.zac_isseqdpt}
                  checked={zoneAcForm.zac_isseqdpt}
                  onChange={(e) => {
                    setZoneAcInfo({
                      ...zoneAcForm,
                      zac_isseqdpt: e.target.checked
                    });
                  }}
                  disabled={checkBoxStatus || submitZoneAcBy}
                />
                <label htmlFor="rentedCheckbox">Security Deposit to be received/realised</label>
              </div> */}
              <div className="flex items whitespace-nowrap gap-2 flex-col">
                <p htmlFor="ownedCheckbox ">Security Deposit to be received/realised</p>
                <div className="flex gap-2">
                  <input
                    type="radio"
                    checked={zoneAcForm.zac_isseqdpt === true}
                    onChange={(e) => {
                      setZoneAcInfo({
                        ...zoneAcForm,
                        zac_isseqdpt: true
                      });
                    }}
                    value="Yes"
                  ></input>
                  <label for="html">Yes</label>
                  <input
                    type="radio"
                    checked={zoneAcForm.zac_isseqdpt === false}
                    onChange={(e) => {
                      setZoneAcInfo({
                        ...zoneAcForm,
                        zac_isseqdpt: false
                      });
                    }}
                    value="No"
                  ></input>
                  <label for="html">No</label>
                </div>
              </div>
            </div>

            <div className="w-full px-2">
              {/* <div className="flex items-center whitespace-nowrap">
                <input
                  type="checkbox"
                  id="rentedCheckbox"
                  className="mr-2"
                  value={zoneAcForm?.zac_blankchq}
                  checked={zoneAcForm?.zac_blankchq}
                  onChange={(e) => {
                    setZoneAcInfo({
                      ...zoneAcForm,
                      zac_blankchq: e.target.checked
                    });
                  }}
                  disabled={checkBoxStatus || submitZoneAcBy}
                />
                <label htmlFor="rentedCheckbox">3 blanks cheque received</label>
              </div> */}

              <div className="flex items whitespace-nowrap gap-2 flex-col">
                <p htmlFor="ownedCheckbox ">3 blanks cheque received</p>
                <div className="flex gap-2">
                  <input
                    type="radio"
                    checked={zoneAcForm.zac_blankchq === true}
                    onChange={(e) => {
                      setZoneAcInfo({
                        ...zoneAcForm,
                        zac_blankchq: true
                      });
                    }}
                    value="Yes"
                  ></input>
                  <label for="html">Yes</label>
                  <input
                    type="radio"
                    checked={zoneAcForm.zac_blankchq === false}
                    onChange={(e) => {
                      setZoneAcInfo({
                        ...zoneAcForm,
                        zac_blankchq: false
                      });
                    }}
                    value="No"
                  ></input>
                  <label for="html">No</label>
                </div>
              </div>
            </div>

            <div className="w-full px-2">
              {/* <div className="flex items-center">
                <input
                  type="checkbox"
                  id="rentedCheckbox"
                  className="mr-2"
                  value={zoneAcForm?.zac_lthead}
                  checked={zoneAcForm?.zac_lthead}
                  onChange={(e) => {
                    setZoneAcInfo({
                      ...zoneAcForm,
                      zac_lthead: e.target.checked
                    });
                  }}
                  disabled={checkBoxStatus || submitZoneAcBy}
                />
                <label htmlFor="rentedCheckbox">3 Letter head received</label>
              </div> */}
              <div className="flex items whitespace-nowrap gap-2 flex-col">
                <p htmlFor="ownedCheckbox ">3 Letter head received</p>
                <div className="flex gap-2">
                  <input
                    type="radio"
                    checked={zoneAcForm.zac_lthead === true}
                    onChange={(e) => {
                      setZoneAcInfo({
                        ...zoneAcForm,
                        zac_lthead: true
                      });
                    }}
                    value="Yes"
                  ></input>
                  <label for="html">Yes</label>
                  <input
                    type="radio"
                    checked={zoneAcForm.zac_lthead === false}
                    onChange={(e) => {
                      setZoneAcInfo({
                        ...zoneAcForm,
                        zac_lthead: false
                      });
                    }}
                    value="No"
                  ></input>
                  <label for="html">No</label>
                </div>
              </div>
            </div>
          </div>

          {(router.query.type === "Edit" || router.query.type === "EditAp") && (
            <div className="flex w-full justify-center gap-4 text-white py-4">
              <button
                disabled={approveZAbtn || submitZoneAcBy}
                onClick={handleZoneAcSubmit}
                // className={`${editZoneAcFrom ? "bg-gray-400" : "bg-green-600"}  px-3 py-1 rounded-sm`}
                className={`${
                  approveZAbtn || submitZoneAcBy ? "bg-gray-400" : "bg-green-600"
                }  px-3 py-1 rounded-sm`}
              >
                Approval
              </button>
              <button
                disabled={approveZAbtn || submitZoneAcBy}
                className={`${
                  approveZAbtn || submitZoneAcBy ? "bg-gray-400" : "bg-red-600"
                } px-3 py-1 rounded-sm`}
              >
                Reject
              </button>
            </div>
          )}
        </div>
      )}

      {/* Unit Head */}

      {unitHeadView && (
        <div className="unit head">
          <div className="flex my-2 mb-2 lg:flex-row flex-col ">
            <div className="w-full px-2">
              <label className="block text-gray-700 text-sm font-bold mb-2 pt-2" htmlFor="inputField">
                <small className="text-red-600">*</small> Unit Head
              </label>
              <input
                className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                type="text"
                id="inputField"
                placeholder="Business Unit"
                value={bunitHead?.bu_user_person}
                disabled={editUnitHeadFrom}
              />
            </div>
            <div className="w-full px-2 ">
              <label className="block text-gray-700 text-sm font-bold mb-2 pt-2" htmlFor="inputField">
                <small className="text-red-600">*</small> Designation
              </label>
              <input
                className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                type="text"
                id="inputField"
                placeholder="Designation"
                value={bunitHead?.bu_id_desig}
                disabled={editUnitHeadFrom}
              />
            </div>
          </div>

          <div className="flex my-2 mb-2 lg:flex-row flex-col ">
            <div className="w-full px-2">
              <label className="block text-gray-700 text-sm font-bold mb-2 pt-2" htmlFor="inputField">
                <small className="text-red-600">*</small> Date of Approval
              </label>
              <DatePicker
                className="w-full px-3 py-2 border-b border-gray-500  bg-white focus:outline-none focus:border-b focus:border-indigo-500"
                // selected={new Date(businessInfoTwo?.year_2 ? businessInfoTwo?.year_2 : "2022")}
                // selected={new Date(bunitHead?.bu_app_date ? bunitHead?.bu_app_date : new Date())}

                selected={
                  new Date(
                    bunitHead?.bu_app_date
                      ? bunitHead?.bu_app_date
                      : zoneAcForm?.zac_app_date
                      ? // ? new Date(zonalMGForm?.z_app_date).getTime() + 24 * 60 * 60 * 1000
                        new Date().getTime()
                      : new Date()
                  )
                }
                // showMonthDropdown
                dateFormat={"dd/MM/yyyy"}
                dropdownMode="select"
                minDate={
                  zoneAcForm?.zac_app_date
                    ? // ? new Date(new Date(zonalMGForm?.z_app_date).getTime() + 86400000)
                      new Date(new Date().getTime())
                    : undefined
                }
                onChange={(date) => {
                  setBunitHead({
                    ...bunitHead,
                    bu_app_date: moment(date).format("LL")
                  });
                }}
                onChangeRaw={(e) => {
                  e.preventDefault();
                }}
              />
            </div>
            <div className="w-full px-2 ">
              <label className="block text-gray-700 text-sm font-bold mb-2 pt-2" htmlFor="inputField">
                <small className="text-red-600">*</small> Status
              </label>
              <input
                className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                type="text"
                id="inputField"
                placeholder="Status"
                value={bunitHead?.bu_id_status}
                disabled
              />
            </div>
          </div>

          {(router.query.type === "Edit" || router.query.type === "EditAp") && (
            <div className="flex w-full justify-center gap-4 text-white py-6">
              <button
                disabled={appBusiBtn || submitBusiBy}
                onClick={handleBunitHeadSubmit}
                className={`${
                  appBusiBtn || submitBusiBy ? "bg-gray-400" : "bg-green-600"
                } px-3 py-1 rounded-sm`}
              >
                Approval
              </button>
              <button
                disabled={appBusiBtn || submitBusiBy}
                className={`${
                  appBusiBtn || submitBusiBy ? "bg-gray-400" : "bg-red-600"
                } px-3 py-1 rounded-sm`}
              >
                Reject
              </button>
            </div>
          )}
        </div>
      )}

      {/* buttons */}
      {/* {router.query.type === "Edit" && (
        <div className="my-6 flex items-center justify-end ">
          <div className="flex items-center justify-center py-4 w-full gap-4 ">
            <button
              onClick={() => props.formType("Assessment")}
              className={`text-center rounded-md hover:bg-green-500 ${
                formActive ? "bg-green-400" : "bg-gray-400"
              }  text-white py-1 px-4 text-lg`}
            >
              Prev
            </button>
            <button
              // onClick={() => props.formType("Agreement")}
              onClick={nextTabHandler}
              className="text-center rounded-md bg-orange-500 text-white py-1 px-4 text-lg"
            >
              Next
            </button>
          </div>
        </div>
      )} */}
    </form>
  );
};

export default Approval;
