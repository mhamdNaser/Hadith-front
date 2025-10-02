import { Navigate, createBrowserRouter } from "react-router-dom";

import About from "./page/About";
import Contact from "./page/Contact";
import Home from "./page/Home";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/about", element: <About /> },
  { path: "/contact", element: <Contact /> },
]);

export default router;
