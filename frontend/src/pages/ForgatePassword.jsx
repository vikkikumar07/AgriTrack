import React, { useState } from "react";
import Navbar from "../components/Navbar";
import {
  Eye,
  EyeOffIcon,
  Loader2,
  LockKeyhole,
  LucideMessagesSquare,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { setUser } from "../app/counter/counterSlice";
import axios from "axios";
import api from "../app/api";

export default function ForgatePassword() {
  let [showPass, setShowPass] = useState(false);
  let navigate = useNavigate();
  let [loading, setLoading] = useState(false);
  let [userData, setUserData] = useState({
    email: "",
    cPassword: "",
    newPassword: "",
    confPassword: "",
  });

  let setData = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const dispatch = useDispatch();

  let handlSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      let response = await axios.patch(`${api}/user/forget/password`, userData);
      if (response.data.success) {
        toast.success(response.data.message);
        dispatch(setUser(response.data.user));
        navigate("/login");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setLoading(false);
    }

    setUserData({
      email: "",
      cPassword: "",
      newPassword: "",
      confPassword: "",
    });
  };
  return (
    <>
      <div>
        <div className="fixed top-0 w-screen z-40">
          <Navbar />
        </div>
        <div className="flex justify-center mt-20">
          <div>
            <div className="bg-white shadow-black block h-[520px] md:h-[480px] w-[90%] mx-auto mt-[60px] md:mt-6 md:w-[400px] shadow-md rounded-sm px-6 py-3">
              <div className="text-center mt-[50px]">
                <h2 className="font-bold text-[20px]">Forget Password</h2>

                <p className="text-[var(--mute)] text-[12px]"></p>
              </div>
              <div className="mt-2">
                <div>
                  <form onSubmit={handlSubmit}>
                    <div>
                      <label>
                        Email address <sup className="text-red-700">*</sup>{" "}
                      </label>
                      <div className="relative">
                        <LucideMessagesSquare
                          size={15}
                          className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--mute)]"
                        />
                        <input
                          className="inputBox"
                          type="email"
                          name="email"
                          value={userData.email}
                          onChange={setData}
                          placeholder="Enter your email address"
                        />
                      </div>
                    </div>
                    <div>
                      <label>
                        Current Password
                        <sup className="text-red-700">*</sup>{" "}
                      </label>
                      <div className="relative">
                        <LockKeyhole
                          size={15}
                          className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--mute)]"
                        />
                        <input
                          className="inputBox"
                          type="password"
                          name="cPassword"
                          value={userData.cPassword}
                          onChange={setData}
                          placeholder="Enter your current password"
                        />
                      </div>
                    </div>
                    <div>
                      <label>
                        New Password <sup className="text-red-700">*</sup>{" "}
                      </label>
                      <div className="relative">
                        <LockKeyhole
                          size={15}
                          className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--mute)]"
                        />
                        <input
                          className="inputBox"
                          name="newPassword"
                          value={userData.newPassword}
                          onChange={setData}
                          type={`${showPass ? "text" : "password"}`}
                          placeholder="Enter your new password"
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
                      <label>
                        Confirm Password{" "}
                        <sup className="text-red-700">*</sup>{" "}
                      </label>
                      <div className="relative">
                        <LockKeyhole
                          size={15}
                          className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--mute)]"
                        />
                        <input
                          className="inputBox"
                          name="confPassword"
                          value={userData.confPassword}
                          onChange={setData}
                          type={`${showPass ? "text" : "password"}`}
                          placeholder="Confirm password"
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
                    <div className="w-full mt-4">
                      <button
                        type="submit"
                        className="btn w-full bg-[var(--primary)] hover:bg-[var(--secondary)] text-white my-1 px-0 flex gap-1 justify-center"
                      >
                        {loading ? (
                          <>
                            <Loader2 size={15} className="animate-spin" />
                          </>
                        ) : (
                          <></>
                        )}
                        Forget Password
                      </button>
                    </div>
                  </form>
                  <div className="block my-4 pt-4">
                    <p className="text-[12px] text-center my-4">
                      Back to login page{" "}
                      <Link to={"/login"} className="text-[var(--primary)]">
                        Login
                      </Link>
                    </p>
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
