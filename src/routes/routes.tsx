import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../pages/Home";
import Scene from "../pages/Scene";
import Library from "../pages/Library";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/library",
    element: <Library />,
  },
  {
    path: "/scene",
    element: <Scene />,
  },
  {
    path: "*",
    element: <h1>Why are you here?</h1>,
  },
]);

const Routes = () => {
  return <RouterProvider router={router} />;
};

export default Routes;
