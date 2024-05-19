import React from "react";

const Button = ({ name, icon, toggle , type }) => {
  return (
    <>
      <button
        className={`flex gap-2 items-center justify-center px-9 py-2 rounded-xl transition ease-in-out delay-150 hover:text-white text-blue-600 hover:shadow-md hover:shadow-blue-500 hover:bg-blue-600 bg-white duration-300 roboto shadow-btn_shadow font-medium`}
        type={type}
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

export default Button;
