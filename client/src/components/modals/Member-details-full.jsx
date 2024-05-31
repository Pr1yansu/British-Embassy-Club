import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { CgProfile } from "react-icons/cg";
import { IoIosCloseCircleOutline } from "react-icons/io";
import ButtonGroup from "../ui/ButtonGroup";
import Warning from "./Warning";
import AddMember from "./Add-member";
import { useGetMemberByIdQuery } from "../../store/api/memberAPI";
import UpdateMember from "./Update-member";

const MembersDetails = ({ setOpen, memberId, expiryTime, image }) => {
  const [OpenWarning, setOpenWarning] = useState(false);
  const [OpenUpdate, setOpenUpdate] = useState(false);
  const { data, isError, isLoading, isSuccess } = useGetMemberByIdQuery(
    memberId
  );

  if (isLoading) return <div>Loading...</div>;

  console.log("details", data);

  return ReactDOM.createPortal(
    <>
      <div className="fixed top-0 left-0 right-0 bottom-0 bg-black/35 z-20">
        <div className="w-full max-w-2xl h-auto border bg-[#E2E8F0] p-6 rounded-lg flex flex-col items-center gap-4 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
          <div className="w-full flex justify-between border-b-2 border-gray-600 pb-6">
            <div className="flex justify-center items-center gap-9">
              <img
                src={image}
                alt="member"
                className="w-20"
              />
              <div className="flex flex-col gap-2">
                <p className="text-3xl text-btn_primary font-bold font-sans">
                  {data.data.name}
                </p>
                <p className="text-text_primary roboto">{data.data.userName}</p>
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
          {/* <div className="grid grid-cols-2 grid-rows-3 gap-y-3 items-center">
            {filteredKeys.map((key, index) => (
              <div key={index} className="flex flex-col">
                <p className="text-btn_primary roboto font-normal">{key}</p>
                <p className="lato text-sm text-text_primary font-normal">
                  {data.data[key]}
                </p>
              </div>
            ))}
          </div> */}
          <div className="flex flex-col gap-3 border-1 border-red-600 w-full">
            {/* Row1 starts here */}
            <div className="flex">
              <div className="w-1/2">
                <p className="text-btn_primary roboto font-normal">Member ID</p>
                <p className="lato text-sm text-text_primary font-normal">
                  {data.data._id}
                </p>
              </div>
              <div className="w-1/2">
                <p className="text-btn_primary roboto font-normal">Email</p>
                <p className="lato text-sm text-text_primary font-normal">
                  {data.data.email ? data.data.email : "abc@email"}
                </p>
              </div>
            </div>
            {/* Row1 ends here */}
            {/* Row2 starts here */}
            <div className="flex">
              <div className="w-1/2">
                <p className="text-btn_primary roboto font-normal">
                  Membership Validity
                </p>
                <p className="lato text-sm text-text_primary font-normal">
                  Expires on {data.data.expiryTime}
                </p>
              </div>
              <div className="w-1/2">
                <p className="text-btn_primary roboto font-normal">Address</p>
                <p className="lato text-sm text-text_primary font-normal">
                  {data.data.address}
                </p>
              </div>
            </div>
            {/* Row2 ends here */}
            {/* Row3 starts here */}
            <div className="flex">
              <div className="w-1/2">
                <p className="text-btn_primary roboto font-normal">Mobile No</p>
                <p className="lato text-sm text-text_primary font-normal">
                  {data.data.mobileNumber}
                </p>
              </div>
              <div className="w-1/2">
                <p className="text-btn_primary roboto font-normal">
                  Wallet Amount
                </p>
                <p className="lato text-sm text-text_primary font-normal">
                  {data.data.wallet ? data.data.wallet : 1000}
                </p>
              </div>
            </div>
            {/* Row3 ends here */}
            {/* Row4 starts here */}
            <div className="flex">
              <div className="w-1/2">
                <p className="text-btn_primary roboto font-normal">
                  Blood Group
                </p>
                <p className="lato text-sm text-text_primary font-normal">
                  {data.data.bloodGroup}
                </p>
              </div>
              <div className="w-1/2">
                <p className="text-btn_primary roboto font-normal">
                  Organization Name
                </p>
                <p className="lato text-sm text-text_primary font-normal">
                  {data.data.organization}
                </p>
              </div>
            </div>
            {/* Row4 ends here */}
            {/* Row5 starts here */}
            <div className="flex">
              <div className="w-1/2">
                <p className="text-btn_primary roboto font-normal">
                  National ID
                </p>
                <p className="lato text-sm text-text_primary font-normal">
                  {data.data.idProof ? data.data.idProof.idNumber : "N/A"}
                </p>
              </div>
            </div>
            {/* Row5 ends here */}
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
            {OpenWarning && (
              <Warning
                memberId={memberId}
                onModal={() => setOpenWarning(false)}
              />
            )}
            {OpenUpdate && (
              <UpdateMember
                expiryTime={expiryTime}
                memberId={memberId}
                onModal={() => setOpenUpdate(false)}
              />
            )}
          </div>
        </div>
      </div>
    </>,
    document.getElementById("portal")
  );
};

export default MembersDetails;
