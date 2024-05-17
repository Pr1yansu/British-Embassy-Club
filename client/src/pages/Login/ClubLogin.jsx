import { React } from "react";
import arrow from "../../assets/images/arrow.png";
import { FaArrowRight } from "react-icons/fa6";
import Passwordbox from "../../components/ui/Passwordbox";
import Button from "../../components/ui/Button";
import InputBox from "../../components/ui/InputBox";

const ClubLogin = () => {
  return (
    <>
      <div
        className={`background relative h-screen bg-cover bg-center py-10 px-20 `}
      >
        <img
          src={arrow}
          alt="arrow"
          className="absolute -top-10 h-56 xl:left-80 lg:left-64 max-lg:hidden "
        />
        <h3 className="font-bold">Logo</h3>
        <div className="grid lg:grid-rows-1 lg:grid-cols-2 max-lg:grid-rows-2 max-lg:grid-cols-1 h-full lg:pt-40 ">
          <div className="flex flex-col gap-4 items-center text-center justify-start max-lg:order-2 max-lg:justify-center ">
            <div className="w-3/5 flex flex-col gap-4 items-center justify-center">
              <InputBox type={"text"} placeholder={"Username"} />
              <Passwordbox placeholder="Password" />
              <Button name={"Login"} />
              <a href="#" className="text-blue-700 font-semibold text-xs roboto">
                Forget your password?
              </a>
            </div>
          </div>

          <div className="flex flex-col">
            <h1 className="mb-4">
              are you a member of <br />{" "}
              <span className="text-blue-700 font-bold">
                british embassy club?
              </span>
            </h1>
            <p className="font-medium text-3xl font-inter tracking-tight">
            if you don’t have an account
          </p>
          <h2 className="flex items-center max:lg-justify-center gap-2 font-medium text-3xl">
            <p className="font-medium text-3xl font-inter tracking-tight">please</p>
            <p href="/ClubLogin" className="font-medium text-blue-700 text-3xl font-inter tracking-tight">
            register
            </p>
            <FaArrowRight size={22} color="blue" />
          </h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClubLogin;
