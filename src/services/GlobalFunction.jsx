import { useEffect, useState } from "react";
import { KEY, ROUTE } from "./data";

export const checkTokenPageLocalStorage = () => {
  const tokenPage = localStorage.getItem("Page-Token");
  if (!tokenPage) {
    window.location.href = ROUTE.APP;
  }
};

export function UrlChecker() {
  const [isUrlActive, setIsUrlActive] = useState(false);
  const urlToCheck = `${KEY.BACKEND_URL}/v1/check-version`; // ganti dengan URL yang ingin diperiksa

  useEffect(() => {
    // Fungsi untuk memeriksa apakah URL aktif atau tidak
    const checkUrlStatus = () => {
      try {
        fetch(urlToCheck, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Page-Token": localStorage.getItem("Page-Token"),
          },
        })
          .then((response) => setIsUrlActive(false))
          .catch((error) => setIsUrlActive(true)); // Status dianggap aktif jika response.ok true
      } catch (error) {
        setIsUrlActive(true); // Jika terjadi error, anggap URL tidak aktif
      }
    };

    // Memanggil checkUrlStatus setiap 10 detik
    const interval = setInterval(checkUrlStatus, 20000);

    // Panggilan awal sebelum interval
    checkUrlStatus();

    // Membersihkan interval saat komponen di-unmount
    return () => clearInterval(interval);
  }, []);
  return isUrlActive;
}
