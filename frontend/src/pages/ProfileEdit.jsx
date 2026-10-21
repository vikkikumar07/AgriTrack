import React, { useState } from "react";
import Navbar from "./../components/Navbar";
import {
  Edit3,
  Eye,
  EyeOffIcon,
  Image,
  LocationEdit,
  LockKeyhole,
  LucideMessagesSquare,
  User,
} from "lucide-react";
import footerImage from "../image/footer_image.png";
import { useDispatch, useSelector } from "react-redux";
import icon from "../icon.png";
import axios from "axios";
import api from "../app/api";
import { toast } from "react-toastify";
import { setUser } from "../app/counter/counterSlice";

export default function ProfileEdit() {
  let user = useSelector((state) => state.user.user);
  let [showPass, setShowPass] = useState(false);
  let [userData, setUserData] = useState({
    fullName: user?.fullName,
    username: user?.username,
    email: user?.email,
    password: "",
    location: user?.location,
    logo: user?.logo,
  });
  let setData = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  let fileHandeler = (e) => {
    const logo = e.target.files?.[0];
    setUserData({ ...userData, logo });
  };
  let dispatch = useDispatch();
  let handlSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullName", userData.fullName);
    formData.append("username", userData.username);
    formData.append("email", userData.email);
    formData.append("password", userData.password);
    formData.append("location", userData.location);
    if (userData.logo) {
      formData.append("logo", userData.logo);
    }

    try {
      let response = await axios.patch(
        `${api}/user/update/${user._id}`,
        formData,
        {
          withCredentials: true,
        },
      );

      if (!response) {
        toast.error("Please try again");
      }

      if (response.data.success) {
        dispatch(setUser(response.data.user));
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data.message);
    }
  };
  let emptyData = (e) => {
    e.preventDefault();
    setUserData({
      fullName: user?.fullName,
      username: user?.username,
      email: user?.email,
      password: "",
      location: user?.location,
      logo: user?.logo,
    });
  };
  return (
    <>
      <div className="w-screen">
        <div className="fixed top-0 w-[100%] z-20">
          <Navbar />
        </div>
        <div className="mt-20 w-screen">
          <div className="w-[90%] mx-auto bg-white shadow-sm shadow-black">
            <div className="flex gap-2 items-center p-4">
              <div className="bg-green-300 p-3 rounded-full">
                <Edit3 />
              </div>
              <div>
                <h3 className="font-bold text-[20px]">Edit Profile</h3>
                <p className="text-[14px]">
                  Update your personal information details.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="h-[15vh]  md:h-[20vh] w-full -z-20 overflow-hidden">
                <img
                  src={footerImage}
                  alt="Home Image"
                  className="block object-cover h-full w-full"
                />
              </div>
              <div className="absolute top-5 left-5 bg-black rounded-full p-1">
                <img
                  src={user?.logo || icon}
                  width={120}
                  alt="User Image"
                  className="border-2 border-white rounded-full w-[120px] h-[120px] object-cover"
                />
              </div>
            </div>
            <div className="my-10 py-10">
              <form onSubmit={handlSubmit} className="mx-10 my-15">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div>
                    <div>
                      <label>Full name</label>
                      <div className="relative">
                        <User
                          size={15}
                          className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--mute)]"
                        />
                        <input
                          type="text"
                          className="inputBox"
                          name="fullName"
                          value={userData.fullName}
                          onChange={setData}
                          placeholder="Enter your full name"
                        />
                      </div>
                    </div>
                    <div>
                      <label>username</label>
                      <div className="relative">
                        <User
                          size={15}
                          className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--mute)]"
                        />
                        <input
                          type="text"
                          className="inputBox"
                          name="username"
                          value={userData.username}
                          onChange={setData}
                          placeholder="Enter your username"
                        />
                      </div>
                    </div>
                    <div>
                      <label>Email address</label>
                      <div className="relative">
                        <LucideMessagesSquare
                          size={15}
                          className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--mute)]"
                        />
                        <input
                          className="inputBox"
                          type="email"
                          name="email"
                          value={userData.email}
                          onChange={setData}
                          placeholder="Enter your email address"
                        />
                      </div>
                    </div>
                    <div>
                      <label>Password</label>
                      <div className="relative">
                        <LockKeyhole
                          size={15}
                          className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--mute)]"
                        />
                        <input
                          className="inputBox"
                          type={`${showPass ? "text" : "password"}`}
                          name="password"
                          value={userData.password}
                          onChange={setData}
                          placeholder="Create a new password"
                        />
                        {showPass ? (
                          <>
                            <Eye
                              size={15}
                              onClick={() => setShowPass(!showPass)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--mute)]"
                            />
                          </>
                        ) : (
                          <>
                            <EyeOffIcon
                              size={15}
                              onClick={() => setShowPass(!showPass)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--mute)]"
                            />
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <div>
                    <div>
                      <label>Location</label>
                      <div className="relative">
                        <LocationEdit
                          size={15}
                          className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--mute)]"
                        />
                        <input
                          className="inputBox"
                          type="text"
                          name="location"
                          value={userData.location}
                          onChange={setData}
                          placeholder="Enter your location"
                        />
                      </div>
                    </div>
                    <div>
                      <label>Profile image</label>
                      <div className="relative">
                        <Image
                          size={15}
                          className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--mute)]"
                        />
                        <input
                          className="inputBox"
                          type="file"
                          name="logo"
                          accept="image/*"
                          onChange={fileHandeler}
                          placeholder="Upload your profile image"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex md:justify-end w-full">
                  <div className="flex gap-2">
                    <div className="m-0 w-full">
                      <button
                        onClick={emptyData}
                        className="btn w-full hover:bg-[var(--color-1)] my-1 px-0"
                      >
                        Chancel
                      </button>
                    </div>
                    <div className="m-0 w-full">
                      <button
                        type="submit"
                        className="btn w-full bg-[var(--primary)] hover:bg-[var(--secondary)] text-white my-1 px-0"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
