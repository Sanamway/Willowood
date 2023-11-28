import React, { useState, Fragment } from "react";
import Aadhar from "../../public/aadhaar.webp";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaUpload } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { Popover } from "@headlessui/react";
import Image from "next/image";
import { Dialog } from "@headlessui/react";

const Documents = () => {
  let [isOpen, setIsOpen] = useState(true);
  const datas = [
    {
      id: 1,
      name: "Security Deposit",
      src: [Aadhar, Aadhar, Aadhar]
    },
    {
      id: 2,
      name: "Copy of Partnership Dead",
      src: [Aadhar, Aadhar, Aadhar]
    },
    {
      id: 2,
      name: "Copy of Certificate of Incorporation",
      src: [Aadhar, Aadhar, Aadhar]
    },
    {
      id: 2,
      name: "Personal Guarantee",
      src: [Aadhar, Aadhar, Aadhar]
    },
    {
      id: 2,
      name: "Profit and Loss",
      src: [Aadhar, Aadhar, Aadhar]
    },
    {
      id: 2,
      name: "Balance Sheet for Last Two Years",
      src: [Aadhar, Aadhar, Aadhar]
    },
    {
      id: 2,
      name: "Copy Of Pesticide License",
      src: [Aadhar, Aadhar, Aadhar]
    },
    {
      id: 2,
      name: "Copy Of Pesticide License",
      src: [Aadhar, Aadhar, Aadhar]
    },
    {
      id: 2,
      name: "Copy of Pan Card",
      src: [Aadhar, Aadhar, Aadhar]
    },
    {
      id: 2,
      name: "Copy of Aadhar Card",
      src: [Aadhar, Aadhar, Aadhar]
    },

    {
      id: 2,
      name: "Copy of Bank Signature Verification",
      src: [Aadhar, Aadhar, Aadhar]
    },

    {
      id: 2,
      name: "Bank Statement",
      src: [Aadhar, Aadhar, Aadhar]
    }
  ];

  const [formActive, setFormActive] = useState(false);

  return (
    // <div className="flex flex-col gap-4 px-2 pb-24 z-1">
    //   <table className=" border-collapse block md:table lg:w-full">
    //     <thead className="block md:table-header-group">
    //       <tr className="border border-grey-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto  md:relative ">
    //         <th className=" p-2  font-bold md:border md:border-grey-500 text-left block md:table-cell">
    //           Image
    //         </th>
    //         <th className=" p-2  font-bold md:border md:border-grey-500 text-left block md:table-cell">
    //           Document Name
    //         </th>

    //         <th className=" p-2  font-bold md:border md:border-grey-500 text-left block md:table-cell"></th>
    //       </tr>
    //     </thead>

    //     <tbody className="block md:table-row-group">
    //       {menus.map((item, index) => (
    //         <tr className="relative border border-grey-500 md:border-none block md:table-row">
    //           <td className="p-2 md:border md:border-grey-500 text-left  md:table-cell    ">
    //             {item.src && (<div className="flex">
    //             <Image src={item?.src[0]} width={100} height={100} alt="Picture of the author" />
    //             <Image src={item?.src[1]} width={100} height={100} alt="Picture of the author" />
    //             </div>)}
    //           </td>
    //           <td className="p-2 md:border md:border-grey-500  block  md:table-cell">
    //             <span className="flex w-full  gap-4  font-bold">
    //               <span className="flex flex-col">
    //                 <span className=" flex align-center mt-2 ">{item.name}</span>
    //                 <span className=" flex align-center mt-2 font-bold text-xs text-gray-400">
    //                   THis is the detail of this
    //                 </span>
    //               </span>
    //             </span>
    //             <div className="flex flex-col gap-1">
    //               <span className="hidden lg:inline-block">{item.name}</span>
    //               <span className="hidden lg:inline-block font-bold text-xs text-gray-400">
    //                 THis is the detail of this
    //               </span>
    //             </div>
    //           </td>
    //           <td className=" p-2 md:border md:border-grey-500 block text-center   md:table-cell   absolute right-1 top-1 lg:relative lg:right-0 lg:top-0 ">
    //             <div className="popop">
    //               <Popover as="div" className="relative lg:relative border-none outline-none ">
    //                 {({ open }) => (
    //                   <>
    //                     <Popover.Button className="focus:outline-none">
    //                       <BsThreeDotsVertical
    //                         className="text-[#626364] cursor-pointer"
    //                         size={20}
    //                       ></BsThreeDotsVertical>
    //                     </Popover.Button>

    //                     <Popover.Panel
    //                       as="div"
    //                       className={`${
    //                         open ? "block" : "hidden"
    //                       }  absolute right-0 lg:absolute z-40 top-1 right-0 mt-2 w-40 bg-white  text-black border rounded-md shadow-md`}
    //                     >
    //                       <ul className=" text-black text-xs flex flex-col gap-  font-Rale cursor-pointer">
    //                         <li className="flex  gap-2  hover:bg-gray-100 px-2 py-1 rounded-md text-xl">
    //                           <FaUpload className="mt-1" /> Upload
    //                         </li>
    //                         <li className="flex  gap-2 hover:bg-gray-100 px-2 py-1 rounded-md text-xl">
    //                           <FaEye className="mt-1" /> View
    //                         </li>
    //                         <li className="flex  gap-2  hover:bg-gray-100 px-2 py-1 rounded-md text-xl">
    //                           <FaRegTrashAlt className="mt-1" />
    //                           Delete
    //                         </li>
    //                       </ul>
    //                     </Popover.Panel>
    //                   </>
    //                 )}
    //               </Popover>
    //             </div>
    //           </td>
    //         </tr>
    //       ))}
    //     </tbody>
    //   </table>
    // </div>
    // <div className="flex flex-col gap-4 px-2 pb-24 z-1">
    //   <div className="overflow-x-auto">
    //     <table className="min-w-full divide-y divide-gray-200 border-2">
    //       <thead className="bg-gray-50 border-2">
    //         <tr className="border-2">
    //           <th className="p-2 font-bold text-left border border-grey-500">Image</th>
    //           <th className="p-2 font-bold text-left border border-grey-500">Document Name</th>
    //           <th className="p-2 font-bold text-left border border-grey-500"></th>
    //         </tr>
    //       </thead>

    //       <tbody>
    //         {menus.map((item, index) => (
    //           <tr key={index} className="border border-grey-500">
    //             <td className="p-2 border border-grey-500 text-left">
    //               {item.src && (
    //                 <div className="flex">
    //                   <Image src={item?.src[0]} width={100} height={100} alt="Image 1" />
    //                   <Image src={item?.src[1]} width={100} height={100} alt="Image 2" />
    //                 </div>
    //               )}
    //             </td>
    //             <td className="p-2 border border-grey-500 text-left">
    //               <span className="flex flex-col">
    //                 <span className="mt-2">{item.name}</span>
    //                 <span className="mt-2 text-xs text-gray-400">This is the detail of this</span>
    //               </span>
    //             </td>
    //             <td className="p-2 border border-grey-500 text-center">
    //               <div className="popop">
    //                 <Popover as="div" className="relative border-none outline-none ">
    //                   {({ open }) => (
    //                     <>
    //                       <Popover.Button className="focus:outline-none">
    //                         <BsThreeDotsVertical className="text-[#626364] cursor-pointer" size={20} />
    //                       </Popover.Button>

    //                       <Popover.Panel
    //                         as="div"
    //                         className={`${
    //                           open ? "block" : "hidden"
    //                         } absolute z-40 top-1 right-0 mt-2 w-40 bg-white text-black border rounded-md shadow-md`}
    //                       >
    //                         <ul className="text-black text-xs flex flex-col gap- font-Rale cursor-pointer">
    //                           <li className="flex gap-2 hover:bg-gray-100 px-2 py-1 rounded-md text-xl">
    //                             <FaUpload className="mt-1" /> Upload
    //                           </li>
    //                           <li className="flex gap-2 hover:bg-gray-100 px-2 py-1 rounded-md text-xl">
    //                             <FaEye className="mt-1" /> View
    //                           </li>
    //                           <li className="flex gap-2 hover:bg-gray-100 px-2 py-1 rounded-md text-xl">
    //                             <FaRegTrashAlt className="mt-1" /> Delete
    //                           </li>
    //                         </ul>
    //                       </Popover.Panel>
    //                     </>
    //                   )}
    //                 </Popover>
    //               </div>
    //             </td>
    //           </tr>
    //         ))}
    //       </tbody>
    //     </table>
    //   </div>
    // </div>

    <div className="mx-2  px-4 my-4 py-1 overflow-x-auto  ">
      <div className="inline-block min-w-full rounded-lg overflow-hidden">
        <table className="min-w-full leading-normal ">
          <thead className="">
            <tr>
              <th className="px-5 py-2 border-b-2 border-gray-200 bg-[#626364] text-left text-xs font-semibold text-white  tracking-wider">
                Images
              </th>
              <th className="px- py-2 border-b-2 border-gray-200 bg-[#626364] text-left text-xs font-semibold text-white  tracking-wider">
                Documents
              </th>
              <th className="px- py-2 border-b-2 border-gray-200 bg-[#626364] text-left text-xs font-semibold text-white  tracking-wider">
                Options
              </th>
            </tr>
          </thead>
          <tbody>
            {datas.map((item) => (
              <tr key={item.id}>
                <td className="px-5 py-1 border-b border-gray-200 bg-white text-xs">
                  <div className="flex items-center">
                    <div className="w-20 h-20">
                      {item.src && <Image className="object-contain w-full h-full" src={item.src[0]}></Image>}
                    </div>
                  </div>
                </td>
                <td className="px- py-2 border-b border-gray-200 bg-white text-sm">
                  <p className="text-gray-900 whitespace-no-wrap text-xs font-semibold">{item.name}</p>
                </td>

                <td className="px-2 py-2 border-b border-gray-200 bg-white text-sm">
                  <span className="relative inline-block px-2 py-1 font-semibold text-green-900 leading-tight">
                    <span
                      aria-hidden
                      style={{ backgroundColor: item.color }}
                      className="absolute inset-0 opacity-60 rounded-full"
                    ></span>
                    <span className="relative text-white whitespace-no-wrap text-xs font-semibold">
                      {item.status}
                    </span>
                  </span>
                  <div className="popop">
                    <Popover as="div" className="relative lg:relative border-none outline-none ">
                      {({ open }) => (
                        <>
                          <Popover.Button className="focus:outline-none">
                            <BsThreeDotsVertical
                              className="text-[#626364] cursor-pointer"
                              size={20}
                            ></BsThreeDotsVertical>
                          </Popover.Button>

                          <Popover.Panel
                            as="div"
                            className={`${
                              open ? "block" : "hidden"
                            }  absolute right-0 lg:absolute z-40 top-1 right-0 mt-2 w-40 bg-white  text-black border rounded-md shadow-md`}
                          >
                            <ul className=" text-black text-xs flex flex-col gap-  font-Rale cursor-pointer">
                              <li className="flex  gap-2  hover:bg-gray-100 px-2 py-1 rounded-md text-xl">
                                <FaUpload className="mt-1" /> Upload
                              </li>
                              <li className="flex  gap-2 hover:bg-gray-100 px-2 py-1 rounded-md text-xl">
                                <FaEye className="mt-1" /> View
                              </li>
                              <li className="flex  gap-2  hover:bg-gray-100 px-2 py-1 rounded-md text-xl">
                                <FaRegTrashAlt className="mt-1" />
                                Delete
                              </li>
                            </ul>
                          </Popover.Panel>
                        </>
                      )}
                    </Popover>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Documents;
