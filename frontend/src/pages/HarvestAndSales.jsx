import React, { useEffect, useState } from "react";
import Navbar from "./../components/Navbar";
import {
  AlertTriangle,
  AreaChart,
  CalendarDays,
  CalendarDaysIcon,
  Database,
  DatabaseArrowDown,
  DatabaseArrowUp,
  DatabaseMinus,
  IndianRupee,
  Leaf,
  Loader2,
  PlusSquareIcon,
  Search,
  TreePalm,
  User,
  Wheat,
  X,
} from "lucide-react";
import axios from "axios";
import api from "../app/api";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

export default function HarvestAndSales() {
  let { id } = useParams();
  let [show, setShow] = useState(false);
  let [harvest, setHarvest] = useState([]);
  let [loading, setLoading] = useState(false);
  let [farm, setFarm] = useState([]);
  let [crop, setCrop] = useState("");
  let [cropCross, setCropCross] = useState(false);

  let [data, setData] = useState({
    crop: "",
    totalHarvest: "",
    damagedQuantity: "",
    sellingPrice: "",
    buyer: "",
    saleDate: "",
    transportCost: "",
    soldQuantity: "",
    storedQuantity: "",
  });

  let totalCrop = farm.length || 0;
  let totalHarvest = harvest.length || 0;

  let getAllHarvest = async () => {
    try {
      let res = await axios.get(`${api}/farmer/harvest/getAll`, {
        withCredentials: true,
      });

      if (res.data.success) {
        setHarvest(res?.data?.harvestDetials);
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

  let setFormData = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  let submitForm = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      let res = await axios.post(
        `${api}/farmer/harvest/${data.crop}/create`,
        data,
        {
          withCredentials: true,
        },
      );

      if (res.data.success) {
        toast.success(res?.data?.message);
        setShow(false);
        getAllHarvest();
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
      totalHarvest: "",
      damagedQuantity: "",
      sellingPrice: "",
      buyer: "",
      saleDate: "",
      transportCost: "",
      soldQuantity: "",
      storedQuantity: "",
    });
  };

  let findCropName = async (e) => {
    e.preventDefault();

    try {
      let res = await axios.get(`${api}/farmer/harvest/${crop}/get`, {
        withCredentials: true,
      });

      if (res.data.success) {
        setHarvest(res?.data?.harvestDetials);
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

  let cropCrossBtn = (e) => {
    e.preventDefault();
    setCropCross(false);
    setCrop("");
    getAllHarvest();
  };

  useEffect(() => {
    getAllHarvest();
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
              <p className="font-bold text-[18px]">{totalCrop}</p>
              <h5 className="font-bold text-[var(--primary)]">Total Crop</h5>
            </div>
            <div className="flex flex-col items-center gap-1 py-2 bg-blue-200 rounded-md">
              <p className="font-bold text-[18px]">{totalHarvest}</p>
              <h5 className="font-bold ">Total Harvest & Sales</h5>
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
                    <option value={"Other"}>Fillter by crop name</option>
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

            <div className="flex items-center">
              <div
                onClick={() => setShow(!show)}
                className="flex gap-2 items-center text-[14px] bg-[var(--primary)] hover:bg-[var(--secondary)] text-white p-2 rounded-md cursor-pointer"
              >
                <PlusSquareIcon size={20} />
                <p className="hidden md:block">Add Harvest & sales</p>
              </div>
            </div>
          </div>
          <div className="m-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {harvest?.map((v, i) => {
                return (
                  <div key={i}>
                    <HarvestCard v={v} getAllHarvest={getAllHarvest} />
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
                className={`absolute top-0 w-[100%] md:w-[80%] left-0 md:left-1/2 md:-translate-x-1/2 z-10 ${show ? "block" : "hidden"}`}
              >
                <div className="relative h-auto pb-10 md:h-[500px] w-full bg-white mx-auto shadow-sm shadow-black rounded-md">
                  <div className="relative h-1">
                    <X
                      size={20}
                      className="cursor-pointer absolute right-4 top-2 text-red-600"
                      onClick={() => setShow(!show)}
                    />
                  </div>
                  <h2 className="text-center text-[25px] font-semibold my-2 text-[var(--primary)]">
                    Add Harvest & Sales
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
                          <div className="my-2 ">
                            <label>Total Harvest</label>
                            <div className="relative">
                              <Wheat
                                size={15}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--mute)]"
                              />
                              <div className="flex items-center bg-white border-2 rounded-md">
                                <input
                                  className="w-full outline-none rounded-md pl-10 pr-3 py-2 placeholder:text-[14px] text-[16px] md:text-[13px] "
                                  name="totalHarvest"
                                  value={data.totalHarvest}
                                  onChange={setFormData}
                                  type="number"
                                  placeholder="Enter your harvest quantity"
                                />
                                <div className="p-1 rounded-md text-center bg-white text-gray-500">
                                  Quintal
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="my-2 ">
                            <label>Damaged Quantity</label>
                            <div className="relative">
                              <AlertTriangle
                                size={15}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--mute)]"
                              />
                              <div className="flex items-center bg-white border-2 rounded-md">
                                <input
                                  className="w-full outline-none rounded-md pl-10 pr-3 py-2 placeholder:text-[14px] text-[16px] md:text-[13px] "
                                  name="damagedQuantity"
                                  value={data.damagedQuantity}
                                  onChange={setFormData}
                                  type="number"
                                  placeholder="Enter your damaged quantity"
                                />
                                <div className="p-1 rounded-md text-center bg-white text-gray-500">
                                  Quintal
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="my-2 ">
                            <label>Store Quantity</label>
                            <div className="relative">
                              <Database
                                size={15}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--mute)]"
                              />
                              <div className="flex items-center bg-white border-2 rounded-md">
                                <input
                                  className="w-full outline-none rounded-md pl-10 pr-3 py-2 placeholder:text-[14px] text-[16px] md:text-[13px] "
                                  name="storedQuantity"
                                  value={data.storedQuantity}
                                  onChange={setFormData}
                                  type="number"
                                  placeholder="Enter your store quantity"
                                />
                                <div className="p-1 rounded-md text-center bg-white text-gray-500">
                                  Quintal
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="my-2">
                            <label>Sale Date</label>
                            <div className="relative">
                              <CalendarDays
                                size={15}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--mute)]"
                              />
                              <input
                                className="inputBox"
                                name="saleDate"
                                value={data.saleDate}
                                onChange={setFormData}
                                type="date"
                              />
                            </div>
                          </div>
                        </div>
                        <div>
                          <div className="my-2 ">
                            <label>Sold Quantity</label>
                            <div className="relative">
                              <DatabaseMinus
                                size={15}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--mute)]"
                              />
                              <div className="flex items-center bg-white border-2 rounded-md">
                                <input
                                  className="w-full outline-none rounded-md pl-10 pr-3 py-2 placeholder:text-[14px] text-[16px] md:text-[13px] "
                                  name="soldQuantity"
                                  value={data.soldQuantity}
                                  onChange={setFormData}
                                  type="number"
                                  placeholder="Enter your sold quantity"
                                />
                                <div className="p-1 rounded-md text-center bg-white text-gray-500">
                                  Quintal
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="my-2">
                            <label>Buyer</label>
                            <div className="relative">
                              <User
                                size={15}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--mute)]"
                              />
                              <input
                                className="inputBox"
                                name="buyer"
                                value={data.buyer}
                                onChange={setFormData}
                                type="text"
                                placeholder="Enter buyer name"
                              />
                            </div>
                          </div>
                          <div className="my-2">
                            <label>Selling Price</label>
                            <div className="relative">
                              <IndianRupee
                                size={15}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--mute)]"
                              />
                              <input
                                className="inputBox"
                                name="sellingPrice"
                                value={data.sellingPrice}
                                onChange={setFormData}
                                type="number"
                                placeholder="Enter selling price"
                              />
                            </div>
                          </div>
                          <div className="my-2">
                            <label>Transport Cost</label>
                            <div className="relative">
                              <IndianRupee
                                size={15}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--mute)]"
                              />
                              <input
                                className="inputBox"
                                name="transportCost"
                                value={data.transportCost}
                                onChange={setFormData}
                                type="number"
                                placeholder="Enter transport cost"
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

