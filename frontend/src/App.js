import "./App.css";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Home from "./Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { store } from "./app/store";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ForgatePassword from "./pages/ForgatePassword";
import ProfileEdit from "./pages/ProfileEdit";
import TasksPage from "./pages/TasksPage";
import Expenses from "./pages/Expenses";
import Complains from "./pages/Complains";
import HarvestAndSales from "./pages/HarvestAndSales";
import Users from "./pages/Users";
import AllComplains from "./pages/AllComplains";
import MyFarm from "./pages/MyFarm";

let allroutes = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/forgate/password",
    element: <ForgatePassword />,
  },
  {
    path: "/profile/edit/:id",
    element: <ProfileEdit />,
  },
  {
    path: "/myfarm/:id",
    element: <MyFarm />,
  },
  {
    path: "/tasks/:id",
    element: <TasksPage />,
  },
  {
    path: "/expenses/:id",
    element: <Expenses />,
  },
  {
    path: "/complain/:id",
    element: <Complains />,
  },
  {
    path: "/harvest/:id",
    element: <HarvestAndSales />,
  },
  {
    path: "/admin/users",
    element: <Users />,
  },
  {
    path: "/admin/complains",
    element: <AllComplains />,
  },
]);

function App() {
  return (
    <>
      <Provider store={store}>
        <RouterProvider router={allroutes} />
        <ToastContainer />
      </Provider>
    </>
  );
}

export default App;
