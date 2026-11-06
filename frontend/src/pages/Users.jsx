import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import agriPhoto from "../image/agriPhoto.png";
import { MoreVertical, Search, UsersIcon, X } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import api from "../app/api";

export default function Users() {
  let [users, setUsers] = useState([]);
  let [userData, setUserData] = useState({});
  let [input, setInput] = useState("");
  let [nameCross, setNameCross] = useState(false);

  let [busers, setBUsers] = useState("");
  let [busersCross, setBUsersCross] = useState(false);

  let getUsersData = async () => {
    try {
      let res = await axios.get(`${api}/admin/findAll/user`, {
        withCredentials: true,
      });

      if (res.data.success) {
        setUsers(res.data.users);
      } else {
        toast.error(res.data?.message);
      }
    } catch (error) {
      toast.error(error?.response?.data.message);
    }
  };

  let getUsersPageData = async () => {
    try {
      let res = await axios.get(`${api}/admin/find/user/data`, {
        withCredentials: true,
      });

      setUserData(res.data.usersDatas);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  let findByusername = async (e) => {
    e.preventDefault();

    try {
      let res = await axios.post(
        `${api}/admin/find/user`,
        { username: input, email: input },
        {
          withCredentials: true,
        },
      );

      if (res.data.success) {
        setUsers(res.data.user);
        setNameCross(true);
      } else {
        toast.error(res?.data?.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  let nameCrossBtn = (e) => {
    e.preventDefault();
    setNameCross(false);
    setInput("");
    getUsersData();
    getUsersPageData();
  };

  let findBUUsersName = async (e) => {
    e.preventDefault();

    try {
      let res = await axios.post(
        `${api}/admin/find/buser`,
        { busers },
        {
          withCredentials: true,
        },
      );

      if (res.data.success) {
        setUsers(res.data.user);
        setBUsersCross(true);
      } else {
        toast.error(res?.data?.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };
  let busersCrossBtn = (e) => {
    e.preventDefault();
    setBUsersCross(false);
    setBUsers("");
    getUsersData();
    getUsersPageData();
  };

  useEffect(() => {
    getUsersData();
    getUsersPageData();
  }, []);

  return (
    <>
      <div>
        <div className="fixed top-0 w-screen z-40">
          <Navbar />
        </div>
        <div className="mt-16 relative">
          <header className="mt-14 relative">
            <div>
              <div className="h-[20vh] md:h-[30vh] w-full -z-20 overflow-hidden">
                <img
                  src={agriPhoto}
                  alt="agri"
                  className="block object-cover h-full w-full"
                />
                <div className="absolute top-2 left-4 md:left-16 h-[180px] w-[230px] md:w-[400px] bg-white blur-xl md:blur-2xl z-0"></div>
              </div>
              <div className="absolute top-14 left-5 md:left-20">
                <div className="flex flex-col gap-4">
                  <h2 className="font-bold text-[30px]">Users Tracking</h2>
                  <p className="w-[300px] md:w-[400px]">
                    Manage users, assign roles, and control access to your farm
                    management system.
                  </p>
                </div>
              </div>
            </div>
          </header>
          <main>
            <div className="relative m-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                <div className="flex gap-4 items-center bg-white shadow-md m-2 p-4 rounded-md shadow-[var(--color-1)]">
                  <div className="bg-green-200 p-2 rounded-md">
                    <UsersIcon size={30} color="green" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[14px] text-[var(--mute)]">
                      Total Users
                    </h4>
                    <p className="text-[20px] font-bold">
                      {userData?.totalUsers || 0}
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 items-center bg-white shadow-md m-2 p-4 rounded-md shadow-[var(--color-1)]">
                  <div className="bg-red-200 p-2 rounded-md">
                    <UsersIcon size={30} color="red" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[14px] text-[var(--mute)]">
                      Total Block Users
                    </h4>
                    <p className="text-[20px] font-bold">
                      {userData?.totalBlockUsers || 0}
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 items-center bg-white shadow-md m-2 p-4 rounded-md shadow-[var(--color-1)]">
                  <div className="bg-sky-200 p-2 rounded-md">
                    <UsersIcon size={30} className="text-sky-700" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[14px] text-[var(--mute)]">
                      Total Active Users
                    </h4>
                    <p className="text-[20px] font-bold">
                      {userData?.totalUnBlockUsers || 0}
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 items-center bg-white shadow-md m-2 p-4 rounded-md shadow-[var(--color-1)]">
                  <div className="bg-green-200 p-2 rounded-md">
                    <UsersIcon size={30} color="green" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[14px] text-[var(--mute)]">
                      Total Farmers
                    </h4>
                    <p className="text-[20px] font-bold">
                      {userData?.totalFarmers || 0}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mx-4 md:mx-10 my-4 shadow-md bg-white rounded-sm">
              <div className="grid grid-cols-2 gap-2 mx-10 my-4">
                <div>
                  <form onSubmit={findByusername} className="flex gap-1">
                    <div className="relative">
                      <UsersIcon
                        size={20}
                        color="green"
                        className="absolute left-3 text-[16px] top-1/2 -translate-y-1/2 text-[var(--mute)]"
                      />
                      <input
                        className="inputBox"
                        name="input"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="username & email"
                      />
                    </div>
                    {nameCross ? (
                      <>
                        <button onClick={nameCrossBtn}>
                          <X color="red" />
                        </button>
                      </>
                    ) : (
                      <>
                        <button type="submit">
                          <Search color="green" />
                        </button>
                      </>
                    )}
                  </form>
                </div>
                <div>
                  <form onSubmit={findBUUsersName} className="flex gap-1">
                    <div className="relative">
                      <UsersIcon
                        size={20}
                        color="green"
                        className="absolute left-3 text-[16px] top-1/2 -translate-y-1/2 text-[var(--mute)]"
                      />
                      <select
                        className="inputBox"
                        name="busers"
                        value={busers}
                        onChange={(e) => setBUsers(e.target.value)}
                      >
                        <option value="">Fillter by user</option>
                        <option value="Active">Active</option>
                        <option value="Block">Block</option>
                      </select>
                    </div>
                    {busersCross ? (
                      <>
                        <button onClick={busersCrossBtn}>
                          <X color="red" />
                        </button>
                      </>
                    ) : (
                      <>
                        <button type="submit">
                          <Search color="green" />
                        </button>
                      </>
                    )}
                  </form>
                </div>
              </div>
              <div className="flex gap-2 items-center mx-2 py-2">
                <UsersIcon size={20} color="green" />
                <h2 className="text-[20px]">Users</h2>
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
                                getUsersData={getUsersData}
                                getUsersPageData={getUsersPageData}
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
      </div>
    </>
  );
}

let UserCard = ({ user, i, getUsersData, getUsersPageData }) => {
  let [showId, setShowId] = useState(null);
  let deleteAccount = async (id) => {
    try {
      let res = await axios.delete(`${api}/user/delete/profile/${id}`, {
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data?.message);
        getUsersData();
        getUsersPageData();
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
        getUsersData();
        getUsersPageData();
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
