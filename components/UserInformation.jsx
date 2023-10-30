import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { AiTwotoneHome } from "react-icons/ai";
import { TiArrowBack } from "react-icons/ti";
import { useRouter } from "next/router";
import userimg from "../public/userimg.jpg";
import Image from "next/image";
import axios from "axios";
import { url } from "@/constants/url";

const UserInformation = () => {
  const router = useRouter();
  const [userImage, setUserImage] = useState("");
  const [userOptions, setUserOptions] = useState([]);
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
    user_profile:"",
    user_status:""

  });

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      user_name: formData?.user_name,
      email: formData?.email,
      phone_number: formData?.phone_number,
      address: formData?.address,
      t_user: "skp",
      c_name: "skp",
      ul_name: "skp",
      password: formData?.password,
      confirm_password: formData?.confirm_password,
      user_profile: formData?.user_profile,
      user_status: formData?.user_status,
      city: formData?.city,
      state:formData?.state
    };

    console.log("rr", userData)

    return
    const response = await axios.post(`${url}/api/create_user`, userData, { headers: headers });
    const resdata = await response.data;
    console.log(resdata);
  };

  const gettingData = async () => {
    const resoptions = await axios.get(`${url}/api/user_profiles`, { headers: headers });
    const respData = await resoptions.data.data;
    setUserOptions(respData);
  };

  useEffect(() => {
    gettingData();
  }, []);

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
                  {/* <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
                      User Name
                    </label>
                    <input
                      className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                      type="text"
                      id="inputField"
                      placeholder="Username"
                    />
                  </div> */}
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
                    <div className="w-1/2">
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

                <div className="mb-4 designation">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
                    <span className="text-red-500">*</span> Designation
                  </label>
                  <input
                    className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                    type="text"
                    id="inputField"
                    placeholder="Designation"
                  />
                </div>
                <div className="mb-1">
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
                </div>
                <div className="flex -mx-2 mb-4">
                  <div className="w-1/2 px-2">
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
                  </div>
                  <div className="w-1/2 px-2">
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
                  </div>
                </div>

                <div className="flex gap-4 items-center justify-between mb-4">
                  <div className="w-1/2">
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
                  </div>
                  <div className="w-1/2">
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
                  </div>
                </div>

                <div className="flex gap-4 items-center justify-between mb-4">
                  <div className="w-1/2">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="emailField">
                      <span className="text-red-500">*</span> Password
                    </label>
                    <input
                      className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                      type="password"
                      id="passwordField"
                      name="password"
                      placeholder="Password"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="w-1/2">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phoneField">
                      <span className="text-red-500">*</span> Confirm Password
                    </label>
                    <input
                      className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                      type="password"
                      id="confirmPass"
                      name="confirm_password"
                      placeholder="Confirm Password"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="flex -mx-2 mb-4">
                  <div className="w-1/2 px-2">
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
                        <option value={option?.description} className="focus:outline-none focus:border-b bg-white">
                          {option?.description}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="w-1/2 px-2">
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
                  </div>
                </div>

<<<<<<< HEAD
              
=======
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

>>>>>>> e0dffe91c2db2af0097456034de28c6846854da9
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
