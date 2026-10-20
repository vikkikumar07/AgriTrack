import "./App.css";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Home from "./Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { store } from "./app/store";
import { Provider } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ForgatePassword from "./components/ForgatePassword";

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
