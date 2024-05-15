import React from "react";
import arrow from "../../assets/images/arrow.png";
import Button from "../../components/ui/Button";
import InputBox from "../../components/ui/InputBox";

const ClubSignUpOtp = () => {
  return (
    <div
      className={`background relative h-screen bg-cover bg-center py-10 px-20 `}
    >
      
      <img
        src={arrow}
        alt="arrow"
        className="absolute top-0 h-56 xl:left-80 lg:left-64 max-lg:hidden "
      />
      <h3 className="font-bold">Logo</h3>

      {/* Input starts here */}
      <div className="grid lg:grid-rows-1 lg:grid-cols-2 max-lg:grid-rows-2 max-lg:grid-cols-1 h-full lg:pt-40 ">
        <div className="flex flex-col gap-4 items-center text-center justify-start max-lg:order-2 max-lg:justify-center ">
          <div className="w-3/5 flex flex-col gap-4 items-center justify-center">
            <InputBox
              placeholder={"Write your verification code here"}
              type={"text"}
            />
            <p className="text-text_primary roboto">
              Please contact admin for the verification code
            </p>
            <Button name={"Submit"} />
            <p href="#" className="text-text_primary roboto font-semibold">
              Didn't recieve any code?{" "}
              <a href="#" className="text-blue-700 font-bold">
                Resend
              </a>
            </p>
          </div>
        </div>
        {/* Input ends here  */}

        <div className="flex flex-col max-lg:items-center max-sm:items-start max-sm:text-left max-lg:justify-center max-lg:order-1 max-lg:text-center lg:max-w-[32rem] ">
          <h1 className="mb-4">
            be a member of{" "}
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
