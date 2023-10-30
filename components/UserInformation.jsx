import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { AiTwotoneHome, AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { TiArrowBack } from "react-icons/ti";
import { useRouter } from "next/router";
import userimg from "../public/userimg.jpg";
import Image from "next/image";
import axios from "axios";
import { url } from "@/constants/url";
import * as Yup from "yup";

const UserInformation = () => {
  const router = useRouter();
  const [userImage, setUserImage] = useState("");
  const [userOptions, setUserOptions] = useState([]);
  const [showPass, setShowPass] = useState(false);
  const [formData, setFormData] = useState({
    userId: "",
    user_name: "",
    address: "",
    city: "",
    state: "",
    email: "",
    phone_number: "",
    password: "",
    confirm_password: "",
    userType: "",
    user_profile: "",
    user_status: "",
    designation:""
  });

  //Defining the Validation Schema
  const validationSchema = Yup.object().shape({
    user_name: Yup.string().required("User name is required"),
    address: Yup.string().required("Address is required"),
    email: Yup.string().email("Invalid email format").required("Email is required"),
    phone_number: Yup.number()
    .transform((value, originalValue) => {
      if (originalValue === '') return undefined;
      return Number(value);
    })
    .required('Mobile No is required')
    .test('is-valid-number', 'Invalid Mobile Number', value => {
      if (!value) return false; 
      const stringValue = value.toString();
      return /^[6-9]\d{9}$/.test(stringValue);
    }).typeError('Mobile No must be a valid number'),

    password: Yup.string().required("Password is required"),
    confirm_password: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
    user_profile: Yup.string().required("User Profile is required"),
    user_status: Yup.string().required("Status is required"),
    // userType: Yup.string().required("User Type is required"),
    city: Yup.string().required("City is required"),
    state: Yup.string().required("State is required"),
    designation: Yup.string().required("Designation is required"),
  });

  const [formErrors, setFormErrors] = useState({});

  const headers = {
    "Content-Type": "application/json",
    secret: "fsdhfgsfuiweifiowefjewcewcebjw"
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Function to handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUserImage(URL.createObjectURL(file));
    }
  };

  //form data submission

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Validate the form data
      await validationSchema.validate(formData, { abortEarly: false });

      // Validation passed, you can submit the form here
      const userData = {
        user_name: formData.user_name,
        email: formData.email,
        phone_number: formData.phone_number,
        address: formData.address,
        t_user: "skp",
        c_name: "skp",
        ul_name: "skp",
        password: formData.password,
        confirm_password: formData.confirm_password,
        user_profile: formData.user_profile,
        user_status: formData.user_status,
        city: formData.city,
        state: formData.state,
        designation:formData.designation
      };

      console.log("Form data:", userData);

    //  return
      const response = await axios.post(`${url}/api/create_user`, userData, { headers: headers });
      const resdata = await response.data;
      console.log(resdata);

    } catch (errors) {
      console.log("e", errors)
      const newErrors = {};
      errors?.inner?.forEach((error) => {
        newErrors[error?.path] = error?.message;
      });
      setFormErrors(newErrors);
    }
  };

  //getting datas from api
  const gettingData = async () => {
    const resoptions = await axios.get(`${url}/api/user_profiles`, { headers: headers });
    const respData = await resoptions.data.data;
    setUserOptions(respData);
  };

  useEffect(() => {
    gettingData();
  }, []);

  //toggle to see password

  const togglePassword = () => {
    setShowPass(!showPass);
  };


  return (
    <>
      <Layout>
        <div className="h-screen overflow-auto w-full font-arial bg-white ">
          <div className="text-black flex items-center justify-between bg-white max-w-full font-arial h-[52px] px-5">
            <h2 className="font-arial font-normal text-3xl  py-2">User Information</h2>
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
          <div className="text-black h-screen mb- ">
            <div className="bg-gray-100 p-4  ">
              <form onSubmit={handleSubmit} className="max-w-1/2 mx-4 mt mb-12 bg-white rounded shadow p-4">
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
                        onChange={handleChange}
                      />
                      {formErrors.user_name && <p className="text-red-500 text-sm absolute bottom-12 right-3 cursor-pointer">{formErrors.user_name}</p>}

                    </div>
                  </div>
                  <div className="profpic relative group">
                    <Image
                      // src={userImage ? userImage :userimg}
                      src={userImage}
                      className="h-32 w-32 rounded-full bg-gray-200"
                      // alt="Profile"
                      width={100}
                      height={100}
                    />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      style={{ display: "none" }}
                      id="fileInput"
                    />
                    <label
                      htmlFor="fileInput"
                      // here make the opacity-0 to get hover text effect
                      className={`text-black absolute text-center font-semibold top-[60%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer ${
                        userImage == "" ? "opacity-50" : "opacity-0"
                      } ${
                        userImage !== "" ? "group-hover:opacity-100" : "group-hover:opacity-0"
                      }  transition-opacity duration-300`}
                    >
                      <span className="text-red-500">*</span> Upload Image
                    </label>
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
                    name="designation"
                    placeholder="Designation"
                    onChange={handleChange}
                  />
                      {formErrors.designation && <p className="text-red-500 text-sm absolute bottom-12 left-24 cursor-pointer">{formErrors.designation}</p>}
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
                    onChange={handleChange}
                  ></textarea>
                      {formErrors.address && <p className="text-red-500 absolute bottom-[7.8rem] left-24 text-sm ">{formErrors.address}</p>}
                </div>
                <div className="flex -mx-2 mb-4">
                  <div className="w-1/2 px-2 relative ">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="citySelect">
                      <span className="text-red-500">*</span> City
                    </label>
                    <select
                      className="w-full px-3 py-2 border-b border-gray-500 bg-white focus:outline-none focus:border-b focus:border-indigo-500"
                      id="citySelect"
                      onChange={handleChange}
                      name="city"
                    >
                      <option value="" className="focus:outline-none focus:border-b bg-white">
                        Select City
                      </option>
                      <option value="Hisar">Hisar</option>
                      <option value="Delhi">Delhi</option>
                    </select>
                    {formErrors.city && <p className="text-red-500 text-sm absolute bottom-10 right-3 cursor-pointer">{formErrors.city}</p>}
                  </div>
                  <div className="w-1/2 px-2 relative ">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="stateSelect">
                      <span className="text-red-500">*</span> State
                    </label>
                    <select
                      className="w-full px-3 py-2 border-b border-gray-500  bg-white focus:outline-none focus:border-b focus:border-indigo-500"
                      id="stateSelect"
                      onChange={handleChange}
                      name="state"
                    >
                      <option value="" className="focus:outline-none focus:border-b bg-white">
                        Select State
                      </option>
                      <option value="Haryana">Haryana</option>
                      <option value="Delhi">Delhi</option>
                    </select>
                    {formErrors.state && <p className="text-red-500 text-sm absolute bottom-10 right-3 cursor-pointer">{formErrors.state}</p>}
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
                      onChange={handleChange}
                    />
                      {formErrors.email && <p className="text-red-500 text-sm absolute bottom-12 right-3 cursor-pointer">{formErrors.email}</p>}
                  </div>
                  <div className="w-1/2 relative ">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phoneField">
                      <span className="text-red-500">*</span> Mobile No
                    </label>
                    <input
                      className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                      type="tel"
                      id="phoneField"
                      name="phone_number"
                      placeholder="Mobile"
                      onChange={handleChange}
                    />
                      {formErrors.phone_number && <p className="text-red-500 text-sm absolute bottom-12 right-3 cursor-pointer">{formErrors.phone_number}</p>}
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
                      onChange={handleChange}
                    />
                    <span className="absolute bottom-2 right-3 cursor-pointer" onClick={togglePassword}>
                      {showPass ? (
                        <AiOutlineEye className="text-green-500" size={23} />
                      ) : (
                        <AiOutlineEyeInvisible size={23} />
                      )}
                    </span>
                    {formErrors.password && <p className="text-red-500 text-sm absolute bottom-12 right-3 cursor-pointer">{formErrors.password}</p>}
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
                      onChange={handleChange}
                    />
                    <span className="absolute bottom-2 right-3 cursor-pointer" onClick={togglePassword}>
                      {showPass ? (
                        <AiOutlineEye className="text-green-500" size={23} />
                      ) : (
                        <AiOutlineEyeInvisible size={23} />
                      )}
                    </span>
                    {formErrors.confirm_password && <p className="text-red-500 text-sm absolute bottom-12 right-3 cursor-pointer">{formErrors.confirm_password}</p>}
                  </div>
                </div>
                <div className="flex -mx-2 mb-4">
                  <div className="w-1/2 px-2 relative ">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="userSelect">
                      <span className="text-red-500">*</span> User Profile
                    </label>
                    <select
                      className="w-full px-3 py-2 border-b border-gray-500  bg-white focus:outline-none focus:border-b focus:border-indigo-500"
                      id="userSelect"
                      name="user_profile"
                      onChange={handleChange}
                    >
                      {userOptions.map((option) => (
                        <option
                          value={option?.description}
                          className="focus:outline-none focus:border-b bg-white"
                        >
                          {option?.description}
                        </option>
                      ))}
                    </select>
                    {formErrors.user_profile && <p className="text-red-500 text-sm absolute bottom-12 right-3 cursor-pointer">{formErrors.user_profile}</p>}

                  </div>
                  <div className="w-1/2 px-2 relative ">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="statusSelect">
                      <span className="text-red-500">*</span> Status
                    </label>
                    <select
                      className="w-full px-3 py-2 border-b border-gray-500  bg-white focus:outline-none focus:border-b focus:border-gray-500"
                      id="statusSelect"
                      name="user_status"
                      onChange={handleChange}
                    >
                      <option defaultValue="enabled" className="focus:outline-none focus:border-b bg-white">
                        Enabled
                      </option>
                      <option value="enabled">Enable</option>
                      <option value="disabled">Disable</option>
                    </select>
                    {formErrors.user_status && <p className="text-red-500 text-sm absolute bottom-12 right-3 cursor-pointer">{formErrors.user_status}</p>}
                  </div>
                </div>

                <div className="mb-1">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="textareaField">
                    About Me
                  </label>
                  <textarea
                    rows={5}
                    className="w-full px-3 py-1.5  border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                    id="textareaField"
                    placeholder="About"
                  ></textarea>
                </div>

                <div className="button flex items-center gap-3 mt-6">
                  <button type="submit" className="bg-green-700 px-4 py-1 text-white">
                    Save
                  </button>
                  <button
                    onClick={() => {
                      router.push("/table/table_user_information");
                    }}
                    className="bg-yellow-500 px-4 py-1 text-white"
                  >
                    Close
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default UserInformation;
