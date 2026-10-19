import React from "react";
import Navbar from "./Navbar";
import logsign from "../image/logsign_background.png";

export default function Login() {
  return (
    <>
      <div className="fixed top-0 w-[100%] z-10">
        <Navbar />
      </div>
      <div className="relative">
        <div className="w-full h-[100vh] overflow-hidden">
          <img
            src={logsign}
            className="object-center w-full h-full object-cover"
          />
        </div>
        <div className="absolute"></div>
      </div>
    </>
  );
}
