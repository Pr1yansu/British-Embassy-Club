import React from "react";
import { IoIosSearch } from "react-icons/io";
const SearchBox = ({ type, placeholder, onchange, value }) => {
  return (
    <>
      <div className="relative h-full rounded-lg">
        <input
          type={type}
          placeholder={placeholder}
          onChange={onchange}
          value={value}
          className="bg-primary w-full h-full rounded-lg px-6 py-4 text-text_primary outline-none"
        />
        <IoIosSearch
          className=" absolute cursor-pointer right-5 top-1/3 "
          size={20}
          color="grey"
        />
      </div>
    </>
  );
};

export default SearchBox;