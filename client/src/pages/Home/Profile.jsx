import React, { useState } from "react";
import ButtonGroup from "../../components/ui/ButtonGroup";
import InputBox from "../../components/ui/InputBox";
import profilePic from "../../assets/images/profilePic.png";
import FileUpload from "../../components/modals/File-Upload";

const Profile = () => {
  const [open, SetOpen] = useState(false);

  return (
    <>
      <div className="background grid grid-rows-12 grid-cols-12 bg-cover bg-center h-screen">
        <div className="row-start-2 row-end-12 col-start-3 col-end-11 bg-white p-6 rounded-3xl">
          <div className="flex justify-start items-center gap-6 mb-5">
            <img src={profilePic} alt="" className="w-32 h-32" />
            <div
              onClick={() => {
                SetOpen(true);
              }}
            >
              <ButtonGroup
                color={"bg-btn_primary"}
                textColor={"text-btn_secondary"}
                name={"Upload new picture"}
              />
            </div>
            {open && <FileUpload onModal={() => SetOpen(false)} />}
            <ButtonGroup
              color={"bg-btn_secondary"}
              textColor={"text-text_primary"}
              name={"Remove"}
            />
          </div>

          <div className="grid grid-cols-2 gap-x-4 gap-y-5">
            <label htmlFor="" className="roboto font-medium text-btn_primary">
              FirstName
              <InputBox type={"text"} />
            </label>
            <label htmlFor="" className="roboto font-medium text-btn_primary">
              LastName
              <InputBox type={"text"} />
            </label>
            <label htmlFor="" className="roboto font-medium text-btn_primary">
              Email
              <InputBox type={"text"} />
            </label>
            <label htmlFor="" className="roboto font-medium text-btn_primary">
              Mobile Number
              <InputBox type={"text"} />
            </label>
            <label htmlFor=" " className="roboto font-medium text-btn_primary">
              Id Type
              <div className="flex">
                <select
                  name=""
                  id=""
                  className="bg-primary w-52 rounded-l-lg text-text_primary"
                >
                  <option value="">Addhar Card</option>
                  <option value="">Voter Card</option>
                  <option value="">Pan Card</option>
                </select>
                <input
                  type="text"
                  id=""
                  placeholder="Id Number"
                  className=" bg-primary outline-none sm:w-full max-sm:w-4/5 h-6 py-5 px-4 rounded-r-lg text-sm text-text_primary "
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
                className="w-full h-24 bg-primary outline-none resize-none p-3 text-text_primary rounded-xl"
              ></textarea>
            </label>
          </div>

          <div className="flex justify-end w-full gap-6 mt-6">
            <ButtonGroup
              name={"Cancel"}
              color={"bg-[#F8FAFC]"}
              textColor={"text-[#1D4ED8]"}
            />
            <ButtonGroup
              name={"Confirm"}
              color={"bg-[#F8FAFC]"}
              textColor={"text-[#6B7280]"}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
