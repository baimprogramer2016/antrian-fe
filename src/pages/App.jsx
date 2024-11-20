import React, { useEffect, useReducer, useState } from "react";
import Header from "../components/fragments/App/Header";
import CardApp from "../components/fragments/App/CardApp";
import Footer from "../components/fragments/App/Footer";

import AntrianLayout from "../components/layouts/AntrianLayout";

import { ACTION_TYPE, MESSAGE, MENU_APP } from "../services/data";
import { fetchTokenPage } from "../services/tokenPages/TokenPageService";
import {
  initialStateTokenPage,
  tokenPageReducer,
} from "../services/tokenPages/TokenPagesReducer";

export default function App() {
  //REDUCER
  const [stateTokenPage, dispatchTokenPage] = useReducer(
    tokenPageReducer,
    initialStateTokenPage
  );

  //fetch token page
  useEffect(() => {
    //take process for fetch token and show loading process
    fetchTokenPage()
      .then((data) => {
        dispatchTokenPage({
          type: ACTION_TYPE.FETCH_TOKEN_PAGE_START,
          payload: {
            loading: true,
            message: MESSAGE.MESSAGE_TOKEN_PAGE_PROCESS,
          },
        });

        dispatchTokenPage({
          type: ACTION_TYPE.FETCH_TOKEN_PAGE_SUCCESS,
          payload: {
            loading: false,
            message: MESSAGE.MESSAGE_TOKEN_PAGE_SUCCESS,
            token: data.token,
          },
        });

        //save token in local storage
        localStorage.setItem("Page-Token", data.token);
      })
      .catch((err) => {
        localStorage.removeItem("Page-Token");

        dispatchTokenPage({
          type: ACTION_TYPE.FETCH_TOKEN_PAGE_ERROR,
          payload: {
            loading: true,
            message: err.message,
          },
        });
      })
      .finally(() => {});
  }, []);

  return (
    <AntrianLayout>
      <Header loading={stateTokenPage.loading} />
      <div
        className="flex items-center justify-center flex-grow px-8 bg-cover"
        style={{ backgroundImage: `url(/assets/wp-app.jpg)` }}
      >
        <div className="flex flex-wrap items-center justify-center w-full gap-4 mt-5 md:mt-0">
          {stateTokenPage.loading ? ( // Cek apakah loading true
            <div className="flex items-center justify-center w-full h-16 text-center bg-white rounded shadow loader md:w-3/12">
              {" "}
              {/* Tambahkan kelas loader sesuai kebutuhan */}
              {stateTokenPage.message}
            </div>
          ) : (
            MENU_APP.map((item, index) => {
              return (
                <CardApp
                  key={index}
                  img={item.img}
                  color={item.color}
                  icon={item.icon}
                  target={item.link}
                >
                  {item.title}
                </CardApp>
              );
            })
          )}
        </div>
      </div>
      <Footer />
    </AntrianLayout>
  );
}
