import React, { useState } from "react";
import elipes1 from "../../assets/images/ellipse1.png";
import elipes2 from "../../assets/images/ellipse2.png";
import arrow from "../../assets/images/arrow.png";
import { FaArrowRight } from "react-icons/fa6";
import Passwordbox from "../../components/ui/Passwordbox";
import Button from "../../components/ui/Button";
import InputBox from "../../components/ui/InputBox";

const ClubSignUp = () => {
  const [role, setRole] = useState("Set user role");
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
      <div className="grid lg:grid-rows-1 lg:grid-cols-2 max-lg:grid-rows-2 max-lg:grid-cols-1 h-full lg:pt-40 ">
        <div className="flex flex-col gap-4 items-center text-center justify-start max-lg:order-2 max-lg:justify-center ">
          <div className="w-3/5 flex flex-col gap-4 items-center justify-center">
            <InputBox type={"text"} placeholder={"Username"} />
            <Passwordbox placeholder="Password" />
            <Passwordbox placeholder="Confirm Password" />
            <select
              className="bg-primary outline-none sm:w-full max-sm:w-4/5 py-[0.6rem] px-4 rounded-lg font-semibol text-text_primary"
              value={role} // Set the value to the state variable
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="Viewer" disabled className="bg-primary py-5 px-4 ">
                Set user role
              </option>
              <option value="Viewer">Viewer</option>
              <option value="Operator">Operator</option>
            </select>
            <Button name={"Login"} />
            <a href="#" className="text-blue-700 font-bold">
              Forget your password?
            </a>
          </div>
        </div>
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
            className="flex items-center max:lg-justify-center gap-2  font-semibold text-2xl"
          >
            <p className="font-semibold ">please</p>
            <a href="/ClubLogin" className="font-semibold text-blue-700">
              login
            </a>
            <FaArrowRight size={22} color="blue" />
          </h2>
        </div>
      </div>
    </div>
  );
};

export default ClubSignUp;
