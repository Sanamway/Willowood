import React, { useEffect, useState, Fragment } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { RiGroupLine } from "react-icons/ri";
import Slider from "react-slick";
import { sampleData } from "@/constants/productSample";
import { useSelector } from "react-redux";
import { Dialog, Transition } from "@headlessui/react";
import * as XLSX from "xlsx";
const ProductCards = () => {
  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }



  const allLastyeartilldata = useSelector((state) => state.rspAnalytics.rspAnalyticalData?.top_20_brand || []);
  const [data, setData] = useState([]);

  console.log("pop", data)

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

  const handleExportToExcel = () => {
    const exportData = data.map((item, index) => ({
      "S.No": index + 1,
      Title: item.title,
      Quantity: item.qty,
      "Total Year Sale (₹)": item.price,
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Products");

    XLSX.writeFile(workbook, "ProductDetails.xlsx");
  };


  return (
    <>
      <section className="bg-white border-red-500 lg:w-[950px] w-[300px] ">
        <div className="w-full flex justify-end"> <button
          className=" text-xs underline text-blue-500 hover:text-blue-700"
          onClick={openModal}
        >
          View Details
        </button></div>

        <Carousel
          className="bg-sky  "
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
                <h2 className=" text-[0.7rem] text-gray-600 font-bold">{item.title}</h2>
                <h3 className="start text-[0.7rem]">
                  <span>{item.qty} (QTY)</span>
                </h3>

                <h3 className="text-[0.7rem]">Total Year Sale</h3>
                <h3 className="text-[0.7rem]"> ₹ {item.price}</h3>
              </div>
            </div>
          ))}
        </Carousel>
      </section>
      {/* Modal */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-5xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <div className="flex justify-between items-center mb-4">
                    <Dialog.Title as="h3" className="flex text-sm  font-medium text-gray-900">
                      Top 20 Product Trends
                    </Dialog.Title>
                    <button onClick={closeModal} className="text-gray-500 hover:text-red-600 text-xl font-bold">
                      ×
                    </button>

                  </div>
                  <div className="flex justify-end mb-4">
                    <button
                      onClick={handleExportToExcel}
                      className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded text-sm"
                    >
                      Download Excel
                    </button>
                  </div>
                  <div className="overflow-auto max-h-[65vh]">
                    <table className="min-w-full border border-gray-300 text-xs">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="px-4 py-2 border">#</th>
                          <th className="px-4 py-2 border text-left">Product</th>
                          <th className="px-4 py-2 border text-left">QTY</th>
                          <th className="px-4 py-2 border text-left">YTD Sale</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.map((item, index) => (
                          <tr key={index} className="hover:bg-gray-50">
                            <td className="px-4 py-2 border text-center">{index + 1}</td>
                            <td className="px-4 py-2 border">{item.title}</td>
                            <td className="px-4 py-2 border">{item.qty}</td>
                            <td className="px-4 py-2 border">{item.price}</td>
                          </tr>
                        ))}
                        <tr className="hover:bg-gray-50">
                          <td className="px-4 py-2 border text-center">-</td>
                          <td className="px-4 py-2 border">-</td>
                          <td className="px-4 py-2 border">Total</td>
                          <td className="px-4 py-2 border"> {data.reduce((sum, item) => sum + (Number(item.price) || 0), 0).toFixed(2)}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

    </>
  );
};

export default ProductCards;
