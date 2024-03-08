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
import { SlCalender } from "react-icons/sl";
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
      <div className="flex flex-col gap-6 ">
        <div>
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
        <h1 className="text-xl font-bold  flex w-full justify-center border-t-4 border-blue-800 shadow-xl">
          Employee Attendance Report
        </h1>
        <div className="flex flex-row gap-2 w-full justify-between">
          <span>
            <input
              className="w-full px-3 py-1.5 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
              type="date"
              id="inputField"
              placeholder="dd/mm/yyyy"
              // disabled={!formActive}
            />
          </span>
          <span>
            <input
              className="w-full px-3 py-1.5 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
              type="date"
              id="inputField"
              placeholder="dd/mm/yyyy"
              // disabled={!formActive}
            />
          </span>
          <span className="self-center p-2">
            <button className="bg-sky-900 text-white px-2 py-1">View</button>
          </span>
        </div>

        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
          <div className="text-xl   flex w-full justify-around h-22   shadow-xl flex">
            <div className="flex gap-2 py-2 px-4 py-4  ">
              <SlCalender className=" h-12 w-8 self-center" />
              <div className="flex flex-col self-center ">
                <span className="font-bold text-sm">19 Sep 2017</span>
                <span className="text-sm">Tuesday</span>
              </div>
            </div>
            <div className="flex w-12 h-12 bg-gray-200 rounded-full self-center    justify-center  items-center text-center font-bold  text-2xl">
              P
            </div>
            <div className="flex flex-row p-2 gap-4 ">
              <div className="flex flex-col self-center gap-2">
                <span className="text-sm  ">Punch In : </span>
                <span className="text-sm text-blue-400 font-bold">
                  Punch Out:
                </span>
              </div>
              <div className="flex flex-col self-center gap-2">
                <span className="font-bold text-sm h-6 w-16 border-2 border-black-500  text-black-400">
                  17:19:23
                </span>
                <span className="font-bold text-sm h-6 w-16 border-2 border-black-500 bg-sky-900 text-white">
                  10:34:07
                </span>
              </div>
            </div>

            <div className="flex flex-col  text-sm gap-2"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdditionalInfo;

// Hydration Error Issue
