import "./App.css";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Home from "./Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { store } from "./app/store";
import { Provider } from "react-redux";

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
      <Provider store={store}>
        <RouterProvider router={allroutes} />
      </Provider>
    </>
  );
}

export default App;
