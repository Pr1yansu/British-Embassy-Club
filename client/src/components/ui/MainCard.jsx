import React from "react";
import dashboard_icon from "../../assets/icons/Dashboard_icon.png";
const MainCard = () => {
  return (
    <>
      <div className="card flex justify-center p-6 rounded-3xl shadow-main_card hover:shadow-main_card_hover duration-300">
        <div className="flex gap-2 items-center ">
          <div className="img-card rounded-full">
            <img
              className="w-full aspect-auto"
              src={dashboard_icon}
              alt="Dashboard_icon"
            />
          </div>
          <div className="">
            <p className="text-base font-semibold">DashBoard</p>
            <p className="text-xs">Overview of the dashboard</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainCard;
