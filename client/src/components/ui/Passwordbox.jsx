import React, { useState } from "react";
import { LuEye, LuEyeOff } from "react-icons/lu";
const Passwordbox = ( {placeholder, id}) => {

  const [eye, setEye] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
  return (
    <>
      <div className="relative w-3/5">
        <input
          type={showPassword ? "text" : "password"}
          id={id}
          placeholder={placeholder && placeholder}
          className=" bg-primary outline-none w-full  h-6 py-5 pl-4 pr-12 rounded-lg text-sm text-text_primary"
        />

        {eye ? (
          <LuEye
            size={18}
            color="#6B7280"
            className="absolute right-4 top-3 cursor-pointer"
            onClick={() => {
              setEye(!eye);
              setShowPassword(!showPassword);
            }}
          />
        ) : (
          <LuEyeOff
            size={18}
            color="#6B7280"
            className="absolute right-4 top-3 cursor-pointer"
            onClick={() => {
              setEye(!eye);
              setShowPassword(!showPassword);
            }}
          />
        )}
      </div>
    </>
  );
};

export default Passwordbox;