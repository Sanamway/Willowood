import React, { useState, useEffect } from "react";
import axios from "axios";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { bannerData } from "./bannerData";
import Image from "next/image";

const Banner = () => {
  const [images, setImages] = useState([]);
  const responsive = {
    desktop: {
      breakpoint: { max: 2000, min: 1024 },
      items: 1,
      slidesToSlide: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
      slidesToSlide: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };

  const cardImages = async () => {
    const res = await axios.get("https://dummyjson.com/products?limit=10");
    const resApi = await res.data.products;
    console.log("reee", resApi);
    setImages(resApi);
  };

  useEffect(() => {
    cardImages();
  }, []);

  const CustomDot = ({ onMove, index, onClick, active }) => {
    return (
      <li
        className={`inline-block w-1 h-1 mr-2 my-2 rounded-full cursor-pointer ${
          active ? "bg-blue-500" : "bg-gray-300"
        }`}
        onClick={() => onClick()}
      ></li>
    );
  };

  return (
    <>
      <section className="w-full px-1.5 rounded-xl">
        <Carousel
          className="bg-sky rounded-xl "
          swipeable={true}
          draggable={false}
          showDots={true}
          responsive={responsive}
          autoPlay={true}
          ssr={true}
          infinite={true}
          autoPlaySpeed={3500}
          customDot={<CustomDot />}
          removeArrowOnDeviceType={["tablet", "desktop", "mobile"]}
        >
          {bannerData.map((item, i) => (
            <div
              key={i}
              className="img flex items-center w-full justify-center mt-1 rounded-lg border-none cursor-pointer"
            >
              <div className="image h-28 md:36 lg:h-72 w-full rounded-lg">
                <Image
                  className="object-fit lg:object-fit aspect-square w-full h-full rounded-lg"
                  src={item.thumbnail}
                  width={"100%"}
                  height={"100%"}
                  alt="image"
                />
              </div>
            </div>
          ))}
        </Carousel>
      </section>
    </>
  );
};

export default Banner;
