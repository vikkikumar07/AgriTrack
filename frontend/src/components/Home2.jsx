import React from "react";
import FooterComponent from "./FooterComponent";
import homePage from "../image/home_page_2.png";
import {
  ArrowRight,
  CloudSun,
  LeafyGreen,
  LucideStickyNoteCheck,
  NotebookPen,
  Sun,
  TreePalm,
} from "lucide-react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Home2() {
  let user = useSelector((state) => state.user.user);
  return (
    <>
      <div className="relative w-screen bg-[var(--body)] ">
        <main className="mb-10">
          <div className="relative h-[300px] w-full">
            <div className=" h-[50vh]  md:h-[60vh] w-full -z-20 overflow-hidden border rounded-lg">
              <img
                src={homePage}
                alt="Home Image"
                className="block object-cover h-full w-full"
              />
              <div className="absolute top-2 left-4 md:left-16 h-[200px] w-[300px] md:h-[300px] md:w-[300px] bg-white blur-xl md:blur-2xl z-0"></div>
            </div>
            <div className="absolute top-10 md:top-20 left-16 md:left-40 text-left ">
              <h2 className="font-bold text-[20px]">Good Morning,</h2>
              <h2 className="flex gap-1 font-bold text-[30px] items-center">
                {user?.fullName}!
                <Sun className="" fill="yellow" color="yellow" />
              </h2>
              <p className="my-2 text-[14px]">
                Let's grow a better tomorrow with AgriTrack.
              </p>
              <div className="flex gap-4 my-8 items-center bg-green-400 px-4 py-2 rounded-md shadow-md">
                <LeafyGreen className="" fill="green" color="green" />
                <div>
                  <p className="text-[14px]">
                    Healthy crops today, <br /> a brighter tomorrow.{" "}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 z-10 my-6 md:my-10 w-[80%] mx-auto">
              <div className="flex gap-4 items-center bg-white shadow-xl rounded-md px-4 py-2">
                <div className=" bg-green-300 p-2 rounded-md">
                  <TreePalm />
                </div>
                <div>
                  <h4 className="font-semibold text-[14px] text-[var(--mute)]">
                    Total Crops
                  </h4>
                  <p className="text-[20px] font-bold">5</p>
                  <Link
                    to={`/myfarm/${user._id}`}
                    className="flex gap-1 items-center text-[var(--primary)] text-[14px]"
                  >
                    View My Crop <ArrowRight size={15} />
                  </Link>
                </div>
              </div>
              <div className="flex gap-4 items-center bg-white shadow-xl rounded-md px-4 py-2">
                <div className=" bg-yellow-400 p-2 rounded-md">
                  <LucideStickyNoteCheck />
                </div>
                <div>
                  <h4 className="font-semibold text-[14px] text-[var(--mute)]">
                    Pending Tasks
                  </h4>
                  <p className="text-[20px] font-bold">3</p>
                  <div className="flex gap-2 text-[var(--mute)] text-[12px]">
                    <p>Total 2</p> <p>completed 3</p>
                  </div>
                  <Link
                    to={`/tasks/${user._id}`}
                    className="flex gap-1 items-center text-[var(--primary)] text-[14px]"
                  >
                    View Tasks <ArrowRight size={15} />
                  </Link>
                </div>
              </div>
              <div className="flex gap-4 items-center bg-white shadow-xl rounded-md px-4 py-2">
                <div className=" bg-sky-300 p-2 rounded-md">
                  <NotebookPen />
                </div>
                <div>
                  <h4 className="font-semibold text-[14px] text-[var(--mute)]">
                    Total Expenses
                  </h4>
                  <p className="text-[20px] font-bold">12</p>
                  <Link
                    to={`/expenses/${user._id}`}
                    className="flex gap-1 items-center text-[var(--primary)] text-[14px]"
                  >
                    View Expenses <ArrowRight size={15} />
                  </Link>
                </div>
              </div>
              <div className="flex gap-4 items-center bg-white shadow-xl rounded-md px-4 py-2">
                <div className=" bg-sky-400 p-2 rounded-md">
                  <CloudSun />
                </div>
                <div>
                  <h4 className="font-semibold text-[14px] text-[var(--mute)]">
                    Today's Weather
                  </h4>
                  <p className="text-[20px] font-bold">
                    28<sup>o</sup> C
                  </p>
                  <p className="flex gap-1 items-center text-[var(--primary)] text-[14px]">
                    Partly cloudy
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="my-18">
            <div className=" w-[95%] md:max-w-6xl mx-auto pt-6">
              <h2 className="text-[25px] font-semibold text-center text-[var(--primary)]">
                Letest Records
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-10">
                <div className="shadow-sm shadow-black h-[400px]">
                  <h2 className="text-center my-4 font-semibold text-[20px]">
                    Task
                  </h2>
                </div>
                <div className="shadow-sm shadow-black h-[400px]">
                  <h2 className="text-center my-4 font-semibold text-[20px]">
                    Expenses
                  </h2>
                </div>
                <div className="shadow-sm shadow-black h-[400px]">
                  <h2 className="text-center my-4 font-semibold text-[20px]">
                    Harvest & Sales
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </main>
        <FooterComponent />
      </div>
    </>
  );
}
