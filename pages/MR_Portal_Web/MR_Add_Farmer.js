import React, { useState, useEffect, useRef } from "react";
// import FarmerModal from "@/components/modals/FarmerModal";
import * as XLSX from "xlsx";
import toast, { Toaster } from "react-hot-toast";
import { CSVLink } from "react-csv";
import { TbFileDownload } from "react-icons/tb";
import axios from "axios";
import { url } from "@/constants/url";

const index = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [fileData, setFileData] = useState(null);
  const [file, setFile] = useState(null);
  const [valBtn, setValBtn] = useState(true);
  const [valBtnTxt, setValBtnTxt] = useState(true);
  const ref = useRef();

  const [csvData, setCsvData] = useState([]);

  const headers = {
    "Content-Type": "application/json",
    secret: "fsdhfgsfuiweifiowefjewcewcebjw"
  };

  //Excel Data Headers

  const csvheaders = [
    { label: "Farmer Name", key: "f_name" },
    { label: "Farmer Father Name", key: "ff_name" },
    { label: "Farmer Complete Address", key: "f_address" },
    { label: "Farmer Type", key: "f_type" },
    { label: "Farmer Category", key: "f_cat" },
    { label: "Farmer Land Info", key: "f_lacre" },
    { label: "pin no", key: "f_pin" },
    { label: "Village", key: "v_id" },
    { label: "District", key: "ds_id" },
    { label: "Territory Name", key: "t_id" },
    { label: "State", key: "st_id" },
    { label: "Mobile", key: "f_mobile" }
  ];

  useEffect(() => {
    setCsvData([
      {
        f_name: "Sami",
        ff_name: "A ansar",
        f_address: "Batla house, New Delhi-110025",
        f_type: "Comercial Farming",
        f_cat: "Marginal-Below 1.00 hectare",
        f_lacre: "Delhi 50 gaj",
        f_pin: 110025,
        v_id: "Btala house",
        ds_id: "Bareilly",
        t_id: "SIRSA",
        st_id: "Haryana",
        f_mobile: 7878787878
      },
      {
        f_name: "Sami",
        ff_name: "A ansar",
        f_address: "Batla house, New Delhi-110025",
        f_type: "Comercial Farming",
        f_cat: "Marginal-Below 1.00 hectare",
        f_lacre: "Delhi 50 gaj",
        f_pin: 110025,
        v_id: "Btala house",
        ds_id: "Bareilly",
        t_id: "SIRSA",
        st_id: "Haryana",
        f_mobile: 7878787878
      }
    ]);
  }, []);

  const handleFileUpload = () => {
    if (!file) {
      toast.error("Please select a file first.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const workBook = XLSX.read(event.target.result, { type: "binary" });
      const sheetName = workBook.SheetNames[0];
      const sheet = workBook.Sheets[sheetName];
      const sheetData = XLSX.utils.sheet_to_json(sheet, { defval: "" });
      const mobileNumbers = sheetData.map((row) => row.f_mobile);
      const fieldsData = sheetData.map((row) => row.f_name || row.ff_name);
      const duplicates = findDuplicates(mobileNumbers);

      const updatedSheetData = sheetData.map((row, index) => {
        let status = "";
        let emptyFields = [];

        for (const key of [
          "f_mobile",
          "f_name",
          "ff_name",
          "f_address",
          "f_type",
          "f_cat",
          "f_lacre",
          "f_pin",
          "v_id",
          "ds_id",
          "t_id",
          "st_id"
        ]) {
          if (!row[key]) {
            emptyFields.push(key);
          }
        }

        // Check for mobile number conditions
        const mobile = row.f_mobile;
        const isMobileDuplicate = duplicates.includes(mobile);
        const mobileLength = String(mobile).length;

        // Determine status based on conditions
        if (emptyFields.includes("f_mobile") && emptyFields.length === 1) {
          status = `Rectify require: Farmer Information all olumn can not be blank`;
        } else if (emptyFields.length > 0 && emptyFields.length === Object.keys(row).length) {
          status = `All Fields Blank`;
        } else if (emptyFields.length > 0 && mobileLength === 0) {
          // status = Rectify require: ${emptyFields.join(", ")};
          status = `Rectify require: Farmer Information all olumn can not be blank`;
        } else if (emptyFields.length > 0 && isMobileDuplicate) {
          status = `Rectify require: Farmer Information all olumn can not be blank and Mobile Duplicate`;
        } else if (emptyFields.length > 0 && mobileLength > 10) {
          status =`Rectify require: Farmer Information all olumn can not be blank and Mobile no require 10 digit`;
        } else if (emptyFields.length > 0 && mobileLength < 10 && mobileLength > 0) {
          status = `Rectify require: Farmer Information all olumn can not be blank and Mobile no require 10 digit`;
        } else if (emptyFields.length > 0) {
          status = `Rectify require: Farmer Information all olumn can not be blank`;
        } else if (isMobileDuplicate) {
          status = "Rectify require: Mobile Duplicate";
        } else if (mobileLength > 10) {
          status = "Rectify require: Mobile no require 10 digit";
        } else if (mobileLength < 10 && mobileLength > 0) {
          status = "Rectify require: Mobile no require 10 digit";
        } else {
          status = "Valid";
        }

        return {
          ...row,
          Status: status
        };
      });
      setFileData(updatedSheetData);
    };
    reader.readAsBinaryString(file);
  };
  const findDuplicates = (arr) => {
    const seen = new Set();
    const duplicates = new Set();

    arr.forEach((item) => {
      if (seen.has(item)) {
        duplicates.add(item);
      } else {
        seen.add(item);
      }
    });

    return Array.from(duplicates);
  };

  const downloadHandler = () => {
    alert("Ok");
  };

  // useEffect(() => {
  //   if (fileData) {
  //     setIsOpen(true);
  //   }
  // }, [fileData]);

  //Reset button
  const reset = () => {
    ref.current.value = "";
  };

  //Sample Data for Test

  const dummyData = [
    {
      f_name: "Farmer Name",
      ff_name: "Farmer Father Name",
      f_address: "Farmer Complete Address",
      f_type: "Farmer Type",
      f_cat: "Farmer Category",
      f_lacre: "Farmer Land Info",
      f_pin: "pin no",
      v_id: "Village ",
      ds_id: "District",
      t_id: "Territory Name",
      st_id: "State",
      f_mobile: "Mobile",
      Status: "Valid"
    },
    {
      f_name: "",
      ff_name: "A ansar",
      f_address: "Batla house, New Delhi-110025",
      f_type: "Comercial Farming",
      f_cat: "Marginal-Below 1.00 hectare",
      f_lacre: "Delhi 50 gaj",
      f_pin: 110025,
      v_id: "Btala house",
      ds_id: "Bareilly",
      t_id: "SIRSA",
      st_id: "Haryana",
      f_mobile: 8318746543,
      Status: "Mobile Duplicate and Fields Empty: f_name"
    },
    {
      f_name: "Rankumar",
      ff_name: "Late. BS Tomar",
      f_address: "Delhi",
      f_type: "Comercial Farming",
      f_cat: "Large 10.00 hectare",
      f_lacre: "Khadar",
      f_pin: 251880,
      v_id: "Kasturi",
      ds_id: "Faridabad",
      t_id: "HISSAR",
      st_id: "Haryana",
      f_mobile: 8318746431,
      Status: "Valid"
    },
    {
      f_name: "Shree Ram1",
      ff_name: "Shree Dasrath",
      f_address: "Ayodhya Dhaam",
      f_type: "Whole Universe",
      f_cat: "Large 10.00 hectare",
      f_lacre: "Can’t Measure",
      f_pin: 224129,
      v_id: "Kasturi",
      ds_id: "Faizabad",
      t_id: "SIRSA",
      st_id: "Uttar Pradesh",
      f_mobile: 8318746432,
      Status: "Valid"
    },
    {
      f_name: "Shree Ram",
      ff_name: "Shree Dasrath1",
      f_address: "Ayodhya Dhaam",
      f_type: "Whole Universe",
      f_cat: "Large 10.00 hectare",
      f_lacre: "Can’t Measure",
      f_pin: 224129,
      v_id: "Kasturi",
      ds_id: "Faizabad",
      t_id: "SIRSA",
      st_id: "Uttar Pradesh",
      f_mobile: 8318746543,
      Status: "Mobile Duplicate"
    }
  ];

  //Check the All Status Valid

  const ValidAll = fileData?.slice(1)?.every((item) => item.Status == "Valid");
  console.log("Valdfaf", ValidAll);

  useEffect(() => {
    if (ValidAll) {
      setValBtn(false);
    }
  }, [ValidAll]);

  //File Upload Handler

  const fileUploadHandler = async () => {
    if (!fileData?.length) {
      toast.error("Choose the File First");
      return;
    }
    const duplicateExist = fileData?.slice(1).some((item) => item.Status.includes("Rectify require"));
    reset();

    if (duplicateExist) {
      toast.error("Check the Missing Fields");
    } else {
      const data = fileData?.slice(1).map((item) => ({ ...item, c_id: 1 }));

      try {
        const res = await axios.post(`${url}/api/add_multiple_farmer`, { data: data }, { headers });
        const apiRes = await res.data.data;
        setFileData((prevFileData) => {
          const updatedFileData = prevFileData?.map((item, index) => {
            if (index === 0) return item;
            const matchingApiItem = apiRes[index - 1];
            return matchingApiItem ? { ...item, Status: matchingApiItem.Status } : item;
          });
          return updatedFileData;
        });
        const message = res.data.message
        toast.success(message)
        const ValidText= fileData?.slice(1)?.every((item) => item.Status == "Ok");
        if(!ValidText){
          setValBtn(false);
          setValBtnTxt(false)
        }
        setValBtn(true);
       
        // console.log("Valid Text", ValidText)

      } catch (error) {
        const message = error?.response?.data.message;
        toast.error(message);
        console.log("Upload Error", error?.response?.data);
        console.log("Data", error?.response?.data?.data);
        const apiRes = error?.response?.data?.data;
        setFileData((prevFileData) => {
          const updatedFileData = prevFileData?.map((item, index) => {
            if (index === 0) return item;
            const matchingApiItem = apiRes[index - 1];
            return matchingApiItem ? { ...item, Status: matchingApiItem.Status } : item;
          });
          return updatedFileData;
        });
        reset();
        // const ValidText= fileData?.slice(1)?.every((item) => item.Status == "Ok");
        // if(ValidText){
        //   setValBtn(false);
        //   setValBtnTxt(false)
        // }
        setValBtn(true);
        // console.log("Valid Text", ValidText)
      }
    }
  };


  console.log("Voila", fileData)

  return (
    <div className="flex flex-col h-screen items-center justify-center w-full gap-1 px-4 ">
      <Toaster position="bottom-center" reverseOrder={false} />
      {/* <FarmerModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onOpen={() => setIsOpen(true)}
        reset={reset}
        srcs={fileData}
      ></FarmerModal> */}

      <div className=" font-hale px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-white">
        {csvData.length > 0 && (
          <CSVLink data={csvData} headers={csvheaders} filename={"farmers_data.csv"}>
            Download Excel
          </CSVLink>
        )}
      </div>

      <div className="flex items-center justify-center flex-col w-full">
        <div className="py-2 font-hale">
          <input
            type="file"
            accept=".xlsx"
            ref={ref}
            className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-foreground file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            onChange={(e) => {
              setFile(e.target.files[0]);
            }}
          ></input>
        </div>
        <div className=" font-hale px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-white">
          <button
            onClick={() => {
              handleFileUpload();
            }}
          >
            Upload
          </button>
        </div>
      </div>
      <div className="overflow-x-auto chat-scrollbar select-none w-full ">
        <div className="text-left p-1.5 px-2"></div>
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 rounded-full  ">
          <thead className="text-xs text-gray-900 text-center bg-blue-50 rounded-md ">
            <tr className="">
              <th className="whitespace-nowrap px-2 py-1 text-left lg:text-[0.8rem] text-[0.6rem] text-gray-600 font-bold ">
                Farmer Name
              </th>

              <th className=" whitespace-nowrap px-2 py-1 text-left lg:text-[0.8rem] text-[0.6rem] text-gray-600 font-bold">
                Farmer Father Name
              </th>

              <th className=" whitespace-nowrap px-2 py-1 text-left lg:text-[0.8rem] text-[0.6rem] text-gray-600 font-bold">
                Farmer Complete Address
              </th>
              <th className=" whitespace-nowrap px-2 py-1 text-left lg:text-[0.8rem] text-[0.6rem] text-gray-600 font-bold">
                Farmer Type
              </th>
              <th className=" whitespace-nowrap px-2 py-1 text-left lg:text-[0.8rem] text-[0.6rem] text-gray-600 font-bold">
                Farmer Category
              </th>
              <th className=" whitespace-nowrap px-2 py-1 text-left lg:text-[0.8rem] text-[0.6rem] text-gray-600 font-bold">
                Farmer Land Info
              </th>
              <th className=" whitespace-nowrap px-2 py-1 text-left lg:text-[0.8rem] text-[0.6rem] text-gray-600 font-bold">
                Pin No
              </th>
              <th className=" whitespace-nowrap px-2 py-1 text-left lg:text-[0.8rem] text-[0.6rem] text-gray-600 font-bold">
                Village
              </th>
              <th className="px-2 py-1 text-left lg:text-[0.8rem] text-[0.6rem] text-gray-600 font-bold">
                District
              </th>
              <th className=" whitespace-nowrap px-2 py-1 text-left lg:text-[0.8rem] text-[0.6rem] text-gray-600 font-bold">
                Territory Name
              </th>
              <th className="px-2 py-1 text-left lg:text-[0.8rem] text-[0.6rem] text-gray-600 font-bold">
                State
              </th>
              <th className=" whitespace-nowrap px-2 py-1 text-left lg:text-[0.8rem] text-[0.6rem] text-gray-600 font-bold">
                Mobile No.
              </th>
              <th className=" whitespace-nowrap px-2 py-1 text-left lg:text-[0.8rem] text-[0.6rem] text-gray-600 font-bold">
                Status
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200 break-normal border-2  ">
            {fileData?.length > 1 ? (
              fileData?.slice(1).map((item, index) => (
                <tr key={item?.id}>
                  <td
                    className={`px-2 text-left whitespace-nowrap py-1   border border-slate-400 lg:text-[0.8rem] text-[0.6rem] text-gray-900 borde ${
                      !item.f_name || item.f_name == "" ? "bg-red-600" : ""
                    }`}
                  >
                    {item?.f_name}
                  </td>
                  <td
                    className={`px-2 text-left whitespace-nowrap py-1 border border-slate-400 lg:text-[0.8rem] text-[0.6rem] text-gray-900 borde ${
                      !item.ff_name ? "bg-red-600" : ""
                    }`}
                  >
                    {item?.ff_name}
                  </td>

                  <td
                    className={`px-2 text-left whitespace-nowrap py-1 border border-slate-400 lg:text-[0.8rem] text-[0.6rem] text-gray-900 borde ${
                      !item.f_address ? "bg-red-600" : ""
                    }`}
                  >
                    {item?.f_address}
                  </td>
                  <td
                    className={`px-2 text-left whitespace-nowrap py-1 border border-slate-400 lg:text-[0.8rem] text-[0.6rem] text-gray-900 borde ${
                      !item.f_type ? "bg-red-600" : ""
                    }`}
                  >
                    {item?.f_type}
                  </td>
                  <td
                    className={`px-2 text-left whitespace-nowrap py-1 border border-slate-400 lg:text-[0.8rem] text-[0.6rem] text-gray-900 borde ${
                      !item.f_cat ? "bg-red-600" : ""
                    }`}
                  >
                    {item?.f_cat}
                  </td>
                  <td
                    className={`px-2 text-left whitespace-nowrap py-1 border border-slate-400 lg:text-[0.8rem] text-[0.6rem] text-gray-900 borde ${
                      !item.f_lacre ? "bg-red-600" : ""
                    }`}
                  >
                    {item?.f_lacre}
                  </td>
                  <td
                    className={`px-2 text-left whitespace-nowrap py-1 border border-slate-400 lg:text-[0.8rem] text-[0.6rem] text-gray-900 borde ${
                      !item.f_pin ? "bg-red-600" : ""
                    }`}
                  >
                    {item?.f_pin}
                  </td>
                  <td
                    className={`px-2 text-left whitespace-nowrap py-1 border border-slate-400 lg:text-[0.8rem] text-[0.6rem] text-gray-900 borde ${
                      !item.v_id ? "bg-red-600" : ""
                    }`}
                  >
                    {item?.v_id}
                  </td>
                  <td
                    className={`px-2 text-left whitespace-nowrap py-1 border border-slate-400 lg:text-[0.8rem] text-[0.6rem] text-gray-900 borde ${
                      !item.ds_id ? "bg-red-600" : ""
                    }`}
                  >
                    {item?.ds_id}
                  </td>
                  <td
                    className={`px-2 text-left whitespace-nowrap py-1 border border-slate-400 lg:text-[0.8rem] text-[0.6rem] text-gray-900 borde ${
                      !item.t_id ? "bg-red-600" : ""
                    }`}
                  >
                    {item?.t_id}
                  </td>
                  <td
                    className={`px-2 text-left whitespace-nowrap py-1 border border-slate-400 lg:text-[0.8rem] text-[0.6rem] text-gray-900 borde ${
                      !item.st_id ? "bg-red-600" : ""
                    }`}
                  >
                    {item?.st_id}
                  </td>
                  <td
                    className={`px-2 text-left whitespace-nowrap py-1 border border-slate-400 lg:text-[0.8rem] text-[0.6rem] text-gray-900 borde ${
                      !item.f_mobile ? "bg-red-600" : ""
                    }`}
                  >
                    {item?.f_mobile}
                  </td>
                  <td className="px-2 text-left whitespace-nowrap py-1 border border-slate-400 lg:text-[0.8rem] text-[0.6rem] text-gray-900 ">
                    {item?.Status?.includes("Rectify require") ? (
                      <>
                        {item?.Status?.split("Rectify require")[0]}
                        <span className="text-red-500 font-bold">Rectify require</span>
                        {item?.Status?.split("Rectify require")[1]}
                      </>
                    ) : item?.Status?.includes("Valid") ? (
                      <span className="text-green-500 font-bold">{item?.Status}</span>
                    ) : item?.Status?.includes("Mobile No exist") ? (
                      <span className="text-red-500 font-bold">{item?.Status}</span>
                    ) : item?.Status?.includes("Ok") ? (
                      <span className="text-green-500 font-bold">{item?.Status}</span>
                    ) : (
                      <span>{item?.Status}</span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <>{""}</>
            )}
          </tbody>
        </table>
      </div>
      <div
        className={`font-hale px-6 py-3 my-2 ${
          valBtn ? "bg-blue-400" : "bg-blue-600"
        } text-white font-semibold rounded-lg shadow-md  transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-white`}
      >
        <button
          onClick={() => {
            fileUploadHandler();
          }}
          disabled={valBtn}
        >
          Validate/Upload
        </button>
      </div>
    </div>
  );
};

export default index;