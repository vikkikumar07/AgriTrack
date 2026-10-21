import React from "react";
import FooterComponent from "./FooterComponent";
import homePage from "../image/home_page_2.png";
import { LeafyGreen, Sun } from "lucide-react";
import { useSelector } from "react-redux";

export default function Home2() {
  let user = useSelector((state) => state.user.user);
  return (
    <>
      <div className="relative w-screen">
        <main className="h-[100vh]">
          <div className="relative h-[300px] w-full">
            <div className=" h-[70vh]  md:h-[50vh] w-full -z-20 overflow-hidden border rounded-lg">
              <img
                src={homePage}
                alt="Home Image"
                className="block object-cover h-full w-full"
              />
              <div className="absolute top-2 left-4 md:left-16 h-[200px] w-[300px] md:h-[300px] md:w-[300px] bg-white blur-xl md:blur-2xl z-0"></div>
            </div>
            <div className="absolute top-20 left-40 text-left ">
              <h2 className="font-bold text-[20px]">Good Morning,</h2>
              <h2 className="flex gap-1 font-bold text-[30px] items-center">
                {user?.fullName}!
                <Sun className="" fill="yellow" color="yellow" />
              </h2>
              <p className="my-2 text-[14px]">
                Let's grow a better tomorrow with AgriTrack.
              </p>
              <div className="flex gap-2 my-8 items-center">
                <LeafyGreen />
                <div>
                  <p>
                    Healthy crops today, <br /> a brighter tomorrow.{" "}
                  </p>
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
