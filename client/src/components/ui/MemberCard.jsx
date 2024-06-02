import React, { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { FiInfo } from "react-icons/fi";
import MembersDetails from "../modals/Member-details-full";
import { formatDate } from "../../config/FormatDate";
import toast from "react-hot-toast";

const MemberCard = ({ item, index }) => {
  const [open, setOpen] = useState(false);
  const [memberId, setMemberId] = useState();

  const handleCopy = () => {
    toast.custom(
      <div className="border border-black p-1 rounded-sm text-xs">copied</div>,
      {
        duration: 2000,
        position: "top-left",
      }
    );
  };

  console.log(item);

  // Define textToCopy as the membership ID of the member
  const textToCopy = item._id;

  return (
    <>
      <div
        className="col-span-3 p-2 rounded-lg shadow-member_card bg-white"
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
            className="cursor-pointer"
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
              <CopyToClipboard text={textToCopy} onCopy={handleCopy}>
                <p
                  className="text-xs"
                  id="idToCopy"
                  style={{ cursor: "pointer" }}
                >
                  {textToCopy}
                </p>
              </CopyToClipboard>
            </div>
            <div className="">
              <p className="text-xs text-text_secondary">Membership</p>
              <p className="text-xs ">
                {formatDate(item.expiryTime).toString()}
              </p>
            </div>
          </div>
          <div className="flex flex-col justify-between gap-3">
            <div className="">
              <p className="text-xs text-text_secondary">Mobile No.</p>
              <p className="text-xs">{item.mobileNumber}</p>
            </div>
            <div className="">
              <p className="text-xs text-text_secondary">Wallet</p>
              <p className="text-xs">
                {item.wallet && item.wallet.balance ? item.wallet.balance : 0}
              </p>
            </div>
          </div>
        </div>
      </div>
      {open && (
        <MembersDetails
          image={item.image.url}
          memberId={memberId}
          expiryTime={item.expiryTime}
          setOpen={setOpen}
        />
      )}
    </>
  );
};

export default MemberCard;
