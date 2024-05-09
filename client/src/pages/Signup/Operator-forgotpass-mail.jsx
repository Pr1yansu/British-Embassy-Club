import React, { useState } from "react";
import elipes1 from "../../assets/images/ellipse1.png";
import elipes2 from "../../assets/images/ellipse2.png";
import arrow from "../../assets/images/arrow.png";
import Passwordbox from "../../components/ui/Passwordbox";
import Button from "../../components/ui/Button";

const OperatorResetPassMail = () => {
  return (
    <div
      className="hero-background relative border border-red-600 h-screen bg-cover bg-center px-20 grid grid-rows-11 grid-cols-11 gap-4"
    >
      <img
        src={elipes1}
        alt="background"
        className="absolute w-[52rem] top-0 right-0 -z-10"
      />
      <img
        src={elipes2}
        alt="background"
        className="absolute w-[45rem] bottom-0 left-0 -z-10"
      />
      <img
        src={arrow}
        alt="arrow"
        className="absolute top-0 h-56 left-96 "
      />
      <h3 className="font-bold absolute top-[60px] left-[120px]">Logo</h3>

    {/* Input starts here */}
        <div className="flex flex-col gap-[1.5rem] items-center justify-center row-start-4 row-end-9 col-start-3 col-end-10 border-4">
            <div className="flex flex-col items-center gap-[1.5rem] w-full">
                <h1 className="text-[53px]">Check your email</h1>
                <h4 className="text-[20px]">We just sent an email to your inbox with a <br />link to reset your password</h4>
            </div>
                <Button name={"Login"}/>
        </div>
        <p href="#" className="text-text_primary font-bold row-start-11 row-end-12 col-start-6 col-end-9">
            Already have an account{" "}
            <a href="/OperatorLogin" className="text-blue-700 font-bold">
              Login
            </a>
          </p>
    {/* Input ends here  */}
    </div>
  );
};

export default OperatorResetPassMail;
