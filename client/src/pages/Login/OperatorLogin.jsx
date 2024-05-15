import { React } from "react";
import arrow from "../../assets/images/arrow.png";
import { FaArrowRight } from "react-icons/fa6";
import Passwordbox from "../../components/ui/Passwordbox";
import Button from "../../components/ui/Button";
import InputBox from "../../components/ui/InputBox";

const OperatoLogin = () => {
  return (
    <>
      <div
        className={`background relative h-screen bg-cover bg-center overflow-hidden py-10 px-20 `}
      >
        <img
          src={arrow}
          alt="arrow"
          className="absolute top-0 h-56 xl:left-80 lg:left-64 max-lg:hidden "
        />
        <h3 className="font-bold">Logo</h3>
        <div className="grid lg:grid-rows-1 lg:grid-cols-2 max-lg:grid-rows-2 max-lg:grid-cols-1 h-full lg:pt-40 ">
          <div className="flex flex-col gap-4 items-center text-center justify-start max-lg:order-2 max-lg:justify-center ">
            <div className="w-3/5 flex flex-col gap-4 items-center justify-center ">
              <InputBox placeholder={"Username"} type={"text"} />
              <Passwordbox placeholder="Password" />
              <Button name={"Signup"} />
              <a href="#" className="text-blue-700 font-bold roboto">
                Forgot your password?
              </a>
            </div>
          </div>
          <div className="flex flex-col max-lg:items-center max-sm:items-start max-sm:text-left max-lg:justify-center max-lg:order-1 max-lg:text-center lg:max-w-[32rem]">
            <h1 className="mb-4">
              a new dashboard system for the{" "}
              <span className="text-blue-700 font-bold">
                british embassy club?
              </span>
            </h1>
            <h1 className=" font-semibold text-2xl">
              if you don’t have an account please
            </h1>
            <h1
              href="#"
              className="flex items-center max:lg-justify-center gap-2  font-semibold text-2xl"
            >
              <h1 className="font-semibold text-2xl">please</h1>
              <h1 href="/OperatorSignUp" className="font-semibold text-blue-700 text-2xl">
                register
              </h1>
              <FaArrowRight size={22} color="blue" />
            </h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default OperatoLogin;
