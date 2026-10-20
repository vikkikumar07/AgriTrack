import React, { useEffect } from "react";
import Navbar from "./components/Navbar";
import axios from "axios";
import api from "./app/api";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setUser } from "./app/counter/counterSlice";

export default function Home() {
  let dispatch = useDispatch();
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
      toast.error(error.response?.data?.message);
    }
  };

  useEffect(() => {
    authme();
  }, []);
  return (
    <>
      <Navbar />
      <h2>Home</h2>
    </>
  );
}
