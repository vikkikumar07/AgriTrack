import React, { useEffect, useState } from "react";
import FooterComponent from "./FooterComponent";
import homePage from "../image/home_page_2.png";
import {
  AreaChart,
  ArrowRight,
  CalendarDaysIcon,
  CloudSun,
  DatabaseArrowDown,
  DatabaseArrowUp,
  DatabaseMinus,
  IndianRupee,
  Leaf,
  LeafyGreen,
  LocateFixedIcon,
  LucideStickyNoteCheck,
  NotebookPen,
  PlantPot,
  Sun,
  TreePalm,
  User,
} from "lucide-react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import api from "./../app/api";
import { toast } from "react-toastify";

export default function Home2() {
  let user = useSelector((state) => state.user.user);
  let [data, setData] = useState([]);

  let totalCompletedTasks =
    data?.letest?.letestCrop?.tasks?.filter((t) => t.completed === true)
      .length || 0;
  let progress = Math.round(
    (totalCompletedTasks / data?.letest?.letestCrop?.tasks?.length || 0) * 100,
  );

  let homeData = async () => {
    try {
      let res = await axios.get(`${api}/farmer/gets/home/data`, {
        withCredentials: true,
      });

      if (res.data.success) {
        setData(res.data);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data.message);
    }
  };

  useEffect(() => {
    homeData();
  }, []);
  return (
    <>
      <div className="relative w-screen bg-[var(--body)] ">
        <main className="mb-10">
          <div className="relative h-[300px] w-full">
            <div className=" h-[50vh]  md:h-[60vh] w-full -z-20 overflow-hidden border rounded-lg">
              <img
                src={homePage}
                alt="Home Image"
                className="block object-cover h-full w-full"
              />
              <div className="absolute top-2 left-4 md:left-16 h-[200px] w-[300px] md:h-[300px] md:w-[300px] bg-white blur-xl md:blur-2xl z-0"></div>
            </div>
            <div className="absolute top-10 md:top-20 left-16 md:left-40 text-left ">
              <h2 className="font-bold text-[20px]">Good Morning,</h2>
              <h2 className="flex gap-1 font-bold text-[30px] items-center">
                {user?.fullName}!
                <Sun className="" fill="yellow" color="yellow" />
              </h2>
              <p className="my-2 text-[14px]">
                Let's grow a better tomorrow with AgriTrack.
              </p>
              <div className="flex gap-4 my-8 items-center bg-green-400 px-4 py-2 rounded-md shadow-md">
                <LeafyGreen className="" fill="green" color="green" />
                <div>
                  <p className="text-[14px]">
                    Healthy crops today, <br /> a brighter tomorrow.{" "}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-2 z-10 my-6 md:my-10 w-[80%] mx-auto">
              <div className="flex gap-4 items-center bg-white shadow-xl rounded-md px-4 py-2">
                <div className=" bg-green-300 p-2 rounded-md">
                  <TreePalm />
                </div>
                <div>
                  <h4 className="font-semibold text-[14px] text-[var(--mute)]">
                    Total Crops
                  </h4>
                  <p className="text-[20px] font-bold">
                    {data?.farmsDetails?.totalFarm || 0}
                  </p>
                  <Link
                    to={`/myfarm/${user._id}`}
                    className="flex gap-1 items-center text-[var(--primary)] text-[14px]"
                  >
                    View My Crop <ArrowRight size={15} />
                  </Link>
                </div>
              </div>
              <div className="flex gap-4 items-center bg-white shadow-xl rounded-md px-4 py-2">
                <div className=" bg-yellow-400 p-2 rounded-md">
                  <LucideStickyNoteCheck />
                </div>
                <div>
                  <h4 className="font-semibold text-[14px] text-[var(--mute)]">
                    Pending Tasks
                  </h4>
                  <p className="text-[20px] font-bold">
                    {data?.farmsDetails?.totalPendingtask || 0}
                  </p>
                  <div className="flex gap-2 text-sky-500 text-[12px]">
                    <p>Total {data?.farmsDetails?.totalTasks || 0}</p>{" "}
                    <p>completed {data?.farmsDetails?.completedTasks || 0}</p>
                  </div>
                  <Link
                    to={`/tasks/${user._id}`}
                    className="flex gap-1 items-center text-[var(--primary)] text-[14px]"
                  >
                    View Tasks <ArrowRight size={15} />
                  </Link>
                </div>
              </div>
              <div className="flex gap-4 items-center bg-white shadow-xl rounded-md px-4 py-2">
                <div className=" bg-sky-300 p-2 rounded-md">
                  <NotebookPen />
                </div>
                <div>
                  <h4 className="font-semibold text-[14px] text-[var(--mute)]">
                    Total Expenses
                  </h4>
                  <p className="text-[20px] font-bold">
                    {data?.totalExpenses || 0}
                  </p>
                  <Link
                    to={`/expenses/${user._id}`}
                    className="flex gap-1 items-center text-[var(--primary)] text-[14px]"
                  >
                    View Expenses <ArrowRight size={15} />
                  </Link>
                </div>
              </div>
              <div className="flex gap-4 items-center bg-white shadow-xl rounded-md px-4 py-2">
                <div className=" bg-sky-400 p-2 rounded-md">
                  <CloudSun />
                </div>
                <div>
                  <h4 className="font-semibold text-[14px] text-[var(--mute)]">
                    Today's Weather
                  </h4>
                  <p className="text-[20px] font-bold">
                    28<sup>o</sup> C
                  </p>
                  <p className="flex gap-1 items-center text-[var(--primary)] text-[14px]">
                    Partly cloudy
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="my-18">
            <div className=" w-[95%] md:max-w-6xl mx-auto pt-6">
              <h2 className="text-[25px] font-semibold text-center text-[var(--primary)]">
                Letest Records
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-10">
                {data?.letest?.letestCrop !== null ? (
                  <>
                    <div className="shadow-sm shadow-black h-[300px] py-2 rounded-sm bg-white px-4">
                      <div className="flex justify-between">
                        <div>
                          <h2 className="text-left mt-2 font-semibold text-[20px]">
                            {data?.letest?.letestCrop.crop} Farming
                          </h2>
                          <span className="flex gap-1 text-[14px] items-center">
                            <LocateFixedIcon size={15} color="green" />
                            {data?.letest?.letestCrop?.location}
                          </span>
                        </div>
                        <div>
                          <div className="flex gap-1 items-center mt-2">
                            <CalendarDaysIcon size={15} color="green" />
                            <span className="text-[12px] text-green-800 bg-green-100 px-2 py-1 rounded-full">
                              CreatedAt
                            </span>
                          </div>
                          <div className="text-[14px] pl-4">
                            {data?.letest?.letestCrop?.createdAt.split("T")[0]}
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-1 md:gap-2 my-4">
                        <div className="flex gap-2 items-center px-2 py-2 bg-green-200 rounded-md">
                          <AreaChart size={20} />
                          <div>
                            <h4 className="text-[14px] font-semibold">Area</h4>
                            <p className="text-[14px]">
                              {data?.letest?.letestCrop?.area} Acres
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2 items-center px-2 py-2 bg-yellow-100 rounded-md">
                          <PlantPot size={20} />
                          <div>
                            <h4 className="text-[14px] font-semibold">
                              Soil Type
                            </h4>
                            <p className="text-[14px]">
                              {data?.letest?.letestCrop?.soil}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2 items-center px-2 py-2 bg-sky-200 rounded-md">
                          <CalendarDaysIcon size={20} />
                          <div>
                            <h4 className="text-[14px] font-semibold">
                              Planting Date
                            </h4>
                            <p className="text-[14px]">
                              {
                                data?.letest?.letestCrop?.plantingDate.split(
                                  "T",
                                )[0]
                              }
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2 items-center px-2 py-2 bg-violet-300 rounded-md">
                          <NotebookPen size={20} />
                          <div>
                            <h4 className="text-[14px] font-semibold">
                              Total Tasks
                            </h4>
                            <p className="text-[14px]">
                              {data?.letest?.letestCrop?.tasks.length || 0}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-[14px]">
                          Tasks progress
                        </h3>
                        <div className="flex gap-2">
                          <div className="bg-gray-200 h-2 my-2 w-[80%] md:w-[95%] rounded-full">
                            <div
                              className="bg-green-600 h-2 rounded-full"
                              style={{ width: `${progress}%` }}
                            ></div>
                          </div>
                          <div className="font-semibold">
                            {progress}
                            <span>%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <></>
                )}

                {data?.letest?.letestExpenses !== null ? (
                  <>
                    <div className="shadow-sm shadow-black h-[300px] py-2 rounded-sm bg-white px-4">
                      <div className="flex justify-between">
                        <div>
                          <h2 className="text-left mt-2 font-semibold text-[20px]">
                            {data?.letest?.letestExpenses.category} Expenses
                          </h2>
                        </div>
                        <div>
                          <div className="flex gap-1 items-center mt-2">
                            <CalendarDaysIcon size={15} color="green" />
                            <span className="text-[14px] text-green-800 bg-green-100 px-2 py-1 rounded-full">
                              CreatedAt
                            </span>
                          </div>
                          <div className="text-[14px] pl-4">
                            {
                              data?.letest?.letestExpenses?.createdAt.split(
                                "T",
                              )[0]
                            }
                          </div>
                        </div>
                      </div>
                      <div>
                        <h2 className="text-center font-semibold text-green-600 text-[16px]">
                          {data?.letest?.letestExpenses?.cropId?.crop || ""}{" "}
                          Farming
                        </h2>
                      </div>
                      <div className="grid grid-cols-2 gap-1 md:gap-2 my-4">
                        <div className="flex gap-2 items-center px-2 py-2 bg-green-200 rounded-md">
                          <AreaChart size={20} />
                          <div>
                            <h4 className="text-[14px] font-semibold">
                              Quantity
                            </h4>
                            <p className="text-[14px]">
                              {data?.letest?.letestExpenses?.quantity || 0}
                              {data?.letest?.letestExpenses?.unit || "g"}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2 items-center px-2 py-2 bg-yellow-100 rounded-md">
                          <IndianRupee size={20} />
                          <div>
                            <h4 className="text-[14px] font-semibold">Rate</h4>
                            <p className="text-[14px]">
                              {data?.letest?.letestExpenses?.rate || 0}/ Kg
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2 items-center px-2 py-2 bg-sky-200 rounded-md">
                          <CalendarDaysIcon size={20} />
                          <div>
                            <h4 className="text-[14px] font-semibold">Date</h4>
                            <p className="text-[14px]">
                              {data?.letest?.letestExpenses?.date.split(
                                "T",
                              )[0] || 0}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2 items-center px-2 py-2 bg-violet-300 rounded-md">
                          <IndianRupee size={20} />
                          <div>
                            <h4 className="text-[14px] font-semibold">
                              Amount
                            </h4>
                            <p className="text-[14px]">
                              {data?.letest?.letestExpenses?.amount || 0}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <></>
                )}
                {data?.letest?.letestHarvest !== null ? (
                  <>
                    <div className="shadow-sm shadow-black h-auto py-2 rounded-sm bg-white px-4">
                      <div className="flex justify-between">
                        <div>
                          <h2 className="text-left mt-2 font-semibold text-[20px]">
                            {data?.letest?.letestHarvest.cropId.crop} Harvest
                          </h2>
                        </div>
                        <div>
                          <div className="flex gap-1 items-center mt-2">
                            <CalendarDaysIcon size={15} color="green" />
                            <span className="text-[14px] text-green-800 bg-green-100 px-2 py-1 rounded-full">
                              CreatedAt
                            </span>
                          </div>
                          <div className="text-[14px] pl-4">
                            {
                              data?.letest?.letestHarvest?.createdAt.split(
                                "T",
                              )[0]
                            }
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-1 md:gap-2 my-4">
                        <div className="flex gap-2 items-center px-2 py-2 bg-green-200 rounded-md">
                          <AreaChart size={20} />
                          <div>
                            <h4 className="text-[14px] font-semibold">
                              Total Harvest
                            </h4>
                            <p className="text-[14px]">
                              {data?.letest?.letestHarvest?.totalHarvest || 0}{" "}
                              Quintal
                            </p>
                          </div>
                        </div>

                        <div className="flex gap-2 items-center px-2 py-2 bg-sky-200 rounded-md">
                          <CalendarDaysIcon size={20} />
                          <div>
                            <h4 className="text-[14px] font-semibold">
                              Sale Date
                            </h4>
                            <p className="text-[14px]">
                              {
                                data?.letest?.letestHarvest?.saleDate.split(
                                  "T",
                                )[0]
                              }
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2 items-center px-2 py-2 bg-gray-300 rounded-md">
                          <DatabaseArrowUp size={20} />
                          <div>
                            <h4 className="text-[14px] font-semibold">
                              Sold Quantity
                            </h4>
                            <p className="text-[14px]">
                              {data?.letest?.letestHarvest?.soldQuantity || 0}{" "}
                              Quintal
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2 items-center px-2 py-2 bg-gray-300 rounded-md">
                          <DatabaseArrowDown size={20} />
                          <div>
                            <h4 className="text-[14px] font-semibold">
                              Store Quantity
                            </h4>
                            <p className="text-[14px]">
                              {data?.letest?.letestHarvest?.storedQuantity || 0}{" "}
                              Quintal
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2 items-center px-2 py-2 bg-gray-300 rounded-md">
                          <DatabaseMinus size={20} />
                          <div>
                            <h4 className="text-[14px] font-semibold">
                              Damaged Quantity
                            </h4>
                            <p className="text-[14px]">
                              {data?.letest?.letestHarvest?.damagedQuantity ||
                                0}{" "}
                              Quintal
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2 items-center px-2 py-2 bg-gray-300 rounded-md">
                          <User size={20} />
                          <div>
                            <h4 className="text-[14px] font-semibold">Buyer</h4>
                            <p className="text-[14px]">
                              {data?.letest?.letestHarvest?.buyer || ""}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2 items-center px-2 py-2 bg-gray-300 rounded-md">
                          <IndianRupee size={20} />
                          <div>
                            <h4 className="text-[14px] font-semibold">
                              Selling Price
                            </h4>
                            <p className="text-[14px]">
                              {data?.letest?.letestHarvest?.sellingPrice || 0}{" "}
                              /Quintal
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2 items-center px-2 py-2 bg-gray-300 rounded-md">
                          <IndianRupee size={20} />
                          <div>
                            <h4 className="text-[14px] font-semibold">
                              Revenue
                            </h4>
                            <p className="text-[14px]">
                              {data?.letest?.letestHarvest?.revenue || 0}{" "}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2 items-center px-2 py-2 bg-gray-300 rounded-md">
                          <IndianRupee size={20} />
                          <div>
                            <h4 className="text-[14px] font-semibold">
                              Total Expenses
                            </h4>
                            <p className="text-[14px]">
                              {data?.letest?.letestHarvest?.totalExpenses ||
                                0}{" "}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2 items-center px-2 py-2 bg-gray-300 rounded-md">
                          <IndianRupee size={20} />
                          <div>
                            <h4 className="text-[14px] font-semibold">
                              Transport Cost
                            </h4>
                            <p className="text-[14px]">
                              {data?.letest?.letestHarvest?.transportCost ||
                                0}{" "}
                            </p>
                          </div>
                        </div>

                        <div className="flex gap-2 items-center px-2 py-2 bg-gray-300 rounded-md">
                          <IndianRupee size={20} />
                          <div>
                            <h4 className="text-[14px] font-semibold">
                              Profit / Loss
                            </h4>
                            <p className="text-[14px]">
                              {data?.letest?.letestHarvest?.profitLoss || 0}{" "}
                              <span>
                                {data?.letest?.letestHarvest?.plMessage || ""}
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </main>
        <FooterComponent />
      </div>
    </>
  );
}