let HarvestCard = ({ v }) => {
  return (
    <>
      <div className="shadow-sm shadow-black h-auto py-2 rounded-md bg-white px-4">
        <div className="flex gap-4 flex-col md:flex-row md:justify-between">
          <div className="flex gap-2 items-center mt-2 ">
            <div className="bg-green-900 p-2 rounded-md">
              <TreePalm size={30} color="white" />
            </div>
            <div>
              <h2 className="text-left font-semibold text-[20px]">
                {v?.cropId.crop} Harvest
              </h2>
              <p className="text-[14px]">Harvest & Sales Details</p>
            </div>
          </div>
          <div className="flex gap-2">
            <div className="flex gap-2 items-center bg-green-50 px-4 rounded-md">
              <div className="flex gap-1 items-center mt-2">
                <CalendarDaysIcon size={20} color="green" />
              </div>
              <div>
                <span className="text-[14px]">Created At</span>
                <div className="text-[14px] font-semibold ">
                  {v?.createdAt.split("T")[0]}
                </div>
              </div>
            </div>
            <div className="flex gap-2 items-center bg-green-50 px-4 rounded-md">
              <div className="flex gap-1 items-center mt-2">
                <CalendarDaysIcon size={20} color="green" />
              </div>
              <div>
                <span className="text-[14px]">Sale Date</span>
                <div className="text-[14px] font-semibold ">
                  {v?.saleDate.split("T")[0]}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2  gap-1 md:gap-2 my-4">
          <div className="col-span-2 grid grid-cols-2 gap-2 my-4 md:grid-cols-4">
            <div className="flex gap-4 items-center px-2 py-2 bg-green-100 rounded-md">
              <AreaChart size={30} color="green" />
              <div>
                <h4 className="text-[14px]">Total Harvest</h4>
                <p className="text-[16px] text-green-700 font-semibold">
                  {v?.totalHarvest || 0} Quintal
                </p>
              </div>
            </div>
            <div className="flex gap-4 items-center px-2 py-2 bg-sky-100 rounded-md">
              <DatabaseArrowUp size={30} className="text-sky-700" />
              <div>
                <h4 className="text-[14px]">Sold Quantity</h4>
                <p className="text-[16px] text-sky-700 font-semibold">
                  {v?.soldQuantity || 0} Quintal
                </p>
              </div>
            </div>
            <div className="flex gap-4 items-center px-2 py-2 bg-violet-100 rounded-md">
              <DatabaseArrowDown size={30} className="text-violet-700" />
              <div>
                <h4 className="text-[14px]">Store Quantity</h4>
                <p className="text-[16px] text-violet-700 font-semibold">
                  {v?.storedQuantity || 0} Quintal
                </p>
              </div>
            </div>
            <div className="flex gap-4 items-center px-2 py-2 bg-red-100 rounded-md">
              <DatabaseMinus size={30} className="text-red-700" />
              <div>
                <h4 className="text-[14px]">Damaged Quantity</h4>
                <p className="text-[16px] font-semibold text-red-700">
                  {v?.damagedQuantity || 0} Quintal
                </p>
              </div>
            </div>
          </div>
          <div className="flex gap-4 items-center px-2 py-2 border rounded-md">
            <div className="bg-green-100 p-2 rounded-md">
              <User size={25} color="green" />
            </div>
            <div>
              <h4 className="text-[14px]">Buyer</h4>
              <p className="text-[16px] font-semibold">{v?.buyer || ""}</p>
            </div>
          </div>
          <div className="flex gap-4 items-center px-2 py-2 border rounded-md">
            <div className="bg-green-100 p-2 rounded-md">
              <IndianRupee size={25} color="green" />
            </div>
            <div>
              <h4 className="text-[14px]">Selling Price</h4>
              <p className="text-[16px] font-semibold">
                {v?.sellingPrice || 0} /Quintal
              </p>
            </div>
          </div>
          <div className="flex gap-4 items-center px-2 py-2 border rounded-md">
            <div className="bg-green-100 p-2 rounded-md">
              <IndianRupee size={25} color="green" />
            </div>
            <div>
              <h4 className="text-[14px]">Revenue</h4>
              <p className="text-[16px] font-semibold">{v?.revenue || 0} </p>
            </div>
          </div>
          <div className="flex gap-4 items-center px-2 py-2 border rounded-md">
            <div className="bg-green-100 p-2 rounded-md">
              <IndianRupee size={25} color="green" />
            </div>
            <div>
              <h4 className="text-[14px] ">Total Expenses</h4>
              <p className="text-[16px] font-semibold">
                {v?.totalExpenses || 0}{" "}
              </p>
            </div>
          </div>
          <div className="flex gap-4 items-center px-2 py-2 border rounded-md">
            <div className="bg-green-100 p-2 rounded-md">
              <IndianRupee size={25} color="green" />
            </div>
            <div>
              <h4 className="text-[14px]">Transport Cost</h4>
              <p className="text-[16px] font-semibold">
                {v?.transportCost || 0}{" "}
              </p>
            </div>
          </div>
          <div className="flex gap-4 items-center px-2 py-2 border rounded-md">
            <div className="bg-green-100 p-2 rounded-md">
              <IndianRupee size={25} color="green" />
            </div>
            <div>
              <h4 className="text-[14px]">Profit / Loss</h4>
              <p className="text-[16px] font-semibold">
                {v?.profitLoss || 0} <span>{v?.plMessage || ""}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
