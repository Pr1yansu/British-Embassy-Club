import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import InputBox from "../ui/InputBox";
import ButtonGroup from "../ui/ButtonGroup";
import { CgProfile } from "react-icons/cg";
import FileUpload from "./File-Upload";
import { BsArrowUpSquareFill } from "react-icons/bs";
import ValidityExtend from "./ValidityExtend";
import { motion, AnimatePresence } from "framer-motion";
import { useAddMemberMutation } from "../../store/api/memberAPI";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAddMemberImageMutation } from "../../store/api/memberAPI";
import Toasts from "../ui/Toasts";
import { MdError } from "react-icons/md";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import axios from "axios";
import { LuLoader2 } from "react-icons/lu";

const AddMember = ({ onModal }) => {
  const [openExtend, setOpenExtend] = useState(false);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [idType, setIdType] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [address, setAddress] = useState("");
  const [membershipFromDate, setMembershipFromDate] = useState("");
  const [expiryLimit, setExpiryLimit] = useState(1);
  const [expiryDate, setExpiryDate] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [organization, setOrganization] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [publicId, setPublicId] = useState(null);
  const [imgLoading, setImgLoading] = useState(false);

  const [addMember, { isSuccess, isLoading, isError }] = useAddMemberMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (membershipFromDate && expiryLimit) {
      const fromDate = new Date(membershipFromDate);
      const now = new Date();

      fromDate.setHours(now.getHours());
      fromDate.setMinutes(now.getMinutes());
      fromDate.setSeconds(now.getSeconds());
      fromDate.setMilliseconds(now.getMilliseconds());

      const expiryYear = fromDate.getFullYear() + parseInt(expiryLimit);
      fromDate.setFullYear(expiryYear);

      setExpiryDate(fromDate.toISOString());
    }
  }, [membershipFromDate, expiryLimit]);

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await addMember({
        firstName: firstname,
        lastname: lastname,
        name: username,
        email: email,
        mobileNumber: mobileNumber,
        address: address,
        expiryDate: expiryDate,
        bloodGroup: bloodGroup,
        organization: organization,
        idType: idType,
        idNumber: idNumber,
        url: imageUrl ? imageUrl : null,
        public_id: publicId ? publicId : null,
      }).unwrap();

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
            position: "top-center",
            duration: 2000,
          }
        );
        onModal();
        navigate(0);
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
          position: "top-center",
          duration: 2000,
        }
      );
    }
  };

  const onFileDrop = async (e) => {
    try {
      setImgLoading(true);
      const newFile = e.target.files[0];

      if (newFile) {
        const file = new FormData();
        file.append("image", newFile);
        const { data } = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/v1/member/add-member-image`,
          file,{
            withCredentials: true,
          }
        );

        if (data) {
          setImageUrl(data.data.image);
          setPublicId(data.data.public_id);
          setImgLoading(false);
        }

        if (data.status === 400) {
          toast.custom(
            <>
              <Toasts
                boldMessage={"Error!"}
                message={data.message}
                icon={<MdError className="text-text_red" size={32} />}
              />
            </>,
            {
              position: "top-center",
              duration: 2000,
            }
          );
        }
      }
    } catch (error) {
      toast.custom(
        <>
          <Toasts
            boldMessage={"Error!"}
            message={error.response.data.message || "Internal Server Error"}
            icon={<MdError className="text-text_red" size={32} />}
          />
        </>,
        {
          position: "top-center",
          duration: 2000,
        }
      );
    }finally{
      setImgLoading(false);
    }
  };

  return ReactDOM.createPortal(
    <>
      <div className="fixed inset-0 bg-zinc-700/30 z-20 flex items-center justify-center">
        <form
          onSubmit={handlesubmit}
          className="w-full max-w-xl bg-btn_secondary rounded-lg text-blue-700 font-roboto text-xl mx-4 p-6 flex flex-col gap-4 overflow-auto max-h-[90vh]"
        >
          <div className="flex flex-col items-center gap-3">
            <p className="text-xl font-medium">Add Profile Picture</p>
            <div className="w-full h-32 border-4 border-dashed rounded-lg flex justify-center items-center cursor-pointer relative">
              {imageUrl ? (
                <img
                  src={imageUrl && imageUrl}
                  alt="profile"
                  className="w-24 h-24 object-cover rounded-full object-center"
                />
              ) : (
                <CgProfile size={80} color="#6B7280" />
              )}
              <input
                type="file"
                className="opacity-0 absolute top-0 left-0 w-full h-full cursor-pointer"
                accept="image/*"
                onChange={onFileDrop}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="flex flex-col font-medium">
              First Name
              <InputBox
                type="text"
                onChange={(e) => setFirstname(e.target.value)}
              />
            </label>
            <label className="flex flex-col font-medium">
              Last Name
              <InputBox
                type="text"
                onChange={(e) => setLastname(e.target.value)}
              />
            </label>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="flex flex-col font-medium">
              User Name
              <InputBox
                type="text"
                onChange={(e) => setUsername(e.target.value)}
              />
            </label>
            <label className="flex flex-col font-medium">
              Blood Group
              <InputBox
                type="text"
                onChange={(e) => setBloodGroup(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label className="flex flex-col font-medium">
              Email
              <InputBox
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="flex flex-col font-medium relative">
              Membership Valid From
              <div className="flex items-center gap-1 bg-primary pr-2 rounded-lg">
                <InputBox
                  type="date"
                  onChange={(e) => setMembershipFromDate(e.target.value)}
                />
                <BsArrowUpSquareFill
                  size={30}
                  onClick={() => setOpenExtend(!openExtend)}
                  className={`${
                    !openExtend && "transform rotate-180"
                  } ease-in-out duration-300 cursor-pointer`}
                />
              </div>
              {openExtend && (
                <div className="bg-primary outline-none rounded-b-lg text-text_primary absolute top-17 left-40 border-t-2 border-btn_primary">
                  <ul className="flex flex-col items-center cursor-pointer">
                    <li
                      onClick={() => {
                        setExpiryLimit(1);
                        setOpenExtend(false);
                      }}
                      className="hover:bg-btn_secondary hover:text-btn_primary w-full  pt-2.5 pb-1 px-4"
                    >
                      1 year
                    </li>
                    <li
                      onClick={() => {
                        setExpiryLimit(2);
                        setOpenExtend(false);
                      }}
                      className="hover:bg-btn_secondary hover:text-btn_primary w-full  py-1 px-4"
                    >
                      2 years
                    </li>
                    <li
                      onClick={() => {
                        setExpiryLimit(3);
                        setOpenExtend(false);
                      }}
                      className="hover:bg-btn_secondary hover:text-btn_primary w-full  py-1 px-4"
                    >
                      3 years
                    </li>
                    <li
                      onClick={() => {
                        setExpiryLimit(4);
                        setOpenExtend(false);
                      }}
                      className="hover:bg-btn_secondary hover:text-btn_primary w-full  py-1 px-4"
                    >
                      4 years
                    </li>
                    <li
                      onClick={() => {
                        setExpiryLimit(5);
                        setOpenExtend(false);
                      }}
                      className="hover:bg-btn_secondary hover:text-btn_primary w-full pt-1  pb-2.5 px-4"
                    >
                      5 years
                    </li>
                  </ul>
                </div>
              )}
            </label>
            <label className="flex flex-col font-medium">
              Membership Valid Upto
              <div className=" bg-primary outline-none flex items-center h-6 py-5 px-4 rounded-lg text-sm text-text_primary">
                {expiryDate.split("T")[0]}
              </div>
            </label>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="flex flex-col font-medium">
              Mobile Number
              <InputBox
                type="tel"
                onChange={(e) => setMobileNumber(e.target.value)}
              />
            </label>
            <label className="flex flex-col font-medium">
              Organization Name
              <InputBox
                type="text"
                onChange={(e) => setOrganization(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label className="flex flex-col font-medium">
              National ID
              <div className="flex items-center">
                <select
                  name=""
                  id=""
                  className="bg-primary h-10 text-sm w-52 rounded-l-lg text-text_primary p-2 outline-none font-roboto font-medium"
                  onChange={(e) => setIdType(e.target.value)}
                >
                  <option value="">Choose</option>
                  <option value="Aadhar Card">Aadhar Card</option>
                  <option value="Voter Card">Passport No</option>
                  <option value="Pan Card">Others</option>
                </select>
                <input
                  type="text"
                  id=""
                  placeholder="Aadhar No. / Passport No. / Other"
                  className="bg-primary text-sm font-roboto font-normal outline-none sm:w-full max-sm:w-4/5 h-6 py-5 px-4 rounded-r-lg text-text_primary"
                  onChange={(e) => setIdNumber(e.target.value)}
                />
              </div>
            </label>
          </div>
          <div>
            <label className="flex flex-col font-medium">
              Address
              <textarea
                onChange={(e) => setAddress(e.target.value)}
                className="bg-primary rounded-lg p-3 text-text_primary font-normal text-sm font-roboto  outline-none resize-none h-24"
              ></textarea>
            </label>
          </div>
          <div className="flex justify-end gap-4 mt-4">
            <ButtonGroup
              name={"Cancel"}
              color={"bg-[#F8FAFC]"}
              textColor={"text-[#6B7280]"}
              onClick={() => onModal()}
            />
            <ButtonGroup
              name={
                isLoading || imgLoading ? (
                  <>
                    <LuLoader2 className="animate-spin" size={20} />
                  </>
                ) : (
                  <>Confirm</>
                )
              }
              color={"bg-blue-700"}
              textColor={"text-white"}
              type={"submit"}
            />
          </div>
        </form>
      </div>
    </>,
    document.getElementById("portal")
  );
};

export default AddMember;
