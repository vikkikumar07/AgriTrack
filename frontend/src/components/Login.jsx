import React, { useState } from "react";
import Navbar from "./Navbar";
import logsign from "../image/logsign_background.png";
import {
  ArrowRight,
  Eye,
  EyeOffIcon,
  LockKeyhole,
  LucideMessagesSquare,
  NotebookText,
  PlantPot,
  User,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Login() {
  let [showPass, setShowPass] = useState(false);
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
        <div className="absolute top-10 z-10 w-full">
          <div className="relative">
            <div className="hidden absolute left-10 top-12 md:block">
              <div className=" absolute left-5 top-5 w-[400px] px-2 text-white">
                <div className="bg-[var(--secondary)] blur-3xl p-5 absolute h-full w-full -z-10 left-0"></div>
                <h1 className="text-[30px] font-bold m-0 p-0">Grow smarter.</h1>
                <h1 className="text-[30px] font-bold text-[var(--color-2)] m-0 p-0">
                  Farm better.
                </h1>
                <p>
                  Your farm, your data, your growth- <br /> all in one place.
                </p>
                <div>
                  <div className="flex gap-2 my-4">
                    <PlantPot
                      size={30}
                      fill="#27F549"
                      color="#27F549"
                      className=" w-[50px] h-[50px] p-2 rounded-[50%]"
                    />
                    <div>
                      <h3 className="font-semibold">Crop & Task Tracking</h3>
                      <p className="text-sm">
                        Plan, track and manage your crops easily.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2 my-4">
                    <NotebookText
                      size={30}
                      color="#27F549"
                      className=" w-[50px] h-[50px] p-2 rounded-[50%]"
                    />
                    <div>
                      <h3 className="font-semibold">
                        Harvest & Profit Records
                      </h3>
                      <p className="text-sm">
                        Keep track of your harvest, expenses and profits.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:absolute md:right-10">
              <div className="bg-white block h-[600px] md:h-[480px] w-[90%] mx-auto mt-[100px] md:mt-6 md:w-[400px] shadow-xl rounded-sm px-6 py-3">
                <div className="text-center">
                  <h2 className="font-bold text-[20px]">Welcome Back</h2>
                  <p className="text-[var(--mute)] text-[12px]">
                    Login to you AgriTrack account
                  </p>
                </div>
                <div className="mt-2">
                  <div>
                    <from>
                      <div>
                        <label>Email address</label>
                        <div className="relative">
                          <LucideMessagesSquare
                            size={15}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--mute)]"
                          />
                          <input
                            className="inputBox"
                            placeholder="Enter your email address"
                          />
                        </div>
                      </div>
                      <div>
                        <label>Password</label>
                        <div className="relative">
                          <LockKeyhole
                            size={15}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--mute)]"
                          />
                          <input
                            className="inputBox"
                            type={`${showPass ? "text" : "password"}`}
                            placeholder="Create a password"
                          />
                          {showPass ? (
                            <>
                              <Eye
                                size={15}
                                onClick={() => setShowPass(!showPass)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--mute)]"
                              />
                            </>
                          ) : (
                            <>
                              <EyeOffIcon
                                size={15}
                                onClick={() => setShowPass(!showPass)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--mute)]"
                              />
                            </>
                          )}
                        </div>
                      </div>
                      <div>
                        <label>I am a</label>
                        <div className="relative">
                          <User
                            size={15}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--mute)]"
                          />
                          <select className="inputBox">
                            <option>Farmer</option>
                            <option>Expert</option>
                            <option>Admin</option>
                          </select>
                        </div>
                        <div>
                          <input
                            type="text"
                            className="w-[150px] outline-none border-2 rounded-md mt-1 pl-1 py-1 placeholder:text-[14px] text-[13px]"
                            placeholder="Secret key (admin)"
                          />
                        </div>
                      </div>
                      <div className="w-full mt-2">
                        <button className="btn w-full bg-[var(--primary)] hover:bg-[var(--secondary)] text-white my-1 px-0 flex gap-1 justify-center">
                          Login <ArrowRight size={15} />
                        </button>
                      </div>
                      <div>
                        <p className="text-center text-[var(--mute)]">or</p>
                        <button className="btn flex justify-center items-center gap-1 w-full mt-2">
                          <img
                            src="https://www.google.com/favicon.ico"
                            alt="Google"
                            className="w-[20px]"
                          />
                          <span>Continue with Google</span>
                        </button>
                        <p className="text-[12px] text-center my-4">
                          Don't have an account?{" "}
                          <Link
                            to={"/signup"}
                            className="text-[var(--primary)]"
                          >
                            Sign up
                          </Link>
                        </p>
                      </div>
                    </from>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
