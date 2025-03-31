import React, { useEffect, useState } from "react";
import Banner from "./Banner";
import BankingCards from "./BankingCards";
import Swipecards from "./Swipecards";
import UPICards from "./UPICards";
import { FaArrowAltCircleUp } from "react-icons/fa";

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



  const [error, setError] = useState(null);
  // 404 error handlling Function
  const ab = new Promise((res, rej) => {
    setTimeout(() => {
      res("! ")
    }, 404)


  }
  )
  ab.then((res, rej) => console.log("promises", res, rej))

  const handleRequestLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {

          setError(null);
        },
        (error) => {
          switch (error.code) {
            case error.PERMISSION_DENIED:
              setError("User denied the request for Geolocation.");
              break;
            case error.POSITION_UNAVAILABLE:
              setError("Location information is unavailable.");
              break;
            case error.TIMEOUT:
              setError("The request to get user location timed out.");
              break;
            case error.UNKNOWN_ERROR:
              setError("An unknown error occurred.");
              break;
            default:
              setError("An unknown error occurred.");
          }
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    handleRequestLocation()
  }, [])

  return (
    <>
      <section className="main w-full bg-[#012A72] h-screen  ">
        {/* <div className="flex bg-white h-screen text-center">Background Content</div> */}
        <div
          onWheel={handleScroll}
          // onTouchMove={handleTouchMove}
          className={`flex items-center overflow-y-auto mrhome fixed top-5 bg-white rounded-2xl justify-center w-[99.7%] ${dragup
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
          <div className="fixed bottom-12 right-9  rounded-full animate-pulse z-9999 ">
            <FaArrowAltCircleUp
              size={42}
              className="self-center size-120 text-black-400 text-blue-400 "
              onClick={() =>
                window.scrollTo({
                  top: 0,
                  behavior: "smooth", // Smooth scrolling animation
                })
              }
            />
          </div>
        </div>

      </section>

    </>
  );
};

export default Hero;
