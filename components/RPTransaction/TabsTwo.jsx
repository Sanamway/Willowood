import React, { useState, useEffect } from "react";
import Basic from "../DealerForms/Basic";
import Personal from "../DealerForms/Personal";
import Upload from "./Upload";
import DragAndDrop from "./UploadTest";

const TabsTwo = () => {
  const [formType, setFormType] = useState("Basic");

  return (
    <>
      

      <section className="outer w-full px-12 mt-12" >
            <div className="steps mx-20 mt-12"  >
              <ul className="tablist flex items-center justify-center gap-4 lg:gap-[8rem] flex-wrap md:flex-nowrap w-full"  >
                <li className="mb-5" onClick={() => setFormType("Basic")}>
                  <a className={`w-1/5 text-center border-1 rounded-md whitespace-nowrap mx-auto ${formType === "Basic" ?"bg-teal-500":"bg-gray-400"}  py-1.5 px-2 text-white `} href="#">
                    <span className="text-sm">Upload RP XLS</span>
                  </a>
                </li>
                <li className="mb-5" onClick={() => setFormType("Personal")}>
                  <a className={`w-1/5 text-center border-1 rounded-md whitespace-nowrap mx-auto ${formType === "Personal" ?"bg-teal-500":"bg-gray-400"}  py-1.5 px-2 text-white `} href="#">
                    <span className="text-sm">Validate RP Plan</span>
                  </a>
                </li>
                <li className="mb-5">
                  <a className={`w-1/5 text-center border-1 rounded-md whitespace-nowrap mx-auto ${formType === "Personal" ?"bg-teal-500":"bg-gray-400"}  py-1.5 px-2 text-white `} href="#">
                    <span className="text-sm">Summary Sheet</span>
                  </a>
                </li>
                {/* <li className="mb-5">
                  <a className={`w-1/5 text-center border-1 whitespace-nowrap mx-auto bg-teal-500 py-1.5 px-2 text-white `} href="#">
                    <span className="text-sm">Upload RP XLS</span>
                  </a>
                </li> */}
              </ul>
            </div>
            {formType === "Basic" && <DragAndDrop formType={setFormType} />}
            {formType === "Personal" && <Upload formType={setFormType} />}
      </section>
    </>
  );
};

export default TabsTwo;
