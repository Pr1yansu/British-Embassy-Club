import React from "react";
import arrow from "../../assets/images/arrow.png";
import Passwordbox from "../../components/ui/Passwordbox";
import Button from "../../components/ui/Button";

const OperatorResetPass = () => {
  return (
    <div className="background relative h-screen bg-cover bg-center px-20 grid grid-rows-12 grid-cols-12 gap-4">
      <img src={arrow} alt="arrow" className="absolute top-0 h-56 left-96 " />
      <h3 className="font-bold absolute top-15 left-30">Logo</h3>

      {/* Input starts here */}
      <div className="flex flex-col justify-center row-start-4 row-end-10 col-start-3 col-end-11 px-62">
        <div className="flex flex-col gap-6 w-full">
          <h1 className="text-5.5xl">reset password ?</h1>
          <h1 className="text-xl">
            You are a step away from accessing your <br /> account !
          </h1>
          <Passwordbox placeholder={"New Password"} />
          <Passwordbox placeholder={"Confirm Password"} />
        <div className="flex justify-center">
          <Button name={"Login"} />
        </div>
        </div>
      </div>
      <p className="text-text_primary text-center font-bold row-start-11 row-end-12 col-start-5 col-end-9 roboto">
        Already have an account{" "}
        <a href="/OperatorLogin" className="text-blue-700 font-bold roboto">
          Login
        </a>
      </p>
      {/* Input ends here  */}
    </div>
  );
};

export default OperatorResetPass;
