import React, { useState } from "react";
import ReactDOM from "react-dom";
import InputBox from "../ui/InputBox";
import ButtonGroup from "../ui/ButtonGroup";
import { CgProfile } from "react-icons/cg";
import FileUpload from "./File-Upload";

const AddMember = ({onModal}) => {
    const [open,setOpen] = useState(false);

  return ReactDOM.createPortal(
    <>
      <div className="fixed top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,.7)] z-20">
        <div className="w-[542px] h-auto px-16 py-10 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-4 justify-center items-center border bg-[#F8FAFD] rounded-lg text-blue-700">
          <div className="w-full flex flex-col items-center gap-3">
            <p className="roboto font-medium">Add Profile Picture</p>
            <div className="w-full h-40 border-4 border-dashed rounded-lg flex justify-center items-center cursor-pointer" onClick={()=> setOpen(true)}>
            <CgProfile size={100} color="#6B7280"/>
            </div>
            {
                open && <FileUpload onModal={() => setOpen(false)}/>
            }
          </div>
          <div className="flex gap-4">
            <label htmlFor="" className="roboto font-medium">
              First Name
              <InputBox type={"text"} />
            </label>
            <label htmlFor="" className="roboto font-medium">
              Last Name
              <InputBox type={"text"} />
            </label>
          </div>
          <div className="w-full">
            <label htmlFor="" className="roboto font-medium">
              Email
              <InputBox type={"email"} />
            </label>
          </div>
          <div className="flex gap-4">
            <label htmlFor="" className="roboto font-medium">
              Mobile Number
              <InputBox type={"tel"} />
            </label>
            <label htmlFor="" className="roboto font-medium">
              Membership Date
              <InputBox type={"date"} />
            </label>
          </div>
          <div className="flex flex-col w-full roboto font-medium">
              Address
              <textarea name="" id="" className="bg-primary rounded-lg p-3 text-text_primary outline-none resize-none"></textarea>
          </div>
          <div className="flex gap-4 justify-end w-full">
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
