import React, { useState } from "react";
import ReactDOM from "react-dom";
import { CgProfile } from "react-icons/cg";
import { IoIosCloseCircleOutline } from "react-icons/io";
import ButtonGroup from "../ui/ButtonGroup";

const MembersDetails = ({setOpen}) => {
  const [user, setUser] = useState({
    name: "John Doe",
    userName: "@username",
    MemberID: "BEC20240201DEM1",
    Email: "abc@gmail.com",
    MembershipValidity: "Expires on 21/10/24",
    Address:
      "Suite 464 3259 Steve Drives, East Dino, WV 78050 Pin code - 447125",
    MobileNumber: "+91 1234567890",
    WalletAmount: "450.00",
  });
  const keysToExclude = ["name", "userName"];

  const filteredKeys = Object.keys(user).filter(
    (key) => !keysToExclude.includes(key)
  );
  return ReactDOM.createPortal(
    <>
      <div className="fixed top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,.7)]">
        <div className="w-[712px] h-[504px] border bg-[#E2E8F0] p-6 rounded-lg flex flex-col items-center gap-4 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
          <div className="w-full flex justify-between border-b-2 border-gray-600 pb-6">
            <div className="flex justify-center items-center gap-9">
              <CgProfile size={128} color="#6B7280" />
              <div className="flex flex-col gap-2">
                <p className="text-3xl text-btn_primary font-bold font-sans">{user.name}</p>
                <p className="text-text_primary roboto">{user.userName}</p>
              </div>
            </div>
            <div onClick={()=>{setOpen()}} className="cursor-pointer">
            <IoIosCloseCircleOutline size={30} color="blue" />
            </div>
          </div>
          <div className="grid grid-cols-2 grid-rows-3 gap-y-3 items-center">
            {filteredKeys.map((key, index) => (
              <div key={index} className="flex flex-col gap-2">
                <p className="text-btn_primary roboto font-normal">{key}</p>
                <p className="lato text-sm text-text_primary font-normal">{user[key]}</p>
              </div>
            ))}
          </div>
          <div className="w-full flex justify-end">
            <ButtonGroup name={'Remove Member'} color={'bg-[#F8FAFC]'} textColor={'text-[#6B7280]'} toggle={false} icon={<IoIosCloseCircleOutline size={30} color="#6B7280" />}/>
          </div>
        </div>
      </div>
    </>,
    document.getElementById("portal")
  );
};

export default MembersDetails;