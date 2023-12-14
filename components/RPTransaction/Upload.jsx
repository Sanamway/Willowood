import React, { useState } from "react";

const Upload = ({ onUpload }) => {
  const [isDragActive, setIsDragActive] = useState(false);

  const handleDragEnter = () => {
    setIsDragActive(true);
  };

  const handleDragLeave = () => {
    setIsDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragActive(false);
    const files = Array.from(e.dataTransfer.files);
    onUpload(files);
  };
  return (
    <>
      <div
        className={`flex justify-center items-center w-[80%] mx-auto h-48 border-2 border-dashed mt-4 rounded-lg 
        ${isDragActive ? "bg-sky-50 border-sky-400" : "border-gray-300"}`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        <p className={`text-sm ${isDragActive ? "text-sky-800" : "text-gray-400"}  `}>
          {isDragActive ? "Leave Your File Here" : "Drag and drop your files here"}
        </p>
      </div>

      
    </>
  );
};

export default Upload;
