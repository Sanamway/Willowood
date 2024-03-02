import React, { useState } from "react";
import Image from "next/image";
import { FaUpload } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import { AiOutlineFileAdd } from "react-icons/ai";
import Select from "react-select";
import { FaCameraRetro } from "react-icons/fa";
import { IoMdCloudUpload } from "react-icons/io";
import { MdOutlinePunchClock } from "react-icons/md";
import { MdOutlineTimer } from "react-icons/md";
import Profile from "../../public/userimg.jpg";

const AdditionalInfo = (props) => {
  const [formActive, setFormActive] = useState(false);
  const [userImage, setUserImage] = useState("");

  const currentYear = new Date().getFullYear();
  const nextYears = Array.from(
    { length: 10 },
    (_, index) => currentYear + index
  );

  //dummyData

  const data = [
    {
      id: 1,
      name: "Example A",
      profit: "New",
      relation: 10,
      son_of: "$1,000,000",
      pan: "Product Brand",
      aadhar: "X MS Tree",
    },
    {
      id: 2,
      name: "Example B",
      profit: "Commercial",
      relation: 5,
      son_of: "$500,000",
      pan: "Product Brand",
      aadhar: "X MS Tree",
    },
    {
      id: 2,
      name: "Example B",
      profit: "Commercial",
      relation: 5,
      son_of: "$500,000",
      pan: "New Product Brand",
      aadhar: "X MS Tree",
    },
  ];

  const colourOptions = [
    { value: "AL", label: "Alabama" },
    { value: "AK", label: "Alaska" },
    { value: "AS", label: "American Samoa" },
    { value: "AZ", label: "Arizona" },
    { value: "AR", label: "Arkansas" },
    { value: "CA", label: "California" },
    { value: "CO", label: "Colorado" },
    { value: "CT", label: "Connecticut" },
    { value: "DE", label: "Delaware" },
    { value: "DC", label: "District Of Columbia" },
    { value: "FM", label: "Federated States Of Micronesia" },
    { value: "FL", label: "Florida" },
    { value: "GA", label: "Georgia" },
    { value: "GU", label: "Guam" },
    { value: "HI", label: "Hawaii" },
    { value: "ID", label: "Idaho" },
    { value: "IL", label: "Illinois" },
    { value: "IN", label: "Indiana" },
    { value: "IA", label: "Iowa" },
    { value: "KS", label: "Kansas" },
    { value: "KY", label: "Kentucky" },
    { value: "LA", label: "Louisiana" },
    { value: "ME", label: "Maine" },
    { value: "MH", label: "Marshall Islands" },
    { value: "MD", label: "Maryland" },
    { value: "MA", label: "Massachusetts" },
    { value: "MI", label: "Michigan" },
    { value: "MN", label: "Minnesota" },
    { value: "MS", label: "Mississippi" },
    { value: "MO", label: "Missouri" },
    { value: "MT", label: "Montana" },
    { value: "NE", label: "Nebraska" },
    { value: "NV", label: "Nevada" },
    { value: "NH", label: "New Hampshire" },
    { value: "NJ", label: "New Jersey" },
    { value: "NM", label: "New Mexico" },
    { value: "NY", label: "New York" },
    { value: "NC", label: "North Carolina" },
    { value: "ND", label: "North Dakota" },
    { value: "MP", label: "Northern Mariana Islands" },
    { value: "OH", label: "Ohio" },
    { value: "OK", label: "Oklahoma" },
    { value: "OR", label: "Oregon" },
    { value: "PW", label: "Palau" },
    { value: "PA", label: "Pennsylvania" },
    { value: "PR", label: "Puerto Rico" },
    { value: "RI", label: "Rhode Island" },
    { value: "SC", label: "South Carolina" },
    { value: "SD", label: "South Dakota" },
    { value: "TN", label: "Tennessee" },
    { value: "TX", label: "Texas" },
    { value: "UT", label: "Utah" },
    { value: "VT", label: "Vermont" },
    { value: "VI", label: "Virgin Islands" },
    { value: "VA", label: "Virginia" },
    { value: "WA", label: "Washington" },
    { value: "WV", label: "West Virginia" },
    { value: "WI", label: "Wisconsin" },
    { value: "WY", label: "Wyoming" },
  ];

  return (
    <div className="p-2">
      <div className="flex flex-col gap-2 ">
        <h1 className="text-xl font-bold  flex w-full justify-center border-t-4 border-blue-800 shadow-xl">
          Punch-In/Out
        </h1>
        <div className="">
          <h1 className="font-bold ">Employee Details:</h1>
          <div className="flex mb-4 mt-2">
            <div className="w-40 h-2  ">
              <Image
                className="  h-[7.1rem] w-[7.1rem] rounded-full   "
                src={Profile}
                alt="img"
              />
            </div>

            <div className="flex  flex-col px-4 w-full mt-4">
              <div className="flex  justify-between w-full  w-28">
                <div className="flex">
                  <p className=" font-bold text-sm text-blue-800 w-28">
                    Emp Code
                  </p>
                  <span>:</span>
                </div>
                <span>sefsf</span>
              </div>
              <div className="flex  justify-between w-full  w-28">
                <div className="flex">
                  <p className=" font-bold text-sm text-blue-800 w-28">Name</p>
                  <span>:</span>
                </div>
                <span>asfasdfa</span>
              </div>

              <div className="flex  justify-between w-full  w-28">
                <div className="flex">
                  <p className=" font-bold text-sm text-blue-800 w-28">
                    Branch
                  </p>
                  <span>:</span>
                </div>
                <span>asfasdfa</span>
              </div>
            </div>
          </div>
        </div>

        <h1 className=" font-bold flex w-full justify-center h-8 mt-4 border p-1  shadow-xl">
          Last Punch In : 19-Sep-2017 05:19 PM
        </h1>
        <div>
          <label htmlFor="attendanceType" className="block font-bold mb-2">
            Attendance Type:
          </label>
          <select id="attendanceType" className="w-full border p-2 rounded">
            <option value="">Select Attendance Type</option>
            <option value="Punch In">Punch In</option>
            <option value="Punch Out">Punch Out</option>
            <option value="Weekly Off">Weekly Off</option>
          </select>
        </div>

        <div className="flex w-full  border my-2  shadow-xl">
          <button className="text-sm font-bold py-1 rounded-md   flex  flex-row w-full justify-center h-8 ">
            Take  Selfie
          </button>
          <FaCameraRetro
            size={20}
            className="mr-4 text-black  self-center justify-self-end  size-120 text-blue-800"
          />
        </div>
        <div className="w-60 h-60 bg-gray-200 self-center "></div>

        <div className="flex flex-col gap-2">
          <label htmlFor="reason" className="block font-bold ">
            Reason for different Punch in/out date required:
          </label>
          <textarea
            id="reason"
            className="w-full border p-2 rounded"
            rows="1"
          ></textarea>
        </div>
        <div className="flex w-full justify-center">
          <button className="text-xl py-1 rounded-md    flex  flex-row  w-1/2 justify-center  border my-2 shadow-xl">
            <MdOutlineTimer
              size={28}
              className="mr-4 text-black  self-center  size-120 text-blue-800"
            />
            Punch Out
          </button>
        </div>

        <div className="flex  flex-col px-4 w-full">
          <div className="flex justify-between w-full gap-4">
            <p className="text-gray-800 font-bold text-sm">
              Branch Manger <span className="self-end">: </span>
            </p>
            <p className="text-gray-800 text-sm">XXXX</p>
          </div>
          <div className="flex justify-between w-full gap-4 mt-2">
            <p className="text-gray-800 font-bold text-sm">
              Development Manager:
            </p>
            <p className="text-gray-800 text-sm">John Doe</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdditionalInfo;

// Hydration Error Issue
