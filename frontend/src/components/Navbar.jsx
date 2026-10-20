import React, { useState } from "react";
import logo from "../logo.png";
import icon from "../icon.png";
import {
  BookAIcon,
  BuildingComplex,
  ChartAreaIcon,
  HomeIcon,
  Info,
  LucideNetwork,
  Menu,
  Notebook,
  NotebookPen,
  Settings,
  User2,
  UserRoundPen,
  WorkflowIcon,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import api from "../app/api";

export default function Navbar() {
  let user = useSelector((state) => state.user.user);
  let [show, setShow] = useState(false);
  let [menu, setMenu] = useState(false);
  let admin = user?.role === "admin";

  let logoutAccount = async () => {
    try {
      let response = await axios.post(
        `${api}/user/logout`,
        {},
        {
          withCredentials: true,
        },
      );
      if (response.data.success) {
        toast.success(response.data.message);
        window.location.reload();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };
  return (
    <>
      <div className="flex justify-between items-center shadow-md py-2 px-1 md:px-6 bg-white w-[100%]">
        <div className="flex gap-2 justify-center items-center">
          <div className="md:hidden z-40">
            {menu ? (
              <>
                <X
                  size={25}
                  className="cursor-pointer"
                  onClick={() => setMenu(!menu)}
                />
              </>
            ) : (
              <>
                <Menu
                  size={25}
                  className="cursor-pointer"
                  onClick={() => setMenu(!menu)}
                />
              </>
            )}
            <div
              className={`absolute left-0 top-10 shadow-md p-6 w-[300px] bg-white z-40 text-left ${menu ? "block" : "hidden"}`}
            >
              {user ? (
                <>
                  {admin ? (
                    <>
                      <div>
                        <ul>
                          <Link to={"/"}>
                            <li className="menu-li">
                              <div className="flex gap-3">
                                <HomeIcon size={20} /> <span>Deshbord</span>
                              </div>
                            </li>
                          </Link>

                          <li className="menu-li">
                            <div className="flex gap-3">
                              <User2 size={20} /> <span>User</span>
                            </div>
                          </li>
                          <li className="menu-li">
                            <div className="flex gap-3">
                              <BuildingComplex size={20} />
                              <span>Complain</span>
                            </div>
                          </li>
                          <li className="menu-li">
                            <div className="flex gap-3">
                              <ChartAreaIcon size={20} /> <span>Ai Chat</span>
                            </div>
                          </li>
                          <li className="menu-li">
                            <div className="flex gap-3">
                              <Settings size={20} /> <span>Setting</span>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <ul>
                          <li className="menu-li">
                            <div className="flex gap-3">
                              <HomeIcon size={20} />{" "}
                              <span>
                                <Link to={"/"}>Home</Link>
                              </span>
                            </div>
                          </li>
                          <li className="menu-li">
                            <div className="flex gap-3">
                              <NotebookPen size={20} /> <span>Tasks</span>
                            </div>
                          </li>
                          <li className="menu-li">
                            <div className="flex gap-3">
                              <Notebook size={20} /> <span>Expenses</span>
                            </div>
                          </li>
                          <li className="menu-li">
                            <div className="flex gap-3">
                              <BookAIcon size={20} /> <span>Records</span>
                            </div>
                          </li>
                          <li className="menu-li">
                            <div className="flex gap-3">
                              <BuildingComplex size={20} />{" "}
                              <span>Complain</span>
                            </div>
                          </li>
                          <li className="menu-li">
                            <div className="flex gap-3">
                              <ChartAreaIcon size={20} /> <span>Ai Chat</span>
                            </div>
                          </li>
                          <li className="menu-li">
                            <div className="flex gap-3">
                              <Settings size={20} /> <span>Setting</span>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </>
                  )}
                </>
              ) : (
                <>
                  <div>
                    <ul>
                      <li className="menu-li">
                        <div className="flex gap-3">
                          <HomeIcon size={20} />{" "}
                          <span>
                            <Link to={"/"}>Home</Link>
                          </span>
                        </div>
                      </li>
                      <li className="menu-li">
                        <div className="flex gap-3">
                          <Info size={20} /> <span>About</span>
                        </div>
                      </li>
                      <li className="menu-li">
                        <div className="flex gap-3">
                          <LucideNetwork size={20} /> <span>Features</span>
                        </div>
                      </li>
                      <li className="menu-li">
                        <div className="flex gap-3">
                          <WorkflowIcon size={20} /> <span>How it works</span>
                        </div>
                      </li>
                      <li className="menu-li">
                        <div className="flex gap-3">
                          <Settings size={20} /> <span>Setting</span>
                        </div>
                      </li>
                    </ul>
                  </div>
                </>
              )}
            </div>
          </div>
          <div>
            <img src={logo} alt="logo" width={100} className="bg-white"></img>
          </div>
        </div>
        {user ? (
          <>
            {admin ? (
              <>
                <div className="hidden md:block">
                  <ul className="flex  gap-6 font-medium list-none">
                    <li className="li-btn">
                      <Link to={"/deshbord"}>Deshbord</Link>
                    </li>
                    <li className="li-btn">User</li>
                    <li className="li-btn">Complain</li>
                    <li className="li-btn">Ai Chat</li>
                  </ul>
                </div>
              </>
            ) : (
              <>
                <div className="hidden md:block">
                  <ul className="flex  gap-6 font-medium list-none">
                    <li className="li-btn">
                      <Link to={"/"}>Home</Link>
                    </li>
                    <li className="li-btn">Tasks</li>
                    <li className="li-btn">Expenses</li>
                    <li className="li-btn">Records</li>
                    <li className="li-btn">Complain</li>
                    <li className="li-btn">Ai Chat</li>
                  </ul>
                </div>
              </>
            )}
          </>
        ) : (
          <>
            <div className="hidden md:block">
              <ul className="flex  gap-6 font-medium list-none">
                <li className="li-btn">
                  <Link to={"/"}>Home</Link>
                </li>
                <li className="li-btn">About</li>
                <li className="li-btn">Features</li>
                <li className="li-btn">How it works</li>
              </ul>
            </div>
          </>
        )}

        <div>
          <ul>
            {user ? (
              <>
                <div
                  className="shadow-xl w-[40px] h-[40px] items-center justify-center rounded-full cursor-pointer"
                  onClick={() => setShow(!show)}
                >
                  <img
                    src={user?.logo || icon}
                    alt="User logo"
                    className="object-contain h-[40px] w-[40px]"
                  ></img>
                </div>
                <div
                  className={`w-[320px] bg-white absolute right-0 top-14 shadow-md px-4 py-4 ${show ? "block" : "hidden"}`}
                >
                  <div className="relative h-6">
                    <X
                      size={20}
                      className="cursor-pointer absolute right-1 top-0 text-red-600"
                      onClick={() => setShow(!show)}
                    />
                  </div>
                  <div className="flex justify-center mb-3">
                    <img
                      src={user?.logo || icon}
                      alt="User logo"
                      className="object-contain h-[50px] w-[50px] rounded-full"
                    />
                  </div>
                  <div className="my-4">
                    <div className="grid grid-cols-2">
                      <label className="text-[var(--mute)]">Name : </label>
                      <h2>{user?.fullName}</h2>
                    </div>
                    <div className="grid grid-cols-2">
                      <label className="text-[var(--mute)]">Username : </label>
                      <h2>{user?.username}</h2>
                    </div>
                    <div className="grid grid-cols-2">
                      <label className="text-[var(--mute)]">Email : </label>
                      <h2>{user?.email}</h2>
                    </div>
                    <div className="grid grid-cols-2 my-6">
                      <button
                        onClick={logoutAccount}
                        className="btn bg-[var(--primary)] text-white hover:bg-[var(--secondary)]"
                      >
                        Logout
                      </button>
                      <Link to={"/profile/edit"} className="w-full">
                        <button className="btn fsize bg-white hover:bg-[var(--color-1)] flex gap-1 w-[90%]">
                          <UserRoundPen className="text-[14px]" size={20} />
                          Profile
                        </button>
                      </Link>
                      <button className="text-[12px] text-red-600 my-4">
                        <Link to={"/delete/account"}>Delete Account</Link>
                      </button>
                    </div>
                    <div>
                      <ul>
                        <li className="p-3 hover:bg-[var(--primary)] hover:text-white rounded-md my-4 cursor-pointer shadow-md">
                          <div className="flex gap-3">
                            <Settings size={20} /> <span>Setting</span>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <button className="btn bg-white hover:bg-[var(--color-1)] fsize">
                  <Link to={"/login"}>Login</Link>
                </button>
                <button className="btn bg-[var(--primary)]  hover:bg-[var(--secondary)] text-white fsize">
                  <Link to={"/signup"}>SignUp</Link>
                </button>
              </>
            )}
          </ul>
        </div>
      </div>
    </>
  );
}
