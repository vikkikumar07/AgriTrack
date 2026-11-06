import React, { useEffect, useState } from "react";
import homePage from "../image/home_page_2.png";
import { useSelector } from "react-redux";
import {
  ArrowRight,
  BookmarkX,
  CalendarDays,
  CheckCircle2,
  CircleDashed,
  Edit3,
  MoreVertical,
  NotebookText,
  Send,
  Sun,
  Timer,
  Users,
  UserShieldIcon,
} from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";
import api from "./../app/api";
import { toast } from "react-toastify";
import FooterComponent from "./FooterComponent";

export default function Deshbord() {
  let user = useSelector((state) => state.user.user);
  let [deshbordData, setDeshbordData] = useState({});
  let [users, setUsers] = useState([]);
  let [comaplain, setComplain] = useState([]);

  let getDeshbordData = async () => {
    try {
      let res = await axios.get(`${api}/admin/find/deshbord/data`, {
        withCredentials: true,
      });

      setDeshbordData(res.data?.DeshbordDatas);
      setUsers(res.data?.DeshbordDatas?.recentUsers);
      setComplain(res.data?.DeshbordDatas?.recentComplain);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    getDeshbordData();
  }, []);
  return (
    <>
      <div className="bg-sky-50">
        <header className="w-screen">
          <div className="relative h-[300px] w-full">
            <div className=" h-[50vh]  md:h-[60vh] w-full -z-20 overflow-hidden border rounded-lg">
              <img
                src={homePage}
                alt="Home"
                className="block object-cover h-full w-full"
              />
              <div className="absolute top-2 left-4 md:left-16 h-[200px] w-[300px] md:h-[300px] md:w-[300px] bg-white blur-xl md:blur-2xl z-0"></div>
            </div>
            <div className="absolute top-10 md:top-20 left-16 md:left-40 text-left ">
              <h2 className="font-bold text-[20px]">Welcome Back,</h2>
              <h2 className="flex gap-1 font-bold text-[30px] items-center">
                {user?.fullName}!
                <Sun className="" fill="yellow" color="yellow" />
              </h2>
              <p className="my-2 text-[14px] w-[50%]">
                Monitor, manage and grow the AgriTrack community for a smarter
                and green future.
              </p>
            </div>
          </div>
          <div className="relative">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-2 z-10 my-6 md:my-10 w-[90%] mx-auto">
              <div className="flex gap-4 items-center bg-white shadow-xl rounded-md px-4 py-2">
                <div className=" bg-green-100 p-2 rounded-md">
                  <Users size={30} color="green" />
                </div>
                <div>
                  <h4 className="font-semibold text-[14px] text-[var(--mute)]">
                    Total Users
                  </h4>
                  <p className="text-[20px] font-bold">
                    {deshbordData?.totalUsers || 0}
                  </p>
                  <Link
                    to={`/admin/users`}
                    className="flex gap-1 items-center text-[var(--primary)] text-[14px]"
                  >
                    View Users <ArrowRight size={15} />
                  </Link>
                </div>
              </div>
              <div className="flex gap-4 items-center bg-white shadow-xl rounded-md px-4 py-2">
                <div className=" bg-yellow-100 p-2 rounded-md">
                  <Users size={30} className="text-yellow-700" />
                </div>
                <div>
                  <h4 className="font-semibold text-[14px] text-[var(--mute)]">
                    Total Block users
                  </h4>
                  <p className="text-[20px] font-bold">
                    {deshbordData?.totalBlockUsers || 0}
                  </p>
                </div>
              </div>
              <div className="flex gap-4 items-center bg-white shadow-xl rounded-md px-4 py-2">
                <div className=" bg-sky-100 p-2 rounded-md">
                  <UserShieldIcon size={30} className="text-sky-700" />
                </div>
                <div>
                  <h4 className="font-semibold text-[14px] text-[var(--mute)]">
                    Total Active users
                  </h4>
                  <p className="text-[20px] font-bold">
                    {deshbordData?.totalUnBlockUsers || 0}
                  </p>
                </div>
              </div>
              <div className="flex gap-4 items-center bg-white shadow-xl rounded-md px-4 py-2">
                <div className=" bg-sky-100 p-2 rounded-md">
                  <NotebookText size={30} />
                </div>
                <div>
                  <h4 className="font-semibold text-[14px] text-[var(--mute)]">
                    Total Complains
                  </h4>
                  <p className="text-[20px] font-bold">
                    {deshbordData?.totalComplains || 0}
                  </p>
                  <Link
                    to={`/admin/complains`}
                    className="flex gap-1 items-center text-[var(--primary)] text-[14px]"
                  >
                    View Comaplins <ArrowRight size={15} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </header>
        <main className="my-10">
          <div className="mx-4 md:mx-10 shadow-md bg-white rounded-sm">
            <div className="flex gap-2 items-center mx-2 py-2">
              <Users size={20} color="green" />
              <h2 className="text-[20px]">Recent Users</h2>
            </div>
            <div className="m-2 grid grid-flow-row gap-4">
              <div className="w-full overflow-x-auto">
                <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm my-4">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                          No
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                          Name
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                          username
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                          Email
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                          Location
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                          Role
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                          CreatedAt
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="relative divide-y divide-gray-200 bg-white">
                      {users.map((user, i) => {
                        return (
                          <>
                            <UserCard
                              user={user}
                              i={i + 1}
                              getDeshbordData={getDeshbordData}
                              key={i}
                            />
                          </>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="mx-8 my-10">
            <h2 className="text-[20px]">Recent Complains</h2>
            <div className="my-2 grid grid-cols-1 gap-2 md:grid-cols-4">
              {comaplain?.map((v, i) => {
                return (
                  <>
                    <ComplainCard
                      key={i}
                      v={v}
                      getDeshbordData={getDeshbordData}
                    />
                  </>
                );
              })}
            </div>
          </div>
        </main>
        <footer className="mt-10">
          <FooterComponent />
        </footer>
      </div>
    </>
  );
}

let UserCard = ({ user, i, getDeshbordData }) => {
  let [showId, setShowId] = useState(null);
  let deleteAccount = async (id) => {
    try {
      let res = await axios.delete(`${api}/user/delete/profile/${id}`, {
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data?.message);
        getDeshbordData();
      } else {
        toast.error(res.data?.message);
      }
    } catch (error) {
      toast.error(error?.response?.data.message);
    }
  };
  let UBAccount = async (id) => {
    try {
      let res = await axios.post(
        `${api}/admin/isBlocked/user/${id}`,
        {},
        {
          withCredentials: true,
        },
      );

      if (res.data.success) {
        toast.success(res.data?.message);
        getDeshbordData();
        setShowId(showId === user._id ? null : user._id);
      } else {
        toast.error(res.data?.message);
      }
    } catch (error) {
      toast.error(error?.response?.data.message);
    }
  };

  return (
    <>
      <tr key={user.id} className="hover:bg-gray-50">
        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
          {i || 0}
        </td>
        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
          {user?.fullName || ""}
        </td>
        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">
          {user?.username || ""}
        </td>
        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">
          {user?.email || ""}
        </td>
        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">
          {user?.location || ""}
        </td>
        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">
          {user?.role || ""}
        </td>
        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">
          {user?.createdAt?.split("T")[0] || ""}
        </td>
        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">
          <span
            className={`${user.isBlocked ? "bg-red-200" : "bg-green-200"} text-black rounded-xl py-2 px-4`}
          >
            {user.isBlocked ? "Blocked" : "Active"}
          </span>
        </td>
        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">
          {showId === user._id ? (
            <>
              <div
                className={`flex gap-2 ${showId === user._id ? "block" : "hidden"}`}
              >
                <MoreVertical
                  size={20}
                  onClick={() =>
                    setShowId(showId === user._id ? null : user._id)
                  }
                  className="cursor-pointer"
                />
                <div className="relative">
                  <div className="absolute">
                    <div
                      onClick={() => deleteAccount(user._id)}
                      className="text-red-700 cursor-pointer"
                    >
                      Delete
                    </div>
                    <div
                      onClick={() => UBAccount(user._id)}
                      className="cursor-pointer"
                    >
                      {user.isBlocked ? "Active" : "Block"}
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <MoreVertical
                size={20}
                onClick={() => setShowId(showId === user._id ? null : user._id)}
                className="cursor-pointer"
              />
            </>
          )}
        </td>
      </tr>
    </>
  );
};

let ComplainCard = ({ v, getDeshbordData }) => {
  let [showReply, setShowReply] = useState(null);
  let [replyInput, setReplyInput] = useState("");
  let [showStatus, setShowStatus] = useState(null);
  let [statusInput, setStatusInput] = useState("");

  let ReplyFormSubmit = async (e, id) => {
    e.preventDefault();
    try {
      let res = await axios.patch(
        `${api}/complain/update/reply/${id}`,
        { adminReply: replyInput },
        {
          withCredentials: true,
        },
      );

      if (res.data.success) {
        toast.success(res?.data?.message);
        getDeshbordData();
        setShowReply(null);
      } else {
        toast.error(res?.data?.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  let StatusFormSubmit = async (e, id) => {
    e.preventDefault();
    try {
      let res = await axios.patch(
        `${api}/complain/update/status/${id}`,
        { status: statusInput },
        {
          withCredentials: true,
        },
      );

      if (res.data.success) {
        toast.success(res?.data?.message);
        getDeshbordData();
        setShowStatus(null);
      } else {
        toast.error(res?.data?.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  let deleteComplain = async (id) => {
    try {
      let res = await axios.delete(`${api}/complain/delete/${id}`, {
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res?.data?.message);
        getDeshbordData();
      } else {
        toast.error(res?.data?.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };
  return (
    <>
      <div className="bg-white shadow-md border border-black p-4 rounded-md text-[14px]">
        <div className="flex justify-between">
          <h3 className="font-semibold text-[16px]">{v?.subject}</h3>
          <div
            className={`${
              v?.status === "Pending"
                ? "bg-sky-100"
                : v?.status === "In Progress"
                  ? "bg-yellow-100"
                  : "bg-green-100"
            } p-1 px-2 rounded-full flex gap-1 items-center`}
          >
            <div>
              {v?.status === "Pending" ? (
                <>
                  <Timer size={15} />
                </>
              ) : (
                <>
                  {v?.status === "In Progress" ? (
                    <>
                      <CircleDashed size={15} />
                    </>
                  ) : (
                    <>
                      <CheckCircle2 size={15} />
                    </>
                  )}
                </>
              )}
            </div>
            <p>{v?.status}</p>
          </div>
        </div>
        <div className="flex gap-1 items-center ">
          <CalendarDays size={15} />
          <p className="text-[12px]">{v?.createdAt?.split("T")[0]}</p>
        </div>
        <div className="my-4">
          <label className="font-semibold text-gray-700">Message</label>
          <p>{v?.message}</p>
        </div>
        <div>
          <label className="font-semibold text-gray-700">Reply</label>
          <p>{v?.adminReply}</p>
        </div>
        <div className="mt-4">
          <h2 className="font-semibold">Update</h2>
          <div className="grid grid-cols-3 gap-2 py-2">
            <div
              onClick={() => setShowReply(showReply === v._id ? null : v._id)}
              className="bg-green-100 py-1 cursor-pointer flex flex-col items-center rounded-md"
            >
              <Send size={20} color="green" />
              <p>Reply</p>
            </div>
            <div
              onClick={() => setShowStatus(showStatus === v._id ? null : v._id)}
              className="bg-green-100 py-1 cursor-pointer flex flex-col items-center rounded-md"
            >
              <Edit3 size={20} color="green" />
              <p>Status</p>
            </div>
            <div
              onClick={() => deleteComplain(v._id)}
              className="bg-red-100 py-1 cursor-pointer flex flex-col items-center rounded-md"
            >
              <BookmarkX color="red" size={20} />
              <p>Delete</p>
            </div>
            {showReply === v._id ? (
              <>
                <div className="col-span-3">
                  <form
                    onSubmit={(e) => ReplyFormSubmit(e, v._id)}
                    className="flex flex-row items-center"
                  >
                    <input
                      value={replyInput}
                      onChange={(e) => setReplyInput(e.target.value)}
                      type="text"
                      placeholder="Enter your message"
                      className="border border-green-700 p-2 rounded-md outline-none"
                    />
                    <button
                      type="submit"
                      className="bg-green-100 p-2 cursor-pointer mx-2 rounded-md"
                    >
                      <Send size={20} color="green" />
                    </button>
                  </form>
                </div>
              </>
            ) : (
              <></>
            )}

            {showStatus === v._id ? (
              <>
                <div className="col-span-3">
                  <form
                    onSubmit={(e) => StatusFormSubmit(e, v._id)}
                    className="flex flex-row items-center"
                  >
                    <select
                      value={statusInput}
                      onChange={(e) => setStatusInput(e.target.value)}
                      className="outline-none border border-green-700 px-2 py-1 rounded-md"
                    >
                      <option value="">Select status</option>
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Resolved">Resolved</option>
                    </select>
                    <button
                      type="submit"
                      className="bg-green-100 p-2 cursor-pointer mx-2 rounded-md"
                    >
                      <Edit3 size={20} color="green" />
                    </button>
                  </form>
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
