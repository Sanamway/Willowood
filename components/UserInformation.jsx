import React, { useState } from "react";
import Layout from "./Layout";
import { AiTwotoneHome } from "react-icons/ai";
import { TiArrowBack } from "react-icons/ti";
import { useRouter } from "next/router";
import userimg from "../public/userimg.jpg";
import Image from "next/image";
const UserInformation = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    userId: "",
    username: "",
    address: "",
    city: "",
    state: "",
    email: "",
    mobile: "",
    userType: "",
    userStatus: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log(formData);
  };

  const [userImage, setUserImage] = useState("");

  // Function to handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      
      setUserImage(URL.createObjectURL(file));
    }
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
                        User name
                      </label>
                      <input
                        className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                        type="text"
                        id="inputField"
                        placeholder="Username"
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
                      className={`text-black absolute text-center font-semibold top-3/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer ${userImage =="" ? "opacity-50":"opacity-0"} ${userImage !=="" ? "group-hover:opacity-100" :"group-hover:opacity-0"}  transition-opacity duration-300`}
                    >
                      Upload Image
                    </label>
                  </div>
                </div>

                <div className="mb-4 designation">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
                    Designation
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
                    Address
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-3 py-1.5  border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                    id="textareaField"
                    placeholder="Address"
                  ></textarea>
                </div>
                <div className="flex -mx-2 mb-4">
                  <div className="w-1/2 px-2">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="citySelect">
                      City
                    </label>
                    <select
                      className="w-full px-3 py-2 border-b border-gray-500 bg-white focus:outline-none focus:border-b focus:border-indigo-500"
                      id="citySelect"
                    >
                      <option value="" className="focus:outline-none focus:border-b bg-white">
                        Option
                      </option>
                      <option value="city1">City 1</option>
                      <option value="city2">City 2</option>
                    </select>
                  </div>
                  <div className="w-1/2 px-2">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="stateSelect">
                      State
                    </label>
                    <select
                      className="w-full px-3 py-2 border-b border-gray-500  bg-white focus:outline-none focus:border-b focus:border-indigo-500"
                      id="stateSelect"
                    >
                      <option value="" className="focus:outline-none focus:border-b bg-white">
                        Option
                      </option>
                      <option value="state1">State 1</option>
                      <option value="state2">State 2</option>
                    </select>
                  </div>
                </div>

                <div className="flex gap-4 items-center justify-between mb-4">
                  <div className="w-1/2">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="emailField">
                      Email
                    </label>
                    <input
                      className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                      type="email"
                      id="emailField"
                      placeholder="Email"
                    />
                  </div>
                  <div className="w-1/2">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phoneField">
                      Mobile No
                    </label>
                    <input
                      className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                      type="tel"
                      id="phoneField"
                      placeholder="Mobile"
                    />
                  </div>
                </div>

                <div className="flex gap-4 items-center justify-between mb-4">
                  <div className="w-1/2">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="emailField">
                      Password
                    </label>
                    <input
                      className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                      type="password"
                      id="passwordField"
                      placeholder="Password"
                    />
                  </div>
                  <div className="w-1/2">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phoneField">
                      Confirm Password
                    </label>
                    <input
                      className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                      type="password"
                      id="confirmPass"
                      placeholder="Confirm Password"
                    />
                  </div>
                </div>
                <div className="flex -mx-2 mb-4">
                  <div className="w-1/2 px-2">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="userSelect">
                      User Profile
                    </label>
                    <select
                      className="w-full px-3 py-2 border-b border-gray-500  bg-white focus:outline-none focus:border-b focus:border-indigo-500"
                      id="userSelect"
                    >
                      <option value="" className="focus:outline-none focus:border-b bg-white">
                        Option
                      </option>
                      <option value="user1">User 1</option>
                      <option value="user2">User 2</option>
                    </select>
                  </div>
                  <div className="w-1/2 px-2">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="statusSelect">
                      Status
                    </label>
                    <select
                      className="w-full px-3 py-2 border-b border-gray-500  bg-white focus:outline-none focus:border-b focus:border-gray-500"
                      id="statusSelect"
                    >
                      <option value="" className="focus:outline-none focus:border-b bg-white">
                        Option
                      </option>
                      <option value="status1">Status 1</option>
                      <option value="status2">Status 2</option>
                    </select>
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
                  <button className="bg-green-700 px-4 py-1 text-white">Save</button>
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
