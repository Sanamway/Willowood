import React, { useState, useEffect } from "react";
import { FaCamera } from "react-icons/fa";
import axios from "axios";
import { url } from "@/constants/url";
import toast, { Toaster } from "react-hot-toast";

const NewTab = () => {
  const headers = {
    "Content-Type": "application/json",
    secret: "fsdhfgsfuiweifiowefjewcewcebjw"
  };
  const [supportdetails, setsupportdetails] = useState({
    store_data: "",
    complaint_type: "",
    serv_date: new Date(),
    priority: "",
    attached_photo: null,
    additional_desc: "",
    user_id: "",
    status: "pending",
    user_name: "",
    user_role: "",
    user_number: "",
    user_bst: "",
    c_id: 1,
    additional_description: ""
  });

  const [userData, setUserData] = useState(null);

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setsupportdetails({ ...supportdetails, attached_photo: URL.createObjectURL(img) });
    }
  };

  const handleInputChange = (e, field) => {
    setsupportdetails({ ...supportdetails, [field]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted", supportdetails);
    try {
      const res = await axios.post(`${url}/api/add_serviceticket`, supportdetails, { headers: headers });
      const resData = await res.data;
      console.log("posted", resData);
      if (resData.status) {
        toast.success(resData.message);
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  const handleCameraClick = () => {
    document.getElementById("file-upload").click();
  };

  useEffect(() => {
    if (window.localStorage) {
      const storedData = window.localStorage.getItem("userinfo");
      const userName = window.localStorage.getItem("user_name");
      const phoneNumber = window.localStorage.getItem("phone_number");
      const userId = window.localStorage.getItem("uid");
      setsupportdetails({
        ...supportdetails,
        user_id: userId
      });
      setUserData(JSON.parse(storedData));
      setUserData((prev) => ({
        ...prev,
        username: userName,
        phone_number: phoneNumber
      }));
    }
  }, []);


  return (
    <>
      <form className=" bg-white rounded  w-full  overflow-auto p-3" onSubmit={handleSubmit}>
        <Toaster position="bottom-center" reverseOrder={false} />

        <div className="flex my-2">
          <div className="w-full  text-left">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="store_data">
              <span className="border-l-4 border-teal-500 pl-2">Store Name </span>
              <small className="text-red-600">*</small>
            </label>
            <input
              className="w-full  py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
              type="text"
              id="store_data"
              value={supportdetails.store_data}
              onChange={(e) => handleInputChange(e, "store_data")}
              required
            />
          </div>
        </div>
        <div className="w-full text-left">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="complaint_type">
            <span className="border-l-4 border-teal-500 pl-2">Complaint Type </span>
            <small className="text-red-600">*</small>
          </label>
          <select
            className="w-full  py-2 my-4 mb border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            id="complaint_type"
            value={supportdetails.complaint_type}
            onChange={(e) => handleInputChange(e, "complaint_type")}
            required
          >
            <option value="" className="focus:outline-none focus:border-b bg-white">
              Select complaint Type
            </option>
            <option value="Roling Plan">Roling Plan</option>
            <option value="Collection Plan">Collection Plan</option>
            <option value="Digital On">Digital On</option>
            <option value="MR App-Target">MR App-Target</option>
            <option value="MR App-Activity">MR App-Activity</option>
            <option value="MR App-Expenses">MR App-Expenses</option>
            <option value="MR App-Feedback">MR App-Feedback</option>
          </select>

          <select
            className="w-full py-2 my-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            id="priority"
            value={supportdetails.priority}
            onChange={(e) => handleInputChange(e, "priority")}
            required
          >
            <option value="" className="focus:outline-none focus:border-b bg-white">
              Select Priority
            </option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2 text-left" htmlFor="photo">
            <span className="border-l-4 border-teal-500 pl-2">Attach Photo </span>
          </label>
          <div className="flex flex-col items-center justify-center py-2 mx-2 border-2 border-dashed border-black rounded-lg">
            <div className="flex flex-col items-center">
              {supportdetails.photo ? (
                <img src={supportdetails.photo} alt="Selected" className="w-full h-32 object-cover" />
              ) : (
                <FaCamera size={45} onClick={handleCameraClick} />
              )}
              <input
                id="file-upload"
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleImageChange}
              />
              {!supportdetails.photo && <button onClick={handleCameraClick}>Upload image</button>}
            </div>
          </div>
        </div>
        <div className="flex my-2">
          <div className="w-full px-2 text-left">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="additional_description">
              <span className="border-l-4 border-teal-500 pl-2">Additional Details </span>
              <small className="text-red-600">*</small>
            </label>
            <textarea
              className="w-full h-40 px-2 py-2 flex flex-wrap border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
              id="additional_desc"
              value={supportdetails.additional_desc}
              onChange={(e) => handleInputChange(e, "additional_desc")}
              required
            />
          </div>
        </div>
        <div className="flex my-2">
          <div className="w-full  text-left">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="userDetails">
              <span className="border-l-4 border-teal-500 pl-2">User Details </span>{" "}
              <small className="text-red-600">*</small>
            </label>
            <div className="p-1">
              <div className=" flex gap-2 w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-indigo-500">
                <label className=" pt-2 font-semibold" htmlFor="name">
                  Name:
                </label>
                <input
                  type="text"
                  name="name"
                  id="user_name"
                  value={userData?.username}
                  disabled
                  className="w-full px-3 py-2 mt-1 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                  onChange={(e) => handleInputChange(e, "user_name")}
                  required
                />
              </div>
              <div className=" flex gap-2 w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-indigo-500 mt-2">
                <label className="pt-2 font-semibold" htmlFor="email">
                  Role:
                </label>
                <input
                  type="text"
                  name="name"
                  id="user_role"
                  value={userData?.U_profile_name}
                  disabled
                  className="w-full px-3 py-2 mt-1 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                  onChange={(e) => handleInputChange(e, "user_role")}
                  required
                />
              </div>
              <div className=" flex gap-2 w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-indigo-500 mt-2">
                <label className="pt-2 font-semibold" htmlFor="number">
                  Phone:{" "}
                </label>
                <input
                  type="number"
                  name="number"
                  id="user_number"
                  disabled
                  value={userData?.phone_number}
                  className="w-full px-3 py-2 mt-1 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                  onChange={(e) => {
                    if (e.target.value.length > 10) {
                      return;
                    }
                    handleInputChange(e, "user_number");
                  }}
                  pattern="\d{10}"
                  title="Phone number must be 10 digits"
                  required
                />
              </div>
              <div className=" flex gap-2 w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-indigo-500 mt-2">
                <label className=" pt-2 font-semibold" htmlFor="address">
                  BST:
                </label>
                <input
                  type="text"
                  name="bst"
                  id="user_bst"
                  disabled
                  value={userData?.business_unit_name +  " " + userData?.business_segment + " "+userData?.territory_name }
                  className="w-full px-3 py-2 mt-1 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                  onChange={(e) => handleInputChange(e, "user_bst")}
                  required
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center w-full py-2 ">
          <button type="submit" className="bg-indigo-500 text-white  px-4 py-2 rounded-lg">
            Submit
          </button>
        </div>
      </form>
    </>
  );
};

export default NewTab;
