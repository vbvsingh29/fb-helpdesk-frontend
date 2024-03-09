import React from "react";
import ReactDOM from "react-dom/client";
import Header from "./Components/Header";
import Register from "./Components/Register";
import Footer from "./Components/Footer";
import About from "./Components/About";
import Error from "./Components/Error";
import Login from "./Components/Login";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Home from "./Components/Home";

const AppLayout = () => {
  return (
    <React.Fragment>
      {/* <Header /> */}
      <Home />
      {/* <Footer /> */}
    </React.Fragment>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <Error />,
    // children: [
    //     {
    //         path: "/login",
    //         element: <Body />,
    //     },
    //     {
    //         path: "/about",
    //         element: <About />,
    //     },
    // ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/profile",
    element: <Home />,
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);
