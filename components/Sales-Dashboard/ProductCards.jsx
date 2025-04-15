import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { RiGroupLine } from "react-icons/ri";
import Slider from "react-slick";
import { sampleData } from "@/constants/productSample";
import { useSelector } from "react-redux";

const ProductCards = () => {
  const allLastyeartilldata = useSelector((state) => state.rspAnalytics.rspAnalyticalData?.top_20_brand || []);
  const [data, setData] = useState([]);

  useEffect(() => {
    const formattedData = allLastyeartilldata.map((item, index) => ({
      id: index + 1,
      title: item.brand_name || `Brand ${item.brand}`, // Fallback to "Brand {brand}" if brand_name is null
      price: item.totalNewPriceValue || 0,
      description: `Brand ${item.brand_name || item.brand} has a total value of ${item.totalNewPriceValue}.`,
      category: "Agrochemicals",
      image: item.image_name || null, // Fallback to placeholder if image is null
      rating: {
        rate: (Math.random() * (5 - 3) + 3).toFixed(1), // Random rating between 3.0 and 5.0
        count: Math.floor(Math.random() * 500) + 50 // Random count between 50 and 500
      },
      qty: item.sku_billqty
    }));

    setData(formattedData);
  }, [allLastyeartilldata]);
  const responsive = {
    desktop: {
      breakpoint: { max: 2000, min: 1024 },
      items: 4,
      slidesToSlide: 2 // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2 // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
      slidesToSlide: 1
    }
  };




  return (
    <>
      <section className="bg-white border-red-500 lg:w-[950px] w-[300px] ">
        <Carousel
          className="bg-sky py-1 "
          swipeable={true}
          draggable={false}
          showDots={false}
          responsive={responsive}
          autoPlay={true}
          ssr={true} // means to render carousel on server-side.
          infinite={true}
          autoPlaySpeed={2000}
          removeArrowOnDeviceType={["tablet", "desktop", "mobile"]}
        >
          {data.map((item, i) => (
            <div key={i} className="img flex items-center justify-center mt-1    border-none cursor-pointer">
              <div className="image">
                {item.image ? <img className="object-contain w-24 h-24" src={item.image} alt="image" /> : <div className="object-contain w-24 h-24" > </div>}
              </div>
              <div className="content flex flex-col">
                <h2 className="text-[1rem] text-gray-600">{item.title}</h2>
                <h3 className="start text-[0.7rem]">
                  <span>{item.qty}</span>
                </h3>
                <h3 className="start text-[0.7rem]">
                  <span>*</span>4.1/5
                </h3>
                <h3 className="text-[0.7rem]">Last Months Sale</h3>
                <h3>₹ {item.price}</h3>
              </div>
            </div>
          ))}
        </Carousel>
      </section>
    </>
  );
};

export default ProductCards;
