import React, { useEffect, useRef } from "react";
import Webcam from "react-webcam";
import { MdOutlineCamera } from "react-icons/md";
const CameraComponent = (props) => {
  const webcamRef = useRef(null);
  console.log("pops", props);
  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    // Here you can do something with the captured image, like saving it or displaying it elsewhere

    if (props.type === "Old") {
      props.setImg(imageSrc);
    } else {
      props.setNewImg(imageSrc);
    }

    props.handleClose();
  };

  const videoConstraints = {
    width: window.innerWidth, // Default width
    height: window.innerHeight + 100, // Maximum height based on viewport height
    facingMode: "user",
  };

  const requestCameraAccess = async () => {
    navigator.mediaDevices
      .getUserMedia(videoConstraints)
      .then((stream) => {
        // Access to camera granted, use the stream
      })
      .catch((error) => {
        // Handle errors, e.g., if the user denies permission
      });
  };
  useEffect(() => {
    requestCameraAccess();
  }, []);
  return (
    <div className="relative h-full">
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={videoConstraints}
      />

      <div className="flex flex-col items-center justify-center absolute bottom-8 left-0 right-0">
        <button
          className="flex items-center justify-center bg-orange-400 rounded-full p-3"
          onClick={capture}
        >
          <MdOutlineCamera size={48} className="text-white" />
        </button>
        <p className="text-xl text-white mt-2">Capture Image</p>
      </div>
    </div>
  );
};

export default CameraComponent;
