import React, { useState, useEffect } from "react";
import { BsCheck2Circle } from "react-icons/bs";

const Assessment = (props) => {
  const [formActive, setFormActive] = useState(false);

  return (
    <form className=" bg-white rounded  p-4 w-full  overflow-auto" onSubmit={(e) => e.preventDefault()}>
      <div className="flex my-2">
        <div className="w-full px-2">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
            <small className="text-red-600"></small> Party Name
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            placeholder="Party Name"
            disabled={!formActive}
          />
        </div>
      </div>
      <div className="w-full px-2 flex justify-center">
        <label className="block text-gray-700 text-md font-bold mb-2 pt-2">
          <span className="flex gap-1">
            <small className="text-red-600 "></small> Distributor Assessment Report
          </span>
        </label>
      </div>

      <div className="flex my-2">
        <div className="w-full px-2">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
            <small className="text-red-600"></small> (A) General{" "}
            <span className="text-xs  font-thin">(To be Filled by Regional Manager)</span> Review about
            distributor
          </label>
          <div className="flex my-2 mb-2  justify-between lg:flex-row flex-col items-center accent-lime-400 border-[0.006rem] lg:py-6 border-gray-400 ">
            <div className="w-full lg:w-auto px-2">
              <div className="flex items-center">
                <input type="checkbox" id="ownedCheckbox" className="mr-2" disabled={formActive} />
                <label htmlFor="ownedCheckbox">Fair</label>
              </div>
            </div>

            <div className="w-full lg:w-auto px-2">
              <div className="flex items-center">
                <input type="checkbox" id="rentedCheckbox" className="mr-2" disabled={formActive} />
                <label htmlFor="rentedCheckbox">Good</label>
              </div>
            </div>

            <div className="w-full lg:w-auto px-2">
              <div className="flex items-center">
                <input type="checkbox" id="rentedCheckbox" className="mr-2" disabled={formActive} />
                <label htmlFor="rentedCheckbox"> Very Good</label>
              </div>
            </div>

            <div className="w-full lg:w-auto px-2">
              <div className="flex items-center">
                <input type="checkbox" id="rentedCheckbox" className="mr-2" disabled={formActive} />
                <label htmlFor="rentedCheckbox">Excellent</label>
              </div>
            </div>

            <div className="w-full lg:w-auto px-2">
              <div className="flex items-center">
                <input type="checkbox" id="rentedCheckbox" className="mr-2" disabled={formActive} />
                <label htmlFor="rentedCheckbox">Oustanding</label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex my-2">
        <div className="w-full px-2">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
            <small className="text-red-600"></small> (B) Proprietor Relationship with our Company Staff
          </label>
          <div className="flex my-2 mb-2 justify-between lg:flex-row flex-col items-center accent-lime-400 border-[0.006rem] lg:py-6 border-gray-400 ">
            <div className="w-full lg:w-auto px-2 ">
              <div className="flex items-center">
                <input type="checkbox" id="ownedCheckbox" className="mr-2" disabled={formActive} />
                <label htmlFor="ownedCheckbox">Yes</label>
              </div>
            </div>

            <div className="w-full lg:w-auto px-2">
              <div className="flex items-center">
                <input type="checkbox" id="rentedCheckbox" className="mr-2" disabled={formActive} />
                <label htmlFor="rentedCheckbox">No</label>
              </div>
            </div>

            <div className="w-full lg:w-auto px-2 invisible">
              <div className="flex items-center">
                <input type="checkbox" id="rentedCheckbox" className="mr-2" disabled={formActive} />
                <label htmlFor="rentedCheckbox">No</label>
              </div>
            </div>

         
          </div>
        </div>
      </div>

      <div className="flex my-2">
        <div className="w-full px-2">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
            <small className="text-red-600"></small> (C) Goodwill / Reputation Status of Distributor in Market
          </label>
          <div className="flex my-2 mb-2  justify-between lg:flex-row flex-col items-center accent-lime-400 border-[0.006rem] lg:py-6 border-gray-400 ">
            <div className="w-full lg:w-auto px-2">
              <div className="flex items-center">
                <input type="checkbox" id="ownedCheckbox" className="mr-2" disabled={formActive} />
                <label htmlFor="ownedCheckbox">Poor</label>
              </div>
            </div>

            <div className="w-full lg:w-auto px-2">
              <div className="flex items-center">
                <input type="checkbox" id="rentedCheckbox" className="mr-2" disabled={formActive} />
                <label htmlFor="rentedCheckbox">Avg</label>
              </div>
            </div>

            <div className="w-full lg:w-auto px-2">
              <div className="flex items-center">
                <input type="checkbox" id="rentedCheckbox" className="mr-2" disabled={formActive} />
                <label htmlFor="rentedCheckbox"> Good</label>
              </div>
            </div>

            <div className="w-full lg:w-auto px-2">
              <div className="flex items-center">
                <input type="checkbox" id="rentedCheckbox" className="mr-2" disabled={formActive} />
                <label htmlFor="rentedCheckbox">Excellent</label>
              </div>
            </div>

            <div className="w-full lg:w-auto px-2 invisible">
              <div className="flex items-center">
                <input type="checkbox" id="rentedCheckbox" className="mr-2" disabled={formActive} />
                <label htmlFor="rentedCheckbox">Oustanding</label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex my-2">
        <div className="w-full px-2">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
            <small className="text-red-600"></small> (D) Financial Status of Distributor
          </label>
          <div className="flex my-2 mb-2  justify-between lg:flex-row flex-col items-center accent-lime-400 border-[0.006rem] lg:py-6 border-gray-400 ">
            <div className="w-full lg:w-auto px-2">
              <div className="flex items-center">
                <input type="checkbox" id="ownedCheckbox" className="mr-2" disabled={formActive} />
                <label htmlFor="ownedCheckbox">Less than 50 L</label>
              </div>
            </div>

            <div className="w-full lg:w-auto px-2">
              <div className="flex items-center">
                <input type="checkbox" id="rentedCheckbox" className="mr-2" disabled={formActive} />
                <label htmlFor="rentedCheckbox">50 Lac +</label>
              </div>
            </div>

            <div className="w-full lg:w-auto px-2">
              <div className="flex items-center">
                <input type="checkbox" id="rentedCheckbox" className="mr-2" disabled={formActive} />
                <label htmlFor="rentedCheckbox"> 1Cr +</label>
              </div>
            </div>

            <div className="w-full lg:w-auto px-2">
              <div className="flex items-center">
                <input type="checkbox" id="rentedCheckbox" className="mr-2" disabled={formActive} />
                <label htmlFor="rentedCheckbox">5Cr +</label>
              </div>
            </div>

            <div className="w-full lg:w-auto px-2">
              <div className="flex items-center">
                <input type="checkbox" id="rentedCheckbox" className="mr-2" disabled={formActive} />
                <label htmlFor="rentedCheckbox">10Cr+</label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex my-2">
        <div className="w-full px-2">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
            <small className="text-red-600"></small> (E) Family Background Of Distributor
          </label>
          <div className="flex my-2 mb-2  justify-between lg:flex-row flex-col items-center accent-lime-400 border-[0.006rem] lg:py-6 border-gray-400 ">
            <div className="w-full lg:w-auto px-2">
              <div className="flex items-center">
                <input type="checkbox" id="ownedCheckbox" className="mr-2" disabled={formActive} />
                <label htmlFor="ownedCheckbox">Family Background</label>
              </div>
            </div>

            <div className="w-full lg:w-auto px-2">
              <div className="flex items-center">
                <input type="checkbox" id="rentedCheckbox" className="mr-2" disabled={formActive} />
                <label htmlFor="rentedCheckbox">Service Backround</label>
              </div>
            </div>

            <div className="w-full lg:w-auto px-2">
              <div className="flex items-center">
                <input type="checkbox" id="rentedCheckbox" className="mr-2" disabled={formActive} />
                <label htmlFor="rentedCheckbox">Business Family Root</label>
              </div>
            </div>

            <div className="w-full lg:w-auto px-2">
              <div className="flex items-center">
                <input type="checkbox" id="rentedCheckbox" className="mr-2" disabled={formActive} />
                <label htmlFor="rentedCheckbox">Distrurbed Family</label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex my-2">
        <div className="w-full px-2">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
            <small className="text-red-600"></small> (F) Any Demerit about Distributor
          </label>
          <div className="flex my-2 mb-2  justify-between lg:flex-row flex-col items-center accent-lime-400 border-[0.006rem] lg:py-6 border-gray-400 ">
            <div className="w-full lg:w-auto px-2">
              <div className="flex items-center">
                <input type="checkbox" id="ownedCheckbox" className="mr-2" disabled={formActive} />
                <label htmlFor="ownedCheckbox">Trader Wholesale Type</label>
              </div>
            </div>

            <div className="w-full lg:w-auto px-2">
              <div className="flex items-center">
                <input type="checkbox" id="rentedCheckbox" className="mr-2" disabled={formActive} />
                <label htmlFor="rentedCheckbox">Wholesale Only</label>
              </div>
            </div>

            <div className="w-full lg:w-auto px-2">
              <div className="flex items-center">
                <input type="checkbox" id="rentedCheckbox" className="mr-2" disabled={formActive} />
                <label htmlFor="rentedCheckbox">Retail Only</label>
              </div>
            </div>

            <div className="w-full lg:w-auto px-2">
              <div className="flex items-center">
                <input type="checkbox" id="rentedCheckbox" className="mr-2" disabled={formActive} />
                <label htmlFor="rentedCheckbox">Live Credit Only</label>
              </div>
            </div>

            <div className="w-full lg:w-auto px-2">
              <div className="flex items-center">
                <input type="checkbox" id="rentedCheckbox" className="mr-2" disabled={formActive} />
                <label htmlFor="rentedCheckbox">Can sell only service</label>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* buttons */}
      <div className="my-6 flex items-center justify-end ">
        <div className="flex items-center justify-end w-full gap-4 ">
          <button
            onClick={() => props.formType("BusinessInfo")}
            className={`text-center rounded-md hover:bg-green-500 ${
              formActive ? "bg-green-400" : "bg-gray-400"
            }  text-white py-1 px-4 text-lg`}
          >
            Prev
          </button>
          <button
            onClick={() => props.formType("Approval")}
            className="text-center rounded-md bg-orange-500 text-white py-1 px-4 text-lg"
          >
            Next
          </button>
        </div>
      </div>
    </form>
  );
};

export default Assessment;
