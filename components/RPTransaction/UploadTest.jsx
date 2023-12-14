import { useRef, useState } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";
import { IoIosRemoveCircleOutline } from "react-icons/io";

export default function DragAndDrop(props) {
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef(null);
  const [files, setFiles] = useState([]);

  function handleChange(e) {
    e.preventDefault();
    console.log("File has been added");
    if (e.target.files && e.target.files[0]) {
      console.log(e.target.files);
      for (let i = 0; i < e.target.files["length"]; i++) {
        setFiles((prevState) => [...prevState, e.target.files[i]]);
      }
    }
  }

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
    const newArr = [...files];
    newArr.splice(idx, 1);
    setFiles([]);
    setFiles(newArr);
  }

  function openFileExplorer() {
    inputRef.current.value = "";
    inputRef.current.click();
  }

  return (
    <div className="">
      <form
        className={`flex justify-center flex-col items-center md:w-[90%] mx-auto h-[16rem] border-2 border-dashed mt-4 rounded-lg 
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
          <IoCloudUploadOutline size={35} className="text-gray-400"></IoCloudUploadOutline>
          <h1 className="text-3xl text-gray-400 select-none">Drag & Drop files here </h1>
          <h6 className=" text-gray-400 select-none">or</h6>
          <h2 className="font-bold cursor-pointer " onClick={openFileExplorer}>
            <button className="px-3 py-1.5 rounded-sm bg-teal-500 text-white select-none">Browse Files</button>
          </h2>{" "}
        </div>

        <div className="flex flex-col items-start p-3 h-[150px] overflow-y-auto my-4 chat-scrollbar">
          {files.map(
            (file, idx) => (
              console.log("df", files),
              (
                <div key={idx} className="flex flex-row space-x-5 py-1 justify-between w-full ">
                  {file.type.startsWith("image/") ? (
                    <div className="flex gap-5 items-start justify-center ">
                      <img
                        src={URL.createObjectURL(file)}
                        alt="avatar"
                        className="image-input-wrapper w-6 h-6 rounded-full cursor-pointer opacity-75-hover"
                      />
                      <div>{file.name}</div>
                    </div>
                  ) : (
                    <div>{file.name}</div>
                  )}
                    <IoIosRemoveCircleOutline onClick={() => removeFile(file.name, idx)} size={20} className="text-red-400"></IoIosRemoveCircleOutline>
                </div>
              )
            )
          )}
        </div>

        {/* <button
          className="bg-black rounded-lg p-2 mt-3 w-auto"
          onClick={handleSubmitFile}
        >
          <span className="p-2 text-white">Submit</span>
        </button> */}
      </form>
      <div className="mt-12 flex items-center justify-end">
        <button
          onClick={() => props.formType("Personal")}
          className="text-center rounded-md bg-orange-500 text-white py-1 px-4 text-lg"
        >
          Next
        </button>
      </div>
    </div>
  );
}
