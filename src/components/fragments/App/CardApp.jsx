import React from "react";
import { Link } from "react-router-dom";

export default function CardApp(props) {
  const { img, color, children, icon, target } = props;

  return (
    <>
      <Link
        to={target}
        className="w-full overflow-hidden bg-white rounded shadow-md cursor-pointer md:w-2/12"
      >
        <div>
          <img
            className="hidden duration-300 ease-in-out md:block hover:scale-105 transation-all"
            src={`/assets/${img}.png`}
            alt=""
          />
        </div>
        <div
          className={`w-full  ${color}  text-white py-4 flex flex-col items-center justify-center gap-x-2`}
        >
          {icon}
          <h1 className="font-normal tracking-tighter text-md">{children}</h1>
        </div>
      </Link>
    </>
  );
}
