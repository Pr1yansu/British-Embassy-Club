import React, { useState } from "react";
import { motion } from "framer-motion";
import arrow from "../../assets/icons/sidebar_arrow.png";
import { sidebarItem1, sidebarItem2 } from "../../constants";
const Sidebar = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [title, setTitle] = useState("");
  const [alter, setAlter] = useState("");
  return (
    <>
      {showSidebar ? (
        <motion.div
          className="h-screen w-screen fixed top-0 right-0 left-0 bottom-0 z-40"
          initial={{ x: -80, y: 0, opacity: 0 }}
          exit={{ x: -50, y: 0, opacity: 0 }}
          animate={{ x: 0, y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          onClick={() => {
            setShowSidebar(false);
          }}
        >
          <div
            className=" absolute top-0 left-0 bottom-0 grid grid-rows-12 grid-cols-4 rounded-r-2xl w-[280px] z-50 items-center justify-center  bg-[#E2E8F0]"
            onClick={(val) => {
              val.stopPropagation();
            }}
          >
            <div className=" row-start-1 row-end-3 col-start-2 col-end-4  text-center p-6">
              Logo
            </div>
            <div className="row-start-4 row-end-8 col-start-2 col-end-4 flex flex-col items-start justify-center gap-7 mb-[5px]">
              {sidebarItem1.map((item, index) => {
                return (
                  <div
                    className="flex gap-4 items-start justify-center cursor-pointer"
                    id={index}
                    onClick={() => {
                      setTitle(item.title);
                    }}
                  >
                    <img className="cursor-pointer"
                      src={item.title === title ? item.iconBold : item.icon}
                      alt="icons"
                    />
                    <p
                      className={`text-lg ${
                        item.title === title
                          ? "text-black font-semibold"
                          : "text-text_primary"
                      } `}
                    >
                      {item.title}
                    </p>
                  </div>
                );
              })}
            </div>
            <div className="rounded-full row-start-11 row-end-12 col-start-2 col-end-4  flex items-center justify-center ">
              <img
                src={arrow}
                alt="sidebar_arrow"
                className="cursor-pointer w-10"
                onClick={() => setShowSidebar(!showSidebar)}
              />
            </div>
          </div>
        </motion.div>
      ) : (
        <div className="h-full grid grid-rows-12 grid-cols-1  rounded-r-2xl bg-[#E2E8F0] z-50 items-center justify-center">
          <div className="row-start-4 row-end-8 flex flex-col gap-8  items-center ">
            {sidebarItem2.map((item, index) => {
              return (
                <>
                  <img
                    src={item.alter === alter ? item.iconBold : item.icon}
                    alt={item.alter}
                    className="w-6 cursor-pointer"
                    onClick={() => setAlter(item.alter)}
                  />
                </>
              );
            })}
          </div>
          <div className="row-start-11 row-end-12 rounded-full flex items-center justify-center ">
            <img
              onClick={() => setShowSidebar(!showSidebar)}
              src={arrow}
              alt="sidebar_arrow"
              className="-rotate-180 w-10 cursor-pointer"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
