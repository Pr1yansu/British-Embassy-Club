import React, { useState } from "react";
import arrow from "../../assets/images/arrow.png";
import mailbox from "../../assets/images/mailbox.png";
import Button from "../../components/ui/Button";
import ButtonGroup from "../../components/ui/ButtonGroup";
import { IoIosArrowRoundBack } from "react-icons/io";
const OperatorResetPassMail = () => {
  return (
    <div className="background relative  h-screen bg-cover bg-center px-20 grid grid-rows-12 grid-cols-12 gap-4">
      <img src={arrow} alt="arrow" className="absolute -top-10 h-56 left-96 " />
      <h3 className="font-bold absolute top-15 left-30">Logo</h3>

      {/* Input starts here */}
      <div className="flex flex-col justify-center row-start-4 row-end-10 col-start-5 col-end-9">
        <h1 className="text-6xl mb-6 font-semibold">Check your email</h1>
        <p className="font-medium text-xl font-inter tracking-tight">
          We just sent an email to your inbox with a <br />
          link to reset your password
        </p>
        <img src={mailbox} className="h-60 w-60 self-center" />
      </div>
      <div className="row-start-10 row-end-11 col-start-5 col-end-9 flex justify-between">
        <ButtonGroup name={"Go Back"} textColor={"text-btn_primary"} icon={<IoIosArrowRoundBack size={30}/>} toggle={false}/>
        <Button name={"Login"}/>
      </div>
      {/* Input ends here  */}
    </div>
  );
};

export default OperatorResetPassMail;
