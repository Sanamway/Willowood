import React from 'react'

const CreditBalance = () => {
  return (
    <>
    <div className="creditwrapper">
              <div className="h-6 bg-white rounded-t-md flex items-center px-2 ">
                <h2 className="text-[0.75rem]">Credit Balance Details</h2>
              </div>

              <div className="w-full px- mt-[3px] flex lg:flex-row flex-col gap-3 font-arial   rounded-md">
                <div className="bg-white p-2 flex-1 md:flex items-center justify-center gap-4 rounded-md shadow-md text-white text-center">
                  <div className="flex md:flex-col  items-start justify-between w-full gap-2 p-1">
                    <h2 className="text-gray-500 text-[0.7rem] font-bold font-arial whitespace-nowrap">
                      Allocated Credit Limit{" "}
                    </h2>
                    <h2 className="text-sm text-[#ADBD5B] font-bold whitespace-nowrap">
                      &#8377;75,00,000.00
                    </h2>
                  </div>
                  <div className="flex md:flex-col p-1 items-start justify-between w-full gap-2 md:border-r-[3px] md:p-2 md:border-l-[3px] ">
                    <h2 className="text-gray-500 text-[0.7rem] font-bold whitespace-nowrap">
                      Utilized Credit Limit
                    </h2>
                    <h2 className="text-sm text-[#F5A05D] font-bold whitespace-nowrap">
                      &#8377;24,96,843.45
                    </h2>
                  </div>
                  <div className="flex md:flex-col items-start justify-between w-full gap-2 p-1">
                    <h2 className="text-gray-500 text-[0.7rem] font-bold whitespace-nowrap">
                      Balance Credit Limit
                    </h2>
                    <h2 className="text-sm text-[#E55769] font-bold whitespace-nowrap">
                      &#8377;50,03,156.00
                    </h2>
                  </div>
                </div>
              </div>
            </div>
    </>
  )
}

export default CreditBalance