import React, { useState } from "react";
import arrow from "../../assets/images/arrow.png";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import ButtonGroup from "../../components/ui/ButtonGroup";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
const ClubForgotPass = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState();

  const handleForgetPass = async (e) => {
    e.preventDefault();

    if (!username) {
      toast.error
      ("Please enter your username", {
        duration: 2000,
        position: "top-left",
        style: {
          background: "#FF0000",
          color: "#FFFFFF",
        },
      });
      return;
    }


    const { data } = await axios.post(
      "/api/v1/club/forget-password",
      {username},
      { withCredentials: true }
    );  

    if (data) {
      toast.success(data.message, {
        duration: 2000,
        position: "top-left",
        style: {
          background: "#00FF00",
          color: "#FFFFFF",
        },
      });
      navigate("/login/club/temp");
    } else {
      toast.error(data.message, {
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
        <form onSubmit={handleForgetPass} className="flex flex-col gap-6 w-full px-25">
          <h1 className="font-semibold font-inter tracking-tight">
            forgot password ?
          </h1>
          <p className="font-medium text-2xl font-inter tracking-tight">
            Enter your username and we’ll send a temporary username and password
            to all the admins to login and reset the old password.
          </p>
            <input
              type="TEXT"
              placeholder="Username"
              className="bg-primary outline-none w-full h-6 py-5 px-4 rounded-lg text-sm text-text_primary"
              onChange={(e) => setUsername(e.target.value)}
            />
            <div className="flex justify-between">
              <ButtonGroup
                name={"Go Back"}
                textColor={"text-btn_primary"}
                icon={<FaArrowLeft />}
                onClick={() => navigate("/login/club")}
              />
              <ButtonGroup
                name={"Submit"}
                type={"submit"}
                textColor={"text-btn_primary"}
                // onClick={() => navigate("/login/club/temp")}
              />
            </div>
        </form>
      </div>
      <p className="text-text_primary text-center row-start-11 row-end-12 col-start-5 col-end-9 roboto">
        Already have an account?{" "}
        <a href="/login/club" className="text-blue-700 roboto">
          Login
        </a>
      </p>
      {/* Input ends here  */}
    </div>
  );
};

export default ClubForgotPass;
