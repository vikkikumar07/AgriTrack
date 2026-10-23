import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import myFarm from "../image/my_farm.png";
import {
  AreaChart,
  BookmarkX,
  CalendarDays,
  CheckCircle,
  CircleDashedIcon,
  Leaf,
  LeafyGreen,
  Loader2,
  LocationEdit,
  LucideChartNoAxesColumnIncreasing,
  NotebookText,
  PlusSquareIcon,
  SquareChevronRightIcon,
  X,
} from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import api from "../app/api";
import { useNavigate, useParams } from "react-router-dom";

export default function MyFarm() {
  let { id } = useParams();
  let [show, setShow] = useState(false);
  let [loading, setLoading] = useState(false);
  let [farmData, setFarmData] = useState({
    crop: "",
    soil: "",
    plantingDate: "",
    location: "",
    area: "",
  });
  let [farm, setFarm] = useState([]);

  let setFormData = (e) => {
    setFarmData({ ...farmData, [e.target.name]: e.target.value });
  };

  let clearForm = () => {
    setFarmData({
      crop: "",
      soil: "",
      plantingDate: "",
      location: "",
      area: "",
    });
  };

  let totalFarm = farm.length || 0;
  let totalPendingtask = farm.reduce((total, v) => {
    return total + (v?.tasks?.filter((t) => t.completed === false).length || 0);
  }, 0);
  let totalTasks = farm.reduce((sum, v) => sum + (v?.tasks?.length || 0), 0);
  let completedTasks = farm.reduce(
    (sum, v) =>
      sum + (v?.tasks?.filter((t) => t.completed === true).length || 0),
    0,
  );
  let totalArea = farm.reduce((sum, v) => sum + (Number(v.area) || 0), 0);

  let overallprogress =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  let formAction = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      let res = await axios.post(`${api}/farmer/generate/farm`, farmData, {
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        clearForm();
        setShow(false);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setLoading(false);
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

  const navigate = useNavigate();
  let goToTaskPage = (id) => {
    navigate(`/tasks/${id}`);
  };

  let deleteFarm = async (id) => {
    try {
      let res = await axios.delete(`${api}/farmer/crops/${id}/tasks/delete`, {
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };
  useEffect(() => {
    getCrop();
  }, []);
  return (
    <>
      <div className="relative w-screen">
        <div className="fixed top-0 w-screen z-40">
          <Navbar />
        </div>
        <header>
          <div className="h-[20vh]  md:h-[40vh] w-full -z-20 overflow-hidden">
            <img
              src={myFarm}
              alt="Home Image"
              className="block object-cover h-full w-full"
            />
            <div className="absolute top-2 left-4 md:left-16 h-[200px] w-[230px] md:h-[260px] md:w-[400px] bg-white blur-xl md:blur-2xl z-0"></div>
          </div>
          <div className="absolute top-20 md:top-24 left-14 md:left-24 z-10">
            <h2 className="text-[20px] md:text-[40px] font-bold">My Farm</h2>
            <p className="text-[14px]">
              Manage your crps, track progress , and keep
              <br /> your farm records in one place.
            </p>
          </div>
        </header>
        <main className="my-8">
          <div className="px-4 grid grid-cols-2 md:grid-cols-4 gap-1 md:gap-2">
            <div className="flex flex-col items-center gap-1 py-2 bg-green-200 rounded-md">
              <LeafyGreen fill="green" color="green" />
              <p className="font-bold text-[18px]">{totalFarm}</p>
              <h5 className="font-bold text-[var(--primary)]">Total Crops</h5>
            </div>
            <div className="flex flex-col items-center gap-1 py-2 bg-blue-200 rounded-md">
              <NotebookText color="black" />
              <p className="font-bold text-[18px]">{totalPendingtask}</p>
              <h5 className="font-bold ">Total Pending Tasks</h5>
            </div>
            <div className="flex flex-col items-center gap-1 py-2 bg-yellow-200 rounded-md">
              <AreaChart />
              <p className="font-bold text-[18px]">{totalArea} Acres</p>
              <h5 className="font-bold ">Total Area</h5>
            </div>
            <div className="flex flex-col items-center gap-1 py-2 bg-purple-200 rounded-md">
              <LucideChartNoAxesColumnIncreasing color="green" />
              <p className="font-bold text-[18px]">
                {overallprogress}
                <span>%</span>
              </p>
              <h5 className="font-bold ">Overall Progress</h5>
            </div>
          </div>
          <div className="my-10 px-6 bg-gray-100 py-2 ">
            <div className="flex justify-between">
              <h2 className="text-[20px] font-semibold">My Crops</h2>
              <div
                onClick={() => setShow(!show)}
                className="flex gap-2 items-center text-[14px] bg-[var(--primary)] hover:bg-[var(--secondary)] text-white p-2 rounded-md cursor-pointer"
              >
                <PlusSquareIcon size={20} />
                <p>Add Crop</p>
              </div>
            </div>
            <div className="my-4">
              {farm?.map((v, i) => {
                const totalCompleted =
                  v.tasks?.filter((t) => t.completed === true).length || 0;
                const totalTasks = v.tasks.length;
                const progress =
                  totalTasks > 0
                    ? Math.round((totalCompleted / totalTasks) * 100)
                    : 0;
                return (
                  <>
                    <div
                      key={i}
                      className="relative bg-white shadow-sm shadow-black p-4 my-6"
                    >
                      <span
                        onClick={() => goToTaskPage(v._id)}
                        className="absolute cursor-pointer right-2"
                      >
                        <SquareChevronRightIcon className="hover:text-green-500" />
                      </span>
                      <div className="grid grid-cols-2 gap-1 md:w-[50%] text-[14px]">
                        <span className="text-[16px] font-semibold">
                          {v.crop}
                        </span>
                        <div>
                          <div className={`px-2 py-1`}>
                            {progress === 100 ? (
                              <CheckCircle size={20} color="green" />
                            ) : (
                              <CircleDashedIcon size={20} color="blue" />
                            )}
                          </div>
                        </div>
                        <div className="flex gap-1">
                          <AreaChart size={20} color="green" />
                          <p>{v.area} Acres</p>
                        </div>
                        <div className="flex gap-1 items-center">
                          <CalendarDays size={20} color="green" />
                          <p>{v.plantingDate.split("T")[0]}</p>
                        </div>
                      </div>
                      <div className="flex gap-4">
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
                        <div className="group absolute bottom-1 right-0 flex flex-col items-center justify-center">
                          <span className="pointer-events-none absolute right-0 top-full z-10 mt-1 whitespace-nowrap rounded-md bg-red-600 p-1 text-[14px] text-white hidden group-hover:block">
                            Delete Faem
                          </span>

                          <BookmarkX
                            color="red"
                            onClick={() => deleteFarm(v._id)}
                            className="mx-auto cursor-pointer"
                          />
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        </main>
        <div
          className={`absolute top-20 w-[80%] left-1/2 -translate-x-1/2 z-10 ${show ? "block" : "hidden"}`}
        >
          <div className="relative h-[580px] md:h-[380px] w-full bg-white mx-auto shadow-sm shadow-black rounded-md">
            <div className="relative h-1">
              <X
                size={20}
                className="cursor-pointer absolute right-4 top-2 text-red-600"
                onClick={() => setShow(!show)}
              />
            </div>
            <h2 className="text-center text-[25px] font-semibold my-2 text-[var(--primary)]">
              Add Crop
            </h2>
            <div className="px-4 my-4">
              <form onSubmit={formAction}>
                <div className="grid grid-cols-1 md:grid-cols-2  md:gap-4">
                  <div>
                    <div className="my-2">
                      <label>Crop Name</label>
                      <div className="relative">
                        <Leaf
                          size={15}
                          className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--mute)]"
                        />
                        <input
                          className="inputBox"
                          name="crop"
                          value={farmData.crop}
                          onChange={setFormData}
                          type="text"
                          placeholder="Enter your Crop name"
                        />
                      </div>
                    </div>
                    <div className="my-2">
                      <label>Soil</label>
                      <div className="relative">
                        <AreaChart
                          size={15}
                          className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--mute)]"
                        />
                        <input
                          className="inputBox"
                          name="soil"
                          value={farmData.soil}
                          onChange={setFormData}
                          type="text"
                          placeholder="Enter your soil name"
                        />
                      </div>
                    </div>
                    <div className="my-2">
                      <label>Planting Date</label>
                      <div className="relative">
                        <CalendarDays
                          size={15}
                          className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--mute)]"
                        />
                        <input
                          className="inputBox"
                          name="plantingDate"
                          value={farmData.plantingDate}
                          onChange={setFormData}
                          type="date"
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="my-2">
                      <label>Area acres</label>
                      <div className="relative">
                        <AreaChart
                          size={15}
                          className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--mute)]"
                        />
                        <input
                          className="inputBox"
                          name="area"
                          value={farmData.area}
                          onChange={setFormData}
                          type="text"
                          placeholder="Enter your field area"
                        />
                      </div>
                    </div>
                    <div className="my-2">
                      <label>Location</label>
                      <div className="relative">
                        <LocationEdit
                          size={15}
                          className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--mute)]"
                        />
                        <input
                          className="inputBox"
                          name="location"
                          value={farmData.location}
                          onChange={setFormData}
                          type="text"
                          placeholder="Enter your location"
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
  );
}
