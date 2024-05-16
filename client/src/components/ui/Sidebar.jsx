import React, { useState } from "react";
import arrow from "../../assets/icons/sidebar_arrow.png";
import { sidebarItem1, sidebarItem2 } from "../../constants";
const Sidebar = ({value}) => {
  const [sidebar, setSidebar] = useState(false);
  const [column, setColumn] = useState("col-end-2");
  const [item, setItem] = useState("items-center");
  const [mergin, setMergin] = useState("");
  const [title, setTitle] = useState("");
  const [toggle, setToggle] = useState(true);
  const [rotate, setRotate] = useState("-rotate-180");
  const [alter, setAlter] = useState("");
  const handleClick = () => {
    sidebar ? setColumn("col-end-3") : setColumn("col-end-2");
    column === "col-end-2" ? setColumn("col-end-3") : setColumn("col-end-2");
    rotate === "-rotate-180"
      ? setRotate("-rotate-0")
      : setRotate("-rotate-180");
    item === "items-center" ? setItem("items-start") : setItem("items-center");
    mergin === "" ? setMergin("mx-16") : setMergin("");
    setToggle(!toggle);
    setSidebar(!sidebar);
  };
  return (
    <>
      {column === "col-end-3" && (
        <div
          className="h-screen w-screen fixed top-0 right-0 left-0 bottom-0 z-50  bg-slate-400/25"
          onClick={() => {
            handleClick();
          }}
        ></div>
      )}
      <div
        className={`row-start-1 row-end-13 col-start-1 ${column} bg-primary rounded-r-3xl grid grid-rows-12 z-50 `}
      >
        <div
          className={`row-start-4 row-end-9 flex flex-col ${mergin}  ${item}  gap-11`}
        >
          {toggle &&
            sidebarItem2.map((item, index) => {
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
          {!toggle &&
            sidebarItem1.map((item, index) => {
              return (
                <div
                  className="flex gap-4 items-start cursor-pointer"
                  id={index}
                  onClick={() => {
                    setTitle(item.title);
                  }}
                >
                  <img
                    className="cursor-pointer"
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
        <div className="row-start-11 row-end-12 rounded-full flex items-center justify-center ">
          <img
            onClick={() => {
              handleClick();
            }}
            src={arrow}
            alt="sidebar_arrow"
            className={`${rotate} w-10 cursor-pointer `}
          />
        </div>
      </div>
    </>
  );
};

export default Sidebar;
