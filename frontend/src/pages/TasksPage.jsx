import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import {
  AreaChart,
  CalendarDaysIcon,
  LocateFixedIcon,
  NotebookPen,
  PlantPot,
  Square,
  SquareCheckBigIcon,
  SquareChevronLeftIcon,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import api from "../app/api";
import { useSelector } from "react-redux";

export default function TasksPage() {
  let user = useSelector((state) => state.user.user);
  let [farm, setFarm] = useState([]);
  let { id } = useParams();
  let totalTasks = farm?.tasks?.length || 0;
  let completedTasks =
    farm?.tasks?.filter((t) => t.completed === true).length || 0;
  let notCompletedTasks =
    farm?.tasks?.filter((t) => t.completed === false).length || 0;
  let progress = Math.round((completedTasks / totalTasks) * 100) || 0;

  let getFarm = async () => {
    try {
      let res = await axios.get(`${api}/farmer/gets/farmSignle/${id}`, {
        withCredentials: true,
      });

      if (res.data.success) {
        setFarm(res.data.farmSignle);
      } else {
        toast.error(res?.data?.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };
  useEffect(() => {
    getFarm();
  }, []);

  const navigate = useNavigate();
  let goToPrevPage = () => {
    let userId = user._id;
    navigate(`/myfarm/${userId}`);
  };

  return (
    <>
      <div>
        <div className="fixed top-0 w-screen z-40">
          <Navbar />
        </div>
        <div className="my-16">
          <div className="relative">
            <div
              onClick={goToPrevPage}
              className="absolute left-10 top-2 cursor-pointer"
            >
              <SquareChevronLeftIcon
                size={20}
                className="hover:text-green-500"
              />
            </div>
            <h1 className="text-center text-[30px] font-bold">
              <span className="text-[var(--primary)]">Wheat</span> Farming
            </h1>
          </div>
          <div className="m-4 p-4">
            <div className="shadow-sm shadow-black h-[300px] py-2 rounded-sm px-4">
              <div className="flex justify-between">
                <div>
                  <h2 className="text-left mt-2 font-semibold text-[20px]">
                    {farm?.crop} Farming
                  </h2>
                  <span className="flex gap-1 text-[14px] items-center">
                    <LocateFixedIcon size={15} color="green" />
                    {farm?.location}
                  </span>
                </div>
                <div>
                  <div className="flex gap-4 items-center px-2 py-2 bg-sky-100 rounded-md">
                    <CalendarDaysIcon size={30} className="text-sky-700" />
                    <div>
                      <h4 className="text-[14px]">Planting Date</h4>
                      <p className="text-[14px] font-semibold">
                        {farm?.createdAt?.split("T")[0] || "0000-00-00"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-1 md:gap-2 my-4">
                <div className="flex gap-4 items-center px-2 py-2 bg-green-100 rounded-md">
                  <AreaChart size={30} color="green" />
                  <div>
                    <h4 className="text-[14px]">Area</h4>
                    <p className="text-[14px] font-semibold">
                      {farm?.area} Acres
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 items-center px-2 py-2 bg-yellow-100 rounded-md">
                  <PlantPot size={30} className="text-yellow-700" />
                  <div>
                    <h4 className="text-[14px]">Soil Type</h4>
                    <p className="text-[14px] font-semibold">
                      {farm?.soil || ""}
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 items-center px-2 py-2 bg-sky-100 rounded-md">
                  <CalendarDaysIcon size={30} className="text-sky-700" />
                  <div>
                    <h4 className="text-[14px]">Planting Date</h4>
                    <p className="text-[14px] font-semibold">
                      {farm?.plantingDate?.split("T")[0] || "0000-00-00"}
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 items-center px-2 py-2 bg-violet-100 rounded-md">
                  <NotebookPen size={30} className="text-violet-700" />
                  <div className="flex justify-between gap-2 md:gap-4">
                    <div>
                      <h4 className="text-[14px]">Total Tasks</h4>
                      <p className="text-[14px] font-semibold text-center">
                        {totalTasks}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-[14px] ">Completed</h4>
                      <p className="text-[14px] font-semibold text-center">
                        {completedTasks}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-[14px]">Pending</h4>
                      <p className="text-[14px] font-semibold text-center">
                        {notCompletedTasks}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-[14px]">Tasks progress</h3>
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
            <div className="my-4">
              <h2 className="text-[20px] font-semibold">Tasks</h2>
              {farm?.tasks?.map((v, i) => {
                return (
                  <div key={i}>
                    <Task task={v} idx={i} cropId={id} getFarm={getFarm} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

let Task = ({ task, idx, cropId, getFarm }) => {
  let taskCompleted = async (id) => {
    let isTask = task?.completed || false;
    try {
      let res = await axios.patch(
        `${api}/farmer/crops/${cropId}/tasks/${id}/complete`,
        { isTask: !isTask },
        {
          withCredentials: true,
        },
      );

      if (res.data.success) {
        toast.success(res.data.message);
        getFarm();
      } else {
        toast.error(res?.data?.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };
  return (
    <>
      <div className="shadow-md bg-[var(--color-1)] my-4 rounded-md p-2">
        <div className="flex justify-between px-2">
          <div className="flex gap-4">
            <p className="text-[var(--primary)] font-semibold">{idx + 1}.</p>
            <h3 className="font-semibold text-[16px]">{task.title}</h3>
          </div>
          <div>
            <button onClick={() => taskCompleted(task._id)}>
              <>
                {task?.completed ? (
                  <>
                    <SquareCheckBigIcon size={20} color="green" />
                  </>
                ) : (
                  <>
                    <Square size={20} />
                  </>
                )}
              </>
            </button>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 ml-8 my-2">
          <div className="text-[14px]">
            <h4 className="font-semibold text-gray-600">Due Date</h4>
            <p>{task?.dueDate?.split("T")[0] || "0000-00-00"}</p>
          </div>
          <div className="text-[14px]">
            <h4 className="font-semibold text-gray-600">Quantity</h4>
            <p>{task?.quantity || 0}</p>
          </div>
        </div>
        <div className="my-4 m-8">
          <h4 className="font-semibold text-gray-600">Description</h4>
          <p className="text-gray-700 my-2">{task?.description}</p>
        </div>
      </div>
    </>
  );
};
