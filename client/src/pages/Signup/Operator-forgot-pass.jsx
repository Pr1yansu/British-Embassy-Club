import React, { useEffect, useState } from "react";
import arrow from "../../assets/images/arrow.png";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import ButtonGroup from "../../components/ui/ButtonGroup";
import { useNavigate } from "react-router-dom";
import { useSendResetLinkMutation } from "../../store/api/operatorAPI";
import toast from "react-hot-toast";
import { LuLoader2 } from "react-icons/lu";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import Toasts from "../../components/ui/Toasts";
import { MdError } from "react-icons/md";import logo from "../../assets/images/LOGO.png";

const OperatorSignUpOtp = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [
    sendResetLink,
    { isLoading, isSuccess, isError, data },
  ] = useSendResetLinkMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
   const data =  await sendResetLink(username).unwrap();

      if (isSuccess) {
        toast.custom(
          <>
            <Toasts
              boldMessage={"Success!"}
              message={"Reset link sent successfully"}
              icon={
                <IoCheckmarkDoneCircleOutline
                  className="text-text_tertiaary"
                  size={32}
                />
              }
            />
          </>,
          {
            position: "top-left",
            duration: 2000,
          }
        );
        navigate("/login/operator/forgotPass/mail");
      }
    } catch (error) {
     
      toast.custom(
        <>
          <Toasts
            boldMessage={"Error!"}
            message={error?.data?.message || "Internal Server Error"}
            icon={<MdError className="text-text_red" size={32} />}
          />
        </>,
        {
          position: "top-left",
          duration: 2000,
        }
      );
    }
  };

  return (
    <div className="background relative h-screen bg-cover bg-center px-20 grid grid-rows-12 grid-cols-12 gap-4">
      <img src={arrow} alt="arrow" className="absolute -top-10 h-56 left-96" />
      <img src={logo} alt="logo" className="font-bold absolute top-6 left-20" />

      {/* Input starts here */}
      <div className="flex flex-col justify-center row-start-4 row-end-10 col-start-3 col-end-11 px-24">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-6 w-full px-25"
        >
          <h1 className="font-semibold">forgot password ?</h1>
          <p className="font-medium text-2xl font-inter tracking-tight">
            Enter your email address and we’ll send a link to <br />
            reset your password.
          </p>
          <input
            type="text"
            placeholder="Username"
            className="bg-primary outline-none w-full h-6 py-5 px-4 rounded-lg text-sm text-text_primary "
            onChange={(e) => setUsername(e.target.value)}
          />
          <div className="flex justify-between">
            <ButtonGroup
              name={"Go Back"}
              textColor={"text-btn_primary"}
              icon={<FaArrowLeft />}
              onClick={() => navigate("/login/operator/")}
            />
            <ButtonGroup
              name={
                isLoading ? (
                  <>
                    <LuLoader2 className="animate-spin" size={20} />
                  </>
                ) : (
                  <>Sign up</>
                )
              }
              textColor={"text-btn_primary"}
              toggle={true}
              icon={<FaArrowRight />}
              type={"submit"}
            />
          </div>
        </form>
      </div>
      <p className="text-text_primary text-center row-start-11 row-end-12 col-start-5 col-end-9 roboto">
        Already have an account?{" "}
        <a href="/login/operator" className="text-blue-700 roboto">
          Login
        </a>
      </p>
      {/* Input ends here  */}
    </div>
  );
};

export default OperatorSignUpOtp;
