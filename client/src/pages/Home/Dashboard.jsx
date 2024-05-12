import React from "react";
import MainCard from "../../components/ui/MainCard";
import { cardData } from "../../constants";
import profile from "../../assets/icons/Snehashis.png";

const Dashboard = () => {
  return (
    <div className="background h-screen bg-cover bg-center px-20 grid grid-rows-12 grid-cols-12 gap-4">
      <div className="row-start-1 row-end-3 col-start-2 col-end-12 flex justify-between items-center">
        <h3>Logo</h3>
        <div className="flex gap-4 items-center justify-center">
          <div className="flex flex-col items-end">
            <h4 className="text-xl">Snehashis Gharai</h4>
            <h6 className="text-text_primary">Operator</h6>
          </div>
          <img src={profile} alt="" className="w-16 h-16"/>
        </div>
      </div>
      <div className="row-start-3 row-end-11 col-start-4 col-end-10 grid grid-rows-2 grid-cols-2 gap-6">
        {cardData.map((items, index) => {
          return (
            <MainCard
              img={items.img}
              title={items.title}
              subtitle={items.subtitle}
              position={items.position}
              shadow={items.shadow}
              posV={items.posV}
              background={items.background}
              page={items.page}
            />
          );
        })}
      </div>
      {/* <MainCard/> */}
    </div>
  );
};

export default Dashboard;
