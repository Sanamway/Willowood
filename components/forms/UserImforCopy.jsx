import React, { useState, useEffect, useRef, use } from "react";
import Layout from "../Layout";
import { AiTwotoneHome, AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { TiArrowBack } from "react-icons/ti";
import { useRouter } from "next/router";
import userimg from "../../public/userimg.jpg";
import Image from "next/image";
import axios from "axios";
import { url } from "@/constants/url";
import * as Yup from "yup";
import toast, { Toaster } from "react-hot-toast";
import Select from "react-select";

const UserInformation = () => {
  const router = useRouter();
  const [userImage, setUserImage] = useState("");
  const [userOptions, setUserOptions] = useState([]);
  const [showPass, setShowPass] = useState(false);
  const [compList, setCompList] = useState("");
  const { id, view } = router.query;
  const [cid, setCid] = useState(null);
  const [comDisable, setcomDisable] = useState(true);
  const [clearCompList, setClearCompList] = useState(false);

  const modeList = [
    {
      value: "mobile",
      label: "mobile"
    },
    {
      value: "web",
      label: "web"
    }
  ];

  const [comSelect, setCompSelect] = useState({
    comp: []
  });

  const handleCompChange = (selectedOptions) => {
    const arr = selectedOptions.map((option) => ({ label: option.label, value: option.value }));
    setFormState({ ...formState, c_id: arr });
  };

  const handleModeChange = (selectedOptions) => {
    const arr = selectedOptions.map((option) => ({ label: option.label, value: option.value }));
    setFormState({ ...formState, modes: arr });
  };

  const headers = {
    "Content-Type": "application/json",
    secret: "fsdhfgsfuiweifiowefjewcewcebjw"
  };

  //getlocaldta
  const [user, setUser] = useState("");
  const [userName, setUsername] = useState("");
  const [ui, setUid] = useState("");
  const [email_id, setEmailId] = useState("");

  const [tempImage, setTempImage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  const getDataById = async (id) => {
    try {
      const respond = await axios.get(`${url}/api/get_user/${id}`, {
        headers: headers
      });
      const apires = await respond.data.data;
      console.log("ff", apires);
      setFormState({
        _id: apires[0]._id,
        cId: apires[0].c_id,
        empCode: apires[0]._id,
        user_id: apires[0].user_id,
        user_name: apires[0].user_name,
        address: apires[0].address,
        // city: apires[0].city,
        // state: apires[0].state,
        searchCity: {
          value: apires[0].value,
          label: apires[0].city,
          state: apires[0].state,
          country: apires[0].country
        },
        phone_number: apires[0].phone_number,
        password: apires[0].password,
        confirm_password: apires[0].confirm_password,
        email: apires[0].email,
        phone_number: apires[0].phone_number,
        t_user: apires[0].t_user,
        status: apires[0].status,
        position: apires[0].position,
        about_me: apires[0].about_me,
        otp_enable: apires[0].otp_enable,
        // mode: apires[0].mode,
        modes: apires[0].mode,
        app_type: apires[0]?.app_type,
        image: apires[0].image_url,
        c_id: apires[0].c_names,
        emp_code: apires[0].emp_code
      });
      setImagePreview(apires[0]?.image_url);

      getImage(apires[0]?.phone_number);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (router.query.type === "CREATE") return;
    if (id) {
      getDataById(id);
    }
  }, [id, view]);

  // const searchCity=""

  const [selectRoleId, setSelectedRoleId] = useState("");

  const [formState, setFormState] = useState({
    cId: "",
    empCode: "",
    user_name: "",
    address: "",
    // city: searchCity.value.label,
    searchCity: {
      value: "",
      label: "",
      state: "",
      country: ""
    },
    // state: "",
    email: "",
    phone_number: "",
    password: "",
    confirm_password: "",
    t_user: "",
    position: "",
    about_me: "",
    status: "",
    otp_enable: "",
    mode: "",
    app_type: "",
    c_name: userName,
    ul_name: userName,
    image: tempImage,
    c_id: [],
    role_id: "",
    emp_code: "",
    modes: []
  });

  // console.log("form", formState);

  //Defining the Validation Schema
  const validationSchema = Yup.object().shape({
    user_name: Yup.string().required("User name is required"),
    address: Yup.string().required("Address is required"),
    otp_enable: Yup.string().required("OTP is required"),
    mode: Yup.string().required("Mode is required"),
    email: Yup.string().email("Invalid email format").required("Email is required"),
    phone_number: Yup.number()
      .transform((value, originalValue) => {
        if (originalValue === "") return undefined;
        return Number(value);
      })
      .required("Mobile No is required")
      .test("is-valid-number", "Invalid Mobile Number", (value) => {
        if (!value) return false;
        const stringValue = value.toString();
        return /^[6-9]\d{9}$/.test(stringValue);
      })
      .typeError("Mobile No must be a valid number"),

    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters long"),

    confirm_password: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
    t_user: Yup.string().required("Profile is required"),
    status: Yup.string().required("Status is required"),
    // city: Yup.string().required("City is required"),
    // state: Yup.string().required("State is required"),
    position: Yup.string().required("Designation is required")
  });
  const [formErrors, setFormErrors] = useState({});

  const handleSaveCompanyInfo = async (e, tempImage) => {
    if (!tempImage) {
      toast.error("Please select an image");
      return;
    }
    e.preventDefault();
    try {
      // await validationSchema.validate(formState, { abortEarly: false });
      const data = {
        user_name: formState.user_name,
        address: formState.address,
        // city: formState.city,
        city: formState.searchCity.label,
        // state: formState.state,
        state: formState.searchCity.state,
        phone_number: formState.phone_number,
        password: formState.password,
        confirm_password: formState.confirm_password,
        email: formState.email,
        phone_number: formState.phone_number,
        t_user: formState.t_user,
        status: formState.status,
        position: formState.position,
        about_me: formState.about_me,
        otp_enable: formState.otp_enable,
        // mode: formState.mode,
        mode: formState.modes,
        app_type: formState.app_type,
        image: tempImage,
        c_name: userName,
        ul_name: userName,
        c_id: formState.c_id,
        role_id: formState.role_id,
        emp_code: formState.emp_code
      };

      //Image uploading

      function getFileExtension(filename) {
        if (typeof filename !== "string") {
          console.error("Invalid input. Expected a string.");
          return "";
        }

        const parts = filename.split(".");
        if (parts.length > 1) {
          return parts[parts.length - 1];
        } else {
          return "";
        }
      }

      console.log("NewWid", data);

      // return;

      const respond = await axios.post(`${url}/api/create_user`, JSON.stringify(data), {
        headers: headers
      });
      const response = await respond.data.data;
      const phoneNumber = response.phone_number;

      // console.log("APIRESP", phoneNumber);

      if (phoneNumber) {
        // toast.success(respdata.message);

        if (tempImage) {
          const imageFormData = new FormData();
          const timestamp = Date.now();
          imageFormData.append(
            "myFile",
            tempImage,
            `${phoneNumber}_${timestamp}.${getFileExtension(tempImage?.name)}`
          );
          const imageUploadResp = await axios.post(
            `${url}/api/upload_file/?file_path=user&mob_no=${phoneNumber}`,
            imageFormData,
            {
              headers: {
                ...headers,
                "Content-Type": "multipart/form-data"
              }
            }
          );

          console.log("Image uploaded", imageUploadResp.data);

          if (imageUploadResp.data) {
            toast.success("Image uploaded successfully");
          }
        }
      }

      // return;
      if (respond) {
        toast.success("User added successfully!");
        whatsAppMsg();
        setTimeout(() => {
          router.push("/table/table_user_information");
        }, 2000);
      }
    } catch (errors) {
      const messageError = errors?.response?.data?.message;
      console.log("userinf", messageError);

      if (messageError) {
        toast.error(messageError);
        return;
      }
      const errorMessage = errors?.response?.data?.error;
      if (errorMessage?.includes("email_1")) {
        toast.error("Email already exist");
      } else if (errorMessage?.includes("phone_number_1")) {
        toast.error("User Mobile Number already exist");
      }
      const newErrors = {};
      errors?.inner?.forEach((error) => {
        newErrors[error?.path] = error?.message;
      });
      setFormErrors(newErrors);
    }
  };

  /////////////////Uploding Image/////////////////////////

  const fileInputRef = useRef(null);

  const handleEditCompanyInfo = async (e, id) => {
    console.log("ff");
    e.preventDefault();
    try {
      // Validate the form data
      // const uid = formState?._id;
      // await validationSchema.validate(formState, { abortEarly: false });
      const data = {
        user_name: formState.user_name,
        address: formState.address,
        // city: formState.city,
        city: formState.searchCity.label.trim(),
        // state: formState.state,
        state: formState.searchCity.state.trim(),
        phone_number: formState.phone_number,
        password: formState.password,
        confirm_password: formState.confirm_password,
        email: formState.email,
        phone_number: formState.phone_number,
        t_user: formState.t_user,
        status: formState.status,
        position: formState.position,
        about_me: formState.about_me,
        otp_enable: formState.otp_enable,
        // mode: formState.mode,
        mode: formState.modes,
        // mode: apires[0].modes,
        app_type: formState?.app_type ?? "Field Force Apps",
        // app_type: apires[0]?.app_type,
        c_id: formState.c_id,
        role_id: formState.role_id,
        emp_code: formState.emp_code,
        image: userImage
      };

      console.log("EditData", data);

      // return;

      // const res = await axios.put(`${url}/api/update_user/${id}`, JSON.stringify(data), {
      //   headers: headers
      // });
      // const resp = await res.data;

      // return
      const respond = await axios.put(`${url}/api/update_user/${id}`, JSON.stringify(data), {
        headers: headers
      });
      const response = await respond.data;
      // const phoneNumber = response?.data?.phone_number;
      const phoneNumber = formState?.phone_number;

      console.log("APIRESP", formState?.phone_number);

      function getFileExtension(filename) {
        if (typeof filename !== "string") {
          console.error("Invalid input. Expected a string.");
          return "";
        }

        const parts = filename.split(".");
        if (parts.length > 1) {
          return parts[parts.length - 1];
        } else {
          return "";
        }
      }

      console.log(getFileExtension(tempImage?.name));

      if (response) {
        toast.success(response.message);
        if (tempImage) {
          const imageFormData = new FormData();
          const timestamp = Date.now();
          imageFormData.append(
            "myFile",
            tempImage,
            `${phoneNumber}_${timestamp}.${getFileExtension(tempImage?.name)}`
          );

          const imageUploadResp = await axios.post(
            `${url}/api/upload_file/?file_path=user&mob_no=${phoneNumber}`,
            imageFormData,
            {
              headers: {
                ...headers,
                "Content-Type": "multipart/form-data"
              }
            }
          );

          console.log("Image uploaded", imageUploadResp.data);

          if (imageUploadResp.data) {
            toast.success("Image uploaded successfully");
          }
        }
      }

      // toast.success(response.message);
      if (response.message) {
        setTimeout(() => {
          router.push("/table/table_user_information");
        }, 1000);
      }
    } catch (errors) {
      // toast.error(errors.message);
      // console.log("rr", errors.message);
      const errorMessage = errors?.response?.data?.error;

      // if (errorMessage) {
      //   toast.error(errorMessage);
      //   return;
      // }

      if (errorMessage?.includes("email_1")) {
        toast.error("Email already exist");
      } else if (errorMessage?.includes("gst_no_1")) {
        toast.error("GST number already exist");
      } else if (errorMessage?.includes("cmpny_name_1")) {
        toast.error("Company Name already exist");
      } else if (errorMessage?.includes(" phone_number_1")) {
        toast.error("User Mobile Number already exist");
      }

      const newErrors = {};
      errors?.inner?.forEach((error) => {
        newErrors[error?.path] = error?.message;
      });
      setFormErrors(newErrors);
    }
  };

  const handleSave = (e, tempImage) => {
    if (router.query.type !== "Edit") {
      handleSaveCompanyInfo(e, tempImage);
    } else {
      handleEditCompanyInfo(e, id);
    }
  };

  //toggle to see password

  const togglePassword = () => {
    setShowPass(!showPass);
  };

  //check file size

  //getting Image from the API

  const getImage = async (phone_number) => {
    try {
      const res = await axios.get(`${url}/api/get_image?phone_number=${phone_number}&file_path=user`, {
        headers: headers
      });
      const respData = await res.data;
      console.log("Image", respData?.data?.image_url);
      setUserImage(respData?.data?.image_url);
    } catch (error) {
      console.log("Error", error);
    }
  };

  // useEffect(()=>{
  //   if(router.query.id){
  //     getImage()
  //   }
  // },[])

  //getting user profile dropdown menus

  const gettingDropdown = async () => {
    try {
      const resoptions = await axios.get(`${url}/api/user_profiles?c_id=${cid}`, {
        headers: headers
      });
      const respData = await resoptions.data.data;
      setUserOptions(respData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (cid) {
      gettingDropdown();
    }
  }, [cid]);

  useEffect(() => {
    if (window.localStorage) {
      const c_id = localStorage.getItem("c_id");
      setCid(c_id);
    }
  }, []);

  useEffect(() => {
    if (window.localStorage) {
      const isLoggedInInLocalStorage = !!localStorage.getItem("uid");
      const userName = localStorage.getItem("user_name");
      const uid = localStorage.getItem("uid");
      setUser(isLoggedInInLocalStorage);
      setEmailId(email_id);
      setUsername(userName);
      setUid(uid);
    }

    if (!localStorage.getItem("uid")) {
      router.push("/login");
    }
  }, []);

  //get all cities data

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
            country: item?.country
          };
        })
      );
      console.log("fdefe", response);
    } catch (error) {}
  };

  useEffect(() => {
    if (citySearch) {
      getCityData(citySearch);
    }
  }, [citySearch]);

  //WhatsApp Message Send Handler

  async function whatsAppMsg() {
    try {
      const payLoad = {
        recipient: formState.phone_number,
        tem_id: "142599",
        placeholders: [formState.user_name, formState.phone_number, "http://digital.willowood.com"]
      };
      const res = await axios.post(`${url}/api/whatsAppChat`, JSON.stringify(payLoad), {
        headers: headers
      });
      const respData = await res.data;
      console.log("Image", respData?.data?.image_url);
      setUserImage(respData?.data?.image_url);
    } catch (error) {
      console.log("Error", error);
    }
  }

  //get All Companies List

  const getAllCompIds = async (ciid, cid) => {
    const res = await axios.get(`${url}/api/get_company_information${ciid}${cid}`, { headers: headers });
    const respdata = await res.data.data;
    // const filtered = respdata.map((item)=> [...item])
    setCompList(respdata);
    console.log("getAllcompids", respdata);
    // console.log("filtereCOmpo", filtered)
  };

  useEffect(() => {
    switch (formState.role_id) {
      case 1:
        getAllCompIds("", "");
        break;
      default:
        const ciid = "?c_id=";
        getAllCompIds(ciid, cid);
    }
  }, [formState.role_id, cid]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (!allowedTypes.includes(file?.type)) {
      toast.error("Please upload only JPG, JPEG or PNG images");
      return;
    }

    const maxSize = 2 * 1024 * 1024;
    if (file?.size > maxSize) {
      toast.error("Image size should be less than 2MB");
      return;
    }

    setTempImage(file);
    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);
  };

  

  useEffect(() => {
    if(router.query.type=="CREATE"){
    const hasMobile = formState.modes.some((item) => item.value === "mobile");
    const hasWeb = formState.modes.some((item) => item.value === "web");
  
    setFormState((prevState) => ({
      ...prevState,
      app_type: hasMobile ? "Field Force Apps" : "",
    }));
  }

  }, [formState.modes]);
  


  return (
    <>
      <Layout>
        <Toaster position="bottom-center" reverseOrder={false} />
        <div className="  w-full font-arial bg-white ">
          <div className="text-black flex items-center justify-between bg-white max-w-full font-arial h-[52px] px-5">
            <h2 className="font-arial font-normal text-3xl tabletitle py-2">User Information</h2>
            <div className="flex items-center gap-2 cursor-pointer">
              <h2>
                <TiArrowBack
                  onClick={() => {
                    router.push("/table/table_user_information");
                  }}
                  className="text-gray-400"
                  size={35}
                ></TiArrowBack>
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
            </div>
          </div>

          {/* <div className="bg-gray-300"></div> */}
          <div className="text-black  relative ">
            <div className="bg-gray-100 p-4 absolute w-full min-h-screen  ">
              <form
                onSubmit={(e) => e.preventDefault()}
                disabled={router.query.type === "CREATE"}
                className="max-w-1/2 mx-4 mt mb-12 bg-white rounded shadow p-4"
              >
                <div className="flex items-center justify-between w-full">
                  <div className="flex gap-4 items-start justify-between mb-4 w-3/4">
                    <div className="w-1/2 ">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="emailField">
                        Employee
                      </label>
                      <input
                        className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                        type="text"
                        id="inputField"
                        placeholder="Employee Code"
                        value={formState?.emp_code}
                        onChange={(e) => {
                          {
                            if (e.target.value.length > 20) {
                              console.log(e.target.value);
                              return;
                            }
                            setFormState({
                              ...formState,
                              emp_code: e.target.value.toUpperCase()
                            });
                          }
                        }}
                      />
                    </div>
                    <div className="w-1/2 relative ">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phoneField">
                        <span className="text-red-500">*</span> User name
                      </label>
                      <input
                        className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                        type="text"
                        id="inputField"
                        name="user_name"
                        placeholder="Username"
                        value={formState.user_name}
                        onChange={(e) =>
                          setFormState({
                            ...formState,
                            user_name: e.target.value
                          })
                        }
                      />
                      {formErrors.user_name && (
                        <p className="text-red-500 text-sm absolute bottom-12 right-3 cursor-pointer">
                          {formErrors.user_name}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center flex-col space-x-4">
                    {imagePreview && (
                      <div className="relative">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="lg:w-32 lg:h-32 w-20 h-20 object-cover rounded-full"
                        />
                        {router.query.type !== "view" && (
                          <button
                            type="button"
                            onClick={() => {
                              setTempImage("");
                              setImagePreview("");
                            }}
                            className="absolute lg:w-8 lg:h-8 w-4 h-4 top-1 right-2 lg:top-0 lg:right-0 bg-red-500 text-white rounded-full "
                          >
                            ✕
                          </button>
                        )}
                      </div>
                    )}
                    {router.query.type !== "view" && (
                      <input
                        type="file"
                        accept=".jpg,.jpeg,.png"
                        onChange={handleImageChange}
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold
        file:bg-violet-50 file:text-violet-700
        hover:file:bg-violet-100"
                        // disabled={!formState.brand_name || !formState.c_name}
                      />
                    )}
                  </div>
                </div>

                <div className="mb-4 designation relative ">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
                    <span className="text-red-500">*</span> Designation
                  </label>
                  <input
                    className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                    type="text"
                    id="inputField"
                    name="position"
                    placeholder="Designation"
                    value={formState.position}
                    onChange={(e) =>
                      setFormState({
                        ...formState,
                        position: e.target.value
                      })
                    }
                  />
                  {formErrors.position && (
                    <p className="text-red-500 text-sm absolute bottom-12 left-24 cursor-pointer">
                      {formErrors.position}
                    </p>
                  )}
                </div>
                <div className="mb-1 relative">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="textareaField">
                    <span className="text-red-500">*</span> Address
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-3 py-1.5  border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                    id="textareaField"
                    placeholder="Address"
                    name="address"
                    value={formState.address}
                    onChange={(e) =>
                      setFormState({
                        ...formState,
                        address: e.target.value
                      })
                    }
                  ></textarea>
                  {formErrors.address && (
                    <p className="text-red-500 absolute bottom-[7.8rem] left-24 text-sm ">
                      {formErrors.address}
                    </p>
                  )}
                </div>
                <div className="flex -mx-2 mb-4">
                  {/* <div className="w-1/2 px-2 relative ">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="citySelect">
                      <span className="text-red-500">*</span> City
                    </label>
                    <select
                      className="w-full px-3 py-2 border-b border-gray-500 bg-white focus:outline-none focus:border-b focus:border-indigo-500"
                      id="citySelect"
                      name="city"
                      value={formState?.city}
                      onChange={(e) =>
                        setFormState({
                          ...formState,
                          city: e.target.value
                        })
                      }
                    >
                      <option value="" className="focus:outline-none focus:border-b bg-white">
                        Select City
                      </option>
                      <option value="Hisar">Hisar</option>
                      <option value="Delhi">Delhi</option>
                    </select>
                    {formErrors.city && (
                      <p className="text-red-500 text-sm absolute bottom-10 right-3 cursor-pointer">
                        {formErrors.city}
                      </p>
                    )}
                  </div> */}
                  <div className="w-1/2 px-2 relative">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="userSelect">
                      <small className="text-red-600">*</small> City
                    </label>
                    <Select
                      className="w-full px-1  border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                      value={formState.searchCity}
                      isSearchable={true}
                      name="color"
                      options={filteredCity}
                      onChange={(value) =>
                        setFormState({
                          ...formState,
                          searchCity: value
                        })
                      }
                      onInputChange={(searchVal) => setCitySearch(searchVal)}
                    />
                  </div>

                  <div className="w-1/2 px-2 relative ">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="stateSelect">
                      <span className="text-red-500">*</span> State
                    </label>
                    <input
                      className="w-full px-3 py-2 border-b border-gray-500  bg-white focus:outline-none focus:border-b focus:border-indigo-500"
                      id="stateSelect"
                      name="state"
                      value={formState?.searchCity?.state}
                      onChange={(e) =>
                        setFormState({
                          ...formState,
                          state: value
                        })
                      }
                      disabled
                    >
                      {/* <option value="" className="focus:outline-none focus:border-b bg-white">
                        Select State
                      </option>
                      <option value="Haryana">Haryana</option>
                      <option value="Delhi">Delhi</option> */}
                    </input>
                    {/* {formErrors.state && (
                      <p className="text-red-500 text-sm absolute bottom-10 right-3 cursor-pointer">
                        {formErrors.state}
                      </p>
                    )} */}
                  </div>
                </div>

                <div className="flex gap-4 items-center justify-between mb-4">
                  <div className="w-1/2 relative">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="emailField">
                      <span className="text-red-500">*</span> Email
                    </label>
                    <input
                      className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                      type="email"
                      id="emailField"
                      name="email"
                      placeholder="Email"
                      value={formState.email}
                      onChange={(e) =>
                        setFormState({
                          ...formState,
                          email: e.target.value
                        })
                      }
                    />
                    {formErrors.email && (
                      <p className="text-red-500 text-sm absolute bottom-12 right-3 cursor-pointer">
                        {formErrors.email}
                      </p>
                    )}
                  </div>
                  <div className="w-1/2 relative ">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phoneField">
                      <span className="text-red-500">*</span> Mobile No
                    </label>
                    <input
                      className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                      type="number"
                      id="phoneField"
                      name="phone_number"
                      placeholder="Mobile"
                      maxLength={10}
                      value={formState.phone_number}
                      onChange={(e) => {
                        if (e.target.value.length > 10) {
                          return;
                        }
                        setFormState({
                          ...formState,
                          phone_number: e.target.value
                        });
                      }}
                    />
                    {formErrors.phone_number && (
                      <p className="text-red-500 text-sm absolute bottom-12 right-3 cursor-pointer">
                        {formErrors.phone_number}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex gap-4 items-center justify-between mb-4">
                  <div className="w-1/2 relative ">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="emailField">
                      <span className="text-red-500">*</span> Password
                    </label>
                    <input
                      className=" w-full px-3 py-2  border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                      type={showPass ? "text" : "password"}
                      id="passwordField"
                      name="password"
                      placeholder="Password"
                      value={formState.password}
                      onChange={(e) =>
                        setFormState({
                          ...formState,
                          password: e.target.value
                        })
                      }
                    />
                    <span className="absolute bottom-2 right-3 cursor-pointer" onClick={togglePassword}>
                      {showPass ? (
                        <AiOutlineEye className="text-green-500" size={23} />
                      ) : (
                        <AiOutlineEyeInvisible size={23} />
                      )}
                    </span>
                    {formErrors.password && (
                      <p className="text-red-500 text-sm absolute bottom-12 right-3 cursor-pointer">
                        {formErrors.password}
                      </p>
                    )}
                  </div>
                  <div className="w-1/2 relative ">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phoneField">
                      <span className="text-red-500">*</span> Confirm Password
                    </label>
                    <input
                      className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                      type={showPass ? "text" : "password"}
                      id="confirmPass"
                      name="confirm_password"
                      placeholder="Confirm Password"
                      value={formState.confirm_password}
                      onChange={(e) =>
                        setFormState({
                          ...formState,
                          confirm_password: e.target.value
                        })
                      }
                    />
                    <span className="absolute bottom-2 right-3 cursor-pointer" onClick={togglePassword}>
                      {showPass ? (
                        <AiOutlineEye className="text-green-500" size={23} />
                      ) : (
                        <AiOutlineEyeInvisible size={23} />
                      )}
                    </span>
                    {formErrors.confirm_password && (
                      <p className="text-red-500 text-sm absolute bottom-12 right-3 cursor-pointer">
                        {formErrors.confirm_password}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex -mx-2 mb-4">
                  <div className="w-1/2 px-2 relative ">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="userSelect">
                      <span className="text-red-500">*</span> User Profile
                    </label>

                    <select
                      className="w-full px-3 py-2 border-b border-gray-500 bg-white focus:outline-none focus:border-b focus-border-indigo-500"
                      id="userSelect"
                      name="t_user"
                      value={formState.t_user}
                      onChange={(e) => {
                        if (e) {
                          setcomDisable(false);
                          setClearCompList(true);
                          setFormState((formState.c_id = []));
                        }
                        const selectedOption = userOptions.find(
                          (option) => option.description == e.target.value
                        );
                        if (selectedOption) {
                          setSelectedRoleId(selectedOption.role_id);
                        }
                        setFormState({
                          ...formState,
                          t_user: e.target.value,
                          role_id: selectedOption ? selectedOption.role_id : null
                        });
                      }}
                    >
                      <option value="">Select User</option>
                      {userOptions.map((option) => (
                        <option key={option.id} value={option.description}>
                          {option.description}
                        </option>
                      ))}
                    </select>

                    {formErrors.t_user && (
                      <p className="text-red-500 text-sm absolute bottom-12 right-3 cursor-pointer">
                        {formErrors.t_user}
                      </p>
                    )}
                  </div>

                  <div className="w-1/2 px-2 relative ">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="statusSelect">
                      <span className="text-red-500">*</span> OTP
                    </label>
                    <select
                      className="w-full px-3 py-2 border-b border-gray-500  bg-white focus:outline-none focus:border-b focus:border-gray-500"
                      id="statusSelect"
                      name="status"
                      value={formState.otp_enable}
                      onChange={(e) =>
                        setFormState({
                          ...formState,
                          otp_enable: e.target.value
                        })
                      }
                    >
                      <option
                        // defaultValue="enabled"
                        className="focus:outline-none focus:border-b bg-white"
                      >
                        Select Option
                      </option>
                      <option value={1}>Enable</option>
                      <option value={0}>Disable</option>
                    </select>
                    {formErrors.otp_enable && (
                      <p className="text-red-500 text-sm absolute bottom-12 right-3 cursor-pointer">
                        {formErrors.otp_enable}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex -mx-2 mb-4">
                  <div className="w-full flex ">
                    <div className="w-3/4 px-2 relative ">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="userSelect">
                        <span className="text-red-500">*</span> Mode
                      </label>
                      {/* <select
                        className="w-full px-3 py-2 border-b border-gray-500  bg-white focus:outline-none focus:border-b focus:border-gray-500"
                        id="statusSelect"
                        name="status"
                        value={formState.mode}
                        onChange={(e) =>
                          setFormState({
                            ...formState,
                            mode: e.target.value
                          })
                        }
                      >
                        <option
                        
                          className="focus:outline-none focus:border-b bg-white"
                        >
                          Select Option
                        </option>
                        <option value="mobile">Mobile</option>
                        <option value="web">Web</option>
                      </select> */}
                      <Select
                        // isDisabled={comDisable}
                        isMulti
                        isClearable={clearCompList}
                        value={formState.modes}
                        options={modeList}
                        onChange={handleModeChange}
                        className="border-b-2"
                      />

                      {formErrors.mode && (
                        <p className="text-red-500 text-sm absolute bottom-12 right-3 cursor-pointer">
                          {formErrors.mode}
                        </p>
                      )}
                    </div>
                    {formState?.modes?.some((mode) => mode.value == "mobile") && (
                      <div className="w-3/4 px-2 relative ">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="userSelect">
                          <span className="text-red-500">*</span> Application Type
                        </label>
                        <select
                          className="w-full px-3 py-2 border-b border-gray-500  bg-white focus:outline-none focus:border-b focus:border-gray-500"
                          id="statusSelect"
                          name="status"
                          value={formState?.app_type}
                          onChange={(e) =>
                            setFormState({
                              ...formState,
                              app_type: e.target.value
                            })
                          }
                        >
                          {/* <option
                          className="focus:outline-none focus:border-b bg-white"
                        >
                          Select Option
                        </option> */}
                          <option value="Field Force Apps">Field Force Apps</option>
                          <option value="Sales Force Automation Apps">Sales Force Automation Apps</option>
                          <option value="B-2-B Dealer Apps">B-2-B Dealer Apps</option>
                          <option value="Crop Advisor Apps">Crops Advisor Apps</option>
                          <option value="Loyalty Program Apps">Loyalty Program Apps</option>
                          <option value="Farmer Apps">Farmer Apps</option>
                        </select>

                        {formErrors.mode && (
                          <p className="text-red-500 text-sm absolute bottom-12 right-3 cursor-pointer">
                            {formErrors.mode}
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="w-1/2 px-2 relative ">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="statusSelect">
                      <span className="text-red-500">*</span> Status
                    </label>
                    <select
                      className="w-full px-3 py-2 border-b border-gray-500  bg-white focus:outline-none focus:border-b focus:border-gray-500"
                      id="statusSelect"
                      name="status"
                      value={formState.status}
                      onChange={(e) =>
                        setFormState({
                          ...formState,
                          status: e.target.value
                        })
                      }
                    >
                      <option className="focus:outline-none focus:border-b bg-white">Select Option</option>
                      <option value={1}>Active</option>
                      <option value={0}>Not Active</option>
                      <option value={2}>Frozen</option>
                      <option value={3}>Block</option>
                    </select>
                    {formErrors.status && (
                      <p className="text-red-500 text-sm absolute bottom-12 right-3 cursor-pointer">
                        {formErrors.status}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex -mx-2 mb-4">
                  <div className="w-1/2 px-2 relative ">
                    <label className="block  text-gray-700 text-sm font-bold mb-2" htmlFor="textareaField">
                      Company
                    </label>
                    <Select
                      isDisabled={comDisable}
                      isMulti
                      isClearable={clearCompList}
                      value={formState.c_id}
                      options={compList}
                      onChange={handleCompChange}
                      className="border-b-2"
                    />
                  </div>

                  <div className="w-1/2 px-2 relative">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="textareaField">
                      About Me
                    </label>
                    <textarea
                      rows={2}
                      className="w-full px-3 py-1.5  border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                      id="textareaField"
                      placeholder="About"
                      name="about_me"
                      value={formState.about_me}
                      onChange={(e) =>
                        setFormState({
                          ...formState,
                          about_me: e.target.value
                        })
                      }
                    ></textarea>
                  </div>
                </div>

                {router.query.type !== "view" && (
                  <div className="button flex items-center gap-3 mt-6">
                    <div
                      className="bg-green-700 px-4 py-1 text-white cursor-pointer"
                      onClick={(e) => handleSave(e, tempImage)}
                    >
                      {router.query.type === "Edit" ? "Update" : "Save"}{" "}
                    </div>
                    <button
                      className="bg-yellow-500 px-4 py-1 text-white cursor-pointer"
                      onClick={() => {
                        router.push("/table/table_user_information");
                      }}
                    >
                      Close
                    </button>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default UserInformation;
