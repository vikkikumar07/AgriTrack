import React, { useEffect, useRef, useState } from "react";
import logo from "../logo.png";
import icon from "../icon.png";
import {
  AstroidIcon,
  BookAIcon,
  BookmarkX,
  BuildingComplex,
  ChartAreaIcon,
  HomeIcon,
  Info,
  LeafIcon,
  Loader2,
  LucideNetwork,
  Menu,
  Notebook,
  Send,
  Settings,
  User2,
  UserRoundPen,
  WorkflowIcon,
  X,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import api from "../app/api";

export default function Navbar() {
  let user = useSelector((state) => state.user.user);
  let [show, setShow] = useState(false);
  let [menu, setMenu] = useState(false);
  let [aiChat, setAiChat] = useState(false);
  let admin = user?.role === "admin";

  let navigate = useNavigate();
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
        navigate("/");
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
      <div className="flex overflow-x-hidden justify-between items-center shadow-md py-3 px-1 md:px-6 bg-white w-[100%]">
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
                          <li className="menu-li">
                            <Link to={"/"}>
                              <div className="flex gap-3">
                                <HomeIcon size={20} /> <span>Deshbord</span>
                              </div>
                            </Link>
                          </li>

                          <li className="menu-li">
                            <Link to={"/admin/users"}>
                              <div className="flex gap-3">
                                <User2 size={20} /> <span>User</span>
                              </div>
                            </Link>
                          </li>
                          <li className="menu-li">
                            <Link to={"/admin/complains"}>
                              <div className="flex gap-3">
                                <BuildingComplex size={20} />
                                <span>Complain</span>
                              </div>
                            </Link>
                          </li>
                          <li className="menu-li">
                            <div
                              className="flex gap-3"
                              onClick={() => setAiChat(!aiChat)}
                            >
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
                            <Link to={"/"}>
                              <div className="flex gap-3">
                                <HomeIcon size={20} /> <span>Home</span>
                              </div>
                            </Link>
                          </li>
                          <li className="menu-li">
                            <Link to={`/myfarm/${user._id}`}>
                              <div className="flex gap-3">
                                <LeafIcon size={20} /> <span>My Farm</span>
                              </div>
                            </Link>
                          </li>
                          <li className="menu-li">
                            <Link to={`/expenses/${user._id}`}>
                              <div className="flex gap-3">
                                <Notebook size={20} /> <span>Expenses</span>
                              </div>
                            </Link>
                          </li>
                          <li className="menu-li">
                            <Link to={`/harvest/${user._id}`}>
                              <div className="flex gap-3">
                                <BookAIcon size={20} />{" "}
                                <span>Harvest & Sales</span>
                              </div>
                            </Link>
                          </li>
                          <li className="menu-li">
                            <Link to={`/complain/${user._id}`}>
                              <div className="flex gap-3">
                                <BuildingComplex size={20} />
                                <span>Complain</span>
                              </div>
                            </Link>
                          </li>
                          <li className="menu-li">
                            <div
                              className="flex gap-3"
                              onClick={() => setAiChat(!aiChat)}
                            >
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
                        <Link to={"/"}>
                          <div className="flex gap-3">
                            <HomeIcon size={20} /> <span>Home</span>
                          </div>
                        </Link>
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
                    <li>
                      <Link to={"/"} className="nav-btn">
                        Deshbord
                      </Link>
                    </li>
                    <li>
                      <Link to={`/admin/users`} className="nav-btn">
                        User
                      </Link>
                    </li>
                    <li>
                      <Link to={`/admin/complains`} className="nav-btn">
                        Complain
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="nav-btn"
                        onClick={() => setAiChat(!aiChat)}
                      >
                        Ai Chat
                      </Link>
                    </li>
                  </ul>
                </div>
              </>
            ) : (
              <>
                <div className="hidden md:block">
                  <ul className="flex  gap-6 font-medium list-none">
                    <li>
                      <Link to={"/"} className="nav-btn">
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link to={`/myfarm/${user._id}`} className="nav-btn">
                        My Farm
                      </Link>
                    </li>
                    <li>
                      <Link to={`/expenses/${user._id}`} className="nav-btn">
                        Expenses
                      </Link>
                    </li>
                    <li>
                      <Link to={`/harvest/${user._id}`} className="nav-btn">
                        Harvest & Sales
                      </Link>
                    </li>
                    <li>
                      <Link to={`/complain/${user._id}`} className="nav-btn">
                        Complain
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="nav-btn"
                        onClick={() => setAiChat(!aiChat)}
                      >
                        Ai Chat
                      </Link>
                    </li>
                  </ul>
                </div>
              </>
            )}
          </>
        ) : (
          <>
            <div className="hidden md:block">
              <ul className="flex  gap-6 font-medium list-none">
                <li className="nav-btn">
                  <Link to={"/"}>Home</Link>
                </li>
                <li className="nav-btn">About</li>
                <li className="nav-btn">Features</li>
                <li className="nav-btn">How it works</li>
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
                    className="object-contain h-[40px] w-[40px] rounded-full"
                  ></img>
                </div>
                <div
                  className={`w-[320px] bg-white absolute right-0 top-14 shadow-md px-4 py-2 ${show ? "block" : "hidden"}`}
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
                      className="object-contain h-[80px] w-[80px] rounded-full border-2 border-black"
                    />
                  </div>
                  <div className="my-4">
                    <div className="grid grid-cols-3">
                      <label className="text-[var(--mute)] col-span-1">
                        Name :{" "}
                      </label>
                      <h2 className="col-span-2">{user?.fullName}</h2>
                    </div>
                    <div className="grid grid-cols-3">
                      <label className="text-[var(--mute)] col-span-1">
                        Username :{" "}
                      </label>
                      <h2 className="col-span-2">{user?.username}</h2>
                    </div>
                    <div className="grid grid-cols-3">
                      <label className="text-[var(--mute)] col-span-1">
                        Email :{" "}
                      </label>
                      <h2 className="col-span-2">{user?.email}</h2>
                    </div>
                    <div className="grid grid-cols-3">
                      <label className="text-[var(--mute)] col-span-1">
                        Role :{" "}
                      </label>
                      <h2 className="col-span-2">{user?.role}</h2>
                    </div>
                    <div className="grid grid-cols-2 my-6">
                      <button
                        onClick={logoutAccount}
                        className="btn bg-[var(--primary)] text-white hover:bg-[var(--secondary)]"
                      >
                        Logout
                      </button>
                      <Link to={`/profile/edit/${user._id}`} className="w-full">
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
                <div className="absolute top-16 right-0 -z-10 shadow-md">
                  {aiChat ? (
                    <>
                      <div>
                        <AiChatCard aiChat={aiChat} setAiChat={setAiChat} />
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              </>
            ) : (
              <>
                <button className="btn bg-white hover:bg-[var(--color-1)] fsize">
                  <Link to={"/login"}>Login</Link>
                </button>
                <button className="btn bg-[var(--primary)] hover:bg-[var(--secondary)] text-white fsize">
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

let AiChatCard = ({ aiChat, setAiChat }) => {
  let [content, setContent] = useState("");
  let [message, setMessage] = useState([]);
  let [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [message]);

  let getMessage = async () => {
    try {
      let res = await axios.get(`${api}/aichat/find`, {
        withCredentials: true,
      });

      setMessage(res.data.messages);
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  let sendAiMessage = async (e) => {
    e.preventDefault();

    setMessage((prev) => [
      ...prev,
      {
        sender: "user",
        content,
      },
    ]);

    setMessage((prev) => [
      ...prev,
      {
        sender: "ai",
        content: "Please wait ...",
      },
    ]);

    try {
      setLoading(true);
      let res = await axios.post(
        `${api}/aichat/send`,
        { content },
        {
          withCredentials: true,
        },
      );

      if (!res.data.success) {
        toast.error(res.data.message);
      }
      await getMessage();
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setContent("");
      setLoading(false);
    }
  };

  let deleteChat = async () => {
    try {
      let res = await axios.delete(`${api}/aichat/delete`, {
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        getMessage();
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };
  useEffect(() => {
    if (aiChat === true) {
      getMessage();
    }
  }, [aiChat]);

  return (
    <>
      <div className="block h-[780px] md:h-[550px] w-[410px] bg-white -z-10 mx-auto p-6 rounded-lg">
        <div className="relative">
          <div className="relative h-1">
            <X
              size={20}
              className="cursor-pointer absolute right-1 top-0 text-red-600"
              onClick={() => setAiChat(!aiChat)}
            />
          </div>
          <div className="flex justify-center">
            <img src={logo} alt="logo" width={110} />
          </div>
          <div className="relative flex justify-center items-center my-2 gap-2">
            <AstroidIcon fill="blue" color="blue" size={30} />
            <h3 className="text-[30px] font-semibold text-[var(--primary)]">
              Ai Assistant
            </h3>
            <div className="group absolute top-5 right-0 flex flex-col items-center justify-center">
              <span className="pointer-events-none absolute right-0 top-full z-10 mt-1 whitespace-nowrap rounded-md bg-red-600 p-1 text-[14px] text-white hidden group-hover:block">
                All delete
              </span>

              <BookmarkX
                color="red"
                onClick={deleteChat}
                className="mx-auto cursor-pointer"
              />
            </div>
          </div>
        </div>
        <div className="relative h-[75%] md:h-[80%] border-2 border-[var(--primary)] rounded-md p-4 bg-[var(--color-1)]">
          <div className="relative h-[90%] w-full overflow-y-auto overflow-x-hidden hide-scrollbar">
            <div className="grid grid-cols-1 gap-2 pb-2">
              {message?.map((v, i) => {
                return (
                  <div key={i}>
                    {v.sender === "ai" ? (
                      <>
                        <div className={`text-left`}>
                          <span className="py-2 px-4 bg-blue-400 rounded-lg inline-block my-2">
                            {v.content}
                          </span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className={`text-right`}>
                          <span className="py-2 px-4 bg-green-400 rounded-lg inline-block my-2">
                            {v.content}
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
              <div ref={bottomRef}></div>
            </div>
          </div>
          <div className="absolute bottom-0 right-0 px-2 w-full">
            <form
              onSubmit={sendAiMessage}
              className="flex justify-between items-center py-2 gap-2"
            >
              <div className="border-2 bg-white border-[var(--primary)] w-full px-2 rounded-md flex ">
                <input
                  type="text"
                  name="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Ask anything about farming.."
                  className="w-full outline-none rounded-md mt-1 pl-3 pr-3 py-3 placeholder:text-[14px] text-[16px] md:text-[13px] "
                />
                <button type="submit">
                  {loading ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                    </>
                  ) : (
                    <>
                      <Send
                        fill="green"
                        color="green"
                        size={25}
                        className="hover:fill-green-300"
                      />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
