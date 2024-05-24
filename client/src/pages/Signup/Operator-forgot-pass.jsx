import React, { useEffect, useState } from "react";
import arrow from "../../assets/images/arrow.png";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import ButtonGroup from "../../components/ui/ButtonGroup";
import { useNavigate } from "react-router-dom";
import { useSendResetLinkMutation } from "../../store/api/operatorAPI";
import toast from "react-hot-toast";
import { LuLoader2 } from "react-icons/lu";


const OperatorSignUpOtp = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [sendResetLink, { isLoading, isSuccess, isError, data }] = useSendResetLinkMutation();
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
   const data =  await sendResetLink(username).unwrap();

      if (data) {
        toast.success("Reset link sent successfully", {
          duration: 2000,
          position: "top-left",
          style: {
            background: "#00FF00",
            color: "#FFFFFF",
          },
        });
        navigate("/login/operator/forgotPass/mail");
      }
      
    } catch (error) {
      toast.error(error?.data?.message || "Internal Server Error", {
        duration: 2000,
        position: "top-left",
        style: {
          background: "#FF0000",
          color: "#FFFFFF",
        },
      });
    }
  };



  return (
    <div className="background relative h-screen bg-cover bg-center px-20 grid grid-rows-12 grid-cols-12 gap-4">
      <img src={arrow} alt="arrow" className="absolute -top-10 h-56 left-96" />
      <h3 className="font-bold absolute top-15 left-30">Logo</h3>

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
