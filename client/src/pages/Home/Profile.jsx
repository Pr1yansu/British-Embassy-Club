import React, { useEffect, useState } from "react";
import ButtonGroup from "../../components/ui/ButtonGroup";
import InputBox from "../../components/ui/InputBox";
import {
  useAddOperatorImageMutation,
  useGetOperatorProfileQuery,
  useUpdateOperatorProfileMutation,
} from "../../store/api/operatorAPI";
import toast from "react-hot-toast";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import Toasts from "../../components/ui/Toasts";
import { MdError } from "react-icons/md";
import axios from "axios";
import { CgProfile } from "react-icons/cg";
import Loader from "../../components/ui/loader";
import { LuLoader2 } from "react-icons/lu";

const Profile = () => {
  const [open, SetOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [idType, setIdType] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [address, setAddress] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [publicId, setPublicId] = useState("");

  const [selectedFile, setSelectedFile] = useState(null);
  const [
    updateOperatorProfile,
    {
      isError: updateisError,
      isLoading: updateisLoading,
      isSuccess: updateisSuccess,
    },
  ] = useUpdateOperatorProfileMutation();
  const [
    addOperatorImage,
    { isLoading, isSuccess, isError },
  ] = useAddOperatorImageMutation();

  const {
    data: profiledata,
    isError: profileisError,
    isLoading: profileisLoading,
  } = useGetOperatorProfileQuery();

  useEffect(() => {
    if (profiledata) {
      setEmail(profiledata.data.email);
      setMobile(profiledata.data.mobileNumber);
      setIdType(profiledata.data.idProof.idType);
      setIdNumber(profiledata.data.idProof.idNumber);
      setAddress(profiledata.data.address);
      setImageUrl(profiledata.data.profileImage.url);
      setPublicId(profiledata.data.profileImage.public_id);
    } 
  }, [profiledata]);

    const onFileDrop = async (e) => {
      const newFile = e.target.files[0];

      if (newFile) {
        const file = new FormData();
        file.append("image", newFile);
        console.log(file.get("image"));
        const { data } = await axios.post(
          `/api/v1/operator/update-operator-image`,
          file
        );

        if (data) {
          setImageUrl(data.data.image);
          setPublicId(data.data.public_id);
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
              position: "top-left",
              duration: 2000,
            }
          );
        }
      }
    };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    // console.log("Update profile data:", name, email, mobile, address, idType, idNumber);
    try {
      const updatedData = await updateOperatorProfile({
        // username: name,
        email: email,
        mobileNumber: mobile,
        address: address,
        idType: idType,
        idNumber: idNumber,
      }).unwrap();

      if (updatedData) {
        toast.custom(
          <>
            <Toasts
              boldMessage={"Success!"}
              message={"Profile updated successfully"}
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

      if (updateisError) {
        toast.custom(
          <>
            <Toasts
              boldMessage={"Error!"}
              message={updatedData.data.error || "Profile not updated"}
              icon={<MdError className="text-text_red" size={32} />}
            />
          </>,
          {
            position: "top-left",
            duration: 2000,
          }
        );
      }
    } catch (error) {
      toast.custom(
        <>
          <Toasts
            boldMessage={"Error!"}
            message={error || "Profile not updated"}
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

  if (profileisLoading) {
    return <LuLoader2/>
  }

  return (
    <>
      <div className="background bg-cover bg-center">
        <div className="container grid grid-rows-12 grid-cols-12  h-screen">
          <div className="row-start-2 row-end-11 col-start-4 col-end-11 bg-white p-6 rounded-3xl shadow-table_shadow">
            <div className="flex justify-start items-center gap-6 mb-4">
              <div className="relative h-32 w-32">
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt="profile"
                    className="h-full w-full object-cover rounded-full"
                  />
                ) : (
                  <CgProfile className="w-full h-full" color="#6B7280" />
                )}
                <input
                  type="file"
                  name="image"
                  className=" w-full h-full absolute top-0 left-0 opacity-0 cursor-pointer"
                  accept="image/*"
                  value=""
                  onChange={onFileDrop}
                />
              </div>
              <form className="relative">
                <ButtonGroup
                  color={"bg-btn_primary"}
                  textColor={"text-btn_secondary"}
                  name={"Upload new picture"}
                  type={"submit"}
                  disable={isLoading}
                />
              </form>
            </div>
            <form onSubmit={handleUpdateProfile}>
              <div className="grid grid-cols-2 gap-x-4 gap-y-4">
                <label
                  htmlFor=""
                  className="roboto font-medium text-btn_primary"
                >
                  Email
                  <InputBox
                    type={"text"}
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                  />
                </label>
                <label
                  htmlFor=""
                  className="roboto font-medium text-btn_primary"
                >
                  Mobile Number
                  <InputBox
                    type={"text"}
                    onChange={(e) => setMobile(e.target.value)}
                    value={mobile}
                  />
                </label>
                <label
                  htmlFor=" "
                  className="roboto font-medium text-btn_primary"
                >
                  Id Type
                  <div className="flex">
                    <select
                      name=""
                      id=""
                      className="bg-primary w-52 rounded-l-lg text-text_primary outline-none roboto font-medium p-2 text-base"
                      onChange={(e) => setIdType(e.target.value)}
                      value={idType}
                    >
                      <option value="Addhar Card">Addhar Card</option>
                      <option value="Voter Card">Voter Card</option>
                      <option value="Pan Card">Pan Card</option>
                    </select>
                    <input
                      type="text"
                      id=""
                      placeholder="Id Number"
                      className=" bg-primary outline-none sm:w-full max-sm:w-4/5 h-6 py-5 px-4 rounded-r-lg text-sm text-text_primary "
                      onChange={(e) => setIdNumber(e.target.value)}
                      value={idNumber}
                    />
                  </div>
                </label>
                <label
                  htmlFor=""
                  className="col-span-2 roboto font-medium text-btn_primary"
                >
                  Address
                  <textarea
                    name=""
                    id=""
                    className="w-full h-24 text-sm bg-primary outline-none resize-none p-3 text-text_primary rounded-xl"
                    onChange={(e) => setAddress(e.target.value)}
                    value={address}
                  ></textarea>
                </label>
              </div>
              <div className=" flex justify-end mt-10 w-full gap-6">
                <ButtonGroup
                  name={"Cancel"}
                  color={"bg-[#F8FAFC]"}
                  textColor={"text-[#1D4ED8]"}
                  onClick={() => window.location.reload()}
                />
                <ButtonGroup
                  name={
                    updateisLoading ? (
                      <>
                        <LuLoader2 className="animate-spin" size={20} />
                      </>
                    ) : (
                      <>Confirm</>
                    )
                  }
                  color={"bg-btn_primary"}
                  textColor={"text-btn_secondary"}
                  type={"submit"}
                  disabled={updateisLoading}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
