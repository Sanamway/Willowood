import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";
import axios from "axios";
import { url } from "@/constants/url";
import toast, { Toaster } from "react-hot-toast";

function SummmaryTable({ gridType, summaryData, collectionSummaryData }) {
  const headers = {
    "Content-Type": "application/json",
    secret: "fsdhfgsfuiweifiowefjewcewcebjw",
  };

  return (
    <div>
      {gridType === "Rolling" ? (
        <Fragment>
          <div className="flex flex-col w-full my-4 gap-2 px-4 lg:flex-row  justify-between lg:px-12">
            <h2 className="flex  font-bold text-xs">
              Total Summary Rolling Plan (in Lac){" "}
            </h2>
            <div className="flex flex-row px-2 items-center gap-4 font-bold text-xs">
              <span>Target Ach </span>{" "}
              <span className="flex h-3 w-3 bg-red-500"></span>
              {"< = 50"}
              <span className="flex h-3 w-3 bg-blue-500"></span>
              {"51 to 74  %"}
              <span className="flex h-3 w-3 bg-orange-500"></span>
              {"75 to 90 %"}
              <span className="flex h-3 w-3 bg-green-500"></span>
              {" > 90 %"}
            </div>
          </div>
          <div className="hidden lg:flex flex-col mt-2 text-sm">
            <div className="grid grid-cols-4  text-sm px-12 py-2">
              <div className="border border-gray-300 py-1 flex justify-center items-center font-bold text-xs bg-gray-300 ">
                YTD
              </div>
              <div className="border border-gray-300 py-1 flex justify-center items-center font-bold text-xs bg-gray-300">
                H1 - (April - Sept)
              </div>
              <div className="border border-gray-300 py-1 flex justify-center items-center font-bold text-xs bg-gray-300">
                H2 - (Oct - March)
              </div>
              <div className="border border-gray-300 py-1 flex justify-center items-center font-bold text-xs bg-gray-300">
                Current Month-MTD
              </div>
            </div>

            <div className="grid grid-cols-4  text-sm px-12 font-bold text-xs ">
              <div className="border border-gray-300  flex justify-between items-center">
                <span className=" flex items-center   justify-center border-r border-gray-300 w-20">
                  Bud.
                </span>
                <span className=" flex items-center  justify-center border-r border-gray-300 w-20">
                  M.Tar
                </span>
                <span className=" flex items-center  justify-center border-r border-gray-300 w-20">
                  RSP
                </span>

                <span className=" flex items-center justify-center   border-r border-gray-300 w-20">
                  Sale
                </span>
                <span className=" flex items-center  justify-center border-r border-gray-300 w-20">
                  B. Ach
                </span>
                <span className=" flex items-center justify-center  border-r border-gray-300 w-20">
                  M. Ach
                </span>
                <span className=" flex items-center justify-center   border-gray-300 w-20">
                  R. Ach
                </span>
              </div>
              <div className="border border-gray-300  flex justify-between items-center">
                <span className=" flex items-center   justify-center border-r border-gray-300 w-20">
                  Bud.
                </span>
                <span className=" flex items-center  justify-center border-r border-gray-300 w-20">
                  M.Tar
                </span>
                <span className=" flex items-center  justify-center border-r border-gray-300 w-20">
                  RSP
                </span>

                <span className=" flex items-center justify-center   border-r border-gray-300 w-20">
                  Sale
                </span>
                <span className=" flex items-center  justify-center border-r border-gray-300 w-20">
                  B. ach
                </span>
                <span className=" flex items-center justify-center  border-r border-gray-300 w-20">
                  M. Ach
                </span>
                <span className=" flex items-center justify-center   border-gray-300 w-20">
                  R. Ach
                </span>
              </div>

              <div className="border border-gray-300  flex justify-between items-center">
                <span className=" flex items-center   justify-center border-r border-gray-300 w-20">
                  Bud.
                </span>
                <span className=" flex items-center  justify-center border-r border-gray-300 w-20">
                  M.Tar
                </span>
                <span className=" flex items-center  justify-center border-r border-gray-300 w-20">
                  RSP
                </span>

                <span className=" flex items-center justify-center   border-r border-gray-300 w-20">
                  Sale
                </span>
                <span className=" flex items-center  justify-center border-r border-gray-300 w-20">
                  B. Ach
                </span>
                <span className=" flex items-center justify-center  border-r border-gray-300 w-20">
                  M. Ach
                </span>
                <span className=" flex items-center justify-center   border-gray-300 w-20">
                  R. Ach
                </span>
              </div>
              <div className="border border-gray-300  flex justify-between items-center">
                <span className=" flex items-center  justify-center border-r border-gray-300 w-20">
                  Bud.
                </span>
                <span className=" flex items-center  justify-center border-r border-gray-300 w-20">
                  M.Tar
                </span>
                <span className=" flex items-center  justify-center border-r border-gray-300 w-20">
                  RSP
                </span>
                <span className=" flex items-center  justify-center border-r border-gray-300 w-20">
                  Sale
                </span>
                <span className=" flex items-center justify-center  border-r border-gray-300 w-20">
                  B Ach
                </span>
                <span className=" flex items-center justify-center  border-r border-gray-300 w-20">
                  M. Ach
                </span>
                <span className=" flex items-center  justify-center  border-gray-300 w-20">
                  R. Ach
                </span>
              </div>
            </div>

            <div className="grid grid-cols-4  text-[12px] px-12">
              <div className="border border-gray-300  flex justify-between items-center">
                <span className=" flex items-center  justify-center border-r border-gray-300 w-20">
                  {summaryData.budget.toFixed(2)}
                </span>
                <span className=" flex items-center  justify-center border-r border-gray-300 w-20">
                  {summaryData.mTarget.toFixed(2)}
                </span>
                <span className=" flex items-center  justify-center border-r border-gray-300 w-20">
                  {summaryData.target.toFixed(2)}
                </span>

                <span className=" flex items-center justify-center  border-r border-gray-300 w-20">
                  {summaryData.actual.toFixed(2)}
                </span>
                <span className=" flex items-center  justify-center border-r border-gray-300 w-20">
                  {((summaryData.actual / summaryData.budget) * 100).toFixed(
                    2
                  ) === "NaN" ||
                  (
                    (summaryData.actual.toFixed(2) /
                      summaryData.budget.toFixed(2)) *
                    100
                  ).toFixed(2) === "Infinity"
                    ? 0
                    : ((summaryData.actual / summaryData.budget) * 100).toFixed(
                        2
                      )}
                </span>
                <span className=" flex items-center  justify-center border-r border-gray-300 w-20">
                  {((summaryData.actual / summaryData.mTarget) * 100).toFixed(
                    2
                  ) === "NaN" ||
                  ((summaryData.actual / summaryData.mTarget) * 100).toFixed(
                    2
                  ) === "Infinity"
                    ? 0
                    : (
                        (summaryData.actual / summaryData.mTarget) *
                        100
                      ).toFixed(2)}
                </span>
                <span className=" flex items-center  justify-center  border-gray-300 w-20">
                  {((summaryData.actual / summaryData.target) * 100).toFixed(
                    2
                  ) === "NaN" ||
                  (
                    (summaryData.actual.toFixed(2) /
                      summaryData.target.toFixed(2)) *
                    100
                  ).toFixed(2) === "Infinity"
                    ? 0
                    : ((summaryData.actual / summaryData.target) * 100).toFixed(
                        2
                      )}
                </span>
              </div>
              <div className="border border-gray-300  flex justify-between items-center">
                <span className=" flex items-center  justify-center border-r border-gray-300 w-20">
                  {summaryData.budgetH1.toFixed(2)}
                </span>
                <span className=" flex items-center  justify-center border-r border-gray-300 w-20">
                  {summaryData.mTargetH1.toFixed(2)}
                </span>
                <span className=" flex items-center justify-center  border-r border-gray-300 w-20">
                  {summaryData.targetH1.toFixed(2)}
                </span>
                <span className=" flex items-center  justify-center  border-r border-gray-300 w-20">
                  {summaryData.actualH1.toFixed(2)}
                </span>

                <span className=" flex items-center  justify-center border-r border-gray-300 w-20">
                  {(
                    (summaryData.actualH1 / summaryData.budgetH1) *
                    100
                  ).toFixed(2) === "NaN" ||
                  (
                    (summaryData.actualH1.toFixed(2) /
                      summaryData.budgetH1.toFixed(2)) *
                    100
                  ).toFixed(2) === "Infinity"
                    ? 0
                    : (
                        (summaryData.actualH1 / summaryData.budgetH1) *
                        100
                      ).toFixed(2)}
                </span>
                <span className=" flex items-center  justify-center border-r border-gray-300 w-20">
                  {(
                    (summaryData.actualH1 / summaryData.mTargetH1) *
                    100
                  ).toFixed(2) === "NaN" ||
                  (
                    (summaryData.actualH1 / summaryData.mTargetH1) *
                    100
                  ).toFixed(2) === "Infinity"
                    ? 0
                    : (
                        (summaryData.actualH1 / summaryData.mTargetH1) *
                        100
                      ).toFixed(2)}
                </span>
                <span className=" flex items-center  justify-center  border-gray-300 w-20">
                  {(
                    (summaryData.actualH1 / summaryData.targetH1) *
                    100
                  ).toFixed(2) === "NaN" ||
                  (
                    (summaryData.actualH1.toFixed(2) /
                      summaryData.targetH1.toFixed(2)) *
                    100
                  ).toFixed(2) === "Infinity"
                    ? 0
                    : (
                        (summaryData.actualH1 / summaryData.targetH1) *
                        100
                      ).toFixed(2)}
                </span>
              </div>
              <div className="border border-gray-300  flex justify-between items-center">
                <span className=" flex items-center  justify-center border-r border-gray-300 w-20">
                  {summaryData.budgetH2.toFixed(2)}
                </span>
                <span className=" flex items-center  justify-center border-r border-gray-300 w-20">
                  {summaryData.mTargetH2.toFixed(2)}
                </span>
                <span className=" flex items-center justify-center  border-r border-gray-300 w-20">
                  {summaryData.targetH2.toFixed(2)}
                </span>
                <span className=" flex items-center  justify-center border-r border-gray-300 w-20">
                  {summaryData.actualH2.toFixed(2)}
                </span>

                <span className=" flex items-center  justify-center border-r border-gray-300 w-20">
                  {(
                    (summaryData.actualH2 / summaryData.budgetH2) *
                    100
                  ).toFixed(2) === "NaN" ||
                  (
                    (summaryData.actualH2.toFixed(2) /
                      summaryData.budgetH2.toFixed(2)) *
                    100
                  ).toFixed(2) === "Infinity"
                    ? 0
                    : (
                        (summaryData.actualH2 / summaryData.budgetH2) *
                        100
                      ).toFixed(2)}
                </span>
                <span className=" flex items-center  justify-center border-r border-gray-300 w-20">
                  {(
                    (summaryData.actualH2 / summaryData.mTargetH2) *
                    100
                  ).toFixed(2) === "NaN" ||
                  (
                    (summaryData.actualH2 / summaryData.mTargetH2) *
                    100
                  ).toFixed(2) === "Infinity"
                    ? 0
                    : (
                        (summaryData.actualH2 / summaryData.mTargetH2) *
                        100
                      ).toFixed(2)}
                </span>
                <span className=" flex items-center  justify-center  border-gray-300 w-20">
                  {(
                    (summaryData.actualH2 / summaryData.targetH2) *
                    100
                  ).toFixed(2) === "NaN" ||
                  (
                    (summaryData.actualH2.toFixed(2) /
                      summaryData.targetH2.toFixed(2)) *
                    100
                  ).toFixed(2) === "Infinity"
                    ? 0
                    : (
                        (summaryData.actualH2 / summaryData.targetH2) *
                        100
                      ).toFixed(2)}
                </span>
              </div>
              <div className="border border-gray-300  flex justify-between items-center">
                <span className=" flex items-center justify-center border-r border-gray-300 w-20">
                  {summaryData.budgetCurrent.toFixed(2)}
                </span>
                <span className=" flex items-center  justify-center border-r border-gray-300 w-20">
                  {summaryData.mTargetCurrent.toFixed(2)}
                </span>
                <span className=" flex items-center  justify-center  border-r border-gray-300 w-20">
                  {summaryData.targetCurrent.toFixed(2)}
                </span>
                <span className=" flex items-center  justify-center border-r border-gray-300 w-20">
                  {summaryData.actualCurrent.toFixed(2)}
                </span>
                <span className=" flex items-center  justify-center border-r border-gray-300 w-20">
                  {(
                    (summaryData.actualCurrent / summaryData.budgetCurrent) *
                    100
                  ).toFixed(2) === "NaN" ||
                  (
                    (summaryData.actualCurrent / summaryData.budgetCurrent) *
                    100
                  ).toFixed(2) === "Infinity"
                    ? 0
                    : (
                        (summaryData.actualCurrent /
                          summaryData.budgetCurrent) *
                        100
                      ).toFixed(2)}
                </span>
                <span className=" flex items-center  justify-center border-r border-gray-300 w-20">
                  {(
                    (summaryData.actualCurrent / summaryData.mTargetCurrent) *
                    100
                  ).toFixed(2) === "NaN" ||
                  (
                    (summaryData.actualCurrent / summaryData.mTargetCurrent) *
                    100
                  ).toFixed(2) === "Infinity"
                    ? 0
                    : (
                        (summaryData.actualCurrent /
                          summaryData.mTargetCurrent) *
                        100
                      ).toFixed(2)}
                </span>
                <span className=" flex items-center  justify-center  border-gray-300 w-20">
                  {(
                    (summaryData.actualCurrent / summaryData.targetCurrent) *
                    100
                  ).toFixed(2) === "NaN" ||
                  (
                    (summaryData.actualCurrent.toFixed(2) /
                      summaryData.targetCurrent.toFixed(2)) *
                    100
                  ).toFixed(2) === "Infinity"
                    ? 0
                    : (
                        (summaryData.actualCurrent /
                          summaryData.targetCurrent) *
                        100
                      ).toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col overflow-auto text-xs px-4 lg:hidden ">
            <div className="grid grid-rows-4  text-sm ">
              <div className="border border-gray-300 py-1 flex px-2 items-center font-bold text-xs bg-gray-200 ">
                YTD
              </div>
              <div className="border border-gray-300 text-xs flex justify-between items-center">
                <span className=" flex items-center  justify-center  border-r border-gray-300 w-20">
                  Budget
                </span>
                <span className=" flex items-center  justify-center border-r border-gray-300 w-20">
                  MTarget
                </span>
                <span className=" flex items-center  justify-center  border-r border-gray-300 w-20">
                  RSP
                </span>
                <span className=" flex items-center  justify-center border-r border-gray-300 w-20">
                  Sale
                </span>

                <span className=" flex items-center  justify-center border-r border-gray-300 w-20">
                  B ach
                </span>
                <span className=" flex items-center justify-center   border-gray-300 w-20">
                  R ach
                </span>
                <span className=" flex items-center  justify-center border-r border-gray-300 w-20">
                  M ach
                </span>
              </div>
              <div className="border border-gray-300   text-xs flex justify-between items-center">
                <span className=" flex items-center  justify-center border-r border-gray-300 w-20">
                  {summaryData.budget.toFixed(2)}
                </span>
                <span className=" flex items-center  justify-center border-r border-gray-300 w-20">
                  {summaryData.mTarget.toFixed(2)}
                </span>
                <span className=" flex items-center  justify-center border-r border-gray-300 w-20">
                  {summaryData.target.toFixed(2)}
                </span>
                <span className=" flex items-center justify-center  border-r border-gray-300 w-20">
                  {summaryData.actual.toFixed(2)}
                </span>
                <span className=" flex items-center  justify-center border-r border-gray-300 w-20">
                  {((summaryData.actual / summaryData.budget) * 100).toFixed(
                    2
                  ) === "NaN" ||
                  (
                    (summaryData.actual.toFixed(2) /
                      summaryData.budget.toFixed(2)) *
                    100
                  ).toFixed(2) === "Infinity"
                    ? 0
                    : ((summaryData.actual / summaryData.budget) * 100).toFixed(
                        2
                      )}
                </span>
                <span className=" flex items-center  justify-center  border-gray-300 w-20">
                  {((summaryData.actual / summaryData.target) * 100).toFixed(
                    2
                  ) === "NaN" ||
                  (
                    (summaryData.actual.toFixed(2) /
                      summaryData.target.toFixed(2)) *
                    100
                  ).toFixed(2) === "Infinity"
                    ? 0
                    : ((summaryData.actual / summaryData.target) * 100).toFixed(
                        2
                      )}
                </span>
                <span className=" flex items-center  justify-center  border-gray-300 w-20">
                  {((summaryData.actual / summaryData.mTarget) * 100).toFixed(
                    2
                  ) === "NaN" ||
                  (
                    (summaryData.actual.toFixed(2) /
                      summaryData.target.toFixed(2)) *
                    100
                  ).toFixed(2) === "Infinity"
                    ? 0
                    : (
                        (summaryData.actual / summaryData.mTarget) *
                        100
                      ).toFixed(2)}
                </span>
              </div>

              <div className="border border-gray-300 py-1 text-xs flex  items-center font-bold px-2 text-xs bg-gray-200">
                Current Month-MTD
              </div>
              <div className="border border-gray-300 text-xs flex justify-between items-center">
                <span className=" flex items-center  justify-center  border-r border-gray-300 w-20">
                  Budget
                </span>
                <span className=" flex items-center  justify-center border-r border-gray-300 w-20">
                  MTarget
                </span>
                <span className=" flex items-center  justify-center  border-r border-gray-300 w-20">
                  RSP
                </span>
                <span className=" flex items-center  justify-center  border-r border-gray-300 w-20">
                  Sale
                </span>

                <span className=" flex items-center  justify-center border-r border-gray-300 w-20">
                  B ach
                </span>
                <span className=" flex items-center justify-center   border-gray-300 w-20">
                  R ach
                </span>
                <span className=" flex items-center  justify-center border-r border-gray-300 w-20">
                  M ach
                </span>
              </div>
              <div className="border border-gray-300 text-xs flex justify-between items-center">
                <span className=" flex items-center justify-center border-r border-gray-300 w-20">
                  {summaryData.budgetCurrent.toFixed(2)}
                </span>
                <span className=" flex items-center justify-center border-r border-gray-300 w-20">
                  {summaryData.mTargetCurrent.toFixed(2)}
                </span>
                <span className=" flex items-center  justify-center  border-r border-gray-300 w-20">
                  {summaryData.targetCurrent.toFixed(2)}
                </span>
                <span className=" flex items-center  justify-center border-r border-gray-300 w-20">
                  {summaryData.actualCurrent.toFixed(2)}
                </span>
                <span className=" flex items-center  justify-center border-r border-gray-300 w-20">
                  {(
                    (summaryData.actualCurrent / summaryData.budgetCurrent) *
                    100
                  ).toFixed(2) === "NaN" ||
                  (
                    (summaryData.actualCurrent / summaryData.budgetCurrent) *
                    100
                  ).toFixed(2) === "Infinity"
                    ? 0
                    : (
                        (summaryData.actualCurrent /
                          summaryData.budgetCurrent) *
                        100
                      ).toFixed(2)}
                </span>
                <span className=" flex items-center  justify-center  border-gray-300 w-20">
                  {(
                    (summaryData.actualCurrent / summaryData.targetCurrent) *
                    100
                  ).toFixed(2) === "NaN" ||
                  (
                    (summaryData.actualCurrent.toFixed(2) /
                      summaryData.targetCurrent.toFixed(2)) *
                    100
                  ).toFixed(2) === "Infinity"
                    ? 0
                    : (
                        (summaryData.actualCurrent /
                          summaryData.targetCurrent) *
                        100
                      ).toFixed(2)}
                </span>
                <span className=" flex items-center  justify-center  border-gray-300 w-20">
                  {(
                    (summaryData.actualCurrent / summaryData.mTargetCurrent) *
                    100
                  ).toFixed(2) === "NaN" ||
                  (
                    (summaryData.actualCurrent.toFixed(2) /
                      summaryData.mTargetCurrent.toFixed(2)) *
                    100
                  ).toFixed(2) === "Infinity"
                    ? 0
                    : (
                        (summaryData.actualCurrent /
                          summaryData.mTargetCurrent) *
                        100
                      ).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          {" "}
          <div className="flex flex-col w-full my-4 gap-2 px-4 lg:flex-row  justify-between lg:px-12">
            <h2 className="flex  font-bold text-xs">
              Total Summary Collection Plan (in Lac){" "}
            </h2>
            <div className="flex flex-row px-2 items-center gap-4 font-bold text-xs">
              <span>Target Ach </span>{" "}
              <span className="flex h-3 w-3 bg-red-500"></span>
              {"< = 50"}
              <span className="flex h-3 w-3 bg-blue-500"></span>
              {"51 to 74  %"}
              <span className="flex h-3 w-3 bg-orange-500"></span>
              {"75 to 90 %"}
              <span className="flex h-3 w-3 bg-green-500"></span>
              {" > 90 %"}
            </div>
          </div>
          <div className="hidden lg:flex flex-col mt-2 text-xsm px-12">
            <div className="grid grid-cols-4  text-sm ">
              <div className="border border-gray-300 py-1 flex justify-center items-center font-bold text-xs bg-gray-200 ">
                YTD
              </div>
              <div className="border border-gray-300 py-1 flex justify-center items-center font-bold text-xs bg-gray-200">
                H1 - (April - Sept)
              </div>
              <div className="border border-gray-300 py-1 flex justify-center items-center font-bold text-xs bg-gray-200">
                H2 - (Oct - March)
              </div>
              <div className="border border-gray-300 py-1 flex justify-center items-center font-bold text-xs bg-gray-200">
                Current Month-MTD
              </div>
            </div>

            <div className="grid grid-cols-4  text-sm  font-bold text-xs ">
              <div className="border border-gray-300  flex justify-between items-center">
                <span className=" flex items-center  justify-center  border-r border-gray-300 w-20">
                  C.Target
                </span>
                <span className=" flex items-center  justify-center  border-r border-gray-300 w-20">
                  M.Target
                </span>

                <span className=" flex items-center  justify-center border-r border-gray-300 w-20">
                  Actual
                </span>

                <span className=" flex items-center  justify-center border-r border-gray-300 w-20">
                  C.Ach%
                </span>
                <span className=" flex items-center justify-center   border-gray-300 w-20">
                  M.Ach %
                </span>
              </div>
              <div className="border border-gray-300  flex justify-between items-center">
                <span className=" flex items-center  justify-center  border-r border-gray-300 w-20">
                  C.Target
                </span>
                <span className=" flex items-center  justify-center  border-r border-gray-300 w-20">
                  M.Target
                </span>

                <span className=" flex items-center  justify-center border-r border-gray-300 w-20">
                  Actual
                </span>

                <span className=" flex items-center  justify-center border-r border-gray-300 w-20">
                  C.Ach%
                </span>
                <span className=" flex items-center justify-center   border-gray-300 w-20">
                  M.Ach %
                </span>
              </div>
              <div className="border border-gray-300  flex justify-between items-center">
                <span className=" flex items-center  justify-center  border-r border-gray-300 w-20">
                  C.Target
                </span>
                <span className=" flex items-center  justify-center  border-r border-gray-300 w-20">
                  M.Target
                </span>

                <span className=" flex items-center  justify-center border-r border-gray-300 w-20">
                  Actual
                </span>

                <span className=" flex items-center  justify-center border-r border-gray-300 w-20">
                  C.Ach%
                </span>
                <span className=" flex items-center justify-center   border-gray-300 w-20">
                  M.Ach %
                </span>
              </div>
              <div className="border border-gray-300 flex justify-between items-center">
                <span className="flex items-center  justify-center  border-r border-gray-300 w-20">
                  C.Target
                </span>
                <span className="flex items-center  justify-center  border-r border-gray-300 w-20">
                  M.Target
                </span>

                <span className="flex items-center  justify-center border-r border-gray-300 w-20">
                  Actual
                </span>
                <span className="flex items-center  justify-center border-r border-gray-300 w-20">
                  C.Ach%
                </span>
                <span className="flex items-center justify-center   border-gray-300 w-20">
                  M.Ach %
                </span>
              </div>
            </div>

            <div className="grid grid-cols-4  text-[12px] bg-white ">
              <div className="border border-gray-300  flex justify-between items-center">
                <span className=" flex items-center  justify-center border-r border-gray-300 w-20">
                  {collectionSummaryData.target.toFixed(2)}
                </span>
                <span className=" flex items-center  justify-center border-r border-gray-300 w-20">
                  {collectionSummaryData.mTarget.toFixed(2)}
                </span>

                <span className=" flex items-center justify-center  border-r border-gray-300 w-20">
                  {collectionSummaryData.actual.toFixed(2)}
                </span>

                <span className=" flex items-center justify-center  border-r border-gray-300 w-20">
                  {(
                    (collectionSummaryData.actual /
                      collectionSummaryData.target) *
                    100
                  ).toFixed(2) === "NaN" ||
                  (
                    (collectionSummaryData.actual.toFixed(2) /
                      collectionSummaryData.target.toFixed(2)) *
                    100
                  ).toFixed(2) === "Infinity"
                    ? 0
                    : (
                        (collectionSummaryData.actual /
                          collectionSummaryData.target) *
                        100
                      ).toFixed(2)}
                </span>
                <span className=" flex items-center  justify-center  border-gray-300 w-20">
                  {(
                    (collectionSummaryData.actual /
                      collectionSummaryData.mTarget) *
                    100
                  ).toFixed(2) === "NaN"
                    ? 0
                    : 0}
                </span>
              </div>
              <div className="border border-gray-300  flex justify-between items-center">
                <span className=" flex items-center justify-center  border-r border-gray-300 w-20">
                  {collectionSummaryData.targetH1.toFixed(2)}
                </span>
                <span className=" flex items-center  justify-center border-r border-gray-300 w-20">
                  {collectionSummaryData.mTargetH1.toFixed(2)}
                </span>

                <span className=" flex items-center  justify-center  border-r border-gray-300 w-20">
                  {collectionSummaryData.actualH1.toFixed(2)}
                </span>

                <span className=" flex items-center  justify-center  border-r border-gray-300 w-20">
                  {(
                    (collectionSummaryData.actualH1 /
                      collectionSummaryData.targetH1) *
                    100
                  ).toFixed(2) === "NaN" ||
                  (
                    (collectionSummaryData.actualH1.toFixed(2) /
                      collectionSummaryData.targetH1.toFixed(2)) *
                    100
                  ).toFixed(2) === "Infinity"
                    ? 0
                    : (
                        (collectionSummaryData.actualH1 /
                          collectionSummaryData.targetH1) *
                        100
                      ).toFixed(2)}
                </span>
                <span className=" flex items-center  justify-center  border-gray-300 w-20">
                  {(
                    (collectionSummaryData.actualH1 /
                      collectionSummaryData.mTargetH1) *
                    100
                  ).toFixed(2) === "NaN" ||
                  (
                    (collectionSummaryData.actualH1 /
                      collectionSummaryData.mTargetH1) *
                    100
                  ).toFixed(2) === "Infinity"
                    ? 0
                    : (
                        (collectionSummaryData.actualH1 /
                          collectionSummaryData.mTargetH1) *
                        100
                      ).toFixed(2)}
                </span>
              </div>
              <div className="border border-gray-300  flex justify-between items-center">
                <span className=" flex items-center justify-center  border-r border-gray-300 w-20">
                  {collectionSummaryData.targetH2.toFixed(2)}
                </span>
                <span className=" flex items-center  justify-center border-r border-gray-300 w-20">
                  {collectionSummaryData.mTargetH2.toFixed(2)}
                </span>

                <span className=" flex items-center  justify-center border-r border-gray-300 w-20">
                  {collectionSummaryData.actualH2.toFixed(2)}
                </span>

                <span className=" flex items-center  justify-center border-r border-gray-300 w-20">
                  {(
                    (collectionSummaryData.actualH2 /
                      collectionSummaryData.targetH2) *
                    100
                  ).toFixed(2) === "NaN" ||
                  (
                    (collectionSummaryData.actualH2.toFixed(2) /
                      collectionSummaryData.targetH2.toFixed(2)) *
                    100
                  ).toFixed(2) === "Infinity"
                    ? 0
                    : (
                        (collectionSummaryData.actualH2 /
                          collectionSummaryData.targetH2) *
                        100
                      ).toFixed(2)}
                </span>
                <span className=" flex items-center  justify-center  border-gray-300 w-20">
                  {(
                    (collectionSummaryData.actualH2 /
                      collectionSummaryData.mTargetH2) *
                    100
                  ).toFixed(2) === "NaN" ||
                  (
                    (collectionSummaryData.actualH2 /
                      collectionSummaryData.mTargetH2) *
                    100
                  ).toFixed(2) === "Infinity"
                    ? 0
                    : (
                        (collectionSummaryData.actualH2 /
                          collectionSummaryData.mTargetH2) *
                        100
                      ).toFixed(2)}
                </span>
              </div>
              <div className="border border-gray-300  flex justify-between items-center ">
                <span className=" flex items-center  justify-center  border-r border-gray-300 w-20">
                  {collectionSummaryData.targetCurrent.toFixed(2)}
                </span>
                <span className=" flex items-center  justify-center border-r border-gray-300 w-20">
                  {collectionSummaryData.mTargetCurrent.toFixed(2)}
                </span>

                <span className=" flex items-center  justify-center border-r border-gray-300 w-20">
                  {collectionSummaryData.actualCurrent.toFixed(2)}
                </span>
                <span className=" flex items-center  justify-center border-r border-gray-300 w-20">
                  {(
                    (collectionSummaryData.actualCurrent /
                      collectionSummaryData.targetCurrent) *
                    100
                  ).toFixed(2) === "NaN" ||
                  (
                    (collectionSummaryData.actualCurrent.toFixed(2) /
                      collectionSummaryData.targetCurrent.toFixed(2)) *
                    100
                  ).toFixed(2) === "Infinity"
                    ? 0
                    : (
                        (collectionSummaryData.actualCurrent /
                          collectionSummaryData.targetCurrent) *
                        100
                      ).toFixed(2)}
                </span>
                <span className=" flex items-center  justify-center  border-gray-300 w-20">
                  {(
                    (collectionSummaryData.actualCurrent /
                      collectionSummaryData.mTargetCurrent) *
                    100
                  ).toFixed(2) === "NaN" ||
                  (
                    (collectionSummaryData.actualCurrent /
                      collectionSummaryData.mTargetCurrent) *
                    100
                  ).toFixed(2) === "Infinity"
                    ? 0
                    : (
                        (collectionSummaryData.actualCurrent /
                          collectionSummaryData.mTargetCurrent) *
                        100
                      ).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col overflow-auto text-xs lg:hidden ">
            <div className="grid grid-rows-4  text-sm ">
              <div className="border border-gray-300 py-1 flex px-2 items-center font-bold text-xs bg-gray-200 ">
                YTD
              </div>
              <div className="border border-gray-300 text-xs flex justify-between items-center">
                <span className=" flex items-center  justify-center  border-r border-gray-300 w-20">
                  Target
                </span>
                <span className=" flex items-center  justify-center  border-r border-gray-300 w-20">
                  M.Target
                </span>
                <span className=" flex items-center  justify-center border-r border-gray-300 w-20">
                  Actual
                </span>

                <span className=" flex items-center justify-center   border-gray-300 w-20">
                  Ach%
                </span>
                <span className=" flex items-center justify-center   border-gray-300 w-20">
                  M.Ach%
                </span>
              </div>
              <div className="border border-gray-300   text-xs flex justify-between items-center">
                <span className=" flex items-center  justify-center border-r border-gray-300 w-20">
                  {collectionSummaryData.target.toFixed(2)}
                </span>
                <span className=" flex items-center  justify-center border-r border-gray-300 w-20">
                  {collectionSummaryData.mTarget.toFixed(2)}
                </span>
                <span className=" flex items-center justify-center  border-r border-gray-300 w-20">
                  {collectionSummaryData.actual.toFixed(2)}
                </span>

                <span className=" flex items-center  justify-center  border-gray-300 w-20">
                  {(
                    (collectionSummaryData.actual /
                      collectionSummaryData.target) *
                    100
                  ).toFixed(2) === "NaN" ||
                  (
                    (collectionSummaryData.actual.toFixed(2) /
                      collectionSummaryData.target.toFixed(2)) *
                    100
                  ).toFixed(2) === "Infinity"
                    ? 0
                    : (
                        (collectionSummaryData.actual /
                          collectionSummaryData.target) *
                        100
                      ).toFixed(2)}
                </span>
                <span className=" flex items-center  justify-center  border-gray-300 w-20">
                  {(
                    (collectionSummaryData.actual /
                      collectionSummaryData.mTarget) *
                    100
                  ).toFixed(2) === "NaN" ||
                  (
                    (collectionSummaryData.actual.toFixed(2) /
                      collectionSummaryData.mTarget.toFixed(2)) *
                    100
                  ).toFixed(2) === "Infinity"
                    ? 0
                    : (
                        (collectionSummaryData.actual /
                          collectionSummaryData.mTarget) *
                        100
                      ).toFixed(2)}
                </span>
              </div>

              {/* <div className="border border-gray-300 py-1 px-2  text-xs flex  items-center font-bold text-xs bg-gray-200">
                  H1 - (April - Sept)
                </div>
                <div className="border border-gray-300 text-xs flex justify-between items-center">
                  <span className=" flex items-center  justify-center  border-r border-gray-300 w-20">
                    Budget
                  </span>
                  <span className=" flex items-center  justify-center  border-r border-gray-300 w-20">
                    RSP
                  </span>
                  <span className=" flex items-center  justify-center border-r border-gray-300 w-20">
                    Sale
                  </span>
                  <span className=" flex items-center  justify-center border-r border-gray-300 w-20">
                    B ach
                  </span>
                  <span className=" flex items-center justify-center   border-gray-300 w-20">
                    R ach
                  </span>
                </div>
                <div className="border border-gray-300  text-xs flex justify-between items-center ">
                  <span className=" flex items-center  justify-center border-r border-gray-300 w-20">
                    {collectionSummaryData.budgetH1.toFixed(2)}
                  </span>
                  <span className=" flex items-center justify-center  border-r border-gray-300 w-20">
                    {collectionSummaryData.targetH1.toFixed(2)}
                  </span>
                  <span className=" flex items-center  justify-center  border-r border-gray-300 w-20">
                    {collectionSummaryData.actualH1.toFixed(2)}
                  </span>

                  <span className=" flex items-center  justify-center border-r border-gray-300 w-20">
                    {(
                      (collectionSummaryData.actualH1 /
                        collectionSummaryData.budgetH1) *
                      100
                    ).toFixed(2) === "NaN" ||
                    (
                      (collectionSummaryData.actualH1.toFixed(2) /
                        collectionSummaryData.budgetH1.toFixed(2)) *
                      100
                    ).toFixed(2) === "Infinity"
                      ? 0
                      : (
                          (collectionSummaryData.actualH1 /
                            collectionSummaryData.budgetH1) *
                          100
                        ).toFixed(2)}
                  </span>
                  <span className=" flex items-center  justify-center  border-gray-300 w-20">
                    {(
                      (collectionSummaryData.actualH1 /
                        collectionSummaryData.targetH1) *
                      100
                    ).toFixed(2) === "NaN" ||
                    (
                      (collectionSummaryData.actualH1.toFixed(2) /
                        collectionSummaryData.targetH1.toFixed(2)) *
                      100
                    ).toFixed(2) === "Infinity"
                      ? 0
                      : (
                          (collectionSummaryData.actualH1 /
                            collectionSummaryData.targetH1) *
                          100
                        ).toFixed(2)}
                  </span>
                </div>

                <div className="border border-gray-300 py-1 text-xs flex px-2 items-center font-bold text-xs bg-gray-200">
                  H2 - (Oct - March)
                </div>
                <div className="border border-gray-300 text-xs flex justify-between items-center">
                  <span className=" flex items-center  justify-center  border-r border-gray-300 w-20">
                    Budget
                  </span>
                  <span className=" flex items-center  justify-center  border-r border-gray-300 w-20">
                    RSP
                  </span>
                  <span className=" flex items-center  justify-center border-r border-gray-300 w-20">
                    Sale
                  </span>
                  <span className=" flex items-center  justify-center border-r border-gray-300 w-20">
                    B ach
                  </span>
                  <span className=" flex items-center justify-center   border-gray-300 w-20">
                    R ach
                  </span>
                </div>
                <div className="border border-gray-300 text-xs flex justify-between items-center">
                  <span className=" flex items-center  justify-center border-r border-gray-300 w-20">
                    {collectionSummaryData.budgetH2.toFixed(2)}
                  </span>
                  <span className=" flex items-center justify-center  border-r border-gray-300 w-20">
                    {collectionSummaryData.targetH2.toFixed(2)}
                  </span>
                  <span className=" flex items-center  justify-center border-r border-gray-300 w-20">
                    {collectionSummaryData.actualH2.toFixed(2)}
                  </span>

                  <span className=" flex items-center  justify-center border-r border-gray-300 w-20">
                    {(
                      (collectionSummaryData.actualH2 /
                        collectionSummaryData.budgetH2) *
                      100
                    ).toFixed(2) === "NaN" ||
                    (
                      (collectionSummaryData.actualH2.toFixed(2) /
                        collectionSummaryData.budgetH2.toFixed(2)) *
                      100
                    ).toFixed(2) === "Infinity"
                      ? 0
                      : (
                          (collectionSummaryData.actualH2 /
                            collectionSummaryData.budgetH2) *
                          100
                        ).toFixed(2)}
                  </span>
                  <span className=" flex items-center  justify-center  border-gray-300 w-20">
                    {(
                      (collectionSummaryData.actualH2 /
                        collectionSummaryData.targetH2) *
                      100
                    ).toFixed(2) === "NaN" ||
                    (
                      (collectionSummaryData.actualH2.toFixed(2) /
                        collectionSummaryData.targetH2.toFixed(2)) *
                      100
                    ).toFixed(2) === "Infinity"
                      ? 0
                      : (
                          (collectionSummaryData.actualH2 /
                            collectionSummaryData.targetH2) *
                          100
                        ).toFixed(2)}
                  </span>
                </div> */}
              <div className="border border-gray-300 py-1 text-xs flex  items-center font-bold px-2 text-xs bg-gray-200">
                Current Month-MTD
              </div>

              <div className="border border-gray-300 text-xs flex justify-between items-center">
                <span className=" flex items-center  justify-center  border-r border-gray-300 w-20">
                  Target
                </span>
                <span className=" flex items-center  justify-center  border-r border-gray-300 w-20">
                  M.Target
                </span>
                <span className=" flex items-center  justify-center border-r border-gray-300 w-20">
                  Actual
                </span>

                <span className=" flex items-center justify-center   border-gray-300 w-20">
                  Ach%
                </span>
                <span className=" flex items-center justify-center   border-gray-300 w-20">
                  M.Ach%
                </span>
              </div>
              <div className="border border-gray-300 text-xs flex justify-between items-center">
                <span className=" flex items-center  justify-center  border-r border-gray-300 w-20">
                  {collectionSummaryData.targetCurrent.toFixed(2)}
                </span>
                <span className=" flex items-center  justify-center  border-r border-gray-300 w-20">
                  {collectionSummaryData.mTargetCurrent.toFixed(2)}
                </span>
                <span className=" flex items-center  justify-center border-r border-gray-300 w-20">
                  {collectionSummaryData.actualCurrent.toFixed(2)}
                </span>

                <span className=" flex items-center  justify-center  border-gray-300 w-20">
                  {(
                    (collectionSummaryData.actualCurrent /
                      collectionSummaryData.targetCurrent) *
                    100
                  ).toFixed(2) === "NaN" ||
                  (
                    (collectionSummaryData.actualCurrent.toFixed(2) /
                      collectionSummaryData.targetCurrent.toFixed(2)) *
                    100
                  ).toFixed(2) === "Infinity"
                    ? 0
                    : (
                        (collectionSummaryData.actualCurrent /
                          collectionSummaryData.targetCurrent) *
                        100
                      ).toFixed(2)}
                </span>
                <span className=" flex items-center  justify-center  border-gray-300 w-20">
                  {(
                    (collectionSummaryData.actualCurrent /
                      collectionSummaryData.mTargetCurrent) *
                    100
                  ).toFixed(2) === "NaN" ||
                  (
                    (collectionSummaryData.actualCurrent.toFixed(2) /
                      collectionSummaryData.mTargetCurrent.toFixed(2)) *
                    100
                  ).toFixed(2) === "Infinity"
                    ? 0
                    : (
                        (collectionSummaryData.actualCurrent /
                          collectionSummaryData.mTargetCurrent) *
                        100
                      ).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </div>
  );
}

export default SummmaryTable;
