import React, { useEffect, useReducer, useState } from "react";
import { checkTokenPageLocalStorage } from "../../../services/GlobalFunction";
import {
  initialStateLoketPanggilAntrian,
  loketPanggilAntrianReducer,
} from "../../../services/PanggilAntrian/LoketPanggilAntrianReducer";
import { fetchLoketPanggilAntrian } from "../../../services/PanggilAntrian/LoketPanggilAntrianService";
import { ACTION_TYPE, MESSAGE } from "../../../services/data";
import { GiNetworkBars } from "react-icons/gi";

function PilihLoket() {
  checkTokenPageLocalStorage();

  //FETCH DATA
  const [stateLoketPanggilAntrian, dispatchLoketPanggilAntrian] = useReducer(
    loketPanggilAntrianReducer,
    initialStateLoketPanggilAntrian
  );

  //1. Step 1 fetch token page with API
  useEffect(() => {
    console.log("render effect");
    dispatchLoketPanggilAntrian({
      type: ACTION_TYPE.FETCH_LOKET_PANGGIL_ANTRIAN_START,
      payload: {
        loading: true,
        message: MESSAGE.MESSAGE_LOKET_PROCESS,
      },
    });
    //take process for fetch token and show loading process
    fetchLoketPanggilAntrian()
      .then((data) => {
        dispatchLoketPanggilAntrian({
          type: ACTION_TYPE.FETCH_LOKET_PANGGIL_ANTRIAN_SUCCESS,
          payload: {
            loading: false,
            message: MESSAGE.MESSAGE_LOKET_SUCCESS,
            data: data,
          },
        });
      })
      .catch((err) => {
        dispatchLoketPanggilAntrian({
          type: ACTION_TYPE.FETCH_LOKET_PANGGIL_ANTRIAN_ERROR,
          payload: {
            loading: true,
            message: err.message,
          },
        });
      })
      .finally(() => {});
  }, []);
  //FETCH DATA END
  //**************************************************** */

  // CHANGE LOKET
  const [loket, setLoket] = useState(0);

  // cek dari storage
  useEffect(() => {
    cekLoket(setLoket);
  }, []);

  // CHANGE LOKET END

  return (
    <>
      {stateLoketPanggilAntrian.loading ? (
        <p className="flex items-center justify-center text-sm font-semibold text-left text-slate-600 gap-x-4">
          <GiNetworkBars size={30} color="green" />
          {stateLoketPanggilAntrian.message}
        </p>
      ) : (
        <>
          <div className="">
            <h1 className="mb-3 text-2xl font-bold tracking-tighter text-slate-800">
              LOKET
            </h1>
          </div>
          <div className="flex items-center justify-center w-full py-4 mb-3 font-bold text-white bg-pink-600 rounded-lg text-7xl">
            {loket}
          </div>
          <div className="grid w-full grid-cols-2 gap-x-2 gap-y-2">
            {stateLoketPanggilAntrian.data.map((item) => {
              return (
                <ButtonPilihLoket
                  clickloket={setLoket}
                  nomorloket={item.kode}
                  key={item.id}
                >
                  {item.deskripsi}
                </ButtonPilihLoket>
              );
            })}

            <ButtonResetLoket clickloket={setLoket} nomorloket={0}>
              Reset
            </ButtonResetLoket>
          </div>
        </>
      )}
    </>
  );
}

function cekLoket(setLoket) {
  const loketDipilih = localStorage.getItem("loket-service"); // Ambil data dari localStorage dengan kunci 'loket'
  if (loketDipilih) {
    setLoket(loketDipilih);
  }
}
function ButtonPilihLoket({ children, clickloket, nomorloket }) {
  const clickLoket = (nomor_loket) => {
    clickloket(nomor_loket);
    localStorage.setItem("loket-service", nomor_loket);
  };

  return (
    <div
      onClick={() => {
        clickLoket(nomorloket);
      }}
      className="w-full p-4 font-semibold tracking-tighter text-center text-white bg-indigo-800 rounded-md cursor-pointer "
    >
      {children}
    </div>
  );
}
function ButtonResetLoket({ children, clickloket, nomorloket }) {
  const clickLoket = (nomor_loket) => {
    clickloket(nomor_loket);
    localStorage.setItem("loket-service", nomor_loket);
  };

  return (
    <div
      onClick={() => clickLoket(nomorloket)}
      className="w-full col-span-2 p-4 font-semibold tracking-tighter text-center text-white bg-red-800 rounded-md cursor-pointer bg-gradient-to-l from-red-700 to-red-800"
    >
      {children}
    </div>
  );
}

export default PilihLoket;
