import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import {
  AreaChart,
  BadgeQuestionMark,
  BaggageClaim,
  BookmarkX,
  CalendarDays,
  CalendarDaysIcon,
  Database,
  IndianRupee,
  Leaf,
  Loader2,
  NotebookPen,
  NotebookText,
  PlusSquareIcon,
  Search,
  Wheat,
  X,
} from "lucide-react";
import axios from "axios";
import api from "../app/api";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

export default function Expenses() {
  let { id } = useParams();
  let [show, setShow] = useState(false);
  let [expenses, setExpenses] = useState([]);
  let [farm, setFarm] = useState([]);
  let [loading, setLoading] = useState(false);

  let [crop, setCrop] = useState("");
  let [category, setCategory] = useState("");
  let [cropCross, setCropCross] = useState(false);
  let [categoryCross, setCategoryCross] = useState(false);

  let [data, setData] = useState({
    crop: "",
    category: "",
    date: "",
    quantity: "",
    unit: "",
    rate: "",
    amount: "",
    description: "",
  });

  let totalExpenses = expenses.length || 0;
  let totalFarm = farm.length || 0;

  let getAllExpenses = async () => {
    try {
      let res = await axios.get(`${api}/farmer/expenses/getAll`, {
        withCredentials: true,
      });

      if (res.data.success) {
        setExpenses(res.data.allExpenses);
      } else {
        toast.error(res?.data?.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  let getCrop = async () => {
    try {
      let res = await axios.get(`${api}/farmer/gets/farms/${id}`, {
        withCredentials: true,
      });
      setFarm(res.data.allTasks);
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  const categories = [
    "Seeds",
    "Fertilizer",
    "Pesticide",
    "Labour",
    "Irrigation",
    "Electricity",
    "Diesel",
    "Machinery",
    "Transport",
    "Other",
  ];
  let setFormData = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  let submitForm = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      let res = await axios.post(
        `${api}/farmer/expenses/${data.crop}/create`,
        data,
        {
          withCredentials: true,
        },
      );

      if (res.data.success) {
        toast.success(res?.data?.message);
        setShow(false);
        getAllExpenses();
        clearForm();
      } else {
        toast.error(res?.data?.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };
  let clearForm = (e) => {
    e.preventDefault();
    setData({
      crop: "",
      category: "",
      date: "",
      quantity: "",
      unit: "",
      rate: "",
      amount: "",
      description: "",
    });
  };

  let findCropName = async (e) => {
    e.preventDefault();

    try {
      let res = await axios.get(`${api}/farmer/expenses/${crop}/get`, {
        withCredentials: true,
      });

      if (res.data.success) {
        setExpenses(res.data.expensesDetials);
        setCropCross(true);
      } else {
        toast.error(res?.data?.message);
        setCrop("");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
      setCrop("");
    }
  };

  let findCategoryName = async (e) => {
    e.preventDefault();

    try {
      let res = await axios.post(
        `${api}/farmer/expenses/category/get`,
        { category },
        {
          withCredentials: true,
        },
      );

      if (res.data.success) {
        setExpenses(res.data.expensesDetials);
        setCategoryCross(true);
      } else {
        toast.error(res?.data?.message);
        setCategory("");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
      setCategory("");
    }
  };

  let cropCrossBtn = (e) => {
    e.preventDefault();
    setCropCross(false);
    setCrop("");
    getAllExpenses();
  };

  let categoryCrossBtn = (e) => {
    e.preventDefault();
    setCategoryCross(false);
    setCategory("");
    getAllExpenses();
  };

  useEffect(() => {
    getAllExpenses();
    getCrop();
  }, []);
  return (
    <>
      <div>
        <div className="fixed top-0 w-screen z-40">
          <Navbar />
        </div>
        <div className="mt-20 mb-10">
          <div className="px-4 grid grid-cols-2 gap-1 md:gap-2">
            <div className="flex flex-col items-center gap-1 py-2 bg-green-200 rounded-md">
              <p className="font-bold text-[18px]">{totalExpenses}</p>
              <h5 className="font-bold text-[var(--primary)]">
                Total Expenses
              </h5>
            </div>
            <div className="flex flex-col items-center gap-1 py-2 bg-blue-200 rounded-md">
              <p className="font-bold text-[18px]">{totalFarm}</p>
              <h5 className="font-bold ">Total Crop</h5>
            </div>
          </div>
        </div>
        <div>
          <div className="flex gap-4 border shadow-md sticky top-15 p-4 rounded-md justify-between mx-10">
            <div className="flex-1">
              <form onSubmit={findCropName} className="flex gap-1">
                <div className="relative">
                  <Wheat
                    size={20}
                    color="green"
                    className="absolute left-3 text-[16px] top-1/2 -translate-y-1/2 text-[var(--mute)]"
                  />
                  <select
                    className="inputBox"
                    name="crop"
                    value={crop}
                    onChange={(e) => setCrop(e.target.value)}
                  >
                    <option value={"Other"}>Fillter crop name</option>
                    {farm.map((v, i) => {
                      return (
                        <>
                          <option key={i} value={v?._id || ""}>
                            {v?.crop || ""}
                          </option>
                        </>
                      );
                    })}
                  </select>
                </div>
                {cropCross ? (
                  <>
                    <button onClick={cropCrossBtn}>
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
            <div className="flex-1">
              <form className="flex gap-1" onSubmit={findCategoryName}>
                <div className="relative">
                  <Database
                    color="green"
                    size={20}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--mute)]"
                  />
                  <select
                    className="inputBox"
                    name="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option>Fillter category name</option>
                    {categories.map((v, i) => {
                      return (
                        <>
                          <option key={i} value={v}>
                            {v || ""}
                          </option>
                        </>
                      );
                    })}
                  </select>
                </div>
                {categoryCross ? (
                  <>
                    <button onClick={categoryCrossBtn}>
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
              <div
                onClick={() => setShow(!show)}
                className="flex gap-2 items-center text-[14px] bg-[var(--primary)] hover:bg-[var(--secondary)] text-white p-2 rounded-md cursor-pointer"
              >
                <PlusSquareIcon size={20} />
                <p>Add Expenses</p>
              </div>
            </div>
          </div>
          <div className="m-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {expenses.map((v, i) => {
                return (
                  <div key={i}>
                    <ExpensesCard v={v} getAllExpenses={getAllExpenses} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="relative w-full"></div>
        {show ? (
          <>
            <div className="absolute top-20 w-[90%] md:w-[80%] left-[5%] md:left-[10%]  z-10">
              <div
                className={`absolute top-10 w-[100%] md:w-[80%] left-0 md:left-1/2 md:-translate-x-1/2 z-10 ${show ? "block" : "hidden"}`}
              >
                <div className="relative h-auto pb-10 md:h-[400px] w-full bg-white mx-auto shadow-sm shadow-black rounded-md">
                  <div className="relative h-1">
                    <X
                      size={20}
                      className="cursor-pointer absolute right-4 top-2 text-red-600"
                      onClick={() => setShow(!show)}
                    />
                  </div>
                  <h2 className="text-center text-[25px] font-semibold my-2 text-[var(--primary)]">
                    Add Expenses
                  </h2>
                  <div className="px-4 my-4">
                    <form onSubmit={submitForm}>
                      <div className="grid grid-cols-1 md:grid-cols-2  md:gap-4">
                        <div>
                          <div className="my-2">
                            <label>Crop Name</label>
                            <div className="relative">
                              <Leaf
                                size={15}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--mute)]"
                              />
                              <select
                                className="inputBox"
                                name="crop"
                                value={data.crop}
                                onChange={setFormData}
                              >
                                <option value={"Other"}>Select Crop</option>
                                {farm.map((v, i) => {
                                  return (
                                    <>
                                      <option key={i} value={v?._id || ""}>
                                        {v?.crop || ""}
                                      </option>
                                    </>
                                  );
                                })}
                              </select>
                            </div>
                          </div>
                          <div className="my-2">
                            <label>Category</label>
                            <div className="relative">
                              <BaggageClaim
                                size={15}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--mute)]"
                              />
                              <select
                                className="inputBox"
                                name="category"
                                value={data.category}
                                onChange={setFormData}
                              >
                                <option value={"Other"}>Select category</option>
                                {categories.map((v, i) => {
                                  return (
                                    <>
                                      <option key={i} value={v}>
                                        {v}
                                      </option>
                                    </>
                                  );
                                })}
                              </select>
                            </div>
                          </div>
                          <div className="my-2">
                            <label>Buy Date</label>
                            <div className="relative">
                              <CalendarDays
                                size={15}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--mute)]"
                              />
                              <input
                                className="inputBox"
                                name="date"
                                value={data.date}
                                onChange={setFormData}
                                type="date"
                              />
                            </div>
                          </div>
                          <div className="my-2 ">
                            <label>Quantity</label>
                            <div className="relative">
                              <BadgeQuestionMark
                                size={15}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--mute)]"
                              />
                              <div className="flex items-center bg-white border-2 rounded-md">
                                <input
                                  className="w-full outline-none rounded-md pl-10 pr-3 py-2 placeholder:text-[14px] text-[16px] md:text-[13px] "
                                  name="quantity"
                                  value={data.quantity}
                                  onChange={setFormData}
                                  type="number"
                                  placeholder="Enter your product quantity"
                                />
                                <div>
                                  <select
                                    name="unit"
                                    value={data.unit}
                                    onChange={setFormData}
                                    className="py-1 rounded-md text-center bg-white outline-none"
                                  >
                                    <option>Unit</option>
                                    <option value={"g"}>g</option>
                                    <option value={"Kg"}>Kg</option>
                                    <option value={"Quintal"}>Quintal</option>
                                    <option value={"L"}>L</option>
                                    <option value={"Other"}>Other</option>
                                  </select>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div>
                          <div className="my-2">
                            <label>Price</label>
                            <div className="relative">
                              <IndianRupee
                                size={15}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--mute)]"
                              />
                              <input
                                className="inputBox"
                                name="rate"
                                value={data.rate}
                                onChange={setFormData}
                                type="number"
                                placeholder="Enter product price"
                              />
                            </div>
                          </div>
                          <div className="my-2">
                            <label>Amount</label>
                            <div className="relative">
                              <IndianRupee
                                size={15}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--mute)]"
                              />
                              <input
                                className="inputBox"
                                name="amount"
                                value={data.amount}
                                onChange={setFormData}
                                type="number"
                                placeholder="Enter expenses amount"
                              />
                            </div>
                          </div>
                          <div className="my-2">
                            <label>Description</label>
                            <div className="relative">
                              <NotebookPen
                                size={15}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--mute)]"
                              />
                              <input
                                className="w-full outline-none border-2 rounded-md pl-10 pr-3 py-2 placeholder:text-[14px] text-[16px] md:text-[13px] "
                                name="description"
                                value={data.description}
                                onChange={setFormData}
                                type="text"
                                placeholder="Enter description"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="absolute bottom-2 md:bottom-0 md:right-2 flex gap-2 my-2">
                        <button
                          onClick={clearForm}
                          className="btn hover:bg-[var(--color-1)]"
                        >
                          Clear
                        </button>
                        <button
                          type="submit"
                          className="btn bg-[var(--primary)] hover:bg-[var(--secondary)] text-white flex gap-1 justify-center"
                        >
                          {loading ? (
                            <>
                              <Loader2 size={15} className="animate-spin" />
                            </>
                          ) : (
                            <></>
                          )}
                          Create
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}

let ExpensesCard = ({ v, getAllExpenses }) => {
  let deleteExpenses = async (id) => {
    try {
      let res = await axios.delete(`${api}/farmer/expenses/${id}/delete`, {
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        getAllExpenses();
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <>
      {v !== null ? (
        <>
          <div className="col-span-1 shadow-sm shadow-black h-auto py-5 rounded-md bg-white px-4">
            <div className="flex justify-between">
              <div className="flex gap-4 items-center">
                <div className="bg-violet-100 p-2 rounded-md">
                  <Database size={25} className="text-violet-700" />
                </div>
                <h2 className="text-left font-semibold text-[20px]">
                  {v?.category}
                </h2>
              </div>
              <div>
                <div className="flex gap-2 items-center bg-green-50 px-2 rounded-md">
                  <div className="flex gap-1 items-center mt-2">
                    <CalendarDaysIcon size={20} color="green" />
                  </div>
                  <div>
                    <span className="text-[14px]">Created At</span>
                    <div className="text-[14px] font-semibold ">
                      {v?.createdAt.split("T")[0] || "0000-00-00"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-center font-semibold text-green-600 text-[16px]">
                {v?.cropId?.crop || ""} Farming
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-1 md:gap-2 my-4">
              <div className="flex gap-4 items-center px-2 py-2 bg-green-100 rounded-md">
                <AreaChart size={30} color="green" />
                <div>
                  <h4 className="text-[14px]">Quantity</h4>
                  <p className="text-[14px] font-semibold text-green-700">
                    {v?.quantity || 0}
                    {v?.unit || "g"}
                  </p>
                </div>
              </div>
              <div className="flex gap-4 items-center px-2 py-2 bg-yellow-100 rounded-md">
                <IndianRupee size={30} className="text-yellow-700" />
                <div>
                  <h4 className="text-[14px]">Rate</h4>
                  <p className="text-[14px] font-semibold">
                    {v?.rate || 0}/ Kg
                  </p>
                </div>
              </div>
              <div className="flex gap-4 items-center px-2 py-2 bg-sky-100 rounded-md">
                <CalendarDaysIcon size={30} className="text-sky-700" />
                <div>
                  <h4 className="text-[14px]">Date</h4>
                  <p className="text-[14px] font-semibold">
                    {v?.date.split("T")[0] || "0000-00-00"}
                  </p>
                </div>
              </div>
              <div className="flex gap-4 items-center px-2 py-2 bg-violet-100 rounded-md">
                <IndianRupee size={30} className="text-violet-700" />
                <div>
                  <h4 className="text-[14px]">Amount</h4>
                  <p className="text-[14px] font-semibold">{v?.amount || 0}</p>
                </div>
              </div>
            </div>
            <div className="flex gap-4 h-auto items-center px-2 py-2 bg-violet-100 rounded-md">
              <NotebookText size={30} className="text-violet-700" />
              <div>
                <h4 className="text-[14px]">Decription</h4>
                <p className="text-[14px] font-semibold">
                  {v?.description || "No description"}
                </p>
              </div>
            </div>
            <div className="relative mt-10">
              <div className="group absolute bottom-0 right-0 flex flex-col items-center justify-center">
                <span className="pointer-events-none absolute right-0 top-full z-10 mt-1 whitespace-nowrap rounded-md bg-red-600 p-1 text-[14px] text-white hidden group-hover:block">
                  Delete Expenses
                </span>

                <BookmarkX
                  color="red"
                  onClick={() => deleteExpenses(v._id)}
                  className="mx-auto cursor-pointer"
                />
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};
