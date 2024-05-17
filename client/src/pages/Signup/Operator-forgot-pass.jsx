import React from "react";
import arrow from "../../assets/images/arrow.png";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import Button from "../../components/ui/Button";

const OperatorSignUpOtp = () => {
  return (
    <div
      className="background relative h-screen bg-cover bg-center px-20 grid grid-rows-12 grid-cols-12 gap-4"
    >
      
      <img src={arrow} alt="arrow" className="absolute -top-10 h-56 left-96" />
      <h3 className="font-bold absolute top-15 left-30">Logo</h3>

      {/* Input starts here */}
      <div className="flex flex-col justify-center row-start-4 row-end-10 col-start-3 col-end-11 px-[108px]">
        <div className="flex flex-col gap-6 w-full px-25">
          <h1 className="font-semibold">forgot password ?</h1>
          <p className="font-medium text-2xl font-inter tracking-tight">
            Enter your email address and we’ll send a link to <br />
            reset your password.
          </p>
          <input
            type="email"
            placeholder="Email"
            className="bg-primary outline-none w-full h-6 py-5 px-4 rounded-lg text-sm text-text_primary "
          />
          <div className="flex justify-between">
            <Button name={"Go Back"} icon={<FaArrowLeft />} />
            <Button name={"Send Link"} toggle={true} icon={<FaArrowRight />} />
          </div>
        </div>
      </div>
      <p className="text-text_primary text-center row-start-11 row-end-12 col-start-5 col-end-9 roboto">
        Already have an account{" "}
        <a href="/OperatorLogin" className="text-blue-700 roboto">
          Login
        </a>
      </p>
      {/* Input ends here  */}
    </div>
  );
};

export default OperatorSignUpOtp;
