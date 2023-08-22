import React from "react";
import Logo from "../../assets/images/Taiyo-logo.png";
import { useLocation, useNavigate } from "react-router";

const Sidebar = ({ children }: any) => {
  const location = useLocation();
  const navigate = useNavigate();

  const isContactMenu =
    location.pathname === "/" || location.pathname === "/contact-form";

  const isLineChartMenu = location.pathname === "/line-chart";
  const isMapMenu = location.pathname === "/leaflet-map";

  return (
    <>
      <div className="w-full flex flex-col">
        <div className="w-full h-16 flex justify-center p-4 border-b-2 border-gray-500">
          <div className="flex w-full items-center">
            <div className="w-[45%]">
              <div className="w-40 h-11 ">
                <img
                  src={Logo}
                  alt="logo"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            <div>
              <h1 className="text-3xl bold ">
                {isContactMenu
                  ? "Contact"
                  : isLineChartMenu
                  ? "Line Chart"
                  : isMapMenu
                  ? "Leaflat map"
                  : "Contact-Edit-Form"}
              </h1>
            </div>
          </div>
        </div>
        {/* Sidebar */}

        <div className="flex">
          <div className="w-40 border-r-2 h-screen  border-gray-500">
            <div className="flex flex-col gap-2">
              <p
                className={`p-2  w-full text-center  cursor-pointer hover:bg-slate-300 ${
                  isContactMenu && "bg-slate-300"
                }`}
                onClick={() => navigate("/")}
              >
                Contact
              </p>
              <p
                className={`p-2  w-full text-center  cursor-pointer hover:bg-slate-300 ${
                  isLineChartMenu && "bg-slate-300"
                }`}
                onClick={() => navigate("/line-chart")}
              >
                Line-Chart
              </p>
              <p
                className={`p-2  w-full text-center  cursor-pointer hover:bg-slate-300 ${
                  isMapMenu && "bg-slate-300"
                }`}
                onClick={() => navigate("/leaflet-map")}
              >
                Leflet-Map
              </p>
            </div>
          </div>

          {/* childern components */}
          <div className="w-full p-4 flex justify-center">{children}</div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
