import React, { useState } from "react";
import elipes1 from "../../assets/images/ellipse1.png";
import elipes2 from "../../assets/images/ellipse2.png";
import arrow from "../../assets/images/arrow.png";
import { FaArrowRight } from "react-icons/fa6";
import Passwordbox from "../../components/ui/Passwordbox";
import Button from "../../components/ui/Button";
import InputBox from "../../components/ui/InputBox";
import UnstyledSelectTransitions from "../../components/ui/Dropdown";

const ClubSignUpOtp = () => {
  return (
    <div
      className={`hero-background relative h-screen bg-cover bg-center py-10 px-20 `}
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
        className="absolute top-0 h-56 xl:left-80 lg:left-64 max-lg:hidden "
      />
      <h3 className="font-bold">Logo</h3>

    {/* Input starts here */}
      <div className="grid lg:grid-rows-1 lg:grid-cols-2 max-lg:grid-rows-2 max-lg:grid-cols-1 h-full lg:pt-40 ">
        <div className="flex flex-col gap-4 items-center text-center justify-start max-lg:order-2 max-lg:justify-center ">
          <InputBox placeholder={"Write your verification code here"} type={"text"}/>
          <p className="text-text_primary">Please contact admin for the verification code</p>
          <Button name={"Submit"} />
          <p href="#" className="text-text_primary font-bold">
            Didn't recieve any code? <a href="#" className="text-blue-700 font-bold">Resend</a>
          </p>
        </div>
    {/* Input ends here  */}


        <div className="flex flex-col max-lg:items-center max-sm:items-start max-sm:text-left max-lg:justify-center max-lg:order-1 max-lg:text-center lg:max-w-[32rem] ">
          <h1 className="mb-4">
            be a member member of{" "}
            <span className="text-blue-700 font-bold">
              british embassy club
            </span>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default ClubSignUpOtp;
