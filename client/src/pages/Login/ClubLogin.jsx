import { React, useState } from "react";
import arrow from "../../assets/images/arrow.png";
import { FaArrowRight } from "react-icons/fa6";
import Passwordbox from "../../components/ui/Passwordbox";
import Button from "../../components/ui/Button";
import InputBox from "../../components/ui/InputBox";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Toasts from "../../components/ui/Toasts";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import logo from "../../assets/images/LOGO.png";
const ClubLogin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const handleLogin = async (e) => {
    e.preventDefault();
    const { data } = await axios.post("/api/v1/club/login", {
      username,
      password,
    });
    if (data) {
      // console.log(data.data.role);
      if (data.data.role === "admin") {
        navigate("/dashboard");
      }
      if (data.data.role === "operator") {
        navigate("/login/operator");
      }
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
    }
  };
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
        <img src={logo} alt="logo" className="font-bold absolute top-6 left-20" />
        <div className="grid lg:grid-rows-1 lg:grid-cols-2 max-lg:grid-rows-2 max-lg:grid-cols-1 h-full lg:pt-40 ">
          <div className="flex flex-col gap-4 items-center text-center justify-start max-lg:order-2 max-lg:justify-center ">
            <form
              onSubmit={handleLogin}
              className="w-3/5 flex flex-col gap-4 items-center justify-center"
            >
              <InputBox
                type={"text"}
                placeholder={"Username"}
                onChange={(e) => setUsername(e.target.value)}
              />
              <Passwordbox
                placeholder="Password"
                onchange={(e) => setPassword(e.target.value)}
              />
              <Button name={"Login"} type={"submit"} />
              <a
                href="/login/club/forgotPass"
                className="text-blue-700 font-medium text-xs roboto"
              >
                Forget your password?
              </a>
            </form>
          </div>

          <div className="flex flex-col">
            <h1 className="mb-4">
              are you a member of <br />{" "}
              <span className="text-blue-700 font-bold">
                british club kolkata?
              </span>
            </h1>
            <p className="font-medium text-3xl font-inter tracking-tight">
              if you don’t have an account
            </p>
            <h2 className="flex items-center max:lg-justify-center gap-2">
              <p className="font-medium text-3xl font-inter tracking-tight">
                please
              </p>
              <a
                href="/signup/club"
                className="font-medium text-blue-700 text-3xl font-inter tracking-tight"
              >
                register
              </a>
              <FaArrowRight size={22} color="blue" />
            </h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClubLogin;
