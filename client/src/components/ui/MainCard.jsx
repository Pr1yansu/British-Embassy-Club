import React from "react";
import {useNavigate } from "react-router-dom";
const MainCard = ({img,title,subtitle,position,background,shadow,posV,page}) => {
  const navigate = useNavigate();

  return (
    <>
      <div className={`card flex justify-center items-center rounded-3xl shadow-main_card ${shadow} duration-300 cursor-pointer ${position} ${posV} px-6 bg-white ${background} delay-75`} onClick={()=>{navigate(page)}}>
          <div className="img-card rounded-full">
            <img
              className="w-full aspect-auto"
              src={img}
              alt="icons"
            />
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-lg font-semibold card-title">{title}</p>
            <p className="text-xs text-text_primary card-Subtitle
            ">{subtitle}</p>
          </div>
      </div>
    </>
  );
};

export default MainCard;
