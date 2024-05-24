import React from "react";
import arrow from "../../assets/images/arrow.png";
import Passwordbox from "../../components/ui/Passwordbox";
import ButtonGroup from "../../components/ui/ButtonGroup";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/LOGO.png";
const OperatorResetPass = () => {
  const navigate = useNavigate();
  return (
    <div className="background relative h-screen bg-cover bg-center px-20 grid grid-rows-12 grid-cols-12 gap-4">
      <img src={arrow} alt="arrow" className="absolute top-0 h-56 left-96 " />
      <img src={logo} alt="logo" className="font-bold absolute top-6 left-20" />

      {/* Input starts here */}
      <div className="flex flex-col justify-center row-start-4 row-end-10 col-start-3 col-end-11 px-62">
        <div className="flex flex-col gap-6 w-full">
          <h1 className="text-5.5xl">reset password ?</h1>
          <p className="font-medium text-2xl font-inter tracking-tight">
            You are a step away from accessing your <br /> account !
          </p>
          <Passwordbox placeholder={"New Password"} />
          <Passwordbox placeholder={"Confirm Password"} />
        <div className="flex justify-center">
          <ButtonGroup textColor={"text-btn_primary"} name={"Login"} onClick={()=>navigate("/login/operator")}/>
        </div>
        </div>
      </div>
      {/* Input ends here  */}
    </div>
  );
};

export default OperatorResetPass;
