import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import agriPhoto from "../image/agriPhoto.png";
import {
  BookmarkX,
  CalendarDays,
  CheckCircle2,
  CircleDashed,
  Edit3,
  NotebookText,
  Search,
  Send,
  Timer,
  X,
} from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import api from "../app/api";

export default function AllComplains() {
  let [complainData, setComplainData] = useState({});
  let [complains, setComplains] = useState([]);
  let [input, setStatusInput] = useState("");
  let [crossSearch, setCrossSearch] = useState(false);

  let getAllComplains = async () => {
    try {
      let res = await axios.get(`${api}/complain/findAll`, {
        withCredentials: true,
      });

      setComplains(res.data.complains);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  let getPageComplainsData = async () => {
    try {
      let res = await axios.get(`${api}/complain/find/complain/data`, {
        withCredentials: true,
      });

      setComplainData(res.data.complainsData);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  let findStatusComaplins = async (e) => {
    e.preventDefault();

    try {
      let res = await axios.post(
        `${api}/complain/search/status`,
        { input },
        {
          withCredentials: true,
        },
      );
      if (res.data.success) {
        setComplains(res.data.complains);
        toast.success(res.data.message);
        setCrossSearch(true);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  let searchCrossBtn = (e) => {
    e.preventDefault();
    setCrossSearch(false);
    setStatusInput("");
    getAllComplains();
  };

  useEffect(() => {
    getAllComplains();
    getPageComplainsData();
  }, []);
  return (
    <>
      <div>
        <div className="fixed top-0 w-screen z-40">
          <Navbar />
        </div>
        <div>
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
                  <h2 className="font-bold text-[30px]">Complains Tracking</h2>
                  <p className="w-[300px] md:w-[400px]">
                    Manage Complain, Reply, and control access to status
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
                    <NotebookText size={30} color="green" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[14px] text-[var(--mute)]">
                      Total Complains
                    </h4>
                    <p className="text-[20px] font-bold">
                      {complainData?.totalComplains || 0}
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 items-center bg-white shadow-md m-2 p-4 rounded-md shadow-[var(--color-1)]">
                  <div className="bg-red-200 p-2 rounded-md">
                    <NotebookText size={30} color="red" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[14px] text-[var(--mute)]">
                      Total Pending Complains
                    </h4>
                    <p className="text-[20px] font-bold">
                      {complainData?.totalPendingComplains || 0}
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 items-center bg-white shadow-md m-2 p-4 rounded-md shadow-[var(--color-1)]">
                  <div className="bg-sky-200 p-2 rounded-md">
                    <NotebookText size={30} className="text-sky-700" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[14px] text-[var(--mute)]">
                      Total In Progres Complains
                    </h4>
                    <p className="text-[20px] font-bold">
                      {complainData?.totalInProgressComplains || 0}
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 items-center bg-white shadow-md m-2 p-4 rounded-md shadow-[var(--color-1)]">
                  <div className="bg-green-200 p-2 rounded-md">
                    <NotebookText size={30} color="green" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[14px] text-[var(--mute)]">
                      Total Resolve Complains
                    </h4>
                    <p className="text-[20px] font-bold">
                      {complainData?.totalResolvedComplains || 0}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="m-4">
              <div className="flex justify-between">
                <h2 className="font-semibold text-[20px] my-4">Complains</h2>
                <div>
                  <form onSubmit={findStatusComaplins} className="flex gap-1">
                    <div className="relative">
                      <NotebookText
                        size={20}
                        color="green"
                        className="absolute left-3 text-[16px] top-1/2 -translate-y-1/2 text-[var(--mute)]"
                      />
                      <select
                        className="inputBox"
                        name="input"
                        value={input}
                        onChange={(e) => setStatusInput(e.target.value)}
                      >
                        <option value="">Fillter by status</option>
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Resolved">Resolved</option>
                      </select>
                    </div>
                    {crossSearch ? (
                      <>
                        <button onClick={searchCrossBtn}>
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
              <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                {complains?.map((v, i) => {
                  return (
                    <>
                      <ComplainCard
                        key={i}
                        v={v}
                        getAllComplains={getAllComplains}
                      />
                    </>
                  );
                })}
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

let ComplainCard = ({ v, getAllComplains }) => {
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
        getAllComplains();
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
        getAllComplains();
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
        getAllComplains();
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
          <label className="font-semibold text-gray-700">username</label>
          <p>{v?.userId?.username}</p>
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
