import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import axios from "axios";
import { url } from "@/constants/url";
import { useRouter } from "next/router";
import toast, { Toaster } from "react-hot-toast";
import { businessUnit } from "../ChartReports/sample";

const ApprovalResign = (props) => {
  const router = useRouter();
  const [formActive, setFormActive] = useState(false);
  const [localInfo, setLocalInfo] = useState("");

  const [terriForm, setTerriInfo] = useState({
    t_id: "",
    t_user_person: "",
    t_user_id: "",
    t_id_desig: "",
    t_app_date_resig: "",
    app_status: "",
    t_id_status_resig: ""
  });

  const [rdmForm, setrdmForm] = useState({
    rdm_id: "",
    rdm_name: "",
    rdm_user_id: "",
    rdm_id_desig: "",
    rdm_app_date: "",
    rdm_app_date_resig: "",
    app_status: "",
    rdm_id_status: "",
    rdm_id_status_resig: ""
  });

  const [zdmForm, setzdmForm] = useState({
    zdm_id: "",
    zdm_name: "",
    zdm_user_id: "",
    zdm_id_desig: "",
    zdm_app_date: "",
    zdm_app_date_resig: "",
    app_status: "",
    zdm_id_status: "",
    zdm_id_status_resig: ""
  });

  const [regionForm, setRegionForm] = useState({
    r_id: "",
    r_person: "",
    r_user_id: "",
    r_id_desig: "",
    r_app_date_resig: "",
    r_visited_resig: "",
    r_docuv_resig: "",
    r_id_status_resig: ""
  });

  const [zonalMGForm, setZonalMGForm] = useState({
    z_id: "",
    z_user_person: "",
    z_user_id: "",
    z_id_desig: "",
    z_app_date_resig: "",
    z_visited_resig: "",
    z_docuv_resig: "",
    z_id_status_resig: ""
    // r_id_status: "",
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

  const [bunitHead, setBunitHead] = useState({
    bu_id: "",
    bu_user_person: "",
    bu_user_id: "",
    bu_id_desig: "",
    bu_app_date_resig: "",
    bu_id_status_resig: ""
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
  const [rdmView, setRdmView] = useState(null);
  const [zdmView, setzdmView] = useState(null);
  const [unitHeadView, setUnitHeadView] = useState(null);
  const [editTerriFrom, setEditTerriForm] = useState(null);
  const [editRdmFrom, setEditRdmForm] = useState(null);
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

  const [rdmSubBtn, setRdmSubBtn] = useState(null);
  const [zdmSubBtn, setzdmSubBtn] = useState(null);

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
          // t_app_date: props?.data[0]?.t_app_date
          t_app_date_resig: props?.data?.t_app_date_resig,
          t_id_status_resig: props?.data?.t_id_status_resig || "Pending Acceptance Resignation by TM"
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
          r_app_date_resig: props?.data?.r_app_date_resig,
          r_visited_resig: props?.data?.r_visited_resig,
          r_id_status: props?.data?.r_id_status || "Pending for Approve",
          r_docuv_resig: props?.data?.r_docuv_resig,
          r_id_status_resig: props?.data?.r_id_status_resig || "Pending Acceptance Resignation by RM"
        });
        setSubBtn(true);
      }

      if (role_Id == 4) {
        setZonalMGForm({
          ...zonalMGForm,
          z_id: JSON?.parse(userinfo)?.z_id,
          z_user_person: userName,
          z_id_desig: JSON?.parse(userinfo)?.U_profile_name,
          z_app_date_resig: props?.data?.z_app_date_resig,
          z_user_id: JSON?.parse(userinfo)?.user_id,
          z_visited_resig: props?.data?.z_visited_resig,
          z_docuv_resig: props?.data?.z_docuv_resig,
          z_id_status: props?.data?.z_id_status || "Pending for Approve",
          z_id_status_resig: props?.data?.z_id_status_resig || "Pending Acceptance Resignation by ZM"
        });
      }

      if (role_Id == 3) {
        setBunitHead({
          ...bunitHead,
          bu_id: JSON?.parse(userinfo)?.bu_id,
          bu_user_person: userName,
          bu_user_id: JSON?.parse(userinfo)?.user_id,
          bu_id_desig: JSON?.parse(userinfo)?.U_profile_name,
          bu_app_date_resig: props?.data?.bu_app_date_resig,
          // bu_id_status: props?.data?.bu_id_status || "Pending for Approve"
          bu_id_status_resig: props?.data?.bu_id_status_resig || "Pending Acceptance Resignation by BU"
        });
      }

      if (role_Id == 9) {
        setrdmForm({
          ...rdmForm,
          rdm_id: JSON?.parse(userinfo)?.rdm_id,
          rdm_name: userName,
          rdm_user_id: JSON?.parse(userinfo)?.user_id,
          rdm_id_desig: JSON?.parse(userinfo)?.U_profile_name,
          rdm_app_date: props?.data?.rdm_app_date,
          rdm_id_status: props?.data?.rdm_id_status || "Pending for Approve"
        });
      }

      //super admin to show all the data

      if (role_Id == 1 || role_Id == 8) {
        setTerriInfo({
          ...terriForm,
          t_id: JSON?.parse(userinfo)?.t_id,
          t_user_person: props?.data?.t_id_desig,
          t_user_id: JSON?.parse(userinfo)?.user_id,
          // t_id_desig: JSON?.parse(userinfo)?.U_profile_name,
          t_id_desig: props?.data?.t_id_desig,
          t_app_date_resig: props?.data?.t_app_date_resig
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
          r_app_date_resig: props?.data?.r_app_date_resig,
          r_visited_resig: props?.data?.r_visited_resig,
          r_id_status: props?.data?.r_id_status,
          r_docuv_resig: props?.data?.r_docuv_resig
        });

        setZonalMGForm({
          ...zonalMGForm,
          z_id: JSON?.parse(userinfo)?.z_id,
          z_user_person: userName,
          // z_id_desig: JSON?.parse(userinfo)?.U_profile_name,
          z_id_desig: props?.data?.z_id_desig,
          z_app_date_resig: props?.data?.z_app_date_resig,
          z_user_id: JSON?.parse(userinfo)?.user_id,
          z_visited_resig: props?.data?.z_visited_resig,
          z_docuv_resig: props?.data?.z_docuv_resig,
          z_id_status: props?.data?.z_id_status
        });

        setBunitHead({
          ...bunitHead,
          bu_id: JSON?.parse(userinfo)?.bu_id,
          bu_user_person: userName,
          bu_user_id: JSON?.parse(userinfo)?.user_id,
          // bu_id_desig: JSON?.parse(userinfo)?.U_profile_name,
          bu_id_desig: props?.data?.bu_id_desig,
          bu_app_date_resig: props?.data?.bu_app_date_resig,
          bu_id_status: props?.data?.bu_id_status
        });
      }
    }
  }, [role_Id]);

  useEffect(() => {
    switch (role_Id) {
      case 4:
        setTerriView(true);
        setRegionView(true);
        setRdmView(true);
        setzdmView(true);
        // setZoneAcView(true);
        setZoneMgView(true);
        setEditTerriForm(true);
        setEditZoneAcForm(true);
        setEditRegionForm(true);
        break;
      case 5:
        setTerriView(true);
        // setZoneAcView(true);
        setRdmView(true);

        setRegionView(true);
        setEditTerriForm(true);
        setEditZoneAcForm(true);
        break;
      case 6:
        setTerriView(true);
        break;
      case 3:
        setTerriView(true);
        setRdmView(true);
        setzdmView(true);
        // setZoneAcView(true);
        // setEditZoneAcForm(true);
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

        setRdmView(true);
        setzdmView(true);
        break;

      case 8:
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
        setRdmView(true);
        setzdmView(true);
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

      //RDM
      case 9:
        setTerriView(true);
        setEditTerriForm(true);
        if (localInfo?.position === "RDM") {
          // For RDM
          setRdmView(true);
          setEditRdmForm(true);
          // Hide Region and ZDM views by default
          setRegionView(false);
          setzdmView(false);
        } else if (localInfo?.position === "ZDM") {
          // else if (props?.data?.zdm_desig === "Zone Development Manager") {
          // For ZDM
          setRdmView(true);
          setRdmView(true);

          setEditRdmForm(true);

          // Show/hide based on approval status
          if (props?.data?.rdm_id_status !== "Recommended") {
            setRegionView(false);
            setzdmView(false);
          } else if (
            props?.data?.rdm_id_status === "Recommended" &&
            props?.data?.r_id_status !== "Approved"
          ) {
            setRegionView(true);
            setzdmView(false);
          } else if (
            props?.data?.rdm_id_status === "Recommended" &&
            props?.data?.r_id_status === "Approved"
          ) {
            setRegionView(true);
            setzdmView(true);
          }
        }
        break;
      // For Region (role_Id === 5)
      case 5:
        setTerriView(true);
        setRdmView(true);
        setRegionView(true);
        setEditTerriForm(true);
        setEditRdmForm(true);
        setEditRegionForm(true);

        // Hide ZDM for Region login
        setzdmView(false);

        // Only show Region if RDM has recommended
        if (props?.data?.rdm_id_status !== "Recommended") {
          setRegionView(false);
        }
        break;

      default:
    }
  }, [role_Id]);

  //Whatsapp Message Sender

  async function whatsAppMsg(recipientMob, mrname, mrtwo, emp_name, address, emergency_conno, pemail, bst) {
    try {
      const payLoad = {
        recipient: String(recipientMob),
        tem_id: "632981",
        placeholders: [mrname, mrtwo, emp_name, address, emergency_conno, pemail, bst]
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

  // useEffect(()=>{
  //   sendWhatsApp()
  // },[])

  //////////////////////////////////  Handle Territory Submission ///////////////////////////////////////////////

  const handleTerriSubmit = async () => {
    //Extracting Data For WhatsApp Message:

    const {
      r_mobile_no,
      rdm_mobile_no,
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
      caddress,
      region_name,
      zone_name,
      business_unit_name,
      fname,
      mname,
      lname,
      bu,
      region,
      zone,
      territory,
      emergency_conno,
      phone_number,
      reporting_hq,
      rdm_name
    } = props?.data;
    const emp_name = `${fname} ${mname} ${lname}`;
    const bst = `${business_unit_name}--${zone_name}--${region_name}--${territory_name}--${reporting_hq}`;

    // const bst = territory_name + "-" + region_name + "-" + zone_name + "-" + business_unit_name;

    // whatsAppMsg(
    // //  "7277766100",
    //  rdm_mobile_no,
    //  // r_hod_name,
    //  rdm_name,
    //  t_hod_name,
    //  emp_name,
    //  caddress,
    //  phone_number,
    //  pemail,
    //  bst
    // );

    try {
      const { t_app_date_resig, t_id_desig, t_id_status_resig, t_user_id, t_id } = terriForm;

      if ((!t_app_date_resig, !t_id_desig, !t_id_status_resig, !t_user_id, !t_id)) {
        throw new Error("All fields must be filled");
      }
      const data = {
        t_id,
        t_user_id,
        t_app_date_resig: t_app_date_resig ? t_app_date_resig : new Date(),
        t_id_desig,
        t_id_status_resig,
        t: true,
        approval: true,
        // app_status: "Submitted By Territory"
        app_status: "Resignation Accepted By TM",
        t_id_status_resig: "Resignation Accepted By TM"
        // d_id: props.data[0].d_id
      };
      console.log("Click", data);
      // return;
      const res = await axios.put(
        `${url}/api/update_resignation_status/${router.query.id}`,
        JSON.stringify(data),
        {
          headers: headers
        }
      );
      const resApi = await res.data;
      if (!resApi) return;
      // toast.success("Territory Updated Successfully !");
      toast.success("Resignation Updated Successfully !");
      setSubBtn(true);
      whatsAppMsg(
        //  "7277766100",
        rdm_mobile_no,
        // r_hod_name,
        rdm_name,
        t_hod_name,
        emp_name,
        caddress,
        phone_number,
        pemail,
        bst
      );

      setTimeout(() => {
        router.push("/table/table_employee_resign?name=Employee Resignation Process");
      }, 1000);
    } catch (error) {
      const errorMessage = error?.response?.data?.message;
      toast.error(errorMessage);
      console.log("errr", error);
    }
  };

  ///////////////////////////////////////Handle RDM Submission ////////////////////////////////////////////////

  const handleRdmSubmit = async () => {
    const dateOne = new Date(terriForm?.t_app_date).toDateString();
    const dateTwo = new Date(
      rdmForm?.rdm_app_date_resig ? rdmForm?.rdm_app_date_resig : new Date()
    ).toDateString();

    if (new Date(dateTwo) < new Date(dateOne)) {
      toast.error("Can't select the lesser date");
      return;
    }

    const {
      business_unit_name,
      region_name,
      zone_name,
      territory_name,
      fname,
      mname,
      lname,
      caddress,
      phone_number,
      pemail,
      r_hod_name,
      t_hod_name,
      rdm_name,
      rdm_mobile_no,
      r_mobile_no
    } = props.data;

    try {
      const {
        rdm_id,
        rdm_name,
        rdm_user_id,
        rdm_id_desig,
        rdm_id_status,
        rdm,
        rdm_app_date,
        rdm_app_date_resig
      } = rdmForm;

      const emp_name = `${fname} ${mname} ${lname}`;
      const bst = `${business_unit_name}-${region_name}-${zone_name}-${territory_name}`;

      // whatsAppMsg(
      //   "7277766100",
      //   // rdm_mobile_no,
      //   r_hod_name,
      //   rdm_name,
      //   emp_name,
      //   caddress,
      //   phone_number,
      //   pemail,
      //   bst
      // );

      const data = {
        rdm_id,
        rdm_name,
        rdm_app_date: rdm_app_date ? rdm_app_date : new Date(),
        rdm_app_date_resig: rdm_app_date_resig ? rdm_app_date_resig : new Date(),
        rdm_user_id,
        rdm_id_desig,
        rdm: true,
        approval: true,
        // rdm_id_status: "Recommended",
        rdm_id_status_resig: "Recommended",
        // app_status: "Recommended By RDM"
        app_status: "Resignation Recommended By RDM"
      };

      console.log("rdmdata", data);

      // return;
      const res = await axios.put(
        `${url}/api/update_resignation_status/${router.query.id}`,
        JSON.stringify(data),
        {
          headers: headers
        }
      );
      const resApi = await res.data;
      if (!resApi) return;
      toast.success("RDM Recommended Successfully !");
      setRdmSubBtn(true);
      whatsAppMsg(
        // "7277766100",
        r_mobile_no,
        r_hod_name,
        rdm_name,
        emp_name,
        caddress,
        phone_number,
        pemail,
        bst
      );
    } catch (error) {
      console.log(error);
    }
  };

  //////////////////////////////////  Handle Region Submission ///////////////////////////////////////////////

  const handleRegionSubmit = async () => {
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
      business_unit_name,
      fname,
      mname,
      lname,
      bu,
      region,
      zone,
      territory,
      r_mobile_no,
      t_hod_name,
      phone_number,
      caddress,
      reporting_hq,
      zdm_mobile_no,
      zdm_name,
      rdm_name
    } = props?.data;
    const emp_name = `${fname} ${mname} ${lname}`;
    const bst = `${business_unit_name}--${zone_name}--${region_name}--${territory_name}--${reporting_hq}`;
    // const bst = territory_name + "-" + region_name + "-" + zone_name + "-" + business_unit_name;
    const dateOne = new Date(rdmForm?.rdm_app_date).toDateString();
    const dateTwo = new Date(
      regionForm?.r_app_date_resig ? regionForm?.r_app_date_resig : new Date()
    ).toDateString();

    // whatsAppMsg(
    //   "7277766100",
    //   // zdm_mobile_no,
    //   zdm_name,
    //   rdm_name,
    //   emp_name,
    //   caddress,
    //   phone_number,
    //   pemail,
    //   bst
    // );

    if (new Date(dateTwo) < new Date(dateOne)) {
      toast.error("Can't select the lesser date");
      return;
    }
    try {
      const {
        r_id,
        r_user_id,
        r_id_desig,
        r_app_date_resig,
        r_visited_resig,
        r_docuv_resig,
        r_id_resig_status
      } = regionForm;

      const data = {
        r_id,
        r_user_id,
        r_id_desig,
        r_app_date_resig: r_app_date_resig
          ? r_app_date_resig
          : moment(terriForm?.t_app_date_resig).format("MMMM D YYYY"),
        r_visited_resig,
        r_docuv_resig,
        r: true,
        approval: true,
        // r_id_status: "Approved",
        r_id_status_resig: "Resignation Accepted By RM",
        app_status: "Resignation Accepted By RM"
      };

      console.log("CLICKR", data);
      // return;
      const res = await axios.put(
        `${url}/api/update_resignation_status/${Number(router.query.id)}`,
        JSON.stringify(data),
        {
          headers: headers
        }
      );
      const resApi = await res.data;
      if (!resApi) return;
      toast.success("Resignation Updated Successfully !");
      setapproveRegionbtn(true);
      whatsAppMsg(
        // "7277766100",
        zdm_mobile_no,
        zdm_name,
        rdm_name,
        emp_name,
        caddress,
        phone_number,
        pemail,
        bst
      );
    } catch (error) {
      const errorMessage = error?.response?.data?.message;

      toast.error(errorMessage);
    }
  };

  /////////////////////////////////// Handle ZDM Submission ///////////////////////////////////////////////

  const handleZdmSubmit = async () => {
    const dateOne = new Date(regionForm?.r_app_date_resig).toDateString();
    const dateTwo = new Date(
      zdmForm?.zdm_app_date_resig ? zdmForm?.zdm_app_date_resig : new Date()
    ).toDateString();

    if (new Date(dateTwo) < new Date(dateOne)) {
      toast.error("Can't select the lesser date");
      return;
    }

    const {
      business_unit_name,
      region_name,
      zone_name,
      territory_name,
      fname,
      mname,
      lname,
      caddress,
      phone_number,
      pemail,
      r_hod_name,
      z_user_Person,
      zdm_name,
      z_mobile_no
    } = props.data;

    try {
      const { zdm_id, zdm_name, zdm_user_id, zdm_id_desig, zdm_id_status, zdm_app_date, zdm_app_date_resig } =
        zdmForm;
      // if (!zdm_id, !zdm_name, !zdm_user_id, !zdm_id_desig, !zdm_id_status, !zdm_app_date) {
      //   throw new Error("All fields must be filled");
      // }

      const emp_name = `${fname} ${mname} ${lname}`;
      const bst = `${business_unit_name}-${region_name}-${zone_name}-${territory_name}`;

      const data = {
        zdm_id,
        zdm_name,
        zdm_user_id,
        zdm_id_desig,
        zdm: true,
        approval: true,
        zdm_app_date_resig: zdm_app_date_resig ? zdm_app_date_resig : new Date(),
        // zdm_id_status: "Recommended",
        zdm_id_status_resig: "Recommended",
        // app_status: "Recommended By ZDM"
        app_status: "Resignation Recommended By ZDM"
      };
      console.log("data", data);

      // whatsAppMsg(
      //   z_mobile_no,
      //   z_user_Person,
      //   zdm_name,
      //   emp_name,
      //   caddress,
      //   phone_number,
      //   pemail,
      //   bst
      // );

      //  return
      const res = await axios.put(
        `${url}/api/update_resignation_status/${router.query.id}`,
        JSON.stringify(data),
        {
          headers: headers
        }
      );
      const resApi = await res.data;
      if (!resApi) return;
      toast.success("ZDM Recommended Successfully !");
      setzdmSubBtn(true);
      whatsAppMsg(z_mobile_no, z_user_Person, zdm_name, emp_name, caddress, phone_number, pemail, bst);
    } catch (error) {
      console.log(error);
    }
  };

  //////////////////////////////////  Handle Zonal Submission ///////////////////////////////////////////////

  const handleZonalManagerSubmit = async () => {
    const {
      zac_mobile_no,
      z_mobile_no,
      zac_hod_name,
      zac_user_Person,
      r_user_Person,
      r_hod_name,
      bu_hod_name,
      z_hod_name,
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
      business_unit_name,
      fname,
      mname,
      lname,
      bu,
      region,
      zone,
      territory,
      caddress,
      phone_number,
      bu_mobile_no,
      grade,
      reporting_hq
    } = props?.data;
    const emp_name = `${fname} ${mname} ${lname}`;
    // const bst = territory_name + "-" + region_name + "-" + zone_name + "-" + business_unit_name;
    const bst = `${business_unit_name}--${zone_name}--${region_name}--${territory_name}--${reporting_hq}`;

    // whatsAppMsg(
    //   "7277766100",
    //   // bu_mobile_no,
    //   bu_hod_name,
    //   z_hod_name,
    //   emp_name,
    //   caddress,
    //   phone_number,
    //   pemail,
    //   bst
    // );

    const dateOne = new Date(zdmForm?.zdm_app_date_resig).toDateString();
    const dateTwo = new Date(
      zonalMGForm?.z_app_date_resig ? zonalMGForm?.z_app_date_resig : new Date()
    ).toDateString();

    if (new Date(dateTwo) < new Date(dateOne)) {
      toast.error("Can't select the lesser date");
      return;
    }
    try {
      const {
        z_id,
        z_user_person,
        z_user_id,
        z_id_desig,
        z_app_date_resig,
        z_visited_resig,
        z_docuv_resig,
        z_id_status_resig
      } = zonalMGForm;

      const data = {
        z_id,
        z_user_person,
        z_user_id,
        z_id_desig,
        z_app_date_resig: z_app_date_resig
          ? z_app_date_resig
          : // : moment(regionForm?.r_app_date).add(1, "day").format("MMMM D YYYY"),
            moment(zdmForm?.zdm_app_date_resig).format("MMMM D YYYY"),
        z_visited_resig,
        z_docuv_resig,
        z: true,
        approval: true,
        // z_id_status: "Approved",
        z_id_status_resig: "Resignation Accepted By ZM",
        app_status: "Resignation Accepted By ZM"
      };

      console.log("ZMDATA", data);

      // return;
      const res = await axios.put(
        `${url}/api/update_resignation_status/${router.query.id}`,
        JSON.stringify(data),
        {
          headers: headers
        }
      );
      const resApi = await res.data;
      if (!resApi) return;
      toast.success("Resignation Updated Successfully !");
      setAppZonalManBtn(true);
      if (grade.includes("D")) {
        whatsAppMsg(bu_mobile_no, bu_hod_name, z_hod_name, emp_name, caddress, phone_number, pemail, bst);
      }
    } catch (error) {
      const errorMessage = error?.response?.data?.message;

      toast.error(errorMessage);
      // toast.error(error.message);
    }
  };

  //////////////////////////////////  Handle Zone A/c Submission ///////////////////////////////////////////////

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
    } = props?.data;

    const bst = territory_name + "-" + region_name + "-" + zone_name + "-" + business_unit_name;

    //Conditions for SAP and Security Validation

    // if (!props?.data[0]?.SAP_SalesOrg) {
    //   toast.error("Fill the SAP Details First");
    //   return;
    // }

    const dateOne = new Date(zonalMGForm?.z_app_date_resig).toDateString();
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
      const res = await axios.put(`${url}/api/update_emp_info/${router.query.id}`, JSON.stringify(data), {
        headers: headers
      });
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

  //////////////////////////////////  Handle Business Head Unit Submission ///////////////////////////////////////////////

  const handleBunitHeadSubmit = async () => {
    // const dateOne = new Date(zoneAcForm?.zac_app_date).toDateString();
    const dateOne = new Date(zonalMGForm?.z_app_date_resig).toDateString();
    const dateTwo = new Date(
      bunitHead?.bu_app_date_resig ? bunitHead?.bu_app_date_resig : new Date()
    ).toDateString();

    if (new Date(dateTwo) < new Date(dateOne)) {
      toast.error("Can't select the lesser date");
      return;
    }

    try {
      const { bu_id, bu_user_person, bu_user_id, bu_id_desig, bu_app_date_resig, bu_id_status_resig } =
        bunitHead;

      const data = {
        bu_id,
        bu_user_person,
        bu_user_id,
        bu_id_desig,
        bu_app_date_resig: bu_app_date_resig ?? new Date().toDateString(),
        // bu_app_date_resig: bu_app_date_resig
        //   ? bu_app_date_resig
        //   : // : moment(zonalMGForm?.z_app_date).add(1, "day").format("MMMM D YYYY"),
        //     moment(zoneAcForm?.zac_app_date).format("MMMM D YYYY"),
        bu: true,
        approval: true,
        // bu_id_status: "Approved",
        bu_id_status_resig: "Resignation Accepted By BU",
        app_status: "Resignation Accepted By BU"
      };

      console.log("BUDATA", data);

      // return;
      const res = await axios.put(
        `${url}/api/update_resignation_status/${router.query.id}`,
        JSON.stringify(data),
        {
          headers: headers
        }
      );
      const resApi = await res.data;
      if (!resApi) return;
      toast.success("Resignation Updated Successfully !");
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
        `${url}/api/get_employee?t=true&additional_data=true&e_id=${router.query.id}`,
        { headers: headers }
      );
      const resapi = await res.data.data;
      // console.log("Ddd", resapi);
      setRegionNumber(resapi[0]?.r_mobile_no);
      setRegionName(resapi[0]?.r_mobile_no);
      setTerriInfo({
        ...terriForm,
        t_user_person: resapi?.t_user_Person,
        // t_user_id: localInfo?.user_id,
        t_user_id: resapi?.user_id,
        // t_id_desig: localInfo?.t_id_desig,
        t_id_desig: resapi?.t_id_desig,
        t_id_status_resig: resapi?.t_id_status_resig ?? "Pending Acceptance Resignation by TM",
        t_app_date_resig: props?.data?.t_app_date_resig
        // t_app_date: resapi[0]?.t_app_date
      });

      setrdmForm({
        ...rdmForm,
        rdm_id: resapi?.rdm_id,
        rdm_name: resapi?.rdm_name,
        rdm_user_id: resapi?.rdm_user_id,
        rdm_id_desig: resapi?.rdm_desig,
        rdm_app_date: resapi?.rdm_app_date,
        rdm_id_status: resapi?.rdm_id_status,
        rdm_id_status_resig: resapi?.rdm_id_status_resig
      });

      setRdmSubBtn(resapi?.rdm_id_status_resig == "Recommended" ? true : false);

      setRegionForm({
        ...regionForm,
        r_id: resapi?.r_id,
        r_person: resapi?.r_user_Person,
        r_user_id: resapi?.r_user_id,
        r_id_desig: resapi?.r_id_desig,
        r_app_date: resapi?.r_app_date,
        r_id_status: resapi?.r_id_status,
        r_id_status_resig: resapi?.r_id_status_resig,
        r_visited_resig: resapi?.r_visited_resig,
        r_docuv_resig: resapi?.r_docuv_resig
      });
      // setCheckBoxRegionStatus(true);
      // setapproveRegionbtn(true);

      setzdmForm({
        ...zdmForm,
        zdm_id: resapi?.zdm_id,
        zdm_name: resapi?.zdm_name,
        zdm_user_id: resapi?.zdm_user_id,
        zdm_id_desig: resapi?.zdm_desig,
        zdm_app_date: resapi?.zdm_app_date,
        zdm_app_date_resig: resapi?.zdm_app_date_resig,
        zdm_id_status: resapi?.zdm_id_status,
        zdm_id_status_resig: resapi?.zdm_id_status_resig
      });
      setzdmSubBtn(resapi?.zdm_id_status_resig == "Recommended" ? true : false);

      setZonalMGForm({
        z_id: resapi?.z_id,
        z_user_person: resapi?.z_user_Person,
        z_id_desig: resapi?.z_id_desig,
        z_app_date_resig: resapi?.z_app_date_resig,
        z_visited_resig: resapi?.z_visited_resig,
        z_docuv_resig: resapi?.z_docuv_resig,
        z_id_status_resig: resapi?.z_id_status_resig
      });

      setAppZonalManBtn(resapi?.z_id_status_resig == "Resignation Accepted By ZM" ? true : false);

      // setCheckBoxZonalMan(true);
      // setAppZonalManBtn(true);
    } catch (error) {
      console.log("Err", error);
    }
  }

  async function getDealerInfoAPIZoneAc(localInfo) {
    try {
      const res = await axios.get(
        `${url}/api/get_employee?za=true&additional_data=true&e_id=${router.query.id}`,
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
        t_app_date_resig: resapi[0]?.t_app_date_resig
      });

      setRegionForm({
        r_id: resapi[0]?.r_id,
        r_person: resapi[0]?.r_user_Person,
        r_user_id: resapi[0]?.r_user_id,
        r_id_desig: resapi[0]?.r_id_desig,
        r_app_date_resig: resapi[0]?.r_app_date_resig,
        r_id_status: resapi[0]?.r_id_status,
        r_visited_resig: resapi[0]?.r_visited_resig,
        r_docuv_resig: resapi[0]?.r_docuv_resig
      });
      setCheckBoxRegionStatus(true);
      setapproveRegionbtn(true);

      setZonalMGForm({
        z_id: resapi[0]?.z_id,
        z_user_person: resapi[0]?.z_user_Person,
        z_id_desig: resapi[0]?.z_id_desig,
        z_app_date_resig: resapi[0]?.z_app_date_resig,
        z_visited_resig: resapi[0]?.z_visited_resig,
        z_docuv_resig: resapi[0]?.z_docuv_resig,
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
        `${url}/api/get_employee?r=true&additional_data=true&e_id=${router.query.id}`,
        { headers: headers }
      );
      const resapi = await res.data.data;

      setTerriInfo({
        ...terriForm,
        t_id: resapi?.t_d,
        t_user_person: resapi?.t_user_Person ?? "",
        t_user_id: resapi?.t_user_id,
        t_id_desig: resapi?.t_id_desig ?? "",
        t_app_date_resig: resapi?.t_app_date_resig,
        t_id_status: resapi?.t_id_status,
        t_id_status_resig: resapi?.t_id_status_resig
      });
      setSubBtn(true);

      setRegionForm({
        ...regionForm,
        r_id: resapi?.r_id,
        r_person: resapi?.r_user_Person,
        r_user_id: resapi?.r_user_id,
        r_id_desig: resapi?.r_id_desig,
        r_app_date_resig: resapi?.r_app_date_resig,
        r_id_status: resapi?.r_id_status,
        r_visited_resig: resapi?.r_visited_resig,
        r_docuv_resig: resapi?.r_docuv_resig,
        r_id_status_resig: resapi?.r_id_status_resig
      });
      setCheckBoxRegionStatus(true);
      setapproveRegionbtn(true);
      setrdmForm({
        ...rdmForm,
        rdm_id: resapi?.rdm_id,
        rdm_name: resapi?.rdm_name,
        rdm_user_id: resapi?.rdm_user_id,
        rdm_id_desig: resapi?.rdm_desig,
        rdm_app_date: resapi?.rdm_app_date,
        rdm_app_date_resig: resapi?.rdm_app_date_resig,
        rdm_id_status: resapi?.rdm_id_status,
        rdm_id_status_resig: resapi?.rdm_id_status_resig
      });

      setRdmSubBtn(resapi?.rdm_id_status == "Pending For Reccomended" ? false : true);

      setzdmForm({
        ...zdmForm,
        zdm_id: resapi?.zdm_id,
        zdm_name: resapi?.zdm_name,
        zdm_user_id: resapi?.zdm_user_id,
        zdm_id_desig: resapi?.zdm_desig,
        zdm_app_date: resapi?.zdm_app_date,
        zdm_app_date_resig: resapi?.zdm_app_date_resig,
        zdm_id_status: resapi?.zdm_id_status,
        zdm_id_status_resig: resapi?.zdm_id_status_resig
      });
      setzdmSubBtn(resapi?.zdm_id_status == "Pending For Reccomended" ? false : true);
    } catch (error) {
      console.log("Err", error);
    }
  }

  async function getDealerInfoAPIZoneMg(localInfo) {
    try {
      const res = await axios.get(
        `${url}/api/get_employee?z=true&additional_data=true&e_id=${router.query.id}`,
        { headers: headers }
      );
      const resapi = await res.data.data;

      setTerriInfo({
        ...terriForm,
        t_id: resapi?.t_d,
        t_user_person: resapi?.t_user_Person,
        t_user_id: resapi?.t_user_id,
        t_id_desig: resapi?.t_id_desig,
        t_app_date_resig: resapi?.t_app_date_resig,
        t_id_status: resapi?.t_id_status,
        t_id_status_resig: resapi?.t_id_status_resig
      });
      setSubBtn(true);

      setRegionForm({
        ...regionForm,
        r_id: resapi?.r_id,
        r_person: resapi?.r_user_Person,
        r_user_id: resapi?.r_user_id,
        r_id_desig: resapi?.r_id_desig,
        r_app_date_resig: resapi?.r_app_date_resig,
        r_id_status: resapi?.r_id_status,
        r_visited_resig: resapi?.r_visited_resig,
        r_docuv_resig: resapi?.r_docuv_resig,
        r_id_status_resig: resapi?.r_id_status_resig
      });
      setCheckBoxRegionStatus(true);
      setapproveRegionbtn(true);

      setZonalMGForm({
        ...zonalMGForm,
        z_id: resapi?.z_id,
        z_user_person: resapi?.z_user_Person,
        z_id_desig: resapi?.z_id_desig,
        z_app_date_resig: resapi?.z_app_date_resig,
        // z_user_id: JSON?.parse(userinfo)?.user_id,

        z_visited_resig: resapi?.z_visited_resig,
        z_docuv_resig: resapi?.z_docuv_resig,
        // z_id_status: props?.data?.[0]?.z_id_status,
        z_id_status: resapi?.z_id_status,
        z_id_status_resig: resapi?.z_id_status_resig
      });

      setCheckBoxZonalMan(true);
      setAppZonalManBtn(true);

      setrdmForm({
        ...rdmForm,
        rdm_id: resapi?.rdm_id,
        rdm_name: resapi?.rdm_name,
        rdm_user_id: resapi?.rdm_user_id,
        rdm_id_desig: resapi?.rdm_desig,
        rdm_app_date: resapi?.rdm_app_date,
        rdm_id_status: resapi?.rdm_id_status,
        rdm_id_status_resig: resapi?.rdm_id_status_resig
      });
      setRdmSubBtn(resapi?.rdm_id_status_resig == "Recommended" ? true : false);

      setzdmForm({
        ...zdmForm,
        zdm_id: resapi?.zdm_id,
        zdm_name: resapi?.zdm_name,
        zdm_user_id: resapi?.zdm_user_id,
        zdm_id_desig: resapi?.zdm_desig,
        zdm_app_date: resapi?.zdm_app_date,
        zdm_id_status: resapi?.zdm_id_status,
        zdm_id_status_resig: resapi?.zdm_id_status_resig
      });
    } catch (error) {
      console.log("Err", error);
    }
  }

  async function getDealerInfoAPIBusiUnit(localInfo) {
    try {
      const res = await axios.get(`${url}/api/get_employee?bu=true&additional_data=true`, {
        headers: headers
      });
      const resapi = await res.data.data;

      setTerriInfo({
        t_id: resapi?.t_d,
        t_user_person: resapi?.t_user_Person,
        t_user_id: resapi?.t_user_id,
        t_id_desig: resapi?.t_id_desig,
        t_app_date_resig: resapi?.t_app_date_resig,
        t_id_status: resapi?.t_id_status
      });
      setSubBtn(true);

      setZoneAcInfo({
        ...zoneAcForm,
        zac_person: resapi?.zac_user_Person,
        zac_user_id: resapi?.zac_user_id,
        zac_id_desig: resapi?.zac_id_desig,
        zac_app_date: resapi?.zac_app_date,
        zac_id_status: resapi?.zac_id_status,
        zac_isinfo: resapi?.zac_isinfo,
        zac_isseqdpt: resapi?.zac_isseqdpt,
        zac_blankchq: resapi?.zac_blankchq,
        zac_lthead: resapi?.zac_lthead,
        app_status: resapi?.t_app_date_resig
      });
      setCheckBoxStatus(true);
      setapproveZAbtn(true);

      setRegionForm({
        r_id: resapi?.r_id,
        r_person: resapi?.r_user_Person,
        r_user_id: resapi?.r_user_id,
        r_id_desig: resapi?.r_id_desig,
        r_app_date_resig: resapi?.r_app_date_resig,
        r_id_status: resapi?.r_id_status,
        r_visited_resig: resapi?.r_visited_resig,
        r_docuv_resig: resapi?.r_docuv_resig
      });
      setCheckBoxRegionStatus(true);
      setapproveRegionbtn(true);

      setZonalMGForm({
        z_id: resapi?.z_id,
        z_user_person: resapi?.z_user_Person,
        z_id_desig: resapi?.z_id_desig,
        z_app_date_resig: resapi?.z_app_date_resig,
        // z_user_id: JSON?.parse(userinfo)?.user_id,
        z_visited_resig: resapi?.z_visited_resig,
        z_docuv_resig: resapi?.z_docuv_resig,
        // z_id_status: props?.data?.?.z_id_status,
        z_id_status: resapi?.z_id_status
      });

      setCheckBoxZonalMan(true);
      setAppZonalManBtn(true);
    } catch (error) {
      console.log("Err", error);
    }
  }

  ////////////////////////  Getting all the Datas for Specific Role_ID  ////////////////////////////////

  async function getDealerInfoALL(localInfo) {
    try {
      const res = await axios.get(`${url}/api/get_employee?additional_data=true&e_id=${router.query.id}`, {
        headers: headers,
        params: {
          z: roleId == 1 || roleId == 8 ? true : null
        }
      });
      const resapi = await res.data.data;
      console.log("ADMIN", resapi);
      setTerriInfo({
        ...terriForm,
        t_id: resapi?.t_d,
        t_user_person: resapi?.t_user_Person ?? "",
        t_user_id: resapi?.t_user_id,
        t_id_desig: resapi?.t_id_desig ?? "",
        t_app_date_resig: resapi?.t_app_date_resig,
        t_id_status: resapi?.t_id_status,
        t_id_status_resig: resapi?.t_id_status_resig ?? "Pending Acceptance Resignation by TM"
      });
      setSubBtn(resapi?.t_id_status_resig == "Pending Acceptance Resignation by TM" ? false : true);

      setrdmForm({
        ...rdmForm,
        rdm_id: resapi?.rdm_id,
        rdm_name: resapi?.rdm_name,
        rdm_user_id: resapi?.rdm_user_id,
        rdm_id_desig: resapi?.rdm_desig,
        rdm_app_date: resapi?.rdm_app_date,
        rdm_id_status: resapi?.rdm_id_status,
        rdm_id_status_resig: resapi?.rdm_id_status_resig
      });

      setRdmSubBtn(resapi?.rdm_id_status_resig == "Pending for Reccomended" ? false : true);

      setzdmForm({
        ...zdmForm,
        zdm_id: resapi?.zdm_id,
        zdm_name: resapi?.zdm_name,
        zdm_user_id: resapi?.zdm_user_id,
        zdm_id_desig: resapi?.zdm_desig,
        zdm_app_date: resapi?.zdm_app_date,
        zdm_app_date_resig: resapi?.zdm_app_date_resig,
        zdm_id_status: resapi?.zdm_id_status,
        zdm_id_status_resig: resapi?.zdm_id_status_resig
      });
      setzdmSubBtn(resapi?.zdm_id_status_resig == "Pending for Reccomended" ? false : true);

      setRegionForm({
        ...regionForm,
        r_id: resapi?.r_id,
        r_person: resapi?.r_user_Person ?? "",
        r_user_id: resapi?.r_user_id,
        r_id_desig: resapi?.r_id_desig ?? "",
        r_app_date_resig: resapi?.r_app_date_resig,
        r_visited_resig: resapi?.r_visited_resig,
        r_docuv_resig: resapi?.r_docuv_resig,
        r_id_status_resig: resapi?.r_id_status_resig ?? "Pending Acceptance Resignation by RM"
      });
      setCheckBoxRegionStatus(
        resapi?.r_id_status_resig == "Pending Acceptance Resignation by RM" ? false : true
      );
      setapproveRegionbtn(resapi?.r_id_status_resig == "Pending Acceptance Resignation by RM" ? false : true);

      setZonalMGForm({
        ...zonalMGForm,
        z_id: resapi?.z_id,
        z_user_person: resapi?.z_user_Person ?? "",
        z_id_desig: resapi?.z_id_desig ?? "",
        z_app_date_resig: resapi?.z_app_date_resig,
        // z_user_id: JSON?.parse(userinfo)?.user_id,
        z_visited_resig: resapi?.z_visited_resig,
        z_docuv_resig: resapi?.z_docuv_resig,
        // z_id_status: props?.data?.[0]?.z_id_status,
        z_id_status: resapi?.z_id_status,
        z_id_status_resig: resapi?.z_id_status_resig ?? "Pending Acceptance Resignation by ZM"
      });

      setCheckBoxZonalMan(resapi?.z_id_status_resig == "Pending Acceptance Resignation by ZM" ? false : true);
      setAppZonalManBtn(resapi?.z_id_status_resig == "Pending Acceptance Resignation by TM" ? false : true);

      setBunitHead({
        ...bunitHead,
        bu_id: resapi?.bu_id,
        bu_user_person: resapi?.bu_user_Person ?? "",
        bu_user_id: resapi?.bu_user_id,
        bu_id_desig: resapi?.bu_id_desig ?? "",
        bu_app_date_resig: resapi?.bu_app_date_resig,
        bu_id_status_resig: resapi?.bu_id_status_resig ?? "Pending Acceptance Resignation by BU"
      });

      setAppBusiBtn(resapi?.bu_id_status_resig == "Pending Acceptance Resignation by BU" ? false : true);
    } catch (error) {
      console.log("Err", error);
    }
  }

  useEffect(() => {
    switch (role_Id) {
      case 4:
        // getDealerInfoAPIRegion(localInfo);
        getDealerInfoAPITerri(localInfo);

        break;

      case 5:
      case 9:
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
        // getDealerInfoAPIZoneMg(localInfo);
        getDealerInfoAPITerri(localInfo);

        break;
      case 1:
      case 8:
        // getDealerInfoAPIZoneMg(localInfo);
        getDealerInfoALL(localInfo);
        break;

      default:
        break;
    }
  }, [role_Id]);

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
  const [submitRdmBy, setSubmitRdmBy] = useState(null);
  const [submitZoneAcBy, setSubmitZoneAcBy] = useState(null);
  const [submitRegionBy, setSubmitRegionBy] = useState(null);
  const [submitZDMBy, setSubmitZDMBy] = useState(null);
  const [submitZoneMgBy, setSubmitZoneMgBy] = useState(null);
  const [submitBusiBy, setSubmitBusiBy] = useState(null);

  useEffect(() => {
    if (props) {
      const submitStatus = props?.data?.app_status;
      if (
        // submitStatus == "Approved By Zonal A/c Manager" ||
        submitStatus == "Resignation Accepted By RM" ||
        submitStatus == "Resignation Accepted By ZM" ||
        submitStatus == "Resignation Accepted By BU" ||
        submitStatus == "Resignation Accepted By TM" ||
        submitStatus == "Recommended By RDM" ||
        submitStatus == "Recommended By RDM" ||
        submitStatus == "Recommended By ZDM" ||
        props?.data?.t_id_status_resig == "Resignation Accepted By TM"

        // submitStatus == "Resignation Submitted"
      ) {
        setSubmitTerriBy(true);
      }
      if (submitStatus == "Approved By Zonal A/c Manager" || submitStatus == "Approved By Business Unit") {
        setSubmitZoneAcBy(true);
      }
      if (
        // submitStatus == "Approved By Region" ||
        // submitStatus == "Approved By Zonal" ||
        // submitStatus == "Approved By Business Unit"
        submitStatus == "Resignation Accepted By RM" ||
        submitStatus == "Resignation Accepted By ZM" ||
        submitStatus == "Resignation Accepted By BU" ||
        props?.data?.r_id_status_resig == "Resignation Accepted By RM"
      ) {
        setSubmitRegionBy(true);
      }

      if (
        // submitStatus == "Recommended By RDM" ||
        // submitStatus == "Submitted By Territory"
        submitStatus == "Notinh By RDM"
        // props?.data?.t_id_status =="Submitted By TM"
      ) {
        setSubmitRdmBy(true);
      }
      if (
        // submitStatus == "Recommended By ZDM" ||
        // submitStatus == "Approved By Region" ||
        props?.data?.r_id_status_resig == "Approved"
      ) {
        // setSubmitZDMBy(true);
        setzdmSubBtn(true);
      }

      if (
        // submitStatus == "Approved By Zonal" ||
        // submitStatus == "Approved By Business Unit"
        submitStatus == "Resignation Accepted By ZM" ||
        submitStatus == "Resignation Accepted By BU"
      ) {
        // setSubmitZoneMgBy(true);
      }
      if (
        // submitStatus == "Approved By Business Unit"
        submitStatus == "Resignation Accepted By BU"
      ) {
        setSubmitBusiBy(true);
      }
    }
  }, [props]);

  console.log("ResinationDate", props?.data?.resignation_request_date);
  const isValidDate = (date) => {
    return date && date.trim() !== "" && !isNaN(new Date(date).getTime());
  };

  console.log("Button", approveRegionbtn);

  return (
    <form className=" bg-white rounded   p-4 w-full  overflow-auto" onSubmit={(e) => e.preventDefault()}>
      <Toaster position="bottom-center" reverseOrder={false} />
      <div className="flex my-2">
        <div className="w-full px-2">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
            <small className="text-red-600"></small> Employee Name
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            // value={props?.data[0]?.party_Name}
            value={props?.data?.fname + " " + props?.data?.lname}
            placeholder="Party Name"
            disabled
          />
        </div>
      </div>

      {/* Extra Fields Added  */}

      <div className="flex my-2 mb-2 lg:flex-row flex-col ">
        <div className="w-full px-2">
          <label className="block text-gray-700 text-sm font-bold mb-2 pt-2" htmlFor="inputField">
            <small className="text-red-600">*</small> Resignation Request Date
          </label>
          <DatePicker
            className="w-full px-3 py-2 border-b border-gray-500 bg-white focus:outline-none focus:border-b focus:border-indigo-500"
            selected={
              isValidDate(props?.data?.resignation_request_date)
                ? new Date(props.data.resignation_request_date)
                : new Date()
            }
            dropdownMode="select"
            disabled
            dateFormat="dd/MM/yyyy"
          />
        </div>

        <div className="w-full px-2">
          <label className="block text-gray-700 text-sm font-bold mb-2 pt-2" htmlFor="inputField">
            <small className="text-red-600">*</small> Last Working Date
          </label>
          <DatePicker
            className="w-full px-3 py-2 border-b border-gray-500 bg-white focus:outline-none focus:border-b focus:border-indigo-500"
            selected={
              isValidDate(props?.data?.last_working_date)
                ? new Date(props.data.last_working_date)
                : new Date()
            }
            dropdownMode="select"
            disabled
            dateFormat="dd/MM/yyyy"
          />
        </div>

        <div className="w-full px-2">
          <label className="block text-gray-700 text-sm font-bold mb-2 pt-2" htmlFor="inputField">
            <small className="text-red-600">*</small> Proposed LWD
          </label>
          <DatePicker
            className="w-full px-3 py-2 border-b border-gray-500 bg-white focus:outline-none focus:border-b focus:border-indigo-500"
            selected={isValidDate(props?.data?.proposed_lwd) ? new Date(props.data.proposed_lwd) : new Date()}
            dropdownMode="select"
            disabled
            dateFormat="dd/MM/yyyy"
          />
        </div>
      </div>

      <div className="flex my-2 mb-2 lg:flex-row flex-col ">
        <div className="w-full px-2 ">
          <label className="block text-gray-700 text-sm font-bold  pt-2" htmlFor="inputField">
            <small className="text-red-600">*</small> Notice Period in Days
            <input
              className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
              type="text"
              id="inputField"
              value={props?.data?.notice_period_in_days ?? "NA"}
              placeholder="Reason"
              disabled
            />
          </label>
        </div>
        <div className="w-full px-2 ">
          <label className="block text-gray-700 text-sm font-bold  pt-2" htmlFor="inputField">
            <small className="text-red-600">*</small> Reason
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            value={props?.data?.reason ?? "NA"}
            placeholder="Reason"
            disabled
          />
        </div>
        <div className="w-full px-2 ">
          <label className="block text-gray-700 text-sm font-bold  pt-2" htmlFor="inputField">
            <small className="text-red-600">*</small> Remarks
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            value={props?.data?.comment ?? "NA"}
            placeholder="Remarks"
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
                disabled={editTerriFrom ? editRdmFrom : true}
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
                disabled={editTerriFrom ? editRdmFrom : true}
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
                selected={new Date(terriForm?.t_app_date_resig ? terriForm?.t_app_date_resig : new Date())}
                dropdownMode="select"
                dateFormat="dd/MM/yyyy"
                minDate={new Date(new Date().getTime()) ?? undefined}
                onChange={(date) => {
                  setTerriInfo({
                    ...terriForm,
                    t_app_date_resig: moment(date).format("LL")
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
                value={terriForm?.t_id_status_resig}
                placeholder="Submitted By TM"
                disabled
              />
            </div>
          </div>

          {(router.query.type === "Edit" || router.query.type === "EditResAp") && (
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

      {/* RDM Approval LA  */}

      {rdmView && (
        <div className="regional manager">
          <div className="flex my-2 mb-2 lg:flex-row flex-col ">
            <div className="w-full px-2">
              <label className="block text-gray-700 text-sm font-bold mb-2 pt-2" htmlFor="inputField">
                <small className="text-red-600">*</small> RDM
              </label>
              <input
                className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                type="text"
                id="inputField"
                placeholder="Regional Manager"
                value={rdmForm?.rdm_name}
                disabled={editRdmFrom}
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
                value={rdmForm?.rdm_id_desig}
                disabled={editRdmFrom}
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
                selected={
                  new Date(
                    rdmForm?.rdm_app_date_resig
                      ? rdmForm?.rdm_app_date_resig
                      : terriForm?.t_app_date_resig
                      ? new Date().getTime()
                      : new Date()
                  )
                }
                dropdownMode="select"
                dateFormat={"dd/MM/yyyy"}
                minDate={terriForm?.t_app_date_resig ? new Date(new Date().getTime()) : undefined}
                onChange={(date) => {
                  setrdmForm({
                    ...rdmForm,
                    rdm_app_date: moment(date).format("LL")
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
                value={rdmForm?.rdm_id_status_resig}
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
                  value={regionForm?.r_visited_resig}
                  checked={regionForm.r_visited_resig}
                  onChange={(e) => {
                    setRegionForm({
                      ...regionForm,
                      r_visited_resig: e.target.checked
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
                  value={regionForm?.r_docuv_resig}
                  checked={regionForm.r_docuv_resig}
                  onChange={(e) => {
                    setRegionForm({
                      ...regionForm,
                      r_docuv_resig: e.target.checked
                    });
                  }}
                  disabled={checkBoxRegionStatus || submitRegionBy}
                />
                <label htmlFor="rentedCheckbox">Verified the all info. documents</label>
              </div>
            </div>
          </div>

          {(router.query.type === "Edit" || router.query.type === "EditResAp") && (
            <div className="flex w-full justify-center gap-4 text-white py-4">
              <button
                disabled={rdmSubBtn || submitRdmBy}
                onClick={handleRdmSubmit}
                className={`${
                  rdmSubBtn || submitRdmBy ? "bg-gray-400" : "bg-green-600"
                }  px-3 py-1 rounded-sm`}
              >
                Recommend
              </button>
              <button
                disabled={rdmSubBtn}
                className={`${rdmSubBtn || submitRdmBy ? "bg-gray-400" : "bg-red-600"} px-3 py-1 rounded-sm`}
              >
                Reject
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
                selected={
                  new Date(
                    regionForm?.r_app_date_resig
                      ? regionForm?.r_app_date_resig
                      : terriForm?.t_app_date_resig
                      ? new Date().getTime()
                      : new Date()
                  )
                }
                dropdownMode="select"
                dateFormat={"dd/MM/yyyy"}
                minDate={terriForm?.t_app_date_resig ? new Date(new Date().getTime()) : undefined}
                onChange={(date) => {
                  setRegionForm({
                    ...regionForm,
                    r_app_date_resig: moment(date).format("LL")
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
                // value={regionForm?.r_id_status}
                value={regionForm?.r_id_status_resig}
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
                  value={regionForm?.r_visited_resig}
                  checked={regionForm.r_visited_resig}
                  onChange={(e) => {
                    setRegionForm({
                      ...regionForm,
                      r_visited_resig: e.target.checked
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
                  value={regionForm?.r_docuv_resig}
                  checked={regionForm.r_docuv_resig}
                  onChange={(e) => {
                    setRegionForm({
                      ...regionForm,
                      r_docuv_resig: e.target.checked
                    });
                  }}
                  disabled={checkBoxRegionStatus || submitRegionBy}
                />
                <label htmlFor="rentedCheckbox">Verified the all info. documents</label>
              </div>
            </div>
          </div>

          {(router.query.type == "Edit" || router.query.type === "EditResAp") && (
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

      {/* ZDM Approval LA  */}

      {zdmView && (
        <div className="regional manager">
          <div className="flex my-2 mb-2 lg:flex-row flex-col ">
            <div className="w-full px-2">
              <label className="block text-gray-700 text-sm font-bold mb-2 pt-2" htmlFor="inputField">
                <small className="text-red-600">*</small> ZDM
              </label>
              <input
                className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                type="text"
                id="inputField"
                placeholder="Regional Manager"
                value={zdmForm?.zdm_name}
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
                value={zdmForm?.zdm_id_desig}
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
                selected={
                  new Date(
                    zdmForm?.zdm_app_date_resig
                      ? zdmForm?.zdm_app_date_resig
                      : regionForm?.r_app_date_resig
                      ? new Date().getTime()
                      : new Date()
                  )
                }
                dropdownMode="select"
                dateFormat={"dd/MM/yyyy"}
                minDate={regionForm?.r_app_date_resig ? new Date(new Date().getTime()) : undefined}
                onChange={(date) => {
                  setzdmForm({
                    ...zdmForm,
                    zdm_app_date_resig: moment(date).format("LL")
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
                value={zdmForm?.zdm_id_status_resig}
                disabled
              />
            </div>
          </div>

          {/* checkbox  */}

          {/* <div className="flex my-2 mb-2 lg:flex-row flex-col items-center accent-lime-400 py-4 ">
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
          </div> */}

          {(router.query.type === "Edit" || router.query.type === "EditResAp") && (
            <div className="flex w-full justify-center gap-4 text-white py-4">
              <button
                disabled={zdmSubBtn || submitZDMBy}
                onClick={handleZdmSubmit}
                className={`${
                  zdmSubBtn || submitZDMBy ? "bg-gray-400" : "bg-green-600"
                }  px-3 py-1 rounded-sm`}
              >
                Recommend
              </button>
              <button
                disabled={zdmSubBtn}
                className={`${zdmSubBtn || submitZDMBy ? "bg-gray-400" : "bg-red-600"} px-3 py-1 rounded-sm`}
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
                selected={
                  new Date(
                    zonalMGForm?.z_app_date_resig
                      ? zonalMGForm?.z_app_date_resig
                      : regionForm?.r_app_date_resig
                      ? new Date().getTime()
                      : new Date()
                  )
                }
                dateFormat={"dd/MM/yyyy"}
                dropdownMode="select"
                minDate={regionForm?.r_app_date_resig ? new Date(new Date().getTime()) : undefined}
                onChange={(date) => {
                  setZonalMGForm({
                    ...zonalMGForm,
                    z_app_date_resig: moment(date).format("LL")
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
                // value={zonalMGForm?.z_id_status}
                value={zonalMGForm?.z_id_status_resig}
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
                  value={zonalMGForm?.z_visited_resig}
                  checked={zonalMGForm.z_visited_resig}
                  onChange={(e) => {
                    setZonalMGForm({
                      ...zonalMGForm,
                      z_visited_resig: e.target.checked
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
                  value={zonalMGForm?.z_docuv_resig}
                  checked={zonalMGForm.z_docuv_resig}
                  onChange={(e) => {
                    setZonalMGForm({
                      ...zonalMGForm,
                      z_docuv_resig: e.target.checked
                    });
                  }}
                  disabled={checkBoxZonalMan || submitZoneMgBy}
                />
                <label htmlFor="rentedCheckbox">Verified the all info. documents</label>
              </div>
            </div>
          </div>

          {(router.query.type === "Edit" || router.query.type === "EditResAp") && (
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

      {/* {zoneAcView && (
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
                selected={
                  new Date(
                    zoneAcForm?.zac_app_date
                      ? zoneAcForm?.zac_app_date
                      : zonalMGForm?.z_app_date
                      ? new Date().getTime()
                      : new Date()
                  )
                }
                dateFormat={"dd/MM/yyyy"}
                dropdownMode="select"
                minDate={zonalMGForm?.z_app_date ? new Date(new Date().getTime()) : undefined}
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

        

          <div className="flex my-2 mb-2 lg:flex-row flex-col items-center accent-lime-400 py-4 ">
            <div className="w-full px-2">
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
      )} */}

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
                selected={
                  new Date(
                    bunitHead?.bu_app_date_resig
                      ? bunitHead?.bu_app_date_resig
                      : zonalMGForm?.z_app_date_resig
                      ? new Date().getTime()
                      : new Date()
                  )
                }
                // showMonthDropdown
                dateFormat={"dd/MM/yyyy"}
                dropdownMode="select"
                minDate={zonalMGForm?.z_app_date_resig ? new Date(new Date().getTime()) : undefined}
                onChange={(date) => {
                  setBunitHead({
                    ...bunitHead,
                    bu_app_date_resig: moment(date).format("LL")
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
                // value={bunitHead?.bu_id_status}
                value={bunitHead?.bu_id_status_resig}
                disabled
              />
            </div>
          </div>

          {(router.query.type === "Edit" || router.query.type === "EditResAp") && (
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
    </form>
  );
};

export default ApprovalResign;
