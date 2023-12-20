import { useEffect, useRef, useState } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import * as XLSX from "xlsx";
import { useRouter } from "next/router";
export default function DragAndDrop(props) {
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef(null);
  const [files, setFiles] = useState(null);
  const router = useRouter();
  const [jsonData, setJsonData] = useState("");
  function handleChange(e) {
    e.preventDefault();
    console.log("File has been added", e.target.file);
    setFiles(e.target.files[0]);
  }

  const handleConvert = (file) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(worksheet, {
          header: 1,
          blankrows: false,
        });
        setJsonData(json);
        props.setTableData(json);
      };
      reader.readAsBinaryString(file);
    }
  };
  console.log("lot", jsonData);

  useEffect(() => {
    handleConvert(files);
  }, [files]);

  console.log("kjk", files);

  function handleSubmitFile(e) {
    if (files.length === 0) {
      // no file has been submitted
    } else {
      // write submit logic here
    }
  }

  function handleDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      for (let i = 0; i < e.dataTransfer.files["length"]; i++) {
        setFiles((prevState) => [...prevState, e.dataTransfer.files[i]]);
      }
    }
  }

  function handleDragLeave(e) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  }

  function handleDragOver(e) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  }

  function handleDragEnter(e) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  }

  function removeFile(fileName, idx) {
    setFiles(null);
  }

  function openFileExplorer() {
    inputRef.current.value = "";
    inputRef.current.click();
  }

  return (
    <div className="main">
      <form
        className={`flex justify-center flex-col items-center md:w-[96%] mx-auto h-1/2 border-2 border-dashed mt-4 rounded-lg 
        ${dragActive ? "bg-sky-50 border-sky-400" : "border-gray-300"}`}
        onDragEnter={handleDragEnter}
        onSubmit={(e) => e.preventDefault()}
        onDrop={handleDrop}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
      >
        <input
          placeholder="fileInput"
          className="hidden"
          ref={inputRef}
          type="file"
          multiple={true}
          onChange={handleChange}
          accept=".xlsx,.xls,image/*,.doc, .docx,.ppt, .pptx,.txt,.pdf"
        />

        <div className="flex flex-col gap-2 text-center items-center ">
          <IoCloudUploadOutline
            size={35}
            className="text-gray-400"
          ></IoCloudUploadOutline>
          <h1 className="text-3xl text-gray-400 select-none">
            Drag & Drop files here{" "}
          </h1>
          <h6 className=" text-gray-400 select-none">or</h6>
          <h2 className="font-bold cursor-pointer " onClick={openFileExplorer}>
            <button className="px-3 py-1.5 rounded-sm bg-teal-500 text-white select-none">
              Browse Files
            </button>
          </h2>{" "}
        </div>

        <div className="flex flex-col items-start p-3 h-[150px] overflow-y-auto my-4 chat-scrollbar">
          <div className="flex flex-row space-x-5 py-1 justify-between w-full ">
            <div>{files?.name}</div>

            {files && (
              <IoIosRemoveCircleOutline
                onClick={() => removeFile()}
                size={20}
                className="text-red-400"
              ></IoIosRemoveCircleOutline>
            )}
          </div>
        </div>

        {/* <button
          className="bg-black rounded-lg p-2 mt-3 w-auto"
          onClick={handleSubmitFile}
        >
          <span className="p-2 text-white">Submit</span>
        </button> */}
      </form>
      <div className="mt-12 flex items-center justify-end mx-8">
        <button
          onClick={() => props.formType("RPTable")}
          className="text-center rounded-md bg-orange-500 text-white py-1 px-4 text-sm"
        >
          Next
        </button>
      </div>
    </div>
  );
}
