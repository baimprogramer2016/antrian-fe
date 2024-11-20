import React, { useEffect, useReducer, useState } from "react";
import AntrianLayout from "../components/layouts/AntrianLayout";
import Header from "../components/fragments/App/Header";
import Footer from "../components/fragments/App/Footer";
import { fetchMonitorAntrian } from "../services/MonitorAntrian/MonitorAntrianService";
import { checkTokenPageLocalStorage } from "../services/GlobalFunction";
import {
  initialStateMonitorAntrian,
  monitorAntrianReducer,
} from "../services/MonitorAntrian/MonitorAntrianReducer";
import { ACTION_TYPE, KEY, MESSAGE } from "../services/data";

export default function MonitorAntrian() {
  checkTokenPageLocalStorage();

  //REDUCER
  const [stateMonitorAntrian, dispatchMonitorAntrian] = useReducer(
    monitorAntrianReducer,
    initialStateMonitorAntrian
  );

  //1. Step 1 fetch token page with API
  useEffect(() => {
    dispatchMonitorAntrian({
      type: ACTION_TYPE.FETCH_MONITOR_ANTRIAN_START,
      payload: {
        loading: true,
        message: MESSAGE.MESSAGE_MONITOR_ANTRIAN_PROCESS,
      },
    });
    //take process for fetch token and show loading process
    fetchMonitorAntrian()
      .then((data) => {
        console.log(data);

        dispatchMonitorAntrian({
          type: ACTION_TYPE.FETCH_MONITOR_ANTRIAN_SUCCESS,
          payload: {
            loading: false,
            message: MESSAGE.MESSAGE_MONITOR_ANTRIAN_SUCCESS,
            data: data,
          },
        });
      })
      .catch((err) => {
        dispatchMonitorAntrian({
          type: ACTION_TYPE.FETCH_MONITOR_ANTRIAN_ERROR,
          payload: {
            loading: true,
            message: err.message,
          },
        });
      })
      .finally(() => {});
  }, []);

  //2. Step 2 fetch token page with Websocket

  // 2. Step 2: Create WebSocket connection and listen for messages
  useEffect(() => {
    const socket = new WebSocket(`${KEY.BACKEND_URL_WEBSOCKET}/v1/ws-antrian`);

    // When WebSocket connection is open
    socket.onopen = () => {
      console.log("WebSocket connected");
      socket.send("app-react");
    };

    // When receiving a message from the server
    socket.onmessage = (event) => {
      const datajson = JSON.parse(event.data);

      splitText(datajson.text_panggilan);

      dispatchMonitorAntrian({
        type: ACTION_TYPE.FETCH_MONITOR_ANTRIAN_SUCCESS,
        payload: {
          loading: false,
          message: "Data updated via WebSocket",
          data: datajson,
        },
      });
    };

    // Handle any errors that occur.
    socket.onerror = (error) => {
      console.log("WebSocket Error:", error);
      dispatchMonitorAntrian({
        type: ACTION_TYPE.FETCH_MONITOR_ANTRIAN_ERROR,
        payload: {
          loading: false,
          message: "Error receiving WebSocket data",
        },
      });
    };

    // When the WebSocket connection is closed
    socket.onclose = () => {
      console.log("WebSocket closed");
      socket.close();
    };

    // Cleanup WebSocket connection on component unmount
    // return () => {
    //   socket.close();
    // };
  }, []);

  function splitText(text) {
    const kalimat = text.split(" ");

    console.log(text);
    let index = 0;

    function playNext() {
      if (index < kalimat.length) {
        audioAntrian(kalimat[index], playNext); // Panggil audio untuk kata saat ini
        index++;
      }
    }

    playNext(); // Mulai memutar dari kata pertama
  }

  let isPlaying = false;

  function audioAntrian(nama_audio, callback) {
    if (isPlaying) return; // Mencegah audio baru diputar jika audio masih berjalan

    const audio = new Audio("/assets/audio/" + nama_audio + ".mp3");
    isPlaying = true;

    audio.play().catch((error) => {
      console.error("Gagal memutar audio:", error);
      isPlaying = false; // Reset flag jika gagal memutar
    });

    audio.onended = () => {
      isPlaying = false; // Reset flag setelah audio selesai
      setTimeout(() => {
        if (callback) callback();
      }, 10);
    };
  }

  return (
    <AntrianLayout>
      <Header />
      <div className="grid flex-grow grid-cols-2 ">
        <AntrianCurrent data_antrian={stateMonitorAntrian} />
        <AntrianCounter data_antrian={stateMonitorAntrian} />
      </div>
      <Footer />
    </AntrianLayout>
  );
}

function AntrianCurrent(props) {
  const { loading, message } = props.data_antrian;
  const { jumlah_kunjungan, antrian } = props.data_antrian.data;
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between h-24 mb-4 bg-green-100">
        <div className="flex items-center w-8/12 h-full px-8 text-3xl font-semibold tracking-tighter text-white bg-blue-800">
          JUMLAH KUNJUNGAN
        </div>
        <div className="flex items-center justify-center w-4/12 h-full text-5xl font-semibold tracking-tighter text-white bg-sky-500">
          {jumlah_kunjungan ?? 0} Pasien
        </div>
      </div>
      <div className="flex flex-col justify-start flex-grow mx-8 overflow-hidden bg-blue-800 rounded-xl">
        <div className="mt-2 mb-4 text-4xl font-semibold tracking-tighter text-center text-slate-100">
          Antrian Saat ini
        </div>

        <div
          className={`${
            loading
              ? "flex items-center justify-center h-80 "
              : "grid grid-flow-col px-6 sm:grid-rows-3 md:grid-rows-3 gap-x-2 gap-y-4"
          }`}
        >
          {loading ? (
            <p className="text-3xl text-white">{message}</p>
          ) : (
            antrian?.map((antrian, index) => (
              <CardAntrianSaatIni key={index} data_antrian={antrian} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

function CardAntrianSaatIni(props) {
  const { loket, nomor_antrian, aktif, panggil } = props.data_antrian;

  return (
    <div className="flex items-center justify-start ">
      <div className="flex items-center w-3/12 p-4 text-6xl font-semibold text-white bg-blue-500 h-28 rounded-l-md">
        {loket ? loket : "-"}
      </div>
      <div
        className={`${
          panggil == 1 ? "animate-blink" : ""
        } flex items-center w-full p-4 text-6xl font-semibold bg-white h-28 rounded-r-md`}
      >
        {nomor_antrian ? nomor_antrian : "-"}
      </div>
    </div>
  );
}

function AntrianCounter(props) {
  const { loading, message } = props.data_antrian;
  const { nomor_panggil, loket } = props.data_antrian.data;

  return (
    <div className="flex items-center justify-center p-10 bg-gray-300 shadow border-slate-100 ">
      {loading ? (
        <p className="text-3xl">{message}</p>
      ) : (
        <div className="flex flex-col items-center justify-center w-full h-full bg-white rounded-lg shadow pulse-animation">
          <h1 className="mb-5 text-5xl font-semibold text-slate-800">
            Nomor Antrian
          </h1>
          <h1 className="font-semibold text-black text-9xl">
            {nomor_panggil ? nomor_panggil : "-"}
          </h1>
          <p className="mt-5 font-semibold tracking-tighter text-blue-800 text-8xl">
            Loket {loket ?? "Loading"}
          </p>
        </div>
      )}
    </div>
  );
}
