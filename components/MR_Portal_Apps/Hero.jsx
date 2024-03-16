import React, { useState } from "react";
import Banner from "./Banner";
import BankingCards from "./BankingCards";
import Swipecards from "./Swipecards";
import UPICards from "./UPICards";

const Hero = () => {
  const [dragup, setDragUp] = useState(true);

  const handleScroll = (e) => {
    const scrolledUp = e.deltaY > 0;
    setDragUp(scrolledUp);
  };

  const handleTouchMove = (e) => {
    const touchY = e.touches[0].clientY;
    const scrolledUp = touchY > window.innerHeight / 4;
    setDragUp(scrolledUp);
  };

  return (
    <>
      <section className="main w-full bg-[#15283C] h-screen  ">
        {/* <div className="flex bg-white h-screen text-center">Background Content</div> */}
        <div
          onWheel={handleScroll}
          // onTouchMove={handleTouchMove}
          className={`flex items-center overflow-y-auto mrhome fixed top-5 bg-white rounded-2xl justify-center w-[99.7%] ${
            dragup
              ? "transition-all ease-out duration-300 mt-10"
              : "transition-all ease-out duration-300 mt-52"
          }`}
          style={{ height: "calc(100vh - 5rem)" }}
        >
          <div className="h-full w-full  ">
            <div className="flex flex-col items-center justify-center rounded-2xl ">
              <div className="w-[99%] px-1 bg-white flex items-center flex-col pb-4 rounded-l-2xl rounded-r-2xl">
                <button
                  onClick={() => setDragUp(!dragup)}
                  className="sticky top-2 pillbutton inline-block bg-[#B8C3C9] h-[6px] w-12 rounded-lg mt-2.5 mb-2"
                ></button>
                <Banner></Banner>
                {/* <div className="bg-[#f7ffee] lg:w-[99%] w-[96%] my-2 rounded-lg">
                  <Swipecards></Swipecards>
                </div> */}
                <BankingCards></BankingCards>
                <UPICards></UPICards>
              </div>

              <div className="bg-[#F2F4FF] w-[97%] my-2 rounded-lg">
                <Swipecards></Swipecards>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
