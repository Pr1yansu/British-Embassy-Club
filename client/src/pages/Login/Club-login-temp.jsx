import React, { useState } from "react";
import arrow from "../../assets/images/arrow.png";
import Passwordbox from "../../components/ui/Passwordbox";
import Button from "../../components/ui/Button";
import InputBox from "../../components/ui/InputBox";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/LOGO.png";
import { useTemporaryLoginMutation } from "../../store/api/clubAPI";
import toast from "react-hot-toast";
const ClubLoginTemp = () => {
  const [temporaryLogin,{isLoading,isSuccess,isError}] = useTemporaryLoginMutation();
  const navigate = useNavigate();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await temporaryLogin({username,password}).unwrap();
      if(data){
        toast.success("Login successful",{
          duration: 2000,
          position: "top-center",
          style: {
            background: "#333",
            color: "#fff",
          },
          iconTheme: {
            primary: "#fff",
            secondary: "#333",
          },
        });
        navigate("/settingsAdminTemp");
      }
    } catch (error) {
      toast.error(error?.data?.message || "Internal Server Error",{
        duration: 2000,
        position: "top-center",
        style: {
          background: "#333",
          color: "#fff",
        },
        iconTheme: {
          primary: "#fff",
          secondary: "#333",
        },
      });
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
                placeholder={"Temporary Username"}
                onChange={(e) => setUsername(e.target.value)}
              />
              <Passwordbox
                placeholder="Temporary Password"
                onchange={(e) => setPassword(e.target.value)}
              />
              <Button name={"Login"} type={"submit"} />
            </form>
          </div>

          <div className="flex flex-col">
            <h1 className="mb-4 text-text_primary font-inter tracking-tight">
              Login to a temporary <br />{" "}
              <span className="text-black font-inter tracking-tight font-semibold">
                admin account.
              </span>
            </h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClubLoginTemp;
