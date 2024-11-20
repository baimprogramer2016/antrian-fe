import { PiTicket, PiSpeakerSimpleHigh } from "react-icons/pi";
import { GrAppsRounded } from "react-icons/gr";

export const ROUTE = {
  APP: "/app",
  ANTRIAN: "/app/antrian",
  MONITOR_ANTRIAN: "/app/monitor-antrian",
  PANGGIL_ANTRIAN: "/app/panggil-antrian",
};

//KEY
export const KEY = {
  BACKEND_URL: "http://localhost:3001",
  BACKEND_URL_WEBSOCKET: "ws://localhost:3001",
  SECRET_USER: "1e2laHOmFE",
};

//ACTION TYPE
export const ACTION_TYPE = {
  FETCH_TOKEN_PAGE_START: "FETCH_TOKEN_PAGE_START",
  FETCH_TOKEN_PAGE_SUCCESS: "FETCH_TOKEN_PAGE_SUCCESS",
  FETCH_TOKEN_PAGE_ERROR: "FETCH_TOKEN_PAGE_ERROR",

  FETCH_MONITOR_ANTRIAN_START: "FETCH_MONITOR_ANTRIAN_START",
  FETCH_MONITOR_ANTRIAN_SUCCESS: "FETCH_MONITOR_ANTRIAN_SUCCESS",
  FETCH_MONITOR_ANTRIAN_ERROR: "FETCH_MONITOR_ANTRIAN_ERROR",

  FETCH_LOKET_PANGGIL_ANTRIAN_START: "FETCH_LOKET_PANGGIL_ANTRIAN_START",
  FETCH_LOKET_PANGGIL_ANTRIAN_SUCCESS: "FETCH_LOKET_PANGGIL_ANTRIAN_SUCCESS",
  FETCH_LOKET_PANGGIL_ANTRIAN_ERROR: "FETCH_LOKET_PANGGIL_ANTRIAN_ERROR",

  // FETCH_PANGGIL_ANTRIAN_START: "FETCH_PANGGIL_ANTRIAN_START",
  // FETCH_PANGGIL_ANTRIAN_SUCCESS: "FETCH_PANGGIL_ANTRIAN_SUCCESS",
  // FETCH_PANGGIL_ANTRIAN_ERROR: "FETCH_PANGGIL_ANTRIAN_ERROR",
};

//MESSAGE
export const MESSAGE = {
  MESSAGE_TOKEN_PAGE_PROCESS: "Berhasil menghubungkan dengan server..",
  MESSAGE_TOKEN_PAGE_SUCCESS: "",
  MESSAGE_MONITOR_ANTRIAN_PROCESS: "Berhasil menghubungkan dengan server..",
  MESSAGE_MONITOR_ANTRIAN_SUCCESS: "",
  // MESSAGE_PANGGIL_ANTRIAN_PROCESS: "Berhasil menghubungkan dengan server..",
  // MESSAGE_PANGGIL_ANTRIAN_SUCCESS: "",
  MESSAGE_LOKET_PROCESS: "Berhasil menghubungkan dengan server..",
  MESSAGE_LOKET_SUCCESS: "",
};

export const MENU_APP = [
  {
    img: "counter",
    color:
      "bg-blue-500 bg-gradient-to-t from-blue-600 hover:bg-blue-500 duration-100 transition-all ease-in-out hover:scale-105",
    icon: <PiTicket size={50} />,
    link: ROUTE.ANTRIAN,
    title: "Ambil Antrian",
  },
  {
    img: "waiting",
    color:
      "bg-green-500 bg-gradient-to-t from-green-600 hover:bg-green-500 duration-100 transition-all ease-in-out hover:scale-105",
    icon: <PiSpeakerSimpleHigh size={50} />,
    link: ROUTE.MONITOR_ANTRIAN,
    title: "Monitor Antrian",
  },
  {
    img: "apps",
    color:
      "bg-red-500 bg-gradient-to-t from-red-600 hover:bg-red-500 duration-100 transition-all ease-in-out hover:scale-105",
    icon: <GrAppsRounded size={50} />,
    link: ROUTE.PANGGIL_ANTRIAN,
    title: "Panggil Antrian",
  },
];
