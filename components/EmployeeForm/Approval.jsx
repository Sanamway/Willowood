import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import axios from "axios";
import { url } from "@/constants/url";
import { useRouter } from "next/router";
import toast, { Toaster } from "react-hot-toast";
import { businessUnit } from "../ChartReports/sample";
import RejectApproval from "../modals/RejectApproval";

const Approval = (props) => {
  const router = useRouter();
  const [formActive, setFormActive] = useState(false);
  const [localInfo, setLocalInfo] = useState("");
  const mob = router?.query?.from;

  const [terriForm, setTerriInfo] = useState({
    t_id: "",
    t_user_person: "",
    t_user_id: "",
    t_id_desig: "",
    t_app_date: "",
    app_status: "",
    t_id_status: "Submitted By TM"
  });

  const [rdmForm, setrdmForm] = useState({
    rdm_id: "",
    rdm_name: "",
    rdm_user_id: "",
    rdm_id_desig: "",
    rdm_app_date: "",
    app_status: "",
    rdm_id_status: ""
  });

  const [zdmForm, setzdmForm] = useState({
    zdm_id: "",
    zdm_name: "",
    zdm_user_id: "",
    zdm_id_desig: "",
    zdm_app_date: "",
    app_status: "",
    zdm_id_status: ""
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
  const [rdmView, setRdmView] = useState(null);
  const [zdmView, setzdmView] = useState(null);
  const [unitHeadView, setUnitHeadView] = useState(null);
  const [editTerriFrom, setEditTerriForm] = useState(null);
  const [editRdmFrom, setEditRdmForm] = useState(null);
  const [editRegionFrom, setEditRegionForm] = useState(null);
  const [editZoneAcFrom, setEditZoneAcForm] = useState(null);
  const [editZonalMgFrom, setEditZonalMgForm] = useState(null);
  const [editUnitHeadFrom, setEditUnitHeadForm] = useState(null);
  const [terriSubBtn, setSubBtn] = useState(null);

  const [rdmSubBtn, setRdmSubBtn] = useState(null);
  const [zdmSubBtn, setzdmSubBtn] = useState(null);

  const [approveRegionbtn, setapproveRegionbtn] = useState(null);
  const [appZonalManBtn, setAppZonalManBtn] = useState(null);
  const [appBusiBtn, setAppBusiBtn] = useState(null);
  const [approveZAbtn, setapproveZAbtn] = useState(null);
  const [checkBoxStatus, setCheckBoxStatus] = useState(null);
  const [checkBoxRegionStatus, setCheckBoxRegionStatus] = useState(null);
  const [checkBoxZonalMan, setCheckBoxZonalMan] = useState(null);

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
          t_app_date: props?.data?.t_app_date
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
          r_app_date: props?.data?.r_app_date,
          r_visited: props?.data?.r_visited,
          r_id_status: props?.data?.r_id_status || "Pending for Approve",
          r_docuv: props?.data?.r_docuv
        });
        setSubBtn(true);
      }

      if (role_Id == 4) {
        setZonalMGForm({
          ...zonalMGForm,
          z_id: JSON?.parse(userinfo)?.z_id,
          z_user_person: userName,
          z_id_desig: JSON?.parse(userinfo)?.U_profile_name,
          z_app_date: props?.data?.z_app_date,
          z_user_id: JSON?.parse(userinfo)?.user_id,
          z_visited: props?.data?.z_visited,
          z_docuv: props?.data?.z_docuv,
          z_id_status: props?.data?.z_id_status || "Pending for Approve"
        });
      }

      if (role_Id == 3) {
        setBunitHead({
          ...bunitHead,
          bu_id: JSON?.parse(userinfo)?.bu_id,
          bu_user_person: userName,
          bu_user_id: JSON?.parse(userinfo)?.user_id,
          bu_id_desig: JSON?.parse(userinfo)?.U_profile_name,
          bu_app_date: props?.data?.bu_app_date,
          bu_id_status: props?.data?.bu_id_status || "Pending for Approve"
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

      if (role_Id == 1 || role_Id == 8 || role_Id == 17) {
        setTerriInfo({
          ...terriForm,
          t_id: JSON?.parse(userinfo)?.t_id,
          t_user_person: props?.data?.t_id_desig,
          t_user_id: JSON?.parse(userinfo)?.user_id,
          // t_id_desig: JSON?.parse(userinfo)?.U_profile_name,
          t_id_desig: props?.data?.t_id_desig,
          t_app_date: props?.data?.t_app_date
        });

        setrdmForm({
          ...rdmForm,
          rdm_id: props?.data?.rdm_id,
          rdm_name: props?.data?.rdm_name,
          rdm_user_id: props?.data?.rdm_user_id,
          rdm_id_desig: props?.data?.rdm_desig,
          rdm_app_date: props?.data?.rdm_app_date,
          rdm_id_status: props?.data?.rdm_id_status
        });

        setzdmForm({
          ...zdmForm,
          zdm_id: props?.data?.zdm_id,
          zdm_name: props?.data?.zdm_name,
          zdm_user_id: props?.data?.zdm_user_id,
          zdm_id_desig: props?.data?.zdm_desig,
          zdm_app_date: props?.data?.zdm_app_date,
          zdm_id_status: props?.data?.zdm_id_status
        });

        setRegionForm({
          ...regionForm,
          r_id: props?.data?.r_id,
          r_person: props?.data?.r_user_Person,
          r_user_id: props?.data?.r_user_id,
          r_id_desig: props?.data?.r_id_desig,
          r_app_date: props?.data?.r_app_date,
          r_id_status: props?.data?.r_id_status,
          r_visited: props?.data?.r_visited,
          r_docuv: props?.data?.r_docuv
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

        // setRegionForm({
        //   ...regionForm,
        //   r_id: JSON?.parse(userinfo)?.r_id,
        //   r_person: userName,
        //   r_user_id: JSON?.parse(userinfo)?.user_id,
        //   r_id_desig: JSON?.parse(userinfo)?.U_profile_name,
        //   r_app_date: props?.data?.r_app_date,
        //   r_visited: props?.data?.r_visited,
        //   r_visited: props?.data?.r_visited,
        //   r_id_status: props?.data?.r_id_status,
        //   r_docuv: props?.data?.r_docuv
        // });

        setZonalMGForm({
          ...zonalMGForm,
          z_id: JSON?.parse(userinfo)?.z_id,
          z_user_person: userName,
          // z_id_desig: JSON?.parse(userinfo)?.U_profile_name,
          z_id_desig: props?.data?.z_id_desig,
          z_app_date: props?.data?.z_app_date,
          z_user_id: JSON?.parse(userinfo)?.user_id,
          z_visited: props?.data?.z_visited,
          z_docuv: props?.data?.z_docuv,
          z_id_status: props?.data?.z_id_status
        });

        setZonalMGForm({
          ...zonalMGForm,
          z_id: props?.data?.z_id,
          z_user_person: props?.data?.z_user_Person,
          z_id_desig: props?.data?.z_id_desig,
          z_app_date:props?.data?.z_app_date,
          z_visited: props?.data?.z_visited,
          z_docuv: props?.data?.z_docuv,
          z_id_status: props?.data?.z_id_status
        });

        // setBunitHead({
        //   ...bunitHead,
        //   bu_id: JSON?.parse(userinfo)?.bu_id,
        //   bu_user_person: userName,
        //   bu_user_id: JSON?.parse(userinfo)?.user_id,
        //   // bu_id_desig: JSON?.parse(userinfo)?.U_profile_name,
        //   bu_id_desig: props?.data?.bu_id_desig,
        //   bu_app_date: props?.data?.bu_app_date,
        //   bu_id_status: props?.data?.bu_id_status
        // });
        setBunitHead({
          ...bunitHead,
          bu_id: props?.data?.bu_id,
          bu_user_person: props?.data?.bu_user_Person,
          bu_user_id: props?.data?.bu_user_id,
          bu_id_desig: props?.data?.bu_id_desig,
          bu_app_date: props?.data?.bu_app_date
        });
      }
    }
  }, [role_Id]);

  useEffect(() => {
    switch (role_Id) {
      case 4:
        // if(props?.data?.app_status =="Rejected HR Onboarding by ZDM"){
        //   setTerriView(true);
        //   setRegionView(true);
        //   setRdmView(true);
        //   return
        // }

        setTerriView(true);
        setRegionView(true);
        setRdmView(true);
        setzdmView(true);
        setZoneMgView(true);
        setEditTerriForm(true);
        setEditZoneAcForm(true);
        setEditRegionForm(true);
        break;
      case 5:
        // if(props?.data?.rdm_id_status =="Rejected HR Onboarding by RDM"){
        //   setTerriView(true);
        //   setRegionView(false);
        //   setRdmView(true);
        //   return
        // }
        setTerriView(true);
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
      case 17:
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
          setRdmView(true);
          setRdmView(true);

          setEditRdmForm(true);

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

      case 5:
        setTerriView(true);
        setRdmView(true);
        setRegionView(true);
        setEditTerriForm(true);
        setEditRdmForm(true);
        setEditRegionForm(true);

        setzdmView(false);

        if (props?.data?.rdm_id_status !== "Recommended") {
          setRegionView(false);
        }
        break;

      default:
    }
  }, [role_Id]);

  // Approval Whatsapp Message Sender

  async function whatsAppMsg(recipientMob, mrname, mrtwo, emp_name, address, emergency_conno, pemail, bst) {
    try {
      const payLoad = {
        recipient: String(recipientMob),
        // tem_id: "390593",
        tem_id: "777215",
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
    // alert("click")
    // return
    //Extracting Data For WhatsApp Message:
    const APP_STATUS = props?.data?.app_status;
    const validStatuses = ["Update Interview", "MR Dealer Map"];
    if (!validStatuses.includes(APP_STATUS)) {
      toast.error("Update Dealer/Interview First");
      return;
    }

    // return;

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
      rdm_name
    } = props?.data;
    const emp_name = `${fname} ${mname} ${lname}`;
    const bst = `${business_unit_name}-${region_name}-${zone_name}-${territory_name}`;

    // const bst = territory_name + "-" + region_name + "-" + zone_name + "-" + business_unit_name;

    // whatsAppMsg(
    //   "6398067642",
    //   // r_mobile_no,
    //   r_hod_name,
    //   t_hod_name,
    //   emp_name,
    //   caddress,
    //   phone_number,
    //   pemail,
    //   bst
    // );

    // return

    try {
      const { t_app_date, t_id_desig, t_id_status, t_user_id, t_id } = terriForm;

      // if ((!t_app_date, !t_id_desig, !t_id_status, !t_user_id, !t_id)) {
      //   throw new Error("All fields must be filled");
      // }
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

      const res = await axios.put(`${url}/api/update_emp_info/${router.query.id}`, JSON.stringify(data), {
        headers: headers
      });
      const resApi = await res.data;
      if (!resApi) return;
      toast.success("Territory Updated Successfully !");
      setSubBtn(true);
      whatsAppMsg(
        // "7277766100",
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
        // router.push("/table/table_employee?name=Dealer");
        mob == "mob" ? router.push("/table/table_employee_mobile") : router.push("/table/table_employee");
      }, 1000);
    } catch (error) {
      const errorMessage = error?.response?.data?.message;
      toast.error(errorMessage);
      console.log("errr", error);
    }
  };

  /////////////////////////////////// Handle RDM Submission ///////////////////////////////////////////////////

  const handleRdmSubmit = async () => {
    const dateOne = new Date(terriForm?.t_app_date).toDateString();
    const dateTwo = new Date(rdmForm?.rdm_app_date ? rdmForm?.rdm_app_date : new Date()).toDateString();

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
      const { rdm_id, rdm_name, rdm_user_id, rdm_id_desig, rdm_id_status, rdm, rdm_app_date } = rdmForm;
      const emp_name = `${fname} ${mname} ${lname}`;
      const bst = `${business_unit_name}-${region_name}-${zone_name}-${territory_name}`;

      // whatsAppMsg(
      //   "6398067642",
      //   // rdm_mobile_no,
      //   r_hod_name,
      //   rdm_name,
      //   emp_name,
      //   caddress,
      //   phone_number,
      //   pemail,
      //   bst
      // );
      // return;

      const data = {
        rdm_id,
        rdm_name,
        rdm_app_date: rdm_app_date ? rdm_app_date : new Date(),
        rdm_user_id,
        rdm_id_desig,
        rdm: true,
        approval: true,
        rdm_id_status: "Recommended",
        app_status: "Recommended By RDM"
      };

      console.log("rdmdata", data);
      console.log("bst", bst);

      const res = await axios.put(`${url}/api/update_emp_info/${router.query.id}`, JSON.stringify(data), {
        headers: headers
      });
      const resApi = await res.data;
      if (!resApi) return;
      toast.success("RDM Recommended Successfully !");
      setRdmSubBtn(true);
      whatsAppMsg(r_mobile_no, r_hod_name, rdm_name, emp_name, caddress, phone_number, pemail, bst);
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
      zdm_mobile_no,
      zdm_name,
      rdm_name
    } = props?.data;
    const emp_name = `${fname} ${mname} ${lname}`;
    // const bst =  `${bu} ${region} ${zone} ${territory}`

    const bst = territory_name + "-" + region_name + "-" + zone_name + "-" + business_unit_name;
    // const dateOne = new Date(terriForm?.t_app_date).toDateString();
    const dateOne = new Date(rdmForm?.rdm_app_date).toDateString();
    const dateTwo = new Date(regionForm?.r_app_date ? regionForm?.r_app_date : new Date()).toDateString();

    // whatsAppMsg(
    //   "6398067642",
    //   // zdm_mobile_no,
    //   zdm_name,
    //   rdm_name,
    //   emp_name,
    //   caddress,
    //   phone_number,
    //   pemail,
    //   bst
    // );
    // return

    if (new Date(dateTwo) < new Date(dateOne)) {
      toast.error("Can't select the lesser date");
      return;
    }
    try {
      const { r_id, r_user_id, r_id_desig, r_app_date, r_visited, r_docuv } = regionForm;

      const data = {
        r_id,
        r_user_id: r_id,
        r_id_desig,
        r_app_date: r_app_date ? r_app_date : moment(terriForm?.t_app_date).format("MMMM D YYYY"),
        r_visited,
        r_docuv,
        r: true,
        approval: true,
        r_id_status: "Approved",
        app_status: "Approved By Region"
      };
      console.log("Region dddad", data);
      // return;
      const res = await axios.put(
        `${url}/api/update_emp_info/${Number(router.query.id)}`,
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
        // "7277766100",
        zdm_mobile_no,
        zdm_name,
        r_user_Person,
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

  ////////////////////////////////////// Handle ZDM Submission ///////////////////////////////////////////////

  const handleZdmSubmit = async () => {
    const dateOne = new Date(regionForm?.r_app_date).toDateString();
    const dateTwo = new Date(zdmForm?.zdm_app_date ? zdmForm?.zdm_app_date : new Date()).toDateString();

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
      const { zdm_id, zdm_name, zdm_user_id, zdm_id_desig, zdm_id_status, zdm_app_date } = zdmForm;
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
        zdm_app_date: zdm_app_date ? zdm_app_date : new Date(),
        zdm_id_status: "Recommended",
        app_status: "Recommended By ZDM"
      };
      console.log("data", data);

      // whatsAppMsg(
      //   "6398067642",
      //   // z_mobile_no,
      //   z_user_Person,
      //   zdm_name,
      //   emp_name,
      //   caddress,
      //   phone_number,
      //   pemail,
      //   bst
      // );

      //  return
      const res = await axios.put(`${url}/api/update_emp_info/${router.query.id}`, JSON.stringify(data), {
        headers: headers
      });
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
      z_user_Person,
      r_hod_name,
      bu_hod_name,
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
      grade
    } = props?.data;
    const emp_name = `${fname} ${mname} ${lname}`;
    const bst = territory_name + "-" + region_name + "-" + zone_name + "-" + business_unit_name;

    // whatsAppMsg(
    //   "6398067642",
    //   // bu_mobile_no,
    //   bu_hod_name,
    //   z_user_Person,
    //   emp_name,
    //   caddress,
    //   phone_number,
    //   pemail,
    //   bst
    // );
    // return

    // const dateOne = new Date(regionForm?.r_app_date).toDateString();
    const dateOne = new Date(zdmForm?.zdm_app_date).toDateString();
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

      console.log("");
      console.log("ZOMG", data);

      // return;
      const res = await axios.put(`${url}/api/update_emp_info/${router.query.id}`, JSON.stringify(data), {
        headers: headers
      });
      const resApi = await res.data;
      if (!resApi) return;
      toast.success("Zonal Manager Updated Successfully !");
      setAppZonalManBtn(true);

      if (grade.includes("D")) {
        whatsAppMsg(
          // "7277766100",
          bu_mobile_no,
          z_user_Person,
          bu_hod_name,
          emp_name,
          caddress,
          phone_number,
          pemail,
          bst
        );
      }
    } catch (error) {
      const errorMessage = error?.response?.data?.message;

      toast.error(errorMessage);
      // toast.error(error.message);
    }
  };

  //////////////////////////////////  Handle Zone A/c Submission ///////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////

  // const handleZoneAcSubmit = async () => {
  //   //Extracting Data For WhatsApp Message
  //   const {
  //     bu_mobile_no,
  //     bu_user_Person,
  //     bu_hod_name,
  //     zac_hod_name,
  //     zac_user_Person,
  //     party_Name,
  //     address,
  //     contact_person,
  //     pmobile,
  //     pemail,
  //     pan,
  //     gst,
  //     territory_name,
  //     region_name,
  //     zone_name,
  //     business_unit_name,
  //     z_user_Person
  //   } = props?.data;

  //   const bst = territory_name + "-" + region_name + "-" + zone_name + "-" + business_unit_name;

  //   //Conditions for SAP and Security Validation

  //   // if (!props?.data[0]?.SAP_SalesOrg) {
  //   //   toast.error("Fill the SAP Details First");
  //   //   return;
  //   // }

  //   const dateOne = new Date(zonalMGForm?.z_app_date).toDateString();
  //   const dateTwo = new Date(zoneAcForm?.zac_app_date ? zoneAcForm?.zac_app_date : new Date()).toDateString();

  //   console.log("dateOnez", dateOne);
  //   console.log("dateTwoz", dateTwo);

  //   if (new Date(dateTwo) < new Date(dateOne)) {
  //     toast.error("Can't select the lesser date");
  //     return;
  //   }
  //   // return
  //   try {
  //     const {
  //       zac_user_id,
  //       zac_id_desig,
  //       zac_app_date,
  //       zac_isinfo,
  //       zac_isseqdpt,
  //       zac_blankchq,
  //       zac_lthead,
  //       zac_bs_value,
  //       zac_bs_period_to,
  //       zac_bs_period_from

  //       // zac_id_status
  //     } = zoneAcForm;

  //     const data = {
  //       zac_user_id,
  //       zac_id_desig,
  //       zac_app_date: zac_app_date
  //         ? zac_app_date
  //         : // : moment(terriForm?.t_app_date).add(1, "day").format("MMMM D YYYY"),
  //           moment(new Date()).format("MMMM D YYYY"),
  //       // zac_app_date,
  //       zac_isinfo,
  //       zac_isseqdpt,
  //       zac_blankchq,
  //       zac_lthead,
  //       zac_bs_value,
  //       zac_bs_period_to,
  //       zac_bs_period_from,
  //       approval: true,
  //       zac: true,
  //       zac_id_status: "Approved",
  //       app_status: "Approved By Zonal A/c Manager"
  //     };
  //     console.log("ZACInside", data);
  //     // return;
  //     const res = await axios.put(`${url}/api/update_emp_info/${router.query.id}`, JSON.stringify(data), {
  //       headers: headers
  //     });
  //     const resApi = await res.data;
  //     if (!resApi) return;
  //     toast.success("Zone Ac Updated Successfully !");
  //     setapproveZAbtn(true);
  //     whatsAppMsg(
  //       bu_mobile_no,
  //       bu_hod_name == " " ? "Business Unit" : bu_hod_name,
  //       // zac_hod_name == " " ? "Zonal A/c Manager" : zac_hod_name,
  //       z_user_Person,
  //       party_Name,
  //       address == "" ? "add" : address,
  //       contact_person == ("" || null) ? "Contact" : contact_person,
  //       pmobile,
  //       pemail,
  //       pan == ("" || null) ? "pan" : pan,
  //       gst == null ? "GST" : gst,
  //       bst
  //     );
  //   } catch (error) {
  //     const errorMessage = error?.response?.data?.message;

  //     toast.error(errorMessage);
  //   }
  // };

  //////////////////////////////////////// End Zonal A/c Manager ///////////////////////////////////////////////

  //////////////////////////////////  Handle Business Head Unit Submission ///////////////////////////////////////////////

  const handleBunitHeadSubmit = async () => {
    // const dateOne = new Date(zoneAcForm?.zac_app_date).toDateString();
    const dateOne = new Date(zonalMGForm?.z_app_date).toDateString();
    const dateTwo = new Date(bunitHead?.bu_app_date ? bunitHead?.bu_app_date : new Date()).toDateString();
    console.log("BUDATE", dateTwo);
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
        bu_app_date: bu_app_date ?? new Date().toDateString(),
        // : moment(zonalMGForm?.z_app_date).add(1, "day").format("MMMM D YYYY"),
        // moment(zonalMGForm?.z_app_date).format("MMMM D YYYY"),
        bu: true,
        approval: true,
        bu_id_status: "Approved",
        app_status: "Approved By Business Unit"
      };

      console.log("BUDATA", data);

      // return;
      const res = await axios.put(`${url}/api/update_emp_info/${router.query.id}`, JSON.stringify(data), {
        headers: headers
      });
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
        t_app_date: props?.data?.t_app_date
        // t_app_date: resapi[0]?.t_app_date
      });
      

      setrdmForm({
        ...rdmForm,
        rdm_id: resapi?.rdm_id,
        rdm_name: resapi?.rdm_name,
        rdm_user_id: resapi?.rdm_user_id,
        rdm_id_desig: resapi?.rdm_desig,
        rdm_app_date: resapi?.rdm_app_date,
        rdm_id_status: resapi?.rdm_id_status
      });

      // reject status
      setTempReason({
        rdm_r_reason: resapi?.rdm_r_reason,
        rdm_r_date:resapi?.rdm_r_date ? moment(resapi?.rdm_r_date).format("DD-MM-YYYY") :"",
        rm_r_reason: resapi?.rm_r_reason,
        rm_r_date:resapi?.rm_r_date ? moment(resapi?.rm_r_date).format("DD-MM-YYYY") :"",
        zdm_r_reason: resapi?.zdm_r_reason,
        zdm_r_date:resapi?.zdm_r_date ? moment(resapi?.zdm_r_date).format("DD-MM-YYYY") :"",


      });

      setRdmSubBtn(resapi?.rdm_id_status == "Recommended" ? true : false || resapi?.rdm_id_status == "Rejected HR Onboarding by RDM" ? true : false);

      setRegionForm({
        ...regionForm,
        r_id: resapi?.r_id,
        r_person: resapi?.r_user_Person,
        r_user_id: resapi?.r_user_id,
        r_id_desig: resapi?.r_id_desig,
        r_app_date: resapi?.r_app_date,
        r_id_status: resapi?.r_id_status,
        r_visited: resapi?.r_visited,
        r_docuv: resapi?.r_docuv
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
        zdm_id_status: resapi?.zdm_id_status
      });
      setzdmSubBtn(resapi?.zdm_id_status == "Recommended" ? true : false || resapi?.zdm_id_status == "Rejected HR Onboarding by ZDM" ? true : false);
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
        `${url}/api/get_employee?r=true&additional_data=true&e_id=${router.query.id}`,
        { headers: headers }
      );
      const resapi = await res.data.data;

      setTerriInfo({
        ...terriForm,
        t_id: resapi?.t_d,
        t_user_person: resapi?.t_user_Person,
        t_user_id: resapi?.t_user_id,
        t_id_desig: resapi?.t_id_desig,
        t_app_date: resapi?.t_app_date,
        t_id_status: resapi?.t_id_status
      });
      setSubBtn(true);

      setRegionForm({
        ...regionForm,
        r_id: resapi?.r_id,
        r_person: resapi?.r_user_Person,
        r_user_id: resapi?.r_user_id,
        r_id_desig: resapi?.r_id_desig,
        r_app_date: resapi?.r_app_date,
        r_id_status: resapi?.r_id_status,
        r_visited: resapi?.r_visited,
        r_docuv: resapi?.r_docuv
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
        rdm_id_status: resapi?.rdm_id_status
      });

      setRdmSubBtn(resapi?.rdm_id_status == "Pending For Reccomended" ? false : true);

      setzdmForm({
        ...zdmForm,
        zdm_id: resapi?.zdm_id,
        zdm_name: resapi?.zdm_name,
        zdm_user_id: resapi?.zdm_user_id,
        zdm_id_desig: resapi?.zdm_desig,
        zdm_app_date: resapi?.zdm_app_date,
        zdm_id_status: resapi?.zdm_id_status
      });
      setzdmSubBtn(resapi?.zdm_id_status == "Pending For Reccomended" ? false : true);

      //reject status
      setTempReason({
        rdm_r_reason: resapi?.rdm_r_reason,
        rdm_r_date:resapi?.rdm_r_date ? moment(resapi?.rdm_r_date).format("DD-MM-YYYY") :"",
        rm_r_reason: resapi?.rm_r_reason,
        rm_r_date:resapi?.rm_r_date ? moment(resapi?.rm_r_date).format("DD-MM-YYYY") :"",
        zdm_r_reason: resapi?.zdm_r_reason,
        zdm_r_date:resapi?.zdm_r_date ? moment(resapi?.zdm_r_date).format("DD-MM-YYYY") :"",
        zm_r_reason: resapi?.zm_r_reason,
        zm_r_date:resapi?.zm_r_date ? moment(resapi?.zm_r_date).format("DD-MM-YYYY") :"",
      });
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
      // setTempReason({
      //   rdm_r_reason: resapi?.rdm_r_reason,
      //   rdm_r_date: moment(resapi?.rdm_r_date).format("DD-MM-YYYY")
      // });

  

      setTerriInfo({
        ...terriForm,
        t_id: resapi?.t_d,
        t_user_person: resapi?.t_user_Person,
        t_user_id: resapi?.t_user_id,
        t_id_desig: resapi?.t_id_desig,
        t_app_date: resapi?.t_app_date,
        t_id_status: resapi?.t_id_status
      });
      setSubBtn(true);

      setRegionForm({
        ...regionForm,
        r_id: resapi?.r_id,
        r_person: resapi?.r_user_Person,
        r_user_id: resapi?.r_user_id,
        r_id_desig: resapi?.r_id_desig,
        r_app_date: resapi?.r_app_date,
        r_id_status: resapi?.r_id_status,
        r_visited: resapi?.r_visited,
        r_docuv: resapi?.r_docuv
      });

      setCheckBoxRegionStatus(true);
      setapproveRegionbtn(true);

      setZonalMGForm({
        ...zonalMGForm,
        z_id: resapi?.z_id,
        z_user_person: resapi?.z_user_Person,
        z_id_desig: resapi?.z_id_desig,
        z_app_date: resapi?.z_app_date,
        // z_user_id: JSON?.parse(userinfo)?.user_id,
        // z_visited: props?.data?.[0]?.z_visited,
        z_visited: resapi?.z_visited,
        z_docuv: resapi?.z_docuv,
        // z_id_status: props?.data?.[0]?.z_id_status,
        z_id_status: resapi?.z_id_status
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
        rdm_id_status: resapi?.rdm_id_status
      });
      setRdmSubBtn(resapi?.rdm_id_status == "Recommended" ? true : false || resapi?.rdm_id_status == "Rejected HR Onboarding by RDM" ? true : false );

      setzdmForm({
        ...zdmForm,
        zdm_id: resapi?.zdm_id,
        zdm_name: resapi?.zdm_name,
        zdm_user_id: resapi?.zdm_user_id,
        zdm_id_desig: resapi?.zdm_desig,
        zdm_app_date: resapi?.zdm_app_date,
        zdm_id_status: resapi?.zdm_id_status
      });

      // this is adding right now
      setzdmSubBtn(resapi?.zdm_id_status == "Recommended" ? true : false || resapi?.zdm_id_status == "Rejected HR Onboarding by ZDM" ? true : false);
      // reject status

      setTempReason({
        rdm_r_reason: resapi?.rdm_r_reason,
        rdm_r_date: resapi?.rdm_r_date ? moment(resapi?.rdm_r_date).format("DD-MM-YYYY") : "",
        rm_r_reason: resapi?.rm_r_reason,
        rm_r_date: resapi?.rm_r_date ? moment(resapi?.rm_r_date).format("DD-MM-YYYY") : "",
        zdm_r_reason: resapi?.zdm_r_reason,
        zdm_r_date: resapi?.zdm_r_date ? moment(resapi?.zdm_r_date).format("DD-MM-YYYY") : "",
        zm_r_reason: resapi?.zm_r_reason,
        zm_r_date: resapi?.zm_r_date ? moment(resapi?.zm_r_date).format("DD-MM-YYYY") : "",
        bu_r_reason: resapi?.bu_r_reason,
        bu_r_date: resapi?.bu_r_date ? moment(resapi?.bu_r_date).format("DD-MM-YYYY") : ""
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
        t_app_date: resapi?.t_app_date,
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
        app_status: resapi?.t_app_date
      });
      setCheckBoxStatus(true);
      setapproveZAbtn(true);

      setRegionForm({
        r_id: resapi?.r_id,
        r_person: resapi?.r_user_Person,
        r_user_id: resapi?.r_user_id,
        r_id_desig: resapi?.r_id_desig,
        r_app_date: resapi?.r_app_date,
        r_id_status: resapi?.r_id_status,
        r_visited: resapi?.r_visited,
        r_docuv: resapi?.r_docuv
      });
      setCheckBoxRegionStatus(true);
      setapproveRegionbtn(true);

      setZonalMGForm({
        z_id: resapi?.z_id,
        z_user_person: resapi?.z_user_Person,
        z_id_desig: resapi?.z_id_desig,
        z_app_date: resapi?.z_app_date,
        // z_user_id: JSON?.parse(userinfo)?.user_id,
        // z_visited: props?.data?.?.z_visited,
        z_visited: resapi?.z_visited,
        z_docuv: resapi?.z_docuv,
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
      const res = await axios.get(
        `${url}/api/get_employee?z=true&additional_data=true&e_id=${router.query.id}`,
        { headers: headers }
      );
      const resapi = await res.data.data;
      // setTempRM({
      //   rm_r_reason: resapi?.rm_r_reason,
      //   rm_r_date: moment(resapi?.rm_r_date).format("DD-MM-YYYY")
      // });

      //////////      Rejection /////////////////////////////////////////

      setTempReason({
        rdm_r_reason: resapi?.rdm_r_reason,
        rdm_r_date: resapi?.rdm_r_date ? moment(resapi?.rdm_r_date).format("DD-MM-YYYY") : "",
        rm_r_reason: resapi?.rm_r_reason,
        rm_r_date: resapi?.rm_r_date ? moment(resapi?.rm_r_date).format("DD-MM-YYYY") : "",
        zdm_r_reason: resapi?.zdm_r_reason,
        zdm_r_date: resapi?.zdm_r_date ? moment(resapi?.zdm_r_date).format("DD-MM-YYYY") : "",
        zm_r_reason: resapi?.zm_r_reason,
        zm_r_date: resapi?.zm_r_date ? moment(resapi?.zm_r_date).format("DD-MM-YYYY") : "",
        bu_r_reason: resapi?.bu_r_reason,
        bu_r_date: resapi?.bu_r_date ? moment(resapi?.bu_r_date).format("DD-MM-YYYY") : ""
      });

      setTerriInfo({
        ...terriForm,
        t_id: resapi?.t_d,
        t_user_person: resapi?.t_user_Person,
        t_user_id: resapi?.t_user_id,
        t_id_desig: resapi?.t_id_desig,
        t_app_date: resapi?.t_app_date,
        t_id_status: resapi?.t_id_status
      });
      setSubBtn(resapi?.t_id_status == "Pending For Approve" ? false : true);

      setrdmForm({
        ...rdmForm,
        rdm_id: resapi?.rdm_id,
        rdm_name: resapi?.rdm_name,
        rdm_user_id: resapi?.rdm_user_id,
        rdm_id_desig: resapi?.rdm_desig,
        rdm_app_date: resapi?.rdm_app_date,
        rdm_id_status: resapi?.rdm_id_status
      });

      setRdmSubBtn(resapi?.rdm_id_status == "Pending for Reccomended" ? false : true);

      setRegionForm({
        ...regionForm,
        r_id: resapi?.r_id,
        r_person: resapi?.r_user_Person,
        r_user_id: resapi?.r_user_id,
        r_id_desig: resapi?.r_id_desig,
        r_app_date: resapi?.r_app_date,
        r_id_status: resapi?.r_id_status,
        r_visited: resapi?.r_visited,
        r_docuv: resapi?.r_docuv
      });

      

     
      setCheckBoxRegionStatus(resapi?.r_id_status == "Pending For Approve" ? false : true);
      setapproveRegionbtn(resapi?.r_id_status == "Pending For Approve" ? false : true);

      setZonalMGForm({
        ...zonalMGForm,
        z_id: resapi?.z_id,
        z_user_person: resapi?.z_user_Person,
        z_id_desig: resapi?.z_id_desig,
        z_app_date: resapi?.z_app_date,
        // z_user_id: JSON?.parse(userinfo)?.user_id,
        // z_visited: props?.data?.[0]?.z_visited,
        z_visited: resapi?.z_visited,
        z_docuv: resapi?.z_docuv,
        // z_id_status: props?.data?.[0]?.z_id_status,
        z_id_status: resapi?.z_id_status
      });

      setCheckBoxZonalMan(resapi?.z_id_status == "Pending For Approve" ? false : true);
      setAppZonalManBtn(resapi?.z_id_status == "Pending For Approve" ? false : true);

      setBunitHead({
        ...bunitHead,
        bu_id: resapi?.bu_id,
        bu_user_person: resapi?.bu_user_Person,
        bu_user_id: resapi?.bu_user_id,
        bu_id_desig: resapi?.bu_id_desig,
        bu_app_date: resapi?.bu_app_date,
        bu_id_status: resapi?.bu_id_status
      });

      setAppBusiBtn(resapi?.bu_id_status == "Pending For Approve" ? false : true);

      setzdmForm({
        ...zdmForm,
        zdm_id: resapi?.zdm_id,
        zdm_name: resapi?.zdm_name,
        zdm_user_id: resapi?.zdm_user_id,
        zdm_id_desig: resapi?.zdm_desig,
        zdm_app_date: resapi?.zdm_app_date,
        zdm_id_status: resapi?.zdm_id_status
      });
      setzdmSubBtn(
        resapi?.zdm_id_status == "Pending For Reccomended" || resapi?.zdm_id_status == "Pending For Approve"
          ? false
          : true
      );

      
    } catch (error) {
      console.log("Err", error);
    }
  }

  useEffect(() => {
    switch (role_Id) {
      case 4:
        getDealerInfoAPIRegion(localInfo);
        break;
      case 5:
      case 9:
        getDealerInfoAPITerri(localInfo);
        break;
      case 12:
        getDealerInfoAPIZoneMg(localInfo);
        break;
      case 3:
        getDealerInfoAPIZoneMg(localInfo);
        break;
      case 1:
      case 8:
      case 17:
        getDealerInfoALL(localInfo);
        break;
      default:
        break;
    }
  }, [role_Id]);

  //Disabling the Submit/Approve buttons Using Props Data

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
        submitStatus == "Approved By Zonal A/c Manager" ||
        submitStatus == "Approved By Region" ||
        submitStatus == "Approved By Zonal" ||
        submitStatus == "Approved By Business Unit" ||
        submitStatus == "Submitted By Territory" ||
        submitStatus == "Recommended By RDM" ||
        submitStatus == "Recommended By ZDM" ||
        //adding these now
        submitStatus == "Rejected HR Onboarding by RDM"||
        submitStatus == "Rejected HR Onboarding by ZDM"||
        submitStatus == "Rejected HR Onboarding by ZM"||
        submitStatus == "Rejected HR Onboarding by BU"||
        submitStatus == "Rejected HR Onboarding by RM"||
        //adding it now hr joining process
        submitStatus == "HR Joining Process Done" 
      ) {
        setSubmitTerriBy(true);
      }
      if (submitStatus == "Approved By Zonal A/c Manager" || submitStatus == "Approved By Business Unit") {
        setSubmitZoneAcBy(true);
      }
      if (
        submitStatus == "Approved By Region" ||
        submitStatus == "Approved By Zonal" ||
        submitStatus == "Approved By Business Unit" ||
        props?.data?.r_id_status == "Approved" ||
        submitStatus =="Rejected HR Onboarding by RM"
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
        props?.data?.r_id_status == "Approved"
      ) {
        // setSubmitZDMBy(true);
        // setzdmSubBtn(true);
      }
      if (submitStatus == "Approved By Zonal" || submitStatus == "Approved By Business Unit" || submitStatus == "Rejected HR Onboarding by ZM") {
        setSubmitZoneMgBy(true);
      }
      if (submitStatus == "Approved By Business Unit" || submitStatus == "Rejected HR Onboarding by BU") {
        setSubmitBusiBy(true);
      }
    }
  }, [props]);

  ////////////////////////////////////////////////////  MODALS / REJECTIONS   /////////////////////////////////////////////////////// ////

  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [rejectModalTitle, setRejectModalTitle] = useState("");
  const [rejectFormData, setRejectFormData] = useState({});
  const [tempReason, setTempReason] = useState(null);
  const [tempRM, setTempRM] = useState(null);
  const [rejectDate, setRejectDate] = useState(null);
  const [rejbtn, setRejBtn] = useState(null);
  const [rejectWhatsAppData, setRejectWhatsAppData] = useState({});

  console.log("TEMPDAtA", tempReason);

  const handleModalReject = (rejectType) => {
    setRejectModalTitle(rejectType);
    let whatsAppData = {};

    if (rejectType === "RDM Reject") {
      whatsAppData = {
        recipientMob: props?.data?.t_mobile_no,
        // recipientMob: 6398067642,
        empName: props?.data?.fname + " " + props?.data?.lname,
        levelPerson: props?.data?.t_hod_name || "Territory",
        rejectionReason: "Testing Reason",
        userPerson: props?.data?.rdm_desig || "RDM"
      };
      setRejectFormData({
        rdm_r_date: moment(new Date()).format("YYYY-MM-DD"),
        rdm_r_reason: ""
      });
    } else if (rejectType === "RM Reject") {
      whatsAppData = {
        recipientMob: props?.data?.t_mobile_no,
        // recipientMob: 6398067642,
        empName: props?.data?.fname + " " + props?.data?.lname,
        levelPerson: props?.data?.rdm_hod_name || "RDM",
        rejectionReason: "Testing Reason",
        userPerson: props?.data?.r_hod_name || "Region"
      };
      setRejectFormData({
        rm_r_date: moment(new Date()).format("YYYY-MM-DD"),
        rm_r_reason: ""
      });
    } else if (rejectType === "ZDM Reject") {
      whatsAppData = {
        recipientMob: props?.data?.t_mobile_no,
        // recipientMob: 6398067642,
        empName: props?.data?.fname + " " + props?.data?.lname,
        levelPerson: props?.data?.r_hod_name || "Region",
        rejectionReason: "Testing Reason",
        userPerson: props?.data?.r_hod_name || "Region"
      };
      setRejectFormData({
        zdm_r_date: moment(new Date()).format("YYYY-MM-DD"),
        zdm_r_reason: ""
      });
    } else if (rejectType === "ZM Reject") {
      whatsAppData = {
        recipientMob: props?.data?.t_mobile_no,
        // recipientMob: 6398067642,
        empName: props?.data?.fname + " " + props?.data?.lname,
        levelPerson: props?.data?.zdm_hod_name || "ZDM",
        rejectionReason: "Testing Reason",
        userPerson: props?.data?.z_hod_name || "Zone"
      };
      setRejectFormData({
        zm_r_date: moment(new Date()).format("YYYY-MM-DD"),
        zm_r_reason: ""
      });
    } else if (rejectType === "BU Reject") {
      whatsAppData = {
        recipientMob: props?.data?.t_mobile_no,
        // recipientMob: 6398067642,
        empName: props?.data?.fname + " " + props?.data?.lname,
        levelPerson: props?.data?.z_hod_name || "Zone",
        rejectionReason: "Testing Reason",
        userPerson: props?.data?.bu_hod_name || "Business Unit"
      };
      setRejectFormData({
        bu_r_date: moment(new Date()).format("YYYY-MM-DD"),
        bu_r_reason: ""
      });
    }
    setRejectWhatsAppData(whatsAppData);
    setIsRejectModalOpen(true);
    
  };

  //Handle Reject Close 

  function handleRejectModalClose () {
    setRejBtn(false); 
  };

  const handleRejectData = (reason) => {
    if (rejectModalTitle === "RDM Reject") {
      if (reason?.rdm_r_reason) {
        setTempReason(reason);
        setRejBtn(true);
      }
    } else if (rejectModalTitle === "RM Reject") {
      if (reason?.rm_r_reason) {
        setTempReason(reason);
        setRejBtn(true);
      }
      console.log("RM Rejection reason:", reason);
    } else if (rejectModalTitle === "ZDM Reject") {
      if (reason?.zdm_r_reason) {
        setTempReason(reason);
        setRejBtn(true);
      }
      console.log("ZDM Rejection reason:", reason);
    } else if (rejectModalTitle === "ZM Reject") {
      if (reason?.zm_r_reason) {
        setTempReason(reason);
        setRejBtn(true);
      }
      console.log("ZM Rejection reason:", reason);
    } else if (rejectModalTitle === "BU Reject") {
      if (reason?.bu_r_reason) {
        setTempReason(reason);
        setRejBtn(true);
      }
      console.log("BU Rejection reason:", reason);
    }
  };

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <form className=" bg-white rounded   p-4 w-full  overflow-auto" onSubmit={(e) => e.preventDefault()}>
      <RejectApproval
        isOpen={isRejectModalOpen}
        onClose={() => setIsRejectModalOpen(false)}
        title={rejectModalTitle}
        formData={rejectFormData}
        setFormData={setRejectFormData}
        refreshData={() => setIsRejectModalOpen(false)}
        getDataFrom={handleRejectData}
        whatsAppData={rejectWhatsAppData}
        onClosee={handleRejectModalClose}
      ></RejectApproval>

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
                    rdmForm?.rdm_app_date
                      ? rdmForm?.rdm_app_date
                      : terriForm?.t_app_date
                      ? new Date().getTime()
                      : new Date()
                  )
                }
                dropdownMode="select"
                dateFormat={"dd/MM/yyyy"}
                minDate={terriForm?.t_app_date ? new Date(new Date().getTime()) : undefined}
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
                value={rdmForm?.rdm_id_status}
                disabled
              />
            </div>
            <div className="w-full px-2 ">
              <label className="block text-gray-700 text-sm font-bold mb-2 pt-2" htmlFor="inputField">
                <small className="text-red-600">*</small> Reason of Rejection
              </label>
              <input
                className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                type="text"
                id="inputField"
                value={tempReason?.rdm_r_reason}
                disabled
              />
            </div>
            <div className="w-full px-2 ">
              <label className="block text-gray-700 text-sm font-bold mb-2 pt-2" htmlFor="inputField">
                <small className="text-red-600">*</small> Date of Rejection
              </label>
              <input
                className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                type="text"
                id="inputField"
                value={tempReason?.rdm_r_date}
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
                disabled={rdmSubBtn || submitRdmBy ||rejbtn}
                // for now disabled for checking here to open modal
                // disabled
                onClick={handleRdmSubmit}
                className={`${
                  rdmSubBtn || submitRdmBy || rejbtn ? "bg-gray-400" : "bg-green-600"
                }  px-3 py-1 rounded-sm`}
              >
                Recommend
              </button>
              <button
                onClick={() => {
                  handleModalReject("RDM Reject");
                }}
                disabled={rdmSubBtn || submitRdmBy || rejbtn}
                
                className={`${rdmSubBtn || submitRdmBy || rejbtn ? "bg-gray-400" : "bg-red-600"} px-3 py-1 rounded-sm`}
                // className={`${rejbtn ? "bg-gray-400" : "bg-red-600"} px-3 py-1 rounded-sm`}
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
                    regionForm?.r_app_date
                      ? regionForm?.r_app_date
                      : terriForm?.t_app_date
                      ? new Date().getTime()
                      : new Date()
                  )
                }
                dropdownMode="select"
                dateFormat={"dd/MM/yyyy"}
                minDate={terriForm?.t_app_date ? new Date(new Date().getTime()) : undefined}
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

            <div className="w-full px-2 ">
              <label className="block text-gray-700 text-sm font-bold mb-2 pt-2" htmlFor="inputField">
                <small className="text-red-600">*</small> Reason of Rejection
              </label>
              <input
                className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                type="text"
                id="inputField"
                value={tempReason?.rm_r_reason}
                disabled
              />
            </div>
            <div className="w-full px-2 ">
              <label className="block text-gray-700 text-sm font-bold mb-2 pt-2" htmlFor="inputField">
                <small className="text-red-600">*</small> Date of Rejection
              </label>
              <input
                className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                type="text"
                id="inputField"
                value={tempReason?.rm_r_date}
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
                disabled={approveRegionbtn || submitRegionBy || rejbtn}
                onClick={handleRegionSubmit}
                className={`${
                  approveRegionbtn || submitRegionBy || rejbtn ? "bg-gray-400" : "bg-green-600"
                }  px-3 py-1 rounded-sm`}
              >
                Approval
              </button>
              <button
                disabled={approveRegionbtn || submitRegionBy || rejbtn}
                onClick={() => {
                  handleModalReject("RM Reject");
                }}
                className={`${
                  approveRegionbtn || submitRegionBy || rejbtn ? "bg-gray-400" : "bg-red-600"
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
                    zdmForm?.zdm_app_date
                      ? zdmForm?.zdm_app_date
                      : regionForm?.r_app_date
                      ? new Date().getTime()
                      : new Date()
                  )
                }
                dropdownMode="select"
                dateFormat={"dd/MM/yyyy"}
                minDate={regionForm?.r_app_date ? new Date(new Date().getTime()) : undefined}
                onChange={(date) => {
                  setzdmForm({
                    ...zdmForm,
                    zdm_app_date: moment(date).format("LL")
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
                value={zdmForm?.zdm_id_status}
                disabled
              />
            </div>

            <div className="w-full px-2 ">
              <label className="block text-gray-700 text-sm font-bold mb-2 pt-2" htmlFor="inputField">
                <small className="text-red-600">*</small> Reason of Rejection
              </label>
              <input
                className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                type="text"
                id="inputField"
                value={tempReason?.zdm_r_reason}
                disabled
              />
            </div>
            <div className="w-full px-2 ">
              <label className="block text-gray-700 text-sm font-bold mb-2 pt-2" htmlFor="inputField">
                <small className="text-red-600">*</small> Date of Rejection
              </label>
              <input
                className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                type="text"
                id="inputField"
                value={tempReason?.zdm_r_date}
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
                disabled={zdmSubBtn || submitZDMBy || rejbtn}
                onClick={handleZdmSubmit}
                className={`${
                  zdmSubBtn || submitZDMBy || rejbtn ? "bg-gray-400" : "bg-green-600"
                }  px-3 py-1 rounded-sm`}
              >
                Recommend
              </button>
              <button
                disabled={zdmSubBtn || rejbtn || submitZDMBy}
                onClick={() => {
                  handleModalReject("ZDM Reject");
                }}
                className={`${zdmSubBtn || rejbtn || submitZDMBy ? "bg-gray-400" : "bg-red-600"} px-3 py-1 rounded-sm`}
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
                    zonalMGForm?.z_app_date
                      ? zonalMGForm?.z_app_date
                      : regionForm?.r_app_date
                      ? new Date().getTime()
                      : new Date()
                  )
                }
                dateFormat={"dd/MM/yyyy"}
                dropdownMode="select"
                minDate={regionForm?.r_app_date ? new Date(new Date().getTime()) : undefined}
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

            <div className="w-full px-2 ">
              <label className="block text-gray-700 text-sm font-bold mb-2 pt-2" htmlFor="inputField">
                <small className="text-red-600">*</small> Reason of Rejection
              </label>
              <input
                className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                type="text"
                id="inputField"
                value={tempReason?.zm_r_reason}
                disabled
              />
            </div>
            <div className="w-full px-2 ">
              <label className="block text-gray-700 text-sm font-bold mb-2 pt-2" htmlFor="inputField">
                <small className="text-red-600">*</small> Date of Rejection
              </label>
              <input
                className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                type="text"
                id="inputField"
                value={tempReason?.zm_r_date}
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
                disabled={appZonalManBtn || submitZoneMgBy || rejbtn}
                onClick={handleZonalManagerSubmit}
                className={`${
                  appZonalManBtn || submitZoneMgBy || rejbtn ? "bg-gray-400" : "bg-green-600"
                } px-3 py-1 rounded-sm`}
              >
                Approval
              </button>
              <button
                disabled={appZonalManBtn || submitZoneMgBy || rejbtn}
                onClick={() => {
                  handleModalReject("ZM Reject");
                }}
                className={`${
                  appZonalManBtn || submitZoneMgBy || rejbtn ? "bg-gray-400" : "bg-red-600"
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
                selected={
                  new Date(
                    bunitHead?.bu_app_date
                      ? bunitHead?.bu_app_date
                      : zoneAcForm?.zac_app_date
                      ? new Date().getTime()
                      : new Date()
                  )
                }
                // showMonthDropdown
                dateFormat={"dd/MM/yyyy"}
                dropdownMode="select"
                minDate={zoneAcForm?.zac_app_date ? new Date(new Date().getTime()) : undefined}
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

            <div className="w-full px-2 ">
              <label className="block text-gray-700 text-sm font-bold mb-2 pt-2" htmlFor="inputField">
                <small className="text-red-600">*</small> Reason of Rejection
              </label>
              <input
                className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                type="text"
                id="inputField"
                value={tempReason?.bu_r_reason}
                disabled
              />
            </div>
            <div className="w-full px-2 ">
              <label className="block text-gray-700 text-sm font-bold mb-2 pt-2" htmlFor="inputField">
                <small className="text-red-600">*</small> Date of Rejection
              </label>
              <input
                className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                type="text"
                id="inputField"
                value={tempReason?.bu_r_date}
                disabled
              />
            </div>
          </div>

          {(router.query.type === "Edit" || router.query.type === "EditAp") && (
            <div className="flex w-full justify-center gap-4 text-white py-6">
              <button
                disabled={appBusiBtn || submitBusiBy || rejbtn}
                onClick={handleBunitHeadSubmit}
                className={`${
                  appBusiBtn || submitBusiBy || rejbtn ? "bg-gray-400" : "bg-green-600"
                } px-3 py-1 rounded-sm`}
              >
                Approval
              </button>
              <button
                disabled={appBusiBtn || submitBusiBy || rejbtn}
                onClick={() => {
                  handleModalReject("BU Reject");
                }}
                className={`${
                  appBusiBtn || submitBusiBy || rejbtn ? "bg-gray-400" : "bg-red-600"
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

export default Approval;
