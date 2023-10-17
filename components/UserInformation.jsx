import React, { useState } from "react";
import Layout from "./Layout";
import { AiTwotoneHome } from "react-icons/ai";
import { TiArrowBack } from "react-icons/ti";
import { useRouter } from "next/router";
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
                    router.push("/table/table_user_profile");
                  }}
                  className="text-gray-400"
                  size={35}
                ></TiArrowBack>
              </h2>
              <h2>
                <AiTwotoneHome className="text-red-500" size={34}></AiTwotoneHome>
              </h2>
            </div>
          </div>

          {/* <div className="bg-gray-300"></div> */}
          <div className="text-black h-screen mb- ">
            <div className="bg-gray-100 p-4  ">
              <form className="max-w-1/2 mx-4 mt mb-12 bg-white rounded shadow p-4">
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
                    User Name
                  </label>
                  <input
                    className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                    type="text"
                    id="inputField"
                    placeholder="Username"
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
                      className="w-full px-3 py-2 border-b border-gray-500 rounded-md bg-white focus:outline-none focus:border-b focus:border-indigo-500"
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
                      className="w-full px-3 py-2 border-b border-gray-500 rounded-md bg-white focus:outline-none focus:border-b focus:border-indigo-500"
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
                <div className="flex -mx-2 mb-4">
                  <div className="w-1/2 px-2">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="userSelect">
                      User Status
                    </label>
                    <select
                      className="w-full px-3 py-2 border-b border-gray-500 rounded-md bg-white focus:outline-none focus:border-b focus:border-indigo-500"
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
                      className="w-full px-3 py-2 border-b border-gray-500 rounded-md bg-white focus:outline-none focus:border-b focus:border-gray-500"
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
                      Phone
                    </label>
                    <input
                      className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                      type="tel"
                      id="phoneField"
                      placeholder="Phone"
                    />
                  </div>
                </div>

                {/* <button
                  className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Submit
                </button> */}
                <div className="button flex items-center gap-3 mt-6">
                <button className="bg-green-700 px-4 py-1 text-white">Save</button>
                <button className="bg-yellow-500 px-4 py-1 text-white">Close</button>
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
