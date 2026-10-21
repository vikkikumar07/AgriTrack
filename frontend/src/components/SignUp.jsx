import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import logsign from "../image/logsign_background.png";
import {
  Eye,
  EyeOffIcon,
  LockKeyhole,
  LucideMessagesSquare,
  NotebookText,
  PlantPot,
  User,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import api from "../app/api";

export default function () {
  let [showPass, setShowPass] = useState(false);
  let [adminKey, setAdminKey] = useState(false);
  let [confPass, setConfPass] = useState("");
  let navigate = useNavigate();
  let [user, setUser] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    role: "",
    secret: "",
  });

  let setData = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    user.role == "admin" ? setAdminKey(true) : setAdminKey(false);
  }, [user]);

  let handlSubmit = async (e) => {
    e.preventDefault();
    if (confPass !== user.password) {
      toast.error("Invalid Password!");
      return;
    }
    try {
      let response = await axios.post(`${api}/user/signup`, user);
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/login");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
    setUser({
      fullName: "",
      username: "",
      email: "",
      password: "",
      role: "",
      secret: "",
    });
    setConfPass("");
  };
  return (
    <>
      <div className="fixed top-0 w-[100%] z-20">
        <Navbar />
      </div>
      <div className="relative">
        <div className="w-full h-[140vh] overflow-hidden">
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
            <div className="md:absolute md:right-10 z-10">
              <div className="bg-white block h-[750px] md:h-[700px] w-[90%] mx-auto mt-[100px] md:mt-6 md:w-[400px] shadow-xl rounded-sm px-6 py-3">
                <div className="text-center">
                  <h2 className="font-bold text-[20px]">Create your account</h2>
                  <p className="text-[var(--mute)] text-[12px]">
                    Start managing your farm with AgriTrack
                  </p>
                </div>
                <div className="mt-2">
                  <div>
                    <form onSubmit={handlSubmit}>
                      <div>
                        <label>Full name</label>
                        <div className="relative">
                          <User
                            size={15}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--mute)]"
                          />
                          <input
                            type="text"
                            className="inputBox"
                            name="fullName"
                            value={user.fullName}
                            onChange={setData}
                            required
                            placeholder="Enter your full name"
                          />
                        </div>
                      </div>
                      <div>
                        <label>username</label>
                        <div className="relative">
                          <User
                            size={15}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--mute)]"
                          />
                          <input
                            type="text"
                            className="inputBox"
                            name="username"
                            value={user.username}
                            onChange={setData}
                            required
                            placeholder="Enter your username"
                          />
                        </div>
                      </div>
                      <div>
                        <label>Email address</label>
                        <div className="relative">
                          <LucideMessagesSquare
                            size={15}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--mute)]"
                          />
                          <input
                            className="inputBox"
                            type="email"
                            name="email"
                            value={user.email}
                            onChange={setData}
                            required
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
                            name="password"
                            value={user.password}
                            onChange={setData}
                            required
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
                        <label>Confirm password</label>
                        <div className="relative">
                          <LockKeyhole
                            size={15}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--mute)]"
                          />
                          <input
                            className="inputBox"
                            type={`${showPass ? "text" : "password"}`}
                            name="confpass"
                            value={confPass}
                            onChange={(e) => setConfPass(e.target.value)}
                            required
                            placeholder="Confirm your password"
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
                          <select
                            className="inputBox"
                            name="role"
                            value={user.role}
                            onChange={setData}
                            required
                          >
                            <option value="">Selete your role</option>
                            <option value="farmer">Farmer</option>
                            <option value="expert">Expert</option>
                            <option value="admin">Admin</option>
                          </select>
                        </div>
                        {adminKey ? (
                          <>
                            <div>
                              <input
                                type="text"
                                name="secret"
                                value={user.secret}
                                onChange={setData}
                                className="w-[150px] outline-none border-2 rounded-md mt-1 pl-1 py-1 placeholder:text-[14px] text-[13px]"
                                placeholder="Secret key (admin)"
                              />
                            </div>
                          </>
                        ) : (
                          <></>
                        )}

                        <div className="flex gap-1 my-1">
                          <input
                            type="checkbox"
                            className="accent-[var(--primary)]"
                          />
                          <p className="text-[12px]">
                            I agree to the
                            <span className="mx-1 text-[var(--primary)]">
                              Teems of Service
                            </span>
                            and
                            <span className="mx-1 text-[var(--primary)]">
                              Privacy Policy
                            </span>
                          </p>
                        </div>
                      </div>

                      <div className="m-0 w-full">
                        <button
                          type="submit"
                          className="btn w-full bg-[var(--primary)] hover:bg-[var(--secondary)] text-white my-1 px-0"
                        >
                          Create Account
                        </button>
                      </div>
                    </form>
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
                        Already have an account?{" "}
                        <Link to={"/login"} className="text-[var(--primary)]">
                          Sign in
                        </Link>
                      </p>
                    </div>
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
