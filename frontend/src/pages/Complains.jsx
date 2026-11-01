import React, { useState } from "react";
import Navbar from "../components/Navbar";
import agriPhoto from "../image/agriPhoto.png";
import {
  BuildingComplex,
  CalendarDays,
  CheckCircle2,
  Edit,
  Loader2,
  LucideMessagesSquare,
  NotebookText,
  Send,
} from "lucide-react";
import { toast } from "react-toastify";
import axios from "axios";
import api from "../app/api";

export default function Complains() {
  let [loading, setLoading] = useState(false);
  let [input, setInput] = useState({
    subject: "",
    message: "",
  });
  let setData = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
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
  return (
    <>
      <div>
        <div className="fixed top-0 w-screen z-40">
          <Navbar />
        </div>
        <header className="mt-14 relative">
          <div className="h-[30vh] w-full -z-20 overflow-hidden">
            <img
              src={agriPhoto}
              alt="agri"
              className="block object-cover h-full w-full"
            />
            <div className="absolute top-2 left-4 md:left-16 h-[200px] w-[230px] md:h-[200px] md:w-[400px] bg-white blur-xl md:blur-2xl z-0"></div>
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
          <div className="md:row-start-1 md:col-span-1 m-4 shadow-md p-3 bg-white rounded-md">
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
          <div className="row-start-1 md:col-span-2 mt-5 mx-5 bg-white p-5 rounded-md shadow-lg">
            <div className="flex gap-2 items-center mb-4">
              <span className="p-2 bg-green-100 rounded-md">
                <NotebookText size={20} color="green" />
              </span>
              <h3 className="font-semibold">My Complains</h3>
            </div>
            <div className="grid grid-cols-1 h-[300px] gap-2 md:grid-cols-2 overflow-x-hidden overflow-y-auto">
              <ComplainsCard />
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

let ComplainsCard = () => {
  return (
    <>
      <div className="bg-white shadow-md border p-4 rounded-md text-[14px]">
        <div className="flex justify-between">
          <h3 className="font-semibold text-[16px]">Subject</h3>
          <div
            className={`bg-green-200 p-1 rounded-full flex gap-1 items-center`}
          >
            <div>
              <CheckCircle2 size={15} />
            </div>
            <p>Resolve</p>
          </div>
        </div>
        <div className="flex gap-1 items-center ">
          <CalendarDays size={15} />
          <p className="text-[12px]">2002-07-01</p>
        </div>
        <div className="my-2">
          <label className="font-semibold">Message</label>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit aut
            debitis quam error recusandae assumenda eaque voluptas blanditiis
            libero voluptatem? Doloribus neque, ad exercitationem molestiae cum
            atque eaque nobis eligendi!
          </p>
        </div>
        <div>
          <label className="font-semibold">Reply</label>
          <p>----</p>
        </div>
      </div>
    </>
  );
};
