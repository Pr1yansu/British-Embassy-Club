import React, { useState } from "react";

const InputBox = ({ type, placeholder, id, onChange }) => {
  const [mobileNumber, setMobileNumber] = useState("");

  const handleChange = (event) => {
    const formattedNumber = event.target.value.replace(/[^\d]/g, ""); // Remove non-numeric characters
    setMobileNumber(formattedNumber);
  };
  return (
    <>
      {type === "tel" ? (
        <input
          type={type && type}
          maxLength="10"
          minLength="10"
          onChange={handleChange}
          pattern="[0-9]{10}"
          title="Mobile number should be 10 digits"
          id={id}
          placeholder={placeholder && placeholder}
          className=" bg-primary outline-none sm:w-3/5 max-sm:w-4/5 h-6 py-5 px-4 rounded-lg text-sm text-text_primary "
        />
      ) : (
        <input
          type={type && type}
          id={id}
          placeholder={placeholder && placeholder}
          className=" bg-primary outline-none sm:w-3/5 max-sm:w-4/5 h-6 py-5 px-4 rounded-lg text-sm text-text_primary "
        />
      )}
    </>
  );
};

export default InputBox;