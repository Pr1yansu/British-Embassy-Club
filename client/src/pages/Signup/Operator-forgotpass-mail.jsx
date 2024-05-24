import React, { useState } from "react";
import arrow from "../../assets/images/arrow.png";
import mailbox from "../../assets/images/mailbox.png";
import ButtonGroup from "../../components/ui/ButtonGroup";
import { IoIosArrowRoundBack } from "react-icons/io";
import {useNavigate} from "react-router-dom"
import logo from "../../assets/images/LOGO.png";
const OperatorResetPassMail = () => {
  const navigate = useNavigate()
  return (
    <div className="background relative h-screen bg-cover bg-center px-20 grid grid-rows-12 grid-cols-12 gap-4">
      <img src={arrow} alt="arrow" className="absolute -top-10 h-56 left-96 " />
      <img src={logo} alt="logo" className="font-bold absolute top-6 left-20" />

      {/* Input starts here */}
      <div className="flex flex-col justify-center row-start-4 row-end-10 col-start-5 col-end-9">
        <h1 className="text-6xl mb-6 font-semibold">Check your email</h1>
        <p className="font-medium text-xl font-inter tracking-tight">
          We just sent an email to your inbox with a 
          link to reset your password
        </p>
        <img src={mailbox} className="h-60 w-60 self-center" />
      </div>
      <div className="row-start-10 row-end-11 col-start-5 col-end-9 flex justify-between">
        <ButtonGroup name={"Go Back"} textColor={"text-btn_primary"} icon={<IoIosArrowRoundBack size={30}/>} toggle={false} onClick={()=>navigate("/login/operator/forgotPass")}/>
        <ButtonGroup name={"Login"} textColor={"text-btn_primary"} onClick={()=>navigate("/login/operator")}/>
      </div>
      {/* Input ends here  */}
    </div>
  );
};

export default OperatorResetPassMail;
