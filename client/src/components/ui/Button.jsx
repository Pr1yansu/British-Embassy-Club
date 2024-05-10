import React from "react";

const Button = ({ name, icon, toggle ,color , type }) => {
  return (
    <>
      <button
        className={`flex gap-2 items-center justify-center px-6 py-2 rounded-lg transition ease-in-out delay-150 bg-blue-700 text-white hover:-translate-y-[1px] hover:shadow-md hover:shadow-blue-500 hover:scale-110 hover:bg-blue-600 duration-300 ...`}
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
