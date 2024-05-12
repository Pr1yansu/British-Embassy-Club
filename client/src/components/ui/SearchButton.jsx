import React from "react";

const SearchButton = ({ name, icon, toggle }) => {
  return (
    <>
      <button className="h-full w-full flex items-center justify-center gap-2 px-6 py-2 rounded-lg bg-blue-700 text-white text-xl  hover:shadow-md hover:shadow-blue-500 hover:bg-blue-600  ...">
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

export default SearchButton;
