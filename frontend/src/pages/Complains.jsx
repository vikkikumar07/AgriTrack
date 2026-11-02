import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import agriPhoto from "../image/agriPhoto.png";
import {
  BookmarkX,
  BuildingComplex,
  CalendarDays,
  CheckCircle2,
  CircleDashed,
  Edit,
  Loader2,
  LucideMessagesSquare,
  NotebookText,
  Send,
  Timer,
} from "lucide-react";
import { toast } from "react-toastify";
import axios from "axios";
import api from "../app/api";
import { useParams } from "react-router-dom";

export default function Complains() {
  let { id } = useParams();
  let [loading, setLoading] = useState(false);
  let [complains, setComplains] = useState([]);
  let [input, setInput] = useState({
    subject: "",
    message: "",
  });
  let setData = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  let getComplains = async () => {
    try {
      let res = await axios.get(`${api}/complain/find/${id}`, {
        withCredentials: true,
      });

      if (res.data.success) {
        setComplains(res.data?.complains);
      } else {
        toast.error(res?.data?.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  let clearInputBox = () => {
    setInput({
      subject: "",
      message: "",
    });
  };

  let submitForm = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      let res = await axios.post(`${api}/complain/create`, input, {
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res?.data?.message);
        getComplains();
        clearInputBox();
      } else {
        toast.error(res?.data?.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getComplains();
  }, [id]);
  return (
    <>
      <div>
        <div className="fixed top-0 w-screen z-40">
          <Navbar />
        </div>
        <header className="mt-14 relative">
          <div className="h-[25vh] w-full -z-20 overflow-hidden">
            <img
              src={agriPhoto}
              alt="agri"
              className="block object-cover h-full w-full"
            />
            <div className="absolute top-2 left-4 md:left-16 h-[180px] w-[230px] md:w-[400px] bg-white blur-xl md:blur-2xl z-0"></div>
          </div>
          <div className="absolute top-14 left-5 md:left-14">
            <div className="flex flex-row items-center gap-4">
              <div className="bg-green-100 p-2 rounded-md border border-green-700">
                {" "}
                <BuildingComplex color="green" size={30} />{" "}
              </div>
              <div>
                <h3 className="font-bold text-[20px]">Complain / Support</h3>
                <p className="text-[14px] w-[200px] md:w-full">
                  Faching any issue? Raise a complain and our team <br /> will
                  help you soon.
                </p>
              </div>
            </div>
          </div>
        </header>
        <main className="grid grid-rows-1 pb-5 md:grid-cols-3 bg-sky-50">
          <div className="md:row-start-1 md:col-span-1 m-4">
            <div className="h-auto shadow-md p-3 rounded-md bg-white">
              <div className="flex gap-2 items-center my-2">
                <Edit size={30} className="bg-green-100 m-2 rounded-md p-1" />
                <h2 className="font-bold text-[16px]">Raise a Complain</h2>
              </div>
              <form onSubmit={submitForm} className="text-[14px]">
                <div className="my-2">
                  <label className="font-semibold">
                    Subject <sup className="text-red-600">* </sup>{" "}
                  </label>
                  <div className="relative">
                    <LucideMessagesSquare
                      size={15}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--mute)]"
                    />
                    <input
                      className="inputBox"
                      type="text"
                      name="subject"
                      value={input.subject}
                      onChange={setData}
                      placeholder="Enter your subject"
                    />
                  </div>
                </div>
                <div className="my-2">
                  <label className="font-semibold">
                    Message <sup className="text-red-600">* </sup>
                  </label>
                  <div className="relative">
                    <NotebookText
                      size={15}
                      className="absolute left-3 top-5 -translate-y-1/2 text-[var(--mute)]"
                    />
                    <textarea
                      className=" w-full outline-none border-2 rounded-md mt-1 pl-10 pr-3 py-2 md:py-1 placeholder:text-[14px] text-[16px] md:text-[13px]"
                      type="text"
                      rows={5}
                      name="message"
                      value={input.message}
                      onChange={setData}
                      placeholder="Enter your message"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="py-2 rounded-md w-full bg-[var(--primary)] hover:bg-[var(--secondary)] text-white my-1 px-0 flex gap-1 justify-center items-center"
                >
                  {loading ? (
                    <>
                      <Loader2 size={15} className="animate-spin" />
                    </>
                  ) : (
                    <></>
                  )}
                  <Send size={15} /> Submit Complain
                </button>
              </form>
            </div>
          </div>
          <div className="row-start-1 md:col-span-2 mt-5 mx-5 bg-white p-5 rounded-md shadow-lg">
            <div className="flex gap-2 items-center mb-4">
              <span className="p-2 bg-green-100 rounded-md">
                <NotebookText size={20} color="green" />
              </span>
              <h3 className="font-semibold">My Complains</h3>
            </div>
            <div className="grid grid-cols-1 h-[400px] gap-2 md:grid-cols-2 overflow-x-hidden overflow-y-auto">
              {complains.map((v, i) => {
                return (
                  <>
                    <div key={i} className="h-auto">
                      <ComplainsCard v={v} getComplains={getComplains} />
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

let ComplainsCard = ({ v, getComplains }) => {
  let deleteExpenses = async (id) => {
    try {
      let res = await axios.delete(`${api}/complain/delete/${id}`, {
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res?.data?.message);
        getComplains();
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
            className={`${v?.status === "Pending" ? "bg-sky-100" : <> ${v?.status === "In Progress" ? "bg-yellow-100" : "bg-green-100"} </>} p-1 px-2 rounded-full flex gap-1 items-center`}
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

        <div className="relative mt-10">
          <div className="group absolute bottom-0 right-0 flex flex-col items-center justify-center">
            <span className="pointer-events-none absolute right-0 top-full z-10 mt-1 whitespace-nowrap rounded-md bg-red-600 p-1 text-[14px] text-white hidden group-hover:block">
              Delete Complain
            </span>

            <BookmarkX
              color="red"
              size={20}
              onClick={() => deleteExpenses(v._id)}
              className="mx-auto cursor-pointer"
            />
          </div>
        </div>
      </div>
    </>
  );
};
