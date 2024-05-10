import React from "react";
const MainCard = ({img,title,subtitle,position,background,shadow,posV}) => {
  return (
    <>
      <div className={`card flex justify-center items-center rounded-3xl shadow-main_card ${shadow} duration-300 cursor-pointer ${position} ${posV} px-6 bg-white ${background} delay-75`}>
          <div className="img-card rounded-full">
            <img
              className="w-full aspect-auto"
              src={img}
              alt="icons"
            />
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-lg font-semibold">{title}</p>
            <p className="text-xs text-text_primary">{subtitle}</p>
          </div>
      </div>
    </>
  );
};

export default MainCard;
