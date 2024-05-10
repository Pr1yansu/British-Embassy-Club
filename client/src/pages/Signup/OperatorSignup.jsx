import React, { useState } from "react";
import arrow from "../../assets/images/arrow.png";
import Passwordbox from "../../components/ui/Passwordbox";
import Button from "../../components/ui/Button";
import InputBox from "../../components/ui/InputBox";
import { IoIosArrowDown } from "react-icons/io";
import { FaArrowRight } from "react-icons/fa6";

const OperatorSignup = () => {
  const [show, setShow] = useState(false);
  const toggle = () => {
    setShow(!show);
  };
  const [selectedID, setSelectedID] = useState("Select your documnet");

  const handleChange = (event) => {
    setSelectedID(event.target.value);
  };

  return (
    <div
      className={`background relative min-h-screen bg-cover bg-center py-10 px-20 `}
    >
      <img
        src={arrow}
        alt="arrow"
        className="absolute top-0 h-56 xl:left-80 lg:left-64 max-lg:hidden "
      />
      <h3 className="font-bold">Logo</h3>

      {/* Input starts here */}
      <div className="grid lg:grid-rows-1 lg:grid-cols-2 max-lg:grid-rows-2 max-lg:grid-cols-1 h-full lg:pt-40 ">
        <div className="flex flex-col gap-4 items-center text-center justify-start max-lg:order-2 max-lg:justify-center ">
          <div className="w-3/5 flex flex-col gap-4 items-center justify-center">
            <InputBox placeholder={"Full Name"} type={"text"} />
            <Passwordbox placeholder={"Password"} />
            <Passwordbox placeholder={"Confirm Password"} />
            <InputBox placeholder={"Email"} type={"email"} />
            <InputBox placeholder={"Mobile Number"} type={"tel"} />
            <textarea
              name="Address"
              id="Address"
              placeholder="Address"
              className="bg-primary outline-none w-full h-24 py-5 px-4 rounded-lg text-sm text-text_primary "
            ></textarea>
            <label
              htmlFor="Document"
              className="flex justify-between items-center bg-primary outline-none w-full py-[0.6rem] px-4 rounded-lg text-sm text-text_primary"
            >
              {selectedID} <IoIosArrowDown onClick={toggle} size={20} />
            </label>
            {show && (
              <>
                <div className="flex justify-center gap-32 w-full">
                  <label className="text-text_primary">
                    <input
                      type="radio"
                      value="Aadhaar Card"
                      checked={selectedID === "Aadhaar Card"}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    Aadhaar Card
                  </label>
                  <label className="text-text_primary">
                    <input
                      type="radio"
                      value="Pan Card"
                      checked={selectedID === "Pan Card"}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    Pan Card
                  </label>
                </div>
                <InputBox placeholder={"ID number"} type={"text"} />
              </>
            )}
            <Button name={"Submit"} />
          </div>
        </div>
        {/* Input ends here  */}

        <div className="flex flex-col max-lg:items-center max-sm:items-start max-sm:text-left max-lg:justify-center max-lg:order-1 max-lg:text-center lg:max-w-[32rem] ">
          <h1 className="mb-4">
            be a member member of{" "}
            <span className="text-blue-700 font-bold">
              british embassy club
            </span>
          </h1>
          <div className="font-semibold text-2xl">
            if you already have an account
          </div>
          <h2
            href="#"
            className="flex items-center max:lg-justify-center gap-2  font-semibold text-2xl"
          >
            <p className="font-semibold ">please</p>
            <a href="/OperatorLogin" className="font-semibold text-blue-700">
              login
            </a>
            <FaArrowRight size={22} color="blue" />
          </h2>
        </div>
      </div>
    </div>
  );
};

export default OperatorSignup;
