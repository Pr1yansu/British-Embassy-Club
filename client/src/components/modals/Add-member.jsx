import React, { useEffect, useState } from "react";
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
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [nationalId, setNationalId] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [address, setAddress] = useState("");
  const [membershipFromDate, setMembershipFromDate] = useState("");
  const [expiryLimit, setExpiryLimit] = useState(1); 
  const [expiryDate, setExpiryDate] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [organization, setOrganization] = useState("");

  useEffect(() => {
    setName(`${firstname} ${lastname}`);
  }, [firstname, lastname]);

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
          <div>
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
            <label className="flex flex-col font-medium">
              Membership Valid From
              <div className="flex items-center gap-1">
                <InputBox
                  type="date"
                  onChange={(e) => setMembershipFromDate(e.target.value)}
                />
              </div>
            </label>
            <label className="flex flex-col font-medium">
              Membership Valid Upto
              <div className="flex items-center gap-1">
                <select
                  className="bg-primary outline-none  py-2.5 px-4 rounded-lg font-semibol text-text_primary"
                  onChange={(e) => setExpiryLimit(e.target.value)}
                >
                  <option
                    value="Viewer"
                    disabled
                    className="bg-primary py-5 px-4"
                  >choice</option>
                  <option value="1">1 year</option>
                  <option value="2">2 year</option>
                  <option value="3">3 year</option>
                  <option value="4">4 year</option>
                  <option value="5">5 year</option>
                </select>
              </div>
            </label>
          </div>
          <div>
            <label className="flex flex-col font-medium">
              Membership Valid Upto
              <div className=" bg-primary outline-none flex items-center h-6 py-5 px-4 rounded-lg text-sm text-text_primary">
                {expiryDate}
              </div>
            </label>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="flex flex-col font-medium">
              Mobile Number
              <InputBox type="tel" onChange={(e)=>setMobileNumber(e.target.value)}/>
            </label>
            <label className="flex flex-col font-medium">
              Organization Name
              <InputBox type="text" onChange={(e)=>setOrganization(e.target.value)}/>
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
