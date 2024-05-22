import React, { useState } from "react";
import ReactDOM from "react-dom";
import { CgProfile } from "react-icons/cg";
import { IoIosCloseCircleOutline } from "react-icons/io";
import ButtonGroup from "../ui/ButtonGroup";
import Warning from "./Warning";
import AddMember from "./Add-member";
import { useGetMemberByIdQuery } from "../../store/api/memberAPI";

const MembersDetails = ({ setOpen }) => {
  const [OpenWarning, setOpenWarning] = useState(false);
  const [OpenUpdate, setOpenUpdate] = useState(false);
  const [user, setUser] = useState({
    "name": "John Doe",
    "userName": "@username",
    "Member ID": "BEC20240201DEM1",
    "Email": "abc@gmail.com",
    "Membership Validity": "Expires on 21/10/24",
    "Address":
      "Suite 464 3259 Steve Drives, East Dino, WV 78050 Pin code - 447125",
    "Mobile Number": "+91 1234567890",
    "Wallet Amount": "450.00",
    "Blood Group": "O+",
    "Organization Name": "ABC Pvt Ltd",
    "National ID" : "Indian",
  });
  const {data,isError,isLoading,isSuccess} = useGetMemberByIdQuery();

  console.log(data);

  const keysToExclude = ["name", "userName"];

  const filteredKeys = Object.keys(user).filter(
    (key) => !keysToExclude.includes(key)
  );

  return ReactDOM.createPortal(
    <>
      <div className="fixed top-0 left-0 right-0 bottom-0 bg-black/35 z-20">
        <div className="w-full max-w-2xl h-auto border bg-[#E2E8F0] p-6 rounded-lg flex flex-col items-center gap-4 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
          <div className="w-full flex justify-between border-b-2 border-gray-600 pb-6">
            <div className="flex justify-center items-center gap-9">
              <CgProfile size={128} color="#6B7280" />
              <div className="flex flex-col gap-2">
                <p className="text-3xl text-btn_primary font-bold font-sans">
                  {user.name}
                </p>
                <p className="text-text_primary roboto">{user.userName}</p>
              </div>
            </div>
            <div
              onClick={() => {
                setOpen(false);
              }}
              className="cursor-pointer"
            >
              <IoIosCloseCircleOutline size={30} color="blue" />
            </div>
          </div>
          <div className="grid grid-cols-2 grid-rows-3 gap-y-3 items-center">
            {filteredKeys.map((key, index) => (
              <div key={index} className="flex flex-col">
                <p className="text-btn_primary roboto font-normal">{key}</p>
                <p className="lato text-sm text-text_primary font-normal">
                  {user[key]}
                </p>
              </div>
            ))}
          </div>
          <div className="w-full flex justify-end gap-6">
            <ButtonGroup
              name={"Update"}
              color={"bg-btn_secondary"}
              textColor={"text-btn_primary"}
              onClick={() => setOpenUpdate(true)}
            />
            <ButtonGroup
              name={"Remove Member"}
              textColor={"text-text_primary"}
              HovertextColor={"hover:text-white"}
              toggle={false}
              color={"bg-btn_secondary"}
              HoverColor={"hover:bg-red-600"}
              Hovershadow={"hover:shadow-danger_shadow"}
              shadow={"shadow-danger_shadow"}
              icon={<IoIosCloseCircleOutline size={30} />}
              onClick={() => setOpenWarning(true)}
            />
            {OpenWarning && <Warning onModal={() => setOpenWarning(false)} />}
            {OpenUpdate && <AddMember onModal={() => setOpenUpdate(false)} />}
          </div>
        </div>
      </div>
    </>,
    document.getElementById("portal")
  );
};

export default MembersDetails;
