import React from "react";
import Navbar from "./components/Navbar";

import { useSelector } from "react-redux";

import Deshbord from "./components/Deshbord";
import Home2 from "./components/Home2";
import Home1 from "./components/Home1";

export default function Home() {
  let user = useSelector((state) => state.user.user);

  let admin = user?.role === "admin";
  return (
    <>
      <div>
        <div className="fixed top-0 w-screen z-40">
          <Navbar />
        </div>
        <div className="absolute top-12">
          {user ? (
            <>
              {admin ? (
                <>
                  <Deshbord />
                </>
              ) : (
                <>
                  <Home2 />
                </>
              )}
            </>
          ) : (
            <>
              <Home1 />
            </>
          )}
        </div>
      </div>
    </>
  );
}
