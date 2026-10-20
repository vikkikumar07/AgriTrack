import React from "react";
import footerImage from "../image/footer_image.png";

export default function FooterComponent() {
  return (
    <>
      <div>
        <div className="relative">
          <div className="h-[230px] md:h-[400px] w-full overflow-hidden">
            <img
              src={footerImage}
              alt="footer image"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute top-0">
            <div className="grid grid-cols-1 md:grid-cols-3 m-4 md:m-20">
              <div>
                <div className="flex gap-2 my-2">
                  <div>
                    <h2 className="text-[20px] md:text-[40px] font-bold">
                      Agri<span className="text-[#077324]">Track</span>
                    </h2>
                    <p className="text-[14px]">
                      Smart Farming . Better Tomorrow
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-[12px] md:text-[16px]">
                    AgriTrack is a smart farm management platform that helps
                    farmers plan, track, and grow smarter with real-time
                    insights, expert guidance, and data-driven decisions for a
                    better tomorrow.
                  </p>
                </div>
              </div>
              <div></div>
              <div className="hidden md:block">
                <div className="border shadow-lg h-[200px]"></div>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 h-[60px] bg-[#077324] w-full">
            <div className="mx-5 my-2">
              <div className="text-center">
                <p className="text-[12px] text-white">2026 AgriTrack.</p>
                <p className="text-[12px] text-white">
                  Empowering farmers with technology for a sustainable future.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
