import React from "react";
import homePage2 from "../image/home_page_2.png";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  AstroidIcon,
  Leaf,
  Network,
  NotebookText,
  UserPlus,
  Users,
} from "lucide-react";
import FooterComponent from "./FooterComponent";

export default function Home1() {
  return (
    <>
      <div className="relative overflow-x-clip w-full">
        <div className="h-[70vh]  md:h-[92vh] w-full -z-20 overflow-hidden">
          <img
            src={homePage2}
            alt="Home Image"
            className="block object-cover h-full w-full"
          />
        </div>
        <div className="absolute top-0 w-full grid grid-cols-1 md:grid-cols-2">
          <div className="m-10 relative">
            <div className="absolute h-[200px] w-[300px] md:h-[300px] md:w-[300px] bg-white blur-xl md:blur-2xl z-0"></div>
            <div className="absolute z-10">
              <p className="text-[12px] font-semibold text-[var(--primary)]">
                SMART FARM MANAGEMENT PLATFORM
              </p>
              <div className="my-1 md:my-2">
                <span className="text-[25px] md:text-[40px] font-bold">
                  Grow Smarter <br /> with
                </span>
                <span className="text-[25px] md:text-[40px] font-bold mx-2 text-[var(--primary)]">
                  AgriTrack
                </span>
              </div>
              <p className="text-[14px] font-semibold my-4 md:my-1">
                Plan, track, and manage your farm with real-time insights,{" "}
                <br />
                expert advice, and data-driven decisions for a better tomorrow.
              </p>
              <div className="my-4">
                <Link to={"/signup"}>
                  <button className="btn md:h-10 bg-[var(--primary)] hover:bg-[var(--secondary)] text-white w-[50%] flex gap-2 justify-center">
                    Get Started
                    <ArrowRight size={15} />
                  </button>
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4 my-2">
                <div className="flex gap-2  flex-wrap md:justify-center box box1">
                  <Leaf fill="green" color="green" />
                  <p className="md:text-center">Crop Management</p>
                </div>
                <div className="flex gap-2  flex-wrap md:justify-center box box2">
                  <AstroidIcon fill="blue" color="blue" />
                  <p className="md:text-center">Ai Helps & Suggestion</p>
                </div>
                <div className="flex gap-2  flex-wrap md:justify-center box box3">
                  <Network color="black" />
                  <p className="md:text-center">Expense & Profit Trackin</p>
                </div>
                <div className="flex gap-2 flex-wrap md:justify-center box box4">
                  <Users color="black" />
                  <p className="md:text-center">Expert Guidance</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="my-8">
          <div>
            <h2 className="text-[30px] font-bold text-center text-black">
              Key Features
            </h2>
            <p className="text-center text-[14px] text-[var(--mute)]">
              Everything you need to manage your farm in one place
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mx-4 my-6">
            <div className="border shadow-lg h-[210px]">
              <h3 className="text-center font-semibold my-2">
                Ai Crop Planner Workflow
              </h3>
              <div className="ml-5">
                <ul>
                  <li className="list-disc px-2">
                    Farmer enters crop, planting date, field area, soil type,
                    irrigation method, and variety.
                  </li>
                  <li className="list-disc px-2">
                    AI creates a schedule from sowing to harvesting. It gives
                    water and fertilizer guidance.
                  </li>
                  <li className="list-disc px-2">
                    Tasks are saved and shown on the farmer dashboard. Farmers
                    should verify AI advice with local farming experts
                  </li>
                </ul>
              </div>
            </div>
            <div className="border shadow-lg h-[210px]">
              <h3 className="text-center font-semibold my-2">
                Task & Schedule Management
              </h3>
              <div className="ml-5">
                <ul>
                  <li className="list-disc px-2">
                    Each task stores title, due date, quantity, description, and
                    status.
                  </li>
                  <li className="list-disc px-2">
                    Farmers can complete or reschedule tasks. Backend validates
                    task data and prevents duplicates.
                  </li>
                  <li className="list-disc px-2">
                    Dashboard shows pending, upcoming, and overdue tasks.
                  </li>
                </ul>
              </div>
            </div>
            <div className="border shadow-lg h-[210px]">
              <h3 className="text-center font-semibold my-2">
                Harvest & Expenses Tracking
              </h3>
              <div className="ml-5">
                <ul>
                  <li className="list-disc px-2">
                    Farmers record crop, field, harvest date, quantity, unit,
                    and quality.
                  </li>
                  <li className="list-disc px-2">
                    Sales records store selling price, buyer, and revenue.
                    Expenses include seeds, fertilizer, chemicals, labour,
                    irrigation, and equipment.
                  </li>
                  <li className="list-disc px-2">
                    Profit = Total Revenue − Total Expenses.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="h-[60vh] w-full my-10">
          <div className="my-2">
            <h2 className="text-[30px] font-bold text-center text-black">
              How AgriTrack Works
            </h2>
            <p className="text-center text-[14px] text-[var(--mute)]">
              Simple steps to smarter farming
            </p>
          </div>
          <div className="flex gap-2 p-10 flex-wrap justify-center ">
            <div className="flex gap-2 flex-wrap">
              <div className="pr-2">
                <span className="px-2 bg-green-500 py-1 rounded-full text-white">
                  1
                </span>
              </div>
              <div>
                <UserPlus color="#077324" />
                <h4 className="font-semibold">Create Account</h4>
                <p className="text-[14px]">Sign up and jion AgriTrack</p>
              </div>
              <ArrowRight size={20} color="#077324" className="mx-1" />
            </div>
            <div className="flex gap-2 flex-wrap">
              <div className="pr-2">
                <span className="px-2 bg-green-500 py-1 rounded-full text-white">
                  2
                </span>
              </div>
              <div>
                <Leaf color="#077324" />
                <h4 className="font-semibold">Add your Farm</h4>
                <p className="text-[14px]">Add your crops and farm details</p>
              </div>
              <ArrowRight size={20} color="#077324" className="mx-1" />
            </div>
            <div className="flex gap-2 flex-wrap">
              <div className="pr-2">
                <span className="px-2 bg-green-500 py-1 rounded-full text-white">
                  3
                </span>
              </div>
              <div>
                <NotebookText color="#077324" />
                <h4 className="font-semibold">Track & Manage</h4>
                <p className="text-[14px]">
                  Get insights and manage activities
                </p>
              </div>
              <ArrowRight size={20} color="#077324" className="mx-1" />
            </div>
            <div className="flex gap-2 flex-wrap">
              <div className="pr-2">
                <span className="px-2 bg-green-500 py-1 rounded-full text-white">
                  4
                </span>
              </div>
              <div>
                <UserPlus color="#077324" />
                <h4 className="font-semibold">Grow Better</h4>
                <p className="text-[14px]">
                  Make data-driven decisions and <br /> increase profit
                </p>
              </div>
            </div>
          </div>
        </div>
        <FooterComponent />
      </div>
    </>
  );
}
