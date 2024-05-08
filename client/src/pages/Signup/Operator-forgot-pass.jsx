import React, { useState } from "react";
import elipes1 from "../../assets/images/ellipse1.png";
import elipes2 from "../../assets/images/ellipse2.png";
import arrow from "../../assets/images/arrow.png";
import { FaArrowRight } from "react-icons/fa6";
import Passwordbox from "../../components/ui/Passwordbox";
import Button from "../../components/ui/Button";
import InputBox from "../../components/ui/InputBox";
import UnstyledSelectTransitions from "../../components/ui/Dropdown";

const OperatorSignUpOtp = () => {
  return (
    <div
      className="hero-background relative border border-red-600 h-screen bg-cover bg-center px-20 grid grid-rows-12 grid-cols-12 gap-4"
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
        <div className="flex flex-col items-center justify-center row-start-4 row-end-10 col-start-5 col-end-9">
            <div className="flex flex-col gap-[1.5rem] w-full">
                <h1 className="text-[53px]">forgot password ?</h1>
                <h4 className="text-[20px]">Enter your email address and we’ll send a link to <br />reset your password.</h4>
                <input type="email" placeholder="Email" className="bg-primary outline-none w-full h-6 py-5 px-4 rounded-lg text-sm text-text_primary "/>
                <div className="flex justify-between">
                    <Button name={"Go Back"}/>
                    <Button name={"Send Link"} icon={<FaArrowRight/>}/>
                </div>
            </div>
        </div>
        <p href="#" className="text-text_primary font-bold row-start-11 row-end-12 col-start-6 col-end-9">
            Already have an account{" "}
            <a href="#" className="text-blue-700 font-bold">
              Login
            </a>
          </p>
    {/* Input ends here  */}
    </div>
  );
};

export default OperatorSignUpOtp;
