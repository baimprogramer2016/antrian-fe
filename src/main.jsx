import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./pages/App.jsx";
import MonitorAntrian from "./pages/MonitorAntrian.jsx";
import Rme from "./pages/PanggilAntrian.jsx";
import AmbilAntrian from "./pages/AmbilAntrian.jsx";
import Ws from "./pages/Ws.jsx";
import PanggilAntrian from "./pages/PanggilAntrian.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <p className="p-8">Running...</p>,
  },
  {
    path: "/app",
    element: <App />,
  },
  {
    path: "/app",
    element: <App />,
  },
  {
    path: "/app/antrian",
    element: <AmbilAntrian />,
  },
  {
    path: "/app/monitor-antrian",
    element: <MonitorAntrian />,
  },
  {
    path: "/app/panggil-antrian",
    element: <PanggilAntrian />,
  },
  {
    path: "/app/ws",
    element: <Ws />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <App /> */}
    <RouterProvider router={router} />
  </StrictMode>
);
