import React from "react";
import AntrianLayout from "../components/layouts/AntrianLayout";
import Header from "../components/fragments/App/Header";
import Footer from "../components/fragments/App/Footer";

export default function AmbilAntrian() {
  return (
    <AntrianLayout>
      <Header />
      <div
        className="flex items-center justify-center flex-grow px-8 bg-cover"
        // style={{ backgroundImage: `url(/assets/wp-app.jpg)` }}
      >
        Ambil Antrian
      </div>
      <Footer />
    </AntrianLayout>
  );
}
