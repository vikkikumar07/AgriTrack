import React from "react";
import Navbar from "../components/Navbar";

export default function Expenses() {
  let goToPrevPage = () => {};
  return (
    <>
      <div>
        <div className="fixed top-0 w-screen z-40">
          <Navbar />
        </div>
        <div className="my-20">
          <div className="my-10">
            <div className="relative">
              <h1 className="text-center text-[30px] font-bold">
                <span className="text-[var(--primary)]">Farming</span> Expenses
              </h1>
            </div>
          </div>
          <div className="px-4 grid grid-cols-2 md:grid-cols-4 gap-1 md:gap-2">
            <div className="flex flex-col items-center gap-1 py-2 bg-green-200 rounded-md">
              <p className="font-bold text-[18px]">0</p>
              <h5 className="font-bold text-[var(--primary)]">
                Total Expenses
              </h5>
            </div>
            <div className="flex flex-col items-center gap-1 py-2 bg-blue-200 rounded-md">
              <p className="font-bold text-[18px]">0</p>
              <h5 className="font-bold ">Total Pending Tasks</h5>
            </div>
            <div className="flex flex-col items-center gap-1 py-2 bg-yellow-200 rounded-md">
              <p className="font-bold text-[18px]"> Acres</p>
              <h5 className="font-bold ">Total Area</h5>
            </div>
            <div className="flex flex-col items-center gap-1 py-2 bg-purple-200 rounded-md">
              <p className="font-bold text-[18px]">
                <span>%</span>
              </p>
              <h5 className="font-bold ">Overall Progress</h5>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
