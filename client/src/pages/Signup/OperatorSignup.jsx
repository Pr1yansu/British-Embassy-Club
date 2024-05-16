import React, { useState } from "react";
import arrow from "../../assets/images/arrow.png";
import Passwordbox from "../../components/ui/Passwordbox";
import Button from "../../components/ui/Button";
import InputBox from "../../components/ui/InputBox";
import { IoIosArrowDown } from "react-icons/io";
import { FaArrowRight } from "react-icons/fa6";
import toast from "react-hot-toast";
import axios from "axios";

const OperatorSignup = () => {
  const [show, setShow] = useState(false);
  const toggle = () => {
    setShow(!show);
  };
  const [selectedID, setSelectedID] = useState("Select your documnet");
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [address, setAddress] = useState('');
  const [idType, setIdType] = useState('Select your documnet');
  const [idNumber, setIdNumber] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = async (event) => {
    setIdType(event.target.value);
  };

  const handleRegister = async (e) => { 
    e.preventDefault();
    setLoading(true);
        if (!username || !email || !password || !confirmPassword || !mobileNumber || !address || !idType || !idNumber) {
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

        if (password !== confirmPassword) {
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

        if (mobileNumber.length !== 10) {
          toast.error("Please enter a valid mobile number", {
            duration: 2000,
            position: "top-left",
            style: {
              background: "#FF0000",
              color: "#FFFFFF",
            },
          });
          return;
        }

        if (idType === "Select your documnet") {
          toast.error("Please select a document type", {
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

        try {
          const { data } = await axios.post(
            "/api/v1/operator/register",
            {
              username,
              email,
              password,
              mobileNumber,
              address,
              idProof: {
                idType,
                idNumber,
              },
            },
            { withCredentials: true }
          );
          console.log(data);
          toast.success("success", {
            duration: 2000,
            position: "top-left",
            style: {
              background: "#FF0000",
              color: "#FFFFFF",
            },
          });
    
        } catch (error) {
          toast.error(error.response.data.message || "Internal Server Error", {
            duration: 2000,
            position: "top-left",
            style: {
              background: "green",
              color: "#FFFFFF",
            },
          });
        }
  }

  const handleConsole = (e) => {
    e.preventDefault();
    console.log(username);
    console.log(email);
    console.log(password);
    console.log(confirmPassword);
    console.log(mobileNumber);
    console.log(address);
    console.log(idType);
    console.log(idNumber);
  }

  return (
    <div
      className={`background relative min-h-screen bg-cover bg-center py-10 px-20 `}
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
          <form onSubmit={handleRegister} className="w-3/5 flex flex-col gap-4 items-center justify-center">
            <InputBox placeholder={"Full Name"} type={"text"} onChange={(e)=>setUsername(e.target.value)} />
            <Passwordbox placeholder={"Password"} onchange={(e)=>setPassword(e.target.value)} />
            <Passwordbox placeholder={"Confirm Password"} onchange={(e)=>setConfirmPassword(e.target.value)} />
            <InputBox placeholder={"Email"} type={"email"} onChange={(e)=>setEmail(e.target.value)} />
            <InputBox placeholder={"Mobile Number"} type={"tel"} onChange={(e)=>setMobileNumber(e.target.value)} />
            <textarea
              name="Address"
              id="Address"
              placeholder="Address"
              className="bg-primary outline-none w-full h-24 py-5 px-4 rounded-lg text-sm text-text_primary "
              onChange={(e)=>setAddress(e.target.value)}
            ></textarea>
            <label
              htmlFor="Document"
              className="flex justify-between items-center bg-primary outline-none w-full py-[0.6rem] px-4 rounded-lg text-sm text-text_primary"
            >
              {idType} <IoIosArrowDown onClick={toggle} size={20} />
            </label>
            {show && (
              <>
                <div className="flex justify-center gap-32 w-full">
                  <label className="text-text_primary">
                    <input
                      type="radio"
                      value="Aadhaar Card"
                      checked={selectedID === "Aadhaar Card"}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    Aadhaar Card
                  </label>
                  <label className="text-text_primary">
                    <input
                      type="radio"
                      value="Pan Card"
                      checked={selectedID === "Pan Card"}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    Pan Card
                  </label>
                </div>
                <InputBox placeholder={"ID number"} type={"text"} onChange={(e)=>setIdNumber(e.target.value)} />
              </>
            )}
            <Button name={"Submit"} type={"submit"} />
          </form>
        </div>
        {/* Input ends here  */}

        <div className="flex flex-col max-lg:items-center max-sm:items-start max-sm:text-left max-lg:justify-center max-lg:order-1 max-lg:text-center lg:max-w-120 ">
          <h1 className="mb-4">
            be a member of{" "}
            <span className="text-blue-700 font-bold">
              british embassy club
            </span>
          </h1>
          <h1 className="font-semibold text-2xl">
            if you already have an account
          </h1>
          <h2
            href="#"
            className="flex items-center max:lg-justify-center gap-2  font-semibold text-2xl"
          >
            <h1 className="font-semibold text-2xl">please</h1>
            <h1 href="/OperatorLogin" className="font-semibold text-blue-700 text-2xl">
              login
            </h1>
            <FaArrowRight size={22} color="blue" />
          </h2>
        </div>
      </div>
    </div>
  );
};

export default OperatorSignup;
