import React from "react";
import Navbar from "../components/Navbar";
import myFarm from "../image/my_farm.png";
import {
  AreaChart,
  CalendarDays,
  IndianRupeeIcon,
  LeafyGreen,
  LucideChartNoAxesColumnIncreasing,
  NotebookText,
  PlusSquareIcon,
  SquareChevronRightIcon,
} from "lucide-react";

export default function MyFarm() {
  return (
    <>
      <div className="relative">
        <div className="fixed top-0 w-screen z-40">
          <Navbar />
        </div>
        <header>
          <div className="h-[20vh]  md:h-[40vh] w-full -z-20 overflow-hidden">
            <img
              src={myFarm}
              alt="Home Image"
              className="block object-cover h-full w-full"
            />
            <div className="absolute top-2 left-4 md:left-16 h-[200px] w-[230px] md:h-[260px] md:w-[400px] bg-white blur-xl md:blur-2xl z-0"></div>
          </div>
          <div className="absolute top-20 md:top-24 left-14 md:left-24 z-10">
            <h2 className="text-[20px] md:text-[40px] font-bold">My Farm</h2>
            <p className="text-[14px]">
              Manage your crps, track progress , and keep
              <br /> your farm records in one place.
            </p>
          </div>
        </header>
        <main className="my-8 px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-1 md:gap-2">
            <div className="flex flex-col items-center gap-1 py-2 bg-green-200 rounded-md">
              <LeafyGreen fill="green" color="green" />
              <p className="font-bold text-[18px]">4</p>
              <h5 className="font-bold text-[var(--primary)]">Total Crops</h5>
            </div>
            <div className="flex flex-col items-center gap-1 py-2 bg-blue-200 rounded-md">
              <NotebookText color="black" />
              <p className="font-bold text-[18px]">12</p>
              <h5 className="font-bold ">Total Tasks</h5>
            </div>
            <div className="flex flex-col items-center gap-1 py-2 bg-yellow-200 rounded-md">
              <IndianRupeeIcon />
              <p className="font-bold text-[18px]">4</p>
              <h5 className="font-bold ">Total Expenses</h5>
            </div>
            <div className="flex flex-col items-center gap-1 py-2 bg-purple-200 rounded-md">
              <LucideChartNoAxesColumnIncreasing color="green" />
              <p className="font-bold text-[18px]">
                4<span>%</span>
              </p>
              <h5 className="font-bold ">Overall Progress</h5>
            </div>
          </div>
          <div className="my-10 px-2">
            <div className="flex justify-between">
              <h2 className="text-[20px] font-semibold">My Crops</h2>
              <div className="flex gap-2 items-center text-[14px] bg-[var(--primary)] hover:bg-[var(--secondary)] text-white p-2 rounded-md cursor-pointer">
                <PlusSquareIcon size={20} />
                <p>Add Crop</p>
              </div>
            </div>
            <div className="my-4">
              <div className="relative bg-white shadow-md shadow-black p-4 my-4">
                <span className="absolute cursor-pointer right-2">
                  <SquareChevronRightIcon className="hover:text-green-500" />
                </span>
                <div className="grid grid-cols-2 gap-1 md:w-[50%] text-[14px]">
                  <span className="text-[16px] font-semibold">
                    Rice Farming
                  </span>
                  <div>
                    <span
                      className={`px-2 py-1 bg-green-200 rounded-md text-green-900`}
                    >
                      In progress
                    </span>
                  </div>
                  <div className="flex gap-1">
                    <AreaChart size={20} color="green" />
                    <p>5.0 Acres</p>
                  </div>
                  <div className="flex gap-1 items-center">
                    <CalendarDays size={20} color="green" />
                    <p>10-11-2026</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="bg-gray-200 h-2 my-2 w-[95%] rounded-full">
                    <div
                      className="bg-green-600 h-2 rounded-full"
                      style={{ width: `60%` }}
                    ></div>
                  </div>
                  <div className="font-semibold">
                    60<span>%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
