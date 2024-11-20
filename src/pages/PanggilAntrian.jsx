import React, { useEffect, useRef, useState } from "react";
import AntrianLayout from "../components/layouts/AntrianLayout";
import Footer from "../components/fragments/App/Footer";
import Header from "../components/fragments/App/Header";
import PilihLoket from "../components/fragments/PanggilAntrian/PilihLoket";

export default function PanggilAntrian() {
  console.log("render gk");

  return (
    <AntrianLayout>
      <Header />
      <div
        className="grid flex-grow grid-cols-12 px-8 bg-cover "
        // style={{ backgroundImage: `url(/assets/wp-app.jpg)` }}
      >
        <div className="flex flex-col items-center col-span-2 p-4">
          <PilihLoket />
        </div>
        <div className="col-span-10 border-l-2 border-slate-100">Kanan</div>
      </div>
      <Footer />
    </AntrianLayout>
  );
}
