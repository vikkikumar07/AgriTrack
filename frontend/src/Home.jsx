import React, { useEffect } from "react";
import Navbar from "./components/Navbar";
import axios from "axios";
import api from "./app/api";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./app/counter/counterSlice";
import Deshbord from "./components/Deshbord";
import Home2 from "./components/Home2";
import Home1 from "./components/Home1";

export default function Home() {
  let dispatch = useDispatch();
  let user = useSelector((state) => state.user.user);
  let authme = async () => {
    try {
      let response = await axios.post(
        `${api}/user/authme`,
        {},
        {
          withCredentials: true,
        },
      );
      if (response.data.success) {
        toast.success(response.data.message);
        dispatch(setUser(response.data.user));
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      // toast.error(error.response?.data?.message);
    }
  };

  useEffect(() => {
    authme();
  }, []);

  let admin = user?.role === "admin";
  return (
    <>
      <div>
        <div className="fixed top-0 w-screen z-40">
          <Navbar />
        </div>
        <div className="absolute top-12">
          {user ? (
            <>
              {admin ? (
                <>
                  <Deshbord />
                </>
              ) : (
                <>
                  <Home2 />
                </>
              )}
            </>
          ) : (
            <>
              <Home1 />
            </>
          )}
        </div>
      </div>
    </>
  );
}
