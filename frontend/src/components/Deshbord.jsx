import React from "react";
import footerImage from "../image/footer_image.png";

export default function Deshbord() {
  return (
    <>
      <div className="relative overflow-x-clip w-screen">
        <div className="h-[20vh]  md:h-[40vh] w-full -z-20 overflow-hidden">
          <img
            src={footerImage}
            alt="Home Image"
            className="block object-cover h-full w-full"
          />
        </div>
      </div>
    </>
  );
}
