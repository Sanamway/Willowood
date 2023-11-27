import React, { useState, Fragment } from "react";
import Aadhar from "../../public/aadhaar.png";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaUpload } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { Popover } from "@headlessui/react";
import Image from "next/image";
import { Dialog } from "@headlessui/react";
const Documents = () => {
  let [isOpen, setIsOpen] = useState(true);
  const menus = [
    {
      id: 1,
      name: "Bank Details",
    },
    {
      id: 2,
      name: "Declaration Forms",
    },
    {
      id: 2,
      name: "Education Details",
    },
    {
      id: 2,
      name: "Employee Identity Card",
    },
    {
      id: 2,
      name: "Employement Details",
    },
    {
      id: 2,
      name: "Identification Details",
    },
    {
      id: 2,
      name: "Other",
    },
    {
      id: 2,
      name: "Personal Details",
    },
    {
      id: 2,
      name: "Requistion for Visiting Cards",
    },
    {
      id: 2,
      name: "Training Details",
    },
  ];

  const [formActive, setFormActive] = useState(false);

  return (
    <div className="flex flex-col gap-4 px-2 pb-24 z-1">
      <table className="w-2/3 border-collapse block md:table lg:w-full">
        <thead className="block md:table-header-group">
          <tr className="border border-grey-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto  md:relative ">
            <th className=" p-2  font-bold md:border md:border-grey-500 text-left block md:table-cell">
              Image
            </th>
            <th className=" p-2  font-bold md:border md:border-grey-500 text-left block md:table-cell">
              Document Name
            </th>

            <th className=" p-2  font-bold md:border md:border-grey-500 text-left block md:table-cell"></th>
          </tr>
        </thead>
        {/* <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
              <span className="inline-block w-1/3 md:hidden font-bold">
                Name
              </span>
              Jamal Rios
            </td> */}
        <tbody className="block md:table-row-group">
          {menus.map((item, index) => (
            <tr className="relative border border-grey-500 md:border-none block md:table-row">
              <td className="p-2 md:border md:border-grey-500 text-left block hidden md:table-cell    ">
                <Image
                  src={Aadhar}
                  width={100}
                  height={100}
                  alt="Picture of the author"
                />
              </td>
              <td className="p-2 md:border md:border-grey-500  block  md:table-cell">
                <span className="flex w-full gap-2 md:hidden font-bold">
                  <Image
                    src={Aadhar}
                    width={100}
                    height={100}
                    alt="Picture of the author"
                  />
                  <span className="flex flex-col">
                    <span className=" flex align-center mt-2">{item.name}</span>
                    <span className=" flex align-center mt-2 font-bold text-xs text-gray-400">THis is the detail of this</span>
                  </span>
                </span>
                <div className="flex flex-col gap-1">
                <span className="hidden lg:inline-block">{item.name}</span>
                <span className="hidden lg:inline-block font-bold text-xs text-gray-400">THis is the detail of this</span>
              </div>
              
             
              </td>
              <td className=" p-2 md:border md:border-grey-500 block text-center   md:table-cell   absolute right-1 top-1 lg:relative lg:right-0 lg:top-0 ">
                {/* <td className="p-2 md:border md:border-grey-500 text-center block md:table-cell"> */}
                <div className="popop">
                  <Popover
                    as="div"
                    className="relative lg:relative border-none outline-none "
                  >
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
  );
};

export default Documents;
