import React, { useEffect, useState } from "react";
import arrow from "../../assets/images/arrow.png";
import { FaArrowRight } from "react-icons/fa6";
import Passwordbox from "../../components/ui/Passwordbox";
import Button from "../../components/ui/Button";
import InputBox from "../../components/ui/InputBox";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useGetClubProfileQuery } from "../../store/api/clubAPI";
import ClubRight from "../../components/auth/ClubRight";

const ClubSignUp = () => {
  const [role, setRole] = useState("choose role");
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmpassword, setConfirmpassword] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { data, error, isLoading } = useGetClubProfileQuery();

  useEffect(() => {
    console.log(data, error, isLoading);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!username || !email || !password || !confirmpassword) {
      toast.error("Please enter a valid search", {
        duration: 2000,
        position: "top-left",
        style: {
          background: "#FF0000",
          color: "#FFFFFF",
        },
      });
      setLoading(false);
      return;
    }

    if (role === "choose role") {
      toast.error("Please select a role", {
        duration: 2000,
        position: "top-left",
        style: {
          background: "#FF0000",
          color: "#FFFFFF",
        },
      });
      setLoading(false);
      return;
    }

    if (password !== confirmpassword) {
      toast.error("Password do not match with confirmpassword", {
        duration: 2000,
        position: "top-left",
        style: {
          background: "#FF0000",
          color: "#FFFFFF",
        },
      });
      return;
    }

    try {
      const { data } = await axios.post("/api/v1/club/create", {
        username,
        email,
        password,
        role,
      });
      console.log(data);
      toast.success("success", {
        duration: 2000,
        position: "top-left",
        style: {
          background: "#FF0000",
          color: "#FFFFFF",
        },
      });

      if (role === "operator") {
        navigate("/ClubSignupOtp");
        return;
      }

      if (role === "admin") {
        navigate("/ClubSignupOtp");
        return;
      } 
    } catch (error) {
      console.log(error);
    }finally{
      setLoading(false);
    }
  };

  const handleResend = async (e) => {
    e.preventDefault();
    console.log("username", username);
    console.log("email", email);
    console.log("password", password);
    console.log("confirmpassword", confirmpassword);
    console.log("role", role);
  };

  return (
    <div
      className={`background relative h-screen bg-cover bg-center py-10 px-20 `}
    >
      <img
        src={arrow}
        alt="arrow"
        className="absolute -top-10 h-56 xl:left-80 lg:left-64 max-lg:hidden "
      />
      <h3 className="font-bold">Logo</h3>
      <div className="grid lg:grid-rows-1 lg:grid-cols-2 max-lg:grid-rows-2 max-lg:grid-cols-1 h-full lg:pt-40 ">
        <div className="flex flex-col gap-4 items-center text-center justify-start max-lg:order-2 max-lg:justify-center ">
          <form
            onSubmit={handleSubmit}
            className="w-3/5 flex flex-col gap-4 items-center justify-center"
          >
            <InputBox
              type={"text"}
              placeholder={"Username"}
              onChange={(e) => setUsername(e.target.value)}
            />
            <InputBox
              type={"email"}
              placeholder={"Email"}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Passwordbox
              placeholder="Password"
              onchange={(e) => setPassword(e.target.value)}
            />
            <Passwordbox
              placeholder="Confirm Password"
              onchange={(e) => setConfirmpassword(e.target.value)}
            />
            <select
              className="bg-primary outline-none sm:w-full max-sm:w-4/5 py-2.5 px-4 rounded-lg font-semibol text-text_primary"
              value={role} // Set the value to the state variable
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="Viewer" disabled className="bg-primary py-5 px-4">
                {role ? role : "Select Role"}
              </option>
              <option value="admin">admin</option>
              <option value="operator">operator</option>
            </select>
            <div className="mt-20">
            <Button name={"Sign up"} type={"submit"} />

            </div>
          </form>
        </div>
        <div className="flex flex-col">
          <ClubRight/>
          <p className="font-medium text-3xl font-inter tracking-tight">
            if you already have an account
          </p>
          <h2 className="flex items-center max:lg-justify-center gap-2">
            <p className="font-medium text-3xl font-inter tracking-tight">please</p>
            <a href="/login/club" className="font-medium text-blue-700 text-3xl font-inter tracking-tight">
              login
            </a>
            <FaArrowRight size={22} color="blue" />
          </h2>
        </div>
      </div>
    </div>
  );
};

export default ClubSignUp;
