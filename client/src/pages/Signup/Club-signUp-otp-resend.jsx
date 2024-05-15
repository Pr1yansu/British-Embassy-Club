import React, { useEffect, useState } from "react";
import arrow from "../../assets/images/arrow.png";
import Button from "../../components/ui/Button";
import InputBox from "../../components/ui/InputBox";
const ClubSignUpOtpResend = () => {
  const [seconds, setSeconds] = useState(30);

  useEffect(() => {
    const timer = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [seconds]);

  const formatedTime = (seconds % 60).toString().padStart(2, "0");
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
            <p className="text-text_primary roboto font-medium">
              Your OTP will expire in{" "}
              <span className="text-blue-700 roboto font-medium">
                00:{formatedTime} seconds
              </span>
            </p>
            <div className="flex gap-10">
              <Button name={"Submit"} />
              <button
                className={`shadow-md shadow-blue-500 hover:scale-110 duration-300 px-4 rounded-lg text-text_primary ${
                  formatedTime === "00" ? "bg-blue-700 text-white" : ""
                }`}
              >
                {formatedTime !== "00"
                  ? `Resend in 00:${formatedTime} seconds`
                  : "Resend"}
              </button>
            </div>
          </div>
        </div>
        {/* Input ends here  */}
        <div className="flex flex-col max-lg:items-center max-sm:items-start max-sm:text-left max-lg:justify-center max-lg:order-1 max-lg:text-center lg:max-w-[32rem] ">
          <h1 className="mb-4 font-semibold">
            be a member of{" "}
            <span className="text-blue-700 font-semibold">
              british embassy club
            </span>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default ClubSignUpOtpResend;
