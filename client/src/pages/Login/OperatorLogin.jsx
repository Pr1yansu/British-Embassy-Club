import { React, useState } from "react";
import arrow from "../../assets/images/arrow.png";
import { FaArrowRight } from "react-icons/fa6";
import Passwordbox from "../../components/ui/Passwordbox";
import Button from "../../components/ui/Button";
import InputBox from "../../components/ui/InputBox";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Toasts from "../../components/ui/Toasts";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";

const OperatoLogin = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    const handleLogin = async (e) => {
      e.preventDefault();
      const { data } = await axios.post("/api/v1/operator/login", {
        username,
        password,
      });
      if (data) {
         toast.custom(
           <>
             <Toasts
               boldMessage={"Success!"}
               message={data.message}
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
          navigate("/dashboard");
      }
  };
  return (
    <>
      <div
        className={`background relative h-screen bg-cover bg-center overflow-hidden py-10 px-20 `}
      >
        <img
          src={arrow}
          alt="arrow"
          className="absolute -top-10 h-56 xl:left-80 lg:left-64 max-lg:hidden "
        />
        <h3 className="font-bold">Logo</h3>
        <div className="grid lg:grid-rows-1 lg:grid-cols-2 max-lg:grid-rows-2 max-lg:grid-cols-1 h-full lg:pt-40 ">
          <div className="flex flex-col gap-4 items-center text-center justify-start max-lg:order-2 max-lg:justify-center ">
            <form onSubmit={handleLogin} className="w-3/5 flex flex-col gap-4 items-center justify-center ">
              <InputBox placeholder={"Username"} type={"text"} onChange={(e)=>setUsername(e.target.value)} />
              <Passwordbox placeholder="Password" onchange={(e)=>setPassword(e.target.value)} />
              <Button name={"Login"} />
              <a href="/login/operator/forgotPass" className="text-blue-700 roboto">
                Forgot your password?
              </a>
            </form>
          </div>

          <div className="flex flex-col">
            <h1 className="mb-4">
              a new dashboard <br />
              system for the{" "}
              <span className="text-blue-700 font-bold">
                british embassy club
              </span>
            </h1>
            <div className="flex flex-col">
              <p className="font-medium text-3xl font-inter tracking-tight">
                if you don’t have an account
              </p>
              <h2 className="flex items-center max:lg-justify-center gap-2 font-medium text-3xl">
                <p className="font-medium text-3xl font-inter tracking-tight">
                  please
                </p>
                <a
                  href="/signup/operator"
                  className="font-medium text-blue-700 text-3xl font-inter tracking-tight"
                >
                  register
                </a>
                <FaArrowRight size={22} color="blue" />
              </h2>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OperatoLogin;
