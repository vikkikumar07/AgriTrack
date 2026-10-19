import "./App.css";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Home from "./Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

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
]);

function App() {
  return (
    <>
      <RouterProvider router={allroutes} />
    </>
  );
}

export default App;
