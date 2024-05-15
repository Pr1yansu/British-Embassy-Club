import React from "react";

const ButtonGroup = ({
  name,
  icon,
  toggle,
  color,
  textColor,
  type,
  onClick,
}) => {
  return (
    <>
      <button
        className={`flex gap-2 items-center justify-center px-6 py-2 rounded-lg transition ease-in-out delay-150 ${color} ${textColor} text-xl font-medium hover:-translate-y-[1px] hover:shadow-md hover:shadow-blue-500 hover:scale-110 duration-300 roboto shadow-btn_shadow`}
        type={type}
        onClick={onClick}
      >
        {toggle ? (
          <>
            {name && name}
            {icon && icon}
          </>
        ) : (
          <>
            {icon && icon}
            {name && name}
          </>
        )}
      </button>
    </>
  );
};

export default ButtonGroup;
