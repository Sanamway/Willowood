import React,{useState, useEffect} from "react";
import { Chart } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";
import { FiMaximize, FiMinimize, FiMinus, FiPlus } from "react-icons/fi";

const ZoneChart = () => {
  const [height, setHeight] = useState(false);
  const [fullScreen, setFullScreen] = useState(false)
  
  return (
   <>
     <div className={`wrapper mt-2 lg:mt-0  flex-1 ${!height ? "h-[18rem]" : ""} bg-white  rounded-lg border border-gray-200 flex flex-col ${fullScreen ? "fixed min-w-full min-h-full right-0 left-0 top-12":""} `}>
          <div className="flex items-center justify-between rounded-t-md text-white p-2 bg-[#fe5d70]">
            <h2>Zone</h2>
            <div className="btns flex items-center gap-2">
            {fullScreen ? ( <button  onClick={()=> setFullScreen(false)}>
              <FiMinimize></FiMinimize>
            </button>):(
              ( <button onClick={()=> setFullScreen(true)}>
                <FiMaximize></FiMaximize>
              </button>)
              )}
            {!height ? (
              <button onClick={()=> setHeight(true)}>
                <FiMinus></FiMinus>
              </button>
            ) : (
              <button onClick={()=> setHeight(false)}>
                <FiPlus></FiPlus>
              </button>
            )}
          </div>
          </div>
      </div>
   </>
  )
}

export default ZoneChart