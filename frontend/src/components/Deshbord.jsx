import React, { useEffect, useState } from "react";
import homePage from "../image/home_page_2.png";
import { useSelector } from "react-redux";
import {
  ArrowRight,
  MoreVertical,
  NotebookText,
  Sun,
  Users,
  UserShieldIcon,
} from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";
import api from "./../app/api";
import { toast } from "react-toastify";

export default function Deshbord() {
  let user = useSelector((state) => state.user.user);
  let [deshbordData, setDeshbordData] = useState({});
  let [users, setUsers] = useState([]);

  let getDeshbordData = async () => {
    try {
      let res = await axios.get(`${api}/admin/find/deshbord/data`, {
        withCredentials: true,
      });

      setDeshbordData(res.data?.DeshbordDatas);
      setUsers(res.data?.DeshbordDatas?.recentUsers);
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
                    Total Unblock users
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
        <main className="my-4">
          <div className="hidden md:block mx-10 shadow-md bg-white rounded-sm">
            <div className="flex gap-2 items-center mx-2 py-2">
              <Users size={20} color="green" />
              <h2 className="text-[20px]">Recent Users</h2>
            </div>
            <div className="m-2 grid grid-flow-row gap-4">
              <div>
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
                          Role
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
        </main>
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
          {user?.role || ""}
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
