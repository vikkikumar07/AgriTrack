import React from "react";
import Navbar from "../components/Navbar";
import aboutImage from "../image/aboutImage.png";
import {
  ArrowRight,
  Eye,
  Leaf,
  Notebook,
  NotebookPen,
  Target,
  Trees,
  TrendingUp,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function AboutPage() {
  return (
    <div>
      <div className="fixed top-0 w-screen z-40">
        <Navbar />
      </div>
      <header className="mt-16">
        <div className="h-[20vh]  md:h-[40vh] w-full -z-20 overflow-hidden">
          <img
            src={aboutImage}
            alt="about"
            className="block object-cover h-full w-full"
          />
          <div className="absolute top-4 left-4 md:left-16 h-[200px] w-[230px] md:h-[260px] md:w-[400px] bg-white blur-xl md:blur-2xl z-0"></div>
        </div>
        <div className="absolute top-20 md:top-24 left-14 md:left-24 z-10">
          <h2 className="text-[20px] md:text-[40px] font-bold">
            Empowering Farmers
          </h2>
          <h2 className="text-[20px] md:text-[40px] font-bold">
            With <span className="text-[var(--primary)]">Smart Technology</span>
          </h2>

          <p className="text-[14px] w-[60%]">
            AgriTrack is a modern platform designed to help farmers manage their
            farm easliy, plan better and grow more.
          </p>
        </div>
      </header>
      <main className="bg-gray-50 p-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 m-10">
          <div className="bg-white flex gap-2 shadow-md p-4 rounded-md shadow-[var(--color-1)]">
            <div className="flex items-center justify-cente">
              <div className="bg-green-200  rounded-full p-2">
                <Target size={40} />
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-[var(--primary)] text-[20px]">
                Our Mission
              </h3>
              <p className="text-[14px] w-[80%]">
                To support farmers with smart tools and AI-powered solutions for
                higher productivity and better income
              </p>
            </div>
          </div>
          <div className="bg-white flex gap-2 shadow-md p-4 rounded-md shadow-[var(--color-1)]">
            <div className=" flex items-center justify-cente">
              <div className="bg-green-200  rounded-full p-2">
                <Eye size={40} />
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-[var(--primary)] text-[20px]">
                Our Vision
              </h3>
              <p className="text-[14px] w-[80%]">
                A digitally empowered farming community for a sustainable and
                prosperous future.
              </p>
            </div>
          </div>
        </div>
        <div className="my-4">
          <h2 className="font-bold my-4 text-[30px] text-center">
            Why Choose <span className="text-[var(--primary)]">AgriTrack?</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mx-5 md:mx-10">
            <div className="flex flex-col items-center bg-green-100 p-2 rounded-md border border-green-300">
              <Leaf size={30} color="green" />
              <h4 className="font-semibold">Smart Crop planner</h4>
              <p>Plan taks automatically</p>
            </div>
            <div className="flex flex-col items-center bg-green-100 p-2 rounded-md border border-green-300">
              <NotebookPen size={30} color="green" />
              <h4 className="font-semibold">Track Your Farm</h4>
              <p>Manage tasks & records</p>
            </div>
            <div className="flex flex-col items-center bg-green-100 p-2 rounded-md border border-green-300">
              <Notebook size={30} color="green" />
              <h4 className="font-semibold">Manage Expenses</h4>
              <p>keep financial records</p>
            </div>
            <div className="flex flex-col items-center bg-green-100 p-2 rounded-md border border-green-300">
              <TrendingUp size={30} color="green" />
              <h4 className="font-semibold">Get Better Yield</h4>
              <p>Grow more, earn more</p>
            </div>
          </div>
        </div>
        <div className="my-8 mx-6 flex flex-wrap items-center gap-4 p-4 border border-green-300 rounded-md">
          <div className="bg-green-200 p-4 rounded-md">
            <Trees color="green" size={30} />
          </div>
          <div className="w-[70%]">
            <h3 className="text-[var(--primary)] text-[20px] font-semibold">
              Our Story
            </h3>
            <p className="text-[14px] w-[80%]">
              AgriTrack was born from a simple idea --to make farming smarter
              and easier. We belive in the hard work of farmers and are
              committed to providing the best platform to support their journey
              towords a better future.
            </p>
          </div>
          <div>
            <Link to={"/signup"}>
              <div className="flex gap-1 items-center text-white px-4 hover:bg-green-600 py-2 bg-green-700 rounded-full">
                <p className="text-[14px]">Grow Together with AgriTrack</p>
                <ArrowRight size={20} />
              </div>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
