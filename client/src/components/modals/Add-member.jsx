import React, { useState } from "react";
import ReactDOM from "react-dom";
import InputBox from "../ui/InputBox";
import ButtonGroup from "../ui/ButtonGroup";
import { CgProfile } from "react-icons/cg";
import FileUpload from "./File-Upload";

const AddMember = ({ onModal }) => {
  const [open, setOpen] = useState(false);

  return ReactDOM.createPortal(
    <>
      <div className="fixed inset-0 bg-[rgba(0,0,0,.7)] z-20 flex items-center justify-center">
        <div className="w-full max-w-xl bg-[#F8FAFD] rounded-lg text-blue-700 mx-4 p-6 flex flex-col gap-4 overflow-auto max-h-[90vh]">
          <div className="flex flex-col items-center gap-3">
            <p className="text-xl font-medium">Add Profile Picture</p>
            <div
              className="w-full h-32 border-4 border-dashed rounded-lg flex justify-center items-center cursor-pointer"
              onClick={() => setOpen(true)}
            >
              <CgProfile size={80} color="#6B7280" />
            </div>
            {open && <FileUpload onModal={() => setOpen(false)} />}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="flex flex-col font-medium">
              First Name
              <InputBox type="text" />
            </label>
            <label className="flex flex-col font-medium">
              Last Name
              <InputBox type="text" />
            </label>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="flex flex-col font-medium">
              Username
              <InputBox type="text" />
            </label>
            <label className="flex flex-col font-medium">
              Blood Group
              <InputBox type="text" />
            </label>
          </div>
          <div>
            <label className="flex flex-col font-medium">
              Email
              <InputBox type="email" />
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="flex flex-col font-medium">
              Mobile Number
              <InputBox type="tel" />
            </label>
            <label className="flex flex-col font-medium">
              Membership Date
              <InputBox type="date" />
            </label>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="flex flex-col font-medium">
              Organization Name
              <InputBox type="tel" />
            </label>
            <label className="flex flex-col font-medium">
              Nationality
              <InputBox type="text" />
            </label>
          </div>
          <div>
            <label className="flex flex-col font-medium">
              Address
              <textarea className="bg-primary rounded-lg p-3 text-text_primary outline-none resize-none h-24"></textarea>
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
              name={"Confirm"}
              color={"bg-blue-700"}
              textColor={"text-white"}
            />
          </div>
        </div>
      </div>
    </>,
    document.getElementById("portal")
  );
};

export default AddMember;
