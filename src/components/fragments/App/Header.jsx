import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ROUTE } from "../../../services/data";
import { AiOutlineAppstore } from "react-icons/ai";
import { ImConnection } from "react-icons/im";
import { UrlChecker } from "../../../services/GlobalFunction";

//when the token is lost then redirect page to app

export default function Header(props) {
  const { loading } = props;

  const [pathHome, setPathHome] = useState(false);
  const pathname = window.location.pathname;
  const resultCheckUrl = UrlChecker();
  useEffect(() => {
    // if current route path is not /app then enabled home button
    if (pathname != "/app") {
      setPathHome(true);
    }
  }, []);

  return (
    <div className="flex items-center justify-between h-16 px-8 border-2 header border-slate-100">
      <div>
        <h1 className="text-3xl font-bold tracking-tighter text-slate-500">
          <span className="text-blue-900">DESK</span>ANTRI
        </h1>
      </div>
      <div className="flex items-center justify-center gap-x-3">
        {pathHome && (
          <Link to={ROUTE.APP}>
            <AiOutlineAppstore size={30} className="text-slate-800" />
          </Link>
        )}

        <ImConnection
          className={`${
            resultCheckUrl ? "text-red-600" : "text-green-600"
          } pulse-animation`}
          size={30}
        />
      </div>
    </div>
  );
}
