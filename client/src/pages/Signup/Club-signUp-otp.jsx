import React, { useState } from "react";
import arrow from "../../assets/images/arrow.png";
import Button from "../../components/ui/Button";
import InputBox from "../../components/ui/InputBox";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ClubSignUpOtp = () => {
  const navigate = useNavigate();
  
  const [otp, setOtp] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
        const { data } = await axios.post(
      "/api/v1/club/verify-accessKey",
      {
        OneTimeKey : otp
      },
      { withCredentials: true }
    );

    if(data){
      if (data.statusCode === 200) {
        toast.success(data.message, {
          duration: 2000,
          position: "top-left",
          style: {
            background: "#00FF00",
            color: "#FFFFFF",
          },
        });
        navigate("/");
      };
    }
    } catch (error) {
      toast.error(error.response.data.message || "Internal Server Error", {
        duration: 2000,
        position: "top-left",
        style: {
          background: "#FF0000",
          color: "#FFFFFF",
        },
      });
    }
  }


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
          <form onSubmit={handleSubmit} className="w-3/5 flex flex-col gap-4 items-center justify-center">
            <InputBox
              placeholder={"Write your verification code here"}
              type={"text"}
              onChange={(e) => setOtp(e.target.value)}
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
          </form>
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
