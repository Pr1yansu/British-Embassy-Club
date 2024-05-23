import React, { useEffect, useState } from "react";
import ButtonGroup from "../../components/ui/ButtonGroup";
import InputBox from "../../components/ui/InputBox";
import profilePic from "../../assets/images/profilePic.png";
import FileUpload from "../../components/modals/File-Upload";
import {
  useAddOperatorImageMutation,
  useGetOperatorProfileQuery,
  useUpdateOperatorProfileMutation,
} from "../../store/api/operatorAPI";
import toast from "react-hot-toast";

const Profile = () => {
  const [open, SetOpen] = useState(false);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [idType, setIdType] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [address, setAddress] = useState("");

  const [selectedFile, setSelectedFile] = useState(null);
  const { data: profiledata } = useGetOperatorProfileQuery();
  const [
    updateOperatorProfile,
    {
      isError: updateisError,
      isLoading: updateisLoading,
      isSuccess: updateisSuccess,
    },
  ] = useUpdateOperatorProfileMutation();
  console.log(profiledata);
  const [
    addOperatorImage,
    { isLoading, isSuccess, isError },
  ] = useAddOperatorImageMutation();

    useEffect(() => {
      setName(`${firstname}${lastname}`);
    }, [firstname, lastname]);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleImageSubmit = async (event) => {
    event.preventDefault();
    if (selectedFile) {
      const formData = new FormData();
      formData.append("image", selectedFile);
      console.log(formData);
      try {
        const data = await addOperatorImage(formData).unwrap();
        console.log("Response data:", data);
        if (data) {
          toast.success("Image uploaded successfully", {
            duration: 2000,
            position: "top-right",
            style: {
              border: "1px solid #333",
              padding: "16px",
              color: "#333",
            },
            iconTheme: {
              primary: "#333",
              secondary: "#FFFAEE",
            },
          });
        }
      } catch (error) {
        console.log(error);
        toast.error("Image not uploaded", {
          duration: 2000,
          position: "top-right",
          style: {
            border: "1px solid #333",
            padding: "16px",
            color: "#333",
          },
          iconTheme: {
            primary: "#333",
            secondary: "#FFFAEE",
          },
        });
      }
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    // console.log("Update profile data:", name, email, mobile, address, idType, idNumber);
    try {
      const updatedData = await updateOperatorProfile({
        username: name,
        email: email,
        mobileNumber: mobile,
        address: address,
        idType: idType,
        idNumber: idNumber,
      }).unwrap();

      if (updateisSuccess) {
        toast.success("Profile updated successfully", {
          duration: 2000,
          position: "top-right",
          style: {
            border: "1px solid #333",
            padding: "16px",
            color: "#333",
          },
          iconTheme: {
            primary: "#333",
            secondary: "#FFFAEE",
          },
        });
      }

      if (updateisError) {
        toast.error(updatedData.data.error || "Profile not updated", {
          duration: 2000,
          position: "top-right",
          style: {
            border: "1px solid #333",
            padding: "16px",
            color: "#333",
          },    
          iconTheme: {  
            primary: "#333",
            secondary: "#FFFAEE",
          },
        });
      }
    } catch (error) {
      toast.error(error || "Profile not updated", {
        duration: 2000,
        position: "top-right",
        style: {
          border: "1px solid #333",
          padding: "16px",
          color: "#333",
        },
        iconTheme: {
          primary: "#333",
          secondary: "#FFFAEE",
        },
      });

    }
  };

  return (
    <>
      <div className="background bg-cover bg-center">
        <div className="container grid grid-rows-12 grid-cols-12  h-screen">
          <div className="row-start-2 row-end-12 col-start-4 col-end-11 bg-white p-6 rounded-3xl shadow-table_shadow">
            <div className="flex justify-start items-center gap-6 mb-4">
              <img src={profilePic} alt="" className="w-32 h-32" />
              <form onSubmit={handleImageSubmit} className="relative">
                <ButtonGroup
                  color={"bg-btn_primary"}
                  textColor={"text-btn_secondary"}
                  name={"Upload new picture"}
                  type={"submit"}
                  disable={isLoading}
                />
                <input
                  type="file"
                  name="image"
                  className=" w-full h-full absolute top-0 left-0 opacity-0 cursor-pointer"
                  accept="image/*"
                  value=""
                  onChange={handleFileChange}
                />
              </form>
              <ButtonGroup
                color={"bg-btn_secondary"}
                textColor={"text-text_primary"}
                name={"Remove"}
              />
            </div>
            <form onSubmit={handleUpdateProfile}>
              <div className="grid grid-cols-2 gap-x-4 gap-y-4">
                <label
                  htmlFor=""
                  className="roboto font-medium text-btn_primary"
                >
                  First Name
                  <InputBox
                    type={"text"}
                    onChange={(e) => setFirstname(e.target.value)}
                  />
                </label>
                <label
                  htmlFor=""
                  className="roboto font-medium text-btn_primary"
                >
                  Last Name
                  <InputBox
                    type={"text"}
                    onChange={(e) => setLastname(e.target.value)}
                  />
                </label>
                <label
                  htmlFor=""
                  className="roboto font-medium text-btn_primary"
                >
                  Email
                  <InputBox
                    type={"text"}
                    onChange={(e) => setEmail(e.target.value)}
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
                  ></textarea>
                </label>
              </div>
              <div className="flex justify-end w-full gap-6 mt-4">
                <ButtonGroup
                  name={"Cancel"}
                  color={"bg-[#F8FAFC]"}
                  textColor={"text-[#1D4ED8]"}
                  onClick={() => window.location.reload()}
                />
                <ButtonGroup
                  name={"Update Profile"}
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
