import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { BsCheck2Circle } from "react-icons/bs";
import Profile from "../../public/userimg.jpg";
import Image from "next/image";
const AtReg = () => {
    const [localStorageItems, setLocalStorageItems] = useState({
        uId: "",
        cId: "",
        bgId: "",
        buId: "",
        rId: "",
        zId: "",
        tId: "",
        roleId: "",
        empCode: "",
        tDes:""
});
      useEffect(() => {
        setLocalStorageItems({
          uId: JSON.parse(window.localStorage.getItem("uid")),
          cId: JSON.parse(window.localStorage.getItem("userinfo"))?.c_id,
          bgId: JSON.parse(window.localStorage.getItem("userinfo")).bg_id,
          buId: JSON.parse(window.localStorage.getItem("userinfo")).bu_id,
          rId: JSON.parse(window.localStorage.getItem("userinfo")).r_id,
          zId: JSON.parse(window.localStorage.getItem("userinfo")).z_id,
          tId: JSON.parse(window.localStorage.getItem("userinfo")).t_id,
          tDes:JSON.parse(window.localStorage.getItem("userinfo")).territory_name,
          clName: window.localStorage.getItem("user_name"),
          ulName: window.localStorage.getItem("phone_number"),
          empCode: window.localStorage.getItem("emp_code"),
          roleId: JSON.parse(window.localStorage.getItem("userinfo")).role_id,
          reportingManager: JSON.parse(window.localStorage.getItem("userinfo")).rp_manager,
          developmentManager: JSON.parse(window.localStorage.getItem("userinfo")).functional_mgr,
          hrManager: JSON.parse(window.localStorage.getItem("userinfo")).hr_name,
          reportingHQ:JSON.parse(window.localStorage.getItem("userinfo")).reporting_hq
        });
      }, []);
  const [formData, setFormData] = useState({
    fromDate: new Date(),
    toDate: new Date(),
    startHours: "10",
    startMinutes: "30",
    endHours: "19",
    endMinutes: "00",
    comments: "",
    optionSelected: "forgotIn", // default option
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can add your submit logic here
    console.log("Submitted data: ", formData);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <form
        className="bg-white rounded-lg p-4 shadow-lg max-w-md mx-auto"
        onSubmit={handleSubmit}
      >
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Attendance Regularization
        </h2>
        <div className="flex mb-4 mt-2 mb-8">
        <div className="w-40 h-2  ">
          <Image
            className="  h-[7.1rem] w-[7.1rem] rounded-full   "
            src={Profile}
            alt="img"
          />
        </div>

        <div className="flex  flex-col px-4 w-full mt-4">
          <div className="flex   w-full  w-28">
            <div className="flex">
              <p className=" font-bold text-sm text-blue-800 w-20 whitespace-nowrap">
                Emp Code
              </p>
              <span>:</span>
            </div>
            <span className="text-wrap ml-4">{localStorageItems.empCode}</span>
          </div>
          <div className="flex  w-full  w-28 ">
            <div className="flex">
              <p className=" font-bold text-sm text-blue-800  w-20">Name</p>
              <span>:</span>
            </div>
            <span className="text-wrap ml-4"> {localStorageItems.clName}</span>
          </div>

          <div className="flex w-full  w-28">
                <div className="flex">
                  <p className=" font-bold text-sm text-blue-800 w-28">
                    Reporting HQ
                  </p>
                  <span>:</span>
                </div>
                <span className="w-28 ml-3">{localStorageItems.reportingHQ}</span>
              </div>
        </div>
      </div>
        {/* Radio Buttons for Options */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-2">
            Select Option
          </label>
          <div className="flex justify-between">
            <div>
              <input
                type="radio"
                id="forgotIn"
                name="optionSelected"
                value="forgotIn"
                checked={formData.optionSelected === "forgotIn"}
                onChange={handleChange}
              />
              <label htmlFor="forgotIn" className="ml-2">
                Forgot In
              </label>
            </div>
            <div>
              <input
                type="radio"
                id="forgotOut"
                name="optionSelected"
                value="forgotOut"
                checked={formData.optionSelected === "forgotOut"}
                onChange={handleChange}
              />
              <label htmlFor="forgotOut" className="ml-2">
                Forgot Out
              </label>
            </div>
            <div>
              <input
                type="radio"
                id="both"
                name="optionSelected"
                value="both"
                checked={formData.optionSelected === "both"}
                onChange={handleChange}
              />
              <label htmlFor="both" className="ml-2">
                Both
              </label>
            </div>
          </div>
        </div>

     <div className="flex flex-row">
     <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-2">
            From Date
          </label>
          <DatePicker
            selected={formData.fromDate}
            onChange={(date) => setFormData({ ...formData, fromDate: date })}
            dateFormat="dd/MM/yyyy"
            className="w-full px-4 py-2 border rounded-md focus:ring focus:border-blue-300"
          />
        </div>

        {/* To Date */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-2">
            To Date
          </label>
          <DatePicker
            selected={formData.toDate}
            onChange={(date) => setFormData({ ...formData, toDate: date })}
            dateFormat="dd/MM/yyyy"
            className="w-full px-4 py-2 border rounded-md focus:ring focus:border-blue-300"
          />
        </div>
     </div>
       

        {/* Start Time */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-2">
            Start Time
          </label>
          <div className="flex space-x-2">
            <input
              type="number"
              name="startHours"
              value={formData.startHours}
              onChange={handleChange}
              min="0"
              max="23"
              className="w-1/2 px-4 py-2 border rounded-md focus:ring focus:border-blue-300"
              placeholder="Hours"
            />
            <input
              type="number"
              name="startMinutes"
              value={formData.startMinutes}
              onChange={handleChange}
              min="0"
              max="59"
              className="w-1/2 px-4 py-2 border rounded-md focus:ring focus:border-blue-300"
              placeholder="Minutes"
            />
          </div>
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-2">
            End Time
          </label>
          <div className="flex space-x-2">
            <input
              type="number"
              name="endHours"
              value={formData.endHours}
              onChange={handleChange}
              min="0"
              max="23"
              className="w-1/2 px-4 py-2 border rounded-md focus:ring focus:border-blue-300"
              placeholder="Hours"
            />
            <input
              type="number"
              name="endMinutes"
              value={formData.endMinutes}
              onChange={handleChange}
              min="0"
              max="59"
              className="w-1/2 px-4 py-2 border rounded-md focus:ring focus:border-blue-300"
              placeholder="Minutes"
            />
          </div>
        </div>

        {/* Comments */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-2">
            Comments
          </label>
          <textarea
            name="comments"
            value={formData.comments}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:ring focus:border-blue-300"
            placeholder="Enter comments"
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition duration-300"
        >
          Submit 
        </button>
      </form>
    </div>
  );
};

export default AtReg;
