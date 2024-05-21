import React, { useState } from "react";
import ReactDOM from "react-dom";
import InputBox from "../ui/InputBox";
import ButtonGroup from "../ui/ButtonGroup";
import { CgProfile } from "react-icons/cg";
import FileUpload from "./File-Upload";
import { BsArrowUpSquareFill } from "react-icons/bs";
import ValidityExtend from "./ValidityExtend";
import { motion, AnimatePresence } from "framer-motion";

const AddMember = ({ onModal }) => {
  const [open, setOpen] = useState(false);
  const [openExtend, setOpenExtend] = useState(false);
  return ReactDOM.createPortal(
    <>
      <div className="fixed inset-0 bg-zinc-700/30 z-20 flex items-center justify-center">
        <div className="w-full max-w-xl bg-btn_secondary rounded-lg text-blue-700 font-roboto text-xl mx-4 p-6 flex flex-col gap-4 overflow-auto max-h-[90vh]">
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
              Membership Valid From
              <div className="flex items-center gap-1">
                <InputBox type="date" />
                <div
                  onClick={() => setOpenExtend(!openExtend)}
                  className="cursor-pointer"
                >
                  <BsArrowUpSquareFill
                    size={30}
                    color="#1d4ed8"
                    className={`${openExtend && "rotate-180"}`}
                  />
                </div>
              </div>
              <AnimatePresence>
                {openExtend && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ValidityExtend onOpen={() => setOpenExtend(false)} />
                  </motion.div>
                )}
              </AnimatePresence>
            </label>
            <label className="flex flex-col font-medium">
              Membership Valid Upto
              <InputBox type="date" />
            </label>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="flex flex-col font-medium">
              Mobile Number
              <InputBox type="tel" />
            </label>
            <label className="flex flex-col font-medium">
              Organization Name
              <InputBox type="tel" />
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
                />
              </div>
            </label>
          </div>
          <div>
            <label className="flex flex-col font-medium">
              Address
              <textarea className="bg-primary rounded-lg p-3 text-text_primary font-normal text-sm font-roboto  outline-none resize-none h-24"></textarea>
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
