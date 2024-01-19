import React,{useState, useEffect} from "react";
import { Bar, Chart } from "react-chartjs-2";
import * as FileSaver from "file-saver";
import html2canvas from "html2canvas";
import { Chart as ChartJS, Legend, ArcElement, Tooltip } from "chart.js/auto";
import { Doughnut } from "react-chartjs-2";

const GraphCard = () => {

  const [isChecked, setIsChecked] = useState(false);
  const [dataSets, setDataSet] = useState([190, 90, 100, 125])
  const handleToggle = () => {
    setIsChecked(!isChecked);
  };
  ChartJS.register(ArcElement, Tooltip, Legend);

  const data = {
    labels: ["Diamond", "Gold", "Bronze", "Others"],
    datasets: [
      {
        label: "# of Votes",
        data: dataSets,
        backgroundColor: ["#FC9F40", "#EB4654", "#1C6C9D", "#34D0DC"]
      }
    ]
  };

  // const options = {
  //   // maintainAspectRatio: false,
  //   responsive: false,
  //   width: 600,
  //   height: 600,
  // };

useEffect(()=>{
  if(isChecked){
    setDataSet([200, 200, 50, 50])
  }else{
    setDataSet(randomizedDataSet)
  }
},[isChecked])

//Random dataSets populate

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

let dataSet = [100, 20, 30, 70];
let randomizedDataSet = shuffleArray(dataSet);

  return (
    <>
      <div className="w-full px- mt-2 flex lg:flex-row flex-col gap-3 font-arial   rounded-md">
        <div className="bg-white p-2 h-auto flex-1 md:flex items-center justify-center gap-4 rounded-md shadow-md text-white text-center">
          <div className="flex flex-col w-full">
            <div className="text-left p-1.5 flex items-center justify-between w-full ">
              <h2 className="text-[0.78rem]  text-gray-600 font-bold">Recent Order Status</h2>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="toggleSwitch"
                  className="hidden"
                  checked={isChecked}
                  onChange={handleToggle}
                />
                <label
                  htmlFor="toggleSwitch"
                  className={`cursor-pointer relative w-10 h-4 rounded-full ${
                    isChecked ? "bg-blue-500" : "bg-gray-400"
                  } transition-all duration-300`}
                >
                  <div
                    className={`absolute left-1 top-1 w-2 h-2 rounded-full bg-white transition-all duration-300 transform ${
                      isChecked ? "translate-x-6" : "translate-x-0"
                    }`}
                    id="toggleSwitchHandle"
                  ></div>
                </label>
              </div>
            </div>
            <div
              className="flex items-center justify-between w-full mx-auto"
              style={{ width: "250px", height: "250px" }}
            >
              <Doughnut data={data} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GraphCard;
