import React, { useEffect, useState } from "react";
import { FiInfo } from "react-icons/fi";
import MembersDetails from "../modals/Member-details-full";
import { formatDate } from "../../config/FormatDate";

const MemberCard = ({ item, index }) => {
  const [open, setOpen] = useState(false);
  const [memberId, setMemberId] = useState();
  return (
    <>
      <div
        className="col-span-3 p-2 rounded-lg shadow-member_card cursor-pointer bg-white"
        key={index}
      >
        <div className="flex items-center justify-between my-1 pb-3 border-b-2 border-primary mb-2">
          <div className="flex items-center gap-3">
            <img src={item.image.url} className="w-10" alt="member" />
            <div className="flex flex-col">
              <p className="roboto text-base text-btn_primary">{item.name}</p>
              <p className="text-xs">{item.username}</p>
            </div>
          </div>
          <FiInfo
            size={20}
            color="#1d4ed8"
            onClick={() => {
              setOpen(true);
              setMemberId(item._id);
            }}
          />
        </div>
        <div className="flex justify-between items-center p-1">
          <div className="flex flex-col justify-between gap-3">
          <div className="">
            <p className="text-xs text-text_secondary">Membership ID</p>
            <p className="text-xs">{item._id}</p>
          </div>
          <div className="">
            <p className="text-xs text-text_secondary">Membership</p>
            <p className="text-xs ">{formatDate(item.expiryTime).toString()}</p>
          </div>
          </div>
          <div className="flex flex-col justify-between gap-3">
          <div className="">
            <p className="text-xs text-text_secondary">Mobile No.</p>
            <p className="text-xs">{item.mobileNumber}</p>
          </div>
          <div className="">
            <p className="text-xs text-text_secondary">Wallet</p>
            <p className="text-xs">1000</p>
          </div>
          </div>
        </div>

        {/* <div className="grid grid-rows-2 grid-cols-2 gap-2 justify-center">
          <div className="">
            <p className="text-xs text-text_secondary">Membership ID</p>
            <p className="text-xs">{item._id}</p>
          </div>
          <div className="">
            <p className="text-xs text-text_secondary">Membership</p>
            <p className="text-xs ">{formatDate(item.expiryTime).toString()}</p>
          </div>
          <div className="">
            <p className="text-xs text-text_secondary">Mobile No.</p>
            <p className="text-xs">{item.mobileNumber}</p>
          </div>
          <div className="">
            <p className="text-xs text-text_secondary">Wallet</p>
            <p className="text-xs">{item.balance}</p>
          </div>
        </div> */}
      </div>
      {open && <MembersDetails memberId={memberId} setOpen={setOpen} />}
    </>
  );
};

export default MemberCard;
