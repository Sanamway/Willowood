import React, { useState, useEffect } from "react";
import { IoHome } from "react-icons/io5";
import { IoIosArrowBack } from "react-icons/io";
import { FaBarcode } from "react-icons/fa6";
import { VscAccount } from "react-icons/vsc";
import { FaAddressBook } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { BsFilePerson } from "react-icons/bs";
import { SiStatuspal } from "react-icons/si";
import { MdLocationCity } from "react-icons/md";
import { MdDateRange } from "react-icons/md";
import { useRouter } from "next/router";
import moment from "moment";
import { url } from "@/constants/url";
import axios from "axios";
import { useRef } from "react";
import { FcMenu } from "react-icons/fc";
import { BsThreeDotsVertical } from "react-icons/bs";

const Profile = () => {
  const router = useRouter();
  const [profData, setProfileData] = useState(null);

  const headers = {
    "Content-Type": "application/json",
    secret: "fsdhfgsfuiweifiowefjewcewcebjw"
  };

  const [localStorageItems, setLocalStorageItems] = useState({
    uId: "",
    cId: "",
    bgId: "",
    buId: "",
    rId: "",
    zId: "",
    tId: "",
    empCode: ""
  });


  useEffect(() => {
    if (typeof window === "undefined") return
    setLocalStorageItems({
      uId: JSON.parse(window.localStorage.getItem("uid")),
      cId: JSON.parse(window.localStorage.getItem("userinfo"))?.c_id,
      bgId: JSON.parse(window.localStorage.getItem("userinfo"))?.bg_id,
      buId: JSON.parse(window.localStorage.getItem("userinfo"))?.bu_id,
      rId: JSON.parse(window.localStorage.getItem("userinfo"))?.r_id,
      zId: JSON.parse(window.localStorage.getItem("userinfo"))?.z_id,
      tId: JSON.parse(window.localStorage.getItem("userinfo"))?.t_id,
      empCode: window.localStorage.getItem("emp_code"),
      empName: window.localStorage.getItem("user_name"),
      userInfo: JSON.parse(window.localStorage.getItem("userinfo")),
      mobile: JSON.parse(window.localStorage.getItem("phone_number")),
      email: window.localStorage.getItem("email_id"),
    });
  }, []);

  console.log("pop", localStorageItems)


  //Handling Side Effect of API
  const getDataEmp = async () => {
    try {
      const res = await axios.get(`${url}/api/get_employee`, {
        headers: headers,
        params: {
          empcode: localStorageItems.empCode,
          c_id: localStorageItems.cId,
        }
      });
      const respdata = await res.data.data;
      setProfileData(respdata);
    } catch (error) {
      console.log("Error", error);
    }
  };

  useEffect(() => {
    if (localStorageItems.empCode && localStorageItems.cId) getDataEmp();
    return
  }, [localStorageItems.empCode, localStorageItems.cId]);

  const fileInputRef = useRef(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  // Fetch image from API
  const getImage = async () => {
    if (typeof window === "undefined") return;
    try {
      const res = await axios.get(`${url}/api/get_image`, {
        headers: headers,
        params: {
          phone_number: localStorageItems.mobile,
          file_path: "user",
        },
      });

      const respdata = res.data.data;
      console.log("Fetched Image URL:", respdata.image_url);
      setImagePreview(respdata.image_url || "/default-profile.png");
    } catch (error) {
      console.log("Error fetching image:", error);
      setImagePreview("/default-profile.png");
    }
  };

  // Upload selected file
  const handleUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("file", selectedFile);




    try {
      const renamedBlob = new Blob([selectedFile], {
        type: selectedFile?.type,
      });

      const fd = new FormData();
      fd.append(
        "myFile",
        renamedBlob,
        selectedFile.name  // Use the original filename from the selected file
      );

      const response = await axios
        .post(`${url}/api/upload_file/?file_path=user&mob_no=${localStorageItems?.mobile}`, fd, {

        })
        .then(() => {
          if (response.data?.data?.image_url) {
            setImagePreview(response.data.data.image_url);
            setSelectedFile(null); // Reset
          }
        });
    } catch (error) {
      console.log("NOP", error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result); // live preview before upload
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (!localStorageItems.mobile) return
    getImage();
  }, [localStorageItems.mobile]);
  return (
    <div className="px-0">
      <div className="flex justify-between py-5 px-3 bg-blue-600">
        <div className="pb-2 flex gap-2 font-bold text-slate-500 text-white">
          <IoIosArrowBack onClick={() => router.back()} className="pt-1 text-white-500" size={24} /> My Profile
        </div>

        <div className="relative ">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            <BsThreeDotsVertical className="text-3xl text-white" />
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-300 rounded-md shadow-lg z-10">
              <button
                onClick={() => {
                  fileInputRef.current.click();
                  setMenuOpen(false);
                }}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Choose Image
              </button>
              <button
                onClick={() => {
                  handleUpload();
                  setMenuOpen(false);
                }}
                className={`block w-full text-left px-4 py-2 hover:bg-gray-100 ${!selectedFile ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                disabled={!selectedFile}
              >
                Update Image
              </button>
            </div>
          )}
        </div>

      </div>

      <div className="flex flex-col items-center mt-6">
        <div className="relative w-32 h-32">
          <img
            src={imagePreview || "/default-profile.png"}

            className="w-full h-full object-cover rounded-full border-2 border-gray-300"
          />
          <button
            className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
            onClick={() => {
              setImagePreview("/default-profile.png");
              setSelectedFile(null);
            }}
          >
            ✕
          </button>
        </div>


        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
          ref={fileInputRef}
        />
      </div>




      <div className=" bg-white  w-full h-screen border-t-2 mt-2">
        <div className="flex gap-8 pt-4 pl-2">
          <div className="pt-4 pl-4">
            <FaBarcode className="text-blue-400" />
          </div>
          <div className="flex flex-col gap-2 font-bold flex-grow pr-20">
            <label>Employee Code:  </label>

            <p className="border-b-2 text-slate-400 font-normal">{localStorageItems?.empCode}</p>

          </div>
        </div>
        <div className="flex gap-8 pt-4 pl-2">
          <div className="pt-4 pl-4">
            <VscAccount className="text-blue-400" />
          </div>
          <div className="flex flex-col font-bold gap-2 flex-grow pr-20">
            <label>Employee Name: </label>
            <p className="border-b-2 text-slate-400 font-normal">{localStorageItems?.empName}</p>
          </div>
        </div>
        <div className="flex gap-8 pt-4 pl-2">
          <div className="pt-4 pl-4">
            <FaAddressBook className="text-blue-400" />
          </div>
          <div className="flex flex-col font-bold gap-2 flex-grow pr-20">
            <label>Address: </label>
            <p className="border-b-2 text-slate-400 font-normal">{localStorageItems.userInfo?.address}</p>
          </div>
        </div>
        <div className="flex gap-8 pt-4 pl-2">
          <div className="pt-4 pl-4">
            <FaPhoneAlt className="text-blue-400" />
          </div>
          <div className="flex flex-col font-bold gap-2 flex-grow pr-20">
            <label>Contact Mobile: </label>
            <p className="border-b-2 text-slate-400 font-normal">{localStorageItems?.mobile}</p>
          </div>
        </div>
        <div className="flex gap-8 pt-4 pl-2">
          <div className="pt-4 pl-4">
            <MdEmail className="text-blue-400" />
          </div>
          <div className="flex flex-col font-bold gap-2 flex-grow pr-20">
            <label>E-Mail ID: </label>
            <p className="border-b-2 text-slate-400 font-normal">{localStorageItems?.email}</p>
          </div>
        </div>
        <div className="flex gap-8 pt-4 pl-2">
          <div className="pt-4 pl-4">
            <BsFilePerson className="text-blue-400" />
          </div>
          <div className="flex flex-col font-bold gap-2 flex-grow pr-20">
            <label>Role: </label>
            <p className="border-b-2 text-slate-400 font-normal">{localStorageItems.userInfo?.U_profile_name}</p>
          </div>
        </div>
        <div className="flex gap-8 pt-4 pl-2">
          <div className="pt-4 pl-4">
            <MdLocationCity className="text-blue-400" />
          </div>
          <div className="flex flex-col font-bold gap-2 flex-grow pr-20">
            <label>Territory Name: </label>
            <p className="border-b-2 text-slate-400 font-normal">{localStorageItems.userInfo?.territory_name}</p>
          </div>
        </div>
        <div className="flex gap-8 pt-4 pl-2">
          <div className="pt-4 pl-4">
            <MdLocationCity className="text-blue-400" />
          </div>
          <div className="flex flex-col font-bold gap-2 flex-grow pr-20">
            <label>Region Name: </label>
            <p className="border-b-2 text-slate-400 font-normal">{localStorageItems.userInfo?.region_name}</p>
          </div>
        </div>
        <div className="flex gap-8 pt-4 pl-2">
          <div className="pt-4 pl-4">
            <MdLocationCity className="text-blue-400" />
          </div>
          <div className="flex flex-col font-bold gap-2 flex-grow pr-20">
            <label>Busniness Unit: </label>
            <p className="border-b-2 text-slate-400 font-normal">{localStorageItems.userInfo?.business_unit_name}</p>
          </div>
        </div>
        <div className="flex gap-8 pt-4 pl-2">
          <div className="pt-4 pl-4">
            <MdLocationCity className="text-blue-400" />
          </div>
          <div className="flex flex-col font-bold gap-2 flex-grow pr-20">
            <label>Company: </label>
            <p className="border-b-2 text-slate-400 font-normal">{localStorageItems.userInfo?.cmpny_name}</p>
          </div>

        </div>

        <div className="flex gap-8 pt-4 pl-2">
          <div className="pt-4 pl-4">
            <MdLocationCity className="text-blue-400" />
          </div>
          <div className="flex flex-col font-bold gap-2 flex-grow pr-20">
            <label>OTP Status: </label>
            <p className="border-b-2 text-slate-400 font-normal">{localStorageItems.otp_enable ? "True" : "False"}</p>
          </div>

        </div>

        <div className="flex gap-8 pt-4 pl-2">
          <div className="pt-4 pl-4">
            <MdLocationCity className="text-blue-400" />
          </div>
          <div className="flex flex-col font-bold gap-2 flex-grow pr-20">
            <label>Login Status: </label>
            <p className="border-b-2 text-slate-400 font-normal">{localStorageItems.login_status ? "True" : "False"}</p>
          </div>

        </div>




      </div>
    </div>
  );
};

export default Profile;
